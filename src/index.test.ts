import test from 'node:test';
import assert from 'node:assert/strict';

import { handlePromptError } from './index.js';

test('handlePromptError exits with code 130 for AbortError', () => {
  const originalExit = process.exit;

  process.exit = ((code?: number) => {
    throw new Error(`EXIT:${code ?? 0}`);
  }) as typeof process.exit;

  try {
    const error = new Error('Aborted with Ctrl+C') as Error & { code: string };
    error.code = 'ABORT_ERR';

    assert.throws(() => handlePromptError(error), /EXIT:130/);
  } finally {
    process.exit = originalExit;
  }
});

test('handlePromptError rethrows non-abort errors', () => {
  const error = new Error('boom');
  assert.throws(() => handlePromptError(error), /boom/);
});