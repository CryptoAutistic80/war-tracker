CREATE INDEX IF NOT EXISTS idx_sources_active ON sources (is_active);
CREATE INDEX IF NOT EXISTS idx_sources_type ON sources (source_type);

CREATE INDEX IF NOT EXISTS idx_regions_iso_alpha2 ON regions (iso_alpha2);

CREATE INDEX IF NOT EXISTS idx_conflicts_region_id ON conflicts (region_id);
CREATE INDEX IF NOT EXISTS idx_conflicts_status ON conflicts (status);
CREATE INDEX IF NOT EXISTS idx_conflicts_started_on ON conflicts (started_on DESC NULLS LAST);
