---
task_id: nerv-m5-list-styling
date: 2026-03-18
complexity_level: 2
---

# Reflection: M5 — List Styling

## Summary

Built a list styling component with 5 shapes, 4 fill modes, per-item rotation, and color variants. The initial plan covered a basic hex pillbox in 9 tests; user-driven iteration expanded scope to 22 tests across 8 rework cycles, culminating in a much richer and architecturally cleaner component than originally planned.

## Requirements vs Outcome

The project brief asked for "helper classes for lists with 45-degree angled pillbox styling around content" with color selection. The final delivery far exceeded this: 5 shape modes (hex, rect, arrow, arrow-reverse, parallelogram), 4 fill modes (translucent, bordered, outline, solid), 2 rotation modifiers with containment padding, configurable gap, configurable skew angle, and 8+ auto-generated color variants. Every addition came from direct user feedback during visual review — none were speculative.

The brief's note "shape options may be YAGNI" was wrong. Users wanted shapes, fills, and rotations as orthogonal composable modifiers.

## Plan Accuracy

The initial 9-behavior plan was accurate for its scope but covered roughly 40% of what was ultimately needed. The plan correctly identified `clip-path vs borders` as a challenge and proposed `filter: drop-shadow()` as the mitigation. This was the plan's biggest miss — `drop-shadow` produces a diffuse glow, not a crisp border, and it applies to ALL painted content including text, washing it out. The real answer was: use real `border` on shapes that can support it (rect, para), and accept the limitation on clip-path shapes (hex, arrow).

The plan did not anticipate: per-item rotation, multiple shapes, fill modes, the skewX approach for parallelograms, or the source-order specificity interplay between fill modes and shapes.

## Build & QA Observations

**What went well:** TDD held up beautifully across all 8 rework cycles. Each iteration: update tests → red → implement → green. The test suite grew from 9 to 22 behaviors and caught regressions every time. The final SCSS is 223 lines of clean, well-structured code with no glow/filter complexity.

**What was hard:** The border saga consumed 3+ rework cycles. The progression:
1. `filter: drop-shadow()` on container → text washes out, "borders" are just glow
2. Stacked `drop-shadow(0 0 0.5px)` × 4 → sub-pixel rendering, invisible in browsers
3. Real `border` + `@include glow.nerv-glow()` on `li` → box-shadow clipped by clip-path, too glowy on rect
4. Real `border` only, remove ALL glow, bump background to 0.5 opacity → clean and correct

The user cut through the complexity faster than the implementation: "I changed background to 0.5 opacity and it looks fine. Can just drop glow altogether."

**Skew breakthrough:** Switching parallelogram from `clip-path: polygon()` to `skewX()` on a `::before` pseudo-element solved three problems at once: exact angle control (degrees not ratios), borders work (no clipping), and text stays straight (skew on pseudo, not content). The key math: `skewX(angle)` + `rotate(angle)` = vertical edges in screen space.

**Source-order bug:** Generic `.nerv-list-solid > li { background: color }` (fill mode) overrode `.nerv-list-para > li { background: transparent }` (shape) at equal specificity because fill modes were declared after shapes. Fix: reorder so fill modes come before shapes. This is a class of bug that doesn't show in tests (both rules exist in CSS) but breaks visual rendering.

## Insights

### Technical

- **`filter: drop-shadow()` is not a border.** It traces the alpha channel of ALL painted content and produces a glow, not a crisp line. It cannot be scoped to just backgrounds. For crisp phosphor borders, use real CSS `border` + `box-shadow`. On clip-path shapes, this is impossible — accept the limitation and document it.
- **`skewX()` on `::before` is the clean parallelogram pattern.** It avoids text distortion (no counter-skew needed since the skew is on the pseudo, not the element), preserves real CSS borders (no clip-path), and provides exact angle control in degrees. When paired with rotation, `skewX(angle) == rotate(angle)` produces vertical edges.
- **CSS source order is the hidden third axis of the cascade.** When designing orthogonal modifier systems (shapes × fills × rotations), the source order of rules determines which modifier "wins" at equal specificity. Fill modes must come before shape modifiers so shapes can override background.
- **Higher opacity beats glow.** A 0.5 opacity colored background is visually stronger and more readable than a 0.12 opacity background with layered `filter: drop-shadow()` glow. Glow adds complexity (text wash-out, filter inheritance, performance) for marginal visual gain. Start with stronger backgrounds; add glow only if specifically requested.

### Process

- **User-driven visual iteration beats speculative design for aesthetic components.** The user saw "no border" or "text washed out" instantly on the ref page, feedback that no amount of upfront CSS reasoning could have predicted. For visual/aesthetic work, ship the minimum, show it, and iterate.
- **Consult existing codebase patterns before inventing solutions.** The project already had crisp phosphor borders on label-box (real `border` + `skewX`) and MAGI panel (real `border` + `box-shadow`). The initial plan ignored these and invented a `drop-shadow` approach that failed. The user pointed this out: "the buttons under Mission Elapsed Time do it right."

### Million-Dollar Question

If shape/fill/rotation orthogonality had been a foundational assumption, the architecture would look exactly like what we ended up with: a layered cascade where (1) base sets defaults, (2) fill modes set border/background, (3) shape modifiers override clip-path/background as needed (with para using a fundamentally different rendering strategy via `::before` + `skewX`), and (4) rotation is independent. The key design decision — that clip-path shapes and transform shapes need different border strategies — would have driven the architecture from day one instead of emerging through 8 rework cycles. The `::before` pseudo-element pattern for para would have been the starting point, not the final discovery.
