"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface UserAvatar {
  id: string;
  name: string;
  role: string;
  src?: string;
  initials: string;
}

const defaultAvatars: UserAvatar[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Staff Engineer",
    initials: "SC",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Marcus Vance",
    role: "Design Lead",
    initials: "MV",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    name: "Elena Rostova",
    role: "Interaction Designer",
    initials: "ER",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    name: "Devon Reed",
    role: "Product Architect",
    initials: "DR",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    name: "Aria Sterling",
    role: "Frontend Specialist",
    initials: "AS",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80",
  },
];

export function AvatarGroup({
  avatars = defaultAvatars,
  max = 4,
}: {
  avatars?: UserAvatar[];
  max?: number;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center -space-x-3 p-2">
        {visibleAvatars.map((user, index) => {
          const isHovered = hoveredId === user.id;

          return (
            <div
              key={user.id}
              className="relative select-none"
              onMouseEnter={() => setHoveredId(user.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ zIndex: isHovered ? 50 : index }}
            >
              <motion.div
                animate={{
                  y: isHovered ? -4 : 0,
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                className="w-10 h-10 rounded-full ring-2 ring-white dark:ring-zinc-950 overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center cursor-pointer shadow-md"
              >
                {user.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.src}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {user.initials}
                  </span>
                )}
              </motion.div>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-center pointer-events-none shadow-xl whitespace-nowrap z-50"
                  >
                    <p className="text-[11px] font-semibold">{user.name}</p>
                    <p className="text-[9px] text-zinc-400 dark:text-zinc-600">
                      {user.role}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {remainingCount > 0 && (
          <div
            className="relative z-10 w-10 h-10 rounded-full ring-2 ring-white dark:ring-zinc-950 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs font-semibold shadow-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            title={`${remainingCount} more contributors`}
          >
            +{remainingCount}
          </div>
        )}
      </div>

      <p className="text-xs text-zinc-400">Hover avatar to view profile card</p>
    </div>
  );
}

export default AvatarGroup;
