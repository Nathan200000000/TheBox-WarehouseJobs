import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppShell from "@/components/AppShell";
import Providers from "@/components/Providers";
import ScrollReveal from "@/components/ScrollReveal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
          <AppShell>{children}</AppShell>
          <ScrollReveal />
        </Providers>
      </body>
    </html>
  );
}
