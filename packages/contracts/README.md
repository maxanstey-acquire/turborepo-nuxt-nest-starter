# @app/contracts

Shared oRPC contract for the stack. Defines routes + Zod schemas, exposes a typed client factory, and stays transport-
only (no infrastructure). Depends on `@app/shared` for domain types and schemas.

## Contents

- `src/contract.ts` – root oRPC router with `/api` prefix.
- `src/routes/*` – route groups.
- `src/schemas/*` – Zod schemas wrapping shared domain types.
- `src/client.ts` – `makeClient` factory.

## Scripts

- `pnpm run build` – `tsc` + `tsc-alias`, emits `dist/**` as per exports map.
- `pnpm run check` – typecheck, no emit.
- `pnpm run clean` – remove `dist`.

Build requires `@app/shared` to be built first when run manually.

## Using the contract

- **Backend (Nest)**: bind controllers/handlers with `contract` and `@orpc/nest`, returning data that matches the Zod
  output schemas (e.g., `userSchema`, `subscriptionSchema`). Route inputs/outputs are already typed.
- **Frontend (Nuxt/any)**: create a client with `makeClient({ baseUrl, headers?, credentials? })`, then consume your 
- calls e.g. `client.auth.me()`, `client.subscriptions.getById({ params: { id } })`.

## Extending

1. Add/adjust Zod schema under `src/schemas` (reuse/create shared types in packages/shared).
2. Add a route under `src/routes/<group>/` with `oc.route().input().output()`.
3. Export it from the group’s `index.ts`, then from `src/contract.ts`.
4. Rebuild: `pnpm --filter @app/shared run build && pnpm --filter @app/contracts run build`.

## Exports (package.json)

- `./contract`, `./client`, `./schemas/user`, `./responses/me`, etc. All point to `dist/**` after build.
