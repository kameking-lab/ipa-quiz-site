import catalog from "../src/generated/catalog.json";
import { qualificationTargets, type QualificationTarget } from "./qualification-schedules";
import { findQualificationHub, qualificationHubMatchesEntry } from "@/lib/exam-qualification-hubs";
import type { CatalogEntry } from "./contracts";
const entries: CatalogEntry[] = catalog.exams as CatalogEntry[];

/** Resolve actual route IDs instead of guessing qualifications from visible text. */
export function pageQualifications(pathname: string, search = ""): QualificationTarget[] {
  const parts = pathname.split("/").filter(Boolean);
  const query = new URLSearchParams(search);
  let code: string | undefined;
  if (["quiz", "mock-exam", "review", "modes", "challenge"].includes(parts[0])) code = query.get("exam") ?? undefined;
  else if (["q", "essay", "essays", "recommended-books", "success-stories"].includes(parts[0])) code = parts[1];
  else if (parts[0] === "chusho-secondary") code = "chusho-kigyo-shindanshi";
  else if (parts[0] === "e-learning" && parts[1] === "exams") {
    if (parts[2] === "qualifications") {
      // Qualification landing slugs live in the question library's public metadata.
      const hub = findQualificationHub(parts[3]);
      const selected = entries.filter(e => e.paper && hub && qualificationHubMatchesEntry(hub, e.paper));
      return unique(selected.flatMap(e => qualificationTargets(e.qualification ?? e.code)));
    }
    const entry = entries.find(e => e.code === `library.${parts[2]}`);
    code = entry?.qualification;
  } else code = parts[0];
  return code ? qualificationTargets(code) : [];
}
function unique(targets: QualificationTarget[]): QualificationTarget[] { return [...new Map(targets.map(t => [t.id,t])).values()]; }
