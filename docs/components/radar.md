# Radar

Tactical disc, rotating sweep, and phased blips. This page is usage islands. The timing model lives in [visual-language/radar.md](../visual-language/radar.md).

![Circular dial / radar display](../img/radar.png)

## Disc and sweep

Island opts in with `data-nerv-init="radar"`. `docs-init.js` calls `NERV.initRadarSweepSync` on each `.nerv-radar` (and `initRadarBlipAutoLayout` when `data-nerv-radar-auto-blips` is set).

<div class="nerv-docs-island" data-nerv-init="radar">
  <div class="nerv-radar" data-nerv-radar-sync data-nerv-radar-auto-blips style="width: 16rem; margin: 0 auto;">
    <div class="nerv-radar-sweep"></div>
    <span class="nerv-radar-blip nerv-type-hud" style="top: 28%; left: 62%;">EVA-01</span>
    <span class="nerv-radar-blip nerv-radar-blip-label-below nerv-type-hud" style="top: 70%; left: 40%;">EVA-02</span>
  </div>
</div>

**Spec:** `.nerv-radar` is the square disc (rings and crosshairs are `::before` / `::after`). `.nerv-radar-sweep` is the conic wedge. `.nerv-radar-blip` is a contact; the phosphor dot is `::before`, label text is the element's content. Cartesian placement is `top` / `left` percentages.

```html
<div class="nerv-radar" data-nerv-radar-sync data-nerv-radar-auto-blips>
  <div class="nerv-radar-sweep"></div>
  <span class="nerv-radar-blip" style="top: 28%; left: 62%;">EVA-01</span>
</div>
<script>
  var el = document.querySelector('.nerv-radar');
  NERV.initRadarBlipAutoLayout(el);
  NERV.initRadarSweepSync(el);
</script>
```

## Polar blips

`.nerv-radar-blip-polar` plus `--nerv-radar-blip-bear-turn` wires phase to rotate + translate. JS layout skips polar blips (phase comes from CSS).

<div class="nerv-docs-island" data-nerv-init="radar">
  <div class="nerv-radar" data-nerv-radar-sync style="width: 16rem; margin: 0 auto;">
    <div class="nerv-radar-sweep"></div>
    <span class="nerv-radar-blip nerv-radar-blip-polar nerv-type-hud" style="--nerv-radar-blip-bear-turn: 0.12;">EVA-01</span>
  </div>
</div>

```html
<span class="nerv-radar-blip nerv-radar-blip-polar" style="--nerv-radar-blip-bear-turn: 0.12;">EVA-01</span>
```

## Label modifiers

`.nerv-radar-blip-label-left`, `-above`, `-below` place the label. `-nowrap` and `-align-end` control wrapping and alignment. The Cartesian island above uses `-below` on the second blip.

`data-nerv-radar-manual-phase` skips auto layout for that blip. Prefer `prefers-reduced-motion`: sweep and JS layout no-op.
