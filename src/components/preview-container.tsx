"use client";

import React, { useState } from "react";
import { Monitor, Smartphone, Tablet, RotateCcw, Maximize2, Minimize2 } from "lucide-react";
import { CopyButton } from "./copy-button";

export interface PreviewContainerProps {
  children: React.ReactNode;
  codeToCopy?: string;
}

export function PreviewContainer({
  children,
  codeToCopy,
}: PreviewContainerProps) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [remountKey, setRemountKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const reset = () => {
    setRemountKey((prev) => prev + 1);
  };

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
    <div className={`my-4 ${isFullscreen ? "fixed inset-0 z-50 bg-background p-6 flex flex-col" : "relative"}`}>
      {/* Top Toolbar */}
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          Preview
        </h2>

        <div className="flex items-center gap-2">
          {/* Viewport Toggles */}
          <div className="hidden sm:flex items-center bg-zinc-100 dark:bg-zinc-800/80 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700/60">
            <button
              onClick={() => setViewport("desktop")}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === "desktop"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
              title="Desktop view"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === "tablet"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
              title="Tablet view (640px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === "mobile"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-2xs"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
              title="Mobile view (380px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reset Preview */}
          <button
            onClick={reset}
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 transition-colors"
            title="Replay / Reset Component"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Copy Code */}
          {codeToCopy && (
            <div className="hidden sm:block">
              <CopyButton text={codeToCopy} label="Copy Component" />
            </div>
          )}
        </div>
      </div>

      {/* Canvas Area */}
      <div
        className={`w-full relative min-h-[440px] border border-zinc-200 dark:border-zinc-800 rounded-2xl
          bg-zinc-50/50 dark:bg-zinc-950/50
          flex items-center justify-center p-6 overflow-hidden transition-all duration-300
          ${isFullscreen ? "flex-1" : ""}`}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
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
