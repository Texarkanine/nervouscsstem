# Architecture decision: tiled hex grid variant

Recovered from `memory-bank/active/creative/creative-tiled-hex-grid-variant.md` (M7 creative phase). **Decision still stands:** true honeycomb tessellation belongs as a third variant on `_hex-grid.scss`, not as a table row type.

**Status after M7:** Hexagon *table* rows were explored and **removed** from the shipped table system (sub-pixel gaps with `clip-path` on adjacent cells, variable cell width vs fixed tessellation math). Tables use triangle and parallelogram row styles instead. **`.nerv-hex-grid-tiled` is not implemented yet** — this document remains the reference when that work is picked up.

---

## Requirements & constraints

**Functional requirements:**

- Provide a hexagon layout variant with true honeycomb tessellation (no gaps, no overlaps)
- Must be discoverable and usable by consumers
- Must align with existing component organization patterns

**Quality attributes (ranked):**

1. **Simplicity** — Prefer the simplest approach that meets requirements
2. **Maintainability** — Code should be understandable and follow existing patterns
3. **Discoverability** — Consumers should easily find and use the feature
4. **Consistency** — Align with existing component organization (tables vs. grids)

**Technical constraints:**

- All selectors use `.nerv-` prefix
- No duplication of functionality
- Must work within existing SCSS module system (`_name.scss` partials, `@forward` order)
- Existing hex-grid component already has overlapping and spaced variants

**Boundaries:**

- **In scope:** Where the tiled hex grid variant should live (table component vs. hex-grid component vs. technique)
- **Out of scope:** Implementation details of the tiling math (build-phase concern)

## Components

The system has two relevant components:

1. **`_hex-grid.scss`** — Hexagonal cell grid component
   - Current variants: `.nerv-hex-grid` (overlapping), `.nerv-hex-grid-spaced` (gapped)
   - Structure: flexbox column container with `.nerv-hex-row` children containing `.nerv-hex-cell` elements
   - Purpose: Warning displays and status grids
   - Uses fixed cell width (`$_hex-cell-width: 80px`) and negative margin overlap

2. **`_table.scss`** — Table styling component
   - Purpose: Tabular data with geometric row types
   - Table cells are **variable width**; hex tessellation math assumes **fixed** cell geometry

**Relationship:** Hex-grid and “hex-like” table rows were both discussed under M7, but they serve different jobs:

- Hex-grid: fixed-size cells in a flex layout (status / warning grids)
- Table rows: variable-width data cells — poor fit for perfect honeycomb math, and `clip-path` hex cells in tables hit browser rendering limits (see capstone archive for M7)

## Options evaluated

- **Option A: Table variant (`.nerv-table-hex-tiled`)** — Implement tiled hex as a table row type alongside other geometric row types.

- **Option B: Hex-grid variant (`.nerv-hex-grid-tiled`)** — Add a third spacing variant to `_hex-grid.scss` that eliminates both overlaps and gaps.

- **Option C: Technique/documentation only** — Document sizing math for consumers; no new component code.

## Analysis

| Criterion        | Option A (Table) | Option B (Hex-grid) | Option C (Technique) |
| ---------------- | ---------------- | ------------------- | -------------------- |
| **Fitness**      | Partial — variable cell widths fight perfect tessellation | High — fixed widths, straightforward math | Low — consumers reimplement math |
| **Simplicity**   | Low — complexity in table, duplicated hex logic | High — one extra modifier | Highest — no code |
| **Maintainability** | Medium — two homes for hex logic | High — hex logic stays in hex-grid | Low — no maintained implementation |
| **Discoverability** | Medium | High — next to other hex-grid variants | Low — buried in docs |
| **Consistency**  | Low | High — matches spaced/overlapping pattern | Medium |
| **Risk**         | Medium | Low | Low (unused feature risk) |

**Key insights:**

- Hex-grid already has infrastructure (fixed cell widths, row offset math); a tiled variant is a natural extension.
- Perfect tessellation and **variable-width table cells** do not pair well; table hex rows were abandoned in M7 for separate rendering reasons as well.
- Option C fails discoverability — consumers should not rederive tessellation math.

**Quality tension:** Simplicity favors C, but fitness, discoverability, and consistency favor B.

## Decision

**Selected:** **Option B** — Hex-grid variant **`.nerv-hex-grid-tiled`** in `_hex-grid.scss`.

**Rationale:** Hex-grid is the established home for hex layouts (overlapping + spaced already). Fixed cell width makes tessellation tractable. Single component owns all hex layout modes.

**Tradeoff:** Tiled tessellation is **not** a table feature. M7 tables focus on row types that work with real `<table>` layout (e.g. triangle, parallelogram); honeycomb remains this future hex-grid task.

## Implementation notes (for when built)

- **Boundary:** `_hex-grid.scss`, not `_table.scss`.
- **Shape of the modifier:** `.nerv-hex-grid-tiled` should:
  - Remove negative-margin overlap (or replace with calculated spacing)
  - Close gaps (e.g. `gap: 0` or computed offsets)
  - Apply precise cell width + row offset math for true tessellation
- **Migration:** New feature — no existing tiled consumers to migrate.
