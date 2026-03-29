# Active Context

## Current Task
M5: List Nesting Overhaul — fix contained sublists and indented non-contained sublists for all shape/rotation combinations including angled variants

## Phase
BUILD - COMPLETE (PASS)

## What Was Done
- Step 1: Extracted `--nerv-list-clip` custom property — shapes set clip path on container, `li` reads via `var()`
- Step 2: Nesting detection via `:has(> .nerv-list)` — parent li goes transparent, `::before` takes over shape
- Step 3: Contained mode — `.nerv-list-contained` on nested `<ul>` makes `::before` expand to wrap children
- Step 4: Fill mode overrides — bordered/outline/solid all compose correctly with nested `::before`
- Step 5: Rotation counter-rotation — nested lists in angled items get `rotate(calc(-1 * angle))`
- Step 6: Accessibility — `prefers-contrast: more` targets nested-parent `::before` with higher opacity
- Step 7: Ref page — fixed invalid HTML (`<ul>` direct child of `<ul>`), added 3 demo sections (indented, contained, rotated)
- Step 8: Documentation — updated `_list.scss` doc comment with nesting section, new custom properties

## Files Modified
- `src/_list.scss` — primary implementation (nesting rules, clip-path refactor, fill/rotation/a11y overrides)
- `test/components.test.mjs` — 20 new behaviors (B24–B43), 3 modified (B2, B15, B20)
- `ref/ref-lists.html` — fixed invalid HTML, added nesting demo sections

## Key Decisions During Build
- Arrow/arrow-reverse `> li` clip-path overrides removed entirely (custom property on container is sufficient)
- Rect keeps explicit `clip-path: none` on `> li` alongside `--nerv-list-clip: none` (belt-and-suspenders)
- Para `--nerv-list-clip: none` added to container (para uses skewX, not clip-path)
- Counter-rotation uses `calc(-1 * var(--nerv-list-angle))` to auto-adapt to any angle value

## Deviations from Plan
None — built exactly to plan.

## Integration Test Results
- `npm run build`: ✅
- `npm run build:min`: ✅
- Stylelint: no new errors (27 pre-existing SCSS parser issues)
- Full test suite: 161/161 pass, 0 fail
- Browser smoke: all nesting demos render correctly (indented, contained, rotated)

## Next Step
QA review will now run automatically.
