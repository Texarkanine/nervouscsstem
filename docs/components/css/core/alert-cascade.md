# Alert cascade

Five root classes override ambiance tokens. Named data does not move — that is why a cyan readout still reads as cyan in alert.

![Red monochrome emergency state](../../../img/states.png)

`NERV.setState` writes the class on `document.documentElement` and, for `critical`, flashes the viewport. To tint a fragment, put the state class on that element so tokens inherit. The JS call is [`NERV.setState`](../../javascript/index.md#nervsetstate).

## Nominal

<div class="nerv-docs-island nerv-state-nominal">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-state-nominal` — `--nerv-primary` green, `--nerv-bg` void, `--nerv-animation-speed` 1.

```html
<div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
  <p class="nerv-type-hud">CONDITION</p>
  <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
</div>
```

## Active

<div class="nerv-docs-island nerv-state-active">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-state-active` — `--nerv-primary` amber. Active+ flickers `.nerv-type-data`.

```html
<div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
  <p class="nerv-type-hud">CONDITION</p>
  <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
</div>
```

## Caution

<div class="nerv-docs-island nerv-state-caution">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-state-caution` — `--nerv-primary` amber-dark, `--nerv-animation-speed` 1.5.

```html
<div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
  <p class="nerv-type-hud">CONDITION</p>
  <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
</div>
```

## Alert

<div class="nerv-docs-island nerv-state-alert">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-state-alert` — `--nerv-primary` red, `--nerv-animation-speed` 2. Alert+ blinks `.nerv-status-text` and tints the scanline overlay.

```html
<div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
  <p class="nerv-type-hud">CONDITION</p>
  <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
</div>
```

## Critical

<div class="nerv-docs-island nerv-state-critical">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:** `.nerv-state-critical` — `--nerv-primary` red, `--nerv-bg` red-deep, `--nerv-animation-speed` 3. Critical glitches status text. `NERV.setState('critical')` also flashes the screen.

```html
<div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
  <p class="nerv-type-hud">CONDITION</p>
  <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
</div>
```
