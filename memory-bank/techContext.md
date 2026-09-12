# Tech Context

Pure-CSS design system with minimal vanilla JS orchestration. SCSS (Dart Sass) is the authoring format; the output is a single compiled `nerv.css` file.

## Environment Setup

- **Git LFS** — Reference PNGs live under `docs/img/` and `planning/selected-ref-images/` and are stored via [Git LFS](https://git-lfs.com/). After clone, run `git lfs install` once per machine; use `git lfs pull` if images are missing.
- Node.js required (for Dart Sass via npm)
- `npm install` to fetch the `sass` dev dependency
- No other tooling or frameworks

## Build Tools

- **Dart Sass** — SCSS compilation. Configured via npm scripts in `package.json`.
- `npm run build` — compiles `src/nerv.scss` → `dist/nerv.css`
- `npm run build:min` — compressed output to `dist/nerv.min.css`
- `npm run watch` — file watcher for development
- `nerv.js` is vanilla JS — copied to `dist/` without compilation
- `dist/` is gitignored. CI builds it before `npm publish` and before attaching `dist/nerv.css` / `dist/nerv.js` to the GitHub Release. Release automation is `.github/workflows/release-please.yaml` (npm trusted publisher matches that filename; GitHub environment `npmjs.org`).

## Testing Process

Visual verification against reference HTML pages in `ref/`. Each page (`ref-foundation.html` through `ref-alert-cascade.html`) tests a cumulative subset of the design system's layers.

Automated checks via Node.js built-in test runner (`node --test`) in `test/`. Stylelint enforces `.nerv-` prefix convention and is configured in `.stylelintrc.json`. Test and lint commands are defined in `package.json`. The npm tarball must contain `dist/nerv.css` and `dist/nerv.js` from `dist/` and not other dist artifacts; that contract is `test/publish-contract.test.mjs`.

## Design System

The design system specification lives in `planning/VISION.md`. Phase plans in `planning/PHASE1.md` through `planning/PHASE6.md` decompose the vision into implementable milestones.

**Font stack**: Shippori Mincho B1 (display), Barlow Condensed (HUD), Antonio (cartouche), IBM Plex Mono (monospace), DSEG7 Classic (seven-segment), VT323 (DOS/BIOS boot screen). All OFL-licensed, loaded via CDN by default. `NERV Mixed` (Barlow Condensed + Shippori, unicode-range) handles general JP/EN HUD text; `NERV Cartouche` (Antonio + Shippori, unicode-range) handles cartouche-specific text.

**Key constraints**: No image files, no `<canvas>`, no WebGL. All `.nerv-` prefixed selectors. `prefers-reduced-motion` and `prefers-contrast` respected.
