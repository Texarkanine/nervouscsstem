# Panels

Four CSS-only frame variants. Override color with `--nerv-panel-color` / `--nerv-panel-color-rgb`. Filler is the same three telemetry lines on every variant. There is no JavaScript hook.

![Video feed frame](../../../img/panels.png)

## Basic

<div class="nerv-docs-island">
  <div class="nerv-panel">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-panel` is the bordered box. Background is `--nerv-bg`. Glow follows `--nerv-panel-color`.

```html
<div class="nerv-panel">
  <p class="nerv-type-data">CORE_TEMP: 227.4°C</p>
</div>
```

## Titled

<div class="nerv-docs-island">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-panel-titled` draws a title bar from `data-title`. Extra top padding leaves room for the bar.

```html
<div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
  <p class="nerv-type-data">CORE_TEMP: 227.4°C</p>
</div>
```

## Double

<div class="nerv-docs-island">
  <div class="nerv-panel-double">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-panel-double` adds a second ring with `outline` and `outline-offset`.

```html
<div class="nerv-panel-double">
  <p class="nerv-type-data">CORE_TEMP: 227.4°C</p>
</div>
```

## Inset

<div class="nerv-docs-island">
  <div class="nerv-panel-inset">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-panel-inset` is the recessed variant. Inset shadow and glow are one `box-shadow` declaration so they do not overwrite each other.

```html
<div class="nerv-panel-inset">
  <p class="nerv-type-data">CORE_TEMP: 227.4°C</p>
</div>
```

## Cyan

Color is a custom property, not a generated class.

<div class="nerv-docs-island">
  <div class="nerv-panel" style="--nerv-panel-color: var(--nerv-cyan); --nerv-panel-color-rgb: var(--nerv-cyan-rgb);">
    <p class="nerv-type-data" style="color: var(--nerv-cyan); font-size: 0.75rem;">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

```html
<div class="nerv-panel" style="--nerv-panel-color: var(--nerv-cyan); --nerv-panel-color-rgb: var(--nerv-cyan-rgb);">
  <p class="nerv-type-data">CORE_TEMP: 227.4°C</p>
</div>
```

## Glow

Glow is a separate class. Pair any panel with `.nerv-glow-{name}`.

<div class="nerv-docs-island">
  <div class="nerv-panel nerv-glow-cyan">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

```html
<div class="nerv-panel nerv-glow-cyan">
  <p class="nerv-type-data">CORE_TEMP: 227.4°C</p>
</div>
```

## Dividers

Zone-separator rules. Color follows `--nerv-primary` unless a variant class is set. There is no JavaScript hook.

### Horizontal

<div class="nerv-docs-island">
  <div class="nerv-divider"></div>
</div>

**Spec:** `.nerv-divider` is a horizontal rule. Thickness is `--nerv-border-width`. Glow uses the glow mixin.

```html
<div class="nerv-divider"></div>
```

### Vertical

<div class="nerv-docs-island">
  <div class="nerv-divider nerv-divider-vertical" style="height: 6rem;"></div>
</div>

**Spec:** `.nerv-divider-vertical` is the upright rule. Give it a height.

```html
<div class="nerv-divider nerv-divider-vertical"></div>
```

### Cyan

`.nerv-divider-{name}` exists for every [glow color](../core/colors.md#glow-colors).

<div class="nerv-docs-island">
  <div class="nerv-divider nerv-divider-cyan"></div>
</div>

```html
<div class="nerv-divider nerv-divider-cyan"></div>
```
