import type { Question } from "@/lib/questions/types";
import {
  COPILOT_SYSTEM_PROMPT,
  buildQuestionContext,
  buildLearnerProfileContext,
  buildResponseLengthDirective,
  QUICK_ACTIONS,
} from "@/lib/ai/prompts";
import type { LearnerProfile, QuickActionId, ResponseLength } from "@/lib/ai/prompts";
import { CHARACTERS, isCharacterId } from "@/lib/ai/characters";

export interface PromptAssemblyInput {
  question: Question;
  messages: { role: "user" | "assistant"; content: string }[];
  selectedChoice?: string;
  isCorrect?: boolean;
  quickAction?: QuickActionId;
  learnerProfile?: LearnerProfile;
  character?: string;
  characterEnabled?: boolean;
  responseLength?: ResponseLength;
  ragDirective: string | null;
  ragContextBlock: string;
}

export interface PromptAssemblyOutput {
  system: string;
  userMessages: { role: "user" | "assistant"; content: string }[];
}

/**
 * Assemble the system prompt (system instructions + question context + profile + RAG context)
 * and finalize the user-message list (optionally prepending a quick-action prompt to the last
 * user turn).
 */
export function assembleCopilotPrompt(input: PromptAssemblyInput): PromptAssemblyOutput {
  const {
    question,
    messages,
    selectedChoice,
    isCorrect,
    quickAction,
    learnerProfile,
    character,
    characterEnabled,
    responseLength,
    ragDirective,
    ragContextBlock,
  } = input;

  const quickPrompt =
    quickAction && QUICK_ACTIONS[quickAction]
      ? QUICK_ACTIONS[quickAction].prompt(question)
      : null;

  const questionContext = buildQuestionContext(question, selectedChoice, isCorrect);

  const profileContext = learnerProfile
    ? buildLearnerProfileContext(learnerProfile satisfies LearnerProfile)
    : null;

  const characterPrompt =
    characterEnabled && character && isCharacterId(character)
      ? CHARACTERS[character].systemPrompt
      : null;

  const responseLengthDirective = responseLength
    ? buildResponseLengthDirective(responseLength satisfies ResponseLength)
    : null;

  const system = [
    COPILOT_SYSTEM_PROMPT,
    ...(characterPrompt ? [characterPrompt] : []),
    ...(responseLengthDirective ? [responseLengthDirective] : []),
    ...(ragDirective ? [ragDirective] : []),
    "---",
    questionContext,
    ...(profileContext ? ["---", profileContext] : []),
    ...(ragContextBlock ? ["---", ragContextBlock] : []),
  ].join("\n\n");

  const userMessages = [...messages];
  if (quickPrompt) {
    const last = userMessages[userMessages.length - 1];
    if (last.role === "user") {
      userMessages[userMessages.length - 1] = {
        role: "user",
        content: `${quickPrompt}\n\n${last.content}`.trim(),
      };
    }
  }

  return { system, userMessages };
}
