---
task_id: nerv-phase7-m1
date: 2026-03-27
complexity_level: 2
---

# Reflection: M1 — Foundation (DOS/BIOS Font + Grid Mark Variants)

## Summary

Added VT323 DOS/BIOS boot-screen font with `.nerv-type-boot` utility class (including `white-space: pre-wrap`), and two new grid mark pattern variants (`.nerv-grid-marks-x` discrete rotated-cross, `.nerv-grid-marks-hex` equilateral honeycomb) with auto-generated color variants. All requirements delivered after significant post-build rework: SVG geometry corrections for both pattern variants, `pre-wrap` addition, ref page layout/colorization, and a `pre-wrap` + HTML indentation interaction fix.

## Requirements vs Outcome

Every original requirement delivered as specified. Post-build, several rework items surfaced from operator review:
- **Ref page layout** (`ref-patterns.html`): Grid mark comparison section moved from beside the main viewport to below it — the side-by-side layout squished unpleasantly.
- **Boot text colorization** (`ref-foundation.html`): Demo colorized with data-green base + per-MAGI-system named colors (amber, orange, amber-dark).
- **`white-space: pre-wrap`** added to `.nerv-type-boot` so `&nbsp;` isn't needed for column alignment in boot-screen text. Then `&nbsp;`/`<br>` entities removed from ref demos in favor of literal whitespace.
- **× mark geometry** fixed: shortened diagonal lines to create discrete crosses instead of continuous diagonals spanning tiles.
- **Hex grid geometry** rewritten: replaced overlapping hexagons with a mathematically correct equilateral flat-top honeycomb (side=20, tile 60×34.64px).
- **`pre-wrap` indentation gotcha** (`ref-panels.html`): When the boot text was reused inside an indented HTML structure, the HTML source indentation was rendered as literal leading spaces. Fixed by making content flush-left inside the `<div>`.

## Plan Accuracy

The 8-step plan was accurate for the initial build — correct files, correct sequence, correct scope. However, the plan underestimated the geometry precision needed for the SVG patterns (× and hex), and did not anticipate the `white-space: pre-wrap` side-effect when `.nerv-type-boot` content appears in indented HTML templates. These all surfaced as operator feedback after the initial build/QA/reflect cycle.

## Build & QA Observations

Initial build was clean on first pass. QA caught two documentation omissions (file header, techContext font stack). The more substantive issues — SVG geometry correctness, `pre-wrap` interaction with HTML indentation — were caught by the operator during visual review of the ref pages, not by automated tests. This is expected: geometric aesthetics and whitespace rendering are inherently visual concerns that CSS unit tests can't fully cover.

## Insights

### Technical
- **`white-space: pre-wrap` preserves HTML source indentation.** When a `pre-wrap` element is nested inside indented HTML, all leading spaces from the source formatting become visible rendered whitespace. CSS cannot distinguish "HTML indentation" from "intentional content spaces." The convention for `pre-wrap`/`<pre>`-like elements is: content must be flush-left inside the tag, with the closing tag on the last content line to avoid trailing blank lines.
- Node.js test runner's `--test-name-pattern` filter skips `before()` hooks in non-matching describe blocks. When tests rely on a module-scoped variable initialized by an earlier suite's `before()`, filtered runs produce false negatives. Full-file runs are the reliable path.
- SVG data-URI honeycomb tessellation requires precise geometry: for equilateral flat-top hexagons with side `s`, the tile must be exactly `3s × s√3`. A single `<path>` drawing one complete hexagon plus two edge-bridging segments is more maintainable than multiple overlapping `<polygon>` elements.

### Process
- Visual/aesthetic correctness of SVG patterns and whitespace behavior cannot be caught by regex-based CSS tests alone. For geometry-sensitive features, operator visual review of ref pages is an essential QA step that should be explicitly planned.
- Post-reflect rework happened because the ref page demos weren't exercised in realistic contexts (e.g., the boot text inside an indented panel). Dogfooding new utility classes in multiple ref pages during the initial build would have caught these issues earlier.

### Million-Dollar Question

If `white-space: pre-wrap` had been a foundational assumption for `.nerv-type-boot` from the start, the ref page templates would have been authored with flush-left content blocks from day one — no rework needed. The current design (pre-wrap baked into the class) is correct for a terminal/boot-screen font; the lesson is that any `pre`-family whitespace mode demands discipline in HTML authoring, and ref page demos should demonstrate the class in both standalone and nested contexts to surface these interactions early.
