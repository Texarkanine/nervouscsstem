import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { strToU8, zipSync } from 'fflate';

/**
 * Font families whose `@font-face` `src` the CSS loads, with the pinned
 * fontsource package that supplies their bytes and the notice data OFL-1.1
 * requires. `copyright` is the verbatim copyright line of the family's
 * upstream OFL.txt, which is where Reserved Font Names are declared.
 *
 * @type {ReadonlyArray<{
 *   family: string,
 *   package: string,
 *   variable: boolean,
 *   oflUrl: string,
 *   copyright: string,
 *   reservedFontNames: string[],
 * }>}
 */
export const FONT_FAMILIES = [
  {
    family: 'Barlow Condensed',
    package: '@fontsource/barlow-condensed',
    variable: false,
    oflUrl: 'https://github.com/google/fonts/blob/main/ofl/barlowcondensed/OFL.txt',
    copyright: 'Copyright 2017 The Barlow Project Authors (https://github.com/jpt/barlow)',
    reservedFontNames: [],
  },
  {
    family: 'Antonio',
    package: '@fontsource-variable/antonio',
    variable: true,
    oflUrl: 'https://github.com/google/fonts/blob/main/ofl/antonio/OFL.txt',
    copyright: 'Copyright 2013 The Antonio Project Authors (https://github.com/googlefonts/antonioFont)',
    reservedFontNames: [],
  },
  {
    family: 'IBM Plex Mono',
    package: '@fontsource/ibm-plex-mono',
    variable: false,
    oflUrl: 'https://github.com/google/fonts/blob/main/ofl/ibmplexmono/OFL.txt',
    copyright: 'Copyright © 2017 IBM Corp. with Reserved Font Name "Plex"',
    reservedFontNames: ['Plex'],
  },
  {
    family: 'DSEG7 Classic',
    package: '@fontsource/dseg7-classic',
    variable: false,
    oflUrl: 'https://github.com/keshikan/DSEG/blob/master/DSEG-LICENSE.txt',
    copyright: 'Copyright (c) 2020, keshikan (https://www.keshikan.net), with Reserved Font Name "DSEG".',
    reservedFontNames: ['DSEG'],
  },
  {
    family: 'Shippori Mincho B1',
    package: '@fontsource/shippori-mincho-b1',
    variable: false,
    oflUrl: 'https://github.com/google/fonts/blob/main/ofl/shipporiminchob1/OFL.txt',
    copyright: 'Copyright 2021 The Shippori Mincho Project Authors (https://github.com/fontdasu/ShipporiMincho)',
    reservedFontNames: [],
  },
  {
    family: 'VT323',
    package: '@fontsource/vt323',
    variable: false,
    oflUrl: 'https://github.com/google/fonts/blob/main/ofl/vt323/OFL.txt',
    copyright: 'Copyright 2011, The VT323 Project Authors (peter.hull@oikoi.com)',
    reservedFontNames: [],
  },
];

/**
 * Composite families that reuse a primary family's file under a wider
 * `unicode-range`. They carry no license of their own.
 *
 * @type {ReadonlyArray<string>}
 */
export const ALIAS_FAMILIES = ['NERV Mixed', 'NERV Cartouche'];

/** Top-level folder every zip entry sits under. */
export const BUNDLE_DIR = 'nervouscsstem-offline';

/** Where the CLI writes the zip, relative to the repository root. */
export const DEFAULT_OUT = 'dist/nervouscsstem-offline.zip';

// fflate encodes DOS timestamps with local-time getters, so build the date from
// local fields; a UTC instant would change the bytes with the timezone.
const ZIP_MTIME = new Date(1980, 0, 1, 12, 0, 0);

const URL_RE = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)"'\s]*))\s*\)/g;
const JSDELIVR_FONTSOURCE_RE =
  /^https:\/\/cdn\.jsdelivr\.net\/npm\/(@fontsource(?:-variable)?\/[^@/]+)@([^/]+)\/files\/([^/]+)$/;

/**
 * Every `url()` in a stylesheet, honoring quotes so values such as
 * `url("data:image/svg+xml,…rgb(0 0 0)…")` are returned whole.
 *
 * @param {string} css
 * @returns {string[]} unquoted url values in source order
 */
function cssUrls(css) {
  return [...css.matchAll(URL_RE)].map((m) => m[1] ?? m[2] ?? m[3]);
}

function isRemote(url) {
  return url.startsWith('//') || (/^[a-z][a-z0-9+.-]*:/i.test(url) && !url.startsWith('data:'));
}

