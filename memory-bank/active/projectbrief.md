# Project Brief

Source: GitHub issue [#8 Sine Wave Sync Graph with Plotted Points](https://github.com/Texarkanine/nervouscsstem/issues/8). Reference still: a boxed graph with several phase-offset sine ribbons scrolling across, tick axes -5..+5, crosshair marks, and a seven-segment timer.

## User Story

As a developer reskinning a UI with NERV, I want a box that shows one or more scrolling sine waves with points riding on them, so that I can build the "sync graph" look from the show with plain HTML and CSS.

## Approved Restatement

Intent clarification was approved by the human operator (via the orchestrating agent) before this run:

> A new `.nerv-` component: a box holding one or more scrolling sine waves. Each wave has its own amplitude, wavelength, frequency, starting phase offset, and a standard design-system color. Points attach at a fixed horizontal position and ride up and down so they stay on the line as the wave moves. A vertical variant swaps the axes, so points move side to side. Wave speed rises through the alert cascade via `--nerv-animation-speed`.
> - **Frequency** means temporal frequency (cycles per second at a fixed point), so scroll speed = frequency × wavelength. That reproduces the issue's examples: 4 waves differing only in phase give the reference look; 2 waves differing only in frequency look like the same wave with one copy moving faster.
> - **Rendering stays inside the design constraints**: no canvas, no WebGL, no image files, and JS does not draw. The likely approach is an SVG sine as a CSS mask data URI, so stroke color comes from `--nerv-*` tokens via background-color, with scrolling by animating mask position and points positioned with CSS `sin()` on an animated registered `@property` phase. Settle the details in the creative phase and prove them in a browser.
> - **The look is glowing vector strokes**, not the tube-shaped 3D ribbons in the still.
> - **Graph chrome** (axis ticks, crosshairs, timer) is composed from EXISTING components in the catalog demo. It is not part of the wave component.
> - **Reduced motion** freezes each wave at its phase, with points still sitting on the line. High contrast follows the repo's `prefers-contrast` conventions.

## Use-Cases

### Use-Case 1: Reference sync graph

Four waves with the same amplitude, wavelength, and frequency but different phase offsets scroll together inside a box, reproducing the reference still's look.

### Use-Case 2: Frequency comparison

Two waves identical except for frequency look like one wave shape, with one copy scrolling faster than the other.

### Use-Case 3: Plotted points

A point attached at a fixed horizontal position on a wave rides up and down so it stays on the line while the wave scrolls.

### Use-Case 4: Vertical variant

The same component with axes swapped: waves scroll vertically, points move side to side.

## Requirements

1. New `.nerv-`-prefixed component: a box holding one or more sine waves.
2. Per-wave configuration: amplitude, wavelength, frequency (temporal, cycles/s), starting phase offset, and color from the design system's standard colors.
3. Waves scroll; scroll speed = frequency × wavelength.
4. Points attach at a fixed position along the travel axis and track the wave's displacement exactly.
5. Vertical variant swaps axes.
6. Speed scales with `--nerv-animation-speed` so it rises through the alert cascade.
7. Look: glowing vector strokes.
8. Reduced motion freezes each wave at its configured phase with points still on the line.
9. High contrast follows the repo's `prefers-contrast` conventions.
10. Catalog documentation page(s), with a demo that composes existing components for graph chrome (ticks, crosshairs, timer).

## Constraints

1. No canvas, no WebGL, no image files; JS does not draw. SVG data URIs in CSS are permitted.
2. All selectors `.nerv-` prefixed; durations follow `calc(var(--nerv-*-duration) * N / var(--nerv-animation-speed))`.
3. Prefer CSS-only, configured by custom properties and modifier classes. JS only for orchestration if genuinely needed.
4. Replacement properties (box-shadow, filter, background) need explicit compound handling.
5. Docs examples use today's island + verbatim `html` fence convention; docs never call `NERV.init()`.
6. Tests follow existing `test/*.test.mjs` patterns and are listed in `package.json`'s `npm test`.

## Acceptance Criteria

1. A consumer can place a wave box with N waves using only HTML + `nerv.css` and per-wave custom properties.
2. Points visibly stay on their wave line while animating (verified in a browser).
3. Four phase-offset waves reproduce the reference look; two frequency-differing waves show the "same wave, one faster" effect.
4. Vertical variant works with points moving side to side.
5. Wave speed increases under `.nerv-state-*` alert classes that raise `--nerv-animation-speed`.
6. Under `prefers-reduced-motion`, waves are static at their phase and points sit on the line.
7. `npm test`, `npm run lint`, and `npm run docs:build` pass.

## Rework: Point Labels (PR #18 feedback)

### Requirements

1. `.nerv-wave-point` may contain a label element with plain text that moves with the dot; the dot keeps tracking the line exactly.
2. Label placement LEFT or RIGHT of the dot, working on both `.nerv-wave-graph` and `.nerv-wave-graph-vertical`. Minimal placement set; agent chooses the default.
3. Label position derives from the point's own position (no second, independently drifting formula).
4. Where cleanly doable, labels stay readable inside the clipped box at swing extremes; otherwise the limit is documented. Proven in a browser.
5. Reduced motion, high contrast, and alert cascade behave consistently with points.
6. Docs (island + verbatim fence) and the `ref/ref-patterns.html` fixture show labels; docs may say the label is ordinary text a page script can update.

### Constraints

1. No collision avoidance: overlapping labels on different waves are intended (design norm, recorded in SumMem).
2. No shipped JS; no `content: attr()` labels.
3. PR screenshots live on an orphan `pr-assets` branch under `pr-18/`, never on the feature branch.

### Acceptance Criteria

1. Left and right labels render beside their dot on both orientations and move with it (browser-verified).
2. At swing extremes labels stay inside the box (or the documented limit holds).
3. `npm test`, `npm run docs:build` green; lint unchanged (10 pre-existing).
4. PR #18 body shows the screenshots via raw.githubusercontent.com URLs that return 200 image/png.
