# MAGI

N-system consensus display. CSS Grid of `.nerv-magi-system` boxes plus one `.nerv-magi-output`. JS sets column count from the number of systems.

![MAGI triad diagram](../img/magi.png)

## Three systems

Island opts in with `data-nerv-init="magi"`.

<div class="nerv-docs-island" data-nerv-init="magi">
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

**Spec:** `.nerv-magi-panel` is the grid. Each `.nerv-magi-system` draws a connector via `::after`. `.nerv-magi-output` spans the full width on the last row. `NERV.initMagiPanels(container)` sets `grid-template-columns: repeat(N, 1fr)`.

```html
<div class="nerv-magi-panel">
  <div class="nerv-magi-system"><strong>CASPER·3</strong></div>
  <div class="nerv-magi-system"><strong>BALTHASAR·2</strong></div>
  <div class="nerv-magi-system"><strong>MELCHIOR·1</strong></div>
  <div class="nerv-magi-output">APPROVED (2:1)</div>
</div>
<script>
  NERV.initMagiPanels(document.getElementById('magi'));
</script>
```

Per-system color is `--nerv-magi-system-color` / `--nerv-magi-system-color-rgb` on that box. The panel defaults to `--nerv-primary`.
