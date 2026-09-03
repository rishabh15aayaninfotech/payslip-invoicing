import { SectionPlaceholder } from "../../_components/section-placeholder";

export default function InvoicesPage() {
  return (
    <SectionPlaceholder
      eyebrow="Invoices"
      title="Invoice management will live here"
      description="This page is ready for table filters, invoice details, exports, and API-powered CRUD work."
      bullets={[
        "Add searchable invoice tables",
        "Wire create and edit flows",
        "Attach backend endpoints later",
        "Support mobile-friendly review screens",
      ]}
    />
  );
}
