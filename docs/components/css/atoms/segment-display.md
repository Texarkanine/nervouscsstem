# Segment display

Seven-segment readout with a ghost all-8s overlay. CSS paints `attr(data-ghost)` if you set it yourself. By adding JavaScript you can [fill `data-ghost` from the visible text](../../javascript/atoms/segment-display.md).

![Seven-segment countdown timer](../../../img/segment-display.png)

## Readout

<div class="nerv-docs-island">
  <div class="nerv-segment-display" data-ghost="88:88:88" style="font-size: 2rem;">00:42:17</div>
</div>

**Spec:** `.nerv-segment-display` uses DSEG7. `::before` paints `attr(data-ghost)` at low opacity.

```html
<div class="nerv-segment-display" data-ghost="88:88:88" style="font-size: 2rem;">00:42:17</div>
```
