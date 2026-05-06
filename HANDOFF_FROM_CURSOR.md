# HANDOFF

次セッション（Cursor もしくは別の Claude Code セッション）向けの引き継ぎ。
更新日: 2026-04-17（セッション2）

## デプロイ URL

- GitHub: https://github.com/kameking-lab/ipa-quiz-site
- Vercel Production: https://kakomon-ai.jp
- Vercel Project: ipa-quiz-site (kameking-labs-projects)

## 直近セッション（セッション2）で完了したこと

PR #1 feat(pdf): Gemini Vision PDF extraction pipeline
- `scripts/parse-pdf-to-json.ts` を Gemini 2.5 Flash Vision に全面書き直し
  - PDF バイト → base64 inline data → Gemini 構造抽出 → TypeScript 出力
  - 問題PDF（am_qs.pdf）→ 80問抽出 + 解説生成
  - 解答PDF（am_ans.pdf）→ 答え合わせマージ
  - `pnpm parse:pdfs 2023-spring` で1年度だけ実行も可能
- `data/questions/ap/by-year/index.ts` バレル追加（空スタート、parse:pdfs が自動更新）
- `data/questions/ap/index.ts`: 実データ優先、サンプルフォールバック

PR #2 feat(pwa): Service Worker + SVG favicon
- `public/sw.js`: cache-first（static）/ network-first（pages）/ API passthrough
- `components/ServiceWorkerRegistration.tsx`: root layout に mounting
- `public/favicon.svg`: 32×32 青丸角形 + IPA テキスト
- `manifest.webmanifest` に 32×32 アイコンを追記

PR #3 feat(settings): /settings ページ
- `lib/storage/settings.ts`: AppSettings（randomizeChoices / excludeRecent / calculationOnly）
- `app/settings/page.tsx`: 外観（テーマ3択）/ クイズオプション（Switch3つ）/
  プレミアムフラグ / 学習履歴（統計・エクスポート・インポート・リセット）
- フッターに「設定」リンク追加

本番 /api/copilot 動作確認（TODO-2）:
- X-Provider: gemini → Vercel に GEMINI_API_KEY 設定済み確認
- 9クイックアクション全て動作: term / simplify / similar / prerequisite /
  why-wrong / analyze-a / analyze-i / analyze-u / analyze-e
- X-RateLimit-Limit: 30（無料枠正常）

## 未完了 / 次セッション最初に着手すべき TODO

1. **3 PR のマージ（最優先）**
   - PR #1 (feat/pdf-pipeline): マージ後、ローカルで pnpm fetch:pdfs + pnpm parse:pdfs を実行し 400 問投入
   - PR #2 (feat/pwa-sw): マージ
   - PR #3 (feat/settings-page): マージ後、settings の値を QuizPlayer の QuizFilter に接続

2. **PDF 実データ投入（PR#1マージ後、ローカル実行が必要）**
   手順:
   a. .env.local に `GEMINI_API_KEY=your-key` を設定
   b. `pnpm fetch:pdfs` — jitec.ipa.go.jp から 10 本の PDF を取得
      (サンドボックス環境ではDNS解決できないため、通常の開発環境で実行すること)
   c. `pnpm parse:pdfs` — 5年度 × 3Gemini呼び出し = 15呼び出し、推定 ¥200 未満
   d. `pnpm validate:questions` — Zod検証
   e. 生成された `data/questions/ap/by-year/*.ts` をコミット

3. **settings → QuizFilter 接続**
   - `lib/storage/settings.ts` の `readSettings()` を `components/quiz/QuizPlayer.tsx` 起動時に読み込む
   - `randomizeChoices: true` → shuffleChoices(q) 適用
   - `excludeRecent: true` → filter.excludeRecent = true
   - `calculationOnly: true` → filter.calculationOnly = true

4. **フェーズ2 機能**
   - 模試モード（タイマー + 問題数選択）
   - 段級ランキング（localStorage集計）
   - 会話履歴のセッション保存（現状リロードで消える）

5. **favicon.ico 生成**
   - 現状はSVGのみ。ブラウザ互換性向上のため PNG 192/512 を追加したい
   - `sharp` か canvas ライブラリで SVG → PNG 変換スクリプトを書く

## 現在のフェーズと進捗率

