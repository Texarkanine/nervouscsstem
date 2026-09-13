# Active Context

## Current Task: nerv-v01-m4-properdocs-dual-load-site
**Phase:** QA - COMPLETE (PASS)

## What Was Done

- Dual-load resolver with `node:test` fixtures: local copy-or-throw, CDN jsDelivr stand-ins, no `ref/`/`src/` writes
- ProperDocs + Material site from `docs/`; Using pages CSS, Panels, Bar meters
- PR docs workflow (local mode) and `publish-pages` job after `publish-npm` (CDN mode, job-scoped `pages: write`)
- README Pages URL; surgical `techContext.md` pointer

## Files created or modified

- `scripts/resolve-docs-assets.mjs`, `test/docs-assets.test.mjs`, `.gitignore`, `package.json`
- `pyproject.toml`, `uv.lock`, `properdocs.yml`
- `docs/index.md`, `docs/css.md`, `docs/components/panels.md`, `docs/components/bar-meters.md`, `docs/stylesheets/docs-islands.css`, `docs/javascripts/docs-init.js`, `docs/service-manual.md`
- `.github/workflows/docs.yaml`, `.github/workflows/reusable-docs-build.yml`, `.github/workflows/release-please.yaml`
- `README.md`, `memory-bank/techContext.md`

## Key implementation decisions

- CDN `nerv.js` inserts a jsDelivr script and fires `nerv-docs:ready`; `docs-init.js` boots on `window.NERV` or that event so deferred `extra_javascript` still inits bar meters
- `docs-init.js` never calls `NERV.init` or `injectScanlines`
- `setup-uv@v10.0.1` (immutable tag; moving majors were removed)

## Deviations from Plan

- `docs-init.js` waits for `window.NERV` instead of assuming a blocking load at `DOMContentLoaded`. Required for CDN stand-ins under Material's deferred `extra_javascript`.

## Integration test results

- `npm test`: 364 passed (7 new)
- `uv run properdocs build --strict`: pass in local and CDN modes
- `npm run lint`: 7 errors in existing `dist/nerv.css` (Antonio quotes, zero-length units); `src/` not touched this milestone
- Browser: CSS and Panels islands CSS-only; bar meters 120 bars / 66 active; no `.nerv-scanlines`

## Next Step

- QA review
