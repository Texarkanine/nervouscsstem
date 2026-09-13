# Status text

Large alert labels. Severity classes set color. Animation is opt-in via `.nerv-blink` / `.nerv-glitch` — this page does not compose a suggested serving.

![Full-bleed status card](../img/status-text.png)

## Base

Filler is the same word on every severity.

<div class="nerv-docs-island">
  <span class="nerv-status-text">NOMINAL</span>
</div>

**Spec:** `.nerv-status-text` is the large overlay type.

```html
<span class="nerv-status-text">NOMINAL</span>
```

## Severity

<div class="nerv-docs-island">
  <span class="nerv-status-text nerv-status-nominal">NOMINAL</span>
  <span class="nerv-status-text nerv-status-caution">NOMINAL</span>
  <span class="nerv-status-text nerv-status-danger">NOMINAL</span>
  <span class="nerv-status-text nerv-status-critical">NOMINAL</span>
</div>

**Spec:** `.nerv-status-nominal` is green. `.nerv-status-caution` is amber. `.nerv-status-danger` and `.nerv-status-critical` are red. Consumers add `.nerv-blink` to danger and `.nerv-glitch` (with `data-text`) to critical — those classes are documented on [Effects](../css/effects.md).
