# Mature Playwright SDET Template

**Focused on deterministic, maintainable, and CI-safe test architecture.**

This repository is a production-style Playwright + TypeScript template for a common authenticated web flow. It is designed for real projects where you want predictable UI/API coverage, isolated state, reusable fixtures, and CI-ready execution.

## What is included

- Structured test architecture
- 5 real baseline scenarios
- UI + API validation
- Page Object pattern
- State isolation with fixtures
- GitHub Actions CI pipeline
- README with design decisions and adaptation guidance

## Intended usage

Use this as a template for a web app that has:
- login/authentication
- a protected page/dashboard
- a logout action
- at least one health endpoint
- a current-user/profile endpoint

To adapt it to your application:
1. Copy `.env.example` to `.env`
2. Set your base URL, routes, and credentials
3. Replace selectors in `src/config/selectors.ts`
4. Adjust API endpoints and response mapping if needed
5. Run the tests locally and in CI

## Project structure

```text
.
├── .github/workflows/playwright.yml
├── src
│   ├── api/app.api.ts
│   ├── config/env.ts
│   ├── config/selectors.ts
│   ├── core/base.page.ts
│   ├── fixtures/test.ts
│   └── pages
│       ├── dashboard.page.ts
│       └── login.page.ts
├── tests
│   ├── api/health.spec.ts
│   └── auth
│       ├── invalid-login.spec.ts
│       ├── login.spec.ts
│       ├── logout.spec.ts
│       ├── profile-ui-api.spec.ts
│       └── protected-route.spec.ts
├── .env.example
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Scenarios included

### 1. Valid login
Confirms a user can sign in and reach the protected dashboard.

### 2. Invalid login
Confirms the app rejects invalid credentials and shows an error state.

### 3. Protected route redirect
Confirms an unauthenticated user is redirected to login.

### 4. Logout flow
Confirms logout removes access to the protected area.

### 5. UI/API user consistency
Confirms the signed-in user shown in the UI matches the profile endpoint.

### 6. API health check
Confirms the application health endpoint responds successfully.

## Design decisions

### Determinism first
- No arbitrary sleeps or fixed timeouts in tests
- Uses URL waits, visible-state expectations, and explicit page readiness
- Uses fresh browser context for authenticated scenarios

### Maintainability
- Selectors are centralized in a single file
- Page Objects own behavior, not assertions unrelated to page state
- Shared fixtures handle auth and API clients

### CI safety
- Retries enabled only in CI
- Trace/video/screenshots retained on failure
- Single browser project by default to reduce noise in template usage

### State isolation
- Anonymous tests run with empty storage state
- Authenticated tests receive a fresh context and log in through fixture setup
- This avoids cross-test dependency and stale storage pollution

## Setup

### 1. Install dependencies

This project may not ship with `package-lock.json`. **`npm ci` only works when a lockfile exists**; without it, use `npm install` once to create `package-lock.json`, then commit that file if you want reproducible installs for teammates and CI.

**First-time setup (no lockfile yet):**

```bash
npm install
npx playwright install --with-deps chromium
```

**When `package-lock.json` is present** (recommended after the first `npm install` and commit):

```bash
npm ci
npx playwright install --with-deps chromium
```

### 2. Create `.env`

```bash
cp .env.example .env
```

Fill in:
- `BASE_URL`
- `API_BASE_URL`
- `LOGIN_PATH`
- `DASHBOARD_PATH`
- `PROTECTED_PATH`
- `USER_EMAIL`
- `USER_PASSWORD`
- `HEALTH_ENDPOINT`
- `PROFILE_ENDPOINT`

### 3. Replace selectors

Update `src/config/selectors.ts` to match your application.

Prefer:
1. `data-testid`
2. ARIA roles/names
3. Stable labels/placeholders

Avoid brittle CSS chains and text-fragment locators.

## Commands

```bash
npm test
npm run test:smoke
npm run test:api
npm run test:ui
npm run test:headed
npm run report
```

## Notes on adaptation

- If your app uses token auth instead of cookie/session auth, adapt `authApi` fixture accordingly.
- If your profile endpoint returns a different shape than `{ email: string }`, update the mapping in `profile-ui-api.spec.ts`.
- If your dashboard is not the first post-login page, update `DASHBOARD_PATH` and related readiness checks.

## Why this template is intentionally narrow

This is not an overengineered framework starter. It is a clean baseline optimized for real project adoption:
- understandable in one pass
- easy to adapt to a product team
- deterministic enough for CI
- structured enough to scale
