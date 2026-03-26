# Task: Glow Drop-Shadow Color Variants Bug Fix

* Task ID: glow-drop-colors
* Complexity: Level 1
* Type: Quick Bug Fix

## What Broke

The `@each` loop in `src/_glow.scss` (lines 34–49) generates `.nerv-glow-{name}` (box-shadow) and `.nerv-glow-text-{name}` (text-shadow) for each glow-flagged color in `$nerv-colors`, but did **not** generate `.nerv-glow-drop-{name}` (filter: drop-shadow). Only the default `.nerv-glow-drop` existed (amber/primary).

## Why

The drop-shadow utility was added after the `@each` loop was written and was never integrated into the loop. The ref HTML was written with the expected class names (`.nerv-glow-drop-red`, etc.) but they didn't exist in compiled CSS.

## Fix

Added `.nerv-glow-drop-#{$name}` generation inside the existing `@each` loop, using the same `filter: drop-shadow(...)` pattern as the default class but referencing `--nerv-#{$name}` instead of `--nerv-primary`.

## Files Changed

- `src/_glow.scss` — added `.nerv-glow-drop-#{$name}` block inside `@each` loop
- `test/foundation.test.mjs` — added test: "each glow-flagged color has a .nerv-glow-drop-{name} class"
