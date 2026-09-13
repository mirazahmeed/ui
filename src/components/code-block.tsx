"use client";

import React, { useState, useMemo } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import { CopyButton } from "./copy-button";
import { ChevronDown, ChevronUp, FileCode2 } from "lucide-react";

export interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
  maxHeight?: string;
  collapsible?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  fileName,
  maxHeight = "500px",
  collapsible = true,
}: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const highlightedCode = useMemo(() => {
    try {
      const grammar =
        Prism.languages[language] ||
        Prism.languages.tsx ||
        Prism.languages.javascript;
      return Prism.highlight(code, grammar, language);
    } catch {
      return code;
    }
  }, [code, language]);

  const lines = code.split("\n");

  return (
    <div className="relative my-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden shadow-sm">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800/80 text-xs">
        <div className="flex items-center gap-2 text-zinc-400">
          <FileCode2 className="w-4 h-4 text-zinc-400" />
          <span className="font-mono font-medium text-zinc-300">
            {fileName || (language === "bash" ? "Terminal" : "component.tsx")}
          </span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CopyButton text={code} label="Copy" />
        </div>
      </div>

      {/* Code Container */}
      <div
        className="relative overflow-x-auto text-[13px] font-mono leading-relaxed transition-all duration-300"
        style={{
          maxHeight: collapsible && !isExpanded ? maxHeight : "none",
        }}
      >
        <div className="flex p-4">
          {/* Line Numbers */}
          <div
            className="select-none pr-4 text-right text-zinc-600 font-mono text-xs border-r border-zinc-800/60"
            aria-hidden="true"
          >
            {lines.map((_, i) => (
              <div key={i} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Highlighted Code */}
          <div className="pl-4 flex-1 overflow-x-auto">
            <pre className="!bg-transparent !p-0 !m-0 font-mono">
              <code
                className={`language-${language} leading-6`}
                dangerouslySetInnerHTML={{
                  __html: highlightedCode,
                }}
              />
            </pre>
          </div>
        </div>

        {/* Collapsed gradient overlay */}
        {collapsible && !isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Expand / Collapse Button */}
      {collapsible && (
        <div className="flex items-center justify-center p-2 bg-zinc-900/50 border-t border-zinc-800/80">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 font-medium transition-colors cursor-pointer py-1 px-3 rounded hover:bg-zinc-800/60"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" /> Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" /> Expand source code ({lines.length} lines)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default CodeBlock;
