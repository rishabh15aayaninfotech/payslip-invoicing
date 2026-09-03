import Link from "next/link";

const stats = [
  { label: "Total Payroll (Month)", value: "₹14,85,000", change: "+8.2%" },
  { label: "Payslips Generated", value: "48 / 52", change: "4 pending" },
  { label: "Active Employees", value: "52", change: "+3 this month" },
  { label: "Tax & PF Deductions", value: "₹2,18,400", change: "Computed" },
];

const recentActivity = [
  "April payslip generated for Engineering team (18 members)",
  "Salary disbursement file exported for HDFC Bank",
  "New employee onboarded: Aarav Mehta (Design)",
  "Tax deduction statement updated for Q1",
];

const recentPayslips = [
  { id: "PS-2026-0401", employee: "Rishabh Sharma", role: "Lead Fullstack", amount: "₹90,200", status: "Disbursed" },
  { id: "PS-2026-0402", employee: "Aarav Mehta", role: "Sr UI Designer", amount: "₹63,200", status: "Generated" },
  { id: "PS-2026-0403", employee: "Priya Sundaram", role: "Frontend Dev", amount: "₹57,600", status: "Disbursed" },
  { id: "PS-2026-0404", employee: "Devendra Patel", role: "DevOps Eng", amount: "₹72,300", status: "Draft" },
];

const bars = [42, 58, 45, 78, 62, 85, 70, 92];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8">
          <p className="text-sm font-medium tracking-[0.24em] text-white/40 uppercase">
            Admin Workspace
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Welcome back, Rishabh
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                Payroll, payslip generation, and employee salary records are up to date.
              </p>
            </div>
            <Link
              href="/dashboard/payslip"
              className="rounded-2xl bg-gradient-to-r from-accent to-accent-strong px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110 active:scale-95 text-center"
            >
              Generate Payslip →
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-surface/90 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/55">Monthly trend</p>
              <p className="mt-1 text-xl font-semibold text-white">Disbursement Volume</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
              Live
            </span>
          </div>
          <div className="mt-6 flex h-40 items-end gap-3">
            {bars.map((height, index) => (
              <div key={index} className="flex-1">
                <div
                  className="mx-auto w-full max-w-10 rounded-t-2xl bg-gradient-to-t from-accent to-accent-strong"
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-white/45">
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 shadow-lg shadow-black/10 backdrop-blur-xl"
          >
            <p className="text-sm text-white/55">{item.label}</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs text-accent">
                {item.change}
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[2rem] border border-white/10 bg-surface/90 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/55">Recent statements</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                Latest Payslips
              </h2>
            </div>
            <Link
              href="/dashboard/payslip"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:text-white transition"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10">
            <div className="grid grid-cols-[1.1fr_1.4fr_1fr_0.8fr] gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3 text-xs tracking-[0.18em] text-white/45 uppercase">
              <span>Slip ID</span>
              <span>Employee</span>
              <span>Net Pay</span>
              <span>Status</span>
            </div>
            {recentPayslips.map((slip) => (
              <div
                key={slip.id}
                className="grid grid-cols-[1.1fr_1.4fr_1fr_0.8fr] gap-3 border-b border-white/8 px-4 py-4 text-sm last:border-b-0 items-center"
              >
                <span className="font-mono text-accent font-medium">{slip.id}</span>
                <div>
                  <p className="font-medium text-white">{slip.employee}</p>
                  <p className="text-xs text-white/45">{slip.role}</p>
                </div>
                <span className="font-semibold text-white">{slip.amount}</span>
                <span
                  className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    slip.status === "Disbursed"
                      ? "bg-success/15 text-success"
                      : slip.status === "Generated"
                        ? "bg-accent/15 text-accent"
                        : "bg-warning/15 text-warning"
                  }`}
                >
                  {slip.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-lg shadow-black/10 backdrop-blur-xl">
            <p className="text-sm text-white/55">Activity feed</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">
              Payroll Updates
            </h2>
            <div className="mt-5 space-y-3">
              {recentActivity.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/10 p-4"
                >
                  <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-accent" />
                  <div>
                    <p className="text-sm text-white/80">{item}</p>
                    <p className="mt-1 text-xs text-white/45">
                      {index + 1} hour{index === 0 ? "" : "s"} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>
    </div>
  );
}
