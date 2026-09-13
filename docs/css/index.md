# CSS

Tokens, type, and glow. These islands are CSS only — they do not need `nerv.js`. Motion classes live on [Effects](effects.md).

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

## Glow

Three kinds. One example each, all amber, all the same filler. Color variants are `.nerv-glow-{name}`, `.nerv-glow-text-{name}`, `.nerv-glow-drop-{name}` for every glow-flagged token; do not learn them by listing every name.

<div class="nerv-docs-island">
  <p class="nerv-type-hud nerv-text-amber nerv-glow-text-amber" style="font-size: 1.4rem;">MAGI SYSTEM CHECK</p>
  <div class="nerv-panel nerv-glow-amber">
    <p class="nerv-type-hud nerv-text-amber">MAGI SYSTEM CHECK</p>
  </div>
  <span class="nerv-cartouche nerv-glow-drop-amber">MAGI SYSTEM CHECK</span>
</div>

**Spec:** `.nerv-glow-text-*` is text-shadow bloom (pair with `.nerv-text-*` for the fill color). `.nerv-glow-*` is box-shadow bloom. `.nerv-glow-drop-*` is `filter: drop-shadow` and follows the rendered shape. Bare `.nerv-glow`, `.nerv-glow-text`, and `.nerv-glow-drop` follow `--nerv-primary`. `--nerv-glow-intensity` scales every kind and drops under `prefers-contrast: more`.

```html
<p class="nerv-type-hud nerv-text-amber nerv-glow-text-amber">MAGI SYSTEM CHECK</p>
<div class="nerv-panel nerv-glow-amber">…</div>
<span class="nerv-cartouche nerv-glow-drop-amber">MAGI SYSTEM CHECK</span>
```

[Swatch board](../boards/foundation.html)
