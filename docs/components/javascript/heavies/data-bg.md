# Data background

CSS can scroll `.nerv-data-bg-inner`, but it cannot create that node. By adding JavaScript you inject the character grid. Without JS the inner grid is missing.

![Scrolling nucleotide ticker](../../../img/data-bg.png)

## Binary

Overlay label is the same filler in both modes.

```html island init="data-bg"
<div class="nerv-data-bg nerv-data-bg-binary" style="height: 10rem;">
  <p class="nerv-type-hud" style="position: relative; z-index: 1; text-align: center; padding-top: 4rem;">PATTERN BLUE</p>
</div>
<script>
  NERV.initDataBackgrounds(document.querySelector('.nerv-data-bg').parentElement);
</script>
```

**Spec:** `.nerv-data-bg` is `position: relative; overflow: hidden`. `.nerv-data-bg-binary` sets the character set to `01`. `NERV.initDataBackgrounds(container)` injects two stacked copies of the grid so the CSS loop (`translateY(-50%)`) is seamless.

## DNA

```html island init="data-bg"
<div class="nerv-data-bg nerv-data-bg-dna" style="height: 10rem;">
  <p class="nerv-type-hud" style="position: relative; z-index: 1; text-align: center; padding-top: 4rem;">PATTERN BLUE</p>
</div>
<script>
  NERV.initDataBackgrounds(document.querySelector('.nerv-data-bg').parentElement);
</script>
```

**Spec:** `.nerv-data-bg-dna` uses `CAGT`. `--nerv-data-bg-opacity` defaults to 0.15. `--nerv-data-bg-duration` is the scroll cycle. `prefers-reduced-motion` stops the animation.
