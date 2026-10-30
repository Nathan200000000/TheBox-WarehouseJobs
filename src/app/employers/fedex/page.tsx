import Link from "next/link";
import ReportLink from "@/components/ReportLink";
import SaveEmployerButton from "@/components/SaveEmployerButton";

export default function FedExPage() {
  const jobsUrl =
    "https://careers.fedex.com/career-areas/package-handler/jobs";

  return (
    <main className="min-h-screen w-full bg-white text-slate-900 dark:bg-black dark:text-white">
      <section className="w-full border-b border-slate-200 bg-white dark:border-neutral-800 dark:bg-black">
        <div className="mx-auto w-full max-w-5xl px-6 py-8">
          <Link
            href="/jobs"
            className="inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
          >
            ← All employers
          </Link>
        </div>
      </section>

      <section className="w-full bg-slate-50 dark:bg-black">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <div className="mb-5 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Official Employer
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl dark:text-white">
            FedEx
          </h1>

          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
            Package Handler Jobs
          </p>
          <div className="mt-5"><SaveEmployerButton slug="fedex" name="FedEx" /></div>

          <div className="mt-10 grid gap-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Source Verification
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Official employer
                  </p>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    FedEx
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Official hiring website
                  </p>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    careers.fedex.com
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Application method
                  </p>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    Direct application through FedEx
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    Application link
                  </p>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    TheBox links directly to FedEx&apos;s official hiring
                    website.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white">
                Apply Directly
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
                TheBox sends you directly to FedEx&apos;s official hiring
                website. TheBox does not copy FedEx job listings.
              </p>

              <a
                href={jobsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Go to FedEx Jobs
              </a>
            </section>
            <ReportLink slug="fedex" name="FedEx" />
          </div>
        </div>
      </section>
    </main>
  );
}
