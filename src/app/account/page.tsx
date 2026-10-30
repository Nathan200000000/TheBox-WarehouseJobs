import type { Metadata } from "next";
import PageShell, { Card } from "@/components/PageShell";
import AccountDetails from "./AccountDetails";

export const metadata: Metadata = {
  title: "Your account — TheBox",
};

export default function AccountPage() {
  return (
    <PageShell
      badge="Account"
      title="Saved employers"
      intro="Employers you've saved on TheBox. Each one links straight to its official hiring website."
    >
      <Card title="Your saved employers">
        <AccountDetails />
      </Card>
    </PageShell>
  );
}
