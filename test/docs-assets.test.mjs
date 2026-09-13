import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { resolveDocsAssets } from '../scripts/resolve-docs-assets.mjs';

const PKG_NAME = 'nervouscsstem';
const PKG_VERSION = '0.1.0';
const DIST_CSS_MARKER = '/* fixture-dist-css */';
const DIST_JS_MARKER = '/* fixture-dist-js */';
const REF_SENTINEL = 'ref-untouched';
const SRC_SENTINEL = 'src-untouched';

/**
 * Build a temporary repo-shaped tree: package.json, optional dist/, docs/,
 * and sentinel files under ref/ and src/.
 *
 * @param {{ distCss?: boolean, distJs?: boolean }} [files]
 * @returns {string} root path
 */
function makeRoot({ distCss = true, distJs = true } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'nerv-docs-assets-'));
  writeFileSync(
    join(root, 'package.json'),
    JSON.stringify({ name: PKG_NAME, version: PKG_VERSION }),
  );
  mkdirSync(join(root, 'docs'));
  mkdirSync(join(root, 'ref'));
  mkdirSync(join(root, 'src'));
  writeFileSync(join(root, 'ref', 'sentinel.txt'), REF_SENTINEL);
  writeFileSync(join(root, 'src', 'sentinel.txt'), SRC_SENTINEL);
  if (distCss || distJs) {
    mkdirSync(join(root, 'dist'));
  }
  if (distCss) {
    writeFileSync(join(root, 'dist', 'nerv.css'), DIST_CSS_MARKER);
  }
  if (distJs) {
    writeFileSync(join(root, 'dist', 'nerv.js'), DIST_JS_MARKER);
  }
  return root;
}

function docsCss(root) {
  return join(root, 'docs', 'stylesheets', 'nerv.css');
}

function docsJs(root) {
  return join(root, 'docs', 'javascripts', 'nerv.js');
}

function jsdelivrCss() {
  return `https://cdn.jsdelivr.net/npm/${PKG_NAME}@${PKG_VERSION}/dist/nerv.css`;
}

function jsdelivrJs() {
  return `https://cdn.jsdelivr.net/npm/${PKG_NAME}@${PKG_VERSION}/dist/nerv.js`;
}

describe('resolveDocsAssets local mode', () => {
  const roots = [];

  after(() => {
    for (const root of roots) {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it('throws and writes nothing when dist/nerv.css is missing', () => {
    const root = makeRoot({ distCss: false, distJs: true });
    roots.push(root);
    assert.throws(() => resolveDocsAssets({ mode: 'local', root }));
    assert.equal(existsSync(docsCss(root)), false);
    assert.equal(existsSync(docsJs(root)), false);
  });

  it('throws and writes nothing when dist/nerv.js is missing', () => {
    const root = makeRoot({ distCss: true, distJs: false });
    roots.push(root);
    assert.throws(() => resolveDocsAssets({ mode: 'local', root }));
    assert.equal(existsSync(docsCss(root)), false);
    assert.equal(existsSync(docsJs(root)), false);
  });

  it('copies dist files to docs/stylesheets/nerv.css and docs/javascripts/nerv.js', () => {
    const root = makeRoot();
    roots.push(root);
    resolveDocsAssets({ mode: 'local', root });
    assert.equal(readFileSync(docsCss(root), 'utf8'), DIST_CSS_MARKER);
    assert.equal(readFileSync(docsJs(root), 'utf8'), DIST_JS_MARKER);
  });
});

describe('resolveDocsAssets CDN mode', () => {
  const roots = [];

  after(() => {
    for (const root of roots) {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it('writes an @import of the versioned jsDelivr nerv.css', () => {
    const root = makeRoot();
    roots.push(root);
    resolveDocsAssets({ mode: 'cdn', root });
    const css = readFileSync(docsCss(root), 'utf8');
    assert.match(css, /@import/);
    assert.ok(css.includes(jsdelivrCss()));
    assert.equal(css.includes(DIST_CSS_MARKER), false);
  });

  it('writes a stub that loads the versioned jsDelivr nerv.js', () => {
    const root = makeRoot();
    roots.push(root);
    resolveDocsAssets({ mode: 'cdn', root });
    const js = readFileSync(docsJs(root), 'utf8');
    assert.ok(js.includes(jsdelivrJs()));
    assert.ok(js.includes('nerv-docs:ready'));
    assert.equal(js.includes(DIST_JS_MARKER), false);
  });

  it('does not require dist/ to exist', () => {
    const root = makeRoot({ distCss: false, distJs: false });
    roots.push(root);
    resolveDocsAssets({ mode: 'cdn', root });
    assert.ok(existsSync(docsCss(root)));
    assert.ok(existsSync(docsJs(root)));
    assert.ok(readFileSync(docsCss(root), 'utf8').includes(jsdelivrCss()));
    assert.ok(readFileSync(docsJs(root), 'utf8').includes(jsdelivrJs()));
  });
});

describe('resolveDocsAssets isolation', () => {
  let root;

  before(() => {
    root = makeRoot();
  });

  after(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it('does not modify ref/ or src/', () => {
    resolveDocsAssets({ mode: 'local', root });
    resolveDocsAssets({ mode: 'cdn', root });
    assert.equal(readFileSync(join(root, 'ref', 'sentinel.txt'), 'utf8'), REF_SENTINEL);
    assert.equal(readFileSync(join(root, 'src', 'sentinel.txt'), 'utf8'), SRC_SENTINEL);
  });
});

describe('docs toolchain lock', () => {
  it('does not pin wheels from download.pytorch.org', () => {
    const lock = readFileSync(join(import.meta.dirname, '..', 'uv.lock'), 'utf8');
    const urls = [
      ...[...lock.matchAll(/url = "([^"]+)"/g)].map((m) => m[1]),
      ...[...lock.matchAll(/registry = "([^"]+)"/g)].map((m) => m[1]),
    ];
    assert.ok(urls.length > 0, 'uv.lock must declare registry or file URLs');
    const pypi = /^https:\/\/(pypi\.org|files\.pythonhosted\.org)\//;
    for (const url of urls) {
      assert.match(url, pypi, `non-PyPI URL in uv.lock: ${url}`);
    }
  });
});
