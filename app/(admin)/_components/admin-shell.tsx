"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
}

const navigation: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: "Payslip",
    href: "/dashboard/payslip",
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
      </svg>
    ),
  },
  {
    label: "Payslip Templates",
    href: "/dashboard/templates",
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="admin-grid min-h-screen bg-background text-foreground">
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 border-r border-white/10 bg-surface/95 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all duration-300 ease-in-out ${
          /* Mobile slide */
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${
          /* Desktop collapse */
          isCollapsed ? "lg:w-[76px] lg:px-3" : "lg:w-[260px] lg:px-4"
        } flex flex-col py-5`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 transition-all duration-300 ${
              isCollapsed ? "lg:justify-center lg:w-full" : ""
            }`}
            onClick={() => setMobileOpen(false)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-strong font-semibold text-white shadow-md shadow-accent/20">
              PI
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden whitespace-nowrap">
                <p className="text-sm font-semibold text-white">Payslip Pro</p>
                <p className="text-xs text-white/50">Admin workspace</p>
              </div>
            )}
          </Link>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white lg:hidden"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex-1 space-y-1.5">
          {navigation.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center rounded-2xl transition-all duration-200 ${
                  isCollapsed
                    ? "justify-center p-3"
                    : "gap-3.5 px-3.5 py-3"
                } ${
                  active
                    ? "bg-white text-slate-950 font-medium shadow-lg shadow-white/10"
                    : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className={`${active ? "text-slate-950" : "text-white/60 group-hover:text-white"}`}>
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="text-sm overflow-hidden whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* System status widget */}
        {!isCollapsed ? (
          <div className="mt-auto rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/50">System Status</span>
              <span className="flex items-center gap-1.5 text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Online
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-auto flex justify-center" title="System Online">
            <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div
        className={`min-h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:pl-[76px]" : "lg:pl-[260px]"
        }`}
      >
        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b border-white/10 bg-background/80 px-4 py-3.5 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle Button (Mobile + Desktop) */}
            <button
              type="button"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileOpen((prev) => !prev);
                } else {
                  setIsCollapsed((prev) => !prev);
                }
              }}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-white active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.8} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3v18" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d={isCollapsed ? "M14 9l3 3-3 3" : "M16 9l-3 3 3 3"}
                />
              </svg>
            </button>

            {/* Search Box */}
            <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
              <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search payslips, employee records..."
                className="w-full border-0 bg-transparent text-xs text-white outline-none placeholder:text-white/30"
              />
            </div>

            {/* Switch User / Action */}
            <Link
              href="/login"
              className="hidden rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/75 transition hover:bg-white/10 hover:text-white md:inline-flex"
            >
              Sign out
            </Link>
          </div>
        </header>

        {/* Main Body */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
