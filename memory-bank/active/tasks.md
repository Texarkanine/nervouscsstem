# Task: M3 — Gradient Presets for Bar Meters

* Task ID: nerv-m3-gradient-presets
* Complexity: Level 2
* Type: Simple Enhancement

Add built-in gradient preset classes to `.nerv-bar-meter` containers. Each preset class overrides `--nerv-bar-from` and `--nerv-bar-to` with a curated pair of named data tokens drawn from common NGE UI patterns, eliminating the need for inline `style` attributes.

Presets:
- `.nerv-bar-thermal` — `--nerv-green` → `--nerv-red` (canonical NGE gauge: healthy→danger)
- `.nerv-bar-energy` — `--nerv-cyan` → `--nerv-blue` (power/operational data readouts)
- `.nerv-bar-warning` — `--nerv-amber` → `--nerv-red` (warning/damage indicators)
- `.nerv-bar-field` — `--nerv-void` → `--nerv-amber` (AT field / boundary extent displays)

## Test Plan (TDD)

### Behaviors to Verify

- [B1 — thermal preset exists]: `.nerv-bar-thermal` class in compiled CSS → sets `--nerv-bar-from` to `var(--nerv-green)` and `--nerv-bar-to` to `var(--nerv-red)`
- [B2 — energy preset exists]: `.nerv-bar-energy` class in compiled CSS → sets `--nerv-bar-from` to `var(--nerv-cyan)` and `--nerv-bar-to` to `var(--nerv-blue)`
- [B3 — warning preset exists]: `.nerv-bar-warning` class in compiled CSS → sets `--nerv-bar-from` to `var(--nerv-amber)` and `--nerv-bar-to` to `var(--nerv-red)`
- [B4 — field preset exists]: `.nerv-bar-field` class in compiled CSS → sets `--nerv-bar-from` to `var(--nerv-void)` and `--nerv-bar-to` to `var(--nerv-amber)`
- [B5 — presets are color-only]: each preset block contains only `--nerv-bar-from` and `--nerv-bar-to` — no `display`, `flex-direction`, `gap`, or other layout properties
- [E1 — regression: defaults unchanged]: `.nerv-bar-meter` container still declares `--nerv-bar-from: var(--nerv-cyan)` and `--nerv-bar-to: var(--nerv-blue)` as defaults

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/components.test.mjs`
- Conventions: `describe` blocks per component, `it` blocks per behavior, compiled CSS string matching
- New test files: none — new `describe` block in existing `test/components.test.mjs`

## Implementation Plan

1. **Write failing tests** (TDD cycle 1 — all preset tests)
   - Files: `test/components.test.mjs`
   - Changes: add `describe('Bar meter gradient presets', ...)` block with tests for B1–B5 and E1

2. **Add preset classes** (TDD cycle 2 — make tests pass)
   - Files: `src/_bar-meter.scss`
   - Changes: append `.nerv-bar-thermal`, `.nerv-bar-energy`, `.nerv-bar-warning`, `.nerv-bar-field` classes, each setting `--nerv-bar-from` and `--nerv-bar-to` to the appropriate token values

3. **Update reference page** (demonstrate presets in existing bar meter section)
   - Files: `ref/ref-components.html`
   - Changes: replace inline `style="--nerv-bar-from: ...; --nerv-bar-to: ...;"` attributes on Zone B bar meters with preset classes; add a 4th bar meter row demonstrating `.nerv-bar-warning`

4. **Update bar-meter SCSS doc comment** (document new classes)
   - Files: `src/_bar-meter.scss`
   - Changes: add preset classes to the `/// Classes:` section in the file header

## Technology Validation

No new technology — validation not required.

## Dependencies

- Existing named data tokens from `_tokens.scss` (`--nerv-green`, `--nerv-red`, `--nerv-cyan`, `--nerv-blue`, `--nerv-amber`, `--nerv-void`)
- Existing `--nerv-bar-from` / `--nerv-bar-to` custom property mechanism in `.nerv-bar-meter`

## Challenges & Mitigations

- **Specificity**: preset classes must have equal or higher specificity than `.nerv-bar-meter`'s default declarations. Since `.nerv-bar-thermal` is a separate class applied alongside `.nerv-bar-meter`, it will appear later in source order and win. Mitigation: verify via compiled CSS output.
- **No consumer confusion**: classes should not set any property other than color tokens so they compose cleanly with `.nerv-bar-meter-vertical` and other modifiers. Mitigation: test B5 explicitly checks for color-only properties.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [ ] Preflight
- [ ] Build
- [ ] QA
