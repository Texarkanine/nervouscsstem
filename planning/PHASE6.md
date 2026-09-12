# Phase 6: Alert State Cascade & Full Integration

> Escalation state system — the entire interface shifts from nominal to critical via a single root class change.
> Verified by: `ref/ref-alert-cascade.html`

---

## Scope

This is the capstone phase. It delivers the alert state cascade — a system where changing a single class on the root element causes the entire interface to shift color palette, animation speed, glow intensity, and visual urgency. The escalation runs through five named states from calm (Nominal) to emergency (Critical).

Unlike prior phases, this phase creates relatively little new CSS. Its primary work is defining token-override rulesets that recontextualize the entire design system's appearance, and verifying that every prior module responds correctly to the overrides.

---

## Deliverables

### SCSS Modules

| File | Description |
|------|-------------|
| `src/_states.scss` | Alert state token-override rulesets (`.nerv-state-*` classes) |

### JavaScript Update

| File | Change |
|------|--------|
| `src/nerv.js` | Add `NERV.setState(state)` for programmatic state transitions |

### Reference Page

| File | Description |
|------|-------------|
| `ref/ref-alert-cascade.html` | Reference page 6 — full integration with interactive state controls |

### Updated Entry Point

Update `src/nerv.scss` to `@forward` the `_states` partial (must be last in the forward chain, as it overrides token values defined by `_tokens`).

### New/Updated Files

```
src/
├── nerv.scss              # (updated — @forward _states last)
├── _tokens.scss           # Phase 1
├── _typography.scss       # Phase 1
├── _glow.scss             # Phase 1
├── _scanlines.scss        # Phase 2
├── _flicker.scss          # Phase 2
├── _glitch.scss           # Phase 2
├── _panels.scss           # Phase 3
├── _dividers.scss         # Phase 3
├── _grid-marks.scss       # Phase 3
├── _stripe-bar.scss       # Phase 4
├── _hex-grid.scss         # Phase 4
├── _radar.scss            # Phase 4
├── _bar-meter.scss        # Phase 5
├── _segment-display.scss  # Phase 5
├── _magi-panel.scss       # Phase 5
├── _label-box.scss        # Phase 5
├── _status-text.scss      # Phase 5
├── _states.scss           # NEW
└── nerv.js                # (updated — NERV.setState)
```

---

## Module Details

### `_states.scss`

Five escalation states, each defined as a class on the root element (`:root` or a container). Each state overrides CSS custom property values defined in `_tokens.scss`. Because all prior modules consume tokens rather than hard-coded values, the override cascades automatically through every element.

**Escalation table** (from VISION.md §3, Page 6):

| State | Root Class | Primary Color | Background | `--nerv-animation-speed` | Special Effects |
|-------|-----------|---------------|------------|--------------------------|-----------------|
| Nominal | `.nerv-state-nominal` | `--nerv-green` | `--nerv-void` | `1` (normal) | None — static, calm |
| Active | `.nerv-state-active` | `--nerv-amber` | `--nerv-void` | `1` (normal) | Data elements begin flickering |
| Caution | `.nerv-state-caution` | `--nerv-amber-dark` | `--nerv-void` | `1.5` | Hex grid glows brighter, stripe bars appear |
| Alert | `.nerv-state-alert` | `--nerv-red` | Void + red edge bleed | `2` | Pulse animations, blink on status text |
| Critical | `.nerv-state-critical` | `--nerv-red` | `--nerv-red-deep` wash | `3` | Full glitch, screen flash, stripe bars at max speed |

**What each state overrides:**

Each `.nerv-state-*` class redefines a set of CSS custom properties within its scope:

- `--nerv-primary` — a new meta-token representing "the current primary color" (green in Nominal, amber in Active, red in Alert/Critical). Components that should respond to state changes reference this token instead of a specific named color.
- `--nerv-bg` — background color (void in most states, red-deep wash in Critical)
- `--nerv-animation-speed` — multiplier that affects all animation durations via `calc()`
- `--nerv-glow-spread` — glow intensity (increases with escalation)
- `--nerv-scanline-opacity` — scanline visibility (may increase in higher states)

**Mechanism — animation speed scaling:**

All animation-bearing modules (flicker, blink, stripe scroll, glitch, radar sweep) must define their durations as:

```scss
animation-duration: calc(var(--nerv-base-duration) / var(--nerv-animation-speed));
```

This ensures that when `--nerv-animation-speed` changes from `1` to `3`, animations run 3× faster automatically.

**Retrofit note:** If any Phase 2–5 module uses a hard-coded animation duration rather than the token-based `calc()` pattern, it must be updated during this phase to reference the token. This is expected — earlier phases document the intent but the full integration testing happens here.

**State-specific effects beyond token overrides:**

Some effects are not achievable by token overrides alone:

| Effect | State(s) | Implementation |
|--------|----------|---------------|
| Data elements start flickering | Active+ | `.nerv-state-active .nerv-type-data { @extend .nerv-flicker }` or a dedicated selector |
| Stripe bars appear | Caution+ | `.nerv-state-caution .nerv-stripe { display: block }` (if stripe bars are hidden by default in layouts) |
| Red edge bleed on vignette | Alert+ | Override vignette gradient to bleed red instead of black at edges |
| Screen flash | Critical | A brief full-viewport white flash keyframe triggered on state entry |
| Full glitch on text | Critical | `.nerv-state-critical .nerv-status-text { @extend .nerv-glitch }` or auto-applied |

