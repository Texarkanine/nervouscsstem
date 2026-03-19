# Task: M7 — Table Styling with Special Row Types

* Task ID: nerv-m7-tables
* Complexity: Level 3
* Type: Feature (new component set)

Implement table styling with special row types: base phosphor-outline tables with fill/border mode orthogonality (following `_list.scss` precedent), auto-generated color variants from `$nerv-colors`, alternating triangle rows, hexagon rows (with in-phase/out-of-phase offset), and stretchable trapezoid rows. Note: Tiled hex grid variant deferred to future hex-grid enhancement (see FUTURE.md).

## Pinned Info

### Shape Application: Row-Level Primary, Table-Level Default

Geometric shape classes (triangle, hex, trapezoid) are **row-level modifiers** applied to `<tr>` (or row-equivalent). Different rows in the same table can have different shapes, freely mixed:

```html
<!-- Row-level: each row picks its own shape -->
<table class="nerv-table">
  <tr class="nerv-table-triangle"><td>...</td><td>...</td></tr>
  <tr class="nerv-table-triangle"><td>...</td><td>...</td></tr>
  <tr class="nerv-table-trapezoid"><td>...</td><td>...</td></tr>
  <tr class="nerv-table-hex"><td>...</td><td>...</td></tr>
</table>

<!-- Table-level default: all rows inherit shape unless overridden -->
<table class="nerv-table nerv-table-triangle">
  <tr><td>...</td></tr>              <!-- inherits triangle -->
  <tr><td>...</td></tr>              <!-- inherits triangle -->
  <tr class="nerv-table-hex"><td>...</td></tr>  <!-- overrides to hex -->
</table>
```

**CSS cascade**: Table-level shape uses `.nerv-table.nerv-table-triangle td` → specificity (0,2,1). Row-level shape uses `.nerv-table tr.nerv-table-triangle > td` → specificity (0,2,2). Row-level wins because it has higher specificity. *(Fixed in preflight: original row-level selector `tr.nerv-table-triangle > td` at (0,1,2) would LOSE to table-level (0,2,1). Adding `.nerv-table` ancestor context bumps row-level to (0,2,2).)*

### Fill/Border Orthogonality — List Precedent

Tables follow the same design language as lists. A list is a 1×N table; the same fill/border/color system applies.

```
_list.scss pattern (canonical):
  Fill modes (mutually exclusive, on container):
    (default)         → translucent color fill (rgba 0.5)
    .nerv-*-bordered  → translucent fill + phosphor border
    .nerv-*-outline   → border only, bg = --nerv-bg (no fill)
    .nerv-*-solid     → opaque fill, color = --nerv-bg (cutout text)

  Color variants (auto-generated from $nerv-colors, glow-flagged only):
    .nerv-*-{color}   → --nerv-*-color: var(--nerv-{color})
                         --nerv-*-color-rgb: var(--nerv-{color}-rgb)

  ⚠ clip-path clips borders: bordered/outline only render crisp borders
    on shapes that don't use clip-path (rect, para/skew). On clipped
    shapes (hex, arrow, triangle), borders are invisible.
```

The table component replaces `*` with `table`, replicating this exact system.

## Component Analysis

### Affected Components

- **`src/_table.scss` (new)**: New SCSS partial containing all table styling classes. Follows `_name.scss` convention, `@forward`ed from `nerv.scss` after `form` and before `states`. Responsibilities: base table styling, fill/border mode modifiers, color variant generation, triangle/hexagon/trapezoid row variants, accessibility support.

- **`src/nerv.scss`**: Add `@forward 'table'` after `form` and before `states`. Update header comment chain to include `table`.

- **`test/components.test.mjs`**: Add test cases for all table behaviors.

- **`ref/ref-tables.html` (new)**: New reference page demonstrating all table variants, fill modes, and color combinations.

- **No changes to existing components**: Tables are a new component set. No boundary changes.

