# Project Brief

## User Story

As a consumer of the NERV Design System, I want CRT atmospheric effects (scanlines, vignette, flicker animations, and digital glitch) so that interfaces gain the characteristic CRT character of NERV operational consoles.

## Use-Case(s)

### Use-Case 1: Scanline + Vignette Overlay

A full-viewport overlay displaying faint horizontal scanline lines, edge-darkening vignette, and a slowly scrolling bright band — creating the look of a phosphor CRT monitor.

### Use-Case 2: Staccato Flicker Animations

CSS animation classes that make elements snap between visible and dimmed/hidden states using `steps()` timing, at various speeds, to evoke malfunctioning or updating displays.

### Use-Case 3: Digital Glitch Corruption

A text distortion effect using `clip-path` pseudo-elements and chromatic aberration-like offset slices, applied via a `.nerv-glitch` class with `data-text` attribute contract.

## Requirements

1. Create `src/_scanlines.scss` — scanline overlay pattern + vignette + scrolling bright band via CSS gradients and keyframe animation
2. Create `src/_flicker.scss` — `.nerv-flicker`, `.nerv-flicker-fast`, `.nerv-flicker-staccato`, `.nerv-blink` classes using `steps()` timing functions
3. Create `src/_glitch.scss` — `.nerv-glitch` effect via `::before`/`::after` pseudo-elements with `clip-path` and `data-text` attribute
4. Update `src/nerv.scss` to `@forward` the three new partials
5. Create `ref/ref-effects.html` — reference page demonstrating all effects, including all Phase 1 content for regression verification
6. All animation durations must reference `--nerv-flicker-duration` and `--nerv-animation-speed` tokens from `_tokens.scss`
7. `prefers-reduced-motion: reduce` must suppress all animations; static appearance must remain recognizably NERV
8. Scanline overlay must use `pointer-events: none` to remain non-interactive
9. All selectors must use the `.nerv-` prefix
10. No modifications to existing Phase 1 SCSS modules beyond adding `@forward` lines

## Constraints

1. CSS-only effects — no JavaScript in the library (inline demo scripts in ref page are OK)
2. No image files, no `<canvas>`, no WebGL
3. The scanline overlay requires a DOM `<div>` — included in ref HTML directly; `nerv.js` (Phase 4) will inject it in production
4. `.nerv-glitch` requires consumer to provide `data-text` attribute matching element text
5. Colors consumed via CSS custom properties only — no hard-coded hex outside `_tokens.scss`

## Acceptance Criteria

1. `npm run build` compiles without errors after adding three new partials
2. Faint horizontal scanlines cover the entire viewport without obscuring text readability
3. Viewport edges are subtly darker than center (vignette)
4. A brighter horizontal band slowly scrolls top-to-bottom
5. `.nerv-flicker` and `.nerv-flicker-fast` produce visible staccato on/off blinking at different speeds
6. `.nerv-blink` produces a slower, sustained pulse
7. `.nerv-glitch` text visibly distorts with offset slices and chromatic-aberration color shift
8. Scanline overlay does not intercept mouse/touch events
9. With `prefers-reduced-motion` enabled, all animations stop but page remains visually recognizable
10. All Phase 1 verification criteria still pass (no regressions)
