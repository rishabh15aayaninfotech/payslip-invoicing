"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { ThemeToggle } from "../../_components/theme-provider";

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="admin-grid min-h-screen bg-background text-foreground">
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
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
            className={`flex items-center gap-3 transition-all duration-300 ${isCollapsed ? "lg:justify-center lg:w-full" : ""
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
                className={`group flex items-center rounded-2xl transition-all duration-200 ${isCollapsed
                    ? "justify-center p-3"
                    : "gap-3.5 px-3.5 py-3"
                  } ${active
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

        {/* Sidebar Footer: Sign out */}
        <div className="mt-auto border-t border-white/10 pt-3">
          <Link
            href="/login"
            title="Sign out"
            onClick={() => setMobileOpen(false)}
            className={`group flex items-center rounded-2xl text-xs font-medium text-white/70 hover:bg-danger/10 hover:text-danger border border-white/5 hover:border-danger/20 transition-all duration-200 ${isCollapsed ? "justify-center p-3" : "gap-3 px-3.5 py-2.5"
              }`}
          >
            <svg
              className="h-4 w-4 shrink-0 text-white/50 group-hover:text-danger transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {!isCollapsed && (
              <span className="overflow-hidden whitespace-nowrap">Sign out</span>
            )}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`min-h-screen transition-all duration-300 ease-in-out ${isCollapsed ? "lg:pl-[76px]" : "lg:pl-[260px]"
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

            <ThemeToggle className="hidden sm:inline-flex" />

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-white/10 hover:text-white cursor-pointer active:scale-95"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-strong text-[10px] font-bold text-white shadow-sm shadow-accent/20">
                  R
                </div>
                <span className="hidden sm:inline font-medium text-white/90">Rishabh</span>
                <svg
                  className={`h-3.5 w-3.5 text-white/50 transition-transform duration-200 ${userMenuOpen ? "rotate-180 text-white" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Backdrop to dismiss */}
              {userMenuOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUserMenuOpen(false)}
                />
              )}

              {/* Floating Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-white/15 bg-surface/95 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* User Info Header */}
                  <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-white/10">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-strong text-xs font-bold text-white shadow-md shadow-accent/20">
                      R
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold text-white truncate">Rishabh Chandra</p>
                      <p className="text-[11px] text-white/50 truncate">admin@payslip.in</p>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-1.5 space-y-0.5 text-xs">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/5 hover:text-white transition"
                    >
                      <svg className="h-4 w-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      Dashboard
                    </Link>

                    <Link
                      href="/dashboard/payslip"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/5 hover:text-white transition"
                    >
                      <svg className="h-4 w-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                      </svg>
                      Payslip Studio
                    </Link>

                    <Link
                      href="/dashboard/templates"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-white/70 hover:bg-white/5 hover:text-white transition"
                    >
                      <svg className="h-4 w-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                      Templates
                    </Link>
                  </div>

                  {/* Sign Out Action */}
                  <div className="border-t border-white/10 pt-1.5">
                    <Link
                      href="/login"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-danger hover:bg-danger/10 transition"
                    >
                      <svg className="h-4 w-4 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>
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
