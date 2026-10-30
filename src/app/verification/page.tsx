import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { Card } from "@/components/PageShell";
import RedFlags from "@/components/RedFlags";
import { EMPLOYERS } from "@/lib/employers";

export const metadata: Metadata = {
  title: "How TheBox verifies employers — TheBox",
  description: "The checks every employer passes before TheBox lists it.",
};

const CHECKS = [
  {
    title: "Official employer",
    text: "The company is a real warehouse or logistics employer that hires directly, not a staffing agency or recruiter.",
  },
  {
    title: "Official hiring website",
    text: "The careers site belongs to the employer itself, on the employer's own web address.",
  },
  {
    title: "Direct application",
    text: "You apply on the employer's site. TheBox never collects applications or sits in the middle.",
  },
  {
    title: "Destination shown up front",
    text: "Every employer page shows exactly where you'll be sent before you leave TheBox.",
  },
  {
    title: "Free to apply",
    text: "No listed employer charges you to apply. A request for money is a scam; report it.",
  },
];

export default function VerificationPage() {
  return (
    <PageShell
      badge="Verification"
      title="How TheBox verifies employers"
      intro="TheBox would rather show fewer trustworthy employers than thousands of questionable listings. Every employer passes these checks before it appears here."
    >
      <Card title="The checks">
        <ol className="grid gap-5">
          {CHECKS.map((check, index) => (
            <li key={check.title} className="grid grid-cols-[2rem_1fr] gap-3">
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>
                <strong className="text-slate-900 dark:text-white">{check.title}.</strong>{" "}
                {check.text}
              </span>
            </li>
          ))}
        </ol>
      </Card>

      <Card title="Verified employers">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 dark:border-neutral-800">
                <th className="py-3 pr-4 font-medium">Employer</th>
                <th className="py-3 pr-4 font-medium">Industry</th>
                <th className="py-3 pr-4 font-medium">Official hiring site</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {EMPLOYERS.map((employer) => (
                <tr key={employer.slug} className="border-b border-slate-100 last:border-0 dark:border-neutral-900">
                  <td className="py-3 pr-4">
                    <Link href={employer.pageUrl} className="font-semibold text-slate-900 hover:underline dark:text-white">
                      {employer.name}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">{employer.industry}</td>
                  <td className="py-3 pr-4">{employer.destination}</td>
                  <td className="py-3 font-medium text-emerald-600 dark:text-emerald-400">✓ Verified</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Warning signs of a fake job offer">
        <RedFlags />
        <p className="mt-6">
          Seen one of these?{" "}
          <Link href="/report" className="font-semibold text-red-600 hover:underline dark:text-red-400">
            Report it to TheBox
          </Link>
          .
        </p>
      </Card>
    </PageShell>
  );
}
