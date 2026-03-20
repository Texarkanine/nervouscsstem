---
task_id: nerv-m8-radar-pulse
date: 2025-03-20
complexity_level: 2
---

# Reflection: M8 — Radar pulse (sweep-synced blips)

## Summary

Delivered sweep-matched blip pulse/fade in `src/_radar.scss`, optional WAAPI phase sync and Cartesian auto-phase in `src/nerv.js`, ref demo, and `patterns.test.mjs` contracts—plus follow-on polish (polar placement, label layout, `docs/radar.md`). The milestone’s acceptance criteria are met; iteration after the first green build refined motion semantics rather than changing scope.

## Requirements vs Outcome

All brief items satisfied: extended `_radar.scss` only, `.nerv-` prefixes, reduced-motion and contrast paths, CSS-first with small opt-in JS API, ref patterns section, tests green. The original plan named `--nerv-radar-pulse-delay`; the shipped convention is **`--nerv-radar-blip-phase`** (same idea: delay from bearing). JS went beyond minimal “phase publisher” to **`layoutRadarBlips`** / **`data-nerv-radar-auto-blips`** so Cartesian `%` positions get correct hit timing without misleading “range lag.” That is additive to the brief, not a drop.

## Plan Accuracy

Sequence (tests → SCSS → JS → ref → verify) matched execution. Surprises were **motion-design** issues, not file or dependency gaps: Cartesian `top`/`left` % skews angular spacing vs true polar timing; fixing that required either polar CSS or JS-derived phase. Cold-start “no blip until first sweep” forced a **single repeating keyframe track** with **`opacity: 0` + `animation-delay`**, not a separate intro animation—worth documenting early for future motion features.

## Build & QA Observations

Contract tests in `patterns.test.mjs` gave fast feedback when duration tokens, keyframe stops, or selectors changed. QA pass was semantic/cleanliness; substantive issues were caught during build iteration (timing, labels, glow vs fill). Nothing notable about QA-vs-implementation gap.

## Insights

### Technical

- For periodic UI sync in pure CSS, **one loop + delay** often beats “intro keyframes + infinite keyframes” when the first edge must align with a rotating reference.
- **Polar vs Cartesian** is not cosmetic: if hit time must match angle, either place on a real orbit (`.nerv-radar-blip-polar`) or set **`--nerv-radar-blip-phase`** from geometry (bearing only); distance along the ray should not shift phase.
- **`docs/radar.md` + a dense `///` header** carries the timing narrative better than inline SCSS alone for multi-file consumers (JS + ref + tests).

### Process

- **Motion features benefit from a short narrative doc** as soon as behavior is non-obvious; SCSS comments age well for tokens, less well for temporal reasoning.

### Million-Dollar Question

If blips had been a **foundational** radar feature, the cleanest end state might be **first-class markup** (e.g. semantic bearing/range attributes) with one layout pass in app code feeding both position and phase—avoiding ResizeObserver for static scenes. For a **reusable stylesheet**, the current split (CSS tokens + optional `NERV` helpers) is an appropriate boundary: library stays declarative; apps that need zero JS use polar or manual phase.
