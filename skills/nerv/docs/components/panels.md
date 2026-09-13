# Panels

Four CSS-only variants. No `nerv.js`. Override color with `--nerv-panel-color` / `--nerv-panel-color-rgb`.

## Basic

<div class="nerv-docs-island">
  <div class="nerv-panel">
    <p class="nerv-type-boot nerv-text-green">NERV BIOS v3.14 — MAGI SYSTEM CHECK
Base Memory:       640K OK
Extended Memory:   131072K OK</p>
  </div>
</div>

**Spec:** `.nerv-panel` is the bordered box. Background is `--nerv-bg`. Glow follows `--nerv-panel-color`.

```html
<div class="nerv-panel">
  <p class="nerv-type-boot nerv-text-green">NERV BIOS v3.14 — MAGI SYSTEM CHECK</p>
</div>
```

## Titled

<div class="nerv-docs-island">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-data" style="color: var(--nerv-cyan); font-size: 0.75rem;">EGO_BORDER: 0.83<br>CONTAMINATION: 0.02%<br>HARMONICS: +4.7σ</p>
  </div>
</div>

**Spec:** `.nerv-panel-titled` draws a title bar from `data-title`. Extra top padding leaves room for the bar.

```html
<div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
  <p class="nerv-type-data">EGO_BORDER: 0.83</p>
</div>
```

## Double

<div class="nerv-docs-island">
  <div class="nerv-panel-double" style="text-align: center;">
    <p class="nerv-type-segment" style="color: var(--nerv-amber); font-size: 2rem;">04:00:00</p>
  </div>
</div>

**Spec:** `.nerv-panel-double` adds a second ring with `outline` and `outline-offset`.

```html
<div class="nerv-panel-double">
  <p class="nerv-type-segment">04:00:00</p>
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
