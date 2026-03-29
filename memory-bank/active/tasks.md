# Task: M5 — List Nesting Overhaul (Rework)

* Task ID: nerv-phase7-m5-rework
* Complexity: Level 3
* Type: bugfix

Two visual bugs identified after the initial M5 build, QA, and reflect cycle. The nesting architecture (`:has()` + `::before` shape delegation) is sound; these are spacing/positioning corrections within that architecture.

## Pinned Info

### Bug Analysis

#### Bug 1: Indented-mode parent→child spacing

The visible gap between the parent `::before` shape bottom and the first child item top is ~2px, while the inter-child gap is ~5px (`var(--nerv-list-gap)`). Cause: `margin-top: var(--nerv-list-gap)` is measured from the text node bottom, but the `::before` shape extends `0.3em` (= the li's `padding-bottom`) below the text bottom. The visible gap is therefore `margin-top − 0.3em ≈ 0.11rem ≈ 2px`.

```
::before shape │ height = var(--nerv-list-item-height) = 1.8em
               │         = padding-top(0.3em) + line(1.2em) + padding-bottom(0.3em)
               ├─ text-node bottom ≈ 1.5em  (padding-top + line-height)
               │     ↕ margin-top = var(--nerv-list-gap) = 0.35rem
               │  [first child]         visible gap = 0.35rem − 0.3em ≈ 2px  ← TOO SMALL
               ╰─ shape bottom = 1.8em
```

Fix: `margin-top: calc(var(--nerv-list-gap) + 0.3em)`. The `+ 0.3em` compensates for the `::before` overshoot, making the visible gap equal to `var(--nerv-list-gap)`.

Contained mode must NOT get this increase (user confirmed it looks correct). Re-add `margin-top: var(--nerv-list-gap)` to the `.nerv-list-contained` rule.

#### Bug 2: Rotated-nesting horizontal alignment

In angled/angled-reverse lists, the nested list's `margin-left: var(--nerv-list-indent)` is in the rotated layout frame. After parent rotation and child counter-rotation, this indent follows the rotation angle instead of being purely horizontal. The children's left-edge vertical line should align with the same vertical axis as the parents' left edges, offset by `indent`.

Fix: Replace layout-space `margin-left` with a CSS `translateX()` in the counter-rotation transform. After counter-rotation, the local coordinate system is aligned with page space, so `translateX` produces a purely horizontal offset. Additionally, compensate for the horizontal displacement caused by the vertical layout offset (the nested list starting below the text in rotated space maps to a horizontal shift in page space) using `sin(var(--nerv-list-angle))`.

Formula:
```css
translateX(calc(
  var(--nerv-list-indent)
  + (var(--nerv-list-item-height) + var(--nerv-list-gap)) * sin(var(--nerv-list-angle))
))
```

Where `(item-height + gap)` ≈ actual y-offset of the nested list within the rotated li.

For θ = −45deg: `translateX ≈ indent − 1.58em ≈ −0.08em` (pulls left to compensate for rightward displacement from rotation).
For θ = +45deg: `translateX ≈ indent + 1.58em ≈ 3.08em` (pushes right to compensate for leftward displacement from rotation).

Contained mode in rotated parents is excluded from this fix (no current demos; contained indent should follow the shape's angle).

## Component Analysis

### Affected Components
- `src/_list.scss` — Section 5 (nesting rules): margin-top change, contained override, new `:not(.nerv-list-contained)` rotated rule
- `test/components.test.mjs` — Modify existing tests (B34, B40, B41), add new tests for spacing fix and rotated translateX
- `ref/ref-lists.html` — No structural changes needed; existing demos sufficient for visual verification

### Cross-Module Dependencies
- None. All changes are within `_list.scss`.

### Boundary Changes
- No new classes or custom properties. The `--nerv-list-indent`, `--nerv-list-item-height`, and `--nerv-list-gap` custom properties gain new usage contexts but their public API is unchanged.

## Open Questions

None — both bugs have clear root causes and mechanical fixes.

## Test Plan (TDD)

### Behaviors to Verify

**Bug 1 (spacing):**
- B34-mod: Base nested list rule (`.nerv-list > li > .nerv-list`) still has `margin-left` for indent
- B44: Base nested list rule has `margin-top` containing `calc` (the spacing fix)
- B45: Contained rule (`.nerv-list > li > .nerv-list-contained`) has explicit `margin-top` referencing `--nerv-list-gap` without `calc` (preserves contained spacing)

**Bug 2 (rotated alignment):**
- B40-mod: Rotated nested list still has counter-rotation `rotate()` in transform
- B41-mod: Angled-reverse nested list still has counter-rotation `rotate()` in transform
- B46: Non-contained rotated nested list rule has `translateX` in its transform
- B47: Non-contained rotated nested list rule has `margin-left: 0` (override of base indent)
- B48: Non-contained rotated nested list uses `sin()` in its translateX expression

**Regression:**
- All existing B1–B43 tests must continue to pass

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/components.test.mjs`
- Conventions: `B##:` prefix for behavior IDs, regex or indexOf matching against compiled CSS string
- New test files: none

## Implementation Plan

### Step 1: Fix indented-mode spacing (Bug 1)

- **Files:** `src/_list.scss` (line 268), `test/components.test.mjs`
- **Changes:**
  - Change `.nerv-list > li > .nerv-list` margin-top from `var(--nerv-list-gap)` to `calc(var(--nerv-list-gap) + 0.3em)`
  - Add `margin-top: var(--nerv-list-gap)` to `.nerv-list > li > .nerv-list-contained` rule to preserve contained behavior
- **Tests:** Add B44 (base rule uses calc in margin-top), B45 (contained rule overrides margin-top), verify B34 still passes

### Step 2: Fix rotated-nesting horizontal alignment (Bug 2)

- **Files:** `src/_list.scss` (after line 237), `test/components.test.mjs`
- **Changes:**
  - Add new rule: `.nerv-list-angled > li > .nerv-list:not(.nerv-list-contained), .nerv-list-angled-reverse > li > .nerv-list:not(.nerv-list-contained)` with:
    - `transform: rotate(calc(-1 * var(--nerv-list-angle))) translateX(calc(var(--nerv-list-indent) + (var(--nerv-list-item-height) + var(--nerv-list-gap)) * sin(var(--nerv-list-angle))))`
    - `margin-left: 0`
  - Existing counter-rotation rule for all rotated nested lists stays unchanged (provides `transform-origin` and base counter-rotation for contained case)
- **Tests:** Add B46 (translateX in transform), B47 (margin-left: 0), B48 (sin() in expression), verify B40/B41 still pass

### Step 3: Browser verification + full test suite

- Rebuild CSS (`npm run build`)
- Visual verification in browser for all 3 nesting rows (indented, contained, rotated)
- Run full test suite (`npm test`)
- Run linter

## Technology Validation

CSS `sin()` function (CSS Values and Units Level 4) — verified:
- Dart Sass passes `sin(var(--angle))` through to CSS output unmodified ✓
- Browser support: Chrome 111+, Firefox 108+, Safari 15.4+ (universally supported in 2026) ✓
- Full expression compiles through Sass without errors ✓

## Challenges & Mitigations

- **`0.3em` coupling with padding**: The `+ 0.3em` in the spacing fix is coupled to the `li` padding-bottom value. If padding changes, this must be updated. Mitigated by adding a code comment documenting the dependency.
- **Trigonometric approximation accuracy**: The `(item-height + gap)` estimate of y-offset assumes `line-height ≈ 1.2`. If font or line-height changes, the alignment may drift by 1-2px. Acceptable since it's a massive improvement over the current ~20px misalignment.
- **Sass `sin()` ambiguity**: Sass has `math.sin()` which evaluates at compile time. Unqualified `sin()` with `var()` args correctly passes through to CSS. Verified ✓.

## Status

- [x] Component analysis complete
- [x] Open questions resolved (none — both bugs have clear fixes)
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete (CSS sin() verified)
- [x] Preflight — PASS. Convention-compliant, no conflicts, CSS sin() validated.
- [x] Build — PASS. 2/2 steps, 5 new tests (B44–B48), 357/357 pass. No deviations.
- [x] QA — PASS. Clean: no KISS/DRY/YAGNI/completeness/regression/integrity/documentation issues.
- [x] Build (rework-2) — operator found two remaining issues: (1) last-child→next-parent spacing too large, (2) rotated nesting unchanged because `--nerv-list-angle` resets to 0deg on nested `.nerv-list`. Fixed with `margin-bottom: -0.3em` and new `--_nerv-list-rotation` internal property. 6 new/modified tests (B40, B41, B48 updated; B49 added), 358/358 pass. Browser-verified.
- [x] Build (rework-3: refresh diagnosis) — persistent ARM R → UNIT-01 overlap in angled-up lists. Root cause: geometric asymmetry between angled-up and angled-down. For angled-up (-45deg), items tilt upper-right and bottom-left edges extend toward the next sibling; for angled-down (+45deg), bottom-right edges extend AWAY. Fix: split margin-bottom into direction-specific overrides — `calc(var(--nerv-list-item-height) * 7)` for angled-up, `0` for angled-down. Test B48 added. 357/357 pass. Browser-verified: 39px clear gap where 122px overlap existed.
