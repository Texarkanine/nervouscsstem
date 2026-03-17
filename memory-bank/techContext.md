# Tech Context

Pure-CSS design system with minimal vanilla JS orchestration. SCSS (Dart Sass) is the authoring format; the output is a single compiled `nerv.css` file.

## Environment Setup

- Node.js required (for Dart Sass via npm)
- `npm install` to fetch the `sass` dev dependency
- No other tooling or frameworks

## Build Tools

- **Dart Sass** — SCSS compilation. Configured via npm scripts in `package.json`.
- `npm run build` — compiles `src/nerv.scss` → `dist/nerv.css`
- `npm run build:min` — compressed output to `dist/nerv.min.css`
- `npm run watch` — file watcher for development
- `nerv.js` is vanilla JS — copied to `dist/` without compilation

## Testing Process

Visual verification against reference HTML pages in `ref/`. Each page (`ref-foundation.html` through `ref-alert-cascade.html`) tests a cumulative subset of the design system's layers.

Automated checks via Node.js built-in test runner (`node --test`) in `test/`. Stylelint enforces `.nerv-` prefix convention and is configured in `.stylelintrc.json`. Test and lint commands are defined in `package.json`.

## Design System

The design system specification lives in `planning/VISION.md`. Phase plans in `planning/PHASE1.md` through `planning/PHASE6.md` decompose the vision into implementable milestones.

**Font stack**: Shippori Mincho B1 (display), Barlow Condensed (HUD), IBM Plex Mono (monospace), DSEG7 Classic (seven-segment). All OFL-licensed, loaded via CDN by default.

**Key constraints**: No image files, no `<canvas>`, no WebGL. All `.nerv-` prefixed selectors. `prefers-reduced-motion` and `prefers-contrast` respected.
