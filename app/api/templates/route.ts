import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Template } from "@/models/Template";

export async function GET() {
  try {
    await connectToDatabase();

    const templates = await Template.find({}).sort({ isDefault: -1, createdAt: 1 });
    return NextResponse.json({ success: true, templates });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error fetching templates";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { id, isActive, isDefault, fields, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Template ID is required." },
        { status: 400 }
      );
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await Template.updateMany({ id: { $ne: id } }, { $set: { isDefault: false } });
    }

    const updateData: Record<string, unknown> = {};
    if (typeof isActive === "boolean") updateData.isActive = isActive;
    if (typeof isDefault === "boolean") updateData.isDefault = isDefault;
    if (fields) updateData.fields = fields;
    if (typeof notes === "string") updateData.notes = notes;

    const updated = await Template.findOneAndUpdate(
      { id },
      { $set: updateData },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, template: updated });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error updating template";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
