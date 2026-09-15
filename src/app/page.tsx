import type { Metadata } from "next";
import { getComponentBySlug } from "@/data/components";
import { ComponentView } from "@/components/component-view";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Stacking Navbar - React Component | MirazAhmed UI",
  description:
    "a simple stacking navbar component made with framer motion and tailwind css.",
  openGraph: {
    title: "Stacking Navbar - React Component | MirazAhmed UI",
    description:
      "a simple stacking navbar component made with framer motion and tailwind css.",
  },
};


export default function HomePage() {
  const component = getComponentBySlug("stacking-navbar");

  if (!component) {
    notFound();
  }

  return <ComponentView component={component} />;
}
