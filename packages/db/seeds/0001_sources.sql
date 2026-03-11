INSERT INTO sources (code, name, source_type, homepage_url)
VALUES
  ('acled', 'ACLED', 'ngo', 'https://acleddata.com'),
  ('unocha', 'UN OCHA', 'government', 'https://www.unocha.org'),
  ('icrc', 'ICRC', 'ngo', 'https://www.icrc.org')
ON CONFLICT (code) DO UPDATE
SET
  name = EXCLUDED.name,
  source_type = EXCLUDED.source_type,
  homepage_url = EXCLUDED.homepage_url,
  updated_at = NOW();
