import Link from "next/link";
import type { ReactNode } from "react";

// Shared layout for TheBox's information pages (matches the employer pages).
export default function PageShell({
  badge,
  title,
  intro,
  children,
}: {
  badge: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen w-full bg-white text-slate-900 dark:bg-black dark:text-white">
      <section className="w-full border-b border-slate-200 bg-white dark:border-neutral-800 dark:bg-black">
        <div className="mx-auto w-full max-w-5xl px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            ← Back to TheBox
          </Link>
        </div>
      </section>

      <section className="w-full bg-slate-50 dark:bg-black">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <div className="mb-5 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            {badge}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl dark:text-white">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            {intro}
          </p>
          <div className="mt-10 grid gap-6">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{title}</h2>
      <div className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{children}</div>
    </section>
  );
}
