"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, Package } from "lucide-react";
import { ComponentItem, getAdjacentComponents } from "@/data/components";
import { PreviewContainer } from "./preview-container";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { renderComponentPreview } from "./library-preview-map";

export function ComponentView({ component }: { component: ComponentItem }) {
  const { prev, next } = getAdjacentComponents(component.slug);

  return (
    <div className="w-full pt-6 pb-16">
      {/* 1. Subtle Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="pb-4">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <li>
            <Link
              href="/"
              className="hover:text-foreground transition-colors"
            >
              Components
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </li>
          <li>
            <span>{component.category}</span>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </li>
          <li>
            <span className="text-foreground font-semibold">
              {component.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* 2. Component Title & Description */}
      <div className="space-y-2.5 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {component.title}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl">
          {component.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {component.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Transparent Dependencies */}
      <div className="mb-6 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-zinc-500 shrink-0" />
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-1.5">
              Dependencies:
            </span>
            <span className="font-mono">{component.dependencies.join(", ")}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <code className="text-xs font-mono text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-700 select-all">
            {component.installCommand}
          </code>
          <CopyButton text={component.installCommand} showText={false} />
        </div>
      </div>

      {/* 4. Live Interactive Preview */}
      <div className="space-y-3">
        <PreviewContainer codeToCopy={component.code}>
          {renderComponentPreview(component.slug)}
        </PreviewContainer>
      </div>

      {/* 5. Source Code Section */}
      <div className="mt-10 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Code
          </h2>
        </div>
        <CodeBlock
          code={component.code}
          fileName={component.fileName}
          language="tsx"
        />
      </div>

      {/* 6. Usage Snippet */}
      {component.usage && (
        <div className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Usage
          </h2>
          <CodeBlock
            code={component.usage}
            fileName="usage.tsx"
            language="tsx"
            collapsible={false}
          />
        </div>
      )}

      {/* 7. Props Table (Only if component has props) */}
      {component.props && component.props.length > 0 && (
        <div className="mt-10 space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Props
          </h2>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">
                <tr>
                  <th className="p-3">Prop</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Required</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {component.props.map((prop) => (
                  <tr
                    key={prop.name}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 transition-colors"
                  >
                    <td className="p-3 font-mono font-medium text-zinc-900 dark:text-zinc-100">
                      {prop.name}
                    </td>
                    <td className="p-3 font-mono text-zinc-500 dark:text-zinc-400">
                      {prop.type}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                          prop.required
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {prop.required ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-zinc-500 dark:text-zinc-400">
                      {prop.defaultVal}
                    </td>
                    <td className="p-3 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. TypeScript Types (Only if provided) */}
      {component.types && (
        <div className="mt-8 space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Types
          </h2>
          <CodeBlock
            code={component.types}
            fileName="types.ts"
            language="tsx"
            collapsible={false}
          />
        </div>
      )}

      {/* 9. Previous & Next Component Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
        {prev ? (
          <Link
            href={`/components/${prev.slug}`}
            className="group flex flex-col p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
          >
            <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1 group-hover:-translate-x-0.5 transition-transform">
              <ArrowLeft className="w-3.5 h-3.5" /> Previous
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/components/${next.slug}`}
            className="group flex flex-col items-end p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900/50 text-right"
          >
            <span className="text-[11px] font-medium text-zinc-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              Next <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-1">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default ComponentView;
