# MAGI

N-system consensus display. CSS Grid of `.nerv-magi-system` boxes plus one `.nerv-magi-output`. CSS defaults to a triad (`repeat(3, 1fr)`). By adding JavaScript you can [line up any other count](../../javascript/structure/magi.md).

![MAGI triad diagram](../../../img/magi.png)

## Three systems

<div class="nerv-docs-island">
  <div class="nerv-magi-panel">
    <div class="nerv-magi-system">
      <strong>CASPER·3</strong><br>
      <span class="nerv-type-data" style="font-size: 0.65rem;">APPROVE</span>
    </div>
    <div class="nerv-magi-system">
      <strong>BALTHASAR·2</strong><br>
      <span class="nerv-type-data" style="font-size: 0.65rem;">APPROVE</span>
    </div>
    <div class="nerv-magi-system">
      <strong>MELCHIOR·1</strong><br>
      <span class="nerv-type-data" style="font-size: 0.65rem;">DENY</span>
    </div>
    <div class="nerv-magi-output">
      <strong>MAGI</strong> — <span class="nerv-type-data" style="font-size: 0.7rem;">APPROVED (2:1)</span>
    </div>
  </div>
</div>

**Spec:** `.nerv-magi-panel` is the grid. Each `.nerv-magi-system` draws a connector via `::after`. `.nerv-magi-output` spans the full width on the last row. The panel defaults to `--nerv-primary`.

```html
<div class="nerv-magi-panel">
  <div class="nerv-magi-system"><strong>CASPER·3</strong></div>
  <div class="nerv-magi-system"><strong>BALTHASAR·2</strong></div>
  <div class="nerv-magi-system"><strong>MELCHIOR·1</strong></div>
  <div class="nerv-magi-output">APPROVED (2:1)</div>
</div>
```

## Per-system color

<div class="nerv-docs-island">
  <div class="nerv-magi-panel">
    <div class="nerv-magi-system" style="--nerv-magi-system-color: var(--nerv-red); --nerv-magi-system-color-rgb: var(--nerv-red-rgb);">
      <strong>MELCHIOR·1</strong><br>
      <span class="nerv-type-data" style="font-size: 0.65rem;">DENY</span>
    </div>
    <div class="nerv-magi-system">
      <strong>BALTHASAR·2</strong><br>
      <span class="nerv-type-data" style="font-size: 0.65rem;">APPROVE</span>
    </div>
    <div class="nerv-magi-system">
      <strong>CASPER·3</strong><br>
      <span class="nerv-type-data" style="font-size: 0.65rem;">APPROVE</span>
    </div>
    <div class="nerv-magi-output">
      <strong>MAGI</strong> — <span class="nerv-type-data" style="font-size: 0.7rem;">APPROVED (2:1)</span>
    </div>
  </div>
</div>

**Spec:** `--nerv-magi-system-color` / `--nerv-magi-system-color-rgb` on that box.

```html
<div class="nerv-magi-system" style="--nerv-magi-system-color: var(--nerv-red); --nerv-magi-system-color-rgb: var(--nerv-red-rgb);">
  <strong>MELCHIOR·1</strong>
</div>
```
