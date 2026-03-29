---
task_id: nerv-phase7-m5-rework
date: 2026-03-29
complexity_level: 3
---

# Reflection: M5 — List Nesting Overhaul (Rework)

## Summary

Fixed indented-mode parent→child spacing (Bug 1) successfully. Attempted rotated-nesting page-space alignment (Bug 2) through 8+ iterations of counter-rotation, trig-decomposed margins, and clearance hacks before abandoning the feature. Rotated nesting was removed from the codebase; non-rotated nesting works correctly across all shape × fill combinations. QA skipped at operator direction.

## Requirements vs Outcome

**Bug 1 (spacing)**: Fully delivered. `calc(var(--nerv-list-gap) + 0.3em)` compensates for the `::before` overshoot, and `margin-bottom: -0.3em` equalizes last-child→next-parent spacing. Contained mode correctly excluded.

**Bug 2 (rotated alignment)**: Abandoned. The requirement was page-space X/Y alignment of nested children within rotated parent lists. After 8+ build iterations, the feature was deemed infeasible with pure CSS. Counter-rotation and trig-decomposed margins achieved correct alignment at the default font size but broke unpredictably with any parameter change (font size, item width, gap, child count). The feature was removed entirely; rotated lists are documented as not supporting nesting.

## Plan Accuracy

The initial rework plan was correct for Bug 1 (executed in one iteration). For Bug 2, the plan proposed `translateX(sin(θ))` compensation, which was fundamentally the wrong mental model — it assumed layout-space transforms could solve a visual-space problem. The plan should have flagged the "CSS transforms don't affect layout" constraint as a blocking risk during preflight.

## Creative Phase Review

No formal creative phase was conducted. In hindsight, the rotated nesting problem warranted one. A creative exploration of the CSS transform vs. layout disconnect would have identified the fundamental constraint earlier and potentially saved 6+ rework iterations.

## Build & QA Observations

**What went well**: Bug 1 was clean — single-iteration fix with clear root cause. The `:has()` + `::before` shape delegation architecture is solid and proven. Non-rotated nesting works flawlessly across all shape × fill permutations.

**What was hard**: Bug 2 consumed the vast majority of effort. The progression:
1. `translateX(sin(θ))` — wrong coordinate system
2. `--_nerv-list-rotation` internal variable — correct insight (variable inheritance), but applied to a doomed approach
3. Counter-rotate `<ul>` + re-rotate `<li>` — achieved visual alignment but broke spacing
4. Trig-decomposed margins (`cos()/sin()`) — correct math but assumes fixed item dimensions
5. Direction-specific `margin-bottom` — addressed asymmetry but used magic multipliers
6. Escalating multipliers — too small = overlap, too large = canyon, Goldilocks zone is font-size-dependent

**QA**: Skipped at operator direction for the final (abandonment) build. Previous QA passes were on intermediate states that later proved incorrect.

## Cross-Phase Analysis

The root failure was a missing preflight risk assessment. The plan treated "CSS transforms don't affect layout" as an implementation detail rather than a blocking constraint. A preflight check that asked "can the outer flex container account for the visual extent of rotated nested content?" would have flagged this as infeasible before build started.

The lack of a creative phase for Bug 2 compounded the problem. Each rework iteration was a narrow fix to the previous iteration's failure, never stepping back to ask whether the approach was fundamentally viable. The `/refresh` diagnostic finally forced that step-back, but by then 6+ iterations had been invested.

## Insights

### Technical

- **CSS transforms are visual-only: this is load-bearing, not a footnote.** `transform: rotate()` creates a permanent, unbridgeable gap between where the browser computes layout (pre-rotation box) and where the user sees content (post-rotation visual). Any feature that requires layout to "know about" visual position is fighting a fundamental CSS constraint. This includes: spacing between rotated elements, overflow detection of rotated content, and click targets of rotated interactive elements.

- **Trig in CSS (`sin()`, `cos()`) is powerful but fragile.** The math was correct — margin decomposition via `cos(θ)` and `sin(θ)` accurately maps page-space offsets into rotated coordinate systems. But the inputs to the trig (`--nerv-list-item-height`, `--nerv-list-indent`) are em-relative and change with font size, while the visual overlap depends on rendered pixel width, which is content-dependent. Trig CSS works for static, known dimensions; it fails for responsive, content-driven layouts.

- **Geometric asymmetry in rotated layouts is real.** Angled-up (-45deg) and angled-down (+45deg) produce different overlap patterns because the indentation direction (always rightward) interacts differently with each tilt direction. This is not a bug — it's a geometric consequence of combining rotation with horizontal offset. Any future attempt at rotated nesting must account for this asymmetry.

### Process

- **Missing creative phase was the most expensive omission.** A 30-minute creative exploration of "can CSS layout account for visual transform extent?" would have saved 4+ hours of iterative rework. The lesson: when a feature requires coordination between two CSS subsystems (transforms and layout), the creative phase should explicitly evaluate whether that coordination is possible.

- **The `/refresh` pattern works.** When stuck in a rework loop, stepping back to measure bounding boxes and trace the actual geometry produced the correct root cause diagnosis in one pass. The key was gathering evidence (bounding box measurements) before forming hypotheses, and documenting everything in a troubleshooting file.

- **"Imperfect predictably" is a valid acceptance criterion.** The operator's willingness to accept predictable imperfection (or outright abandonment) over unpredictable fragility was the right call. A feature that works at one font size and breaks at another is worse than no feature at all.
