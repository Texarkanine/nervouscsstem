# Tables

Phosphor-outline tables. Fill, geometry, and color follow the same language as lists. Filler is the same three Eva rows on every variant. There is no JavaScript hook.

## Default

<div class="nerv-docs-island">
  <table class="nerv-table">
    <thead>
      <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    </thead>
    <tbody>
      <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
      <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
      <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
    </tbody>
  </table>
</div>

**Spec:** `.nerv-table` is the container. Cells inherit `--nerv-table-color` (default `--nerv-primary`).

```html
<table class="nerv-table">
  <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
  <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
  <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
  <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
</table>
```

## Bordered

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-bordered">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

**Spec:** `.nerv-table-bordered` is translucent fill plus phosphor cell borders.

```html
<table class="nerv-table nerv-table-bordered">
  <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
  <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
  <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
  <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
</table>
```

## Outline

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-outline">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

**Spec:** `.nerv-table-outline` is border only.

```html
<table class="nerv-table nerv-table-outline">
  <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
  <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
  <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
  <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
</table>
```

## Solid

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-solid">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

**Spec:** `.nerv-table-solid` is opaque fill.

```html
<table class="nerv-table nerv-table-solid">
  <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
  <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
  <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
  <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
</table>
```

## Borderless

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-borderless">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

**Spec:** `.nerv-table-borderless` removes the container border and glow.

```html
<table class="nerv-table nerv-table-borderless">
  <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
  <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
  <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
  <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
</table>
```

## Parallelogram

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-para">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

**Spec:** `.nerv-table-para` skews cells.

```html
<table class="nerv-table nerv-table-para">
  <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
  <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
  <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
  <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
</table>
```

## Triangle

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-borderless nerv-table-triangle">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

**Spec:** `.nerv-table-triangle` clips alternating up/down triangles. Use with `.nerv-table-borderless`; clip-path eats borders.

```html
<table class="nerv-table nerv-table-borderless nerv-table-triangle">
  <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
  <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
  <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
  <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
</table>
```

## Ruled

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-para nerv-table-ruled">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

**Spec:** `.nerv-table-ruled` (alias `.nerv-table-dark-border`) draws rule lines between cells.

```html
<table class="nerv-table nerv-table-para nerv-table-ruled">
  <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
  <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
  <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
  <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
</table>
```

## Uniform

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-para nerv-table-uniform">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

**Spec:** `.nerv-table-uniform` stops para/triangle from alternating direction.

```html
<table class="nerv-table nerv-table-para nerv-table-uniform">
  <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
  <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
  <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
  <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
</table>
```

## Cyan

`.nerv-table-{name}` exists for every [glow color](index.md#glow-colors). You can also put a color class on a `<td>` or `<tr>`.

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-cyan">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

```html
<table class="nerv-table nerv-table-cyan">
  <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
  <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
  <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
  <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
</table>
```

[Swatch board](../../boards/tables.html)
