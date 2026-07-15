# JWT Authentication Assignment

A minimal JWT-based authentication system built using **Node.js**, **TypeScript**, and **Express** to demonstrate authentication fundamentals, secure password handling, token-based authentication, and clean backend architecture.


---

## Features

- User Registration
- User Login
- JWT Access Token Authentication
- JWT Refresh Token Flow
- Protected Profile Route
- Secure Password Hashing using bcrypt
- Refresh Token Rotation
- Logout Support
- Login Rate Limiting
- Environment Variable Configuration
- Clean Folder Structure

---

## Tech Stack

- Node.js
- TypeScript
- Express.js
- JSON Web Token (JWT)
- bcrypt
- dotenv
- express-rate-limit
- uuid

---

## Project Structure

```
src
│
├── config
│   └── env.ts
│
├── controllers
│   └── auth.controller.ts
│
├── middleware
│   ├── auth.middleware.ts
│   └── rateLimit.middleware.ts
│
├── models
│   └── user.model.ts
│
├── routes
│   ├── auth.routes.ts
│   └── profile.routes.ts
│
├── services
│   └── auth.service.ts
│
├── types
│   ├── auth.types.ts
│   └── express.d.ts
│
├── utils
│   ├── hash.ts
│   ├── jwt.ts
│   └── response.ts
│
├── app.ts
└── server.ts
```

---

# Setup

## Clone Repository

```bash
git clone https://github.com/naajissiddiqui/jwt-auth.git
cd jwt-auth
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file.

```env
PORT=5000

ACCESS_TOKEN_SECRET=your_access_token_secret

REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

---

## Run Development Server

```bash
npm run dev
```

Server starts at

```
http://localhost:5000
```

---

## Build Project

```bash
npm run build
```

---

## Start Production Build

```bash
npm start
```

---

# API Usage

---

## Register User

### POST

```
/auth/register
```

Request

```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login

### POST

```
/auth/login
```

Request

```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

## Get Profile

### GET

```
/profile
```

Headers

```
Authorization: Bearer <access_token>
```

Response

```json
{
  "success": true,
  "data": {
    "id": "...",
    "email": "user@example.com",
    "role": "user"
  }
}
```

---

## Refresh Token

### POST

```
/auth/refresh
```

Request

```json
{
  "refreshToken": "<refresh_token>"
}
```

Response

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

## Logout

### POST

```
/auth/logout
```

Headers

```
Authorization: Bearer <access_token>
```

Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

# Authentication Flow

```
Register
    │
    ▼
Login
    │
    ├──────────────┐
    │              │
Access Token   Refresh Token
15 Minutes       7 Days
    │              │
    ▼              │
Protected APIs     │
                   ▼
          /auth/refresh
                   │
                   ▼
      New Access Token
      New Refresh Token
```

---

# Design Decisions

### Why JWT?

JWT enables stateless authentication where the server does not need to maintain session data. The access token is used for authorizing protected requests, while the refresh token is used to obtain new access tokens after expiry.

---

### Why Express.js?
Express.js offers a clean and lightweight framework with excellent middleware support, making it well-suited for implementing authentication APIs.

---

### Why Access & Refresh Tokens?

A short-lived access token reduces the impact of token compromise. A long-lived refresh token improves user experience by allowing new access tokens to be issued without requiring users to log in again.

---

### Why bcrypt?

Passwords are never stored in plain text. bcrypt securely hashes passwords using salting, making them resistant to rainbow table and brute-force attacks.

---

### Why In-Memory Storage?

For this, in-memory storage was chosen to keep the implementation lightweight and focused on authentication logic rather than database integration. In a production environment, user records and refresh tokens would be persisted in a database.

---

### Why Refresh Token Rotation?

Whenever a refresh token is used, a new refresh token is generated and the previous one is invalidated. This limits the impact of a stolen refresh token and follows modern authentication practices.

---

### Why Rate Limiting?

Login rate limiting helps mitigate brute-force attacks by restricting repeated authentication attempts from the same client within a defined time window.

---

# Security Considerations

- Passwords are hashed using bcrypt.
- JWT secrets are stored in environment variables.
- Sensitive information such as passwords is never included in JWT payloads.
- Protected routes require a valid access token.
- Refresh tokens are rotated after every successful refresh.
- Refresh tokens are invalidated on logout.
- Login endpoint is protected using rate limiting.

---


# Author

**Naajis Siddiqui**
