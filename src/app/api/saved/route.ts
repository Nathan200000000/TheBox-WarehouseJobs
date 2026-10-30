import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { findEmployer } from "@/lib/employers";
import { readJson, userKey, writeJson } from "@/lib/storage";

type SavedFile = { slugs: string[]; updatedAt: string };

const fileFor = (email: string) => `saved/${userKey(email)}.json`;

async function currentEmail() {
  const session = await auth();
  return session?.user?.email ?? null;
}

// The signed-in user's saved employers.
export async function GET() {
  const email = await currentEmail();
  if (!email) return NextResponse.json({ error: "Sign in to see saved employers." }, { status: 401 });
  const file = await readJson<SavedFile>(fileFor(email));
  return NextResponse.json({ slugs: file?.slugs ?? [] });
}

// Save or unsave one employer: { slug, saved }.
export async function POST(request: Request) {
  const email = await currentEmail();
  if (!email) return NextResponse.json({ error: "Sign in to save employers." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as { slug?: unknown; saved?: unknown } | null;
  const slug = typeof body?.slug === "string" ? body.slug : "";
  if (!findEmployer(slug) || typeof body?.saved !== "boolean") {
    return NextResponse.json({ error: "Unknown employer." }, { status: 400 });
  }

  const current = (await readJson<SavedFile>(fileFor(email)))?.slugs ?? [];
  const slugs = body.saved
    ? Array.from(new Set([...current, slug]))
    : current.filter((value) => value !== slug);
  await writeJson(fileFor(email), { slugs, updatedAt: new Date().toISOString() } satisfies SavedFile);
  return NextResponse.json({ slugs });
}

// Remove all of the user's saved employers.
export async function DELETE() {
  const email = await currentEmail();
  if (!email) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  await writeJson(fileFor(email), { slugs: [], updatedAt: new Date().toISOString() } satisfies SavedFile);
  return NextResponse.json({ slugs: [] });
}
