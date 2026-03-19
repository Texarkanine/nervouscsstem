# Active Context

## Current Task
M5: Add list styling

## Phase
BUILD - COMPLETE (post-QA rework)

## What Was Done
Three shape modes: hex (default symmetric pillbox), `.nerv-list-rect` (bordered rectangles), `.nerv-list-para` (left-pointed, flat right edge). Per-item rotation via `--nerv-list-angle` with `transform-origin: 0% 50%` pivoting at left point. Angled gap increased to `2.5rem` to prevent overlap. 212 tests pass, lint/build clean.

## Next Step
Ready for reflection. Run /niko to continue.
