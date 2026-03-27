# Task: M3 — Rainbow Gradients

* Task ID: nerv-phase7-m3
* Complexity: Level 2
* Type: Simple Enhancement

Implement a reusable gradient utility module (`_gradient.scss`) that makes it easy to apply smooth `linear-gradient` backgrounds between any two built-in NERV color tokens, with presets for the canonical NGE gradient combinations already proven in the bar meter system. Consumers apply a single class (preset) or a class + two custom properties (custom) to any container element.

## Test Plan (TDD)

### Behaviors to Verify

- B1 (class exists): `.nerv-gradient` base class exists in compiled CSS with `linear-gradient`
- B2 (custom properties): `.nerv-gradient` references `--nerv-gradient-from`, `--nerv-gradient-to`, and `--nerv-gradient-direction`
- B3 (preset — thermal): `.nerv-gradient-thermal` sets `--nerv-gradient-from` to `--nerv-green` and `--nerv-gradient-to` to `--nerv-red`
- B4 (preset — energy): `.nerv-gradient-energy` sets `--nerv-gradient-from` to `--nerv-cyan` and `--nerv-gradient-to` to `--nerv-blue`
- B5 (preset — warning): `.nerv-gradient-warning` sets `--nerv-gradient-from` to `--nerv-amber` and `--nerv-gradient-to` to `--nerv-red`
- B6 (preset — field): `.nerv-gradient-field` sets `--nerv-gradient-from` to `--nerv-void` and `--nerv-gradient-to` to `--nerv-amber`
- B7 (preset — rainbow): `.nerv-gradient-rainbow` exists with a multi-stop hue sweep (not just two-color)
- B8 (opacity): `.nerv-gradient` references `--nerv-gradient-opacity`
- Edge E1 (no regression): Foundation tokens, effects, and structural selectors still present

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/`
- Conventions: `describe`/`it` blocks, regex matching against compiled `dist/nerv.css` string. One `before()` hook runs `npm run build`. Tests grouped by describe block per feature area.
- New test files: none — tests added to `test/patterns.test.mjs` (gradient is a visual pattern, alongside stripe, hex, radar)

## Implementation Plan

1. **Stub test cases** in `test/patterns.test.mjs`
   - Files: `test/patterns.test.mjs`
   - Changes: Add `describe('Gradient utilities')` block with empty `it()` stubs for B1–B8

2. **Create `src/_gradient.scss` with stub/empty content**
   - Files: `src/_gradient.scss`
   - Changes: File with doc comment header, empty class stubs for `.nerv-gradient`, presets

3. **Register in entry point**
   - Files: `src/nerv.scss`
   - Changes: Add `@forward 'gradient'` — after `bar-meter` (it's a utility that consumes tokens, no downstream dependents)

4. **Implement tests**
   - Files: `test/patterns.test.mjs`
   - Changes: Fill out all `it()` bodies with regex/string assertions against compiled CSS

5. **Run tests — expect failures** (TDD red)

6. **Implement `_gradient.scss`**
   - Files: `src/_gradient.scss`
   - Changes:
     - Custom properties: `--nerv-gradient-from` (default `--nerv-amber`), `--nerv-gradient-to` (default `--nerv-red`), `--nerv-gradient-direction` (default `to right`), `--nerv-gradient-opacity` (default `1`)
     - `.nerv-gradient` base class: `background: linear-gradient(var(--nerv-gradient-direction), rgba(from var(--nerv-gradient-from) r g b / var(--nerv-gradient-opacity)), rgba(from var(--nerv-gradient-to) r g b / var(--nerv-gradient-opacity)))`
     - Fallback: if relative color syntax isn't broadly supported, use a stacked approach with a gradient + opacity on a pseudo-element, or simply document that opacity is controlled via the container's own `opacity` property. Alternatively, use the existing `--nerv-*-rgb` token pattern.
     - Presets: `.nerv-gradient-thermal`, `.nerv-gradient-energy`, `.nerv-gradient-warning`, `.nerv-gradient-field` — each sets `--nerv-gradient-from`/`--nerv-gradient-to`
     - `.nerv-gradient-rainbow`: multi-stop linear-gradient through red→amber→green→cyan→blue using named NERV tokens

7. **Run tests — expect passes** (TDD green)

8. **Add ref page demo**
   - Files: `ref/ref-patterns.html`
   - Changes: Add a gradient demo section showing presets as background containers (with content layered on top), plus a custom gradient example

## Technology Validation

No new technology — validation not required. Uses standard CSS `linear-gradient()` and existing NERV color tokens.

## Dependencies

- `_tokens.scss` — consumes `--nerv-*` and `--nerv-*-rgb` custom properties (CSS-level, no `@use` needed)

## Challenges & Mitigations

- **Opacity with `linear-gradient`**: CSS `linear-gradient` doesn't directly accept an opacity parameter on hex colors. Mitigation: use the existing `--nerv-*-rgb` triplet tokens with `rgba()` — the same pattern used throughout the codebase (hex grid fills, scanlines, etc.). This is proven and compatible.
- **CSS property replacement**: Per `systemPatterns.md`, `background` is a replacement property. Gradient classes set `background` directly, so consumers stacking other background effects will need compound declarations. This is inherent to CSS and documented, not a bug. The ref page demo should show the standalone use case (gradient as sole background).

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [ ] Preflight
- [ ] Build
- [ ] QA
