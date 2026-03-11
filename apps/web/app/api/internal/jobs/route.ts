import { randomUUID } from 'node:crypto';

import type { NextRequest } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { clusterModelVersion, scoreModelVersion } from '@war-tracker/ingest';
import { internalJobRequestSchema } from '@war-tracker/validation';

import { requireInternalJobAuth } from '../../../../lib/auth/requireInternalJobAuth';
import { internalJobJsonResponse } from '../../../../lib/internal/internal-job-response';
import { logJobEvent } from '../../../../lib/observability/logger';

const provider = 'internal/jobs';

export async function POST(request: NextRequest) {
  const requestStartedAt = Date.now();
  const correlationId = request.headers.get('x-correlation-id') ?? randomUUID();

  const auth = requireInternalJobAuth(request, { method: 'POST' });
  if (!auth.ok) {
    logJobEvent({
      provider,
      runId: auth.runId,
      correlationId,
      phase: 'error',
      durationMs: Date.now() - requestStartedAt,
      recordsFetched: 0,
      recordsInserted: 0,
      recordsUpdated: 0,
      status: 'failure',
      message: 'Authentication or method guard failed',
    });

    return auth.response;
  }

  const runId = auth.runId;

  logJobEvent({
    provider,
    runId,
    correlationId,
    phase: 'start',
    durationMs: 0,
    recordsFetched: 0,
    recordsInserted: 0,
    recordsUpdated: 0,
    status: 'started',
    message: 'Internal job request received',
  });

  try {
    const payload = await request.json().catch(() => null);
    const validationResult = internalJobRequestSchema.safeParse(payload);

    if (!validationResult.success) {
      logJobEvent({
        provider,
        runId,
        correlationId,
        phase: 'error',
        durationMs: Date.now() - requestStartedAt,
        recordsFetched: 0,
        recordsInserted: 0,
        recordsUpdated: 0,
        status: 'failure',
        message: 'Request payload failed validation',
        error: validationResult.error,
      });

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

    logJobEvent({
      provider,
      runId: effectiveRunId,
      correlationId,
      phase: 'end',
      durationMs: Date.now() - requestStartedAt,
      recordsFetched: 1,
      recordsInserted: 1,
      recordsUpdated: 0,
      status: 'success',
      message: 'Internal job request accepted',
    });

    return internalJobJsonResponse({
      ok: true,
      runId: effectiveRunId,
      status: 'accepted',
      httpStatus: 202,
      counters: { received: 1, processed: 1 },
      debug: {
        scoringVersion: scoreModelVersion,
        clusteringVersion: clusterModelVersion,
        scoreReasons: ['request validated'],
        heuristicInputs: { dryRun: jobInput.dryRun, limit: jobInput.limit },
      },
    });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { provider, phase: 'error' },
      extra: { runId, correlationId },
    });

    logJobEvent({
      provider,
      runId,
      correlationId,
      phase: 'error',
      durationMs: Date.now() - requestStartedAt,
      recordsFetched: 0,
      recordsInserted: 0,
      recordsUpdated: 0,
      status: 'failure',
      message: 'Unhandled internal job route failure',
      error,
    });

    return internalJobJsonResponse({
      ok: false,
      runId,
      status: 'failed',
      httpStatus: 500,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Unexpected failure while processing internal job request',
      },
    });
  }
}

export async function GET(request: NextRequest) {
  const runId = randomUUID();
  const correlationId = request.headers.get('x-correlation-id') ?? randomUUID();
  const auth = requireInternalJobAuth(request, { method: 'POST', runId });
  if (!auth.ok) {
    logJobEvent({
      provider,
      runId,
      correlationId,
      phase: 'error',
      durationMs: 0,
      recordsFetched: 0,
      recordsInserted: 0,
      recordsUpdated: 0,
      status: 'failure',
      message: 'GET blocked by method guard',
    });

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
    debug: {
      scoringVersion: scoreModelVersion,
      clusteringVersion: clusterModelVersion,
    },
  });
}
