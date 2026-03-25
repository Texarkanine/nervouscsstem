# Project Brief — Status Cartouche Element

## User Story

As a consumer of the NERV design system, I want a **status cartouche** component — the single most prolific atomic element in the NERV visual language — so I can display status words and short phrases (IDENTIFIED, LOCKED, CAPTURE, PILOT VANISHED, etc.) in the iconic rounded-rectangle/rectangular framing device seen throughout Evangelion's UI.

## Requirements

### Two Variants

1. **Flex cartouche** (default) — the cartouche sizes itself to fit its text content, using a slightly-compressed appropriate font. This matches traditional web UI elements and doesn't require size specification. The pragmatic "easy" mode.
2. **Fixed cartouche** — requires an explicit size specification. Text stretches (scales on X and Y axes independently) to fill the cartouche dimensions. This replicates the source material's distinctive look where text is scaled UP or DOWN to fully fill the cartouche frame.

### Visual Characteristics

- Single-color border (rounded-rectangle or rectangular) enclosing text
- Consistent stroke weight
- Text in the same color as the border
- Appears as an overlay on whatever content is beneath it
- Font: `.nerv-type-mixed` stack (`'NERV Mixed', 'Shippori Mincho B1', 'Barlow Condensed', sans-serif`) to support mixed JP/EN content
- Text is uppercase, sans-serif, condensed appearance

### Semantic Color Variants

Color follows `$nerv-colors` / glow-flagged tokens (same pattern as `.nerv-glow-*`):
- Amber/orange — informational status (default, follows `--nerv-primary`)
- Red — critical/negative
- Green — positive/cleared
- Blue — condition codes
- White/steel — neutral observation overlays

### Integration

- New SCSS partial `_cartouche.scss` in `src/`
- `@forward` in `nerv.scss` at the appropriate position in the dependency graph
- Demo row on `ref/ref-foundation.html` below the `.nerv-glow-*` box-shadow demo section
- Follow existing naming convention: `.nerv-cartouche`, `.nerv-cartouche-fixed`, `.nerv-cartouche-{color}`

### Constraints

- No image files — pure CSS
- `.nerv-` namespace prefix
- Respect `prefers-reduced-motion` and `prefers-contrast`
- Must support mixed Japanese/English text
