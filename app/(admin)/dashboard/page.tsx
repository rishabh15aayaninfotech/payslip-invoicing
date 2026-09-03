const stats = [
  { label: "Monthly revenue", value: "$42,880", change: "+12.4%" },
  { label: "Pending invoices", value: "18", change: "+3 today" },
  { label: "Active clients", value: "64", change: "+8 this quarter" },
  { label: "Payroll batches", value: "7", change: "2 awaiting review" },
];

const recentActivity = [
  "Invoice #2041 approved by finance",
  "Payroll batch for April scheduled",
  "New employee onboarded for Design",
  "Overdue invoice reminder sent",
];

const invoices = [
  { id: "INV-2041", client: "Northstar Labs", amount: "$8,400", status: "Paid" },
  { id: "INV-2039", client: "Horizon Co.", amount: "$12,200", status: "Pending" },
  { id: "INV-2037", client: "Vertex Studio", amount: "$6,750", status: "Review" },
  { id: "INV-2032", client: "Apex Retail", amount: "$3,900", status: "Overdue" },
];

const bars = [32, 48, 40, 68, 52, 74, 61, 84];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-8">
          <p className="text-sm font-medium tracking-[0.24em] text-white/40 uppercase">
            Main dashboard
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Welcome back, Rishabh
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                Here is the current status for invoices, payroll, and admin
                operations. This shell is ready for real data and backend logic.
              </p>
            </div>
            <div className="rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-success">
              98.4% system uptime
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-surface/90 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/55">Weekly trend</p>
              <p className="mt-1 text-xl font-semibold text-white">Invoice volume</p>
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
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
            <span>Today</span>
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
              <p className="text-sm text-white/55">Recent invoices</p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                Payment pipeline
              </h2>
            </div>
            <button
              type="button"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
            >
              Export
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10">
            <div className="grid grid-cols-[1.2fr_1.5fr_0.8fr_0.8fr] gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3 text-xs tracking-[0.18em] text-white/45 uppercase">
              <span>Invoice</span>
              <span>Client</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="grid grid-cols-[1.2fr_1.5fr_0.8fr_0.8fr] gap-3 border-b border-white/8 px-4 py-4 text-sm last:border-b-0"
              >
                <span className="font-medium text-white">{invoice.id}</span>
                <span className="text-white/70">{invoice.client}</span>
                <span className="text-white/70">{invoice.amount}</span>
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                    invoice.status === "Paid"
                      ? "bg-success/10 text-success"
                      : invoice.status === "Pending"
                        ? "bg-warning/10 text-warning"
                        : invoice.status === "Review"
                          ? "bg-accent/10 text-accent"
                          : "bg-danger/10 text-danger"
                  }`}
                >
                  {invoice.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-4">
          <article className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-lg shadow-black/10 backdrop-blur-xl">
            <p className="text-sm text-white/55">Activity feed</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">
              What changed today
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

          <article className="rounded-[2rem] border border-white/10 bg-surface/90 p-6 shadow-lg shadow-black/10 backdrop-blur-xl">
            <p className="text-sm text-white/55">Next steps</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">
              Backend ready checklist
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                Connect real auth and session handling
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                Replace demo cards with API data
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                Add invoice, employee, and payout routes
              </li>
            </ul>
          </article>
        </aside>
      </section>
    </div>
  );
}
