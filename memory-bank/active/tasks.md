# Task: Cartouche typeface — Antonio

* Task ID: cartouche-antonio-20250325
* Complexity: Level 2
* Type: Simple Enhancement (typography update)

Replace the cartouche font stack with a dedicated `NERV Cartouche` composite font that pairs Antonio (Latin) with Shippori Mincho B1 (CJK). Leave `NERV Mixed` unchanged.

## Test Plan (TDD)

### Behaviors to Verify

- [B4-updated]: `.nerv-cartouche` block contains `NERV Cartouche` or `Antonio` in font-family → pass
- [New-F1]: Compiled CSS contains `@font-face` with `font-family: "Antonio"` → pass
- [New-F2]: Compiled CSS contains `@font-face` with `font-family: "NERV Cartouche"` → pass

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/components.test.mjs` (cartouche tests) and `test/foundation.test.mjs` (@font-face tests)
- Conventions: describe blocks per component, `it()` with B-numbered comments
- New test files: none

## Implementation Plan

1. **Update test B4** in `test/components.test.mjs`: change assertion from `NERV Mixed || Barlow Condensed` to `NERV Cartouche || Antonio`
2. **Add @font-face tests** in `test/foundation.test.mjs`: assert Antonio and NERV Cartouche font-face declarations exist
3. **Run tests** — expect 3 failures (red)
4. **Add Antonio @font-face** in `src/_typography.scss`: 4 blocks (400 latin-ext, 400 latin, 700 latin-ext, 700 latin)
5. **Add NERV Cartouche composite** in `src/_typography.scss`: 1 @font-face with Antonio woff2 and Latin unicode-range
6. **Update `.nerv-cartouche`** in `src/_cartouche.scss`: font-family → `'NERV Cartouche', 'Shippori Mincho B1', 'Antonio', sans-serif`
7. **Run tests** — expect green
8. **Update `techContext.md`** — add Antonio to font stack documentation

## Technology Validation

Antonio is a free OFL-licensed variable font on Google Fonts CDN. woff2 URLs confirmed via `curl` of the Google Fonts CSS API. Same CDN pattern as existing Barlow Condensed / Shippori declarations.

## Dependencies

- Antonio font via Google Fonts CDN (no npm dependency)

## Challenges & Mitigations

- **CJK coverage**: Antonio has zero CJK glyphs → mitigated by NERV Cartouche composite + Shippori fallback (same pattern as existing NERV Mixed)
- **Variable font weight mapping**: Antonio woff2 is a variable font (same file for 400/700) → declare separate @font-face blocks per weight for browser compatibility

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [ ] Build
- [ ] QA
