# Reticles

Tick marks along container edges. The host must be a positioning context; the class sets `position: relative`. These classes consume `::after`. There is no JavaScript hook.

![Targeting reticle / HUD diamond](../../../img/reticles.png)

## All edges

<div class="nerv-docs-island">
  <div class="nerv-reticle nerv-panel" style="height: 8rem;">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-reticle` draws ticks on all four edges. `--nerv-reticle-size` is tick length. `--nerv-reticle-spacing` is the repeat. `--nerv-reticle-width` is stroke width (2px under `prefers-contrast: more`).

```html
<div class="nerv-reticle nerv-panel" style="height: 8rem;">
  <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
</div>
```

## Top

<div class="nerv-docs-island">
  <div class="nerv-reticle-top nerv-panel" style="height: 5rem;">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C</p>
  </div>
</div>

```html
<div class="nerv-reticle-top nerv-panel" style="height: 5rem;">
  <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C</p>
</div>
```

## Right

<div class="nerv-docs-island">
  <div class="nerv-reticle-right nerv-panel" style="height: 5rem;">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C</p>
  </div>
</div>

```html
<div class="nerv-reticle-right nerv-panel" style="height: 5rem;">
  <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C</p>
</div>
```

## Bottom

<div class="nerv-docs-island">
  <div class="nerv-reticle-bottom nerv-panel" style="height: 5rem;">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C</p>
  </div>
</div>

```html
<div class="nerv-reticle-bottom nerv-panel" style="height: 5rem;">
  <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C</p>
</div>
```

## Left

<div class="nerv-docs-island">
  <div class="nerv-reticle-left nerv-panel" style="height: 5rem;">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C</p>
  </div>
</div>

```html
<div class="nerv-reticle-left nerv-panel" style="height: 5rem;">
  <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C</p>
</div>
```

## Cyan

`.nerv-reticle-{name}` exists for every [glow color](../core/colors.md#glow-colors).

<div class="nerv-docs-island">
  <div class="nerv-reticle nerv-reticle-cyan nerv-panel" style="height: 8rem;">
    <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

```html
<div class="nerv-reticle nerv-reticle-cyan nerv-panel" style="height: 8rem;">
  <p class="nerv-type-data" style="color: var(--nerv-green); font-size: 0.75rem;">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
</div>
```
