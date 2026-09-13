"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, X, GitPullRequest, MessageSquare, Star } from "lucide-react";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New Pull Request merged",
    description: "feat: add spring physics to StackingNavbar item animation",
    time: "4m ago",
    read: false,
    icon: GitPullRequest,
  },
  {
    id: "2",
    title: "Comment on Stacked Cards",
    description: "Alex commented: 'The 3D fan angle feels super snappy!'",
    time: "28m ago",
    read: false,
    icon: MessageSquare,
  },
  {
    id: "3",
    title: "Starred your component",
    description: "Devon starred DropdownMenu on GitHub",
    time: "2h ago",
    read: true,
    icon: Star,
  },
];

export function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
        aria-label="Open notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-900" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-4 z-50"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 transition-colors"
                >
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </div>

            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              <AnimatePresence>
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-zinc-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.15 } }}
                        className={`group relative flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                          item.read
                            ? "bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                            : "bg-zinc-50 dark:bg-zinc-800/60"
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                              {item.title}
                            </p>
                            <span className="text-[10px] text-zinc-400 shrink-0">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() => dismiss(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 absolute right-2 top-2"
                          aria-label="Dismiss"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationPopover;
