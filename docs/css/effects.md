# Effects

Scanlines, flicker, blink, and glitch. Class names here are current; motion rename is [issue #12](https://github.com/Texarkanine/nervouscsstem/issues/12).

`.nerv-scanlines` is a viewport-fixed overlay (`position: fixed` on the whole page). Do not put it in a docs island, and do not call `NERV.init()` from Material chrome to inject it. Put `<div class="nerv-scanlines"></div>` on a page you own, or call `NERV.init()` / `NERV.injectScanlines()` on a full NERV viewport. The [effects board](../boards/effects.html) is that viewport.

## Flicker

Hard-cut `step()` timing. Interfaces snap; they do not interpolate. Filler is the same HUD word on every variant.

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-flicker nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.4rem;">CONDITION: NORMAL</p>
  <p class="nerv-type-hud nerv-flicker-fast nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.4rem;">CONDITION: NORMAL</p>
  <p class="nerv-type-hud nerv-flicker-staccato nerv-glow-text-amber" style="color: var(--nerv-amber); font-size: 1.4rem;">CONDITION: NORMAL</p>
</div>

**Spec:** `.nerv-flicker` is the standard staccato on/off. `.nerv-flicker-fast` is a shorter cycle. `.nerv-flicker-staccato` is a hard two-state visibility toggle. `--nerv-stagger-index` delays grouped elements; `:nth-child()` sets a default so siblings do not flash in unison.

```html
<p class="nerv-type-hud nerv-flicker">CONDITION: NORMAL</p>
<p class="nerv-type-hud nerv-flicker-fast">CONDITION: NORMAL</p>
<p class="nerv-type-hud nerv-flicker-staccato">CONDITION: NORMAL</p>
```

## Blink

Slower sustained pulse. Same filler.

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

## Scanlines (code only)

```html
<div class="nerv-scanlines"></div>
```

**Spec:** `.nerv-scanlines` covers the viewport: repeating horizontal lines, a radial vignette, and a slowly scrolling bright band on `::after`. `NERV.injectScanlines()` adds the element to `document.body` if one is not already there.

[Swatch board](../boards/effects.html)
