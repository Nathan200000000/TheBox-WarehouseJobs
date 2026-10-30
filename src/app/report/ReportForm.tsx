"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
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
  const [sent, setSent] = useState<"" | "private" | "github">("");
  const [sending, setSending] = useState(false);
  const { data: session, status } = useSession();
  const signedIn = status === "authenticated";

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

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (details.trim().length < 10) {
      setError("Describe what happened in at least a sentence so we can look into it.");
      return;
    }
    setError("");

    // Signed in: send privately to TheBox.
    if (signedIn) {
      setSending(true);
      try {
        const res = await fetch("/api/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ employer, link, details, flags }),
        });
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        if (!res.ok) {
          setError(data.error ?? "Your report couldn't be sent. Please try again.");
          return;
        }
        setSent("private");
      } catch {
        setError("Your report couldn't be sent. Check your connection and try again.");
      } finally {
        setSending(false);
      }
      return;
    }

    // Signed out: file it as a public GitHub issue.
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
    setSent("github");
  };

  const resetForm = () => {
    setDetails("");
    setLink("");
    setFlags([]);
    setSent("");
  };

  if (sent === "private") {
    return (
      <div role="status" className="tb-pop rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
        <p className="font-semibold text-slate-900 dark:text-white">Thank you. Your report was sent privately to TheBox.</p>
        <p className="mt-1">
          We review every report and may contact you at {session?.user?.email} if we need more details.{" "}
          <button type="button" onClick={resetForm} className="font-semibold text-emerald-700 underline dark:text-emerald-400">
            Send another report
          </button>
        </p>
      </div>
    );
  }

  if (sent === "github") {
    return (
      <div role="status" className="tb-pop rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
        <p className="font-semibold text-slate-900 dark:text-white">Your report opened on GitHub.</p>
        <p className="mt-1">
          Click <strong>Create</strong> on that page to send it. Didn&apos;t open?{" "}
          <button type="button" onClick={() => setSent("")} className="font-semibold text-emerald-700 underline dark:text-emerald-400">
            Go back and try again
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5" noValidate>
      {status !== "loading" && (
        signedIn ? (
          <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm">
            Signed in as <strong>{session?.user?.email}</strong>. Your report goes privately to TheBox.
          </p>
        ) : (
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm">
            <Link
              href={`/signin?callbackUrl=${encodeURIComponent(`/report${employer ? `?employer=${employer}` : ""}`)}`}
              className="font-semibold text-emerald-700 underline dark:text-emerald-400"
            >
              Sign in with Google
            </Link>{" "}
            to send your report privately. Or fill in the form below to file it publicly on GitHub.
          </div>
        )
      )}

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
        <p id="report-error" role="alert" className="tb-enter text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
      )}

      {!signedIn && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Without signing in, reports are filed as public issues on TheBox&apos;s GitHub page, so please
          don&apos;t include your own personal details. A free GitHub account is needed to submit.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={sending}
          className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 active:scale-95 disabled:opacity-60"
        >
          {sending ? "Sending…" : signedIn ? "Send report privately" : "File report on GitHub"}
        </button>
      </div>
    </form>
  );
}
