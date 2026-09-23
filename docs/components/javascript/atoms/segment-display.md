# Segment display

CSS segment display is the DSEG7 readout and the ghost overlay, if you set `data-ghost` yourself. By adding JavaScript you can fill `data-ghost` from the visible text.

`NERV.initGhostSegments(container)` replaces digits with 8s unless `data-ghost` is already set.

![Seven-segment countdown timer](../../../img/segment-display.png)

## Ghost from text

<div class="nerv-docs-island" data-nerv-init="ghost-segments">
  <div class="nerv-segment-display" style="font-size: 2rem;">00:42:17</div>
</div>

```html
<div class="nerv-segment-display" style="font-size: 2rem;">00:42:17</div>
<script>
  NERV.initGhostSegments(document.querySelector('.nerv-segment-display').parentElement);
</script>
```
