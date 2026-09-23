# Active Context

## Current Task: sine-wave-graph (issue #8)
**Phase:** QA - COMPLETE (FAIL)

## What Was Done
- Operator gate decisions (pre-authorized by the orchestrating operator): creative results accepted at high confidence; ref fixture in `ref/ref-patterns.html`; support floor Chrome 120 / Firefox 128 / Safari 16.4. Preflight advisories: reference still copied from `docs/img/3RBI9q8.png`; separate test file kept; catalog links existing waveform docs; alert "desync" token deferred as a follow-up idea.
- Built to plan (implementation commit `badf035`):
    - `src/_wave-graph.scss` (new), `src/nerv.scss` (forward after radar), `src/_tokens.scss` (`--nerv-wave-duration: 1s`).
    - `test/wave-graph.test.mjs` (19 tests, new) registered in `package.json`.
    - `docs/components/css/heavies/wave-graph.md` (new), `docs/img/wave-graph.png` (LFS copy), `docs/components/css/index.md` (Heavies blurb).
    - `ref/ref-patterns.html`: wave-graph section (sync graph + points, vertical, critical-speed twin).
- Build-time decisions not in the creative docs:
    - Defaults live on `.nerv-wave-graph` and inherit, so one declaration on the box configures every wave (color modifiers work on the box too).
    - `.nerv-wave-graph-vertical` defaults to a portrait `10 / 16` ratio.
    - Mask tile floor raised to `6px` so a zero-amplitude wave with the heavy contrast stroke doesn't clip.
    - Contrast stroke 3.5 (default 2).
- Verification:
    - `npm test` 392/392; `npm run docs:build` (strict) passes; `npm run lint` shows 10 pre-existing errors in radar/cartouche/typography output, none in the new rules (CI does not run lint).
    - Browser harness on built `dist/nerv.css` (Chromium 1243, Firefox 1543): point-to-stroke perpendicular distance worst 0.35px / 0.56px (cross-axis 0.61 / 1.78px on steep slopes: Firefox snaps mask position to whole pixels); periods exact incl. 3× under `nerv-state-critical`; reduced motion stops all wave animations with points on the line (≤0.39px).
    - Docs page screenshotted in both engines in normal, reduced-motion, and high-contrast modes; no page errors.

## Next Step
- QA in a subagent.
