import { NextResponse } from 'next/server';

import type { InternalJobErrorDetail, InternalJobStatusCounters } from '@war-tracker/validation';

export type InternalJobStatus = 'accepted' | 'completed' | 'rejected' | 'failed';

const emptyCounters: InternalJobStatusCounters = {
  received: 0,
  processed: 0,
  failed: 0,
  skipped: 0,
};

export function internalJobJsonResponse(input: {
  ok: boolean;
  runId: string;
  status: InternalJobStatus;
  counters?: Partial<InternalJobStatusCounters>;
  error?: InternalJobErrorDetail | null;
  httpStatus?: number;
}) {
  const body = {
    ok: input.ok,
    runId: input.runId,
    status: input.status,
    counters: {
      ...emptyCounters,
      ...input.counters,
    },
    error: input.error ?? null,
  };

  return NextResponse.json(body, { status: input.httpStatus ?? 200 });
}
