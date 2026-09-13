"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Share2, Bookmark, Copy, Edit3, Check } from "lucide-react";

export interface ActionItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const actions: ActionItem[] = [
    {
      id: "edit",
      label: "Quick Edit",
      icon: Edit3,
    },
    {
      id: "save",
      label: "Bookmark Item",
      icon: Bookmark,
    },
    {
      id: "share",
      label: "Share Link",
      icon: Share2,
    },
    {
      id: "copy",
      label: copied ? "Copied Link!" : "Copy URL",
      icon: copied ? Check : Copy,
      onClick: () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
  ];

  return (
    <div className="relative flex flex-col items-center py-8">
      <div className="relative flex flex-col items-center">
        {/* Popped out action buttons */}
        <AnimatePresence>
          {isOpen && (
            <div className="flex flex-col items-center gap-2.5 mb-3">
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, y: 15, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 25,
                      delay: (actions.length - index) * 0.04,
                    }}
                    className="flex items-center gap-2"
                  >
                    {/* Tooltip label */}
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md">
                      {action.label}
                    </span>

                    <button
                      onClick={() => {
                        action.onClick?.();
                      }}
                      className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 shadow-md flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer"
                      aria-label={action.label}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.92 }}
          className="w-12 h-12 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-xl flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
          aria-label={isOpen ? "Close actions" : "Open actions"}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Plus className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </div>

      <p className="text-xs text-zinc-400 mt-4">
        {isOpen ? "Click cross to collapse" : "Click plus to expand actions"}
      </p>
    </div>
  );
}

export default FloatingActionMenu;
