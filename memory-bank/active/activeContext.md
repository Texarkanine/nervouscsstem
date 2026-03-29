# Active Context

## Current Task
M5: List Nesting Overhaul (Rework) — fix two visual bugs: indented-mode parent→child spacing, rotated-nesting horizontal alignment

## Phase
PLAN - COMPLETE

## What Was Done
- Analyzed both bugs with browser bounding-box measurements
- Identified root causes: `margin-top` measured from text bottom vs shape bottom (bug 1), `margin-left` in rotated layout frame (bug 2)
- Validated CSS `sin()` function passes through Dart Sass with `var()` arguments
- 2-step implementation plan: spacing calc fix + translateX with trig compensation

## Key Decisions
- `margin-top: calc(var(--nerv-list-gap) + 0.3em)` — the `0.3em` exactly compensates for the `::before` shape extending past the text area by `padding-bottom`
- Contained mode gets explicit `margin-top: var(--nerv-list-gap)` override to preserve current (correct) behavior
- Rotated + non-contained uses `translateX(calc(indent + y_offset * sin(angle)))` for page-space horizontal indent
- Contained + rotated excluded from translateX fix (no demos, indent should follow shape angle)

## Next Step
Proceed to Preflight phase to validate the plan.
