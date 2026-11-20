import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QualificationGroupOptions } from "@/components/qualifications/QualificationGroupOptions";
import { getPublishedQualificationGroups } from "@/lib/qualifications/published-groups";
import { qualificationGroupPath } from "@/lib/qualifications/groups";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedQualificationGroups().map(({ group }) => ({ slug: group.slug }));
}

async function findGroup(params: Props["params"]) {
  const { slug } = await params;
  const row = getPublishedQualificationGroups().find(({ group }) => group.slug === slug);
  if (!row) notFound();
  return row;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group } = await findGroup(params);
  return {
    title: `${group.name}の過去問（${group.kind}）`,
    description: `${group.name}の過去問を解く${group.selectLabel}を選べます。`,
    alternates: { canonical: qualificationGroupPath(group.slug) },
  };
}

export default async function QualificationGroupPage({ params }: Props) {
  const { group, children } = await findGroup(params);
  return <QualificationGroupOptions name={group.name} selectLabel={group.selectLabel} options={children} backHref="/qualifications" backLabel="資格一覧" />;
}
