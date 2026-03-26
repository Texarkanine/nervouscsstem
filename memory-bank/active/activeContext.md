# Active Context

- **Current Task:** Cartouche typeface — Antonio
- **Phase:** REFLECT COMPLETE
- **What Was Done:**
  - Added Antonio @font-face (400+700, latin+latin-ext) in `_typography.scss`
  - Created `NERV Cartouche` composite @font-face (Antonio for Latin, Shippori for CJK)
  - Switched `.nerv-cartouche` font-family to Antonio-based stack
  - Added Canvas TextMetrics vertical centering correction (`--nerv-cartouche-ty`) in `nerv.js`
  - Updated tests (B4 + B8 in components, 3 new in foundation), techContext.md
  - Left `NERV Mixed` entirely untouched
- **Next Step:** Run `/niko-archive` to finalize
