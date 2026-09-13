import { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPONENTS, getComponentBySlug } from "@/data/components";
import { ComponentView } from "@/components/component-view";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return COMPONENTS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComponentBySlug(slug);

  if (!comp) {
    return {
      title: "Component Not Found",
    };
  }

  return {
    title: comp.title,
    description: comp.description,
    openGraph: {
      title: `${comp.title} - React Component | craft/ui`,
      description: comp.description,
      type: "article",
    },
  };
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const comp = getComponentBySlug(slug);

  if (!comp) {
    notFound();
  }

  return <ComponentView component={comp} />;
}
