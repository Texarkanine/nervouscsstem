# Lists

Angled pillbox items. The host is `<ul class="nerv-list">` (or `<ol>`). Child `<li>` elements pick up the shape. Filler is the same four systems on every variant. There is no JavaScript hook.

## Default hex

```html island
<ul class="nerv-list">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

**Spec:** `.nerv-list` without a shape class is hex: symmetric pointed ends via `clip-path`. `--nerv-list-color` defaults to `--nerv-primary`.

## Rectangle

Shape classes are mutually exclusive.

```html island
<ul class="nerv-list nerv-list-rect">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

**Spec:** `.nerv-list-rect` is a rectangle.

## Arrow

```html island
<ul class="nerv-list nerv-list-arrow">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

**Spec:** `.nerv-list-arrow` points left.

## Arrow reverse

```html island
<ul class="nerv-list nerv-list-arrow-reverse">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

**Spec:** `.nerv-list-arrow-reverse` points right.

## Parallelogram

```html island
<ul class="nerv-list nerv-list-para">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

**Spec:** `.nerv-list-para` is a parallelogram via `skewX`.

## Bordered

Fill classes are mutually exclusive. Shown on rect so borders survive `clip-path`. Default fill is translucent.

```html island
<ul class="nerv-list nerv-list-rect nerv-list-bordered">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

**Spec:** `.nerv-list-bordered` adds a phosphor border. Borders clip away on hex and arrow; they survive on rect and para.

## Outline

```html island
<ul class="nerv-list nerv-list-rect nerv-list-outline">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

**Spec:** `.nerv-list-outline` is border only.

## Solid

```html island
<ul class="nerv-list nerv-list-rect nerv-list-solid">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

**Spec:** `.nerv-list-solid` is opaque.

## Angled

```html island
<ul class="nerv-list nerv-list-rect nerv-list-angled">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

**Spec:** `.nerv-list-angled` pivots each item −45°. Nesting inside rotated lists is unsupported.

## Angled reverse

```html island
<ul class="nerv-list nerv-list-rect nerv-list-angled-reverse">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

**Spec:** `.nerv-list-angled-reverse` pivots +45°.

## Nested

Same four systems; Power Grid contains two districts.

```html island
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

**Spec:** nest a `<ul class="nerv-list">` inside an `<li>`. Default nested lists indent.

## Contained

```html island
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

**Spec:** `.nerv-list-contained` on the nested list makes the parent shape wrap the children.

## Cyan

`.nerv-list-{name}` exists for every [glow color](../core/colors.md#glow-colors).

```html island
<ul class="nerv-list nerv-list-rect nerv-list-cyan">
  <li>Life Support</li>
  <li>Power Grid</li>
  <li>LCL Circulation</li>
  <li>Comm Array</li>
</ul>
```

[Swatch board](../../../boards/lists.html)
