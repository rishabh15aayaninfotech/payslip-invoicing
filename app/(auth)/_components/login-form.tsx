"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@payslip.in");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Authentication failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {errorMessage && (
        <div className="rounded-xl border border-danger/30 bg-danger/10 p-3 text-xs text-danger flex items-center gap-2 animate-in fade-in duration-200">
          <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-xs font-medium text-white/70">
          Work Email
        </label>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 transition focus-within:border-accent/60 focus-within:bg-white/[0.07]">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        className="w-full rounded-xl bg-gradient-to-r from-accent to-accent-strong py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Verifying with Database...</span>
          </>
        ) : (
          <span>Sign in to Dashboard</span>
        )}
      </button>
    </form>
  );
}
