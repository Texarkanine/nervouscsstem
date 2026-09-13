# Segment display

Seven-segment readout with a ghost all-8s overlay. Island opts in with `data-nerv-init="ghost-segments"` so `NERV.initGhostSegments(island)` sets `data-ghost` from the text.

![Seven-segment countdown timer](../img/segment-display.png)

## Readout

<div class="nerv-docs-island" data-nerv-init="ghost-segments">
  <div class="nerv-segment-display" style="font-size: 2rem;">00:42:17</div>
</div>

**Spec:** `.nerv-segment-display` uses DSEG7. `::before` paints `attr(data-ghost)` at low opacity. JS replaces digits with 8s unless `data-ghost` is already set.

```html
<div class="nerv-segment-display">00:42:17</div>
<script>
  NERV.initGhostSegments(document.getElementById('timer'));
</script>
```

You can also set `data-ghost` yourself and skip JS:

```html
<div class="nerv-segment-display" data-ghost="88:88:88">00:42:17</div>
```
