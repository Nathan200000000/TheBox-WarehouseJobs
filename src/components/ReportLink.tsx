import Link from "next/link";

// Shown on every employer page: lets visitors flag a problem with that listing.
export default function ReportLink({ slug, name }: { slug: string; name: string }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Something look wrong?</h2>
      <p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
        If a link here doesn&apos;t lead to {name}&apos;s official hiring site, or someone
        contacted you claiming to hire for {name}, let us know.
      </p>
      <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
        <Link
          href={`/report?employer=${slug}`}
          className="text-red-600 hover:underline dark:text-red-400"
        >
          Report a problem with this listing
        </Link>
        <Link href="/verification" className="text-emerald-600 hover:underline dark:text-emerald-400">
          How TheBox verifies employers
        </Link>
      </div>
    </section>
  );
}
