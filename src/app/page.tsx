"use client";

import Link from "next/link";
import { useState } from "react";

type Employer = {
  name: string;
  category: string;
  pageUrl: string;
  jobsUrl: string;
  destination: string;
  keywords: string[];
};

const EMPLOYERS: Employer[] = [
  {
    name: "Amazon",
    category: "Fulfillment Center Warehouse Associate",
    pageUrl: "/employers/amazon",
    jobsUrl:
      "https://hiring.amazon.com/app?cmpid=ATLTEU1795H10#/jobSearch?jobTitle=Amazon%20Fulfillment%20Center%20Warehouse%20Associate",
    destination: "hiring.amazon.com",
    keywords: [
      "amazon",
      "warehouse",
      "fulfillment",
      "fulfillment center",
      "warehouse associate",
    ],
  },
  {
    name: "Walmart",
    category: "Supply Chain & Transportation",
    pageUrl: "/employers/walmart",
    jobsUrl:
      "https://careers.walmart.com/us/en/home/careers-areas/supply-chain-and-transportation",
    destination: "careers.walmart.com",
    keywords: [
      "walmart",
      "warehouse",
      "supply chain",
      "transportation",
      "distribution",
    ],
  },
  {
    name: "UPS",
    category: "Warehouse & Hourly Roles",
    pageUrl: "/employers/ups",
    jobsUrl: "https://www.jobs-ups.com/us/en/hourly-roles",
    destination: "jobs-ups.com",
    keywords: [
      "ups",
      "warehouse",
      "package handler",
      "hourly",
      "distribution",
    ],
  },
  {
    name: "FedEx",
    category: "Package Handler",
    pageUrl: "/employers/fedex",
    jobsUrl:
      "https://careers.fedex.com/career-areas/package-handler/jobs",
    destination: "careers.fedex.com",
    keywords: [
      "fedex",
      "warehouse",
      "package handler",
      "package",
      "distribution",
    ],
  },
  {
    name: "Home Depot",
    category: "Warehouse Jobs",
    pageUrl: "/employers/home-depot",
    jobsUrl: "https://careers.homedepot.com/career-areas/warehouse-jobs/",
    destination: "careers.homedepot.com",
    keywords: [
      "home depot",
      "warehouse",
      "distribution",
      "supply chain",
    ],
  },
  {
    name: "Target",
    category: "Supply Chain",
    pageUrl: "/employers/target",
    jobsUrl:
      "https://corporate.target.com/careers/career-areas/supply-chain",
    destination: "corporate.target.com",
    keywords: [
      "target",
      "warehouse",
      "supply chain",
      "distribution",
      "fulfillment",
    ],
  },
  {
    name: "Costco",
    category: "Warehouse & Distribution",
    pageUrl: "/employers/costco",
    jobsUrl: "https://careers.costco.com/",
    destination: "careers.costco.com",
    keywords: ["costco", "warehouse", "distribution", "stocking"],
  },
  {
    name: "DHL",
    category: "Warehouse & Package Handling",
    pageUrl: "/employers/dhl",
    jobsUrl:
      "https://careers.dhl.com/global/en/c/warehouse-and-package-handling-jobs",
    destination: "careers.dhl.com",
    keywords: [
      "dhl",
      "warehouse",
      "package handling",
      "logistics",
      "distribution",
    ],
  },
  {
    name: "Ryder",
    category: "Warehouse & Logistics",
    pageUrl: "/employers/ryder",
    jobsUrl: "https://www.ryder.com/en-us/careers",
    destination: "ryder.com",
    keywords: [
      "ryder",
      "warehouse",
      "logistics",
      "supply chain",
      "distribution",
    ],
  },
  {
    name: "GXO",
    category: "Warehouse & Logistics",
    pageUrl: "/employers/gxo",
    jobsUrl: "https://gxo.com/careers/",
    destination: "gxo.com",
    keywords: [
      "gxo",
      "warehouse",
      "logistics",
      "supply chain",
      "distribution",
    ],
  },
  {
    name: "Sysco",
    category: "Warehouse",
    pageUrl: "/employers/sysco",
    jobsUrl: "https://careers.sysco.com/en/warehouse",
    destination: "careers.sysco.com",
    keywords: [
      "sysco",
      "warehouse",
      "food distribution",
      "distribution",
      "order selector",
    ],
  },
  {
    name: "Lineage",
    category: "Cold Storage & Warehouse",
    pageUrl: "/employers/lineage",
    jobsUrl: "https://careers.onelineage.com/us/en",
    destination: "careers.onelineage.com",
    keywords: [
      "lineage",
      "warehouse",
      "cold storage",
      "logistics",
      "distribution",
    ],
  },
  {
    name: "US Foods",
    category: "Warehouse",
    pageUrl: "/employers/us-foods",
    jobsUrl: "https://careers.usfoods.com/us/en/Warehouse",
    destination: "careers.usfoods.com",
    keywords: [
      "us foods",
      "warehouse",
      "food distribution",
      "distribution",
      "order selector",
    ],
  },
  {
    name: "Grainger",
    category: "Warehouse & Distribution",
    pageUrl: "/employers/grainger",
    jobsUrl: "https://jobs.grainger.com/",
    destination: "jobs.grainger.com",
    keywords: [
      "grainger",
      "warehouse",
      "distribution",
      "supply chain",
      "inventory",
    ],
  },
  {
    name: "Fastenal",
    category: "Warehouse & Distribution",
    pageUrl: "/employers/fastenal",
    jobsUrl: "https://careers.fastenal.com/",
    destination: "careers.fastenal.com",
    keywords: [
      "fastenal",
      "warehouse",
      "distribution",
      "inventory",
      "shipping",
    ],
  },
];

