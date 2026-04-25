# Loop 6 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: 76f3374（Loop 5 push 後）

## Phase 1: 過去ループ修正の再検証
- Loop 1〜3 prod 反映済（Loop 5 で確認済）
- Loop 4 午後 ModeCard / Loop 5 プライバシー修正: コミット push 済、Vercel デプロイ進行中
- 全 13 試験区分の `/quiz?mode=random&exam={code}` が 200 で応答（実測）
- 全質問詳細 URL 形式（FE=kamoku-a/b, DB=am1/am2, AP=am）はサイトマップと sitemap/0.xml で整合

## Phase 2: Critical（即修正）

### C6-1. `/modes/year` と `/modes/topic` が ?exam= 全試験区分のリクエストを無視して AP 固定
**実測**:
- ホーム `HomeExamPicker` は試験を選択すると `/modes/year?exam=db` 等にリンク（実測コード）
- ページ側 `app/modes/year/page.tsx:20`: `if (q.exam !== "ap" || q.session !== "am") continue;`
- ページ側 `app/modes/topic/page.tsx:18`: `if (q.exam !== "ap") continue;`
- → DB / NW / SC / FE 等を選択した訪問者にも **AP の年度／分野リスト** が表示される
- カードリンクも `/quiz?mode=year&exam=ap&...` を生成 → 別の試験を選んでも AP クイズに飛ぶ

**影響**:
- 13 試験対応を謳いながら、年度別／分野別モードは事実上 AP 専用
- ユーザーは「DB 分野別」を選んだのに AP のクイズが始まり、混乱
- 競合の過去問道場は試験ごとにドメイン分割しているため、これより遥かに正確
- 「12,000問・13試験」の訴求が機能不全 → β公開の信頼を毀損する重大バグ

**修正**:
- 両ページを `searchParams: Promise<{exam?: string}>` を受ける async ページに変更
- `ExamCode` 型ガードで未知/不正 exam は `ap` フォールバック
- `/modes/year`: session も集計キーに含めて、DB 午前I／午前II・FE 科目A／科目B を個別カードに
- カードリンクが `exam=${exam}&session=${session}` を伝搬
- データ未収録試験には「データはまだ収録されていません」プレースホルダ
- メタ description も「IPA 13試験区分」へ汎用化

**検証**: `pnpm typecheck` ✅ / `pnpm build` ✅
- 両ページが SSG → Dynamic (`ƒ`) に変わるが、searchParams を取るので必然的（Next.js 16）
- 既存 SSG ページ群（`/q/[exam]/...` 1,512 paths など）は影響なし

### C6-2. 他の Critical 該当なし
- Stripe checkout: 認証→課金設定の優先順序が正しい（401→503）
- /api/copilot: 不正リクエストを 400 拒否
- 全 13 試験のクイズ random エントリ 200
- 全 fixture URL（FE=kamoku-a, DB=am1）の質問詳細が 200

## Phase 3: Major
新規 Major 該当なし。M2（試験別 description 動的化）は本ループの fix で部分的に解消したが、
試験別の専用文言まで詰めるには `[exam]/topic/[topicSlug]` のような階層に拡張が必要 →
引き続き Major として保留。

## Phase 4: Minor
本ループで新規 Minor 該当なし（C6-1 が大型のため一括対応）。

## Phase 5: ビジネス・SEO・差別化評価
- C6-1 修正により「13試験対応」のサイトの根幹機能が正しく動く
- 訪問者が DB を選んで DB の年度別／分野別を見られる
- カードラベルが試験ごとに切り替わるため SEO 的にもコンテンツが豊かになる（同 URL 違い内容）
- /quiz への遷移で session=am1/am2/kamoku-a/kamoku-b が正しく伝わるため、各試験の細粒度クイズが可能に

## Phase 6: NPS 予測
- Loop 5 比 +5 → **+22（baseline）**
- 理由: 「13試験対応」の訴求と実機能の整合（最大の信頼回復）

## Phase 7: ローンチ可否判定
- **Soft Launch / Hard Launch ともに可**（C6-1 が prod 反映後）
- Loop 6 で Critical 1 件発見 → 早期完了条件のカウンタはリセット
- Loop 7 以降の精査で Critical 0 が続けば Loop 9 で早期完了の可能性

## 本ループで対応する Issue
- C6-1: /modes/year と /modes/topic を全 13 試験区分対応に書き直し
