---
task_id: sine-wave-graph (rework: point labels)
date: 2026-09-23
complexity_level: 2
---

# Reflection: Wave Point Labels

## Summary

Added `.nerv-wave-point-label` (right by default, `-left` modifier) on both orientations. The label reads its dot's hoisted `--nerv-wave-point-x/-y` and clamps its `translate` to the box. PR #18 now shows screenshots and a GIF hosted on an orphan `pr-assets` branch. It succeeded: labels never left the box (≤0.02px) in Chromium or Firefox, and dot accuracy was unchanged.

## Requirements vs Outcome

All rework requirements are met: plain DOM text, left/right on both orientations, one position source, in-box clamping proven in a browser, no collision avoidance (norm recorded in SumMem), and the reduced-motion, contrast, and cascade behaviors. Additions: `--nerv-wave-point-label-gap`, and a documented limit (a label wider than the box pins left and clips).

## Plan Accuracy

The plan held. Proving the clamp before planning meant build had no surprises in the CSS. Two gaps turned up. The first docs layout never actually reached an edge, so the vertical examples dropped their amplitude override to show the clamp. And the orphan-branch step as planned (a partial clone plus `checkout --orphan`) hung on lazy blob fetches; `git init` plus push replaced it.

## Build & QA Observations

TDD was smooth: 10 tests went red for the right reasons, then passed on the first compile. QA caught one real overstatement: the docs said the label "never leaves the box", but the plan's own wide-label limit made that false. Fixed with one clause in each place.

## Insights

### Technical

- Exposing a computed position as custom properties in container units (`--nerv-wave-point-x/-y`) lets dependents reason about it without copying the formula. A child can `clamp()` its `translate` with self-percentages against `100cqw` / `100cqh` to stay inside a clipped ancestor. This works in both engines.

### Process

- When a plan writes down a limit, search the docs for absolute claims ("never", "always") that the limit contradicts before QA does.
- A demo must actually exercise the edge behavior it describes; measure it (here, clamped-sample counts) rather than assume.

### Million-Dollar Question

If labels had been a foundational assumption, the point's position would have been custom properties from day one, which is exactly the shape it has now. Nothing else would change; the one-clock design absorbed labels without a second formula.
