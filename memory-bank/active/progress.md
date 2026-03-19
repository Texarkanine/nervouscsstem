# Progress: M7 — Table Styling with Special Row Types

Implement table styling with special row types: base phosphor-outline tables, alternating triangle rows, hexagon rows (with in-phase/out-of-phase offset), and stretchable trapezoid rows. Note: Tiled hex grid variant deferred to future hex-grid enhancement.

**Complexity:** Level 3

## Phase History

### Complexity Analysis — Complete
Classified as Level 3 (Intermediate Feature). Complete feature requiring multiple sub-components (base tables, triangle rows, hexagon rows, trapezoid rows) and design decisions. Affects multiple components but no system architecture changes. New SCSS partial will be created following project conventions.

### Plan — Complete (revised after operator feedback)
Designed `.nerv-table` base class with phosphor-outline styling and fill/border mode orthogonality following `_list.scss` precedent (default translucent, bordered, outline, solid). Auto-generated `.nerv-table-{color}` color variants from `$nerv-colors`. Geometric row types: `.nerv-table-triangle`, `.nerv-table-hex`, `.nerv-table-trapezoid`. 17 test behaviors. 9 implementation steps. Files: `src/_table.scss` (new), `src/nerv.scss` (add @forward), `test/components.test.mjs` (17 tests), `ref/ref-tables.html` (new demo page). No new dependencies.

**Operator feedback (plan revision 1)**: Tables must follow the same fill/border/color design language as lists. Fill modes (translucent, bordered, outline, solid), color variants from `$nerv-colors`, and the clip-path/border limitation all carry over. FUTURE.md updated: tiled hex grid forked into its own entry, completed milestones marked, Tables section removed.

**Operator feedback (plan revision 2)**: Geometric shapes are row-level modifiers, not table-level. Rows within a single table should be freely mixable (e.g. 2 triangle rows, then trapezoid, then hex). Table-level shape class sets the default; row-level class overrides. Ref page must demo mixed-row tables and table-level-default-with-row-override.

**Creative decision**: Tiled hex grid variant (true honeycomb tessellation) resolved via architecture exploration. Decision: implement as `.nerv-hex-grid-tiled` variant in `_hex-grid.scss` (future enhancement), not as part of M7. Explicit FUTURE.md entry created.

### Preflight — Complete (PASS)

Found and fixed one specificity bug: row-level shape selectors (e.g., `tr.nerv-table-triangle > td`) had specificity (0,1,2) — lower than table-level `.nerv-table.nerv-table-triangle td` at (0,2,1). Row-level overrides would not have worked. Fix: row-level selectors now include `.nerv-table` ancestor context (`.nerv-table tr.nerv-table-triangle > td` → (0,2,2)). Plan amended in tasks.md steps 5 and 6.

Convention compliance, dependency impact, conflict detection, and completeness all verified. Two advisory items noted: (1) shared fill/border/color mixin opportunity (out of scope), (2) CSS-grid table support clarification (HTML table + grid display works with current selectors).

### Build — Complete (PASS)

Implemented all 8 plan steps following TDD. Created `src/_table.scss` with base phosphor-outline table styling, 4 fill modes (default translucent, bordered, outline, solid), auto-generated color variants from `$nerv-colors`, and 3 geometric row types (triangle, hexagon, trapezoid) with both table-level default and row-level override cascade. Applied preflight specificity fix (row-level selectors at (0,2,2) beat table-level (0,2,1)). Added `prefers-contrast: more` and `prefers-reduced-motion: reduce` accessibility blocks. Registered in `nerv.scss` after form, before states. 18 new tests all pass, 256/256 total suite. Stylelint clean, both builds succeed. Reference page `ref/ref-tables.html` created with 7 sections covering all variants and mixed-row demos. One pre-existing form test (B16) required a minor fix — it was checking the "last" prefers-contrast block, which now belongs to tables instead of forms.

### QA — Complete (PASS)

Found and fixed one trivial inconsistency: table-level `.nerv-table-hex-alt` was missing hex clip-path on cells (only had alternating row offset), while row-level hex-alt was self-contained. Fixed by adding base hex clip-path selector to table-level hex-alt. Advisory deferred: table-level vs. row-level shape property duplication could use private mixins but exists for specificity reasons. All 11 acceptance criteria verified. 256/256 tests pass, stylelint clean.

### Rework (operator feedback) — Complete

Operator visual review identified three adjustments: (1) table container border should be optional — geometric shapes look better without chrome. Added `.nerv-table-borderless` to strip border, glow, and cell borders. (2) Hexagons need equilateral option. Added `.nerv-table-hex-eq` with `aspect-ratio: 1.1547` and overflow clipping; default `.nerv-table-hex` remains long/stretchy. (3) Triangle tessellation gaps (diamond-shaped voids between cells) are an inherent CSS clip-path limitation — accepted as valid NERV aesthetic. Trapezoid gaps deferred (same root cause). Updated ref page with borderless triangle demos and long vs equilateral hex comparison. 3 new tests, 259/259 total pass.

### Reflect — Complete

Plan accuracy was high — implementation sequence worked as specified with no reordering. Preflight's specificity bug catch prevented a confusing cascade failure during build. QA caught one real issue (hex-alt table-level missing clip-path). Key technical insight: dual-tier specificity pattern for container-default + child-override is reusable. Process insight: plans should explicitly specify "modifier" vs "standalone" semantics at every application level.
