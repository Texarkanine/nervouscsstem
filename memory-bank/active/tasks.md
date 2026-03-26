# Task: Cartouche Multi-Line Table Support

* Task ID: cartouche-table-mode
* Complexity: Level 2
* Type: Simple Enhancement (rework)

Extend the existing fixed cartouche component with table-mode support for multi-cell grid layouts. Per the creative decision (Option B: Optional Table Hybrid), single-content cartouches remain unchanged (`<span>` child); multi-cell layouts use a raw `<table>` child. JS detects the mode via `el.querySelector('table')` and applies per-cell scaling.

## Test Plan (TDD)

### Behaviors to Verify

- **B1**: `.nerv-cartouche-fixed > table` exists in compiled CSS with `width: 100%` and `height: 100%` → table fills the cartouche frame
- **B2**: `.nerv-cartouche-fixed > table` has `border-collapse: collapse` → no extra spacing between cells
- **B3**: `.nerv-cartouche-fixed > table td` exists with `padding: 0` and `white-space: nowrap` → cells are purely structural
- **B4**: `.nerv-cartouche-fixed > table td` has `transform` referencing `--nerv-cartouche-sx` and `--nerv-cartouche-sy` → per-cell scale via custom properties
- **B5**: `.nerv-cartouche-fixed > table td` inherits color (`color: inherit`) → text color from cartouche frame
- **B6**: `.nerv-cartouche-fixed > table` overrides the `> *` transform with `transform: none`
- **B7**: Regression — all existing cartouche tests still pass (covered by existing B1–B15 in Cartouche CSS describe block)

### Edge Cases

- Empty table (no `<td>` elements): JS should skip gracefully, no errors
- Single-cell table: should work like span mode (whole cell scales to fill)
- Table with colspan: CSS layout handles this natively; JS measures rendered cell dimensions

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/components.test.mjs`
- Conventions: `describe`/`it` blocks, CSS string matching against compiled `dist/nerv.css`, JS module import for function-existence checks
- New test files: none — new tests added to existing `Cartouche CSS` describe block

## Implementation Plan

### Step 1: Stub Tests

- Files: `test/components.test.mjs`
- Changes: Add 6 empty test cases (B1–B6) inside a new `describe('Cartouche table-mode CSS')` block after the existing `Cartouche CSS` block

### Step 2: Stub CSS Interface

- Files: `src/_cartouche.scss`
- Changes: Add commented placeholder rules for `.nerv-cartouche-fixed > table` and `.nerv-cartouche-fixed > table td` after the existing fixed variant section

### Step 3: Implement Tests

- Files: `test/components.test.mjs`
- Changes: Fill out all 5 test assertions with CSS string matching

### Step 4: Run Tests (Expect Failure)

- Verify new tests fail (CSS rules not yet implemented)
- Verify existing tests still pass

### Step 5: Implement CSS

- Files: `src/_cartouche.scss`
- Changes: Fill out table/td rules:
  - `.nerv-cartouche-fixed > table`: `width: 100%; height: 100%; border-collapse: collapse; transform: none;` (override `> *` rule)
  - `.nerv-cartouche-fixed > table td`: `padding: 0; border: none; background: transparent; white-space: nowrap; overflow: hidden; color: inherit; font: inherit; transform-origin: center;` + per-cell transform

### Step 6: Implement JS Table-Mode

- Files: `src/nerv.js`
- Changes: Extend `initCartouches` measure function:
  - After finding `.nerv-cartouche-fixed`, check `el.querySelector('table')`
  - **Table mode**: iterate `<td>` elements, measure each cell's natural text width/height vs. rendered cell dimensions, set per-cell `--nerv-cartouche-sx`/`--nerv-cartouche-sy` on each `<td>`
  - **Span mode**: existing single-child behavior, unchanged

### Step 7: Update Reference Page

- Files: `ref/ref-foundation.html`
- Changes:
  - Remove the broken multi-span example (lines 302–306)
  - Add new "Status Cartouche — fixed table-mode" `<section>` with:
    1. **1×2 column** steel cartouche (e.g., `OBJECT :` | `EVA-01`) showing varied text compression
    2. **4-row data panel** steel cartouche replicating the OBJECT: EVA-01 observation feed layout (2-col first row, colspan second/third/fourth rows)
    3. **LIVE + source ID** amber cartouche (LIVE | 第22警戒群) — 1×2 layout with JP text
    4. **LOCKED + OPEN** side-by-side: two separate table-mode cartouches — one red LOCKED, one green OPEN — each with 2-row layout

### Step 8: Run Full Suite

- Verify: `npm run build && npm run test -- --silent` passes all tests
- Verify: `npm run build:min` succeeds
- Visual verification of ref page

## Technology Validation

No new technology — validation not required.

## Dependencies

- Existing: Dart Sass, Node.js test runner
- No new dependencies

## Challenges & Mitigations

- **Per-cell measurement accuracy**: JS needs to temporarily remove transform to measure natural text size, then re-apply. Same pattern already used for span mode — extend it to iterate `<td>` elements.
- **Table height distribution**: HTML tables distribute height among rows proportionally. Cells in shorter rows may get less vertical space, affecting Y-scale. Mitigation: accept native table layout behavior — this matches the reference imagery where rows have varied height.
- **No `.nerv-table` style leak**: Raw `<table>` inside cartouche won't pick up `.nerv-table` styles since those require the class on the `<table>` element. Verified in creative phase.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [x] Build
- [ ] QA
