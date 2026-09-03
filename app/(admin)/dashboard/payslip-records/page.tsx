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
  const [selectedRecord, setSelectedRecord] = useState<PayslipRecord | null>(null);

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

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface/90 shadow-xl backdrop-blur-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-white/[0.02] text-white/40">
                <tr className="uppercase tracking-wider text-[11px]">
                  <th className="px-4 py-3">Slip ID</th>
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Period</th>
                  <th className="px-4 py-3">Net Pay</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Template</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRecords.map((record) => {
                  const totals = calculateTotals(record);

                  return (
                    <tr key={record._id || record.id} className="transition hover:bg-white/[0.03]">
                      <td className="px-4 py-4 font-mono text-accent">{record.id}</td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-white">{record.empName}</p>
                          <p className="text-[11px] text-white/45">
                            {record.empCode} · {record.designation}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-white/70">
                        {record.month} {record.year}
                      </td>
                      <td className="px-4 py-4 font-semibold text-white">₹{money(totals.net)}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            record.status === "Disbursed"
                              ? "bg-success/15 text-success"
                              : record.status === "Generated"
                                ? "bg-accent/15 text-accent"
                                : "bg-white/10 text-white/70"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-white/70">
                        {record.templateLayout || "Corporate"}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedRecord(record)}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Payslip Details</p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  {selectedRecord.empName} · {selectedRecord.id}
                </h2>
                <p className="text-sm text-white/55">
                  {selectedRecord.designation} · {selectedRecord.department} · {selectedRecord.templateLayout || "Corporate"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="max-h-[calc(92vh-78px)] overflow-y-auto px-6 py-5">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white">Summary</h3>
                  <div className="mt-3 grid gap-2 text-xs text-white/70">
                    <p><span className="text-white/45">Company:</span> {selectedRecord.companyName}</p>
                    <p><span className="text-white/45">Period:</span> {selectedRecord.month} {selectedRecord.year}</p>
                    <p><span className="text-white/45">Created:</span> {formatDate(selectedRecord.createdAt)}</p>
                    <p><span className="text-white/45">Updated:</span> {formatDate(selectedRecord.updatedAt)}</p>
                    <p><span className="text-white/45">Status:</span> {selectedRecord.status}</p>
                    <p><span className="text-white/45">Template:</span> {selectedRecord.templateLayout || "Corporate"}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white">Amounts</h3>
                  {(() => {
                    const totals = calculateTotals(selectedRecord);
                    return (
                      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-white/70">
                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                          <p className="text-[11px] text-white/45">Gross</p>
                          <p className="mt-1 font-semibold text-white">₹{money(totals.gross)}</p>
                        </div>
                        <div className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-3">
                          <p className="text-[11px] text-white/45">Deductions</p>
                          <p className="mt-1 font-semibold text-white">₹{money(totals.deductions)}</p>
                        </div>
                        <div className="rounded-xl border border-accent/20 bg-accent/5 p-3">
                          <p className="text-[11px] text-white/45">Net</p>
                          <p className="mt-1 font-semibold text-white">₹{money(totals.net)}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white">Employee Details</h3>
                  <div className="mt-3 grid gap-2 text-xs text-white/70">
                    <p><span className="text-white/45">Name:</span> {selectedRecord.empName}</p>
                    <p><span className="text-white/45">Code:</span> {selectedRecord.empCode}</p>
                    <p><span className="text-white/45">Email:</span> {selectedRecord.email}</p>
                    <p><span className="text-white/45">Designation:</span> {selectedRecord.designation}</p>
                    <p><span className="text-white/45">Department:</span> {selectedRecord.department}</p>
                    <p><span className="text-white/45">Joined:</span> {selectedRecord.dateOfJoining}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white">Bank & Tax</h3>
                  <div className="mt-3 grid gap-2 text-xs text-white/70">
                    <p><span className="text-white/45">Bank:</span> {selectedRecord.bankName}</p>
                    <p><span className="text-white/45">Account:</span> {selectedRecord.accountNo}</p>
                    <p><span className="text-white/45">IFSC:</span> {selectedRecord.ifsc}</p>
                    <p><span className="text-white/45">PAN:</span> {selectedRecord.pan}</p>
                    <p><span className="text-white/45">UAN:</span> {selectedRecord.uan}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white">Company Details</h3>
                  <div className="mt-3 grid gap-2 text-xs text-white/70">
                    <p><span className="text-white/45">Company:</span> {selectedRecord.companyName}</p>
                    <p><span className="text-white/45">Address:</span> {selectedRecord.companyAddress}</p>
                    <p><span className="text-white/45">CIN:</span> {selectedRecord.cin}</p>
                    <p><span className="text-white/45">GSTIN:</span> {selectedRecord.gstin}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white">Attendance</h3>
                  <div className="mt-3 grid gap-2 text-xs text-white/70">
                    <p><span className="text-white/45">Working Days:</span> {selectedRecord.workingDays}</p>
                    <p><span className="text-white/45">Paid Days:</span> {selectedRecord.paidDays}</p>
                    <p><span className="text-white/45">LOP Days:</span> {selectedRecord.lopDays}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white">Template Settings</h3>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-white/70">
                    {visibilityItems.map(({ label, field }) => {
                      const enabled = selectedRecord[field];
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
                <h3 className="text-sm font-semibold text-white">Earnings</h3>
                <div className="mt-3 grid gap-2 text-xs text-white/75 sm:grid-cols-2 lg:grid-cols-3">
                  <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Basic: ₹{money(selectedRecord.basic)}</p>
                  <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">HRA: ₹{money(selectedRecord.hra)}</p>
                  <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Special: ₹{money(selectedRecord.specialAllowance)}</p>
                  <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Conveyance: ₹{money(selectedRecord.conveyance)}</p>
                  <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Bonus: ₹{money(selectedRecord.bonus)}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="text-sm font-semibold text-white">Deductions</h3>
                <div className="mt-3 grid gap-2 text-xs text-white/75 sm:grid-cols-2 lg:grid-cols-3">
                  <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">PF: ₹{money(selectedRecord.pf)}</p>
                  <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">PT: ₹{money(selectedRecord.pt)}</p>
                  <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">TDS: ₹{money(selectedRecord.tds)}</p>
                  <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Insurance: ₹{money(selectedRecord.insurance)}</p>
                  <p className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">LOP: ₹{money(selectedRecord.lop)}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <h3 className="text-sm font-semibold text-white">Notes</h3>
                <p className="mt-2 text-xs leading-6 text-white/70">{selectedRecord.notes || "—"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
