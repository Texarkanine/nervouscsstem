# Gradients

Linear-gradient fills. The base class follows ambiance tokens. Presets and from/to classes pin to named data tokens.

## Base

<div class="nerv-docs-island">
  <div class="nerv-gradient" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient` goes from `--nerv-primary-rgb` to `--nerv-bg-rgb`. `--nerv-gradient-direction` defaults to `to right`. `--nerv-gradient-opacity` defaults to 1.

```html
<div class="nerv-gradient"></div>
```

## Presets

Same box, one class per preset.

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-thermal" style="height: 4rem;"></div>
  <div class="nerv-gradient nerv-gradient-energy" style="height: 4rem;"></div>
  <div class="nerv-gradient nerv-gradient-warning" style="height: 4rem;"></div>
  <div class="nerv-gradient nerv-gradient-field" style="height: 4rem;"></div>
  <div class="nerv-gradient nerv-gradient-rainbow" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-thermal` green→red. `.nerv-gradient-energy` cyan→blue. `.nerv-gradient-warning` amber→red. `.nerv-gradient-field` void→amber. `.nerv-gradient-rainbow` is a multi-stop hue sweep.

## Modifier classes

Composable endpoints. One from, one to.

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-from-cyan nerv-gradient-to-red" style="height: 4rem;"></div>
</div>

```html
<div class="nerv-gradient nerv-gradient-from-cyan nerv-gradient-to-red"></div>
```
