import type { LLMProvider, StreamChatParams } from "../provider";

const SAMPLE_RESPONSES: Record<string, string> = {
  term: `### 用語解説（モック応答）

この問題で問われている概念について、簡潔に整理します。

- **キーワード1**: 出題文の中心となる概念。IPAシラバス上の位置づけを把握しましょう。
- **キーワード2**: 選択肢を切り分ける判定基準。定義を正確に覚えることが有効です。
- **よくある誤解**: 似た用語と混同されやすいので、比較表で覚えると定着します。

_※ GEMINI_API_KEY が未設定のため、モックレスポンスを返しています。本番では実際の解説が生成されます。_`,
  whyWrong: `### なぜ間違えたか（モック応答）

選んだ選択肢と正解を比較すると、おそらく以下のどれかが原因です。

1. 用語の定義の取り違え（似た用語との混同）
2. 問題文の条件の読み落とし
3. 「最も適切」という問いの意図の見誤り

次回は問題文の条件を読み上げるように追って確認してみてください。

_※ モックレスポンス。API キー設定後に実データで応答します。_`,
  similar: `### 類題（モック応答）

**問題**: 本問と同じ分野で、論点を少しずらした設定の問題を1問生成します。

- ア) 選択肢1
- イ) 選択肢2
- ウ) 選択肢3
- エ) 選択肢4

正解: イ

**解説**: 本問で学んだ判定基準をそのまま適用すれば、イが適切と判断できます。

_※ モックレスポンス。_`,
  default: `### AIコパイロット（モック応答）

ご質問を受け付けました。本来ならここで Gemini が詳細な解説を返しますが、現在は GEMINI_API_KEY が未設定のためモックレスポンスを表示しています。

主なポイント:

1. 問題の前提条件を整理しましょう
2. 選択肢ごとに正誤判定の根拠を書き出しましょう
3. 似た用語があれば比較表で覚えましょう

Vercel の環境変数に \`GEMINI_API_KEY\` を設定すると、実際の AI 応答に切り替わります。`,
};

function pickReply(messages: { content: string }[]): string {
  const last = messages[messages.length - 1]?.content.toLowerCase() ?? "";
  if (last.includes("なぜ") || last.includes("間違") || last.includes("誤答")) {
    return SAMPLE_RESPONSES.whyWrong;
  }
  if (last.includes("類題") || last.includes("similar")) {
    return SAMPLE_RESPONSES.similar;
  }
  if (last.includes("用語") || last.includes("解説") || last.includes("term")) {
    return SAMPLE_RESPONSES.term;
  }
  return SAMPLE_RESPONSES.default;
}

export function createMockProvider(): LLMProvider {
  return {
    name: "mock",
    async *streamChat(params: StreamChatParams): AsyncIterable<string> {
      const reply = pickReply(params.messages);
      const chunks = reply.match(/.{1,24}/gs) ?? [reply];
      for (const chunk of chunks) {
        await new Promise((r) => setTimeout(r, 30));
        yield chunk;
      }
    },
  };
}
