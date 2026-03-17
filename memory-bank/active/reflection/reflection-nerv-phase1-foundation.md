---
task_id: nerv-phase1-foundation
date: 2026-03-17
complexity_level: 3
---

# Reflection: NERV Design System — Phase 1: Foundation Layer

## Summary

Built the complete foundation layer of the NERV Design System: project scaffolding with Dart Sass, design tokens as CSS custom properties driven by a SCSS map, typography with CDN-loaded fonts, and phosphor bloom glow effects. All 14 automated tests pass, Stylelint passes, and the reference page validates visual correctness. Clean build with two trivial QA fixes.

## Requirements vs Outcome

Every requirement from the project brief and PHASE1.md was implemented without gaps or descoping. One planned expansion: glow variants were extended from the 4 originally specified in VISION.md (amber, red, green, cyan) to all 9 non-void colors. This was a natural consequence of the $nerv-colors map innovation approved during preflight and verified by the test plan.

## Plan Accuracy

The 8-step implementation plan executed in exact order with no reordering, splitting, or additions needed. All five identified challenges materialized at the predicted severity:

- **Google Fonts direct URLs**: Extracted successfully; the CJK font's 120+ unicode-range subsets were curated to 12 essential blocks covering common Japanese + Latin.
- **Mixed JP/EN text**: The `NERV Mixed` composite font with unicode-range worked, though QA caught an incorrect CJK @font-face rule.
- **SCSS @forward module resolution**: No issues with the flat `src/` directory.
- **High-contrast glow reduction**: The `--nerv-glow-intensity` multiplier approach worked cleanly.

Two minor surprises not in the plan:
1. WSL path resolution issue with `node --test test/` (Node.js resolved to the Windows-side path). Fixed by specifying the explicit test file path in package.json.
2. Dart Sass deprecation warning for global `nth()` function — required `@use 'sass:list'` and `list.nth()`. Immediately fixable.

## Creative Phase Review

No creative phase was executed — all design decisions carried forward from L4 planning. The preflight innovation ($nerv-colors SCSS map as single source of truth) was the closest thing to a creative decision and held up perfectly during build. It made `_glow.scss` trivially simple: one `@each` loop replaces what would have been 18+ hand-written class definitions.

## Build & QA Observations

**Build went well:**
- TDD provided clear red/green signal at each implementation step. The 12-fail → 0-fail progression tracked exactly with plan steps.
- SCSS compilation was fast and error-free throughout.
- The $nerv-colors map innovation (from preflight) paid dividends: adding glow for all 9 colors was zero additional effort vs. the original 4.

**Build friction points:**
- Font URL extraction from Google Fonts CSS API was the most time-consuming activity. Shippori Mincho B1's 120+ CJK subsets required reading and curating the API response to select the most useful blocks. Not difficult, but labor-intensive.
- Stylelint config needed tuning: Dart Sass's output formatting (no empty lines between rules, full hex values) conflicted with `stylelint-config-standard` defaults. Disabled three rules that fight compiler output.

**QA findings:**
- Real bug: The `NERV Mixed` CJK `@font-face` pointed to a Latin-only woff2 file. Would have caused unnecessary network requests in production and potentially confused font fallback. Tests couldn't catch this because CSS string matching doesn't verify font file contents.
- Stale docs: `techContext.md` claimed "no automated test framework" after test infrastructure was built.

## Cross-Phase Analysis

- **Preflight → Build**: The $nerv-colors map innovation (approved in preflight) directly enabled the clean `_glow.scss` implementation. Without it, `_glow.scss` would have required manual duplication of 9 color names + hex values + RGB values. Good preflight ROI.
- **Plan → Build**: The detailed component analysis and dependency graph meant build had zero design decisions to make. Every file's purpose, contents, and integration points were known before the first line of code. This is the ideal state for a Level 3 task.
- **Build → QA**: QA caught a font configuration error that automated tests structurally cannot detect (font file content correctness). This validates the multi-layered verification approach: tests catch token/class generation correctness, QA catches semantic correctness, reference pages catch visual correctness.

## Insights

### Technical

- **CJK font subsetting is operationally complex.** Google Fonts splits CJK fonts into 120+ tiny subsets. Baking these into a stylesheet requires either including all of them (massive file) or curating a subset (requires understanding which unicode blocks cover which characters). For future phases: if the font strategy changes, consider Fontsource/jsDelivr as a simpler alternative — they provide per-language single-file downloads.
- **CSS custom property `calc()` with multiplier tokens** (e.g., `calc(var(--nerv-glow-spread) * var(--nerv-glow-intensity))`) is a powerful pattern for accessibility scaling. The entire glow system reduces under `prefers-contrast` by changing a single token value. This pattern should be reused for animation speed scaling in Phase 6.

### Process

- **Stylelint on compiled output requires config tuning.** Standard configs assume hand-written CSS. Dart Sass output has its own formatting conventions (no blank lines between consecutive `@font-face` rules, full hex values). Future phases should inherit the established `.stylelintrc.json` without needing to re-discover these conflicts.
