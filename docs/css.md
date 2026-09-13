# CSS

Tokens and type. These islands are CSS only — they do not need `nerv.js`.

## Tokens

Named data tokens (`--nerv-green`, `--nerv-cyan`, …) stay put in every alert state. Ambiance tokens (`--nerv-primary`, `--nerv-bg`) follow `.nerv-state-*`. Put factual color on named tokens.

<div class="nerv-docs-island">
  <p class="nerv-type-hud" style="color: var(--nerv-primary);">AMBIANCE --nerv-primary</p>
  <p class="nerv-type-hud" style="color: var(--nerv-green);">DATA --nerv-green</p>
  <p class="nerv-type-hud" style="color: var(--nerv-cyan);">DATA --nerv-cyan</p>
  <p class="nerv-type-hud" style="color: var(--nerv-red);">DATA --nerv-red</p>
</div>

**Spec:** tokens live on `:root`. Named data colors never get overridden by the alert cascade. `--nerv-primary` defaults to `--nerv-amber`.

```html
<p class="nerv-type-hud" style="color: var(--nerv-primary);">AMBIANCE --nerv-primary</p>
<p class="nerv-type-hud" style="color: var(--nerv-green);">DATA --nerv-green</p>
```

## Type

Six roles. Each class sets `font-family` (and a little tracking / casing). Color is separate — pair with a token or `.nerv-text-*`.

<div class="nerv-docs-island">
  <p class="nerv-type-display" style="color: var(--nerv-amber); font-size: 1.6rem;">NERV 本部</p>
  <p class="nerv-type-hud" style="color: var(--nerv-amber);">MAGI SYSTEM CHECK</p>
  <p class="nerv-type-data" style="color: var(--nerv-cyan);">CORE_TEMP: 227.4°C</p>
  <p class="nerv-type-segment" style="color: var(--nerv-amber); font-size: 1.4rem;">04:00:00</p>
  <p class="nerv-type-mixed" style="color: var(--nerv-steel);">NERV Mixed 第三次衝撃</p>
  <p class="nerv-type-boot" style="color: var(--nerv-green);">NERV BIOS v3.14 — MAGI SYSTEM CHECK</p>
</div>

**Spec:** `.nerv-type-display` Shippori, `.nerv-type-hud` Barlow Condensed uppercase, `.nerv-type-data` IBM Plex Mono, `.nerv-type-segment` DSEG7, `.nerv-type-mixed` the JP/EN HUD stack, `.nerv-type-boot` VT323 with `pre-wrap`.

```html
<p class="nerv-type-hud">MAGI SYSTEM CHECK</p>
<p class="nerv-type-data">CORE_TEMP: 227.4°C</p>
<p class="nerv-type-segment">04:00:00</p>
```
