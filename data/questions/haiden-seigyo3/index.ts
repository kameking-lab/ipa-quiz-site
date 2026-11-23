import type { Question } from "@/lib/questions/types";
import questions0 from "./2023-late.json";
import questions1 from "./2025-late.json";
import edition2024 from "../haidenban-kumitate3/2024-late.json";

export const HAIDEN_SEIGYO3_QUESTIONS: Question[] = [
  ...questions0 as Question[],
  ...(edition2024 as Question[]).map(q => ({ ...q, exam: "haiden-seigyo3" as const })),
  ...questions1 as Question[],
];
