---
task_id: nerv-phase7-m5-rework
complexity_level: 3
date: 2026-03-29
status: completed (partial — Bug 1 shipped, Bug 2 abandoned)
---

# TASK ARCHIVE: M5 — List Nesting Overhaul (Rework)

## SUMMARY

Fixed indented-mode parent→child spacing (Bug 1). Attempted and abandoned rotated-nesting page-space alignment (Bug 2) after 8+ iterations proved the approach infeasible with pure CSS. The rotation × nesting CSS rules were removed entirely; rotated lists are documented as not supporting nesting. Non-rotated nesting (indented + contained modes) works correctly across all shape × fill combinations.

## REQUIREMENTS

1. **Bug 1 — Indented-mode parent→child spacing**: The visible gap between the parent `::before` shape and the first child was ~2px, while the inter-child gap was ~5px. Fix the gap to be consistent.
2. **Bug 2 — Rotated-nesting alignment**: In angled lists, nested children should indent along page-space X (horizontal) rather than along the rotation axis. All children should be parallel to parents, with consistent vertical spacing.

## IMPLEMENTATION

### Bug 1: Indented-mode spacing — SHIPPED

**Root cause**: `margin-top: var(--nerv-list-gap)` is measured from the text node bottom, but the `::before` shape extends `0.3em` past the text (the `<li>`'s `padding-bottom`). Visible gap = `margin-top - 0.3em ≈ 2px`.

```
::before shape │ height = 1.8em = padding-top(0.3em) + line(1.2em) + padding-bottom(0.3em)
               ├─ text-node bottom ≈ 1.5em
               │     ↕ margin-top = 0.35rem
               │  [first child]     visible gap = 0.35rem − 0.3em ≈ 2px  ← TOO SMALL
               ╰─ shape bottom = 1.8em
```

**Fix**: Two changes to `src/_list.scss`:
- `.nerv-list > li > .nerv-list`: `margin-top: calc(var(--nerv-list-gap) + 0.3em)` — compensates for overshoot
- `.nerv-list > li > .nerv-list`: `margin-bottom: -0.3em` — equalizes last-child→next-parent gap
- `.nerv-list > li > .nerv-list-contained`: `margin-top: var(--nerv-list-gap)` (no calc) — contained mode correctly excluded

### Bug 2: Rotated nesting — ABANDONED

See the extensive research section below. The entire rotation × nesting rule block was removed from `_list.scss`. The following were deleted:

- `--_nerv-list-rotation` internal custom property (from `.nerv-list-angled` / `-reverse`)
- `--nerv-list-nested-gap` custom property
- Counter-rotation transform on `.nerv-list-angled > li > .nerv-list`
- Trig-decomposed margins (`cos()/sin()`)
- Direction-specific `margin-bottom` overrides
- `transform-origin` override on nesting parents in rotated lists
- Tests B40, B41, B46, B48
- Rotated nesting demo section in `ref/ref-lists.html`

The `_list.scss` header comment now explicitly documents that nesting inside rotated lists is unsupported.

### Files touched
- `src/_list.scss` — Bug 1 spacing fix (shipped), Bug 2 rotation rules (removed)
- `test/components.test.mjs` — B44, B45, B47 (shipped); B40, B41, B46, B48 (removed)
- `ref/ref-lists.html` — rotated nesting demo section removed

## TESTING

- Bug 1: Tests B44 (calc margin-top), B45 (contained override), B47 (negative margin-bottom)
- Full suite: 353/353 pass after cleanup
- Build: `npm run build` clean
- Lint: no new errors introduced
- Visual verification: browser screenshots + bounding box measurements at multiple stages

## RESEARCH: WHY ROTATED NESTING WAS ABANDONED

This section is the permanent record of the rotated-nesting investigation. It documents every approach tried, why each failed, the fundamental CSS constraint, and what would need to change to make it work. **Read this before attempting rotated nesting again.**

### The Goal

Given a rotated list (`.nerv-list-angled`, items at -45deg):
- Nested children should indent rightward in **page-space X** (not along the rotation axis)
- All items (parent and children) should be visually parallel (same rotation angle)
- Vertical spacing between items should be consistent in **page-space Y**
- The result should be robust across font sizes, item widths, and child counts

### The Fundamental Constraint

**CSS transforms do not affect layout.** `transform: rotate()` visually repositions an element but the browser's layout engine ignores the rotation when computing flex gaps, margins, and sibling positions. This creates a permanent, unbridgeable disconnect between:
- **Layout space**: where the browser *computes* element positions (pre-rotation boxes)
- **Visual space**: where the user *sees* element positions (post-rotation shapes)

Any feature that requires layout to "know about" visual position is fighting this constraint. There is no CSS expression — no `calc()`, no `max()`, no trig function — that can close this gap, because the visual overlap depends on the **rendered pixel width of text content**, which CSS custom properties cannot capture.

### Approach 1: `translateX(sin(θ))` compensation

**Idea**: After counter-rotating the nested `<ul>`, use `translateX()` with `sin()` to produce a purely horizontal page-space indent.

**Result**: Wrong coordinate system. The `translateX()` applied within the counter-rotated frame, but the margin positioning was still in the parent's rotated frame. Children descended along the rotation axis.

### Approach 2: `--_nerv-list-rotation` internal variable

**Idea**: The base `.nerv-list` rule resets `--nerv-list-angle: 0deg`, killing the counter-rotation. Introduce `--_nerv-list-rotation` (underscore prefix) that inherits without being reset.

**Result**: Correct insight — this fixed the variable inheritance problem. But it was applied to the counter-rotation approach, which had deeper issues.

### Approach 3: Counter-rotate `<ul>` + re-rotate `<li>` (the "page-space layout" approach)

**Idea**: Counter-rotate the nested `<ul>` to restore page-space layout for vertical stacking and horizontal indentation. Then re-apply rotation to individual child `<li>` elements via `--nerv-list-angle`.

**Result**: This achieved correct visual alignment — all items parallel, indentation in page-space X. But it broke vertical spacing because the nested `<ul>`'s layout box (in page-space) didn't account for the visual extent of the rotated child `<li>` elements.

### Approach 4: Trig-decomposed margins

**Idea**: Since the nested `<ul>` is inside a rotated `<li>`, its margins are in the rotated coordinate system. Decompose the desired page-space offset `(indent, gap + item-height)` through `cos(θ)` and `sin(θ)` to produce correct rotated-frame margins.

```scss
margin-left: calc(
  var(--nerv-list-indent) * cos(var(--_nerv-list-rotation))
  + (var(--nerv-list-nested-gap) + var(--nerv-list-item-height)) * sin(var(--_nerv-list-rotation))
);
margin-top: calc(
  -1 * var(--nerv-list-indent) * sin(var(--_nerv-list-rotation))
  + (var(--nerv-list-nested-gap) + var(--nerv-list-item-height)) * cos(var(--_nerv-list-rotation))
);
```

**Result**: The math was correct — margin decomposition accurately maps page-space offsets into rotated coordinates. Inter-child spacing became consistent. But parent→child and last-child→next-sibling spacing remained broken because those transitions cross the layout/visual boundary.

### Approach 5: `transform-origin` override on nesting parents

**Idea**: The nesting parent's layout box is much taller than a regular item (it contains nested content + margins). The default `transform-origin: 0% 50%` puts the pivot at the center of this tall box, misaligning the parent's visual shape with non-nesting siblings. Override to `0% calc(var(--nerv-list-item-height) / 2)` to pin the pivot at the text line.

**Result**: Correct — this fixed the parent shape alignment. But it made the bottom of the tall layout box swing farther from the pivot during rotation, exacerbating the spacing problem.

### Approach 6: `--nerv-list-nested-gap` user-controllable property

**Idea**: Let users tune the vertical gap between nested children in rotated lists via a custom property.

**Result**: Inter-child spacing became tunable and looked good at the default value. But the parent→child and last-child→next-parent transitions were still controlled by different mechanisms (margin decomposition vs. outer flex gap).

### Approach 7: Direction-specific `margin-bottom`

**Idea**: Add `margin-bottom` to the nested `<ul>` to create layout-space clearance between the nesting parent and the next sibling. The amount needed differs between angled-up and angled-down.

**Discovery**: The spacing asymmetry is geometric, not a bug.

#### Geometric Asymmetry Evidence

Bounding-box measurements from browser:

| Direction | Last Child | Next Sibling | AABB Overlap | Visual Overlap? |
|-----------|-----------|-------------|-------------|----------------|
| Angled Up (-45deg) | ARM R: bottom=1903 | UNIT-01: top=1781 | **122px** | **YES** |
| Angled Down (+45deg) | Vector C: bottom=1903 | AT Field: top=1803 | **100px** | **NO** |

**Why the asymmetry**: Indentation is always rightward. For angled-up (-45deg), items tilt upper-right — the bottom-LEFT edge of the last child extends DOWN toward the next sibling's body. For angled-down (+45deg), items tilt lower-right — the bottom-RIGHT edge extends DOWN-RIGHT, AWAY from the next sibling. Same AABB overlap, opposite visual outcome.

**Result**: `margin-bottom: calc(var(--nerv-list-item-height) * 7)` for angled-up eliminated the overlap but created an enormous visual canyon (~200px of empty space). Reducing the multiplier reintroduced overlap. There was no stable middle ground because the correct value depends on rendered text width, which is unknowable in CSS.

### Approach 8: Font size test (the death blow)

The operator tested with a larger font size. The entire layout broke catastrophically — items flew off-page. The trig margins, which compute em-relative offsets, scaled with font size, but the overlap (which depends on pixel width) scaled differently. There was no multiplier that worked across font sizes.

### Why Each Compensation Fails

| Compensation | Why it doesn't work |
|-------------|-------------------|
| Fixed `em` margin | Scales with font size, not with item width |
| Fixed `px` margin | Doesn't scale with anything |
| `%` margin | % of containing block width; roughly correlates with item width but adds too much for narrow containers |
| Trig expression | Correct math but inputs are em-relative while the problem is pixel-relative |
| `max()` / `clamp()` | Can cap values but can't solve the underlying dimension mismatch |

### What Would Make Rotated Nesting Possible

1. **JavaScript positioning**: `nerv.js` measures actual bounding boxes after render and adjusts margins dynamically. Would work correctly but adds JS dependency to a pure-CSS feature and requires re-measurement on resize/font change.

2. **CSS `element()` or layout containment advances**: Future CSS specs might allow layout to account for transformed dimensions. As of 2026, no browser supports this.

3. **Abandon page-space alignment**: Accept that children indent along the rotation axis (the natural CSS behavior without counter-rotation). This is predictable and robust but was rejected by the operator as not matching the desired visual.

4. **Fixed-width items**: If all items had the same pixel width (e.g., via `width: 200px`), the overlap would be deterministic and a fixed margin would work. But this contradicts the design system's content-driven sizing.

### Key Technical Takeaways

- **`transform` is visual-only**: This is the single most important fact about CSS transforms. Any feature design that requires layout awareness of transformed positions is infeasible without JS.

- **Trig CSS (`sin()`, `cos()`) is powerful but fragile**: Works perfectly for static, known dimensions. Fails for responsive, content-driven layouts where the critical dimension (pixel width) isn't captured in a custom property.

- **AABB overlap ≠ shape overlap**: Rotated rectangles create large axis-aligned bounding boxes. Two overlapping AABBs don't necessarily mean the actual shapes touch — horizontal offset and rotation direction determine whether the narrow parallelogram shapes cross paths.

- **Rotation direction × indentation direction creates geometric asymmetry**: For a rightward indent with upper-right tilt, shapes overlap. For rightward indent with lower-right tilt, shapes diverge. This is geometry, not a CSS bug.

## LESSONS LEARNED

- When a feature requires coordination between two CSS subsystems (transforms and layout), evaluate feasibility BEFORE building. A 30-minute creative exploration would have saved 4+ hours of iterative rework.
- The `/refresh` systematic diagnosis pattern (measure first, hypothesize second, fix last) is effective when stuck in a rework loop. It correctly identified the geometric asymmetry in one pass.
- "Imperfect predictably" is a legitimate acceptance criterion. A feature that works at one font size and breaks at another is worse than no feature — abandon earlier.
- CSS `sin()`/`cos()` passthrough from Dart Sass works correctly (unqualified `sin()` with `var()` args passes through to CSS output). This is reusable knowledge for other trig-based CSS features.

## PROCESS IMPROVEMENTS

- **Add a "feasibility gate" to preflight for transform-dependent features.** If a feature's visual correctness depends on layout knowing about transformed positions, flag it as HIGH RISK before build starts. Require a creative phase to evaluate alternatives.
- **Limit rework iterations.** After 3 failed attempts at the same problem, escalate to a `/refresh` or creative phase instead of continuing to iterate narrowly.
- **Include font-size variation in visual verification.** The default font size masked the fragility for 6+ iterations. A quick test at 2× font size would have exposed the problem immediately.

## TECHNICAL IMPROVEMENTS

- The `:has()` + `::before` shape delegation pattern for nesting is solid and reusable (confirmed across all non-rotated shape × fill combinations). This pattern should be used for future components that need parent-aware styling (e.g., M8 dropdown).
- `--nerv-list-clip` as both internal abstraction and public API for custom shapes is validated.

## NEXT STEPS

- Non-rotated nesting (indented + contained) is production-ready. No further work needed.
- If rotated nesting is revisited in the future, start with the "What Would Make Rotated Nesting Possible" section above. The most viable path is JS positioning via `nerv.js`.
- The `sin()`/`cos()` CSS technique is valid for other uses — consider it for any future feature that needs angle-aware styling with known, fixed dimensions (e.g., radial layouts with predetermined sizes).
