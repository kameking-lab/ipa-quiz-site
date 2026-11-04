import "server-only";
import type { Question } from "@/lib/questions/types";
import ready from "./ready.json";

/** Internal reviewed corpus. Public registries/loaders must apply the publication gate. */
export const KHK_KAGAKU_QUESTIONS: Question[] = ready as Question[];
