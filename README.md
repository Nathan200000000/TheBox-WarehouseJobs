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
- Light and dark theme (remembered between visits), mobile-friendly layout.

## Adding an employer

1. Add an entry to `EMPLOYERS` in `src/lib/employers.ts` (name, industry, typical roles, official careers link).
2. Add its page in `src/app/employers/<slug>/page.tsx` (copy an existing employer page).

## Tech

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.
