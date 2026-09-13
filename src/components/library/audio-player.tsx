"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Music2 } from "lucide-react";

export interface AudioPlayerProps {
  title?: string;
  artist?: string;
}

export function AudioPlayer({
  title = "Aether Dynamics",
  artist = "Monochrome Studio",
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(32);
  const [currentTime, setCurrentTime] = useState(48);
  const duration = 150; // 2:30
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          setProgress((next / duration) * 100);
          return next;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, duration]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = Math.floor(pos * duration);
    setCurrentTime(newTime);
    setProgress(pos * 100);
  };

  // 18 equalizer bars with dynamic heights
  const bars = [30, 65, 45, 90, 80, 50, 70, 95, 40, 85, 60, 75, 55, 90, 65, 40, 70, 50];

  return (
    <div className="w-full max-w-sm p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 shadow-sm shrink-0">
          <Music2 className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {title}
          </h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
            {artist}
          </p>
        </div>

        {/* Animated Sound Equalizer Waveform */}
        <div className="flex items-end gap-[2px] h-6 px-1">
          {bars.slice(0, 7).map((height, i) => (
            <div
              key={i}
              className={`w-[2.5px] rounded-full bg-zinc-800 dark:bg-zinc-200 transition-all duration-300 ${
                isPlaying ? "animate-pulse" : "opacity-30"
              }`}
              style={{
                height: isPlaying ? `${Math.max(20, (height * (i % 2 === 0 ? 1 : 0.7)))}%` : "20%",
                animationDelay: `${i * 120}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Scrubber track */}
      <div
        onClick={handleSeek}
        className="relative w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full cursor-pointer hover:h-2 transition-all duration-150 mb-2 group/seek"
      >
        <div
          className="absolute left-0 top-0 bottom-0 bg-zinc-900 dark:bg-zinc-100 rounded-full relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-zinc-900 dark:bg-zinc-100 rounded-full shadow-sm scale-0 group-hover/seek:scale-100 transition-transform" />
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-3 px-0.5">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => {
            setCurrentTime(0);
            setProgress(0);
          }}
          className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-1"
          title="Repeat"
        >
          <Repeat className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentTime((prev) => Math.max(0, prev - 10));
            }}
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors p-1"
            title="-10s"
          >
            <SkipBack className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-sm"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 ml-0.5 fill-current" />
            )}
          </button>

          <button
            onClick={() => {
              setCurrentTime((prev) => Math.min(duration, prev + 10));
            }}
            className="text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors p-1"
            title="+10s"
          >
            <SkipForward className="w-4 h-4 fill-current" />
          </button>
        </div>

        <button className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors p-1">
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default AudioPlayer;
