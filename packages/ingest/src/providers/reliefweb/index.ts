import type {
  IngestionRunContext,
  IngestionRunStore,
  ProviderInputConfig,
  ProviderRunResult,
} from '../../types';

import { runProviderAdapter, type ProviderFetchResult } from '../shared';

export interface ReliefWebAdapterOptions {
  inputConfig: ProviderInputConfig;
  runStore: IngestionRunStore;
  fetchRecords: (
    context: IngestionRunContext,
    inputConfig: ProviderInputConfig,
  ) => Promise<ProviderFetchResult>;
}

export const runReliefWebAdapter = (options: ReliefWebAdapterOptions): Promise<ProviderRunResult> =>
  runProviderAdapter({
    provider: 'reliefweb',
    inputConfig: options.inputConfig,
    runStore: options.runStore,
    fetchRecords: options.fetchRecords,
  });
