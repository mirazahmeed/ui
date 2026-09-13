"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Moon, Sun } from "lucide-react";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  variant?: "default" | "theme";
}

export function Switch({
  defaultChecked = false,
  checked: controlledChecked,
  onCheckedChange,
  label = "Hardware Acceleration",
  description = "Utilize discrete GPU rendering passes for fluid animations.",
  disabled = false,
  variant = "default",
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
      {(label || description) && (
        <div className="flex flex-col cursor-pointer" onClick={toggle}>
          {label && (
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
              {description}
            </span>
          )}
        </div>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${
            isChecked
              ? "bg-zinc-900 dark:bg-zinc-100"
              : "bg-zinc-200 dark:bg-zinc-800"
          }`}
      >
        <motion.span
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className={`pointer-events-none flex items-center justify-center h-5 w-5 rounded-full shadow-sm transform
            ${
              isChecked
                ? "translate-x-5 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white"
                : "translate-x-0 bg-white text-zinc-400 dark:bg-zinc-700 dark:text-zinc-300"
            }`}
        >
          {variant === "theme" ? (
            isChecked ? (
              <Moon className="w-3 h-3" />
            ) : (
              <Sun className="w-3 h-3" />
            )
          ) : isChecked ? (
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          ) : null}
        </motion.span>
      </button>
    </div>
  );
}

export default Switch;
