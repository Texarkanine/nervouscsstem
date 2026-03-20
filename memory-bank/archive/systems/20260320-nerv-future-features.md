---
task_id: nerv-future-features
complexity_level: 4
date: 2026-03-20
status: completed
---

# TASK ARCHIVE: NERV future features (L4 capstone)

## SUMMARY

Completed eight independent milestones on top of the existing NERV design system: barberpole visibility fix, glitch animation refinement, bar-meter gradient presets, reticle tickmarks, composable list styling (shapes, fills, rotation), form control styling, table geometry with special row types (plus hex-grid deferral), and radar sweep–synced blips with optional JS phase sync. Work stayed within cross-milestone invariants (`.nerv-` prefix, reduced motion/contrast, token architecture, SCSS partial conventions, ref + test discipline). This capstone archive inlines sub-run reflections and clears L4 ephemeral state.

## REQUIREMENTS

- **L4 scope:** Eight milestones (`nerv-future-features`), each L1–L3 scoped, independently deliverable, any execution order.
- **Invariants:** From `milestones.md` — `.nerv-` selectors only; `prefers-reduced-motion` / `prefers-contrast`; no raster images, canvas, WebGL, or framework deps; tokens and `@forward` order preserved; ref strategy; Stylelint + Node tests green after each milestone.
- **Milestone intents (one line each):** M1 barberpole opacity + glow; M2 sharper glitch; M3 bar gradient presets; M4 reticle ticks; M5 list pillboxes; M6 form elements; M7 tables + hex tiling decisions; M8 radar pulse + external sync.

## IMPLEMENTATION

- **M1:** `_stripe-bar.scss` — opaque bands, configurable glow border (no dedicated reflection file in `memory-bank/active/reflection/`).
- **M2:** `_glitch.scss` — larger translate/skew steps, fewer keyframe stops for discontinuous feel.
- **M3:** `_bar-meter.scss` — preset classes setting `--nerv-bar-from` / `--nerv-bar-to`; ref updates.
- **M4:** `_reticle.scss` — edge tick utilities, generated color variants, CSS gradients (not SVG) for cascade-friendly `var()` color.
- **M5:** `_list.scss` — shape × fill × rotation modifiers; `skewX` + `::before` parallelogram pattern; border/background source-order and cross-axis resets.
- **M6:** `_form.scss` — input, textarea, select, checkbox, radio, button; mixin-based shared styles; compound pseudo-state `box-shadow` merging; number spinner hiding where needed.
- **M7:** `_table.scss` — phosphor tables, fill modes, triangle + parallelogram rows, ruled dividers, color overrides; hex/trapezoid table rows removed after visual/browser limits; tiled hex deferred to `_hex-grid.scss`.
- **M8:** `_radar.scss` — `.nerv-radar-blip` pulse keyed to sweep period; `nerv.js` — opt-in `data-nerv-radar-sync`, WAAPI phase, layout helpers; `docs/radar.md`; ref + `patterns.test.mjs`.

## TESTING

Per milestone: TDD-style updates to existing test files (primarily `test/patterns.test.mjs` and related), `npm run build`, Stylelint, full `node --test` suite. L3 M7 used broader visual iteration; automated tests covered CSS contracts, not sub-pixel rendering. QA semantic reviews recorded in sub-runs (PASS where documented).

## LESSONS LEARNED

- **Magnitude × sparsity** (M2): Stepped timing plus large deltas between few keyframes reads “broken”; many small steps reads smooth even with `steps()`.
- **Presets via custom properties** (M3): Cascade gives override semantics without `!important`; keep sensible defaults so DX stays good without forcing a preset on every meter.
- **Gradients vs SVG data URIs** (M4): Repeating CSS gradients with `var()` follow alert cascade; SVG data URIs often need per-state wiring.
- **Lists** (M5): `drop-shadow` is not a border; `skewX` on `::before` for parallelograms; source order and explicit resets where orthogonal modifiers touch the same property.
- **Forms** (M6): Same property from two selectors does not merge — compound states need compound rules; prefer `@mixin` over `@extend` when tests assert per-class blocks; fragile `indexOf`/`lastIndexOf` CSS tests should use structural patterns.
- **Tables** (M7): `clip-path` on adjacent cells can show unfixable sub-pixel gaps; `skewX` on `::before` is reliable; visual checks at multiple zoom levels; batch operator feedback before rework passes.
- **Radar** (M8): One animation loop + `animation-delay` for aligned cold start; polar vs Cartesian matters for phase; short narrative doc (`docs/radar.md`) helps non-obvious timing.

## PROCESS IMPROVEMENTS

- For visual geometry in tables/layouts, add an explicit zoom-level checkpoint after the first `clip-path` shape.
- Enumerate compound pseudo-states (`:checked:focus`, etc.) in plans when shadows/filters/backgrounds overlap.
- Collect visual feedback and batch rework when possible to reduce full-suite churn.

