---
task_id: cartouche
date: 2026-03-25
complexity_level: 2
---

# Reflection: Status Cartouche — Post-Build Refinements

## Summary

Iterative refinement of the cartouche component after the initial build, driven by user feedback and a standalone creative exploration. Changes: synthetic bold for flex cartouches, proportional border-width via `em` units, uppercase vertical centering fixes for both variants, and a design decision (Optional Table Hybrid) for future multi-line fixed cartouches.

## Requirements vs Outcome

The original requirements from the initial build were all still met. The refinements were additive:
- **Added**: `font-weight: 700` on flex cartouches — synthetic bold gives a "fuzzy, funky" CRT-display feel the user liked
- **Added**: Proportional border-width (`0.15em` instead of `2px`) — border now scales with font-size
- **Added**: Vertical centering corrections — asymmetric padding on flex, tuned `line-height: 1.1` on fixed
- **Added**: Fixed variant resets `font-weight: 400` and its own `line-height` to isolate from flex typography changes
- **Design decision recorded**: Multi-line fixed cartouche interior uses Optional Table (Hybrid) — `<span>` for single-content, `<table>` for multi-cell grids. Not yet implemented.

One requirement was explored and abandoned: vertical text stretch via `transform: scaleY()` on flex cartouches. User correctly identified the layout/visual mismatch risk before implementation.

## Plan Accuracy

No formal plan for this phase — these were iterative refinements driven by visual feedback. Each change was small and targeted. The creative exploration for multi-line structure was the only formally planned piece, and it executed cleanly.

The initial plan's `font-weight: 400` was correct for the original requirements, but user preference evolved during visual testing. The plan didn't anticipate the border-width scaling concern, which only surfaced when the user tested at larger font sizes.

## Build & QA Observations

The refinements went through multiple feedback cycles:
1. scaleY exploration → abandoned after user pushback (correct call)
2. Bold + centering → first attempt had asymmetric padding that broke fixed variant
3. Fixed variant isolation → `font-weight: 400` / `line-height: 1.1` reset resolved it
4. Border scaling → `px` to `em` conversion was straightforward

The fixed variant alignment was the trickiest part. Changing base typography (bold, tighter line-height) cascaded into the fixed variant and broke its JS-driven centering. The root cause (uppercase text's visual center ≠ line-box mathematical center, amplified by scale transforms) required understanding the interaction between font metrics, flexbox centering, and CSS transforms.

Test B15 was updated from scaleY to font-weight 700. B16 (transform: none on fixed) was removed. All 135 tests pass.

## Insights

### Technical

- **`transform` is visual-only**: `scaleY()` on flow elements creates unpredictable overflow because the layout box doesn't change. The user's "what assumptions does that rely on?" is the right question for any transform on non-`overflow: hidden` elements. Genuine glyph distortion should stay in the fixed variant where `overflow: hidden` + JS measurement creates a controlled environment.
- **Uppercase centering is variant-dependent**: Flex cartouches need `line-height: 1` + asymmetric padding to push caps toward visual center. Fixed cartouches need `line-height: 1.1` because scale transforms amplify the centering error — a different sweet spot. This means flex and fixed typography must be independently tuned; the fixed variant cannot simply inherit from base.
- **`em` > `px` for scalable borders**: When a component might be used at varying font-sizes, `em`-based border-width is the correct default. Consumers can still override with `px` via the custom property for absolute sizing.

### Process

- User-driven visual iteration found issues (overflow risk, centering asymmetry, border scaling) that no automated test could catch. The screenshot feedback loop was essential for typography tuning.

### Million-Dollar Question

The fixed variant's centering problem — uppercase visual center ≠ line-box center, amplified by transforms — would be solved at the root by `text-box-trim: both` + `text-box-edge: cap alphabetic` (CSS Inline Layout Module Level 3). This trims the line-box to actual glyph bounds, eliminating the descent-space offset that makes uppercase text appear off-center. When browser support lands, it replaces both the asymmetric padding hack (flex) and the tuned line-height hack (fixed) with a single declaration. Worth watching for.
