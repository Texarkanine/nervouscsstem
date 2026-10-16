# Tech Context

Pure-CSS design system with minimal vanilla JS orchestration. SCSS (Dart Sass) is the authoring format; the output is a single compiled `nerv.css` file.

## Environment Setup

- **Git LFS** — The screenshot library is `docs/img/` and `planning/selected-ref-images/`, stored via [Git LFS](https://git-lfs.com/). After clone, run `git lfs install` once per machine; use `git lfs pull` if images are missing. Those trees are repo-only; do not copy them into an installable skill, and do not add a repo-wide `*.png` LFS rule. Path contract: [`docs/service-manual.md`](../docs/service-manual.md).
- Node.js required (for Dart Sass via npm)
- `npm install` to fetch the `sass` dev dependency
- **uv + ProperDocs** — docs site. `uv sync --group docs` (lockfile `uv.lock`, config `properdocs.yml`). Relock with `uv lock --no-config --default-index https://pypi.org/simple --upgrade` so a user-level extra index (this machine: PyTorch CUDA in `~/.config/uv/uv.toml`) cannot enter the lock. Nav is the `docs/` tree plus one root `docs/.pages` (`mkdocs-awesome-pages-plugin`); `properdocs.yml` has no `nav:`. Nested `.pages` are not used — awesome-pages infers child order from the directory. `not_in_nav` hides `reading.md` and `boards/**`. Catalog lives under `docs/components/css/` and `docs/components/javascript/`. CSS is four layers: `core/` (colors including gradients, typography, effects, alert cascade), `structure/`, `atoms/`, `heavies/`. JavaScript mirrors a leaf only when that family has a hook; `NERV.init` / `setState` / `injectScanlines` live on the JavaScript section home. Dual families have a page in both trees. Nested `.pages` are not used. `docs/stylesheets/` and `docs/javascripts/` remain asset dirs, not documentation. Swatch boards are static HTML in `docs/boards/` — `extra_css` is not injected into them. Dual-load of `nerv.css` / `nerv.js` is [`scripts/resolve-docs-assets.mjs`](../scripts/resolve-docs-assets.mjs): `--mode local` copies `dist/`, `--mode cdn` writes jsDelivr stand-ins.
- **Installable skill** — `skills/nerv/SKILL.md` is the product skill for `npx skills add`. It does not carry a docs tree yet; the catalog is `docs/` only. `.cursor/skills/` is this repo's Niko bootstrap, not the published skill.

## Build Tools

- **Dart Sass** — SCSS compilation. Configured via npm scripts in `package.json`.
- `npm run build` — compiles `src/nerv.scss` → `dist/nerv.css`
- `npm run build:min` — compressed output to `dist/nerv.min.css`
- `npm run watch` — file watcher for development
- `nerv.js` is vanilla JS — copied to `dist/` without compilation
- `dist/` is gitignored. CI builds it before `npm publish` and before attaching `dist/nerv.css` / `dist/nerv.js` to the GitHub Release. Release automation is `.github/workflows/release-please.yaml` (npm trusted publisher matches that filename; GitHub environment `npmjs.org`).
- `npm run build:offline` — builds `dist/nervouscsstem-offline.zip`, a GitHub Release asset that never enters the npm tarball, via `scripts/build-offline-bundle.mjs`. Font bytes come only from exact-pinned `@fontsource*` devDependencies: each face maps by `unicode-range` equality, and a gstatic `/vNN/` must equal the package's `metadata.json` `version`, else the build fails. `fflate` writes the zip with a fixed local-field mtime so bytes are reproducible. Re-pinning rules: `docs/service-manual.md` "Offline bundle fonts". Built by the release job before `npm publish` and by the PR docs build.
- Docs site: `npm run docs:serve` / `docs:build` (both compile `dist/` first). PR builds use local mode; the `publish-pages` job on `release-please.yaml` uses CDN mode after `publish-npm`.

## Testing Process

Visual verification against reference HTML pages in `ref/`. Each page (`ref-foundation.html` through `ref-alert-cascade.html`) tests a cumulative subset of the design system's layers.

Automated checks via Node.js built-in test runner (`node --test`) in `test/`. Stylelint enforces `.nerv-` prefix convention and is configured in `.stylelintrc.json`. Test and lint commands are defined in `package.json`. The npm tarball must contain `dist/nerv.css` and `dist/nerv.js` from `dist/` and not other dist artifacts; that contract is `test/publish-contract.test.mjs`. The docs local-vs-CDN load path and PyPI-only `uv.lock` hosts are `test/docs-assets.test.mjs`. Skill identity, version lockstep, no LFS in the skill, and `skills/` excluded from the npm pack are `test/skill-contract.test.mjs`. What the offline zip ships (no remote fetch, local URLs resolve, CSS unchanged except URLs, manifest hashes, OFL texts and notices, reproducible bytes) and the generator's refusal cases are `test/offline-bundle.test.mjs`.

## Design System

**Font stack**: Shippori Mincho B1 (display), Barlow Condensed (HUD), Antonio (cartouche), IBM Plex Mono (monospace), DSEG7 Classic (seven-segment), VT323 (DOS/BIOS boot screen). All OFL-licensed, loaded via CDN by default; the offline zip bundles them locally. `NERV Mixed` (Barlow Condensed + Shippori, unicode-range) handles general JP/EN HUD text; `NERV Cartouche` (Antonio + Shippori, unicode-range) handles cartouche-specific text.

**Key constraints**: No image files, no `<canvas>`, no WebGL. All `.nerv-` prefixed selectors. `prefers-reduced-motion` and `prefers-contrast` respected.
