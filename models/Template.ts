import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITemplate extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema = new Schema<ITemplate>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, default: "Standard" },
    description: { type: String, default: "" },
    themeColor: { type: String, default: "#3b82f6" },
    themeGradient: { type: String, default: "from-blue-600 to-indigo-600" },
    accentBg: { type: String, default: "bg-blue-500/10" },
    accentText: { type: String, default: "text-blue-400" },
    accentBorder: { type: String, default: "border-blue-500/30" },
    isActive: { type: Boolean, default: true },
    isDefault: { type: Boolean, default: false },
    layout: {
      type: String,
      enum: ["Corporate", "Minimal", "Executive", "Startup"],
      default: "Corporate",
    },
    fields: {
      showLogo: { type: Boolean, default: true },
      showCompanyAddress: { type: Boolean, default: true },
      showPanUan: { type: Boolean, default: true },
      showBankDetails: { type: Boolean, default: true },
      showAttendance: { type: Boolean, default: true },
      showAmountInWords: { type: Boolean, default: true },
      showSignatory: { type: Boolean, default: true },
      showQrCode: { type: Boolean, default: false },
    },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Template: Model<ITemplate> =
  mongoose.models.Template || mongoose.model<ITemplate>("Template", TemplateSchema);
