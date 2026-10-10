import raw from "@/data/questions/fp1/applied-2026-may-extension.json";
import septemberRaw from "@/data/questions/fp1/applied-2026-september-q61-q65.json";
import { parseFp1AppliedExtension, publishableExtensionQuestions } from "./applied-extension";
import { parseFp1SeptemberAppliedParts } from "./september-applied-parts";
const extension = parseFp1AppliedExtension(raw);
// Q51-55 and Q56-60 are appended here when their independent public parts land.
const septemberExtension = parseFp1SeptemberAppliedParts([septemberRaw]);
export function getFp1PublishedExtension(edition: string) {
  if (edition === extension.edition) return extension;
  return edition === septemberExtension.edition ? septemberExtension : null;
}
export function getFp1ExtensionQuestions(edition: string) { const data = getFp1PublishedExtension(edition); return data ? publishableExtensionQuestions(data) : []; }
