# CSS

How NERV looks before any component. Colors, then fonts, then effects, then the alert cascade that retints the lot.

## Colors

Two kinds of token, both on `:root`.

**Ambiance** (`--nerv-primary`, `--nerv-bg`) follows the [alert cascade](#alert-cascade). Chromium that should shift with mood uses these.

**Named data** (`--nerv-green`, `--nerv-cyan`, `--nerv-red`, …) never moves. Put factual color on named tokens so a hex cell still reads as danger when the viewport goes red.

### Ambiance

<div class="nerv-docs-island">
  <p class="nerv-type-hud" style="color: var(--nerv-primary);">AMBIANCE --nerv-primary</p>
</div>

**Spec:** `--nerv-primary` defaults to `--nerv-amber`. `--nerv-bg` defaults to `--nerv-void`.

```html
<p class="nerv-type-hud" style="color: var(--nerv-primary);">AMBIANCE --nerv-primary</p>
```

### Named data

<div class="nerv-docs-island">
  <p class="nerv-type-hud" style="color: var(--nerv-green);">DATA --nerv-green</p>
</div>

```html
<p class="nerv-type-hud" style="color: var(--nerv-green);">DATA --nerv-green</p>
```

### Glow colors

Most named colors also generate modifier classes: `.nerv-glow-cyan`, `.nerv-text-cyan`, `.nerv-divider-cyan`, `.nerv-list-cyan`, and the same `{name}` on stripes, tables, forms, cartouches, reticles, grid marks, and gradient from/to. Those names are **amber, amber-dark, orange, red, red-deep, green, cyan, blue, steel**.

**Void** and **white** exist as `--nerv-void` / `--nerv-white` but do not get those classes — no phosphor bloom on black or paper white.

When a family page says a class exists “for every glow color,” it means that amber-through-steel list, not void or white.

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-text-cyan">.nerv-text-cyan</p>
</div>

```html
<p class="nerv-type-hud nerv-text-cyan">.nerv-text-cyan</p>
```

[Swatch board](../../boards/foundation.html)

## Fonts

Each type class sets `font-family` (and a little tracking / casing). Color is separate — pair with a token or `.nerv-text-*`.

### Display

<div class="nerv-docs-island">
  <p class="nerv-type-display" style="color: var(--nerv-amber); font-size: 1.6rem;">NERV 本部</p>
</div>

**Spec:** `.nerv-type-display` is Shippori.

```html
<p class="nerv-type-display">NERV 本部</p>
```

### HUD

<div class="nerv-docs-island">
  <p class="nerv-type-hud" style="color: var(--nerv-amber);">MAGI SYSTEM CHECK</p>
</div>

**Spec:** `.nerv-type-hud` is Barlow Condensed uppercase.

```html
<p class="nerv-type-hud">MAGI SYSTEM CHECK</p>
```

### Data

<div class="nerv-docs-island">
  <p class="nerv-type-data" style="color: var(--nerv-cyan);">CORE_TEMP: 227.4°C</p>
</div>

**Spec:** `.nerv-type-data` is IBM Plex Mono.

```html
<p class="nerv-type-data">CORE_TEMP: 227.4°C</p>
```

### Segment

<div class="nerv-docs-island">
  <p class="nerv-type-segment" style="color: var(--nerv-amber); font-size: 1.4rem;">04:00:00</p>
</div>

**Spec:** `.nerv-type-segment` is DSEG7.

```html
<p class="nerv-type-segment">04:00:00</p>
```

### Mixed

<div class="nerv-docs-island">
  <p class="nerv-type-mixed" style="color: var(--nerv-steel);">NERV Mixed 第三次衝撃</p>
</div>

**Spec:** `.nerv-type-mixed` is the JP/EN HUD stack.

```html
<p class="nerv-type-mixed">NERV Mixed 第三次衝撃</p>
```

### Boot

<div class="nerv-docs-island">
  <p class="nerv-type-boot" style="color: var(--nerv-green);">NERV BIOS v3.14 — MAGI SYSTEM CHECK</p>
</div>

**Spec:** `.nerv-type-boot` is VT323 with `pre-wrap`.

```html
<p class="nerv-type-boot">NERV BIOS v3.14 — MAGI SYSTEM CHECK</p>
```

## Effects

Bloom on chrome, then motion on the glyphs. Bare `.nerv-glow`, `.nerv-glow-text`, and `.nerv-glow-drop` follow `--nerv-primary`. Named variants use a [glow color](#glow-colors): `.nerv-glow-cyan`. `--nerv-glow-intensity` scales every kind and drops under `prefers-contrast: more`.

### Text glow

Pair `.nerv-glow-text-*` with `.nerv-text-*` for the fill color.

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-text-amber nerv-glow-text-amber" style="font-size: 1.4rem;">MAGI SYSTEM CHECK</p>
</div>

```html
<p class="nerv-type-hud nerv-text-amber nerv-glow-text-amber">MAGI SYSTEM CHECK</p>
```

### Box glow

<div class="nerv-docs-island">
  <div class="nerv-panel nerv-glow-amber">
    <p class="nerv-type-hud nerv-text-amber">MAGI SYSTEM CHECK</p>
  </div>
</div>

**Spec:** `.nerv-glow-*` is box-shadow bloom.

```html
<div class="nerv-panel nerv-glow-amber">…</div>
```

### Drop glow

<div class="nerv-docs-island">
  <span class="nerv-cartouche nerv-glow-drop-amber">MAGI SYSTEM CHECK</span>
</div>

**Spec:** `.nerv-glow-drop-*` is `filter: drop-shadow` and follows the rendered shape.

```html
<span class="nerv-cartouche nerv-glow-drop-amber">MAGI SYSTEM CHECK</span>
```

### Flicker

Hard-cut `step()` timing. Interfaces snap; they do not interpolate.

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-flicker nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.4rem;">CONDITION: NORMAL</p>
</div>

**Spec:** `.nerv-flicker` is the standard staccato on/off. `--nerv-stagger-index` delays grouped elements; `:nth-child()` sets a default so siblings do not flash in unison.

```html
<p class="nerv-type-hud nerv-flicker">CONDITION: NORMAL</p>
```

### Flicker fast

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-flicker-fast nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.4rem;">CONDITION: NORMAL</p>
</div>

**Spec:** `.nerv-flicker-fast` is a shorter cycle.

```html
<p class="nerv-type-hud nerv-flicker-fast">CONDITION: NORMAL</p>
```

### Flicker staccato

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-flicker-staccato nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.4rem;">CONDITION: NORMAL</p>
</div>

**Spec:** `.nerv-flicker-staccato` is a hard two-state visibility toggle.

```html
<p class="nerv-type-hud nerv-flicker-staccato">CONDITION: NORMAL</p>
```

### Blink

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-blink nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.6rem;">CONDITION: NORMAL</p>
</div>

**Spec:** `.nerv-blink` is the ~1s pulse. Pair it with status text when you want a held alarm, not a staccato CRT flicker.

```html
<p class="nerv-type-hud nerv-blink">CONDITION: NORMAL</p>
```

### Glitch

Digital corruption. The element must carry `data-text` matching its text content so the sliced `::before` / `::after` copies have something to clip.

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-glitch nerv-text-red" data-text="EMERGENCY" style="font-size: 1.6rem;">EMERGENCY</p>
</div>

**Spec:** `.nerv-glitch` slices the glyph with cyan and red copies. Most of the cycle is rest; bursts use `step-end` so there is no tween. `--nerv-glitch-duration` is the base cycle (default 3s).

```html
<span class="nerv-glitch" data-text="EMERGENCY">EMERGENCY</span>
```

### Scanlines

Viewport overlay. It covers the viewport, so it is not shown as a fragment demo. Put `<div class="nerv-scanlines"></div>` in the document, or call `NERV.injectScanlines()`. `NERV.init()` injects it as well.

```html
<div class="nerv-scanlines"></div>
```

**Spec:** `.nerv-scanlines` covers the viewport: repeating horizontal lines, a radial vignette, and a slowly scrolling bright band on `::after`. `NERV.injectScanlines()` adds the element to `document.body` if one is not already there.

[Swatch board](../../boards/effects.html)

## Alert cascade

Five root classes override ambiance tokens. Named data does not move — that is why a cyan readout still reads as cyan in alert.

![Red monochrome emergency state](../../img/states.png)

`NERV.setState` writes the class on `document.documentElement` and, for `critical`, flashes the viewport. To tint a fragment, put the state class on that element so tokens inherit. The JS call is [`NERV.setState`](../javascript/index.md#nervsetstate).

### Nominal

<div class="nerv-docs-island nerv-state-nominal">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-state-nominal` — `--nerv-primary` green, `--nerv-bg` void, `--nerv-animation-speed` 1.

```html
<div class="nerv-state-nominal">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">…</div>
</div>
```

### Active

<div class="nerv-docs-island nerv-state-active">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-state-active` — `--nerv-primary` amber. Active+ flickers `.nerv-type-data`.

```html
<div class="nerv-state-active">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">…</div>
</div>
```

### Caution

<div class="nerv-docs-island nerv-state-caution">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-state-caution` — `--nerv-primary` amber-dark, `--nerv-animation-speed` 1.5.

```html
<div class="nerv-state-caution">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">…</div>
</div>
```

### Alert

<div class="nerv-docs-island nerv-state-alert">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-state-alert` — `--nerv-primary` red, `--nerv-animation-speed` 2. Alert+ blinks `.nerv-status-text` and tints the scanline overlay.

```html
<div class="nerv-state-alert">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">…</div>
</div>
```

### Critical

<div class="nerv-docs-island nerv-state-critical">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-state-critical` — `--nerv-primary` red, `--nerv-bg` red-deep, `--nerv-animation-speed` 3. Critical glitches status text. `NERV.setState('critical')` also flashes the screen.

```html
<div class="nerv-state-critical">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">…</div>
</div>
```
