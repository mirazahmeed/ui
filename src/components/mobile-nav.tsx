"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { COMPONENTS } from "@/data/components";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  const filtered = COMPONENTS.filter(
    (c) => c.title.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="md:hidden fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-foreground text-background shadow-xl border border-border font-medium text-xs cursor-pointer active:scale-95 transition-transform hover:opacity-90"
          aria-label="Open components list"
        >
          <Menu className="w-4 h-4" />
          Components
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl bg-card border-t border-border flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-center pt-2 pb-1">
                <div className="w-9 h-1 rounded-full bg-border" />
              </div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Components</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-4 pt-3 pb-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Filter components..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-ring/30 focus:ring-2 focus:ring-ring/20"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-2 pb-6 pt-2 space-y-1">
                {filtered.map((comp) => {
                  const isActive = pathname === `/components/${comp.slug}` || (pathname === "/" && comp.slug === "stacking-navbar");
                  return (
                    <Link
                      key={comp.slug}
                      href={`/components/${comp.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between gap-3 px-3 py-3 rounded-xl text-sm transition-colors ${
                        isActive
                          ? "bg-foreground text-background font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{comp.title}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md border ${
                          isActive ? "bg-background/10 border-background/20 text-background" : "bg-muted border-border text-muted-foreground"
                        }`}
                      >
                        {comp.category}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileNav;
