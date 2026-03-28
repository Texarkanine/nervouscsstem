---
task_id: nerv-phase7-m4
date: 2026-03-28
complexity_level: 2
---

# Reflection: M4 — Data Background

## Summary

Built `.nerv-data-bg` module with binary/DNA character fill, seamless scroll animation, and criticality-driven speed. All 11 behaviors tested, 332 tests passing. QA fix for custom property cascade direction; post-reflect fix for broken seamless scrolling caused by `inset: 0` constraining the inner element's height.

## Requirements vs Outcome

All milestone requirements delivered: binary mode, DNA mode, seamless scroll, criticality speed scaling. One addition from preflight: `--nerv-data-bg-opacity` consumer-tunable custom property (follows `_gradient.scss` pattern). No requirements dropped.

## Plan Accuracy

Plan sequence and file list were correct. Four surprises:
1. Preflight caught BEM naming in the plan (`__inner`, `--binary`) — project uses flat naming convention
2. Sass strips blank lines from compiled CSS, requiring property reorder for Stylelint's `custom-property-empty-line-before` rule
3. Custom property default placement (inner vs. container) affects consumer override cascade
4. `inset: 0` on the inner element pinned it to the container's height, preventing the duplicated text from extending beyond the container — the fundamental mechanism the seamless scroll depends on. Missed in both build and QA because the tests verified animation properties exist but not that the scroll was visually seamless.

## Build & QA Observations

Build was smooth — 8 steps in order, no blockers. Empty SCSS rule blocks getting stripped by Sass was a minor surprise (solved by adding meaningful declarations). QA caught a real bug: `--nerv-data-bg-opacity` on the child blocked container overrides. Visual review after reflect caught a bigger bug: the scroll animation wasn't seamless at all — `inset: 0` + `overflow: hidden` on the inner element constrained it to the container's height, clipping the duplicated text and leaving black space as it scrolled. Fixed by replacing `inset: 0; overflow: hidden` with `top: 0; left: 0; width: 100%`, letting content height drive the element's size while the container's `overflow: hidden` handles the visual crop.

## Insights

### Technical
- When a JS-injected child element consumes a CSS custom property that the consumer sets on the container, the default must live on the container, not the child. The child's class-level declaration would shadow any inherited value from the ancestor chain. This "define where consumers interact, consume where rendering happens" pattern is now used by both `_gradient.scss` and `_data-bg.scss`.
- For seamless marquee-style scroll animations, the scrolling element must NOT be height-constrained to its parent. `inset: 0` is a common shorthand for "fill the container" but it pins all four edges, preventing content from determining the element's natural height. The correct pattern is `top: 0; left: 0; width: 100%` — anchor horizontally, let content flow vertically, let the parent's `overflow: hidden` do the clipping.

### Process
- The automated test suite verified that the animation CSS existed but could not detect that the visual result was broken. For animation-dependent features, visual verification on the ref page is non-negotiable — the test suite is a necessary but insufficient check. The cascade ref page addition (which prompted the visual check) is what surfaced the bug.

### Million-Dollar Question

The architecture is natural and follows existing patterns. The systemic improvement: the "custom property defined on container, consumed by child" pattern now appears in two modules (`_gradient.scss`, `_data-bg.scss`). This is worth documenting as a formal convention to prevent future modules from repeating the QA-caught mistake.
