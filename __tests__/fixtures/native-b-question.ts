import { normalizeQuestionData } from "@/lib/questions/native-b";

// Structural tokens only; this fixture is never part of a qualification catalog.
export function nativeBQuestion(mode: "binary" | "shared-bank" = "binary") {
  return normalizeQuestionData({
    id: "structural-native-b", exam: "fe", session: "am", year: 2026, season: "spring", qNumber: 1,
    type: "native-b", category: "structural", topicTags: [], difficulty: 1,
    question: "STRUCTURAL_FIXTURE", explanation: "EXPLANATION_TOKEN", hasImage: false,
    sourcePdfUrl: "https://example.org/question.pdf", sourceAnswerUrl: "https://example.org/answer.pdf", license: "IPA-public",
    nativeB: { mode,
      candidates: Array.from({ length: mode === "binary" ? 2 : 10 }, (_, index) => ({ id: String(index + 1), label: `TOKEN_${index + 1}`, explanation: `REASON_${index + 1}` })),
      slots: ["L1", "L2", "L3", "L4", "L5"].map((label, index) => ({ label, prompt: `PROMPT_${index}`, answer: String(index % 2 + 1), explanation: `SLOT_REASON_${index}` })),
      officialScoring: { maxPoints: 10, pointsPerSlot: 2, note: "METADATA_TOKEN" },
    },
  });
}
