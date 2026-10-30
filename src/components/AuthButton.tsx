"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const buttonClass =
  "inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 active:scale-95 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

// Header control: "Sign in" when signed out, an account menu when signed in.
export default function AuthButton() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  if (status === "loading") {
    return <span className="h-9 w-20 animate-pulse rounded-xl bg-slate-100 dark:bg-neutral-900" aria-hidden="true" />;
  }

  if (!session?.user) {
    return (
      <Link href="/signin" className={buttonClass}>
        Sign in
      </Link>
    );
  }

  const name = session.user.name || session.user.email || "Account";
  const initials = name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={`Account menu for ${name}`}
        className={buttonClass}
      >
        {session.user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={session.user.image} alt="" className="h-6 w-6 rounded-full" referrerPolicy="no-referrer" />
        ) : (
          <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950">
            {initials}
          </span>
        )}
        <span className="hidden max-w-[10rem] truncate sm:inline">{name.split(" ")[0]}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="tb-pop absolute right-0 z-20 mt-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm shadow-xl dark:border-neutral-800 dark:bg-neutral-950"
        >
          <div className="border-b border-slate-200 px-4 py-3 dark:border-neutral-800">
            <p className="font-semibold text-slate-900 dark:text-white">{session.user.name}</p>
            <p className="truncate text-slate-500 dark:text-slate-400">{session.user.email}</p>
          </div>
          <Link role="menuitem" href="/account" onClick={() => setOpen(false)} className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-neutral-900">
            Saved employers
          </Link>
          <Link role="menuitem" href="/report" onClick={() => setOpen(false)} className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-neutral-900">
            Report a scam
          </Link>
          <button
            role="menuitem"
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="block w-full border-t border-slate-200 px-4 py-3 text-left text-red-600 hover:bg-slate-50 dark:border-neutral-800 dark:text-red-400 dark:hover:bg-neutral-900"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
