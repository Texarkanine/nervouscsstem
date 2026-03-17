---
task_id: nerv-phase2-effects
date: 2026-03-17
complexity_level: 2
---

# Reflection: NERV Design System — Phase 2: Effects Layer

## Summary

Implemented three SCSS effect modules (scanlines, flicker, glitch) with full accessibility support, 17 new tests, and a cumulative reference page. All requirements met; QA caught one trivial token omission.

## Requirements vs Outcome

All 10 acceptance criteria delivered exactly as specified. No requirements dropped or descoped. One unplanned change: `.stylelintrc.json` gained two rule disables (`color-function-notation`, `alpha-value-notation`) because Dart Sass normalizes modern `rgb()` to legacy `rgba()` in compiled output — a Sass output characteristic, not a code quality issue.

## Plan Accuracy

The 9-step TDD plan sequence was correct and required no reordering or splitting. The preflight finding about the scanline band being a `::after` pseudo-element (not a separate class) was applied correctly and prevented ambiguity during build. The one surprise — Stylelint color notation rules — wasn't anticipated in the plan or preflight but was a trivial config fix consistent with Phase 1's approach.

## Build & QA Observations

Build was smooth — all three SCSS modules implemented in a single pass with no iteration. The TDD approach worked well: tests written first, all 17 failed as expected, then all passed after implementation. QA caught `.nerv-blink` using a hardcoded `1s` instead of the `--nerv-flicker-duration` token — a one-line fix with clear rationale (Phase 6 cascade compatibility).

## Insights

### Technical
- Dart Sass consistently normalizes modern CSS color function syntax (`rgb()` with `/`) to legacy (`rgba()` with commas) in compiled output. The `color-function-notation` and `alpha-value-notation` Stylelint disables will carry forward to all future phases. This is worth noting in `techContext.md` if it isn't already.

### Process
- Nothing notable — L2 workflow fitted this task well. Preflight naming clarification prevented ambiguity.

### Million-Dollar Question

If CRT effects had been foundational, `_tokens.scss` might have included a `$nerv-animations` map (parallel to `$nerv-colors`) mapping effect names to base durations, step counts, and reduced-motion behavior, enabling `@each`-driven class generation in `_flicker.scss`. With only 4 classes and distinct keyframes each, the direct approach is simpler and more readable. The map pattern would only pay off if Phase 6's alert cascade introduces per-state animation overrides — worth revisiting then, but premature now.
