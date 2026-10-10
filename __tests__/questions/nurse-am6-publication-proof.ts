import historical from "@/docs/evidence/nurse-am7-followup-20261010/INTEGRATION.json";
import delta from "@/docs/evidence/nurse-am112-publication-hold-20261010/DELTA.json";

// Preserve the seven-question historical receipt; derive only the six-question publication candidate.
const proof = {
  ...historical,
  addedOriginals: delta.addedOriginals,
  addedChoices: delta.addedChoices,
  totalOriginals: delta.totalOriginals,
  totalChoices: delta.totalChoices,
  addedIds: historical.addedIds.filter(id => id !== delta.heldId),
  sourceChecks: historical.sourceChecks.filter(check => check.id !== delta.heldId),
  heldIdsUnchanged: delta.heldIdsUnchanged,
  countsByYearSession: delta.countsByYearSession,
};
export default proof;
