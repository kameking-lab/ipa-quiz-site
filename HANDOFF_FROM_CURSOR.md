# HANDOFF

次セッション（Cursor もしくは別の Claude Code セッション）向けの引き継ぎ。
更新日: 2026-04-17

## 直近セッションで完了したこと

初期セッション（プロジェクト立ち上げ）。以下を完了:

- Next.js 16 + TypeScript strict + Tailwind v4 + 自作 shadcn 風 UI primitives のセットアップ
- LLM 抽象レイヤ（`lib/ai/provider.ts`）と Gemini 実装、Claude / OpenAI スタブ、mock フォールバック
- `/api/copilot` ストリーミング API + システムプロンプト + 6 種クイックアクション
- レート制限（サーバー側 IP、クライアント側 localStorage、JST 0:00 日次リセット）
- クイズ UI（ゼロ遷移・キーボード 1〜4 / Enter / R、スワイプで次問題）
- AI コパイロット UI（デスクトップ右サイドバー + モバイルボトムシート）
- ホーム画面（ランダム / 未回答 / 復習 / 年度別 / 分野別）
- `/about` の IPA 出典・著作権ページ
- ダークモード（`<html class="dark">` + プリフィル script）
- PWA 基本（manifest + SVG アイコン）
- サンプル問題データ（AP 令和5春〜令和7春 を 14 問 手動キュレーション）
- `scripts/{fetch-ipa-pdfs,parse-pdf-to-json,validate-questions,topic-tagger}.ts`
- `CLAUDE.md`, `README.md`, `.env.example`, `.gitignore` 整備

## 未完了 / 次セッションで最初に着手するべき TODO（3〜5件）

1. **実 PDF からの問題データ本投入**:
   `pnpm fetch:pdfs` で IPA 公式 PDF を取得した後、`scripts/parse-pdf-to-json.ts` の
   本体実装（pdfjs-dist または Gemini Vision）を書き、AP 令和5春〜令和7春 × 80問 = 最大 400 問
   を `data/questions/ap/by-year/*.json` に出力する。画像ありの問はまず `hasImage: true` で除外 OK。
2. **Vercel 本番デプロイの完了**:
   `npm i -g vercel` 済みなら `vercel link` → `vercel env add GEMINI_API_KEY` → `vercel --prod`。
   初期セッションでは Vercel CLI の対話認証が要るため保留した。
3. **実 API キーでの E2E 確認**:
   `GEMINI_API_KEY` を Vercel 環境変数にセットした後、AP 令和5春 問1〜5 で
   AI コパイロットの 6 クイックアクションを実動作確認し、会話ログを記録。
4. **段級ランキング（ローカル集計）とフェーズ2機能の着手**:
   模試モード（タイマー + 問題数選択）、選択肢ランダム化の UI オプション化、
   直近 2 回除外などの設定画面を `/settings` に追加。
5. **favicon.ico の生成**:
   現在は SVG のみ。PWA インストール時の互換性向上のために PNG 192/512 と
   `favicon.ico` を追加。

## 現在のフェーズと進捗率

- フェーズ1（MVP）: **コア UI / AI コパイロット / LLM抽象 / レート制限 / ホーム / /about**: 完了
- フェーズ1（MVP）: **実 PDF パース & 400問投入 / Vercel 本番デプロイ**: 未完
- 進捗率の体感: フェーズ1 の **約 70%**（UI・API層は完成、データ実投入とデプロイが残）

## 既知の問題

- `scripts/parse-pdf-to-json.ts` はスケルトンのみ。実 PDF の構造抽出は未実装。
- サンプル問題 14 問は IPA 原典 PDF を直接パースしたものではなく、IPA シラバスの
  主要論点に沿って手書きで作成した合成サンプル。`sourcePdfUrl` は原典へのリンクが張られているが、
  問題文の完全な逐語再現ではないことを HANDOFF としてここに明記する。
  フェーズ1.5 で実 PDF 由来のデータに差し替えること。
- Vercel CLI が未インストールだったため、CLI 経由の本番デプロイは未実施。
- `favicon.ico` が未作成（SVG のみ）。PWA インストール時の互換性改善のため次セッションで作成推奨。
- PWA の Service Worker は未実装（manifest と theme-color のみ）。オフライン対応はフェーズ2以降。

## 次セッションで最初に読むべきファイル

1. `CLAUDE.md` — プロジェクト全体観、承認必須事項、LLM 抽象ルール
2. `lib/questions/types.ts` + `data/questions/ap/sample-questions.ts` — データモデル
3. `components/quiz/QuizPlayer.tsx` — クイズ画面の核心
4. `components/copilot/CopilotPanel.tsx` — AI UI
5. `lib/ai/provider.ts` + `app/api/copilot/route.ts` — API と抽象レイヤ
6. `scripts/parse-pdf-to-json.ts` — 次フェーズで強化すべきスケルトン

## 技術的に悩んだ点・設計判断

- Next.js は `create-next-app@latest` が 16.2.4 を持ってきた。指示書には「15」とあったが
  16 でも App Router は互換。React 19 も採用。
- Tailwind v4 の dark モードは `@custom-variant dark (&:where(.dark, .dark *))` で有効化。
  `class="dark"` を `<html>` に付与する方式。
- shadcn CLI は初期化が対話式で自律実行と相性が悪かったため、Button/Card/Dialog/Switch/Badge を
  手書きで実装。スタイルは shadcn と概ね同等。
- PDF パースは、2段組 + 特殊フォント + 図表混在で単純なテキスト抽出が崩れる問題があり、
  今回はスケルトンに留めて手動キュレーションサンプルで UX を担保した。
  次セッションで Gemini Vision を使った構造抽出を試すのが妥当。
- AI コパイロットのモバイル UX: デスクトップ右サイドバー (380px) と、モバイルの
  「AIに聞く」FAB + ボトムシート を別コンポーネントでなく同一 `CopilotPanel` を使い回す設計。

## 金田が Vercel 側で設定すべき環境変数

- `GEMINI_API_KEY` ... Google AI Studio で取得、Production/Preview/Development 全環境に設定
- `LLM_PROVIDER=gemini`（省略可、既定が gemini）
- `GEMINI_MODEL_FREE=gemini-2.5-flash-lite`（省略可）
- `GEMINI_MODEL_PREMIUM=gemini-2.5-flash`（省略可）
- `FREE_DAILY_LIMIT=30`（任意、変更時は承認必須事項）
- `PREMIUM_MINUTE_LIMIT=10`（任意）

アフィリエイト関連（フェーズ4で使う）:
- `NEXT_PUBLIC_AMAZON_TAG=safeaisite22-22`
- `NEXT_PUBLIC_RAKUTEN_ID=5291f19d.a0fc3c16.5291f19e.b91d11f6`
