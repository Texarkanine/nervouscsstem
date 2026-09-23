# Task: Wave point labels (rework of sine-wave-graph, PR #18)

* Task ID: sine-wave-graph (rework: point labels)
* Complexity: Level 2
* Type: simple enhancement

A `.nerv-wave-point-label` child of `.nerv-wave-point` shows plain DOM text beside its dot: right by default, left with `.nerv-wave-point-label-left`, on both orientations. The point's position is hoisted into two derived custom properties, `--nerv-wave-point-x` / `--nerv-wave-point-y` (container units of the wave box). The point's `left`/`top` and the label's box-clamp both read them, so there is one position formula. The label's `translate` is `clamp()`ed so it never leaves the clipped box. At swing extremes it slides inward and may cross its dot. Labels on different waves may overlap; no collision avoidance (design norm). Plus PR screenshots on an orphan `pr-assets` branch.

Pre-plan proof (`/tmp/nerv-wave-proto/label.{html,mjs}`, Chromium + Firefox): 210 samples per engine, label box never outside the graph box (≤0.02px); unclamped labels sit beside their dot on the requested side, vertically centered to 0.00px. `clamp()` with self-percentages inside `translate` works in both engines.

## Test Plan (TDD)

### Behaviors to Verify

- L1 One position source: horizontal and vertical `.nerv-wave-point` set `left: var(--nerv-wave-point-x)` and `top: var(--nerv-wave-point-y)`. The horizontal point defines `--nerv-wave-point-y` with `sin(` (x from `--nerv-wave-point-at`); the vertical point defines `--nerv-wave-point-x` with `sin(` (y from `--nerv-wave-point-at`).
- L2 Label anchors at the dot center: `.nerv-wave-point-label` is `position: absolute`, `left: 50%`, `top: 50%`, `white-space: nowrap`, and its color is `var(--nerv-wave-color)`.
- L3 Label stays in the box: its `translate` clamps on x against `--nerv-wave-point-x` and `100cqw`, and on y against `--nerv-wave-point-y` and `100cqh`.
- L4 Placement: the default preferred x offset is positive (half the point size plus `--nerv-wave-point-label-gap`). `.nerv-wave-point-label-left` subtracts `100%` (its own width) for the left side.
- L5 No second formula: label rules never reference `sin(`, `--nerv-wave-t`, or `--nerv-wave-point-at`.
- L6 `--nerv-wave-point-label-gap` has a default on `.nerv-wave-graph` (inherits like the other defaults).
- L7 High contrast: the `prefers-contrast: more` block gives `.nerv-wave-point-label` a `--nerv-bg` halo so text separates from crossing lines.
- Existing tests to modify: the tile/point scale test (point multiplier is now `50cqh` / `50cqw` inside `--nerv-wave-point-y` / `--nerv-wave-point-x`); the "same clock" test (sin() lives in the custom property); the vertical axis-swap test.
- Edge cases (browser harness, not static tests): labels at `point-at` near 0 or 1, left label at a vertical graph's leftmost swing, amplitude near 1; reduced motion (labels static beside dots); critical state (label color follows an uncolored wave to red).

### Test Infrastructure

- Framework: `node:test` via `npm test` (explicit file list).
- Test location: `test/wave-graph.test.mjs` (existing; helpers `rule`, `media`, `braced`).
- Conventions: assertions on compiled `dist/nerv.css`.
- New test files: none.

## Implementation Plan

### 1. Label CSS — executable ✅

- Files: `test/wave-graph.test.mjs`, `src/_wave-graph.scss`

1. Stub tests: add a `Wave graph — point labels` describe with empty L1–L7 cases.
2. Stub interface: header doc comment in `_wave-graph.scss` gains `.nerv-wave-point-label`, `.nerv-wave-point-label-left`, `--nerv-wave-point-label-gap`, and internal `--nerv-wave-point-x` / `-y`.
3. Write tests and run red: implement L1–L7; modify the three existing tests to read the custom-property declarations; run `node --test test/wave-graph.test.mjs` → new ones red.
4. Write code and run green:
   - `.nerv-wave-graph`: `--nerv-wave-point-label-gap: 0.35rem`.
   - `.nerv-wave-point`: define `--nerv-wave-point-x` / `-y` (cq units, `$_phase-turns`); `left`/`top` read them. Vertical override redefines x/y only.
   - `.nerv-wave-point-label` + `-left`: absolute at the dot center, nowrap, wave color, font-size 0.7rem, clamped `translate`.
   - Contrast block: label `text-shadow` halo in `--nerv-bg`.
   - Full `npm test`, `npm run lint` (10 pre-existing expected).

