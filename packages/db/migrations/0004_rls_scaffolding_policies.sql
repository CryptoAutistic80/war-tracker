ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conflicts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS sources_read ON sources;
CREATE POLICY sources_read ON sources FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS regions_read ON regions;
CREATE POLICY regions_read ON regions FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS conflicts_read ON conflicts;
CREATE POLICY conflicts_read ON conflicts FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS sources_write ON sources;
CREATE POLICY sources_write ON sources
  FOR ALL
  USING (current_setting('app.role', true) = 'writer')
  WITH CHECK (current_setting('app.role', true) = 'writer');

DROP POLICY IF EXISTS regions_write ON regions;
CREATE POLICY regions_write ON regions
  FOR ALL
  USING (current_setting('app.role', true) = 'writer')
  WITH CHECK (current_setting('app.role', true) = 'writer');

DROP POLICY IF EXISTS conflicts_write ON conflicts;
CREATE POLICY conflicts_write ON conflicts
  FOR ALL
  USING (current_setting('app.role', true) = 'writer')
  WITH CHECK (current_setting('app.role', true) = 'writer');
