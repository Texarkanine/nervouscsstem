# Progress — Status Cartouche Element

Create a new `.nerv-cartouche` CSS component with flex (default) and fixed variants, semantic color support via `$nerv-colors`, mixed JP/EN font support via `.nerv-type-mixed`, and demo on `ref/ref-foundation.html`.

**Complexity:** Level 2

## Phase History

### Complexity Analysis — COMPLETE
- Determined Level 2 (Simple Enhancement)
- New self-contained CSS component following established codebase patterns

### Plan — COMPLETE
- 14 behaviors to verify, 13 implementation steps
- Files: `src/_cartouche.scss` (new), `src/nerv.scss`, `src/nerv.js`, `ref/ref-foundation.html`, `test/components.test.mjs`
- Key decision: fixed variant uses JS orchestration for X/Y text scaling (consistent with existing patterns)

### Preflight — COMPLETE (PASS)
- Amended font-weight from 600 to 400 (only weight loaded)
- Folded in --nerv-cartouche-radius custom property for rounded/sharp variants

### Build — COMPLETE
- All implementation steps completed
- 14 new tests, all passing
- Full suite: 286 tests, 0 failures
- Build: both normal and minified succeed
- No regressions detected

### QA — COMPLETE (PASS)
- 3 trivial findings, all fixed inline:
  1. Duplicate `display` property removed from .nerv-cartouche-fixed > *
  2. nerv.scss header comment updated with cartouche in dependency chain
  3. Dead padX/padY variables removed from initCartouches

### Reflect — COMPLETE
- Clean execution, no notable process insights
- Technical insight: composite font-face pattern (NERV Mixed) should be a token if reused
- Million-dollar: --nerv-font-mixed CSS custom property in _tokens.scss for future DRY

### Creative (Standalone) — Multi-Line Cartouche Interior Structure — COMPLETE
- Explored 4 options: Always-Table, Optional Table (Hybrid), Span-Only Rows, Nested Cartouches
- **Decision: Option B — Optional Table (Hybrid)** with high confidence
- Single-content stays as `<span>` (unchanged); multi-cell layouts use raw `<table>` (no `.nerv-table` class)
- Span-only rows (Option C) disqualified: cannot reproduce reference image's two-column first row
- Documented in `memory-bank/active/creative/creative-cartouche-multiline-structure.md`

### Refinements — COMPLETE
- Iterative visual tuning driven by user feedback
- Synthetic bold (font-weight: 700) on flex cartouches for CRT feel
- Proportional border-width via em units (0.15em default)
- Vertical centering fixes: asymmetric padding (flex) + tuned line-height (fixed)
- Fixed variant typography isolated from base (font-weight: 400, line-height: 1.1)
- scaleY on flex cartouches explored and rejected (layout/visual overflow risk)

### Reflect (Refinements) — COMPLETE
- Key insight: transform is visual-only; scaleY on flow elements causes unpredictable overflow
- Key insight: uppercase centering in flex containers is variant-dependent (flex vs fixed need different line-heights)
- Million-dollar: CSS text-box-trim will solve uppercase centering at the root when browser support lands

### Rework Initiated
Implementing the multi-line/multi-cell table support for fixed cartouches, as designed in the creative phase (Option B: Optional Table Hybrid). Scope:
- CSS additions for `.nerv-cartouche-fixed > table` and `td` styling
- JS changes to `initCartouches` for table-mode per-cell scaling
- Replace broken multi-line example in ref-foundation.html with proper table-mode demos
- New demo row: 1×2 column cartouche with varied text compression, plus complex multi-cell cartouches replicating reference imagery (OBJECT: EVA-01 data panel, LIVE badge with source ID, MAGNIFICATION / LIVE, LOCKED + OPEN states)

### Rework — Complexity Analysis — COMPLETE
- Determined Level 2 (Simple Enhancement) — same scope as original task
- Extending existing cartouche component with table mode, no architectural changes

### Rework — Plan — COMPLETE
- 5 behaviors to verify, 8 implementation steps
- Files: `src/_cartouche.scss`, `src/nerv.js`, `ref/ref-foundation.html`, `test/components.test.mjs`
- No new dependencies, no design decisions needed (creative phase already decided Option B)

### Rework — Preflight — COMPLETE (PASS)
- 2 findings, both amended into plan:
  1. Added `transform: none` to `> table` to override `> *` rule's transform
  2. Added explicit `transform-origin: center` to td spec
- Added B6 test for transform override

### Rework — Build — COMPLETE
- All 8 implementation steps completed
- 6 new tests (B1–B6), all passing
- Full suite: 293 tests, 0 failures
- Build, minify, lint all pass
- 1 deviation: fixed pre-existing lint error in cartouche base padding

### Rework — QA — COMPLETE (PASS)
- 2 findings, both fixed inline:
  1. JS measureTable used scrollWidth/scrollHeight (wrong API) — switched to Range.getBoundingClientRect() for accurate text measurement when cells are wider than content
  2. _cartouche.scss header doc updated to mention table mode

### Rework — Reflect — COMPLETE
- Key insight: scrollWidth/scrollHeight can never be less than clientWidth/clientHeight — unsuitable for measuring content smaller than its container
- Million-dollar: unified Range-based measurement for all initCartouches modes would eliminate the two-path measurement logic
