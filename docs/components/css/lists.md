# Lists

Angled pillbox items. The host is `<ul class="nerv-list">` (or `<ol>`). Child `<li>` elements pick up the shape. Filler is the same four systems on every variant. There is no JavaScript hook.

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
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

## Rectangle

Shape classes are mutually exclusive.

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-rect` is a rectangle.

```html
<ul class="nerv-list nerv-list-rect">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

## Arrow

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-arrow">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-arrow` points left.

```html
<ul class="nerv-list nerv-list-arrow">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

## Arrow reverse

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-arrow-reverse">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-arrow-reverse` points right.

```html
<ul class="nerv-list nerv-list-arrow-reverse">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

## Parallelogram

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-para">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-para` is a parallelogram via `skewX`.

```html
<ul class="nerv-list nerv-list-para">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

## Bordered

Fill classes are mutually exclusive. Shown on rect so borders survive `clip-path`. Default fill is translucent.

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect nerv-list-bordered">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-bordered` adds a phosphor border. Borders clip away on hex and arrow; they survive on rect and para.

```html
<ul class="nerv-list nerv-list-rect nerv-list-bordered">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

## Outline

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect nerv-list-outline">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-outline` is border only.

```html
<ul class="nerv-list nerv-list-rect nerv-list-outline">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

## Solid

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect nerv-list-solid">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-solid` is opaque.

```html
<ul class="nerv-list nerv-list-rect nerv-list-solid">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

## Angled

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect nerv-list-angled">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-angled` pivots each item −45°. Nesting inside rotated lists is unsupported.

```html
<ul class="nerv-list nerv-list-rect nerv-list-angled">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

## Angled reverse

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect nerv-list-angled-reverse">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

**Spec:** `.nerv-list-angled-reverse` pivots +45°.

```html
<ul class="nerv-list nerv-list-rect nerv-list-angled-reverse">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

## Nested

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
</div>

**Spec:** nest a `<ul class="nerv-list">` inside an `<li>`. Default nested lists indent.

```html
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
```

## Contained

<div class="nerv-docs-island">
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

**Spec:** `.nerv-list-contained` on the nested list makes the parent shape wrap the children.

```html
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
```

## Cyan

`.nerv-list-{name}` exists for every [glow color](index.md#glow-colors).

<div class="nerv-docs-island">
  <ul class="nerv-list nerv-list-rect nerv-list-cyan">
    <li>Life Support</li>
    <li>Power Grid</li>
    <li>LCL Circulation</li>
    <li>Comm Array</li>
  </ul>
</div>

```html
<ul class="nerv-list nerv-list-rect nerv-list-cyan">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

[Swatch board](../../boards/lists.html)
