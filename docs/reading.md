
## 1. References & Sources

### Primary Visual References

| Source | URL | What It Provides |
|--------|-----|------------------|
| Fonts In Use: NGE | https://fontsinuse.com/uses/28760/neon-genesis-evangelion | Definitive typography identification (Matisse EB, Helvetica, Chicago) |
| Zemnmez: "Why We Don't Have UIs Like NGE" | https://zemnmez.medium.com/why-we-dont-have-uis-like-the-ones-in-neon-genesis-9b6631dc3714 | Design philosophy — vector CRT heritage, why the shapes are what they are |
| Medium: "The Beautiful Chaos" | https://medium.com/@gennarolgr/the-beautiful-chaos-ui-ux-design-storytelling-in-neon-genesis-evangelion-26ae2d09613f | UX analysis — interfaces designed for belief, not comprehension |
| ASTROMONO: UI Design of Evangelion | https://astromono.wordpress.com/2015/06/04/ui-design-of-evangelion/ | Observation that shapes derive from real data viz (Venn, Gauss curves) |
| Pedro Fleming: NGE Screen Graphics | https://www.behance.net/gallery/96540159/Neon-Genesis-Evangelion-Screen-Graphics | High-res FUI/HUD recreations as reference art |
| Adobe Color: NGE UI palette | https://color.adobe.com/Neon-Genesis-Evangelion-UI-color-theme-21046527/ | Community-sourced color extraction |

### Prior Art (Code)

| Repo | URL | Relevance |
|------|-----|-----------|
| TheGreatGildo/nerv-ui | https://github.com/TheGreatGildo/nerv-ui | Claude Code skill + 808-line CSS. Best color system (5 phosphor colors with defined roles). Escalation states. CRT effects. NOT a reskinning tool — builds from scratch only. |
| bagusindrayana/ews-concept-new | https://github.com/bagusindrayana/ews-concept-new | Svelte earthquake warning app skinned as NERV. **Best CSS technique source**: stripe bars via `repeating-linear-gradient`, hex grids via `clip-path`, glow via `drop-shadow` + directional `text-shadow`, Mental Toxicity Level bar meter component. Uses SVG images for some hexes (we'll replace with pure CSS). |
| GLAO274/Evangelion-Style-Hexagon-Warning-Error-Page | https://github.com/GLAO274/Evangelion-Style-Hexagon-Warning-Error-Page | Hex grid via JS-generated SVG. Glitch animation via `clip-path` on `::before`/`::after` — **steal this technique**. Flicker state machine (3 states, random timer). |
| lotap/magi-theme | https://github.com/lotap/magi-theme | Terminal color palette only. Cross-reference values: orange primary `#f06800`, useful as darker end of amber range. |
| MichalSvatos/pi-hole-lcars-next-gen | https://github.com/MichalSvatos/pi-hole-lcars-next-gen | LCARS (Star Trek) theme for Pi-hole. **Mechanical reference** for how to override AdminLTE via pure CSS. Proves the approach works. |
| GitHub topic: evangelion | https://github.com/topics/evangelion | Index of Obsidian themes, Neovim colorschemes, error pages, timers. Mostly palette swaps; no structural systems. |

### Pi-hole Theming References

| Source | URL | What It Provides |
|--------|-----|------------------|
| theme-park: Pi-hole | https://docs.theme-park.dev/themes/pihole/ | CSP bypass technique for injecting external CSS into Pi-hole |
| jacobbates/pi-hole-midnight | https://github.com/jacobbates/pi-hole-midnight | Simple CSS override via `skin-blue.min.css` replacement |
