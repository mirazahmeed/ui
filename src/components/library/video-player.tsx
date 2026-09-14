"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
} from "lucide-react";

export interface VideoPlayerProps {
  src?: string;
  poster?: string;
  autoPlay?: boolean;
}

export function VideoPlayer({
  src = "/service-total-revamp.webm",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / dur) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
    setProgress(pos * 100);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleMouseMove = () => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 2500);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
      className="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-200 dark:border-zinc-800 shadow-xl group"
    >
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Center Play indicator overlay when paused */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-opacity duration-300"
        >
          <div className="w-14 h-14 rounded-full bg-white/90 dark:bg-zinc-900/90 flex items-center justify-center text-zinc-900 dark:text-white shadow-2xl hover:scale-105 transition-transform">
            <Play className="w-6 h-6 ml-0.5 fill-current" />
          </div>
        </div>
      )}

      {/* Floating Bottom Minimal Controls */}
      <div
        className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          isControlsVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Progress scrub bar */}
        <div
          onClick={handleSeek}
          className="relative w-full h-1.5 bg-white/20 hover:h-2 rounded-full cursor-pointer transition-all duration-150 mb-3 group/track"
        >
          <div
            className="absolute left-0 top-0 bottom-0 bg-white rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/track:scale-100 transition-transform" />
          </div>
        </div>

        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </button>
            <button
              onClick={handleRestart}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
              title="Restart"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleMute}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <span className="font-mono text-[11px] text-zinc-300">
              {formatTime(currentTime)} / {formatTime(duration || 0)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (videoRef.current) {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    videoRef.current.parentElement?.requestFullscreen();
                  }
                }
              }}
              className="hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
