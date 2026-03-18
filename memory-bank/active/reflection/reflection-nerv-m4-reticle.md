---
task_id: nerv-m4-reticle
date: 2026-03-18
complexity_level: 2
---

# Reflection: M4 — Reticle Tickmarks

## Summary

Added CSS-based measurement-ruler tickmarks along container edges via 6 utility classes and auto-generated color variants. Clean execution — plan accurate, build smooth, QA caught one trivial comment fix.

## Requirements vs Outcome

All requirements met exactly as planned. No gaps, no descoping, no additions. 6 utility classes, 9 color variants, 4 custom properties, prefers-contrast support, 9 tests, ref page demos.

## Plan Accuracy

Plan was correct in every detail. No steps needed reordering, splitting, or adding. The background-image override challenge documented in the plan didn't materialize as an issue. Preflight's observation that no `_states.scss` overrides are needed (gradient `var()` auto-follows cascade) proved correct.

## Build & QA Observations

TDD red-green cycle worked cleanly — all 8 new tests went red on first run, then green after implementation. QA found one trivial fix: `nerv.scss` header comment was stale (missing `reticle` in the dependency chain listing). No substantive issues.

## Insights

### Technical
`repeating-linear-gradient` with `var()` references is superior to SVG data URIs for components that need to follow the alert cascade. Grid-marks (`_grid-marks.scss`) uses SVG data URIs and requires per-state SCSS mixin calls in `_states.scss` because SVG can't reference CSS custom properties. Reticle avoids this entirely — the gradient naturally inherits `--nerv-primary` shifts through the cascade. Future components with simple repeating patterns should prefer CSS gradients over SVG data URIs when alert-state responsiveness is desired.

### Process
Nothing notable — clean execution.

### Million-Dollar Question

If reticle had been a foundational assumption, the structural layer might have unified grid-marks and reticle into a single "measurement overlay" system with shared tokens. But the different rendering techniques (SVG for complex shapes, CSS gradient for simple lines) make separate components the right separation of concerns. The current design is close to optimal.
