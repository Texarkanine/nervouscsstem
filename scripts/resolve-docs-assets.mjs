import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const DOCS_CSS = join('docs', 'stylesheets', 'nerv.css');
const DOCS_JS = join('docs', 'javascripts', 'nerv.js');
const DIST_CSS = join('dist', 'nerv.css');
const DIST_JS = join('dist', 'nerv.js');

/**
 * Resolve how the ProperDocs site loads nerv.css / nerv.js.
 *
 * Local mode copies `dist/nerv.css` and `dist/nerv.js` into gitignored paths
 * under `docs/`, or throws if either file is missing. CDN mode writes jsDelivr
 * stand-ins at those same paths so `properdocs.yml` extra_css / extra_javascript
 * can stay a single pair of relative URLs.
 *
 * @param {object} options
 * @param {'local' | 'cdn'} options.mode
 * @param {string} options.root Repository root that contains package.json and docs/
 * @returns {void}
 */
export function resolveDocsAssets({ mode, root }) {
  if (mode !== 'local' && mode !== 'cdn') {
    throw new Error('resolve-docs-assets: mode must be local or cdn');
  }
  if (!root) {
    throw new Error('resolve-docs-assets: root is required');
  }

  const cssOut = join(root, DOCS_CSS);
  const jsOut = join(root, DOCS_JS);

  if (mode === 'local') {
    const cssIn = join(root, DIST_CSS);
    const jsIn = join(root, DIST_JS);
    if (!existsSync(cssIn) || !existsSync(jsIn)) {
      const missing = !existsSync(cssIn) ? DIST_CSS : DIST_JS;
      throw new Error(
        `resolve-docs-assets: local mode requires ${missing} — run npm run build first`,
      );
    }
    mkdirSync(dirname(cssOut), { recursive: true });
    mkdirSync(dirname(jsOut), { recursive: true });
    copyFileSync(cssIn, cssOut);
    copyFileSync(jsIn, jsOut);
    return;
  }

  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  const cssUrl = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/dist/nerv.css`;
  const jsUrl = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/dist/nerv.js`;

  mkdirSync(dirname(cssOut), { recursive: true });
  mkdirSync(dirname(jsOut), { recursive: true });
  writeFileSync(cssOut, `@import url("${cssUrl}");\n`);
  writeFileSync(
    jsOut,
    `(function () {\n` +
      `  var s = document.createElement("script");\n` +
      `  s.src = ${JSON.stringify(jsUrl)};\n` +
      `  s.onload = function () {\n` +
      `    document.dispatchEvent(new Event("nerv-docs:ready"));\n` +
      `  };\n` +
      `  (document.head || document.documentElement).appendChild(s);\n` +
      `})();\n`,
  );
}

function main(argv = process.argv.slice(2)) {
  const { values } = parseArgs({
    args: argv,
    options: {
      mode: { type: 'string' },
    },
  });
  resolveDocsAssets({ mode: values.mode, root: process.cwd() });
}

const invoked = process.argv[1] && resolve(process.argv[1]);
if (invoked && fileURLToPath(import.meta.url) === invoked) {
  main();
}
