---
task_id: nerv-phase7-expansion
complexity_level: 4
date: 2026-09-12
status: completed (partial — M6–M8 and doc cleanup deferred to GitHub issues)
---

# TASK ARCHIVE: NERV Phase 7 Feature Expansion (L4 capstone)

## SUMMARY

Executed five of eight milestones on the NERV design system: boot-screen typography and grid-mark variants, true honeycomb hex tiling, reusable gradient utilities, scrolling data backgrounds, and list nesting (indented and contained). Rotated nesting was attempted and abandoned — CSS transforms do not affect layout, so page-space alignment of nested children inside rotated lists is not feasible in pure CSS. The remaining three milestones plus a docs cleanup item were split out of this L4 on 2026-09-12 as GitHub issues #1–#4. Work stayed inside the cross-milestone invariants (`.nerv-` prefix, reduced motion/contrast, no raster/canvas/WebGL, SCSS partial conventions, ref + test discipline).

## REQUIREMENTS

- **L4 scope:** Eight milestones from `planning/FUTURE.md` plus operator additions (grid `×` / hex-mark backgrounds, neural channel monitor, data background, DOS/BIOS font, list nesting, topo map) and a documentation cleanup of `docs/atomic-elements.md` / `docs/design-language.md`.
- **Invariants:** `.nerv-` selectors only; alert-cascade features consume ambiance tokens; `prefers-reduced-motion` / `prefers-contrast`; no image files, canvas, or WebGL; `_`-prefixed partials `@forward`ed in dependency order; `NERV.*` JS namespace; ref page per visible feature; no regression on existing refs; `npm run build` green at every boundary.
- **Milestone intents:** M1 font + grid marks; M2 tiled hex grid; M3 rainbow/gradient utilities; M4 data background; M5 list nesting including angled variants; M6 psychographic + neural channel monitor; M7 seedable topo map; M8 custom dropdown.

## IMPLEMENTATION

- **M1:** `_typography.scss` — VT323 via `.nerv-type-boot` with `white-space: pre-wrap`. `_grid-marks.scss` — `.nerv-grid-marks-x` discrete rotated crosses and `.nerv-grid-marks-hex` equilateral flat-top honeycomb, plus color variants.
- **M2:** `_hex-grid.scss` — `.nerv-hex-grid-tiled` tessellation (gap = W/2, offset = 3W/4, overlap = H/2) and `.nerv-hex-grid-solid` opaque fill. `nerv.js` hex flicker changed from auto-on to `data-nerv-hex-flicker` opt-in.
- **M3:** `_gradient.scss` — cascade-responsive defaults from ambiance tokens, five presets, auto-generated from/to modifiers. `background-origin: border-box` to kill the 1px dark edge at borders.
- **M4:** `_data-bg.scss` — `.nerv-data-bg` with binary and DNA modes, seamless scroll, speed from `--nerv-animation-speed`. Opacity default lives on the container so consumers can override it. Inner layer is `top/left/width` rather than `inset: 0` so duplicated text can extend past the crop.
- **M5:** `_list.scss` — `--nerv-list-clip` holds the full `polygon()`; `:has(> .nerv-list)` + `::before` shape delegation; indented default and `.nerv-list-contained`; fill overrides; contrast media query. Spacing fix: `margin-top: calc(var(--nerv-list-gap) + 0.3em)` and `margin-bottom: -0.3em` on indented nests (contained excluded). All rotation × nesting rules were later removed.
- **M6–M8:** Not built. Deferred to issues #1–#3.
- **Docs cleanup:** Not done. Deferred to issue #4.

## TESTING

Per completed milestone: TDD updates to `test/components.test.mjs` / `test/patterns.test.mjs`, `npm run build`, Stylelint, full `node --test` suite. Visual verification on ref pages caught geometry, whitespace, and animation bugs that CSS string tests could not. M5 rework ended at 353/353 after rotation-nesting tests were deleted. Final abandonment QA was skipped at operator direction; earlier QA passes were on intermediate states that were later torn out.

## LESSONS LEARNED

