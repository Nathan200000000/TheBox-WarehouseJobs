"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useSaved } from "@/components/Providers";

// Bookmark an employer. Signed-out visitors are sent to sign in first.
export default function SaveEmployerButton({ slug, name }: { slug: string; name: string }) {
  const { status } = useSession();
  const { saved, toggle } = useSaved();
  const router = useRouter();
  const pathname = usePathname();
  const isSaved = saved.has(slug);

  const onClick = () => {
    if (status !== "authenticated") {
      router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }
    void toggle(slug);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSaved}
      aria-label={isSaved ? `Remove ${name} from saved employers` : `Save ${name}`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition active:scale-95 ${
        isSaved
          ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
          : "border-slate-300 text-slate-600 hover:border-emerald-500 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-emerald-300"
      }`}
    >
      <svg key={String(isSaved)} viewBox="0 0 24 24" className={`h-3.5 w-3.5 ${isSaved ? "tb-spin-in" : ""}`} aria-hidden="true">
        <path
          d="M6 3.5h12v17l-6-4.2-6 4.2z"
          fill={isSaved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}
