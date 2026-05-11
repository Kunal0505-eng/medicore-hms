# Project Guidance

## User Preferences

- All 14 HMS modules implemented with full CRUD on core workflows
- Patient registration and appointment booking are primary, equally polished workflows
- DICOM viewer and drug interaction engine are UI stubs only
- Pre-loaded sample data: 10 patients, 5 doctors, 3 wards, 20 drugs, 10 lab tests, 5 service types
- Real-time ER bed map and queue via 5-second polling
- Demo login credentials for all 7 roles
- No external email backend — in-app notifications and toasts only
- Clean medical aesthetic: deep navy/white/teal accents, dark mode, responsive design
- Data tables require sort, filter, and pagination on all list views

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- `@tanstack/react-table` is NOT preinstalled; must `pnpm add @tanstack/react-table`
- TanStack Router does not export `NavLink`; use `Link` with manual `useRouterState().location.href` for active state
- Route type narrowing: use `to: path as "/"` to bypass TanStack Router's strict route type checking when routes are dynamically registered
- `_props` prefix on unused function params passes Biome lint; `_variableName` suppresses noUnusedVariables
- Array index keys in skeleton/loading states still trigger Biome noArrayIndexKey; use string prefix like `skeleton-${i}` to satisfy the linter
- Modal overlay div needs both `onClick` and `onKeyDown` for Biome useKeyWithClickEvents
- Biome useSemanticElements warns about `role="dialog"` on div; keep as div with role until full dialog migration needed

## Verified Commands

**Frontend** (run from `src/frontend/`):

- **install**: `pnpm install --prefer-offline`
- **typecheck**: `pnpm typecheck`
- **lint fix**: `pnpm fix`
- **build**: `pnpm build`

**Backend** (run from `src/backend/`):

- **install**: `mops install`
- **typecheck**: `mops check --fix`
- **build**: `mops build`

**Backend and frontend integration** (run from root):

- **generate bindings**: `pnpm bindgen` This step is necessary to ensure the frontend can call the backend methods.

## Learnings

[No learnings yet]
