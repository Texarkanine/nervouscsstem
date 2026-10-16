# Grid marks

CSS grid marks are tiled backgrounds. By adding JavaScript you can label the axes.

`NERV.initGridLabels(container)` injects numeric labels along the bottom and left. The host must be positioned; JS sets `position: relative` if it is static.

## Axis labels

```html island init="grid-labels"
<div class="nerv-grid-marks" style="height: 10rem; margin: 0 2.5rem 1.5rem;"></div>
<script>
  NERV.initGridLabels(document.querySelector('.nerv-grid-marks'));
</script>
```
