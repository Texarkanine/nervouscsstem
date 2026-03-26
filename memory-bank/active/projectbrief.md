# Project Brief: Cartouche typeface — Antonio

## User story

Use **Antonio** as the Latin typeface for **all** status cartouches (flex and fixed, including table cells via `font: inherit`). CJK text must remain readable via Shippori Mincho B1 fallback. No `scaleY`; flex cartouches stay CSS-only (no JS changes). Leave `NERV Mixed` (Barlow Condensed + Shippori) untouched — cartouches get their own dedicated composite font.

## Requirements

1. Add Antonio `@font-face` declarations (weights 400 + 700, latin + latin-ext) via Google Fonts CDN woff2.
2. Create a `NERV Cartouche` composite `@font-face` using `unicode-range` to serve Antonio for Latin codepoints — CJK falls through to Shippori Mincho B1 in the `font-family` stack.
3. `.nerv-cartouche` `font-family` switches to `'NERV Cartouche', 'Shippori Mincho B1', 'Antonio', sans-serif`.
4. Update test B4 (cartouche font stack assertion) and add `@font-face` existence test.
5. Update `techContext.md` font stack documentation.

## Task ID

cartouche-antonio-20250325
