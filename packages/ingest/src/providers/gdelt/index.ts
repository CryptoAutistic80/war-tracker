import type {
  IngestionRunContext,
  IngestionRunStore,
  ProviderInputConfig,
  ProviderRunResult,
} from '../../types';

import { runProviderAdapter, type ProviderFetchResult } from '../shared';

export interface GdeltAdapterOptions {
  inputConfig: ProviderInputConfig;
  runStore: IngestionRunStore;
  fetchRecords: (
    context: IngestionRunContext,
    inputConfig: ProviderInputConfig,
  ) => Promise<ProviderFetchResult>;
}

export const runGdeltAdapter = (options: GdeltAdapterOptions): Promise<ProviderRunResult> =>
  runProviderAdapter({
    provider: 'gdelt',
    inputConfig: options.inputConfig,
    runStore: options.runStore,
    fetchRecords: options.fetchRecords,
  });
