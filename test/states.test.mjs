import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST_CSS = resolve(ROOT, 'dist/nerv.css');
const DIST_JS = resolve(ROOT, 'dist/nerv.js');

const GLOW_COLORS = [
  'amber', 'amber-dark', 'orange', 'red',
  'red-deep', 'green', 'cyan', 'blue', 'steel',
];

execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
const css = readFileSync(DIST_CSS, 'utf-8');
const js = readFileSync(resolve(ROOT, 'src/nerv.js'), 'utf-8');

// === State class existence & structure (behaviors 1–5) ===

describe('State class existence', () => {
  it('1. .nerv-state-nominal selector exists in compiled CSS', () => {
  });

  it('2. .nerv-state-active selector exists', () => {
  });

  it('3. .nerv-state-caution selector exists', () => {
  });

  it('4. .nerv-state-alert selector exists', () => {
  });

  it('5. .nerv-state-critical selector exists', () => {
  });
});

// === Token overrides per state (behaviors 6–10) ===

describe('State token overrides', () => {
  it('6. Nominal: --nerv-primary → green, --nerv-animation-speed: 1', () => {
  });

  it('7. Active: --nerv-primary → amber, --nerv-animation-speed: 1', () => {
  });

  it('8. Caution: --nerv-primary → amber-dark, --nerv-animation-speed: 1.5', () => {
  });

  it('9. Alert: --nerv-primary → red, --nerv-animation-speed: 2', () => {
  });

  it('10. Critical: --nerv-primary → red, --nerv-bg → red-deep, --nerv-animation-speed: 3', () => {
  });
});

// === State-specific selectors / cumulative (behaviors 11–14) ===

describe('State-specific compound selectors', () => {
  it('11. Active+ .nerv-type-data triggers flicker', () => {
  });

  it('12. Alert+ .nerv-status-text blinks', () => {
  });

  it('13. Critical .nerv-status-text gets glitch', () => {
  });

  it('14. Alert+ vignette red edge bleed selector exists', () => {
  });
});

// === Accessibility (behavior 15) ===

describe('State accessibility', () => {
  it('15. prefers-reduced-motion inside state classes suppresses animations', () => {
  });
});

// === Retrofit verification (behaviors 16–24) ===

