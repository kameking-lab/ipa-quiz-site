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
  const sessionIdRef = React.useRef<string>(generateId());
  const createdAtRef = React.useRef<string>(new Date().toISOString());

  React.useEffect(() => {
    sessionIdRef.current = generateId();
    createdAtRef.current = new Date().toISOString();
  }, [question.id]);

  React.useEffect(() => {
    if (messages.length === 0) return;
    const timer = setTimeout(() => {
      const session: ChatSession = {
        id: sessionIdRef.current,
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
        createdAt: createdAtRef.current,
        updatedAt: new Date().toISOString(),
      };
      saveToLocalStorage(session);
    }, 600);
    return () => clearTimeout(timer);
  }, [messages, question]);

  return {
    sessionId: sessionIdRef.current,
    createdAt: createdAtRef.current,
  };
}
