# @app/shared

Shared domain/value types consumed across the monorepo. Pure TypeScript, no runtime dependencies.

## Scripts

- `pnpm run build` – `tsc` + `tsc-alias`, emits `dist/types/**`.
- `pnpm run check` – typecheck, no emit.
- `pnpm run clean` – remove `dist`.

## Usage

- Import types directly via exports (after build): `import { User } from '@app/shared/types/user'`.
- packages/contracts wraps these with Zod schemas; backend/frontend consume both types and schemas.

## Extending

Add or change a type under `src/types/*`, then rebuild (`pnpm --filter @app/shared run build`) before consuming from
dependent packages (`@app/contracts`, apps).