### Cross-Module Dependencies

- **Tokens (`_tokens.scss`)**: Consumes `--nerv-primary`, `--nerv-primary-rgb`, `--nerv-bg`, `--nerv-border-width`, `--nerv-glow-spread`, `--nerv-glow-intensity`. Uses `tokens.$nerv-colors` map for auto-generated color variants. No changes to tokens required.

- **Glow mixin (`_glow.scss`)**: May use `@include glow.nerv-glow()` for table container border glow. No changes required.

- **Hex grid (`_hex-grid.scss`)**: Hexagon table rows reuse the hex clip-path pattern independently. No changes required.

### Boundary Changes

None — all table classes are new.

### Invariants & Constraints

- All selectors use `.nerv-` prefix
- `prefers-reduced-motion` suppresses animations; static state recognizably NERV
- `prefers-contrast` increases border widths and reduces glow reliance
- No image files — CSS-only (SVG data URIs permitted)
- Token architecture preserved
- Fill/border/color follows list precedent (`_list.scss`)
- clip-path clips borders: crisp borders only on non-clipped cell shapes
- Existing features remain unbroken; Stylelint + Node.js test runner must pass

## Open Questions

- [x] **Tiled hex grid variant decision** → **Resolved**: Implement as `.nerv-hex-grid-tiled` in `_hex-grid.scss` (future enhancement), not M7. (See `memory-bank/active/creative/creative-tiled-hex-grid-variant.md`)

None — implementation approach is clear.

## Test Plan (TDD)

### Behaviors to Verify

**Base Table Styling**
- B1: `.nerv-table` class exists with border and background styling → compiled CSS contains `.nerv-table` rule with `border`
- B2: `.nerv-table` declares `--nerv-table-color` and `--nerv-table-color-rgb` custom properties → CSS block contains both
- B3: `.nerv-table th` and `.nerv-table td` have border styling → CSS contains `.nerv-table th` or `.nerv-table td` with `border`

**Fill/Border Modes**
- B4: `.nerv-table-bordered` adds border to cells → CSS contains `.nerv-table-bordered` with `border`
- B5: `.nerv-table-outline` sets border + dark bg → CSS contains `.nerv-table-outline` with `border` and `background`
- B6: `.nerv-table-solid` sets opaque fill and cutout text → CSS contains `.nerv-table-solid` with `background` referencing `--nerv-table-color` and `color` referencing `--nerv-bg`

**Color Variants**
- B7: At least one `.nerv-table-{color}` variant exists (auto-generated from `$nerv-colors`) → CSS contains `.nerv-table-amber` or `.nerv-table-red` or similar with `--nerv-table-color`

**Geometric Row Types — Row-Level Application**
- B8: Triangle row class exists → compiled CSS contains `.nerv-table-triangle` or equivalent
- B9: Triangle cells use `clip-path: polygon()` → CSS contains `clip-path` with `polygon` in triangle context
- B10: Triangles alternate up/down via `:nth-child` → CSS uses `:nth-child` for alternating triangle direction
- B11: Hexagon row class exists → compiled CSS contains `.nerv-table-hex` or equivalent
- B12: Hexagon cells use `clip-path: polygon()` matching hex shape → CSS contains hex polygon
- B13: Hexagon rows support out-of-phase offset (alternating) → CSS uses `:nth-child` for alternating row offsets
- B14: Trapezoid row class exists → compiled CSS contains `.nerv-table-trapezoid` or equivalent
- B15: Trapezoid cells use `clip-path: polygon()` for angled edges → CSS contains trapezoid-related `clip-path` or `skew`

**Geometric Row Types — Table-Level Default**
- B16: Shape class on table cascades to rows → CSS contains a selector that applies triangle/hex/trapezoid clip-path from table-level class to cells (e.g. `.nerv-table-triangle td` or `.nerv-table.nerv-table-triangle > * > td`)

