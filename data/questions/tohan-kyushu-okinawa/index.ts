import type { Question } from "@/lib/questions/types";
import { appendReplenishedQuestions } from "../published";
import y2021 from "./2021.json";
import releasePapers from "./release-papers.json";

export const TOHAN_KYUSHU_OKINAWA_QUESTIONS = appendReplenishedQuestions(
  releasePapers as unknown as Question[],
  [y2021],
);
