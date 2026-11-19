import catalog from "@/data/exam-library/pe-first/catalog.json";
import lq3dCatalog from "@/data/exam-library/pe-first/catalog-lq3d.json";
import forestCatalog from "@/data/exam-library/pe-first/catalog-c06.json";
import { parseExamCatalog } from "@/lib/exam-library-model";

/** Metadata stays separate from server-only question manuscripts. */
export const PE_FIRST_CATALOG = parseExamCatalog([...catalog, ...lq3dCatalog, ...forestCatalog]);
