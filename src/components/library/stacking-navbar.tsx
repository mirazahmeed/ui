"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon, Compass, Sparkles, FolderGit2, Mail } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
}

export interface StackingNavbarProps {
  items?: NavItem[];
  className?: string;
}

const defaultItems: NavItem[] = [
  { href: "#projects", label: "Projects", icon: FolderGit2 },
  { href: "#components", label: "Components", icon: Sparkles },
  { href: "#explore", label: "Explore", icon: Compass },
  { href: "#contact", label: "Contact", icon: Mail },
];

export function StackingNavbar({
  items = defaultItems,
  className = "",
}: StackingNavbarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`inline-flex items-center p-2 rounded-full transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex items-center">
        {items.map((item, index) => {
          const Icon = item.icon;
          // Offset when collapsed
          const collapsedX = -72 * index;
          return (
            <motion.div
              key={item.label}
              initial={false}
              animate={{
                x: isExpanded ? 0 : collapsedX,
              }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 28,
                delay: isExpanded ? index * 0.04 : (items.length - index) * 0.02,
              }}
              style={{
                zIndex: items.length - index,
              }}
              className="relative select-none"
            >
              <Link
                href={item.href}
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium
                  bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 hover:text-white
                  dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 dark:hover:text-black
                  border border-zinc-700/50 dark:border-zinc-300/50
                  shadow-lg shadow-black/10 backdrop-blur-md
                  transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {Icon && <Icon className="w-4 h-4 opacity-80" />}
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default StackingNavbar;