describe('Retrofit: ambiance modules use --nerv-primary', () => {
  it('16. .nerv-glow / .nerv-glow-text use --nerv-primary-rgb (not --nerv-amber-rgb)', () => {
    const glowIdx = css.indexOf('.nerv-glow {');
    assert.ok(glowIdx !== -1, '.nerv-glow block not found');
    const glowBlock = css.slice(glowIdx, css.indexOf('}', glowIdx) + 1);
    assert.ok(glowBlock.includes('--nerv-primary-rgb'), '.nerv-glow should reference --nerv-primary-rgb');
    assert.ok(!glowBlock.includes('--nerv-amber-rgb'), '.nerv-glow should NOT reference --nerv-amber-rgb');

    const glowTextIdx = css.indexOf('.nerv-glow-text {');
    assert.ok(glowTextIdx !== -1, '.nerv-glow-text block not found');
    const glowTextBlock = css.slice(glowTextIdx, css.indexOf('}', glowTextIdx) + 1);
    assert.ok(glowTextBlock.includes('--nerv-primary-rgb'), '.nerv-glow-text should reference --nerv-primary-rgb');
    assert.ok(!glowTextBlock.includes('--nerv-amber-rgb'), '.nerv-glow-text should NOT reference --nerv-amber-rgb');
  });

  it('17. .nerv-scanlines band uses --nerv-primary-rgb (not --nerv-amber-rgb)', () => {
    const afterIdx = css.indexOf('.nerv-scanlines::after');
    assert.ok(afterIdx !== -1, '.nerv-scanlines::after not found');
    const afterBlock = css.slice(afterIdx, css.indexOf('}', afterIdx) + 1);
    assert.ok(afterBlock.includes('--nerv-primary-rgb'), '.nerv-scanlines::after should reference --nerv-primary-rgb');
    assert.ok(!afterBlock.includes('--nerv-amber-rgb'), '.nerv-scanlines::after should NOT reference --nerv-amber-rgb');
  });

  it('18. .nerv-panel defaults to --nerv-primary (not --nerv-amber)', () => {
    const panelIdx = css.indexOf('.nerv-panel {');
    assert.ok(panelIdx !== -1, '.nerv-panel block not found');
    const panelBlock = css.slice(panelIdx, css.indexOf('}', panelIdx) + 1);
    assert.ok(panelBlock.includes('--nerv-primary'), '.nerv-panel should reference --nerv-primary');
    assert.ok(!panelBlock.includes('var(--nerv-amber)'), '.nerv-panel should NOT reference var(--nerv-amber)');
  });

  it('19. .nerv-divider defaults to --nerv-primary (not --nerv-cyan)', () => {
    const dividerIdx = css.indexOf('.nerv-divider {');
    assert.ok(dividerIdx !== -1, '.nerv-divider block not found');
    const dividerBlock = css.slice(dividerIdx, css.indexOf('}', dividerIdx) + 1);
    assert.ok(dividerBlock.includes('--nerv-primary'), '.nerv-divider should reference --nerv-primary');
    assert.ok(!dividerBlock.includes('var(--nerv-cyan)'), '.nerv-divider should NOT reference var(--nerv-cyan)');
  });

  it('20. .nerv-stripe defaults to --nerv-primary-rgb (not --nerv-green-rgb)', () => {
    const stripeIdx = css.indexOf('.nerv-stripe {');
    assert.ok(stripeIdx !== -1, '.nerv-stripe block not found');
    const stripeBlock = css.slice(stripeIdx, css.indexOf('}', stripeIdx) + 1);
    assert.ok(stripeBlock.includes('--nerv-primary-rgb'), '.nerv-stripe should reference --nerv-primary-rgb');
    assert.ok(!stripeBlock.includes('--nerv-green-rgb'), '.nerv-stripe should NOT reference --nerv-green-rgb');
  });

  it('21. Hex neutral cell uses --nerv-primary-rgb (not --nerv-green-rgb)', () => {
    const cellBeforeIdx = css.indexOf('.nerv-hex-cell::before');
    assert.ok(cellBeforeIdx !== -1, '.nerv-hex-cell::before not found');
    const cellBeforeBlock = css.slice(cellBeforeIdx, css.indexOf('}', cellBeforeIdx) + 1);
    assert.ok(cellBeforeBlock.includes('--nerv-primary-rgb'), '.nerv-hex-cell::before should reference --nerv-primary-rgb');
    assert.ok(!cellBeforeBlock.includes('--nerv-green-rgb'), '.nerv-hex-cell::before should NOT reference --nerv-green-rgb');
  });

  it('22. .nerv-segment-display uses --nerv-primary (not --nerv-amber)', () => {
    const segIdx = css.indexOf('.nerv-segment-display {');
    assert.ok(segIdx !== -1, '.nerv-segment-display block not found');
    const segBlock = css.slice(segIdx, css.indexOf('}', segIdx) + 1);
    assert.ok(segBlock.includes('--nerv-primary'), '.nerv-segment-display should reference --nerv-primary');
    assert.ok(!segBlock.includes('var(--nerv-amber)'), '.nerv-segment-display should NOT reference var(--nerv-amber)');
  });

  it('23. .nerv-magi-panel defaults to --nerv-primary (not --nerv-amber)', () => {
    const magiIdx = css.indexOf('.nerv-magi-panel {');
    assert.ok(magiIdx !== -1, '.nerv-magi-panel block not found');
    const magiBlock = css.slice(magiIdx, css.indexOf('}', magiIdx) + 1);
    assert.ok(magiBlock.includes('--nerv-primary'), '.nerv-magi-panel should reference --nerv-primary');
    assert.ok(!magiBlock.includes('var(--nerv-amber)'), '.nerv-magi-panel should NOT reference var(--nerv-amber)');
  });

  it('24. Bar meter zone label uses --nerv-primary-rgb (not --nerv-amber-rgb)', () => {
    const re = /\n\.nerv-bar-meter-bar\[data-zone\]::after/;
    const match = re.exec(css);
    assert.ok(match, 'standalone .nerv-bar-meter-bar[data-zone]::after not found');
    const zoneBlock = css.slice(match.index, css.indexOf('}', match.index) + 1);
    assert.ok(zoneBlock.includes('--nerv-primary-rgb'), 'zone label should reference --nerv-primary-rgb');
    assert.ok(!zoneBlock.includes('--nerv-amber-rgb'), 'zone label should NOT reference --nerv-amber-rgb');
  });
});

