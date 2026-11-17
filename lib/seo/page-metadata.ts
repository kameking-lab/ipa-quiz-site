import type { Metadata } from "next";
import { SITE_BASE_URL, SITE_NAME } from "./config";

/** Next replaces nested social metadata instead of merging page fields into it.
 * Keep a canonical page's identity on social cards as well as in search. */
export function withCanonicalSocialMetadata(metadata: Metadata): Metadata {
  const canonical = metadata.alternates?.canonical;
  if (typeof canonical !== "string" || typeof metadata.title !== "string") return metadata;
  const image = `${SITE_BASE_URL}/opengraph-image`;
  return {
    ...metadata,
    openGraph: {
      type: "website",
      locale: "ja_JP",
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
      ...metadata.openGraph,
      title: metadata.title,
      description: metadata.description ?? undefined,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      images: [image],
      ...metadata.twitter,
      title: metadata.title,
      description: metadata.description ?? undefined,
    },
  };
}
