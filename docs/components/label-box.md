# Label box

Skewed parallelogram mode buttons. Inner children are counter-skewed so the text stays upright.

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

## Group

Island opts in with `data-nerv-init="label-box"`. Clicking one box activates it and clears siblings.

<div class="nerv-docs-island" data-nerv-init="label-box">
  <div class="nerv-label-box-group">
    <button class="nerv-label-box" type="button"><span>STOP</span></button>
    <button class="nerv-label-box" type="button"><span>SLOW</span></button>
    <button class="nerv-label-box nerv-label-box-active" type="button"><span>NORMAL</span></button>
    <button class="nerv-label-box" type="button"><span>RACING</span></button>
  </div>
</div>

**Spec:** `.nerv-label-box-group` is the row. `.nerv-label-box-active` is the selected state. `NERV.initLabelBoxGroups(container)` wires radio behavior.

```html
<div class="nerv-label-box-group">
  <button class="nerv-label-box"><span>STOP</span></button>
  <button class="nerv-label-box nerv-label-box-active"><span>NORMAL</span></button>
</div>
<script>
  NERV.initLabelBoxGroups(document.getElementById('modes'));
</script>
```

Color is `--nerv-label-box-color` / `--nerv-label-box-color-rgb` on the box, not a generated class.
