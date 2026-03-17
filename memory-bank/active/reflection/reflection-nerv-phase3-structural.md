---
task_id: nerv-phase3-structural
date: 2026-03-17
complexity_level: 3
---

# Reflection: Phase 3 Structural Layer

## Summary

Built the Phase 3 structural layer (panels, dividers, grid marks) for the NERV design system. All 12 acceptance criteria met, 50/50 tests passing, clean build and lint. Delivered to plan with two minor deviations.

## Requirements vs Outcome

All requirements from the project brief were delivered:
- Four panel variants (basic, titled, double, inset) with glow and `--nerv-border-width` consumption
- Three divider classes (horizontal, vertical, amber) with glow
- SVG data URI crosshair grid with `pointer-events: none`
- Reference page with 2×2 layout, dividers, grid marks, axis labels (both edges), scanline overlay
- No regressions on Phase 1/2

No requirements were dropped or descoped. One minor addition not in the original plan: axis labels on both X and Y axes (plan required "at least one edge"). This was trivially cheap and improves the reference page without scope creep.

## Plan Accuracy

The 12-step implementation plan was accurate and followed in exact order. File list and scope were correct — no steps needed reordering, splitting, or adding.

Identified challenges matched what materialized:
- **Box-shadow composition** for `.nerv-panel-inset`: correctly anticipated, handled by manual composition as planned
- **SVG data URI color injection**: the `rgb()` approach (preflight amendment) worked flawlessly — cleaner than the original `%23` encoding plan

Two unplanned issues surfaced:
1. **Dart Sass deprecation**: `map-get` global function triggers a deprecation warning. Fixed by using `sass:map` module (`map.get`). Low-impact, 30-second fix.
2. **Stylelint `declaration-empty-line-before`**: custom property declarations followed by regular declarations in compiled CSS triggered this rule. Fixed by disabling the rule in `.stylelintrc.json`. This is a compiled-output formatting concern, not a code quality issue.

## Creative Phase Review

No creative phase was executed — the PHASE3.md planning document was comprehensive enough that no open questions required design exploration. This was correctly identified during planning.

## Build & QA Observations

**Build**: Smooth execution. TDD cycle worked well — 12 new tests all failed in red phase, all passed after implementation. The existing test patterns (regex against compiled CSS string) were easy to extend. Build was a single pass with no rework.

**QA**: Clean pass. The only point of discussion was the `.nerv-panel-inset` DRY consideration (duplicated base properties instead of using the mixin). Analysis confirmed this is correct — using the mixin then overriding `box-shadow` would create a Stylelint `declaration-block-no-duplicate-properties` violation. The plan's "manual composition" decision was sound.

## Cross-Phase Analysis

- **Preflight → Build**: The preflight's `rgb()` notation amendment (replacing the plan's `%23` approach) saved time during build. The SVG data URI color injection worked on first attempt.
- **Plan → Build**: The challenge identification in the plan was accurate. All three mitigation strategies (rgb for SVG colors, manual box-shadow for inset, pointer-events for grid marks) worked as designed.
- **Build → QA**: No QA findings requiring rework. The build was clean enough that QA was a verification exercise rather than a corrective one.

## Insights

### Technical
- **Stylelint and compiled CSS custom properties**: When linting compiled Sass output, CSS custom property declarations create formatting patterns that standard Stylelint rules don't expect. Phase 3 hit `declaration-empty-line-before`; future phases introducing more custom properties per selector may hit additional rules. Worth noting for proactive `.stylelintrc.json` updates.
- **Dart Sass module system migration**: Global built-in functions (`map-get`, `list-nth`) trigger deprecation warnings even though they still work. The `@use 'sass:map'` / `@use 'sass:list'` module pattern should be used from the start in all new SCSS files.

### Process
- Nothing notable. The plan-to-build pipeline was efficient for this task — PHASE3.md provided enough design detail that creative phase was unnecessary, and the preflight caught the two amendments that mattered (rgb notation, box-shadow composition).
