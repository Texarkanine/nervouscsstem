# Project Brief: Phase 6 — Alert State Cascade & Integration

## User Story

As a developer consuming the NERV design system, I want the entire interface to shift from calm (Nominal) to emergency (Critical) appearance when a single root class changes, so that escalation states are conveyed visually across all components simultaneously.

## Requirements

### SCSS Module: `_states.scss`

Define five escalation state classes (`.nerv-state-nominal`, `.nerv-state-active`, `.nerv-state-caution`, `.nerv-state-alert`, `.nerv-state-critical`) on the root element. Each overrides CSS custom properties (`--nerv-primary`, `--nerv-bg`, `--nerv-animation-speed`, `--nerv-glow-spread`, `--nerv-scanline-opacity`) so the entire token cascade shifts automatically.

State-specific effects beyond token overrides:
- Active+: data elements start flickering
- Caution+: hex grid glows brighter, stripe bars appear
- Alert+: red edge bleed on vignette, status text blinks
- Critical: full glitch on text, screen flash on entry, stripe bars at max speed

### JavaScript: `NERV.setState(state)`

Add a `setState` method that accepts a state name string, removes all `.nerv-state-*` classes from the root, and applies the specified one. JS is orchestration only — all visual consequences flow from CSS.

### Reference Page: `ref/ref-alert-cascade.html`

Reproduces `ref-components.html` layout with a control row of five state buttons outside the themed area. Clicking a button calls `NERV.setState()`. All Phase 1–5 components must respond correctly to state changes.

### Retrofit Audit

Audit all Phase 1–5 modules:
- Ambiance-driven properties must reference `--nerv-primary` (not named color tokens)
- Animation durations must use `calc(var(--nerv-*-duration) / var(--nerv-animation-speed))` pattern
- Data-driven properties must keep using named tokens (should NOT respond to state cascade)

### Entry Point Update

Update `src/nerv.scss` to `@forward` the `_states` partial last in the chain.

### Accessibility

- `prefers-reduced-motion`: animations suppressed in all states; color/glow changes still apply
- `prefers-contrast`: elements distinguishable without glow

## Acceptance Criteria

See `planning/PHASE6.md` § Verification Criteria (12 items).
