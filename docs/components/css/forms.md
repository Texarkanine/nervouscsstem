# Forms

CRT-console styling on ordinary form controls. Each control is shown in isolation. Filler values stay the same where a control has a value. There is no JavaScript hook.

## Text input

<div class="nerv-docs-island">
  <input class="nerv-input" type="text" value="Ikari Shinji" aria-label="Pilot designation">
</div>

**Spec:** `.nerv-input` covers text-like types (`text`, `email`, `password`, `number`, …). Focus glow is a compound `box-shadow` so it does not collide with the border.

```html
<input class="nerv-input" type="text" value="Ikari Shinji">
```

## Textarea

<div class="nerv-docs-island">
  <textarea class="nerv-textarea" rows="3" aria-label="Operations log">Eva Unit-01 sync ratio holding at 41.3%. LCL pressure nominal.</textarea>
</div>

**Spec:** `.nerv-textarea` is the multiline control.

```html
<textarea class="nerv-textarea" rows="3">Eva Unit-01 sync ratio holding at 41.3%.</textarea>
```

## Select

<div class="nerv-docs-island">
  <select class="nerv-select" aria-label="Eva unit">
    <option>Unit-00 Prototype</option>
    <option selected>Unit-01 Test Type</option>
    <option>Unit-02 Production</option>
  </select>
</div>

**Spec:** `.nerv-select` restyles the native dropdown and draws a custom arrow.

```html
<select class="nerv-select">
  <option>Unit-00 Prototype</option>
  <option selected>Unit-01 Test Type</option>
  <option>Unit-02 Production</option>
</select>
```

## Checkbox

<div class="nerv-docs-island">
  <label class="nerv-type-hud" style="display: flex; gap: 0.4em; align-items: center;">
    <input class="nerv-checkbox" type="checkbox" checked>
    Launch authorized
  </label>
</div>

**Spec:** `.nerv-checkbox` uses `appearance: none`. Checked+focus shadows are written as one compound selector so they do not overwrite each other.

```html
<input class="nerv-checkbox" type="checkbox" checked>
```

## Radio

<div class="nerv-docs-island">
  <label class="nerv-type-hud" style="display: flex; gap: 0.4em; align-items: center;">
    <input class="nerv-radio" type="radio" name="docs-form-unit" checked>
    Unit-01
  </label>
  <label class="nerv-type-hud" style="display: flex; gap: 0.4em; align-items: center;">
    <input class="nerv-radio" type="radio" name="docs-form-unit">
    Unit-02
  </label>
</div>

**Spec:** `.nerv-radio` uses `appearance: none`. Same compound checked+focus rule as checkbox.

```html
<input class="nerv-radio" type="radio" name="unit" checked>
<input class="nerv-radio" type="radio" name="unit">
```

## Button

<div class="nerv-docs-island">
  <button class="nerv-btn" type="button">Register Pilot</button>
</div>

**Spec:** `.nerv-btn` is a rectangular button. No skew — label boxes are the parallelogram control.

```html
<button class="nerv-btn" type="button">Register Pilot</button>
```

## Cyan

`.nerv-form-{name}` exists for every [glow color](index.md#glow-colors). Put it on any of the controls above.

<div class="nerv-docs-island">
  <input class="nerv-input nerv-form-cyan" type="text" value="Ikari Shinji" aria-label="Pilot designation, cyan">
</div>

```html
<input class="nerv-input nerv-form-cyan" type="text" value="Ikari Shinji">
```

[Swatch board](../../boards/forms.html)
