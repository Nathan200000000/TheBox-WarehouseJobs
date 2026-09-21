import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheBox — Direct Warehouse Jobs",
  description: "Real warehouse jobs. Direct from employers. No middlemen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-white text-slate-900 dark:bg-black dark:text-white">
        <header className="w-full border-b border-slate-200 bg-white dark:border-neutral-800 dark:bg-black">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
            <Link href="/" className="shrink-0">
              <div className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                TheBox
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Direct warehouse jobs
              </div>
            </Link>

            <nav className="flex items-center gap-4">
              <div className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex">
                <Link
                  href="/#jobs"
                  className="transition hover:text-slate-950 dark:hover:text-white"
                >
                  Find Jobs
                </Link>

                <Link
                  href="/#how-it-works"
                  className="transition hover:text-slate-950 dark:hover:text-white"
                >
                  How It Works
                </Link>

                <Link
                  href="/#about"
                  className="transition hover:text-slate-950 dark:hover:text-white"
                >
                  About
                </Link>
              </div>

              <ThemeToggle />
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
