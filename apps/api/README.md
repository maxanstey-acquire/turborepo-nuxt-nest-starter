# @app/backend

Nest 11 API wired to the shared oRPC contract. Uses feature-scoped modules, clean-architecture layering, and Prisma for
persistence.

## Quick Start

```bash
pnpm install
pnpm --filter @app/prisma run generate  # required before backend dev/build
pnpm --filter @app/backend run dev
```

Environment:

- `DATABASE_URL` for Prisma (SQLite adapter by default).
- `FRONTEND_ORIGIN` for CORS (defaults to `http://localhost:4200`).
- `PORT` (defaults to 3100).

## Structure

- `main.ts` – bootstraps Nest, enables CORS.
- `app.module.ts` – imports core, feature modules, and ORPC module.
- `modules/orpc` – ORPC Nest setup with error logging.
- `modules/feature-flag` – use case + in-memory provider; token exposed globally via `CoreModule`.
- `modules/user` – demonstrates contract binding for `auth.me`.
- `modules/subscription` – Prisma-backed repository via `@app/prisma`, domain entity + mapper.
- `shared/application/ports` – cross-cutting backend ports (e.g., `FeatureToggleProvider`).

## Scripts

- `pnpm run dev` – `nest start --watch`
- `pnpm run build` – `tsc -p tsconfig.app.json`
- `pnpm run check` – typecheck, no emit
- `pnpm run lint` / `fix` – ESLint
- `pnpm run clean` – remove `dist`

## Dependencies & Ordering

- Depends on `@app/shared`, `@app/contracts`, `@app/prisma`.
- Requires Prisma client generated before dev/build (`pnpm --filter @app/prisma run generate`).
- Contracts must be built to align types with handlers.

## Extending

- New routes: add to `@app/contracts`, then implement in a feature module via `@orpc/nest`
  `@Implement(contract.foo.bar)`.
- Ports/adapters: define ports under the feature’s `application/ports` (or shared if cross-cutting), implement in
  `infrastructure`, and bind in the module provider list.
- Persistence: extend Prisma schema, regenerate client, and map to domain entities in repositories.