## TECHNICAL IMPROVEMENTS

- Optional: shared focus/hover mixins in `_glow.scss` to DRY label-box and form patterns (M6 reflection).
- Optional: first-class radar markup (bearing/range) for apps that want zero-JS layout + phase from one pass (M8 reflection).

## NEXT STEPS

None for this L4 program. Memory bank active area cleared for the next task; run `/niko` to start something new.

---

## Milestone list

All eight milestones in `milestones.md` were checked off during execution. None were added, removed, or reordered in the tracked file. Execution order in practice followed the suggested sequence (M1→M8 in the diagram); milestones remained independent.

- [x] M1: Barberpole stripe opacity + configurable glow border (`_stripe-bar.scss`)
- [x] M2: Glitch refinement (`_glitch.scss`)
- [x] M3: Bar meter gradient presets (`_bar-meter.scss`)
- [x] M4: Reticle tickmarks (new `_reticle.scss`)
- [x] M5: List styling (new `_list.scss`)
- [x] M6: Web form styling (new `_form.scss`)
- [x] M7: Tables + special row types + hex tiling decision (`_table.scss`, hex grid path)
- [x] M8: Radar pulse + sync (`_radar.scss`, `nerv.js`, `docs/radar.md`)

## Sub-run summaries

**M1 — Barberpole fix:** Delivered per milestone line (opaque bands, glow border). No reflection markdown was kept under `memory-bank/active/reflection/` for this sub-run.

**M2 — Glitch:** Increased translate/skew magnitudes, reduced intermediate keyframe density, adjusted step counts; coprime stepping preserved. Plan accurate; TDD calibrated assertions to old values first. Insight: discontinuity comes from stepped timing + sparse high-impact stops + large deltas, not `steps()` alone.

**M3 — Gradient presets:** Four preset classes (thermal, energy, warning, field); vertical bar kept custom inline gradient where presets don’t apply. Insight: custom-property presets scale cleanly via cascade.

**M4 — Reticle:** Six utilities, nine color variants, contrast behavior, tests + ref. Insight: `repeating-linear-gradient` + `var()` beats SVG data URIs when alert colors must flow through cascade without `_states.scss` per-shape overrides.

**M5 — Lists:** Grew from simple 45° pillbox to five shapes, four fill modes, rotation, skew config, many tests after user-driven visual iteration. Major pivot: abandoned `drop-shadow` as “border”; landed on real borders, `skewX` on `::before` for parallelogram, source-order (fills before shapes), explicit resets at shape×fill intersections (including double-border on bordered para).

**M6 — Forms:** Six component classes; `@mixin` instead of `@extend` for testable blocks; consolidated contrast groups; post-QA fixes for number spinners and `:checked:focus` `box-shadow` merge. Recurring theme: replacement semantics for `box-shadow` / `filter` / `background` across compound states.

**M7 — Tables:** Base + fill + colors + triangle + parallelogram; cut hexagon and trapezoid row types after sub-pixel gaps and zoom instability; added ruled dividers, overrides, uniform mode; creative deferral of tiled hex to `_hex-grid.scss` validated. Heavy rework driven by visual review; `/refresh`-style diagnosis broke incremental clip-path tweaking loops.

**M8 — Radar pulse:** `.nerv-radar-blip` with sweep-matched period and `--nerv-radar-blip-phase`; opt-in `data-nerv-radar-sync` and WAAPI; polar placement and JS layout helpers for correct bearing-time vs Cartesian `%`; `docs/radar.md` for timing story.

## System state

The NERV package now includes: improved stripe bar and glitch; bar-meter presets; reticle utilities; rich list modifiers; styled form primitives; table system with reliable geometric rows and documented limits on `clip-path` in tables; radar blip pulse and optional phase publishing/layout helpers documented in ref and `docs/radar.md`. `nerv.scss` forwards new partials in the agreed order; tests and ref pages were extended milestone by milestone.

## Cross-run insights

- **Replacement, not accumulation:** Shadows, filters, and backgrounds collide across pseudo-states and modifier axes — plan compound selectors and defensive resets explicitly (M5, M6, M7).
- **Geometry strategy:** `skewX` on `::before` repeatedly outperformed `clip-path` when borders, fills, and seamless rows mattered (M5, M7); `clip-path` in dense table layouts triggered browser sub-pixel gaps (M7).
- **Visual vs automated proof:** Passing CSS/string tests did not guarantee acceptable pixels; operator ref review drove the largest corrections (M5, M7).
- **Documentation payoff:** Non-obvious motion and sync (M8) and table geometry limits (M7) benefit from short standalone docs, not only comments.
- **Preset and token patterns:** Design system features that rely on override-friendly APIs (presets, reticle colors, tokens) stayed maintainable without deep coupling between components (M3, M4, M6 “shared mixin” idea as optional refinement).
