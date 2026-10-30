"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type SavedState = {
  saved: Set<string>;
  ready: boolean;
  toggle: (slug: string) => Promise<void>;
  clearAll: () => Promise<void>;
};

const EMPTY = new Set<string>();

const SavedContext = createContext<SavedState>({
  saved: new Set(),
  ready: false,
  toggle: async () => {},
  clearAll: async () => {},
});

export const useSaved = () => useContext(SavedContext);

// Loads the signed-in user's saved employers once and shares them site-wide.
function SavedProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const email = session?.user?.email ?? null;
  // Saved employers, tagged with whose list they are.
  const [loaded, setLoaded] = useState<{ email: string; slugs: Set<string> } | null>(null);

  useEffect(() => {
    if (status !== "authenticated" || !email) return;
    let cancelled = false;
    fetch("/api/saved")
      .then((res) => (res.ok ? res.json() : { slugs: [] }))
      .then((data: { slugs: string[] }) => {
        if (!cancelled) setLoaded({ email, slugs: new Set(data.slugs) });
      })
      .catch(() => {
        if (!cancelled) setLoaded({ email, slugs: new Set() });
      });
    return () => {
      cancelled = true;
    };
  }, [status, email]);

  const mine = status === "authenticated" && loaded && loaded.email === email ? loaded : null;
  const saved = mine?.slugs ?? EMPTY;
  const ready = status === "unauthenticated" || mine !== null;
  const setSaved = useCallback(
    (update: (current: Set<string>) => Set<string>) => {
      if (email) setLoaded((current) => ({ email, slugs: update(current?.email === email ? current.slugs : new Set()) }));
    },
    [email],
  );

  const toggle = useCallback(
    async (slug: string) => {
      const next = !saved.has(slug);
      // Update right away, then confirm with the server.
      setSaved((current) => {
        const copy = new Set(current);
        if (next) copy.add(slug);
        else copy.delete(slug);
        return copy;
      });
      const res = await fetch("/api/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, saved: next }),
      });
      if (res.ok) {
        const data = (await res.json()) as { slugs: string[] };
        setSaved(() => new Set(data.slugs));
      }
    },
    [saved, setSaved],
  );

  const clearAll = useCallback(async () => {
    const res = await fetch("/api/saved", { method: "DELETE" });
    if (res.ok) setSaved(() => new Set());
  }, [setSaved]);

  return <SavedContext.Provider value={{ saved, ready, toggle, clearAll }}>{children}</SavedContext.Provider>;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SavedProvider>{children}</SavedProvider>
    </SessionProvider>
  );
}
