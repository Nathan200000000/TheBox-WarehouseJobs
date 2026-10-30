"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, type FormEvent } from "react";

import { useSaved } from "@/components/Providers";
import { EMPLOYERS, INDUSTRIES, ROLES } from "@/lib/employers";

const inputClass =
  "min-w-0 rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none placeholder:text-slate-500 focus:border-emerald-500 dark:border-slate-700 dark:bg-black dark:text-white";

const panelClass =
  "rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-950";

const STEPS = [
  {
    href: "/jobs",
    title: "Choose an employer",
    text: "Browse warehouse and logistics employers listed by TheBox.",
    action: "Find employers",
  },
  {
    href: "/verification",
    title: "Review the source",
    text: "See where the employer's official hiring site is located before applying.",
    action: "How we verify",
  },
  {
    href: "/jobs",
    title: "Apply directly",
    text: "Continue to the employer's official hiring website to complete the application.",
    action: "Start applying",
  },
];

const TRUST = [
  {
    mark: "✓",
    title: "Official sources",
    text: "Employer information and application destinations are clearly identified.",
  },
  {
    mark: "→",
    title: "Direct applications",
    text: "TheBox sends you to the employer's own hiring website instead of acting as a middleman.",
  },
  {
    mark: "□",
    title: "No fake listings",
    text: "TheBox does not invent warehouse openings or present third-party recruiter listings as employer jobs.",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const { status } = useSession();
  const { saved } = useSaved();
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (jobSearch.trim()) params.set("q", jobSearch.trim());
    if (locationSearch.trim()) params.set("loc", locationSearch.trim());
    const query = params.toString();
    router.push(query ? `/jobs?${query}` : "/jobs");
  };

  const featured = EMPLOYERS.filter((employer) => employer.featured);
  const byIndustry = INDUSTRIES.map((industry) => ({
    industry,
    count: EMPLOYERS.filter((employer) => employer.industry === industry).length,
  })).sort((a, b) => b.count - a.count);
  const maxIndustry = Math.max(...byIndustry.map((row) => row.count));

  const stats = [
    { label: "Verified employers", value: EMPLOYERS.length, note: "Official hiring sites only", href: "/jobs" },
    { label: "Industries", value: INDUSTRIES.length, note: "From parcel to cold storage", href: "/jobs" },
    { label: "Role types", value: ROLES.length, note: "Forklift, picker, handler and more", href: "/jobs" },
    {
      label: "Saved employers",
      value: status === "authenticated" ? saved.size : "—",
      note: status === "authenticated" ? "On your account" : "Sign in to save employers",
      href: status === "authenticated" ? "/account" : "/signin?callbackUrl=/account",
    },
  ];

  return (
    <main className="min-h-full w-full bg-slate-50 text-slate-900 dark:bg-black dark:text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 md:py-14">
        {/* Welcome */}
        <section className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm md:py-20 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="tb-hero">
            <div className="mx-auto mb-6 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400">
              Real jobs. Direct employers.
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
              Real warehouse jobs.
              <span className="block text-emerald-600 dark:text-emerald-400">Direct from employers.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              TheBox helps you find legitimate warehouse and logistics jobs without unnecessary middlemen.
            </p>

            <div className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-neutral-950">
              <form
                onSubmit={handleSearch}
                role="search"
                aria-label="Search warehouse employers"
                className="grid min-w-0 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
              >
                <input
                  type="text"
                  value={jobSearch}
                  onChange={(event) => setJobSearch(event.target.value)}
                  placeholder="Job title, role, or employer"
                  aria-label="Job title, role, or employer"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={locationSearch}
                  onChange={(event) => setLocationSearch(event.target.value)}
                  placeholder="City or state"
                  aria-label="Location"
                  className={inputClass}
                />
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-7 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400 active:scale-95"
                >
                  Find Employers
                </button>
              </form>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/verification" className="transition hover:text-emerald-600 dark:hover:text-emerald-400">
                ✓ Verified employer sources
              </Link>
              <span>✓ Direct application links</span>
              <span>✓ No staffing agencies</span>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section aria-label="TheBox at a glance" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              data-reveal
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
            >
              <span className="block text-sm text-slate-500 dark:text-slate-400">{stat.label}</span>
              <span className="mt-2 block text-4xl font-bold tracking-tight text-slate-950 tabular-nums dark:text-white">
                {stat.value}
              </span>
              <span className="mt-2 block text-xs text-emerald-700 dark:text-emerald-400">{stat.note}</span>
            </Link>
          ))}
        </section>

        {/* How it works */}
        <section data-reveal className={panelClass}>
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">How TheBox works</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Three steps from search to application.</p>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li key={step.title} className="relative">
                <Link
                  href={step.href}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-500/50 hover:bg-emerald-500/5 dark:border-neutral-800 dark:bg-neutral-900/50"
                >
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 font-semibold text-slate-900 dark:text-white">{step.title}</span>
                  <span className="mt-1 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{step.text}</span>
                  <span className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-400">{step.action} →</span>
                </Link>
                {index < STEPS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-3 z-10 hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-slate-200 bg-white text-xs text-slate-500 md:grid dark:border-neutral-800 dark:bg-neutral-950"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* Featured + industries */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <section data-reveal aria-labelledby="featured-heading" className={panelClass}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 id="featured-heading" className="text-2xl font-bold text-slate-950 dark:text-white">
                  Featured employers
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  A few verified employers to start with.
                </p>
              </div>
              <Link href="/jobs" className="text-sm font-semibold text-emerald-700 hover:underline dark:text-emerald-400">
                View all {EMPLOYERS.length} →
              </Link>
            </div>
            <ul className="mt-6 grid gap-3">
              {featured.map((employer) => (
                <li key={employer.slug}>
                  <Link
                    href={employer.pageUrl}
                    className="group flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-500/50 hover:bg-emerald-500/5 dark:border-neutral-800"
                  >
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        ✓ Verified · {employer.industry}
                      </span>
                      <span className="mt-1 block text-lg font-bold text-slate-900 dark:text-white">{employer.name}</span>
                      <span className="block text-sm text-slate-600 dark:text-slate-400">
                        {employer.roles.slice(0, 3).join(" · ")}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      View jobs{" "}
                      <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section data-reveal className={panelClass}>
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white">Browse by industry</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Employers listed in each industry.</p>
            <ul className="mt-6 grid gap-4">
              {byIndustry.map((row) => (
                <li key={row.industry}>
                  <Link href={`/jobs?industry=${encodeURIComponent(row.industry)}`} className="group block">
                    <span className="flex justify-between gap-3 text-sm">
                      <span className="text-slate-700 group-hover:text-emerald-700 dark:text-slate-300 dark:group-hover:text-emerald-400">
                        {row.industry}
                      </span>
                      <span className="font-semibold text-slate-900 tabular-nums dark:text-white">{row.count}</span>
                    </span>
                    <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-neutral-900">
                      <span
                        className="block h-full rounded-full bg-emerald-500"
                        style={{ width: `${(row.count / maxIndustry) * 100}%` }}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Trust */}
        <section data-reveal className={panelClass}>
          <h2 className="text-2xl font-bold text-slate-950 dark:text-white">How TheBox handles employers</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            TheBox connects job seekers with official employer sources. We do not invent job openings, copy third-party
            recruiter listings, or act as a staffing agency. TheBox directs users to the employer&apos;s official hiring
            website.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {TRUST.map((item) => (
              <div key={item.title}>
                <div className="mb-2 text-2xl">{item.mark}</div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
