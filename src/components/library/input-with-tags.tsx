"use client";

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
              className={`inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-1 rounded-md text-xs font-medium
                border transition-colors ${
                  duplicateWarning?.toLowerCase() === tag.toLowerCase()
                    ? "bg-red-100 text-red-700 border-red-300 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800"
                    : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 shadow-2xs"
                }`}
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded p-0.5 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                aria-label={`Remove tag ${tag}`}
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
}

export default InputWithTags;
