import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

// Local testing only: a "Test account" sign-in that skips Google.
// Never active on Vercel, and only when AUTH_DEV_LOGIN=1 is set.
const devLogin = process.env.AUTH_DEV_LOGIN === "1" && !process.env.VERCEL;

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    // Reads AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET from the environment.
    // Only basic profile scopes (name, email, picture) are requested.
    Google,
    ...(devLogin
      ? [
          Credentials({
            id: "dev",
            name: "Test account",
            credentials: { email: { label: "Email", type: "email" } },
            authorize: (credentials) => {
              const email = String(credentials?.email ?? "").trim();
              return email ? { id: email, email, name: "Test User" } : null;
            },
          }),
        ]
      : []),
  ],
  pages: { signIn: "/signin" },
});

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(email.toLowerCase());
}
