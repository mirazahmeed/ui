"use client";

import React from "react";
import StackingNavbar from "./library/stacking-navbar";
import DropdownMenu from "./library/dropdown-menu";
import InputWithTags from "./library/input-with-tags";
import StackedCards from "./library/stacked-cards";
import AnimatedTabs from "./library/animated-tabs";
import VideoPlayer from "./library/video-player";
import AudioPlayer from "./library/audio-player";
import CycleStatusButton from "./library/cycle-status-button";
import FloatingActionMenu from "./library/floating-action-menu";
import NotificationPopover from "./library/notification-popover";
import Switch from "./library/switch";
import Alert from "./library/alert";
import AvatarGroup from "./library/avatar-group";
import WordLoader from "./library/word-loader";

export function renderComponentPreview(slug: string) {
  switch (slug) {
    case "stacking-navbar":
      return <StackingNavbar />;
    case "dropdown-menu":
      return <DropdownMenu />;
    case "input-with-tags":
      return <InputWithTags />;
    case "stacked-cards":
      return <StackedCards />;
    case "animated-tabs":
      return <AnimatedTabs />;
    case "video-player":
      return <VideoPlayer src="/service-total-revamp.webm" />;
    case "audio-player":
      return <AudioPlayer />;
    case "cycle-status-button":
      return <CycleStatusButton />;
    case "floating-action-menu":
      return <FloatingActionMenu />;
    case "notification-popover":
      return <NotificationPopover />;
    case "switch":
      return <Switch />;
    case "alert":
      return <Alert />;
    case "avatar-group":
      return <AvatarGroup />;
    case "word-loader":
      return <WordLoader />;
    default:
      return (
        <div className="text-sm text-zinc-400">
          Component preview not found.
        </div>
      );
  }
}
