"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Eye, FileText, Cpu, LucideIcon } from "lucide-react";

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  badge?: string;
  content: string;
}

const defaultTabs: TabItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: Eye,
    content: "Explore real-time telemetry, core performance metrics, and activity history in a unified canvas.",
  },
  {
    id: "source",
    label: "Source",
    icon: Code2,
    badge: "TSX",
    content: "Self-contained component definitions with zero internal dependencies and complete type coverage.",
  },
  {
    id: "specs",
    label: "Specs",
    icon: FileText,
    content: "WCAG 2.1 AA compliant keyboard navigation, ARIA semantics, and fluid layout indicators.",
  },
  {
    id: "engine",
    label: "Engine",
    icon: Cpu,
    badge: "v2",
    content: "Powered by Framer Motion's projection engine for layout animations without DOM reflow artifacts.",
  },
];

export function AnimatedTabs({ tabs = defaultTabs }: { tabs?: TabItem[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeItem = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer select-none
                ${isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab-pill"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {Icon && <Icon className="w-3.5 h-3.5 opacity-80" />}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isActive ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200" : "bg-zinc-200/60 dark:bg-zinc-800 text-zinc-500"}`}>
                    {tab.badge}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="p-5 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 min-h-[96px] flex items-center shadow-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {activeItem.label} Panel
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {activeItem.content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AnimatedTabs;
