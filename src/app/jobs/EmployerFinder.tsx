"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import SaveEmployerButton from "@/components/SaveEmployerButton";
import {
  EMPLOYERS,
  INDUSTRIES,
  ROLES,
  type Employer,
} from "@/lib/employers";

const selectClass =
  "min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-black dark:text-white";

const inputClass =
  "min-w-0 rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none placeholder:text-slate-500 focus:border-emerald-500 dark:border-slate-700 dark:bg-black dark:text-white";

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

// Search, filters and the employer list. The Dashboard search and industry
// links arrive here with ?q=, ?loc=, ?industry= or ?role= in the address.
export default function EmployerFinder() {
  const router = useRouter();
  const params = useSearchParams();

  // The address is the source of truth: /jobs?q=&loc=&industry=&role=
  const q = params.get("q") ?? "";
  const loc = params.get("loc") ?? "";
  const industryParam = params.get("industry") ?? "";
  const roleParam = params.get("role") ?? "";
  const industry = INDUSTRIES.includes(industryParam as Employer["industry"]) ? industryParam : "";
  const role = ROLES.includes(roleParam as Employer["roles"][number]) ? roleParam : "";

  // The text boxes follow the address, but can be edited before searching.
  const [jobSearch, setJobSearch] = useState(q);
  const [locationSearch, setLocationSearch] = useState(loc);
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setJobSearch(q);
    setLocationSearch(loc);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [q, loc]);

  const update = (changes: Record<string, string>) => {
    const next = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const query = next.toString();
    router.replace(query ? `/jobs?${query}` : "/jobs", { scroll: false });
  };

  const setIndustry = (value: string) => update({ industry: value });
  const setRole = (value: string) => update({ role: value });

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    update({ q: jobSearch.trim(), loc: locationSearch.trim() });
  };

  const clearFilters = () => {
    setJobSearch("");
    setLocationSearch("");
    router.replace("/jobs", { scroll: false });
  };

  const searchText = q.trim().toLowerCase();
  const locationText = loc.trim();

  // Every listed employer hires across the U.S., so location never hides
  // an employer; openings near a location are on each official site.
  const filteredEmployers = EMPLOYERS.filter(
    (employer) =>
      matchesSearch(employer, searchText) &&
      (industry === "" || employer.industry === industry) &&
      (role === "" || employer.roles.includes(role as Employer["roles"][number])),
  );

  const filtersActive =
    searchText !== "" || locationText !== "" || industry !== "" || role !== "";

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
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
      </section>

      <div>
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
      </div>

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
    </>
  );
}
