# Stripe bars

Hard-stop two-tone chevrons. Bright band is the stripe color at full opacity. Dark band is `--nerv-bg` or fully transparent — no in-between alpha. There is no JavaScript hook.

![Hazard chevron striping](../../../img/stripe-bars.png)

## Horizontal

<div class="nerv-docs-island">
  <div class="nerv-stripe" style="height: 0.75rem;"></div>
</div>

**Spec:** `.nerv-stripe` is a horizontal bar. `--nerv-stripe-width` is the band width. `--nerv-stripe-color-rgb` defaults to `--nerv-primary-rgb`.

```html
<div class="nerv-stripe"></div>
```

## Vertical

<div class="nerv-docs-island">
  <div class="nerv-stripe nerv-stripe-vertical" style="height: 6rem; width: 0.75rem;"></div>
</div>

**Spec:** `.nerv-stripe-vertical` turns the bands 90°.

```html
<div class="nerv-stripe nerv-stripe-vertical"></div>
```

## Red

`.nerv-stripe-{name}` exists for every [glow color](../core/colors.md#glow-colors).

<div class="nerv-docs-island">
  <div class="nerv-stripe nerv-stripe-red" style="height: 0.75rem;"></div>
</div>

```html
<div class="nerv-stripe nerv-stripe-red"></div>
```

## Transparent

<div class="nerv-docs-island">
  <div class="nerv-stripe nerv-stripe-transparent" style="height: 0.75rem;"></div>
</div>

**Spec:** `.nerv-stripe-transparent` makes the dark band see-through.

```html
<div class="nerv-stripe nerv-stripe-transparent"></div>
```

## Animated

<div class="nerv-docs-island">
  <div class="nerv-stripe nerv-stripe-animated" style="height: 0.75rem;"></div>
</div>

**Spec:** `.nerv-stripe-animated` scrolls via barberpole (`background-size: 200%` + position shift). `--nerv-stripe-duration` is the cycle.

```html
<div class="nerv-stripe nerv-stripe-animated"></div>
```
