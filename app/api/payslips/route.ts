import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Payslip } from "@/models/Payslip";

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

    const slipId = body.id || `PS-2026-${Date.now().toString().slice(-4)}`;

    const saved = await Payslip.findOneAndUpdate(
      { id: slipId },
      { $set: { ...body, id: slipId } },
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
