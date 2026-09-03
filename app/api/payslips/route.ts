import { NextResponse } from "next/server";
import { Payslip } from "@/models/Payslip";
import { initialPayslipsSeed, seedDatabaseIfEmpty } from "../auth/seed/route";
import { isMongoConnectivityError } from "@/lib/mongo-errors";

type DemoPayslip = (typeof initialPayslipsSeed)[number];
type PayslipBody = Partial<DemoPayslip>;

let demoPayslips: DemoPayslip[] = [...initialPayslipsSeed];

function sortDemoPayslips() {
  return [...demoPayslips];
}

function upsertDemoPayslip(input: Partial<DemoPayslip> & { id: string }) {
  const existingIndex = demoPayslips.findIndex((payslip) => payslip.id === input.id);
  const updated = {
    ...(existingIndex >= 0 ? demoPayslips[existingIndex] : initialPayslipsSeed[0]),
    ...input,
    id: input.id,
  };

  if (existingIndex >= 0) {
    demoPayslips[existingIndex] = updated;
  } else {
    demoPayslips = [updated, ...demoPayslips];
  }

  return updated;
}

function deleteDemoPayslip(id: string) {
  demoPayslips = demoPayslips.filter((payslip) => payslip.id !== id);
}

export async function GET() {
  try {
    const connected = await seedDatabaseIfEmpty();

    if (!connected) {
      return NextResponse.json({ success: true, payslips: sortDemoPayslips(), mode: "demo" });
    }

    const payslips = await Payslip.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, payslips });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error fetching payslips";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: PayslipBody = {};

  try {
    body = await request.json();

    if (!body.empName) {
      return NextResponse.json(
        { success: false, error: "Employee Name is required." },
        { status: 400 }
      );
    }

    const slipId = body.id || `PS-2026-${Date.now().toString().slice(-4)}`;
    const connected = await seedDatabaseIfEmpty();

    if (!connected) {
      const saved = upsertDemoPayslip({ ...body, id: slipId });
      return NextResponse.json({ success: true, payslip: saved, mode: "demo" });
    }

    const saved = await Payslip.findOneAndUpdate(
      { id: slipId },
      { $set: { ...body, id: slipId } },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, payslip: saved });
  } catch (error: unknown) {
    if (isMongoConnectivityError(error) && body?.empName) {
      const slipId = body.id || `PS-2026-${Date.now().toString().slice(-4)}`;
      const saved = upsertDemoPayslip({ ...body, id: slipId });
      return NextResponse.json({ success: true, payslip: saved, mode: "demo" });
    }

    const errorMessage = error instanceof Error ? error.message : "Error saving payslip";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Slip ID is required" }, { status: 400 });
    }

    const connected = await seedDatabaseIfEmpty();

    if (!connected) {
      deleteDemoPayslip(id);
      return NextResponse.json({ success: true, message: "Payslip deleted successfully", mode: "demo" });
    }

    await Payslip.findOneAndDelete({ id });
    return NextResponse.json({ success: true, message: "Payslip deleted successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error deleting payslip";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
