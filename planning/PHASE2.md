# Phase 2: Effects Layer

> CRT atmospheric effects — scanlines, vignette, flicker animations, and digital glitch.
> Verified by: `ref/ref-effects.html`

---

## Scope

This phase adds the four atmospheric effect systems that give the design system its CRT character: the scanline overlay, screen-edge vignette darkening, staccato flicker animations, and the digital glitch corruption effect. These effects layer on top of the Foundation (Phase 1) without requiring any structural containers.

This is also the first phase that introduces CSS animations, making it the phase where `prefers-reduced-motion` support becomes load-bearing.

---

## Deliverables

### SCSS Modules

| File | Description |
|------|-------------|
| `src/_scanlines.scss` | Scanline overlay + vignette (combined into one overlay element) |
| `src/_flicker.scss` | Staccato animation classes — hard-cut `steps()` timing |
| `src/_glitch.scss` | Digital corruption effect via `clip-path` pseudo-elements |

Update `src/nerv.scss` to `@forward` the three new partials.

### Reference Page

| File | Description |
|------|-------------|
| `ref/ref-effects.html` | Reference page 2 — effects applied to bare text on void |

### New Files in `src/`

```
src/
├── nerv.scss           # (updated — @forward new partials)
├── _tokens.scss        # (from Phase 1)
├── _typography.scss    # (from Phase 1)
├── _glow.scss          # (from Phase 1)
├── _scanlines.scss     # NEW
├── _flicker.scss       # NEW
└── _glitch.scss        # NEW
```

---

## Module Details

### `_scanlines.scss`

Two distinct effects sharing a single overlay element to minimize DOM impact:

**Scanlines** — faint horizontal lines across the entire viewport:

- A `fixed`-position overlay `<div>` covering the full viewport, with `pointer-events: none` and a high `z-index`
- `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.08) 1px, rgba(0,0,0,0.08) 2px)` creates the line pattern
- A `::after` pseudo-element on the overlay acts as the **scrolling bright band** — a semi-transparent horizontal stripe that translates from top to bottom over 4–6 seconds via `@keyframes`
- `mix-blend-mode: multiply` or `overlay` on the scanline layer for correct interaction with content beneath

**Vignette** — CRT edge darkening (combined with scanline overlay to avoid extra DOM):

- Applied as an additional `background-image` layer on the same overlay element
- `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)`
- No animation; purely static

**Classes:**

| Class | Applied To | Effect |
|-------|-----------|--------|
| `.nerv-scanlines` | Overlay `<div>` | Enables scanline pattern + vignette + scrolling band |
| `.nerv-scanline-band` | (pseudo-element) | The slowly-scrolling brighter horizontal band |

**Architectural note — overlay DOM node:**

The scanline overlay requires a DOM node that CSS alone cannot create. In reference pages, this `<div>` is included directly in the HTML markup. In production use, `nerv.js` (Phase 4) will inject it automatically. This phase does not create or depend on `nerv.js`.

### `_flicker.scss`

The most important animation principle in the NERV aesthetic: interfaces **snap** between states rather than interpolating smoothly.

**Classes:**

| Class | Behavior | Timing |
|-------|----------|--------|
| `.nerv-flicker` | Flickers between visible and dimmed states | ~0.5s cycle, `steps(1)` |
| `.nerv-flicker-fast` | Rapid staccato flicker | 0.1–0.3s cycle, `steps(1)` |
| `.nerv-flicker-staccato` | Hard-cut visibility toggle (fully on/off) | ~0.3s, `steps(2)` |
| `.nerv-blink` | Slower sustained pulse for persistent alerts | ~1s cycle |

**Key techniques:**

- `animation-timing-function: steps(1)` — hard cut, zero interpolation
- `animation-timing-function: steps(2)` — two-state snap
- `:nth-child()` selectors with varied `animation-delay` — elements in a group flicker out of phase, creating organic-feeling asynchrony
- All animation durations reference `--nerv-flicker-duration` and `--nerv-animation-speed` tokens, enabling Phase 6's alert cascade to accelerate them

**Note:** JS-driven random-interval flicker (truly random, not CSS-periodic) is out of scope for this phase. That capability arrives with `nerv.js` in Phase 4.

### `_glitch.scss`

Digital corruption effect for alert states and transitions. Text briefly distorts with chromatic-aberration-like offset slices.

