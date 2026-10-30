"use client";

import Link from "next/link";
import { useState } from "react";

import SaveEmployerButton from "@/components/SaveEmployerButton";
import {
  EMPLOYERS,
  INDUSTRIES,
  ROLES,
  type Employer,
} from "@/lib/employers";

const selectClass =
  "min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-black dark:text-white";

function matchesSearch(employer: Employer, searchText: string) {
  if (searchText.length === 0) return true;
  const terms = [
    employer.name,
    employer.category,
    employer.industry,
    ...employer.roles,
    ...employer.keywords,
  ].map((term) => term.toLowerCase());
  return terms.some(
    (term) => term.includes(searchText) || searchText.includes(term),
  );
}

export default function Home() {
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [industry, setIndustry] = useState("");
  const [role, setRole] = useState("");

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearched(true);
    document
      .getElementById("jobs")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setJobSearch("");
    setLocationSearch("");
    setIndustry("");
    setRole("");
    setSearched(false);
  };

  const searchText = searched ? jobSearch.trim().toLowerCase() : "";
  const locationText = searched ? locationSearch.trim() : "";

  // Every listed employer hires across the U.S., so location never hides
  // an employer; openings near a location are on each official site.
  const filteredEmployers = EMPLOYERS.filter(
    (employer) =>
      matchesSearch(employer, searchText) &&
      (industry === "" || employer.industry === industry) &&
      (role === "" || employer.roles.includes(role as Employer["roles"][number])),
  );

  const featuredEmployers = EMPLOYERS.filter((employer) => employer.featured);
  const filtersActive =
    searchText !== "" || locationText !== "" || industry !== "" || role !== "";

  return (
    <main className="w-full min-w-0 bg-white text-slate-900 dark:bg-black dark:text-white">
      {/* Hero */}
      <section className="w-full border-b border-slate-200 bg-white dark:border-neutral-800 dark:bg-black">
        <div className="tb-hero mx-auto w-full max-w-7xl px-6 py-20 text-center md:py-28">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400">
            Real jobs. Direct employers.
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            Real warehouse jobs.
            <span className="block text-emerald-600 dark:text-emerald-400">
              Direct from employers.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            TheBox helps you find legitimate warehouse and logistics
            jobs without unnecessary middlemen.
          </p>

          {/* Search */}
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
                onChange={(event) =>
                  setJobSearch(event.target.value)
                }
                placeholder="Job title, role, or employer"
                aria-label="Job title, role, or employer"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none placeholder:text-slate-500 focus:border-emerald-500 dark:border-slate-700 dark:bg-black dark:text-white"
              />

              <input
                type="text"
                value={locationSearch}
                onChange={(event) =>
                  setLocationSearch(event.target.value)
                }
                placeholder="City or state"
                aria-label="Location"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none placeholder:text-slate-500 focus:border-emerald-500 dark:border-slate-700 dark:bg-black dark:text-white"
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

      {/* Featured */}
      <section
        aria-labelledby="featured-heading"
        className="w-full border-b border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-950/40"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-16">
          <p data-reveal className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Featured employers
          </p>
          <h2
            data-reveal
            id="featured-heading"
            className="mt-2 text-3xl font-bold text-slate-900 dark:text-white"
          >
            Hiring for warehouse roles
          </h2>
          <p data-reveal className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
            A few verified employers to start with. Each one sends you
            straight to its own official hiring website.
          </p>

          <div className="mt-8 grid min-w-0 gap-6 md:grid-cols-3">
            {featuredEmployers.map((employer) => (
              <Link
                key={employer.slug}
                href={employer.pageUrl}
                data-reveal
                className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
              >
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  ✓ Verified · {employer.industry}
                </span>
                <span className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                  {employer.name}
                </span>
                <span className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {employer.roles.slice(0, 3).join(" · ")}
                </span>
                <span className="mt-5 text-sm font-semibold text-slate-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                  View {employer.name} jobs{" "}
                  <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Employers */}
      <section
        id="jobs"
        className="w-full bg-white dark:bg-black"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div data-reveal className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Current employers
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              Find warehouse employers
            </h3>

            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
              TheBox connects you with legitimate employers and
              sends you directly to their official hiring websites.
              Each employer has its own TheBox page with source and
              application information.
            </p>
          </div>

          <div
            data-reveal
            role="group"
            aria-label="Filter employers"
            className="mb-8 flex flex-wrap items-end gap-3"
          >
            <label className="grid gap-1 text-sm text-slate-600 dark:text-slate-400">
              Industry
              <select
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                className={selectClass}
              >
                <option value="">All industries</option>
                {INDUSTRIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1 text-sm text-slate-600 dark:text-slate-400">
              Role
              <select
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className={selectClass}
              >
                <option value="">All roles</option>
                {ROLES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            {filtersActive && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-neutral-900"
              >
                Clear search and filters
              </button>
            )}

            <p className="ml-auto text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
              Showing {filteredEmployers.length} of {EMPLOYERS.length} employers
            </p>
          </div>

          {locationText !== "" && (
            <div className="tb-enter mb-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 px-5 py-4 text-sm text-slate-700 dark:text-slate-300">
              Every employer listed here hires across the U.S. Use the
              official hiring site on each employer page to see current
              openings near <strong>{locationText}</strong>.
            </div>
          )}

          {filteredEmployers.length === 0 ? (
            <div className="tb-enter rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-950">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                No matching employers found
              </h4>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Try a role like forklift or package handler, an
                industry like cold storage, or an employer name.
              </p>
            </div>
          ) : (
            <div className="grid min-w-0 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEmployers.map((employer) => (
                <article
                  data-reveal
                  key={employer.slug}
                  className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-950"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Official employer
                    </span>

                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      Direct application
                    </span>

                    <span className="ml-auto">
                      <SaveEmployerButton slug={employer.slug} name={employer.name} />
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {employer.name}
                  </h4>

                  <p className="mt-2 font-medium text-slate-700 dark:text-slate-300">
                    {employer.category}
                  </p>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {employer.industry}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Typical roles">
                    {employer.roles.map((item) => (
                      <li
                        key={item}
                        className={`rounded-lg border px-2 py-1 text-xs ${
                          role === item
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                            : "border-slate-200 text-slate-600 dark:border-neutral-800 dark:text-slate-400"
                        }`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    View the {employer.name} employer page on TheBox,
                    then continue directly to the employer&apos;s
                    official hiring website.
                  </p>

                  <div className="mt-6">
                    <Link
                      href={employer.pageUrl}
                      className="block rounded-xl bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                      View {employer.name} Jobs
                    </Link>
                  </div>

                  <div className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-neutral-800 dark:text-slate-400">
                    Official destination: {employer.destination}
                  </div>
                </article>
              ))}
            </div>
          )}

          <div data-reveal className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-neutral-800 dark:bg-neutral-950/60">
            <h4 className="font-semibold text-slate-900 dark:text-white">
              How TheBox handles employers
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              TheBox connects job seekers with official employer
              sources. We do not invent job openings, copy
              third-party recruiter listings, or act as a staffing
              agency. TheBox directs users to the employer&apos;s
              official hiring website.
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section
        id="about"
        className="w-full border-y border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-950/40"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-16 md:grid-cols-3">
          <div data-reveal>
            <div className="mb-3 text-2xl">✓</div>
            <h4 className="font-semibold text-slate-900 dark:text-white">
              Official sources
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Employer information and application destinations are
              clearly identified.
            </p>
          </div>

          <div data-reveal>
            <div className="mb-3 text-2xl">→</div>
            <h4 className="font-semibold text-slate-900 dark:text-white">
              Direct applications
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              TheBox sends you to the employer&apos;s own hiring
              website instead of acting as a middleman.
            </p>
          </div>

          <div data-reveal>
            <div className="mb-3 text-2xl">□</div>
            <h4 className="font-semibold text-slate-900 dark:text-white">
              No fake listings
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              TheBox does not invent warehouse openings or present
              third-party recruiter listings as employer jobs.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="w-full bg-white dark:bg-black"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <p data-reveal className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            How it works
          </p>

          <h3 data-reveal className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            A simpler path to legitimate warehouse jobs
          </h3>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div data-reveal className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950">
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                01
              </div>

              <h4 className="mt-4 font-semibold text-slate-900 dark:text-white">
                Choose an employer
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Browse warehouse and logistics employers listed by
                TheBox.
              </p>
            </div>

            <div data-reveal className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950">
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                02
              </div>

              <h4 className="mt-4 font-semibold text-slate-900 dark:text-white">
                Review the source
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                See where the employer&apos;s official hiring site is
                located before applying.{" "}
                <Link href="/verification" className="font-medium text-emerald-600 hover:underline dark:text-emerald-400">
                  How we verify
                </Link>
              </p>
            </div>

            <div data-reveal className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950">
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                03
              </div>

              <h4 className="mt-4 font-semibold text-slate-900 dark:text-white">
                Apply directly
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Continue to the employer&apos;s official hiring
                website to complete the application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white dark:border-neutral-800 dark:bg-black">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
          <p>© 2026 TheBox. Direct warehouse jobs.</p>

          <nav aria-label="Footer" className="flex flex-wrap gap-4">
            <Link href="/verification" className="hover:text-slate-900 dark:hover:text-white">Verification</Link>
            <Link href="/for-employers" className="hover:text-slate-900 dark:hover:text-white">For Employers</Link>
            <Link href="/report" className="hover:text-slate-900 dark:hover:text-white">Report a Scam</Link>
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white">Privacy</Link>
          </nav>

          <p>
            TheBox is not a staffing agency and does not guarantee
            employment.
          </p>
        </div>
      </footer>
    </main>
  );
}
