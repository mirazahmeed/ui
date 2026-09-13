"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";

export interface WordLoaderProps {
  prefix?: string;
  words?: string[];
  suffix?: string;
  interval?: number;
}

const defaultWords = [
  "compiling components",
  "synthesizing springs",
  "optimizing layout",
  "injecting tailwind tokens",
  "polishing micro-interactions",
  "shipping production build",
];

export function WordLoader({
  prefix = "Crafting",
  words = defaultWords,
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
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm">
        <Terminal className="w-4 h-4 text-zinc-400 shrink-0" />
        <span className="font-medium text-zinc-500 dark:text-zinc-400">
          {prefix}
        </span>

        {/* Word tumbling container */}
        <div className="relative h-6 min-w-[200px] overflow-hidden flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 28,
              }}
              className="absolute font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        <span className="font-medium text-zinc-400">{suffix}</span>
      </div>

      <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
        <Sparkles className="w-3 h-3" />
        Rotating every {interval / 1000}s with spring blur tumble
      </p>
    </div>
  );
}

export default WordLoader;
