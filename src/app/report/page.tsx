import type { Metadata } from "next";
import PageShell, { Card } from "@/components/PageShell";
import RedFlags from "@/components/RedFlags";
import ReportForm from "./ReportForm";

export const metadata: Metadata = {
  title: "Report a scam — TheBox",
  description: "Report a suspicious or misleading warehouse job listing.",
};

export default function ReportPage() {
  return (
    <PageShell
      badge="Report a Scam"
      title="Report a suspicious listing"
      intro="Help keep TheBox trustworthy. Tell us about a link that doesn't go where it should, or anyone who contacted you pretending to hire for a warehouse employer."
    >
      <Card title="Your report">
        <ReportForm />
      </Card>

      <Card title="Warning signs to look for">
        <RedFlags />
      </Card>
    </PageShell>
  );
}
