#!/usr/bin/env tsx
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.resolve(__dirname, '../packages/db/migrations');

async function run() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is required.');
  }

  const client = new Client({ connectionString });
  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id BIGSERIAL PRIMARY KEY,
        filename TEXT NOT NULL UNIQUE,
        checksum TEXT NOT NULL,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    const filenames = (await readdir(migrationsDir))
      .filter((name) => name.endsWith('.sql'))
      .sort((a, b) => a.localeCompare(b));

    for (const filename of filenames) {
      const sqlPath = path.join(migrationsDir, filename);
      const sql = await readFile(sqlPath, 'utf8');
      const checksum = Buffer.from(sql).toString('base64');

      const existing = await client.query<{ checksum: string }>(
        'SELECT checksum FROM schema_migrations WHERE filename = $1',
        [filename],
      );

      if (existing.rowCount && existing.rows[0]?.checksum === checksum) {
        console.log(`↷ Skipping ${filename} (already applied)`);
        continue;
      }

      if (existing.rowCount) {
        throw new Error(
          `Migration ${filename} was modified after being applied. Create a new migration instead.`,
        );
      }

      console.log(`→ Applying ${filename}`);
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (filename, checksum) VALUES ($1, $2)', [
          filename,
          checksum,
        ]);
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    }

    console.log('✓ Migrations complete');
  } finally {
    await client.end();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
