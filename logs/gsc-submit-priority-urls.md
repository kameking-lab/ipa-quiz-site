# GSC URL Inspection 優先順位リスト

作成日: 2026-05-18
対象: Google Search Console (kameking@anzen-ai.com)
本番ホスト: https://www.kakomon-ai.jp

GSC の URL Inspection ツールを用いた手動 submit の優先順位を定義する。
GSC は 1 日 10 URL/プロパティ程度のソフトリミットがあるため、3 日に分けて submit する。

---

## 第一優先 (Day-0 朝 09:00 JST submit) — 8 URL

ローンチ時点で最もインプレッションを期待するページ。
ハブ記事 + 主要ランディング + 教育貢献体裁を伝えるページ。

1. https://www.kakomon-ai.jp/ (トップページ)
2. https://www.kakomon-ai.jp/about (サービス概要・教育貢献体裁)
3. https://www.kakomon-ai.jp/transparency (透明性ページ・AI コンテンツ開示)
4. https://www.kakomon-ai.jp/operator (運営者情報・特商法)
5. https://www.kakomon-ai.jp/license (ライセンス・IPA 出典)
6. https://www.kakomon-ai.jp/essays/sc (午後論述 essays - SC)
7. https://www.kakomon-ai.jp/stats (受験者統計・差別化機能)
8. https://www.kakomon-ai.jp/blog (ブログハブ)

各 URL について実施:
- [ ] URL Inspection 実行
- [ ] 「インデックス登録をリクエスト」クリック
- [ ] Live test が PASS することを確認 (canonical, mobile-friendly, ロボット制御)
- [ ] スクリーンショットを保存 (logs/gsc-day0-screenshots/)

---

## 第二優先 (Day-1 朝 09:00 JST submit) — 10 URL

試験区分別の主要ランディング。Day-0 で十分な熱が伝わった段階で submit。

9. https://www.kakomon-ai.jp/ap (応用情報技術者試験)
10. https://www.kakomon-ai.jp/ip (IT パスポート)
11. https://www.kakomon-ai.jp/sg (情報セキュリティマネジメント)
12. https://www.kakomon-ai.jp/fe (基本情報技術者試験)
13. https://www.kakomon-ai.jp/sc (情報処理安全確保支援士)
14. https://www.kakomon-ai.jp/nw (ネットワークスペシャリスト)
15. https://www.kakomon-ai.jp/db (データベーススペシャリスト)
16. https://www.kakomon-ai.jp/pm (プロジェクトマネージャ)
17. https://www.kakomon-ai.jp/faq (FAQ)
18. https://www.kakomon-ai.jp/community-guidelines (コミュニティガイドライン)

---

## 第三優先 (Day-2〜Day-7 で順次 submit) — 残全件

ハブ記事・成功事例・SEO ロングテール記事を含む全 URL は sitemap.xml で Google に通知済。
手動 submit は重要 URL に絞り、残りはクロール待ちで自然インデックスを目指す。

任意で submit する場合の候補:

19. https://www.kakomon-ai.jp/blog/ap-passing-strategies (ハブ記事 1)
20. https://www.kakomon-ai.jp/blog/sc-essay-structure (ハブ記事 2)
21. https://www.kakomon-ai.jp/blog/ipa-application-guide (ハブ記事 3)
22. https://www.kakomon-ai.jp/success-stories (サクセスストーリーハブ)
23. https://www.kakomon-ai.jp/glossary (用語集)
24. https://www.kakomon-ai.jp/keywords (キーワード一覧)
25. https://www.kakomon-ai.jp/topics (トピック一覧)
26. https://www.kakomon-ai.jp/recommended-books (推奨書籍)
27. https://www.kakomon-ai.jp/mock-exam (模試)
28. https://www.kakomon-ai.jp/search (横断検索)

注: 上記 19-27 のうち実在しない URL は 404 となるため、submit 前に
`curl -sI https://www.kakomon-ai.jp/<path>` で 200 確認する。
404 となった URL は本リストから除外。

---

## submit 方法

1. https://search.google.com/search-console にログイン
2. プロパティ「sc-domain:kakomon-ai.jp」または「https://www.kakomon-ai.jp/」を選択
3. 上部の「URL Inspection」テキストボックスに対象 URL を貼り付け
4. Enter で検査開始
5. 「URL is on Google」または「URL is not on Google」を確認
6. 「Request Indexing」をクリック (Live test 実行 → submit)
7. 「Indexing requested」のトーストが出れば成功
8. 次の URL へ

---

## sitemap 全件 submit (補助)

URL Inspection だけでなく、sitemap 全体の submit も並行で実施:

1. GSC 左メニュー「Sitemaps」
2. 「Add a new sitemap」に下記を順次入力して送信:
   - `sitemap.xml` (本体)
   - 既に submit 済の場合は再 submit 不要、Status「Success」を確認するのみ

sitemap には 4136 URL + 30 追加 (PR #238) が含まれる。
sitemap submit により Google は段階的にクロール・インデックス化する。

---

## 確認指標

- 24 時間後: 第一優先 8 URL のうち、最低 5 件が「Indexed」または「Discovered」状態
- 72 時間後: 第二優先 10 URL のうち、最低 7 件が「Indexed」状態
- 7 日後: GSC「Coverage」レポートで Valid URL 数が 1000 を超える

進捗が遅い場合の対処:
- robots.txt 確認 (Disallow 漏れ)
- sitemap.xml の `<lastmod>` 値確認 (古すぎないか)
- canonical タグ確認 (重複認識されていないか)
- IndexNow 並行送信 (Bing/Yandex 経由)

---

## 関連ドキュメント

- logs/gsc-setup-guide.md (PR #241 で作成済)
- logs/bing-sitemap-resubmit-procedure.md
- logs/launch-execution-runbook.md
