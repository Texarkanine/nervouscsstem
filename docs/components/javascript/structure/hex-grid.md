# Hex grid

CSS hex grid is a static honeycomb. By adding JavaScript you can randomly cycle cell states.

`NERV.initHexFlicker(container)` randomly cycles cell states. `NERV.init()` only starts this on grids with `data-nerv-hex-flicker`.

## Flicker

<div class="nerv-docs-island" data-nerv-init="hex">
  <div class="nerv-hex-grid nerv-hex-grid-spaced" data-nerv-hex-flicker>
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">A-01</div>
      <div class="nerv-hex-cell nerv-hex-warn">A-02</div>
      <div class="nerv-hex-cell nerv-hex-safe">A-03</div>
    </div>
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell nerv-hex-danger">B-01</div>
      <div class="nerv-hex-cell">B-02</div>
      <div class="nerv-hex-cell nerv-hex-safe">B-03</div>
    </div>
  </div>
</div>

```html
<div class="nerv-hex-grid" data-nerv-hex-flicker>…</div>
<script>
  NERV.initHexFlicker(document.getElementById('hex'));
</script>
```
