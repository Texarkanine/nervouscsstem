# System Patterns

## How This System Works

The NERV design system is a layered SCSS library compiled to a single CSS file, consumed by adding a `<link>` tag to any HTML page. An optional `nerv.js` script handles orchestration tasks CSS cannot perform (DOM injection, random timers, state management).

The architecture is five layers with strict upward dependency flow: **Foundation → Effects → Structure → Components → States**. Each layer's SCSS partials consume design tokens from Foundation's `_tokens.scss` via CSS custom properties. A meta-token (`--nerv-primary`) allows the entire color palette to shift via a single root class change (the alert cascade system).

Reference HTML pages in `ref/` serve as visual test fixtures. Each page validates a cumulative subset of layers — page N assumes all pages 1 through N-1 still pass.

## SCSS Module System

Source files are SCSS partials (prefixed with `_`) that are `@forward`ed by the entry point `nerv.scss`. The `@forward` order follows the dependency graph. Dart Sass compiles this into a single `dist/nerv.css`. No consumer-facing SCSS is required — consumers use the compiled CSS.

## Token Architecture: Ambiance vs. Data

Design tokens on `:root` divide into two categories:

- **Ambiance tokens** (`--nerv-primary`, `--nerv-bg`, `--nerv-glow-spread`, `--nerv-animation-speed`) — overridden by the `.nerv-state-*` alert cascade classes. Elements that should shift with the system's mood use these.
- **Named data tokens** (`--nerv-green`, `--nerv-red`, `--nerv-cyan`, etc.) — stable, never overridden. Elements conveying factual information (hex cell states, bar meter fills) use these to remain legible regardless of alert state.

This distinction is load-bearing for the alert cascade system.
