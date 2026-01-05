"use client";

import { useEffect, useMemo, useState } from "react";

type UserItem = {
  id: string;
  email: string;
  name: string;
  role: string | null;
  banned: boolean | null;
  banReason: string | null;
  banExpires: string | null;
  createdAt: string;
};

export default function UserList() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentPage = useMemo(
    () => Math.floor(offset / limit) + 1,
    [offset, limit]
  );
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / limit)),
    [total, limit]
  );

  const fetchUsers = async (opts?: { resetPage?: boolean }) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("limit", String(limit));
      params.set("offset", String(opts?.resetPage ? 0 : offset));
      const res = await fetch(`/api/admin/users?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "خطا در دریافت کاربران");
      }
      const data = await res.json();
      setUsers(data.users || []);
      setTotal(data.total || 0);
      if (opts?.resetPage) {
        setOffset(0);
      }
    } catch (e: any) {
      setError(e.message || "خطای نامشخص");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, limit]);

  const onSearch = () => fetchUsers({ resetPage: true });

  const lockUser = async (id: string) => {
    const res = await fetch(`/api/admin/users/${id}/lock`, {
      method: "POST",
      body: JSON.stringify({ reason: "Locked by admin" }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "خطا در قفل کردن کاربر");
    }
  };

  const unlockUser = async (id: string) => {
    const res = await fetch(`/api/admin/users/${id}/lock`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "خطا در آزاد کردن کاربر");
    }
  };

  const deleteUser = async (id: string) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "خطا در حذف کاربر");
    }
  };

  const handleLockToggle = async (user: UserItem) => {
    try {
      setLoading(true);
      if (user.banned) {
        await unlockUser(user.id);
      } else {
        await lockUser(user.id);
      }
      await fetchUsers();
    } catch (e: any) {
      setError(e.message || "خطا در تغییر وضعیت قفل");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (user: UserItem) => {
    const confirmed = window.confirm(
      `حذف ${user.email}? همه داده‌های مرتبط نیز حذف می‌شوند.`
    );
    if (!confirmed) return;
    try {
      setLoading(true);
      await deleteUser(user.id);
      await fetchUsers();
    } catch (e: any) {
      setError(e.message || "خطا در حذف کاربر");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1 flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو بر اساس ایمیل یا نام"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2"
          />
          <button
            onClick={onSearch}
            className="rounded-lg bg-primary px-4 py-2 text-white"
            disabled={loading}
          >
            جستجو
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">تعداد در صفحه</span>
          <select
            value={limit}
            onChange={(e) => setLimit(parseInt(e.target.value, 10))}
            className="rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-2 py-1"
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3 text-right">نام</th>
              <th className="px-4 py-3 text-right">ایمیل</th>
              <th className="px-4 py-3 text-right">نقش</th>
              <th className="px-4 py-3 text-right">وضعیت</th>
              <th className="px-4 py-3 text-right">تاریخ ایجاد</th>
              <th className="px-4 py-3 text-right">اقدامات</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800/70"
              >
                <td className="px-4 py-3">{user.name || "-"}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role || "user"}</td>
                <td className="px-4 py-3">
                  {user.banned ? (
                    <span className="rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200 px-2 py-1 text-xs">
                      قفل / مسدود
                    </span>
                  ) : (
                    <span className="rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200 px-2 py-1 text-xs">
                      فعال
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td className="px-4 py-3 space-x-reverse space-x-2">
                  <div className="flex items-center gap-2">

                    <button
                      onClick={() => handleLockToggle(user)}
                      className="rounded px-3 py-1 text-xs font-semibold border border-yellow-400 text-yellow-700 dark:text-yellow-200 dark:border-yellow-600"
                      disabled={loading}
                    >
                      {user.banned ? "باز کردن" : "قفل کردن"}
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="rounded px-3 py-1 text-xs font-semibold border border-red-500 text-red-600 dark:text-red-200 dark:border-red-600"
                      disabled={loading}
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  کاربری یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {loading && (
          <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
            در حال بارگذاری...
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <div>
          صفحه {currentPage} از {totalPages} (کل: {total})
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded border px-3 py-1"
            onClick={() => setOffset(Math.max(0, offset - limit))}
            disabled={offset === 0 || loading}
          >
            قبلی
          </button>
          <button
            className="rounded border px-3 py-1"
            onClick={() =>
              setOffset(
                Math.min(offset + limit, Math.max(0, (totalPages - 1) * limit))
              )
            }
            disabled={offset + limit >= total || loading}
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}

