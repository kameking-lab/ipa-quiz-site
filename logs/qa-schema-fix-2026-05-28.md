# Q&A 構造化データ 重大エラー1件＋警告18件の解消 (2026-05-28)

対象: フェーズ14 第6致命傷 / 実機激辛レビュー第3弾 SEO。Google リッチリザルトテストで /q/* の Q&A が「無効1件・重大エラー1件・警告18件」。
ブランチ: `fix/qa-schema-full-compliance` / 基点 main HEAD: `9ac91f0`

## 現状調査結果
`lib/seo/question-jsonld.ts` の `buildQuestionJsonLd` が出力する QAPage > mainEntity(Question) は、修正前は以下しか持っていなかった:
- Question: `name`(120字スライス), `text`, `inLanguage`, `acceptedAnswer`, `suggestedAnswer`(誤答のみ)
- Answer(accepted / suggested): `text` のみ

Google Q&A（QAPage）要件との差分:
- **重大エラー1件 = 必須 `answerCount` の欠落**。Question の必須プロパティ `answerCount`（回答総数）が無く、リッチリザルト無効化の決定的要因。
- **警告18件 = 推奨プロパティの欠落**。`author` / `datePublished`(＋`dateCreated`) / `upvoteCount` / `url` が、Question・acceptedAnswer・suggestedAnswer×3 の各エンティティで未設定。
  - 内訳の目安: Question に4種（author/datePublished/upvoteCount/url）＋ Answer 4個 × (url/author/datePublished/upvoteCount) ≒ 推奨欠落が計18件規模。

## 修正方針
Google Q&A 仕様に厳密準拠。必須 `answerCount` を追加（重大エラー解消）し、Question と全 Answer に推奨プロパティを完備（警告18件解消）。既存 JSON-LD 構造（QAPage+LearningResource+BreadcrumbList のグラフ、acceptedAnswer/suggestedAnswer のテキスト、dateModified）は破壊しない。第5致命傷で保全した SSR/JSON-LD も維持。AI 新規呼び出し・新規 LSキーなし。

## 修正内容（lib/seo/question-jsonld.ts）
Question に追加:
- `answerCount: 1 + otherChoices.length`（必須／重大エラー解消。正解1＋誤答数＝選択肢総数）
- `author`: IPA（`{"@type":"Organization", name:"情報処理推進機構 (IPA)", url:"https://www.ipa.go.jp/"}`）= 設問の作成者
- `datePublished` / `dateCreated`: `examPublishDateISO(year, season)`（春≈4/21・秋≈10/21・CBT は年内 4/1 に固定。設問の試験回年に整合する有効 ISO 日付）
- `upvoteCount: 0`
- `url`: 問題ページ正規URL

Answer（acceptedAnswer / 各 suggestedAnswer）に追加:
- `url`: acceptedAnswer は `…#explanation`（第5致命傷で追加した解説アンカーへ直リンク）、suggestedAnswer はページURL
- `author`: 過去問AI（`{"@type":"Organization", name:SITE_NAME, url:SITE_BASE_URL}`）= 解説（解答）の作成者
- `datePublished`: `lastUpdatedISO`（当サイト解説の日付）
- `upvoteCount: 0`
- `inLanguage: "ja"`

著者は @id 参照ではなく**フルのインライン Organization オブジェクト**で出力（/q ページ単体の Google 検証でホームの Organization ノードに依存せず解決できるように）。`name`(120字)・`text`(全文) は task の意図どおり据え置き（警告要因ではないため不変＝スコープ最小化）。

## 副作用範囲（既存構造への影響）
- グラフ型は QAPage / LearningResource / BreadcrumbList のまま（既存テスト維持）。acceptedAnswer.text / suggestedAnswer の中身・dateModified も不変。**追加のみ**で削除・改名なし。
- LearningResource・BreadcrumbList は Q&A 検証対象外のため不変。
- 全 12,653 問（indexable）の /q ページに自動適用（共通ビルダ経由）。

## テスト追加件数（合計 +9、既存維持）
- `__tests__/seo/question-jsonld.test.ts`（vitest, +7 件）: answerCount=4 / 単一選択肢時 answerCount=1 / Question の author(IPA)・datePublished(ISO,年整合)・dateCreated・upvoteCount・url / acceptedAnswer の #explanation url・author(過去問AI)・datePublished・upvoteCount / 全 suggestedAnswer の推奨フィールド / 「推奨フィールドが undefined でない」ゼロ警告ガード。既存5件は不変で維持。
- `tests/e2e/qa-schema.spec.ts`（Playwright, +2 件 × 2回 = 緑）: SSR HTML の QAPage JSON-LD を実パースし、Question の answerCount(>=1)・author・datePublished・dateCreated・upvoteCount・url、acceptedAnswer の #explanation url・author・date・upvote、全 suggestedAnswer の推奨フィールド、answerCount = 1+suggested 数の整合を検証。URL は questions sitemap から動的取得（自己メンテ）。

## 構造化データ検証（ビルド成果物）
prerendered `q/ap/2024-autumn/am/q1.html`:
- `"answerCount":4`、`"upvoteCount":0` ×5（Question＋4 Answer）、`"datePublished"` ×5、IPA author 出力、`#explanation` の Answer url ×1（＋解説セクション anchor）。
→ 必須＋推奨フィールドが全エンティティに存在。リッチリザルト要件を満たす。

## 検証結果
- typecheck 0 / lint 0（警告1は未追跡スクリプト, 対象外）/ vitest 29ファイル**184全緑**（+6）/ build 成功。
- e2e: qa-schema 2件・q-inline-answer 3件 緑（2回確認）。フルe2e 161件中155 passed・5 skipped。1件 fail は task1 由来の home-cta-click「最早クリック」テストがフルスイート並列負荷下で flake（単体6/6緑、CI は retries:1 で吸収、本変更は home 非関与）。

## SEO 効果見込み
- 重大エラー（answerCount 欠落）解消で Q&A リッチリザルトの**有効化対象**へ。
- 警告18件解消で Google の品質判定が改善し、検索結果での Q&A 拡張表示（質問・解答の展開）獲得の前提が整う。
- 競合 ap-siken.com が取得済のリッチスニペットとの差を縮小。CTR 改善見込み。

## 次のステップ
本番反映後、Google リッチリザルトテスト（https://search.google.com/test/rich-results）で本番 /q URL を再検証 → 重大エラー0・警告0 を確認。GSC の拡張(Q&A)レポートで「有効」件数の増加を追跡。
申し送り: task1 の home-cta-click「最早クリック」テストがフルスイート並列負荷下で再現的に flake（task5・task6 で各1回）。座標タイミング依存のため、別マイクロタスクで待機条件強化（CTA 静定後にクリック）を提案。
