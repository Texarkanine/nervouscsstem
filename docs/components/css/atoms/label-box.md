# Label box

Skewed parallelogram mode buttons. Inner children are counter-skewed so the text stays upright. CSS paints a single button. By adding JavaScript you can [radio-toggle a group](../../javascript/atoms/label-box.md).

## Single

<div class="nerv-docs-island">
  <button class="nerv-label-box" type="button"><span>HOLD</span></button>
</div>

**Spec:** `.nerv-label-box` is a button reset (`appearance: none`) with `skewX`. Put a `<span>` around the label so it counter-skews. `--nerv-label-box-skew` defaults to −15°.

```html
<button class="nerv-label-box" type="button"><span>HOLD</span></button>
```

## Reverse

<div class="nerv-docs-island">
  <button class="nerv-label-box nerv-label-box-reverse" type="button"><span>HOLD</span></button>
</div>

**Spec:** `.nerv-label-box-reverse` sets `--nerv-label-box-skew: 15deg`.

```html
<button class="nerv-label-box nerv-label-box-reverse" type="button"><span>HOLD</span></button>
```

## Cyan

Color is a custom property, not a generated class.

<div class="nerv-docs-island">
  <button class="nerv-label-box" type="button" style="--nerv-label-box-color: var(--nerv-cyan); --nerv-label-box-color-rgb: var(--nerv-cyan-rgb);"><span>HOLD</span></button>
</div>

```html
<button class="nerv-label-box" type="button" style="--nerv-label-box-color: var(--nerv-cyan); --nerv-label-box-color-rgb: var(--nerv-cyan-rgb);"><span>HOLD</span></button>
```
