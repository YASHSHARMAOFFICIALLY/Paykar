# Paykar Frontend Technical Flow

This folder is the user-facing Next.js app for Paykar. It renders the landing page, auth pages, wallet dashboard, user search, balance display, and money transfer UI.

The frontend does not talk directly to the backend from components. Components call local frontend API routes under `frontend/app/api/**`, and those routes proxy the request to the backend app.

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion on the landing page
- Browser `localStorage` for storing the JWT token
- Frontend API proxy routes for backend communication

## How To Start Understanding This Frontend

Read the files in this order:

1. `app/page.tsx`
2. `components/LandingPage.tsx`
3. `app/signin/page.tsx` and `app/signup/page.tsx`
4. `components/AuthScreen.tsx`
5. `components/AuthForm.tsx`
6. `lib/auth-validation.ts`
7. `app/wallet/page.tsx`
8. `components/DashboardScreen.tsx`
9. `components/BalanceCard.tsx`
10. `components/TransferBox.tsx`
11. `components/UserSearch.tsx`
12. `components/TransactionList.tsx`
13. `lib/backend.ts`
14. `app/api/**/route.ts`

That order follows the real user journey: landing page, auth pages, wallet page, component state, then proxy API routes.

## High-Level Architecture

```txt
Browser UI component
  -> fetch("/api/...")
  -> frontend API route
  -> proxyToBackend()
  -> backend API app
  -> PostgreSQL through Prisma
```

Why this matters:

- React components stay pointed at same-origin URLs like `/api/auth/signin`.
- `frontend/lib/backend.ts` decides where the backend server lives.
- Authorization headers are forwarded by proxy routes when needed.

## Routes And Pages

### `/`

File: `app/page.tsx`

Renders:

```txt
components/LandingPage.tsx
```

The landing page is mostly UI and animation. It uses Framer Motion for reveal and background movement, and links users to `/signin`.

### `/signin`

File: `app/signin/page.tsx`

Renders:

```txt
<AuthScreen mode="signin" />
```

### `/signup`

File: `app/signup/page.tsx`

Renders:

```txt
<AuthScreen mode="signup" />
```

### `/wallet`

File: `app/wallet/page.tsx`

Renders:

```txt
components/DashboardScreen.tsx
```

This is the main logged-in wallet experience.

## Auth Flow

Main files:

- `components/AuthScreen.tsx`
- `components/AuthForm.tsx`
- `lib/auth-validation.ts`
- `app/api/auth/signin/route.ts`
- `app/api/auth/signup/route.ts`

### Screen Composition

`AuthScreen.tsx` builds the auth page layout:

```txt
AuthScreen
  -> AuthShowcase
  -> AuthForm
```

`mode` decides whether the form behaves as signin or signup.

### Form State

`AuthForm.tsx` owns:

- input values
- submitted state
- loading state
- success message
- request error

It validates using:

```txt
validateAuthValues(mode, values)
```

from `lib/auth-validation.ts`.

### Signin Submit Flow

```txt
User submits signin form
  -> AuthForm validates username and password
  -> fetch("/api/auth/signin")
  -> frontend app/api/auth/signin/route.ts
  -> proxyToBackend("/api/auth/signin")
  -> backend validates credentials
  -> backend returns JWT token
  -> AuthForm stores token in localStorage as "paykar_token"
  -> router.push("/wallet")
```

### Signup Submit Flow

```txt
User submits signup form
  -> AuthForm validates firstname, lastname, email, username, password
  -> fetch("/api/auth/signup")
  -> frontend app/api/auth/signup/route.ts
  -> proxyToBackend("/api/auth/signup")
  -> backend creates user and account
  -> AuthForm redirects to /signin
```

## Wallet Flow

Main file:

```txt
components/DashboardScreen.tsx
```

This component owns most wallet state:

- JWT token
- balance
- balance loading/error
- search query
- search results
- selected receiver
- amount
- transfer loading/message/error

### Token Loading

On mount:

```txt
read localStorage["paykar_token"]
  -> set token state
```

When token changes:

```txt
loadBalance(token)
```

### Balance Flow

UI component:

```txt
components/BalanceCard.tsx
```

Request flow:

```txt
DashboardScreen.loadBalance()
  -> fetch("/api/account/balance", Authorization: Bearer token)
  -> frontend app/api/account/balance/route.ts
  -> proxyToBackend("/api/account/balance")
  -> backend verifies JWT
  -> backend returns balance
  -> DashboardScreen updates balance state
```

### User Search Flow

UI components:

```txt
DashboardScreen
  -> TransferBox
  -> UserSearch
```

Search behavior:

