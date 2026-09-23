# Grid marks

SVG data-URI registration grids, tiled as `background-image`. Density is `background-size`. Put them on a sized box. CSS paints the grid. By adding JavaScript you can [label the axes](../../javascript/structure/grid-marks.md).

![Registration grid overlay](../../../img/grid-marks.png)

## Plus

<div class="nerv-docs-island">
  <div class="nerv-grid-marks" style="height: 10rem;"></div>
</div>

**Spec:** `.nerv-grid-marks` is the `+` crosshair grid.

```html
<div class="nerv-grid-marks" style="height: 10rem;"></div>
```

## Rotated

<div class="nerv-docs-island">
  <div class="nerv-grid-marks-x" style="height: 10rem;"></div>
</div>

**Spec:** `.nerv-grid-marks-x` is discrete `×` marks at each grid point.

```html
<div class="nerv-grid-marks-x" style="height: 10rem;"></div>
```

## Hex

<div class="nerv-docs-island">
  <div class="nerv-grid-marks-hex" style="height: 10rem;"></div>
</div>

**Spec:** `.nerv-grid-marks-hex` is a flat-top honeycomb tile.

```html
<div class="nerv-grid-marks-hex" style="height: 10rem;"></div>
```

## Cyan

`.nerv-grid-marks-{name}`, `.nerv-grid-marks-x-{name}`, and `.nerv-grid-marks-hex-{name}` exist for every [glow color](../core/colors.md#glow-colors).

<div class="nerv-docs-island">
  <div class="nerv-grid-marks-cyan" style="height: 10rem;"></div>
</div>

```html
<div class="nerv-grid-marks-cyan" style="height: 10rem;"></div>
```
