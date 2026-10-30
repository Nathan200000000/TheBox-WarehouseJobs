import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { Card } from "@/components/PageShell";
import { REPO_URL } from "@/lib/employers";

export const metadata: Metadata = {
  title: "Privacy policy — TheBox",
  description: "What information TheBox collects and how it's used.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy policy"
      intro="TheBox collects as little as possible. You can browse employers and apply without an account."
    >
      <Card title="What we collect">
        <ul className="grid list-disc gap-2 pl-5">
          <li>
            <strong className="text-slate-900 dark:text-white">When you sign in with Google:</strong> your name,
            email address and profile picture. We don&apos;t get your password or access to your Gmail, contacts or files.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Saved employers:</strong> the list of employers you save.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Scam reports:</strong> what you write in a report, along
            with your name and email so we can follow up.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Your theme choice</strong> (light or dark) is stored in your
            own browser only.
          </li>
        </ul>
      </Card>

      <Card title="How we use it">
        <p>
          Only to run TheBox: keeping you signed in, showing your saved employers, and reviewing scam reports to keep
          listings trustworthy. We don&apos;t sell your information, share it with employers, or use it for advertising.
        </p>
      </Card>

      <Card title="Where it's stored">
        <p>
          TheBox is hosted on Vercel. Saved employers and reports are kept in private storage that only TheBox can read.
          Sign-in sessions are kept in a secure cookie in your browser.
        </p>
      </Card>

      <Card title="Your choices">
        <ul className="grid list-disc gap-2 pl-5">
          <li>Remove your saved employers at any time from <Link href="/account" className="font-medium underline">your account</Link>.</li>
          <li>Sign out at any time. You can also remove TheBox&apos;s access in your Google Account settings.</li>
          <li>
            To have your reports or other information deleted, contact us through{" "}
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="font-medium underline">TheBox on GitHub</a>.
          </li>
        </ul>
      </Card>

      <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: October 30, 2026.</p>
    </PageShell>
  );
}
