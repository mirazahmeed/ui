# mirazahmed/ui.

<div align="center">

  <p align="center">
    <strong>A collection of beautiful, animated, and responsive design components built with React, Tailwind CSS, and Framer Motion.</strong>
  </p>

  <p align="center">
    <a href="https://ui.mirazahmed.com/" target="_blank"><strong>Explore Live Showcase →</strong></a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-12+-ff0055?style=flat-square&logo=framer" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/License-MIT-emerald?style=flat-square" alt="License" />
  </p>
</div>

---

## ✦ Overview

**mirazahmed/ui** is an interactive component registry and preview gallery. Instead of installing heavy, opinionated UI packages with hidden internals, browse live animated components, test responsive viewports in real time, and copy clean, accessible, type-safe code straight into your project.

- 🌐 **Live Demo:** [mirazahmed-ui.vercel.app](https://mirazahmed-ui.vercel.app)
- 🧑‍💻 **Author:** [Miraz Ahmed](https://github.com/mirazahmeed)

---

## ✨ Features

- **Fluid Animations:** Micro-interactions and fluid layout transitions powered by **Framer Motion** spring physics.
- **Interactive Component Playground:**
  - **Responsive Viewport Toggles:** Switch instantly between Desktop, Tablet (640px), and Mobile (380px) frames.
  - **Fullscreen Preview:** Expand components to full screen to inspect details and behavior.
  - **Reset State:** One-click preview reload to test initial animations and mount transitions.
- **Copy-Paste Workflow:** One-click copy for component source code, installation command, and usage snippets.
- **Complete Documentation:** Each component includes a full props interface table, TypeScript type definitions, and realistic usage examples.
- **Command Palette (`⌘K`):** Global fuzzy search across all components and categories.
- **Dark & Light Modes:** Built-in theme switcher with system preference detection and smooth transitions.
- **Modern Stack:** Built on **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

---

## 🧩 Component Library

The library includes 14+ handcrafted components organized into 5 categories:

| Category | Component | Description | Dependencies |
| :--- | :--- | :--- | :--- |
| **Navigation** | [Stacking Navbar](https://mirazahmed-ui.vercel.app/components/stacking-navbar) | Pill navigation bar that fans out horizontally on hover with spring physics | `framer-motion`, `lucide-react` |
| **Navigation** | [Dropdown Menu](https://mirazahmed-ui.vercel.app/components/dropdown-menu) | Animated dropdown menu with nested groups, icons, and keyboard shortcuts | `framer-motion`, `lucide-react` |
| **Navigation** | [Animated Tabs](https://mirazahmed-ui.vercel.app/components/animated-tabs) | Sliding pill active tab indicator with Framer Motion layout springs | `framer-motion` |
| **Navigation** | [Floating Action Menu](https://mirazahmed-ui.vercel.app/components/floating-action-menu) | Expandable speed-dial FAB button fanning out into secondary actions | `framer-motion`, `lucide-react` |
| **Inputs** | [Input With Tags](https://mirazahmed-ui.vercel.app/components/input-with-tags) | Tag chip input with badge removal, keyboard shortcuts, and limit validation | `framer-motion`, `lucide-react` |
| **Inputs** | [Cycle Status Button](https://mirazahmed-ui.vercel.app/components/cycle-status-button) | Button that cycles through workflow statuses with icon transitions | `framer-motion`, `lucide-react` |
| **Inputs** | [Switch](https://mirazahmed-ui.vercel.app/components/switch) | Accessible toggle switch with spring thumb movement and icon indicators | `framer-motion`, `lucide-react` |
| **Surfaces** | [Stacked Cards](https://mirazahmed-ui.vercel.app/components/stacked-cards) | Overlapping card deck with interactive hover peel and spring physics | `framer-motion`, `lucide-react` |
| **Surfaces** | [Avatar Group](https://mirazahmed-ui.vercel.app/components/avatar-group) | Overlapping avatar stack with hover expand and overflow indicator | `framer-motion` |
| **Media** | [Video Player](https://mirazahmed-ui.vercel.app/components/video-player) | Custom video player with custom scrubber, play/pause, volume, and fullscreen | `lucide-react` |
| **Media** | [Audio Player](https://mirazahmed-ui.vercel.app/components/audio-player) | Compact audio player with progress track, duration timers, and volume slider | `lucide-react` |
| **Feedback** | [Notification Popover](https://mirazahmed-ui.vercel.app/components/notification-popover) | Animated notification bell with unread badge and rich notification list | `framer-motion`, `lucide-react` |
| **Feedback** | [Alert](https://mirazahmed-ui.vercel.app/components/alert) | Dismissible contextual alerts (info, success, warning, destructive) | `framer-motion`, `lucide-react` |
| **Feedback** | [Word Loader](https://mirazahmed-ui.vercel.app/components/word-loader) | Rotating status text loader with vertical slide and blur-in transitions | `framer-motion` |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Server Components)
- **Library:** [React 19](https://react.dev)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/postcss`)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev)
- **Code Highlighting:** [PrismJS](https://prismjs.com)
- **Typography:** Geist & Geist Mono (`next/font`)
- **Language:** [TypeScript](https://www.typescriptlang.org)

---

## 🚀 How to Use Components

### 1. Install dependencies

Most components use `framer-motion`, `lucide-react`, and utility helpers. Install them in your project:

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

### 2. Add the `cn` helper

In your project, add `lib/utils.ts` (if you don't already have it):

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 3. Copy & paste any component

1. Browse the component gallery on [mirazahmed-ui.vercel.app](https://mirazahmed-ui.vercel.app) (or under `src/components/library/`).
2. Click **Copy** on the component code.
3. Paste directly into your project (e.g. `components/ui/stacking-navbar.tsx`).

---

## 📁 Project Structure

```text
ui/
├── public/                 # Static assets (favicons, logos, media previews)
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout (header, sidebar, font variables, theme init)
│   │   ├── page.tsx        # Landing / default component view
│   │   ├── globals.css     # Tailwind v4 theme variables and base styles
│   │   └── components/     # Dynamic route for [slug] component pages
│   ├── components/
│   │   ├── code-block.tsx          # Syntax highlighted code viewer with copy
│   │   ├── component-sidebar.tsx   # Sidebar categorizing all components
│   │   ├── component-view.tsx      # Component documentation and preview layout
│   │   ├── copy-button.tsx         # Clipboard copy button with toast feedback
│   │   ├── mobile-nav.tsx          # Mobile navigation sheet drawer
│   │   ├── preview-container.tsx   # Responsive viewport container with reset
│   │   ├── site-header.tsx         # Header with ⌘K search & theme toggle
│   │   └── library/                # Component implementations
│   │       ├── alert.tsx
│   │       ├── animated-tabs.tsx
│   │       ├── audio-player.tsx
│   │       ├── avatar-group.tsx
│   │       ├── cycle-status-button.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── floating-action-menu.tsx
│   │       ├── input-with-tags.tsx
│   │       ├── notification-popover.tsx
│   │       ├── stacked-cards.tsx
│   │       ├── stacking-navbar.tsx
│   │       ├── switch.tsx
│   │       ├── video-player.tsx
│   │       └── word-loader.tsx
│   ├── data/
│   │   └── components.ts   # Component catalog metadata, props, source & usage
│   └── lib/
│       └── utils.ts        # cn helper function
├── package.json
└── tsconfig.json
```

---

## 🤝 Contributing

Contributions, component additions, and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/new-component`)
3. Add your component to `src/components/library/` and document it in `src/data/components.ts`
4. Commit your changes (`git commit -m 'feat: add new-component'`)
5. Push to the branch (`git push origin feat/new-component`)
6. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Crafted by <a href="https://github.com/mirazahmeed">Miraz Ahmed</a>
</div>
