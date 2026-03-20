# Active Context

## Current Task
M7: Implement table styling with special row types

## Phase
BUILD — rework pass 2 complete (geometric shape overhaul)

## What Was Done
Major rework based on systematic diagnosis of sub-pixel rendering gaps:

### Removed from tables:
- **Hex / Hex-alt** — sub-pixel gaps clearly visible at row boundaries (clip-path on adjacent cells), architecturally wrong for tables (punt to future `_hex-grid.scss`)
- **Trapezoid** — clip-path unreliable across zoom levels, same gap issue
- **`border-collapse: collapse` hack** — was an attempted fix for gaps, no longer needed

### Added:
- **Parallelogram** (`.nerv-table-para`) — `skewX` on `::before` pseudo-element (same proven pattern as `_list.scss`). No clip-path = no sub-pixel gaps, and borders survive all fill modes.
- **`.nerv-table-uniform`** modifier — suppresses alternating direction on both triangle and para. Default behavior alternates (even cells flip direction).
- **Para fill-mode overrides** — bordered, outline, solid all correctly target `::before` pseudo-element.

### Key principle established:
Only use `clip-path` when (a) the visual result is correct AND (b) the borderless aesthetic is cool enough. Transform-based shapes get full fill mode support.

### Shape × Fill Mode matrix:
| Shape         | default | bordered | outline | solid | borderless |
|---------------|---------|----------|---------|-------|------------|
| Rectangle     | ✓       | ✓        | ✓       | ✓     | ✓          |
| Parallelogram | ✓       | ✓        | ✓       | ✓     | ✓          |
| Triangle      | ✓       | —        | —       | ✓     | ✓          |

## Files Modified
- `src/_table.scss` — removed hex/hex-alt/trapezoid, added para + uniform
- `test/components.test.mjs` — replaced B11-B16 with para/uniform tests
- `ref/ref-tables.html` — replaced hex/trap demos with para demos

## Verification
- Lint: clean
- Build: clean
- Tests: 260/260 pass, 0 fail

## Next Step
Visual review of parallelogram rendering in ref page, then continue workflow.
