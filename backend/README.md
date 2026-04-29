# Paykar Backend Technical Flow

This folder is a Next.js API app. It acts as the real backend for Paykar: auth, wallet balance, user search, transfers, JWT verification, and database access.

## Tech Stack

- Next.js App Router API routes in `app/api/**/route.ts`
- TypeScript
- Prisma 7
- PostgreSQL
- `@prisma/adapter-pg` for Prisma/Postgres connection
- `bcrypt` for password hashing
- `jsonwebtoken` for JWT auth
- Zod for request validation

## How To Start Understanding This Backend

Read the files in this order:

1. `prisma/schema.prisma`
2. `lib/prisma.ts`
3. `utils/zodSchema.ts`
4. `service/auth.service.ts`
5. `service/account.service.ts`
6. `service/user.service.ts`
7. `lib/jwt.ts`
8. `lib/auth.ts`
9. `app/api/**/route.ts`

That order starts from the database shape, then connection setup, validation, business logic, auth helpers, and finally HTTP endpoints.

## Database Model

`prisma/schema.prisma` is the best first file because it explains what the app stores.

### `user`

Stores registered users.

Fields:

- `id`: UUID primary key
- `firstname`, `lastname`
- `email`: unique
- `username`: unique
- `password`: hashed password, not plain text
- `createdat`: account creation time
- `account`: optional one-to-one relation with `account`

### `account`

Stores wallet balance for a user.

Fields:

- `id`: UUID primary key
- `userId`: unique user id
- `balance`: integer wallet balance
- relation to `user`

Each user gets one account during signup.

### `Transactions`

Stores transfer attempts.

Fields:

- `id`: UUID primary key
- `fromUserId`
- `toUserId`
- `amount`
- `status`: `SUCCESS` or `FAILED`
- `createdAt`

## Core Backend Architecture

The backend has three layers:

1. API route receives HTTP request.
2. Route validates input and extracts auth info.
3. Service file runs business logic using Prisma.

Example:

```txt
POST /api/account/transfer
  -> app/api/account/transfer/route.ts
  -> getUserFromToken(req)
  -> TransferSchema.safeParse(body)
  -> transfer(fromUserId, toUserId, amount)
  -> Prisma transaction updates balances
```

## Important Files

### `lib/prisma.ts`

Creates and exports the Prisma client.

It uses:

- `process.env.DATABASE_URL`
- `PrismaPg` adapter
- a `globalThis` cache so development reloads do not create too many Prisma clients

Any file that needs database access imports this client.

### `utils/zodSchema.ts`

Defines request validation rules.

Schemas:

- `SignupSchema`: username, first name, last name, email, password rules
- `SigninSchema`: username and password rules
- `TransferSchema`: receiver id and positive amount

Routes call `safeParse()` before calling service functions.

### `lib/jwt.ts`

Handles JWT creation and verification.

- `signToken(userId)`: creates a 7-day token with `{ userId }`
- `verifyToken(token)`: verifies token and returns decoded user id

Requires `JWT_SECRET` in environment variables.

### `lib/auth.ts`

Extracts the current user from a request.

It expects:

```txt
Authorization: Bearer <token>
```

Then it calls `verifyToken()` and returns `decoded.userId`.

### `lib/error.ts`

Normalizes unknown errors into a string response.

It is used by route handlers so `catch` blocks can safely return JSON errors.

## Service Files

### `service/auth.service.ts`

Contains signup and signin business logic.

Signup flow:

```txt
receive firstname, lastname, email, username, password
  -> check duplicate email or username
  -> hash password with bcrypt
  -> start Prisma transaction
  -> create user
  -> create account with random starting balance
  -> return user id and success message
```

Signin flow:

```txt
receive username and password
  -> find user by username
  -> compare password with bcrypt
  -> sign JWT using user id
  -> return token
```

### `service/account.service.ts`

Contains wallet logic.

