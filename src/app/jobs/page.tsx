import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import EmployerFinder from "./EmployerFinder";

export const metadata: Metadata = {
  title: "Find employers — TheBox",
  description: "Search verified warehouse employers by role, industry or name.",
};

// Rendered per request so the search in the address (?q=, ?industry=, ...)
// is already applied in the first HTML, and the page hydrates in one pass.
export default async function JobsPage({ searchParams }: PageProps<"/jobs">) {
  await searchParams;

  return (
    <PageShell
      title="Find employers."
      intro="Search verified warehouse and logistics employers by role, industry or name, then apply directly on their official hiring site."
      actions={
        <Link
          href="/verification"
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-neutral-950 dark:text-slate-200 dark:hover:bg-neutral-900"
        >
          How we verify
        </Link>
      }
    >
      <EmployerFinder />
    </PageShell>
  );
}
