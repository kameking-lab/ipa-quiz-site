export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  quickAction?: string;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  questionId: string;
  examCode: string;
  year: number;
  season: string;
  qNumber: number;
  questionText: string;
  questionCategory: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

/** Compact payload embedded in share URLs (base64 encoded). */
export interface SharePayload {
  v: 1;
  exam: string;
  year: number;
  season: string;
  q: number;
  qText: string;
  cat: string;
  msgs: Array<{
    r: "u" | "a";
    c: string;
    qa?: string;
  }>;
}
