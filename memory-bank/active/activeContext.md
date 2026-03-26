# Active Context

## Current Task
Glow Drop-Shadow Color Variants Bug Fix

## Phase
COMPLEXITY-ANALYSIS - COMPLETE

## What Was Done
- Complexity Level 1 (Quick Bug Fix) determined
- Single component affected: `src/_glow.scss` — the `@each` loop generates box-shadow and text-shadow color variants but omits drop-shadow variants
- Ref HTML already references the missing classes (`.nerv-glow-drop-red`, etc.)

## Next Step
Load Level 1 workflow