**Technique** (from VISION.md §2.2.5, sourced from GLAO274/Evangelion-Style-Hexagon-Warning-Error-Page):

1. Element must carry a `data-text` attribute matching its text content
2. `::before` and `::after` pseudo-elements duplicate the text via `content: attr(data-text)`
3. Each pseudo-element is clipped to show only a horizontal slice (`clip-path: polygon()` — top third, bottom third)
4. `@keyframes` animate `transform: translate() skew()` on the pseudo-elements, creating offset/skewed slices
5. Pseudo-elements use slightly offset colors (shifted hue) for a chromatic aberration feel

**Classes:**

| Class | Effect |
|-------|--------|
| `.nerv-glitch` | Applies the glitch distortion effect (requires `data-text` attribute) |

**HTML requirement:** Elements using `.nerv-glitch` must include `data-text="..."` matching their text content. This is a documented consumer contract. Example:

```html
<span class="nerv-glitch" data-text="EMERGENCY">EMERGENCY</span>
```

---

## Accessibility: `prefers-reduced-motion`

This phase introduces the first animations in the system. **All animation-bearing classes must be wrapped in or gated by a `prefers-reduced-motion` check.**

Implementation approach:

```scss
@media (prefers-reduced-motion: reduce) {
  .nerv-flicker,
  .nerv-flicker-fast,
  .nerv-flicker-staccato,
  .nerv-blink,
  .nerv-glitch,
  .nerv-scanline-band {
    animation: none;
  }
}
```

The static appearance with animations suppressed must still look recognizably NERV — colors, glow, scanline texture, and vignette all remain. Only motion is removed.

---

## Reference Page: `ref/ref-effects.html`

Contents (from VISION.md §3, Page 2):

- All text elements from `ref-foundation.html` (same typography + glow samples)
- Scanline overlay active (horizontal line pattern + vignette + scrolling bright band)
- One element with `.nerv-flicker` (staccato on/off)
- One element with `.nerv-flicker-fast`
- One element with `.nerv-blink` (slow pulse)
- One element with `.nerv-glitch` + `data-text` attribute (digital corruption)
- A label that transitions between normal and alert state (color shift) on a timed loop

**Inline script note:** The timed label transition requires a small inline `<script>` in the reference page (toggling a class on a timer). This is a test-fixture script, not part of the `nerv.js` orchestration module. Reference pages may contain inline scripts for demo behavior that doesn't belong in the library itself.

**DOM note:** The scanline overlay `<div class="nerv-scanlines">` is included directly in the HTML markup. In production, `nerv.js` (Phase 4) will inject this automatically.

---

## Dependencies

| Dependency | From Phase | What It Provides |
|------------|-----------|------------------|
| `_tokens.scss` | Phase 1 | Color tokens, timing tokens (`--nerv-flicker-duration`, `--nerv-animation-speed`) |
| `_typography.scss` | Phase 1 | Font classes used in the reference page's text samples |
| `_glow.scss` | Phase 1 | Glow classes applied to text in the reference page |
| `nerv.scss` build pipeline | Phase 1 | `npm run build` compiles updated entry point |

---

## Verification Criteria

1. **Build succeeds**: `npm run build` compiles without errors after adding three new partials
2. **Scanlines visible**: Faint horizontal lines cover the entire viewport without obscuring text readability
3. **Vignette visible**: Edges of the viewport are subtly darker than center
4. **Scrolling band**: A brighter horizontal band slowly scrolls from top to bottom of the viewport
5. **Flicker classes**: `.nerv-flicker` and `.nerv-flicker-fast` produce visible staccato on/off blinking at different speeds
6. **Blink class**: `.nerv-blink` produces a slower, sustained pulse
7. **Glitch effect**: `.nerv-glitch` text visibly distorts with offset slices and chromatic-aberration-like color shift
8. **Overlay non-interactive**: Scanline overlay does not intercept mouse/touch events (`pointer-events: none` verified by clicking through it)
9. **`prefers-reduced-motion`**: When enabled in browser, all animations stop. Scanline texture, vignette, glow, and colors remain. Page is static but visually recognizable.
10. **No regressions**: All Phase 1 verification criteria still pass (fonts load, colors correct, glow visible)

---

## Open Questions

None. All techniques are specified in VISION.md §2.2 and sourced from prior art with known CSS implementations.
