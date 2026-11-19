import data from "./two-sittings.json";
import august2025 from "./2025-august.json";
import august2022 from "./2022-august.json";
import february2023 from "./2023-february.json";
import { normalizeQuestionData } from "@/lib/questions/native-b";

export const AVIATION_COMM_QUESTIONS = [...data, ...august2025, ...february2023, ...august2022].map(normalizeQuestionData);
