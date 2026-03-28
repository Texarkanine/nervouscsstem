---
task_id: nerv-phase7-m4
date: 2026-03-28
complexity_level: 2
---

# Reflection: M4 — Data Background

## Summary

Built `.nerv-data-bg` module with binary/DNA character fill, seamless scroll animation, and criticality-driven speed. All 11 behaviors tested, 332 tests passing. One QA fix for custom property cascade direction.

## Requirements vs Outcome

All milestone requirements delivered: binary mode, DNA mode, seamless scroll, criticality speed scaling. One addition from preflight: `--nerv-data-bg-opacity` consumer-tunable custom property (follows `_gradient.scss` pattern). No requirements dropped.

## Plan Accuracy

Plan sequence and file list were correct. Three surprises, all caught before or during QA:
1. Preflight caught BEM naming in the plan (`__inner`, `--binary`) — project uses flat naming convention
2. Sass strips blank lines from compiled CSS, requiring property reorder for Stylelint's `custom-property-empty-line-before` rule
3. Custom property default placement (inner vs. container) affects consumer override cascade

## Build & QA Observations

Build was smooth — 8 steps in order, no blockers. Empty SCSS rule blocks getting stripped by Sass was a minor surprise (solved by adding meaningful declarations). QA caught the one real bug: `--nerv-data-bg-opacity` defined on the injected child element blocked ancestor overrides from cascading, which would have broken the ref page demo's custom-opacity example.

## Insights

### Technical
- When a JS-injected child element consumes a CSS custom property that the consumer sets on the container, the default must live on the container, not the child. The child's class-level declaration would shadow any inherited value from the ancestor chain. This "define where consumers interact, consume where rendering happens" pattern is now used by both `_gradient.scss` and `_data-bg.scss`.

### Process
- Nothing notable — preflight and QA both earned their keep on this task.

### Million-Dollar Question

The architecture is natural and follows existing patterns. The systemic improvement: the "custom property defined on container, consumed by child" pattern now appears in two modules (`_gradient.scss`, `_data-bg.scss`). This is worth documenting as a formal convention to prevent future modules from repeating the QA-caught mistake.
