type JobLogStatus = 'started' | 'success' | 'failure';
type JobLogPhase = 'start' | 'end' | 'error';

export type JobLogInput = {
  provider: string;
  runId: string;
  correlationId: string;
  phase: JobLogPhase;
  durationMs: number;
  recordsFetched: number;
  recordsInserted: number;
  recordsUpdated: number;
  status: JobLogStatus;
  message?: string;
  error?: unknown;
};

export function logJobEvent(input: JobLogInput) {
  const payload = {
    provider: input.provider,
    runId: input.runId,
    correlationId: input.correlationId,
    phase: input.phase,
    durationMs: input.durationMs,
    recordsFetched: input.recordsFetched,
    recordsInserted: input.recordsInserted,
    recordsUpdated: input.recordsUpdated,
    status: input.status,
    message: input.message,
    error: toErrorMetadata(input.error),
    timestamp: new Date().toISOString(),
  };

  const serialized = JSON.stringify(payload);

  if (input.status === 'failure') {
    console.error(serialized);
    return;
  }

  console.info(serialized);
}

function toErrorMetadata(error: unknown) {
  if (!error) {
    return undefined;
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: String(error),
  };
}
