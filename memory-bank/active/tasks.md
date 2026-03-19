# Task: M7 — Table Styling with Special Row Types

* Task ID: nerv-m7-tables
* Complexity: Level 3
* Type: Feature (new component set)

Implement table styling with special row types: base phosphor-outline tables, alternating triangle rows, hexagon rows (with in-phase/out-of-phase offset), and stretchable trapezoid rows. Note: Tiled hex grid variant (true honeycomb tessellation) is deferred to a future hex-grid enhancement, not part of this milestone.

## Component Analysis

### Affected Components

- **`src/_table.scss` (new)**: New SCSS partial containing all table styling classes. Will follow the `_name.scss` convention and be `@forward`ed from `nerv.scss` after `form` and before `states`. Responsibilities: base table styling, triangle row variants, hexagon row variants, trapezoid row variants, accessibility support.

- **`src/nerv.scss`**: Add `@forward 'table'` after `form` and before `states`. Update header comment chain to include `table` between `form` and `states`.

- **`test/components.test.mjs`**: Add test cases for all table behaviors (base styling, triangle rows, hexagon rows, trapezoid rows, accessibility, regression).

- **`ref/ref-tables.html` (new)**: New reference page demonstrating all table variants (base, triangle, hexagon, trapezoid) in various states and configurations.

- **No changes to existing components**: Tables are a new component set with no dependencies on existing table styling (none exists). No boundary changes to existing components.

### Cross-Module Dependencies

- **Tokens (`_tokens.scss`)**: Consumes `--nerv-primary`, `--nerv-primary-rgb`, `--nerv-bg`, `--nerv-border-width`, `--nerv-glow-spread`, `--nerv-glow-intensity`, and named color tokens (`--nerv-green`, `--nerv-red`, etc.) for data states. No changes to tokens required.

- **Glow mixin (`_glow.scss`)**: May use `@include glow.nerv-glow()` for table borders/outlines. No changes to glow mixin required.

- **Hex grid (`_hex-grid.scss`)**: Hexagon table rows will reuse the hex clip-path pattern (`polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)`) but implement independently for table cells. No changes to hex-grid required.

### Boundary Changes

- **No API changes**: All table classes are new, no existing selectors modified.
- **No schema changes**: Pure CSS feature, no data model changes.
- **No interface changes**: Consumer-facing API is new classes only.

### Invariants & Constraints

- All selectors use `.nerv-` prefix
- `prefers-reduced-motion` suppresses animations; static state must look recognizably NERV
- `prefers-contrast` increases border widths and reduces glow reliance
- No image files — CSS-only (SVG data URIs permitted)
- No canvas, WebGL, or framework dependencies
- Token architecture preserved: ambiance tokens shift with alert state, named data tokens remain stable
- New SCSS partial follows `_name.scss` convention and is `@forward`ed from `nerv.scss` before `states`
- Existing features remain unbroken
- Stylelint + Node.js test runner must pass

## Open Questions

- [x] **Tiled hex grid variant decision** → **Resolved**: Tiled hex grid variant should be implemented as a hex-grid variant (`.nerv-hex-grid-tiled`), not as part of M7. Rationale: hex-grid is the established home for hex layouts, already has overlapping/spaced variants, and fixed cell widths make tessellation straightforward. **M7 scope adjustment**: Remove "tiled hex grid variant decision" from M7. M7 will implement hexagon table rows with variable cell widths (which may have gaps/overlaps). Tiled variant is a future hex-grid enhancement. (See `memory-bank/active/creative/creative-tiled-hex-grid-variant.md`)

## Test Plan (TDD)

### Behaviors to Verify

**Base Table Styling**
- B1: `.nerv-table` class exists with phosphor-outline border styling → compiled CSS contains `.nerv-table` rule with `border` and glow
- B2: `.nerv-table` declares `--nerv-table-color` custom property defaulting to `--nerv-primary` → CSS block contains `--nerv-table-color`
- B3: `.nerv-table th` and `.nerv-table td` have border styling → CSS contains `.nerv-table th` and `.nerv-table td` with `border`
- B4: `.nerv-table` supports both real `<table>` and CSS-grid-based tables → CSS works for both `table` and `display: grid` containers

**Alternating Triangle Rows**
- B5: `.nerv-table-triangle` or similar class exists → compiled CSS contains triangle row class
- B6: Triangle cells use `clip-path: polygon()` for equilateral triangle shape → CSS contains `clip-path` with triangle polygon
- B7: Triangles alternate up/down pattern (odd cells point up, even point down, or vice versa) → CSS uses `:nth-child(odd)` / `:nth-child(even)` for alternating
- B8: Text aligns to triangle base (bottom for upward-pointing, top for downward-pointing) → CSS contains `align-items` or `vertical-align` adjustments

**Hexagon Rows**
- B9: `.nerv-table-hex` or similar class exists → compiled CSS contains hexagon row class
- B10: Hexagon cells use `clip-path: polygon()` matching hex-grid pattern → CSS contains hex clip-path
- B11: Hexagon rows support in-phase offset (all rows same offset) → CSS supports consistent offset
- B12: Hexagon rows support out-of-phase offset (alternating row offsets) → CSS uses `:nth-child(odd)` / `:nth-child(even)` for row offsets
- B13: Hexagon cells touch on edges (no gaps) → CSS uses appropriate spacing/positioning

