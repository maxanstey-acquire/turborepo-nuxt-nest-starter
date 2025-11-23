# Nest + Nuxt + Packages Starter

Typed oRPC contract shared between a Nuxt 4 frontend and Nest 11 backend, laid out with clean-architecture boundaries.
This README is a quick-start and map; deeper docs will live alongside each app/package.

## Quick Start

1. Install deps: `pnpm install`
2. Generate Prisma client: `npm run generate`
3. Run the Prisma migrations: `npm run db:migrate`
4. Build packages for Nest/Nuxt: `npm run build`
5. Develop: `npm run dev`

## Workspace Map

- `apps/ui` – Nuxt SPA using `@app/contracts` client to call the backend with typed responses.
- `apps/api` – Nest API binding controllers to the shared contract with `@orpc/nest` and Zod validation.
- `packages/shared` – pure domain/value types reused everywhere.
- `packages/contracts` – ORPC contract + Zod schemas + generated client factory; depends on `shared`.
- `packages/prisma` – Prisma client generation plus Nest DI module/token; generates client and builds `dist/index.js`.

## Build/Dependency Graph

- `@app/shared` → `@app/contracts` → `@app/frontend` and `@app/backend`
- `@app/prisma` → `@app/backend` (must run `pnpm --filter @app/prisma run generate` before building)

Manual build order (if not using turbo orchestration):
1. `pnpm --filter @app/prisma run generate`
2. `pnpm --filter @app/prisma run build`
3. `pnpm --filter @app/shared run build`
4. `pnpm --filter @app/contracts run build`
5. `pnpm --filter @app/backend run build` and `pnpm --filter @app/frontend run build`

## Common Scripts (root)

- `pnpm run dev` – prisma generate, then turbo dev for apps.
- `pnpm run build` – prisma generate, then turbo build across the graph.
- `pnpm run check` – lint + typecheck.
- `pnpm run generate` – prisma generate only.
- `pnpm run nuke` – wipe node_modules, turbo cache, pnpm store, and build artifacts.

## Architecture Snapshot

- Layering: domain types in `shared`, application/use cases in `application/`, controllers as interface layer,
  infrastructure adapters in `infrastructure/`.
- Cross-cutting backend ports live in `apps/api/src/shared/application/ports`; module-local ports stay within their
  feature module.
- Abstract classes are instead of symbols for DI tokens.

## Example Flow

1. Frontend composable builds the oRPC client with the shared contract and cookies enabled.
2. `client.auth.me()` hits the Nest controller bound to `contract.auth.me`.
3. Controller calls a use case that orchestrates domain data and injected ports.
4. Infrastructure adapters fulfill ports and return values typed by shared models/Zod schemas.
