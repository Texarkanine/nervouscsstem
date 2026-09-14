# Status text

Large alert labels. Severity classes set color. Animation is opt-in via [Effects](../core/effects.md). CSS does not compose a suggested serving.

![Full-bleed status card](../../../img/status-text.png)

## Base

Filler is the same word on every severity.

<div class="nerv-docs-island">
  <span class="nerv-status-text">NOMINAL</span>
</div>

**Spec:** `.nerv-status-text` is the large overlay type.

```html
<span class="nerv-status-text">NOMINAL</span>
```

## Nominal

<div class="nerv-docs-island">
  <span class="nerv-status-text nerv-status-nominal">NOMINAL</span>
</div>

**Spec:** `.nerv-status-nominal` is green.

```html
<span class="nerv-status-text nerv-status-nominal">NOMINAL</span>
```

## Caution

<div class="nerv-docs-island">
  <span class="nerv-status-text nerv-status-caution">NOMINAL</span>
</div>

**Spec:** `.nerv-status-caution` is amber.

```html
<span class="nerv-status-text nerv-status-caution">NOMINAL</span>
```

## Danger

<div class="nerv-docs-island">
  <span class="nerv-status-text nerv-status-danger">NOMINAL</span>
</div>

**Spec:** `.nerv-status-danger` is red.

```html
<span class="nerv-status-text nerv-status-danger">NOMINAL</span>
```

## Critical

<div class="nerv-docs-island">
  <span class="nerv-status-text nerv-status-critical">NOMINAL</span>
</div>

**Spec:** `.nerv-status-critical` is red.

```html
<span class="nerv-status-text nerv-status-critical">NOMINAL</span>
```

## Danger with blink

`.nerv-blink` is documented under [Blink](../core/effects.md#blink).

<div class="nerv-docs-island">
  <span class="nerv-status-text nerv-status-danger nerv-blink">NOMINAL</span>
</div>

```html
<span class="nerv-status-text nerv-status-danger nerv-blink">NOMINAL</span>
```

## Critical with glitch

`.nerv-glitch` needs `data-text` matching the label. Documented under [Glitch](../core/effects.md#glitch).

<div class="nerv-docs-island">
  <span class="nerv-status-text nerv-status-critical nerv-glitch" data-text="NOMINAL">NOMINAL</span>
</div>

```html
<span class="nerv-status-text nerv-status-critical nerv-glitch" data-text="NOMINAL">NOMINAL</span>
```
