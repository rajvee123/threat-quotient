# Threat Quotient

Threat Quotient turns simulated enterprise security telemetry into modeled financial exposure, risk drivers, mitigation scenarios, optimized investment decisions, and grounded executive explanations.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/threat-quotient/src/App.tsx` — responsive executive cockpit and decision workflows.
- `artifacts/threat-quotient/src/index.css` — Threat Quotient visual tokens and interaction styling.
- `artifacts/api-server/src/services/threat-quotient.ts` — deterministic synthetic telemetry, risk model, scenario, optimization, and Copilot logic.
- `artifacts/api-server/src/routes/threat-quotient.ts` — Threat Quotient API routes.
- `lib/api-spec/openapi.yaml` — source of truth for generated API hooks and schemas.

## Architecture decisions

- The demo uses a deterministic in-memory synthetic enterprise model so the live event loop works without requiring enterprise connectors or database seeding.
- API boundaries are connector-ready: simulated ingestion enters through the same routes that future SIEM, EDR, IAM, CSPM, and vulnerability adapters can call.
- Financial outputs are explicitly labeled modeled estimates and use Indian rupee formatting for executive review.
- Copilot answers are grounded in server-side tool-like functions and never invents numeric results.

## Product

- Executive overview for NovaBank Financial Services with EAL, VaR, CVaR, risk score, control posture, drivers, incidents, and threat pulse.
- Live critical-vulnerability ingestion that recalculates EAL, updates the leading driver, and refreshes the dashboard.
- Asset and vulnerability drill-down, what-if scenarios, budget optimization, compliance posture, simulated data sources, and CyberRisk Copilot.

## User preferences

- Product name is Threat Quotient.

## Gotchas

- Restart the API workflow after backend changes so the in-memory demo state resets to the baseline.
- After changing `lib/api-spec/openapi.yaml`, run `pnpm --filter @workspace/api-spec run codegen`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
