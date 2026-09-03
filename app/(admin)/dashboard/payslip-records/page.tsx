"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type PayslipStatus = "Disbursed" | "Generated" | "Draft";

interface PayslipRecord {
  _id?: string;
  id: string;
  companyName: string;
  companyAddress: string;
  cin: string;
  gstin: string;
  empCode: string;
  empName: string;
  email: string;
  designation: string;
  department: string;
  month: string;
  year: string;
  dateOfJoining: string;
  bankName: string;
  accountNo: string;
  ifsc: string;
  pan: string;
  uan: string;
  workingDays: number;
  paidDays: number;
  lopDays: number;
  basic: number;
  hra: number;
  specialAllowance: number;
  conveyance: number;
  bonus: number;
  pf: number;
  pt: number;
  tds: number;
  insurance: number;
  lop: number;
  showLogo: boolean;
  showCompanyAddress: boolean;
  showPanUan: boolean;
  showBankDetails: boolean;
  showAttendance: boolean;
  showAmountInWords: boolean;
  showSignatory: boolean;
  showQrCode: boolean;
  notes: string;
  status: PayslipStatus;
  templateLayout?: string;
  createdAt?: string;
  updatedAt?: string;
}

function money(amount: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(amount) || 0);
}

function calculateTotals(record: PayslipRecord) {
  const gross =
    (Number(record.basic) || 0) +
    (Number(record.hra) || 0) +
    (Number(record.specialAllowance) || 0) +
    (Number(record.conveyance) || 0) +
    (Number(record.bonus) || 0);

  const deductions =
    (Number(record.pf) || 0) +
    (Number(record.pt) || 0) +
    (Number(record.tds) || 0) +
    (Number(record.insurance) || 0) +
    (Number(record.lop) || 0);

  return {
    gross,
    deductions,
    net: gross - deductions,
  };
}

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

const visibilityItems = [
  { label: "Logo", field: "showLogo" },
  { label: "Company Address", field: "showCompanyAddress" },
  { label: "PAN/UAN", field: "showPanUan" },
  { label: "Bank Details", field: "showBankDetails" },
  { label: "Attendance", field: "showAttendance" },
  { label: "Amount in Words", field: "showAmountInWords" },
  { label: "Signatory", field: "showSignatory" },
  { label: "QR Code", field: "showQrCode" },
] as const;

