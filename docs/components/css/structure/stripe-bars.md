# Stripe bars

Hard-stop two-tone chevrons. Bright band is the stripe color at full opacity. Dark band is `--nerv-bg` or fully transparent — no in-between alpha. There is no JavaScript hook.

![Hazard chevron striping](../../../img/stripe-bars.png)

## Horizontal

```html island
<div class="nerv-stripe" style="height: 0.75rem;"></div>
```

**Spec:** `.nerv-stripe` is a horizontal bar. `--nerv-stripe-width` is the band width. `--nerv-stripe-color-rgb` defaults to `--nerv-primary-rgb`.

## Vertical

```html island
<div class="nerv-stripe nerv-stripe-vertical" style="height: 6rem; width: 0.75rem;"></div>
```

**Spec:** `.nerv-stripe-vertical` turns the bands 90°.

## Red

`.nerv-stripe-{name}` exists for every [glow color](../core/colors.md#glow-colors).

```html island
<div class="nerv-stripe nerv-stripe-red" style="height: 0.75rem;"></div>
```

## Transparent

```html island
<div class="nerv-stripe nerv-stripe-transparent" style="height: 0.75rem;"></div>
```

**Spec:** `.nerv-stripe-transparent` makes the dark band see-through.

## Animated

```html island
<div class="nerv-stripe nerv-stripe-animated" style="height: 0.75rem;"></div>
```

**Spec:** `.nerv-stripe-animated` scrolls via barberpole (`background-size: 200%` + position shift). `--nerv-stripe-duration` is the cycle.
