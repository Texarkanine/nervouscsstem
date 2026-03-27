---
task_id: nerv-phase7-m2
date: 2026-03-27
complexity_level: 2
---

# Reflection: M2 — Tiled Hex Grid

## Summary

Implemented `.nerv-hex-grid-tiled` true honeycomb tessellation and `.nerv-hex-grid-solid` opaque fill modifier in `_hex-grid.scss`. Switched `initHexFlicker` from auto-targeting all hex grids to opt-in via `data-nerv-hex-flicker`. 6 new tests passing (312 total). Clean initial execution; two post-reflect refinements driven by operator feedback.

## Requirements vs Outcome

All requirements delivered: true honeycomb tessellation (no gaps, no overlaps), lockout hex-wall use case demonstrated. Two additions beyond the original plan surfaced during ref page review:
- `.nerv-hex-grid-solid` — operator correctly identified that solid fills (opaque color, black border, black text) should be a library feature, not inline ref-page CSS.
- `data-nerv-hex-flicker` opt-in — hex flicker was auto-applied to all grids including the static lockout demos. Operator directed flicker to become opt-in, which is the right default (static grids are more common than animated ones).

## Plan Accuracy

Plan was accurate for the core tessellation work — 8 steps executed in order with no reordering. The only deviation was reducing the `$_hex-cell-height` constant precision (0.8660254 → 0.866) to satisfy stylelint's `number-max-precision` rule. The two post-build additions (solid fill, flicker opt-in) were not plan deficiencies — they emerged from visual review of the ref page, which is exactly when such issues should surface.

## Build & QA Observations

Build was smooth. The hardest work — deriving the tessellation geometry — happened during planning, leaving the build phase purely mechanical. QA was clean with no findings. Post-reflect rework was small and surgical: `.nerv-hex-grid-solid` followed the same modifier pattern as `.nerv-hex-grid-filled` (6 rules), and the flicker opt-in was a one-line selector change in `nerv.js` plus `data-nerv-hex-flicker` attributes on the 3 grids that should animate.

## Insights

### Technical

- Flat-top hex tessellation is counterintuitive: same-row hexes do NOT share edges. The W/2 bounding-box gap between same-row cells is filled entirely by adjacent-row hexes. The three key values (gap = W/2, offset = 3W/4, overlap = H/2) all derive from the single cell width constant, making the geometry self-consistent.
- Stylelint `number-max-precision` constrains SCSS-computed geometric constants. Plan for lint precision limits when using irrational constants (√3, π, etc.) — round early to avoid post-build surprises.
- When a ref page needs custom CSS to demo a feature, that's a signal the library is missing a class. The solid-fill use case was obvious in hindsight — the existing filled/spaced/tiled modifiers set the pattern, and solid fits right in.

### Process

- JS auto-behavior defaults matter. `initHexFlicker` targeting all `.nerv-hex-grid` elements was fine when there was one grid per page, but broke down with multiple grids serving different purposes. Opt-in via data attributes is the safer default for any JS behavior that mutates DOM state — consistent with how `data-nerv-radar-sync` and `data-nerv-radar-auto-blips` already work.
- The M7 creative phase architecture decision paid dividends by removing the "where does this go" question before planning even started.

### Million-Dollar Question

If tiled tessellation were a foundational assumption, the hex-grid module would unify all three variants around a single set of geometric constants derived from cell width. The `$_hex-row-overlap: 15px` magic number (default variant) would not exist — the overlapping layout would be an approximate tessellation with configurable looseness, not a separate hard-coded layout. However, the current overlapping variant's 15px value is an intentional aesthetic choice (dense, layered look), not a failed tessellation attempt, so this redesign would trade aesthetic control for geometric purity. Not worth refactoring.
