# Task: M4 — Data Background

* Task ID: nerv-phase7-m4
* Complexity: Level 2
* Type: Simple Enhancement (additive module)

Create a data background module (`.nerv-data-bg`) with binary (0/1) and DNA (CAGT) fill modes. JS generates monospace character grids and injects them as absolutely-positioned inner layers. CSS handles seamless vertical scroll animation with criticality-driven speed escalation via `--nerv-animation-speed`. The text color follows the alert cascade via `var(--nerv-primary)`.

## Test Plan (TDD)

### Behaviors to Verify

- B1: `.nerv-data-bg` class exists in compiled CSS with `position: relative` and `overflow: hidden`
- B2: `.nerv-data-bg-inner` class exists with `position: absolute` and `pointer-events: none`
- B3: `--nerv-data-bg-duration` token exists in `:root`
- B4: `.nerv-data-bg-inner` animation references both `nerv-data-bg-scroll` keyframes and `--nerv-animation-speed` for criticality scaling
- B5: `@keyframes nerv-data-bg-scroll` exists with `translateY`
- B6: `prefers-reduced-motion` suppresses data-bg animation
- B7: `.nerv-data-bg-inner` color references `var(--nerv-primary)` (cascade-responsive)
- B8: `.nerv-data-bg-binary` modifier class exists
- B9: `.nerv-data-bg-dna` modifier class exists
- B10: `NERV.initDataBackgrounds` function exists in module exports
- B11: `--nerv-data-bg-opacity` custom property referenced (consumer-tunable opacity)

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/`
- Conventions: `*.test.mjs`, `describe`/`it` blocks, regex/string assertions on compiled CSS content
- New test files: none — tests added to existing `test/patterns.test.mjs`

## Implementation Plan

1. **Add `--nerv-data-bg-duration` token**
   - Files: `src/_tokens.scss`
   - Changes: Add `--nerv-data-bg-duration: 30s` to `:root` utility tokens section

2. **Create `_data-bg.scss` with documentation and class stubs**
   - Files: `src/_data-bg.scss` (new)
   - Changes: Full doc comment (purpose, class API, tokens consumed), empty `.nerv-data-bg`, `.nerv-data-bg-inner`, modifier, keyframes, and accessibility stubs

3. **Register module in entry point**
   - Files: `src/nerv.scss`
   - Changes: Add `@forward 'data-bg'` after `gradient`, before `segment-display`. Update the header comment dependency graph.

4. **Stub `initDataBackgrounds` in JS**
   - Files: `src/nerv.js`
   - Changes: Add empty `initDataBackgrounds` function to NERV namespace, call from `NERV.init()`'s `run()`. Update JSDoc header.

5. **Write all test cases**
   - Files: `test/patterns.test.mjs`
   - Changes: Add `describe('Data background')` block with B1–B9 CSS assertions and add `NERV.initDataBackgrounds` check to the existing `nerv.js API surface` describe block (B10). Run tests — all new tests should fail.

6. **Implement `_data-bg.scss`**
   - Files: `src/_data-bg.scss`
   - Changes: `.nerv-data-bg` (position, overflow, isolation), `.nerv-data-bg-inner` (absolute positioning, full coverage, animation, color via `var(--nerv-primary)`, font, `--nerv-data-bg-opacity` custom property, pointer-events, user-select), `.nerv-data-bg-binary`/`.nerv-data-bg-dna` (mode markers — JS reads these to determine character set), `@keyframes nerv-data-bg-scroll` (translateY 0 to -50%), `prefers-reduced-motion` suppression, `prefers-contrast` opacity adjustment

7. **Implement `initDataBackgrounds` in JS**
   - Files: `src/nerv.js`
   - Changes: Query `.nerv-data-bg` elements, determine mode from class (binary/DNA), generate random character grid string, create inner div with duplicated content for seamless loop, inject into container. Respect `prefers-reduced-motion` by still generating content (visible but static).

8. **Add ref page demo**
   - Files: `ref/ref-patterns.html`
   - Changes: Add data background demo section showing binary and DNA modes in fixed-size containers, with labels. Add to the ref page between the gradient section and the grid marks section.

## Technology Validation

No new technology — validation not required. Uses existing Dart Sass compilation and vanilla JS. Font used (`IBM Plex Mono`) is already in the design system's stack.

## Dependencies

- `--nerv-animation-speed` token (exists in `_tokens.scss`, overridden by `_states.scss`)
- `--nerv-primary` / `--nerv-primary-rgb` ambiance tokens (exist in `_tokens.scss`)
- `IBM Plex Mono` font (already declared in `_typography.scss`)
- Existing `NERV.init()` orchestration pattern in `nerv.js`

## Challenges & Mitigations

- **Seamless scroll loop**: The inner element must be exactly double-height with two identical content blocks. The `translateY(-50%)` animation endpoint aligns the second block to where the first started. Mitigation: generate fixed content once, clone it, verify visually in ref page.
- **Container sizing**: The character grid is a fixed-size block of text. If the container is very large, gaps may appear at edges. Mitigation: generate a generous grid (80 cols × 60 rows) and rely on `overflow: hidden` to crop. The text wraps naturally within the inner div width.
- **CSS property replacement with `background`**: Since `.nerv-data-bg` uses DOM children (not `background-image`), it avoids the background-property collision issue entirely. This is a deliberate advantage of the DOM-injection approach over SVG data URI backgrounds.
- **High-contrast mode**: The background text should become slightly more opaque (rather than less) so it remains visible as a texture signal. `prefers-contrast: more` adjusts `--nerv-data-bg-opacity`.

## Preflight Amendments

1. **CONVENTION FIX**: Renamed `.nerv-data-bg__inner` → `.nerv-data-bg-inner` (project uses flat naming, no BEM `__`)
2. **CONVENTION FIX**: Renamed `.nerv-data-bg--binary`/`--dna` → `.nerv-data-bg-binary`/`.nerv-data-bg-dna` (project uses flat naming, no BEM `--`)
3. **COMPLETENESS**: Added B11 — `--nerv-data-bg-opacity` custom property (follows `_gradient.scss` pattern for consumer-tunable opacity)
4. **INNOVATION**: `--nerv-data-bg-opacity` exposed as class-level custom property (default `0.15`), matching `_gradient.scss`'s `--nerv-gradient-opacity` pattern

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [x] Build
- [ ] QA
