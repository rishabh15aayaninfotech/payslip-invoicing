"use client";

import Link from "next/link";
import { useState } from "react";

interface MonthlyData {
  month: string;
  amount: number;
  formatted: string;
  slips: number;
  heightPercent: number;
}

const monthlyTrends: MonthlyData[] = [
  { month: "Nov", amount: 1120000, formatted: "₹11.20L", slips: 38, heightPercent: 55 },
  { month: "Dec", amount: 1250000, formatted: "₹12.50L", slips: 42, heightPercent: 64 },
  { month: "Jan", amount: 1310000, formatted: "₹13.10L", slips: 45, heightPercent: 70 },
  { month: "Feb", amount: 1380000, formatted: "₹13.80L", slips: 47, heightPercent: 78 },
  { month: "Mar", amount: 1420000, formatted: "₹14.20L", slips: 49, heightPercent: 84 },
  { month: "Apr", amount: 1485000, formatted: "₹14.85L", slips: 52, heightPercent: 95 },
];

const departmentBreakdown = [
  { name: "Engineering", percentage: 48, amount: "₹7,12,800", color: "#3b82f6", bg: "bg-blue-500" },
  { name: "Product & Design", percentage: 22, amount: "₹3,26,700", color: "#8b5cf6", bg: "bg-purple-500" },
  { name: "Operations & HR", percentage: 18, amount: "₹2,67,300", color: "#10b981", bg: "bg-emerald-500" },
  { name: "Marketing", percentage: 12, amount: "₹1,78,200", color: "#f59e0b", bg: "bg-amber-500" },
];

const recentPayslips = [
  { id: "PS-2026-0401", employee: "Rishabh Sharma", role: "Lead Fullstack", department: "Engineering", amount: "₹90,200", status: "Disbursed" },
  { id: "PS-2026-0402", employee: "Aarav Mehta", role: "Sr UI Designer", department: "Design", amount: "₹63,200", status: "Generated" },
  { id: "PS-2026-0403", employee: "Priya Sundaram", role: "Frontend Dev", department: "Engineering", amount: "₹57,600", status: "Disbursed" },
  { id: "PS-2026-0404", employee: "Devendra Patel", role: "DevOps Eng", department: "Infrastructure", amount: "₹72,300", status: "Generated" },
];

