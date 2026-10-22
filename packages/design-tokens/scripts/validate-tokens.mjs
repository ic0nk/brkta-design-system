/**
 * BRKTA — Token Validation Tests
 * ========================================================================
 * Validates token definitions in theme.css against approved values.
 *
 * Usage:
 *   node scripts/validate-tokens.mjs
 *
 * ========================================================================
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { readFileSync } = require('fs');
const path = require('path');

const css = readFileSync(path.resolve('theme.css'), 'utf-8');

let failures = 0;
let passes = 0;

function check(label, condition) {
  if (condition) {
    console.log(`  \x1b[32m\xe2\x9c\x93\x1b[0m ${label}`);
    passes++;
  } else {
    console.log(`  \x1b[31m\xe2\x9c\x97\x1b[0m ${label} \u2014 FAIL`);
    failures++;
  }
}

function contains(pattern) {
  return css.includes(pattern);
}

console.log('\n=== DESIGN TOKEN VALIDATION ===\n');

// ─── Light background matches approved cream ──────────────────────────────
console.log('Light theme:');
check('--background uses cream (oklch 0.9585 0.0098 87.5 = #F4F1EA)',
  contains('--background: oklch(0.9585 0.0098 87.5)'));
check('--card is not pure white (not oklch(1 0 0))',
  css.indexOf('--card: oklch(1 0 0)') === -1);
check('--popover is not pure white',
  css.indexOf('--popover: oklch(1 0 0)') === -1);
check('Surface hierarchy: background < surface (darker to lighter)',
  css.indexOf('--background: oklch(0.9585') > 0 &&
  css.indexOf('--surface: oklch(0.9705') > 0);
check('Card < Popover lightness: card is darker than popover',
  css.indexOf('--card: oklch(0.9920') > 0 &&
  css.indexOf('--popover: oklch(0.9945') > 0);

// ─── Dark foreground matches same connecting cream ────────────────────────
console.log('\nDark theme:');
check('--foreground uses cream in dark (same oklch as light background)',
  contains('--foreground: oklch(0.9585 0.0098 87.5)') &&
  css.indexOf('.dark') > 0);
check('--background is warm charcoal, not pure black',
  css.indexOf('.dark') > 0 &&
  contains('--background: oklch(0.1776'));
check('--background is NOT pure black (oklch(0 0 0))',
  css.indexOf('--background: oklch(0 0 0)') === -1);
check('Dark surface hierarchy: background < surface < card < popover',
  css.indexOf('--background: oklch(0.1776') > 0 &&
  css.indexOf('.dark') > 0 &&
  css.indexOf('--surface: oklch(0.2083') > 0 &&
  css.indexOf('--card: oklch(0.2397') > 0 &&
  css.indexOf('--popover: oklch(0.2694') > 0);

// ─── All surface levels are distinct ──────────────────────────────────────
console.log('\nSurface level distinctness:');
const lightSurfaces = [
  ['--background', '0.9585'],
  ['--surface',   '0.9705'],
  ['--card',      '0.9920'],
  ['--popover',   '0.9945'],
];
for (const [token, lightness] of lightSurfaces) {
  check(`Light ${token} lightness = ${lightness}`, contains(`${token}: oklch(${lightness}`));
}

const darkSurfaces = [
  ['--background', '0.1776'],
  ['--surface',   '0.2083'],
  ['--card',      '0.2397'],
  ['--popover',   '0.2694'],
];
for (const [token, lightness] of darkSurfaces) {
  check(`Dark ${token} lightness = ${lightness}`, contains(`${token}: oklch(${lightness}`));
}

// ─── Utility tokens ──────────────────────────────────────────────────────
console.log('\nUtility tokens:');
check('--utility-white: oklch(1 0 0) exists',
  contains('--utility-white: oklch(1 0 0)'));
check('--utility-black: oklch(0 0 0) exists',
  contains('--utility-black: oklch(0 0 0)'));

// ─── Tailwind mapping ─────────────────────────────────────────────────────
console.log('\nTailwind v4 @theme inline mapping:');
check('--color-background mapped',
  contains('--color-background: var(--background)'));
check('--color-foreground mapped',
  contains('--color-foreground: var(--foreground)'));
check('--color-utility-white mapped',
  contains('--color-utility-white: var(--utility-white)'));
check('--color-utility-black mapped',
  contains('--color-utility-black: var(--utility-black)'));

// ─── Status colours are preserved ────────────────────────────────────────
console.log('\nStatus color preservation:');
check('--destructive is red (oklch ~0.577 0.245 ...)',
  contains('--destructive: oklch(0.577'));
check('--success exists',
  contains('--success:'));
check('--warning exists',
  contains('--warning:'));
check('--information exists',
  contains('--information:'));

// ─── Token separation ─────────────────────────────────────────────────────
console.log('\nToken separation:');
check('--primary is neutral (not lime)',
  contains('--primary: oklch(0.2042') || contains('--primary: oklch(0.9585'));
check('--accent is brand lime',
  (contains('--accent: oklch(0.92 0.3 120') || contains('--accent: oklch(0.82')) &&
  !contains('--accent: oklch(0.2042'));
check('Dark mode uses .dark class selector',
  contains('.dark {'));

// ─── Warm chroma check ───────────────────────────────────────────────────
console.log('\nWarm chroma presence:');
// All semantic surface/foreground tokens should have non-zero chroma
const warmTokens = [
  '--background', '--foreground', '--surface', '--card', '--popover',
  '--muted', '--secondary', '--border', '--input', '--ring'
];
let warmPass = 0;
for (const token of warmTokens) {
  // Find the token definition and check chroma > 0
  const regex = new RegExp(token + ': oklch\\(([\\d.]+) ([\\d.]+)');
  const match = css.match(regex);
  if (match && parseFloat(match[2]) > 0) {
    warmPass++;
  } else if (match && parseFloat(match[2]) === 0) {
    // Could be --input which has chroma > 0 in our design
    // This is fine — just track it
  }
}
check(`All ${warmTokens.length} semantic tokens use non-zero chroma`,
  warmPass === warmTokens.length);

// ─── Summary ─────────────────────────────────────────────────────────────
const total = passes + failures;
console.log(`\n\x1b[4mResults: ${passes}/${total} passed\x1b[0m`);
if (failures === 0) {
  console.log('\x1b[32m\u2713 All token validation checks PASS\x1b[0m\n');
  process.exit(0);
} else {
  console.log(`\x1b[31m\u2717 ${failures} check(s) FAILED\x1b[0m\n`);
  process.exit(1);
}
