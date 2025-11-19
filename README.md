# Speechscribe Starter

Nuxt + Nest starter that demonstrates typed front/back communication through a shared oRPC contract and a modular
clean-architecture backend.

## Apps

- `apps/starter-frontend` – Nuxt 4 SPA that imports the shared oRPC client via `useContractsClient`, reads
  `runtimeConfig.public.apiUrl`, and shows how to call `client.auth.me()` with full type-safety plus `ORPCError`
  handling.
- `apps/starter-backend` – Nest 11 API that mounts feature modules and binds controllers to the shared contract using
  `@orpc/nest` with Zod validation on every handler.

## Packages

- `packages/shared` – pure domain types (e.g., `User`) reused anywhere without infrastructure dependencies.
- `packages/contracts` – the cross-cutting contract/port bundle. Defines the oRPC router with Zod schemas, exports the
  generated client creator, and hosts ports that must be shared across feature modules (e.g., `FeatureToggleProvider`).

## Architecture Highlights

- Layering: domain types stay in `shared`, application logic lives under `application/` folders, controllers are the
  interface layer, and infrastructure adapters sit under `infrastructure/`.
- Ports exposed outside a module (like `FeatureToggleProvider`) live in `packages/contracts` so both Feature Flag and
  User modules inject the exact same abstraction; module-local ports (e.g., `ProfilePictureService`) live inside their
  feature’s `application/ports`.
- Controllers never new-up adapters; they inject use cases and delegate to `implement(contract.foo)` handlers, keeping
  HTTP transport concerns out of the application layer.
- Infrastructure classes (random avatar service, in-memory feature flags) implement the ports and are wired via Nest DI,
  showing how adapters can be swapped without touching use cases.

## Example Flow

1. Frontend composable builds the oRPC client with the shared contract and cookies enabled.
2. `client.auth.me()` hits the Nest controller bound to `contract.auth.me`.
3. Controller calls `GetUserUseCase`, which orchestrates domain data and the injected ports (`ProfilePictureService`,
   `FeatureToggleProvider`).
4. Infrastructure adapters fulfill those ports (generate avatar URLs, toggle flags) and return values to the use case,
   which returns a shared `User` type that matches the Zod schema.

## Notes

- Every example is there to illustrate the architecture: feature flags prove cross-module ports, random avatars show
  module-scoped ports, and the Nuxt page demonstrates end-to-end typed comms.
