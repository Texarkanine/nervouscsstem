# Grid marks

SVG data-URI registration grids, tiled as `background-image`. Density is `background-size`. Put them on a sized box.

![Registration grid overlay](../img/grid-marks.png)

## Plus

<div class="nerv-docs-island">
  <div class="nerv-grid-marks" style="height: 10rem;"></div>
</div>

**Spec:** `.nerv-grid-marks` is the `+` crosshair grid.

```html
<div class="nerv-grid-marks"></div>
```

## Rotated

<div class="nerv-docs-island">
  <div class="nerv-grid-marks-x" style="height: 10rem;"></div>
</div>

**Spec:** `.nerv-grid-marks-x` is discrete `×` marks at each grid point.

```html
<div class="nerv-grid-marks-x"></div>
```

## Hex

<div class="nerv-docs-island">
  <div class="nerv-grid-marks-hex" style="height: 10rem;"></div>
</div>

**Spec:** `.nerv-grid-marks-hex` is a flat-top honeycomb tile.

```html
<div class="nerv-grid-marks-hex"></div>
```

## Axis labels

`NERV.initGridLabels(container)` injects numeric labels along the bottom and left. Docs islands use `data-nerv-init="grid-labels"`. The host must be positioned; JS sets `position: relative` if it is static.

<div class="nerv-docs-island" data-nerv-init="grid-labels">
  <div class="nerv-grid-marks" style="height: 10rem; margin: 0 2.5rem 1.5rem;"></div>
</div>

```html
<div class="nerv-grid-marks"></div>
<script>
  NERV.initGridLabels(document.querySelector('.nerv-grid-marks'));
</script>
```

## Modifier classes

`.nerv-grid-marks-{name}`, `.nerv-grid-marks-x-{name}`, `.nerv-grid-marks-hex-{name}` for glow-flagged tokens. One example.

<div class="nerv-docs-island">
  <div class="nerv-grid-marks-cyan" style="height: 10rem;"></div>
</div>
