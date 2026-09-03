"use client";

import { useState, useEffect } from "react";

interface TemplateConfig {
  id: string;
  name: string;
  category: string;
  description: string;
  themeColor: string;
  themeGradient: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  isActive: boolean;
  isDefault: boolean;
  layout: "Corporate" | "Minimal" | "Executive" | "Startup";
  fields: {
    showLogo: boolean;
    showCompanyAddress: boolean;
    showPanUan: boolean;
    showBankDetails: boolean;
    showAttendance: boolean;
    showAmountInWords: boolean;
    showSignatory: boolean;
    showQrCode: boolean;
  };
  notes: string;
}

const sampleEmployeeData = {
  companyName: "PAYSLIP PRO TECH PVT. LTD.",
  companyAddress: "Plot No. 42, Cyber City Tech Hub, Bengaluru - 560100",
  cin: "CIN: U72200KA2023PTC128492 • support@payslip.in",
  gstin: "GSTIN: 29AAACP0124M1ZR",
  empName: "Rishabh Sharma",
  empCode: "EMP-1001",
  designation: "Lead Fullstack Engineer",
  department: "Engineering",
  month: "APRIL 2026",
  slipId: "PS-2026-0401",
  doj: "15 Jan 2023",
  bankName: "HDFC Bank Ltd.",
  accountNo: "••••••••4892",
  ifsc: "HDFC0001245",
  pan: "ABCDE1234F",
  uan: "100982341209",
  workingDays: 30,
  paidDays: 30,
  lopDays: 0,
  // Earnings
  basic: 55000,
  hra: 22000,
  specialAllowance: 15000,
  conveyance: 3000,
  bonus: 5000,
  // Deductions
  pf: 4200,
  pt: 200,
  tds: 5800,
  insurance: 1000,
  lop: 0,
};

const initialTemplates: TemplateConfig[] = [
  {
    id: "tpl-corporate-blue",
    name: "Corporate Classic",
    category: "Formal & Enterprise",
    description:
      "Structured two-column table with company tax headers, formal employee particulars, bank audit details, and signatory stamp.",
    themeColor: "#3b82f6",
    themeGradient: "from-blue-600 to-indigo-600",
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-400",
    accentBorder: "border-blue-500/30",
    isActive: true,
    isDefault: true,
    layout: "Corporate",
    fields: {
      showLogo: true,
      showCompanyAddress: true,
      showPanUan: true,
      showBankDetails: true,
      showAttendance: true,
      showAmountInWords: true,
      showSignatory: true,
      showQrCode: false,
    },
    notes:
      "This is a computer-generated document authorized by finance. No physical signature is required.",
  },
  {
    id: "tpl-minimal-slate",
    name: "Minimalist Modern",
    category: "Clean & High-Contrast",
    description:
      "Clean monochrome lines inspired by modern design systems. Subtle borders, sharp typography, and uncluttered layout.",
    themeColor: "#94a3b8",
    themeGradient: "from-slate-400 to-zinc-500",
    accentBg: "bg-white/10",
    accentText: "text-white",
    accentBorder: "border-white/20",
    isActive: true,
    isDefault: false,
    layout: "Minimal",
    fields: {
      showLogo: true,
      showCompanyAddress: true,
      showPanUan: true,
      showBankDetails: true,
      showAttendance: false,
      showAmountInWords: true,
      showSignatory: true,
      showQrCode: false,
    },
    notes:
      "Confidential salary statement. For queries, contact payroll@payslip.in.",
  },
  {
    id: "tpl-executive-emerald",
    name: "Executive Premium",
    category: "Executive & Leadership",
    description:
      "Premium emerald & charcoal voucher aesthetic with comprehensive attendance and leave details, incentive focus, and seal stamp.",
    themeColor: "#10b981",
    themeGradient: "from-emerald-500 to-teal-600",
    accentBg: "bg-emerald-500/10",
    accentText: "text-emerald-400",
    accentBorder: "border-emerald-500/30",
    isActive: true,
    isDefault: false,
    layout: "Executive",
    fields: {
      showLogo: true,
      showCompanyAddress: true,
      showPanUan: true,
      showBankDetails: true,
      showAttendance: true,
      showAmountInWords: true,
      showSignatory: true,
      showQrCode: true,
    },
    notes:
      "Official executive statement. Tax deducted at source as per Income Tax Act provisions.",
  },
  {
    id: "tpl-startup-indigo",
    name: "Tech Startup",
    category: "Modern SaaS & Creative",
    description:
      "Vibrant card-based earnings & deductions structure with verification QR seal, modern rounded tags, and gradient banners.",
    themeColor: "#8b5cf6",
    themeGradient: "from-indigo-500 via-purple-500 to-pink-500",
    accentBg: "bg-purple-500/10",
    accentText: "text-purple-400",
    accentBorder: "border-purple-500/30",
    isActive: false,
    isDefault: false,
    layout: "Startup",
    fields: {
      showLogo: true,
      showCompanyAddress: true,
      showPanUan: true,
      showBankDetails: true,
      showAttendance: true,
      showAmountInWords: true,
      showSignatory: false,
      showQrCode: true,
    },
    notes:
      "Digitally verified payslip issued through Payslip Pro platform.",
  },
];

