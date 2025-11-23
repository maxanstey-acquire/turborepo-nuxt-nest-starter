# @app/prisma

Prisma client package plus Nest DI module/token. Contains:

- Generated Prisma Client in `generated/client/**` (from `npm run generate`).
- Runtime client wrapper (`client.ts`) that sets up the adapter/config and memoizes in dev.
- Nest module (`src/prisma.module.ts`) and provider/token for DI.
- `prisma/schema.prisma` + migrations config.

## Scripts

- `pnpm run generate` – generates Prisma Client `generated/client/**` using `prisma.config.ts`.
- `pnpm run build` – `tsc -p tsconfig.json`, emits `dist/**` per `main`.
- `pnpm run check` – typecheck, no emit.
- `pnpm run db:migrate` / `db:deploy` / `db:studio` – standard Prisma commands.
- `pnpm run clean` – remove `dist`.

## What to run and when

- After schema changes: `pnpm run generate` (refresh `generated/client/**`), then `pnpm run build` to refresh `dist`.
- Before backend build/dev: ensure generate has been run; backend imports `@app/prisma` which expects generated client +
  dist.
- For CI: run `pnpm run generate && pnpm run build` before backend build.

## Structure

- `prisma/schema.prisma` – models; generator outputs to `generated/client`.
- `prisma.config.ts` – datasource URL + migrations path; reads `DATABASE_URL` via `prisma/config`.
- `client.ts` – imports generated client, configures adapter (`PrismaBetterSqlite3` with env URL), memoizes in dev.
- `index.ts` – re-exports generated client/enums/models, `prisma` instance, Nest module, and token.
- `src/` – Nest module + provider + token for DI; use `PRISMA_CLIENT` to inject the `prisma` instance.

## Usage

- Backend (Nest):
    - Import `PrismaModule` in feature modules or core module.
    - Inject with token: `@Inject(PRISMA_CLIENT) prisma: PrismaClient`.
    - Generated types/models are available via `@app/prisma`.
- DB uses SQLite with `DATABASE_URL`.
