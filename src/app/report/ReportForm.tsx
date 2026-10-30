"use client";

import { useEffect, useState } from "react";
import { EMPLOYERS, newIssueUrl } from "@/lib/employers";
import { RED_FLAGS } from "@/components/RedFlags";

const fieldClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-black dark:text-white";

export default function ReportForm() {
  const [employer, setEmployer] = useState("");
  const [link, setLink] = useState("");
  const [details, setDetails] = useState("");
  const [flags, setFlags] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // Pre-select the employer when arriving from an employer page (?employer=slug).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("employer");
    if (slug && EMPLOYERS.some((e) => e.slug === slug)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEmployer(slug);
    }
  }, []);

  const toggleFlag = (flag: string) =>
    setFlags((current) =>
      current.includes(flag) ? current.filter((f) => f !== flag) : [...current, flag],
    );

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (details.trim().length < 10) {
      setError("Describe what happened in at least a sentence so we can look into it.");
      return;
    }
    setError("");
    const name = EMPLOYERS.find((e) => e.slug === employer)?.name ?? "Not listed / other";
    const body = [
      `**Employer:** ${name}`,
      `**Link or contact where this appeared:** ${link.trim() || "Not provided"}`,
      "",
      "**What happened:**",
      details.trim(),
      "",
      "**Warning signs noticed:**",
      flags.length ? flags.map((f) => `- ${f}`).join("\n") : "- None selected",
    ].join("\n");
    window.open(newIssueUrl(`[Scam report] ${name}`, body), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
        <p className="font-semibold text-slate-900 dark:text-white">Your report opened on GitHub.</p>
        <p className="mt-1">
          Click <strong>Create</strong> on that page to send it. Didn&apos;t open?{" "}
          <button type="button" onClick={() => setSent(false)} className="font-semibold text-emerald-700 underline dark:text-emerald-400">
            Go back and try again
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5" noValidate>
      <label className="grid gap-2">
        <span className="font-semibold text-slate-900 dark:text-white">Employer</span>
        <select value={employer} onChange={(e) => setEmployer(e.target.value)} className={fieldClass}>
          <option value="">Not listed / other</option>
          {EMPLOYERS.map((e) => (
            <option key={e.slug} value={e.slug}>{e.name}</option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="font-semibold text-slate-900 dark:text-white">
          Link, phone number or email involved <span className="font-normal text-slate-500">(optional)</span>
        </span>
        <input value={link} onChange={(e) => setLink(e.target.value)} className={fieldClass} placeholder="https://… or the number/email that contacted you" />
      </label>

      <label className="grid gap-2">
        <span className="font-semibold text-slate-900 dark:text-white">What happened?</span>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={5}
          className={fieldClass}
          placeholder="For example: someone texted me a job offer for Amazon and asked me to pay $50 for training."
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "report-error" : undefined}
        />
      </label>

      <fieldset className="grid gap-3">
        <legend className="mb-2 font-semibold text-slate-900 dark:text-white">Warning signs you noticed</legend>
        {RED_FLAGS.map((flag) => (
          <label key={flag} className="flex items-start gap-3 text-sm">
            <input type="checkbox" checked={flags.includes(flag)} onChange={() => toggleFlag(flag)} className="mt-1 h-4 w-4 accent-emerald-500" />
            <span>{flag}</span>
          </label>
        ))}
      </fieldset>

      {error && (
        <p id="report-error" role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
      )}

      <p className="text-sm text-slate-500 dark:text-slate-400">
        Reports are filed as public issues on TheBox&apos;s GitHub page, so please don&apos;t
        include your own personal details. A free GitHub account is needed to submit.
      </p>

      <div>
        <button type="submit" className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">
          Submit report
        </button>
      </div>
    </form>
  );
}