- **`pre-wrap` renders HTML source indentation.** Boot-screen content must sit flush-left in the tag. CSS cannot tell template indent from intentional spaces.
- **Hex tessellation is one constant.** Same-row flat-top hexes do not share edges; adjacent rows fill the W/2 gap. Gap, offset, and overlap all derive from cell width.
- **Ambiance vs data tokens is free cascade.** Defaulting gradients to `--nerv-primary-rgb` / `--nerv-bg-rgb` makes alert-state integration automatic; named data tokens stay put.
- **`background` shorthand resets `background-origin` to `padding-box`.** Gradients on bordered boxes need `background-origin: border-box` or a 1px page-background seam appears.
- **Define custom properties where consumers set them.** A child-level default shadows ancestor overrides. Pattern now shared by `_gradient.scss` and `_data-bg.scss`.
- **`inset: 0` pins height.** Seamless marquee scroll needs the inner element's height to come from content; use `top/left/width` and let the parent `overflow: hidden` crop.
- **CSS transforms do not affect layout.** This is load-bearing. Any feature that needs layout to know about post-rotation visual position (spacing, overflow, hit targets) is fighting the engine. Rotated list nesting was abandoned after 8+ iterations of `sin()`/`cos()` compensation, counter-rotation, and magic `margin-bottom` multipliers — all of which worked at one font size and broke at another.
- **`:has()` + `::before` shape delegation is the reusable nesting pattern.** It is proven for non-rotated lists and is the intended base for a future dropdown.

## PROCESS IMPROVEMENTS

- When a feature coordinates transforms and layout, run a feasibility gate in preflight and a creative phase before build. A short "can layout see the visual extent?" check would have saved the M5 rework loop.
- After three failed attacks on the same visual geometry problem, stop and `/refresh` (measure bounding boxes, then hypothesize). Do not keep tightening the previous hack.
- Visual-only bugs (SVG geometry, seamless scroll, `pre-wrap` indent, font-size fragility) will not fail CSS string tests. Ref-page review at more than one font size and zoom is part of done, not a bonus.
- A ref page that needs one-off CSS is a missing library class (M2 solid fill, M1 boot colorization).

## TECHNICAL IMPROVEMENTS

- Document "custom property defined on container, consumed by child" as a convention so new modules do not repeat the M4 opacity-cascade bug.
- `--nerv-list-clip` as both internal abstraction and public custom-shape API is validated; keep it.
- If rotated nesting is ever revived, do not resume the CSS-only path. The archive at `memory-bank/archive/enhancements/20260329-nerv-phase7-m5-rework.md` records why. The viable path is JS positioning via `nerv.js`.
- `sin()`/`cos()` CSS passthrough from Dart Sass (unqualified `sin(var(--angle))`) is real and useful for known, fixed dimensions — not for content-driven widths.

## NEXT STEPS

Remaining Phase 7 work lives in GitHub issues, not this L4:

- #1 — Psychographic display and neural channel monitor (was M6)
- #2 — Seedable green wireframe topographic map background (was M7)
- #3 — Custom dropdown with JS interaction layer (was M8; build on shipped non-rotated `.nerv-list`)
- #4 — Cleanup `docs/atomic-elements.md` and `docs/design-language.md`

## Milestone list

Original eight-milestone list. None added or reordered. M6–M8 were not built; they were checked off as deferred when this L4 was aborted after M5. Doc cleanup was in the brief and never a milestone.

- [x] M1: Add DOS/BIOS monospace boot-screen font to `_typography.scss`; add `×` rotated-cross grid marks variant and hex-grid background pattern to `_grid-marks.scss` (est. L2)
- [x] M2: Implement `.nerv-hex-grid-tiled` true honeycomb tessellation in `_hex-grid.scss` with no gaps/overlaps, verified to support the lockout hex-wall use case (est. L2)
- [x] M3: Assess rainbow gradient current state and implement reusable gradient mixin/utility classes (`.nerv-rainbow-bg` etc.) with configurable hue range, direction, and opacity (est. L2)
- [x] M4: Create data background module (`.nerv-data-bg`) with binary and DNA fill modes, seamless scroll animation, and criticality-driven speed escalation (est. L2)
- [x] M5: Overhaul list nesting in `_list.scss` — indented and contained modes shipped; angled/rotated nesting abandoned (est. L3)
- [x] M6: Psychographic + NCM — deferred to https://github.com/Texarkanine/nervouscsstem/issues/1
- [x] M7: Topo map — deferred to https://github.com/Texarkanine/nervouscsstem/issues/2
- [x] M8: Custom dropdown — deferred to https://github.com/Texarkanine/nervouscsstem/issues/3

