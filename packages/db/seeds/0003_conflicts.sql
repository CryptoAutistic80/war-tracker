INSERT INTO conflicts (slug, name, status, region_id, summary, started_on, primary_source_id)
SELECT
  v.slug,
  v.name,
  v.status::conflict_status,
  r.id,
  v.summary,
  v.started_on,
  s.id
FROM (
  VALUES
    ('war-in-ukraine', 'War in Ukraine', 'active', 'UA', 'State-on-state conflict with global implications.', DATE '2022-02-24', 'acled'),
    ('syrian-civil-war', 'Syrian Civil War', 'active', 'SY', 'Protracted conflict involving domestic and external actors.', DATE '2011-03-15', 'unocha'),
    ('sudan-crisis-2023', 'Sudan Crisis 2023', 'active', 'SD', 'Armed conflict between rival military factions.', DATE '2023-04-15', 'icrc')
) AS v(slug, name, status, region_code, summary, started_on, source_code)
JOIN regions r ON r.code = v.region_code
LEFT JOIN sources s ON s.code = v.source_code
ON CONFLICT (slug) DO UPDATE
SET
  name = EXCLUDED.name,
  status = EXCLUDED.status,
  region_id = EXCLUDED.region_id,
  summary = EXCLUDED.summary,
  started_on = EXCLUDED.started_on,
  primary_source_id = EXCLUDED.primary_source_id,
  updated_at = NOW();
