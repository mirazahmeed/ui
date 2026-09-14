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
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{window.Prism=window.Prism||{};window.Prism.manual=true;var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(!t&&m))document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-background text-foreground font-sans"
        suppressHydrationWarning
      >
        <SiteHeader />
        <div className="w-full max-w-[1440px] mx-auto flex flex-1 min-h-0">
          <aside className="hidden md:flex w-[260px] shrink-0 sticky top-14 h-[calc(100vh-3.5rem)] border-r border-border bg-background">
            <ComponentSidebar />
          </aside>
          <main className="flex-1 min-w-0 px-5 sm:px-6 lg:px-8 py-2">
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
