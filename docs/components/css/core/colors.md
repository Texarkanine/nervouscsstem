# Colors

Two kinds of token, both on `:root`.

**Ambiance** (`--nerv-primary`, `--nerv-bg`) follows the [alert cascade](alert-cascade.md). Chromium that should shift with mood uses these.

**Named data** (`--nerv-green`, `--nerv-cyan`, `--nerv-red`, …) never moves. Put factual color on named tokens so a hex cell still reads as danger when the viewport goes red.

## Ambiance

<div class="nerv-docs-island">
  <p class="nerv-type-hud" style="color: var(--nerv-primary);">AMBIANCE --nerv-primary</p>
</div>

**Spec:** `--nerv-primary` defaults to `--nerv-amber`. `--nerv-bg` defaults to `--nerv-void`.

```html
<p class="nerv-type-hud" style="color: var(--nerv-primary);">AMBIANCE --nerv-primary</p>
```

## Named data

<div class="nerv-docs-island">
  <p class="nerv-type-hud" style="color: var(--nerv-green);">DATA --nerv-green</p>
</div>

```html
<p class="nerv-type-hud" style="color: var(--nerv-green);">DATA --nerv-green</p>
```

## Glow colors

Most named colors also generate modifier classes: `.nerv-glow-cyan`, `.nerv-text-cyan`, `.nerv-divider-cyan`, `.nerv-list-cyan`, and the same `{name}` on stripes, tables, forms, cartouches, reticles, grid marks, and gradient from/to. Those names are **amber, amber-dark, orange, red, red-deep, green, cyan, blue, steel**.

**Void** and **white** exist as `--nerv-void` / `--nerv-white` but do not get those classes — no phosphor bloom on black or paper white.

When a family page says a class exists “for every glow color,” it means that amber-through-steel list, not void or white.

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-text-cyan">.nerv-text-cyan</p>
</div>

```html
<p class="nerv-type-hud nerv-text-cyan">.nerv-text-cyan</p>
```

## Gradients

Linear-gradient fills. CSS sets the stops. There is no JavaScript hook.

### Base

<div class="nerv-docs-island">
  <div class="nerv-gradient" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient` goes from `--nerv-primary-rgb` to `--nerv-bg-rgb`. `--nerv-gradient-direction` defaults to `to right`. `--nerv-gradient-opacity` defaults to 1.

```html
<div class="nerv-gradient" style="height: 4rem;"></div>
```

### Thermal

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-thermal" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-thermal` is green→red.

```html
<div class="nerv-gradient nerv-gradient-thermal" style="height: 4rem;"></div>
```

### Energy

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-energy" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-energy` is cyan→blue.

```html
<div class="nerv-gradient nerv-gradient-energy" style="height: 4rem;"></div>
```

### Warning

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-warning" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-warning` is amber→red.

```html
<div class="nerv-gradient nerv-gradient-warning" style="height: 4rem;"></div>
```

### Field

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-field" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-field` is void→amber.

```html
<div class="nerv-gradient nerv-gradient-field" style="height: 4rem;"></div>
```

### Rainbow

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-rainbow" style="height: 4rem;"></div>
</div>

**Spec:** `.nerv-gradient-rainbow` is a multi-stop hue sweep.

```html
<div class="nerv-gradient nerv-gradient-rainbow" style="height: 4rem;"></div>
```

### From / to

Composable endpoints. `.nerv-gradient-from-{name}` and `.nerv-gradient-to-{name}` exist for every [glow color](#glow-colors).

<div class="nerv-docs-island">
  <div class="nerv-gradient nerv-gradient-from-cyan nerv-gradient-to-red" style="height: 4rem;"></div>
</div>

```html
<div class="nerv-gradient nerv-gradient-from-cyan nerv-gradient-to-red" style="height: 4rem;"></div>
```

[Swatch board](../../../boards/foundation.html)
