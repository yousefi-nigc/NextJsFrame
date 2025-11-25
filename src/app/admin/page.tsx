import { redirect } from "next/navigation";
import { getSession } from "@/src/lib/auth-server";
import { isAdmin } from "@/src/lib/admin";
import AddUserForm from "@/src/components/admin/AddUserForm";

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const admin = await isAdmin(session.user.id);
  if (!admin) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-xl font-semibold text-black dark:text-zinc-50">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <a
                href="/dashboard"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Dashboard
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-black dark:text-zinc-50">
            User Management
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Create and manage user accounts
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-lg">
          <AddUserForm />
        </div>
      </main>
    </div>
  );
}
