"use client";

import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        router.push("/dashboard");
      }}
    >
      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-white/70">
          Email
        </label>
        <input
          id="email"
          type="email"
          defaultValue="admin@payslip.in"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-accent focus:bg-white/[0.08]"
          placeholder="admin@company.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm text-white/70">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-accent focus:bg-white/[0.08]"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-accent to-accent-strong px-4 py-3 font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110"
      >
        Sign in
      </button>
      <p className="text-center text-xs leading-5 text-white/45">
        Demo login routes you into the admin dashboard so you can keep building.
      </p>
    </form>
  );
}
