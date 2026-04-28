# Round 2 Loop 7 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: 6a8987f（Round 2 Loop 6 push 後）

## Phase 1: 過去ループ修正の再検証
- Round 2 Loop 1〜6: 6 commits (`fix(round2-l1)` 〜 `fix(round2-l6)`) main マージ済
- typecheck / build 直近全成功
- 24 ファイル / 6 commit に対する Vercel デプロイ反映済

## Phase 2: Critical（即修正）
新規 Critical 該当なし。
- Stripe checkout / /api/copilot / /api/scoring すべて入力検証 → レート制限 → プロバイダ取得の順で適切に 400/401/429/503 を返す
- /privacy / /commerce / /terms 法務文書整合済（Round 1 + Round 2 で確認）
- /modes/year & /modes/topic 13 試験対応済
- /case-studies 架空サンプル明示済
- ChatShareView (`app/chat/share/ChatShareView.tsx`) のクエリパラメータ復号は `react-markdown` v9 のデフォルト sanitize に依存して安全（`javascript:` URL / 生 HTML をブロック）

## Phase 3: Major
新規 Major 該当なし（M2-1〜M2-22 引き続き保留）

## Phase 4: Minor（即修正）

### N7-1. AI 系 API の error handler が `err.message` をクライアントへ漏洩 + Sentry 未送信
**実測**:
- `app/api/copilot/route.ts:121-128`（旧コード）
  ```ts
  } catch (err) {
    controller.enqueue(
      encoder.encode(
        `\n\n[エラー] AI応答の取得に失敗しました: ${err instanceof Error ? err.message : String(err)}`,
      ),
    );
    controller.close();
  }
  ```
  ストリーミングレスポンスに `err.message` を verbatim で書き込み、ユーザーに表示
- `app/api/scoring/route.ts:264-269`（旧コード）
  ```ts
  } catch (err) {
    const fallback = buildMockScoring(question, payload.answers);
    fallback.overallComment = `AI採点中にエラーが発生したため、簡易採点を表示しています: ${err instanceof Error ? err.message : String(err)}`;
    ...
  }
  ```
  JSON レスポンスの `overallComment` フィールドに `err.message` を埋め込む
- いずれも `captureException` を呼んでおらず、Sentry へ送信されない（運用側が AI 障害を即時検知できない）

**影響**:
- **情報漏洩**: Gemini SDK の Error は内部 URL（`https://generativelanguage.googleapis.com/...`）、ステータスコード詳細、レスポンス body の一部を `message` に含むことがある。これがユーザー画面に出ると:
  - サードパーティ依存先（Google）の存在が完全に露見（プロダクトの「AI コパイロット」訴求の独立性が損なわれる）
  - Gemini の内部エラーコード（`RESOURCE_EXHAUSTED` 等）が表示され、ユーザーが「サービス側の障害」と誤解
  - 稀にスタックトレース由来の内部パスやライブラリバージョンが漏れる
- **運用盲点**: Round 2 Loop 6 で Resend 失敗を Sentry に送るよう修正済だが、AI 失敗だけ Sentry 連携が漏れていた。プロバイダ障害時に運用が気付けない
- **比較**: 同じ `app/api/contact/enterprise/route.ts:67-71` は既に Resend 失敗を Sentry に送っており、捕捉ポリシーに不整合があった

**修正**:
- 両ファイルに `import { captureException } from "@/lib/monitoring/sentry"` を追加
- `app/api/copilot/route.ts`: catch 内で `captureException(err, { route, extra: { provider, model } })`、ユーザーへは「少し時間を置いて再度お試しください。」の汎用メッセージのみ
- `app/api/scoring/route.ts`: catch 内で `captureException(err, { route, extra: { questionId, provider, model } })`、`overallComment` も汎用メッセージへ
- Sentry context は allowlist 範囲（M2-8 で警告された PII 流出を回避）

**検証**:
- `pnpm typecheck` ✅
- `pnpm build` ✅（1,512 SSG path + sitemap chunk 健全）
- Sentry DSN 未設定環境では `console.error` フォールバック（`lib/monitoring/sentry.ts:46`）

## Phase 5: ビジネス・SEO・差別化評価
- AI コパイロット推し（CLAUDE.md §1 (B)）の根幹: ユーザーが「Google の Gemini を呼んでいるだけ」と一目でわかってしまうエラー表示は、独自体験の訴求を弱める
- 修正により、AI 障害時もブランド体験が崩れない
- 運用面では Sentry 受信で AI 障害復旧 SLA が改善 → SLA 訴求材料

## Phase 6: NPS 予測
- Round 2 Loop 6 比 ±0 → **+22（baseline 維持）**
- 理由: 通常時のユーザー体感はゼロ。障害発生時のブランド毀損リスクと運用検知力の改善

## Phase 7: ローンチ可否判定
- **Soft Launch / Hard Launch ともに可**
- Loop 7 (Round 2): Critical 0 / Minor 1 → 早期完了条件のカウンタ未達

## 本ループで対応する Issue
- N7-1: /api/copilot と /api/scoring の error handler を Sentry 送信 + 汎用メッセージへ統一
