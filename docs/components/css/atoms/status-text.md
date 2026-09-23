# Status text

Large alert labels. Severity classes set color. Animation is opt-in via [Effects](../core/effects.md). CSS does not compose a suggested serving.

![Full-bleed status card](../../../img/status-text.png)

## Base

Filler is the same word on every severity.

```html island
<span class="nerv-status-text">NOMINAL</span>
```

**Spec:** `.nerv-status-text` is the large overlay type.

## Nominal

```html island
<span class="nerv-status-text nerv-status-nominal">NOMINAL</span>
```

**Spec:** `.nerv-status-nominal` is green.

## Caution

```html island
<span class="nerv-status-text nerv-status-caution">NOMINAL</span>
```

**Spec:** `.nerv-status-caution` is amber.

## Danger

```html island
<span class="nerv-status-text nerv-status-danger">NOMINAL</span>
```

**Spec:** `.nerv-status-danger` is red.

## Critical

```html island
<span class="nerv-status-text nerv-status-critical">NOMINAL</span>
```

**Spec:** `.nerv-status-critical` is red.

## Danger with blink

`.nerv-blink` is documented under [Blink](../core/effects.md#blink).

```html island
<span class="nerv-status-text nerv-status-danger nerv-blink">NOMINAL</span>
```

## Critical with glitch

`.nerv-glitch` needs `data-text` matching the label. Documented under [Glitch](../core/effects.md#glitch).

```html island
<span class="nerv-status-text nerv-status-critical nerv-glitch" data-text="NOMINAL">NOMINAL</span>
```
