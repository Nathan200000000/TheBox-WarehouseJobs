# TheBox

A direct-to-employer warehouse job platform focused on transparency, verification, and scam-resistant job discovery.

TheBox lists verified warehouse and logistics employers and sends job seekers straight to each employer's **official hiring website**. It doesn't post or copy job listings, act as a staffing agency, or collect applications.

## Features

- **Search** by job title, role (e.g. forklift, package handler), industry or employer, plus location. Press Enter or click *Find Employers*.
- **Filters** by industry and role.
- **Featured employers** on the home page.
- **Employer pages** with source verification and a direct link to the official hiring site.
- **Verification page** (`/verification`) explaining the checks every employer passes, with the full list of verified employers.
- **Scam reporting** (`/report`) with common warning signs. Reports are filed as GitHub issues on this repo.
- **For Employers** (`/for-employers`): listing criteria and a request form for new listings or corrections.
- **Sign in with Google** (`/signin`): save employers to your account (`/account`) and send scam reports privately, without a GitHub account.
- **Admin report inbox** (`/admin/reports`): private scam reports, visible only to emails in `ADMIN_EMAILS`.
- **Privacy policy** (`/privacy`).
- Light and dark theme (remembered between visits), animation that respects reduced-motion settings, mobile-friendly layout.

## Adding an employer

1. Add an entry to `EMPLOYERS` in `src/lib/employers.ts` (name, industry, typical roles, official careers link).
2. Add its page in `src/app/employers/<slug>/page.tsx` (copy an existing employer page).

## Tech

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Deployed on Vercel.

## Accounts and storage

- Sign-in uses [Auth.js](https://authjs.dev) with Google, requesting only name, email and profile picture.
- Saved employers and scam reports are stored as private JSON files in a Vercel Blob store (`src/lib/storage.ts`). Locally, without `BLOB_READ_WRITE_TOKEN`, they're written to `.data/` instead.
- Environment variables are listed in `.env.example`.

### Setting up Google sign-in

1. In [Google Cloud Console](https://console.cloud.google.com/apis/credentials), create an **OAuth client ID** of type **Web application**.
2. Add each site address as an **Authorized redirect URI**, ending in `/api/auth/callback/google`, for example `https://your-domain/api/auth/callback/google` and `http://localhost:3000/api/auth/callback/google`.
3. Put the client ID and secret in `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` (Vercel project settings → Environment Variables).
4. On the OAuth consent screen, set the publishing status to **In production** so anyone with a Google account can sign in.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in what you need
npm run dev
```

To try accounts locally without Google, set `AUTH_DEV_LOGIN=1` and an `AUTH_SECRET` in `.env.local`; the sign-in page then offers a test account.

Open http://localhost:3000.
