import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST_CSS = resolve(ROOT, 'dist/nerv.css');

let css = '';

describe('Effects layer — build integration', () => {
  before(() => {
    execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
    css = readFileSync(DIST_CSS, 'utf-8');
  });

  it('npm run build succeeds with three new @forward partials', () => {
    assert.ok(existsSync(DIST_CSS), 'dist/nerv.css should exist after build');
    assert.ok(css.length > 0, 'compiled CSS should not be empty');
  });
});

describe('Scanline overlay', () => {
  it('.nerv-scanlines class exists with position: fixed', () => {
    assert.match(css, /\.nerv-scanlines\b/, 'missing .nerv-scanlines class');
    assert.match(css, /position:\s*fixed/, '.nerv-scanlines should use position: fixed');
  });

  it('.nerv-scanlines uses repeating-linear-gradient for scanline pattern', () => {
    assert.match(css, /repeating-linear-gradient/, 'missing repeating-linear-gradient for scanline pattern');
  });

  it('.nerv-scanlines includes radial-gradient for vignette', () => {
    assert.match(css, /radial-gradient/, 'missing radial-gradient for vignette');
  });

  it('.nerv-scanlines has pointer-events: none', () => {
    assert.match(css, /pointer-events:\s*none/, '.nerv-scanlines should have pointer-events: none');
  });

  it('@keyframes for scanline band animation exists', () => {
    assert.match(css, /@keyframes\s+nerv-scanline-band/, 'missing @keyframes nerv-scanline-band');
  });
});

describe('Flicker classes', () => {
  it('.nerv-flicker class exists', () => {
    assert.match(css, /\.nerv-flicker\b[^-]/, 'missing .nerv-flicker class');
  });

  it('.nerv-flicker-fast class exists', () => {
    assert.match(css, /\.nerv-flicker-fast\b/, 'missing .nerv-flicker-fast class');
  });

  it('.nerv-flicker-staccato class exists', () => {
    assert.match(css, /\.nerv-flicker-staccato\b/, 'missing .nerv-flicker-staccato class');
  });

  it('.nerv-blink class exists', () => {
    assert.match(css, /\.nerv-blink\b/, 'missing .nerv-blink class');
  });

  it('flicker animations use steps() timing', () => {
    assert.match(css, /steps\(/, 'flicker animations should use steps() timing function');
  });

  it('flicker durations reference --nerv-flicker-duration or --nerv-animation-speed', () => {
    const flickerSection = css.slice(css.indexOf('.nerv-flicker'));
    assert.ok(
      flickerSection.includes('--nerv-flicker-duration') || flickerSection.includes('--nerv-animation-speed'),
      'flicker durations should reference --nerv-flicker-duration or --nerv-animation-speed tokens'
    );
  });

  it('flicker delays use --nerv-stagger-index custom property', () => {
    assert.match(css, /--nerv-stagger-index/, 'missing --nerv-stagger-index in flicker delay');
  });

  it(':nth-child() rules set --nerv-stagger-index defaults', () => {
    assert.match(css, /nth-child[\s\S]*?--nerv-stagger-index/, ':nth-child should set --nerv-stagger-index');
  });
});

describe('Glitch effect', () => {
  it('.nerv-glitch class exists', () => {
    assert.match(css, /\.nerv-glitch\b/, 'missing .nerv-glitch class');
  });

  it('.nerv-glitch::before and ::after pseudo-elements exist', () => {
    assert.match(css, /\.nerv-glitch::before/, 'missing .nerv-glitch::before');
    assert.match(css, /\.nerv-glitch::after/, 'missing .nerv-glitch::after');
  });

  it('glitch pseudo-elements use clip-path', () => {
    const glitchSection = css.slice(css.indexOf('.nerv-glitch'));
    assert.ok(glitchSection.includes('clip-path'), 'glitch pseudo-elements should use clip-path');
  });

  it('@keyframes for glitch animation exists', () => {
    assert.match(css, /@keyframes\s+nerv-glitch/, 'missing @keyframes nerv-glitch');
  });

  it('glitch duration references --nerv-glitch-duration token', () => {
    const glitchSection = css.slice(css.indexOf('.nerv-glitch'));
    assert.ok(
      glitchSection.includes('--nerv-glitch-duration'),
      'glitch animation should reference --nerv-glitch-duration token'
    );
  });
});

describe('Accessibility — prefers-reduced-motion', () => {
  it('prefers-reduced-motion media query is present', () => {
    assert.match(css, /prefers-reduced-motion:\s*reduce/, 'missing prefers-reduced-motion media query');
  });

  it('animation classes are suppressed under prefers-reduced-motion', () => {
    const rmIdx = css.indexOf('prefers-reduced-motion');
    assert.ok(rmIdx > -1, 'prefers-reduced-motion not found');
    const rmBlock = css.slice(rmIdx);
    assert.ok(
      rmBlock.includes('animation') && (rmBlock.includes('none') || rmBlock.includes('0s')),
      'prefers-reduced-motion should suppress animations (animation: none or animation-duration: 0s)'
    );
  });
});