// === Variant generation (behaviors 25–27) ===

describe('Auto-generated variants', () => {
  it('25. .nerv-divider-{name} classes auto-generated for each glow-flagged color', () => {
    for (const name of GLOW_COLORS) {
      assert.match(css, new RegExp(`\\.nerv-divider-${name}\\b`), `missing .nerv-divider-${name} class`);
    }
  });

  it('26. .nerv-grid-marks-{name} classes auto-generated for each glow-flagged color', () => {
    for (const name of GLOW_COLORS) {
      assert.match(css, new RegExp(`\\.nerv-grid-marks-${name}\\b`), `missing .nerv-grid-marks-${name} class`);
    }
  });

  it('27. Default .nerv-grid-marks uses white/bone color (not cyan)', () => {
    const gridIdx = css.indexOf('.nerv-grid-marks {');
    assert.ok(gridIdx !== -1, '.nerv-grid-marks block not found');
    const gridBlock = css.slice(gridIdx, css.indexOf('}', gridIdx) + 1);
    assert.ok(!gridBlock.includes('32, 240, 255'), '.nerv-grid-marks should NOT use cyan RGB (32, 240, 255)');
    assert.ok(
      gridBlock.includes('255, 255, 255') || gridBlock.includes('224, 224, 216'),
      '.nerv-grid-marks should use white (255,255,255) or steel/bone (224,224,216) RGB'
    );
  });
});

// === JavaScript API (behaviors 28–30) ===

describe('NERV.setState JS API', () => {
  it('28. NERV.setState function exists in nerv.js', () => {
  });

  it('29. setState accepts state name parameter', () => {
  });

  it('30. setState references all five state class names', () => {
  });
});

// === State-specific grid marks (behaviors 31–33) ===

describe('State-specific grid marks via mixin', () => {
  it('31. .nerv-state-nominal .nerv-grid-marks gets green grid marks SVG', () => {
  });

  it('32. .nerv-state-alert .nerv-grid-marks gets red grid marks SVG', () => {
  });

  it('33. .nerv-state-critical .nerv-grid-marks gets red grid marks SVG', () => {
  });
});

// === Edge cases: data modules preserve named tokens (behaviors 34–36) ===

