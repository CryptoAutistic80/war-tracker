# war-tracker

Monorepo scaffold for the War Tracker platform, organized as a pnpm workspace.

## Requirements

- Node.js 20+
- pnpm 9+

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create required environment files (minimum):
   - `apps/web/.env.local`
   - `packages/db/.env`
   - `packages/ingest/.env`

   You can create `.env.example` files in each package and copy from them.

3. Start local development:

   ```bash
   pnpm dev
   ```

## Workspace layout

- `apps/web` — Next.js web application and UI shell.
- `packages/db` — Database access layer and schema-related utilities.
- `packages/ingest` — Data ingestion pipelines and source adapters.
- `packages/types` — Shared TypeScript domain and API types.
- `packages/validation` — Shared runtime validation schemas.
- `packages/config` — Shared configuration loaders and constants.

## Scripts

- `pnpm dev` — Start the web app in development mode.
- `pnpm build` — Build all workspaces that implement `build`.
- `pnpm lint` — Run linting across all workspaces.
- `pnpm typecheck` — Run TypeScript checks across all workspaces.
- `pnpm format` — Format the repository with Prettier.
- `pnpm test` — Run tests across all workspaces (placeholder where not implemented).
- `pnpm db:migrate` — Apply SQL migrations in `packages/db/migrations`.
- `pnpm db:seed` — Apply baseline seed SQL in `packages/db/seeds`.

## Quality tooling

- ESLint (Next.js + TypeScript rules) configured at repo root.
- Prettier formatting configured at repo root.
- Optional git hooks via Husky + lint-staged (`.husky/pre-commit`).

Database workflow docs: `packages/db/README.md`.
