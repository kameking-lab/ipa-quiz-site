import listeningSecond from "./2026-2-listening.json";
import listeningFirst from "./2026-1-listening.json";
import listeningThird from "./2025-3-listening.json";
import second from "./2026-2-reading-writing.json";
import first from "./2026-1-reading-writing.json";
import third from "./2025-3-reading-writing.json";
import type { Question } from "@/lib/questions/types";

export const EIKEN3_QUESTIONS = [...second, ...first, ...third, ...listeningSecond, ...listeningFirst, ...listeningThird] as Question[];
