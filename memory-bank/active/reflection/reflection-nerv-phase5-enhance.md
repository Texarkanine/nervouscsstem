---
task_id: nerv-phase5-enhance
date: 2026-03-17
complexity_level: 3
---

# Reflection: Phase 5 Enhancements — Component Flexibility

## Summary

Enhanced three Phase 5 components (label boxes, MAGI panels, bar meters) with runtime flexibility, interactivity, and token-based color customization. All planned requirements delivered, plus post-build operator feedback drove a significant label box rework (cascade fix, intensity hierarchy redesign, reverse-angle modifier, transition timing). Final state: 138/138 tests, build/lint clean, operator-approved interactions.

## Requirements vs Outcome

Every requirement from the original project brief was implemented: token additions, label box interactivity, MAGI per-system color, bar meter color-mix/sizing/vertical/generation, reference page demos.

**Additions beyond plan (from operator feedback):**
- `.nerv-label-box-reverse` modifier class with `--nerv-label-box-skew` custom property — not in original plan, requested during visual review
- Redesigned interaction intensity hierarchy (hover as most intense, funky press) — plan specified "subtle" states; operator wanted dramatic states
- 2nd row of reverse-angle buttons with color token overrides on reference page
- Transition timing tightened from 150ms to 60ms for CRT-snappy feel

No requirements dropped or descoped.

## Plan Accuracy

The 9-step plan was structurally correct — file list, sequence, and challenge mitigations all held. MAGI, bar meter, token, and JS steps executed without deviation.

**Where the plan was wrong:** Label box interaction states. The plan specified "subtle background hint (rgba ~0.08)" for hover and "stronger fill (~0.15) + inset shadow" for press. Both values were chosen without tracing the CSS specificity cascade against the active state, and without validating visual perceptibility against the void background. This produced three bugs:

1. Inactive hover invisible (0.08 opacity on black = imperceptible)
2. Active hover unreadable (generic `:hover` background at specificity 0,1,1 overrode `.nerv-label-box-active` background at 0,1,0, producing black text on near-black background)
3. Press state unnoticeable (too timid for a momentary interaction)

The plan also didn't anticipate the reverse-angle modifier request, though this was straightforward to implement via CSS custom property.

## Creative Phase Review

No creative phase was executed. In hindsight, the label box interaction states would have benefited from a creative exploration — the "right" intensity hierarchy and the specificity cascade strategy are design decisions, not mechanical implementations. The plan treated them as obvious, but they weren't.

## Build & QA Observations

**Build (initial):** Smooth. TDD worked perfectly for MAGI, bar meter, tokens, and JS. The `color-mix()` SCSS loop was simpler than the original HSL approach.

**QA:** Found 4 trivial doc comment fixes. No substantive issues — but QA was CSS string matching and couldn't catch the visual interaction bugs that the operator found.

**Rework (post-operator feedback):** Required a full rewrite of `_label-box.scss` interaction states:
- Restructured cascade: `:hover` → `:active` source ordering so press wins at equal specificity
- Added explicit `background`/`color` on `.nerv-label-box-active:hover` to prevent the generic hover from clobbering the active fill
- Added `.nerv-label-box-active:active` for active-button press
- Redesigned intensity values: hover glow 1.5x/3.5x, press scale(0.93) + inset glow
- Introduced `--nerv-label-box-skew` custom property with `calc(* -1)` for auto counter-skew
- Tightened transition timing (150ms → 60ms) for CRT aesthetic

The rework was efficient (2 focused commits) and didn't break any existing tests. Added 1 new test for `.nerv-label-box-reverse`.

## Cross-Phase Analysis

- **Plan → Build (miss):** The plan's label box hover/press values were specified without cascade analysis or visual validation. The specificity conflict between `.nerv-label-box:hover` and `.nerv-label-box-active` was a textbook CSS cascade issue that the plan should have traced. This caused the most significant rework of the task.
- **Preflight → Build (hit):** The `@media (hover: hover)` amendment from preflight was correct and directly applied. Without it, the rework would have been even larger.
- **QA → Rework (gap):** QA's CSS string matching could detect property presence but not visual correctness or cascade interactions. The operator's visual testing caught what automated QA couldn't. This is a fundamental limitation of the current test approach, not a QA process failure.
- **Operator feedback → Scope expansion:** The reverse modifier and intensity hierarchy redesign were scope additions that emerged naturally from visual testing. The workflow handled them efficiently as iterative fixes rather than requiring a full plan→build cycle.

## Insights

### Technical
- **CSS specificity cascade must be traced for interactive states.** When a component has both a class-based state (`.nerv-label-box-active`, specificity 0,1,0) and pseudo-class states (`:hover`, `:active`, specificity 0,1,1), the pseudo-class wins by default. Every compound state (`active+hover`, `active+press`) needs an explicit selector at higher specificity. Future interactive component plans should include a specificity cascade table.
- **CSS custom properties for geometric transforms** (`--nerv-label-box-skew` with `calc(var() * -1)` counter-skew) is a clean pattern for modifier variants. Avoids duplicating rules for each angle — one custom property override changes both the element and its children.
- **Opacity values need perceptibility validation against actual backgrounds.** 0.08 rgba on a black background is functionally invisible. Future plans should specify minimum contrast delta, not just opacity.
- **Transition timing is a design language decision.** 150ms felt appropriate in isolation but wrong for a CRT aesthetic where state changes should feel electric. The timing constant should be a design token rather than per-component, for consistency.

### Process
- **Interactive CSS components need visual validation before QA.** Automated CSS string tests can verify property presence but not cascade correctness or visual perceptibility. For future interactive components, the build phase should include a manual visual check of all state combinations (base, hover, active, press, active+hover, active+press, focus-visible) before declaring build complete. Consider adding this as an explicit step in the L3 build checklist.
- **Operator feedback loops are efficient.** The two post-build fix commits were fast and focused. The workflow's ability to accept iterative feedback without requiring a full plan→preflight→build cycle is valuable for visual/interaction tuning.
