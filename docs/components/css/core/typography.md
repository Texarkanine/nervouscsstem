# Typography

Each type class sets `font-family` (and a little tracking / casing). Color is separate — pair with a token or `.nerv-text-*`.

## Display

```html island
<p class="nerv-type-display" style="color: var(--nerv-amber); font-size: 1.6rem;">NERV 本部</p>
```

**Spec:** `.nerv-type-display` is Shippori.

## HUD

```html island
<p class="nerv-type-hud" style="color: var(--nerv-amber);">MAGI SYSTEM CHECK</p>
```

**Spec:** `.nerv-type-hud` is Barlow Condensed uppercase.

## Data

```html island
<p class="nerv-type-data" style="color: var(--nerv-cyan);">CORE_TEMP: 227.4°C</p>
```

**Spec:** `.nerv-type-data` is IBM Plex Mono.

## Segment

```html island
<p class="nerv-type-segment" style="color: var(--nerv-amber); font-size: 1.4rem;">04:00:00</p>
```

**Spec:** `.nerv-type-segment` is DSEG7.

## Mixed

```html island
<p class="nerv-type-mixed" style="color: var(--nerv-steel);">NERV Mixed 第三次衝撃</p>
```

**Spec:** `.nerv-type-mixed` is the JP/EN HUD stack.

## Boot

```html island
<p class="nerv-type-boot" style="color: var(--nerv-green);">NERV BIOS v3.14 — MAGI SYSTEM CHECK</p>
```

**Spec:** `.nerv-type-boot` is VT323 with `pre-wrap`.