M8 was drawn green in the original mermaid while still unchecked. That was a diagram error; the dropdown was never implemented.

## Sub-run summaries

**M1 — Foundation (L2):** VT323 boot font and two grid-mark variants shipped. Plan matched the first build; operator review then forced SVG geometry rewrites (discrete `×`, correct hex honeycomb), `pre-wrap` on `.nerv-type-boot`, flush-left HTML so indent did not become leading spaces, and ref-page layout/color fixes. Automated tests did not catch the geometry or whitespace issues.

**M2 — Tiled hex grid (L2):** `.nerv-hex-grid-tiled` and lockout-wall demo shipped on plan. Post-reflect additions: `.nerv-hex-grid-solid` (library class, not ref-page CSS) and flicker opt-in via `data-nerv-hex-flicker`. Tessellation math was the hard part and was finished in planning; build was mechanical. Stylelint `number-max-precision` forced `0.866` instead of a longer √3.

**M3 — Rainbow gradients (L2):** `_gradient.scss` with ambiance defaults, presets, and from/to modifiers. Operator narrowed "rainbow" to "easy background gradients between NERV tokens" (the mental-contamination bar is the reference). First-try green on 10 tests. Post-reflect: `background-origin: border-box` for the border-edge seam. Bar meters stay on `color-mix()` per segment; they should not share the gradient property names.

**M4 — Data background (L2):** Binary/DNA scroll with criticality speed. Preflight killed planned BEM names. QA fixed opacity defined on the child (blocked container overrides). Visual review after reflect found the scroll was not seamless: `inset: 0` pinned the inner height and clipped the duplicate text. Tests had only asserted that animation properties existed.

**M5 — List nesting (L3) and rework:** `--nerv-list-clip` + `:has()` + `::before` delegation shipped indented and contained nesting across shape × fill. First-pass also included rotation counter-rotation. Two visual bugs then appeared: parent→child gap (~2px vs ~5px) and rotated children indenting along the rotation axis. Spacing was fixed in one iteration. Rotated alignment burned 8+ iterations (`translateX(sin(θ))`, `--_nerv-list-rotation`, counter-rotate + re-rotate, trig margins, direction-specific `margin-bottom` multipliers) and was abandoned. All rotation × nesting CSS and tests came out. Rotated lists are documented as not supporting nesting. A creative phase for Bug 2 should have existed; the missing "transforms vs layout" feasibility check was the expensive omission.

## System state

The design system now has boot typography, × and hex registration marks, a true tiled hex grid (plus solid fill and opt-in flicker), a composable gradient module wired to the alert cascade, a scrolling data-background fill, and working non-rotated list nesting (indented and contained) built on `--nerv-list-clip`. Psychographic/NCM, topo-map fill, custom dropdown, and the two taxonomy docs were not changed by this L4. Existing ref pages from earlier phases remain; new or updated refs exist for the shipped modules. Rotated lists still rotate; they just must not nest.

## Cross-run insights

- **Visual geometry is the recurring tax.** M1 SVG marks, M2 hex math, M3 border-origin, M4 marquee height, M5 transform/layout. CSS contract tests are necessary and not sufficient. Font-size and zoom variation should be in the visual checklist from M1 onward; M5 learned that late.
- **Operator clarification during plan beats a broad name.** "Rainbow gradients" became token-to-token backgrounds once the mental-contamination bar was named as the target.
- **Ref-page one-off CSS is a missing public class.** That signal showed up in M1 and M2 and should be treated as a requirement, not polish.
- **L4 abort is cheaper than a forced M6 start.** After M5's abandoned rotation work, continuing the same L4 would have carried a tired list module into a dropdown that depends on it. Splitting the rest to issues resets scope without losing the requirements.
