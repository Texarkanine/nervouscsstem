---
task_id: nerv-phase1-foundation
complexity_level: 3
date: 2026-03-17
status: completed
---

# TASK ARCHIVE: NERV Design System — Phase 1: Foundation Layer

## SUMMARY

Implemented the foundational layer of the NERV Design System: project scaffolding with Dart Sass, design tokens as CSS custom properties (driven by a single SCSS `$nerv-colors` map), typography with four CDN-loaded font families and five utility classes, and phosphor bloom glow effects (box-shadow and text-shadow) with per-color classes and a `--nerv-glow-intensity` token for accessibility. Delivered `ref/ref-foundation.html` as the visual test fixture. All 14 automated tests pass; Stylelint passes. Post-build tuning reduced default glow intensity (removed opaque directional strokes, lowered blur opacities) so the bloom reads as a faint halo rather than muddy edges.

## REQUIREMENTS

- Project scaffolding: `package.json` with Dart Sass (and Stylelint) dev dependencies, `build` / `build:min` / `watch` / `test` / `lint` scripts; `.gitignore` for `node_modules/` and `dist/`.
- Main SCSS entry point `src/nerv.scss` that `@forward`s tokens → typography → glow in dependency order.
- `src/_tokens.scss`: 10 color tokens + RGB companions, meta-tokens `--nerv-primary` and `--nerv-bg`, utility tokens (glow-spread, glow-intensity, scanline-opacity, flicker-duration, animation-speed, border-width); `prefers-contrast: more` overrides for border-width and glow-intensity.
- `src/_typography.scss`: `@font-face` for Shippori Mincho B1, Barlow Condensed, IBM Plex Mono, DSEG7 Classic (CDN); utility classes `.nerv-type-display`, `.nerv-type-hud`, `.nerv-type-data`, `.nerv-type-segment`, `.nerv-type-mixed` (composite JP/EN font).
- `src/_glow.scss`: mixins for box-shadow and text-shadow phosphor bloom; auto-generated `.nerv-glow-{name}` and `.nerv-glow-text-{name}` for colors flagged in the map; `.nerv-glow` / `.nerv-glow-text` defaults; `.nerv-glow-drop` for non-rectangular elements.
- Reference page `ref/ref-foundation.html` on true black, demonstrating all typography, plain and glowing color labels, segment display with ghost digits, and box/drop-shadow glow.
- All selectors use `.nerv-` prefix; colors consumed via custom properties; `prefers-reduced-motion` and `prefers-contrast` supported.

## IMPLEMENTATION

**Approach:** TDD in 8 steps: scaffolding → directory stubs → test infrastructure (failing tests) → tokens → typography → glow → reference page → final verification. The preflight innovation—a single `$nerv-colors` map in `_tokens.scss` with `(hex, rgb-string, glow-flag)` per color—drove `:root` token generation and `_glow.scss` class generation via `@each` loops, eliminating duplication.

**Key files:**
- `package.json`: scripts `build`, `build:min`, `watch`, `test` (node --test test/foundation.test.mjs), `lint` (stylelint dist/nerv.css).
- `src/_tokens.scss`: `@use 'sass:list'`; `$nerv-colors` map; `:root` block with generated `--nerv-{name}` and `--nerv-{name}-rgb`; meta and utility tokens; `@media (prefers-contrast: more)` overrides.
- `src/_typography.scss`: Multiple `@font-face` blocks (Barlow Condensed, IBM Plex Mono, DSEG7, Shippori Mincho B1 with curated CJK subsets, and `NERV Mixed` for Latin-only unicode-range); five `.nerv-type-*` classes.
- `src/_glow.scss`: `@use 'tokens'`; `nerv-glow` and `nerv-glow-text` mixins (multi-layer shadows with low opacities; text glow uses soft halo only, no directional stroke); `@each` over `tokens.$nerv-colors` for glow-flagged colors; `.nerv-glow`, `.nerv-glow-text`, `.nerv-glow-drop`.
- `test/foundation.test.mjs`: Build smoke (dist/nerv.css, dist/nerv.min.css), color map verification (10 tokens, RGB companions, meta and utility tokens, prefers-contrast), glow class verification (per-color classes, aliases, drop, prefers-contrast glow reduction).
- `.stylelintrc.json`: selector-class-pattern `^nerv-`, SCSS at-rule ignores; disabled color-hex-length, at-rule-empty-line-before, rule-empty-line-before to match Dart Sass output.

