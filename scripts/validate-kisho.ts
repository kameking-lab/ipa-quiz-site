import { KISHO_CANDIDATES } from "../data/questions/kisho";
import { KishoCandidateSchema } from "../data/questions/kisho/schema";
for (const q of KISHO_CANDIDATES) KishoCandidateSchema.parse(q);
console.log(`kisho: ${KISHO_CANDIDATES.length} originals pass schema; candidate only`);
