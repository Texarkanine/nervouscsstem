---
task_id: nerv-v01-m3-offline-bundle-feasibility
date: 2026-09-12
complexity_level: 2
---

# Reflection: nerv-v01-m3-offline-bundle-feasibility

## Summary

M3 wrote a feasibility note, then the operator moved that investigation to GitHub issue #7 and deleted `planning/offline-bundle.md` so the ship request has one home. All six typefaces the CSS loads are OFL-1.1; an offline zip next to AGPL JS is legally feasible and is not a 0.1 ship. It succeeded.

## Requirements vs Outcome

Parent-brief requirement 7, acceptance criterion 7, and constraint 3 are met. The investigation inventories live `@font-face` URLs, records licenses, and says do not vendor in 0.1. After reflect, the operator moved that text to issue #7 (the ship request) and deleted the planning copy as redundant. Nothing from M4/M5 leaked in. No requirement was dropped.

## Plan Accuracy

The plan's file, inventory rule, and "no tests / no CSS edits" sequence were right. Build followed it without reordering. The challenges that mattered were the ones already written: stale PHASE1 table, composite aliases, unloaded fallbacks. QA found no gap.

## Build & QA Observations

Build was a license read plus one markdown file. QA passed with no findings: 22 URLs matched the note, scope stayed on that file, suite 357/357. Pre-existing stylelint errors on `dist/nerv.css` were left alone.

## Insights

### Technical

- `planning/PHASE1.md` is not a font inventory. Antonio and VT323 are in the CSS and not in that table. Future font work starts at `_typography.scss` `@font-face` `src`.

### Process

- Nothing notable. This milestone was planned as prose on the first try.

### Million-Dollar Question

A GitHub issue is the right home once the answer is "yes, later." A second copy in `planning/` that says "this milestone stops here" would fight whoever picks up the ship. Putting OFL text in the repo without the fonts would still pretend we had a bundle.
