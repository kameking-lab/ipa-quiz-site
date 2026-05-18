# ローンチ実行マスター手順書 — 過去問 AI

作成日: 2026-05-19
対象: 本人 (金田氏) による手動ローンチ実行
推定総所要時間: 16 分 (Step 1 から Step 5 まで)
本番ホスト: https://www.kakomon-ai.jp/

本ファイルは「Day-0 ローンチを 16 分で完了するための統合手順書」。
全 5 ステップを順番に実行することで、Twitter / note / GSC / Bing の手動投入と監視ダッシュボード確認を一通り完了する。

各ステップは対応する copy-paste 用 artifact を参照する形式。本ファイル単体では原稿は持たない (重複排除)。

---

## 全体タイムライン (推奨実行時刻)

平日 Day-0 朝の例:

- 07:55 JST: 本ファイルを開く、各 artifact のタブを開く
- 08:00 JST: Step 1 (Twitter 投稿) 開始
- 08:03 JST: Step 1 完了 / Step 2 (note 記事公開) 開始
- 08:08 JST: Step 2 完了 / Step 3 (GSC URL Inspection) 開始
- 08:13 JST: Step 3 完了 / Step 4 (Bing sitemap submit) 開始
- 08:14 JST: Step 4 完了 / Step 5 (監視ダッシュボード確認) 開始
- 08:16 JST: Step 5 完了 / 完了報告投稿

---

## Step 0 (準備 / 2 分)

下記タブを順に開いておく:

1. https://twitter.com/compose/tweet (Twitter 投稿画面)
2. https://note.com/ (note ログイン済)
3. https://search.google.com/search-console (GSC ログイン済)
4. https://www.bing.com/webmasters/ (Bing Webmaster Tools ログイン済)
5. https://www.kakomon-ai.jp/admin/launch-monitoring (本番監視ダッシュボード)
6. logs/twitter-launch-copy-paste.md (Twitter 原稿)
7. logs/note-launch-copy-paste.md (note 原稿)
8. logs/gsc-submit-copy-paste.md (GSC 投入リスト)
9. logs/bing-submit-copy-paste.md (Bing 投入手順)

事前準備が整っているか:
- @kakomon_ai_jp Twitter プロフィールの仕上げ確認 (アイコン・ヘッダー・固定ツイート)
- note カバー画像準備済 (推奨: 過去問 AI ホーム画面スクリーンショット 1280x670)
- 本番サイト主要 URL の 200 確認は Phase 6 で実施済

---

## Step 1 (3 分): Twitter 投稿

参照: logs/twitter-launch-copy-paste.md

1. logs/twitter-launch-copy-paste.md の「メインツイート」をコピペして投稿
2. そのツイートの「返信」として、スレッド 1 から 4 を順番に投稿
3. 各スレッドは 30 秒間隔で投稿 (連投スパム判定回避)
4. 投稿完了後、メインツイートをプロフィール固定ツイートに設定

完了条件:
- メインツイート + スレッド 4 本 = 計 5 ツイートが投稿済
- 固定ツイート設定済
- 各ツイートの URL が 200 で開く

---

## Step 2 (5 分): note 記事公開

参照: logs/note-launch-copy-paste.md

1. https://note.com/ で「投稿」→「テキスト」
2. logs/note-launch-copy-paste.md の「タイトル」をコピペ (代替 A/B も可)
3. 「本文」をコピペ
4. 「タグ一覧」を 5 個入力
5. カバー画像を設定 (推奨: ホーム画面スクリーンショット)
6. 「目次自動生成」を ON
7. 「公開」をクリック
8. 公開された note 記事 URL をコピー
9. Twitter メインツイートに引用ツイートで紐付け

完了条件:
- note 記事が公開状態
- 記事内 URL が全て 200 で開く
- Twitter メインツイートに note 記事の引用ツイートがある

---

## Step 3 (5 分): GSC URL Inspection 第一優先 8 URL

参照: logs/gsc-submit-copy-paste.md

重要: プロパティ切替を最初に確認すること (anzen-ai-portal.jp が既定の可能性)。

