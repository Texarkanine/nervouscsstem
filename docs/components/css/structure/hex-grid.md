# Hex grid

Honeycomb cells with named data-token states. Cell text is invented and held constant: A-01, A-02, A-03 / B-01, B-02, B-03. CSS paints a static honeycomb. By adding JavaScript you can [flicker cell states at random](../../javascript/structure/hex-grid.md).

![Hexagonal network grid](../../../img/hex-grid.png)

## Default

<div class="nerv-docs-island">
  <div class="nerv-hex-grid">
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">A-01</div>
      <div class="nerv-hex-cell">A-02</div>
      <div class="nerv-hex-cell">A-03</div>
    </div>
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">B-01</div>
      <div class="nerv-hex-cell">B-02</div>
      <div class="nerv-hex-cell">B-03</div>
    </div>
  </div>
</div>

**Spec:** `.nerv-hex-grid` contains `.nerv-hex-row` rows of `.nerv-hex-cell`. Odd rows offset. Default spacing overlaps rows into a honeycomb. Neutral cells follow `--nerv-primary`.

```html
<div class="nerv-hex-grid">
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">A-01</div>
    <div class="nerv-hex-cell">A-02</div>
    <div class="nerv-hex-cell">A-03</div>
  </div>
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">B-01</div>
    <div class="nerv-hex-cell">B-02</div>
    <div class="nerv-hex-cell">B-03</div>
  </div>
</div>
```

## Tiled

<div class="nerv-docs-island">
  <div class="nerv-hex-grid nerv-hex-grid-tiled">
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">A-01</div>
      <div class="nerv-hex-cell">A-02</div>
      <div class="nerv-hex-cell">A-03</div>
    </div>
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">B-01</div>
      <div class="nerv-hex-cell">B-02</div>
      <div class="nerv-hex-cell">B-03</div>
    </div>
  </div>
</div>

**Spec:** `.nerv-hex-grid-tiled` is a true tessellation (no gaps, no overlaps).

```html
<div class="nerv-hex-grid nerv-hex-grid-tiled">
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">A-01</div>
    <div class="nerv-hex-cell">A-02</div>
    <div class="nerv-hex-cell">A-03</div>
  </div>
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">B-01</div>
    <div class="nerv-hex-cell">B-02</div>
    <div class="nerv-hex-cell">B-03</div>
  </div>
</div>
```

## Spaced

<div class="nerv-docs-island">
  <div class="nerv-hex-grid nerv-hex-grid-spaced">
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">A-01</div>
      <div class="nerv-hex-cell">A-02</div>
      <div class="nerv-hex-cell">A-03</div>
    </div>
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">B-01</div>
      <div class="nerv-hex-cell">B-02</div>
      <div class="nerv-hex-cell">B-03</div>
    </div>
  </div>
</div>

**Spec:** `.nerv-hex-grid-spaced` leaves triangular gaps.

```html
<div class="nerv-hex-grid nerv-hex-grid-spaced">
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">A-01</div>
    <div class="nerv-hex-cell">A-02</div>
    <div class="nerv-hex-cell">A-03</div>
  </div>
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">B-01</div>
    <div class="nerv-hex-cell">B-02</div>
    <div class="nerv-hex-cell">B-03</div>
  </div>
</div>
```

## Filled

Combinable with any spacing.

<div class="nerv-docs-island">
  <div class="nerv-hex-grid nerv-hex-grid-spaced nerv-hex-grid-filled">
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">A-01</div>
      <div class="nerv-hex-cell">A-02</div>
      <div class="nerv-hex-cell">A-03</div>
    </div>
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">B-01</div>
      <div class="nerv-hex-cell">B-02</div>
      <div class="nerv-hex-cell">B-03</div>
    </div>
  </div>
</div>

**Spec:** `.nerv-hex-grid-filled` saturates active fills.

```html
<div class="nerv-hex-grid nerv-hex-grid-spaced nerv-hex-grid-filled">
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">A-01</div>
    <div class="nerv-hex-cell">A-02</div>
    <div class="nerv-hex-cell">A-03</div>
  </div>
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">B-01</div>
    <div class="nerv-hex-cell">B-02</div>
    <div class="nerv-hex-cell">B-03</div>
  </div>
</div>
```

## Solid

<div class="nerv-docs-island">
  <div class="nerv-hex-grid nerv-hex-grid-spaced nerv-hex-grid-solid">
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">A-01</div>
      <div class="nerv-hex-cell">A-02</div>
      <div class="nerv-hex-cell">A-03</div>
    </div>
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell">B-01</div>
      <div class="nerv-hex-cell">B-02</div>
      <div class="nerv-hex-cell">B-03</div>
    </div>
  </div>
</div>

**Spec:** `.nerv-hex-grid-solid` is fully opaque.

```html
<div class="nerv-hex-grid nerv-hex-grid-spaced nerv-hex-grid-solid">
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">A-01</div>
    <div class="nerv-hex-cell">A-02</div>
    <div class="nerv-hex-cell">A-03</div>
  </div>
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell">B-01</div>
    <div class="nerv-hex-cell">B-02</div>
    <div class="nerv-hex-cell">B-03</div>
  </div>
</div>
```

## Danger

Cell states use named data tokens — they do not follow the alert cascade.

<div class="nerv-docs-island">
  <div class="nerv-hex-grid">
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell nerv-hex-danger">A-01</div>
      <div class="nerv-hex-cell nerv-hex-danger">A-02</div>
      <div class="nerv-hex-cell nerv-hex-danger">A-03</div>
    </div>
  </div>
</div>

**Spec:** `.nerv-hex-danger` uses `--nerv-red`.

```html
<div class="nerv-hex-grid">
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell nerv-hex-danger">A-01</div>
    <div class="nerv-hex-cell nerv-hex-danger">A-02</div>
    <div class="nerv-hex-cell nerv-hex-danger">A-03</div>
  </div>
</div>
```

## Warn

<div class="nerv-docs-island">
  <div class="nerv-hex-grid">
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell nerv-hex-warn">A-01</div>
      <div class="nerv-hex-cell nerv-hex-warn">A-02</div>
      <div class="nerv-hex-cell nerv-hex-warn">A-03</div>
    </div>
  </div>
</div>

**Spec:** `.nerv-hex-warn` uses `--nerv-amber`.

```html
<div class="nerv-hex-grid">
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell nerv-hex-warn">A-01</div>
    <div class="nerv-hex-cell nerv-hex-warn">A-02</div>
    <div class="nerv-hex-cell nerv-hex-warn">A-03</div>
  </div>
</div>
```

## Safe

<div class="nerv-docs-island">
  <div class="nerv-hex-grid">
    <div class="nerv-hex-row">
      <div class="nerv-hex-cell nerv-hex-safe">A-01</div>
      <div class="nerv-hex-cell nerv-hex-safe">A-02</div>
      <div class="nerv-hex-cell nerv-hex-safe">A-03</div>
    </div>
  </div>
</div>

**Spec:** `.nerv-hex-safe` uses `--nerv-green`.

```html
<div class="nerv-hex-grid">
  <div class="nerv-hex-row">
    <div class="nerv-hex-cell nerv-hex-safe">A-01</div>
    <div class="nerv-hex-cell nerv-hex-safe">A-02</div>
    <div class="nerv-hex-cell nerv-hex-safe">A-03</div>
  </div>
</div>
```
