---
task_id: cartouche-antonio-20250325
date: 2025-03-25
complexity_level: 2
---

# Reflection: Cartouche typeface — Antonio

## Summary

Switched all cartouches from Barlow Condensed to Antonio via a dedicated `NERV Cartouche` composite font, with Canvas-based vertical centering correction for fixed cartouches. The final result renders correctly across flex, fixed-span, and fixed-table modes.

## Requirements vs Outcome

All five original requirements were delivered. One significant requirement emerged during build that wasn't in the plan: Antonio's tall font metrics placed text visually below center in fixed cartouches, requiring a JS-based vertical correction (`--nerv-cartouche-ty`). This expanded the scope from a pure CSS font swap to a CSS+JS enhancement with Canvas TextMetrics measurement. The scope expansion was justified — the centering issue was a direct consequence of the font change and couldn't ship without fixing.

## Plan Accuracy

The plan was correct for the CSS/font work (steps 1-8). It did not anticipate the font-metric centering problem, which consumed most of the iteration time. Three approaches were tried before landing on the correct one:

1. **line-height adjustment** — Failed because JS scaling normalizes line-height out of the equation.
2. **transform-origin percentage hack** — Worked on one browser but was empirically fragile (different values needed for span vs td contexts).
3. **Canvas TextMetrics** — Correct solution. Uses `actualBoundingBoxAscent`/`Descent` to find the real glyph ink center vs the line-box center.

The first `translateY` implementation also had a bug: the offset was divided by `sy` because the transform composition was misanalyzed. The `translateY` in `scale() translateY()` is applied *before* scale (right-to-left), so the raw offset is correct without division.

## Build & QA Observations

The font swap itself was clean — TDD caught regressions immediately. The vertical centering was the hard part. The key debugging insight was that `Range.getBoundingClientRect()` returns line-box bounds (identical to the span's box), not glyph ink bounds, so it always measured zero offset for spans. Only Canvas `measureText()` provides actual glyph metrics.

## Insights

### Technical

- **`Range.getBoundingClientRect()` does not measure glyph ink bounds.** It returns line-box rects. For detecting font-metric asymmetry (ascent space above caps vs descent space below baseline), Canvas `TextMetrics.actualBoundingBoxAscent`/`Descent` is required. This distinction is load-bearing any time text must be visually centered within a scaled container.

- **CSS `transform: A B` applies B first, then A.** When composing `scale() translateY()`, the translate operates in the pre-scale coordinate space. The scale then amplifies both the original layout offset and the translate correction equally, so they cancel without needing to divide by the scale factor.

### Process

- The initial L2 classification was correct for the font swap, but the emergent centering work was closer to L2.5. The plan phase could have identified this risk by noting that any font change on a component with JS-based scaling needs metric-aware centering — a pattern worth checking during preflight for future font changes.

### Million-Dollar Question

If Antonio had been the cartouche font from day one, `initCartouches` would have included `inkCenterOffset` from the start, and the `--nerv-cartouche-ty` custom property would have been part of the original cartouche API alongside `sx`/`sy`. The Canvas measurement overhead is negligible (one `measureText` call per cartouche, only at init), so there's no architectural cost to having it always present. The current implementation is essentially what the "from scratch" version would look like.
