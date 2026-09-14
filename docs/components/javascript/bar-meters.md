# Bar meters

CSS bar meters paint hand-authored bars. By adding JavaScript you can build those children from `data-bars` / `data-fill`.

![Segmented bar indicator](../../img/bar-meters.png)

## Horizontal

<div class="nerv-docs-island" data-nerv-init="bar-meters">
  <p class="nerv-type-hud" style="color: var(--nerv-amber);">SUBJECT 00</p>
  <div class="nerv-bar-meter nerv-bar-thermal" data-bars="40" data-fill="72"></div>
</div>

**Spec:** an empty `.nerv-bar-meter` with `data-bars` gets that many `.nerv-bar-meter-bar` children. `data-fill` is 0–100; JS adds `.nerv-bar-active` to the matching prefix.

```html
<div id="bar-meters">
  <div class="nerv-bar-meter nerv-bar-thermal" data-bars="40" data-fill="72"></div>
</div>
<script>
  NERV.initBarMeters(document.getElementById('bar-meters'));
</script>
```

## Vertical

<div class="nerv-docs-island" data-nerv-init="bar-meters">
  <div class="nerv-bar-meter nerv-bar-meter-vertical nerv-bar-thermal" data-bars="24" data-fill="72" style="height: 8rem;"></div>
</div>

```html
<div id="bar-meters-v">
  <div class="nerv-bar-meter nerv-bar-meter-vertical nerv-bar-thermal" data-bars="24" data-fill="72"></div>
</div>
<script>
  NERV.initBarMeters(document.getElementById('bar-meters-v'));
</script>
```
