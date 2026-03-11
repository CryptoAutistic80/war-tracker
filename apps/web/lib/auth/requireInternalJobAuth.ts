import { randomUUID } from 'node:crypto';

import type { NextRequest } from 'next/server';
import {
  internalJobAllowlistHeaderSchema,
  internalJobAuthorizationHeaderSchema,
} from '@war-tracker/validation';

import { internalJobJsonResponse } from '../internal/internal-job-response';

type GuardOptions = {
  method: string;
  runId?: string;
};

const truthyValues = new Set(['1', 'true', 'yes', 'on']);

function getRunId(runId?: string) {
  return runId ?? randomUUID();
}

function parseBearerToken(header: string) {
  const [scheme, token] = header.trim().split(/\s+/, 2);
  if (!scheme || !token || scheme.toLowerCase() !== 'bearer') {
    return null;
  }

  return token;
}

function allowlistEnabled() {
  return truthyValues.has((process.env.INTERNAL_JOB_ALLOWLIST_ENABLED ?? '').toLowerCase());
}

export function requireInternalJobAuth(request: NextRequest, options: GuardOptions) {
  const runId = getRunId(options.runId);

  if (request.method !== options.method) {
    return {
      ok: false as const,
      runId,
      response: internalJobJsonResponse({
        ok: false,
        runId,
        status: 'rejected',
        httpStatus: 405,
        error: {
          code: 'METHOD_NOT_ALLOWED',
          message: `Expected ${options.method} but received ${request.method}`,
          details: { allowedMethod: options.method },
        },
      }),
    };
  }

  const authHeader = request.headers.get('authorization');
  const authHeaderResult = internalJobAuthorizationHeaderSchema.safeParse(authHeader);
  if (!authHeaderResult.success) {
    return {
      ok: false as const,
      runId,
      response: internalJobJsonResponse({
        ok: false,
        runId,
        status: 'rejected',
        httpStatus: 401,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Missing or invalid Authorization header',
          details: authHeaderResult.error.flatten(),
        },
      }),
    };
  }

  const actualToken = parseBearerToken(authHeaderResult.data);
  if (!actualToken || actualToken !== process.env.INTERNAL_JOB_SECRET) {
    return {
      ok: false as const,
      runId,
      response: internalJobJsonResponse({
        ok: false,
        runId,
        status: 'rejected',
        httpStatus: 401,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authorization token does not match INTERNAL_JOB_SECRET',
        },
      }),
    };
  }

  if (allowlistEnabled()) {
    const allowlist = (process.env.INTERNAL_JOB_ALLOWLIST ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);
    const candidateHeader = request.headers.get('x-internal-job-name');
    const allowlistHeaderResult = internalJobAllowlistHeaderSchema.safeParse(candidateHeader);

    if (!allowlistHeaderResult.success || !allowlist.includes(allowlistHeaderResult.data)) {
      return {
        ok: false as const,
        runId,
        response: internalJobJsonResponse({
          ok: false,
          runId,
          status: 'rejected',
          httpStatus: 403,
          error: {
            code: 'FORBIDDEN',
            message: 'Internal job is not in allowlist',
            details: {
              headerErrors: allowlistHeaderResult.success
                ? null
                : allowlistHeaderResult.error.flatten(),
            },
          },
        }),
      };
    }
  }

  return {
    ok: true as const,
    runId,
  };
}
