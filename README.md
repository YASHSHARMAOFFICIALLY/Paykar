# Paykar

<div align="center">

### 💸 A polished full-stack wallet experience built with Next.js, Prisma, PostgreSQL, and JWT authentication

Sign up, authenticate, search users, check balances, and send money through a clean split-architecture setup with a dedicated frontend and backend.

</div>

---

## ✨ Overview

Paykar is a two-app full-stack wallet project designed around a simple but realistic payments flow:

- `frontend/` delivers the landing page, auth experience, wallet dashboard, balance cards, and transfer UI.
- `backend/` exposes the API layer for authentication, account management, search, and money transfers.

The project is intentionally structured this way so the UI and API can evolve independently while staying in the same repository.

## 🚀 What’s Built

### Frontend

- Modern landing page with motion, theme toggle, and branded visual design
- Dedicated sign-in and sign-up flows
- Wallet dashboard with balance refresh
- Receiver search with live query support
- Quick transfer form with success and error feedback
- Local frontend API routes that proxy requests to the backend

### Backend

- User registration with validation and duplicate checks
- Password hashing with `bcrypt`
- JWT-based authentication with 7-day expiry
- Account creation inside a Prisma transaction during signup
- Authenticated balance lookup
- User search by username or first name
- Transactional money transfer with insufficient-balance protection
- Transaction logging for both successful and failed transfers

## 🧱 Architecture

```text
paykar/
├── frontend/                # Next.js UI app
│   ├── app/                 # App Router pages + proxy API routes
│   ├── components/          # Landing, auth, dashboard, wallet UI
│   ├── lib/                 # Backend URL + proxy helpers
│   └── public/              # Fonts and visual assets
├── backend/                 # Next.js API app
│   ├── app/api/             # Route handlers
│   ├── service/             # Business logic
│   ├── lib/                 # Prisma, JWT, auth helpers
│   ├── utils/               # Zod schemas
│   └── prisma/              # Schema and migrations
└── README.md
```

### Request Flow

1. The browser talks to the frontend app.
2. The frontend proxies API requests to the backend.
3. The backend validates input, authenticates users, and talks to PostgreSQL through Prisma.
4. JWT tokens are stored client-side and sent as `Authorization: Bearer <token>` for protected actions.

## 🛠 Tech Stack

| Layer | Stack |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| Backend | Next.js 16 Route Handlers, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | JWT |
| Security | bcrypt |
| Validation | Zod |
| Tooling | ESLint, npm |

## 🎯 Product Flow

Paykar currently supports this end-to-end journey:

1. A user signs up with first name, last name, email, username, and password.
2. The backend creates the user and automatically provisions an account with an initial balance.
3. The user signs in and receives a JWT token.
4. The wallet dashboard fetches the current balance using the token.
5. The user searches recipients by username or first name.
6. A transfer request moves funds atomically and records a transaction status.

## 🗃 Database Model

### `user`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` | UUID primary key |
| `firstname` | `String` | Required |
| `lastname` | `String` | Required |
| `email` | `String` | Unique |
| `username` | `String` | Unique |
| `password` | `String` | Hashed before storage |
| `createdat` | `DateTime` | Defaults to current timestamp |

### `account`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` | UUID primary key |
| `userId` | `String` | Unique relation to user |
| `balance` | `Int` | Current wallet balance |

### `Transactions`

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` | UUID primary key |
| `fromUserId` | `String` | Sender id |
| `toUserId` | `String` | Receiver id |
| `amount` | `Int` | Transfer amount |
| `status` | `String` | `SUCCESS` or `FAILED` |
| `createdAt` | `DateTime` | Defaults to current timestamp |

## ⚙️ Local Setup

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL

### 1. Install dependencies

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

### 2. Configure backend environment

Create `backend/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="replace-with-a-long-random-secret"
```

### 3. Configure frontend environment

The frontend proxies requests to the backend and defaults to `http://localhost:3001`.

Create `frontend/.env.local` if you want to be explicit:

```env
NEXT_PUBLIC_PAYKAR_BACKEND_URL="http://localhost:3001"
```

### 4. Run Prisma migrations

```bash
cd backend
npx prisma migrate dev
```

### 5. Start both apps

Run the backend on `3001`:

```bash
cd backend
npm run dev -- -p 3001
```

Run the frontend on `3000`:

```bash
cd frontend
npm run dev
```

Open:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

## 🔐 Validation Rules

### Signup

- `username` must be at least 4 characters
- `firstname` must be at least 2 characters
- `lastname` must be at least 2 characters
- `email` must be valid
- `password` must be at least 8 characters and include:
  - uppercase letter
  - lowercase letter
  - number

### Signin

- `username` must be at least 4 characters
- `password` must satisfy the same password rules

### Transfer

- `toUserId` is required
- `amount` must be a positive number

## 📡 API Surface

### `POST /api/auth/signup`

Creates a user and associated account.

Request body:

```json
{
  "firstname": "Yash",
  "lastname": "Sharma",
  "email": "yash@example.com",
  "username": "yashpay",
  "password": "Password123"
}
```

Success response:

```json
{
  "message": "User created successfully",
  "userId": "user_uuid"
}
```

### `POST /api/auth/signin`

Authenticates a user and returns a JWT.

Request body:

```json
{
  "username": "yashpay",
  "password": "Password123"
}
```

Success response:

```json
{
  "message": "Signin successful",
  "token": "jwt_token"
}
```

### `GET /api/account/balance`

Returns the signed-in user balance.

Headers:

```http
Authorization: Bearer <token>
```

Success response:

```json
{
  "balance": 7500
}
```

### `GET /api/user/search?query=<term>`

Searches users by `username` or `firstname`.

Success response:

```json
[
  {
    "id": "user_uuid",
    "username": "yashpay",
    "firstname": "Yash",
    "lastname": "Sharma"
  }
]
```

### `POST /api/account/transfer`

Transfers money from the authenticated sender to another user.

Headers:

```http
Authorization: Bearer <token>
Content-Type: application/json
```

Request body:

```json
{
  "toUserId": "receiver_uuid",
  "amount": 1200
}
```

Success response:

```json
{
  "message": "Transfer successful"
}
```

## 🎨 Frontend Notes

The frontend is not a placeholder anymore. It currently includes:

- a branded landing page
- custom font usage
- motion-based reveal interactions
- dark mode support
- auth screens
- wallet dashboard and transfer modules

This makes the repository suitable both as a learning project and as a solid base for extending into a richer wallet product.

## 📌 Current State

What is production-style already:

- split frontend/backend repo organization
- service-layer backend structure
- Prisma schema and migrations
- JWT auth flow
- transactional balance transfer logic
- polished UI direction and multi-screen frontend flow

What is still a natural next step:

- transaction history backed by the database instead of demo activity data
- refresh token or session expiration UX
- stronger API status handling for validation and auth failures
- automated tests
- deployment configuration

## 🧭 Suggested Next Improvements

- Add transaction history API and wire it to the wallet activity feed
- Introduce protected frontend routing for authenticated screens
- Add toast notifications and optimistic UI states
- Add integration tests for auth and transfer flows
- Harden env handling and startup checks
- Add Docker or compose-based local infrastructure

## 👤 Author

Built as a focused wallet-transfer full-stack project under the `Paykar` name.

---

<div align="center">

**Paykar**  
Build the payment flow. Keep the architecture clean.

</div>
