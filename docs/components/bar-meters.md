# Bar meters

Discrete bars. Fill is a percentage. This page is the JS exemplar: the island opts in with `data-nerv-init="bar-meters"`, and `docs-init.js` calls `NERV.initBarMeters(island)` on that element only.

Do not call `NERV.init()` from a docs page. That injects a viewport-fixed `.nerv-scanlines` overlay on `body`.

![Segmented bar indicator](../img/bar-meters.png)

## Horizontal

Constant filler: two labeled subjects, 40 bars, fills 72 and 55.

<div class="nerv-docs-island" data-nerv-init="bar-meters">
  <p class="nerv-type-hud" style="color: var(--nerv-amber);">SUBJECT 00</p>
  <div class="nerv-bar-meter nerv-bar-thermal" data-bars="40" data-fill="72"></div>
  <p class="nerv-type-hud" style="color: var(--nerv-amber);">SUBJECT 01</p>
  <div class="nerv-bar-meter nerv-bar-warning" data-bars="40" data-fill="55"></div>
</div>

**Spec:** an empty `.nerv-bar-meter` with `data-bars` gets that many `.nerv-bar-meter-bar` children. `data-fill` is 0–100; JS adds `.nerv-bar-active` to the matching prefix. Zone ticks use `data-zone` on a bar.

```html
<div id="bar-meters">
  <div class="nerv-bar-meter nerv-bar-thermal" data-bars="40" data-fill="72"></div>
</div>
<script>
  NERV.initBarMeters(document.getElementById('bar-meters'));
</script>
```

## Vertical

Same fill values, `.nerv-bar-meter-vertical`.

<div class="nerv-docs-island" data-nerv-init="bar-meters">
  <div class="nerv-bar-meter nerv-bar-meter-vertical nerv-bar-thermal" data-bars="24" data-fill="72" style="height: 8rem;"></div>
</div>

**Spec:** `.nerv-bar-meter-vertical` is `flex-direction: column-reverse`. Zone labels sit to the right of the bar.

```html
<div class="nerv-bar-meter nerv-bar-meter-vertical nerv-bar-thermal" data-bars="24" data-fill="72"></div>
```

## Modifier classes

Preset gradients. One example per class. Same `data-bars` / `data-fill`.

<div class="nerv-docs-island" data-nerv-init="bar-meters">
  <div class="nerv-bar-meter nerv-bar-thermal" data-bars="40" data-fill="72"></div>
  <div class="nerv-bar-meter nerv-bar-energy" data-bars="40" data-fill="72"></div>
  <div class="nerv-bar-meter nerv-bar-warning" data-bars="40" data-fill="72"></div>
  <div class="nerv-bar-meter nerv-bar-field" data-bars="40" data-fill="72"></div>
</div>

**Spec:** `.nerv-bar-thermal` green→red, `.nerv-bar-energy` cyan→blue, `.nerv-bar-warning` amber→red, `.nerv-bar-field` void→amber. Or set `--nerv-bar-from` / `--nerv-bar-to` yourself.
