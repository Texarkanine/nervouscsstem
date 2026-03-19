# Progress: M5 — List Styling

Add list styling with angled 45-degree pillbox helper classes and configurable color for list items. New component in a new SCSS partial.

**Complexity:** Level 2

## Phase History

### Complexity Analysis — Complete
Classified as Level 2 (Simple Enhancement). Self-contained new component — utility/helper classes for pillbox-styled list items. New SCSS partial, fits component layer.

### Plan — Complete
Designed `clip-path: polygon()` hexagonal pillbox approach for list items. 9 test behaviors. `.nerv-list` container + auto-styled `> li` children + `@each`-generated `.nerv-list-{color}` variants. Custom properties: `--nerv-list-color`, `--nerv-list-color-rgb`, `--nerv-list-inset`. `filter: drop-shadow()` for glow (borders incompatible with clip-path). `prefers-contrast: more` support. 4 files touched: `src/_list.scss` (new), `src/nerv.scss` (add @forward), `test/components.test.mjs` (add tests), `ref/ref-components.html` (demo).

### Preflight — Complete (PASS)
All checks passed. Convention compliance (`.nerv-` prefix, `_list.scss` naming, `@use 'tokens'` pattern), dependency impact (`nerv.scss` header comment needs `list` in chain — amended plan), conflict detection (no existing `.nerv-list`), and completeness all clean. Advisory: horizontal layout modifier `.nerv-list-horizontal` deferred as YAGNI per brief.

### Build — Complete
Implemented `_list.scss` with 6 classes (`.nerv-list` container + 5 sub-rules) + 9 auto-generated color variants. 3 custom properties (`--nerv-list-color`, `--nerv-list-color-rgb`, `--nerv-list-inset`). `prefers-contrast: more` support. 9 new tests in `test/components.test.mjs`. Ref page updated: Zone E with 4 list demos (default, cyan, red, green). All 205 tests pass, lint and build clean. No deviations from plan.

### QA — Complete (PASS)
Semantic review passed. KISS/DRY/YAGNI/Completeness/Regression/Integrity/Documentation all clean. No issues found — implementation is minimal, follows established patterns, and meets all requirements.

### Post-QA Rework (8 cycles) — Complete
User-driven iteration expanded the component from 9 tests to 22:
1. **Rotation**: "45-degree angled" means per-item rotation, not shape. Added `--nerv-list-angle`, `transform: rotate()`, `transform-origin: 0% 50%`. B10–B13.
2. **Shapes + Overlap**: Added rect shape, "para" (later renamed arrow). Fixed overlap with padding. B14–B16.
3. **Fill modes**: Added bordered, outline, solid. Started drop-shadow border saga. B17–B19.
4. **Naming + Arrow + True para + Gap**: Renamed para→arrow, added arrow-reverse, true parallelogram via clip-path, `--nerv-list-gap`. B20–B22.
5. **Real borders**: Switched bordered/outline from drop-shadow to real CSS `border` + box-shadow glow. Documented clip-path border limitation.
6. **Remove ALL glow**: User confirmed 0.5 opacity background is sufficient. Stripped filter, box-shadow, glow mixin entirely. Massive simplification.
7. **skewX for parallelogram**: Switched para from clip-path to `skewX()` on `::before` pseudo. Exact angle control, borders work, text stays straight.
8. **Source order fix**: Reordered fill modes before shape modifiers to fix specificity bug where solid overrode para's transparent background.

Final: 5 shapes × 4 fills × 2 rotations, 22 tests, 223 lines SCSS, zero glow/filter complexity.

### Reflect — Complete
Key insights captured: drop-shadow is not a border; skewX on ::before is the clean parallelogram pattern; source order is the hidden third cascade axis; user-driven visual iteration beats speculative design for aesthetic components.
