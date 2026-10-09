import raw from "@/data/questions/fp1/applied-2026-may-extension.json";
import { parseFp1AppliedExtension, publishableExtensionQuestions } from "./applied-extension";
const extension = parseFp1AppliedExtension(raw);
export function getFp1PublishedExtension(edition: string) { return edition === extension.edition ? extension : null; }
export function getFp1ExtensionQuestions(edition: string) { const data = getFp1PublishedExtension(edition); return data ? publishableExtensionQuestions(data) : []; }
