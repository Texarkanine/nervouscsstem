# Cartouches

A single-color bordered rectangle around a status word. CSS flex sizes to the text. By adding JavaScript you can [stretch text to a fixed box](../../javascript/atoms/cartouches.md).

![Status cartouche](../../../img/cartouches.png)

## Flex

<div class="nerv-docs-island">
  <span class="nerv-cartouche">IDENTIFIED</span>
</div>

**Spec:** `.nerv-cartouche` is `inline-flex`. Font is NERV Cartouche (Antonio + Shippori). Color follows `--nerv-cartouche-color` (default `--nerv-primary`).

```html
<span class="nerv-cartouche">IDENTIFIED</span>
```

## Red

`.nerv-cartouche-{name}` exists for every [glow color](../core/colors.md#glow-colors).

<div class="nerv-docs-island">
  <span class="nerv-cartouche nerv-cartouche-red">IDENTIFIED</span>
</div>

```html
<span class="nerv-cartouche nerv-cartouche-red">IDENTIFIED</span>
```

## Glow

Glow is a separate class. Pair any cartouche with `.nerv-glow-{name}` or `.nerv-glow-drop-{name}`.

<div class="nerv-docs-island">
  <span class="nerv-cartouche nerv-cartouche-red nerv-glow-red">IDENTIFIED</span>
</div>

```html
<span class="nerv-cartouche nerv-cartouche-red nerv-glow-red">IDENTIFIED</span>
```
