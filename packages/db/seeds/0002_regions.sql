INSERT INTO regions (code, name, iso_alpha2)
VALUES
  ('UA', 'Ukraine', 'UA'),
  ('SY', 'Syria', 'SY'),
  ('SD', 'Sudan', 'SD')
ON CONFLICT (code) DO UPDATE
SET
  name = EXCLUDED.name,
  iso_alpha2 = EXCLUDED.iso_alpha2,
  updated_at = NOW();
