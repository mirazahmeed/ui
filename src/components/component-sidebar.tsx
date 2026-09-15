"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
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
    <div className="w-full h-full flex flex-col">
      <div className="px-4 pt-5 pb-4 space-y-3 border-b border-border">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Components</h4>
          <span className="text-[11px] font-mono font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md border border-border">
            {COMPONENTS.length}
          </span>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Filter..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-xs rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring/30 text-foreground placeholder:text-muted-foreground transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {filteredComponents.length === 0 ? (
          <p className="text-xs text-muted-foreground py-8 text-center px-4">No components match “{searchQuery}”</p>
        ) : (
          filteredComponents.map((comp) => {
            const isActive = pathname === `/components/${comp.slug}` || (pathname === "/" && comp.slug === "stacking-navbar");
            return (
              <Link
                key={comp.slug}
                href={`/components/${comp.slug}`}
                className={`group flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-foreground text-background font-medium shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span className="truncate text-xs">{comp.title}</span>
                {isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-background shrink-0" />
                ) : (
                  <span className="text-[10px] font-mono opacity-0 group-hover:opacity-60 transition-opacity shrink-0">{comp.category.slice(0, 3)}</span>
                )}
              </Link>
            );
          })
        )}
      </div>

      <div className="px-4 py-4 border-t border-border space-y-3 mt-auto">
        <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Community</h5>
        <div className="flex flex-col gap-1">
          <a
            href="https://github.com/mirazahmeed/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5 px-2 -mx-2 rounded-lg hover:bg-muted"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            GitHub Repository
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-1.5 px-2 -mx-2 rounded-lg hover:bg-muted"
          >
            <TwitterIcon className="w-3.5 h-3.5" />
            Follow Updates
          </a>
        </div>
      </div>
    </div>
  );
}

export default ComponentSidebar;
