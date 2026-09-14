# Gradients

Linear-gradient fills. CSS sets the stops. There is no JavaScript hook.

## Base

<div class="nerv-docs-island">
  <div class="nerv-gradient" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient` goes from `--nerv-primary-rgb` to `--nerv-bg-rgb`. `--nerv-gradient-direction` defaults to `to right`. `--nerv-gradient-opacity` defaults to 1.

```html
<div class="nerv-gradient"></div>
```

## Thermal

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-thermal" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-thermal` is green→red.

```html
<div class="nerv-gradient nerv-gradient-thermal"></div>
```

## Energy

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-energy" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-energy` is cyan→blue.

```html
<div class="nerv-gradient nerv-gradient-energy"></div>
```

## Warning

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-warning" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-warning` is amber→red.

```html
<div class="nerv-gradient nerv-gradient-warning"></div>
```

## Field

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-field" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-field` is void→amber.

```html
<div class="nerv-gradient nerv-gradient-field"></div>
```

## Rainbow

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-rainbow" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-rainbow` is a multi-stop hue sweep.

```html
<div class="nerv-gradient nerv-gradient-rainbow"></div>
```

## From / to

Composable endpoints. `.nerv-gradient-from-{name}` and `.nerv-gradient-to-{name}` exist for every [glow color](index.md#glow-colors).

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-from-cyan nerv-gradient-to-red" style="height: 4rem;"></div>
</div>

```html
<div class="nerv-gradient nerv-gradient-from-cyan nerv-gradient-to-red"></div>
```
