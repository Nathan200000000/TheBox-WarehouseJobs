import type { ReactNode } from "react";

// Shared screen layout: a large title with an intro, optional actions on the
// right, then the screen's panels.
export default function PageShell({
  badge,
  title,
  intro,
  actions,
  children,
}: {
  badge?: string;
  title: string;
  intro: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-full w-full bg-slate-50 text-slate-900 dark:bg-black dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            {badge && (
              <div className="mb-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                {badge}
              </div>
            )}
            <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl dark:text-white">{title}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">{intro}</p>
          </div>
          {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
        </header>
        <div className="grid gap-6">{children}</div>
      </div>
    </main>
  );
}

export function Card({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-950 dark:text-white">{title}</h2>
        {action}
      </div>
      <div className="mt-4 leading-7 text-slate-600 dark:text-slate-400">{children}</div>
    </section>
  );
}
