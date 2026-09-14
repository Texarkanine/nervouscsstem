# Radar

CSS radar is the disc, rotating sweep, and blips. Polar placement uses `--nerv-radar-blip-bear-turn`. Cartesian `top` / `left` still paints. By adding JavaScript you can [sync sweep phase and auto-layout Cartesian blips](../../javascript/heavies/radar.md).

![Circular dial / radar display](../../../img/radar.png)

## Disc and sweep

<div class="nerv-docs-island">
  <div class="nerv-radar" style="width: 16rem; margin: 0 auto;">
    <div class="nerv-radar-sweep"></div>
  </div>
</div>

**Spec:** `.nerv-radar` is the square disc (rings and crosshairs are `::before` / `::after`). `.nerv-radar-sweep` is the conic wedge, animated in CSS. Sweep and blip share `--nerv-radar-duration`. [Why that lockstep](../../../visual-language/radar.md).

```html
<div class="nerv-radar">
  <div class="nerv-radar-sweep"></div>
</div>
```

## Polar blip

<div class="nerv-docs-island">
  <div class="nerv-radar" style="width: 16rem; margin: 0 auto;">
    <div class="nerv-radar-sweep"></div>
    <span class="nerv-radar-blip nerv-radar-blip-polar nerv-type-hud" style="--nerv-radar-blip-bear-turn: 0.75;">EVA-01</span>
  </div>
</div>

**Spec:** `.nerv-radar-blip-polar` plus `--nerv-radar-blip-bear-turn` (0 at the top, clockwise) places the phosphor on the ring and phases it to the sweep without JS. Labels stay screen-upright. The disc clips at the rim: keep the label toward the interior (label-right at 9 o'clock, label-below at 12 o'clock).

```html
<div class="nerv-radar">
  <div class="nerv-radar-sweep"></div>
  <span class="nerv-radar-blip nerv-radar-blip-polar" style="--nerv-radar-blip-bear-turn: 0.75;">EVA-01</span>
</div>
```

## Cartesian blip

<div class="nerv-docs-island">
  <div class="nerv-radar" style="width: 16rem; margin: 0 auto;">
    <div class="nerv-radar-sweep"></div>
    <span class="nerv-radar-blip nerv-type-hud" style="top: 28%; left: 62%;">EVA-01</span>
  </div>
</div>

**Spec:** `top` / `left` percentages put the phosphor on the disc. Labels hang off that contact. Without JS, set `--nerv-radar-blip-phase` yourself if you need the phosphor to match the sweep.

```html
<span class="nerv-radar-blip" style="top: 28%; left: 62%;">EVA-01</span>
```

## Label below

`.nerv-radar-blip-label-left`, `-above`, and `-below` place the label. `-below` / `-above` center the caption on the phosphor. `-nowrap` and `-align-end` control wrapping and alignment. `.nerv-glow-text-*` is shadow only; pair with `.nerv-text-*` for color. `--nerv-radar-blip-label-max-width` caps wrap.

Cartesian:

<div class="nerv-docs-island">
  <div class="nerv-radar" style="width: 16rem; margin: 0 auto;">
    <div class="nerv-radar-sweep"></div>
    <span class="nerv-radar-blip nerv-radar-blip-label-below nerv-type-hud nerv-glow-text-green nerv-text-green" style="top: 55%; left: 28%; --nerv-radar-blip-label-max-width: 5.5rem;">EVA-02</span>
  </div>
</div>

```html
<span class="nerv-radar-blip nerv-radar-blip-label-below nerv-type-hud nerv-glow-text-green nerv-text-green" style="top: 55%; left: 28%; --nerv-radar-blip-label-max-width: 5.5rem;">EVA-02</span>
```

Polar, label hanging toward the center:

<div class="nerv-docs-island">
  <div class="nerv-radar" style="width: 16rem; margin: 0 auto;">
    <div class="nerv-radar-sweep"></div>
    <span class="nerv-radar-blip nerv-radar-blip-polar nerv-radar-blip-label-below nerv-type-hud" style="--nerv-radar-blip-bear-turn: 0;">EVA-02</span>
  </div>
</div>

```html
<span class="nerv-radar-blip nerv-radar-blip-polar nerv-radar-blip-label-below" style="--nerv-radar-blip-bear-turn: 0;">EVA-02</span>
```