- フェーズ1（MVP）: **約 90%**
  - 実 PDF パース & データ投入: コード完成、実行は開発環境で必要
  - PWA, /settings: PR作成済み、マージ待ち
- フェーズ2: 未着手

## 既知の問題

- サンドボックス環境では `jitec.ipa.go.jp` への DNS 解決が失敗するため、
  `pnpm fetch:pdfs` はローカル実行が必要。
- `AppSettings` の値はまだ QuizPlayer に接続されていない（UI には表示されるが動作しない）。
- favicon.ico 未生成（SVGのみ。Chrome/Firefox/Safari 12+ は対応済み）。
- parse-pdf-to-json.ts は `data/questions/ap/by-year/*.ts` を TypeScript で出力するが、
  実際の IPA PDF の 2段組レイアウトでの抽出精度は未確認（実行待ち）。
  図表入り問題（hasImage: true）は除外され、80問中 60〜70 問程度が有効データになる想定。

## AI コパイロット実応答ログ（2026-04-17）

エンドポイント: https://kakomon-ai.jp/api/copilot
確認ヘッダー: X-Provider: gemini, X-RateLimit-Limit: 30

クイックアクション「term」応答抜粋:
> お、応用情報技術者試験の過去問だね！今回は「コンピュータシステム」分野から、ビット列の表現に関する問題だ。
> この問題に出てくる重要用語をいくつかピックアップして、分かりやすく解説するね。
> ### 1. ビット列 (Bit String)
> コンピュータが情報を扱うときの、0と1の並びのことだよ。

クイックアクション「simplify」応答抜粋:
> はい、この問題について、IT経験が浅い方にも分かりやすいように、かみ砕いて説明しますね！
> ### 問題の概要
> まず、問題文は「あるデータ」について説明しています。

クイックアクション「similar」応答抜粋:
> おっ、応用情報技術者試験の過去問、頑張ってるね！この問題は、ビット演算の基本的な「AND」演算について問うてるんだ。

クイックアクション「prerequisite」応答抜粋:
> この問題を解くために、まずはこれだけは押さえておこう [前提知識の列挙]

クイックアクション「why-wrong」応答抜粋:
> なるほど、応用情報技術者試験の過去問ですね！今回の問題は、ビット演算に関するものですね。

クイックアクション「analyze-a」応答抜粋:
> 選択肢アについて、なぜ正解・不正解なのか、理由を分解して見ていきましょう。

品質メモ: Gemini が問題のコンテキスト（算術右シフト問題）を正確に把握するのではなく、
問番号・分野ラベルから推測した内容を返すケースがあった。これは問題データの `explanation` フィールド
が短かったためと考えられる。実データ投入後に `explanation` を充実させることで改善見込み。

## 技術的判断メモ

- PDF parse script の出力形式: JSON ではなく TypeScript（型安全性確保、resolveJsonModule 不要）
- by-year バレル: parse:pdfs が自動更新するため手動管理不要
- 設定値と QuizPlayer の接続は次セッションに持越し（UI先行、機能後付け）
- Service Worker は silent-fail（enhancement only）、next-pwa 不採用（依存最小化）
- favicon.ico は SVG で代用（モダンブラウザ完全対応）

## Gemini API 使用コスト概算

このセッションの検証使用:
- curl テスト: 約10呼び出し × $0.00036 ≒ $0.004（無視できるレベル）

pnpm parse:pdfs の想定コスト:
- 5年度 × 3呼び出し（問題/解答/解説）= 15呼び出し
- PDFは各15〜20ページ想定、Gemini Flash 画像トークン込みで推定 ¥50〜200

## 次セッションで最初に読むべきファイル

1. CLAUDE.md — プロジェクト全体観、承認必須事項
2. data/questions/ap/by-year/index.ts — データ投入後の状態確認
3. scripts/parse-pdf-to-json.ts — PDF抽出スクリプト本体
4. app/settings/page.tsx — /settings UI
5. components/quiz/QuizPlayer.tsx — settings 接続対象

## オープン PR 一覧

- PR #1: https://github.com/kameking-lab/ipa-quiz-site/pull/1 (feat/pdf-pipeline)
- PR #2: https://github.com/kameking-lab/ipa-quiz-site/pull/2 (feat/pwa-sw)
- PR #3: https://github.com/kameking-lab/ipa-quiz-site/pull/3 (feat/settings-page)
