# Bar meters

Discrete bars. Fill is a percentage. CSS paints hand-authored `.nerv-bar-meter-bar` children marked with `.nerv-bar-active`. By adding JavaScript you can [build those children from `data-bars` / `data-fill`](../../javascript/atoms/bar-meters.md).

![Segmented bar indicator](../../../img/bar-meters.png)

## Horizontal

<div class="nerv-docs-island">
  <p class="nerv-type-hud" style="color: var(--nerv-amber);">SUBJECT 00</p>
  <div class="nerv-bar-meter nerv-bar-thermal">
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar"></div>
  </div>
</div>

**Spec:** `.nerv-bar-meter` is a flex row of `.nerv-bar-meter-bar`. `.nerv-bar-active` is the filled prefix.

```html
<p class="nerv-type-hud" style="color: var(--nerv-amber);">SUBJECT 00</p>
<div class="nerv-bar-meter nerv-bar-thermal">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

## Vertical

<div class="nerv-docs-island">
  <div class="nerv-bar-meter nerv-bar-meter-vertical nerv-bar-thermal" style="height: 8rem;">
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar"></div>
  </div>
</div>

**Spec:** `.nerv-bar-meter-vertical` is `flex-direction: column-reverse`. Zone labels sit to the right of the bar.

```html
<div class="nerv-bar-meter nerv-bar-meter-vertical nerv-bar-thermal" style="height: 8rem;">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

## Zone

<div class="nerv-docs-island">
  <div class="nerv-bar-meter nerv-bar-thermal">
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active" data-zone="HOT"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar"></div>
  </div>
</div>

**Spec:** `data-zone` on a bar paints a tick label via `::after`.

```html
<div class="nerv-bar-meter nerv-bar-thermal">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active" data-zone="HOT"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

## Thermal

<div class="nerv-docs-island">
  <div class="nerv-bar-meter nerv-bar-thermal">
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar"></div>
  </div>
</div>

**Spec:** `.nerv-bar-thermal` is green→red. Or set `--nerv-bar-from` / `--nerv-bar-to` yourself.

```html
<div class="nerv-bar-meter nerv-bar-thermal">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

## Energy

<div class="nerv-docs-island">
  <div class="nerv-bar-meter nerv-bar-energy">
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar"></div>
  </div>
</div>

**Spec:** `.nerv-bar-energy` is cyan→blue.

```html
<div class="nerv-bar-meter nerv-bar-energy">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

## Warning

<div class="nerv-docs-island">
  <div class="nerv-bar-meter nerv-bar-warning">
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar"></div>
  </div>
</div>

**Spec:** `.nerv-bar-warning` is amber→red.

```html
<div class="nerv-bar-meter nerv-bar-warning">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```

## Field

<div class="nerv-docs-island">
  <div class="nerv-bar-meter nerv-bar-field">
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar nerv-bar-active"></div>
    <div class="nerv-bar-meter-bar"></div>
  </div>
</div>

**Spec:** `.nerv-bar-field` is void→amber.

```html
<div class="nerv-bar-meter nerv-bar-field">
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar nerv-bar-active"></div>
  <div class="nerv-bar-meter-bar"></div>
</div>
```
