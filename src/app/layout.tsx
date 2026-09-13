import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { ComponentSidebar } from "@/components/component-sidebar";
import { MobileNav } from "@/components/mobile-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "craft/ui - Free Production React Components",
    template: "%s | craft/ui",
  },
  description:
    "A clean, developer-focused React component playground. Discover, test live interactions, inspect source code, and copy-paste directly into your project. Free and zero setup.",
  keywords: [
    "React components",
    "Tailwind CSS",
    "Framer Motion",
    "UI playground",
    "Open source UI",
    "Copy paste components",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SiteHeader />

        <div className="w-full max-w-6xl mx-auto lg:border-x border-zinc-200 dark:border-zinc-800 flex flex-1">
          {/* Desktop Left Sidebar */}
          <aside className="hidden md:flex w-64 min-w-[240px] max-w-[260px] border-r border-zinc-200 dark:border-zinc-800 sticky top-13 h-[calc(100vh-3.25rem)]">
            <ComponentSidebar />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 px-4 sm:px-8">
            {children}
          </main>
        </div>

        {/* Mobile floating component switcher */}
        <MobileNav />
      </body>
    </html>
  );
}
