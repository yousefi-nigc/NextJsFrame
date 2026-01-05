# GasTop

Fire-risk/evacuation assessment app built on Next.js (App Router) with Prisma/PostgreSQL and Better Auth (Admin plugin) for user management.

## Features
- Auth with Better Auth (email/password), roles, and admin plugin.
- Admin panel (`/admin`): list users with search/pagination, lock/unlock (ban/unban), delete with cascade; admins are hidden and protected from actions.
- Domain: Projects/Floors/Assessments with acceptable/protection factors (W/N/S/F/U/Y, etc.).
- Dark/light UI, TypeScript everywhere.

## Tech Stack
- Next.js (App Router), React, TypeScript
- Prisma + PostgreSQL
- Better Auth + Admin plugin
- Styling: Tailwind/CSS utilities

## Project Structure (high level)
```
src/
├─ app/
│  ├─ admin/                     # Admin dashboard
│  ├─ api/
│  │  └─ admin/users[...]        # Admin user APIs
│  └─ (other routes)
├─ components/
│  ├─ admin/                     # Admin UI (UserList, AddUserForm)
│  └─ protection-level/...       # Risk/protection components
├─ lib/
│  ├─ auth.ts / auth-server.ts   # Better Auth config & session helper
│  ├─ admin.ts                   # isAdmin, createUser helper
│  ├─ db.ts                      # Prisma client
│  └─ assessment/...             # Assessment services/utils
├─ prisma/
│  └─ schema.prisma              # DB schema
└─ public/                       # Static assets
```

## Environment Variables
Create `.env`:
```
DATABASE_URL=postgresql://user:pass@host:5432/db
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000
```

## Setup
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
# open http://localhost:3000
```

## Admin Panel & APIs
- UI: `src/app/admin/page.tsx` renders `UserList` + `AddUserForm`.
- List users: `GET /api/admin/users` → proxies `auth.api.listUsers` with search/limit/offset/sort; filters out role=admin.
- Lock/Unlock: `POST/DELETE /api/admin/users/[id]/lock` → `auth.api.banUser` / `auth.api.unbanUser`; blocks acting on admins/self.
- Delete: `DELETE /api/admin/users/[id]` → `auth.api.removeUser` (cookies forwarded) and cascades domain data; blocks admins/self.
- Auth guard: all admin APIs require session + `isAdmin(session.user.id)`.

## Scripts
- `npm run dev` – dev server
- `npm run build` – production build
- `npm run start` – start production
- `npm run lint` – ESLint

## Notes
- Admin users are hidden from the list and cannot be banned/deleted.
- Better Auth calls require session cookies; server routes forward cookies to `auth.api.*`.
- Cascade delete relies on Prisma relations (Projects/Floors/Assessments).

## Reference
- Better Auth Admin plugin: https://www.better-auth.com/docs/plugins/admin
