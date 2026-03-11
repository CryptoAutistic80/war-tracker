import type {
  IngestionRunContext,
  IngestionRunStore,
  ProviderInputConfig,
  ProviderRunResult,
  RunMetrics,
} from './types';

const emptyMetrics = (): RunMetrics => ({
  fetched: 0,
  inserted: 0,
  updated: 0,
  deduped: 0,
  errors: 0,
});

export interface RunIngestionOptions {
  provider: string;
  inputConfig: ProviderInputConfig;
  runStore: IngestionRunStore;
  metadata?: Record<string, unknown>;
  execute: (context: IngestionRunContext) => Promise<ProviderRunResult>;
}

export const runIngestion = async (options: RunIngestionOptions): Promise<ProviderRunResult> => {
  const startedAt = new Date().toISOString();

  const { id: runId } = await options.runStore.createIngestionRun({
    provider: options.provider,
    startedAt,
    inputConfig: options.inputConfig,
    metadata: options.metadata,
  });

  try {
    const result = await options.execute({
      runId,
      provider: options.provider,
      startedAt,
    });

    await options.runStore.finalizeIngestionRun(runId, {
      status: 'completed',
      finishedAt: new Date().toISOString(),
      metrics: result.metrics,
      cursor: result.cursor,
      metadata: result.metadata,
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown ingestion error';

    await options.runStore.finalizeIngestionRun(runId, {
      status: 'failed',
      finishedAt: new Date().toISOString(),
      metrics: {
        ...emptyMetrics(),
        errors: 1,
      },
      metadata: {
        ...options.metadata,
        provider: options.provider,
      },
      errorMessage,
    });

    throw error;
  }
};
