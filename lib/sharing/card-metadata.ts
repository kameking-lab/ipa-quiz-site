import type { Metadata } from "next";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { CARD_LABELS, cardImagePath, cardQualification, cardSharePath, parseStudyCard } from "./card";
import { shareLink } from "./links";

export type ShareSearchParams = Record<string, string | string[] | undefined>;

export function studyCardDetails(exam: string, query: ShareSearchParams) {
  const params = new URLSearchParams();
  for (const key of ["card", "mastered", "total", "streak"]) {
    const value = query[key];
    if (typeof value !== "string") return null;
    params.set(key, value);
  }
  const card = parseStudyCard(params);
  const qualification = cardQualification(exam);
  return card && qualification ? { card, qualification } : null;
}

export function studyCardMetadata(exam: string, details: NonNullable<ReturnType<typeof studyCardDetails>>): Metadata {
  const { card, qualification } = details;
  const title = `${qualification.name}｜${CARD_LABELS[card.kind]}`;
  const description = `正解済み ${card.mastered}/${card.total}問・連続学習 ${card.streak}日`;
  const image = SITE_BASE_URL + cardImagePath(exam, card);
  return {
    title, description,
    alternates: { canonical: qualification.path },
    robots: { index: false, follow: true },
    openGraph: { type: "website", locale: "ja_JP", siteName: SITE_NAME, title, description,
      url: shareLink(cardSharePath(exam, card), "card"),
      images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
