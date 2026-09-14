"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
  showText?: boolean;
}

export function CopyButton({ text, className = "", label = "Copy", showText = true }: CopyButtonProps) {
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
      className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer select-none border shadow-xs
        ${
          copied
            ? "bg-emerald-500 text-white border-emerald-600 dark:bg-emerald-600 dark:border-emerald-700"
            : "bg-card hover:bg-muted text-foreground border-border"
        } active:scale-[0.98] ${className}`}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          {showText && <span>Copied</span>}
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
          {showText && <span>{label}</span>}
        </>
      )}
    </button>
  );
}

export default CopyButton;
