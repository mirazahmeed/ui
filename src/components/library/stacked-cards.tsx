"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const defaultCards: CardItem[] = [
  {
    id: "1",
    title: "Instant Integration",
    subtitle: "Zero Configuration Required",
    description:
      "Drop directly into your codebase with self-contained styles and standard dependencies.",
    badge: "Fast",
    icon: Zap,
    color: "from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200",
  },
  {
    id: "2",
    title: "Fluid Micro-Interactions",
    subtitle: "Physics-Driven Spring Motion",
    description:
      "Tuned springs and layout animations using Framer Motion that respond naturally to user gestures.",
    badge: "Smooth",
    icon: Sparkles,
    color: "from-zinc-800 to-zinc-700 dark:from-zinc-200 dark:to-zinc-300",
  },
  {
    id: "3",
    title: "Production Ready",
    subtitle: "Type-Safe & Accessible",
    description:
      "Built with full TypeScript contracts, keyboard accessibility, and clean semantic markup.",
    badge: "Solid",
    icon: ShieldCheck,
    color: "from-zinc-700 to-zinc-600 dark:from-zinc-300 dark:to-zinc-400",
  },
];

export function StackedCards() {
  const [cards, setCards] = useState<CardItem[]>(defaultCards);
  const [isHovered, setIsHovered] = useState(false);

  const cycleCards = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-4">
      <div
        className="relative w-72 sm:w-80 h-48 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={cycleCards}
      >
        {cards.map((card, index) => {
          const Icon = card.icon;
          // Fan calculation based on position
          const yOffset = index * 12;
          const scale = 1 - index * 0.05;
          const rotation = isHovered ? (index - 1) * 6 : 0;
          const xOffset = isHovered ? (index - 1) * 20 : 0;

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={{
                y: yOffset,
                x: xOffset,
                scale: scale,
                rotateZ: rotation,
                zIndex: cards.length - index,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
              }}
              className="absolute inset-0 rounded-2xl p-5 border border-zinc-200/80 dark:border-zinc-800/80
                bg-white dark:bg-zinc-900 shadow-lg shadow-black/5 dark:shadow-black/20
                flex flex-col justify-between select-none"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-zinc-100">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {card.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                  {card.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <span>Card {index + 1} of {cards.length}</span>
                <span className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
                  Click to stack <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-zinc-400 flex items-center gap-1.5">
        <Layers className="w-3.5 h-3.5" />
        Hover to fan out · Click to cycle stack
      </p>
    </div>
  );
}

export default StackedCards;
