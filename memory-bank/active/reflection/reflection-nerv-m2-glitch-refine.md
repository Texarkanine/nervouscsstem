---
task_id: nerv-m2-glitch-refine
date: 2026-03-18
complexity_level: 2
---

# Reflection: M2 — Refine Glitch Effect

## Summary

Refined the `.nerv-glitch` animation to produce sharp, broken-feeling discontinuous jumps by increasing transform magnitudes and reducing keyframe density. Clean execution — all 182 tests pass, no issues found in QA.

## Requirements vs Outcome

All requirements delivered as specified. Translate magnitudes increased from max 5px to 8-14px, skew magnitudes from max 4deg to 6-10deg, intermediate keyframe stops reduced from 5/6 to 3/4, step counts adjusted from 5/7 to 3/5 (coprime preserved). No requirements dropped, descoped, or added.

## Plan Accuracy

Plan was accurate. File list, step sequence, and scope all correct. The identified challenges (magnitude calibration, step-count alignment) were non-issues — values were chosen within safe bounds on the first attempt. No reordering, splitting, or additional steps needed.

## Build & QA Observations

TDD worked well for calibration work. The 4 failing tests confirmed the exact before-state values (max translate 5px, max skew 4deg, 5 intermediate stops top, 6 bottom), which validated that the test assertions were correctly calibrated before implementation. QA was fully clean.

## Insights

### Technical
- `steps()` alone doesn't sell discontinuity — it's the combination of stepped timing, large magnitude deltas between keyframes, and sparse stop placement that creates the broken feel. Many small steps with tiny deltas reads as smooth even with discrete timing. This "magnitude × sparsity" principle applies to any CSS animation aiming for a glitchy aesthetic.

### Process
- Nothing notable.

### Million-Dollar Question

If sharp discontinuous jumps had been a foundational assumption, the keyframes would have been designed with fewer, higher-impact stops from the start. The current solution is essentially that — the refinement was pure calibration, not restructuring. No alternative architecture would emerge.
