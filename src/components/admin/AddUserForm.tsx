"use client";

import { useState } from "react";
import Button from "../../components/ui/Button";

export default function AddUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        setError("پاسخ نامعتبر از سرور. لطفاً دوباره تلاش کنید.");
        return;
      }

      if (response.ok) {
        setSuccess(`کاربر "${data.user?.name || email}" با موفقیت ایجاد شد!`);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setError(data.error || "خطا در ایجاد کاربر");
      }
    } catch (err) {
      // Handle network errors
      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError("خطای شبکه. لطفاً اتصال خود را بررسی کرده و دوباره تلاش کنید.");
      } else {
        setError("خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-6 text-lg font-semibold text-black dark:text-zinc-50">
        افزودن کاربر جدید
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-600 dark:text-green-400">
            {success}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            نام کامل
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:focus:border-zinc-500"
            placeholder="نام و نام خانوادگی"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            آدرس ایمیل
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:focus:border-zinc-500"
            placeholder="user@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            رمز عبور
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:focus:border-zinc-500"
            placeholder="••••••••"
            minLength={6}
          />
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            حداقل ۶ کاراکتر
          </p>
        </div>

        <div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "در حال ایجاد کاربر..." : "ایجاد کاربر"}
          </Button>
        </div>
      </form>
    </div>
  );
}
