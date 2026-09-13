"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  User,
  Settings,
  CreditCard,
  Keyboard,
  LogOut,
  Sparkles,
} from "lucide-react";

export interface DropdownMenuItem {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  danger?: boolean;
  onClick?: () => void;
  separator?: boolean;
}

export interface DropdownMenuProps {
  triggerLabel?: string;
  items?: DropdownMenuItem[];
}

const defaultItems: DropdownMenuItem[] = [
  { label: "Account Profile", icon: User, shortcut: "⇧⌘P" },
  { label: "Billing & Plans", icon: CreditCard, shortcut: "⌘B" },
  { label: "Preferences", icon: Settings, shortcut: "⌘," },
  { label: "Keyboard Shortcuts", icon: Keyboard, shortcut: "?" },
  { separator: true, label: "" },
  { label: "Upgrade to Pro", icon: Sparkles },
  { separator: true, label: "" },
  { label: "Log out", icon: LogOut, shortcut: "⌥⇧Q", danger: true },
];

export function DropdownMenu({
  triggerLabel = "Options Menu",
  items = defaultItems,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
          bg-zinc-900 text-zinc-50 hover:bg-zinc-800
          dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200
          border border-zinc-800 dark:border-zinc-200 shadow-sm
          transition-all duration-150 active:scale-[0.98] cursor-pointer"
      >
        <span>{triggerLabel}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 opacity-70" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl
              bg-white dark:bg-zinc-900
              border border-zinc-200 dark:border-zinc-800
              shadow-xl shadow-black/5 dark:shadow-black/20 p-1.5 z-50 focus:outline-none"
          >
            <div className="flex flex-col gap-0.5">
              {items.map((item, idx) => {
                if (item.separator) {
                  return (
                    <div
                      key={`sep-${idx}`}
                      className="my-1 border-t border-zinc-100 dark:border-zinc-800"
                    />
                  );
                }

                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className={`group flex w-full items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 cursor-pointer
                      ${
                        item.danger
                          ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                          : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      {Icon && (
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            item.danger
                              ? "text-red-500"
                              : "text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                          }`}
                        />
                      )}
                      <span>{item.label}</span>
                    </div>
                    {item.shortcut && (
                      <span className="text-[10px] tracking-widest text-zinc-400 font-mono">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropdownMenu;
