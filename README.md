# Paykar

Paykar is a hand-built full-stack wallet project with a Next.js frontend and a Next.js API backend. The backend already includes authentication, account creation, balance lookup, and user search. The frontend is set up as a separate Next.js app and is ready to be connected to the backend flows.

The project is intentionally split into `frontend` and `backend` folders so the UI and API can evolve independently while still living in one repository.

## Current Status

| Area | Status |
| --- | --- |
| Frontend | Next.js app scaffold is ready |
| Backend | Auth, account balance, and user search APIs are implemented |
| Database | PostgreSQL schema and Prisma migration are present |
| Payments | Transfer route exists but still needs full implementation |

## Features

### Backend

- User signup with unique email and username checks
- Password hashing with `bcrypt`
- JWT-based signin with 7-day token expiry
- Account creation during signup with a Prisma transaction
- Authenticated balance lookup using `Authorization: Bearer <token>`
- User search by username or first name
- Request validation with Zod
- PostgreSQL data model managed through Prisma
- Service-layer structure for cleaner route handlers

### Frontend

- Next.js App Router project structure
- React 19 setup
- Tailwind CSS setup
- TypeScript and ESLint configuration
- Ready for auth screens, dashboard, wallet balance, search, and transfer UI

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | JWT |
| Password Security | bcrypt |
| Validation | Zod |
| Tooling | npm, ESLint |

## Repository Structure

```text
paykar/
+-- frontend/
|   +-- app/
|   +-- public/
|   +-- package.json
|   +-- tsconfig.json
+-- backend/
|   +-- app/
|   |   +-- api/
|   |   |   +-- account/
|   |   |   +-- auth/
|   |   |   +-- user/
|   +-- lib/
|   +-- prisma/
|   +-- service/
|   +-- utils/
|   +-- package.json
|   +-- tsconfig.json
```

## Backend Architecture

The backend follows a simple production-style structure:

- `app/api`: HTTP route handlers
- `service`: business logic
- `lib`: shared helpers for Prisma, JWT, and auth
- `utils`: validation schemas
- `prisma`: database schema and migrations

This keeps route files small and makes the backend easier to test and extend.

## Database Model

### User

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` | UUID primary key |
| `firstname` | `String` | User first name |
| `lastname` | `String` | User last name |
| `email` | `String` | Unique email address |
| `username` | `String` | Unique username |
| `password` | `String` | Hashed password |
| `createdat` | `DateTime` | Created timestamp |

### Account

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `String` | UUID primary key |
| `userId` | `String` | Unique user reference |
| `balance` | `Int` | Wallet balance |

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL database

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="replace-with-a-long-random-secret"
```

Run migrations and start the backend:

```bash
npx prisma migrate dev
npm run dev
```

The backend runs at:

```text
http://localhost:3000
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

If the backend is already running on port `3000`, start the frontend on another port:

```bash
npm run dev -- -p 3001
```

The frontend can run at:

```text
http://localhost:3001
```

## API Reference

### Signup

```http
POST /api/auth/signup
Content-Type: application/json
```

Request:

```json
{
  "firstname": "Yash",
  "lastname": "Sharma",
  "email": "yash@example.com",
  "username": "yashpay",
  "password": "Password123"
}
```

Response:

```json
{
  "message": "User created successfully",
  "userId": "user_uuid"
}
```

### Signin

```http
POST /api/auth/signin
Content-Type: application/json
```

Request:

```json
{
  "username": "yashpay",
  "password": "Password123"
}
```

Response:

```json
{
  "message": "Signin successful",
  "token": "jwt_token"
}
```

### Get Balance

```http
GET /api/account/balance
Authorization: Bearer <token>
```

Response:

```json
{
  "balance": 7500
}
```

### Search Users

```http
GET /api/user/search?query=yash
```

Response:

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

## Validation Rules

Signup requires:

- `username`: minimum 4 characters
- `firstname`: minimum 2 characters
- `lastname`: minimum 2 characters
- `email`: valid email format
- `password`: minimum 8 characters with uppercase, lowercase, and number

Signin requires:

- `username`: minimum 4 characters
- `password`: minimum 8 characters with uppercase, lowercase, and number

## Security Notes

- Passwords are hashed before storage.
- JWT payload stores only the user id.
- Protected routes use the `Authorization` header.
- User and account creation happen inside one transaction.
- Account records are linked to users with cascade delete.

## Professional Features To Add

### Backend Improvements

1. Complete `POST /api/account/transfer`

   Add sender auth, receiver validation, amount validation, insufficient-balance checks, no self-transfer rule, and an atomic Prisma transaction.

2. Add a transaction ledger

   Store every debit and credit in a `transaction` table with `fromUserId`, `toUserId`, `amount`, `status`, `type`, `referenceId`, and `createdAt`.

3. Add transaction history

   Create `GET /api/account/transactions` with pagination, filters, and transaction status.

4. Store money in smallest currency units

   Rename or migrate `balance` to something like `balanceInPaise` so the money model is precise and professional.

5. Add idempotency keys

   Support an `Idempotency-Key` header for transfer requests so retries do not create duplicate payments.

6. Add rate limiting

   Protect signin, signup, user search, and transfer endpoints from brute force and abuse.

7. Improve auth

   Add short-lived access tokens, refresh tokens, token rotation, and logout support.

8. Standardize API errors

   Return consistent error payloads with `success`, `message`, and `code`.

9. Add tests

   Cover signup, signin, duplicate users, protected balance access, search, and transfer rollback.

10. Add deployment readiness

    Add `.env.example`, health check endpoint, request logging, CORS config, Dockerfile, and CI for lint, typecheck, and build.

### Frontend Improvements

1. Build auth pages

   Add signup and signin screens connected to the backend APIs.

2. Add protected dashboard

   Show user balance, account details, and quick payment actions after login.

3. Build user search UI

   Add a search input that calls `/api/user/search` and displays possible receivers.

4. Build transfer UI

   Add receiver selection, amount input, confirmation step, and success/failure states.

5. Add transaction history screen

   Show incoming and outgoing payments once the backend ledger is added.

6. Add session handling

   Store tokens safely, handle expired sessions, and redirect unauthenticated users.

7. Add polished loading and empty states

   Use skeletons, inline errors, and helpful empty states for a more finished product.

8. Add responsive design

   Make the wallet experience work cleanly on mobile and desktop.

## Suggested Roadmap

1. Finish the backend transfer API.
2. Add transaction ledger and history APIs.
3. Build frontend signup and signin pages.
4. Connect frontend auth to backend JWT flow.
5. Build dashboard, user search, and transfer screens.
6. Add tests for backend business logic.
7. Add `.env.example`, health check, Docker, and CI.

## Why This Project Stands Out

Paykar is built by hand with a clear full-stack structure. The backend already uses real production concepts like password hashing, JWT auth, validation, Prisma transactions, and relational database modeling. With transfer, ledger, tests, and a polished frontend, it can become a strong portfolio-level wallet application.
