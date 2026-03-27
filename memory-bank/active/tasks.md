# Task: M1 — Foundation (DOS/BIOS Font + Grid Mark Variants)

* Task ID: nerv-phase7-m1
* Complexity: Level 2
* Type: Simple enhancement (additive features to two existing SCSS modules)

Add a DOS/BIOS monospace boot-screen font (VT323) to `_typography.scss` with a `.nerv-type-boot` utility class. Add a `×` rotated-cross grid marks variant (`.nerv-grid-marks-x`) and a hexagonal grid background pattern (`.nerv-grid-marks-hex`) to `_grid-marks.scss`, each with auto-generated color variants.

## Test Plan (TDD)

### Behaviors to Verify

**Font (VT323):**
- B1: `@font-face` for VT323 → compiled CSS contains `font-family: "VT323"` (or `'VT323'`)
- B2: `.nerv-type-boot` utility class → exists in compiled CSS
- B3: `.nerv-type-boot` sets font-family → includes VT323 in the font-family stack

**Grid marks `×` variant:**
- B4: `.nerv-grid-marks-x` class → exists in compiled CSS with `background-image`
- B5: `.nerv-grid-marks-x` SVG → data URI contains diagonal line geometry (rotated 45°)
- B6: `.nerv-grid-marks-x-{color}` → auto-generated for each glow-flagged color (amber, amber-dark, orange, red, red-deep, green, cyan, blue, steel)

**Grid marks hex variant:**
- B7: `.nerv-grid-marks-hex` class → exists in compiled CSS with `background-image`
- B8: `.nerv-grid-marks-hex` SVG → data URI contains polygon/path for hex geometry
- B9: `.nerv-grid-marks-hex-{color}` → auto-generated for each glow-flagged color

**Edge cases / regression:**
- B10: Build succeeds → `npm run build` exits 0 (covered by existing tests)
- B11: Existing `.nerv-grid-marks` class unchanged → existing tests still pass
- B12: Existing font-face declarations unchanged → existing tests still pass

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/`
- Conventions: Tests compile CSS via `npm run build`, then regex-match against the compiled `dist/nerv.css`. Describe blocks group by feature area. `before()` hooks run the build.
- New test files: none — B1–B3 go in `test/foundation.test.mjs`, B4–B9 go in `test/panels.test.mjs`

## Implementation Plan

1. **Stub + write font tests** (TDD cycle 1)
   - File: `test/foundation.test.mjs`
   - Add describe block `'VT323 / DOS/BIOS boot font'` with tests for B1–B3
   - Run tests — all 3 should fail

2. **Implement VT323 font**
   - File: `src/_typography.scss`
   - Add `@font-face` for VT323 (latin-ext + latin subsets) from `fonts.gstatic.com`
   - Add `.nerv-type-boot` utility class: `font-family: 'VT323', 'Courier New', monospace; font-weight: 400;`
   - Run tests — B1–B3 should pass

3. **Stub + write `×` variant tests** (TDD cycle 2)
   - File: `test/panels.test.mjs`
   - Add describe block `'Grid marks × variant'` with tests for B4–B6
   - Run tests — all 3 should fail

4. **Implement `×` grid marks variant**
   - File: `src/_grid-marks.scss`
   - Add `@mixin nerv-grid-marks-x-bg($rgb)` — SVG data URI with two diagonal lines (0,0→40,40 and 40,0→0,40) + center circle
   - Add `.nerv-grid-marks-x` base class using white-rgb, with `background-repeat`, `background-size`, `background-position`, `pointer-events: none`
   - Add `@each` loop generating `.nerv-grid-marks-x-#{$name}` for glow-flagged colors
   - Run tests — B4–B6 should pass

5. **Stub + write hex variant tests** (TDD cycle 3)
   - File: `test/panels.test.mjs`
   - Add describe block `'Grid marks hex variant'` with tests for B7–B9
   - Run tests — all 3 should fail

6. **Implement hex grid marks variant**
   - File: `src/_grid-marks.scss`
   - Add `@mixin nerv-grid-marks-hex-bg($rgb)` — SVG data URI with hexagonal outlines tiled in a honeycomb pattern
   - Add `.nerv-grid-marks-hex` base class (same supporting properties as `.nerv-grid-marks`)
   - Add `@each` loop generating `.nerv-grid-marks-hex-#{$name}` for glow-flagged colors
   - Run tests — B7–B9 should pass

7. **Update ref page**
   - File: `ref/ref-foundation.html`
   - Add `.nerv-type-boot` typography demo section (DOS boot screen sample text)
   - File: `ref/ref-patterns.html`
   - Add `.nerv-grid-marks-x` and `.nerv-grid-marks-hex` demo sections alongside existing `.nerv-grid-marks`

8. **Full verification**
   - Run `npm run build && npm run test && npm run lint`
   - Confirm no regressions across all test files

## Technology Validation

No new technology — VT323 is loaded from the same Google Fonts CDN (`fonts.gstatic.com`) the project already uses. Same `@font-face` + `woff2` format pattern. No new build tools or dependencies.

CDN URLs confirmed:
- latin-ext: `https://fonts.gstatic.com/s/vt323/v18/pxiKyp0ihIEF2isRFJXGdg.woff2`
- latin: `https://fonts.gstatic.com/s/vt323/v18/pxiKyp0ihIEF2isfFJU.woff2`

## Dependencies

- None beyond existing Dart Sass build toolchain

## Challenges & Mitigations

- **SVG URL-encoding in SCSS**: SVG data URIs use `rgb()` notation (not `#hex`) to avoid URL-encoding issues. Follow the existing `nerv-grid-marks-bg` mixin pattern exactly.
- **Hex grid tiling**: The hex SVG tile must tesselate seamlessly. Use a calculated viewport/path where hexagons align at tile boundaries. A single hex "unit cell" with offset rows handles this.
- **State integration**: Existing `_states.scss` overrides grid marks color per alert state. The new `×` and hex variants may need similar state overrides — but this is out of scope for M1 (additive feature, not modifying state cascade). Can be added in a future milestone if needed.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [ ] Preflight
- [ ] Build
- [ ] QA
