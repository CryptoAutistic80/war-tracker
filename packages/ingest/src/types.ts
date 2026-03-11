export interface TimeWindow {
  start: string;
  end: string;
}

export interface QueryDefinition {
  id: string;
  query: string;
  params?: Record<string, string | number | boolean | null>;
}

export interface QueryPack {
  id: string;
  version?: string;
  queries: QueryDefinition[];
}

export type ProviderCursor = string | Record<string, unknown> | null;

export interface ProviderInputConfig {
  window: TimeWindow;
  queryPack: QueryPack;
  cursor?: ProviderCursor;
}

export interface RawArticleRecord {
  provider: string;
  externalId: string;
  title?: string;
  url?: string;
  publishedAt?: string;
  fetchedAt: string;
  payload: Record<string, unknown>;
}

export interface NormalizedArticleRecord {
  provider: string;
  externalId: string;
  title: string;
  url?: string;
  language?: string;
  summary?: string;
  body?: string;
  publishedAt?: string;
  sourceName?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface EventReportRecord {
  provider: string;
  externalId: string;
  articleExternalId?: string;
  eventDate?: string;
  eventType?: string;
  country?: string;
  region?: string;
  location?: string;
  actors?: string[];
  fatalities?: number;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface DecisionMetadata {
  scoringVersion?: string;
  clusteringVersion?: string;
  scoreReasons?: string[];
  heuristicInputs?: Record<string, unknown>;
}

export interface EventClusterRecord {
  provider: string;
  externalId: string;
  eventReportExternalIds: string[];
  clusterKey: string;
  confidenceScore?: number;
  decisionMetadata?: DecisionMetadata;
  metadata?: Record<string, unknown>;
}

export interface RunMetrics {
  fetched: number;
  inserted: number;
  updated: number;
  deduped: number;
  errors: number;
}

export interface ProviderRunResult {
  rawArticles: RawArticleRecord[];
  normalizedArticles: NormalizedArticleRecord[];
  eventReports: EventReportRecord[];
  eventClusters?: EventClusterRecord[];
  metrics: RunMetrics;
  cursor?: ProviderCursor;
  metadata?: Record<string, unknown>;
}

export interface IngestionRunContext {
  runId: string;
  provider: string;
  startedAt: string;
}

export interface IngestionRunCreate {
  provider: string;
  startedAt: string;
  inputConfig: ProviderInputConfig;
  metadata?: Record<string, unknown>;
}

export interface IngestionRunFinalize {
  status: 'completed' | 'failed';
  finishedAt: string;
  metrics: RunMetrics;
  cursor?: ProviderCursor;
  metadata?: Record<string, unknown>;
  errorMessage?: string;
}

export interface IngestionRunStore {
  createIngestionRun(input: IngestionRunCreate): Promise<{ id: string }>;
  finalizeIngestionRun(runId: string, input: IngestionRunFinalize): Promise<void>;
}
