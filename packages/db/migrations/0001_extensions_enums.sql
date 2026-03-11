CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'source_type') THEN
    CREATE TYPE source_type AS ENUM ('government', 'ngo', 'media', 'academic', 'other');
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'conflict_status') THEN
    CREATE TYPE conflict_status AS ENUM ('monitoring', 'active', 'deescalated', 'resolved');
  END IF;
END
$$;
