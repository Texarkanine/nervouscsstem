---
task_id: nerv-v01-m5-installable-docs-skill
date: 2026-09-12
complexity_level: 2
---

# Reflection: nerv-v01-m5-installable-docs-skill

## Summary

M5 added `skills/nerv/`, installable with `npx skills add Texarkanine/nervouscsstem`. It carries a markdown copy of `docs/` (not the LFS stills). `metadata.version` matches the package and is bumped by a generic extra-files hook. It succeeded.

## Requirements vs Outcome

Parent-brief requirements 13–14, acceptance criterion 6, and use-case 5 are met as wiring: `npx skills` can discover the skill, the docs markdown travels inside it, and SKILL.md version locksteps with `package.json`. Nothing from earlier milestones was undone. Gallery pages still reference `img/` that is not in the skill; that was accepted. Live Pages and a docs-sync script were never this milestone.

## Plan Accuracy

The three-unit split was right. The first plan put `version` at the top of SKILL.md frontmatter; first preflight FAILed against [agentskills.io](https://agentskills.io/specification). The replan nested it under `metadata` as a quoted string. Extra-files stayed generic. Build did not reorder. The challenges that mattered were the ones named: LFS stills, SLOBAC's relocated `docs_dir`, and YAML extra-files on markdown.

## Build & QA Observations

TDD behaved: docs-copy test red until the eight markdown files were copied, then green. Full suite 369/369. QA passed with no substantive findings. Lint still fails on generated `dist/nerv.css`; predates this work.

## Insights

### Technical

- SKILL.md `version` belongs under `metadata` as a string. A top-level `version` key is not in the Agent Skills spec and can fail `skills-ref validate`. The generic extra-files annotation still matches by line.

### Process

- Look up the consumer spec (here, agentskills.io) during Plan, not after the first preflight FAIL. The M4 hosting-model miss and this frontmatter miss are the same class of error: we planned against a sibling's shape instead of the installer the brief named.

### Million-Dollar Question

If an installable skill had been a founding assumption, `docs/` would still be the authoring tree (LFS stills cannot live in the skill). The copy plus the identity test is the 0.1 form of that. A generator can wait.
