import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { info } from "../../capabilities";
import { solutionSlugs } from "../../routes";
import { slugToId } from "../data";
import Content from "../content";

export function generateStaticParams() {
  return Object.values(solutionSlugs).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const id = slugToId[(await params).slug];
  if (!id) return {};
  return { title: `${info[id].name} | botLane`, description: info[id].lede };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const id = slugToId[(await params).slug];
  if (!id) notFound();
  return <Content id={id} />;
}
