# GSC URL Inspection 個別申請対象リスト（確定版）

作成日: 2026-05-16
前提: IndexNow で 4,136 URL 一括申請済み（logs/indexnow-final-submit.md 参照）
本ファイル: GSC の URL 検査機能で個別申請する優先度別リスト（確定版）

基本手順は logs/gsc-url-inspection-guide.md を参照。
本ファイルはそちらと重複しない形で「確定版リスト」を提供する。

---

## GSC URL 検査の操作手順（要約）

1. https://search.google.com/search-console を開く
2. プロパティ: https://www.kakomon-ai.jp/ を選択
3. 左ナビ「URL 検査」をクリック
4. 検索バーにURLを貼り付けて Enter
5. 「インデックス登録をリクエスト」ボタンをクリック
6. 「リクエストされました」を確認して次へ
7. 間隔: 各URL申請後に2〜3秒待つ

上限: 1日あたり 50〜200件程度（Google非公表）。本日は最優先18本のみ申請を推奨。

---

## 最優先: 本日中に申請（18 URL）

本日追加のハブ記事 + 核心ページ。今日のうちに必ず申請する。

申請順に実施してください:

1.  https://www.kakomon-ai.jp/
2.  https://www.kakomon-ai.jp/stats
3.  https://www.kakomon-ai.jp/about
4.  https://www.kakomon-ai.jp/transparency
5.  https://www.kakomon-ai.jp/blog/kakumon-gakushuu-science
6.  https://www.kakomon-ai.jp/blog/ap-goukaku-go-koudo-senryaku
7.  https://www.kakomon-ai.jp/blog/ipa-shiken-kumi-awase-senryaku
8.  https://www.kakomon-ai.jp/blog/ipa-kyoutsuu-juyou-theme
9.  https://www.kakomon-ai.jp/blog/ipa-sanko-mondaishu-2026
10. https://www.kakomon-ai.jp/blog
11. https://www.kakomon-ai.jp/privacy
12. https://www.kakomon-ai.jp/faq
13. https://www.kakomon-ai.jp/contact
14. https://www.kakomon-ai.jp/essays/sc
15. https://www.kakomon-ai.jp/essays/ap
16. https://www.kakomon-ai.jp/essays/nw
17. https://www.kakomon-ai.jp/essays/db
18. https://www.kakomon-ai.jp/essays/pm

---

## 高優先: 本日中または翌日（13 URL）

13 試験区分トップページ。上記18本の後に申請する。

19. https://www.kakomon-ai.jp/ip
20. https://www.kakomon-ai.jp/sg
21. https://www.kakomon-ai.jp/fe
22. https://www.kakomon-ai.jp/ap
23. https://www.kakomon-ai.jp/st
24. https://www.kakomon-ai.jp/sa
25. https://www.kakomon-ai.jp/pm
26. https://www.kakomon-ai.jp/nw
27. https://www.kakomon-ai.jp/db
28. https://www.kakomon-ai.jp/es
29. https://www.kakomon-ai.jp/sc
30. https://www.kakomon-ai.jp/sm
31. https://www.kakomon-ai.jp/au

---

## 中優先: 明日以降（主要ブログ記事 20 本程度）

IndexNow 送信済みだが、GSC の「カバレッジ」でインデックス状況を確認してから申請する。

確認方法: GSC > 「インデックス登録」 > 「ページ」 > フィルタで /blog を検索 > 「クロール済み - 現在インデックス未登録」のものを優先申請

代表的なブログ URL（既存記事）:
- https://www.kakomon-ai.jp/blog/ipa-shiken-zenkubun-hikaku
- https://www.kakomon-ai.jp/blog/ap-goukaku-benkyouhou
- https://www.kakomon-ai.jp/blog/sc-goukaku-benkyouhou
- https://www.kakomon-ai.jp/blog/fe-goukaku-benkyouhou
- https://www.kakomon-ai.jp/blog/ipa-am1-kyoutsuu-taisaku
- https://www.kakomon-ai.jp/blog/nw-goukaku-benkyouhou
- https://www.kakomon-ai.jp/blog/db-goukaku-benkyouhou
- https://www.kakomon-ai.jp/blog/pm-goukaku-benkyouhou
- https://www.kakomon-ai.jp/blog/it-passport-benkyouhou
- https://www.kakomon-ai.jp/blog/sg-goukaku-benkyouhou

目標: 明日以降 3日間で 20〜30 本を申請する。

---

## 低優先: 自然クロール待ち

essays 個別ページ・個別問題ページは IndexNow 送信済みのため自然クロールを待つ。

2〜4 週間後に GSC のカバレッジレポートを確認し、
「クロール済み - 現在インデックス未登録」が多数残っている場合は個別申請を検討する。

---

## 申請状況の記録

実施日と件数をここに追記してください（本人メモ用）:

| 日付 | 申請件数 | 累計件数 | メモ |
|------|---------|---------|------|
| 2026-05-16 | - | - | ローンチ当日 |

---

## 効果確認タイミング

申請後 3〜7 日で GSC パフォーマンスレポートに表示が出始める。
1〜2 週間後に以下を確認:
- 申請URLの「インデックス登録済み」への移行率
- 検索パフォーマンス: 表示回数の変化（ゼロ → 10回/日以上になるか）
- クリック率: タイトル・ディスクリプションが適切か判断

---

## Bing Webmaster Tools（並行実施）

Bing にも同様の個別申請機能あり。

手順:
1. https://www.bing.com/webmasters を開く
2. プロパティ: kakomon-ai.jp を選択
3. 「URL 送信」 > 「今すぐ」タブで最優先 10 URL を入力
4. 「送信」ボタンをクリック

対象: 最優先18本と同じURLを Bing にも送信する。
