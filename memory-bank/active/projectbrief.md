# Project Brief: M7 — Table Styling with Special Row Types

## User Story

As a developer using the NERV design system, I want to style tables with phosphor-outline aesthetics and special geometric row types (triangles, hexagons, trapezoids) so that I can create data displays that match the NGE console aesthetic.

## Use-Case(s)

### Use-Case 1: Base Phosphor-Outline Tables
Display tabular data in a classic NERV console style with glowing phosphor borders around cells and rows.

### Use-Case 2: Alternating Triangle Rows
Create tables where cells are tiled equilateral triangles (alternating up/down) with text aligned to the base, for geometric data visualization.

### Use-Case 3: Hexagon Rows
Display data in hexagonal cells that touch on edges, with configurable in-phase or out-of-phase offset alignment.

### Use-Case 4: Stretchable Trapezoid Rows
Create table rows where cells expand with content, transforming from triangles into trapezoids while maintaining the geometric aesthetic.

### Use-Case 5: Tiled Hex Grid Variant
Determine whether a true honeycomb tessellation layout should be implemented as a table variant, standalone element, or technique using existing hexagons.

## Requirements

1. Base table styling with phosphor-outline borders and glow effects
2. Alternating triangle row type with tiled equilateral triangles (up/down pattern)
3. Hexagon row type with configurable in-phase/out-of-phase offset
4. Stretchable trapezoid row type that expands with content
5. Design decision on tiled hex grid variant implementation approach
6. Support for both real `<table>` elements and CSS-grid-based tables
7. All styling respects `prefers-reduced-motion` and `prefers-contrast`
8. All selectors use `.nerv-` prefix
9. CSS-only implementation (SVG data URIs permitted, no image files)

## Constraints

1. All selectors use the `.nerv-` prefix — no exceptions
2. `prefers-reduced-motion` suppresses all new animations; static state must still look recognizably NERV
3. `prefers-contrast` increases border widths and reduces reliance on glow/shadow for new components
4. No image files — all visual effects via CSS; SVG data URIs in `background-image` are permitted
5. No canvas, WebGL, or framework dependencies
6. Token architecture preserved: ambiance tokens shift with alert state, named data tokens remain stable
7. New SCSS partials follow the `_name.scss` convention and are `@forward`ed from `nerv.scss` before `states`
8. Existing features and reference pages remain unbroken after implementation
9. Stylelint + Node.js test runner must pass after implementation

## Acceptance Criteria

1. `.nerv-table` class provides base phosphor-outline styling for tables
2. `.nerv-table-triangle` or similar provides alternating triangle row styling
3. `.nerv-table-hex` or similar provides hexagon row styling with offset options
4. `.nerv-table-trapezoid` or similar provides stretchable trapezoid row styling
5. Design decision documented on tiled hex grid variant approach
6. Reference page demonstrates all table variants
7. All tests pass (Stylelint + Node.js test runner)
8. Existing component tests remain unbroken
