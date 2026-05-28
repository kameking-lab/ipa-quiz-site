# SERPスニペット「サンプル. AI 解説デモ. Q: 公開…」混入の解消 (2026-05-29)

対象: フェーズ14 第7致命傷 / 実機激辛レビュー第3弾 SEO。ホームの SERP スニペットにデモウィジェット文字列が混入。
ブランチ: `fix/serp-snippet-quality` / 基点 main HEAD: `6871061`

## 現状調査結果
- ホームの meta description は **既に明示設定済み**（app/page.tsx の HOME_DESCRIPTION、約147字）。`description`／`og:description`／`twitter:description` は同一値で同期済み。
  - ただし冒頭に試験区分13コードの羅列「（IP/SG/FE/AP/SC/NW/DB/ES/ST/SA/PM/SM/AU）」が入り、SERP 可視窓（先頭〜120字程度）の約40字を低価値情報が占有 → Google が「より良いスニペット」を本文から合成する誘因になっていた。
- HeroAiDemo（components/home/HeroAiDemo.tsx）:
  - 既に `aria-hidden="true"`、かつ **SSR では null**（`if (!mounted) return null`、mounted 初期 false）。つまり**生 HTML（curl）にはデモ文字列が無い**。
  - だが Googlebot は JS を実行してレンダリングし、デモ（「サンプル」「AI 解説デモ」「Q: 公開鍵暗号方式の特徴として正しいのは?」…）を DOM に描画する。**aria-hidden は検索スニペットからの除外には効かない**（支援技術向けで、インデックス対象テキストは依然抽出される）。
  - 結果、Google は meta description を上書きし、HomeHeroLede 段落＋HeroAiDemo のレンダリング後テキストを合成して SERP に表示していた。

→ 原因の正体: 「meta description 不在」ではなく、(1) description が長く先頭に低価値の区分コード列、(2) JS レンダリング後のデモ文字列がスニペット抽出対象、の合わせ技。

## 修正方針: 案C（A＋B 両方）
- **B（確実な根治）**: HeroAiDemo に Google 公式の `data-nosnippet` を付与。これは「ユーザーには見せるが検索スニペットには使わせない」ための正規手段（aria-hidden では不可能）。Googlebot はレンダリング後の DOM の `data-nosnippet` を尊重し、デモ文字列をスニペットに使わなくなる。
- **A（補強）**: HOME_DESCRIPTION を簡潔化。区分コード列を削除し価値提案＋問題数を前置。Google が description を採用しやすくする。

## 修正内容
1. `components/home/HeroAiDemo.tsx`: ルート要素に `data-nosnippet` を追加（`aria-hidden` は維持）。視覚表示・アニメ・挙動は不変。
2. `app/page.tsx` HOME_DESCRIPTION を刷新（118字、`${APPROX_QUESTION_COUNT_LABEL}` で SSOT 準拠・ハードコード無し）:
   「情報処理技術者試験 全13区分の過去問を AI 解説付きで完全無料公開。ITパスポート・基本情報・応用情報から高度試験まで 12,000問超を収録し、年度別・分野別・模試・苦手復習の6モードと学習履歴で効率学習。登録不要、スマホ片手で。」
   - `description`／`og:description`／`twitter:description` は同一 const 参照のため自動同期（Step 2-3 充足）。
   - 「サンプル」「デモ」を含まない。区分コード列を除去し先頭120字に価値を集約。

## 副作用範囲
- `data-nosnippet` は data-* 属性でブラウザは無視（Google 専用）。視覚・機能・レイアウトへの影響ゼロ。HeroAiDemo は第1致命傷で CTA の下に配置済（位置不変）。
- description は文言のみ変更（構造・レンダリング順序は不変）。og/twitter も同期。
- 全ページ共通の root layout 等は不変（ホーム固有 metadata のみ）。

## テスト追加件数（合計 +8）
- `__tests__/seo/home-metadata.test.ts`（vitest 6件）: description 明示・「サンプル/デモ/AI 解説デモ/公開鍵暗号/Q:」非含有・158字以内・無料/AI の価値語含有・og/twitter 同期・ハードカウント非含有（SSOT ガード）。app/page.tsx の metadata を直接 import して解決後の文字列で検証。
- `tests/e2e/home-snippet.spec.ts`（Playwright 2件 × 2回緑）: SSR HTML の meta description がクリーン（デモ語句なし）かつ og/twitter と一致／ブラウザでレンダリング後の `.hero-ai-demo` が `data-nosnippet` を持ちデモ文字列（「AI 解説デモ」「サンプル」）を内包することを実証。

## 構造化データ／HTML 検証（ビルド成果物）
prerendered `index.html`:
- meta description = 新文言（区分コード列なし・サンプル/デモなし）。
- SSR HTML 内の「サンプル」「AI 解説デモ」出現数 = 0（デモは SSR-null。レンダリング後にのみ出現し、そこには data-nosnippet が付与される）。

## 検証結果
- typecheck 0 / lint 0（警告1は未追跡スクリプト, 対象外）/ vitest 30ファイル**190全緑**（+6）/ build 成功。
- e2e: home-snippet 2件・home-cta-click 6件 緑（2回）。フルe2e 163件中157 passed・5 skipped。1件 fail は task1 由来 home-cta-click「最早クリック」のフルスイート並列負荷 flake（単体/結合では緑、本変更は CTA 位置に非関与、CI は retries:1 で吸収）。

## SEO 効果見込み（SERPスニペット品質・CTR）
- data-nosnippet によりデモ文字列がスニペットに使われなくなる（再クロール後）。
- 簡潔な description で Google が meta description を採用しやすくなり、「サンプル. AI 解説デモ. Q: 公開…」混入が解消、心理的価値の高いスニペットに。CTR 改善見込み。

## 次のステップ
本番反映後、Google 再クロール待ち（通常2〜4週）。その後 `site:kakomon-ai.jp` や実検索でホームのスニペットを確認し、デモ文字列が消え新 description（or HeroLede の良質本文）が表示されることを検証。GSC の URL 検査で再申請すると反映が早まる。

## 申し送り（重要・再掲の上エスカレーション）
`tests/e2e/home-cta-click.spec.ts:103`「最早クリック」テストが **task5・6・7 の3連続**でフルスイート並列負荷下 flake（単体は常に緑、CI は retries:1 で pass）。座標タイミング依存で、ローカルの「全e2e緑」ゲートを毎回阻害している。次マイクロタスクとして、当該テストの待機条件強化（例: boundingBox 取得前に `await expect(link).toBeVisible()` 後の短い安定待ち、または domcontentloaded ではなく CTA 静定を待ってから座標取得）で安定化することを提案する。
