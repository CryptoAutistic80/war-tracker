import { randomUUID } from 'node:crypto';

import type { NextRequest } from 'next/server';
import { internalJobRequestSchema } from '@war-tracker/validation';

import { requireInternalJobAuth } from '../../../../lib/auth/requireInternalJobAuth';
import { internalJobJsonResponse } from '../../../../lib/internal/internal-job-response';

export async function POST(request: NextRequest) {
  const auth = requireInternalJobAuth(request, { method: 'POST' });
  if (!auth.ok) {
    return auth.response;
  }

  const runId = auth.runId;
  const payload = await request.json().catch(() => null);
  const validationResult = internalJobRequestSchema.safeParse(payload);

  if (!validationResult.success) {
    return internalJobJsonResponse({
      ok: false,
      runId,
      status: 'rejected',
      httpStatus: 400,
      counters: { received: 1 },
      error: {
        code: 'INVALID_REQUEST',
        message: 'Request payload failed validation',
        details: validationResult.error.flatten(),
      },
    });
  }

  const jobInput = validationResult.data;
  const effectiveRunId = jobInput.runId ?? runId;

  return internalJobJsonResponse({
    ok: true,
    runId: effectiveRunId,
    status: 'accepted',
    httpStatus: 202,
    counters: { received: 1, processed: 1 },
  });
}

export async function GET(request: NextRequest) {
  const runId = randomUUID();
  const auth = requireInternalJobAuth(request, { method: 'POST', runId });
  if (!auth.ok) {
    return auth.response;
  }

  return internalJobJsonResponse({
    ok: false,
    runId,
    status: 'failed',
    httpStatus: 500,
    error: {
      code: 'UNREACHABLE',
      message: 'GET should always be rejected by method guard',
    },
  });
}
