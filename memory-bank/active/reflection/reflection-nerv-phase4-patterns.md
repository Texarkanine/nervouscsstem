---
task_id: nerv-phase4-patterns
date: 2026-03-17
complexity_level: 3
---

# Reflection: Phase 4 — Patterns & Geometry + Initial JS

## Summary

Delivered three decorative SCSS modules (`_stripe-bar.scss`, `_hex-grid.scss`, `_radar.scss`), the `nerv.js` orchestration module, and the `ref-patterns.html` reference page. The core deliverables shipped as planned, but the build phase expanded significantly through iterative visual refinement driven by CRT aesthetic constraints that weren't captured in the original requirements.

## Requirements vs Outcome

Every original requirement was satisfied. Substantial additions emerged during build through operator feedback:

- **Stripe bar**: barberpole animation technique, customizable size/speed (`--nerv-stripe-width`), transparent variant, auto-generated color variants from token map, hard-stop gradients for CRT compliance
- **Hex grid**: honeycomb tiling, phosphor borders with contained inset glow, `.nerv-hex-grid-spaced` spacing modifier, `.nerv-hex-grid-filled` fill modifier (decoupled from spacing), text content support inside hex cells
- **Radar**: sweep direction correction, `--nerv-primary-rgb` and `--nerv-bg-rgb` ambiance tokens added for visibility
- **nerv.js**: rewritten from ES module to IIFE UMD-lite for browser compatibility, `getComputedStyle` fix for grid label positioning
- **Reference page**: DANGER/EMERGENCY alert bars, grid overlap fix, vertical stripe animation, extensive layout restructuring

None of the original requirements were dropped or descoped.

## Plan Accuracy

The 13-step implementation plan was correct in sequence, file list, and dependency ordering. Build pipeline changes, test infrastructure, and module structure all held up. The plan's estimated scope was accurate for the *functional* deliverables but significantly underestimated the *aesthetic* iteration required.

Surprises came not from technical challenges (the plan's "Challenges & Mitigations" section was accurate) but from implicit visual quality requirements:

- CRT aesthetic constraints (no smooth gradients, no opacity blending through layers, solid black backings) were not explicit in the Phase 4 spec
- The barberpole technique replaced the planned `repeating-linear-gradient` approach entirely
- Hex grid required two major architectural reworks: first from `drop-shadow` to `inset box-shadow` (clip-path interaction), then restructuring pseudo-element z-ordering for text content support

## Creative Phase Review

No formal creative phases were executed. In hindsight, a creative phase exploring CRT aesthetic constraints would have been valuable — the visual rules (hard stops, no opacity blending, contained glows) were discovered incrementally during build and caused multiple rework cycles that could have been front-loaded.

## Build & QA Observations

**What went well:**
- TDD approach caught regressions reliably across 90 tests
- Token-driven architecture scaled cleanly (adding `--nerv-stripe-width`, `--nerv-primary-rgb` slotted in naturally)
- Auto-generation from `$nerv-colors` map proved its value — stripe color variants followed the glow class pattern exactly
- Decoupling spacing from fill as independent modifiers was a clean API decision that emerged from iteration

**What was hard:**
- `clip-path` and glow interaction: `filter: drop-shadow()` is clipped by `clip-path` on the same element, requiring a pivot to `inset box-shadow` on inner pseudo-elements
- Text content in hex cells: pseudo-elements (`::before`, `::after`) with `position: absolute` paint above non-positioned text nodes. Required `isolation: isolate` + negative z-index pattern
- JS module format: ES module `export` syntax fails in classic `<script>` tags, and `<script type="module">` caused MIME type issues on local file serving. IIFE UMD-lite was the pragmatic solution

**QA caught:**
2 trivial issues (doc comment, script tag type) — build was substantively clean. The real quality gate was the iterative operator feedback loop.

## Cross-Phase Analysis

The plan → build gap was primarily caused by implicit aesthetic requirements not captured during planning. The Phase 4 spec defined *functional* requirements precisely (class names, token consumption, JS API) but *visual quality* expectations (CRT compliance, phosphor brightness, glow containment) only surfaced during browser testing with the operator.

Preflight caught important functional gaps (missing token additions, reduced-motion for JS animations) but couldn't have caught aesthetic gaps since those constraints lived in the operator's mental model, not in any written spec.

The most expensive rework cycle was hex grid glow containment: plan said `drop-shadow` → build discovered clip-path clips it → pivot to `inset box-shadow` → then later pivot pseudo-element stacking for text support. This chain could have been shortened by a creative phase exploring "how do glows work with clipped shapes?"

## Insights

### Technical

- `clip-path` clips `filter: drop-shadow()` — for contained glows within clipped shapes, use `box-shadow: inset` on an inner element instead
- `isolation: isolate` + negative z-index on pseudo-elements is the clean CSS pattern for letting raw text nodes sit above absolutely-positioned pseudo-element layers without requiring wrapper spans
- `element.style.position` reads inline styles only — always use `getComputedStyle()` when checking positioning set via CSS classes
- Component modifiers should be orthogonal: spacing (`.nerv-hex-grid-spaced`) and visual intensity (`.nerv-hex-grid-filled`) as independent, composable classes scales better than coupling them

### Process

- For decorative/visual components, a creative phase exploring aesthetic constraints (CRT rules, phosphor expectations, opacity/blending rules) would front-load decisions that otherwise cause significant rework during build. Functional specs alone are insufficient for visual components.
- Auto-generation from a central token map (`@each` over `$nerv-colors`) should be the default pattern for any color-variant class — it was retrofitted here but should be planned from the start.
