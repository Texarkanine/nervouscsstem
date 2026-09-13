# Active Context

## Current Task: Canonical usage guide
**Phase:** QA - COMPLETE (PASS)

## What Was Done
- Gitignore now ignores only `docs/stylesheets/nerv.css` and `docs/javascripts/nerv.js`. Chrome files were already tracked.
- Five unthemed boards in `docs/boards/` adapted from `ref/ref-*.html` (dual-load asset paths; `NERV.init` / `initCartouches` wrapped for `nerv-docs:ready`). Copied byte-identical into `site/boards/` with no Material chrome. Not in the skill.
- Dropped `nav:`. Added `navigation.indexes`, `mkdocs-awesome-pages-plugin` 2.10.1, root `docs/.pages`, `not_in_nav` for `/reading.md` and `boards/**`. Relocked PyPI-only. `npm run docs:build` passed before catalog volume and again after.
- Moved taxonomy into `visual-language/`, `css.md` → `css/index.md`, added `css/effects.md`, `js/index.md`, section homes. Skill copies match except `reading.md`.
- 19 component catalog pages (plus retuned panels/bar-meters). `docs-init.js` kinds: bar-meters, cartouches, hex, magi, radar, label-box, data-bg, ghost-segments, grid-labels. Never `NERV.init()` from Material chrome.
- Renamed 13 catalog stills under `docs/img/` so the filename names the family; taxonomy links retargeted.

## Next Step
- QA review runs automatically (`/niko-qa`).
