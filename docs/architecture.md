# Architecture

## Internal job observability contract

All internal ingestion/job routes must emit structured JSON logs with the same schema so downstream dashboards and alerts can rely on stable fields.

### Required fields

- `provider`: stable provider or route identifier (example: `internal/jobs`)
- `runId`: execution id for one logical ingestion run
- `correlationId`: request correlation id propagated from `x-correlation-id` (or generated server-side)
- `phase`: one of `start`, `end`, `error`
- `durationMs`: elapsed milliseconds for the phase/event
- `recordsFetched`: number of records fetched during the run
- `recordsInserted`: number of records inserted during the run
- `recordsUpdated`: number of records updated during the run
- `status`: one of `started`, `success`, `failure`

### Emission rules

1. Emit a `start` log when a job route begins processing.
2. Emit an `end` log when a job route completes successfully.
3. Emit an `error` log for validation/auth failures and unhandled exceptions.
4. Capture exceptions with Sentry for app-router errors, route-handler errors, and internal ingestion failures.

Keeping this schema stable is mandatory; add new keys in a backwards-compatible way and avoid renaming required fields.
