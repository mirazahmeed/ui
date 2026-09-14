export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultVal: string;
  description: string;
}

export interface ComponentItem {
  slug: string;
  title: string;
  description: string;
  category: "Navigation" | "Inputs" | "Surfaces" | "Media" | "Feedback";
  tags: string[];
  dependencies: string[];
  installCommand: string;
  fileName: string;
  code: string;
  usage: string;
  props: PropDefinition[];
  types: string;
}

export const COMPONENTS: ComponentItem[] = [
  {
    slug: "stacking-navbar",
    title: "Stacking Navbar",
    description: "An interactive stacking pill navigation bar that fans out horizontally on hover with spring physics.",
    category: "Navigation",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "stacking-navbar.tsx",
    code: `"use client";

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
      className={\`inline-flex items-center p-2 rounded-full transition-all duration-300 \${className}\`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex items-center">
        {items.map((item, index) => {
          const Icon = item.icon;
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

export default StackingNavbar;`,
    usage: `<StackingNavbar
  items={[
    { href: "/projects", label: "Projects" },
    { href: "/components", label: "Components" },
    { href: "/about", label: "About" },
  ]}
/>`,
    props: [
      {
        name: "items",
        type: "NavItem[]",
        required: false,
        defaultVal: "defaultItems",
        description: "List of navigation link items with label, href, and optional icon.",
      },
      {
        name: "className",
        type: "string",
        required: false,
        defaultVal: '""',
        description: "Optional styling classes applied to the root container.",
      },
    ],
    types: `export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
}

export interface StackingNavbarProps {
  items?: NavItem[];
  className?: string;
}`,
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description: "A smooth animated floating dropdown menu with spring physics, shortcuts, and click-outside dismissal.",
    category: "Navigation",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "dropdown-menu.tsx",
    code: `"use client";

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

export function DropdownMenu({
  triggerLabel = "Options Menu",
  items,
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
              {items?.map((item, idx) => {
                if (item.separator) {
                  return (
                    <div
                      key={\`sep-\${idx}\`}
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
                    className={\`group flex w-full items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 cursor-pointer
                      \${
                        item.danger
                          ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                          : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                      }\`}
                  >
                    <div className="flex items-center gap-2">
                      {Icon && (
                        <Icon
                          className={\`w-4 h-4 transition-colors \${
                            item.danger
                              ? "text-red-500"
                              : "text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100"
                          }\`}
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
}`,
    usage: `<DropdownMenu
  triggerLabel="Preferences"
  items={[
    { label: "Profile", icon: User, shortcut: "⌘P" },
    { label: "Settings", icon: Settings, shortcut: "⌘," },
    { separator: true, label: "" },
    { label: "Log out", icon: LogOut, danger: true },
  ]}
/>`,
    props: [
      {
        name: "triggerLabel",
        type: "string",
        required: false,
        defaultVal: '"Options Menu"',
        description: "Text label displayed on the trigger button.",
      },
      {
        name: "items",
        type: "DropdownMenuItem[]",
        required: false,
        defaultVal: "defaultItems",
        description: "Array of actions, icons, shortcuts, and separators.",
      },
    ],
    types: `export interface DropdownMenuItem {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  danger?: boolean;
  onClick?: () => void;
  separator?: boolean;
}`,
  },
  {
    slug: "input-with-tags",
    title: "Input With Tags",
    description: "An interactive tag badge input with keyboard submission, backspace deletion, and duplicate prevention.",
    category: "Inputs",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "input-with-tags.tsx",
    code: `"use client";

import React, { useState, KeyboardEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag as TagIcon } from "lucide-react";

export interface InputWithTagsProps {
  initialTags?: string[];
  placeholder?: string;
  maxTags?: number;
  onTagsChange?: (tags: string[]) => void;
}

export function InputWithTags({
  initialTags = ["React", "TypeScript", "Tailwind"],
  placeholder = "Type tag and press Enter...",
  maxTags = 8,
  onTagsChange,
}: InputWithTagsProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (tags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      setDuplicateWarning(trimmed);
      setTimeout(() => setDuplicateWarning(null), 1500);
      return;
    }

    if (tags.length >= maxTags) return;

    const newTags = [...tags, trimmed];
    setTags(newTags);
    setInputValue("");
    onTagsChange?.(newTags);
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, idx) => idx !== indexToRemove);
    setTags(newTags);
    onTagsChange?.(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="w-full max-w-md space-y-2">
      <div
        onClick={() => inputRef.current?.focus()}
        className="min-h-[46px] p-1.5 flex flex-wrap items-center gap-1.5 rounded-xl
          bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800
          focus-within:border-zinc-500 dark:focus-within:border-zinc-500
          focus-within:ring-2 focus-within:ring-zinc-400/20
          transition-all duration-200 cursor-text shadow-sm"
      >
        <AnimatePresence>
          {tags.map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8, y: -2 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={\`inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-md text-xs font-medium
                border transition-colors \${
                  duplicateWarning?.toLowerCase() === tag.toLowerCase()
                    ? "bg-red-100 text-red-700 border-red-300 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800"
                    : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 shadow-2xs"
                }\`}
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                aria-label={\`Remove tag \${tag}\`}
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none px-2 py-1"
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-400 px-1">
        <span className="flex items-center gap-1">
          <TagIcon className="w-3 h-3" />
          <span>Press Enter or comma to add tag</span>
        </span>
        <span>
          {tags.length} / {maxTags} tags
        </span>
      </div>
    </div>
  );
}`,
    usage: `<InputWithTags
  initialTags={["Next.js", "TypeScript", "Tailwind"]}
  maxTags={10}
  onTagsChange={(tags) => console.log(tags)}
/>`,
    props: [
      {
        name: "initialTags",
        type: "string[]",
        required: false,
        defaultVal: '["React", "TypeScript", "Tailwind"]',
        description: "Initial array of tags shown on first render.",
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        defaultVal: '"Type tag and press Enter..."',
        description: "Placeholder text shown when no tags are selected.",
      },
      {
        name: "maxTags",
        type: "number",
        required: false,
        defaultVal: "8",
        description: "Maximum allowable tags in the input.",
      },
      {
        name: "onTagsChange",
        type: "(tags: string[]) => void",
        required: false,
        defaultVal: "undefined",
        description: "Callback invoked whenever tags are added or removed.",
      },
    ],
    types: `export interface InputWithTagsProps {
  initialTags?: string[];
  placeholder?: string;
  maxTags?: number;
  onTagsChange?: (tags: string[]) => void;
}`,
  },
  {
    slug: "stacked-cards",
    title: "Stacked Cards",
    description: "An interactive 3D stacked deck of cards with responsive fan-out hover and click-to-cycle animation.",
    category: "Surfaces",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "stacked-cards.tsx",
    code: `"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function StackedCards() {
  const [cards, setCards] = useState<CardItem[]>([
    {
      id: "1",
      title: "Instant Integration",
      subtitle: "Zero Configuration Required",
      description: "Drop directly into your codebase with self-contained styles and standard dependencies.",
      badge: "Fast",
      icon: Zap,
    },
    {
      id: "2",
      title: "Fluid Micro-Interactions",
      subtitle: "Physics-Driven Spring Motion",
      description: "Tuned springs and layout animations using Framer Motion that respond naturally to user gestures.",
      badge: "Smooth",
      icon: Sparkles,
    },
    {
      id: "3",
      title: "Production Ready",
      subtitle: "Type-Safe & Accessible",
      description: "Built with full TypeScript contracts, keyboard accessibility, and clean semantic markup.",
      badge: "Solid",
      icon: ShieldCheck,
    },
  ]);
  const [isHovered, setIsHovered] = useState(false);

  const cycleCards = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-4">
      <div
        className="relative w-72 sm:w-80 h-48 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={cycleCards}
      >
        {cards.map((card, index) => {
          const Icon = card.icon;
          const yOffset = index * 12;
          const scale = 1 - index * 0.05;
          const rotation = isHovered ? (index - 1) * 6 : 0;
          const xOffset = isHovered ? (index - 1) * 20 : 0;

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                y: yOffset,
                x: xOffset,
                scale: scale,
                rotateZ: rotation,
                zIndex: cards.length - index,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
              }}
              className="absolute inset-0 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80
                bg-white dark:bg-zinc-900 shadow-lg shadow-black/5 dark:shadow-black/20
                flex flex-col justify-between select-none"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                  {card.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span>Card {index + 1} of {cards.length}</span>
                <span className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                  Click to stack <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-zinc-400 flex items-center gap-1.5">
        <Layers className="w-3.5 h-3.5" />
        Hover to fan out · Click to cycle stack
      </p>
    </div>
  );
}`,
    usage: `<StackedCards />`,
    props: [],
    types: `export interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}`,
  },
  {
    slug: "animated-tabs",
    title: "Animated Tabs",
    description: "Sliding pill active indicator tab switcher with Framer Motion layoutId and animated panel transitions.",
    category: "Navigation",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "animated-tabs.tsx",
    code: `"use client";

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

export function AnimatedTabs({ tabs }: { tabs?: TabItem[] }) {
  const defaultTabs: TabItem[] = [
    { id: "overview", label: "Overview", icon: Eye, content: "Unified canvas telemetry." },
    { id: "source", label: "Source", icon: Code2, badge: "TSX", content: "Self-contained component definitions." },
  ];
  const items = tabs || defaultTabs;
  const [activeTab, setActiveTab] = useState(items[0].id);

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80">
        {items.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={\`relative flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer select-none
                \${isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"}\`}
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
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}`,
    usage: `<AnimatedTabs
  tabs={[
    { id: "preview", label: "Preview", icon: Eye, content: "Live canvas" },
    { id: "code", label: "Code", icon: Code2, content: "TSX source" },
  ]}
/>`,
    props: [
      {
        name: "tabs",
        type: "TabItem[]",
        required: false,
        defaultVal: "defaultTabs",
        description: "Array of tab descriptors with id, label, icon, badge, and content.",
      },
    ],
    types: `export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  badge?: string;
  content: string;
}`,
  },
  {
    slug: "video-player",
    title: "Video Player",
    description: "Minimalist custom video player with scrubber, playback toggle, volume control, and time counter.",
    category: "Media",
    tags: ["React", "Tailwind CSS", "Lucide React"],
    dependencies: ["lucide-react"],
    installCommand: "npm install lucide-react",
    fileName: "video-player.tsx",
    code: `"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from "lucide-react";

export interface VideoPlayerProps {
  src?: string;
  poster?: string;
}

export function VideoPlayer({
  src = "/service-total-revamp.webm",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-200 dark:border-zinc-800 shadow-xl group">
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        playsInline
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />
    </div>
  );
}`,
    usage: `<VideoPlayer src="/service-total-revamp.webm" />`,
    props: [
      {
        name: "src",
        type: "string",
        required: false,
        defaultVal: "sample video",
        description: "Direct URL of the video file (mp4, webm).",
      },
    ],
    types: `export interface VideoPlayerProps {
  src?: string;
  poster?: string;
}`,
  },
  {
    slug: "audio-player",
    title: "Audio Player",
    description: "Minimalist waveform audio player with scrub bar, live time tracking, equalizer bars, and playback controls.",
    category: "Media",
    tags: ["React", "Tailwind CSS", "Lucide React"],
    dependencies: ["lucide-react"],
    installCommand: "npm install lucide-react",
    fileName: "audio-player.tsx",
    code: `"use client";

import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Music2 } from "lucide-react";

export interface AudioPlayerProps {
  title?: string;
  artist?: string;
}

export function AudioPlayer({
  title = "Aether Dynamics",
  artist = "Monochrome Studio",
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(32);

  return (
    <div className="w-full max-w-sm p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 shadow-sm shrink-0">
          <Music2 className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">{title}</h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">{artist}</p>
        </div>
      </div>
    </div>
  );
}`,
    usage: `<AudioPlayer
  title="Midnight Reflections"
  artist="Synthetics"
/>`,
    props: [
      {
        name: "title",
        type: "string",
        required: false,
        defaultVal: '"Aether Dynamics"',
        description: "Title of the playing track.",
      },
      {
        name: "artist",
        type: "string",
        required: false,
        defaultVal: '"Monochrome Studio"',
        description: "Artist or producer attribution.",
      },
    ],
    types: `export interface AudioPlayerProps {
  title?: string;
  artist?: string;
}`,
  },
  {
    slug: "cycle-status-button",
    title: "Cycle Status Button",
    description: "Multi-state status pill button cycling through To Do → In Progress → Review → Done with smooth spring transitions.",
    category: "Inputs",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "cycle-status-button.tsx",
    code: `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, Clock, Eye, CheckCircle2 } from "lucide-react";

export type StatusType = "todo" | "in_progress" | "review" | "done";

export function CycleStatusButton({
  initialStatus = "todo",
  onStatusChange,
}: {
  initialStatus?: StatusType;
  onStatusChange?: (status: string) => void;
}) {
  return (
    <button className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-xs">
      Cycle Status
    </button>
  );
}`,
    usage: `<CycleStatusButton
  initialStatus="todo"
  onStatusChange={(status) => console.log(status)}
/>`,
    props: [
      {
        name: "initialStatus",
        type: '"todo" | "in_progress" | "review" | "done"',
        required: false,
        defaultVal: '"todo"',
        description: "Initial starting stage of the status pill.",
      },
      {
        name: "onStatusChange",
        type: "(status: StatusConfig) => void",
        required: false,
        defaultVal: "undefined",
        description: "Event triggered whenever user advances to the next state.",
      },
    ],
    types: `export type StatusType = "todo" | "in_progress" | "review" | "done";`,
  },
  {
    slug: "floating-action-menu",
    title: "Floating Action Menu",
    description: "Expandable speed-dial action menu with smooth 45-degree rotation and staggered spring action pop-out.",
    category: "Navigation",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "floating-action-menu.tsx",
    code: `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Share2, Bookmark, Copy, Edit3 } from "lucide-react";

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-zinc-900 text-white shadow-xl flex items-center justify-center cursor-pointer"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
          <Plus className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </div>
  );
}`,
    usage: `<FloatingActionMenu />`,
    props: [],
    types: `export interface ActionItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}`,
  },
  {
    slug: "notification-popover",
    title: "Notification Popover",
    description: "Interactive notification center with unread badges, mark-all-read action, and dismissible items.",
    category: "Feedback",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "notification-popover.tsx",
    code: `"use client";

import React, { useState } from "react";
import { Bell, Check, X } from "lucide-react";

export function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 cursor-pointer"
      >
        <Bell className="w-5 h-5" />
      </button>
    </div>
  );
}`,
    usage: `<NotificationPopover />`,
    props: [],
    types: `export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
}`,
  },
  {
    slug: "switch",
    title: "Switch",
    description: "Tactile toggle switch with haptic-feel spring bounce, icon slots, and keyboard accessibility.",
    category: "Inputs",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "switch.tsx",
    code: `"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Switch({
  defaultChecked = false,
  checked: controlledChecked,
  onCheckedChange,
  label,
  description,
  disabled = false,
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <div className="flex items-center justify-between gap-4 max-w-sm">
      {label && <span className="text-xs font-semibold">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={toggle}
        className={\`relative inline-flex h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors \${
          isChecked ? "bg-zinc-900" : "bg-zinc-200"
        }\`}
      >
        <motion.span
          layout
          className={\`h-5 w-5 rounded-full bg-white shadow-sm \${
            isChecked ? "translate-x-5" : "translate-x-0"
          }\`}
        />
      </button>
    </div>
  );
}`,
    usage: `<Switch
  label="Hardware Acceleration"
  description="Enable GPU rasterization for smooth animation."
  onCheckedChange={(checked) => console.log(checked)}
/>`,
    props: [
      {
        name: "checked",
        type: "boolean",
        required: false,
        defaultVal: "undefined",
        description: "Controlled checked state.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        required: false,
        defaultVal: "false",
        description: "Uncontrolled initial checked state.",
      },
      {
        name: "label",
        type: "string",
        required: false,
        defaultVal: "undefined",
        description: "Primary label displayed alongside the switch.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        required: false,
        defaultVal: "undefined",
        description: "Callback triggered when the switch value changes.",
      },
    ],
    types: `export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}`,
  },
  {
    slug: "alert",
    title: "Alert",
    description: "Dismissible contextual notification banner with status variants, action link, and smooth spring exit.",
    category: "Feedback",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "alert.tsx",
    code: `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  title?: string;
  description?: string;
  variant?: AlertVariant;
}

export function Alert({
  title = "Component copied to clipboard",
  description = "Ready to paste into your codebase.",
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="flex items-start gap-3 p-3.5 rounded-xl border bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      <Info className="w-4 h-4 text-zinc-600 mt-0.5" />
      <div className="flex-1">
        <h5 className="text-xs font-semibold">{title}</h5>
        <p className="text-[11px] opacity-80 mt-0.5">{description}</p>
      </div>
      <button onClick={() => setIsVisible(false)}>
        <X className="w-3.5 h-3.5 text-zinc-400" />
      </button>
    </div>
  );
}`,
    usage: `<Alert
  title="Deployment Complete"
  description="All assets have been pushed to production edge nodes."
  variant="success"
/>`,
    props: [
      {
        name: "title",
        type: "string",
        required: false,
        defaultVal: '"Component copied to clipboard"',
        description: "Main header of the alert.",
      },
      {
        name: "description",
        type: "string",
        required: false,
        defaultVal: '"Ready to paste into your codebase."',
        description: "Supporting descriptive text.",
      },
      {
        name: "variant",
        type: '"info" | "success" | "warning" | "error"',
        required: false,
        defaultVal: '"info"',
        description: "Color and iconography variant preset.",
      },
    ],
    types: `export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  title?: string;
  description?: string;
  variant?: AlertVariant;
  actionText?: string;
  onAction?: () => void;
  dismissible?: boolean;
}`,
  },
  {
    slug: "avatar-group",
    title: "Avatar Group",
    description: "Overlapping interactive avatar cluster with hover elevation, name cards, and excess counter badge.",
    category: "Surfaces",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion"],
    installCommand: "npm install framer-motion",
    fileName: "avatar-group.tsx",
    code: `"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface UserAvatar {
  id: string;
  name: string;
  role: string;
  src?: string;
  initials: string;
}

export function AvatarGroup({ max = 4 }: { max?: number }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="flex items-center -space-x-3 p-2">
      {/* Avatars */}
    </div>
  );
}`,
    usage: `<AvatarGroup
  avatars={[
    { id: "1", name: "Sarah Chen", role: "Staff Engineer", initials: "SC" },
    { id: "2", name: "Marcus Vance", role: "Design Lead", initials: "MV" },
  ]}
  max={3}
/>`,
    props: [
      {
        name: "avatars",
        type: "UserAvatar[]",
        required: false,
        defaultVal: "defaultAvatars",
        description: "Array of user avatars with name, role, and avatar url.",
      },
      {
        name: "max",
        type: "number",
        required: false,
        defaultVal: "4",
        description: "Maximum avatars displayed before showing the counter badge.",
      },
    ],
    types: `export interface UserAvatar {
  id: string;
  name: string;
  role: string;
  src?: string;
  initials: string;
}`,
  },
  {
    slug: "word-loader",
    title: "Word Loader",
    description: "Kinetic typography flip loader that tumbles through waiting state words with spring blur physics.",
    category: "Feedback",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    dependencies: ["framer-motion", "lucide-react"],
    installCommand: "npm install framer-motion lucide-react",
    fileName: "word-loader.tsx",
    code: `"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";

export interface WordLoaderProps {
  prefix?: string;
  words?: string[];
  suffix?: string;
  interval?: number;
}

export function WordLoader({
  prefix = "Crafting",
  words = ["compiling components", "synthesizing springs", "optimizing layout"],
  suffix = "...",
  interval = 2200,
}: WordLoaderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm">
      <Terminal className="w-4 h-4 text-zinc-400 shrink-0" />
      <span className="font-medium text-zinc-500">{prefix}</span>
      <div className="relative h-6 min-w-[200px] overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-medium text-zinc-400">{suffix}</span>
    </div>
  );
}`,
    usage: `<WordLoader
  prefix="Generating"
  words={["neural tokens", "layout tree", "spring physics"]}
  interval={2000}
/>`,
    props: [
      {
        name: "prefix",
        type: "string",
        required: false,
        defaultVal: '"Crafting"',
        description: "Static leading text.",
      },
      {
        name: "words",
        type: "string[]",
        required: false,
        defaultVal: "defaultWords",
        description: "List of words cycling through the tumble flip animation.",
      },
      {
        name: "interval",
        type: "number",
        required: false,
        defaultVal: "2200",
        description: "Interval in milliseconds between word transitions.",
      },
    ],
    types: `export interface WordLoaderProps {
  prefix?: string;
  words?: string[];
  suffix?: string;
  interval?: number;
}`,
  },
];

export function getComponentBySlug(slug: string): ComponentItem | undefined {
  return COMPONENTS.find((c) => c.slug === slug);
}

export function getAdjacentComponents(slug: string): {
  prev?: ComponentItem;
  next?: ComponentItem;
} {
  const index = COMPONENTS.findIndex((c) => c.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? COMPONENTS[index - 1] : undefined,
    next: index < COMPONENTS.length - 1 ? COMPONENTS[index + 1] : undefined,
  };
}
