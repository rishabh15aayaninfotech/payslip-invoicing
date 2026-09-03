import { SectionPlaceholder } from "../../_components/section-placeholder";

export default function ReportsPage() {
  return (
    <SectionPlaceholder
      eyebrow="Reports"
      title="Analytics and reporting are ready for expansion"
      description="Use this route for month-end summaries, export tools, chart dashboards, and compliance reporting."
      bullets={[
        "Show monthly trends and totals",
        "Add PDF and CSV exports",
        "Surface compliance snapshots",
        "Build role-specific report views",
      ]}
    />
  );
}
