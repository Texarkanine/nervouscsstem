# Task: M2 — Refine Glitch Effect

* Task ID: nerv-m2-glitch-refine
* Complexity: Level 2
* Type: Simple Enhancement

Refine the `.nerv-glitch` animation in `_glitch.scss` to produce sharp, discontinuous jumps instead of smooth-feeling micro-movements. Increase transform magnitudes (translate and skew) and reduce keyframe density so each `steps()` tick produces a dramatic, visible displacement. The effect should look broken/corrupted, not like a gently orbiting moth.

## Test Plan (TDD)

### Behaviors to Verify

- **B1 — Larger translate magnitudes**: glitch keyframes contain translate values >= 8px (currently max 5px)
- **B2 — Larger skew magnitudes**: glitch keyframes contain skewX values >= 6deg (currently max 4deg)
- **B3 — Reduced keyframe density (top)**: `nerv-glitch-top` has fewer intermediate percentage stops than before (target: 3 intermediate stops, down from 5)
- **B4 — Reduced keyframe density (bottom)**: `nerv-glitch-bottom` has fewer intermediate percentage stops than before (target: 4 intermediate stops, down from 6)
- **B5 — Steps timing preserved**: animation still uses `steps()` timing function
- **B6 — No regression: class exists**: `.nerv-glitch` class present in compiled CSS
- **B7 — No regression: pseudo-elements**: `::before` and `::after` pseudo-elements present
- **B8 — No regression: clip-path**: clip-path polygons present
- **B9 — No regression: keyframes exist**: `@keyframes nerv-glitch-top` and `@keyframes nerv-glitch-bottom` present
- **B10 — No regression: token reference**: `--nerv-glitch-duration` token still referenced
- **B11 — No regression: reduced motion**: `prefers-reduced-motion` media query still suppresses animation
- **Edge — coprime relationship preserved**: top and bottom animations still use different step counts

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/effects.test.mjs`
- Conventions: `describe`/`it` blocks; tests compile CSS via `npm run build` then regex-match against compiled output
- New test files: none — all new tests added to existing `Glitch effect` describe block in `test/effects.test.mjs`

## Implementation Plan

1. **Add new tests to `test/effects.test.mjs`**
   - Files: `test/effects.test.mjs`
   - Changes: Add test cases for B1–B4 and the edge case (coprime step counts) to the existing `Glitch effect` describe block. Existing tests already cover B5–B11.

2. **Run tests — expect new tests to FAIL**
   - Verify the 5 new tests fail (magnitudes are too small, keyframe counts are too high)
   - Verify existing glitch tests still pass

3. **Refine `_glitch.scss` keyframes**
   - Files: `src/_glitch.scss`
   - Changes:
     - `nerv-glitch-top`: reduce from 5 intermediate stops to 3, increase translates to 8–15px range, increase skew to 6–10deg
     - `nerv-glitch-bottom`: reduce from 6 intermediate stops to 4, increase translates to 8–15px range, increase skew to 6–12deg
     - Keep coprime `steps()` counts (e.g., steps(3) and steps(5) to match reduced keyframes)
     - Preserve rest state at 0%/100% as `translate(0, 0)`

4. **Run all tests — expect all to pass**
   - All new magnitude/density tests pass
   - All existing regression tests pass
   - Full suite green

5. **Visual verification note**
   - The glitch effect is demonstrated on `ref/ref-effects.html` — no ref page changes needed per milestone invariants (fixes/refinements update existing pages, but the ref page already shows the glitch effect with no markup changes required)

## Technology Validation

No new technology — validation not required.

## Dependencies

- Dart Sass (`npm run build`)
- Node.js test runner (`npm test`)
- Stylelint (`npm run lint`)

## Challenges & Mitigations

- **Magnitude calibration**: Too-large values could push text offscreen. Mitigation: keep translates under 15px and skews under 12deg; overflow: hidden on pseudo-elements already clips.
- **Step count vs keyframe count alignment**: If `steps(N)` doesn't align well with keyframe stop count, some stops may be skipped. Mitigation: match step count to intermediate keyframe count (3 steps for 3 stops, 5 steps for 4 stops — coprime pair).

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [ ] Preflight
- [ ] Build
- [ ] QA
