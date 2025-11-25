import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { isAdmin } from "@/lib/admin";
import LogoutButton from "@/components/auth/LogoutButton";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const admin = await isAdmin(session.user.id);

  return (
    <div dir="ltr" className="min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
              Dashboard
            </h1>
            <div className="flex items-center gap-4">
              {admin && (
                <a
                  href="/admin"
                  className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Admin
                </a>
              )}
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black dark:text-zinc-50">
              Welcome back, {session.user.name || session.user.email}!
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              You&apos;re successfully signed in to your account.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Email
              </h3>
              <p className="mt-2 text-lg font-semibold text-black dark:text-zinc-50">
                {session.user.email}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Email Verified
              </h3>
              <p className="mt-2 text-lg font-semibold text-black dark:text-zinc-50">
                {session.user.emailVerified ? "Yes" : "No"}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                User ID
              </h3>
              <p className="mt-2 truncate text-sm font-mono text-black dark:text-zinc-50">
                {session.user.id}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-6">
            <h3 className="text-lg font-semibold text-black dark:text-zinc-50 mb-4">
              Session Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Session ID:
                </span>
                <span className="font-mono text-black dark:text-zinc-50">
                  {session.session.id.slice(0, 8)}...
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Created:
                </span>
                <span className="text-black dark:text-zinc-50">
                  {new Date(session.session.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Expires:
                </span>
                <span className="text-black dark:text-zinc-50">
                  {new Date(session.session.expiresAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
