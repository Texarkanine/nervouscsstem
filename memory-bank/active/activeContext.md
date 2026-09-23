# Active Context

- **Current Task:** Offline font-and-JS bundle (issue #7)
- **Phase:** PLAN - COMPLETE
- **What Was Done:** Level 3 plan written to `tasks.md`. Two creative decisions resolved with high confidence: `fflate` zip writer with a fixed local-field `mtime`, and deriving each face's fontsource file from the CSS by `unicode-range` equality. Inline decisions: pin Shippori's 12 CSS subsets, follow the CSS for Antonio (variable font), DSEG7 at 5.2.5, upstream copyright lines (with the Plex RFN) in README + manifest.
- **Next Step:** Preflight (subagent).
