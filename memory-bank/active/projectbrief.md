# Project Brief: M8 — Radar pulse

## User Story

As a developer building NERV-styled HUDs, I want radar-adjacent elements to pulse or fade in time with the radar sweep, and I want a documented way to keep that sync when external UI (or scripts) drive or observe radar position, so that contacts and alerts feel mechanically tied to the sweep rather than floating independently.

## Use-Case(s)

### Use-Case 1: Swept contact highlights

Blips, labels, or markers inside or around a radar should brighten or fade as the sweep passes their angular region (or share the same rhythmic period as the sweep for a cohesive look).

### Use-Case 2: External sync

Application code outside the stylesheet should be able to align actions (e.g. sound, state changes) or custom visuals with the current sweep phase without reimplementing timing math inconsistently.

## Requirements

1. Extend existing radar styling in `src/_radar.scss` (no parallel radar system).
2. Respect `prefers-reduced-motion: reduce` — pulsing animations off; static appearance still reads as NERV radar context.
3. Respect `prefers-contrast: more` if new glow/opacity effects are introduced (stronger borders / less reliance on faint fades where applicable).
4. All new selectors use the `.nerv-` prefix.
5. CSS-first: prefer tokens, keyframes, and custom properties; add JS in `src/nerv.js` only if pure CSS cannot satisfy sync or external API requirements.
6. No image files; no canvas/WebGL; SVG data URIs in CSS allowed if needed.
7. Reference demo on the existing radar page/section (`ref/ref-patterns.html` or the file that already hosts `.nerv-radar`).
8. Automated tests (Stylelint + `node --test`) remain green; new behaviors covered in the existing test style (compiled CSS string checks and/or `nerv.js` API checks).

## Constraints

Cross-milestone invariants from `memory-bank/active/milestones.md` apply (tokens, reduced motion, contrast, no images, SCSS partial conventions, `@forward` order, ref page strategy).

## Acceptance Criteria

1. Documented investigation outcome (in plan / implementation notes): chosen sync strategy and tradeoffs.
2. At least one consumer-facing class or pattern for “pulse with radar” is implemented and demonstrated.
3. If JS is required: a small, documented API on `NERV` (or extension of `init`) for sync/phase — with tests; if JS is not required: tests still cover new CSS contracts.
4. `npm run build`, Stylelint, and full `node --test` pass.
