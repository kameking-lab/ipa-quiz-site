# アフィリエイトセットアップガイド

`/recommended-books` 配下の書籍カードは、`data/recommended-books.ts` の `asin` / `rakutenId` フィールドが
プレースホルダーの間はリンクボタンが非表示になります。本ドキュメントでは、これらの ID を取得し
一括で更新する手順をまとめます。

## 1. 環境変数

`.env.local`（および Vercel の Environment Variables）に以下を設定してください。

```bash
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=safeaisite22-22
NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID=5291f19d.a0fc3c16.5291f19e.b91d11f6
```

`NEXT_PUBLIC_` プレフィックスがあるため、ブラウザ側のリンク生成にも反映されます。

## 2. Amazon ASIN の取得

1. [Amazon.co.jp](https://www.amazon.co.jp/) で対象書籍を検索
2. 商品詳細ページの URL から `dp/` の直後の 10 文字英数字を抜き出す
   - 例: `https://www.amazon.co.jp/dp/4798175498/...` → ASIN は `4798175498`
3. 商品ページ下部の「登録情報」欄でも ASIN を確認可能

最新版（年度改訂された問題集）を採用するため、毎年 12 月〜1 月頃に
最新刊の ASIN へ更新するのがおすすめです。

## 3. 楽天商品 ID の取得

1. [楽天ブックス](https://books.rakuten.co.jp/) で対象書籍を検索
2. 商品ページ URL の末尾セグメントが商品 ID
   - 例: `https://books.rakuten.co.jp/rb/17812345/` → 商品 ID は `17812345`

楽天の商品 ID は版改訂のたびに変わるため、Amazon と同じタイミングで更新します。

## 4. 一括更新フロー

`data/recommended-books.ts` を直接編集します。

```ts
{
  id: "ap-otaki-okajima",
  title: "応用情報技術者 合格教本",
  ...
  asin: "4297139987",            // ← ASIN_TO_BE_FILLED から差し替え
  rakutenId: "17812345",         // ← RAKUTEN_ID_TO_BE_FILLED から差し替え
  ...
},
```

更新後の確認:

```bash
pnpm typecheck
pnpm build
pnpm dev
# → http://localhost:3000/recommended-books/ap で
#    Amazon/楽天ボタンが表示されることを確認
```

## 5. リンク仕様

- Amazon: `https://www.amazon.co.jp/dp/{ASIN}?tag={NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG}`
- 楽天: `https://hb.afl.rakuten.co.jp/hgc/{NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID}/?pc={商品URL}`

リンクには必ず `rel="noopener noreferrer sponsored"` と `target="_blank"` を付与しています
（`app/recommended-books/[exam]/page.tsx` の `BookCard` コンポーネント参照）。

## 6. プレースホルダー判定

`data/recommended-books.ts` の `isAsinFilled()` / `isRakutenIdFilled()` ヘルパーで
プレースホルダー文字列 (`ASIN_TO_BE_FILLED` / `RAKUTEN_ID_TO_BE_FILLED`) または空文字を判定し、
未入力の場合はリンクボタンを非表示にします。

両方のリンクが未入力の場合は「※ 購入リンク準備中」と表示されます。

## 7. 法的配慮チェックリスト

- [x] 各 `/recommended-books/*` ページにアフィリエイト免責文を表示
- [x] `/terms` の「アフィリエイトリンクについて」項目を最新化
- [x] `rel="sponsored"` をリンクに付与（Google ガイドライン準拠）
- [x] Amazon アソシエイト規約に基づく開示文を `/terms` に明記
- [ ] 価格・在庫はリンク先表示が正であることをページに明示（実装済み）
- [ ] 商品画像を本サイトに転載しない（規約遵守のためテキストのみ運用）

## 8. 効果計測

- Amazon: Amazon アソシエイトの「リンクタイプレポート」で `recommended-books` 流入を確認
- 楽天: 楽天アフィリエイトのレポートで参照元 URL ごとに集計

タグやチャネルを試験区分別に分けたい場合は、Amazon の SiteStripe 機能で個別タグを発行することも検討できます。