**Stretchable Trapezoid Rows**
- B14: `.nerv-table-trapezoid` or similar class exists → compiled CSS contains trapezoid row class
- B15: Trapezoid cells expand with content (width: auto or similar) → CSS allows flexible cell widths
- B16: Trapezoid cells maintain edge tiling (adjacent cells share edges) → CSS uses appropriate clip-path or transform
- B17: Trapezoid shape transforms from triangle base when content expands → CSS handles dynamic shape

**Accessibility**
- B18: `prefers-contrast: more` media query targets table elements → CSS contains `prefers-contrast: more` block for tables
- B19: `prefers-reduced-motion: reduce` suppresses any table animations → CSS contains `prefers-reduced-motion: reduce` block

**Regression**
- B20: Existing component selectors still present → `.nerv-bar-meter`, `.nerv-hex-grid`, `.nerv-list`, `.nerv-form` all present in compiled CSS

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
   - Changes: Create empty `_table.scss` with doc comment. Add `@forward 'table'` to `nerv.scss` after `form` and before `states`. Update `nerv.scss` header comment chain to include `table` between `form` and `states`.

2. **Write failing tests**
   - Files: `test/components.test.mjs`
   - Changes: Add `describe('Table styling CSS')` block with all 20 test cases (B1–B20). Run tests — all new tests should fail.

3. **Base table styling (B1–B4)**
   - Files: `src/_table.scss`
   - Changes: Implement `.nerv-table` — custom properties (`--nerv-table-color`, `--nerv-table-color-rgb`), phosphor border (`border: var(--nerv-border-width) solid var(--nerv-table-color)`), glow via `@include glow.nerv-glow()`, cell borders (`th`, `td` borders). Support both `<table>` elements and CSS-grid containers (use `display: table` fallback or grid-specific selectors if needed).

4. **Alternating triangle rows (B5–B8)**
   - Files: `src/_table.scss`
   - Changes: Implement `.nerv-table-triangle` or `.nerv-table-row-triangle` — `clip-path: polygon()` for equilateral triangles (up: `polygon(50% 0%, 100% 100%, 0% 100%)`, down: `polygon(0% 0%, 100% 0%, 50% 100%)`), `:nth-child(odd)` / `:nth-child(even)` for alternating pattern, text alignment (`align-items: flex-end` for up triangles, `flex-start` for down triangles, or `vertical-align` adjustments).

5. **Hexagon rows (B9–B13)**
   - Files: `src/_table.scss`
   - Changes: Implement `.nerv-table-hex` or `.nerv-table-row-hex` — hex clip-path (reuse pattern from `_hex-grid.scss`: `polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)`), in-phase offset (all rows same `margin-left` or `padding-left`), out-of-phase offset (`.nerv-table-hex-outphase` modifier using `:nth-child(odd)` / `:nth-child(even)` on rows for alternating offsets), edge-touching spacing (zero gap or negative margins).

6. **Stretchable trapezoid rows (B14–B17)**
   - Files: `src/_table.scss`
   - Changes: Implement `.nerv-table-trapezoid` or `.nerv-table-row-trapezoid` — flexible cell widths (`width: auto`, `min-width` constraints), trapezoid clip-path that adapts to width (or `skewX()` transform on `::before` pseudo like list para pattern), edge tiling maintained via shared clip-path math or transform origin, content expansion handled by CSS Grid or flexbox.

7. **Accessibility (B18–B19)**
   - Files: `src/_table.scss`
   - Changes: Add `prefers-contrast: more` block increasing border widths for table elements. Add `prefers-reduced-motion: reduce` block disabling any transitions/animations. Verify regression by running existing tests.

8. **Reference page**
   - Files: `ref/ref-tables.html` (new)
   - Changes: Create demonstration page showing base tables, triangle rows, hexagon rows (in-phase and out-of-phase), trapezoid rows in various states. Follow ref page conventions from existing pages (loads `dist/nerv.css`, uses `.nerv-panel` containers, documents each variant).

## Technology Validation

No new technology — validation not required. All techniques used (`clip-path: polygon()`, `:nth-child()` selectors, CSS Grid/Flexbox, `skewX()` transforms, pseudo-elements) are established patterns in this project or have broad browser support.

## Challenges & Mitigations

- **Triangle text alignment**: Equilateral triangles have narrow bases; text may overflow or be hard to read. Mitigation: Use `overflow-wrap: break-word`, generous padding, and `text-align: center` with `vertical-align` adjustments. Consider minimum cell height constraints.

- **Hexagon row offset math**: Calculating precise offsets for in-phase vs. out-of-phase alignment requires hex geometry math. Mitigation: Reuse offset calculation from `_hex-grid.scss` (half cell width: `calc(#{$_hex-cell-width} / 2)`). For tables, adapt to table cell widths which may vary.

- **Trapezoid edge tiling**: Maintaining seamless edge tiling when cells expand requires careful clip-path or transform math. Mitigation: Use `skewX()` on `::before` pseudo (like list para pattern) for exact angle control, or calculate trapezoid polygon points based on cell width ratios.

- **CSS Grid vs. real tables**: Supporting both `<table>` and CSS-grid-based tables may require different selectors or techniques. Mitigation: Use `.nerv-table` on container (works for both), use `display: table` / `display: table-cell` for grid fallback, or document that hex/triangle rows require CSS Grid.

- **Tiled hex grid decision**: The open question about tiled hex grid variant affects scope. Mitigation: Creative phase will resolve this before implementation begins.

## Status

- [x] Component analysis complete
- [x] Open questions resolved (creative phase complete)
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [ ] Preflight
- [ ] Build
- [ ] QA
