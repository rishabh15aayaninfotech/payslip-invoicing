import { SectionPlaceholder } from "../../_components/section-placeholder";

export default function PayoutsPage() {
  return (
    <SectionPlaceholder
      eyebrow="Payouts"
      title="Payout workflows can be expanded here"
      description="Use this route for payout batching, approvals, bank integration, and transaction tracking."
      bullets={[
        "Batch payouts by company or payroll cycle",
        "Show approval and transfer status",
        "Add reconciliation and audit logs",
        "Surface exceptions and retries",
      ]}
    />
  );
}
