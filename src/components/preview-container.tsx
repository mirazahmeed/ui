"use client";

import React, { useState } from "react";
import { Monitor, Smartphone, Tablet, RotateCcw, Maximize2, Minimize2 } from "lucide-react";
import { CopyButton } from "./copy-button";

export interface PreviewContainerProps {
  children: React.ReactNode;
  codeToCopy?: string;
  minHeight?: string;
}

export function PreviewContainer({
  children,
  codeToCopy,
  minHeight = "min-h-[500px] sm:min-h-[540px]",
}: PreviewContainerProps) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [remountKey, setRemountKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getViewportWidth = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-[380px]";
      case "tablet":
        return "max-w-[640px]";
      default:
        return "w-full";
    }
  };

  return (
    <div className={isFullscreen ? "fixed inset-0 z-50 bg-background p-4 sm:p-6 flex flex-col" : "relative"}>
      <div className="flex items-center justify-between gap-3 pb-3">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">Preview</h2>

        <div className="flex items-center gap-1.5">
          <div className="hidden sm:flex items-center p-1 rounded-lg bg-muted border border-border">
            {([
              ["desktop", Monitor, "Desktop"],
              ["tablet", Tablet, "Tablet 640px"],
              ["mobile", Smartphone, "Mobile 380px"],
            ] as const).map(([key, Icon, label]) => (
              <button
                key={key}
                onClick={() => setViewport(key)}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewport === key
                    ? "bg-card text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title={label}
                aria-label={label}
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>

          <button
            onClick={() => setRemountKey((k) => k + 1)}
            className="p-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:bg-card transition-colors cursor-pointer"
            title="Reset preview"
            aria-label="Reset preview"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:bg-card transition-colors cursor-pointer"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {codeToCopy && (
            <div className="hidden sm:block ml-1">
              <CopyButton text={codeToCopy} label="Copy" />
            </div>
          )}
        </div>
      </div>

      <div
        className={`w-full relative ${minHeight} border border-border rounded-xl bg-muted/20 dark:bg-zinc-900/30 flex items-center justify-center p-6 sm:p-8 overflow-hidden transition-all duration-300 ${
          isFullscreen ? "flex-1 rounded-xl" : ""
        }`}
      >
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />

        <div
          key={remountKey}
          className={`relative z-10 w-full ${getViewportWidth()} flex items-center justify-center transition-all duration-300`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default PreviewContainer;
