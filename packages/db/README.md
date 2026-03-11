# @war-tracker/db database workflow

This package contains SQL migrations, seed files, and reusable SQL helpers used by the platform.

## Layout

- `migrations/` - ordered SQL migrations (forward-only).
- `seeds/` - baseline reference data.
- `sql/` - reusable SQL snippets/helpers.

## Running migrations

Set `DATABASE_URL` before running any database command.

### Local development

```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/war_tracker pnpm db:migrate
DATABASE_URL=postgres://postgres:postgres@localhost:5432/war_tracker pnpm db:seed
```

### Shared dev/staging

```bash
DATABASE_URL=$DEV_DATABASE_URL pnpm db:migrate
DATABASE_URL=$DEV_DATABASE_URL pnpm db:seed
```

### Production

```bash
DATABASE_URL=$PROD_DATABASE_URL pnpm db:migrate
```

Production seeding should be rare and intentional (only for immutable baseline catalogs), and should run through your deployment pipeline.

## Rollback strategy

Migrations are **forward-only** by default.

1. If a migration fails mid-deploy, fix forward by creating a new migration that corrects schema/data.
2. For severe production incidents, restore from backup / point-in-time recovery at the database level.
3. For local dev, rollback can be handled by resetting the database and re-running migrations + seeds.

## Materialized view helpers

Use `sql/refresh_materialized_views.sql` to refresh analytical snapshots:

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY conflicts_by_region_mv;
```
