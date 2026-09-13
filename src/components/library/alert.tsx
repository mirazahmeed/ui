"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  X,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  title?: string;
  description?: string;
  variant?: AlertVariant;
  actionText?: string;
  onAction?: () => void;
  dismissible?: boolean;
}

const variantStyles: Record<
  AlertVariant,
  {
    icon: React.ComponentType<{ className?: string }>;
    containerClass: string;
    iconClass: string;
  }
> = {
  info: {
    icon: Info,
    containerClass:
      "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100",
    iconClass: "text-zinc-600 dark:text-zinc-400",
  },
  success: {
    icon: CheckCircle,
    containerClass:
      "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-100",
    iconClass: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    icon: AlertTriangle,
    containerClass:
      "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/60 text-amber-950 dark:text-amber-100",
    iconClass: "text-amber-600 dark:text-amber-400",
  },
  error: {
    icon: XCircle,
    containerClass:
      "bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800/60 text-red-950 dark:text-red-100",
    iconClass: "text-red-600 dark:text-red-400",
  },
};

export function Alert({
  title = "Component copied to clipboard",
  description = "You can now paste this component directly into your Next.js or React app.",
  variant = "info",
  actionText = "Docs",
  dismissible = true,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [activeVariant, setActiveVariant] = useState<AlertVariant>(variant);

  const current = variantStyles[activeVariant];
  const Icon = current.icon;

  return (
    <div className="w-full max-w-md space-y-3">
      {/* Variant toggle switches for testing in playground */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-1.5">
          {(["info", "success", "warning", "error"] as AlertVariant[]).map((v) => (
            <button
              key={v}
              onClick={() => {
                setActiveVariant(v);
                setIsVisible(true);
              }}
              className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded transition-colors cursor-pointer ${
                activeVariant === v
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        {!isVisible && (
          <button
            onClick={() => setIsVisible(true)}
            className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            className={`flex items-start gap-3 p-3.5 rounded-xl border shadow-xs ${current.containerClass}`}
            role="alert"
          >
            <div className={`shrink-0 mt-0.5 ${current.iconClass}`}>
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0 pr-2">
              <h5 className="text-xs font-semibold leading-tight">{title}</h5>
              <p className="text-[11px] opacity-80 mt-0.5 leading-relaxed">
                {description}
              </p>
              {actionText && (
                <button
                  type="button"
                  className="mt-2 text-[11px] font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>{actionText}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {dismissible && (
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="shrink-0 p-1 rounded-md text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                aria-label="Dismiss alert"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Alert;
