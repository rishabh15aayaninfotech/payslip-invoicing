import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Payslip } from "@/models/Payslip";

function generateSlipId() {
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PS-${timestamp.slice(0, 8)}-${timestamp.slice(8, 12)}${suffix}`;
}

export async function GET() {
  try {
    await connectToDatabase();

    const payslips = await Payslip.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, payslips });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error fetching payslips";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.empName) {
      return NextResponse.json(
        { success: false, error: "Employee Name is required." },
        { status: 400 }
      );
    }

    const forceNew = body.forceNew === true;
    const slipId = forceNew ? generateSlipId() : body.id || generateSlipId();

    const payload = { ...body };
    delete payload.forceNew;

    const saved = forceNew
      ? await Payslip.create({ ...payload, id: slipId })
      : await Payslip.findOneAndUpdate(
          { id: slipId },
          { $set: { ...payload, id: slipId } },
          { new: true, upsert: true }
        );

    return NextResponse.json({ success: true, payslip: saved });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error saving payslip";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Slip ID is required" }, { status: 400 });
    }

    await Payslip.findOneAndDelete({ id });
    return NextResponse.json({ success: true, message: "Payslip deleted successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error deleting payslip";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
