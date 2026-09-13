---
name: nerv
description: Apply the NERV Evangelion CRT-console design system. Use when theming a web UI with NERV visuals or when the user mentions nervouscsstem, nerv.css, or Evangelion HUD chrome.
metadata:
  version: "0.2.0" # x-release-please-version
---

# NERV design system

Placeholder skill. Apply the NERV visual language (`.nerv-` CSS, optional `nerv.js` orchestration) to a host page. Constraints: no canvas/WebGL, no image files in the stylesheet, `prefers-reduced-motion` and `prefers-contrast` respected.

Authoring source of truth remains the repository `docs/` tree. This skill carries a markdown copy of that tree so installers get the docs without cloning the whole repo.

## Docs in this skill

Read [docs/index.md](docs/index.md) first. Using pages (CSS, panels, bar meters) show preview / spec / code. Live rendered examples and the screenshot library live on [GitHub Pages](https://texarkanine.github.io/nervouscsstem/). Do not expect `img/` stills inside this skill.

## Install

```bash
npx skills add Texarkanine/nervouscsstem
```

Published CSS/JS: `npm i nervouscsstem` or the jsDelivr URLs on the package README.