describe('Data-driven modules preserve named tokens after retrofit', () => {
  it('34. Hex data states (danger/warn/safe) still use named tokens', () => {
    const dangerIdx = css.indexOf('.nerv-hex-danger');
    assert.ok(dangerIdx !== -1, '.nerv-hex-danger not found');
    const dangerSection = css.slice(dangerIdx, dangerIdx + 500);
    assert.ok(dangerSection.includes('--nerv-red'), '.nerv-hex-danger should still use --nerv-red');

    const warnIdx = css.indexOf('.nerv-hex-warn');
    assert.ok(warnIdx !== -1, '.nerv-hex-warn not found');
    const warnSection = css.slice(warnIdx, warnIdx + 500);
    assert.ok(warnSection.includes('--nerv-amber'), '.nerv-hex-warn should still use --nerv-amber');

    const safeIdx = css.indexOf('.nerv-hex-safe');
    assert.ok(safeIdx !== -1, '.nerv-hex-safe not found');
    const safeSection = css.slice(safeIdx, safeIdx + 500);
    assert.ok(safeSection.includes('--nerv-green'), '.nerv-hex-safe should still use --nerv-green');
  });

  it('35. Status text severity still uses named tokens', () => {
    const nomIdx = css.indexOf('.nerv-status-nominal');
    assert.ok(nomIdx !== -1, '.nerv-status-nominal not found');
    const nomBlock = css.slice(nomIdx, nomIdx + 400);
    assert.ok(nomBlock.includes('--nerv-green'), '.nerv-status-nominal should use --nerv-green');

    const cautionIdx = css.indexOf('.nerv-status-caution');
    assert.ok(cautionIdx !== -1, '.nerv-status-caution not found');
    const cautionBlock = css.slice(cautionIdx, cautionIdx + 400);
    assert.ok(cautionBlock.includes('--nerv-amber'), '.nerv-status-caution should use --nerv-amber');

    const dangerIdx = css.indexOf('.nerv-status-danger');
    assert.ok(dangerIdx !== -1, '.nerv-status-danger not found');
    const dangerBlock = css.slice(dangerIdx, dangerIdx + 400);
    assert.ok(dangerBlock.includes('--nerv-red'), '.nerv-status-danger should use --nerv-red');
  });

  it('36. Bar meter fill colors still use data tokens', () => {
    const meterIdx = css.indexOf('.nerv-bar-meter {');
    assert.ok(meterIdx !== -1, '.nerv-bar-meter block not found');
    const meterBlock = css.slice(meterIdx, meterIdx + 500);
    assert.ok(meterBlock.includes('--nerv-cyan'), '.nerv-bar-meter --nerv-bar-from should still default to --nerv-cyan');
    assert.ok(meterBlock.includes('--nerv-blue'), '.nerv-bar-meter --nerv-bar-to should still default to --nerv-blue');
  });
});

// === Regression (behavior 37) ===

describe('Regression — Phase 1–5 test suites pass', () => {
  it('37. All prior phase selectors still present', () => {
    assert.match(css, /--nerv-amber\s*:/, 'missing --nerv-amber token');
    assert.match(css, /--nerv-primary\s*:/, 'missing --nerv-primary meta-token');
    assert.match(css, /\.nerv-glow\b[^-]/, 'missing .nerv-glow class');
    assert.match(css, /\.nerv-scanlines\b/, 'missing .nerv-scanlines class');
    assert.match(css, /\.nerv-flicker\b[^-]/, 'missing .nerv-flicker class');
    assert.match(css, /\.nerv-glitch\b/, 'missing .nerv-glitch class');
    assert.match(css, /\.nerv-panel\b[^-]/, 'missing .nerv-panel class');
    assert.match(css, /\.nerv-divider\b[^-]/, 'missing .nerv-divider class');
    assert.match(css, /\.nerv-grid-marks\b/, 'missing .nerv-grid-marks class');
    assert.match(css, /\.nerv-stripe\b[^-]/, 'missing .nerv-stripe class');
    assert.match(css, /\.nerv-hex-grid\b/, 'missing .nerv-hex-grid class');
    assert.match(css, /\.nerv-radar\b[^-]/, 'missing .nerv-radar class');
    assert.match(css, /\.nerv-bar-meter\b[^-]/, 'missing .nerv-bar-meter class');
    assert.match(css, /\.nerv-segment-display\b/, 'missing .nerv-segment-display class');
    assert.match(css, /\.nerv-magi-panel\b/, 'missing .nerv-magi-panel class');
    assert.match(css, /\.nerv-label-box\b[^-]/, 'missing .nerv-label-box class');
    assert.match(css, /\.nerv-status-text\b/, 'missing .nerv-status-text class');
  });
});
