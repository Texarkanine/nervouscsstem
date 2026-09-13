# Lists

Angled pillbox items. The host is `<ul class="nerv-list">` (or `<ol>`). Child `<li>` elements pick up the shape. Filler is the same four systems on every variant.

## Default hex

<div class="nerv-docs-island">
  <ul class="nerv-list">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list` without a shape class is hex: symmetric pointed ends via `clip-path`. `--nerv-list-color` defaults to `--nerv-primary`.

```html
<ul class="nerv-list">
  <li>Life Support</li>
  <li>Power Grid</li>
</ul>
```

## Shapes

Shape classes are mutually exclusive. Same filler.

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
  <ul class="nerv-list nerv-list-arrow">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
  <ul class="nerv-list nerv-list-arrow-reverse">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
  <ul class="nerv-list nerv-list-para">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-rect` is a rectangle. `.nerv-list-arrow` points left. `.nerv-list-arrow-reverse` points right. `.nerv-list-para` is a parallelogram via `skewX`.

```html
<ul class="nerv-list nerv-list-rect">…</ul>
<ul class="nerv-list nerv-list-arrow">…</ul>
<ul class="nerv-list nerv-list-arrow-reverse">…</ul>
<ul class="nerv-list nerv-list-para">…</ul>
```

## Fill

Fill classes are mutually exclusive. Shown on rect so borders survive `clip-path`. Same filler.

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect nerv-list-bordered">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
  <ul class="nerv-list nerv-list-rect nerv-list-outline">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
  <ul class="nerv-list nerv-list-rect nerv-list-solid">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** default fill is translucent. `.nerv-list-bordered` adds a phosphor border. `.nerv-list-outline` is border only. `.nerv-list-solid` is opaque. Borders clip away on hex and arrow; they survive on rect and para.

## Rotation

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect nerv-list-angled">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
  <ul class="nerv-list nerv-list-rect nerv-list-angled-reverse">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-angled` pivots each item −45°. `.nerv-list-angled-reverse` pivots +45°. Nesting inside rotated lists is unsupported.

## Nesting

Same four systems; Power Grid contains two districts.

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect">
    <li>Life Support</li>
    <li>Power Grid
      <ul class="nerv-list nerv-list-rect">
        <li>District 01</li>
        <li>District 02</li>
      </ul>
    </li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
  <ul class="nerv-list nerv-list-rect">
    <li>Life Support</li>
    <li>Power Grid
      <ul class="nerv-list nerv-list-rect nerv-list-contained">
        <li>District 01</li>
        <li>District 02</li>
      </ul>
    </li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** nest a `<ul class="nerv-list">` inside an `<li>`. Default nested lists indent. `.nerv-list-contained` on the nested list makes the parent shape wrap the children.

## Modifier classes

Color variants are `.nerv-list-{name}` for glow-flagged tokens. One example.

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect nerv-list-cyan">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

[Swatch board](../boards/lists.html)
