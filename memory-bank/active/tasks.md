# Task: M4 — Reticle Tickmarks

* Task ID: nerv-m4-reticle
* Complexity: Level 2
* Type: Simple Enhancement (new structural component)

Add CSS-based measurement-ruler tickmarks along panel/container edges via utility classes. Uses `repeating-linear-gradient` for tick marks with configurable color, size, spacing, and width via CSS custom properties. Fits the structural layer alongside panels, dividers, and grid-marks.

## Design

### Custom Properties
- `--nerv-reticle-color`: tick color (default `var(--nerv-primary)`)
- `--nerv-reticle-size`: tick length perpendicular to edge (default `6px`)
- `--nerv-reticle-spacing`: repeat distance, center-to-center (default `10px`)
- `--nerv-reticle-width`: tick stroke width (default `1px`, `2px` in `prefers-contrast: more`)

### Classes
- `.nerv-reticle` — all 4 edges (4-layer background)
- `.nerv-reticle-top` — top edge only
- `.nerv-reticle-right` — right edge only
- `.nerv-reticle-bottom` — bottom edge only
- `.nerv-reticle-left` — left edge only
- `.nerv-reticle-{color}` — color variant (auto-generated for glow-flagged tokens), sets `--nerv-reticle-color`

### Technique
Each edge uses a `repeating-linear-gradient` producing thin perpendicular lines:
- Horizontal edges (top/bottom): gradient runs `to right`, tiled `repeat-x`, sized `100% × reticle-size`, positioned at edge
- Vertical edges (left/right): gradient runs `to bottom`, tiled `repeat-y`, sized `reticle-size × 100%`, positioned at edge
- All-edges class combines 4 background layers
- Color variants just override `--nerv-reticle-color` (since gradients reference `var()`, cascade works naturally)

### Accessibility
- `prefers-contrast: more`: increases `--nerv-reticle-width` to `2px`
- `prefers-reduced-motion`: N/A (static decoration)

## Test Plan (TDD)

### Behaviors to Verify

- B1: `.nerv-reticle` class → compiled CSS contains class with `repeating-linear-gradient` in `background-image`
- B2: `.nerv-reticle` has 4 background layers → `background-position` contains `top`, `bottom`, and `right` keywords
- B3: `.nerv-reticle-top` class → exists with `background-image` containing `repeating-linear-gradient`
- B4: `.nerv-reticle-right` class → exists in compiled CSS
- B5: `.nerv-reticle-bottom` class → exists in compiled CSS
- B6: `.nerv-reticle-left` class → exists in compiled CSS
- B7: `--nerv-reticle-color` custom property → declared in `.nerv-reticle` block
- B8: `.nerv-reticle-amber` color variant → exists and sets `--nerv-reticle-color`
- B9: Regression → existing structural selectors (`.nerv-panel`, `.nerv-divider`, `.nerv-grid-marks`) still present

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/panels.test.mjs` (structural layer tests)
- Conventions: `describe`/`it` blocks, regex and string matching against compiled CSS string
- New test files: none

## Implementation Plan

1. **Stub tests in `test/panels.test.mjs`**
   - Files: `test/panels.test.mjs`
   - Changes: add `describe('Reticle tickmarks', ...)` block with empty `it()` stubs for B1–B9

2. **Stub `src/_reticle.scss` and register in `nerv.scss`**
   - Files: `src/_reticle.scss`, `src/nerv.scss`
   - Changes: create empty partial with doc comment; add `@forward 'reticle'` after `grid-marks` line

3. **Implement tests**
   - Files: `test/panels.test.mjs`
   - Changes: fill in test assertions for B1–B9

4. **Implement `_reticle.scss`**
   - Files: `src/_reticle.scss`
   - Changes: base class (all edges), per-edge classes, color variants via `@each`, `prefers-contrast` media query

5. **Update ref page**
   - Files: `ref/ref-panels.html`
   - Changes: add `.nerv-reticle` to viewport container, add 1–2 per-edge demos on panel elements

## Technology Validation

No new technology — validation not required.

## Dependencies

- `tokens.$nerv-colors` map (for color variant generation)
- Structural layer placement (between `grid-marks` and `stripe-bar` in `nerv.scss`)

## Challenges & Mitigations

- **Background override**: `.nerv-reticle-*` sets `background-image`, which overrides any existing `background-image` on the element. Mitigation: document this trade-off; in practice, reticle is applied to containers/wrappers, not elements with complex backgrounds. Panel `background` shorthand sets `background-color` which persists separately from `background-image`.
- **Color variant cascade**: `.nerv-reticle-{color}` must override `--nerv-reticle-color` set by edge classes. Mitigation: color variants are generated after edge classes in source order, so same-specificity cascade resolves correctly.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [ ] Preflight
- [ ] Build
- [ ] QA
