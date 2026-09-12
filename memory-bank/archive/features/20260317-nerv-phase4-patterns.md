---
task_id: nerv-phase4-patterns
complexity_level: 3
date: 2026-03-17
status: completed
---

# TASK ARCHIVE: Phase 4 — Patterns & Geometry + Initial JS

## SUMMARY

Delivered three decorative/geometric SCSS modules (`_stripe-bar.scss`, `_hex-grid.scss`, `_radar.scss`), the initial `nerv.js` orchestration module (scanline injection, hex flicker, grid labels), and the `ref-patterns.html` reference page. The core functional scope was completed as planned; the build phase expanded through iterative visual refinement driven by CRT aesthetic constraints. All 90 tests pass; build, lint, and reference page are complete. Created `planning/FUTURE.md` for backlog items (reticle tickmarks, tiled hex grid).

## REQUIREMENTS

**From project brief:**

- **SCSS modules:** `_stripe-bar.scss` (animated diagonal hazard stripes), `_hex-grid.scss` (hexagonal cell grid with state classes), `_radar.scss` (concentric circle / radar display).
- **JavaScript:** `src/nerv.js` — UMD-lite orchestration with `NERV.init()`, `NERV.injectScanlines()`, `NERV.initHexFlicker(container)`, `NERV.initGridLabels(container)`.
- **Reference page:** `ref/ref-patterns.html` showcasing all Phase 4 components with JS active.
- **Build:** Update `src/nerv.scss` to `@forward` the three new partials; copy `nerv.js` to `dist/` in build script.
- **Constraints:** `.nerv-` prefix, `prefers-reduced-motion` suppresses animations, no images/canvas/WebGL, JS orchestration only.

**Additions that emerged during build (operator feedback):**

- Barberpole stripe technique; customizable stripe size/speed; transparent stripe variant; auto-generated stripe color variants from token map; hard-stop gradients for CRT compliance.
- Hex grid: honeycomb tiling; phosphor borders with contained inset glow; `.nerv-hex-grid-spaced` and `.nerv-hex-grid-filled` as orthogonal modifiers; text content inside hex cells (clipped, centered).
- Radar: sweep direction fix; `--nerv-primary-rgb` / `--nerv-bg-rgb` for visibility.
- nerv.js: IIFE UMD-lite for classic script loading; `getComputedStyle()` fix for grid label vertical positioning when container uses CSS-positioned layout.
- Reference: DANGER/EMERGENCY alert bars, grid overlap fix, vertical stripe animation.

## IMPLEMENTATION

**Key files:**

- **New:** `src/_stripe-bar.scss`, `src/_hex-grid.scss`, `src/_radar.scss`, `src/nerv.js`, `ref/ref-patterns.html`, `test/patterns.test.mjs`.
- **Modified:** `src/_tokens.scss` (added `--nerv-stripe-duration`, `--nerv-radar-duration`, `--nerv-stripe-width`, `--nerv-primary-rgb`, `--nerv-bg-rgb`), `src/nerv.scss` (`@forward` three partials), `package.json` (build copy step, test entry).

**Approach:**

- **Stripe bar:** `repeating-linear-gradient` with `background-size: 200% 200%` and `background-position` keyframes (barberpole). Hard-stop bands for CRT. `@each` over `tokens.$nerv-colors` (glow-flagged) generates `.nerv-stripe-{name}`. `.nerv-stripe-transparent` makes dark band transparent.
- **Hex grid:** `clip-path: polygon(...)` for hex shape. `::before` = outer phosphor border; `::after` = inner fill (black backing + optional color/glow). Contained glow via `box-shadow: inset` (not `drop-shadow`, which is clipped by `clip-path`). Cell uses `isolation: isolate` and negative z-index on pseudo-elements so text content sits on top; cell has `clip-path` for text clipping. `.nerv-hex-grid-spaced` = non-overlapping rows; `.nerv-hex-grid-filled` = saturated passive/active fills (independent of spacing).
- **Radar:** `radial-gradient` hard stops for rings; pseudo-elements for division lines; `conic-gradient` sweep with fade trailing behind bright edge; `--nerv-radar-duration` and `prefers-reduced-motion` respected.
- **nerv.js:** IIFE that assigns `NERV` to `window` and supports CJS `module.exports`. `initGridLabels` uses `getComputedStyle(container).position` before setting `position: relative` so CSS-positioned containers (e.g. `position: absolute`) are not overwritten.

**Plan accuracy:** The 13-step implementation plan was correct in sequence and file list. Surprises were implicit CRT/visual requirements (hard stops, no opacity blending, contained glows) and the need for IIFE + `getComputedStyle` fix; no formal creative phase was run, so those were discovered during build.

## TESTING

- **Automated:** `npm run build && npm run test` — 90 tests across foundation, effects, panels, patterns. `test/patterns.test.mjs` covers Phase 4 tokens, stripe/hex/radar CSS, nerv.js API surface, and regression for Phase 1–3.
- **Lint:** `npm run lint` (stylelint on SCSS).
- **QA:** `/niko-qa` passed; 2 trivial fixes (nerv.scss doc comment, ref script loading).
- **Manual:** Reference page verified in browser (stripes, radar, hex grids, grid labels, DANGER/EMERGENCY bars, text in hex cells).

## LESSONS LEARNED

- **clip-path and glow:** `clip-path` clips `filter: drop-shadow()`. For contained glows inside clipped shapes, use `box-shadow: inset` on an inner element (e.g. hex cell `::after`).
- **Text above pseudo-elements:** `isolation: isolate` on the cell plus negative z-index on `::before`/`::after` lets raw text nodes sit above pseudo-element layers without wrapper spans.
- **Checking position in JS:** `element.style.position` is inline-only. Use `getComputedStyle(element).position` when the element is positioned via CSS classes.
- **Orthogonal modifiers:** Keep spacing (e.g. `.nerv-hex-grid-spaced`) and visual intensity (e.g. `.nerv-hex-grid-filled`) as separate, composable classes instead of coupling them.

## PROCESS IMPROVEMENTS

- For decorative/visual components, run a creative phase that captures aesthetic constraints (CRT rules, phosphor expectations, opacity/blending) up front; functional specs alone led to rework during build.
- Plan auto-generation from the token map (`@each` over `$nerv-colors`) for color-variant classes from the start; it was retrofitted here and proved valuable.

## TECHNICAL IMPROVEMENTS

- None beyond the above lessons; architecture (tokens, partials, UMD-lite JS) held up. Future work is tracked in `planning/FUTURE.md` (e.g. reticle tickmarks, tiled hex grid).

## NEXT STEPS

- None for this task. For future phases, see `planning/FUTURE.md`. Run `/niko` to begin the next task.
