"use client";

import { useState } from "react";

interface EmployeePayslip {
  id: string;
  empCode: string;
  name: string;
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
  // Earnings
  basic: number;
  hra: number;
  specialAllowance: number;
  conveyance: number;
  bonus: number;
  // Deductions
  pf: number;
  pt: number;
  tds: number;
  insurance: number;
  lop: number;
  status: "Disbursed" | "Generated" | "Draft";
}

const initialPayslips: EmployeePayslip[] = [
  {
    id: "PS-2026-0401",
    empCode: "EMP-1001",
    name: "Rishabh Sharma",
    email: "rishabh@example.com",
    designation: "Lead Fullstack Engineer",
    department: "Engineering",
    month: "April",
    year: "2026",
    dateOfJoining: "15 Jan 2023",
    bankName: "HDFC Bank",
    accountNo: "••••••••4892",
    ifsc: "HDFC0001245",
    pan: "ABCDE1234F",
    uan: "100982341209",
    workingDays: 30,
    paidDays: 30,
    lopDays: 0,
    basic: 55000,
    hra: 22000,
    specialAllowance: 15000,
    conveyance: 3000,
    bonus: 5000,
    pf: 4200,
    pt: 200,
    tds: 5800,
    insurance: 1000,
    lop: 0,
    status: "Disbursed",
  },
  {
    id: "PS-2026-0402",
    empCode: "EMP-1004",
    name: "Aarav Mehta",
    email: "aarav@example.com",
    designation: "Senior UI/UX Designer",
    department: "Product Design",
    month: "April",
    year: "2026",
    dateOfJoining: "01 Mar 2023",
    bankName: "ICICI Bank",
    accountNo: "••••••••7812",
    ifsc: "ICIC0000982",
    pan: "BKAPM8841G",
    uan: "100982341210",
    workingDays: 30,
    paidDays: 29,
    lopDays: 1,
    basic: 42000,
    hra: 16800,
    specialAllowance: 10000,
    conveyance: 2500,
    bonus: 0,
    pf: 3600,
    pt: 200,
    tds: 3400,
    insurance: 1000,
    lop: 1800,
    status: "Generated",
  },
  {
    id: "PS-2026-0403",
    empCode: "EMP-1008",
    name: "Priya Sundaram",
    email: "priya@example.com",
    designation: "Frontend Developer",
    department: "Engineering",
    month: "April",
    year: "2026",
    dateOfJoining: "10 Jul 2024",
    bankName: "Axis Bank",
    accountNo: "••••••••3421",
    ifsc: "UTIB0002134",
    pan: "CRTPS4491H",
    uan: "100982341211",
    workingDays: 30,
    paidDays: 30,
    lopDays: 0,
    basic: 38000,
    hra: 15200,
    specialAllowance: 8000,
    conveyance: 2000,
    bonus: 3000,
    pf: 3200,
    pt: 200,
    tds: 2400,
    insurance: 800,
    lop: 0,
    status: "Disbursed",
  },
  {
    id: "PS-2026-0404",
    empCode: "EMP-1012",
    name: "Devendra Patel",
    email: "devendra@example.com",
    designation: "DevOps Engineer",
    department: "Infrastructure",
    month: "April",
    year: "2026",
    dateOfJoining: "01 Nov 2023",
    bankName: "State Bank of India",
    accountNo: "••••••••9103",
    ifsc: "SBIN0004521",
    pan: "DMNPE9923K",
    uan: "100982341212",
    workingDays: 30,
    paidDays: 30,
    lopDays: 0,
    basic: 48000,
    hra: 19200,
    specialAllowance: 12000,
    conveyance: 2500,
    bonus: 4000,
    pf: 4000,
    pt: 200,
    tds: 4600,
    insurance: 1000,
    lop: 0,
    status: "Draft",
  },
];

function calculateTotals(item: EmployeePayslip) {
  const gross =
    (item.basic || 0) +
    (item.hra || 0) +
    (item.specialAllowance || 0) +
    (item.conveyance || 0) +
    (item.bonus || 0);

  const deductions =
    (item.pf || 0) +
    (item.pt || 0) +
    (item.tds || 0) +
    (item.insurance || 0) +
    (item.lop || 0);

  const net = gross - deductions;
  return { gross, deductions, net };
}

