# Active Context

## Current Task
M5: List Nesting Overhaul (Rework) — fix visual bugs in list nesting

## Phase
BUILD (rework-2) - COMPLETE

## What Was Done
- Bug 1a (prior): `calc(var(--nerv-list-gap) + 0.3em)` for parent→first-child spacing ✓
- Bug 1b: `margin-bottom: -0.3em` on base nested list rule to compensate for parent li padding-bottom; contained rule's `margin-bottom: 0.3em` overrides this via source order
- Bug 2 root cause: `--nerv-list-angle` resets to `0deg` on nested `.nerv-list` (base rule), making counter-rotation and translateX no-ops
- Bug 2 fix: Introduced `--_nerv-list-rotation` internal property on `.nerv-list-angled` / `.nerv-list-angled-reverse`; used in counter-rotation and translateX rules instead of `--nerv-list-angle`
- Browser-verified all 3 nesting modes: indented (spacing equalized), contained (unchanged), rotated (counter-rotation + translateX working)
- 358/358 tests pass (B40, B41, B48 updated for new variable; B49 added for margin-bottom)

## Files Modified
- `src/_list.scss` — `--_nerv-list-rotation`, counter-rotation/translateX use it, `margin-bottom: -0.3em`
- `test/components.test.mjs` — B40, B41, B48 updated; B49 added

## Key Decisions
- `--_nerv-list-rotation` (underscore prefix) signals internal property; it inherits to nested lists without being reset by the base `.nerv-list` rule

## Next Step
QA review needed, then reflect, then archive.
