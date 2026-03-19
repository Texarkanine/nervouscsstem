# Task: M6 — Web Form Styling

* Task ID: nerv-m6-form-styling
* Complexity: Level 2
* Type: Simple Enhancement (new component set)

Style major web form elements (text input, textarea, select, radio, checkbox, button) in the NERV aesthetic. Each element gets a `.nerv-` prefixed class that applies CRT-console styling: dark background, phosphor-colored borders, glow on focus, HUD typography. Custom properties allow per-element color override. A new `_form.scss` partial houses everything.

## Test Plan (TDD)

### Behaviors to Verify

**Text Input**
- B1: `.nerv-input` class exists with border and background styling → compiled CSS contains `.nerv-input` rule with `border` and `background`
- B2: `.nerv-input` declares `--nerv-form-color` custom property defaulting to `--nerv-primary` → CSS block contains `--nerv-form-color`
- B3: `.nerv-input:focus` styles exist with box-shadow glow → CSS contains `.nerv-input:focus` with `box-shadow`
- B4: `.nerv-input::placeholder` styles exist → CSS contains `.nerv-input::placeholder`

**Textarea**
- B5: `.nerv-textarea` class exists with border styling → compiled CSS contains `.nerv-textarea` rule with `border`
- B6: `.nerv-textarea:focus` exists with box-shadow glow → CSS contains `.nerv-textarea:focus` with `box-shadow`

**Select**
- B7: `.nerv-select` class exists with `appearance: none` → CSS contains `.nerv-select` with `appearance`
- B8: `.nerv-select` uses background-image for custom dropdown arrow → CSS block includes `background-image` with `url(`

**Checkbox**
- B9: `.nerv-checkbox` class exists with `appearance: none` → CSS contains `.nerv-checkbox` with `appearance`
- B10: `.nerv-checkbox:checked` styling exists → CSS contains `.nerv-checkbox:checked`

**Radio**
- B11: `.nerv-radio` class exists with `appearance: none` → CSS contains `.nerv-radio` with `appearance`
- B12: `.nerv-radio:checked` styling exists → CSS contains `.nerv-radio:checked`

**Button**
- B13: `.nerv-btn` class exists with border and background → CSS contains `.nerv-btn` with `border`
- B14: `.nerv-btn:hover` styles exist → CSS contains `.nerv-btn:hover`
- B15: `.nerv-btn:focus-visible` styles exist → CSS contains `.nerv-btn:focus-visible`

**Accessibility**
- B16: `prefers-contrast: more` media query targets form elements → last `prefers-contrast: more` block references `.nerv-input` or `.nerv-btn`

**Regression**
- B17: Existing component selectors still present → `.nerv-bar-meter`, `.nerv-label-box`, `.nerv-list` all present

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/components.test.mjs`
- Conventions: `describe` blocks per component, `it` blocks named `B{N}: description`, CSS output inspection via `assert.match` / `assert.ok` + string search on compiled `dist/nerv.css`
- New test files: none (append to `test/components.test.mjs`)

## Implementation Plan

1. **Stub + Register**
   - Files: `src/_form.scss` (new, empty), `src/nerv.scss`
   - Changes: Create empty `_form.scss` with doc comment. Add `@forward 'form'` to `nerv.scss` after `list` and before `states`. Update `nerv.scss` header comment chain to include `form` between `list` and `states`.

2. **Write failing tests**
   - Files: `test/components.test.mjs`
   - Changes: Add `describe('Form styling CSS')` block with all 17 test cases (B1–B17). Run tests — all new tests should fail.

3. **Text input + Textarea (B1–B6)**
   - Files: `src/_form.scss`
   - Changes: Implement `.nerv-input` and `.nerv-textarea` — shared custom properties (`--nerv-form-color`, `--nerv-form-color-rgb`), dark background (`--nerv-bg`), phosphor border (`--nerv-form-color`), HUD typography (Barlow Condensed, uppercase, letter-spacing), `:focus` glow (box-shadow), `::placeholder` styling. Textarea additionally gets `resize: vertical`.

4. **Select (B7–B8)**
   - Files: `src/_form.scss`
   - Changes: Implement `.nerv-select` — `appearance: none`, matching border/bg/font treatment, custom dropdown chevron via SVG data URI in `background-image` (right-aligned, no-repeat).

5. **Checkbox + Radio (B9–B12)**
   - Files: `src/_form.scss`
   - Changes: Implement `.nerv-checkbox` and `.nerv-radio` — `appearance: none`, fixed dimensions, border, cursor: pointer. Checked states via `::before` pseudo-element or `background` change. Checkbox checked: filled square or X mark. Radio checked: inner dot. Both using `--nerv-form-color`.

6. **Button (B13–B15)**
   - Files: `src/_form.scss`
   - Changes: Implement `.nerv-btn` — border, transparent background, phosphor color, HUD typography, cursor: pointer. `:hover` with tint + glow (behind `@media (hover: hover)`). `:focus-visible` with glow ring (same pattern as label-box). `:active` with press effect.

7. **Accessibility (B16–B17)**
   - Files: `src/_form.scss`
   - Changes: Add `prefers-contrast: more` block increasing border widths. Add `prefers-reduced-motion: reduce` block disabling transitions. Verify regression by running existing tests.

8. **Reference page**
   - Files: `ref/ref-forms.html` (new)
   - Changes: Create demonstration page showing all form elements in default and various states. Follow ref page conventions from existing pages (loads `dist/nerv.css`, uses `.nerv-panel` containers, documents each element).

## Technology Validation

No new technology — validation not required. All techniques used (`appearance: none`, SVG data URI in `background-image`, `box-shadow` glow, `:focus-visible`, `::placeholder`) are established patterns in this project or have broad browser support.

## Dependencies

- `@use 'tokens'` — if color variants are needed later (not for V1)
- `--nerv-primary`, `--nerv-primary-rgb` — ambiance meta-tokens
- `--nerv-bg`, `--nerv-bg-rgb` — background tokens
- `--nerv-border-width` — border width token
- `--nerv-glow-spread`, `--nerv-glow-intensity` — glow tokens

## Challenges & Mitigations

- **Custom select arrow**: SVG data URI chevron in `background-image` — established pattern (grid-marks uses SVG data URIs). Needs `padding-right` to prevent text overlapping arrow. Mitigation: generous right padding + `text-overflow: ellipsis`.
- **Checkbox/radio `appearance: none`**: Broad support, but `::before`/`::after` on replaced elements is technically undefined in some older browsers. Mitigation: use `background` + `border` changes for checked state instead of pseudo-elements where possible.
- **Label-box vs `.nerv-btn` overlap**: `.nerv-btn` is for standard form submit/action buttons (rectangular, no skew); `.nerv-label-box` is for HUD mode-indicator parallelogram buttons. Different shapes, different use cases. No conflict.
- **`prefers-contrast`**: Must increase border widths for form elements and reduce glow reliance. Mitigation: use `--nerv-border-width` token which is already 2px under `prefers-contrast: more`.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [x] Build
- [ ] QA
