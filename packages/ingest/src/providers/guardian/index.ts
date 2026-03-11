import type {
  IngestionRunContext,
  IngestionRunStore,
  ProviderInputConfig,
  ProviderRunResult,
} from '../../types';

import { runProviderAdapter, type ProviderFetchResult } from '../shared';

export interface GuardianAdapterOptions {
  inputConfig: ProviderInputConfig;
  runStore: IngestionRunStore;
  fetchRecords: (
    context: IngestionRunContext,
    inputConfig: ProviderInputConfig,
  ) => Promise<ProviderFetchResult>;
}

export const runGuardianAdapter = (options: GuardianAdapterOptions): Promise<ProviderRunResult> =>
  runProviderAdapter({
    provider: 'guardian',
    inputConfig: options.inputConfig,
    runStore: options.runStore,
    fetchRecords: options.fetchRecords,
  });
