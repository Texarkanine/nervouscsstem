# Bar meters

Discrete bars. Fill is a percentage. This page is the JS exemplar: the island opts in with `data-nerv-init="bar-meters"`, and `docs-init.js` calls `NERV.initBarMeters(island)` on that element only.

Do not call `NERV.init()` from a docs page. That injects a viewport-fixed `.nerv-scanlines` overlay on `body`.

## JS-generated bars

<div class="nerv-docs-island" data-nerv-init="bar-meters">
  <p class="nerv-type-hud" style="color: var(--nerv-amber);">SUBJECT 00</p>
  <div class="nerv-bar-meter nerv-bar-thermal" data-bars="40" data-fill="72"></div>
  <p class="nerv-type-hud" style="color: var(--nerv-amber);">SUBJECT 01</p>
  <div class="nerv-bar-meter nerv-bar-warning" data-bars="40" data-fill="55"></div>
  <div class="nerv-bar-meter nerv-bar-energy" data-bars="40" data-fill="38"></div>
</div>

**Spec:** an empty `.nerv-bar-meter` with `data-bars` gets that many `.nerv-bar-meter-bar` children. `data-fill` is 0–100; JS adds `.nerv-bar-active` to the matching prefix. Preset modifiers: `.nerv-bar-thermal` (green→red), `.nerv-bar-energy` (cyan→blue), `.nerv-bar-warning` (amber→red), `.nerv-bar-field` (void→amber).

```html
<div id="bar-meters">
  <div class="nerv-bar-meter nerv-bar-thermal" data-bars="40" data-fill="72"></div>
</div>
<script>
  NERV.initBarMeters(document.getElementById('bar-meters'));
</script>
```

Scope the call to a container you own. `NERV.initBarMeters(container)` looks up `.nerv-bar-meter` inside that element.
