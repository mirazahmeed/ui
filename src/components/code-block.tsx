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

export function CodeBlock({ code, language = "tsx", fileName, maxHeight = "480px", collapsible = true }: CodeBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const highlightedCode = useMemo(() => {
    try {
      const grammar = Prism.languages[language] || Prism.languages.tsx || Prism.languages.javascript;
      return Prism.highlight(code, grammar, language);
    } catch {
      return code;
    }
  }, [code, language]);

  const lines = code.split("\n");

  return (
    <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-2 min-w-0">
          <FileCode2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="font-mono text-xs font-medium text-zinc-200 truncate">
            {fileName || (language === "bash" ? "Terminal" : "component.tsx")}
          </span>
          <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
            {language}
          </span>
        </div>
        <CopyButton text={code} label="Copy" className="!bg-zinc-800 !text-zinc-300 !border-zinc-700 hover:!bg-zinc-700" />
      </div>

      <div
        className="relative overflow-x-auto text-[13px] font-mono leading-relaxed"
        style={{ maxHeight: collapsible && !isExpanded ? maxHeight : "none" }}
      >
        <div className="flex">
          <div className="select-none py-4 pr-3 pl-4 text-right text-zinc-600 font-mono text-xs border-r border-zinc-800/60 bg-zinc-950 sticky left-0">
            {lines.map((_, i) => (
              <div key={i} className="leading-6 tabular-nums">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="py-4 pl-4 pr-4 flex-1 min-w-0 overflow-x-auto">
            <pre className="!bg-transparent !p-0 !m-0">
              <code className={`language-${language} leading-6 block`} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
          </div>
        </div>
        {collapsible && !isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
        )}
      </div>

      {collapsible && (
        <div className="flex items-center justify-center px-3 py-2 bg-zinc-900 border-t border-zinc-800">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer py-1 px-3 rounded-md hover:bg-zinc-800"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" /> Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" /> Expand ({lines.length} lines)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default CodeBlock;
