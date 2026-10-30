import "server-only";
import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { get, list, put } from "@vercel/blob";

// Private JSON storage. On Vercel this uses a private Blob store
// (BLOB_READ_WRITE_TOKEN); locally it falls back to files in .data/.
const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const LOCAL_DIR = path.join(process.cwd(), ".data");

export async function readJson<T>(pathname: string): Promise<T | null> {
  if (useBlob) {
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  }
  try {
    return JSON.parse(await fs.readFile(path.join(LOCAL_DIR, pathname), "utf8")) as T;
  } catch {
    return null;
  }
}

export async function writeJson(pathname: string, data: unknown): Promise<void> {
  const body = JSON.stringify(data);
  if (useBlob) {
    await put(pathname, body, {
      access: "private",
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  }
  const file = path.join(LOCAL_DIR, pathname);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, body);
}

export async function listJson<T>(prefix: string): Promise<T[]> {
  let pathnames: string[];
  if (useBlob) {
    pathnames = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix, cursor, limit: 1000 });
      pathnames.push(...page.blobs.map((blob) => blob.pathname));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } else {
    try {
      const dir = path.join(LOCAL_DIR, prefix);
      pathnames = (await fs.readdir(dir)).map((name) => path.posix.join(prefix, name));
    } catch {
      pathnames = [];
    }
  }
  const items: (T | null)[] = await Promise.all(pathnames.map((p) => readJson<T>(p)));
  return items.filter((item): item is T => item !== null);
}

// Stable, non-reversible key for a user's files, so emails aren't used as paths.
export function userKey(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}
