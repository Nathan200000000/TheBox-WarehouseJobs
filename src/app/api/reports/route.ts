import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { RED_FLAGS } from "@/components/RedFlags";
import { findEmployer } from "@/lib/employers";
import type { ScamReport } from "@/lib/reports";
import { writeJson } from "@/lib/storage";

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

// Store a scam report privately. Only the site's admins can read reports.
export async function POST(request: Request) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Sign in with Google to send a private report." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const details = clean(body?.details, 4000);
  if (details.length < 10) {
    return NextResponse.json(
      { error: "Describe what happened in at least a sentence so we can look into it." },
      { status: 400 },
    );
  }

  const employerSlug = clean(body?.employer, 60);
  const flags = Array.isArray(body?.flags)
    ? body.flags.filter((flag): flag is string => typeof flag === "string" && RED_FLAGS.includes(flag))
    : [];

  const createdAt = new Date().toISOString();
  const report: ScamReport = {
    id: randomUUID(),
    createdAt,
    reporterName: session.user?.name ?? null,
    reporterEmail: email,
    employer: findEmployer(employerSlug)?.name ?? "Not listed / other",
    link: clean(body?.link, 500),
    details,
    flags,
  };
  await writeJson(`reports/${createdAt.replace(/[:.]/g, "-")}-${report.id}.json`, report);
  return NextResponse.json({ ok: true, id: report.id }, { status: 201 });
}
