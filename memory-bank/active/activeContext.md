# Active Context

- **Current Task:** Customizable `.nerv-select` via `appearance: base-select` (issue #3)
- **Phase:** QA - COMPLETE (PASS)
- **Files modified:** `src/_form.scss` (section 3b `@supports` block + top-level `:has()` mirroring + header docs), `test/components.test.mjs` (B1–B10), `ref/ref-forms.html` (Customizable Select rows), `docs/components/css/structure/forms.md` (support prose + colored-options example + class table)
- **Build decisions (beyond creative doc):**
    - `border-radius: 0` on select and picker: base-select UA styles round the corners.
    - Colored option ink is `color-mix(option 60%, white)`: red-deep text on its own 0.5 fill was illegible.
    - `.nerv-select.nerv-select-solid` doubled class so solid beats `option[class*='nerv-option-']`.
    - Mirroring lives outside `@supports` (preflight advisory accepted).
- **Integration results:** `npm test` 383/383; lint 10 errors (all pre-existing); `docs:build` clean. Chromium 153: base-select active, picker/hex/solid/critical/contrast screenshots OK, reduced-motion transition 0s, mirroring after pick confirmed. Firefox 155: `appearance: none`, SVG arrow, padding unchanged; closed boxes tinted via `:has()`; rich `<button><selectedcontent>` markup renders harmlessly.
- **Known limitation:** Firefox fallback arrow SVG is hardcoded amber, so it stays amber on a mirrored red box (pre-existing fallback rule; left unchanged by contract).
- **Next Step:** QA (subagent).
