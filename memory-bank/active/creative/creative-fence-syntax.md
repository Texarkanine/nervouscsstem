# Decision: Fence Authoring Syntax

## Requirements & Constraints

- One fence body produces island + highlighted copy.
- Chrome (`data-nerv-init`, `nerv-state-*`) lives in fence options, never in the body.
- Plain `html` fences (scanlines, any recipe without a demo) must keep rendering exactly as today.
- Mistyped options must fail the build, not silently render a dead island.

Evidence (superfences 10.x source + PoC): custom fences are tried in reverse registration order; a validator returning `False` falls through to the next entry and finally to stock highlighting; a `SuperFencesException` raised by a validator propagates and aborts the build; bare options arrive as `key=key`; the formatter can call `md.preprocessors['fenced_code_block'].highlight(...)` to get byte-identical stock output (PoC confirmed identical `<div class="highlight">`).

## Options Evaluated

- **A. Custom fence named `html`, gated on a bare `island` option**: ```` ```html island init="bar-meters" state="alert" ````.
- **B. New fence name**: ```` ```nerv-island init="bar-meters" ````.
- **C. Brace attributes**: ```` ```{.html .island data-nerv-init="bar-meters"} ````.

## Analysis

- A keeps `html` as the info-string language, so editors and GitHub still highlight the body; plain `html` fences fall through untouched; the stock highlighter receives `language="html"` naturally.
- B loses editor/GitHub highlighting and needs the formatter to override the language.
- C puts `data-nerv-init` literally in the fence header, which reads like paste markup, and routes through `attr_list` semantics that superfences rejects for custom fences when attrs are non-empty.

## Decision

### Choice Pre-Mortem

- Registering a custom fence named `html` might hijack every `html` fence: **checked** — validator returns `False` without `island`; PoC plain fence output matched stock.
- A typo like `inti="radar"` could silently produce a stock fence: **checked** — once `island` is present, unknown keys raise `SuperFencesException`, aborting the build.

**Selected**: A.
**Contract**:
- `island` (bare) — required to opt in.
- `init="<kind>"` — adds `data-nerv-init="<kind>"` to the island.
- `state="<name>"` — adds `nerv-state-<name>` to the island class.
- Values must match `^[a-z][a-z0-9-]*$` (safe in an attribute, no escaping needed); valueless `init` / `state` and unknown keys raise. The value set is not pinned to today's kinds/states — `docs-init.js` and the product CSS own those lists.
- Island class comes from the fence's `class:` in `properdocs.yml` (`nerv-docs-island`).
- `<script>…</script>` elements (any attributes, any case) are removed from the island only; the copy keeps them.
**Tradeoff**: values are only syntax-checked, so `state="alrt"` builds an untinted island. Accepted: pinning the list would duplicate product CSS in a docs tool.
