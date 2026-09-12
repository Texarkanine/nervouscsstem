# System Patterns

## How This System Works

The NERV design system is a layered SCSS library compiled to a single CSS file, consumed by adding a `<link>` tag to any HTML page. An optional `nerv.js` script handles orchestration tasks CSS cannot perform (DOM injection, random timers, state management).

The architecture is five layers with strict upward dependency flow: **Foundation → Effects → Structure → Components → States**. Each layer's SCSS partials consume design tokens from Foundation's `_tokens.scss` via CSS custom properties. A meta-token (`--nerv-primary`) allows the entire color palette to shift via a single root class change (the alert cascade system).

Reference HTML pages in `ref/` serve as visual test fixtures. Each page shows only its own layer's features — no duplication of prior layers' content. Where a layer needs backdrop content to be visible (e.g., scanlines need text underneath), the page uses distinct text that is clearly not a copy of earlier pages.

## SCSS Module System

Source files are SCSS partials (prefixed with `_`) that are `@forward`ed by the entry point `nerv.scss`. The `@forward` order follows the dependency graph. Dart Sass compiles this into a single `dist/nerv.css`. No consumer-facing SCSS is required — consumers use the compiled CSS.

## Token Architecture: Ambiance vs. Data

Design tokens on `:root` divide into two categories:

- **Ambiance tokens** (`--nerv-primary`, `--nerv-bg`, `--nerv-glow-spread`, `--nerv-animation-speed`) — overridden by the `.nerv-state-*` alert cascade classes. Elements that should shift with the system's mood use these.
- **Named data tokens** (`--nerv-green`, `--nerv-red`, `--nerv-cyan`, etc.) — stable, never overridden. Elements conveying factual information (hex cell states, bar meter fills) use these to remain legible regardless of alert state.

This distinction is load-bearing for the alert cascade system.

## Design Constraints

- **No image files.** All visual effects via CSS. SVG data URIs embedded in CSS `background-image` are permitted for complex geometric shapes (e.g., crosshair marks) since they're programmatically generated, infinitely scalable, and live in the stylesheet.
- **No canvas.** No `<canvas>` element painting. No WebGL. No Three.js.
- **Minimal JS.** The JS layer is orchestration only — injecting structural DOM nodes CSS needs (overlays), toggling state classes, running timers for organic-feeling randomized animation. It does not draw, paint, or render.
- **No transparency.** NERV's UI was rendered on CRT monitors with vector graphics that couldn't easily be made transparent; overlays and transparent peek-through are absent from the UI.
- **`prefers-reduced-motion`** must be respected. All animations should be suppressed when this media query matches. The static state should still look recognizably NERV.
- **`prefers-contrast`** — High-contrast mode should increase border widths and reduce reliance on glow/shadow for element distinction.
- **Specificity discipline** — All selectors namespaced with `.nerv-` prefix to avoid collisions when overlaid on existing UIs (the entire point of the project).

## CSS Property Replacement (Not Additive)

`box-shadow`, `filter`, `background`, and `text-shadow` are **replacement properties** — when the same property is set by two selectors at equal specificity, the later one completely overwrites the earlier. They do not merge. This is the single most common source of visual bugs in this design system.

**Consequence for compound states:** Any element that can be in multiple pseudo-class states simultaneously (`:checked:focus`, `:hover:active`, `.modifier-a.modifier-b`) needs explicit compound selectors that manually combine all layers of shadow/filter/background into a single declaration. If `:checked` sets `box-shadow: inset ...` and `:focus` sets `box-shadow: 0 0 glow ...`, then `:checked:focus` must set `box-shadow: inset ..., 0 0 glow ...` — the union of both, in one property.

**Consequence for orthogonal modifiers:** When two independent class axes (e.g., shape × fill) both touch the same property on the same element, the later axis must explicitly reset the earlier axis's value. Without an explicit override (even to `none` / `0` / `transparent`), the earlier axis's value bleeds through. See `_list.scss` for the canonical example: fill modes before shapes, with shapes explicitly overriding `background` and `border`.

Instances discovered: M5 (drop-shadow not border, source-order cascade, background override, double-border bleed), M6 (checkbox checked+focus shadow collision).

## Animation Patterns

- **Token-driven durations** — Every animation whose speed a consumer might want to tune gets its own `--nerv-*-duration` token (e.g., `--nerv-flicker-duration`, `--nerv-glitch-duration`). Durations use `calc(var(--nerv-*-duration) * N / var(--nerv-animation-speed))` so the global speed multiplier and per-effect tokens compose.
- **Stagger via `--nerv-stagger-index`** — Grouped animated elements use `animation-delay: calc(var(--nerv-stagger-index, 0) * Xs)`. `:nth-child()` rules set the index automatically; consumers or `nerv.js` can override per-element for finer control.
