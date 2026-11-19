import round2024_04 from "./2024-04.json";
import round2024_06 from "./2024-06.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const G_KENTEI_QUESTIONS = [
  ...round2024_04,
  ...round2024_06,
].map(normalizeQuestionData);
