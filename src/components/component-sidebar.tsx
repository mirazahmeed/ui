"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { GithubIcon, TwitterIcon } from "@/components/icons";
import { COMPONENTS } from "@/data/components";

export function ComponentSidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredComponents = COMPONENTS.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <aside className="w-full h-full flex flex-col pt-6 pb-8 pr-4">
      {/* Sidebar Header & Search */}
      <div className="space-y-3 pb-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold tracking-tight text-foreground">
            All Components
          </h4>
          <span className="text-[11px] font-mono text-muted-foreground bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
            {COMPONENTS.length}
          </span>
        </div>

        {/* Quick Filter Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-500 text-foreground placeholder-zinc-400 transition-colors"
          />
        </div>
      </div>

      {/* Component Navigation Links */}
      <div className="flex-1 overflow-y-auto space-y-1 pr-1">
        {filteredComponents.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">
            No components match &quot;{searchQuery}&quot;
          </p>
        ) : (
          filteredComponents.map((comp) => {
            const isActive =
              pathname === `/components/${comp.slug}` ||
              (pathname === "/" && comp.slug === "stacking-navbar");

            return (
              <Link
                key={comp.slug}
                href={`/components/${comp.slug}`}
                className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all duration-150 ${
                  isActive
                    ? "font-semibold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800/80"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                }`}
              >
                <span>{comp.title}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white" />
                )}
              </Link>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
        <h5 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          Community
        </h5>
        <div className="flex flex-col space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors py-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-foreground transition-colors py-1"
          >
            <TwitterIcon className="w-3.5 h-3.5" />
            <span>Follow Updates</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default ComponentSidebar;
