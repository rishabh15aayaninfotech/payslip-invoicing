"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-medium text-white/70">
          Work Email
        </label>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 transition focus-within:border-accent/60 focus-within:bg-white/[0.07]">
          <input
            id="email"
            type="email"
            defaultValue="admin@payslip.in"
            placeholder="admin@company.com"
            className="w-full border-0 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-xs font-medium text-white/70">
            Password
          </label>
          <button
            type="button"
            className="text-xs text-white/40 transition hover:text-accent"
          >
            Forgot?
          </button>
        </div>
        <div className="relative rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 transition focus-within:border-accent/60 focus-within:bg-white/[0.07]">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            defaultValue="admin123"
            placeholder="Enter password"
            className="w-full border-0 bg-transparent pr-12 text-sm text-white outline-none placeholder:text-white/25"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-white/40 transition hover:text-white/80"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-0.5">
        <input
          id="remember"
          type="checkbox"
          defaultChecked
          className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 accent-accent"
        />
        <label
          htmlFor="remember"
          className="cursor-pointer text-xs text-white/55 select-none hover:text-white/75"
        >
          Remember this session
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-accent to-accent-strong py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in to Dashboard"}
      </button>
    </form>
  );
}
