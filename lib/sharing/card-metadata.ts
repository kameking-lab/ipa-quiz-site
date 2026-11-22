import type { Metadata } from "next";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { CARD_LABELS, cardImagePath, cardQualification, cardSharePath, parseStudyCard } from "./card";
import { shareLink } from "./links";

export type ShareSearchParams = Record<string, string | string[] | undefined>;

export function withStudyCardMetadata(metadata: Metadata, exam: string, query?: ShareSearchParams): Metadata {
  if (query?.utm_source !== "share" || query.utm_medium !== "card" || typeof query.card !== "string") return metadata;
  const params = new URLSearchParams();
  for (const key of ["card", "mastered", "total", "streak"]) {
    const value = query[key];
    if (typeof value !== "string") return metadata;
    params.set(key, value);
  }
  const card = parseStudyCard(params);
  const qualification = cardQualification(exam);
  if (!card || !qualification) return metadata;
  const title = `${qualification.name}｜${CARD_LABELS[card.kind]}`;
  const description = `正解済み ${card.mastered}/${card.total}問・連続学習 ${card.streak}日`;
  const image = SITE_BASE_URL + cardImagePath(exam, card);
  return {
    ...metadata,
    openGraph: { type: "website", locale: "ja_JP", siteName: SITE_NAME, title, description,
      url: shareLink(cardSharePath(qualification.path, card), "card"),
      images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
