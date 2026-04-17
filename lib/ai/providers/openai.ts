import type { LLMProvider, StreamChatParams } from "../provider";

export function createOpenAIProvider(): LLMProvider {
  return {
    name: "openai",
    async *streamChat(_params: StreamChatParams): AsyncIterable<string> {
      void _params;
      throw new Error(
        "OpenAI provider is a stub. Install openai SDK and implement if switching from Gemini.",
      );
      yield "";
    },
  };
}
