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

interface UseChatSessionOptions {
  /** Set to true when DB cloud sync is available (e.g., user is logged in and DB configured). */
  enableCloudSync?: boolean;
}

export function useChatSession(
  question: Question,
  messages: Message[],
  options: UseChatSessionOptions = {},
) {
  const sessionIdRef = React.useRef<string>(generateId());
  const createdAtRef = React.useRef<string>(new Date().toISOString());
  const cloudIdRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    sessionIdRef.current = generateId();
    createdAtRef.current = new Date().toISOString();
    cloudIdRef.current = null;
  }, [question.id]);

  React.useEffect(() => {
    if (messages.length === 0) return;

    const chatMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
      quickAction: m.quickAction,
      createdAt: new Date().toISOString(),
    }));

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
        messages: chatMessages,
        createdAt: createdAtRef.current,
        updatedAt: new Date().toISOString(),
      };
      saveToLocalStorage(session);

      if (options.enableCloudSync) {
        void syncToCloud(cloudIdRef, question, chatMessages);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [messages, question, options.enableCloudSync]);

  return {
    sessionId: sessionIdRef.current,
    createdAt: createdAtRef.current,
  };
}

async function syncToCloud(
  cloudIdRef: React.MutableRefObject<string | null>,
  question: Question,
  messages: Array<{ role: "user" | "assistant"; content: string; quickAction?: string; createdAt: string }>,
) {
  try {
    if (cloudIdRef.current) {
      await fetch(`/api/chat/sessions/${cloudIdRef.current}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages }),
      });
    } else {
      const res = await fetch("/api/chat/sessions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          questionId: question.id,
          examCode: question.exam,
          messages,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { id?: string };
        if (data.id) cloudIdRef.current = data.id;
      }
    }
  } catch {
    // Fail silently — localStorage already has the data
  }
}
