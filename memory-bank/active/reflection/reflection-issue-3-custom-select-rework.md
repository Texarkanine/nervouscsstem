---
task_id: issue-3-custom-select
date: 2026-09-24
complexity_level: 2
---

# Reflection: Frameless Picker (PR #19 Rework)

## Summary

Added `.nerv-select-frameless` after the human asked for the open list without its "outline". Colored-option examples now render as a bare list with an opaque `--nerv-bg` behind the gaps, and the frame returns under high contrast. Succeeded: 388/388, QA PASS on the second run.

## Requirements vs Outcome

Everything in the rework scope was delivered: frameless modifier, padding 0, deliberate gap fill, option states visible, framed default, contrast decision, fallback byte-identical, TDD, docs, fixture, screenshots. The examples were chosen from side-by-side screenshots of all six ref selects. That confirmed the prediction: frameless wins for every filled-option example and loses for plain ones.

## Plan Accuracy

Accurate. The anticipated specificity trap (equal-specificity picker rules, and contrast `border-width` alone not reviving a `border: none`) was real and was handled in the plan, so the build hit no CSS surprises. The only unplanned event was a one-off wrong mirroring reading in the screenshot script (a 100ms wait after `selectOption`), which isolated probes showed was timing, not CSS.

## Build & QA Observations

The CSS change was four declarations and one contrast rule. Most of the effort was visual judgement and evidence. QA's first run failed correctly: plan step 4 (publishing screenshots to the PR) was skipped because I treated PR publication as a post-Reflect finish-line chore, while the plan listed it as a build step.

## Insights

### Technical
- Overwriting same-named images on `pr-assets` does not refresh an open PR: GitHub's image proxy caches by URL. Add a query string (`?v=2`) when re-publishing changed shots.

### Process
- If a plan lists PR artifacts (screenshots, PR body) as a build step, they are build output: publish them before QA, not at the finish line.

### Million-Dollar Question

Had "no frame" been assumed from the start, the frame would likely belong to the options' fill state rather than a class: framed when options are unfilled, bare when they carry a fill (the preflight's `:has(option[class*='nerv-option-'])` idea). The explicit modifier we built is the more honest API today: it keeps the choice with the consumer and needs no second opt-out class. Nothing to redesign.
