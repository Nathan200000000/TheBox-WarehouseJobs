"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useSaved } from "@/components/Providers";
import SaveEmployerButton from "@/components/SaveEmployerButton";
import { EMPLOYERS } from "@/lib/employers";

export default function AccountDetails() {
  const { data: session, status } = useSession();
  const { saved, ready, clearAll } = useSaved();

  if (status === "loading" || (status === "authenticated" && !ready)) {
    return <p className="animate-pulse">Loading your saved employers…</p>;
  }

  if (!session?.user) {
    return (
      <div className="grid gap-4">
        <p>Sign in with Google to save employers and see them here on any device.</p>
        <Link
          href="/signin?callbackUrl=/account"
          className="inline-flex w-fit rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const employers = EMPLOYERS.filter((employer) => saved.has(employer.slug));

  return (
    <div className="grid gap-6">
      <p className="text-sm">
        Signed in as <strong className="text-slate-900 dark:text-white">{session.user.email}</strong>
      </p>

      {employers.length === 0 ? (
        <div className="tb-enter rounded-xl border border-dashed border-slate-300 p-6 text-center dark:border-slate-700">
          <p className="font-semibold text-slate-900 dark:text-white">No saved employers yet</p>
          <p className="mt-1 text-sm">
            Tap <strong>Save</strong> on any employer to keep it here.{" "}
            <Link href="/jobs" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
              Browse employers
            </Link>
          </p>
        </div>
      ) : (
        <ul className="grid gap-3">
          {employers.map((employer) => (
            <li
              key={employer.slug}
              className="tb-enter flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 dark:border-neutral-800"
            >
              <div>
                <Link href={employer.pageUrl} className="font-semibold text-slate-900 hover:underline dark:text-white">
                  {employer.name}
                </Link>
                <p className="text-sm">{employer.industry} · {employer.destination}</p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={employer.jobsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Go to {employer.name} jobs
                </a>
                <SaveEmployerButton slug={employer.slug} name={employer.name} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-4 border-t border-slate-200 pt-5 text-sm dark:border-neutral-800">
        {employers.length > 0 && (
          <button type="button" onClick={() => void clearAll()} className="font-semibold text-slate-700 hover:underline dark:text-slate-300">
            Remove all saved employers
          </button>
        )}
        <button type="button" onClick={() => signOut({ callbackUrl: "/" })} className="font-semibold text-red-600 hover:underline dark:text-red-400">
          Sign out
        </button>
      </div>
    </div>
  );
}
