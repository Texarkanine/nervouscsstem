# Troubleshooting: Table Geometric Row Sub-Pixel Gaps

**Date**: 2026-03-19
**Component**: `_table.scss` — geometric row types
**Symptom**: Visible 1px black lines between rows of geometric table cells at various zoom levels

## Step 3 — Re-Scope

The core problem is **not** padding, borders, or border-collapse. It is a fundamental browser rendering limitation: `clip-path` on adjacent `<td>` elements causes sub-pixel gaps at row boundaries because each cell is rasterized independently.

The real question: **which geometric shapes belong in `<table>` and which techniques (clip-path vs transform) should each use?**

## Step 4 — System Map

| Technique     | Mechanism                       | Borders? | Gap Risk | Prior Art     |
|---------------|---------------------------------|----------|----------|---------------|
| `clip-path`   | Clips element to polygon        | NO       | HIGH     | list hex/arrow |
| `skewX`       | Transform on `::before` pseudo  | YES      | NONE     | `_list.scss` para |
| Rectangle     | No transform                    | YES      | NONE     | base table    |

## Step 5 — Hypotheses

1. **Hex gaps are unfixable in tables** — hex shapes have long horizontal contact edges between rows, making sub-pixel gaps maximally visible. No CSS fix exists.
2. **Triangle gaps are invisible** — triangle points create minimal overlap area, gap falls in triangular void between shapes. User confirmed "triangles look fine."
3. **Trapezoid gaps are acceptable** — angled contact edges make gaps less visible than hex. User confirmed "trapezoid orange remains fine."
4. **Parallelogram via skewX would have NO gaps** — transform-based, not clip-path-based. Borders survive. Proven pattern from `_list.scss`.

## Step 6 — Evidence

### 6a. Clip-path shapes: gap visibility correlates with horizontal contact length

- **Hex** (`polygon(25% 0%, 75% 0%, ...)`) — top/bottom edges span 50% of cell width horizontally at y=0% and y=100%. Long horizontal contact → gap clearly visible. ✗
- **Triangle** (`polygon(50% 0%, 100% 100%, 0% 100%)`) — apex is a single point at y=0%. Bottom edge spans 100% but alternating up/down means adjacent row contacts are scattered. Gap falls in the void. ✓
- **Trapezoid** (`polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)`) — top edge is narrower, bottom edge is full. Alternating inverts. The angled sides help break up any gap line visually. ✓

### 6b. skewX technique: no gap possible

The `_list.scss` parallelogram uses `::before` with `skewX`. The pseudo-element is the visual shape; the `<li>` itself is transparent. Since the visual shape is a transform of a solid rectangle (not a clip), there are no rasterization boundaries between adjacent items. Borders apply to the pseudo-element and survive the skew.

For tables: `<td>` can use `position: relative` + `::before { position: absolute; inset: 0; transform: skewX(...); }` — same technique. The cell is the layout box, the pseudo is the visual parallelogram. Text stays in the rectangular cell, pseudo shows the skewed shape behind it.

### 6c. Hexagons in tables are architecturally wrong

Hexagonal grids need tight 2D tessellation with offset columns. HTML `<table>` is a 1D row-based layout — it can't express hex grid offset naturally. The `translateX` hack on even rows is fragile and doesn't produce true tessellation. A dedicated `_hex-grid.scss` using CSS Grid is the right tool.

## Step 7 — Confirmed Root Cause

`clip-path` on `<td>` elements creates browser-level sub-pixel rendering gaps between rows. This is inherent to how browsers rasterize adjacent clipped elements and **cannot be fixed with CSS**. The severity depends on the shape's horizontal contact area: hexes are worst, triangles are acceptable, trapezoids are acceptable.

## Step 8 — Proposed Solution: Reshape the Geometric Offering

### Keep (clip-path, borderless only — gap is acceptable):
- **Triangle** — gap invisible at triangle points
- **Trapezoid** — gap acceptable at angled edges

### Add (transform-based, borders work):
- **Parallelogram** — `skewX` on `::before` (like `_list.scss`), no gap, borders survive

### Remove from tables:
- **Hex** — sub-pixel gaps clearly visible, architecturally wrong for tables
- **Hex-alt** — same issues

### Border/fill compatibility matrix:

| Shape         | default | bordered | outline | solid | borderless |
|---------------|---------|----------|---------|-------|------------|
| Rectangle     | ✓       | ✓        | ✓       | ✓     | ✓          |
| Parallelogram | ✓       | ✓        | ✓       | ✓     | ✓          |
| Triangle      | ✓       | —        | —       | ✓     | ✓          |
| Trapezoid     | ✓       | —        | —       | ✓     | ✓          |

(— = clip-path clips borders away; documented limitation)

## Final Decision (Operator-confirmed)

**Geometric table shapes — final offering:**

| Shape         | Technique   | Borders? | Default Behavior       | Uniform Modifier |
|---------------|-------------|----------|------------------------|------------------|
| Rectangle     | none        | YES      | standard cells         | n/a              |
| Parallelogram | `skewX`     | **YES**  | alternating skew/row   | `.nerv-table-uniform` |
| Triangle      | `clip-path` | no       | alternating up/down    | `.nerv-table-uniform` |

**Removed from tables:**
- Trapezoid — clip-path unreliable across sizes
- Hex / Hex-alt — sub-pixel gaps, architecturally wrong for tables (punt to `_hex-grid.scss`)

**Key design principle:** Only use clip-path when (a) the result is correct and (b) borderless looks cool enough. Transform-based shapes (para) get full fill mode support.

## Step 9 — Implementation Plan

- [ ] Remove hex, hex-alt, trapezoid from `_table.scss` (table-level + row-level)
- [ ] Remove `border-collapse: collapse` grouped rule (no longer needed)
- [ ] Add parallelogram via `skewX` on `::before` with alternating default
- [ ] Add `.nerv-table-uniform` modifier for "all same direction"
- [ ] Add para fill-mode overrides (bordered/outline/solid on `::before`)
- [ ] Update doc comment
- [ ] Remove hex/trap tests, add para + uniform tests
- [ ] Remove hex/trap ref demos, add para demos
- [ ] Full test suite + build pass
- [ ] Visual verification
