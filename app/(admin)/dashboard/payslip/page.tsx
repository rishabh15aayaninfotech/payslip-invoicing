"use client";

import { useState } from "react";

type TemplateType = "Corporate" | "Minimal" | "Executive" | "Startup";

interface TemplateOption {
  id: TemplateType;
  name: string;
  badge: string;
  color: string;
  gradient: string;
}

const templateOptions: TemplateOption[] = [
  {
    id: "Corporate",
    name: "Corporate Classic",
    badge: "Formal Blue",
    color: "#3b82f6",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    id: "Minimal",
    name: "Minimalist Modern",
    badge: "Clean Slate",
    color: "#94a3b8",
    gradient: "from-slate-400 to-zinc-500",
  },
  {
    id: "Executive",
    name: "Executive Premium",
    badge: "Emerald Gold",
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "Startup",
    name: "Tech Startup",
    badge: "Purple Cards",
    color: "#8b5cf6",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
];

interface PayslipData {
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
  // Field toggles
  showLogo: boolean;
  showCompanyAddress: boolean;
  showPanUan: boolean;
  showBankDetails: boolean;
  showAttendance: boolean;
  showAmountInWords: boolean;
  showSignatory: boolean;
  showQrCode: boolean;
  notes: string;
  status: "Disbursed" | "Generated" | "Draft";
}

const samplePresets: PayslipData[] = [
  {
    id: "PS-2026-0401",
    companyName: "PAYSLIP PRO TECH PVT. LTD.",
    companyAddress: "Plot No. 42, Cyber City Tech Hub, Bengaluru - 560100",
    cin: "CIN: U72200KA2023PTC128492",
    gstin: "GSTIN: 29AAACP0124M1ZR",
    empCode: "EMP-1001",
    empName: "Rishabh Sharma",
    email: "rishabh@example.com",
    designation: "Lead Fullstack Engineer",
    department: "Engineering",
    month: "April",
    year: "2026",
    dateOfJoining: "15 Jan 2023",
    bankName: "HDFC Bank Ltd.",
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
    showLogo: true,
    showCompanyAddress: true,
    showPanUan: true,
    showBankDetails: true,
    showAttendance: true,
    showAmountInWords: true,
    showSignatory: true,
    showQrCode: true,
    notes:
      "This is a computer-generated payslip authorized by finance. No physical signature required.",
    status: "Disbursed",
  },
  {
    id: "PS-2026-0402",
    companyName: "PAYSLIP PRO TECH PVT. LTD.",
    companyAddress: "Plot No. 42, Cyber City Tech Hub, Bengaluru - 560100",
    cin: "CIN: U72200KA2023PTC128492",
    gstin: "GSTIN: 29AAACP0124M1ZR",
    empCode: "EMP-1004",
    empName: "Aarav Mehta",
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
    showLogo: true,
    showCompanyAddress: true,
    showPanUan: true,
    showBankDetails: true,
    showAttendance: true,
    showAmountInWords: true,
    showSignatory: true,
    showQrCode: false,
    notes:
      "Confidential salary statement. For payroll queries, contact finance@payslip.in.",
    status: "Generated",
  },
  {
    id: "PS-2026-0403",
    companyName: "PAYSLIP PRO TECH PVT. LTD.",
    companyAddress: "Plot No. 42, Cyber City Tech Hub, Bengaluru - 560100",
    cin: "CIN: U72200KA2023PTC128492",
    gstin: "GSTIN: 29AAACP0124M1ZR",
    empCode: "EMP-1008",
    empName: "Priya Sundaram",
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
    showLogo: true,
    showCompanyAddress: true,
    showPanUan: true,
    showBankDetails: true,
    showAttendance: true,
    showAmountInWords: true,
    showSignatory: true,
    showQrCode: true,
    notes:
      "Direct deposit voucher. Tax computed under new simplified tax regime.",
    status: "Disbursed",
  },
];

function calculateTotals(data: PayslipData) {
  const gross =
    (Number(data.basic) || 0) +
    (Number(data.hra) || 0) +
    (Number(data.specialAllowance) || 0) +
    (Number(data.conveyance) || 0) +
    (Number(data.bonus) || 0);

  const deductions =
    (Number(data.pf) || 0) +
    (Number(data.pt) || 0) +
    (Number(data.tds) || 0) +
    (Number(data.insurance) || 0) +
    (Number(data.lop) || 0);

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

  if (amount <= 0) return "Zero Rupees Only";

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
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("Corporate");
  const [formData, setFormData] = useState<PayslipData>(samplePresets[0]);
  const [savedRecords, setSavedRecords] = useState<PayslipData[]>(samplePresets);
  const [activeTab, setActiveTab] = useState<"Particulars" | "Salary" | "Settings">("Particulars");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { gross, deductions, net } = calculateTotals(formData);

  const handlePresetSelect = (empId: string) => {
    const found = samplePresets.find((p) => p.id === empId);
    if (found) {
      setFormData({ ...found });
    } else {
      // New blank form
      setFormData({
        ...samplePresets[0],
        id: `PS-2026-${String(savedRecords.length + 1).padStart(4, "0")}`,
        empCode: `EMP-${1000 + savedRecords.length + 1}`,
        empName: "",
        designation: "Software Engineer",
        department: "Engineering",
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
      });
    }
  };

  const handleSaveRecord = () => {
    const exists = savedRecords.find((r) => r.id === formData.id);
    if (exists) {
      setSavedRecords(savedRecords.map((r) => (r.id === formData.id ? { ...formData } : r)));
    } else {
      setSavedRecords([formData, ...savedRecords]);
    }
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center no-print">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Payslip Studio & Generator
          </h1>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            Fill details on the left, select layout, and view live printable preview with instant export on the right
          </p>
        </div>

        {/* Quick Presets & Print Action */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/50">Load Employee:</span>
            <select
              value={formData.id}
              onChange={(e) => handlePresetSelect(e.target.value)}
              className="rounded-xl border border-white/10 bg-surface-strong px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
            >
              {samplePresets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.empName} ({p.empCode})
                </option>
              ))}
              <option value="NEW">+ Create New Employee</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-strong px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-accent/20 transition hover:brightness-110 active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / PDF
          </button>
        </div>
      </section>

      {/* Main Split Grid */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Controls, Template Selector & Input Form (5 cols)            */}
        {/* ========================================================================= */}
        <div className="space-y-5 lg:col-span-5 no-print">
          {/* Template Selector Cards */}
          <div className="rounded-3xl border border-white/10 bg-surface/90 p-5 backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-white uppercase tracking-wider">
                1. Select Payslip Template
              </label>
              <span className="text-[11px] text-accent font-medium">
                {selectedTemplate} Layout Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {templateOptions.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`flex flex-col items-start rounded-2xl border p-3 text-left transition-all duration-200 ${
                      isSelected
                        ? "border-accent bg-accent/15 shadow-md shadow-accent/10 ring-1 ring-accent"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: tpl.color }}
                      />
                      <span className="text-[10px] text-white/40">{tpl.badge}</span>
                    </div>
                    <p className="mt-2 text-xs font-semibold text-white">{tpl.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Tabs & Inputs */}
          <div className="rounded-3xl border border-white/10 bg-surface/90 p-5 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <label className="text-xs font-semibold text-white uppercase tracking-wider">
                2. Fill Salary Particulars
              </label>

              {/* Sub Tabs */}
              <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1 text-[11px]">
                {(["Particulars", "Salary", "Settings"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-lg px-2.5 py-1 font-medium transition ${
                      activeTab === tab
                        ? "bg-white text-slate-950 shadow-sm"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB 1: Employee & Bank Particulars */}
            {activeTab === "Particulars" && (
              <div className="mt-4 space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/60">Employee Full Name *</span>
                    <input
                      type="text"
                      value={formData.empName}
                      onChange={(e) => setFormData({ ...formData, empName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/60">Employee Code</span>
                    <input
                      type="text"
                      value={formData.empCode}
                      onChange={(e) => setFormData({ ...formData, empCode: e.target.value })}
                      placeholder="EMP-1001"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/60">Designation / Role</span>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="Lead Engineer"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/60">Department</span>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      placeholder="Engineering"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/60">Pay Month & Year</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <select
                        value={formData.month}
                        onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                        className="rounded-xl border border-white/10 bg-surface-strong px-2 py-2 text-xs text-white outline-none"
                      >
                        {[
                          "January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December",
                        ].map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/60">Date of Joining</span>
                    <input
                      type="text"
                      value={formData.dateOfJoining}
                      onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                      placeholder="15 Jan 2023"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 space-y-3">
                  <p className="font-semibold text-white/80 text-[11px]">Bank & Tax IDs</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] text-white/50">Bank Name</span>
                      <input
                        type="text"
                        value={formData.bankName}
                        onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] text-white/50">Bank A/C No.</span>
                      <input
                        type="text"
                        value={formData.accountNo}
                        onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-[11px] text-white/50">PAN Number</span>
                      <input
                        type="text"
                        value={formData.pan}
                        onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[11px] text-white/50">UAN / PF Number</span>
                      <input
                        type="text"
                        value={formData.uan}
                        onChange={(e) => setFormData({ ...formData, uan: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Salary & Attendance Breakdown */}
            {activeTab === "Salary" && (
              <div className="mt-4 space-y-4 text-xs">
                {/* Attendance */}
                <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/[0.03] p-3 border border-white/5">
                  <div>
                    <span className="text-[10px] text-white/50">Total Days</span>
                    <input
                      type="number"
                      value={formData.workingDays}
                      onChange={(e) => setFormData({ ...formData, workingDays: Number(e.target.value) || 0 })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-2 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50">Days Paid</span>
                    <input
                      type="number"
                      value={formData.paidDays}
                      onChange={(e) => setFormData({ ...formData, paidDays: Number(e.target.value) || 0 })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-2 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50">LOP Days</span>
                    <input
                      type="number"
                      value={formData.lopDays}
                      onChange={(e) => setFormData({ ...formData, lopDays: Number(e.target.value) || 0 })}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-2 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                {/* Earnings vs Deductions */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Earnings */}
                  <div className="space-y-2 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-3">
                    <p className="font-semibold text-blue-400 text-[11px]">Earnings (₹)</p>
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-[10px] text-white/50">Basic Salary</span>
                        <input
                          type="number"
                          value={formData.basic}
                          onChange={(e) => setFormData({ ...formData, basic: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50">HRA</span>
                        <input
                          type="number"
                          value={formData.hra}
                          onChange={(e) => setFormData({ ...formData, hra: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50">Special Allowance</span>
                        <input
                          type="number"
                          value={formData.specialAllowance}
                          onChange={(e) => setFormData({ ...formData, specialAllowance: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50">Conveyance</span>
                        <input
                          type="number"
                          value={formData.conveyance}
                          onChange={(e) => setFormData({ ...formData, conveyance: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50">Performance Bonus</span>
                        <input
                          type="number"
                          value={formData.bonus}
                          onChange={(e) => setFormData({ ...formData, bonus: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div className="space-y-2 rounded-2xl border border-red-500/20 bg-red-500/5 p-3">
                    <p className="font-semibold text-red-400 text-[11px]">Deductions (₹)</p>
                    <div className="space-y-1.5">
                      <div>
                        <span className="text-[10px] text-white/50">Provident Fund (PF)</span>
                        <input
                          type="number"
                          value={formData.pf}
                          onChange={(e) => setFormData({ ...formData, pf: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50">Professional Tax (PT)</span>
                        <input
                          type="number"
                          value={formData.pt}
                          onChange={(e) => setFormData({ ...formData, pt: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50">Income Tax (TDS)</span>
                        <input
                          type="number"
                          value={formData.tds}
                          onChange={(e) => setFormData({ ...formData, tds: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50">Health Insurance</span>
                        <input
                          type="number"
                          value={formData.insurance}
                          onChange={(e) => setFormData({ ...formData, insurance: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-white/50">Loss of Pay (LOP)</span>
                        <input
                          type="number"
                          value={formData.lop}
                          onChange={(e) => setFormData({ ...formData, lop: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Quick Bar */}
                <div className="flex items-center justify-between rounded-xl bg-white/[0.04] p-3 text-xs">
                  <span className="text-white/60">Live Net Computed Pay:</span>
                  <span className="text-base font-bold text-success">
                    ₹{net.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: Field Toggles & Settings */}
            {activeTab === "Settings" && (
              <div className="mt-4 space-y-3 text-xs">
                <p className="font-semibold text-white/80 text-[11px]">Show / Hide Sections</p>
                <div className="space-y-2">
                  {[
                    { key: "showLogo", label: "Company Logo & Header" },
                    { key: "showCompanyAddress", label: "Address & Registration CIN/GSTIN" },
                    { key: "showPanUan", label: "PAN & UAN / PF Numbers" },
                    { key: "showBankDetails", label: "Bank Account & IFSC" },
                    { key: "showAttendance", label: "Attendance & Days Statistics" },
                    { key: "showAmountInWords", label: "Net Amount in Words" },
                    { key: "showSignatory", label: "Authorized Signatory Box" },
                    { key: "showQrCode", label: "Digital Verification QR Stamp" },
                  ].map(({ key, label }) => {
                    const fieldKey = key as keyof PayslipData;
                    return (
                      <label
                        key={key}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 cursor-pointer hover:bg-white/[0.04]"
                      >
                        <span className="text-white/75">{label}</span>
                        <input
                          type="checkbox"
                          checked={Boolean(formData[fieldKey])}
                          onChange={(e) =>
                            setFormData({ ...formData, [fieldKey]: e.target.checked })
                          }
                          className="h-4 w-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent accent-accent"
                        />
                      </label>
                    );
                  })}
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-[11px] text-white/60">Custom Declaration Note</span>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            )}

            {/* Save & Reset Actions */}
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
              <button
                type="button"
                onClick={() => handlePresetSelect(formData.id)}
                className="text-white/50 hover:text-white transition"
              >
                Reset to Default
              </button>

              <button
                type="button"
                onClick={handleSaveRecord}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 border border-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 active:scale-95 transition"
              >
                {saveSuccess ? (
                  <span className="text-success font-semibold">✓ Saved to Records</span>
                ) : (
                  <span>Save to Records</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Live Interactive A4 Preview (7 cols)                       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-4">
          {/* Live Preview Card Header */}
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface/90 px-4 py-3 shadow-lg no-print">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              <span className="text-xs font-semibold text-white">Live A4 Document Preview</span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                {selectedTemplate}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-accent-strong px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-accent/20 hover:brightness-110 active:scale-95"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Download / Print PDF
              </button>
            </div>
          </div>

          {/* Printable Payslip A4 Sheet */}
          <div
            id="printable-payslip"
            className="relative rounded-3xl border border-white/15 bg-surface/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-white/90 transition-all duration-300 min-h-[600px]"
          >
            {/* ------------------------------------------------------------- */}
            {/* 1. CORPORATE CLASSIC LAYOUT                                    */}
            {/* ------------------------------------------------------------- */}
            {selectedTemplate === "Corporate" && (
              <div className="space-y-4 text-xs">
                {/* Header */}
                <div className="flex items-start justify-between border-b-2 border-blue-500/40 pb-4">
                  <div>
                    {formData.showLogo && (
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white">
                          PI
                        </div>
                        <h2 className="text-base font-bold tracking-tight text-white">
                          {formData.companyName}
                        </h2>
                      </div>
                    )}
                    {formData.showCompanyAddress && (
                      <div className="mt-1 text-[11px] text-white/50 space-y-0.5">
                        <p>{formData.companyAddress}</p>
                        <p>{formData.cin} • {formData.gstin}</p>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="rounded border border-blue-500/40 bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-400 uppercase">
                      Salary Slip
                    </span>
                    <p className="mt-2 font-semibold text-white">
                      {formData.month.toUpperCase()} {formData.year}
                    </p>
                    <p className="text-[10px] text-white/40">Ref: {formData.id}</p>
                  </div>
                </div>

                {/* Employee & Bank Info */}
                <div className="grid grid-cols-2 gap-4 border-b border-white/10 py-3">
                  <div className="space-y-1.5">
                    <div className="flex">
                      <span className="w-28 text-white/45">Employee Name</span>
                      <span className="font-semibold text-white">: {formData.empName || "—"}</span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-white/45">Employee Code</span>
                      <span className="text-white">: {formData.empCode}</span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-white/45">Designation</span>
                      <span className="text-white">: {formData.designation}</span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-white/45">Department</span>
                      <span className="text-white">: {formData.department}</span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-white/45">Date of Joining</span>
                      <span className="text-white">: {formData.dateOfJoining}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {formData.showBankDetails && (
                      <>
                        <div className="flex">
                          <span className="w-28 text-white/45">Bank Name</span>
                          <span className="text-white">: {formData.bankName}</span>
                        </div>
                        <div className="flex">
                          <span className="w-28 text-white/45">Bank A/C No.</span>
                          <span className="text-white">: {formData.accountNo}</span>
                        </div>
                        <div className="flex">
                          <span className="w-28 text-white/45">IFSC Code</span>
                          <span className="text-white">: {formData.ifsc}</span>
                        </div>
                      </>
                    )}
                    {formData.showPanUan && (
                      <div className="flex">
                        <span className="w-28 text-white/45">PAN / UAN</span>
                        <span className="text-white">: {formData.pan} / {formData.uan}</span>
                      </div>
                    )}
                    {formData.showAttendance && (
                      <div className="flex">
                        <span className="w-28 text-white/45">Days Paid</span>
                        <span className="text-white">
                          : {formData.paidDays} / {formData.workingDays}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Earnings vs Deductions Table */}
                <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10">
                  <div className="pr-3 py-2 space-y-1.5">
                    <div className="flex justify-between font-semibold text-blue-400 uppercase text-[11px] border-b border-white/10 pb-1">
                      <span>Earnings Particulars</span>
                      <span>Amount (₹)</span>
                    </div>
                    <div className="flex justify-between text-white/75">
                      <span>Basic Salary</span>
                      <span>₹{(Number(formData.basic) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-white/75">
                      <span>House Rent Allowance (HRA)</span>
                      <span>₹{(Number(formData.hra) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-white/75">
                      <span>Special Allowance</span>
                      <span>₹{(Number(formData.specialAllowance) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-white/75">
                      <span>Conveyance Allowance</span>
                      <span>₹{(Number(formData.conveyance) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    {Number(formData.bonus) > 0 && (
                      <div className="flex justify-between text-white/75">
                        <span>Performance Bonus</span>
                        <span>₹{Number(formData.bonus).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>

                  <div className="pl-3 py-2 space-y-1.5">
                    <div className="flex justify-between font-semibold text-red-400 uppercase text-[11px] border-b border-white/10 pb-1">
                      <span>Deductions Particulars</span>
                      <span>Amount (₹)</span>
                    </div>
                    <div className="flex justify-between text-white/75">
                      <span>Provident Fund (PF)</span>
                      <span>₹{(Number(formData.pf) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-white/75">
                      <span>Professional Tax (PT)</span>
                      <span>₹{(Number(formData.pt) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-white/75">
                      <span>Income Tax (TDS)</span>
                      <span>₹{(Number(formData.tds) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-white/75">
                      <span>Health Insurance</span>
                      <span>₹{(Number(formData.insurance) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    {Number(formData.lop) > 0 && (
                      <div className="flex justify-between text-white/75">
                        <span>Loss of Pay (LOP)</span>
                        <span>₹{Number(formData.lop).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtotals & Net Pay */}
                <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10 py-2 font-semibold">
                  <div className="flex justify-between pr-3 text-white">
                    <span>Total Gross Earnings</span>
                    <span>₹{gross.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between pl-3 text-red-400">
                    <span>Total Deductions</span>
                    <span>₹{deductions.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3.5 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-white uppercase">Net Take-Home Salary:</span>
                    {formData.showAmountInWords && (
                      <p className="text-[11px] text-white/60 mt-0.5">
                        <span className="text-white/80">In Words:</span> {numberToWordsINR(net)}
                      </p>
                    )}
                  </div>
                  <span className="text-lg font-bold text-blue-400">₹{net.toLocaleString("en-IN")}</span>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end pt-3 text-[11px] text-white/45">
                  <p className="max-w-xs">{formData.notes}</p>
                  {formData.showSignatory && (
                    <div className="text-center">
                      <div className="h-8 border-b border-dashed border-white/20 w-32" />
                      <p className="mt-1 font-medium text-white/60">Authorized Signatory</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 2. MINIMALIST MODERN LAYOUT                                    */}
            {/* ------------------------------------------------------------- */}
            {selectedTemplate === "Minimal" && (
              <div className="space-y-5 text-xs font-sans">
                <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-white">
                      {formData.companyName}
                    </h2>
                    {formData.showCompanyAddress && (
                      <p className="text-[11px] text-white/45">{formData.companyAddress}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-semibold text-white">
                      {formData.month.toUpperCase()} {formData.year}
                    </p>
                    <p className="text-[10px] text-white/40">{formData.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">Employee</p>
                    <p className="font-medium text-white">{formData.empName || "—"}</p>
                    <p className="text-[11px] text-white/50">{formData.empCode}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">Role / Dept</p>
                    <p className="font-medium text-white">{formData.designation}</p>
                    <p className="text-[11px] text-white/50">{formData.department}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">Bank A/C</p>
                    <p className="font-mono text-white">{formData.accountNo}</p>
                    <p className="text-[11px] text-white/50">{formData.bankName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">PAN Number</p>
                    <p className="font-mono text-white">{formData.pan}</p>
                    <p className="text-[11px] text-white/50">Tax ID</p>
                  </div>
                </div>

                <div className="border-t border-b border-white/10 py-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-white/70">
                      <span>Gross Earnings (Basic, HRA, Allowances, Bonus)</span>
                      <span className="font-mono text-white">₹{gross.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Total Statutory & Tax Deductions (PF, PT, TDS)</span>
                      <span className="font-mono text-red-400">-₹{deductions.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border border-white/20 bg-white/5 px-4 py-3 rounded-2xl">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/50">Net Disbursed Amount</p>
                    {formData.showAmountInWords && (
                      <p className="text-[11px] text-white/80 font-medium">{numberToWordsINR(net)}</p>
                    )}
                  </div>
                  <p className="text-xl font-bold font-mono text-white">₹{net.toLocaleString("en-IN")}</p>
                </div>

                <p className="text-[10px] text-white/40 italic">{formData.notes}</p>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 3. EXECUTIVE PREMIUM LAYOUT                                    */}
            {/* ------------------------------------------------------------- */}
            {selectedTemplate === "Executive" && (
              <div className="space-y-4 text-xs">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 flex items-center justify-between">
                  <div>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
                      Executive Statement
                    </span>
                    <h2 className="mt-1.5 text-base font-bold text-white tracking-wide">
                      {formData.companyName}
                    </h2>
                    {formData.showCompanyAddress && (
                      <p className="text-[11px] text-emerald-200/60">{formData.companyAddress}</p>
                    )}
                  </div>

                  {formData.showQrCode && (
                    <div className="flex flex-col items-center justify-center h-14 w-14 rounded-lg bg-emerald-900/40 border border-emerald-500/30 text-emerald-300">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      <span className="text-[8px] mt-0.5">VERIFIED</span>
                    </div>
                  )}
                </div>

                {formData.showAttendance && (
                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-white/[0.03] p-2.5 text-center text-[11px]">
                    <div>
                      <span className="text-white/40">Total Days:</span> <strong className="text-white">{formData.workingDays}</strong>
                    </div>
                    <div>
                      <span className="text-white/40">Days Worked:</span> <strong className="text-emerald-400">{formData.paidDays}</strong>
                    </div>
                    <div>
                      <span className="text-white/40">Loss of Pay:</span> <strong className="text-white">{formData.lopDays}</strong>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10 pb-3">
                  <div className="pr-3 space-y-1">
                    <p className="text-[11px] font-semibold text-emerald-400 uppercase">Executive Particulars</p>
                    <p className="text-white font-medium">{formData.empName || "—"} ({formData.empCode})</p>
                    <p className="text-white/60">{formData.designation} • {formData.department}</p>
                    <p className="text-white/45">Bank: {formData.bankName} ({formData.accountNo})</p>
                  </div>

                  <div className="pl-3 space-y-1">
                    <p className="text-[11px] font-semibold text-emerald-400 uppercase">Summary (₹)</p>
                    <div className="flex justify-between text-white/70">
                      <span>Gross Earnings:</span>
                      <span className="font-semibold text-white">₹{gross.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Total Deductions:</span>
                      <span className="font-semibold text-red-400">-₹{deductions.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-semibold text-white">NET SALARY CREDIT</p>
                    {formData.showAmountInWords && (
                      <p className="text-[11px] text-emerald-200/70">{numberToWordsINR(net)}</p>
                    )}
                  </div>
                  <p className="text-lg font-bold text-emerald-400">₹{net.toLocaleString("en-IN")}</p>
                </div>

                {formData.showSignatory && (
                  <div className="flex justify-between items-end pt-2 text-[10px] text-white/40">
                    <p>{formData.notes}</p>
                    <div className="text-center">
                      <div className="h-6 border-b border-dashed border-emerald-500/40 w-28" />
                      <p className="mt-1 text-emerald-300">Finance Controller</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 4. TECH STARTUP LAYOUT                                         */}
            {/* ------------------------------------------------------------- */}
            {selectedTemplate === "Startup" && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-sm font-bold text-white shadow-lg shadow-purple-500/20">
                      PI
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">{formData.companyName}</h2>
                      <p className="text-[11px] text-purple-300">{formData.month.toUpperCase()} {formData.year}</p>
                    </div>
                  </div>

                  <span className="rounded-full bg-purple-500/15 border border-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-300">
                    Take-Home: ₹{net.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 pt-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
                    <div className="flex justify-between font-semibold text-purple-300 text-[11px]">
                      <span>Earnings</span>
                      <span>₹{gross.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="space-y-1 text-white/70 text-[11px]">
                      <div className="flex justify-between"><span>Basic Pay</span><span>₹{(Number(formData.basic) || 0).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>HRA</span><span>₹{(Number(formData.hra) || 0).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>Special Allowance</span><span>₹{(Number(formData.specialAllowance) || 0).toLocaleString("en-IN")}</span></div>
                      {Number(formData.bonus) > 0 && (
                        <div className="flex justify-between"><span>Bonus</span><span>₹{Number(formData.bonus).toLocaleString("en-IN")}</span></div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
                    <div className="flex justify-between font-semibold text-pink-300 text-[11px]">
                      <span>Deductions</span>
                      <span>₹{deductions.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="space-y-1 text-white/70 text-[11px]">
                      <div className="flex justify-between"><span>PF</span><span>₹{(Number(formData.pf) || 0).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>PT</span><span>₹{(Number(formData.pt) || 0).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>TDS / Tax</span><span>₹{(Number(formData.tds) || 0).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>Insurance</span><span>₹{(Number(formData.insurance) || 0).toLocaleString("en-IN")}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-purple-950/20 border border-purple-500/20 p-3 text-[11px] text-white/60">
                  <span>{formData.notes}</span>
                  <span className="text-purple-300 font-medium">Verified ID: {formData.id}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: Saved Payslips History Table                              */}
      {/* ========================================================================= */}
      <section className="rounded-3xl border border-white/10 bg-surface/85 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:p-6 no-print">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-base font-semibold text-white">
              Saved Payslips Records ({savedRecords.length})
            </h2>
            <p className="text-xs text-white/50">
              Click &quot;Load into Studio&quot; to edit details in the side-by-side studio above
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 uppercase tracking-wider">
                <th className="py-3 px-3">Slip ID</th>
                <th className="py-3 px-3">Employee</th>
                <th className="py-3 px-3">Period</th>
                <th className="py-3 px-3">Net Pay</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {savedRecords.map((item) => {
                const itemNet = calculateTotals(item).net;
                return (
                  <tr key={item.id} className="group transition hover:bg-white/[0.03]">
                    <td className="py-3 px-3 font-mono text-accent font-medium">{item.id}</td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-white">{item.empName}</p>
                      <p className="text-[11px] text-white/45">{item.empCode} • {item.designation}</p>
                    </td>
                    <td className="py-3 px-3 text-white/70">{item.month} {item.year}</td>
                    <td className="py-3 px-3 font-semibold text-white">₹{itemNet.toLocaleString("en-IN")}</td>
                    <td className="py-3 px-3">
                      <span className="rounded-full bg-success/15 text-success px-2.5 py-0.5 text-[10px] font-medium">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...item });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 hover:text-white transition"
                      >
                        Load into Studio
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
