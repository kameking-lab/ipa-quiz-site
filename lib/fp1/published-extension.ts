import raw from "@/data/questions/fp1/applied-2026-may-extension.json";
import q51q55Raw from "@/data/questions/fp1/applied-2026-september-q51-q55.json";
import q56q60Raw from "@/data/questions/fp1/applied-2026-september-q56-q60.json";
import septemberRaw from "@/data/questions/fp1/applied-2026-september-q61-q65.json";
import { parseFp1AppliedExtension, publishableExtensionQuestions } from "./applied-extension";
import { parseFp1SeptemberAppliedParts } from "./september-applied-parts";
const extension = parseFp1AppliedExtension(raw);
const septemberExtension = parseFp1SeptemberAppliedParts([q51q55Raw, q56q60Raw, septemberRaw]);
export function getFp1PublishedExtension(edition: string) {
  if (edition === extension.edition) return extension;
  return edition === septemberExtension.edition ? septemberExtension : null;
}
export function getFp1ExtensionQuestions(edition: string) { const data = getFp1PublishedExtension(edition); return data ? publishableExtensionQuestions(data) : []; }
