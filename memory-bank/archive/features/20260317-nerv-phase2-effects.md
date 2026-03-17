---
task_id: nerv-phase2-effects
complexity_level: 2
date: 2026-03-17
status: completed
---

# TASK ARCHIVE: NERV Design System — Phase 2: Effects Layer

## SUMMARY

Implemented the Effects Layer (Phase 2) of the NERV Design System: three SCSS partials (`_scanlines.scss`, `_flicker.scss`, `_glitch.scss`) providing CRT atmospheric effects — scanline overlay with vignette, staccato flicker animations, and digital glitch text corruption. All 10 acceptance criteria delivered. 35 total tests pass (20 new + 15 Phase 1), Stylelint clean, build succeeds. User-requested rework incorporated stagger-index animation delays, DRY reference pages, glitch speed tokenization, and glitch phase-drift between slices.

## REQUIREMENTS

- Create `_scanlines.scss` with scanline overlay, vignette, and scrolling bright band via CSS gradients and keyframes
- Create `_flicker.scss` with four staccato animation classes (`.nerv-flicker`, `.nerv-flicker-fast`, `.nerv-flicker-staccato`, `.nerv-blink`) using `steps()` timing
- Create `_glitch.scss` with `.nerv-glitch` effect via `::before`/`::after` pseudo-elements, `clip-path`, and `data-text` attribute contract
- Forward all three from `nerv.scss`; create `ref/ref-effects.html` reference page
- All durations token-driven (`--nerv-flicker-duration`, `--nerv-glitch-duration`, `--nerv-animation-speed`)
- `prefers-reduced-motion` suppresses all animations; `pointer-events: none` on scanline overlay
- All selectors use `.nerv-` prefix; no modifications to Phase 1 modules beyond `@forward` lines

## IMPLEMENTATION

### Files created
- `src/_scanlines.scss` — full-viewport overlay with `position: fixed`, `z-index: 9999`, `repeating-linear-gradient` scanlines, `radial-gradient` vignette, `::after` scrolling bright band (`@keyframes nerv-scanline-band`), opacity via `--nerv-scanline-opacity`
- `src/_flicker.scss` — four `@keyframes`, four classes with `steps()` timing and `calc()` token-driven durations, `--nerv-stagger-index` custom property for animation-delay with `:nth-child()` auto-defaults
- `src/_glitch.scss` — `clip-path` polygon slices on `::before`/`::after`, chromatic aberration via `--nerv-cyan` / `--nerv-red`, coprime durations (1x / 1.7x) and step counts (5 / 7) for phase-drift between top and bottom slices
- `ref/ref-effects.html` — effects-only reference page with distinct backdrop content (Japanese locale text, LCL telemetry data, segment timer) for scanline visibility; flicker, glitch, and alert-state demos
- `test/effects.test.mjs` — 20 test cases covering class existence, gradients, keyframes, token usage, stagger-index, glitch-duration, pointer-events, and reduced-motion suppression

### Files modified
- `src/nerv.scss` — added three `@forward` lines
- `src/_tokens.scss` — added `--nerv-glitch-duration: 0.4s` utility token
- `package.json` — test script updated to include `test/effects.test.mjs`
- `.stylelintrc.json` — disabled `color-function-notation` and `alpha-value-notation` (Dart Sass legacy output)
- `test/foundation.test.mjs` — added `glitch-duration` to utility token verification list

### Key design decisions
- `prefers-reduced-motion` blocks co-located inline with each module (not centralized)
- Scanline band is `::after` pseudo-element (not separate class), resolving spec ambiguity
- Glitch slices use coprime-ish duration multipliers (1.0x, 1.7x) and step counts (5, 7) so they phase-drift and never fully sync
- `--nerv-stagger-index` with `:nth-child()` defaults provides zero-config desynchronization for grouped flicker elements; consumers can override per-element

## TESTING

- **TDD approach**: all tests written and verified as failing before implementation
- **35/35 tests pass** (20 effects + 15 foundation), no regressions
- **Stylelint clean**: `npm run lint` exits 0
- **Build verification**: `npm run build` and `npm run build:min` both succeed
- **QA phase**: semantic review against KISS, DRY, YAGNI, Completeness, Regression, Integrity, Documentation — caught 1 trivial issue (`.nerv-blink` hardcoded `1s` → fixed to use token)

## LESSONS LEARNED

- **Dart Sass color normalization**: Dart Sass consistently outputs legacy `rgba()` regardless of source syntax. The `color-function-notation` and `alpha-value-notation` Stylelint disables are a permanent fixture — don't fight Sass's output normalization.
- **Token every tunable animation**: any animation whose speed a consumer might want to adjust needs its own `--nerv-*-duration` token. The glitch speed gap was caught during rework; future phases should front-load this.
- **Phase-drift via coprime values**: for multi-element animations that should look organic, use coprime duration multipliers and step counts so they never visually sync. More effective than random delays.
- **DRY reference pages**: each `ref-*.html` should only show its own layer's features. Where backdrop content is needed (e.g., scanlines need text underneath), use distinct content — never copy prior pages.

## PROCESS IMPROVEMENTS

- The preflight advisory about `--nerv-stagger-index` was validated by user feedback — preflight advisories should be given more weight in planning, potentially promoted to implementation items unless explicitly deferred.
- Rework items were cleanly scoped and testable, suggesting the QA→Reflect→Rework→Archive flow works well for L2 tasks when user feedback arrives post-reflect.

## TECHNICAL IMPROVEMENTS

- Consider adding `--nerv-stagger-index` documentation to a future consumer-facing API reference, since it's a public custom property consumers can set.
- The `$nerv-animations` map pattern (parallel to `$nerv-colors`) remains a potential future optimization if Phase 6 introduces per-state animation overrides — premature now but worth revisiting then.

## NEXT STEPS

- Phase 3 — Structural Layer: `_panels.scss`, `_dividers.scss`, `_grid-marks.scss`, `ref-panels.html` (estimated L3)
