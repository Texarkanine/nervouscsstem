# Task: nerv-phase2-effects

* Task ID: nerv-phase2-effects
* Complexity: Level 2
* Type: Simple Enhancement

Implement the Effects Layer (Phase 2) of the NERV Design System: three SCSS partials (`_scanlines.scss`, `_flicker.scss`, `_glitch.scss`), forward them from `nerv.scss`, add automated tests, and deliver `ref/ref-effects.html` as the visual test fixture. All effects layer on top of Phase 1's Foundation without modifying existing modules.


## Test Plan (TDD)

### Behaviors to Verify

- **Build with effects**: `npm run build` exits 0 after adding three new `@forward` lines to `nerv.scss` → `dist/nerv.css` produced
- **Scanline class**: compiled CSS contains `.nerv-scanlines` → class present with `position: fixed` and `pointer-events: none`
- **Scanline gradient**: `.nerv-scanlines` uses `repeating-linear-gradient` → scanline pattern applied as background
- **Scanline vignette**: `.nerv-scanlines` includes `radial-gradient` → vignette layer present
- **Scanline band keyframes**: `@keyframes` for the scrolling bright band exists → animation name present in CSS
- **Flicker classes**: compiled CSS contains `.nerv-flicker`, `.nerv-flicker-fast`, `.nerv-flicker-staccato`, `.nerv-blink` → all four classes present
- **Flicker uses steps()**: flicker animation declarations use `steps(` timing → staccato behavior confirmed
- **Flicker references token**: flicker durations reference `--nerv-flicker-duration` or `--nerv-animation-speed` → token-driven timing
- **Blink class**: `.nerv-blink` exists with animation → slower sustained pulse distinct from flicker
- **Glitch class**: compiled CSS contains `.nerv-glitch` → class present
- **Glitch pseudo-elements**: `.nerv-glitch::before` and `.nerv-glitch::after` exist → pseudo-element selectors present in CSS
- **Glitch uses clip-path**: glitch pseudo-elements include `clip-path` → slice technique applied
- **Glitch keyframes**: `@keyframes` for glitch animation exists → animation name present in CSS
- **Reduced motion**: `prefers-reduced-motion: reduce` media query present → contains `animation: none` or `animation-duration: 0` for animation classes
- **Edge — no Phase 1 regressions**: all Phase 1 tests still pass → foundation.test.mjs remains green
- **Edge — Stylelint passes**: `npm run lint` exits 0 → all selectors follow `.nerv-` prefix convention

### Test Infrastructure

- Framework: Node.js built-in test runner (`node:test`)
- Test location: `test/`
- Conventions: `describe`/`it` blocks; build CSS once in `before()`, then regex-match compiled CSS string. File naming: `<phase>.test.mjs`
- New test files: `test/effects.test.mjs`
- `package.json` test script updated to run both test files: `node --test test/foundation.test.mjs test/effects.test.mjs`

## Implementation Plan

1. **Stub test file + SCSS partials (Preparation)**
   - Files: `test/effects.test.mjs`, `src/_scanlines.scss`, `src/_flicker.scss`, `src/_glitch.scss`
   - Changes: Create empty test suite with stubbed `describe`/`it` blocks (no implementations). Create empty SCSS partials with doc comments only. Update `src/nerv.scss` to `@forward` all three partials. Update `package.json` test script to include `test/effects.test.mjs`.

2. **Implement tests**
   - Files: `test/effects.test.mjs`
   - Changes: Fill in all test implementations — build CSS, read compiled output, regex-assert for expected selectors, properties, keyframes, and `prefers-reduced-motion` block. Tests should fail since SCSS partials are still empty.

3. **Implement `_scanlines.scss`**
   - Files: `src/_scanlines.scss`
   - Changes: `.nerv-scanlines` class with `position: fixed`, `pointer-events: none`, `z-index: 9999`, `repeating-linear-gradient` for scanline pattern, `radial-gradient` for vignette (both as `background-image` layers). `::after` pseudo-element for scrolling bright band with `@keyframes nerv-scanline-band`. Opacity driven by `--nerv-scanline-opacity` token. Animation speed scaled by `--nerv-animation-speed`.