export default function PayslipRecordsPage() {
  const [records, setRecords] = useState<PayslipRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PayslipStatus>("All");
  const [templateFilter, setTemplateFilter] = useState("All");

  useEffect(() => {
    async function loadRecords() {
      try {
        setLoading(true);
        const res = await fetch("/api/payslips", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data?.error || "Failed to load payslip records");
        }

        setRecords(Array.isArray(data.payslips) ? data.payslips : []);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load payslip records";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadRecords();
  }, []);

  const templates = Array.from(new Set(records.map((record) => record.templateLayout || "Corporate")));

  const filteredRecords = records.filter((record) => {
    const searchTerm = search.trim().toLowerCase();
    const matchesSearch =
      !searchTerm ||
      [
        record.id,
        record.empName,
        record.empCode,
        record.designation,
        record.department,
        record.month,
        record.year,
        record.companyName,
        record.email,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(searchTerm));

    const matchesStatus = statusFilter === "All" || record.status === statusFilter;
    const matchesTemplate = templateFilter === "All" || (record.templateLayout || "Corporate") === templateFilter;

    return matchesSearch && matchesStatus && matchesTemplate;
  });

  const stats = {
    total: records.length,
    disbursed: records.filter((record) => record.status === "Disbursed").length,
    generated: records.filter((record) => record.status === "Generated").length,
    drafts: records.filter((record) => record.status === "Draft").length,
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-surface/90 p-6 shadow-xl backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">API Based Archive</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Payslip Records
            </h1>
            <p className="mt-1 text-sm text-white/55">
              Sabhi generated payslips yahan se directly database se load hote hain.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/payslip"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              Open Studio
            </Link>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-gradient-to-r from-accent to-accent-strong px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110"
            >
              Refresh Records
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-lg backdrop-blur-xl">
          <p className="text-xs text-white/45">Total Records</p>
          <p className="mt-2 text-3xl font-bold text-white">{stats.total}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-lg backdrop-blur-xl">
          <p className="text-xs text-white/45">Disbursed</p>
          <p className="mt-2 text-3xl font-bold text-success">{stats.disbursed}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-lg backdrop-blur-xl">
          <p className="text-xs text-white/45">Generated</p>
          <p className="mt-2 text-3xl font-bold text-accent">{stats.generated}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-lg backdrop-blur-xl">
          <p className="text-xs text-white/45">Drafts</p>
          <p className="mt-2 text-3xl font-bold text-white">{stats.drafts}</p>
        </article>
      </section>

      <section className="rounded-3xl border border-white/10 bg-surface/90 p-5 shadow-xl backdrop-blur-2xl">
        <div className="grid gap-3 lg:grid-cols-3">
          <label className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70">
            <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search id, employee, code, department..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </label>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "All" | PayslipStatus)}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
          >
            <option className="bg-surface text-white" value="All">All Status</option>
            <option className="bg-surface text-white" value="Disbursed">Disbursed</option>
            <option className="bg-surface text-white" value="Generated">Generated</option>
            <option className="bg-surface text-white" value="Draft">Draft</option>
          </select>

          <select
            value={templateFilter}
            onChange={(e) => setTemplateFilter(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none"
          >
            <option className="bg-surface text-white" value="All">All Templates</option>
            {templates.map((template) => (
              <option key={template} className="bg-surface text-white" value={template}>
                {template}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="space-y-4">
        {loading && (
          <div className="rounded-3xl border border-white/10 bg-surface/90 p-10 text-center text-sm text-white/60 shadow-xl backdrop-blur-2xl">
            Loading payslip records from database...
          </div>
        )}

        {error && !loading && (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && filteredRecords.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-surface/90 p-10 text-center text-sm text-white/60 shadow-xl backdrop-blur-2xl">
            No payslip records found for current filters.
          </div>
        )}

        <div className="grid gap-4 xl:grid-cols-2">
          {filteredRecords.map((record, index) => {
            const totals = calculateTotals(record);

            return (
              <details
                key={record._id || record.id}
                open={index === 0}
                className="group rounded-3xl border border-white/10 bg-surface/90 shadow-xl backdrop-blur-2xl"
              >
                <summary className="cursor-pointer list-none rounded-3xl p-5 outline-none">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
                          {record.id}
                        </span>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          record.status === "Disbursed"
                            ? "bg-success/15 text-success"
                            : record.status === "Generated"
                              ? "bg-accent/15 text-accent"
                              : "bg-white/10 text-white/70"
                        }`}>
                          {record.status}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60">
                          {record.templateLayout || "Corporate"}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-lg font-bold text-white">{record.empName}</h2>
                        <p className="text-sm text-white/55">
                          {record.designation} · {record.department} · {record.empCode}
                        </p>
                      </div>

                      <p className="max-w-3xl text-xs leading-5 text-white/50">
                        {record.companyName} · {record.month} {record.year} · {record.email}
                      </p>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[280px]">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-[11px] text-white/45">Net Pay</p>
                        <p className="mt-1 text-xl font-bold text-white">₹{money(totals.net)}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-[11px] text-white/45">Gross</p>
                        <p className="mt-1 text-xl font-bold text-white">₹{money(totals.gross)}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-[11px] text-white/45">Deductions</p>
                        <p className="mt-1 text-xl font-bold text-white">₹{money(totals.deductions)}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <p className="text-[11px] text-white/45">Created</p>
                        <p className="mt-1 text-sm font-semibold text-white">{formatDate(record.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </summary>

                <div className="border-t border-white/10 px-5 pb-5 pt-0">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <h3 className="text-sm font-semibold text-white">Company Details</h3>
                      <div className="mt-3 space-y-2 text-xs text-white/70">
                        <p><span className="text-white/45">Company:</span> {record.companyName}</p>
                        <p><span className="text-white/45">Address:</span> {record.companyAddress}</p>
                        <p><span className="text-white/45">CIN:</span> {record.cin}</p>
                        <p><span className="text-white/45">GSTIN:</span> {record.gstin}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <h3 className="text-sm font-semibold text-white">Employee Details</h3>
                      <div className="mt-3 space-y-2 text-xs text-white/70">
                        <p><span className="text-white/45">Name:</span> {record.empName}</p>
                        <p><span className="text-white/45">Code:</span> {record.empCode}</p>
                        <p><span className="text-white/45">Designation:</span> {record.designation}</p>
                        <p><span className="text-white/45">Department:</span> {record.department}</p>
                        <p><span className="text-white/45">Email:</span> {record.email}</p>
                        <p><span className="text-white/45">Joined:</span> {record.dateOfJoining}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <h3 className="text-sm font-semibold text-white">Bank & Tax</h3>
                      <div className="mt-3 space-y-2 text-xs text-white/70">
                        <p><span className="text-white/45">Bank:</span> {record.bankName}</p>
                        <p><span className="text-white/45">Account:</span> {record.accountNo}</p>
                        <p><span className="text-white/45">IFSC:</span> {record.ifsc}</p>
                        <p><span className="text-white/45">PAN:</span> {record.pan}</p>
                        <p><span className="text-white/45">UAN:</span> {record.uan}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <h3 className="text-sm font-semibold text-white">Attendance & Template</h3>
                      <div className="mt-3 grid gap-2 text-xs text-white/70">
                        <p><span className="text-white/45">Month:</span> {record.month} {record.year}</p>
                        <p><span className="text-white/45">Working Days:</span> {record.workingDays}</p>
                        <p><span className="text-white/45">Paid Days:</span> {record.paidDays}</p>
                        <p><span className="text-white/45">LOP Days:</span> {record.lopDays}</p>
                        <p><span className="text-white/45">Template:</span> {record.templateLayout || "Corporate"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 xl:grid-cols-3">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <h3 className="text-sm font-semibold text-white">Earnings</h3>
                      <div className="mt-3 space-y-2 text-xs text-white/75">
                        <p className="flex justify-between gap-3"><span>Basic</span><span>₹{money(record.basic)}</span></p>
                        <p className="flex justify-between gap-3"><span>HRA</span><span>₹{money(record.hra)}</span></p>
                        <p className="flex justify-between gap-3"><span>Special</span><span>₹{money(record.specialAllowance)}</span></p>
                        <p className="flex justify-between gap-3"><span>Conveyance</span><span>₹{money(record.conveyance)}</span></p>
                        <p className="flex justify-between gap-3"><span>Bonus</span><span>₹{money(record.bonus)}</span></p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-4">
                      <h3 className="text-sm font-semibold text-white">Deductions</h3>
                      <div className="mt-3 space-y-2 text-xs text-white/75">
                        <p className="flex justify-between gap-3"><span>PF</span><span>₹{money(record.pf)}</span></p>
                        <p className="flex justify-between gap-3"><span>PT</span><span>₹{money(record.pt)}</span></p>
                        <p className="flex justify-between gap-3"><span>TDS</span><span>₹{money(record.tds)}</span></p>
                        <p className="flex justify-between gap-3"><span>Insurance</span><span>₹{money(record.insurance)}</span></p>
                        <p className="flex justify-between gap-3"><span>LOP</span><span>₹{money(record.lop)}</span></p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <h3 className="text-sm font-semibold text-white">Settings</h3>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-white/70">
                        {visibilityItems.map(({ label, field }) => {
                          const enabled = record[field];
                          return (
                            <span
                              key={label}
                              className={`rounded-xl border px-2.5 py-1.5 text-center ${
                                enabled
                                  ? "border-success/20 bg-success/10 text-success"
                                  : "border-white/10 bg-white/5 text-white/45"
                              }`}
                            >
                              {label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="text-sm font-semibold text-white">Notes</h3>
                    <p className="mt-2 text-xs leading-6 text-white/70">{record.notes || "—"}</p>
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </section>
    </div>
  );
}
