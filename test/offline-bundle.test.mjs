import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, posix, resolve } from 'node:path';
import { strFromU8, unzipSync } from 'fflate';
import {
  ALIAS_FAMILIES,
  BUNDLE_DIR,
  buildOfflineBundle,
} from '../scripts/build-offline-bundle.mjs';

const ROOT = resolve(import.meta.dirname, '..');

// Quote-aware: inline SVG data URIs in nerv.css contain `)` and `http://` inside quotes.
const URL_RE = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)"'\s]*))\s*\)/g;

function urlsIn(css) {
  return [...css.matchAll(URL_RE)].map((m) => m[1] ?? m[2] ?? m[3]);
}

function isRemote(url) {
  return url.startsWith('//') || (/^[a-z][a-z0-9+.-]*:/i.test(url) && !url.startsWith('data:'));
}

function blankUrls(css) {
  return css.replace(URL_RE, 'url()');
}

function declaredFamilies(css) {
  const families = new Set();
  for (const [, block] of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
    const family = block.match(/font-family:\s*["']?([^"';]+)["']?\s*;/)[1];
    if (!ALIAS_FAMILIES.includes(family)) families.add(family);
  }
  return families;
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function installedVersion(pkg) {
  return JSON.parse(readFileSync(join(ROOT, 'node_modules', pkg, 'package.json'), 'utf8')).version;
}

describe('offline bundle contents', () => {
  let tmp;
  let zipPath;
  let entries;
  let distCss;
  let bundledCss;
  let manifest;

  const file = (path) => entries[`${BUNDLE_DIR}/${path}`];
  const text = (path) => strFromU8(file(path));
  const relativeUrls = () =>
    urlsIn(bundledCss)
      .filter((url) => !url.startsWith('data:'))
      .map((url) => posix.normalize(url));

  before(() => {
    execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
    tmp = mkdtempSync(join(tmpdir(), 'nerv-offline-'));
    zipPath = join(tmp, 'bundle.zip');
    buildOfflineBundle({ root: ROOT, outFile: zipPath });
    entries = unzipSync(readFileSync(zipPath));
    distCss = readFileSync(join(ROOT, 'dist', 'nerv.css'), 'utf8');
    bundledCss = text('nerv.css');
    manifest = JSON.parse(text('manifest.json'));
  });

  after(() => {
    rmSync(tmp, { recursive: true, force: true });
  });

  it('puts every entry under one top-level folder with the core files present', () => {
    for (const path of Object.keys(entries)) {
      assert.ok(path.startsWith(`${BUNDLE_DIR}/`), `${path} must sit under ${BUNDLE_DIR}/`);
    }
    for (const path of ['nerv.css', 'nerv.js', 'LICENSE', 'README.md', 'manifest.json']) {
      assert.ok(file(path), `zip must contain ${BUNDLE_DIR}/${path}`);
    }
  });

  it('leaves no remote fetch in the bundled nerv.css', () => {
    const remote = urlsIn(bundledCss).filter(isRemote);
    assert.deepEqual(remote, [], 'bundled nerv.css must not reference remote URLs');
    assert.doesNotMatch(bundledCss, /@import/, 'bundled nerv.css must not @import');
  });

  it('resolves every relative url() in nerv.css to a file in the zip', () => {
    const urls = relativeUrls();
    assert.ok(urls.length > 0, 'bundled nerv.css must reference local font files');
    for (const url of urls) {
      assert.ok(!url.startsWith('..'), `${url} must stay inside the bundle`);
      assert.ok(file(url), `${url} must exist in the zip`);
    }
  });

  it('changes nothing in nerv.css except url() values', () => {
    assert.equal(blankUrls(bundledCss), blankUrls(distCss));
  });

  it('ships only font files that nerv.css references', () => {
    const referenced = new Set(relativeUrls());
    const fonts = Object.keys(entries)
      .map((path) => path.slice(BUNDLE_DIR.length + 1))
      .filter((path) => path.startsWith('fonts/'));
    assert.ok(fonts.length > 0, 'zip must contain font files');
    for (const font of fonts) {
      assert.ok(referenced.has(font), `${font} is in the zip but nerv.css never loads it`);
    }
  });

  it('ships nerv.js and the AGPL LICENSE verbatim', () => {
    assert.deepEqual(Buffer.from(file('nerv.js')), readFileSync(join(ROOT, 'dist', 'nerv.js')));
    assert.deepEqual(Buffer.from(file('LICENSE')), readFileSync(join(ROOT, 'LICENSE')));
  });

  it('lists every file in manifest.json with the sha256 of its bytes', () => {
    const listed = new Map(manifest.files.map(({ path, sha256: hash }) => [path, hash]));
    const inZip = Object.keys(entries)
      .map((path) => path.slice(BUNDLE_DIR.length + 1))
      .filter((path) => path !== 'manifest.json');
    assert.deepEqual([...listed.keys()].sort(), inZip.sort());
    for (const path of inZip) {
      assert.equal(listed.get(path), sha256(file(path)), `sha256 mismatch for ${path}`);
    }
  });

  it('records provenance for every font family the CSS declares', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
    assert.equal(manifest.name, pkg.name);
    assert.equal(manifest.version, pkg.version);
    assert.equal(manifest.license, pkg.license);
    assert.equal(manifest.generator.version, pkg.version);

    assert.deepEqual(
      new Set(manifest.fonts.map((font) => font.family)),
      declaredFamilies(distCss),
    );

    const fontPaths = new Set();
    for (const font of manifest.fonts) {
      assert.equal(font.version, installedVersion(font.package), `${font.package} version`);
      assert.equal(font.license, 'OFL-1.1');
      assert.match(font.oflUrl, /^https:\/\//);
      assert.ok(font.copyright.length > 0, `${font.family} copyright`);
      assert.ok(file(font.licenseFile), `${font.licenseFile} must be in the zip`);
      assert.ok(font.files.length > 0, `${font.family} must list its files`);
      for (const { path, source, sha256: hash } of font.files) {
        const upstream = readFileSync(join(ROOT, 'node_modules', font.package, source));
        assert.equal(hash, sha256(upstream), `${path} must be the bytes of ${font.package}/${source}`);
        assert.equal(sha256(file(path)), hash, `${path} bytes in the zip`);
        fontPaths.add(path);
      }
    }
    const fontsInZip = Object.keys(entries)
      .map((path) => path.slice(BUNDLE_DIR.length + 1))
      .filter((path) => path.startsWith('fonts/'));
    assert.deepEqual([...fontPaths].sort(), fontsInZip.sort());
  });

  it('ships each family OFL text verbatim from its package', () => {
    for (const font of manifest.fonts) {
      const licenseText = text(font.licenseFile);
      assert.match(licenseText, /SIL OPEN FONT LICENSE Version 1\.1/);
      assert.deepEqual(
        Buffer.from(file(font.licenseFile)),
        readFileSync(join(ROOT, 'node_modules', font.package, 'LICENSE')),
      );
    }
  });

  it('names every copyright notice and Reserved Font Name in README.md', () => {
    const readme = text('README.md');
    for (const font of manifest.fonts) {
      assert.ok(readme.includes(font.copyright), `README.md must carry: ${font.copyright}`);
      for (const name of font.reservedFontNames) {
        assert.ok(readme.includes(name), `README.md must name Reserved Font Name ${name}`);
      }
    }
    const reserved = manifest.fonts.flatMap((font) => font.reservedFontNames);
    assert.ok(reserved.includes('Plex') && reserved.includes('DSEG'), 'Plex and DSEG are reserved');
  });

  it('produces identical bytes when built twice', () => {
    const again = join(tmp, 'again.zip');
    buildOfflineBundle({ root: ROOT, outFile: again });
    assert.deepEqual(readFileSync(again), readFileSync(zipPath));
  });
});

describe('offline bundle generator failures', () => {
  const roots = [];

  /**
   * Repo-shaped temp root whose node_modules is the real one, so fontsource
   * data resolves while dist/nerv.css is a fixture.
   */
  function fixtureRoot({ css, js = true }) {
    const root = mkdtempSync(join(tmpdir(), 'nerv-offline-fixture-'));
    roots.push(root);
    writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'nervouscsstem', version: '0.0.0-test', license: 'AGPL-3.0-only' }));
    writeFileSync(join(root, 'LICENSE'), 'fixture license\n');
    mkdirSync(join(root, 'dist'));
    if (css !== undefined) writeFileSync(join(root, 'dist', 'nerv.css'), css);
    if (js) writeFileSync(join(root, 'dist', 'nerv.js'), '/* fixture js */\n');
    symlinkSync(join(ROOT, 'node_modules'), join(root, 'node_modules'), 'dir');
    return root;
  }

  function assertRefuses(root, pattern) {
    const outFile = join(root, 'out.zip');
    assert.throws(() => buildOfflineBundle({ root, outFile }), pattern);
    assert.ok(!existsSync(outFile), 'no zip may be written when the build fails');
  }

  after(() => {
    for (const root of roots) rmSync(root, { recursive: true, force: true });
  });

  it('throws when dist/nerv.css or dist/nerv.js is missing', () => {
    assertRefuses(fixtureRoot({}), /dist\/nerv\.css.*npm run build/);
    assertRefuses(fixtureRoot({ css: '.nerv-x { color: red; }\n', js: false }), /dist\/nerv\.js.*npm run build/);
  });

  it('throws on a remote font URL in a family it does not know', () => {
    const css = `@font-face {
  font-family: "Comic Neue";
  font-style: normal;
  font-weight: 400;
  src: url("https://fonts.gstatic.com/s/comicneue/v1/unknown.woff2") format("woff2");
}
`;
    assertRefuses(fixtureRoot({ css }), /https:\/\/fonts\.gstatic\.com\/s\/comicneue\/v1\/unknown\.woff2/);
  });

  it('throws when a unicode-range matches no subset in the family package', () => {
    const css = `@font-face {
  font-family: "VT323";
  font-style: normal;
  font-weight: 400;
  src: url("https://fonts.gstatic.com/s/vt323/v18/nomatch.woff2") format("woff2");
  unicode-range: U+0041;
}
`;
    assertRefuses(fixtureRoot({ css }), /VT323/);
  });

  it('throws when an alias face uses a URL no primary face resolved', () => {
    const css = `@font-face {
  font-family: "NERV Mixed";
  font-style: normal;
  font-weight: 400;
  src: url("https://fonts.gstatic.com/s/barlowcondensed/v13/unresolved.woff2") format("woff2");
  unicode-range: U+0000-024F;
}
`;
    assertRefuses(fixtureRoot({ css }), /unresolved\.woff2/);
  });

  it('throws when a remote url() or @import is left outside @font-face', () => {
    assertRefuses(
      fixtureRoot({ css: '@import url("https://example.com/other.css");\n' }),
      /@import/,
    );
    assertRefuses(
      fixtureRoot({ css: '.nerv-x { background: url(https://example.com/a.png); }\n' }),
      /https:\/\/example\.com\/a\.png/,
    );
  });

  it('throws when a jsDelivr fontsource version differs from the installed one', () => {
    const installed = installedVersion('@fontsource/dseg7-classic');
    const css = `@font-face {
  font-family: "DSEG7 Classic";
  font-style: normal;
  font-weight: 400;
  src: url("https://cdn.jsdelivr.net/npm/@fontsource/dseg7-classic@5.2.4/files/dseg7-classic-latin-400-normal.woff2") format("woff2");
}
`;
    assert.notEqual(installed, '5.2.4');
    assertRefuses(
      fixtureRoot({ css }),
      new RegExp(`5\\.2\\.4.*${installed.replaceAll('.', '\\.')}|${installed.replaceAll('.', '\\.')}.*5\\.2\\.4`),
    );
  });
});