**Creative / design decisions (from plan and preflight):** No separate creative phase; L4 had already resolved SCSS tooling, font stack, font loading, directory structure. The only “creative” element was the preflight innovation (SCSS color map), which was applied as specified and held up—one map, one loop in tokens, one loop in glow.

**Post-ship change:** Default glow was reduced after feedback: text glow no longer uses 1px directional offsets (they created an opaque stroke); box and text glow opacities were lowered (e.g. text from 0.6/0.3 to 0.35/0.15/0.06, box inner layers similarly) so the effect is a faint phosphor halo. Tuning remains in `src/_glow.scss` (opacity values in the mixins).

## TESTING

- **Automated:** `npm run build` and `npm run build:min` produce `dist/nerv.css` and `dist/nerv.min.css`. `npm test` runs 14 tests (build smoke, color map tokens and companions, meta/utility tokens, prefers-contrast overrides, glow classes per color, default aliases, `.nerv-glow-drop`, prefers-contrast glow reduction). `npm run lint` runs Stylelint on compiled CSS (0 errors after disabling rules that conflict with Sass output).
- **QA:** Semantic review (KISS, DRY, YAGNI, completeness, regression, integrity, documentation) found two fixable issues: (1) `NERV Mixed` had a CJK `@font-face` pointing at a Latin-only woff2—removed so CJK falls through to Shippori Mincho B1; (2) `techContext.md` still said “no automated test framework”—updated to describe Node test runner and Stylelint.
- **Visual:** `ref/ref-foundation.html` checked in browser: void background, all type classes, plain and glowing color labels, segment display with ghost digits, box and drop-shadow glow.

## LESSONS LEARNED

- **CJK font subsetting is operationally complex.** Google Fonts splits CJK fonts into 120+ subsets; baking into the stylesheet meant curating ~12 blocks for common Japanese + Latin. Fontsource/jsDelivr per-language single-file downloads are a simpler alternative if the font strategy changes.
- **CSS custom property `calc()` with multiplier tokens** (e.g. `--nerv-glow-intensity`) gives single-token accessibility scaling; the same pattern should be reused for animation speed in Phase 6.
- **Preflight innovation had high ROI:** The `$nerv-colors` map made glow implementation trivial and kept tokens and glow in sync; without it, adding nine glow colors would have meant large amounts of duplication.
- **QA caught a bug tests cannot:** The wrong `@font-face` src for NERV Mixed CJK would have caused extra network requests and possible fallback issues; string-based tests don’t validate font file contents.
- **Default glow should be faint:** Strong opacities and directional text-shadow strokes read as opaque extensions and muddy type; soft halo-only text glow and lower opacities read as phosphor bloom.

## PROCESS IMPROVEMENTS

- **Stylelint on compiled CSS:** Standard configs assume hand-written CSS. Dart Sass output (no blank lines between rules, full hex) required disabling a few rules; future phases should reuse the existing `.stylelintrc.json`.
- **Test runner path:** `node --test test/` had path resolution issues under WSL; using an explicit file `test/foundation.test.mjs` in the test script avoided that.

## TECHNICAL IMPROVEMENTS

- Consider migrating all fonts to Fontsource (jsDelivr) for stable URLs and simpler subsetting if Google Fonts URLs become a maintenance burden.
- Glow opacity and blur radii are currently literal values in the mixins; if future phases need themeable glow strength, those could be moved to design tokens (e.g. `--nerv-glow-text-inner-opacity`).

## NEXT STEPS

- Mark Phase 1 milestone complete in `memory-bank/active/milestones.md` (L4 tracking).
- Proceed to next L4 milestone (Phase 2 or as defined in milestones). Run `/niko` to start the next task.
