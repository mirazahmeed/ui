"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, Clock, Eye, CheckCircle2, RotateCw } from "lucide-react";

export type StatusType = "todo" | "in_progress" | "review" | "done";

export interface StatusConfig {
  id: StatusType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeClass: string;
  dotColor: string;
}

const statuses: StatusConfig[] = [
  {
    id: "todo",
    label: "To Do",
    icon: Circle,
    badgeClass: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
    dotColor: "bg-zinc-400",
  },
  {
    id: "in_progress",
    label: "In Progress",
    icon: Clock,
    badgeClass: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    dotColor: "bg-blue-500",
  },
  {
    id: "review",
    label: "In Review",
    icon: Eye,
    badgeClass: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    dotColor: "bg-amber-500",
  },
  {
    id: "done",
    label: "Completed",
    icon: CheckCircle2,
    badgeClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    dotColor: "bg-emerald-500",
  },
];

export function CycleStatusButton({
  initialStatus = "todo",
  onStatusChange,
}: {
  initialStatus?: StatusType;
  onStatusChange?: (status: StatusConfig) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = statuses.findIndex((s) => s.id === initialStatus);
    return idx !== -1 ? idx : 0;
  });

  const currentStatus = statuses[currentIndex];
  const Icon = currentStatus.icon;

  const cycleNext = () => {
    const nextIdx = (currentIndex + 1) % statuses.length;
    setCurrentIndex(nextIdx);
    onStatusChange?.(statuses[nextIdx]);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={cycleNext}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.02 }}
        className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-xs transition-colors cursor-pointer select-none ${currentStatus.badgeClass}`}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStatus.id}
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Icon className="w-3.5 h-3.5" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative overflow-hidden h-4 min-w-[70px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentStatus.id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute font-medium"
            >
              {currentStatus.label}
            </motion.span>
          </AnimatePresence>
        </div>

        <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dotColor} animate-pulse`} />
      </motion.button>

      <span className="text-[11px] text-zinc-400 flex items-center gap-1">
        <RotateCw className="w-3 h-3" /> Click to cycle status
      </span>
    </div>
  );
}

export default CycleStatusButton;
