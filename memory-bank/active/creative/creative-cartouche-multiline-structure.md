# UI/UX Decision: Fixed Cartouche Multi-Line Interior Structure

## User & Context

Web developers applying the NERV design system aesthetic. The task is creating multi-cell fixed cartouches that match reference imagery — particularly the "OBJECT: EVA-01" data readout panel in `v5IGB8l.png`, which features a genuinely 2D grid layout (rows AND columns with varying spans and independent text compression per cell).

The current single-`<span>` fixed cartouche works for single-line content. The question is how to extend it for multi-cell layouts without breaking the existing API.

## Design System

- NERV design system spec: `planning/VISION.md`
- Reference imagery: `docs/img/v5IGB8l.png` (multi-line data readout), `docs/img/6AFNuBx.png` (single-line)
- Existing components: `_cartouche.scss` (current), `_table.scss` (separate `.nerv-table` component)
- JS orchestration: `NERV.initCartouches()` in `nerv.js`

## Options Evaluated

- **A: Always-Table** — Every fixed cartouche wraps content in `<table>`, even single-word ones. Consistent but extremely verbose for the 90% single-word case. Breaks existing API.
- **B: Optional Table (Hybrid)** — `<span>` child for single-content (unchanged from current); `<table>` child for multi-cell grid layouts. Extends existing API without breaking it.
- **C: Span-Only Rows** — Multiple `<span>` children stack vertically with per-row horizontal scaling. Simple but limited to single-column stacking — cannot reproduce reference image's two-column first row.
- **D: Nested Cartouches** — Compose multiple individual cartouches inside a wrapper. Creates double borders, confusing nesting, doesn't match reference imagery.

## Analysis

| Criterion | A: Always-Table | B: Optional Table | C: Span Rows | D: Nested |
|---|---|---|---|---|
| Usability | Poor — verbose for 90% case | Good — simple stays simple | Moderate | Poor |
| Clarity | One pattern, forced | Two modes, obvious switch | Clear but incomplete | Ambiguous |
| Accessibility | Good (table ARIA) | Good (tables for data) | Good (simple DOM) | Poor |
| Consistency | Breaks existing API | Extends cleanly | Extends cleanly | New pattern |
| Feasibility | Easy JS, CSS reset | Two JS paths, one CSS reset | Easiest | Border issues |
| 2D Layout | Full | Full (in table mode) | **Rows only** | Independent |
| Reference match | Full | Full | **Partial** | Poor |

Key insights:
- Option C is disqualified by the reference imagery: the upper-left cartouche in `v5IGB8l.png` has a two-column first row ("OBJECT :" + nested "EVA-01") that flat `<span>` stacking cannot reproduce.
- No `.nerv-table` style leak risk: a raw `<table>` (without `.nerv-table` class) inside a cartouche won't pick up `.nerv-table` styling, since those rules require the class on the `<table>` element.
- The 90%+ common case is single-word/phrase cartouches. Forcing table boilerplate on them (Option A) is a significant DX penalty for no benefit.

## Decision

**Selected**: Option B — Optional Table (Hybrid)

**Rationale**: Only option satisfying all three critical constraints: (1) common single-content case stays unchanged (no API break, no verbosity), (2) complex multi-cell layouts get full 2D grid via native HTML tables with colspan/rowspan, (3) reference imagery is fully reproducible. The two-mode detection is trivial (`el.querySelector('table')`).

**Tradeoff**: Two code paths in JS (single-child vs table). Accepted because detection is a single DOM query and each path is straightforward.

## Implementation Notes

### CSS Additions
- `.nerv-cartouche-fixed > table`: `width: 100%; height: 100%; border-collapse: collapse;` — table fills the cartouche frame
- `.nerv-cartouche-fixed > table td`: `padding: 0; border: none; background: transparent; white-space: nowrap; overflow: hidden; color: inherit; font: inherit;` — cells are purely structural, all visual styling inherited from cartouche
- Each `<td>` gets its own `transform: scale(var(--nerv-cartouche-sx, 1), var(--nerv-cartouche-sy, 1))` via per-cell CSS custom properties set by JS

### JS Changes to `initCartouches`
- After finding `.nerv-cartouche-fixed`, check `el.querySelector('table')`
- **Table mode**: iterate `<td>` elements, measure each cell's natural text dimensions vs. its rendered cell dimensions, set per-cell `--nerv-cartouche-sx`/`--nerv-cartouche-sy` on each `<td>`
- **Span mode**: current single-child behavior, unchanged

### HTML API
```html
<!-- Single-content (unchanged): -->
<span class="nerv-cartouche nerv-cartouche-fixed nerv-cartouche-red"
      style="width: 180px; height: 36px;">
  <span>IDENTIFIED</span>
</span>

<!-- Multi-cell (new — table mode): -->
<span class="nerv-cartouche nerv-cartouche-fixed nerv-cartouche-steel"
      style="width: 280px; height: 100px;">
  <table>
    <tr>
      <td>OBJECT :</td>
      <td class="nerv-cartouche nerv-cartouche-steel">EVA-01</td>
    </tr>
    <tr><td colspan="2">ENTRY PLUG: INTERIOR</td></tr>
    <tr><td colspan="2">LIVE</td></tr>
    <tr><td colspan="2">DIRECT CONNECTION NO. 316</td></tr>
  </table>
</span>
```

### Accessibility
- Inner `<table>` benefits from native table semantics (screen readers announce row/cell structure)
- No `.nerv-table` class needed — it's purely structural
- Color contrast and high-contrast mode handled by the cartouche frame, not the inner table

### No responsive behavior needed
- Fixed cartouches have explicit dimensions; they don't reflow
