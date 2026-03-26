# Active Context

## Current Task
Cartouche Multi-Line Table Support (Rework)

## Phase
QA - COMPLETE (PASS)

## What Was Done
- Fixed JS measurement bug: `scrollWidth`/`scrollHeight` → `Range.getBoundingClientRect()` for accurate text dimensions when cells are wider than content
- Updated `_cartouche.scss` header doc to mention table mode

## Files Modified (QA)
- `src/nerv.js` — measureTable: Range-based text measurement
- `src/_cartouche.scss` — header doc update

## Next Step
Reflect phase runs automatically.
