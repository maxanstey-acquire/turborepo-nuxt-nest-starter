# @app/frontend

Nuxt 4 SPA that consumes the shared oRPC contract to call the Nest backend with typed requests/responses.

## Quick Start

```bash
pnpm install
pnpm --filter @app/prisma run generate   # ensures backend can start
pnpm run dev                             # from repo root; runs generate then turbo dev
```

## Key Pieces

- `src/composables/useContractsClient.ts` – builds oRPC client via `makeClient` with base URL + cookies.
- `src/pages/index.vue` – sample call to `client.auth.me()` with error handling and Nuxt UI components.

## Scripts

- `pnpm run dev` – `nuxt dev`
- `pnpm run build` – `nuxt generate`
- `pnpm run check` – `nuxt typecheck` (plus `check-tsc` for Vue TSC)
- `pnpm run lint` / `fix` – ESLint
- `pnpm run clean` – remove `.nuxt .output dist`

## Adding Features

- New API calls: extend `@app/contracts` with a route/schema, rebuild it, then call via `useContractsClient`.
- Generated types/DTOs are available via `@app/shared`.
- Generated types/models are available via `@app/prisma`.
