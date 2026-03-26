# Project Brief — Glow Drop-Shadow Color Variants Bug Fix

## User Story

As a consumer of the NERV design system, I expect `.nerv-glow-drop-{color}` utility classes (red, green, cyan, etc.) to exist alongside `.nerv-glow-{color}` and `.nerv-glow-text-{color}`, so that drop-shadow glow effects follow the same per-color pattern as box-shadow and text-shadow glows.

## Bug Description

The `@each` loop in `src/_glow.scss` generates `.nerv-glow-{name}` (box-shadow) and `.nerv-glow-text-{name}` (text-shadow) for each glow-flagged color in `$nerv-colors`, but does **not** generate `.nerv-glow-drop-{name}` (filter: drop-shadow). Only the default `.nerv-glow-drop` class exists (using `--nerv-primary`).

`ref/ref-foundation.html` references `.nerv-glow-drop-red`, `.nerv-glow-drop-green`, and `.nerv-glow-drop-cyan` — none of which exist in compiled CSS. Only the first demo element (`.nerv-glow-drop`, amber) renders a glow.

## Requirements

1. Add `.nerv-glow-drop-{name}` generation to the existing `@each` loop in `_glow.scss`
2. Ensure the drop-shadow filter uses the correct color variable per color name
3. Existing tests and build must continue to pass
4. The ref page demo should visually show glowing elements for all four colors

## Constraints

- Follow existing `@each` loop pattern exactly
- No new files — changes confined to `src/_glow.scss`
- Ref HTML already has the correct class names; no HTML changes needed
