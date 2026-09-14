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
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium flex-wrap">
          <li>
            <Link href="/" className="hover:text-foreground transition-colors">
              Components
            </Link>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          </li>
          <li>
            <span className="text-muted-foreground">{component.category}</span>
          </li>
          <li>
            <ChevronRight className="w-3.5 h-3.5 opacity-40" />
          </li>
          <li>
            <span className="text-foreground font-semibold">{component.title}</span>
          </li>
        </ol>
      </nav>

      <div className="space-y-3 mb-8">
        <h1 className="text-[28px] sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
          {component.title}
        </h1>
        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
          {component.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {component.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8 p-3.5 rounded-xl bg-muted/50 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center shrink-0">
            <Package className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <div className="text-xs min-w-0">
            <span className="font-semibold text-foreground mr-2">Dependencies</span>
            <span className="font-mono text-muted-foreground break-all">{component.dependencies.join(", ")}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <code className="text-xs font-mono text-foreground bg-card px-3 py-1.5 rounded-lg border border-border select-all">
            {component.installCommand}
          </code>
          <CopyButton text={component.installCommand} showText={false} />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <PreviewContainer codeToCopy={component.code}>
            {renderComponentPreview(component.slug)}
          </PreviewContainer>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Source Code
            </h2>
          </div>
          <CodeBlock code={component.code} fileName={component.fileName} language="tsx" />
        </section>

        {component.usage && (
          <section className="space-y-3">
            <h2 className="text-base font-semibold tracking-tight text-foreground">Usage</h2>
            <CodeBlock code={component.usage} fileName="usage.tsx" language="tsx" collapsible={false} />
          </section>
        )}

        {component.props && component.props.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base font-semibold tracking-tight text-foreground">Props</h2>
            <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/60 border-b border-border">
                    <tr className="text-muted-foreground font-medium">
                      <th className="px-4 py-3 whitespace-nowrap">Prop</th>
                      <th className="px-4 py-3 whitespace-nowrap">Type</th>
                      <th className="px-4 py-3 whitespace-nowrap">Required</th>
                      <th className="px-4 py-3 whitespace-nowrap">Default</th>
                      <th className="px-4 py-3 min-w-[200px]">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {component.props.map((prop) => (
                      <tr key={prop.name} className="hover:bg-muted/40 transition-colors">
                        <td className="px-4 py-3 font-mono font-medium text-foreground whitespace-nowrap">
                          {prop.name}
                        </td>
                        <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">
                          {prop.type}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${
                              prop.required
                                ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                                : "bg-muted text-muted-foreground border-border"
                            }`}
                          >
                            {prop.required ? "Required" : "Optional"}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">
                          {prop.defaultVal || "—"}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground leading-relaxed">
                          {prop.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {component.types && (
          <section className="space-y-3">
            <h2 className="text-base font-semibold tracking-tight text-foreground">Types</h2>
            <CodeBlock code={component.types} fileName="types.ts" language="tsx" collapsible={false} />
          </section>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 pt-8 border-t border-border">
        {prev ? (
          <Link
            href={`/components/${prev.slug}`}
            className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-border-strong transition-all"
          >
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 group-hover:text-foreground transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" /> Previous
            </span>
            <span className="text-sm font-semibold text-foreground mt-1">{prev.title}</span>
            <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{prev.description}</span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/components/${next.slug}`}
            className="group flex flex-col items-end text-right p-4 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-border-strong transition-all"
          >
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 group-hover:text-foreground transition-colors">
              Next <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="text-sm font-semibold text-foreground mt-1">{next.title}</span>
            <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{next.description}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default ComponentView;
