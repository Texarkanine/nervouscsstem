# Cartouches

CSS cartouches flex to the text. By adding JavaScript you can stretch text to fill a fixed box.

## Fixed

```html island init="cartouches"
<span class="nerv-cartouche nerv-cartouche-fixed" style="width: 180px; height: 36px;"><span>IDENTIFIED</span></span>
<script>
  NERV.initCartouches(document.querySelector('.nerv-cartouche-fixed').parentElement);
</script>
```

**Spec:** `.nerv-cartouche-fixed` needs explicit width/height and one inner element. JS sets `--nerv-cartouche-sx` / `--nerv-cartouche-sy` / `--nerv-cartouche-ty` after fonts load.

## Table mode

Same status word, two cells.

```html island init="cartouches"
<span class="nerv-cartouche nerv-cartouche-fixed" style="width: 240px; height: 36px;">
  <table><tr><td>IDENTIFIED</td><td>17th ANGEL</td></tr></table>
</span>
<script>
  NERV.initCartouches(document.querySelector('.nerv-cartouche-fixed').parentElement);
</script>
```

**Spec:** a raw `<table>` child of `.nerv-cartouche-fixed` enables per-cell scaling. Each `<td>` is measured independently.
