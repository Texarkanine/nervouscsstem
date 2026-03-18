---
task_id: nerv-phase6-states
complexity_level: 3
date: 2026-03-17
status: completed
---

# TASK ARCHIVE: Phase 6 — Alert State Cascade & Integration

## SUMMARY

Implemented the capstone alert state cascade: five escalation states (Nominal → Active → Caution → Alert → Critical) controlled by a single root class change, with token overrides and progressive visual effects across the design system. Delivered new `_states.scss` module, `NERV.setState()` JS API, retrofitted 10 existing modules to use `--nerv-primary`, auto-generated divider and grid-marks color variants, and added `ref-alert-cascade.html`. All 175 tests pass; build and lint clean.

## REQUIREMENTS

- **SCSS `_states.scss`**: Five state classes (`.nerv-state-nominal` … `.nerv-state-critical`) overriding `--nerv-primary`, `--nerv-bg`, `--nerv-animation-speed`, `--nerv-glow-spread`, `--nerv-scanline-opacity`. State-specific effects: Active+ data flicker, Alert+ status blink and red edge bleed, Critical glitch and screen flash.
- **JavaScript**: `NERV.setState(state)` to switch root state class; orchestration only, visuals from CSS.
- **Reference page**: `ref/ref-alert-cascade.html` with five state buttons calling `NERV.setState()`; Phase 1–5 components respond to state.
- **Retrofit audit**: Ambiance-driven properties use `--nerv-primary`; data-driven keep named tokens; animation durations use `--nerv-animation-speed`.
- **Entry point**: `nerv.scss` forwards `states` last.
- **Accessibility**: `prefers-reduced-motion` suppresses animations in state selectors.

## IMPLEMENTATION

**Approach:** TDD in 10 steps: stub tests and module → retrofit verification tests → retrofit 10 modules → (Step 4: update existing tests — no-op, no changes needed) → state class tests → implement `_states.scss` and add to `nerv.scss` → JS API tests → implement `NERV.setState()` → reference page → full regression.

**Key files:**

- **`src/_states.scss`** (new): `$_state-order` list, `at-state($min-state)` mixin generating cumulative selectors (Active+, Alert+, etc.), five `.nerv-state-*` token blocks, compound selectors for flicker/blink/glitch/edge-bleed, per-state grid marks via `@use 'grid-marks'` + mixin calls, `@keyframes nerv-screen-flash`, `prefers-reduced-motion` overrides.
- **`src/nerv.scss`**: Added `@forward 'states';` last.
- **`src/nerv.js`**: `ALERT_STATES` array, `setState(state)` — strip `.nerv-state-*`, apply new class, force reflow, inject screen-flash overlay on Critical.
- **Retrofitted (10):** `_glow.scss`, `_scanlines.scss`, `_panels.scss`, `_dividers.scss`, `_grid-marks.scss`, `_stripe-bar.scss`, `_hex-grid.scss`, `_segment-display.scss`, `_magi-panel.scss`, `_bar-meter.scss` — ambiance props switched to `--nerv-primary`/`--nerv-primary-rgb`. `_dividers.scss` and `_grid-marks.scss` gained `@each` over `$nerv-colors` for `.nerv-divider-{name}` and `.nerv-grid-marks-{name}`; grid marks default changed from cyan to white/bone.
- **`ref/ref-alert-cascade.html`**: Themed viewport with grid-marks background, zones (MAGI, bar meters, hex grid, status text, stripes); control row with state buttons. "AT FIELD WEAKENING" uses nested `<span class="nerv-glitch">` inside `.nerv-status-text` for correct glitch alignment.
- **`test/states.test.mjs`**: 37 behaviors (state classes, token overrides, compound selectors, retrofit, variants, JS API, grid marks, data preservation, regression). `package.json` test script updated with `--test-concurrency=1` to avoid build race when multiple test files run.

**Design decisions (from plan, no creative phase):** Grid marks default white/bone; state grid marks via mixin in state selectors; glitch stays cyan/red; bar meter fills data-driven; screen flash via JS overlay; short UI transitions not scaled by `--nerv-animation-speed`.

## TESTING

- **Unit/regression:** `npm test` — 175 tests (foundation, effects, panels, patterns, components, states). States suite asserts state class existence, token overrides, compound selectors, retrofit usage of `--nerv-primary`, variant generation, `NERV.setState` API, state-specific grid marks, data-driven token preservation, Phase 1–5 regression.
- **Build/lint:** `npm run build`, `npm run lint` — clean.
- **QA (`/niko-qa`):** PASS. Two trivial fixes: stale doc comments in six retrofitted modules (token names), and `nerv.scss` header comment missing `states` in dependency list.

## LESSONS LEARNED

- **SVG data URIs** in CSS cannot use custom properties; grid marks need mixin calls inside state selectors to regenerate SVG per state (~5 copies in output). Fine for few states; would need another approach if many.
- **Compiled CSS order:** Nested selectors (e.g. `.nerv-bar-meter-vertical .nerv-bar-meter-bar[data-zone]::after`) can appear before standalone ones; tests using `indexOf` should use line-start anchoring (e.g. `\n` in regex) to target the right block.
- **`.nerv-glitch`** assumes a zero-padding host. Its `::before`/`::after` use full-size + `clip-path` percentages; on padded elements (e.g. `.nerv-status-text`) alignment and clip regions break. Use composition: put `.nerv-glitch` on an inner `<span>` inside the padded container.
- **Contract-based tests** (structure, not token names) stayed valid through the 10-module retrofit; keep testing the contract, not implementation.
- **Test concurrency:** Multiple test files each running `npm run build` in `before()` caused race and flaky failures; `--test-concurrency=1` fixed it. Prefer a single shared build before all test files long-term.

## PROCESS IMPROVEMENTS

- Preflight’s cumulative “Active+” selector correction fed directly into `at-state()` mixin and avoided rework in build.
- Step 4 (update existing tests) was a no-op; plan’s “test breakage” mitigation was unnecessary because existing tests were already contract-based.
- Consider a single pre-build step for the test suite instead of per-file builds to reduce run time and avoid concurrency workarounds.

## TECHNICAL IMPROVEMENTS

- None beyond the lessons above. Optional: document `.nerv-glitch` composition requirement in `_glitch.scss` or system patterns for future consumers.

## NEXT STEPS

None. Optional follow-ups: add `.nerv-critical-only` (or similar) utility to show/hide elements in Critical state; add optional `--nerv-glitch-duration` override in `.nerv-state-critical` if faster glitch in Critical is desired.
