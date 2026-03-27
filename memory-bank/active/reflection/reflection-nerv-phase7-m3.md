---
task_id: nerv-phase7-m3
date: 2026-03-27
complexity_level: 2
---

# Reflection: M3 — Rainbow Gradients

## Summary

Built a reusable gradient utility module (`_gradient.scss`) with cascade-responsive defaults, 5 presets, and auto-generated composable from/to modifier classes. Clean execution — first-try green on all 10 tests, trivial-only QA finding. Post-reflect fix for 1px dark edge artifact at border boundaries.

## Requirements vs Outcome

All requirements met. Three additions emerged during preflight (all within scope): cascade-responsive defaults via ambiance tokens (operator request), alert-cascade ref page demo (operator request), and auto-generated from/to modifier classes (radical innovation following the `_glow.scss` @each pattern). No requirements dropped or descoped.

## Plan Accuracy

The plan was accurate. 8 steps executed in order, no reordering, no surprises. The initial scope ("rainbow gradients") was misleadingly broad — operator clarification during planning ("the mental contamination bar IS the rainbow gradient") narrowed it to the right target: easy-access background gradients between NERV color tokens, not a complex hue-wheel system.

## Build & QA Observations

Build was clean. TDD cycle worked perfectly — 10 red → implementation → 10 green on first attempt. The custom-property-override pattern (base class provides the gradient declaration, modifiers just set `--nerv-gradient-from-rgb`/`--nerv-gradient-to-rgb`) proved elegant and composable. QA caught only the `nerv.scss` comment header missing `gradient` in the dependency listing.

## Insights

### Technical
- The ambiance-vs-data token split naturally yields cascade-responsive vs. stable behavior without extra code. By defaulting `.nerv-gradient` to `--nerv-primary-rgb` / `--nerv-bg-rgb`, alert cascade integration is free — the same principle that makes `.nerv-glow` (ambiance) shift with state while `.nerv-glow-red` (data) doesn't.
- The `background` shorthand resets `background-origin` to `padding-box`. When a gradient container has a border, this creates a 1px gap where the page background bleeds through — the gradient starts inside the border, not at the outer edge. Fix: explicitly set `background-origin: border-box`. This is the same family of CSS replacement gotcha documented in `systemPatterns.md` (property-reset side effects).

### Process
- Nothing notable beyond the value of early operator clarification on ambiguous feature names.

### Million-Dollar Question
If gradients had been a foundational assumption, the bar meter's `--nerv-bar-from`/`--nerv-bar-to` might share the same property names as the gradient module. But bar meters use `color-mix()` for discrete per-segment coloring (not `linear-gradient`), so the APIs serve genuinely different purposes. The current split is correct.
