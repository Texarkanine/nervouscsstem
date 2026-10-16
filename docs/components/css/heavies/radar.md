# Radar

CSS radar is the disc, rotating sweep, and blips. Polar placement uses `--nerv-radar-blip-bear-turn`. Cartesian `top` / `left` still paints. By adding JavaScript you can [sync sweep phase and auto-layout Cartesian blips](../../javascript/heavies/radar.md).

![Circular dial / radar display](../../../img/radar.png)

## Disc and sweep

```html island
<div class="nerv-radar" style="width: 16rem; margin: 0 auto;">
  <div class="nerv-radar-sweep"></div>
</div>
```

**Spec:** `.nerv-radar` is the square disc (rings and crosshairs are `::before` / `::after`). It follows `--nerv-primary` / `--nerv-primary-rgb`. `.nerv-radar-sweep` is the conic wedge, animated in CSS. Sweep and blip share `--nerv-radar-duration` (and `--nerv-animation-speed`). `--nerv-radar-blip-sweep-align` on `.nerv-radar` is a unitless-turn trim if the bright edge and phosphor hits look early or late. `prefers-reduced-motion: reduce` stops sweep and blip animation and holds blips at `opacity: 1`. `prefers-contrast: more` strengthens the phosphor outline and raises `--nerv-radar-blip-opacity-floor`. [Why that lockstep](../../../visual-language/radar.md).

## Polar blip

```html island
<div class="nerv-radar" style="width: 16rem; margin: 0 auto;">
  <div class="nerv-radar-sweep"></div>
  <span class="nerv-radar-blip nerv-radar-blip-polar nerv-type-hud" style="--nerv-radar-blip-bear-turn: 0.75;">EVA-01</span>
</div>
```

**Spec:** `.nerv-radar-blip-polar` plus `--nerv-radar-blip-bear-turn` (0 at the top, clockwise) places the phosphor on the ring and sets `--nerv-radar-blip-phase` from that bearing — no JS. `--nerv-radar-blip-dot` is phosphor size. `--nerv-radar-blip-orbit` is the radius from disc center to phosphor; it lives on the **blip** (default `calc(50cqmin - 0.9rem)`). Do not put `cqmin` on `.nerv-radar`. Labels stay screen-upright. The disc clips at the rim: keep the label toward the interior (label-right at 9 o'clock, label-below at 12 o'clock).

## Cartesian blip

```html island
<div class="nerv-radar" style="width: 16rem; margin: 0 auto;">
  <div class="nerv-radar-sweep"></div>
  <span class="nerv-radar-blip nerv-type-hud" style="top: 28%; left: 62%;">EVA-01</span>
</div>
```

**Spec:** `top` / `left` percentages put the phosphor on the disc. Empty dots and labeled blips share that geometry. Labels hang off that contact. Without JS, set `--nerv-radar-blip-phase` yourself if you need the phosphor to match the sweep.

## Label below

The phosphor is `::before`. Label text is the element’s content. Default is label to the right of the dot; `.nerv-radar-blip-label-left`, `-above`, and `-below` place it. `-below` / `-above` center the caption on the phosphor. Polar plus a label-side modifier keeps the dot on the ring. `-nowrap` and `-align-end` control wrapping and alignment. `--nerv-radar-blip-label-gap`, `--nerv-radar-blip-label-line-height`, and `--nerv-radar-blip-label-text-align` tune the box. `.nerv-glow-text-*` is shadow only; pair with `.nerv-text-*` for color. `--nerv-radar-blip-label-max-width` caps wrap.

Cartesian:

```html island
<div class="nerv-radar" style="width: 16rem; margin: 0 auto;">
  <div class="nerv-radar-sweep"></div>
  <span class="nerv-radar-blip nerv-radar-blip-label-below nerv-type-hud nerv-glow-text-green nerv-text-green" style="top: 55%; left: 28%; --nerv-radar-blip-label-max-width: 5.5rem;">EVA-02</span>
</div>
```

Polar, label hanging toward the center:

```html island
<div class="nerv-radar" style="width: 16rem; margin: 0 auto;">
  <div class="nerv-radar-sweep"></div>
  <span class="nerv-radar-blip nerv-radar-blip-polar nerv-radar-blip-label-below nerv-type-hud" style="--nerv-radar-blip-bear-turn: 0;">EVA-02</span>
</div>
```
