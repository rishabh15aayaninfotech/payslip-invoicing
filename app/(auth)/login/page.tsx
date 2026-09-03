import Link from "next/link";
import { LoginForm } from "../_components/login-form";
import { ThemeToggle } from "../../_components/theme-provider";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-accent-strong/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[420px]">
        <div className="absolute -top-14 right-0 sm:-top-16">
          <ThemeToggle />
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-white/10 bg-surface/85 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-9">
          {/* Logo & Header */}
          <div className="mb-7 flex flex-col items-center text-center">
            <Link
              href="/"
              className="group mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-strong text-base font-semibold text-white shadow-lg shadow-accent/25 transition group-hover:scale-105"
            >
              PI
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="mt-1.5 text-xs text-white/50">
              Sign in to manage payslips and invoices
            </p>
          </div>

          {/* Form */}
          <LoginForm />
        </div>

        {/* Footer info */}
        <div className="mt-6 flex items-center justify-between px-2 text-xs text-white/40">
          <span>Demo credentials prefilled</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            System Online
          </span>
        </div>
      </div>
    </main>
  );
}
