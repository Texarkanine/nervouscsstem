# Task: M2 — Tiled Hex Grid (True Honeycomb Tessellation)

* Task ID: nerv-phase7-m2
* Complexity: Level 2
* Type: Simple Enhancement

Implement `.nerv-hex-grid-tiled` as a third spacing variant in `_hex-grid.scss`. The variant produces a mathematically perfect flat-top hexagonal honeycomb with no gaps and no overlaps between cells — the "lockout hex-wall" use case.

## Geometry

For flat-top regular hexagons with side length s = W/2, width W = 80px, height H = W×√3/2 ≈ 69.28px:

- **Within-row bounding-box gap**: W/2 = 40px (center-to-center 3W/2 = 120px)
- **Odd-row horizontal offset**: 3W/4 = 60px
- **Row-to-row vertical offset**: H/2 ≈ 34.64px (margin-top = −H/2)

Adjacent-row hexes share edges exactly along the diagonal sides. Same-row hexes do NOT share edges; the triangular voids between them are filled perfectly by adjacent-row hexes.

## Test Plan (TDD)

### Behaviors to Verify

- B1: `.nerv-hex-grid-tiled` class appears in compiled CSS
- B2: Tiled rows use gap wider than default 2px (W/2 = 40px for 80px cells)
- B3: Tiled odd-row margin-left is 3/4 cell width (60px, not default 40px)
- B4: Tiled rows use negative margin-top for tessellation overlap (~-34.64px, not default -15px)
- B5: Tiled variant composes with `.nerv-hex-grid-filled` (filled cells still style correctly)
- E1 (edge): existing `.nerv-hex-grid` default behavior unchanged (gap: 2px, overlap: -15px)
- E2 (edge): existing `.nerv-hex-grid-spaced` behavior unchanged

### Test Infrastructure

- Framework: Node.js built-in test runner (`node:test`)
- Test location: `test/patterns.test.mjs`, inside existing `describe('Hex grid CSS', ...)`
- Conventions: `describe`/`it` blocks, assertions against compiled CSS string
- New test files: none

## Implementation Plan

1. **Stub tests** (TDD Step 2)
   - Files: `test/patterns.test.mjs`
   - Changes: Add 5 empty `it()` blocks for B1–B5 inside `describe('Hex grid CSS', ...)`

2. **Stub interface** (TDD Step 2)
   - Files: `src/_hex-grid.scss`
   - Changes: Add empty `.nerv-hex-grid-tiled` rule block with doc comment; update file-level doc comment to list `.nerv-hex-grid-tiled`

3. **Implement tests** (TDD Step 3)
   - Files: `test/patterns.test.mjs`
   - Changes: Fill in test bodies — CSS string assertions for class existence, gap values, margin values, composability

4. **Run tests — expect failures** (TDD Step 3)
   - Verify all 5 new tests fail (class doesn't exist yet)

5. **Implement tiled variant SCSS** (TDD Step 4)
   - Files: `src/_hex-grid.scss`
   - Changes:
     - Add `$_hex-cell-height` and tiled geometry variables
     - Add `.nerv-hex-grid-tiled > .nerv-hex-row` gap override
     - Add `.nerv-hex-grid-tiled > .nerv-hex-row:nth-child(odd)` margin-left override
     - Add `.nerv-hex-grid-tiled > .nerv-hex-row:not(:first-child)` margin-top override

6. **Run tests — expect pass** (TDD Step 4)
   - All new tests pass; existing tests unaffected

7. **Update ref page** (documentation)
   - Files: `ref/ref-patterns.html`
   - Changes: Add "Tiled — Hex Wall (Lockout)" demo section showing the tiled variant with mixed states

8. **Final verification**
   - `npm run build && npm run test && npm run lint`
   - Visual check of ref page

## Technology Validation

No new technology — validation not required.

## Dependencies

- Existing `_hex-grid.scss` infrastructure (cell width, clip-path, state classes)
- Existing `_tokens.scss` (color tokens, ambiance tokens)

## Challenges & Mitigations

- **Sub-pixel rounding**: SCSS-computed overlap (34.641px) may differ from browser's `aspect-ratio: 1.1547` computation by fractions of a pixel. Mitigation: acceptable for CSS rendering; browser sub-pixel rendering handles gracefully.
- **Specificity**: Tiled overrides must beat base `.nerv-hex-row` rules. Mitigation: `.nerv-hex-grid-tiled > .nerv-hex-row` adds an extra class to specificity, guaranteed to win.
- **Edge rows**: First/last rows have exposed triangular voids (no adjacent row to fill them). Mitigation: expected behavior — hex grid has natural zigzag edges; documented in doc comment.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [ ] Build
- [ ] QA
