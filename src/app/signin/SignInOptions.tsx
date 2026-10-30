"use client";

import Link from "next/link";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Providers = Awaited<ReturnType<typeof getProviders>>;

const AUTH_ERRORS: Record<string, string> = {
  AccessDenied: "Google sign-in was cancelled. You can try again.",
  Configuration: "Sign-in isn't set up correctly yet. Please try again later.",
  OAuthSignin: "Couldn't start Google sign-in. Please try again.",
  OAuthCallback: "Google sign-in didn't complete. Please try again.",
};

export default function SignInOptions() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Providers>(null);
  const [callbackUrl, setCallbackUrl] = useState("/account");
  const [error, setError] = useState("");
  const [devEmail, setDevEmail] = useState("test@example.com");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const target = params.get("callbackUrl");
    // Only follow redirects back into TheBox itself.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (target && target.startsWith("/") && !target.startsWith("//")) setCallbackUrl(target);
    const code = params.get("error");
    if (code) setError(AUTH_ERRORS[code] ?? "Sign-in didn't work. Please try again.");
    void getProviders().then(setProviders);
  }, []);

  if (session?.user) {
    return (
      <p>
        You&apos;re signed in as <strong>{session.user.email}</strong>.{" "}
        <Link href="/account" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">
          Go to your saved employers
        </Link>
      </p>
    );
  }

  return (
    <div className="grid gap-5">
      {error && (
        <p role="alert" className="tb-enter rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl })}
        className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z" />
          <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9h-4v3.1A12 12 0 0 0 12 24z" />
          <path fill="#FBBC05" d="M5.4 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8z" />
          <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
        </svg>
        Continue with Google
      </button>

      {providers?.dev && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void signIn("dev", { email: devEmail, callbackUrl });
          }}
          className="grid max-w-sm gap-2 rounded-xl border border-dashed border-slate-300 p-4 text-sm dark:border-slate-700"
        >
          <span className="font-semibold">Local test sign-in (development only)</span>
          <input value={devEmail} onChange={(e) => setDevEmail(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-black" aria-label="Test email" />
          <button type="submit" className="rounded-lg bg-slate-900 px-3 py-2 font-semibold text-white dark:bg-white dark:text-slate-900">
            Sign in as test user
          </button>
        </form>
      )}

      <p className="text-sm text-slate-500 dark:text-slate-400">
        By signing in you agree to how we handle your information in our{" "}
        <Link href="/privacy" className="font-medium underline">privacy policy</Link>. You don&apos;t need an
        account to browse employers or apply.
      </p>
    </div>
  );
}