function numberToWordsINR(amount: number): string {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (amount === 0) return "Zero Rupees Only";

  function convertTwoDigits(n: number) {
    if (n < 20) return ones[n];
    const unit = n % 10;
    return tens[Math.floor(n / 10)] + (unit ? " " + ones[unit] : "");
  }

  function convertThreeDigits(n: number) {
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;
    let str = "";
    if (hundred) str += ones[hundred] + " Hundred";
    if (remainder) str += (str ? " and " : "") + convertTwoDigits(remainder);
    return str;
  }

  let words = "";
  const crore = Math.floor(amount / 10000000);
  let rem = amount % 10000000;
  const lakh = Math.floor(rem / 100000);
  rem = rem % 100000;
  const thousand = Math.floor(rem / 1000);
  rem = rem % 1000;
  const rest = rem;

  if (crore) words += convertTwoDigits(crore) + " Crore ";
  if (lakh) words += convertTwoDigits(lakh) + " Lakh ";
  if (thousand) words += convertTwoDigits(thousand) + " Thousand ";
  if (rest) words += convertThreeDigits(rest);

  return words.trim() + " Rupees Only";
}

export default function PayslipPage() {
  const [payslips, setPayslips] = useState<EmployeePayslip[]>(initialPayslips);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPayslip, setSelectedPayslip] = useState<EmployeePayslip | null>(
    null
  );
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  // New payslip form state
  const [formData, setFormData] = useState<Partial<EmployeePayslip>>({
    empCode: "EMP-" + (1000 + payslips.length + 1),
    name: "",
    email: "",
    designation: "Software Engineer",
    department: "Engineering",
    month: "April",
    year: "2026",
    dateOfJoining: "01 Jan 2024",
    bankName: "HDFC Bank",
    accountNo: "••••••••5512",
    ifsc: "HDFC0001020",
    pan: "ABCDE9999Z",
    uan: "100982341299",
    workingDays: 30,
    paidDays: 30,
    lopDays: 0,
    basic: 40000,
    hra: 16000,
    specialAllowance: 8000,
    conveyance: 2000,
    bonus: 0,
    pf: 3600,
    pt: 200,
    tds: 2500,
    insurance: 800,
    lop: 0,
    status: "Generated",
  });

  const filteredPayslips = payslips.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDisbursed = payslips.reduce(
    (acc, cur) => acc + calculateTotals(cur).net,
    0
  );

  const handleCreatePayslip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newRecord: EmployeePayslip = {
      id: `PS-2026-${String(payslips.length + 1).padStart(4, "0")}`,
      empCode: formData.empCode || `EMP-${1000 + payslips.length + 1}`,
      name: formData.name,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, ".")}@company.com`,
      designation: formData.designation || "Engineer",
      department: formData.department || "General",
      month: formData.month || "April",
      year: formData.year || "2026",
      dateOfJoining: formData.dateOfJoining || "01 Jan 2024",
      bankName: formData.bankName || "HDFC Bank",
      accountNo: formData.accountNo || "••••••••1234",
      ifsc: formData.ifsc || "HDFC0001234",
      pan: formData.pan || "XXXXX0000X",
      uan: formData.uan || "100000000000",
      workingDays: Number(formData.workingDays) || 30,
      paidDays: Number(formData.paidDays) || 30,
      lopDays: Number(formData.lopDays) || 0,
      basic: Number(formData.basic) || 0,
      hra: Number(formData.hra) || 0,
      specialAllowance: Number(formData.specialAllowance) || 0,
      conveyance: Number(formData.conveyance) || 0,
      bonus: Number(formData.bonus) || 0,
      pf: Number(formData.pf) || 0,
      pt: Number(formData.pt) || 0,
      tds: Number(formData.tds) || 0,
      insurance: Number(formData.insurance) || 0,
      lop: Number(formData.lop) || 0,
      status: (formData.status as "Disbursed" | "Generated" | "Draft") || "Generated",
    };

    setPayslips([newRecord, ...payslips]);
    setIsGenerateOpen(false);
    setSelectedPayslip(newRecord);
  };

  const currentTotals = formData.name
    ? calculateTotals(formData as EmployeePayslip)
    : { gross: 0, deductions: 0, net: 0 };

  return (
    <div className="space-y-6">
      {/* Top Header with Quick Stats */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Payslips & Salary Statements
          </h1>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            Generate, customize, preview, and export official employee payslips
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsGenerateOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-accent to-accent-strong px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110 active:scale-95 sm:text-sm"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Generate Payslip
          </button>
        </div>
      </section>

      {/* Overview Stat Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <p className="text-xs text-white/50">Total Disbursed (Month)</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-white">
              ₹{totalDisbursed.toLocaleString("en-IN")}
            </p>
            <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs text-success">
              +6.4%
            </span>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <p className="text-xs text-white/50">Payslips Processed</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-white">
              {payslips.length}{" "}
              <span className="text-xs font-normal text-white/40">records</span>
            </p>
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
              Active
            </span>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <p className="text-xs text-white/50">Average Net Salary</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-white">
              ₹
              {Math.round(totalDisbursed / (payslips.length || 1)).toLocaleString(
                "en-IN"
              )}
            </p>
            <span className="text-xs text-white/40">Per Emp</span>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <p className="text-xs text-white/50">Pending Approvals</p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-bold text-warning">
              {payslips.filter((p) => p.status === "Draft").length}
            </p>
            <span className="rounded-full bg-warning/10 px-2.5 py-0.5 text-xs text-warning">
              Drafts
            </span>
          </div>
        </article>
      </section>

      {/* Main Records Section */}
      <section className="rounded-3xl border border-white/10 bg-surface/85 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-6">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Generated Payslips List
            </h2>
            <p className="text-xs text-white/50">
              Click on any payslip to view, print, or download PDF format
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, ID, or dept..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-w-[240px] rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 pl-9 text-xs text-white outline-none placeholder:text-white/30 focus:border-accent/60"
              />
              <svg
                className="absolute left-3 top-2.5 h-3.5 w-3.5 text-white/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Payslips Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 uppercase tracking-wider">
                <th className="py-3.5 px-3">Slip ID</th>
                <th className="py-3.5 px-3">Employee</th>
                <th className="py-3.5 px-3">Period</th>
                <th className="py-3.5 px-3">Gross</th>
                <th className="py-3.5 px-3">Deductions</th>
                <th className="py-3.5 px-3">Net Pay</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPayslips.map((item) => {
                const { gross, deductions, net } = calculateTotals(item);
                return (
                  <tr
                    key={item.id}
                    className="group transition hover:bg-white/[0.03]"
                  >
                    <td className="py-3.5 px-3 font-mono font-medium text-accent">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-3">
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-[11px] text-white/45">
                        {item.empCode} • {item.designation}
                      </p>
                    </td>
                    <td className="py-3.5 px-3 text-white/70">
                      {item.month} {item.year}
                    </td>
                    <td className="py-3.5 px-3 text-white/70">
                      ₹{gross.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-3 text-danger/80">
                      -₹{deductions.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-white">
                      ₹{net.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          item.status === "Disbursed"
                            ? "bg-success/15 text-success"
                            : item.status === "Generated"
                            ? "bg-accent/15 text-accent"
                            : "bg-warning/15 text-warning"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedPayslip(item)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
                      >
                        <svg className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Slip
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredPayslips.length === 0 && (
            <div className="py-12 text-center text-xs text-white/40">
              No payslips found matching your search.
            </div>
          )}
        </div>
      </section>

      {/* Modal: Generate New Payslip */}
      {isGenerateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 rounded-3xl border border-white/10 bg-surface p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Create Employee Payslip
                </h3>
                <p className="text-xs text-white/50">
                  Fill in employee salary particulars to compute and generate slip
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsGenerateOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 p-1.5 text-white/60 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreatePayslip} className="mt-4 space-y-4">
              {/* Employee Info Grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-white/60">Employee Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/60">Designation / Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Backend Lead"
                    value={formData.designation || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/60">Department</label>
                  <input
                    type="text"
                    placeholder="e.g. Engineering"
                    value={formData.department || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-white/60">Pay Month & Year</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={formData.month || "April"}
                      onChange={(e) =>
                        setFormData({ ...formData, month: e.target.value })
                      }
                      className="rounded-xl border border-white/10 bg-surface-strong px-2 py-2 text-xs text-white outline-none"
                    >
                      {[
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={formData.year || "2026"}
                      onChange={(e) =>
                        setFormData({ ...formData, year: e.target.value })
                      }
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                    />
                  </div>
                </div>
              </div>

              {/* Earnings vs Deductions */}
              <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-white/10">
                {/* Earnings */}
                <div className="space-y-2 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5">
                  <p className="text-xs font-semibold text-accent">
                    Earnings Components (₹)
                  </p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[11px] text-white/50">Basic Salary</span>
                      <input
                        type="number"
                        value={formData.basic || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            basic: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-white/50">HRA</span>
                      <input
                        type="number"
                        value={formData.hra || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hra: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-white/50">Special Allowance</span>
                      <input
                        type="number"
                        value={formData.specialAllowance || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            specialAllowance: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-white/50">Performance Bonus</span>
                      <input
                        type="number"
                        value={formData.bonus || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            bonus: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div className="space-y-2 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5">
                  <p className="text-xs font-semibold text-danger">
                    Deductions Components (₹)
                  </p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[11px] text-white/50">Provident Fund (PF)</span>
                      <input
                        type="number"
                        value={formData.pf || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pf: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-white/50">Professional Tax (PT)</span>
                      <input
                        type="number"
                        value={formData.pt || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pt: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-white/50">Income Tax (TDS)</span>
                      <input
                        type="number"
                        value={formData.tds || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tds: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-white/50">Insurance / Other</span>
                      <input
                        type="number"
                        value={formData.insurance || 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            insurance: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculated Summary Bar */}
              <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] p-3 text-xs">
                <span className="text-white/60">Estimated Net Salary:</span>
                <span className="text-base font-bold text-success">
                  ₹{currentTotals.net.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGenerateOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-accent to-accent-strong px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-accent/20 hover:brightness-110"
                >
                  Create & View Payslip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Official Printable A4 Payslip Viewer */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 sm:p-6 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto rounded-3xl border border-white/15 bg-surface p-5 sm:p-8 shadow-2xl backdrop-blur-2xl">
            {/* Modal Controls Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-success shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                <h3 className="text-sm font-semibold text-white">
                  Official Payslip Preview — {selectedPayslip.id}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-accent-strong px-3.5 py-1.5 text-xs font-medium text-white shadow-md shadow-accent/20 hover:brightness-110"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print / Save PDF
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPayslip(null)}
                  className="rounded-xl border border-white/10 bg-white/5 p-1.5 text-white/60 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Printable Document Sheet */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7 text-white/90">
              {/* Company Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-strong text-xs font-bold text-white">
                      PI
                    </div>
                    <h2 className="text-base font-bold text-white tracking-tight">
                      PAYSLIP PRO TECH PVT. LTD.
                    </h2>
                  </div>
                  <p className="mt-1 text-[11px] text-white/50">
                    Plot No. 42, Cyber City Tech Hub, Bengaluru - 560100
                  </p>
                  <p className="text-[11px] text-white/50">
                    CIN: U72200KA2023PTC128492 • support@payslip.in
                  </p>
                </div>

                <div className="text-right">
                  <span className="rounded-md border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent uppercase">
                    Payslip
                  </span>
                  <p className="mt-2 text-xs font-semibold text-white">
                    {selectedPayslip.month.toUpperCase()} {selectedPayslip.year}
                  </p>
                  <p className="text-[10px] text-white/40">
                    Ref: {selectedPayslip.id}
                  </p>
                </div>
              </div>

              {/* Employee & Bank Info Grid */}
              <div className="grid grid-cols-2 gap-4 border-b border-white/10 py-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex">
                    <span className="w-28 text-white/45">Employee Name</span>
                    <span className="font-semibold text-white">
                      : {selectedPayslip.name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-white/45">Employee ID</span>
                    <span className="text-white">: {selectedPayslip.empCode}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-white/45">Designation</span>
                    <span className="text-white">: {selectedPayslip.designation}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-white/45">Department</span>
                    <span className="text-white">: {selectedPayslip.department}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-white/45">Date of Joining</span>
                    <span className="text-white">: {selectedPayslip.dateOfJoining}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex">
                    <span className="w-28 text-white/45">Bank Name</span>
                    <span className="text-white">: {selectedPayslip.bankName}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-white/45">Bank A/C No.</span>
                    <span className="text-white">: {selectedPayslip.accountNo}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-white/45">IFSC Code</span>
                    <span className="text-white">: {selectedPayslip.ifsc}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-white/45">PAN Number</span>
                    <span className="text-white">: {selectedPayslip.pan}</span>
                  </div>
                  <div className="flex">
                    <span className="w-28 text-white/45">Days Paid / Total</span>
                    <span className="text-white">
                      : {selectedPayslip.paidDays} / {selectedPayslip.workingDays}
                    </span>
                  </div>
                </div>
              </div>

              {/* Earnings & Deductions Tables Side-by-Side */}
              {(() => {
                const { gross, deductions, net } = calculateTotals(selectedPayslip);
                return (
                  <div>
                    <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10 text-xs">
                      {/* Earnings */}
                      <div className="pr-3 py-3 space-y-1.5">
                        <div className="flex justify-between border-b border-white/10 pb-1.5 font-semibold text-accent uppercase text-[11px]">
                          <span>Earnings Particulars</span>
                          <span>Amount (₹)</span>
                        </div>
                        <div className="flex justify-between text-white/75">
                          <span>Basic Salary</span>
                          <span>₹{selectedPayslip.basic.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-white/75">
                          <span>House Rent Allowance (HRA)</span>
                          <span>₹{selectedPayslip.hra.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-white/75">
                          <span>Special Allowance</span>
                          <span>
                            ₹{selectedPayslip.specialAllowance.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex justify-between text-white/75">
                          <span>Conveyance Allowance</span>
                          <span>
                            ₹{selectedPayslip.conveyance.toLocaleString("en-IN")}
                          </span>
                        </div>
                        {selectedPayslip.bonus > 0 && (
                          <div className="flex justify-between text-white/75">
                            <span>Bonus / Incentive</span>
                            <span>
                              ₹{selectedPayslip.bonus.toLocaleString("en-IN")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Deductions */}
                      <div className="pl-3 py-3 space-y-1.5">
                        <div className="flex justify-between border-b border-white/10 pb-1.5 font-semibold text-danger uppercase text-[11px]">
                          <span>Deductions Particulars</span>
                          <span>Amount (₹)</span>
                        </div>
                        <div className="flex justify-between text-white/75">
                          <span>Provident Fund (PF)</span>
                          <span>₹{selectedPayslip.pf.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-white/75">
                          <span>Professional Tax (PT)</span>
                          <span>₹{selectedPayslip.pt.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-white/75">
                          <span>Income Tax (TDS)</span>
                          <span>₹{selectedPayslip.tds.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-white/75">
                          <span>Health Insurance</span>
                          <span>
                            ₹{selectedPayslip.insurance.toLocaleString("en-IN")}
                          </span>
                        </div>
                        {selectedPayslip.lop > 0 && (
                          <div className="flex justify-between text-white/75">
                            <span>Loss of Pay (LOP)</span>
                            <span>
                              ₹{selectedPayslip.lop.toLocaleString("en-IN")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sub Totals */}
                    <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10 py-2.5 text-xs font-semibold">
                      <div className="flex justify-between pr-3 text-white">
                        <span>Total Gross Earnings</span>
                        <span>₹{gross.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between pl-3 text-white">
                        <span>Total Deductions</span>
                        <span className="text-danger">
                          ₹{deductions.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    {/* Net Pay Highlight Banner */}
                    <div className="my-4 rounded-xl border border-success/30 bg-success/10 p-3.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white uppercase tracking-wider">
                          Net Take-Home Salary:
                        </span>
                        <span className="text-lg font-bold text-success">
                          ₹{net.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-white/60">
                        <span className="font-medium text-white/80">In Words:</span>{" "}
                        {numberToWordsINR(net)}
                      </p>
                    </div>

                    {/* Signature & Disclaimer */}
                    <div className="flex items-end justify-between pt-4 text-[11px] text-white/40">
                      <div>
                        <p>This is a computer-generated payslip</p>
                        <p>No physical signature is required.</p>
                      </div>
                      <div className="text-center">
                        <div className="h-9 border-b border-dashed border-white/20 w-36" />
                        <p className="mt-1 font-medium text-white/60">
                          Authorized Signatory
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
