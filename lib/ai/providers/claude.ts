import type { LLMProvider, StreamChatParams } from "../provider";

export function createClaudeProvider(): LLMProvider {
  return {
    name: "claude",
    async *streamChat(_params: StreamChatParams): AsyncIterable<string> {
      void _params;
      throw new Error(
        "Claude provider is a stub. Install @anthropic-ai/sdk and implement if switching from Gemini.",
      );
      yield "";
    },
  };
}
