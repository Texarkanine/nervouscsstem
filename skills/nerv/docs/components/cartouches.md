# Cartouches

A single-color bordered rectangle around a status word. Flex sizes to the text. Fixed uses JS to stretch text to the box. Table mode is a `<table>` inside a fixed cartouche.

![Status cartouche](../img/cartouches.png)

## Flex

<div class="nerv-docs-island">
  <span class="nerv-cartouche">IDENTIFIED</span>
</div>

**Spec:** `.nerv-cartouche` is `inline-flex`. Font is NERV Cartouche (Antonio + Shippori). Color follows `--nerv-cartouche-color` (default `--nerv-primary`).

```html
<span class="nerv-cartouche">IDENTIFIED</span>
```

## Fixed

Island opts in with `data-nerv-init="cartouches"`. `docs-init.js` calls `NERV.initCartouches(island)` only.

<div class="nerv-docs-island" data-nerv-init="cartouches">
  <span class="nerv-cartouche nerv-cartouche-fixed" style="width: 180px; height: 36px;"><span>IDENTIFIED</span></span>
</div>

**Spec:** `.nerv-cartouche-fixed` needs explicit width/height and one inner element. JS sets `--nerv-cartouche-sx` / `--nerv-cartouche-sy` / `--nerv-cartouche-ty` after fonts load.

```html
<span class="nerv-cartouche nerv-cartouche-fixed" style="width: 180px; height: 36px;"><span>IDENTIFIED</span></span>
<script>
  NERV.initCartouches(document.getElementById('cartouches'));
</script>
```

## Table mode

Same status word, two cells.

<div class="nerv-docs-island" data-nerv-init="cartouches">
  <span class="nerv-cartouche nerv-cartouche-fixed" style="width: 240px; height: 36px;">
    <table><tr><td>IDENTIFIED</td><td>17th ANGEL</td></tr></table>
  </span>
</div>

**Spec:** a raw `<table>` child of `.nerv-cartouche-fixed` enables per-cell scaling. Each `<td>` is measured independently.

```html
<span class="nerv-cartouche nerv-cartouche-fixed" style="width: 240px; height: 36px;">
  <table><tr><td>IDENTIFIED</td><td>17th ANGEL</td></tr></table>
</span>
```

## Modifier classes

`.nerv-cartouche-{name}` for glow-flagged tokens. One example. Glow is a separate class.

<div class="nerv-docs-island">
  <span class="nerv-cartouche nerv-cartouche-red">IDENTIFIED</span>
  <span class="nerv-cartouche nerv-cartouche-red nerv-glow-red">IDENTIFIED</span>
</div>
