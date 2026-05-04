"use client";

import * as React from "react";
import type { Question } from "@/lib/questions/types";
import type { ChatSession } from "@/lib/chat/types";
import { saveToLocalStorage } from "@/lib/chat/storage";

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  quickAction?: string;
}

export function useChatSession(question: Question, messages: Message[]) {
  // Identity is read in render, so it must be state (not a ref).
  // Reset on question change via the standard "compare prev prop" pattern.
  const [session, setSession] = React.useState(() => ({
    sessionId: generateId(),
    createdAt: new Date().toISOString(),
  }));
  const [trackedQuestionId, setTrackedQuestionId] = React.useState(question.id);

  if (trackedQuestionId !== question.id) {
    setTrackedQuestionId(question.id);
    setSession({ sessionId: generateId(), createdAt: new Date().toISOString() });
  }

  React.useEffect(() => {
    if (messages.length === 0) return;
    const timer = setTimeout(() => {
      const persisted: ChatSession = {
        id: session.sessionId,
        questionId: question.id,
        examCode: question.exam,
        year: question.year,
        season: question.season,
        qNumber: question.qNumber,
        questionText: question.question,
        questionCategory: question.category,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
          quickAction: m.quickAction,
          createdAt: new Date().toISOString(),
        })),
        createdAt: session.createdAt,
        updatedAt: new Date().toISOString(),
      };
      saveToLocalStorage(persisted);
    }, 600);
    return () => clearTimeout(timer);
  }, [messages, question, session]);

  return session;
}
