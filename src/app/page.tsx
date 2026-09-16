"use client";

import { useState } from "react";

const jobs = [
  {
    company: "NorthStar Logistics",
    title: "Warehouse Associate",
    location: "Indianapolis, IN",
    pay: "$20–$23/hr",
    shift: "Night shift",
  },
  {
    company: "Midwest Supply Co.",
    title: "Fulfillment Associate",
    location: "Indianapolis, IN",
    pay: "$19–$21/hr",
    shift: "Day shift",
  },
  {
    company: "Riverbend Distribution",
    title: "Shipping & Receiving",
    location: "Plainfield, IN",
    pay: "$21–$24/hr",
    shift: "Full-time",
  },
];

export default function Home() {
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const jobTerm = jobSearch.toLowerCase().trim();
    const locationTerm = locationSearch.toLowerCase().trim();

    const matchesJob =
      jobTerm === "" ||
      job.title.toLowerCase().includes(jobTerm) ||
      job.company.toLowerCase().includes(jobTerm);

    const matchesLocation =
      locationTerm === "" ||
      job.location.toLowerCase().includes(locationTerm);

    return matchesJob && matchesLocation;
  });

  function handleSearch() {
    setSearchSubmitted(true);

    document.getElementById("jobs")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function handleClearSearch() {
    setJobSearch("");
    setLocationSearch("");
    setSearchSubmitted(false);
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#" className="text-2xl font-bold tracking-tight">
            TheBox
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a
              href="#jobs"
              className="text-slate-600 transition hover:text-slate-950"
            >
              Find Jobs
            </a>

            <a
              href="#trust"
              className="text-slate-600 transition hover:text-slate-950"
            >
              Trust Check
            </a>

            <a
              href="#how-it-works"
              className="text-slate-600 transition hover:text-slate-950"
            >
              How It Works
            </a>
          </div>

          <a
            href="#jobs"
            className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Find Jobs
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
              Real jobs. Real employers.
            </p>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              Find the job.
              <br />
              Know who you&apos;re
              <br />
              applying to.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              TheBox helps you find warehouse and logistics jobs and apply
              directly through the actual employer.
            </p>

            <p className="mt-5 text-base font-semibold text-white">
              No middlemen. No confusing application funnels.
            </p>
          </div>

          {/* Search */}
          <div className="mt-14 rounded-2xl bg-white p-3 shadow-2xl sm:p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <label className="sr-only" htmlFor="job-search">
                Job title or keyword
              </label>

              <input
                id="job-search"
                type="text"
                value={jobSearch}
                onChange={(event) => setJobSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Job title or keyword"
                className="rounded-xl border border-slate-200 px-5 py-4 text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-400"
              />

              <label className="sr-only" htmlFor="location-search">
                City or ZIP code
              </label>

              <input
                id="location-search"
                type="text"
                value={locationSearch}
                onChange={(event) => setLocationSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="City or ZIP code"
                className="rounded-xl border border-slate-200 px-5 py-4 text-slate-950 outline-none placeholder:text-slate-400 focus:border-slate-400"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="rounded-xl bg-slate-950 px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section id="trust" className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
              ✓
            </div>

            <h2 className="font-bold">Know the employer</h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              See the actual company behind the job listing.
            </p>
          </div>

          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
              ↗
            </div>

            <h2 className="font-bold">Apply directly</h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Follow the application to the employer whenever possible.
            </p>
          </div>

          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
              ✓
            </div>

            <h2 className="font-bold">Review trust information</h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Check important details before deciding where to apply.
            </p>
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
            Example listings
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Find warehouse work
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Job information is presented clearly so you can understand the
            opportunity before applying.
          </p>
        </div>

        {searchSubmitted && (
          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-700">
              Showing {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "job" : "jobs"} matching your
              search.
            </p>

            <button
              type="button"
              onClick={handleClearSearch}
              className="text-left text-sm font-semibold text-slate-950 underline underline-offset-4"
            >
              Clear search
            </button>
          </div>
        )}

        <div className="mt-12 grid gap-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <article
                key={`${job.company}-${job.title}`}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-lg sm:p-8"
              >
                <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      Trust Check available
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight">
                      {job.title}
                    </h3>

                    <p className="mt-2 font-medium text-slate-700">
                      {job.company}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                        {job.location}
                      </span>

                      <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                        {job.pay}
                      </span>

                      <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                        {job.shift}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl border border-slate-300 px-6 py-3 font-semibold transition hover:bg-slate-50"
                  >
                    View Job
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
              <h3 className="text-xl font-bold">No jobs found</h3>

              <p className="mt-2 text-slate-600">
                Try a different job title, company, city, or ZIP code.
              </p>

              <button
                type="button"
                onClick={handleClearSearch}
                className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              Simple process
            </p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              How TheBox works
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <div>
              <span className="text-sm font-bold text-slate-400">01</span>

              <h3 className="mt-4 text-2xl font-bold">Search</h3>

              <p className="mt-3 leading-7 text-slate-600">
                Search warehouse and logistics jobs by role and location.
              </p>
            </div>

            <div>
              <span className="text-sm font-bold text-slate-400">02</span>

              <h3 className="mt-4 text-2xl font-bold">Check</h3>

              <p className="mt-3 leading-7 text-slate-600">
                Review the employer, location, application destination, and
                other available trust information.
              </p>
            </div>

            <div>
              <span className="text-sm font-bold text-slate-400">03</span>

              <h3 className="mt-4 text-2xl font-bold">Apply</h3>

              <p className="mt-3 leading-7 text-slate-600">
                Apply through the actual employer whenever a direct
                application is available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl bg-slate-950 px-8 py-14 text-white sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            TheBox
          </p>

          <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Transparency over volume.
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Find the opportunity, understand the employer, and know where your
            application is going.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TheBox</p>

          <p>Real warehouse jobs. Direct from employers. No middlemen.</p>
        </div>
      </footer>
    </main>
  );
}