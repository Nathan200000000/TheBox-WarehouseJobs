"use client";

import { useState } from "react";

const AMAZON_FULFILLMENT_JOBS_URL =
  "https://www.amazon.jobs/content/en/job-categories/fulfillment-center-warehouse-associate";

const AMAZON_INDIANAPOLIS_URL =
  "https://www.amazon.jobs/en/location/indianapolis";

export default function Home() {
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
  };

  const searchText = jobSearch.trim().toLowerCase();
  const locationText = locationSearch.trim().toLowerCase();

  const matchesAmazon =
    (searchText === "" ||
      "amazon".includes(searchText) ||
      "warehouse".includes(searchText) ||
      "fulfillment".includes(searchText) ||
      "fulfillment center warehouse associate".includes(searchText)) &&
    (locationText === "" ||
      "indianapolis".includes(locationText) ||
      "indianapolis, in".includes(locationText));

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">TheBox</h1>
            <p className="text-xs text-slate-400">
              Direct warehouse jobs
            </p>
          </div>

          <div className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="#jobs" className="transition hover:text-white">
              Find Jobs
            </a>
            <a href="#how-it-works" className="transition hover:text-white">
              How It Works
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
            Real jobs. Direct employers.
          </div>

          <h2 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Real warehouse jobs.
            <span className="block text-emerald-400">
              Direct from employers.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            TheBox helps you find legitimate warehouse and logistics jobs
            without unnecessary middlemen.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-2xl">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <input
                type="text"
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                placeholder="Job title or keyword"
                className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-emerald-500"
              />

              <input
                type="text"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                placeholder="Location"
                className="rounded-xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-emerald-500"
              />

              <button
                onClick={handleSearch}
                className="rounded-xl bg-emerald-500 px-7 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <span>✓ Official employer sources</span>
            <span>✓ Direct application links</span>
            <span>✓ No staffing agencies</span>
          </div>
        </div>
      </section>

      {/* Jobs */}
      <section id="jobs" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            Current source
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            Amazon warehouse jobs
          </h3>

          <p className="mt-3 max-w-2xl text-slate-400">
            We are starting TheBox with one verified employer source:
            Amazon Jobs. More real employers will be added as the platform
            grows.
          </p>
        </div>

        {searched && !matchesAmazon ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
            <h4 className="text-xl font-semibold">
              No Amazon results for that search
            </h4>

            <p className="mt-2 text-slate-400">
              Try searching for warehouse, fulfillment, Amazon, or
              Indianapolis.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl">
            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:border-emerald-500/40">
              <div className="flex flex-col justify-between gap-6 sm:flex-row">
                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                      Official employer
                    </span>

                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                      Direct application
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold">
                    Amazon Fulfillment Center Warehouse Associate
                  </h4>

                  <p className="mt-2 font-medium text-slate-300">
                    Amazon
                  </p>

                  <p className="mt-1 text-slate-400">
                    Indianapolis, IN
                  </p>

                  <p className="mt-5 max-w-xl text-sm leading-6 text-slate-400">
                    Browse Amazon&apos;s official fulfillment center and
                    warehouse associate opportunities. TheBox sends applicants
                    directly to Amazon Jobs instead of a staffing agency.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3 sm:min-w-[190px]">
                  <a
                    href={AMAZON_FULFILLMENT_JOBS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-emerald-500 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                  >
                    View Amazon Jobs
                  </a>

                  <a
                    href={AMAZON_INDIANAPOLIS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-slate-500 hover:bg-slate-800"
                  >
                    Amazon Indianapolis
                  </a>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Important transparency note */}
        <div className="mt-8 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h4 className="font-semibold text-white">
            How TheBox handles listings
          </h4>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            This page currently links to Amazon&apos;s official job listings.
            We are not inventing job openings or claiming that a specific
            position is available unless it comes from the employer&apos;s
            official source.
          </p>
        </div>
      </section>

      {/* Trust */}
      <section id="about" className="border-y border-slate-800 bg-slate-900/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-3">
          <div>
            <div className="mb-4 text-3xl">🔎</div>
            <h3 className="text-lg font-bold">Official sources</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              We focus on jobs that can be traced back to the actual
              employer.
            </p>
          </div>

          <div>
            <div className="mb-4 text-3xl">🔗</div>
            <h3 className="text-lg font-bold">Direct applications</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Application links send job seekers to the employer&apos;s own
              website.
            </p>
          </div>

          <div>
            <div className="mb-4 text-3xl">🛡️</div>
            <h3 className="text-lg font-bold">Transparency first</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              TheBox will show where each job comes from and how it was
              verified.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
            Simple process
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            How TheBox works
          </h3>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="text-emerald-400 text-sm font-bold">01</div>
            <h4 className="mt-4 text-xl font-bold">Search</h4>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Search warehouse jobs by job type and location.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="text-emerald-400 text-sm font-bold">02</div>
            <h4 className="mt-4 text-xl font-bold">Verify</h4>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              See the actual employer and where the job application goes.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
            <div className="text-emerald-400 text-sm font-bold">03</div>
            <h4 className="mt-4 text-xl font-bold">Apply directly</h4>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Apply through the employer&apos;s official careers website.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-semibold text-slate-300">TheBox</span>
            <span className="ml-2">
              Real warehouse jobs. Direct from employers.
            </span>
          </div>

          <p>Built with transparency in mind.</p>
        </div>
      </footer>
    </main>
  );
}