### 2. Docs and fixture — prose/policy ✅

- Files: `docs/components/css/heavies/wave-graph.md`, `ref/ref-patterns.html`
- No tests: prose/policy artifact

1. New "Point labels" example (horizontal, right and left labels on two waves) with Spec: plain text a page script may rewrite, right default / `-left`, clamping at the edges (label slides inward and may cross its dot), overlap intended.
2. Vertical example gains a left and a right label.
3. Ref fixture: labels on the sync graph, the vertical graph, and the critical twin.
4. `npm run docs:build` strict.

### 3. Browser verification — executable (harness, not shipped) ✅

1. Re-run `verify.mjs` (point-on-line; labels must not change point accuracy) and a label harness against the built CSS and the docs page: labels inside the box, beside dots when unclamped, both engines, reduced motion.

### 4. PR screenshots — prose/policy ✅ (steps 1–2; PR body edit at finish)

- No tests: prose/policy artifact

1. Capture: sync graph; labels L/R horizontal; labels L/R vertical; critical speed; high contrast; a short looping GIF (ffmpeg, <3 MB) of the labeled graph.
2. Temporary clone under `/tmp`, orphan branch `pr-assets` (reuse if it exists), files under `pr-18/`, push. `curl` each raw URL: 200 + `image/*`.
3. Update the PR #18 body: Screenshots section, label API in "What's here" / "What changes for a user".

## Technology Validation

No new technology. `clamp()` with self-percentages in `translate` proven in Chromium 1243 and Firefox 1543 (above). ffmpeg exists at `~/.local/bin/ffmpeg` (tooling only, not shipped).

## Dependencies

- The existing one-clock design (`--nerv-wave-t`, `$_phase-turns`).
- `gh` auth for the PR edit; push rights to create `pr-assets`.

## Challenges & Mitigations

- The hoisted custom properties change point geometry expressions: re-run the point-on-line harness to prove no regression.
- The label's `translate` is inside a filtered parent (glow): text glows like the dot; fine, matches the component look.
- The label is wider than the box: `clamp()` resolves to its minimum, so the label pins to the left edge. Documented as a limit.
- `raw.githubusercontent.com` caching: verify with curl after push; content-type should be `image/png` / `image/gif`.

## Pre-Mortem

- Labels look pasted-on, not NERV: use HUD type (`.nerv-type-hud` in docs), the wave color and its glow; review screenshots before publishing.
- Dot crossing its label at extremes reads as a bug: document it as intended and show it in the vertical example; the human asked for readability over strict side-keeping.
- The GIF balloons past 3 MB: small crop, 12 fps, palette; fall back to stills.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Pre-Mortem complete
- [x] Preflight
- [x] Build
- [x] QA — FAIL (Build rerun, docs only)
- [x] QA (rerun) — PASS

## QA Results (rerun)

- PASS. The wide-label limit is now documented in the docs Spec and the SCSS header, and the wording matches the code: the x clamp's minimum is the box's left edge, and `clamp()` lets the minimum win. Example and fixture `aria-label`s name their labels.
- Advisory: the rule comment above `.nerv-wave-point-label` still says "stays inside the wave box" with no wide-label caveat. The file header has the caveat.
- Advisory: the PR #18 body screenshots (acceptance criterion 4) are still pending. The plan schedules them after Reflect.
- QA reran the checks: `npm test` 399/399; strict docs build green; lint shows only the 10 pre-existing errors.

## QA Results (first run)

- Blocking: the wide-label limit is not documented. The plan says it would be documented, but the docs Spec and the `_wave-graph.scss` header both claim the label never leaves the box. A label wider than the box pins to the left edge and is cut off on the right. Fix: add one clause in each place.
- Advisory: the alert example's `aria-label` does not name its SYNC label. The `ref/ref-patterns.html` aria-labels do not mention labels, and the vertical graph's still says "plotted points".
- Advisory: `-left` repeats the clearance term. Accepted, because removing it would need a third internal property.
- QA reran the checks: `npm test` 399/399; strict docs build green; lint shows only the 10 pre-existing errors.
