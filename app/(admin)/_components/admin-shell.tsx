"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

const navigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Invoices", href: "/dashboard/invoices" },
  { label: "Payouts", href: "/dashboard/payouts" },
  { label: "Employees", href: "/dashboard/employees" },
  { label: "Reports", href: "/dashboard/reports" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-grid min-h-screen bg-background text-foreground">
      <div
        className={`fixed inset-0 z-30 bg-slate-950/70 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[280px] border-r border-white/10 bg-surface/95 px-4 py-5 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:flex lg:flex-col`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-strong font-semibold text-white">
              PI
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Payslip Pro</p>
              <p className="text-xs text-white/50">Admin workspace</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 lg:hidden"
          >
            Close
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                  active
                    ? "bg-white text-slate-950 shadow-lg shadow-white/10"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-70">01</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs tracking-[0.24em] text-white/40 uppercase">
            System status
          </p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/65">API health</span>
              <span className="text-success">Healthy</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/65">Queue</span>
              <span className="text-white">12 jobs</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[280px]">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-background/80 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/10 lg:hidden"
            >
              Menu
            </button>

            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-white/35">Search</span>
              <span className="hidden text-sm text-white/30 sm:inline">
                Find invoices, payouts, employees, or reports
              </span>
            </div>

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/10 md:inline-flex"
            >
              Switch user
            </Link>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
