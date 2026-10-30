"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, type ReactNode } from "react";
import { useSaved } from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";
import { EMPLOYERS } from "@/lib/employers";

// Simple line icons (24×24), drawn with the current text color.
const ICONS: Record<string, ReactNode> = {
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" />
    </>
  ),
  jobs: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5.5 5.5" />
    </>
  ),
  saved: <path d="M6 3.5h12v17l-6-4.2-6 4.2z" />,
  verification: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.4 3.1 8.3 7.5 9.5 4.4-1.2 7.5-5.1 7.5-9.5V6z" />
      <path d="m8.8 12.2 2.3 2.3 4.3-4.6" />
    </>
  ),
  report: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4.5h11.5l-2 4 2 4H5" />
    </>
  ),
  employers: (
    <>
      <path d="M4 20.5V8l6-3.5v16" />
      <path d="M10 20.5V9.5l10 3.5v7.5" />
      <path d="M3 20.5h18" />
    </>
  ),
  privacy: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} shrink-0`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

type NavItem = { href: string; label: string; icon: string; count?: number };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/jobs") return pathname === "/jobs" || pathname.startsWith("/employers/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { saved } = useSaved();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const main: NavItem[] = [
    { href: "/", label: "Dashboard", icon: "dashboard" },
    { href: "/jobs", label: "Find Employers", icon: "jobs", count: EMPLOYERS.length },
    { href: "/account", label: "Saved", icon: "saved", count: saved.size || undefined },
    { href: "/verification", label: "Verification", icon: "verification" },
    { href: "/report", label: "Report a Scam", icon: "report" },
    { href: "/for-employers", label: "For Employers", icon: "employers" },
  ];
  const secondary: NavItem[] = [{ href: "/privacy", label: "Privacy", icon: "privacy" }];
  const current = [...main, ...secondary].find((item) => isActive(pathname, item.href));

  const navLink = (item: NavItem) => {
    const active = isActive(pathname, item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
          active
            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-neutral-900 dark:hover:text-white"
        }`}
      >
        <Icon name={item.icon} />
        {item.label}
        {item.count !== undefined && (
          <span
            className={`ml-auto min-w-6 rounded-full px-2 py-0.5 text-center text-xs font-semibold tabular-nums ${
              active ? "bg-slate-950/15 text-slate-950" : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            }`}
          >
            {item.count}
          </span>
        )}
      </Link>
    );
  };

  const name = session?.user?.name || session?.user?.email || "";
  const initials = name
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col gap-6 border-r border-slate-200 bg-white px-4 py-6 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 dark:border-neutral-800 dark:bg-neutral-950 ${
          open ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 px-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/25">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.5 8 12 3.5 20.5 8v8L12 20.5 3.5 16z M3.5 8 12 12.5 20.5 8 M12 12.5v8" />
            </svg>
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight tracking-tight text-slate-950 dark:text-white">TheBox</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">Direct warehouse jobs</span>
          </span>
        </Link>

        <nav aria-label="Main" className="grid gap-1">
          {main.map(navLink)}
          <div className="mx-3 my-3 h-px bg-slate-200 dark:bg-neutral-800" />
          {secondary.map(navLink)}
        </nav>

        <div className="mt-auto grid gap-3">
          <ThemeToggle />
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
            {status === "loading" ? (
              <div className="h-10 animate-pulse rounded-xl bg-slate-200 dark:bg-neutral-800" />
            ) : session?.user ? (
              <div className="grid gap-2">
                <div className="flex items-center gap-3">
                  {session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="" className="h-9 w-9 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-sm font-bold text-slate-950">{initials}</span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-900 dark:text-white">{session.user.name}</span>
                    <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{session.user.email}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-left text-xs font-semibold text-red-600 hover:underline dark:text-red-400"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="grid gap-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">Sign in to save employers and report scams privately.</p>
                <Link
                  href="/signin"
                  className="rounded-xl bg-emerald-500 px-3 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 active:scale-95"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden dark:border-neutral-800 dark:bg-black/90">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            <Icon name="menu" />
          </button>
          <Link href="/" className="font-bold text-slate-950 dark:text-white">TheBox</Link>
          {current && <span className="truncate text-sm text-slate-500 dark:text-slate-400">/ {current.label}</span>}
        </div>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-slate-200 bg-white px-6 py-6 text-sm text-slate-500 dark:border-neutral-800 dark:bg-black dark:text-slate-400">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 TheBox. Direct warehouse jobs.</p>
            <p>TheBox is not a staffing agency and does not guarantee employment.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
