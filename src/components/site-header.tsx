"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Sun, Moon } from "lucide-react";
import { GithubIcon, TwitterIcon } from "@/components/icons";
import { COMPONENTS } from "@/data/components";
import { useRouter } from "next/navigation";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", initial === "dark");
    queueMicrotask(() => {
      setTheme(initial);
      setMounted(true);
    });
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      localStorage.setItem("theme", next);
      return next;
    });
  }, []);

  return { theme, toggle, mounted };
}

export function SiteHeader() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, toggle, mounted } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isSearchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  const searchResults = COMPONENTS.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="w-full border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-40 supports-[backdrop-filter]:bg-background/80">
        <div className="w-full mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/logo.svg"
                alt="mirazahmed/ui."
                width={26}
                height={26}
                className="w-6.5 h-6.5 rounded-lg shadow-xs group-hover:scale-105 transition-transform shrink-0"
              />
              <span className="font-semibold text-sm tracking-tight text-foreground">
                mirazahmed/ui.
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-sm mx-4 hidden md:block">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between gap-3 px-3 py-2 text-xs rounded-lg bg-muted/70 border border-border text-muted-foreground hover:bg-muted hover:border-border-strong hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 min-w-0">
                <Search className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Search components...</span>
              </span>
              <kbd className="hidden sm:inline-flex font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-card text-muted-foreground border border-border shadow-xs shrink-0">
                ⌘K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <a
              href="https://github.com/mirazahmeed/ui"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-xs font-medium"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-xs font-medium"
            >
              <TwitterIcon className="w-4 h-4" />
              Twitter
            </a>

            <div className="w-px h-5 bg-border mx-1 hidden sm:block" />

            <button
              onClick={toggle}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent hover:border-border transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <span className="w-4 h-4 block" />
              ) : theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl overflow-hidden z-10">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search components, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-[10px] font-mono px-1.5 py-1 rounded-md bg-muted text-muted-foreground border border-border shrink-0"
              >
                ESC
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {searchResults.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">
                  No components found for “{searchQuery}”
                </p>
              ) : (
                searchResults.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => {
                      router.push(`/components/${c.slug}`);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-muted transition-colors text-left cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {c.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {c.description}
                      </p>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase font-mono px-2 py-1 rounded-md bg-muted border border-border shrink-0 group-hover:bg-card transition-colors">
                      {c.category}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SiteHeader;
