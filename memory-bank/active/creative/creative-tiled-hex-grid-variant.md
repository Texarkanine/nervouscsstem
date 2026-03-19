# Architecture Decision: Tiled Hex Grid Variant

## Requirements & Constraints

**Functional requirements:**
- Provide a hexagon layout variant with true honeycomb tessellation (no gaps, no overlaps)
- Must be discoverable and usable by consumers
- Must align with existing component organization patterns

**Quality attributes (ranked):**
1. **Simplicity** - Prefer the simplest approach that meets requirements
2. **Maintainability** - Code should be understandable and follow existing patterns
3. **Discoverability** - Consumers should easily find and use the feature
4. **Consistency** - Align with existing component organization (tables vs. grids)

**Technical constraints:**
- All selectors use `.nerv-` prefix
- No duplication of functionality
- Must work within existing SCSS module system (`_name.scss` partials, `@forward` order)
- Existing hex-grid component already has overlapping and spaced variants

**Boundaries:**
- **In scope**: Where the tiled hex grid variant should live (table component vs. hex-grid component vs. technique)
- **Out of scope**: Implementation details of the tiling math (that's a build-phase concern)

## Components

The system has two relevant components:

1. **`_hex-grid.scss`** - Hexagonal cell grid component
   - Current variants: `.nerv-hex-grid` (overlapping), `.nerv-hex-grid-spaced` (gapped)
   - Structure: flexbox column container with `.nerv-hex-row` children containing `.nerv-hex-cell` elements
   - Purpose: Warning displays and status grids
   - Uses fixed cell width (`$_hex-cell-width: 80px`) and negative margin overlap

2. **`_table.scss` (new)** - Table styling component
   - Will provide: base table styling, triangle rows, hexagon rows, trapezoid rows
   - Structure: CSS for `<table>` elements or CSS-grid containers
   - Purpose: Tabular data display with geometric row types
   - Hexagon rows will use clip-path but adapt to table cell widths (variable, not fixed)

**Relationship**: Hex-grid and table hex rows are conceptually similar (hexagon cells) but serve different use cases:
- Hex-grid: fixed-size cells in a flex layout, used for status displays
- Table hex rows: variable-width cells in a table structure, used for data tables

## Options Evaluated

- **Option A: Table variant (`.nerv-table-hex-tiled`)**: Implement tiled hex grid as a table row type alongside other geometric row types. The tiled variant would be a modifier on hexagon table rows that ensures perfect tessellation.

- **Option B: Hex-grid variant (`.nerv-hex-grid-tiled`)**: Add a third spacing variant to the existing hex-grid component. Extends `_hex-grid.scss` with `.nerv-hex-grid-tiled` modifier that eliminates both overlaps and gaps.

- **Option C: Technique/documentation only**: Document that true tessellation can be achieved by combining existing hex-grid with specific sizing math, but don't add new code. Consumers implement it themselves if needed.

## Analysis

| Criterion | Option A (Table) | Option B (Hex-Grid) | Option C (Technique) |
|----------|------------------|---------------------|---------------------|
| **Fitness** | Partial - tables have variable cell widths, making perfect tessellation math complex | High - hex-grid already has fixed cell widths, tessellation math is straightforward | Low - requires consumers to implement math themselves |
| **Simplicity** | Low - adds complexity to table component, duplicates hex-grid logic | High - extends existing component with one modifier class | Highest - no code changes |
| **Maintainability** | Medium - hex tiling logic exists in two places (grid + table) | High - all hex tiling logic in one component | Low - no maintainable code, just documentation |
| **Discoverability** | Medium - consumers looking for hex grids might not check tables | High - natural extension of existing hex-grid variants | Low - buried in documentation |
| **Consistency** | Low - hex-grid is the established component for hex layouts | High - follows existing variant pattern (spaced, filled, tiled) | Medium - doesn't violate patterns but doesn't follow them either |
| **Risk** | Medium - table hex rows may have different constraints than grid | Low - extends proven component pattern | Low - no code risk, but feature may be unused |

**Key insights:**
- Hex-grid already has the infrastructure (fixed cell widths, row offset math) - adding a tiled variant is a natural extension
- Table hex rows serve a different purpose (variable-width data cells) and perfect tessellation may not be achievable or desirable with variable widths
- The requirement states "TO DECIDE: is this just the hexagon table type?" - this suggests uncertainty, but the existing hex-grid component is the established home for hex layouts
- Option C (technique only) fails the discoverability requirement - consumers shouldn't need to implement math themselves

**Quality attribute tension:**
- Simplicity favors Option C (no code), but discoverability and fitness favor Option B (hex-grid variant)
- Consistency strongly favors Option B - it follows the existing variant pattern

## Decision

**Selected**: Option B - Hex-grid variant (`.nerv-hex-grid-tiled`)

**Rationale**: 
The existing hex-grid component is the established home for hexagon layouts. It already has overlapping and spaced variants, making a tiled variant a natural third option. The component has fixed cell widths and proven offset math, making perfect tessellation straightforward to implement. This approach maximizes consistency (follows existing variant pattern), maintainability (all hex logic in one place), and discoverability (consumers find it where they'd expect: in the hex-grid component).

**Tradeoff**: 
This decision means the tiled hex grid variant is **not** part of M7 (table milestone). It should be implemented as a separate enhancement to `_hex-grid.scss`, either as part of a future milestone or as a standalone L1/L2 task. The table milestone (M7) will focus on hexagon table rows with variable cell widths, which may not achieve perfect tessellation but serves the table use case.

## Implementation Notes

- **Component boundary**: Tiled variant belongs in `_hex-grid.scss`, not `_table.scss`
- **Integration approach**: Add `.nerv-hex-grid-tiled` modifier class that:
  - Removes negative margin overlap (sets `margin-top: 0` or calculated spacing)
  - Removes gaps (sets `gap: 0` or calculated spacing)
  - Uses precise cell width and offset math for perfect tessellation
- **Migration path**: No migration needed - this is a new feature addition
- **M7 scope adjustment**: Remove "tiled hex grid variant decision" from M7 scope. M7 will implement hexagon table rows (which may have gaps/overlaps due to variable cell widths), and the tiled variant will be a future hex-grid enhancement.
