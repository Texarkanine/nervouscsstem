# Tables

Phosphor-outline tables. Fill, geometry, and color follow the same language as lists. Filler is the same three Eva rows on every variant.

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
</table>
```

## Fill

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-bordered">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
  <table class="nerv-table nerv-table-outline">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
  <table class="nerv-table nerv-table-solid">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

**Spec:** `.nerv-table-bordered` is translucent fill plus phosphor cell borders. `.nerv-table-outline` is border only. `.nerv-table-solid` is opaque fill. `.nerv-table-borderless` removes the container border and glow.

## Geometry

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-para">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
  <table class="nerv-table nerv-table-borderless nerv-table-triangle">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

**Spec:** `.nerv-table-para` skews cells. `.nerv-table-triangle` clips alternating up/down triangles (use with `.nerv-table-borderless`; clip-path eats borders). `.nerv-table-uniform` stops alternating direction. `.nerv-table-ruled` (alias `.nerv-table-dark-border`) draws rule lines between cells.

```html
<table class="nerv-table nerv-table-para nerv-table-ruled">…</table>
<table class="nerv-table nerv-table-borderless nerv-table-triangle">…</table>
```

## Modifier classes

`.nerv-table-{name}` for glow-flagged tokens. One example. You can also put a color class on a `<td>` or `<tr>`.

<div class="nerv-docs-island">
  <table class="nerv-table nerv-table-cyan">
    <tr><th>Unit</th><th>Status</th><th>Sync</th></tr>
    <tr><td>EVA-01</td><td>Online</td><td>98.2%</td></tr>
    <tr><td>EVA-02</td><td>Online</td><td>72.1%</td></tr>
    <tr><td>EVA-00</td><td>Standby</td><td>88.7%</td></tr>
  </table>
</div>

[Swatch board](../boards/tables.html)
