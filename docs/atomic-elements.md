# NERV UI Atomic Visual Elements

A companion to the [NERV UI Visual Language Taxonomy](design-language.md). Where that document catalogs the *compositions* — the large-scale patterns built from multiple elements — this document catalogs the *atoms*: the smallest recurring visual units that compose those larger patterns. These are the building blocks. The LEGO bricks of the Evangelion FUI.

Sourced from close examination of all 271 reference frames in the [Evangelion User Interfaces album](https://imgur.com/a/mvW7g).

---

## 1. Status Cartouche

A single-color rounded-rectangle or rectangular border enclosing a status word or short phrase. The border has a consistent stroke weight; the text inside is typically condensed sans-serif in the same color as the border. The cartouche appears as an overlay on whatever content is beneath it. This is arguably the single most prolific atomic element in the entire NERV visual language — it carries every status word the system needs to communicate: IDENTIFIED, LOCKED, CAPTURE, REFUSED, VANISHED, MISSING, DAMAGED, OPERATING, DELETED, OPEN, PILOT VANISHED, SIGNAL LOST, and dozens more.

The cartouche changes color to match its semantic context: amber/orange for informational status, red for critical/negative, green for positive/cleared, blue for condition codes, white for neutral observation overlays. The shape is always the same. The atom is the *framing device*, not its content.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/96MYsJJ.png) | NGE-24 00:13:29 | Red IDENTIFIED cartouche below 17th ANGEL — the canonical example |
| ![](https://i.imgur.com/6AFNuBx.png) | NGE-10 00:15:53 | Amber CAPTURE cartouche centered on AT Field targeting display |
| ![](https://i.imgur.com/v5IGB8l.png) | NGE-20 00:05:23 | White PILOT VANISHED and OBJECT: EVA-01 cartouches on observation feed |
| ![](https://i.imgur.com/IL7a4b7.png) | NGE-15 00:20:39 | Amber LOCKED on physical hardware display, with adjacent green OPEN state in jT5JBme |

---

## 2. Psychographic / Sync Curve Trace

A continuous line graph that starts as orderly parallel sinusoidal waves and degrades into chaotic, tangled scribbling as synchronization or mental state deteriorates. The line is drawn in amber/orange on a calibrated axis grid. When stable, the curves are smooth and rhythmic; when unstable, they become Lissajous-like tangles that fill and overflow the graph area. The visual contrast between order and chaos is the entire point — the line *is* the pilot's mind.

Appears in two distinct sub-variants: the **dual-helix sync waveform** (two interleaved sinusoids in red/blue/pink) and the **psychographic display** (single amber trace with labeled LINK A¹ through A¹⁰ channels that fan out into noise).

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/oLImu0Z.png) | NGE-22 00:15:13 | PSYCHOGRAPHIC DISPLAY Phase 4, S.A.LANGLEY: EVA-02 PILOT — ten LINK channels fanning into chaos |
| ![](https://i.imgur.com/xpXqrIF.png) | EoE 00:55:39 | PSYCHOGRAPHIC DISPLAY with exponential curve and histogram — Shinji's trace |
| ![](https://i.imgur.com/CVRmev3.png) | NGE-19 00:13:29 | Dual-helix sync waveform, orderly state — the red/blue interleave at full coherence |
| ![](https://i.imgur.com/fAfmHO4.png) | NGE-14 00:18:05 | Same dual-helix waveform with slight phase offset, orange dominant |

---

## 3. SOUND ONLY Card

A light-blue rectangular card with dark text reading 音声 (onsē) above SOUND ONLY, bordered by a thin red or amber outline. Appears when a communication channel is active but no video feed is available. The card replaces the video panel entirely — it's not overlaid on static, it *is* the display. The blue is a distinctive pale cerulean, unique in the NERV palette which otherwise runs amber/green/red.

A variant exists for SEELE communications: red text (SEELE ##, SOUND ONLY) on a dark monolith shape, inverting the color relationship.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/UWyUOzO.png) | NGE-12 00:20:13 | Standard form: blue card with red border, FROM:DDG-099 source tag, viewed by Misato |
| ![](https://i.imgur.com/oBFKlZo.png) | NGE-20 00:13:11 | Same card, slightly different angle — the FROM:DDG-099 tag visible at top-left |
| ![](https://i.imgur.com/HrOTgTd.png) | NGE-21 00:02:55 | SEELE variant: red SEELE 03 / SOUND ONLY on black monolith |

---

## 4. X-Mark Registration Grid

A variant of the crosshair grid overlay using × (rotated cross) marks instead of + marks. The × marks are typically orange or white, spaced in a regular grid over satellite imagery, observation feeds, or thermal views. Functionally identical to the + crosshair grid but visually distinct — the × variant appears specifically on feeds labeled as satellite photos, observation stations, and long-range sensors. The + variant appears on closer-range tactical and command center displays.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/7oWALLU.png) | NGE-17 00:05:01 | White × grid over OBSERVATION SAT. 8 / NEVADA U.S. satellite imagery with COUNTDOWN badge |
| ![](https://i.imgur.com/BepmTjl.png) | NGE-22 00:11:39 | White × grid over 15th Angel observation with REALTIME DISPLAY / MAXIMUM MAGNIFICATION cartouche |
| ![](https://i.imgur.com/HVxScI6.png) | NGE-23 00:06:43 | White × grid over 16th Angel with OBJECT: 16th ANGEL / BLOOD TYPE: BLUE cartouche |
| ![](https://i.imgur.com/qE5Q5bw.png) | NGE-20 00:15:59 | Orange × grid on red-tinted EVA-01 entry plug interior feed |

---

## 5. LIVE Badge

A boxed label reading LIVE followed by source/channel identification: PICTURE ×01, FROM KIKU-07, DIRECT CONNECTION NO. 316, etc. Always appears in the corner of a video or sensor feed to denote real-time data. The box is typically a simple single-stroke rectangle. The word LIVE is always uppercase, always in the same condensed typeface. Sometimes accompanied by a secondary channel number or magnification indicator (×08, ×05).

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/MU0Vwc5.png) | NGE-10 00:15:43 | LIVE PICTURE ×01 in bottom-right corner of thermal feed |
| ![](https://i.imgur.com/VKEziDO.png) | NGE-5 00:09:57 | LIVE ×08 badge in bottom-right of crosshair-overlaid observation feed |
| ![](https://i.imgur.com/1bfh9W4.png) | NGE-13 00:12:19 | MAGNIFICATION ×10⁵ / LIVE in top-left of Pribnow Box microscopy |
| ![](https://i.imgur.com/JZhvj02.png) | NGE-11 00:07:47 | LIVE badge with Japanese source ID (第22警戒群) on topo map display |

---

## 6. Repeating Text Cascade

A single message repeated to fill the entire display area, creating a wallpaper of identical text. The repetitions are arranged in rows, sometimes mirrored (reflected on a transparent display). The effect communicates systemic urgency — the system has nothing else to say. Known instances: COMPUTERS HAVE OPTED FOR SELF DESTRUCTION (red on command center ceiling), FEHLER (German for "error," red tunnel behind Asuka), DELETED (red over amber text on laptop screen).

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/ByzTdQ6.png) | NGE-13 00:18:49 | COMPUTERS HAVE OPTED FOR SELF DESTRUCTION — mirrored on overhead display |
| ![](https://i.imgur.com/0WzwffM.png) | NGE-8 00:12:05 | FEHLER FEHLER FEHLER spiraling behind Asuka and Shinji in entry plug |
| ![](https://i.imgur.com/a9ZPerb.png) | EoE 00:06:55 | DELETED filling upper portion of laptop screen over amber text data |

---

## 7. Phase Completion Matrix

Parallel columns of labeled horizontal bars (PHASE 01 through PHASE 17+), one column per Eva unit or subsystem, where each bar is either green (complete/nominal) or red (incomplete/failed). The bars are solid-fill rectangles. Below the phase bars, larger orange rectangles serve as summary indicators. The matrix provides at-a-glance status comparison across multiple parallel systems. The green-to-red transition point is visually immediate.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/6SVwfsn.png) | NGE-13 00:03:03 | Three columns, PHASE 08–17 visible, green above / red below the transition point |
| ![](https://i.imgur.com/qm9Gk24.png) | NGE-13 00:03:05 | Same display scrolled: PHASE 10–17 all green, orange summary blocks below |

---

## 8. Color-Coded Pilot Designation

Consistent color mapping across the entire series: FIRST.C / Rei Ayanami = green text, THIRD.C / Shinji Ikari = cyan/blue text, SECOND.C / S. Asuka Langley = red text. This mapping is applied to header labels, designation numbers (00/01/02), and panel border tints in the pilot monitor triptych. The colors never swap. They are a persistent identifier across all UI contexts: test plug monitors, sync tests, pilot cards, harmonics displays.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/hLY2paq.png) | NGE-12 00:04:57 | Triptych with green FIRST.C, cyan THIRD.C, red SECOND.C headers |
| ![](https://i.imgur.com/QgZFszR.png) | NGE-22 00:07:15 | SORYU ASUKA LANGLEY pilot data card — amber with implicit red association |
| ![](https://i.imgur.com/EmhOUgn.png) | NGE-24 00:07:01 | SUBJECT: FIFTH C. / KAWORU NAGISA — amber, breaking the RGB triad |

---

## 9. Gene Sequence / Gel Electrophoresis Display

The Angel analysis screen: a grid of multicolored vertical bar patterns resembling real gel electrophoresis results, with an "Nth ANGEL pattern: blue" header in red text. Binary strings (0100110100...) run along the top and bottom borders. A sidebar sometimes shows nucleotide base pair listings (ATTG, CTCA, TATG, GGTT...) numbered sequentially. This display appears every time MAGI performs Angel genetic analysis — it's the show's visual shorthand for "we're sequencing something alien."

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/ScjGpEV.png) | NGE-14 00:05:11 | 4th ANGEL pattern: blue — full gel display with numbered nucleotide sidebar |
| ![](https://i.imgur.com/ga4MzuJ.png) | NGE-5 00:06:33 | 4th ANGEL pattern: blue — wider view with binary border strings |
| ![](https://i.imgur.com/OBuMT8A.png) | NGE-9 00:03:27 | 6th ANGEL patttern: BLOO[D] — split with pixelated Angel body scan |
| ![](https://i.imgur.com/oj4K1Sr.png) | NGE-9 00:03:28 | 6th ANGEL — same gel display, wider frame |

---

## 10. Neural Channel Monitor

Vertical waveform traces arranged side-by-side, each labeled with a brain region: AMYGDARA [sic], HIPPOCAMPUS, PARIETAL LOBE, MOTOR CORTEX, SENSORY CORTEX. Numbered -01 through -05 along the bottom. The traces are green or cyan lines on dark backgrounds with alternating darker column bands. A horizontal red reference line crosses all channels. Each channel's waveform amplitude and character reflects the corresponding brain region's activity. This is NERV's EEG.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/1JIgnwg.png) | NGE-2 00:03:17 | Green vertical bars with labeled brain regions, horizontal red baseline |
| ![](https://i.imgur.com/SQOGIws.png) | NGE-6 00:02:19 | Cyan/white variant of same display — traces more active, same layout |
| ![](https://i.imgur.com/mvMuagY.png) | NGE-22 00:13:49 | Green traces during Asuka's mental contamination — HIPPOCAMPUS trace spiking wildly |

---

## 11. Targeting Reticle / HUD Diamond

The Eva cockpit heads-up display in combat mode: a wireframe diamond (octahedron projection) centered on the target, with cardinal tick marks, a center crosshair, and a surrounding circle or ring. Corner readouts show MODE:SHOOT, coordinate strings (T:, S:, X:, Y:, Z:, M:, R: values), and an ATTACK label. An orange horizontal frequency-bar indicator runs along the bottom. This is the pilot's direct combat interface.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/TuARHzn.png) | NGE-6 00:19:47 | Full HUD: diamond wireframe, MODE:SHOOT, coordinate readouts, through cockpit viewport |
| ![](https://i.imgur.com/6mH23k8.png) | NGE-18 00:14:41 | Circle-and-crosshair variant with ATTACK label and ±0.00000000 readouts |

---

## 12. Armor Penetration Progress Display

A diagonal grid of cells, each representing an ARMOR PLATE and PARTINTION [sic] No. with an associated SAFETY LEVEL bar. Green bars = intact; bars shift through yellow/orange to red/cyan as the Angel penetrates deeper. Red downward-pointing chevron arrows (▼▼▼) indicate the direction of breach. CENTRAL DOGMA location labels appear as the breach approaches the core. This display is specific to Angels physically boring through the Geofront's armor layers.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/z9siV87.png) | NGE-19 00:10:13 | Green/red bars with PARTINTION No. 17/18/19, downward red chevrons |
| ![](https://i.imgur.com/8NQPZvM.png) | NGE-24 00:14:21 | Blue DAMAGED / CONDITION:BLUE cartouche overlaid on the penetration grid |
| ![](https://i.imgur.com/WgPSDJd.png) | NGE-24 00:16:57 | CENTRAL DOGMA labels appearing as breach reaches critical depth |
| ![](https://i.imgur.com/dwQ2nxd.png) | NGE-24 00:16:19 | CENTRAL DOGMA WEST 22/23 cartouches alongside LEVEL and ARMOR PLATE indicators |

---

## 13. Entity Silhouette on Tactical Map

An orange or red-filled silhouette of a ship, Eva unit, or Angel, rendered as a detailed top-down or side profile, overlaid on the green wireframe city/terrain map. Each silhouette has a red cartouche label identifying it (DDG-173 KONGO, UN CVN075 MPACN Over The Rainbow, 6th ANGEL WITH EVA-02). The silhouettes are transparent enough to show map detail beneath. This is the operating schematic (作戦行動予定図) view.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/dhVGRMc.png) | NGE-8 00:17:41 | Ships positioned on street map with named cartouche labels |
| ![](https://i.imgur.com/MCToaNd.png) | NGE-8 00:17:55 | 6th ANGEL WITH EVA-02 silhouette descending through city grid |
| ![](https://i.imgur.com/pcBpmeH.png) | NGE-8 00:17:51 | Wider view of same operation showing full map coverage |
| ![](https://i.imgur.com/E4GIH4U.png) | NGE-8 00:17:45 | Multiple ship silhouettes (CGN 021 GMCN Kirov, BB-66 Kentucky) positioned on map |

---

## 14. Binary String Decoration

Strings of 0s and 1s (0100110100111100100110...) rendered along display borders, in corners, or as background texture behind primary content. The strings are always in a small monospaced font, typically orange or green. They appear on Angel analysis screens, A.T. Field readouts, and the MAGI voting display. They serve no readable data function — they're the show's visual signifier for "digital/computational process in progress."

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/96MYsJJ.png) | NGE-24 00:13:29 | Binary strings above and below the 17th ANGEL / IDENTIFIED display |
| ![](https://i.imgur.com/W2dR94V.png) | NGE-24 00:17:59 | Binary strings above A.T.FIELD / GENERATION readout |
| ![](https://i.imgur.com/ga4MzuJ.png) | NGE-5 00:06:33 | Binary strings as border of Angel gel electrophoresis display |
| ![](https://i.imgur.com/AJMPx0q.png) | NGE-24 00:17:03 | Binary strings alongside LOST status and A.T. FIELD PROJECT data |

---

## 15. Scrolling Nucleotide Ticker

Base pair letter sequences (AGTG, ITCAA, TAGTG, CTCAG...) displayed as scrolling or orbiting text, usually in green, wrapping around a subject or running horizontally across a display. The letters are individual nucleotide codes (A, T, G, C) arranged in groups. Appears specifically in contexts related to Eva biology, Rei clones, and LCL — the biological rather than mechanical layer of NERV's technology.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/2EnlpYh.png) | NGE-11 00:03:33 | Mirrored nucleotide codes (CCTOI1OO, AGTIIOI0...) on transparent display in front of Maya and Ritsuko |
| ![](https://i.imgur.com/HRwUCm3.png) | NGE-15 00:20:15 | TAGTG / ITCAA scrolling past Rei clone in tube |
| ![](https://i.imgur.com/B3NyKBK.png) | NGE-15 00:20:17 | Same nucleotide ticker, wider shot showing green text orbiting the containment tube |
| ![](https://i.imgur.com/cO3cL7S.png) | EoE 00:38:33 | MODE A/B/C/D/E with nucleotide triplet timers (ATG, ACC, CGA, GAC...) on EVA-02 power gauge |

---

## 16. Horizontal Ruler / Scale Bar

Calibrated tick marks running along one or more edges of a display, numbered at regular intervals (typically ±values from a zero origin, or sequential numbers). The ticks are short perpendicular lines with larger marks at major intervals and smaller marks at subdivisions. Always orange or amber. Provides the spatial or temporal reference frame for whatever data is plotted. Appears on waveform displays, psychographic readouts, satellite feeds, and field analysis graphs.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/OHnviQM.png) | NGE-16 00:09:09 | Horizontal and vertical rulers with numbered 00-50 intervals on MODE STARLIGHT observation |
| ![](https://i.imgur.com/vojQDUy.png) | NGE-16 00:03:09 | EVANGELION HARMONICS SIMULATION GRAPH DISPLAY — full calibrated axis with -A through +A and ±0 through ±10 |
| ![](https://i.imgur.com/3RBI9q8.png) | NGE-1 00:19:59 | Horizontal ruler -5 to +5 below sync waveform, vertical tick ruler on left edge |

---

## 17. Video Feed Frame

A rectangular border — typically amber or red with a slight glow — enclosing a live video feed. A solid-color label bar runs along the bottom edge reading FROM EVA-## in condensed type. The video inside is often degraded (scanlines, static, color distortion) to contrast with the clean border. The frame is the UI's way of declaring "this is a window into another viewpoint." Distinct from the CCTV feed, which has no clean border — just raw degraded footage.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/iPW3uoc.png) | NGE-18 00:14:07 | Red-bordered frame with FROM EVA-02 label bar, heavily scanlined content |
| ![](https://i.imgur.com/awZtyY4.png) | NGE-14 00:17:23 | Amber-bordered frame with FROM EVA-02, showing Asuka in entry plug |
| ![](https://i.imgur.com/XhyzjeK.png) | NGE-16 00:05:55 | Three video feed frames (FROM EVA-01, EVA-02, EVA-00) on command center display |
| ![](https://i.imgur.com/xd52U16.png) | EoE 00:27:31 | Red-bordered REALTIME IMAGE frame held by Fuyutsuki — handheld holographic variant |

---

## 18. Targeting Bracket Corners

L-shaped marks at two or four corners of a rectangular region, framing an area of interest without enclosing it fully. The brackets define a zone without obscuring it. Typically white or amber. Often appear alongside crosshair grids and LIVE badges. Distinct from the full rectangular video feed frame — bracket corners are open, suggesting "area of attention" rather than "bounded window."

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/v5IGB8l.png) | NGE-20 00:05:23 | White L-brackets at corners of entry plug interior observation area |
| ![](https://i.imgur.com/6AFNuBx.png) | NGE-10 00:15:53 | Red targeting brackets surrounding AT Field capture zone with center crosshair |

---

## 19. Sector Capture Grid

A grid of cells — typically chevron-shaped or triangular — each representing a physical sector of NERV HQ, labeled with location (SIDE-10, MAIN SHAFT LEVEL 3 BLOCK-C) and orientation (TOP, UPPER, MIDDLE, LOWER, BOTTOM). Cells are colored red/yellow with hazard triangles when CAPTURED, and presumably remain dark/green when held. The grid is specific to the EoE JSSDF invasion sequence, showing the progressive physical capture of the facility.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/9G5zYvK.png) | EoE 00:15:05 | Dense grid of CAPTURED sectors with location labels — Misato's fist against the display |

---

## 20. Error Status Matrix

A massive wall-filling grid of numbered cells (C110, C111, C112... C510, C511...) each displaying a different error condition: BLACKOUT, NO REPLY, CIRCUIT OVERLOAD, POWER SURGE, DISCONNECTED, PROTOCOL ERROR, NETWORK CONGESTION, ACCESS DENIED, BURNOUT, NO CARRIER, COMMAND ERROR, BUSY, FAILURE, IO ERROR, NO SIGNAL, OUT-OF-RANGE, SYSTEM DOWN, INCORRECT CODE, POWER DOWN, NO ANSWER. Every cell has a different error — the diversity communicates total systemic failure across all subsystems simultaneously.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/mt6eovo.png) | EoE 00:51:53 | Full error matrix: Fuyutsuki standing before hundreds of unique error labels during Instrumentality |

---

## 21. Multi-Camera Surveillance Wall

A grid of live camera feeds, each labeled with a station number (S.S. NO.23-12-A) and Japanese observation post identifier (第23警戒群 / 第12光学観測所 Side-B). As feeds are lost, SIGNAL LOST and WARNING cartouches overlay individual panels in orange/red. The progressive loss of feeds across the grid communicates the approach of a threat — cameras go dark in sequence.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/bXKShF4.png) | EoE 00:11:13 | Surveillance wall with multiple SIGNAL LOST overlays, WARNING labels, mixed live/dead feeds |

---

## 22. DOS/BIOS Boot Screen

A full-screen monospaced text display resembling a real PC boot sequence: copyright notice (日本重化学工業共同体, 通産省, 防衛庁), system checks (CO-CPU, I/O VECTORS, CONSOLE DRIVERS, VIRUS PROTECTION — all Check OK), memory tables (addr, PSP, blks, size, owner/parameters), and HEMS version info. Rendered in amber on black. The text is plausibly structured — not random noise — containing real computing concepts in a fictional configuration.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/LnjlaVD.png) | NGE-7 00:11:49 | Full BIOS-style boot screen with system config table, 53 TB UMB, HEMS ver14.0 |

---

## 23. Circular Dial / Radar Display

A circular calibrated gauge with tick marks at regular angular intervals, used for either targeting (INNER TORUS REACTOR readout) or fuel bundle status (J.A. FUEL BUNDLE cross-section showing hex-tiled cells, green = operational, red = damaged). The dial has a prominent outer ring with minor/major tick marks and may include a secondary concentric ring. Distinct from the targeting reticle diamond — this is a static diagnostic gauge, not a cockpit HUD.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/NPlqlrb.png) | NGE-6 00:19:25 | Circular gauge: INNER TORUS REACTOR / active, with crosshairs and axis rulers surrounding it |
| ![](https://i.imgur.com/0q4F9YS.png) | NGE-7 00:12:55 | J.A. FUEL BUNDLE circular cross-section: green/red hex cells with CONTROL ROD status list |
| ![](https://i.imgur.com/YJ9WI8R.png) | NGE-7 00:18:51 | Same fuel bundle display in degraded state — mostly red cells |

---

## 24. Ring Indicator Lights

Circular glowing rings mounted on facility walls, evenly spaced. Green when nominal, red when in emergency state. They have a visible glow bloom and small mounting hardware details (tick marks, attachment points). These are physical environmental indicators — not screen-based UI — that shift color to reflect facility status. The green-to-red transition happens alongside the Red Monochrome Emergency State from the main taxonomy.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/RoiG8p1.png) | NGE-7 00:20:17 | Green ring indicators on corridor wall — nominal state |
| ![](https://i.imgur.com/x6PpDgZ.png) | NGE-7 00:19:47 | Same rings in red — emergency state, entire environment red-shifted |

---

## 25. KEEP OUT / Restricted Area Signage

Large-format physical wall signage with KEEP OUT in massive red type, 立入禁止区域 (restricted area) below, followed by a location identifier (TERMINAL DOGMA: LEVEL 1 SECTOR 2 or MAIN L.C.L. PLANT: CIRCULATION LINE NO.3) and a threat statement (TRESPASSERS WILL BE SHOT ON SIGHT / VIOLATORS WILL BE LIABLE FOR PENALTIES OF UP TO 10 YEARS' IMPRISONMENT, $100,000 FINE, OR BOTH.). Orange horizontal rules above and below. This is environmental graphic design, not digital UI — painted/printed signage in the physical world of NERV HQ.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/CboX2cv.png) | NGE-15 00:20:37 | KEEP OUT / MAIN L.C.L. PLANT variant with full threat text |
| ![](https://i.imgur.com/Vs80JJP.png) | NGE-23 00:19:23 | KEEP OUT / TERMINAL DOGMA: LEVEL 1 SECTOR 2 — same format, different location |

---

## 26. CAUTION Overhead Barrier

An illuminated overhead sign reading CAUTION / DANGER LOCK BOLT-OUT in red LED-style text, mounted above physical blast barriers. Accompanied by traffic-signal-style indicator lights (red/yellow/green circles). Red/white hazard stripes run along the barrier edges. This is Tokyo-3's street-level infrastructure UI — the mechanical interface between the city's surface and its retractable defense systems.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/aZ6L9gE.png) | NGE-14 00:04:15 | CAUTION / DANGER LOCK BOLT-OUT with traffic signals, 40km speed sign, no-stopping sign |
| ![](https://i.imgur.com/9PaNLx2.png) | NGE-3 00:11:41 | Same barrier design, different angle — barriers in locked position |

---

## 27. Solenoid Graph Pattern

Paired 3D wireframe trace patterns — one green (FIELD NEGATIVE), one red (FIELD POSITIVE) — showing helical/toroidal shapes rendered as line meshes on calibrated axes. The traces look like three-dimensional magnetic field visualizations or solenoid cross-sections. Used during Instrumentality/Third Impact sequences to represent AT field interaction data. Labeled SOLENOID GRAPH PATTERN A.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/uMwls4h.png) | EoE 00:56:35 | Green (EVA-01 PILOT) and red (EVA-01 ENTRY PLUG) solenoid traces side by side |

---

## 28. Eva Damage Status Display

Amber-on-black schematic of an Eva unit with a numbered list of OPERATING PARTS down both sides (0001–0035+). Each part slot shows either a green OPERATING cartouche or a red DAMAGED cartouche. An entry plug schematic appears in a sub-panel. The Eva silhouette is centered with damage overlays. This is the mech maintenance readout — the most mechanically detailed Eva interface in the series.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/enCAQLB.png) | EoE 00:39:31 | EVA-0[2] PRESENT STATUS with mixed OPERATING/DAMAGED part list — green/red mixed |
| ![](https://i.imgur.com/o4e9gRi.png) | EoE 00:39:32 | Same display moments later — more parts going dark/damaged |

---

## 29. Geofront Cross-Section Schematic

A side-view diagram showing numbered horizontal layers of the Geofront, with the armor-layer barriers drawn as blue sawtooth/wave patterns labeled with sequential numbers (01, 02... 22). A pink/magenta striped vertical column represents the descending Eva or Angel. The sky/surface is pink, the underground layers are brown, and the GEO FRONT label appears at the bottom. Crosshairs appear in both ground and sky sections. This is the "how deep are we" display — pure vertical axis information.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/Njqu6kQ.png) | NGE-6 00:04:45 | Upper layers with crosshairs, barber-pole descent column, 予想図 (forecast diagram) label |
| ![](https://i.imgur.com/L5Jy5Ff.png) | NGE-6 00:05:03 | Mid-depth: layers 08–10 visible, same visual language |
| ![](https://i.imgur.com/clGX1a9.png) | NGE-6 00:05:05 | Lower layers: 21–22 with GEO FRONT label at bottom |

---

## 30. Bracket/Tree Cascade Diagram

Columns of segmented bars connected by branching lines that merge and split — resembling a circuit diagram or tournament bracket turned vertical. The segments shift from black (inactive/nominal) to red (active/critical) as a state change propagates through the system. The connective lines show dependency relationships between segments. Used in the Operation Yashima power distribution display.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/UhmRP7b.png) | NGE-6 00:17:55 | Black-to-red transition across bracket columns with branching connectors |
| ![](https://i.imgur.com/MMGaGzD.png) | NGE-6 00:18:27 | Same display further into the sequence — more segments lit red |

---

## 31. REC Badge

A red-bordered box containing REC in red text, typically in the upper-left corner of a feed. Sometimes accompanied by a pause (‖) symbol. This is the consumer-camcorder visual language imported directly into NERV's military displays — a deliberate anachronism that says "this is being recorded by a device someone pointed at a thing," not "this is data from a sensor array." Appears in the episode 3 battle footage shot by Kensuke.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/Q9T9tya.png) | NGE-3 00:16:19 | REC badge with ‖ pause indicator, green X50 magnification badge — handheld camera POV |

---

## 32. NERV Transit Signage

Physical infrastructure signage for NERV's internal transportation systems. Includes numbered green NERV-branded platform signs (NERV + number, green header, red no-entry circle), South Hub Station Spoke Line identifiers, and illuminated LED scrolling destination boards on JR trains (第3新東京環状第7号線). These are mass-transit wayfinding elements — the mundane infrastructure that connects NERV's fantastical underground to real Japanese rail design conventions.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/Przr18g.png) | EoE 00:11:41 | NERV platform signs 1–5 with red no-entry symbols, South Hub Station label |
| ![](https://i.imgur.com/8Juhn8a.png) | NGE-4 00:03:55 | JR TOKYO-3 train with LED destination board |

---

## 33. PDA / Handheld Terminal

A GEHIRN-branded personal digital assistant (palm-sized device with physical buttons) displaying amber-on-black data cards: personnel records (RITSUKO AKAGI, AGE: 25, SEX: F, GEHIRN TECHNOLOGY DEPT.), or MAGI voting status in miniature. The device has rounded industrial styling with button labels (Names, Dates, Game, Units, Find, Adjust). It's the NERV iPhone, circa 2015 — personal computing scaled down to pocket size while maintaining the amber-on-black display language.

Also appears as the device Misato uses to trigger MAGI self-destruct in EoE, with the full MAGI triad displayed at handheld scale with 承認 (approved) stamps.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/VjAT9n5.png) | NGE-21 00:15:03 | GEHIRN PDA with Ritsuko Akagi personnel record |
| ![](https://i.imgur.com/slvV1xa.png) | EoE 00:36:45 | Handheld terminal with MAGI triad, 承認 stamps, MOTION: SELF-DESTRUCTION — Ritsuko triggering self-destruct |

---

## 34. Flow Field Visualization

Contour-like flowing lines on a calibrated axis grid, showing field interactions (AT fields, electromagnetic phenomena). The lines bend and distort around a central object or void, resembling fluid dynamics or electromagnetic field line diagrams. Green/red upper/lower halves split at a zero baseline. Numeric readouts at each corner. Used for the scientifically-uninterpretable-but-visually-convincing display of phenomena that don't map to real physics.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/8DRyXOQ.png) | NGE-2 00:19:15 | Green upper / red lower field lines bending around central distortion, ± numeric readouts |
| ![](https://i.imgur.com/L5T3abb.png) | NGE-23 00:10:57 | Blue contour lines in chaotic disruption pattern — same axis structure, more turbulent |

---

## 35. Energy Observational Data Display

A green gradient field with orange segmented diagonal chevron stripes and amber cartouche labels: ENERGY OBSERVATIONAL DATA, RADIOACTIVITY: NEGATIVE, HIGH LEVEL ENERGY FIELD APPROACHING, GENERATING POINT: TERMINAL DOGMA: POINT 00. The chevrons pulse and shift as energy levels change. This is the Instrumentality-specific energy display — it appears nowhere else in the series.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/RFF0QcU.png) | EoE 00:53:29 | Full display: green gradient, orange diagonal chevrons, multiple cartouche labels |

---

## 36. 666 Hex Pattern / MAGI Defense Visualization

During the MAGI cyber-warfare sequence in EoE, a hex-tiled background fills with repeating 666 numbers in shifting colors (green → yellow → orange → red), representing the attacking MAGI systems' hacking attempts. The original MAGI-01 is centered with its triad labels. The 666 tiles create a visual allusion to the Biblical Number of the Beast — the MAGI are literally named after the Three Wise Men, and they're under attack by something with that number's association. The PROTECT NO. 666 / DANANG TYPE-B DEFENSE SCREEN display is the defensive counterpart.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/FFYiJuK.png) | EoE 00:09:57 | 666 hex pattern surrounding MAGI-01 ORIGINAL triad center |
| ![](https://i.imgur.com/cR7ORrU.png) | EoE 00:10:01 | PROTECT NO. 666 defense screen with TIME REMAINING TO COLLAPSE countdown |

---

## 37. Japanese Speed Control Panel

A physical control panel with large kanji labels arranged in a grid: 前進 (forward), 停止 (stop, highlighted green), 後進 (reverse) across the top row; 微速力, 半速力, 原速力, 強速力 (dead slow / half / full / flank speed) in pairs for left/right engines. Red illuminated text on black buttons with green border lines. This is straight out of real Japanese naval vessel engine order telegraph design — imported wholesale into the Pacific Fleet scenes.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/6RqxXRQ.png) | NGE-7 00:12:27 | Full engine order panel with 停止 (stop) highlighted in green |

---

## 38. Coolant/Pump Bar Chart

A labeled bar chart with individual items (PUMP:01 through PUMP:06+) on the x-axis and numeric scale on the y-axis (+0 to +150), rendered in cyan/green segmented blocks. The bars are horizontal stacks of segments that grow upward from the axis. The chart title (CIRCULATION PUMP: REACTOR COOLAN[T]) is in amber text with amber border. This is a standard industrial instrument readout — the NERV visual language applied to mundane infrastructure monitoring.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/OrMeGB9.png) | NGE-7 00:13:01 | CIRCULATION PUMP: REACTOR COOLANT chart with cyan segmented bars per pump |

---

## 39. Reserve Energy Depletion Staircase

A stepped descending display showing RESERVE ENERGY REMAINING for an Eva's entry plug. Each step is a colored block labeled SEG.1 through SEG.6+, descending from left to right. Above the steps, amber cartouche labels indicate what systems will fail at each level (LIFE SUPPORT SYSTEM, LINK CONTROL SYSTEM, EXTERNAL COMMUNICATIONS). A cyan BORDER LINE runs horizontally across the display. The staircase visually communicates "you are descending toward zero."

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/tcmoORZ.png) | NGE-16 00:16:03 | Full staircase display with system failure labels and BORDER LINE — RESERVE ENERGY REMAINING / EVA-01: ENTRY PLUG |

---

## 40. Mental Toxicity Level Display

Horizontal segmented bars per pilot (SUBJECT 00/FIRST.C, 01/THIRD.C, 02/SECOND.C), color-graded from green through blue to purple/magenta as values increase. Scale runs from -100.0 through ±0 to +16.0 with CAUTION and DANGER threshold markers. The color gradient is unique in the NERV palette — a cool green-to-purple shift not used anywhere else. This display is specific to the sync test / contamination monitoring context.

| Reference | Source | Notes |
|-----------|--------|-------|
| ![](https://i.imgur.com/Z4W8hAh.png) | NGE-12 00:05:01 | Full three-pilot display with gradient bars, CAUTION and DANGER thresholds |
| ![](https://i.imgur.com/mqhMsV4.png) | NGE-22 00:07:33 | Close-up: pink/red bars at +16 alongside cyan/green bars at +18-23 — abnormal state |

---

*Atomic elements catalog compiled from close examination of all 271 reference frames.*
*Companion to: [NERV UI Visual Language Taxonomy](design-language.md)*
*Source album: https://imgur.com/a/mvW7g*