**Accessibility**
- B17: `prefers-contrast: more` media query targets table elements → CSS contains `prefers-contrast: more` block referencing `.nerv-table`

**Regression**
- B18: Existing component selectors still present → `.nerv-bar-meter`, `.nerv-hex-grid`, `.nerv-list`, `.nerv-input` all present in compiled CSS

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/components.test.mjs`
- Conventions: `describe` blocks per component, `it` blocks named `B{N}: description`, CSS output inspection via `assert.match` / `assert.ok` + string search on compiled `dist/nerv.css`
- New test files: none (append to `test/components.test.mjs`)

### Integration Tests

- None required — tables are a new component set with no cross-component integration beyond token consumption.

## Implementation Plan

1. **Stub + Register**
   - Files: `src/_table.scss` (new, empty), `src/nerv.scss`
   - Changes: Create empty `_table.scss` with doc comment. Add `@forward 'table'` to `nerv.scss` after `form` and before `states`. Update `nerv.scss` header comment chain to include `table`.

2. **Write failing tests**
   - Files: `test/components.test.mjs`
   - Changes: Add `describe('Table styling CSS')` block with all 18 test cases (B1–B18). Run tests — all new tests should fail.

3. **Base table styling + fill/border modes (B1–B6)**
   - Files: `src/_table.scss`
   - Changes: Implement following the `_list.scss` cascade pattern:
     - **Base**: `.nerv-table` declares `--nerv-table-color` / `--nerv-table-color-rgb` defaulting to `--nerv-primary`. Container gets phosphor border + glow. Cells (`th`, `td`) get translucent fill (`rgba(--nerv-table-color-rgb, 0.5)`), border, and HUD typography.
     - **Fill modes** (BEFORE geometric shapes in source order, same as lists):
       - `.nerv-table-bordered` — adds `border: var(--nerv-border-width) solid var(--nerv-table-color)` on cells
       - `.nerv-table-outline` — border on cells + `background: var(--nerv-bg)` (no fill)
       - `.nerv-table-solid` — `background: var(--nerv-table-color)` + `color: var(--nerv-bg)` (opaque fill, cutout text)
   - `@use 'sass:list'` and `@use 'tokens'` for color variant generation.

4. **Color variants (B7)**
   - Files: `src/_table.scss`
   - Changes: Auto-generate `.nerv-table-{color}` classes from `tokens.$nerv-colors` (glow-flagged entries only), setting `--nerv-table-color` and `--nerv-table-color-rgb`. Exact same `@each` loop pattern as `_list.scss`.

5. **Geometric row types — row-level (B8–B15)**
   - Files: `src/_table.scss`
   - Changes: Each geometric shape is a class applied to `<tr>` (or row-equivalent element). The class styles the row's child `td`/`th` cells. For each shape type, implement both the row-level selector (`.nerv-table-triangle > td`) and the table-level default selector (`.nerv-table.nerv-table-triangle td` or equivalent, lower specificity so row-level wins).
   - **Triangle** (`.nerv-table-triangle`): Cells use `clip-path: polygon()` for equilateral triangles. `:nth-child(odd)` points up (`polygon(50% 0%, 100% 100%, 0% 100%)`), `:nth-child(even)` points down (`polygon(0% 0%, 100% 0%, 50% 100%)`). Text alignment follows base. Same clip-path/border limitation as list hex shapes. Row-level selector: `.nerv-table tr.nerv-table-triangle > td` (specificity (0,2,2) beats table-level (0,2,1)).
   - **Hexagon** (`.nerv-table-hex`): Cells use hex clip-path (`polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)`). Default: in-phase. `.nerv-table-hex-alt` modifier: `:nth-child(odd)` / `:nth-child(even)` on rows for alternating offsets. Same clip-path/border limitation. Row-level selector: `.nerv-table tr.nerv-table-hex > td`.
   - **Trapezoid** (`.nerv-table-trapezoid`): Cells get angled edges via `clip-path: polygon()` creating trapezoids that stretch with content. Alternating cells mirror the angle so edges tile. `--nerv-table-inset` custom property for angle control. Row-level selector: `.nerv-table tr.nerv-table-trapezoid > td`.

6. **Table-level default cascade (B16)**
   - Files: `src/_table.scss`
   - Changes: When a shape class is on the `<table>` container, it cascades as the default for all rows. Row-level shape classes override the table default. Cascade mechanism: table-level selectors use compound class + descendant (`.nerv-table.nerv-table-triangle td` → specificity (0,2,1)); row-level selectors use ancestor + child combinator (`.nerv-table tr.nerv-table-triangle > td` → specificity (0,2,2)). Row-level wins by specificity.

7. **Accessibility (B17)**
   - Files: `src/_table.scss`
   - Changes: Add `prefers-contrast: more` block increasing border widths and fill opacity for table elements. Add `prefers-reduced-motion: reduce` block suppressing any transitions. Verify regression by running existing tests.

8. **Reference page**
   - Files: `ref/ref-tables.html` (new)
   - Changes: Create demonstration page following `ref-lists.html` structure:
     - Section 1: Fill & Border Modes on base rect tables (default, bordered, outline, solid) — various colors
     - Section 2: Color variants
     - Section 3: Triangle rows (with different fills/colors)
     - Section 4: Hexagon rows (in-phase, out-of-phase, with different fills)
     - Section 5: Trapezoid rows
     - Section 6: **Mixed-row table** — a single table mixing triangle, hex, trapezoid, and plain rows to demonstrate row-level shape mixing
     - Section 7: **Table-level default with row override** — table with a default shape class, plus individual rows overriding to different shapes
     - Each section documents the classes used. Loads `dist/nerv.css`, uses `.nerv-panel` containers where needed.

## Technology Validation

No new technology — validation not required. All techniques used (`clip-path: polygon()`, `:nth-child()` selectors, CSS Grid/Flexbox, `@each` loop over `$nerv-colors`) are established patterns in this project.

## Challenges & Mitigations

- **clip-path clips borders**: Same limitation as lists. Bordered/outline fill modes render crisp borders only on base rectangular cells. Triangle/hex/trapezoid cells clip borders away. Mitigation: Document the limitation (same as list doc comment). Optionally explore `::before` pseudo-element approach (like list para) for shapes that need borders, but only if achievable without excessive complexity.

- **Triangle text alignment**: Equilateral triangles have narrow bases; text may overflow. Mitigation: Use `overflow-wrap: break-word`, generous padding, `text-align: center`, minimum cell dimensions.

- **Hexagon row offset math**: Variable cell widths in table context (unlike fixed hex-grid cells). Mitigation: Use `%`-based offsets or `calc()` with custom property for cell width.

- **Trapezoid edge tiling**: Maintaining seamless tiling when cells have varying widths. Mitigation: Use consistent `--nerv-table-inset` custom property across cells so clip-path angles match.

- **Row-level vs. table-level specificity**: When a shape class appears on both the table and a row, the row must win. Mitigation: Table-level selectors use descendant combinators (lower specificity); row-level selectors use child combinators or `tr.class > td` (higher specificity). Source order also helps: row-level rules come after table-level rules.

- **CSS property replacement (compound states)**: Solid fill mode + geometric shape both touch `background` on cells. Mitigation: Source-order cascade: fill modes before geometric shapes, shapes explicitly reset as needed (lesson from `_list.scss`).

- **`@use` for token map**: Need `@use 'sass:list'` and `@use 'tokens'` for the `@each` color variant loop. Mitigation: Established pattern, used identically in `_list.scss` and `_form.scss`.

## Status

- [x] Component analysis complete
- [x] Open questions resolved (creative phase complete)
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [x] Build
- [x] QA
