# Bar meters

CSS bar meters paint hand-authored bars. By adding JavaScript you can build those children from `data-bars` / `data-fill`.

![Segmented bar indicator](../../../img/bar-meters.png)

## Horizontal

```html island init="bar-meters"
<p class="nerv-type-hud" style="color: var(--nerv-amber);">SUBJECT 00</p>
<div class="nerv-bar-meter nerv-bar-thermal" data-bars="40" data-fill="72"></div>
<script>
  NERV.initBarMeters(document.querySelector('.nerv-bar-meter').parentElement);
</script>
```

**Spec:** an empty `.nerv-bar-meter` with `data-bars` gets that many `.nerv-bar-meter-bar` children. `data-fill` is 0–100; JS adds `.nerv-bar-active` to the matching prefix.

## Vertical

```html island init="bar-meters"
<div class="nerv-bar-meter nerv-bar-meter-vertical nerv-bar-thermal" data-bars="24" data-fill="72" style="height: 8rem;"></div>
<script>
  NERV.initBarMeters(document.querySelector('.nerv-bar-meter').parentElement);
</script>
```
