CREATE TABLE IF NOT EXISTS event_clusters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  external_id TEXT NOT NULL,
  cluster_key TEXT NOT NULL,
  confidence_score DOUBLE PRECISION,
  score_reasons TEXT[] NOT NULL DEFAULT '{}',
  scoring_version TEXT,
  clustering_version TEXT,
  heuristic_inputs JSONB NOT NULL DEFAULT '{}'::jsonb,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT event_clusters_provider_external_id_uniq UNIQUE (provider, external_id)
);

ALTER TABLE event_clusters
  ADD COLUMN IF NOT EXISTS score_reasons TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS scoring_version TEXT,
  ADD COLUMN IF NOT EXISTS clustering_version TEXT,
  ADD COLUMN IF NOT EXISTS heuristic_inputs JSONB NOT NULL DEFAULT '{}'::jsonb;

CREATE TABLE IF NOT EXISTS event_cluster_reports (
  event_cluster_id UUID NOT NULL REFERENCES event_clusters(id) ON DELETE CASCADE,
  event_report_provider TEXT NOT NULL,
  event_report_external_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (event_cluster_id, event_report_provider, event_report_external_id)
);

CREATE INDEX IF NOT EXISTS idx_event_clusters_cluster_key ON event_clusters (cluster_key);
CREATE INDEX IF NOT EXISTS idx_event_clusters_scoring_version ON event_clusters (scoring_version);
CREATE INDEX IF NOT EXISTS idx_event_clusters_clustering_version ON event_clusters (clustering_version);
