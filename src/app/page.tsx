import { getComponentBySlug } from "@/data/components";
import { ComponentView } from "@/components/component-view";
import { notFound } from "next/navigation";

export default function HomePage() {
  const component = getComponentBySlug("stacking-navbar");

  if (!component) {
    notFound();
  }

  return <ComponentView component={component} />;
}