export default function PayslipTemplatesPage() {
  const [templates, setTemplates] = useState<TemplateConfig[]>(initialTemplates);
  const [activeFilter, setActiveFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateConfig | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<TemplateConfig | null>(null);

  // Load from MongoDB on mount
  useEffect(() => {
    async function loadTemplates() {
      try {
        const res = await fetch("/api/templates");
        const data = await res.json();
        if (data.success && Array.isArray(data.templates) && data.templates.length > 0) {
          setTemplates(data.templates);
        }
      } catch (err) {
        console.error("Failed to fetch templates from MongoDB:", err);
      }
    }
    loadTemplates();
  }, []);

  const filteredTemplates = templates.filter((tpl) => {
    if (activeFilter === "Active") return tpl.isActive;
    if (activeFilter === "Inactive") return !tpl.isActive;
    return true;
  });

  const persistTemplateUpdate = async (updatePayload: {
    id: string;
    isActive?: boolean;
    isDefault?: boolean;
    fields?: TemplateConfig["fields"];
    notes?: string;
  }) => {
    try {
      await fetch("/api/templates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      });
    } catch (err) {
      console.error("Failed to persist template update:", err);
    }
  };

  const toggleActive = (id: string) => {
    let nextActive = false;
    let nextDefault = false;

    setTemplates((prev) =>
      prev.map((tpl) => {
        if (tpl.id === id) {
          nextActive = !tpl.isActive;
          nextDefault = nextActive ? tpl.isDefault : false;
          return {
            ...tpl,
            isActive: nextActive,
            isDefault: nextDefault,
          };
        }
        return tpl;
      })
    );

    persistTemplateUpdate({ id, isActive: nextActive, isDefault: nextDefault });
  };

  const setDefaultTemplate = (id: string) => {
    setTemplates((prev) =>
      prev.map((tpl) => ({
        ...tpl,
        isDefault: tpl.id === id,
        isActive: tpl.id === id ? true : tpl.isActive,
      }))
    );

    persistTemplateUpdate({ id, isDefault: true, isActive: true });
  };

  const handleUpdateField = (
    fieldKey: keyof TemplateConfig["fields"],
    value: boolean
  ) => {
    if (!editingTemplate) return;
    const updated = {
      ...editingTemplate,
      fields: {
        ...editingTemplate.fields,
        [fieldKey]: value,
      },
    };
    setEditingTemplate(updated);
    setTemplates((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    persistTemplateUpdate({ id: updated.id, fields: updated.fields });
    if (previewTemplate?.id === updated.id) {
      setPreviewTemplate(updated);
    }
  };

  const handleUpdateNotes = (notes: string) => {
    if (!editingTemplate) return;
    const updated = { ...editingTemplate, notes };
    setEditingTemplate(updated);
    setTemplates((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    persistTemplateUpdate({ id: updated.id, notes: updated.notes });
    if (previewTemplate?.id === updated.id) {
      setPreviewTemplate(updated);
    }
  };

  // Calculations for preview
  const gross =
    sampleEmployeeData.basic +
    sampleEmployeeData.hra +
    sampleEmployeeData.specialAllowance +
    sampleEmployeeData.conveyance +
    sampleEmployeeData.bonus;

  const deductions =
    sampleEmployeeData.pf +
    sampleEmployeeData.pt +
    sampleEmployeeData.tds +
    sampleEmployeeData.insurance +
    sampleEmployeeData.lop;

  const net = gross - deductions;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Payslip Templates
          </h1>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            Choose layout designs, toggle fields, activate/deactivate templates, and customize salary slips
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-1 text-xs">
          {(["All", "Active", "Inactive"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-xl px-3 py-1.5 font-medium transition ${
                activeFilter === filter
                  ? "bg-white text-slate-950 shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {filter}{" "}
              <span className="opacity-60 text-[10px]">
                (
                {filter === "All"
                  ? templates.length
                  : filter === "Active"
                  ? templates.filter((t) => t.isActive).length
                  : templates.filter((t) => !t.isActive).length}
                )
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Template Cards Grid */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className={`group relative flex flex-col justify-between rounded-3xl border p-5 backdrop-blur-2xl transition-all duration-300 ${
              tpl.isDefault
                ? "border-accent/50 bg-white/[0.07] shadow-[0_15px_50px_rgba(124,160,255,0.15)] ring-1 ring-accent/30"
                : tpl.isActive
                ? "border-white/10 bg-surface/90 hover:border-white/20"
                : "border-white/5 bg-white/[0.02] opacity-70"
            }`}
          >
            <div>
              {/* Card Header & Status */}
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tpl.accentBg} ${tpl.accentText} border ${tpl.accentBorder}`}
                >
                  {tpl.layout}
                </span>

                <div className="flex items-center gap-2">
                  {tpl.isDefault && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-slate-950">
                      Default
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => toggleActive(tpl.id)}
                    title={tpl.isActive ? "Deactivate template" : "Activate template"}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      tpl.isActive ? "bg-success" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        tpl.isActive ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Template Miniature Visual Preview */}
              <div
                onClick={() => setPreviewTemplate(tpl)}
                className="mt-4 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3 transition hover:border-accent/40"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                    <div className="h-2 w-12 rounded bg-white/40" />
                    <div
                      className={`h-2 w-8 rounded bg-gradient-to-r ${tpl.themeGradient}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-1 py-1">
                    <div className="h-1.5 w-full rounded bg-white/15" />
                    <div className="h-1.5 w-full rounded bg-white/15" />
                  </div>
                  <div className="grid grid-cols-2 gap-1 border-t border-b border-white/5 py-1">
                    <div className="space-y-0.5">
                      <div className="h-1 w-full rounded bg-white/20" />
                      <div className="h-1 w-3/4 rounded bg-white/15" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="h-1 w-full rounded bg-white/20" />
                      <div className="h-1 w-3/4 rounded bg-white/15" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <div className="h-1.5 w-10 rounded bg-white/25" />
                    <div
                      className={`h-2.5 w-14 rounded bg-gradient-to-r ${tpl.themeGradient} opacity-80`}
                    />
                  </div>
                </div>
              </div>

              {/* Description & Details */}
              <div className="mt-4">
                <h3 className="text-base font-semibold text-white group-hover:text-accent transition">
                  {tpl.name}
                </h3>
                <p className="mt-1 text-xs leading-5 text-white/55">
                  {tpl.description}
                </p>
              </div>

              {/* Active Fields summary */}
              <div className="mt-4 flex flex-wrap gap-1 text-[10px] text-white/40">
                {tpl.fields.showPanUan && (
                  <span className="rounded bg-white/5 px-1.5 py-0.5">PAN/UAN</span>
                )}
                {tpl.fields.showBankDetails && (
                  <span className="rounded bg-white/5 px-1.5 py-0.5">Bank Info</span>
                )}
                {tpl.fields.showAttendance && (
                  <span className="rounded bg-white/5 px-1.5 py-0.5">Attendance</span>
                )}
                {tpl.fields.showQrCode && (
                  <span className="rounded bg-white/5 px-1.5 py-0.5">QR Seal</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(tpl)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTemplate(tpl)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  Configure
                </button>
              </div>

              {!tpl.isDefault && tpl.isActive && (
                <button
                  type="button"
                  onClick={() => setDefaultTemplate(tpl.id)}
                  className="text-[11px] font-medium text-accent hover:underline"
                >
                  Set Default
                </button>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Drawer / Modal: Field & Layout Configuration */}
      {editingTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl my-8 rounded-3xl border border-white/10 bg-surface p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full`}
                    style={{ backgroundColor: editingTemplate.themeColor }}
                  />
                  <h3 className="text-lg font-semibold text-white">
                    Configure Template: {editingTemplate.name}
                  </h3>
                </div>
                <p className="text-xs text-white/50">
                  Toggle dynamic fields and adjust options for this payslip layout
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingTemplate(null)}
                className="rounded-xl border border-white/10 bg-white/5 p-1.5 text-white/60 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs">
              {/* Status and Default controls */}
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div>
                  <p className="font-semibold text-white">Template Status</p>
                  <p className="text-[11px] text-white/50">
                    {editingTemplate.isActive
                      ? "Template is enabled and ready to use"
                      : "Template is disabled and hidden from generation"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleActive(editingTemplate.id)}
                  className={`rounded-xl px-3 py-1.5 font-medium transition ${
                    editingTemplate.isActive
                      ? "bg-success/20 text-success border border-success/30"
                      : "bg-white/10 text-white/50 border border-white/10"
                  }`}
                >
                  {editingTemplate.isActive ? "Active" : "Inactive"}
                </button>
              </div>

              {/* Field Toggles List */}
              <div className="space-y-2.5">
                <p className="font-semibold text-white/80">Visible Fields & Sections</p>

                {[
                  { key: "showLogo", label: "Company Logo & Header Title" },
                  { key: "showCompanyAddress", label: "Company Address & CIN/GSTIN Details" },
                  { key: "showPanUan", label: "Employee PAN & UAN/PF Account Numbers" },
                  { key: "showBankDetails", label: "Bank Account & IFSC Details" },
                  { key: "showAttendance", label: "Attendance Record (Working Days, Paid, LOP)" },
                  { key: "showAmountInWords", label: "Net Payable Amount in Words (INR)" },
                  { key: "showSignatory", label: "Authorized Signatory Box / Stamp Area" },
                  { key: "showQrCode", label: "Digital Verification QR Code Badge" },
                ].map(({ key, label }) => {
                  const fieldKey = key as keyof TemplateConfig["fields"];
                  const isChecked = editingTemplate.fields[fieldKey];
                  return (
                    <label
                      key={key}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 cursor-pointer hover:bg-white/[0.04] transition"
                    >
                      <span className="text-white/80">{label}</span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => handleUpdateField(fieldKey, e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent accent-accent"
                      />
                    </label>
                  );
                })}
              </div>

              {/* Custom Footer Notes */}
              <div className="space-y-1.5 pt-2">
                <label className="font-semibold text-white/80">
                  Custom Disclaimer / Footer Note
                </label>
                <textarea
                  rows={2}
                  value={editingTemplate.notes}
                  onChange={(e) => handleUpdateNotes(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white outline-none focus:border-accent/60"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setPreviewTemplate(editingTemplate);
                    setEditingTemplate(null);
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  Live Preview
                </button>
                <button
                  type="button"
                  onClick={() => setEditingTemplate(null)}
                  className="rounded-xl bg-gradient-to-r from-accent to-accent-strong px-5 py-2 font-semibold text-white shadow-lg shadow-accent/20 hover:brightness-110"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Live Realistic Payslip Preview for Selected Template */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 sm:p-6 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto rounded-3xl border border-white/15 bg-surface p-5 sm:p-8 shadow-2xl backdrop-blur-2xl">
            {/* Modal Controls Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 print:hidden">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: previewTemplate.themeColor }}
                />
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Previewing: {previewTemplate.name}
                  </h3>
                  <p className="text-[11px] text-white/50">
                    Template style: {previewTemplate.layout}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTemplate(previewTemplate);
                    setPreviewTemplate(null);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
                >
                  Edit Fields
                </button>
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
                  onClick={() => setPreviewTemplate(null)}
                  className="rounded-xl border border-white/10 bg-white/5 p-1.5 text-white/60 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Template-Specific Renderings */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7 text-white/90">
              {/* ========================================================= */}
              {/* 1. CORPORATE CLASSIC LAYOUT */}
              {/* ========================================================= */}
              {previewTemplate.layout === "Corporate" && (
                <div className="space-y-4 text-xs">
                  {/* Header */}
                  <div className="flex items-start justify-between border-b-2 border-blue-500/40 pb-4">
                    <div>
                      {previewTemplate.fields.showLogo && (
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-xs font-bold text-white">
                            PI
                          </div>
                          <h2 className="text-base font-bold tracking-tight text-white">
                            {sampleEmployeeData.companyName}
                          </h2>
                        </div>
                      )}
                      {previewTemplate.fields.showCompanyAddress && (
                        <div className="mt-1 text-[11px] text-white/50 space-y-0.5">
                          <p>{sampleEmployeeData.companyAddress}</p>
                          <p>{sampleEmployeeData.cin} • {sampleEmployeeData.gstin}</p>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="rounded border border-blue-500/40 bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold text-blue-400 uppercase">
                        Salary Slip
                      </span>
                      <p className="mt-2 font-semibold text-white">
                        {sampleEmployeeData.month}
                      </p>
                      <p className="text-[10px] text-white/40">
                        Ref: {sampleEmployeeData.slipId}
                      </p>
                    </div>
                  </div>

                  {/* Employee & Bank Info */}
                  <div className="grid grid-cols-2 gap-4 border-b border-white/10 py-3">
                    <div className="space-y-1.5">
                      <div className="flex">
                        <span className="w-28 text-white/45">Employee Name</span>
                        <span className="font-semibold text-white">: {sampleEmployeeData.empName}</span>
                      </div>
                      <div className="flex">
                        <span className="w-28 text-white/45">Employee Code</span>
                        <span className="text-white">: {sampleEmployeeData.empCode}</span>
                      </div>
                      <div className="flex">
                        <span className="w-28 text-white/45">Designation</span>
                        <span className="text-white">: {sampleEmployeeData.designation}</span>
                      </div>
                      <div className="flex">
                        <span className="w-28 text-white/45">Department</span>
                        <span className="text-white">: {sampleEmployeeData.department}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {previewTemplate.fields.showBankDetails && (
                        <>
                          <div className="flex">
                            <span className="w-28 text-white/45">Bank Name</span>
                            <span className="text-white">: {sampleEmployeeData.bankName}</span>
                          </div>
                          <div className="flex">
                            <span className="w-28 text-white/45">Bank A/C No.</span>
                            <span className="text-white">: {sampleEmployeeData.accountNo}</span>
                          </div>
                        </>
                      )}
                      {previewTemplate.fields.showPanUan && (
                        <div className="flex">
                          <span className="w-28 text-white/45">PAN / UAN</span>
                          <span className="text-white">: {sampleEmployeeData.pan} / {sampleEmployeeData.uan}</span>
                        </div>
                      )}
                      {previewTemplate.fields.showAttendance && (
                        <div className="flex">
                          <span className="w-28 text-white/45">Days Paid</span>
                          <span className="text-white">: {sampleEmployeeData.paidDays} / {sampleEmployeeData.workingDays}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Earnings vs Deductions Table */}
                  <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10">
                    <div className="pr-3 py-2 space-y-1.5">
                      <div className="flex justify-between font-semibold text-blue-400 uppercase text-[11px] border-b border-white/10 pb-1">
                        <span>Earnings</span>
                        <span>Amount (₹)</span>
                      </div>
                      <div className="flex justify-between text-white/75">
                        <span>Basic Salary</span>
                        <span>₹{sampleEmployeeData.basic.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-white/75">
                        <span>HRA</span>
                        <span>₹{sampleEmployeeData.hra.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-white/75">
                        <span>Special Allowance</span>
                        <span>₹{sampleEmployeeData.specialAllowance.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-white/75">
                        <span>Conveyance</span>
                        <span>₹{sampleEmployeeData.conveyance.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-white/75">
                        <span>Bonus</span>
                        <span>₹{sampleEmployeeData.bonus.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <div className="pl-3 py-2 space-y-1.5">
                      <div className="flex justify-between font-semibold text-red-400 uppercase text-[11px] border-b border-white/10 pb-1">
                        <span>Deductions</span>
                        <span>Amount (₹)</span>
                      </div>
                      <div className="flex justify-between text-white/75">
                        <span>Provident Fund (PF)</span>
                        <span>₹{sampleEmployeeData.pf.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-white/75">
                        <span>Professional Tax (PT)</span>
                        <span>₹{sampleEmployeeData.pt.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-white/75">
                        <span>TDS / Income Tax</span>
                        <span>₹{sampleEmployeeData.tds.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-white/75">
                        <span>Insurance</span>
                        <span>₹{sampleEmployeeData.insurance.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtotals & Net Pay */}
                  <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10 py-2 font-semibold">
                    <div className="flex justify-between pr-3 text-white">
                      <span>Total Gross</span>
                      <span>₹{gross.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between pl-3 text-red-400">
                      <span>Total Deductions</span>
                      <span>₹{deductions.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-white uppercase">Net Take-Home Salary:</span>
                      {previewTemplate.fields.showAmountInWords && (
                        <p className="text-[11px] text-white/60">Ninety Thousand Two Hundred Rupees Only</p>
                      )}
                    </div>
                    <span className="text-base font-bold text-blue-400">₹{net.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end pt-3 text-[11px] text-white/45">
                    <p className="max-w-xs">{previewTemplate.notes}</p>
                    {previewTemplate.fields.showSignatory && (
                      <div className="text-center">
                        <div className="h-8 border-b border-dashed border-white/20 w-32" />
                        <p className="mt-1 font-medium text-white/60">Authorized Signatory</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* 2. MINIMALIST MODERN LAYOUT */}
              {/* ========================================================= */}
              {previewTemplate.layout === "Minimal" && (
                <div className="space-y-5 text-xs font-sans">
                  {/* Clean Monochrome Header */}
                  <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight text-white">
                        {sampleEmployeeData.companyName}
                      </h2>
                      <p className="text-[11px] text-white/45">{sampleEmployeeData.companyAddress}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-semibold text-white">{sampleEmployeeData.month}</p>
                      <p className="text-[10px] text-white/40">{sampleEmployeeData.slipId}</p>
                    </div>
                  </div>

                  {/* Clean 4-Column Metadata */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase">Employee</p>
                      <p className="font-medium text-white">{sampleEmployeeData.empName}</p>
                      <p className="text-[11px] text-white/50">{sampleEmployeeData.empCode}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase">Role / Dept</p>
                      <p className="font-medium text-white">{sampleEmployeeData.designation}</p>
                      <p className="text-[11px] text-white/50">{sampleEmployeeData.department}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase">Bank A/C</p>
                      <p className="font-mono text-white">{sampleEmployeeData.accountNo}</p>
                      <p className="text-[11px] text-white/50">{sampleEmployeeData.bankName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/40 uppercase">PAN Number</p>
                      <p className="font-mono text-white">{sampleEmployeeData.pan}</p>
                      <p className="text-[11px] text-white/50">Tax ID</p>
                    </div>
                  </div>

                  {/* Clean Minimalist Line Item Table */}
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

                  {/* Highlighted Net Salary */}
                  <div className="flex items-center justify-between border border-white/20 bg-white/5 px-4 py-3 rounded-2xl">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-white/50">Net Disbursed Amount</p>
                      {previewTemplate.fields.showAmountInWords && (
                        <p className="text-[11px] text-white/80 font-medium">Ninety Thousand Two Hundred Rupees Only</p>
                      )}
                    </div>
                    <p className="text-xl font-bold font-mono text-white">₹{net.toLocaleString("en-IN")}</p>
                  </div>

                  <p className="text-[10px] text-white/40 italic">{previewTemplate.notes}</p>
                </div>
              )}

              {/* ========================================================= */}
              {/* 3. EXECUTIVE PREMIUM LAYOUT */}
              {/* ========================================================= */}
              {previewTemplate.layout === "Executive" && (
                <div className="space-y-4 text-xs">
                  {/* Executive Dark/Emerald Banner Header */}
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 flex items-center justify-between">
                    <div>
                      <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
                        Executive Statement
                      </span>
                      <h2 className="mt-1.5 text-base font-bold text-white tracking-wide">
                        {sampleEmployeeData.companyName}
                      </h2>
                      <p className="text-[11px] text-emerald-200/60">{sampleEmployeeData.companyAddress}</p>
                    </div>

                    {previewTemplate.fields.showQrCode && (
                      <div className="flex flex-col items-center justify-center h-14 w-14 rounded-lg bg-emerald-900/40 border border-emerald-500/30 text-emerald-300">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        <span className="text-[8px] mt-0.5">VERIFIED</span>
                      </div>
                    )}
                  </div>

                  {/* Attendance Card Strip */}
                  {previewTemplate.fields.showAttendance && (
                    <div className="grid grid-cols-3 gap-2 rounded-xl bg-white/[0.03] p-2.5 text-center text-[11px]">
                      <div>
                        <span className="text-white/40">Total Days:</span> <strong className="text-white">30</strong>
                      </div>
                      <div>
                        <span className="text-white/40">Days Worked:</span> <strong className="text-emerald-400">30</strong>
                      </div>
                      <div>
                        <span className="text-white/40">Loss of Pay:</span> <strong className="text-white">0</strong>
                      </div>
                    </div>
                  )}

                  {/* Employee & Compensation Split */}
                  <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10 pb-3">
                    <div className="pr-3 space-y-1">
                      <p className="text-[11px] font-semibold text-emerald-400 uppercase">Executive Particulars</p>
                      <p className="text-white font-medium">{sampleEmployeeData.empName} ({sampleEmployeeData.empCode})</p>
                      <p className="text-white/60">{sampleEmployeeData.designation} • {sampleEmployeeData.department}</p>
                      <p className="text-white/45">Bank: {sampleEmployeeData.bankName} ({sampleEmployeeData.accountNo})</p>
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

                  {/* Net Pay */}
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-semibold text-white">NET SALARY CREDIT</p>
                      {previewTemplate.fields.showAmountInWords && (
                        <p className="text-[11px] text-emerald-200/70">Ninety Thousand Two Hundred Rupees Only</p>
                      )}
                    </div>
                    <p className="text-lg font-bold text-emerald-400">₹{net.toLocaleString("en-IN")}</p>
                  </div>

                  {previewTemplate.fields.showSignatory && (
                    <div className="flex justify-between items-end pt-2 text-[10px] text-white/40">
                      <p>{previewTemplate.notes}</p>
                      <div className="text-center">
                        <div className="h-6 border-b border-dashed border-emerald-500/40 w-28" />
                        <p className="mt-1 text-emerald-300">Finance Controller</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================= */}
              {/* 4. TECH STARTUP LAYOUT */}
              {/* ========================================================= */}
              {previewTemplate.layout === "Startup" && (
                <div className="space-y-4 text-xs">
                  {/* Gradient Brand Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-sm font-bold text-white shadow-lg shadow-purple-500/20">
                        PI
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-white">{sampleEmployeeData.companyName}</h2>
                        <p className="text-[11px] text-purple-300">{sampleEmployeeData.month}</p>
                      </div>
                    </div>

                    <span className="rounded-full bg-purple-500/15 border border-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-300">
                      Take-Home: ₹{net.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Card Columns for Earnings vs Deductions */}
                  <div className="grid gap-3 sm:grid-cols-2 pt-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
                      <div className="flex justify-between font-semibold text-purple-300 text-[11px]">
                        <span>Earnings</span>
                        <span>₹{gross.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="space-y-1 text-white/70 text-[11px]">
                        <div className="flex justify-between"><span>Basic Pay</span><span>₹55,000</span></div>
                        <div className="flex justify-between"><span>HRA</span><span>₹22,000</span></div>
                        <div className="flex justify-between"><span>Special Allowance</span><span>₹15,000</span></div>
                        <div className="flex justify-between"><span>Bonus</span><span>₹5,000</span></div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 space-y-2">
                      <div className="flex justify-between font-semibold text-pink-300 text-[11px]">
                        <span>Deductions</span>
                        <span>₹{deductions.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="space-y-1 text-white/70 text-[11px]">
                        <div className="flex justify-between"><span>PF</span><span>₹4,200</span></div>
                        <div className="flex justify-between"><span>PT</span><span>₹200</span></div>
                        <div className="flex justify-between"><span>TDS / Income Tax</span><span>₹5,800</span></div>
                        <div className="flex justify-between"><span>Insurance</span><span>₹1,000</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Verification footer */}
                  <div className="flex items-center justify-between rounded-xl bg-purple-950/20 border border-purple-500/20 p-3 text-[11px] text-white/60">
                    <span>{previewTemplate.notes}</span>
                    <span className="text-purple-300 font-medium">Verified ID: {sampleEmployeeData.slipId}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
