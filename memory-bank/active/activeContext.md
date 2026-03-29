# Active Context

## Current Task
M5: List Nesting Overhaul (Rework) — fix two visual bugs: indented-mode parent→child spacing, rotated-nesting horizontal alignment

## Phase
QA - COMPLETE (PASS)

## What Was Done
- Bug 1: Changed `margin-top` on `.nerv-list > li > .nerv-list` from `var(--nerv-list-gap)` to `calc(var(--nerv-list-gap) + 0.3em)` — compensates for `::before` shape extending past text by padding-bottom
- Bug 1: Added explicit `margin-top: var(--nerv-list-gap)` to `.nerv-list > li > .nerv-list-contained` to preserve contained behavior
- Bug 2: Added new rule for `.nerv-list-angled > li > .nerv-list:not(.nerv-list-contained)` with `translateX(calc(indent + (item-height + gap) * sin(angle)))` and `margin-left: 0`
- TDD: 5 new tests (B44–B48), all passing. 357/357 total tests pass.
- QA: Clean PASS — no semantic issues.

## Files Modified
- `src/_list.scss` — spacing calc fix, contained override, rotated translateX rule
- `test/components.test.mjs` — 5 new test behaviors (B44–B48)

## Next Step
Proceed to Reflect phase.