```txt
User types receiver query
  -> DashboardScreen waits 300ms debounce
  -> fetch("/api/user/search?query=...")
  -> frontend app/api/user/search/route.ts
  -> backend /api/user/search
  -> backend returns matching users
  -> UserSearch renders results
  -> user selects one result
  -> selectedUser state is updated
```

The frontend uses `AbortController` so old search requests are cancelled when the query changes quickly.

### Transfer Flow

UI component:

```txt
components/TransferBox.tsx
```

Submit flow:

```txt
User selects receiver and amount
  -> DashboardScreen.handleTransfer()
  -> check token exists
  -> check receiver exists
  -> check amount is valid
  -> fetch("/api/account/transfer", Authorization: Bearer token)
  -> frontend app/api/account/transfer/route.ts
  -> proxyToBackend("/api/account/transfer")
  -> backend performs transaction
  -> frontend shows success/error
  -> frontend reloads balance on success
```

## Frontend API Proxy

### `lib/backend.ts`

This file controls backend communication.

Default backend URL:

```txt
http://localhost:3001
```

Override with:

```env
NEXT_PUBLIC_PAYKAR_BACKEND_URL="http://localhost:3001"
```

or:

```env
PAYKAR_BACKEND_URL="http://localhost:3001"
```

`proxyToBackend(path, init)`:

- calls the backend URL
- sends JSON headers
- disables fetch cache with `cache: "no-store"`
- returns the backend response body/status to the browser

### Proxy Route Files

`app/api/auth/signin/route.ts`

```txt
read request body
  -> proxy POST /api/auth/signin
```

`app/api/auth/signup/route.ts`

```txt
read request body
  -> proxy POST /api/auth/signup
```

`app/api/account/balance/route.ts`

```txt
forward Authorization header
  -> proxy GET /api/account/balance
```

`app/api/account/transfer/route.ts`

```txt
read request body
forward Authorization header
  -> proxy POST /api/account/transfer
```

`app/api/user/search/route.ts`

```txt
read query parameter
  -> fetch backend /api/user/search?query=...
  -> return backend response
```

## Component Responsibilities

### `components/LandingPage.tsx`

Marketing/intro page. Uses Framer Motion, static feature data, and links to auth.

### `components/AuthScreen.tsx`

Page shell for auth pages. Places the visual showcase and the auth form side by side.

### `components/AuthShowcase.tsx`

Static visual support for signin/signup pages.

### `components/AuthForm.tsx`

Handles signin/signup input, validation, submit requests, token storage, and redirects.

### `components/DashboardScreen.tsx`

Main wallet controller component. It owns wallet state and passes data/callbacks down to child components.

### `components/BalanceCard.tsx`

Displays balance, loading state, error state, and refresh button.

### `components/TransferBox.tsx`

Displays receiver search area, selected receiver, amount input, send button, and transfer result messages.

### `components/UserSearch.tsx`

Renders search input and user result buttons.

### `components/TransactionList.tsx`

Renders static recent activity data currently defined inside `DashboardScreen.tsx`. It is not yet connected to backend transaction history.

### `components/AuthPanel.tsx`

Additional auth-related UI component. It is present in the codebase but is not part of the current signin/signup page route flow.

## Environment Variables

Create `frontend/.env.local` if the backend is not running on the default URL:

```env
NEXT_PUBLIC_PAYKAR_BACKEND_URL="http://localhost:3001"
```

## Running Frontend

From `frontend/`:

```bash
npm install
npm run dev
```

By default it runs on:

```txt
http://localhost:3000
```

Run backend separately, commonly on:

```txt
http://localhost:3001
```

## Full Local Startup

Terminal 1:

```bash
cd backend
npm run dev -- -p 3001
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Then open:

```txt
http://localhost:3000
```

## Main End-To-End Flow

```txt
/signup
  -> AuthForm signup
  -> frontend proxy
  -> backend creates user/account

/signin
  -> AuthForm signin
  -> frontend proxy
  -> backend returns JWT
  -> token saved in localStorage

/wallet
  -> DashboardScreen reads token
  -> loads balance
  -> user searches receiver
  -> user selects receiver
  -> user sends amount
  -> backend transfers balance
  -> DashboardScreen refreshes balance
```

## What To Change For Common Features

- Change landing content: edit `components/LandingPage.tsx`.
- Change auth validation messages: edit `lib/auth-validation.ts`.
- Change signin/signup UI: edit `components/AuthForm.tsx`.
- Change wallet behavior: edit `components/DashboardScreen.tsx`.
- Change balance display: edit `components/BalanceCard.tsx`.
- Change search UI: edit `components/UserSearch.tsx`.
- Change transfer UI: edit `components/TransferBox.tsx`.
- Change backend URL/proxy behavior: edit `lib/backend.ts` and `app/api/**/route.ts`.
- Connect real transaction history: add a backend endpoint, then replace static `activity` in `DashboardScreen.tsx`.
