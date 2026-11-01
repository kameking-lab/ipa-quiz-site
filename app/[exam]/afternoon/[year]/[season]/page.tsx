import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams(): Promise<never[]> {
  return [];
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "午後問題が見つかりません", robots: { index: false } };
}

export default async function AfternoonPlayerPage() {
  // The retired editorial originals must not render as past-paper questions.
  notFound();
}
