import { NextResponse } from "next/server";
import { Template } from "@/models/Template";
import { initialTemplatesSeed, seedDatabaseIfEmpty } from "../auth/seed/route";
import { isMongoConnectivityError } from "@/lib/mongo-errors";

type DemoTemplate = (typeof initialTemplatesSeed)[number];
type TemplateUpdateBody = {
  id?: string;
  isActive?: boolean;
  isDefault?: boolean;
  fields?: DemoTemplate["fields"];
  notes?: string;
};

let demoTemplates: DemoTemplate[] = initialTemplatesSeed.map((template) => ({
  ...template,
  fields: { ...template.fields },
}));

function sortDemoTemplates() {
  return [...demoTemplates].sort((a, b) => {
    if (a.isDefault !== b.isDefault) {
      return a.isDefault ? -1 : 1;
    }

    return a.name.localeCompare(b.name);
  });
}

function createDemoTemplate(id: string, updateData: Partial<DemoTemplate>) {
  const base = initialTemplatesSeed[0];
  return {
    ...base,
    ...updateData,
    id,
    fields: {
      ...base.fields,
      ...(updateData.fields || {}),
    },
  };
}

function updateDemoTemplate(id: string, updateData: Partial<DemoTemplate>) {
  const existingIndex = demoTemplates.findIndex((template) => template.id === id);

  if (updateData.isDefault) {
    demoTemplates = demoTemplates.map((template) => ({
      ...template,
      isDefault: template.id === id,
      isActive: template.id === id ? true : template.isActive,
    }));
  }

  if (existingIndex === -1) {
    const created = createDemoTemplate(id, updateData);
    demoTemplates = [...demoTemplates, created];
    return created;
  }

  const existing = demoTemplates[existingIndex];
  const updated = {
    ...existing,
    ...updateData,
    fields: updateData.fields
      ? { ...existing.fields, ...updateData.fields }
      : existing.fields,
  };

  if (typeof updateData.isDefault === "boolean") {
    updated.isDefault = updateData.isDefault;
  }

  if (typeof updateData.isActive === "boolean") {
    updated.isActive = updateData.isActive;
    if (!updateData.isActive) {
      updated.isDefault = false;
    }
  }

  demoTemplates[existingIndex] = updated;

  if (updated.isDefault) {
    demoTemplates = demoTemplates.map((template) =>
      template.id === id ? updated : { ...template, isDefault: false }
    );
  }

  return updated;
}

export async function GET() {
  try {
    const connected = await seedDatabaseIfEmpty();

    if (!connected) {
      return NextResponse.json({ success: true, templates: sortDemoTemplates(), mode: "demo" });
    }

    const templates = await Template.find({}).sort({ isDefault: -1, createdAt: 1 });
    return NextResponse.json({ success: true, templates });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Error fetching templates";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  let body: TemplateUpdateBody = {};

  try {
    body = await request.json();
    const { id, isActive, isDefault, fields, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Template ID is required." },
        { status: 400 }
      );
    }

    const connected = await seedDatabaseIfEmpty();

    if (!connected) {
      const updated = updateDemoTemplate(id, {
        isActive,
        isDefault,
        fields,
        notes,
      });

      return NextResponse.json({ success: true, template: updated, mode: "demo" });
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
    if (isMongoConnectivityError(error) && body?.id) {
      const updated = updateDemoTemplate(body.id, body);
      return NextResponse.json({ success: true, template: updated, mode: "demo" });
    }

    const errorMessage = error instanceof Error ? error.message : "Error updating template";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