These targeted selectors live in `_states.scss` alongside the token overrides.

### `nerv.js` — Phase 6 Addition

| Function | Purpose |
|----------|---------|
| `NERV.setState(state)` | Accepts a state name (`'nominal'`, `'active'`, `'caution'`, `'alert'`, `'critical'`), removes all `.nerv-state-*` classes from the root element, and applies the specified one |

**Consumer usage:**

```javascript
NERV.setState('alert');  // Interface shifts to Alert state
NERV.setState('nominal');  // Back to calm
```

This function is intentionally simple — it changes a class. All visual consequences flow from CSS. The JS does not manage animations, colors, or effects directly.

---

## Reference Page: `ref/ref-alert-cascade.html`

Contents (from VISION.md §3, Page 6):

- **Reproduces `ref-components.html` layout exactly** — same 12-column grid with MAGI panel, bar meters, segment display, label boxes, and status text
- **Adds a control row** (outside the themed area, at the top or bottom) with five buttons:
  - NOMINAL / ACTIVE / CAUTION / ALERT / CRITICAL
  - Clicking a button calls `NERV.setState('...')` with the corresponding state
  - The control row itself is styled plainly (outside the NERV theme) to remain usable as a test harness

**Observable behavior when cycling through states:**

| State | What the reviewer should see |
|-------|------------------------------|
| Nominal | Green primary color. Calm. No animations except scanline scroll. |
| Active | Amber primary. Data text begins flickering. |
| Caution | Darker amber. Glow intensifies. Animations speed up 1.5×. |
| Alert | Red primary. Vignette bleeds red at edges. Animations at 2×. Status text blinks. |
| Critical | Red-deep background wash. Animations at 3×. Status text glitches. Stripe bars at maximum speed. Brief screen flash on entry. |

**Additional layers active:**

- Scanline + vignette overlay (auto-injected by `NERV.init()`)
- Registration mark grid behind everything
- Ghost segments auto-populated
- Bar meter fill levels set
- Hex grid flickering (if included in the layout, or via a small hex cluster added to the page)

---

## Dependencies

| Dependency | From Phase | What It Provides |
|------------|-----------|------------------|
| All SCSS modules | Phases 1–5 | Every visual module must respond correctly to token overrides |
| `nerv.js` (Phases 4–5) | Phases 4–5 | Base `NERV.init()`, ghost segments, bar meters, hex flicker |
| `ref-components.html` layout | Phase 5 | The page layout is reproduced; only controls are added |

---

## Verification Criteria

1. **Build succeeds**: SCSS compiles without errors; updated `nerv.js` copies to `dist/`
2. **Nominal state**: Green primary, black background, minimal animation, calm appearance
3. **Active state**: Amber primary, data text flickers
4. **Caution state**: Darker amber, glow visibly brighter, animations noticeably faster
5. **Alert state**: Red primary, vignette edges bleed red, status text blinks, animations at 2×
6. **Critical state**: Red-deep background wash, status text glitches, stripe bars rapid, brief screen flash on entry, animations at 3×
7. **Transition smoothness**: State changes via buttons produce immediate, clean visual shifts — no lingering artifacts from the previous state
8. **Token cascade completeness**: Every colored element (panels, dividers, glow, text, bars, hex cells, radar) responds to the state change. No element retains a color from a previous state.
9. **Control row isolation**: The state-control buttons remain usable and visually distinct from the themed area regardless of current state
10. **`NERV.setState()` API**: Calling `NERV.setState('nominal')` from the browser console correctly resets the interface
11. **`prefers-reduced-motion`**: In all states, animations are suppressed. Color changes and glow intensity changes still apply. The interface is still recognizably in the correct state even without motion.
12. **Full regression**: All Phase 1–5 verification criteria still pass when the page is in Nominal state

---

## Open Questions

### Meta-token (`--nerv-primary`) usage audit

`--nerv-primary` and `--nerv-bg` are defined in Phase 1's `_tokens.scss` with default values. The expectation is that Phases 1–5 build modules that reference `--nerv-primary` for ambiance-driven properties (panel borders, general glow, status indicators) and specific named tokens (`--nerv-green`, `--nerv-red`, etc.) for data-driven properties (hex cell states, bar meter fill colors).

**Design consideration:** Some elements should NOT respond to the state cascade — for example, the green color on a `.nerv-hex-safe` cell should remain green even in Alert state, because its color conveys data, not ambiance.

The rule is: **ambiance follows `--nerv-primary`; data follows named tokens.**

During the Phase 6 build, an audit of all prior modules is required to verify this distinction is correctly applied. If any ambiance-driven element hard-codes a named color instead of using `--nerv-primary`, it must be updated. The severity of this audit depends on how well Phases 1–5 followed the guidance — if they used `--nerv-primary` consistently, the audit is a rubber stamp. If not, it's a retrofit.

This is a **medium-risk** design concern — getting it wrong means elements that should remain informative instead become monochromatic during alerts.

### Screen flash on Critical entry

The "brief screen flash" when entering Critical state is a one-time transition effect, not a sustained animation. CSS alone can achieve this via a `@keyframes` animation that runs once (`animation-fill-mode: forwards; animation-iteration-count: 1`), but it needs to re-trigger each time the class is applied. This may require JS intervention (remove and re-add the class with a forced reflow) or a dedicated animation-trigger mechanism.

This is a **low-risk** implementation detail.
