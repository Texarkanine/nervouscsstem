---
task_id: nerv-m7-tables
date: 2026-03-19
complexity_level: 3
---

# Reflection: M7 — Table Styling with Special Row Types

## Summary

Implemented `.nerv-table` component with phosphor-outline base styling, four fill modes (default translucent, bordered, outline, solid), auto-generated color variants, and three geometric row types (triangle, hexagon, trapezoid) with dual-tier cascade (table-level default + row-level override). All 11 acceptance criteria met, 18 new tests pass, 256/256 total suite. One trivial QA fix applied.

## Requirements vs Outcome

All requirements delivered as specified. No gaps, no descoped items, no additions beyond the plan. The fill/border/color system matches `_list.scss` precedent exactly. Geometric shapes support both row-level and table-level application as planned. The creative decision (tiled hex grid deferred to `_hex-grid.scss`) was respected.

## Plan Accuracy

The plan was highly accurate. The implementation sequence (stub → tests → base → fill modes → colors → shapes → accessibility → ref page) worked exactly as specified with no reordering needed. The identified challenges all materialized as expected:
- **Specificity cascade** was the primary design concern — the preflight phase caught and fixed a specificity bug before build started, saving time.
- **clip-path clips borders** was documented in the plan and handled by noting it in the doc comment (matching list precedent).
- **CSS property replacement** was anticipated but didn't cause friction — fill modes before shapes in source order, with shapes not needing to reset fill properties.

One surprise: the pre-existing form test B16 broke because it checked the "last" `prefers-contrast: more` block. This was a brittle test that the plan couldn't have anticipated. The fix (regex for "any matching block") was trivial.

## Creative Phase Review

One creative decision (tiled hex grid variant → `_hex-grid.scss` future enhancement). Held up perfectly — the decision cleanly separated table hex rows (variable-width, in table context) from hex grid tiling (fixed-width, in grid context). No friction during build.

## Build & QA Observations

**Build went smoothly:** The `_list.scss` precedent made implementation straightforward — the pattern was clear and well-established. The TDD cycle worked cleanly: all 18 tests failed in red phase, then all passed after implementation. The only unexpected issue was the form test B16 breakage, which was a pre-existing fragility.

**QA caught one real issue:** Table-level `.nerv-table-hex-alt` was missing hex clip-path on cells (only applied row offset). Row-level hex-alt was self-contained. This would have caused visual bugs for anyone using hex-alt standalone at table level. The ref page had this exact usage, so visual testing would have caught it too, but QA found it through code review.

## Cross-Phase Analysis

**Preflight → Build:** Preflight caught the specificity bug (row-level selectors at (0,1,2) losing to table-level at (0,2,1)). Without this catch, the entire row-level override mechanism would have silently failed — row shapes wouldn't override table defaults. This would have been a confusing bug to diagnose during build.

**Plan → Build:** The plan's two-tier cascade mechanism (section 5 row-level, section 6 table-level) was well-specified and translated directly to code. The explicit specificity calculations in the plan prevented guesswork.

**Build → QA:** The hex-alt inconsistency that QA caught was a gap in the plan — the plan described hex-alt as a "modifier" but didn't specify that table-level hex-alt should also include base hex clip-path. The row-level implementation naturally included it (because a standalone row class must be self-contained), but the table-level implementation followed the "modifier" framing literally.

## Insights

### Technical

- **Dual-tier specificity pattern for cascade overrides**: When a CSS class needs to work both as a container-level default and a child-level override, the two selectors need carefully managed specificity. Using `.container.modifier descendant` for the default tier and `.container child.modifier > descendant` for the override tier provides a clean 1-step specificity gap. This pattern is reusable for any component with container-level defaults and per-item overrides.

### Process

- **"Modifier" vs "standalone" semantics need explicit specification in plans**: When a class is described as a "modifier" in the plan, the plan should explicitly state whether it's standalone or requires a companion class — and whether that contract is the same at every application level (container vs. child). The hex-alt inconsistency arose because "modifier" was interpreted differently at each level.
