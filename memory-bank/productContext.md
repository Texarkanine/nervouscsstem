# Product Context

## Target Audience

Web developers and self-hosters who want to reskin arbitrary web interfaces (e.g., Pi-hole admin panels, dashboards, web apps) with the visual language of NERV's operational consoles from Neon Genesis Evangelion.

## Use Cases

- Apply a cohesive NERV/Evangelion CRT-console aesthetic to any existing web UI via a single CSS import
- Use design system components (panels, hex grids, bar meters, MAGI displays) to build new themed interfaces from scratch
- Theme self-hosted tools (Pi-hole, Grafana, etc.) without forking their source code

## Key Benefits

- Pure CSS (no framework dependency) — works with any HTML
- `.nerv-` namespaced selectors prevent collisions with host UIs
- Escalation state system (Nominal → Critical) controlled by a single root class swap
- Accessibility: respects `prefers-reduced-motion` and `prefers-contrast`

## Success Criteria

- Six reference HTML pages render correctly, each validating a successive layer of the design system
- CSS works as an overlay on at least one real-world target (Pi-hole) without breaking existing functionality
- All visual effects achieved without `<canvas>`, WebGL, or image assets (SVG data URIs in CSS permitted)

## Key Constraints

- **No image files.** All visual effects via CSS. SVG data URIs embedded in CSS `background-image` are permitted for complex geometric shapes (e.g., crosshair marks) since they're programmatically generated, infinitely scalable, and live in the stylesheet.
- **No canvas.** No `<canvas>` element painting. No WebGL. No Three.js.
- **Minimal JS.** The JS layer is orchestration only — injecting structural DOM nodes CSS needs (overlays), toggling state classes, running timers for organic-feeling randomized animation. It does not draw, paint, or render.
- **No transparency.** NERV's UI was rendered on CRT monitors with vector graphics that couldn't easily be made transparent; overlays and transparent peek-through are absent from the UI.
- **`prefers-reduced-motion`** must be respected. All animations should be suppressed when this media query matches. The static state should still look recognizably NERV.
- **`prefers-contrast`** — High-contrast mode should increase border widths and reduce reliance on glow/shadow for element distinction.
- **Specificity discipline** — All selectors namespaced with `.nerv-` prefix to avoid collisions when overlaid on existing UIs (the entire point of the project).
