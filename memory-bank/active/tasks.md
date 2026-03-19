# Task: M5 — List Styling

* Task ID: nerv-m5-list-styling
* Complexity: Level 2
* Type: Simple Enhancement (new component)

Add angled 45-degree pillbox helper classes with configurable color for list items. Each `<li>` is shaped into a symmetric hexagonal pillbox via `clip-path: polygon()`, creating the characteristic NGE HUD list appearance. New SCSS partial `_list.scss` in the component layer.

## Test Plan (TDD)

### Behaviors to Verify

- B1: `.nerv-list` class exists with `list-style: none` and flex column layout → compiled CSS contains `.nerv-list` block with `list-style` and `display: flex`
- B2: `.nerv-list > li` (or nested rule) applies `clip-path` with `polygon` for the pillbox shape → compiled CSS contains `clip-path` with `polygon()` on list item selector
- B3: `--nerv-list-color` custom property declared on `.nerv-list` → compiled CSS contains `--nerv-list-color` in the `.nerv-list` block
- B4: `--nerv-list-color-rgb` custom property declared on `.nerv-list` → compiled CSS contains `--nerv-list-color-rgb` in the `.nerv-list` block
- B5: `--nerv-list-inset` custom property declared on `.nerv-list` → compiled CSS contains `--nerv-list-inset` in the `.nerv-list` block
- B6: `.nerv-list-amber` color variant exists and sets `--nerv-list-color` → compiled CSS contains auto-generated color variant class
- B7: `prefers-contrast: more` media query targets `.nerv-list` items → compiled CSS contains contrast media query referencing list
- B8: `.nerv-list` li background uses `rgba` with `--nerv-list-color-rgb` → compiled CSS contains `rgba` background referencing the rgb token
- B9: Regression — existing component selectors (`.nerv-bar-meter`, `.nerv-label-box`, `.nerv-segment-display`) still present → no breakage

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/components.test.mjs`
- Conventions: `describe()` per component, `it()` per behavior prefixed `B<n>:`, tests inspect compiled `dist/nerv.css` string
- New test files: none — tests added to existing `test/components.test.mjs`

## Implementation Plan

1. **Stub tests** in `test/components.test.mjs`
   - Files: `test/components.test.mjs`
   - Changes: Add `describe('List styling CSS')` block with 9 empty `it()` stubs (B1–B9)

2. **Stub `src/_list.scss`**
   - Files: `src/_list.scss` (new)
   - Changes: Create file with full doc comment header and empty body

3. **Register partial in entry point**
   - Files: `src/nerv.scss`
   - Changes: Add `@forward 'list'` in the component layer (after `status-text`, before `states`); update header comment dependency chain to include `list`

4. **Implement tests** (B1–B9)
   - Files: `test/components.test.mjs`
   - Changes: Fill all 9 test stubs with assertions against compiled CSS string

5. **Run tests** — expect 8 new tests to fail (B9 regression should pass), confirming TDD red phase

6. **Implement `_list.scss`**
   - Files: `src/_list.scss`
   - Changes: Full implementation:
     - `.nerv-list` container: `--nerv-list-color`, `--nerv-list-color-rgb`, `--nerv-list-inset` custom properties; `list-style: none`; `display: flex; flex-direction: column; gap`
     - `.nerv-list > li` children: `clip-path: polygon()` hexagonal pillbox; `background: rgba(...)` fill; padding accounting for inset; `color` from token; `font-family: Barlow Condensed`
     - `.nerv-list-{color}` auto-generated variants via `@each` loop over `tokens.$nerv-colors`
     - `prefers-contrast: more` — increase background opacity

7. **Run tests** — all tests should pass

8. **Add demo section to ref page**
   - Files: `ref/ref-components.html`
   - Changes: Add "Lists" section demonstrating: default list, color variants, different content lengths

## Technology Validation

No new technology — `clip-path: polygon()`, CSS custom properties, SCSS `@each` loops, and `filter: drop-shadow()` are all established patterns in the project. Validation not required.

## Dependencies

- `tokens.$nerv-colors` map (via `@use 'tokens'`) for color variant generation
- `--nerv-primary` / `--nerv-primary-rgb` ambiance tokens for default color
- `--nerv-border-width` token (for contrast mode adjustments)
- `--nerv-glow-spread` / `--nerv-glow-intensity` tokens (for drop-shadow glow)

## Challenges & Mitigations

- **clip-path vs borders**: `clip-path` clips CSS borders, so traditional `border` styling won't render. **Mitigation**: Use `filter: drop-shadow()` for the NERV glow outline — this respects the clip-path boundary and produces a cleaner NGE aesthetic than bordered rectangles.
- **45-degree approximation**: The pillow "point" angle depends on the ratio of `--nerv-list-inset` to the item height. True 45° requires inset = half-height, which varies with content. **Mitigation**: Default `--nerv-list-inset: 0.9em` is tuned for typical single-line items with standard padding; the custom property lets consumers adjust.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [x] Build
- [x] QA
