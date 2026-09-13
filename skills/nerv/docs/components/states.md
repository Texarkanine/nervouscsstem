# States

The alert cascade is five root classes that override ambiance tokens. Named data tokens (`--nerv-green`, `--nerv-red`, …) do not move. This page is the mechanism, not the alert-cascade serving.

![Red monochrome emergency state](../img/states.png)

Do not call `NERV.setState` from a docs island. That method writes the class on `document.documentElement` and, for `critical`, flashes the whole viewport. To preview here, the state class sits on the island so tokens inherit.

Filler is the same titled panel in every state.

## Nominal

<div class="nerv-docs-island nerv-state-nominal">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

## Active

<div class="nerv-docs-island nerv-state-active">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

## Caution

<div class="nerv-docs-island nerv-state-caution">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

## Alert

<div class="nerv-docs-island nerv-state-alert">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

## Critical

<div class="nerv-docs-island nerv-state-critical">
  <div class="nerv-panel-titled" data-title="PSYCHOGRAPHIC DISPLAY">
    <p class="nerv-type-hud">CONDITION</p>
    <p class="nerv-type-data">CORE_TEMP: 227.4°C<br>S2_OUTPUT: 1.8×10⁹ J/s<br>AT_FIELD: PHASE-3 LOCK</p>
  </div>
</div>

**Spec:**

| Class | `--nerv-primary` | `--nerv-bg` | `--nerv-animation-speed` |
| --- | --- | --- | --- |
| `.nerv-state-nominal` | green | void | 1 |
| `.nerv-state-active` | amber | void | 1 |
| `.nerv-state-caution` | amber-dark | void | 1.5 |
| `.nerv-state-alert` | red | void | 2 |
| `.nerv-state-critical` | red | red-deep | 3 |

Glow spread and scanline opacity also step up. Active+ flickers `.nerv-type-data`. Alert+ blinks `.nerv-status-text` and tints the scanline overlay. Critical glitches status text and (via `NERV.setState('critical')`) flashes the screen.

```js
NERV.setState('alert');
```

`setState` takes `'nominal' | 'active' | 'caution' | 'alert' | 'critical'`.
