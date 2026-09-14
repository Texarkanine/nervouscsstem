# Effects

Bloom on chrome, then motion on the glyphs. Bare `.nerv-glow`, `.nerv-glow-text`, and `.nerv-glow-drop` follow `--nerv-primary`. Named variants use a [glow color](colors.md#glow-colors): `.nerv-glow-cyan`. `--nerv-glow-intensity` scales every kind and drops under `prefers-contrast: more`.

## Text glow

Pair `.nerv-glow-text-*` with `.nerv-text-*` for the fill color.

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-text-amber nerv-glow-text-amber" style="font-size: 1.4rem;">MAGI SYSTEM CHECK</p>
</div>

```html
<p class="nerv-type-hud nerv-text-amber nerv-glow-text-amber">MAGI SYSTEM CHECK</p>
```

## Box glow

<div class="nerv-docs-island">
  <div class="nerv-panel nerv-glow-amber">
    <p class="nerv-type-hud nerv-text-amber">MAGI SYSTEM CHECK</p>
  </div>
</div>

**Spec:** `.nerv-glow-*` is box-shadow bloom.

```html
<div class="nerv-panel nerv-glow-amber">…</div>
```

## Drop glow

<div class="nerv-docs-island">
  <span class="nerv-cartouche nerv-glow-drop-amber">MAGI SYSTEM CHECK</span>
</div>

**Spec:** `.nerv-glow-drop-*` is `filter: drop-shadow` and follows the rendered shape.

```html
<span class="nerv-cartouche nerv-glow-drop-amber">MAGI SYSTEM CHECK</span>
```

## Flicker

Hard-cut `step()` timing. Interfaces snap; they do not interpolate.

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-flicker nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.4rem;">CONDITION: NORMAL</p>
</div>

**Spec:** `.nerv-flicker` is the standard staccato on/off. `--nerv-stagger-index` delays grouped elements; `:nth-child()` sets a default so siblings do not flash in unison.

```html
<p class="nerv-type-hud nerv-flicker">CONDITION: NORMAL</p>
```

## Flicker fast

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-flicker-fast nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.4rem;">CONDITION: NORMAL</p>
</div>

**Spec:** `.nerv-flicker-fast` is a shorter cycle.

```html
<p class="nerv-type-hud nerv-flicker-fast">CONDITION: NORMAL</p>
```

## Flicker staccato

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-flicker-staccato nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.4rem;">CONDITION: NORMAL</p>
</div>

**Spec:** `.nerv-flicker-staccato` is a hard two-state visibility toggle.

```html
<p class="nerv-type-hud nerv-flicker-staccato">CONDITION: NORMAL</p>
```

## Blink

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-blink nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.6rem;">CONDITION: NORMAL</p>
</div>

**Spec:** `.nerv-blink` is the ~1s pulse. Pair it with status text when you want a held alarm, not a staccato CRT flicker.

```html
<p class="nerv-type-hud nerv-blink">CONDITION: NORMAL</p>
```

## Glitch

Digital corruption. The element must carry `data-text` matching its text content so the sliced `::before` / `::after` copies have something to clip.

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-glitch nerv-text-red" data-text="EMERGENCY" style="font-size: 1.6rem;">EMERGENCY</p>
</div>

**Spec:** `.nerv-glitch` slices the glyph with cyan and red copies. Most of the cycle is rest; bursts use `step-end` so there is no tween. `--nerv-glitch-duration` is the base cycle (default 3s).

```html
<span class="nerv-glitch" data-text="EMERGENCY">EMERGENCY</span>
```

## Scanlines

Viewport overlay. It covers the viewport, so it is not shown as a fragment demo. Put `<div class="nerv-scanlines"></div>` in the document, or call `NERV.injectScanlines()`. `NERV.init()` injects it as well.

```html
<div class="nerv-scanlines"></div>
```

**Spec:** `.nerv-scanlines` covers the viewport: repeating horizontal lines, a radial vignette, and a slowly scrolling bright band on `::after`. `NERV.injectScanlines()` adds the element to `document.body` if one is not already there.

[Swatch board](../../../boards/effects.html)
