CREATE OR REPLACE VIEW conflicts_active_v AS
SELECT
  c.id,
  c.slug,
  c.name,
  c.status,
  c.started_on,
  r.code AS region_code,
  r.name AS region_name,
  s.code AS source_code,
  s.name AS source_name
FROM conflicts c
JOIN regions r ON r.id = c.region_id
LEFT JOIN sources s ON s.id = c.primary_source_id
WHERE c.status IN ('monitoring', 'active');

CREATE MATERIALIZED VIEW IF NOT EXISTS conflicts_by_region_mv AS
SELECT
  r.id AS region_id,
  r.code AS region_code,
  r.name AS region_name,
  COUNT(c.id)::INT AS conflict_count,
  COUNT(*) FILTER (WHERE c.status = 'active')::INT AS active_conflict_count
FROM regions r
LEFT JOIN conflicts c ON c.region_id = r.id
GROUP BY r.id, r.code, r.name;

CREATE UNIQUE INDEX IF NOT EXISTS idx_conflicts_by_region_mv_region_id
  ON conflicts_by_region_mv (region_id);