export default function Home() {
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
  };

  const searchText = jobSearch.trim().toLowerCase();
  const locationText = locationSearch.trim().toLowerCase();

  const filteredEmployers = EMPLOYERS.filter((employer) => {
    if (!searched) {
      return true;
    }

    const jobMatches =
      searchText.length === 0 ||
      employer.keywords.some(
        (keyword) =>
          keyword.includes(searchText) ||
          searchText.includes(keyword),
      );

    const locationMatches =
      locationText.length === 0 ||
      locationText.includes("indianapolis") ||
      locationText.includes("indiana") ||
      locationText === "in";

    return jobMatches && locationMatches;
  });

  return (
    <main className="w-full min-w-0 bg-white text-slate-900 dark:bg-black dark:text-white">
      {/* Hero */}
      <section className="w-full border-b border-slate-200 bg-white dark:border-neutral-800 dark:bg-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 text-center md:py-28">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-600 dark:text-emerald-400">
            Real jobs. Direct employers.
          </div>

          <h2 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            Real warehouse jobs.
            <span className="block text-emerald-600 dark:text-emerald-400">
              Direct from employers.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            TheBox helps you find legitimate warehouse and logistics
            jobs without unnecessary middlemen.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-700 dark:bg-neutral-950">
            <div className="grid min-w-0 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
              <input
                type="text"
                value={jobSearch}
                onChange={(event) =>
                  setJobSearch(event.target.value)
                }
                placeholder="Job title or employer"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none placeholder:text-slate-500 focus:border-emerald-500 dark:border-slate-700 dark:bg-black dark:text-white"
              />

              <input
                type="text"
                value={locationSearch}
                onChange={(event) =>
                  setLocationSearch(event.target.value)
                }
                placeholder="Location"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none placeholder:text-slate-500 focus:border-emerald-500 dark:border-slate-700 dark:bg-black dark:text-white"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="rounded-xl bg-emerald-500 px-7 py-4 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Find Employers
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <span>✓ Official employer sources</span>
            <span>✓ Direct application links</span>
            <span>✓ No staffing agencies</span>
          </div>
        </div>
      </section>

      {/* Employers */}
      <section
        id="jobs"
        className="w-full bg-white dark:bg-black"
      >
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="mb-10">
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

          {searched && filteredEmployers.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-neutral-800 dark:bg-neutral-950">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                No matching employers found
              </h4>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Try searching for warehouse, fulfillment, logistics,
                distribution, or an employer name.
              </p>
            </div>
          ) : (
            <div className="grid min-w-0 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEmployers.map((employer) => (
                <article
                  key={employer.name}
                  className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-emerald-500/40 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
                >
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Official employer
                    </span>

                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      Direct application
                    </span>
                  </div>

                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {employer.name}
                  </h4>

                  <p className="mt-2 font-medium text-slate-700 dark:text-slate-300">
                    {employer.category}
                  </p>

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

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-neutral-800 dark:bg-neutral-950/60">
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
          <div>
            <div className="mb-3 text-2xl">✓</div>
            <h4 className="font-semibold text-slate-900 dark:text-white">
              Official sources
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Employer information and application destinations are
              clearly identified.
            </p>
          </div>

          <div>
            <div className="mb-3 text-2xl">→</div>
            <h4 className="font-semibold text-slate-900 dark:text-white">
              Direct applications
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              TheBox sends you to the employer&apos;s own hiring
              website instead of acting as a middleman.
            </p>
          </div>

          <div>
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
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            How it works
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            A simpler path to legitimate warehouse jobs
          </h3>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-neutral-800 dark:bg-neutral-950">
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

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                02
              </div>

              <h4 className="mt-4 font-semibold text-slate-900 dark:text-white">
                Review the source
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                See where the employer&apos;s official hiring site is
                located before applying.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 dark:border-neutral-800 dark:bg-neutral-950">
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

          <p>
            TheBox is not a staffing agency and does not guarantee
            employment.
          </p>
        </div>
      </footer>
    </main>
  );
}
