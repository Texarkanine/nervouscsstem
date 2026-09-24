# Forms

CRT-console styling on ordinary form controls. Each control is shown in isolation. Filler values stay the same where a control has a value. There is no JavaScript hook.

## Text input

<div class="nerv-docs-island">
  <input class="nerv-input" type="text" value="Ikari Shinji" aria-label="Pilot designation">
</div>

**Spec:** `.nerv-input` covers text-like types (`text`, `email`, `password`, `number`, …). Focus glow is a compound `box-shadow` so it does not collide with the border.

```html
<input class="nerv-input" type="text" value="Ikari Shinji" aria-label="Pilot designation">
```

## Textarea

<div class="nerv-docs-island">
  <textarea class="nerv-textarea" rows="3" aria-label="Operations log">Eva Unit-01 sync ratio holding at 41.3%. LCL pressure nominal.</textarea>
</div>

**Spec:** `.nerv-textarea` is the multiline control.

```html
<textarea class="nerv-textarea" rows="3" aria-label="Operations log">Eva Unit-01 sync ratio holding at 41.3%. LCL pressure nominal.</textarea>
```

## Select

<div class="nerv-docs-island">
  <select class="nerv-select" aria-label="Eva unit">
    <option>Unit-00 Prototype</option>
    <option selected>Unit-01 Test Type</option>
    <option>Unit-02 Production</option>
  </select>
</div>

**Spec:** `.nerv-select` restyles the closed box and draws a custom arrow. In Chrome and Edge 135+ and Safari 27, which support [customizable select](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) (`appearance: base-select`), the open list is NERV-styled as well: a glowing panel, HUD type, hover and focus fills, and a ▶ mark on the chosen option. Plain `<option>`s need no extra markup. Firefox and LibreWolf do not support it yet. They show the same closed box with the operating system's own popup list.

```html
<select class="nerv-select" aria-label="Eva unit">
  <option>Unit-00 Prototype</option>
  <option selected>Unit-01 Test Type</option>
  <option>Unit-02 Production</option>
</select>
```

## Select with colored options

<div class="nerv-docs-island">
  <select class="nerv-select nerv-select-hex nerv-select-frameless" aria-label="Alert level">
    <button><selectedcontent></selectedcontent></button>
    <option class="nerv-option-green">Nominal</option>
    <option class="nerv-option-amber">Active</option>
    <option class="nerv-option-amber-dark" selected>Caution</option>
    <option class="nerv-option-red">Alert</option>
    <option class="nerv-option-red-deep">Critical</option>
  </select>
</div>

**Spec:** Put `.nerv-option-{color}` on an `<option>` to give it a box filled with that color. The colors are the named data colors (`green`, `amber`, `amber-dark`, `orange`, `red`, `red-deep`, `cyan`, `blue`, `steel`). They do not change with the alert state. The closed box takes the color of the chosen option. This works in every browser with `:has()`, Firefox included. Choosing an option does not change the page's alert state; your code does that if you want it.

Add one of these to the `<select>` to change every option:

| Class | Effect |
|---|---|
| (none) | Rectangle boxes |
| `.nerv-select-hex` | Pointed ends, like `.nerv-list` |
| `.nerv-select-arrow` | Point on the left |
| `.nerv-select-arrow-reverse` | Point on the right |
| `.nerv-select-solid` | Solid fill with dark text |
| `.nerv-select-frameless` | No border, glow or padding around the open list, so the boxes read as a bare list |

By default the open list sits in a bordered, glowing frame. That frame keeps plain options readable, because they have no fill of their own. Colored options already have edges, so `.nerv-select-frameless` usually looks better with them, as in the example above. The space between the boxes shows the page background color, never the content behind the list. With high contrast turned on, a frameless list gets a thick border back.

The option boxes, shapes, and the open-list styling appear only in browsers that support customizable select. In Firefox the options show in the operating system's popup list. The `<button><selectedcontent></selectedcontent></button>` line is optional: it shows the chosen option's content in the closed box, and browsers that do not support it ignore it.

```html
<select class="nerv-select nerv-select-hex nerv-select-frameless" aria-label="Alert level">
  <button><selectedcontent></selectedcontent></button>
  <option class="nerv-option-green">Nominal</option>
  <option class="nerv-option-amber">Active</option>
  <option class="nerv-option-amber-dark" selected>Caution</option>
  <option class="nerv-option-red">Alert</option>
  <option class="nerv-option-red-deep">Critical</option>
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
<label class="nerv-type-hud" style="display: flex; gap: 0.4em; align-items: center;">
  <input class="nerv-checkbox" type="checkbox" checked>
  Launch authorized
</label>
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
<label class="nerv-type-hud" style="display: flex; gap: 0.4em; align-items: center;">
  <input class="nerv-radio" type="radio" name="docs-form-unit" checked>
  Unit-01
</label>
<label class="nerv-type-hud" style="display: flex; gap: 0.4em; align-items: center;">
  <input class="nerv-radio" type="radio" name="docs-form-unit">
  Unit-02
</label>
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

`.nerv-form-{name}` exists for every [glow color](../core/colors.md#glow-colors). Put it on any of the controls above.

<div class="nerv-docs-island">
  <input class="nerv-input nerv-form-cyan" type="text" value="Ikari Shinji" aria-label="Pilot designation, cyan">
</div>

```html
<input class="nerv-input nerv-form-cyan" type="text" value="Ikari Shinji" aria-label="Pilot designation, cyan">
```

[Swatch board](../../../boards/forms.html)
