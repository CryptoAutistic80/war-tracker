import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

import { getNextTabIndex } from '../components/ui/Tabs';

function read(relativePath: string) {
  return readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('header component uses semantic landmarks and accessible controls', () => {
  const source = read('components/AppHeader.tsx');

  assert.match(source, /<header/);
  assert.match(source, /<nav aria-label="Primary">/);
  assert.match(source, /aria-label="Search"/);
  assert.match(source, /<Link/);
});

test('filter panel exposes aside landmark and labeled filter form', () => {
  const source = read('components/FilterPanel.tsx');

  assert.match(source, /<Card as="aside">/);
  assert.match(source, /aria-label="Conflict filters"/);
  assert.match(source, /aria-label="Reset all filters"/);
});

test('tab keyboard helper returns expected indexes for roving focus', () => {
  assert.equal(getNextTabIndex(0, 3, 'ArrowRight'), 1);
  assert.equal(getNextTabIndex(2, 3, 'ArrowRight'), 0);
  assert.equal(getNextTabIndex(0, 3, 'ArrowLeft'), 2);
  assert.equal(getNextTabIndex(1, 3, 'Home'), 0);
  assert.equal(getNextTabIndex(1, 3, 'End'), 2);
  assert.equal(getNextTabIndex(1, 3, 'Enter'), null);
});

test('ui styles define visible focus rings for interactive controls', () => {
  const css = read('components/ui/ui.css');

  assert.match(css, /a:focus-visible/);
  assert.match(css, /\.ui-button:focus-visible/);
  assert.match(css, /\.ui-input:focus-visible/);
  assert.match(css, /\.ui-select:focus-visible/);
  assert.match(css, /\.ui-tab:focus-visible/);
});
