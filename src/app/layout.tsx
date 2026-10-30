import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";
import Providers from "@/components/Providers";
import ScrollReveal from "@/components/ScrollReveal";
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

const NAV_LINKS = [
  { href: "/#jobs", label: "Find Jobs" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/verification", label: "Verification" },
  { href: "/for-employers", label: "For Employers" },
  { href: "/report", label: "Report a Scam" },
];

// Applies the saved theme before the page paints, so it doesn't flash.
const THEME_SCRIPT = `try{if(localStorage.getItem("thebox-theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export const metadata: Metadata = {
  title: "TheBox — Direct Warehouse Jobs",
  description: "Real warehouse jobs. Direct from employers. No middlemen.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full overflow-x-hidden bg-white text-slate-900 dark:bg-black dark:text-white">
        <Providers>
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

            <nav aria-label="Main" className="flex items-center gap-3">
              <div className="hidden items-center gap-6 text-sm text-slate-600 dark:text-slate-300 md:flex">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition hover:text-slate-950 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <ThemeToggle />
              <AuthButton />
            </nav>
          </div>

          <nav
            aria-label="Main (mobile)"
            className="flex gap-5 overflow-x-auto border-t border-slate-200 px-6 py-3 text-sm whitespace-nowrap text-slate-600 md:hidden dark:border-neutral-800 dark:text-slate-300"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-slate-950 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        {children}

        <ScrollReveal />
        </Providers>
      </body>
    </html>
  );
}
