import assert from 'node:assert/strict';
import test from 'node:test';

import {
  internalJobAuthorizationHeaderSchema,
  internalJobRequestSchema,
  internalJobResponseSchema,
} from '../src';

test('internalJobAuthorizationHeaderSchema accepts Bearer token format', () => {
  const result = internalJobAuthorizationHeaderSchema.safeParse('Bearer abc123');
  assert.equal(result.success, true);
});

test('internalJobRequestSchema applies defaults for dryRun and limit', () => {
  const parsed = internalJobRequestSchema.parse({ runId: 'run-1' });
  assert.equal(parsed.dryRun, false);
  assert.equal(parsed.limit, 100);
});

test('internalJobResponseSchema rejects invalid status values', () => {
  const result = internalJobResponseSchema.safeParse({
    ok: true,
    runId: 'run-1',
    status: 'queued',
    counters: {
      received: 1,
      processed: 1,
      failed: 0,
      skipped: 0,
    },
    error: null,
  });

  assert.equal(result.success, false);
});
