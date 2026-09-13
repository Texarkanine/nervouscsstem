# Data background

Scrolling wall of monospace characters inside a container. JS injects `.nerv-data-bg-inner`. CSS scrolls it.

![Scrolling nucleotide ticker](../img/data-bg.png)

## Binary

Island opts in with `data-nerv-init="data-bg"`. Overlay label is the same filler in both modes.

<div class="nerv-docs-island" data-nerv-init="data-bg">
  <div class="nerv-data-bg nerv-data-bg-binary" style="height: 10rem;">
    <p class="nerv-type-hud" style="position: relative; z-index: 1; text-align: center; padding-top: 4rem;">PATTERN BLUE</p>
  </div>
</div>

**Spec:** `.nerv-data-bg` is `position: relative; overflow: hidden`. `.nerv-data-bg-binary` sets the character set to `01`. `NERV.initDataBackgrounds(container)` injects two stacked copies of the grid so the CSS loop (`translateY(-50%)`) is seamless.

```html
<div class="nerv-data-bg nerv-data-bg-binary"></div>
<script>
  NERV.initDataBackgrounds(document.getElementById('bg'));
</script>
```

## DNA

<div class="nerv-docs-island" data-nerv-init="data-bg">
  <div class="nerv-data-bg nerv-data-bg-dna" style="height: 10rem;">
    <p class="nerv-type-hud" style="position: relative; z-index: 1; text-align: center; padding-top: 4rem;">PATTERN BLUE</p>
  </div>
</div>

**Spec:** `.nerv-data-bg-dna` uses `CAGT`. `--nerv-data-bg-opacity` defaults to 0.15. `--nerv-data-bg-duration` is the scroll cycle. `prefers-reduced-motion` stops the animation.
