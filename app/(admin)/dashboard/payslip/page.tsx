"use client";

import { useState } from "react";

type TemplateType = "Corporate" | "Minimal" | "Executive" | "Startup";

interface TemplateOption {
  id: TemplateType;
  name: string;
  badge: string;
  color: string;
  accentClass: string;
}

const templateOptions: TemplateOption[] = [
  {
    id: "Corporate",
    name: "Corporate Classic",
    badge: "Formal Blue",
    color: "#2563eb",
    accentClass: "border-blue-500 bg-blue-500/10 text-blue-400",
  },
  {
    id: "Minimal",
    name: "Minimalist Modern",
    badge: "Monochrome Slate",
    color: "#64748b",
    accentClass: "border-slate-400 bg-slate-500/10 text-slate-300",
  },
  {
    id: "Executive",
    name: "Executive Premium",
    badge: "Emerald Gold",
    color: "#059669",
    accentClass: "border-emerald-500 bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "Startup",
    name: "Tech Startup",
    badge: "Purple Gradient",
    color: "#7c3aed",
    accentClass: "border-purple-500 bg-purple-500/10 text-purple-400",
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
      "This is a computer-generated payslip authorized by finance. No physical signature is required.",
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
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
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
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Top Header Row - Unified & Clean */}
      <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center no-print border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Payslip Studio
            </h1>
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
              Interactive Editor
            </span>
          </div>
          <p className="mt-0.5 text-xs text-white/50">
            Customize salary particulars on the left & preview formatted A4 document on the right
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs">
            <span className="text-white/40">Employee:</span>
            <select
              value={formData.id}
              onChange={(e) => handlePresetSelect(e.target.value)}
              className="bg-transparent text-xs font-medium text-white outline-none cursor-pointer"
            >
              {samplePresets.map((p) => (
                <option key={p.id} value={p.id} className="bg-surface text-white">
                  {p.empName} ({p.empCode})
                </option>
              ))}
              <option value="NEW" className="bg-surface text-white">+ New Employee Form</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleSaveRecord}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            {saveSuccess ? "✓ Saved" : "Save Record"}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-accent-strong px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-accent/20 hover:brightness-110 active:scale-95 transition"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print / Save PDF
          </button>
        </div>
      </section>

      {/* Main Studio Grid */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Controls & Input Tabs (5 Cols)                              */}
        {/* ========================================================================= */}
        <div className="space-y-4 lg:col-span-5 no-print">
          {/* 1. Template Selector */}
          <div className="rounded-2xl border border-white/10 bg-surface/90 p-4 shadow-lg backdrop-blur-xl">
            <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2.5">
              Choose Layout Style
            </p>

            <div className="grid grid-cols-2 gap-2">
              {templateOptions.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                      isSelected
                        ? "border-accent bg-accent/15 text-white ring-1 ring-accent"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: tpl.color }}
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-semibold truncate text-white">{tpl.name}</p>
                      <p className="text-[10px] text-white/40 truncate">{tpl.badge}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Input Particulars & Tabs */}
          <div className="rounded-2xl border border-white/10 bg-surface/90 p-4 shadow-lg backdrop-blur-xl">
            {/* Segmented Tab Controls */}
            <div className="flex items-center rounded-xl bg-white/5 p-1 text-xs">
              {(["Particulars", "Salary", "Settings"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 rounded-lg py-1.5 font-medium transition text-center ${
                    activeTab === tab
                      ? "bg-white text-slate-950 shadow-sm font-semibold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab === "Particulars" ? "👤 Particulars" : tab === "Salary" ? "💰 Salary" : "⚙️ Options"}
                </button>
              ))}
            </div>

            {/* TAB 1: Employee Particulars */}
            {activeTab === "Particulars" && (
              <div className="mt-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/50">Employee Name</span>
                    <input
                      type="text"
                      value={formData.empName}
                      onChange={(e) => setFormData({ ...formData, empName: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/50">Employee ID</span>
                    <input
                      type="text"
                      value={formData.empCode}
                      onChange={(e) => setFormData({ ...formData, empCode: e.target.value })}
                      placeholder="EMP-1001"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/50">Role / Designation</span>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/50">Department</span>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-accent/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/50">Pay Month & Year</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <select
                        value={formData.month}
                        onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                        className="rounded-xl border border-white/10 bg-surface-strong px-2 py-2 text-xs text-white outline-none"
                      >
                        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-xs text-white outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-white/50">Joining Date</span>
                    <input
                      type="text"
                      value={formData.dateOfJoining}
                      onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                {/* Bank & Tax Details Section */}
                <div className="border-t border-white/10 pt-3 space-y-2.5">
                  <p className="text-[11px] font-semibold text-white/60">Bank & Tax Identifiers</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="Bank Name"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none"
                    />
                    <input
                      type="text"
                      placeholder="A/C Number"
                      value={formData.accountNo}
                      onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      placeholder="PAN Number"
                      value={formData.pan}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none"
                    />
                    <input
                      type="text"
                      placeholder="UAN / PF Number"
                      value={formData.uan}
                      onChange={(e) => setFormData({ ...formData, uan: e.target.value })}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Salary Structure */}
            {activeTab === "Salary" && (
              <div className="mt-4 space-y-3.5 text-xs">
                {/* Attendance Counter */}
                <div className="grid grid-cols-3 gap-2 rounded-xl bg-white/[0.03] p-2.5 border border-white/5 text-center">
                  <div>
                    <span className="text-[10px] text-white/50">Total Days</span>
                    <input
                      type="number"
                      value={formData.workingDays}
                      onChange={(e) => setFormData({ ...formData, workingDays: Number(e.target.value) || 0 })}
                      className="mt-1 w-full text-center rounded-lg border border-white/10 bg-black/20 py-1 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50">Paid Days</span>
                    <input
                      type="number"
                      value={formData.paidDays}
                      onChange={(e) => setFormData({ ...formData, paidDays: Number(e.target.value) || 0 })}
                      className="mt-1 w-full text-center rounded-lg border border-white/10 bg-black/20 py-1 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50">LOP Days</span>
                    <input
                      type="number"
                      value={formData.lopDays}
                      onChange={(e) => setFormData({ ...formData, lopDays: Number(e.target.value) || 0 })}
                      className="mt-1 w-full text-center rounded-lg border border-white/10 bg-black/20 py-1 text-xs text-white outline-none"
                    />
                  </div>
                </div>

                {/* Earnings vs Deductions Breakdown */}
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div className="space-y-1.5 rounded-xl border border-blue-500/20 bg-blue-500/5 p-2.5">
                    <p className="font-semibold text-blue-400 text-[11px]">Earnings (₹)</p>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-white/50">Basic</span>
                        <input
                          type="number"
                          value={formData.basic}
                          onChange={(e) => setFormData({ ...formData, basic: Number(e.target.value) || 0 })}
                          className="w-24 rounded border border-white/10 bg-black/20 px-2 py-0.5 text-right text-xs text-white outline-none"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-white/50">HRA</span>
                        <input
                          type="number"
                          value={formData.hra}
                          onChange={(e) => setFormData({ ...formData, hra: Number(e.target.value) || 0 })}
                          className="w-24 rounded border border-white/10 bg-black/20 px-2 py-0.5 text-right text-xs text-white outline-none"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-white/50">Special</span>
                        <input
                          type="number"
                          value={formData.specialAllowance}
                          onChange={(e) => setFormData({ ...formData, specialAllowance: Number(e.target.value) || 0 })}
                          className="w-24 rounded border border-white/10 bg-black/20 px-2 py-0.5 text-right text-xs text-white outline-none"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-white/50">Bonus</span>
                        <input
                          type="number"
                          value={formData.bonus}
                          onChange={(e) => setFormData({ ...formData, bonus: Number(e.target.value) || 0 })}
                          className="w-24 rounded border border-white/10 bg-black/20 px-2 py-0.5 text-right text-xs text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 rounded-xl border border-red-500/20 bg-red-500/5 p-2.5">
                    <p className="font-semibold text-red-400 text-[11px]">Deductions (₹)</p>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-white/50">PF</span>
                        <input
                          type="number"
                          value={formData.pf}
                          onChange={(e) => setFormData({ ...formData, pf: Number(e.target.value) || 0 })}
                          className="w-24 rounded border border-white/10 bg-black/20 px-2 py-0.5 text-right text-xs text-white outline-none"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-white/50">PT</span>
                        <input
                          type="number"
                          value={formData.pt}
                          onChange={(e) => setFormData({ ...formData, pt: Number(e.target.value) || 0 })}
                          className="w-24 rounded border border-white/10 bg-black/20 px-2 py-0.5 text-right text-xs text-white outline-none"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-white/50">TDS / Tax</span>
                        <input
                          type="number"
                          value={formData.tds}
                          onChange={(e) => setFormData({ ...formData, tds: Number(e.target.value) || 0 })}
                          className="w-24 rounded border border-white/10 bg-black/20 px-2 py-0.5 text-right text-xs text-white outline-none"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-white/50">Insurance</span>
                        <input
                          type="number"
                          value={formData.insurance}
                          onChange={(e) => setFormData({ ...formData, insurance: Number(e.target.value) || 0 })}
                          className="w-24 rounded border border-white/10 bg-black/20 px-2 py-0.5 text-right text-xs text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Computed Take-home pill */}
                <div className="flex items-center justify-between rounded-xl bg-success/10 border border-success/20 p-2.5 text-xs">
                  <span className="text-white/70">Calculated Net Pay:</span>
                  <span className="font-bold text-success text-sm">₹{net.toLocaleString("en-IN")}</span>
                </div>
              </div>
            )}

            {/* TAB 3: Settings & Visibility */}
            {activeTab === "Settings" && (
              <div className="mt-4 space-y-3 text-xs">
                <p className="text-[11px] font-semibold text-white/60">Toggle Visible Elements</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "showLogo", label: "Logo & Name" },
                    { key: "showCompanyAddress", label: "Address/CIN" },
                    { key: "showPanUan", label: "PAN & UAN" },
                    { key: "showBankDetails", label: "Bank Account" },
                    { key: "showAttendance", label: "Attendance" },
                    { key: "showAmountInWords", label: "Words Amount" },
                    { key: "showSignatory", label: "Signature Box" },
                    { key: "showQrCode", label: "QR Seal" },
                  ].map(({ key, label }) => {
                    const fieldKey = key as keyof PayslipData;
                    return (
                      <label
                        key={key}
                        className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 cursor-pointer hover:bg-white/[0.05]"
                      >
                        <span className="text-[11px] text-white/75">{label}</span>
                        <input
                          type="checkbox"
                          checked={Boolean(formData[fieldKey])}
                          onChange={(e) =>
                            setFormData({ ...formData, [fieldKey]: e.target.checked })
                          }
                          className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-accent focus:ring-accent accent-accent"
                        />
                      </label>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <span className="text-[11px] text-white/50">Footer Note / Disclaimer</span>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 p-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Realistic High-Contrast A4 Payslip Document (7 Cols)        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-3">
          {/* Document Sheet Canvas */}
          <div
            id="printable-payslip"
            className="rounded-2xl border border-slate-700 bg-[#ffffff] text-[#0f172a] p-6 sm:p-8 shadow-2xl transition-all duration-200 min-h-[580px]"
          >
            {/* ------------------------------------------------------------- */}
            {/* 1. CORPORATE CLASSIC (Clean White Paper & Crisp Navy Ink)     */}
            {/* ------------------------------------------------------------- */}
            {selectedTemplate === "Corporate" && (
              <div className="space-y-4 text-xs font-sans">
                {/* Header */}
                <div className="flex items-start justify-between border-b-2 border-blue-700 pb-4">
                  <div>
                    {formData.showLogo && (
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 text-xs font-bold text-white shadow-sm">
                          PI
                        </div>
                        <h2 className="text-base font-bold tracking-tight text-slate-900">
                          {formData.companyName}
                        </h2>
                      </div>
                    )}
                    {formData.showCompanyAddress && (
                      <div className="mt-1 text-[11px] text-slate-500 space-y-0.5">
                        <p>{formData.companyAddress}</p>
                        <p>{formData.cin} • {formData.gstin}</p>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="rounded bg-blue-50 border border-blue-200 px-2.5 py-1 text-[11px] font-bold text-blue-800 uppercase">
                      Salary Slip
                    </span>
                    <p className="mt-2 font-bold text-slate-900">
                      {formData.month.toUpperCase()} {formData.year}
                    </p>
                    <p className="text-[10px] text-slate-400">Ref: {formData.id}</p>
                  </div>
                </div>

                {/* Employee & Bank Info Grid */}
                <div className="grid grid-cols-2 gap-4 border-b border-slate-200 py-3 text-slate-800">
                  <div className="space-y-1">
                    <div className="flex">
                      <span className="w-28 text-slate-500">Employee Name</span>
                      <span className="font-semibold text-slate-900">: {formData.empName || "—"}</span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-slate-500">Employee Code</span>
                      <span>: {formData.empCode}</span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-slate-500">Designation</span>
                      <span>: {formData.designation}</span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-slate-500">Department</span>
                      <span>: {formData.department}</span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-slate-500">Date of Joining</span>
                      <span>: {formData.dateOfJoining}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {formData.showBankDetails && (
                      <>
                        <div className="flex">
                          <span className="w-28 text-slate-500">Bank Name</span>
                          <span>: {formData.bankName}</span>
                        </div>
                        <div className="flex">
                          <span className="w-28 text-slate-500">Bank A/C No.</span>
                          <span>: {formData.accountNo}</span>
                        </div>
                      </>
                    )}
                    {formData.showPanUan && (
                      <div className="flex">
                        <span className="w-28 text-slate-500">PAN / UAN</span>
                        <span>: {formData.pan} / {formData.uan}</span>
                      </div>
                    )}
                    {formData.showAttendance && (
                      <div className="flex">
                        <span className="w-28 text-slate-500">Days Paid</span>
                        <span className="font-semibold text-slate-900">
                          : {formData.paidDays} / {formData.workingDays}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Earnings vs Deductions Table */}
                <div className="grid grid-cols-2 divide-x divide-slate-200 border-b border-slate-200 text-xs">
                  <div className="pr-3 py-2 space-y-1.5">
                    <div className="flex justify-between font-bold text-blue-800 uppercase text-[11px] border-b border-slate-200 pb-1">
                      <span>Earnings Particulars</span>
                      <span>Amount (₹)</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Basic Salary</span>
                      <span>₹{(Number(formData.basic) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>House Rent Allowance (HRA)</span>
                      <span>₹{(Number(formData.hra) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Special Allowance</span>
                      <span>₹{(Number(formData.specialAllowance) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Conveyance</span>
                      <span>₹{(Number(formData.conveyance) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    {Number(formData.bonus) > 0 && (
                      <div className="flex justify-between text-slate-700">
                        <span>Bonus / Incentive</span>
                        <span>₹{Number(formData.bonus).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>

                  <div className="pl-3 py-2 space-y-1.5">
                    <div className="flex justify-between font-bold text-red-700 uppercase text-[11px] border-b border-slate-200 pb-1">
                      <span>Deductions Particulars</span>
                      <span>Amount (₹)</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Provident Fund (PF)</span>
                      <span>₹{(Number(formData.pf) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Professional Tax (PT)</span>
                      <span>₹{(Number(formData.pt) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Income Tax (TDS)</span>
                      <span>₹{(Number(formData.tds) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Health Insurance</span>
                      <span>₹{(Number(formData.insurance) || 0).toLocaleString("en-IN")}</span>
                    </div>
                    {Number(formData.lop) > 0 && (
                      <div className="flex justify-between text-slate-700">
                        <span>Loss of Pay (LOP)</span>
                        <span>₹{Number(formData.lop).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtotals & Net Banner */}
                <div className="grid grid-cols-2 divide-x divide-slate-200 border-b border-slate-200 py-2 font-bold text-xs">
                  <div className="flex justify-between pr-3 text-slate-900">
                    <span>Total Gross Earnings</span>
                    <span>₹{gross.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between pl-3 text-red-700">
                    <span>Total Deductions</span>
                    <span>₹{deductions.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-blue-200 bg-blue-50/80 p-3.5 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-blue-900 uppercase tracking-wide">Net Take-Home Pay:</span>
                    {formData.showAmountInWords && (
                      <p className="text-[11px] text-blue-800 mt-0.5">
                        <strong>In Words:</strong> {numberToWordsINR(net)}
                      </p>
                    )}
                  </div>
                  <span className="text-lg font-bold text-blue-800 font-mono">₹{net.toLocaleString("en-IN")}</span>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end pt-3 text-[11px] text-slate-500">
                  <p className="max-w-xs leading-relaxed">{formData.notes}</p>
                  {formData.showSignatory && (
                    <div className="text-center">
                      <div className="h-8 border-b border-dashed border-slate-400 w-32" />
                      <p className="mt-1 font-semibold text-slate-700">Authorized Signatory</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 2. MINIMALIST MODERN                                           */}
            {/* ------------------------------------------------------------- */}
            {selectedTemplate === "Minimal" && (
              <div className="space-y-5 text-xs font-sans text-slate-900">
                <div className="flex items-baseline justify-between border-b-2 border-slate-900 pb-3">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-slate-900">
                      {formData.companyName}
                    </h2>
                    {formData.showCompanyAddress && (
                      <p className="text-[11px] text-slate-500">{formData.companyAddress}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-bold text-slate-900">
                      {formData.month.toUpperCase()} {formData.year}
                    </p>
                    <p className="text-[10px] text-slate-400">{formData.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Employee</p>
                    <p className="font-semibold text-slate-900">{formData.empName || "—"}</p>
                    <p className="text-[11px] text-slate-500">{formData.empCode}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Role / Dept</p>
                    <p className="font-semibold text-slate-900">{formData.designation}</p>
                    <p className="text-[11px] text-slate-500">{formData.department}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Bank A/C</p>
                    <p className="font-mono text-slate-900">{formData.accountNo}</p>
                    <p className="text-[11px] text-slate-500">{formData.bankName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">PAN Number</p>
                    <p className="font-mono text-slate-900">{formData.pan}</p>
                    <p className="text-[11px] text-slate-500">Tax ID</p>
                  </div>
                </div>

                <div className="border-t border-b border-slate-200 py-3 space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Gross Earnings (Basic, HRA, Allowances, Bonus)</span>
                    <span className="font-mono font-semibold text-slate-900">₹{gross.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Total Deductions (PF, PT, TDS, Insurance)</span>
                    <span className="font-mono font-semibold text-red-600">-₹{deductions.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-2 border-slate-900 bg-slate-50 px-4 py-3 rounded-xl">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Net Disbursed Amount</p>
                    {formData.showAmountInWords && (
                      <p className="text-[11px] text-slate-800 font-semibold">{numberToWordsINR(net)}</p>
                    )}
                  </div>
                  <p className="text-xl font-bold font-mono text-slate-900">₹{net.toLocaleString("en-IN")}</p>
                </div>

                <p className="text-[10px] text-slate-500 italic">{formData.notes}</p>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 3. EXECUTIVE PREMIUM (Emerald Gold Theme)                      */}
            {/* ------------------------------------------------------------- */}
            {selectedTemplate === "Executive" && (
              <div className="space-y-4 text-xs font-sans text-slate-900">
                <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 flex items-center justify-between">
                  <div>
                    <span className="rounded bg-emerald-800 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                      Executive Statement
                    </span>
                    <h2 className="mt-1.5 text-base font-bold text-slate-900">
                      {formData.companyName}
                    </h2>
                    {formData.showCompanyAddress && (
                      <p className="text-[11px] text-slate-600">{formData.companyAddress}</p>
                    )}
                  </div>

                  {formData.showQrCode && (
                    <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-emerald-800 text-white shadow-sm">
                      <span className="text-[9px] font-bold">QR SEAL</span>
                      <span className="text-[8px] opacity-80">VERIFIED</span>
                    </div>
                  )}
                </div>

                {formData.showAttendance && (
                  <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-2.5 text-center text-[11px]">
                    <div>
                      <span className="text-slate-500">Working Days:</span> <strong>{formData.workingDays}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Days Paid:</span> <strong className="text-emerald-700">{formData.paidDays}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Loss of Pay:</span> <strong>{formData.lopDays}</strong>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 divide-x divide-slate-200 border-b border-slate-200 pb-3">
                  <div className="pr-3 space-y-1">
                    <p className="text-[11px] font-bold text-emerald-800 uppercase">Executive Particulars</p>
                    <p className="font-semibold text-slate-900">{formData.empName || "—"} ({formData.empCode})</p>
                    <p className="text-slate-600">{formData.designation} • {formData.department}</p>
                    <p className="text-slate-500">Bank: {formData.bankName} ({formData.accountNo})</p>
                  </div>

                  <div className="pl-3 space-y-1">
                    <p className="text-[11px] font-bold text-emerald-800 uppercase">Compensation Summary</p>
                    <div className="flex justify-between text-slate-700">
                      <span>Gross Earnings:</span>
                      <span className="font-bold text-slate-900">₹{gross.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Total Deductions:</span>
                      <span className="font-bold text-red-600">-₹{deductions.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-300 bg-emerald-100/70 p-3.5 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-emerald-900">NET SALARY DISBURSED</p>
                    {formData.showAmountInWords && (
                      <p className="text-[11px] text-emerald-800 font-medium">{numberToWordsINR(net)}</p>
                    )}
                  </div>
                  <p className="text-lg font-bold text-emerald-900 font-mono">₹{net.toLocaleString("en-IN")}</p>
                </div>

                {formData.showSignatory && (
                  <div className="flex justify-between items-end pt-2 text-[10px] text-slate-500">
                    <p>{formData.notes}</p>
                    <div className="text-center">
                      <div className="h-6 border-b border-dashed border-slate-400 w-28" />
                      <p className="mt-1 font-semibold text-emerald-900">Finance Controller</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* 4. TECH STARTUP                                               */}
            {/* ------------------------------------------------------------- */}
            {selectedTemplate === "Startup" && (
              <div className="space-y-4 text-xs font-sans text-slate-900">
                <div className="flex items-center justify-between border-b border-purple-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 text-xs font-bold text-white shadow-sm">
                      PI
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">{formData.companyName}</h2>
                      <p className="text-[11px] text-purple-700 font-medium">{formData.month.toUpperCase()} {formData.year}</p>
                    </div>
                  </div>

                  <span className="rounded-full bg-purple-100 border border-purple-300 px-3 py-1 text-xs font-bold text-purple-800">
                    Take-Home: ₹{net.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 pt-1">
                  <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-3 space-y-1.5">
                    <div className="flex justify-between font-bold text-purple-900 text-[11px] border-b border-purple-200 pb-1">
                      <span>Earnings</span>
                      <span>₹{gross.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="space-y-1 text-slate-700 text-[11px]">
                      <div className="flex justify-between"><span>Basic Pay</span><span>₹{(Number(formData.basic) || 0).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>HRA</span><span>₹{(Number(formData.hra) || 0).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>Special</span><span>₹{(Number(formData.specialAllowance) || 0).toLocaleString("en-IN")}</span></div>
                      {Number(formData.bonus) > 0 && (
                        <div className="flex justify-between"><span>Bonus</span><span>₹{Number(formData.bonus).toLocaleString("en-IN")}</span></div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-pink-200 bg-pink-50/60 p-3 space-y-1.5">
                    <div className="flex justify-between font-bold text-pink-900 text-[11px] border-b border-pink-200 pb-1">
                      <span>Deductions</span>
                      <span>₹{deductions.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="space-y-1 text-slate-700 text-[11px]">
                      <div className="flex justify-between"><span>PF</span><span>₹{(Number(formData.pf) || 0).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>PT</span><span>₹{(Number(formData.pt) || 0).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>TDS / Tax</span><span>₹{(Number(formData.tds) || 0).toLocaleString("en-IN")}</span></div>
                      <div className="flex justify-between"><span>Insurance</span><span>₹{(Number(formData.insurance) || 0).toLocaleString("en-IN")}</span></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-100 p-2.5 text-[11px] text-slate-600">
                  <span>{formData.notes}</span>
                  <span className="text-purple-800 font-bold">Verified: {formData.id}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM SECTION: Saved Records Table                                       */}
      {/* ========================================================================= */}
      <section className="rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-lg backdrop-blur-xl no-print">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <h2 className="text-sm font-bold text-white">Saved Records ({savedRecords.length})</h2>
            <p className="text-[11px] text-white/50">Click &quot;Load in Studio&quot; to inspect and edit salary slips</p>
          </div>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-white/40 uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Slip ID</th>
                <th className="py-2.5 px-3">Employee</th>
                <th className="py-2.5 px-3">Period</th>
                <th className="py-2.5 px-3">Net Pay</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {savedRecords.map((item) => {
                const itemNet = calculateTotals(item).net;
                return (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition">
                    <td className="py-2.5 px-3 font-mono text-accent">{item.id}</td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-white">{item.empName}</span>
                      <span className="text-white/45 text-[11px] ml-2">({item.empCode})</span>
                    </td>
                    <td className="py-2.5 px-3 text-white/70">{item.month} {item.year}</td>
                    <td className="py-2.5 px-3 font-semibold text-white">₹{itemNet.toLocaleString("en-IN")}</td>
                    <td className="py-2.5 px-3">
                      <span className="rounded-full bg-success/15 text-success px-2 py-0.5 text-[10px] font-medium">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...item });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10 hover:text-white"
                      >
                        Load in Studio
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
