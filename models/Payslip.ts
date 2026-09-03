import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPayslip extends Document {
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
  // Settings
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
  templateLayout: string;
  createdAt: Date;
  updatedAt: Date;
}

const PayslipSchema = new Schema<IPayslip>(
  {
    id: { type: String, required: true, unique: true },
    companyName: { type: String, default: "PAYSLIP PRO TECH PVT. LTD." },
    companyAddress: { type: String, default: "Plot No. 42, Cyber City Tech Hub, Bengaluru - 560100" },
    cin: { type: String, default: "CIN: U72200KA2023PTC128492" },
    gstin: { type: String, default: "GSTIN: 29AAACP0124M1ZR" },
    empCode: { type: String, required: true },
    empName: { type: String, required: true },
    email: { type: String, default: "" },
    designation: { type: String, default: "Employee" },
    department: { type: String, default: "General" },
    month: { type: String, default: "April" },
    year: { type: String, default: "2026" },
    dateOfJoining: { type: String, default: "" },
    bankName: { type: String, default: "" },
    accountNo: { type: String, default: "" },
    ifsc: { type: String, default: "" },
    pan: { type: String, default: "" },
    uan: { type: String, default: "" },
    workingDays: { type: Number, default: 30 },
    paidDays: { type: Number, default: 30 },
    lopDays: { type: Number, default: 0 },
    // Earnings
    basic: { type: Number, default: 0 },
    hra: { type: Number, default: 0 },
    specialAllowance: { type: Number, default: 0 },
    conveyance: { type: Number, default: 0 },
    bonus: { type: Number, default: 0 },
    // Deductions
    pf: { type: Number, default: 0 },
    pt: { type: Number, default: 0 },
    tds: { type: Number, default: 0 },
    insurance: { type: Number, default: 0 },
    lop: { type: Number, default: 0 },
    // Toggles
    showLogo: { type: Boolean, default: true },
    showCompanyAddress: { type: Boolean, default: true },
    showPanUan: { type: Boolean, default: true },
    showBankDetails: { type: Boolean, default: true },
    showAttendance: { type: Boolean, default: true },
    showAmountInWords: { type: Boolean, default: true },
    showSignatory: { type: Boolean, default: true },
    showQrCode: { type: Boolean, default: false },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Disbursed", "Generated", "Draft"],
      default: "Generated",
    },
    templateLayout: { type: String, default: "Corporate" },
  },
  {
    timestamps: true,
  }
);

export const Payslip: Model<IPayslip> =
  mongoose.models.Payslip || mongoose.model<IPayslip>("Payslip", PayslipSchema);