function normalizeRange(range) {
  return range.replace(/\s+/g, '').toLowerCase();
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function fontFaces(css) {
  return [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map(([, body]) => {
    const prop = (name) =>
      body.match(new RegExp(`(?:^|;)\\s*${name}\\s*:\\s*([^;]+)`))?.[1].trim();
    return {
      family: prop('font-family')?.replace(/^["']|["']$/g, ''),
      style: prop('font-style') ?? 'normal',
      weight: prop('font-weight') ?? '400',
      range: prop('unicode-range'),
      urls: cssUrls(prop('src') ?? ''),
    };
  });
}

/**
 * @param {string} root
 * @param {string} name npm package name
 * @returns {{ dir: string, id: string, version: string, unicode: Record<string, string> }}
 */
function readFontPackage(root, name) {
  const dir = join(root, 'node_modules', name);
  const readJson = (file) => JSON.parse(readFileSync(join(dir, file), 'utf8'));
  return {
    dir,
    id: readJson('metadata.json').id,
    version: readJson('package.json').version,
    unicode: readJson('unicode.json'),
  };
}

function fontsourceFile(face, spec, pkg, url) {
  let file;
  const jsdelivr = url.match(JSDELIVR_FONTSOURCE_RE);
  if (jsdelivr) {
    const [, name, version, fileName] = jsdelivr;
    if (name !== spec.package) {
      throw new Error(`offline bundle: ${url} names ${name}, but "${spec.family}" is pinned to ${spec.package}`);
    }
    if (version !== pkg.version) {
      throw new Error(`offline bundle: ${url} pins ${name}@${version}, but ${pkg.version} is installed`);
    }
    file = fileName;
  } else {
    if (!face.range) {
      throw new Error(`offline bundle: "${spec.family}" face for ${url} has no unicode-range to match`);
    }
    const subset = Object.keys(pkg.unicode).find(
      (key) => normalizeRange(pkg.unicode[key]) === normalizeRange(face.range),
    );
    if (!subset) {
      throw new Error(
        `offline bundle: no ${spec.package}@${pkg.version} subset matches the unicode-range of "${spec.family}" (${url})`,
      );
    }
    const ext = url.match(/\.(woff2?)$/)?.[1];
    if (!ext) {
      throw new Error(`offline bundle: cannot tell the font format of ${url}`);
    }
    const weight = spec.variable ? 'wght' : face.weight;
    file = `${pkg.id}-${subset.replace(/^\[|\]$/g, '')}-${weight}-${face.style}.${ext}`;
  }
  if (!existsSync(join(pkg.dir, 'files', file))) {
    throw new Error(`offline bundle: ${spec.package}@${pkg.version} has no files/${file} (for ${url})`);
  }
  return file;
}

/**
 * Map each remote font URL in `css` to the fontsource file that serves the
 * same glyphs. A face is matched by its `unicode-range` against the family
 * package's `unicode.json`; a jsDelivr fontsource URL names its file
 * directly; alias faces reuse a URL a primary face already resolved.
 *
 * @param {object} options
 * @param {string} options.css Compiled nerv.css
 * @param {string} options.root Repository root containing node_modules/
 * @returns {Map<string, { family: string, package: string, version: string, file: string }>}
 * @throws {Error} when any remote URL cannot be mapped
 */
export function resolveFontUrls({ css, root }) {
  const resolved = new Map();
  const packages = new Map();
  const faces = fontFaces(css);

  for (const face of faces.filter((f) => !ALIAS_FAMILIES.includes(f.family))) {
    const remote = face.urls.filter(isRemote);
    if (remote.length === 0) continue;
    const spec = FONT_FAMILIES.find((f) => f.family === face.family);
    if (!spec) {
      throw new Error(`offline bundle: no pinned font package for "${face.family}" (${remote.join(', ')})`);
    }
    if (!packages.has(spec.package)) packages.set(spec.package, readFontPackage(root, spec.package));
    const pkg = packages.get(spec.package);
    for (const url of remote) {
      if (resolved.has(url)) continue;
      resolved.set(url, {
        family: spec.family,
        package: spec.package,
        version: pkg.version,
        file: fontsourceFile(face, spec, pkg, url),
      });
    }
  }

  for (const face of faces.filter((f) => ALIAS_FAMILIES.includes(f.family))) {
    for (const url of face.urls.filter(isRemote)) {
      if (!resolved.has(url)) {
        throw new Error(`offline bundle: alias "${face.family}" uses ${url}, which no primary @font-face resolves`);
      }
    }
  }

  return resolved;
}

function readme(pkg, fonts) {
  const families = fonts
    .map((font) =>
      [
        `### ${font.family}`,
        '',
        `- ${font.copyright}`,
        `- Reserved Font Names: ${font.reservedFontNames.length ? font.reservedFontNames.join(', ') : 'none'}`,
        `- License: SIL Open Font License 1.1, text in \`${font.licenseFile}\` (upstream: <${font.oflUrl}>)`,
        `- Source: \`${font.package}@${font.version}\``,
      ].join('\n'),
    )
    .join('\n\n');

  return `# ${pkg.name} ${pkg.version} offline bundle

Everything a page needs to render ${pkg.name} with no network: \`nerv.css\`, \`nerv.js\`, and the fonts \`nerv.css\` loads. \`nerv.css\` is rewritten to load those fonts from \`fonts/\`; nothing else in it changes.

## Use

Copy this folder next to your page and link both files:

\`\`\`html
<link rel="stylesheet" href="${BUNDLE_DIR}/nerv.css">
<script src="${BUNDLE_DIR}/nerv.js"></script>
\`\`\`

Keep \`fonts/\` beside \`nerv.css\`: its \`@font-face\` rules use relative URLs.

## Licenses

This folder is an aggregate of separately licensed works.

- \`nerv.css\` and \`nerv.js\` are ${pkg.license}. The full text is in \`LICENSE\`.
- The fonts in \`fonts/\` are under the SIL Open Font License 1.1 (OFL-1.1), not the AGPL. They are unmodified. Each family's license text is in \`licenses/<family>/OFL.txt\`. Reserved Font Names restrict the names of modified versions.

\`manifest.json\` records the SHA-256 of every file and the exact font package versions.

## Fonts

${families}
`;
}

/**
 * Build the offline zip: `dist/nerv.css` with font URLs rewritten to
 * `fonts/<file>`, `dist/nerv.js`, the repo LICENSE, the font files and their
 * OFL texts, a generated README.md with every copyright notice, and a
 * manifest.json with provenance and sha256 for every file. Output bytes
 * depend only on the inputs.
 *
 * @param {object} options
 * @param {string} options.root Repository root with package.json, LICENSE, dist/, node_modules/
 * @param {string} options.outFile Path of the zip to write
 * @returns {{ outFile: string, manifest: object }}
 * @throws {Error} when dist/ is missing or the CSS would still reach the network
 */
export function buildOfflineBundle({ root, outFile }) {
  const cssPath = join(root, 'dist', 'nerv.css');
  const jsPath = join(root, 'dist', 'nerv.js');
  for (const [path, label] of [[cssPath, 'dist/nerv.css'], [jsPath, 'dist/nerv.js']]) {
    if (!existsSync(path)) {
      throw new Error(`offline bundle: ${label} is missing — run npm run build first`);
    }
  }

  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  const css = readFileSync(cssPath, 'utf8');
  const fontUrls = resolveFontUrls({ css, root });

  const bundledCss = css.replace(URL_RE, (whole, dq, sq, bare) => {
    const hit = fontUrls.get(dq ?? sq ?? bare);
    return hit ? `url("fonts/${hit.file}")` : whole;
  });
  if (/@import/.test(bundledCss)) {
    throw new Error('offline bundle: nerv.css has an @import, which would fetch at paint time');
  }
  const leftover = cssUrls(bundledCss).filter(isRemote);
  if (leftover.length > 0) {
    throw new Error(`offline bundle: nerv.css still references remote URLs: ${leftover.join(', ')}`);
  }

  const files = {
    'nerv.css': strToU8(bundledCss),
    'nerv.js': readFileSync(jsPath),
    LICENSE: readFileSync(join(root, 'LICENSE')),
  };

  const resolvedFonts = [...fontUrls.values()];
  const fonts = FONT_FAMILIES.filter((spec) => resolvedFonts.some((r) => r.family === spec.family)).map(
    (spec) => {
      const fontPkg = readFontPackage(root, spec.package);
      const licenseFile = `licenses/${fontPkg.id}/OFL.txt`;
      files[licenseFile] = readFileSync(join(fontPkg.dir, 'LICENSE'));
      const names = [...new Set(resolvedFonts.filter((r) => r.family === spec.family).map((r) => r.file))].sort();
      return {
        family: spec.family,
        package: spec.package,
        version: fontPkg.version,
        license: 'OFL-1.1',
        oflUrl: spec.oflUrl,
        copyright: spec.copyright,
        reservedFontNames: spec.reservedFontNames,
        licenseFile,
        files: names.map((name) => {
          const bytes = readFileSync(join(fontPkg.dir, 'files', name));
          files[`fonts/${name}`] = bytes;
          return { path: `fonts/${name}`, source: `files/${name}`, sha256: sha256(bytes) };
        }),
      };
    },
  );

  files['README.md'] = strToU8(readme(pkg, fonts));

  const manifest = {
    name: pkg.name,
    version: pkg.version,
    license: pkg.license,
    generator: { name: 'scripts/build-offline-bundle.mjs', version: pkg.version },
    fonts,
    files: Object.keys(files)
      .sort()
      .map((path) => ({ path, sha256: sha256(files[path]) })),
  };
  files['manifest.json'] = strToU8(`${JSON.stringify(manifest, null, 2)}\n`);

  const entries = {};
  for (const path of Object.keys(files).sort()) {
    entries[`${BUNDLE_DIR}/${path}`] = files[path];
  }
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, zipSync(entries, { level: 9, mtime: ZIP_MTIME }));
  return { outFile, manifest };
}

function main(argv = process.argv.slice(2)) {
  const { values } = parseArgs({
    args: argv,
    options: {
      out: { type: 'string' },
    },
  });
  const root = process.cwd();
  const { outFile } = buildOfflineBundle({ root, outFile: resolve(root, values.out ?? DEFAULT_OUT) });
  console.log(`offline bundle: ${outFile}`);
}

const invoked = process.argv[1] && resolve(process.argv[1]);
if (invoked && fileURLToPath(import.meta.url) === invoked) {
  main();
}
