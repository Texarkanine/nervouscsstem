---
task_id: nerv-m7-tables
date: 2026-03-19
complexity_level: 3
---

# Reflection: M7 — Table Styling with Special Row Types

## Summary

Built `_table.scss` providing phosphor-outline table styling with fill/border/color orthogonality, parallelogram (skewX) and triangle (clip-path) geometric row types, ruled dividers, per-row color overrides, and a reference page. Succeeded after significant rework — the original geometric shape offering (hex, hex-alt, trapezoid, triangle) was cut down to two reliable shapes through iterative visual testing and systematic diagnosis of browser rendering limitations.

## Requirements vs Outcome

The original brief called for triangle, hexagon, and trapezoid geometric row types. The final delivery dropped hexagon and trapezoid, and added parallelogram:

| Original Requirement | Outcome |
|---|---|
| Base table + fill modes + color variants | ✓ Delivered as planned |
| Triangle rows (alternating up/down) | ✓ Delivered (clip-path, borderless) |
| Hexagon rows (in-phase / out-of-phase) | ✗ Cut — sub-pixel gaps unfixable in tables, punt to `_hex-grid.scss` |
| Trapezoid rows | ✗ Cut — clip-path unreliable across zoom levels |
| — | ✓ Added: Parallelogram rows (skewX, full fill mode support) |
| — | ✓ Added: `.nerv-table-uniform` modifier (suppress alternation) |
| — | ✓ Added: `.nerv-table-ruled` / `.nerv-table-dark-border` (configurable dividers) |
| — | ✓ Added: Per-row and per-cell color overrides |
| — | ✓ Added: Geometric tables auto-borderless |

The scope change was operator-driven and architecturally sound. The parallelogram is arguably more useful than hex/trapezoid were — it supports all fill modes because it uses `transform` instead of `clip-path`.

## Plan Accuracy

The initial plan was structurally correct for what it attempted — the 8-step implementation sequence, test plan, file list, and cascade design all worked. Where the plan failed was in **not anticipating the browser rendering limitation** that would invalidate half the geometric shapes.

The plan noted "clip-path clips borders" as a known limitation but treated it as cosmetic. It did not identify that `clip-path` on adjacent `<td>` elements produces sub-pixel rendering gaps at row boundaries — a fundamental issue that no CSS can fix. This wasn't discoverable during planning (it requires visual testing at multiple zoom levels), but the plan could have included a "visual verification checkpoint" after the first geometric shape was implemented.

## Creative Phase Review

One creative decision was made: deferring tiled hex grid to `_hex-grid.scss`. This decision **held up perfectly** and was vindicated by the subsequent removal of hex from tables entirely. The creative phase correctly identified that hexagonal grids are architecturally wrong for `<table>` elements (1D row-based layout vs. 2D tessellation).

No creative phase was run for the parallelogram addition — it was driven by operator brainstorming during rework. In hindsight, a creative phase exploring "which geometric shapes can be reliably rendered in table cells?" at the start would have saved significant rework.

## Build & QA Observations

**Build**: Went smoothly for the initial implementation. TDD caught one pre-existing test fragility (form test B16's "last block" assumption). The `_list.scss` parallelogram pattern translated cleanly to tables.

**QA**: Caught one real issue (hex-alt table-level missing clip-path). Otherwise clean.

**Rework (the real story)**: Three major rework passes after operator visual review:
1. Borderless modifier, hex-eq (equilateral hex attempt) — hex-eq dropped due to table layout overriding `aspect-ratio`
2. Geometric shape overhaul via `/refresh` — systematic diagnosis, removed hex/hex-alt/trapezoid, added parallelogram
3. Alternation fix (per-row not per-cell), ruled dividers, dark-border alias, per-cell/row color overrides, mixed tables demos

The rework was productive but expensive. Each pass required test updates, ref page updates, SCSS changes, and full suite verification.

## Cross-Phase Analysis

**Planning → Build**: The plan's failure to identify sub-pixel gaps as a risk didn't cause build problems (build went fine), but it caused extensive post-build rework. The plan assumed all `clip-path` shapes would work in tables.

**Creative → Rework**: The creative decision to defer hex-grid was vindicated. If we'd tried to build tiled hex grids in tables, we'd have hit the same rendering wall plus the tessellation problem.

**QA → Rework**: QA passed on the initial build, but the operator's visual review (a higher bar than automated tests) drove three rework passes. Automated tests verify CSS output structure, not visual rendering quality. The gap between "CSS is correct" and "visual result is correct" was the entire rework story.

**`/refresh` → Resolution**: The systematic re-diagnosis using `/refresh` was the turning point. Instead of continuing to tweak padding/borders/border-collapse, stepping back to ask "which shapes actually work?" led to the right architectural decision.

## Insights

### Technical

- **`clip-path` on adjacent table cells produces browser-level sub-pixel gaps that are unfixable with CSS.** The severity correlates with the shape's horizontal contact area: hexagons worst (50% horizontal span at top/bottom), trapezoids visible, triangles invisible (point contact). This is a fundamental browser rendering characteristic, not a CSS bug. Only use `clip-path` in tables when the gap is either invisible or aesthetically acceptable.

- **`skewX` on `::before` is the reliable geometric shape technique for tables.** It produces no rendering gaps (the pseudo extends from `inset: 0`), borders survive (they're on the pseudo-element, not clipped), and all fill modes work by targeting `::before`. The `overflow: visible` default on table cells means the skewed shape extends beyond the cell boundary — this creates visual overlap between cells, which is actually the desired effect for seamless parallelogram rows. (Note: `overflow: hidden` clips the skew and breaks the shape — do not use it.)

- **Per-row alternation (`tr:nth-child(even)`) is more natural than per-cell alternation for table geometric shapes.** All cells in a row should present a unified visual direction; rows alternate to create rhythm.

### Process

- **Visual testing at multiple zoom levels should be a mandatory checkpoint after implementing any `clip-path` shape in a layout context.** Automated tests verify CSS structure but cannot detect sub-pixel rendering artifacts. A single visual check at 100%, 110%, and 90% zoom would have caught the hex gap issue before the full shape suite was built.

- **The `/refresh` diagnostic workflow is highly effective for breaking out of incremental fix cycles.** Three attempts to fix hex gaps with padding/border/collapse adjustments failed. `/refresh` forced a step back to root-cause analysis, which led to the correct architectural decision (remove hex, add para) in one pass. **When you've tried the same class of fix twice and it hasn't worked, stop and `/refresh`.**

- **Rework passes should be batched.** The three rework passes each required full test suite + build verification. If all operator feedback had been collected before starting rework, we could have done it in one pass. The workflow should encourage "collect all visual feedback → batch rework" rather than "fix one thing → show → fix another thing → show."
