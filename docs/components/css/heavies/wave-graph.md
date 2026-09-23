# Wave graph

CSS wave graph is a box of scrolling sine traces, with dots that ride their trace up and down. Every number is a custom property. There is no JavaScript hook. It needs `@property`, CSS `sin()`, and unprefixed `mask` (Chrome 120, Firefox 128, Safari 16.4 or newer). Without `@property` the traces hold still. Without unprefixed `mask` they are not drawn at all. The oscillograph displays it draws on are in the [design language](../../../visual-language/design-language.md#7-waveform-oscillograph-display) and the [atomic elements](../../../visual-language/atomic-elements.md).

![Sync waveform with ±5 axis and timecode](../../../img/wave-graph.png)

## Single wave

<div class="nerv-docs-island">
  <div class="nerv-wave-graph" role="img" aria-label="One sine trace" style="max-width: 32rem; margin: 0 auto;">
    <div class="nerv-wave"></div>
  </div>
</div>

**Spec:** `.nerv-wave-graph` is the box: a positioning context that clips, `aspect-ratio: 16 / 10` by default (set a width, or a height if you drop the ratio). Each `.nerv-wave` inside it is one trace. Geometry is unitless and relative to the box. `--nerv-wave-amplitude` is a fraction of half the box height (default `0.8`). `--nerv-wave-wavelength` is a fraction of the box width (default `0.5`, two cycles across). `--nerv-wave-frequency` is cycles per second at a fixed spot (default `0.25`), so the trace scrolls at frequency × wavelength. `0` holds it still. `--nerv-wave-phase` is the starting offset in turns (`0.25` is 90°). Set any of them on the box to apply to every wave, or on one wave. An uncolored wave follows `--nerv-primary`. Traces travel right to left and glow with `--nerv-glow-spread` / `--nerv-glow-intensity`. The period is `--nerv-wave-duration` (default `1s`) ÷ (frequency × `--nerv-animation-speed`).

```html
<div class="nerv-wave-graph" role="img" aria-label="One sine trace" style="max-width: 32rem; margin: 0 auto;">
  <div class="nerv-wave"></div>
</div>
```

## Sync graph

<div class="nerv-docs-island">
  <div class="nerv-panel" style="max-width: 40rem; margin: 0 auto;">
    <div style="display: flex; justify-content: flex-end;">
      <span class="nerv-segment-display" data-ghost="8:88:8888" style="font-size: 1.25rem;">0:01:9701</span>
    </div>
    <div class="nerv-wave-graph nerv-grid-marks nerv-reticle-bottom" role="img" aria-label="Four sync waves, offset in phase" style="margin-top: 0.75rem; --nerv-wave-wavelength: 1; --nerv-wave-frequency: 0.15; --nerv-reticle-spacing: 1rem;">
      <div class="nerv-wave nerv-wave-red"></div>
      <div class="nerv-wave nerv-wave-red" style="--nerv-wave-phase: 0.07;"></div>
      <div class="nerv-wave nerv-wave-blue" style="--nerv-wave-phase: 0.5;"></div>
      <div class="nerv-wave nerv-wave-blue" style="--nerv-wave-phase: 0.57;"></div>
    </div>
    <div class="nerv-type-hud" style="display: flex; justify-content: space-between; margin-top: 0.35rem; font-size: 0.75rem;">
      <span>-5</span><span>-4</span><span>-3</span><span>-2</span><span>-1</span><span>0</span><span>+1</span><span>+2</span><span>+3</span><span>+4</span><span>+5</span>
    </div>
  </div>
</div>

**Spec:** Four waves with the same amplitude, wavelength, and frequency, differing only in `--nerv-wave-phase`, move together as one bundle. The shared values sit once on the box. The chrome is other components, not part of the wave graph: `.nerv-panel` frames it, `.nerv-grid-marks` paints the crosshairs on the box's background, `.nerv-reticle-bottom` ticks its lower edge, and `.nerv-segment-display` is the timecode. The box sets no background, border, or pseudo-elements, so those compose onto it. Named colors (`.nerv-wave-red`, `-blue`, …) are data colors: they hold through the alert cascade.

```html
<div class="nerv-panel" style="max-width: 40rem; margin: 0 auto;">
  <div style="display: flex; justify-content: flex-end;">
    <span class="nerv-segment-display" data-ghost="8:88:8888" style="font-size: 1.25rem;">0:01:9701</span>
  </div>
  <div class="nerv-wave-graph nerv-grid-marks nerv-reticle-bottom" role="img" aria-label="Four sync waves, offset in phase" style="margin-top: 0.75rem; --nerv-wave-wavelength: 1; --nerv-wave-frequency: 0.15; --nerv-reticle-spacing: 1rem;">
    <div class="nerv-wave nerv-wave-red"></div>
    <div class="nerv-wave nerv-wave-red" style="--nerv-wave-phase: 0.07;"></div>
    <div class="nerv-wave nerv-wave-blue" style="--nerv-wave-phase: 0.5;"></div>
    <div class="nerv-wave nerv-wave-blue" style="--nerv-wave-phase: 0.57;"></div>
  </div>
  <div class="nerv-type-hud" style="display: flex; justify-content: space-between; margin-top: 0.35rem; font-size: 0.75rem;">
    <span>-5</span><span>-4</span><span>-3</span><span>-2</span><span>-1</span><span>0</span><span>+1</span><span>+2</span><span>+3</span><span>+4</span><span>+5</span>
  </div>
</div>
```

## Frequency pair

<div class="nerv-docs-island">
  <div class="nerv-wave-graph" role="img" aria-label="Two copies of one wave, one scrolling twice as fast" style="max-width: 32rem; margin: 0 auto;">
    <div class="nerv-wave nerv-wave-cyan" style="--nerv-wave-frequency: 0.2;"></div>
    <div class="nerv-wave nerv-wave-orange" style="--nerv-wave-frequency: 0.4;"></div>
  </div>
</div>

**Spec:** Two waves identical except for `--nerv-wave-frequency` start as one line and read as two copies of the same wave, one moving faster. `.nerv-wave-reverse` on a wave sends it left to right instead.

```html
<div class="nerv-wave-graph" role="img" aria-label="Two copies of one wave, one scrolling twice as fast" style="max-width: 32rem; margin: 0 auto;">
  <div class="nerv-wave nerv-wave-cyan" style="--nerv-wave-frequency: 0.2;"></div>
  <div class="nerv-wave nerv-wave-orange" style="--nerv-wave-frequency: 0.4;"></div>
</div>
```

## Plotted points

<div class="nerv-docs-island">
  <div class="nerv-wave-graph nerv-grid-marks" role="img" aria-label="Sine trace with three plotted points" style="max-width: 32rem; margin: 0 auto;">
    <div class="nerv-wave nerv-wave-green">
      <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.2;"></span>
      <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.5;"></span>
      <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.8;"></span>
    </div>
  </div>
</div>

**Spec:** `.nerv-wave-point` inside a `.nerv-wave` sits at `--nerv-wave-point-at` (fraction of the box width, default `0.5`) and rides up and down on its trace. The trace and its points read one animated clock, so they stay together at every frame. `--nerv-wave-point-size` sets the dot (default `0.5rem`). Points take the wave's color and glow.

```html
<div class="nerv-wave-graph nerv-grid-marks" role="img" aria-label="Sine trace with three plotted points" style="max-width: 32rem; margin: 0 auto;">
  <div class="nerv-wave nerv-wave-green">
    <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.2;"></span>
    <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.5;"></span>
    <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.8;"></span>
  </div>
</div>
```

## Point labels

<div class="nerv-docs-island">
  <div class="nerv-wave-graph nerv-grid-marks" role="img" aria-label="Two waves with labeled points, EVA-02 and EVA-01" style="max-width: 32rem; margin: 0 auto;">
    <div class="nerv-wave nerv-wave-red">
      <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.3;"><span class="nerv-wave-point-label nerv-type-hud">EVA-02</span></span>
    </div>
    <div class="nerv-wave nerv-wave-blue" style="--nerv-wave-phase: 0.5;">
      <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.7;"><span class="nerv-wave-point-label nerv-wave-point-label-left nerv-type-hud">EVA-01</span></span>
    </div>
  </div>
</div>

**Spec:** A `.nerv-wave-point-label` inside a point is a text label beside its dot: to the right by default, to the left with `.nerv-wave-point-label-left`. It is placed from the dot's own position, so it moves with the dot and the dot keeps tracking the line. It takes the wave's color and glow; add `.nerv-type-hud` or your own type classes. `--nerv-wave-point-label-gap` sets the space between dot and label (default `0.35rem`). The label stays inside the box: near an edge or at the end of a swing it slides inward and can pass over its own dot for a moment. A label wider than the box pins to the left edge and is cut off on the right, so keep live values short. Labels on different waves overlap while they cross and separate again; that is intended, and there is no collision avoidance. The label is ordinary text, so a page script can rewrite it to show a live value (give the box an `id` and update the label's `textContent`). `role="img"` hides child text from screen readers, so a script that changes labels should keep the box's `aria-label` in step.

```html
<div class="nerv-wave-graph nerv-grid-marks" role="img" aria-label="Two waves with labeled points, EVA-02 and EVA-01" style="max-width: 32rem; margin: 0 auto;">
  <div class="nerv-wave nerv-wave-red">
    <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.3;"><span class="nerv-wave-point-label nerv-type-hud">EVA-02</span></span>
  </div>
  <div class="nerv-wave nerv-wave-blue" style="--nerv-wave-phase: 0.5;">
    <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.7;"><span class="nerv-wave-point-label nerv-wave-point-label-left nerv-type-hud">EVA-01</span></span>
  </div>
</div>
```

## Vertical

<div class="nerv-docs-island">
  <div class="nerv-wave-graph nerv-wave-graph-vertical" role="img" aria-label="Two vertical traces with labeled points, L-01 and R-02" style="width: 12rem; margin: 0 auto;">
    <div class="nerv-wave nerv-wave-cyan">
      <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.3;"><span class="nerv-wave-point-label nerv-wave-point-label-left nerv-type-hud">L-01</span></span>
    </div>
    <div class="nerv-wave nerv-wave-green" style="--nerv-wave-phase: 0.5; --nerv-wave-frequency: 0.35;">
      <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.7;"><span class="nerv-wave-point-label nerv-type-hud">R-02</span></span>
    </div>
  </div>
</div>

**Spec:** `.nerv-wave-graph-vertical` on the box swaps the axes. Traces travel bottom to top, points move side to side, and the default ratio turns portrait (`10 / 16`). Amplitude becomes a fraction of half the width, and wavelength and point position become fractions of the height. Labels still sit left or right of their dot; at the outer end of a swing they slide inward to stay in the box.

```html
<div class="nerv-wave-graph nerv-wave-graph-vertical" role="img" aria-label="Two vertical traces with labeled points, L-01 and R-02" style="width: 12rem; margin: 0 auto;">
  <div class="nerv-wave nerv-wave-cyan">
    <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.3;"><span class="nerv-wave-point-label nerv-wave-point-label-left nerv-type-hud">L-01</span></span>
  </div>
  <div class="nerv-wave nerv-wave-green" style="--nerv-wave-phase: 0.5; --nerv-wave-frequency: 0.35;">
    <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.7;"><span class="nerv-wave-point-label nerv-type-hud">R-02</span></span>
  </div>
</div>
```

## Alert speed

<div class="nerv-docs-island nerv-state-alert">
  <div class="nerv-wave-graph" role="img" aria-label="Sine traces at alert speed, one point labeled SYNC" style="max-width: 32rem; margin: 0 auto;">
    <div class="nerv-wave">
      <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.3;"><span class="nerv-wave-point-label nerv-type-hud">SYNC</span></span>
    </div>
    <div class="nerv-wave nerv-wave-cyan" style="--nerv-wave-phase: 0.5;"></div>
  </div>
</div>

**Spec:** This island sits under `.nerv-state-alert`. The alert states raise `--nerv-animation-speed`, so every wave cycles faster: 2× at alert, 3× at critical. The uncolored wave and its label turn red with `--nerv-primary`, and the cyan wave keeps its data color. Changing state mid-flight makes the waves jump once to a new position. `prefers-reduced-motion: reduce` stops the clock, and each wave holds at its phase with its points and labels still in place. `prefers-contrast: more` draws heavier traces, cuts the glow, rings points in `--nerv-bg`, and haloes labels in `--nerv-bg` so they stand off crossing lines.

```html
<div class="nerv-wave-graph" role="img" aria-label="Sine traces at alert speed, one point labeled SYNC" style="max-width: 32rem; margin: 0 auto;">
  <div class="nerv-wave">
    <span class="nerv-wave-point" style="--nerv-wave-point-at: 0.3;"><span class="nerv-wave-point-label nerv-type-hud">SYNC</span></span>
  </div>
  <div class="nerv-wave nerv-wave-cyan" style="--nerv-wave-phase: 0.5;"></div>
</div>
```
