# GasTop

A modern Next.js application with Better Auth authentication, Prisma, and PostgreSQL.

## Features

- 🔐 **Authentication** - Secure authentication with Better Auth
- 👤 **Role Management** - Admin and User role-based access control
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS and dark mode
- 📦 **TypeScript** - Full type safety throughout the application
- 🗄️ **PostgreSQL** - Robust database with Prisma ORM

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Authentication:** Better Auth
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **UI Utilities:** clsx, tailwind-merge

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── admin/               # Admin dashboard page
│   ├── api/                  # API routes
│   │   ├── admin/           # Admin API endpoints
│   │   └── auth/             # Authentication endpoints
│   ├── dashboard/            # User dashboard page
│   ├── login/                # Login page
│   ├── generated/            # Generated Prisma client
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page (redirects)
│   └── globals.css            # Global styles
├── components/                # React components
│   ├── admin/                # Admin-specific components
│   ├── auth/                 # Authentication components
│   └── ui/                   # Reusable UI components
├── lib/                       # Utility libraries
│   ├── admin.ts              # Admin utilities
│   ├── auth.ts               # Better Auth configuration
│   ├── auth-client.ts        # Client-side auth
│   ├── auth-server.ts        # Server-side auth helpers
│   ├── db.ts                 # Prisma client instance
│   └── utils.ts              # Utility functions
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma         # Prisma schema
│   └── seed.ts               # Database seed script
└── public/                    # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GasTop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Better Auth Configuration
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000

   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/dbname
   ```

   Generate a secure secret key:
   ```bash
   openssl rand -base64 32
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev --name init

   # Seed admin account
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Default Admin Account

After running the seed script, you can log in with:
- **Email:** `admin@gastop.com`
- **Password:** `admin123`

⚠️ **Important:** Change the admin password after first login!

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with admin account

## Development Guidelines

### Component Organization

- **UI Components** (`components/ui/`) - Reusable, generic components
- **Feature Components** (`components/auth/`, `components/admin/`) - Feature-specific components
- Keep components small and focused on a single responsibility

### Code Style

- Use TypeScript for all files
- Follow Next.js App Router conventions
- Use server components by default, client components when needed
- Keep API routes in `app/api/`
- Use the centralized `db` client from `lib/db.ts`

### Database

- All database access should go through `lib/db.ts`
- Use Prisma migrations for schema changes
- Run `npx prisma generate` after schema changes

## License

MIT
