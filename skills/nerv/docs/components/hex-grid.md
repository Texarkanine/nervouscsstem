# Hex grid

Honeycomb cells with named data-token states. Cell text is invented and held constant: A-01, A-02, A-03 / B-01, B-02, B-03.

![Hexagonal network grid](../img/hex-grid.png)

## Default

<div class="nerv-docs-island">
  <div class="nerv-hex-grid">
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

**Spec:** `.nerv-hex-grid` contains `.nerv-hex-row` rows of `.nerv-hex-cell`. Odd rows offset. Default spacing overlaps rows into a honeycomb.

```html
<div class="nerv-hex-grid">
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">A-01</div>
    <div class="nerv-hex-cell nerv-hex-warn">A-02</div>
  </div>
</div>
```

## Spacing

`.nerv-hex-grid-tiled` is a true tessellation (no gaps, no overlaps). `.nerv-hex-grid-spaced` leaves triangular gaps. Same cells.

<div class="nerv-docs-island">
  <div class="nerv-hex-grid nerv-hex-grid-tiled">
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
  <div class="nerv-hex-grid nerv-hex-grid-spaced">
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

## Fill

`.nerv-hex-grid-filled` saturates active fills. `.nerv-hex-grid-solid` is fully opaque. Combinable with any spacing.

<div class="nerv-docs-island">
  <div class="nerv-hex-grid nerv-hex-grid-spaced nerv-hex-grid-filled">
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
  <div class="nerv-hex-grid nerv-hex-grid-spaced nerv-hex-grid-solid">
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

## Cell states

`.nerv-hex-danger` uses `--nerv-red`. `.nerv-hex-warn` uses `--nerv-amber`. `.nerv-hex-safe` uses `--nerv-green`. Neutral cells follow `--nerv-primary`. Those are named data tokens — they do not follow the alert cascade.

## Hex flicker

`NERV.initHexFlicker(container)` randomly cycles cell states. `NERV.init()` only starts this on grids with `data-nerv-hex-flicker`. Docs islands pass the island: `data-nerv-init="hex"`.

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
