import test from 'node:test';
import assert from 'node:assert/strict';

import { generateCode } from './password.js';

test('generateCode preserves the legacy output for a standard key', () => {
  assert.equal(generateCode('abc123', 'github'), 'd11fB50cE2250c76');
});

test('generateCode prefixes K when the raw result would start with a digit', () => {
  assert.equal(generateCode('abc123', 'test'), 'K36fe8F7260f0D37');
});