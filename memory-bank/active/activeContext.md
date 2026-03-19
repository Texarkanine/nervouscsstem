# Active Context

## Current Task
M7: Implement table styling with special row types

## Phase
BUILD — rework pass complete (operator feedback)

## What Was Done
Rework based on operator visual review:
- Added `.nerv-table-borderless` — strips container border, glow, and cell borders for clean geometric shapes
- Added `.nerv-table-hex-eq` — equilateral hex with fixed `aspect-ratio: 1.1547`, clips overflow (vs default long-hex that stretches)
- Triangle gap behavior accepted as-is (clip-path on individual cells creates diamond gaps — CSS limitation)
- Trapezoid gap behavior deferred (same root cause as triangles)
- Updated ref page: triangle demos now borderless, hex section shows long vs equilateral, added solid+borderless combos
- 3 new tests (B19-B21), 259/259 total pass, lint clean

## Decisions Made (operator)
- Triangle tessellation gaps accepted — valid NERV aesthetic, just different from initial vision
- Table borders should be optional — geometric shapes look better without container chrome
- Hexagons need equilateral option with text clipping vs stretchy long-hex default
- Trapezoid gap fix deferred to after triangle decision (now settled)

## Next Step
Run /niko to continue to the next milestone.
