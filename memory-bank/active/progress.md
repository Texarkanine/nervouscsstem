# Progress — Glow Drop-Shadow Color Variants Bug Fix

Add missing `.nerv-glow-drop-{name}` color variant generation to the `@each` loop in `src/_glow.scss`, so drop-shadow glow follows the same per-color pattern as box-shadow and text-shadow glows.

**Complexity:** Level 1

### Complexity Analysis — COMPLETE
- Determined Level 1 (Quick Bug Fix)
- Single component affected (`_glow.scss`), isolated change

### Build — COMPLETE
- Root cause: `@each` loop generated `.nerv-glow-{name}` and `.nerv-glow-text-{name}` but not `.nerv-glow-drop-{name}`
- Test added: "each glow-flagged color has a .nerv-glow-drop-{name} class" in `test/foundation.test.mjs`
- Fix: 5-line addition inside existing `@each` loop
- 272 tests pass, 0 regressions, both builds succeed