4. **Implement `_flicker.scss`**
   - Files: `src/_flicker.scss`
   - Changes: Four `@keyframes` declarations (nerv-flicker, nerv-flicker-fast, nerv-flicker-staccato, nerv-blink). Four classes (`.nerv-flicker`, `.nerv-flicker-fast`, `.nerv-flicker-staccato`, `.nerv-blink`) using `steps()` timing and `--nerv-flicker-duration` / `--nerv-animation-speed` tokens. `:nth-child()` delay offsets for organic asynchrony.

5. **Implement `_glitch.scss`**
   - Files: `src/_glitch.scss`
   - Changes: `.nerv-glitch` class with `position: relative`. `::before` and `::after` pseudo-elements with `content: attr(data-text)`, `clip-path: polygon()` for horizontal slices, `@keyframes nerv-glitch` animating `transform: translate() skew()`. Chromatic aberration via color-shifted pseudo-elements.

6. **Add `prefers-reduced-motion` block**
   - Files: `src/_scanlines.scss`, `src/_flicker.scss`, `src/_glitch.scss`
   - Changes: Each module includes a `@media (prefers-reduced-motion: reduce)` block that sets `animation: none` on its animated selectors. (May be implemented inline during steps 3-5.)

7. **Run tests — all should pass**
   - Commands: `npm test`, `npm run lint`

8. **Create `ref/ref-effects.html`**
   - Files: `ref/ref-effects.html`
   - Changes: Reference page with: all Phase 1 content (typography, colors, glow) for regression; scanline overlay `<div class="nerv-scanlines">`; elements demonstrating `.nerv-flicker`, `.nerv-flicker-fast`, `.nerv-blink`; `.nerv-glitch` with `data-text`; inline script for timed alert-state label toggle.

9. **Final verification**
   - Commands: `npm run build`, `npm test`, `npm run lint`
   - Verify all tests pass across both test files, Stylelint clean

## Technology Validation

No new technology — validation not required. All techniques (CSS keyframes, `repeating-linear-gradient`, `clip-path`, `steps()` timing, `@media prefers-reduced-motion`) are standard CSS features compiled through the existing Dart Sass pipeline.

## Dependencies

- `_tokens.scss` (Phase 1): `--nerv-scanline-opacity`, `--nerv-flicker-duration`, `--nerv-animation-speed`, color tokens
- `_typography.scss` (Phase 1): font classes used in reference page
- `_glow.scss` (Phase 1): glow classes used in reference page
- Build pipeline (Phase 1): `npm run build` compiles updated `nerv.scss`

## Challenges & Mitigations

- **Scanline overlay z-index**: Must be high enough to overlay all content but use `pointer-events: none` to avoid blocking interaction. Mitigation: use `z-index: 9999` and verify interactivity in ref page.
- **Glitch `data-text` contract**: Consumers must duplicate text content in the attribute. Mitigation: Document clearly in ref page and SCSS doc comments; this is a known CSS-only limitation.
- **`steps()` timing feel**: Hard cuts need to feel organic, not robotic. Mitigation: Use `:nth-child()` `animation-delay` offsets so grouped elements flicker out of phase.
- **Scanline readability**: Lines must be faint enough not to impair text readability. Mitigation: Use `--nerv-scanline-opacity` token (default 0.08) and test visually.
- **Animation token scaling**: Durations must use `calc()` with `--nerv-animation-speed` so Phase 6 alert cascade can accelerate them. Mitigation: Define base duration, multiply by speed token.
- **Scanline band naming**: PHASE2.md spec lists `.nerv-scanline-band` as a class but describes it as a `::after` pseudo-element. Resolution: the band is `.nerv-scanlines::after`; `prefers-reduced-motion` targets that pseudo-element. No separate `.nerv-scanline-band` class.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [ ] Build
- [ ] QA
