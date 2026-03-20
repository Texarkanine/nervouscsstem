# Active Context

## Current Task
M8: Radar pulse — sweep-synced blips + JS phase sync

## Phase
QA — complete

## What Was Done
- **Build:** Added `.nerv-radar-blip` in `src/_radar.scss` (`nerv-radar-blip-pulse` keyframes, same duration calc as sweep, `--nerv-radar-blip-phase` for bearing alignment, reduced-motion + contrast). Added `NERV.initRadarSweepSync` in `src/nerv.js` (WAAPI → `--nerv-radar-sweep-phase` on radar root; wired from `init()` for `.nerv-radar[data-nerv-radar-sync]` only). Tests in `test/patterns.test.mjs`. Ref demo in `ref/ref-patterns.html`.
- **QA:** Semantic review PASS — matches brief and plan; no stubs or debug noise.

## Next Step
Run `/niko-reflect` (Level 2), then continue M8 milestone closure or run `/niko` again after reflection to advance L4 checklist.