1. https://search.google.com/search-console にログイン
2. プロパティを「sc-domain:kakomon-ai.jp」(または https://www.kakomon-ai.jp/) に切替
3. logs/gsc-submit-copy-paste.md の「第一優先 8 URL」を 1 URL ずつ submit:
   - 上部「URL を検査」テキストボックスに貼り付け → Enter
   - 「インデックス登録をリクエスト」をクリック
   - 「インデックス登録をリクエストしました」のトースト確認
4. 8 URL 全て完了したら sitemap も submit:
   - 左メニュー「サイトマップ」→「sitemap.xml」を入力 → 送信

完了条件:
- 第一優先 8 URL 全てが「インデックス登録をリクエスト済」状態
- sitemap のステータスが「成功」または「保留中」
- 第二優先 10 URL は Day-1 に持ち越し

---

## Step 4 (1 分): Bing sitemap submit

参照: logs/bing-submit-copy-paste.md

1. https://www.bing.com/webmasters/ にログイン
2. プロパティ「kakomon-ai.jp」を選択
3. 左メニュー「サイトマップ」→ 既存 sitemap.xml 行右側「再送信」をクリック
   - 未登録の場合は「サイトマップを送信」に下記をコピペ:
     ```
     https://www.kakomon-ai.jp/sitemap.xml
     ```
4. 「送信」クリック → ステータス「保留中」→ 数分後「成功」確認

完了条件:
- Bing sitemap のステータスが「保留中」または「成功」
- 個別 URL Submission は任意 (時間があれば実施)

---

## Step 5 (2 分): /admin/launch-monitoring 確認

1. https://www.kakomon-ai.jp/admin/launch-monitoring を開く
2. 下記指標を目視確認:
   - 過去 1 時間の PV / UU (Twitter 投稿の効果が見え始める)
   - 過去 1 時間の AI コパイロット呼出数
   - エラー率 (Sentry / Vercel Logs ベース)
   - Gemini API コスト (月次累計)
3. 異常値があれば logs/launch-rollback-procedure.md の対応手順を参照

完了条件:
- ダッシュボードに正常な指標が表示されている
- 5xx エラー率が 1% 未満
- Gemini API コストが月次予算 (5 万円) の 60% 未満

---

## 完了報告フォーマット

下記フォーマットで Twitter DM または Slack に完了報告を送信:

```
ローンチ Day-0 実行完了報告
実行時刻: YYYY-MM-DD HH:MM JST

Step 1 Twitter: ✓ メインツイート + スレッド 4 本投稿済
  - メインツイート URL: https://twitter.com/kakomon_ai_jp/status/...
  - 固定ツイート設定済

Step 2 note: ✓ 記事公開済
  - 記事 URL: https://note.com/.../n/...
  - Twitter 引用ツイート紐付け済

Step 3 GSC: ✓ 第一優先 8 URL submit 済
  - sitemap.xml ステータス: 成功 / 保留中
  - 第二優先 10 URL は Day-1 に持ち越し

Step 4 Bing: ✓ sitemap 再送信済
  - sitemap.xml ステータス: 成功 / 保留中

Step 5 監視: ✓ ダッシュボード正常
  - PV (過去 1h): NNN
  - エラー率: 0.X%
  - Gemini API コスト (月次累計): N,NNN 円

異常検出: なし / あり (詳細記載)
次のアクション: 24 時間監視チェックリスト (logs/launch-day-monitoring-checklist.md) に移行
```

---

## 24 時間監視 (Day-0 完了後)

ローンチ完了後は下記チェックリストに沿って 24 時間の監視を継続:

参照: logs/launch-day-monitoring-checklist.md

主要チェックポイント:
- 1 時間後: Twitter エンゲージメント、note PV、Vercel エラー率
- 6 時間後: GSC インデックス状況、Bing クロール状況
- 12 時間後: Gemini API コスト累積、AI コパイロット呼出数
- 24 時間後: 全指標の総括、Day-1 への引継ぎ

---

## 緊急時の停止条件

以下のいずれかが発生した場合、即座に Step を中断して logs/launch-rollback-procedure.md を参照:

1. 本番サイトが 5xx 連発 (任意 5 分窓で 50% 以上)
2. Sentry エラー急増 (普段の 10 倍以上)
3. Gemini API 月次コストが 3 万円超 (5 万円上限の 60% 早期到達)
4. /api/feedback への明らかな攻撃 (1 分あたり 100 件以上)
5. 第三者から法的懸念の指摘 (著作権・景品表示・特商法)
6. 過去問道場さん運営から正式な異議申し立て

---

## 関連ドキュメント

- logs/twitter-launch-copy-paste.md (Step 1 原稿)
- logs/note-launch-copy-paste.md (Step 2 原稿)
- logs/gsc-submit-copy-paste.md (Step 3 投入リスト)
- logs/bing-submit-copy-paste.md (Step 4 投入手順)
- logs/launch-announcement-kit-final.md (告知素材の原典)
- logs/launch-day-monitoring-checklist.md (24 時間監視チェックリスト)
- logs/launch-rollback-procedure.md (緊急時ロールバック)
- logs/launch-pre-flight-checklist.md (投入前最終チェック)
