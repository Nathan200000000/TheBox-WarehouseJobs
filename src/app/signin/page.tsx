import type { Metadata } from "next";
import PageShell, { Card } from "@/components/PageShell";
import SignInOptions from "./SignInOptions";

export const metadata: Metadata = {
  title: "Sign in — TheBox",
  description: "Sign in to TheBox with your Google account.",
};

export default function SignInPage() {
  return (
    <PageShell
      badge="Account"
      title="Sign in to TheBox"
      intro="Use your Google account to save employers and send scam reports privately. TheBox only receives your name, email address and profile picture."
    >
      <Card title="Continue with Google">
        <SignInOptions />
      </Card>
    </PageShell>
  );
}
