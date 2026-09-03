import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Template } from "@/models/Template";
import { Payslip } from "@/models/Payslip";
import bcrypt from "bcryptjs";

export const initialTemplatesSeed = [
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
      "This is a computer-generated payslip authorized by finance. No physical signature is required.",
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
    isActive: true,
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

export const initialPayslipsSeed = [
  {
    id: "PS-2026-0401",
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
    status: "Disbursed",
    templateLayout: "Corporate",
  },
  {
    id: "PS-2026-0402",
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
    status: "Generated",
    templateLayout: "Minimal",
  },
];

export async function seedDatabaseIfEmpty() {
  await connectToDatabase();

  // 1. Seed Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await User.findOneAndUpdate(
    { email: "admin@payslip.in" },
    {
      $set: {
        name: "Rishabh Chandra",
        role: "ADMIN",
      },
      $setOnInsert: {
        password: hashedPassword,
        email: "admin@payslip.in",
      },
    },
    {
      upsert: true,
      new: true,
    }
  );

  // 2. Seed Templates
  const templateCount = await Template.countDocuments();
  if (templateCount === 0) {
    await Template.insertMany(initialTemplatesSeed);
  }

  // 3. Seed Payslips
  const payslipCount = await Payslip.countDocuments();
  if (payslipCount === 0) {
    await Payslip.insertMany(initialPayslipsSeed);
  }
}

export async function GET() {
  try {
    await seedDatabaseIfEmpty();
    return NextResponse.json({
      success: true,
      message: "MongoDB Atlas database initialized and seeded successfully.",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
