import { SectionPlaceholder } from "../../_components/section-placeholder";

export default function EmployeesPage() {
  return (
    <SectionPlaceholder
      eyebrow="Employees"
      title="Employee records belong here"
      description="This section can grow into profiles, department management, salary history, and document handling."
      bullets={[
        "Create employee profile forms",
        "Track departments and roles",
        "Store salary and payout settings",
        "Prepare for document uploads",
      ]}
    />
  );
}
