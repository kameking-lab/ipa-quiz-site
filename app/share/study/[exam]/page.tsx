import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CARD_LABELS, cardImagePath } from "@/lib/sharing/card";
import { studyCardDetails, studyCardMetadata, type ShareSearchParams } from "@/lib/sharing/card-metadata";

type Props = { params: Promise<{ exam: string }>; searchParams: Promise<ShareSearchParams> };

async function readCard({ params, searchParams }: Props) {
  const { exam } = await params;
  const details = studyCardDetails(exam, await searchParams);
  if (!details) notFound();
  return { exam, details };
}

export async function generateMetadata(props: Props) {
  const { exam, details } = await readCard(props);
  return studyCardMetadata(exam, details);
}

export default async function StudyCardPage(props: Props) {
  const { exam, details: { card, qualification } } = await readCard(props);
  return <main className="mx-auto max-w-2xl space-y-6 px-4 py-12">
    <h1 className="text-2xl font-bold">{qualification.name}｜{CARD_LABELS[card.kind]}</h1>
    <Image unoptimized src={cardImagePath(exam, card)} width={1200} height={630} className="h-auto w-full rounded-xl"
      alt={`正解済み ${card.mastered}/${card.total}問・連続学習 ${card.streak}日`} />
    <Link href={qualification.path} className="inline-block rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground">
      {qualification.name}の過去問へ
    </Link>
  </main>;
}
