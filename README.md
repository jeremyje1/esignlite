# eSignLite

Minimal e-signature MVP with Next.js App Router, Prisma (SQLite), pdf-lib, JWT, and SendGrid.

## Setup

1. npm i
2. cp .env.example .env.local (fill values)
3. npx prisma migrate dev -n init
4. npm run dev

## TODO
- Swap local FS to S3 for file storage in prod.
- Swap SQLite to Postgres.
