# Project Brief: M7 — Table Styling with Special Row Types

## User Story

As a developer using the NERV design system, I want to style tables with phosphor-outline aesthetics, configurable fill/border modes, color variants, and special geometric row types (triangles, hexagons, trapezoids) so that I can create data displays that match the NGE console aesthetic — following the same design language established by `.nerv-list`.

## Use-Case(s)

### Use-Case 1: Base Tables with Fill/Border Modes
Display tabular data in NERV console style. Tables follow the same fill/border orthogonality as lists: default translucent fill, bordered (fill + phosphor border), outline (border only, dark bg), and solid (opaque fill, cutout text). A list is just a 1xN table — the design language should be unified.

### Use-Case 2: Color Variants
Apply per-table color overrides via auto-generated `.nerv-table-{color}` classes (from `$nerv-colors`), exactly as lists use `.nerv-list-{color}`.

### Use-Case 3: Alternating Triangle Rows
Create tables where cells are tiled equilateral triangles (alternating up/down) with text aligned to the base, for geometric data visualization.

### Use-Case 4: Hexagon Rows
Display data in hexagonal cells that touch on edges, with configurable in-phase or out-of-phase offset alignment.

### Use-Case 5: Stretchable Trapezoid Rows
Create table rows where cells expand with content, transforming from triangles into trapezoids while maintaining the geometric aesthetic.

## Requirements

1. Base table styling with phosphor-outline borders and glow effects
2. Fill mode modifiers following list precedent:
   - `(default)` — translucent color fill on cells
   - `.nerv-table-bordered` — translucent fill + phosphor border on cells
   - `.nerv-table-outline` — border only, dark bg (no visible fill)
   - `.nerv-table-solid` — opaque fill, cutout text (`color: --nerv-bg`)
3. Color variant classes auto-generated from `$nerv-colors` (`.nerv-table-{color}`)
4. Alternating triangle row type with tiled equilateral triangles (up/down pattern)
5. Hexagon row type with configurable in-phase/out-of-phase offset
6. Stretchable trapezoid row type that expands with content
7. Support for both real `<table>` elements and CSS-grid-based tables
8. All styling respects `prefers-reduced-motion` and `prefers-contrast`
9. All selectors use `.nerv-` prefix
10. CSS-only implementation (SVG data URIs permitted, no image files)

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
10. Fill/border/color system follows list precedent (`_list.scss`); same clip-path vs. border limitations apply (clip-path clips borders — crisp borders only render on rectangular cells)

## Acceptance Criteria

1. `.nerv-table` class provides base phosphor-outline styling for tables with translucent fill on cells
2. `.nerv-table-bordered` adds phosphor border to cells (translucent fill + border)
3. `.nerv-table-outline` provides border-only, dark-bg (no visible fill) cells
4. `.nerv-table-solid` provides opaque fill with cutout text on cells
5. `.nerv-table-{color}` classes auto-generated from `$nerv-colors`
6. `.nerv-table-triangle` or similar provides alternating triangle row styling
7. `.nerv-table-hex` or similar provides hexagon row styling with offset options
8. `.nerv-table-trapezoid` or similar provides stretchable trapezoid row styling
9. Reference page demonstrates all table variants, fill modes, and color combinations
10. All tests pass (Stylelint + Node.js test runner)
11. Existing component tests remain unbroken
