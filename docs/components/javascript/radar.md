# Radar

CSS radar is the disc, sweep, and polar blips. By adding JavaScript you can sync the sweep phase and auto-layout Cartesian blips. Both hooks no-op under `prefers-reduced-motion`.

## Sweep sync

<div class="nerv-docs-island" data-nerv-init="radar">
  <div class="nerv-radar" data-nerv-radar-sync style="width: 16rem; margin: 0 auto;">
    <div class="nerv-radar-sweep"></div>
    <span class="nerv-radar-blip nerv-radar-blip-polar nerv-type-hud" style="--nerv-radar-blip-bear-turn: 0.75;">EVA-01</span>
    <span class="nerv-radar-blip nerv-radar-blip-polar nerv-radar-blip-label-below nerv-type-hud" style="--nerv-radar-blip-bear-turn: 0;">EVA-02</span>
  </div>
</div>

**Spec:** `NERV.initRadarSweepSync` writes `--nerv-radar-sweep-phase` from the sweep animation so other UI can read it. Opt-in: `data-nerv-radar-sync`. Polar placement is CSS; this hook does not move the blip.

```html
<div class="nerv-radar" data-nerv-radar-sync>
  <div class="nerv-radar-sweep"></div>
  <span class="nerv-radar-blip nerv-radar-blip-polar" style="--nerv-radar-blip-bear-turn: 0.75;">EVA-01</span>
  <span class="nerv-radar-blip nerv-radar-blip-polar nerv-radar-blip-label-below" style="--nerv-radar-blip-bear-turn: 0;">EVA-02</span>
</div>
<script>
  NERV.initRadarSweepSync(document.querySelector('.nerv-radar'));
</script>
```

## Cartesian auto-layout

<div class="nerv-docs-island" data-nerv-init="radar">
  <div class="nerv-radar" data-nerv-radar-auto-blips style="width: 16rem; margin: 0 auto;">
    <div class="nerv-radar-sweep"></div>
    <span class="nerv-radar-blip nerv-type-hud" style="top: 28%; left: 62%;">EVA-01</span>
    <span class="nerv-radar-blip nerv-radar-blip-label-below nerv-type-hud nerv-glow-text-green nerv-text-green" style="top: 55%; left: 28%; --nerv-radar-blip-label-max-width: 5.5rem;">EVA-02</span>
  </div>
</div>

**Spec:** `NERV.initRadarBlipAutoLayout` sets `--nerv-radar-blip-phase` from the phosphor’s bearing (skips polar blips). `data-nerv-radar-manual-phase` skips auto layout for that blip. Opt-in: `data-nerv-radar-auto-blips`. Cartesian `top` / `left` is the phosphor.

```html
<div class="nerv-radar" data-nerv-radar-auto-blips>
  <div class="nerv-radar-sweep"></div>
  <span class="nerv-radar-blip" style="top: 28%; left: 62%;">EVA-01</span>
  <span class="nerv-radar-blip nerv-radar-blip-label-below nerv-type-hud nerv-glow-text-green nerv-text-green" style="top: 55%; left: 28%; --nerv-radar-blip-label-max-width: 5.5rem;">EVA-02</span>
</div>
<script>
  NERV.initRadarBlipAutoLayout(document.querySelector('.nerv-radar'));
</script>
```