`getbalance(userId)`:

```txt
find account by userId
  -> return balance
```

`transfer(fromUserId, toUserId, amount)`:

```txt
reject self-transfer
reject amount <= 0
check receiver exists
start Prisma transaction
  -> decrement sender balance only if balance >= amount
  -> if decrement failed, create FAILED transaction and throw error
  -> increment receiver balance
  -> create SUCCESS transaction
return success message
```

The transfer uses a database transaction so the sender debit, receiver credit, and transaction record stay consistent.

### `service/user.service.ts`

Contains user search logic.

It searches users where username or first name contains the query, case-insensitive, and returns only public fields:

- `id`
- `username`
- `firstname`
- `lastname`

It limits results to 10 users.

## API Routes

### `POST /api/auth/signup`

File: `app/api/auth/signup/route.ts`

Request body:

```json
{
  "firstname": "Yash",
  "lastname": "Sharma",
  "email": "yash@example.com",
  "username": "yashpay",
  "password": "Password1"
}
```

Flow:

```txt
parse JSON
  -> validate with SignupSchema
  -> call signup()
  -> return 201
```

### `POST /api/auth/signin`

File: `app/api/auth/signin/route.ts`

Request body:

```json
{
  "username": "yashpay",
  "password": "Password1"
}
```

Flow:

```txt
parse JSON
  -> validate with SigninSchema
  -> call signin()
  -> return JWT token
```

### `GET /api/account/balance`

File: `app/api/account/balance/route.ts`

Requires:

```txt
Authorization: Bearer <token>
```

Flow:

```txt
extract user id from JWT
  -> call getbalance(userId)
  -> return balance
```

### `POST /api/account/transfer`

File: `app/api/account/transfer/route.ts`

Requires:

```txt
Authorization: Bearer <token>
```

Request body:

```json
{
  "toUserId": "receiver-user-id",
  "amount": 1200
}
```

Flow:

```txt
extract sender id from JWT
  -> validate body with TransferSchema
  -> call transfer(sender, receiver, amount)
  -> return success or error
```

### `GET /api/user/search?query=<text>`

File: `app/api/user/search/route.ts`

Flow:

```txt
read query param
  -> return [] if empty
  -> call searchUsers(query)
  -> return matching users
```

## Environment Variables

Create `backend/.env` with:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="replace-with-a-long-secret"
```

## Running Backend

From `backend/`:

```bash
npm install
npm run dev
```

Use a separate port from the frontend. The frontend expects backend at:

```txt
http://localhost:3001
```

So a common local setup is:

```bash
npm run dev -- -p 3001
```

## Prisma Commands

From `backend/`:

```bash
npx prisma generate
npx prisma migrate dev
```

The generated Prisma client is configured to output into:

```txt
app/generated/prisma
```

## Main End-To-End Flow

```txt
User signs up
  -> backend creates user
  -> backend creates account with starting balance

User signs in
  -> backend verifies password
  -> backend returns JWT

Frontend stores JWT
  -> sends JWT as Bearer token for wallet requests

User opens wallet
  -> frontend calls /api/account/balance
  -> backend verifies JWT
  -> backend returns account balance

User searches receiver
  -> frontend calls /api/user/search
  -> backend returns matching users

User sends money
  -> frontend calls /api/account/transfer with JWT
  -> backend verifies sender
  -> backend validates amount and receiver
  -> backend moves balance in a Prisma transaction
  -> backend records SUCCESS or FAILED transaction
```

## What To Change For Common Features

- Add a new database field: start in `prisma/schema.prisma`, then migrate.
- Add a new API endpoint: create a new `app/api/.../route.ts`.
- Add new business logic: put it in `service/`, then call it from a route.
- Add new validation: update `utils/zodSchema.ts`.
- Change auth token behavior: update `lib/jwt.ts` and `lib/auth.ts`.
- Change transfer rules: update `service/account.service.ts`.
