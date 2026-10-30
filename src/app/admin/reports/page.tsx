import type { Metadata } from "next";
import Link from "next/link";
import { auth, isAdmin } from "@/auth";
import PageShell, { Card } from "@/components/PageShell";
import type { ScamReport } from "@/lib/reports";
import { listJson } from "@/lib/storage";

export const metadata: Metadata = {
  title: "Scam reports — TheBox admin",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

// Private list of scam reports, visible only to emails in ADMIN_EMAILS.
export default async function AdminReportsPage() {
  const session = await auth();
  const email = session?.user?.email;

  if (!isAdmin(email)) {
    return (
      <PageShell badge="Admin" title="Scam reports" intro="This page is only for TheBox's team.">
        <Card title={email ? "No access" : "Sign in required"}>
          {email ? (
            <p>{email} doesn&apos;t have access to reports.</p>
          ) : (
            <Link href="/signin?callbackUrl=/admin/reports" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
              Sign in
            </Link>
          )}
        </Card>
      </PageShell>
    );
  }

  const reports = (await listJson<ScamReport>("reports/")).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <PageShell
      badge="Admin"
      title="Scam reports"
      intro={`${reports.length} ${reports.length === 1 ? "report" : "reports"}, newest first. Reports are private; only TheBox admins can see this page.`}
    >
      {reports.length === 0 ? (
        <Card title="No reports yet">
          <p>When signed-in visitors send a report, it shows up here.</p>
        </Card>
      ) : (
        reports.map((report) => (
          <Card key={report.id} title={`${report.employer} — ${new Date(report.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/Indiana/Indianapolis" })}`}>
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="font-semibold text-slate-900 dark:text-white">Reported by</dt>
                <dd>{report.reporterName ? `${report.reporterName} · ` : ""}{report.reporterEmail}</dd>
              </div>
              {report.link && (
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-white">Link or contact involved</dt>
                  <dd className="break-all">{report.link}</dd>
                </div>
              )}
              <div>
                <dt className="font-semibold text-slate-900 dark:text-white">What happened</dt>
                <dd className="whitespace-pre-wrap">{report.details}</dd>
              </div>
              {report.flags.length > 0 && (
                <div>
                  <dt className="font-semibold text-slate-900 dark:text-white">Warning signs</dt>
                  <dd>
                    <ul className="list-disc pl-5">
                      {report.flags.map((flag) => <li key={flag}>{flag}</li>)}
                    </ul>
                  </dd>
                </div>
              )}
            </dl>
          </Card>
        ))
      )}
    </PageShell>
  );
}
