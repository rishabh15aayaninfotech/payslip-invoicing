import Link from "next/link";

const highlights = [
  {
    title: "Invoice flow",
    value: "Fast approvals",
    detail: "Create, review, and send payroll invoices from one place.",
  },
  {
    title: "Operations",
    value: "Live status",
    detail: "Track pending, paid, and overdue items in a single view.",
  },
  {
    title: "Admin",
    value: "Role aware",
    detail: "Plan the admin and backend structure before wiring auth.",
  },
];

const features = [
  {
    title: "Sharp landing page",
    description:
      "A confident, high-end first impression with clear conversion paths to login and dashboard.",
  },
  {
    title: "Secure login screen",
    description:
      "A modern auth layout with strong hierarchy, useful context, and a clean sign-in flow.",
  },
  {
    title: "Responsive admin shell",
    description:
      "Sidebar, topbar, and dashboard content that work well on phones, tablets, and desktop.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-strong text-sm font-semibold text-white shadow-lg shadow-accent/25">
              PI
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-white/60 uppercase">
                Payslip Invoicing
              </p>
              <p className="text-sm text-white/80">Admin + backend foundation</p>
            </div>
          </div>
          <nav className="hidden items-center gap-2 md:flex">
            <Link
              href="/login"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.08] hover:text-white"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Open dashboard
            </Link>
          </nav>
        </header>

        <div className="grid flex-1 gap-8 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-12">
          <section className="flex flex-col justify-center gap-8">
            <div className="max-w-2xl space-y-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                New modern admin system
              </span>
              <h1 className="max-w-xl text-4xl leading-tight font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                A polished landing page, login flow, and admin dashboard built
                for scale.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                This structure gives you a clean starting point for admin work
                today and a strong backend foundation for invoices, payroll, and
                future modules.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-accent to-accent-strong px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:brightness-110"
              >
                Go to login
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View dashboard
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                >
                  <p className="text-xs font-medium tracking-[0.24em] text-white/45 uppercase">
                    {item.title}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <aside className="grid gap-4 self-start rounded-[2rem] border border-white/10 bg-surface/90 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-5">
              <p className="text-sm font-medium text-white/55">Dashboard preview</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/[0.06] p-4">
                  <p className="text-sm text-white/60">Total invoices</p>
                  <p className="mt-2 text-3xl font-semibold text-white">128</p>
                </div>
                <div className="rounded-2xl bg-white/[0.06] p-4">
                  <p className="text-sm text-white/60">Paid this month</p>
                  <p className="mt-2 text-3xl font-semibold text-white">93%</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white/8 bg-black/10 p-4"
                  >
                    <p className="font-medium text-white">{feature.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/65">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {["Ready for auth", "Backend friendly", "Mobile first"].map(
                (label) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm text-white/75"
                  >
                    {label}
                  </div>
                ),
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