export default function DashboardPage() {
  const [hoveredMonth, setHoveredMonth] = useState<MonthlyData>(monthlyTrends[monthlyTrends.length - 1]);

  return (
    <div className="space-y-4">
      {/* Compact Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            Payroll Overview
          </h1>
          <p className="text-xs text-white/50">
            Monthly disbursements & salary statistics
          </p>
        </div>

        <Link
          href="/dashboard/payslip"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-strong px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-accent/20 transition hover:brightness-110 active:scale-95"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Generate Payslip
        </Link>
      </div>

      {/* 4 Summary Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-lg backdrop-blur-xl">
          <p className="text-xs text-white/50">Total Payroll (April)</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-white">₹14,85,000</p>
            <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-medium text-success">
              +8.2%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-white/40">vs ₹14.20L last month</p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-lg backdrop-blur-xl">
          <p className="text-xs text-white/50">Payslips Generated</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-white">48 / 52</p>
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
              92%
            </span>
          </div>
          <p className="mt-1 text-[11px] text-white/40">4 pending review</p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-lg backdrop-blur-xl">
          <p className="text-xs text-white/50">Active Employees</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-white">52</p>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/70">
              +3 new
            </span>
          </div>
          <p className="mt-1 text-[11px] text-white/40">Across 4 departments</p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-lg backdrop-blur-xl">
          <p className="text-xs text-white/50">Average Net Salary</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-white">₹68,500</p>
            <span className="text-xs text-white/40">Per Emp</span>
          </div>
          <p className="mt-1 text-[11px] text-white/40">Computed take-home</p>
        </article>
      </section>

      {/* Two Clean Charts Grid */}
      <section className="grid gap-6 lg:grid-cols-12">
        {/* Chart 1: Monthly Disbursement Volume (7 cols) */}
        <div className="rounded-3xl border border-white/10 bg-surface/90 p-6 shadow-xl backdrop-blur-2xl lg:col-span-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/50">Monthly Trend</p>
              <h2 className="text-lg font-bold text-white">Payroll Disbursement Volume</h2>
            </div>

            {/* Live Tooltip Indicator */}
            <div className="rounded-xl border border-accent/30 bg-accent/10 px-3 py-1.5 text-right">
              <p className="text-[10px] text-accent uppercase font-medium">
                {hoveredMonth.month} 2026: <span className="font-bold text-white">{hoveredMonth.formatted}</span>
              </p>
              <p className="text-[10px] text-white/50">{hoveredMonth.slips} payslips disbursed</p>
            </div>
          </div>

          {/* Interactive Chart Bars */}
          <div className="mt-8 flex h-52 items-end justify-between gap-3 sm:gap-6 px-2 border-b border-white/10 pb-4">
            {monthlyTrends.map((item) => {
              const isSelected = hoveredMonth.month === item.month;
              return (
                <div
                  key={item.month}
                  onMouseEnter={() => setHoveredMonth(item)}
                  className="group flex flex-1 flex-col items-center gap-2 cursor-pointer"
                >
                  {/* Amount Pill on hover */}
                  <span
                    className={`text-[10px] font-mono transition-opacity duration-200 ${
                      isSelected ? "text-accent opacity-100 font-semibold" : "text-white/40 opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {item.formatted}
                  </span>

                  {/* Vertical Column Bar */}
                  <div className="relative w-full max-w-[42px] h-36 flex items-end">
                    <div
                      className={`w-full rounded-2xl transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-t from-accent to-accent-strong shadow-lg shadow-accent/30 scale-105"
                          : "bg-white/10 group-hover:bg-white/20"
                      }`}
                      style={{ height: `${item.heightPercent}%` }}
                    />
                  </div>

                  {/* Month Label */}
                  <span
                    className={`text-xs transition ${
                      isSelected ? "font-bold text-white" : "text-white/50 group-hover:text-white"
                    }`}
                  >
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-white/40 px-2">
            <span>6-Month Disbursement History</span>
            <span className="flex items-center gap-1.5 text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              All Payroll Cycles Closed
            </span>
          </div>
        </div>

        {/* Chart 2: Department Salary Distribution (5 cols) */}
        <div className="rounded-3xl border border-white/10 bg-surface/90 p-6 shadow-xl backdrop-blur-2xl lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/50">Allocation</p>
                <h2 className="text-lg font-bold text-white">Department Share</h2>
              </div>
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/60">
                ₹14.85L Total
              </span>
            </div>

            {/* Department Multi-Segment Bar */}
            <div className="mt-6 flex h-3.5 w-full overflow-hidden rounded-full bg-white/5 p-0.5">
              {departmentBreakdown.map((dept) => (
                <div
                  key={dept.name}
                  className={`h-full first:rounded-l-full last:rounded-r-full ${dept.bg}`}
                  style={{ width: `${dept.percentage}%` }}
                  title={`${dept.name}: ${dept.percentage}%`}
                />
              ))}
            </div>

            {/* Department Breakdown List */}
            <div className="mt-6 space-y-3">
              {departmentBreakdown.map((dept) => (
                <div
                  key={dept.name}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-xs transition hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: dept.color }}
                    />
                    <span className="font-medium text-white">{dept.name}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-white/70">{dept.amount}</span>
                    <span className="w-10 text-right font-semibold text-white">
                      {dept.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-white/10 pt-3 flex justify-between items-center text-xs text-white/45">
            <span>Engineering holds highest share</span>
            <Link href="/dashboard/payslip" className="text-accent hover:underline">
              View details →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Row: Recent Payslips List */}
      <section className="rounded-3xl border border-white/10 bg-surface/90 p-6 shadow-xl backdrop-blur-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Latest Payslip Statements</h2>
            <p className="text-xs text-white/50">Recent salary disbursements generated this cycle</p>
          </div>

          <Link
            href="/dashboard/payslip"
            className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            Open Payslip Studio →
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 uppercase tracking-wider">
                <th className="py-3 px-3">Slip ID</th>
                <th className="py-3 px-3">Employee</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Net Disbursed</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentPayslips.map((slip) => (
                <tr key={slip.id} className="group transition hover:bg-white/[0.03]">
                  <td className="py-3.5 px-3 font-mono text-accent font-medium">{slip.id}</td>
                  <td className="py-3.5 px-3">
                    <p className="font-semibold text-white">{slip.employee}</p>
                    <p className="text-[11px] text-white/45">{slip.role}</p>
                  </td>
                  <td className="py-3.5 px-3 text-white/70">{slip.department}</td>
                  <td className="py-3.5 px-3 font-semibold text-white">{slip.amount}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                        slip.status === "Disbursed"
                          ? "bg-success/15 text-success"
                          : "bg-accent/15 text-accent"
                      }`}
                    >
                      {slip.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link
                      href="/dashboard/payslip"
                      className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-medium"
                    >
                      View in Studio
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
