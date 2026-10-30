import type { Metadata } from "next";
import PageShell, { Card } from "@/components/PageShell";
import { newIssueUrl } from "@/lib/employers";

export const metadata: Metadata = {
  title: "For employers — TheBox",
  description: "How warehouse and logistics employers get listed on TheBox.",
};

const REQUIREMENTS = [
  "You hire warehouse or logistics workers directly (not as a staffing agency or recruiter).",
  "Applicants apply on your own official careers website.",
  "Applying is free. You never charge candidates for training, equipment or background checks.",
  "Your careers site is on your company's own web address.",
];

const REQUEST_BODY = `**Company name:**

**Official careers page (link):**

**Warehouse roles you hire for:**

**Locations:**

**Contact name and work email (company domain):**

**Request type:** New listing / Correction to an existing listing

**Details:**
`;

export default function ForEmployersPage() {
  const requestUrl = newIssueUrl("[Employer request] ", REQUEST_BODY);

  return (
    <PageShell
      title="Reach warehouse workers directly"
      intro="TheBox sends job seekers straight to your official hiring website, with no middlemen. There's no fee to be listed, and we never take applications on your behalf."
    >
      <Card title="Who can be listed">
        <ul className="grid gap-3">
          {REQUIREMENTS.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden="true" className="font-bold text-emerald-600 dark:text-emerald-400">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="How it works">
        <ol className="grid gap-3">
          <li><strong className="text-slate-900 dark:text-white">1. Send a request</strong> with your official careers page.</li>
          <li><strong className="text-slate-900 dark:text-white">2. TheBox checks it</strong> against our verification checks.</li>
          <li><strong className="text-slate-900 dark:text-white">3. Your employer page goes live</strong>, linking directly to your careers site.</li>
        </ol>
      </Card>

      <Card title="Request a listing or a correction">
        <p>
          Requests are filed on TheBox&apos;s GitHub page (a free GitHub account is
          needed). Please use a work email on your company&apos;s domain so we can
          confirm the request comes from you.
        </p>
        <a
          href={requestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Send an employer request
        </a>
      </Card>
    </PageShell>
  );
}
