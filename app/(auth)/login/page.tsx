import Link from "next/link";
import { LoginForm } from "../_components/login-form";

const benefits = [
  "Quick access to invoices and payouts",
  "Role based admin structure ready to grow",
  "Backend-friendly route organization",
];

export default function LoginPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/65 transition hover:text-white"
          >
            <span className="text-lg">{"<-"}</span>
            Back to landing
          </Link>

          <div className="mt-8 max-w-xl space-y-5">
            <span className="inline-flex w-fit items-center rounded-full border border-success/30 bg-success/10 px-4 py-2 text-sm font-medium text-success">
              Secure access
            </span>
            <h1 className="text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl">
              Sign in to manage payroll, invoices, and admin operations.
            </h1>
            <p className="max-w-lg text-base leading-7 text-white/70">
              The login screen is intentionally simple and focused so it can be
              replaced later with real authentication without changing the layout.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/10 px-4 py-4 text-sm leading-6 text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-surface/90 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <div className="max-w-md">
            <p className="text-sm font-medium tracking-[0.24em] text-white/45 uppercase">
              Admin login
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              Use the demo login to preview the dashboard shell and workflow.
            </p>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
              <LoginForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
