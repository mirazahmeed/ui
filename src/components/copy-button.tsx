"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
  showText?: boolean;
}

export function CopyButton({
  text,
  className = "",
  label = "Copy",
  showText = true,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer select-none
        bg-zinc-100 hover:bg-zinc-200 text-zinc-700
        dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300
        border border-zinc-200 dark:border-zinc-700/60
        active:scale-95 ${className}`}
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[2.5]" />
          {showText && (
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              Copied ✓
            </span>
          )}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          {showText && <span>{label}</span>}
        </>
      )}
    </button>
  );
}

export default CopyButton;
