# Progress: M7 — Table Styling with Special Row Types

Implement table styling with special row types: base phosphor-outline tables, alternating triangle rows, hexagon rows (with in-phase/out-of-phase offset), and stretchable trapezoid rows. Note: Tiled hex grid variant deferred to future hex-grid enhancement.

**Complexity:** Level 3

## Phase History

### Complexity Analysis — Complete
Classified as Level 3 (Intermediate Feature). Complete feature requiring multiple sub-components (base tables, triangle rows, hexagon rows, trapezoid rows) and design decisions. Affects multiple components but no system architecture changes. New SCSS partial will be created following project conventions.

### Plan — Complete
Designed `.nerv-table` base class with phosphor-outline styling, `.nerv-table-triangle` for alternating triangle rows, `.nerv-table-hex` for hexagon rows with in-phase/out-of-phase offsets, and `.nerv-table-trapezoid` for stretchable trapezoid rows. 20 test behaviors. 8 implementation steps. Files: `src/_table.scss` (new), `src/nerv.scss` (add @forward), `test/components.test.mjs` (20 tests), `ref/ref-tables.html` (new demo page). No new dependencies.

**Creative decision**: Tiled hex grid variant (true honeycomb tessellation) resolved via architecture exploration. Decision: implement as `.nerv-hex-grid-tiled` variant in `_hex-grid.scss` (future enhancement), not as part of M7. M7 hexagon table rows will have variable cell widths and may have gaps/overlaps, which is acceptable for the table use case.
