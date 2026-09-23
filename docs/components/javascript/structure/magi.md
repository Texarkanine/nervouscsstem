# MAGI

CSS MAGI is a triad (`repeat(3, 1fr)`). By adding JavaScript you can line up any other count.

`NERV.initMagiPanels(container)` writes `repeat(N, 1fr)` from the number of `.nerv-magi-system` children.

![MAGI triad diagram](../../../img/magi.png)

## Four systems

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
    <div class="nerv-magi-system">
      <strong>MAGI-04</strong><br>
      <span class="nerv-type-data" style="font-size: 0.65rem;">APPROVE</span>
    </div>
    <div class="nerv-magi-output">
      <strong>MAGI</strong> — <span class="nerv-type-data" style="font-size: 0.7rem;">APPROVED (3:1)</span>
    </div>
  </div>
</div>

```html
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
  <div class="nerv-magi-system">
    <strong>MAGI-04</strong><br>
    <span class="nerv-type-data" style="font-size: 0.65rem;">APPROVE</span>
  </div>
  <div class="nerv-magi-output">
    <strong>MAGI</strong> — <span class="nerv-type-data" style="font-size: 0.7rem;">APPROVED (3:1)</span>
  </div>
</div>
<script>
  NERV.initMagiPanels(document.querySelector('.nerv-magi-panel').parentElement);
</script>
```
