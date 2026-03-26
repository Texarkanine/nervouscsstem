# Active Context

## Current Task
Cartouche Multi-Line Table Support (Rework)

## Phase
BUILD - COMPLETE

## What Was Done
- Added CSS table-mode rules in `src/_cartouche.scss`: `.nerv-cartouche-fixed > table` (fills frame, collapse, transform: none) and `> table td` (structural cells with per-cell scale transform)
- Extended `initCartouches` in `src/nerv.js`: table-mode branch iterates `<td>` elements, measures natural vs rendered dimensions, sets per-cell `--nerv-cartouche-sx`/`--nerv-cartouche-sy`
- Removed broken multi-span example from `ref/ref-foundation.html`
- Added new "Status Cartouche — fixed table-mode" section with 6 demo cartouches: 1×2 steel, 4-row data panel, LIVE+JP source, LOCKED, OPEN, LIVE+PICTURE
- 6 new tests added (B1–B6), all passing
- Fixed pre-existing lint issue: `0.00em` → `0` in cartouche base padding
- Full suite: 293 tests, 0 failures; build, minify, lint all pass

## Files Modified
- `src/_cartouche.scss` — table-mode CSS rules + lint fix
- `src/nerv.js` — table-mode branch in initCartouches (measureSpan + measureTable helpers)
- `ref/ref-foundation.html` — removed broken example, added table-mode demo section
- `test/components.test.mjs` — 6 new tests in "Cartouche table-mode CSS" describe block

## Key Decisions
- Per-cell measurement uses `clientWidth`/`clientHeight` for rendered dimensions and `scrollWidth`/`scrollHeight` for natural text dimensions (after zeroing transform)
- All cell transforms zeroed first in a single pass, then measured and re-applied — prevents cascading layout shifts during measurement

## Deviations from Plan
- Fixed pre-existing lint error (`0.00em` → `0`) — not planned, but required for clean lint pass

## Next Step
QA review runs automatically.
