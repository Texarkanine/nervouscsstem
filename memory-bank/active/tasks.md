# Task: Status Cartouche Element

* Task ID: cartouche
* Complexity: Level 2
* Type: Simple Enhancement

New `.nerv-cartouche` CSS component — the iconic single-color bordered frame enclosing status words. Two variants: **flex** (default, sizes to content) and **fixed** (explicit dimensions, text stretches to fill via independent X/Y scaling). Semantic color variants auto-generated from `$nerv-colors`. Mixed JP/EN support via the `NERV Mixed` font stack.

## Test Plan (TDD)

### Behaviors to Verify

- B1: `.nerv-cartouche` base class exists in compiled CSS with `display` set to `inline-flex`
- B2: `.nerv-cartouche` declares `--nerv-cartouche-color` custom property (defaulting to `--nerv-primary`)
- B3: `.nerv-cartouche` declares `--nerv-cartouche-color-rgb` custom property
- B4: `.nerv-cartouche` uses the mixed font stack (contains `NERV Mixed` or `Barlow Condensed`)
- B5: `.nerv-cartouche` has `text-transform: uppercase`
- B6: `.nerv-cartouche` has `border` referencing `--nerv-cartouche-color`
- B7: `.nerv-cartouche-fixed` class exists in compiled CSS
- B8: `.nerv-cartouche-fixed` inner content uses `transform` with `scale` and references `--nerv-cartouche-sx` / `--nerv-cartouche-sy` custom properties
- B9: `.nerv-cartouche-fixed` sets `white-space: nowrap` to prevent text wrapping during measurement
- B10: Color variant `.nerv-cartouche-red` exists and sets `--nerv-cartouche-color`
- B11: Color variant `.nerv-cartouche-green` exists and sets `--nerv-cartouche-color`
- B12: `prefers-contrast: more` media query targets `.nerv-cartouche` (increased border-width)
- B13: `NERV.initCartouches` is a function in nerv.js
- B14: Regression — existing component selectors still present (`.nerv-bar-meter`, `.nerv-list`, `.nerv-table`)

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/`
- Conventions: Tests compile CSS via `npm run build`, read `dist/nerv.css` as string, assert against regex/indexOf patterns. Component tests live in `test/components.test.mjs`.
- New test files: none — tests go into existing `test/components.test.mjs`

## Implementation Plan

1. **Stub tests** in `test/components.test.mjs`
   - Files: `test/components.test.mjs`
   - Changes: Add `describe('Cartouche CSS', ...)` block with empty test cases for B1–B12, B14. Add test for B13 in nerv.js API section.

2. **Implement tests**
   - Files: `test/components.test.mjs`
   - Changes: Fill out test bodies with assertions against compiled CSS string.

3. **Run tests — all new cartouche tests should FAIL** (red phase)

4. **Create `src/_cartouche.scss`** with stub
   - Files: `src/_cartouche.scss`
   - Changes: Create file with doc comment and empty/minimal selectors.

5. **Register in entry point**
   - Files: `src/nerv.scss`
   - Changes: Add `@forward 'cartouche';` after `status-text` (component layer, before `list`).

6. **Implement flex cartouche (base)**
   - Files: `src/_cartouche.scss`
   - Changes:
     - `.nerv-cartouche`: `display: inline-flex; align-items: center; justify-content: center;`
     - `--nerv-cartouche-color: var(--nerv-primary); --nerv-cartouche-color-rgb: var(--nerv-primary-rgb);`
     - `border: var(--nerv-border-width) solid var(--nerv-cartouche-color);`
     - `padding: 0.15em 0.6em;`
     - Font: `font-family: 'NERV Mixed', 'Shippori Mincho B1', 'Barlow Condensed', sans-serif;`
     - `font-weight: 400; text-transform: uppercase; letter-spacing: 0.08em;`
     - `--nerv-cartouche-radius` custom property (default small radius; set to 0 for sharp rectangle)
     - `color: var(--nerv-cartouche-color); white-space: nowrap;`

7. **Implement fixed cartouche modifier**
   - Files: `src/_cartouche.scss`
   - Changes:
     - `.nerv-cartouche-fixed`: `overflow: hidden;`
     - `.nerv-cartouche-fixed > *`: `display: block; transform: scale(var(--nerv-cartouche-sx, 1), var(--nerv-cartouche-sy, 1)); transform-origin: center; white-space: nowrap;`

8. **Implement color variants**
   - Files: `src/_cartouche.scss`
   - Changes: `@each` loop over `tokens.$nerv-colors` (glow-flagged) generating `.nerv-cartouche-{name}` that sets `--nerv-cartouche-color` and `--nerv-cartouche-color-rgb`.

9. **Implement accessibility**
   - Files: `src/_cartouche.scss`
   - Changes: `@media (prefers-contrast: more)` block increasing border-width on `.nerv-cartouche`.

10. **Add `NERV.initCartouches` to nerv.js**
    - Files: `src/nerv.js`
    - Changes: New function that finds all `.nerv-cartouche-fixed` elements, measures inner content vs container, sets `--nerv-cartouche-sx` and `--nerv-cartouche-sy` CSS custom properties. Register in `NERV.init()`.

11. **Run tests — all should PASS** (green phase)

12. **Add demo to `ref/ref-foundation.html`**
    - Files: `ref/ref-foundation.html`
    - Changes: New `<section>` after the drop-shadow glow section (before `</body>`) with:
      - `ref-label`: "Status Cartouche (.nerv-cartouche)"
      - `ref-row` of flex cartouches: IDENTIFIED (red), CAPTURE (amber), NOMINAL (green), CONDITION BLUE (cyan), PILOT VANISHED (white/steel)
      - `ref-row` of fixed cartouches: fixed-size examples with JS-scaled text
      - `<script>` tag calling `NERV.initCartouches()` (or existing NERV.init invocation)

13. **Build verification**
    - Run `npm run build && npm run build:min` — both must succeed
    - Run full test suite — all tests must pass

## Technology Validation

No new technology — validation not required. Uses existing SCSS/Dart Sass compilation, existing `$nerv-colors` loop pattern, existing nerv.js orchestration pattern.

## Dependencies

- `_tokens.scss` — `$nerv-colors` map for color variant generation
- `_typography.scss` — `NERV Mixed` font-face declarations (consumed via the font stack, not `@use`)
- `nerv.js` — JS orchestration for fixed cartouche text scaling

## Challenges & Mitigations

- **Fixed cartouche text scaling**: Pure CSS cannot do independent X/Y text scaling to fill a container. Mitigation: use JS orchestration (`NERV.initCartouches`) to measure natural text size and compute `scaleX`/`scaleY`, setting them as CSS custom properties. This is consistent with existing patterns (`initGhostSegments`, `initBarMeters`, `initLabelBoxGroups`).
- **CSS property replacement**: `box-shadow` on cartouche must not collide with glow utilities if composed. Mitigation: cartouche base does not set `box-shadow` — consumers can freely add `.nerv-glow-*` on top.
- **Font loading**: The `NERV Mixed` font face depends on CDN loading. If fonts haven't loaded, fallback to `Barlow Condensed` still looks appropriate. The JS measurement for fixed cartouches should run after fonts are loaded (use `document.fonts.ready`).

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [x] Build
- [x] QA
