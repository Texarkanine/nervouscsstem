# Bar meters

Discrete bars. Fill is a percentage. CSS paints hand-authored `.nerv-bar-meter-bar` children marked with `.nerv-bar-active`. By adding JavaScript you can [build those children from `data-bars` / `data-fill`](../../javascript/atoms/bar-meters.md).

![Segmented bar indicator](../../../img/bar-meters.png)

## Horizontal

```html island
<p class="nerv-type-hud" style="color: var(--nerv-amber);">SUBJECT 00</p>
<div class="nerv-bar-meter nerv-bar-thermal">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

**Spec:** `.nerv-bar-meter` is a flex row of `.nerv-bar-meter-bar`. `.nerv-bar-active` is the filled prefix.

## Vertical

```html island
<div class="nerv-bar-meter nerv-bar-meter-vertical nerv-bar-thermal" style="height: 8rem;">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

**Spec:** `.nerv-bar-meter-vertical` is `flex-direction: column-reverse`. Zone labels sit to the right of the bar.

## Zone

```html island
<div class="nerv-bar-meter nerv-bar-thermal">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active" data-zone="HOT"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

**Spec:** `data-zone` on a bar paints a tick label via `::after`.

## Thermal

```html island
<div class="nerv-bar-meter nerv-bar-thermal">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

**Spec:** `.nerv-bar-thermal` is green→red. Or set `--nerv-bar-from` / `--nerv-bar-to` yourself.

## Energy

```html island
<div class="nerv-bar-meter nerv-bar-energy">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

**Spec:** `.nerv-bar-energy` is cyan→blue.

## Warning

```html island
<div class="nerv-bar-meter nerv-bar-warning">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

**Spec:** `.nerv-bar-warning` is amber→red.

## Field

```html island
<div class="nerv-bar-meter nerv-bar-field">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

**Spec:** `.nerv-bar-field` is void→amber.
