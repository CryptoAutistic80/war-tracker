import type {
  IngestionRunContext,
  IngestionRunStore,
  ProviderInputConfig,
  ProviderRunResult,
} from '../../types';

import { runProviderAdapter, type ProviderFetchResult } from '../shared';

export interface AcledAdapterOptions {
  inputConfig: ProviderInputConfig;
  runStore: IngestionRunStore;
  fetchRecords: (
    context: IngestionRunContext,
    inputConfig: ProviderInputConfig,
  ) => Promise<ProviderFetchResult>;
}

export const runAcledAdapter = (options: AcledAdapterOptions): Promise<ProviderRunResult> =>
  runProviderAdapter({
    provider: 'acled',
    inputConfig: options.inputConfig,
    runStore: options.runStore,
    fetchRecords: options.fetchRecords,
  });
