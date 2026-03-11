import type {
  EventReportRecord,
  IngestionRunContext,
  IngestionRunStore,
  NormalizedArticleRecord,
  ProviderInputConfig,
  ProviderRunResult,
  RawArticleRecord,
} from '../types';

import { runIngestion } from '../runIngestion';

export interface ProviderFetchResult {
  rawArticles: RawArticleRecord[];
  normalizedArticles?: NormalizedArticleRecord[];
  eventReports?: EventReportRecord[];
  cursor?: ProviderInputConfig['cursor'];
  metadata?: Record<string, unknown>;
}

export interface ProviderAdapterOptions {
  provider: string;
  inputConfig: ProviderInputConfig;
  runStore: IngestionRunStore;
  fetchRecords: (
    context: IngestionRunContext,
    inputConfig: ProviderInputConfig,
  ) => Promise<ProviderFetchResult>;
}

export const runProviderAdapter = async (
  options: ProviderAdapterOptions,
): Promise<ProviderRunResult> =>
  runIngestion({
    provider: options.provider,
    inputConfig: options.inputConfig,
    runStore: options.runStore,
    execute: async (context) => {
      const fetched = await options.fetchRecords(context, options.inputConfig);

      return {
        rawArticles: fetched.rawArticles,
        normalizedArticles: fetched.normalizedArticles ?? [],
        eventReports: fetched.eventReports ?? [],
        cursor: fetched.cursor,
        metadata: fetched.metadata,
        metrics: {
          fetched: fetched.rawArticles.length,
          inserted: fetched.normalizedArticles?.length ?? 0,
          updated: 0,
          deduped: 0,
          errors: 0,
        },
      };
    },
  });
