# ローンチ実行手順書 (per-artifact 承認フロー)

作成日: 2026-05-18
対象: 過去問 AI ローンチ Day-0
実行方式: Chrome agent (claude-in-chrome MCP) + 本人 per-artifact 承認
所要時間: 2-3 時間 (本人の承認待ち時間を含む)

本手順書は Chrome agent を用いたローンチ実行と、各 artifact 投稿前の本人承認フローを定義する。
セキュリティ・誠実性最優先で、誇大表現・スパム・著作権リスクを排除する。

---

## 0. セッション全体の前提

### 0.1 役割分担

- **本人 (金田氏)**: 各 artifact の最終承認、Twitter/note/GSC/Bing への実投稿実行
- **Chrome agent**: 本人の指示に従いブラウザ操作補助、内容草案生成、確認用 URL 開示
- **Claude Code (バックエンド側)**: コード修正・Dispatch 投入は別途、本ローンチには関与しない

### 0.2 セキュリティガイドライン

Chrome agent は以下を厳守する:
- 本人の明示承認なしに投稿ボタンをクリックしない (DM, ツイート投稿, note公開ボタン)
- 認証情報 (Twitter password, note password, GSC OAuth token 等) を取得・記録しない
- 第三者アカウントへのリプライ/DM 送信は本人の指示時のみ
- ブラウザ拡張機能の追加・削除は実施しない
- 履歴削除・Cookie 削除は実施しない

### 0.3 異常時の停止条件

下記のいずれかが発生した場合、Chrome agent は作業を一時停止し本人に報告:
1. 投稿前確認で誇大表現・URL誤り・文字数オーバーを検知
2. 本人想定外の画面遷移 (2 要素認証要求等)
3. Twitter/note 側で「あなたのアカウントが制限されました」等の警告
4. 公開予定の URL が 404/5xx を返す
5. 投稿前確認チェックリストの 1 項目でも未確認

---

## 1. 事前準備チェックリスト (Day-0 朝 07:00 JST までに完了)

### 1.1 インフラ・本番サイト確認

- [ ] Vercel block 解除確認 (`vercel.com/dashboard` で deploy 状態緑色)
- [ ] 本番サイト主要 URL の 200 確認 (logs/launch-execution-runbook.md 末尾「事前curl確認」セクション参照)
- [ ] /admin/launch-monitoring が Basic Auth 経由で開けることを確認
- [ ] /admin/api-usage で前日の API コストが想定範囲内 (1000 円未満)
- [ ] Sentry プロジェクトでクリティカルエラー 0 件

### 1.2 各サービスログイン確認

- [ ] Twitter @kakomon_ai_jp にログイン済 (ブラウザ)
- [ ] note 本人アカウントにログイン済
- [ ] Google Search Console (kameking@anzen-ai.com) にログイン済
- [ ] Bing Webmaster Tools にログイン済
- [ ] GitHub アクセス確認 (本人 push 可能)
- [ ] Vercel ダッシュボードログイン確認

### 1.3 ドキュメント参照準備

下記を別タブで開いておく:
- logs/launch-announcement-kit-final.md (告知素材最終版)
- logs/gsc-submit-priority-urls.md (GSC 優先 URL)
- logs/bing-sitemap-resubmit-procedure.md (Bing 手順)
- logs/launch-day-monitoring-checklist.md (24時間監視)

---

## 2. Chrome agent 投入プロンプト (完成版)

以下のプロンプトを Chrome agent (claude-in-chrome MCP) のセッション開始時に投入する。
本人が直接コピー＆ペーストして使用する想定。

---

```text
あなたは過去問 AI (https://www.kakomon-ai.jp) のローンチ実行をブラウザ操作で補助する agent です。

【最優先ルール】
1. per-artifact 承認フロー厳守: いかなる投稿ボタン (Twitter ツイート, note 公開, GSC submit,
   Bing submit, リプライ送信等) も、本人の明示承認なしにクリックしない。
   投稿前は必ず「下記内容で投稿しますか? Y/N」と本人に確認する。
2. 投稿前に必ず内容を提示: 文字数・URL・ハッシュタグを明示し、誇大表現がないか自己点検する。
3. 認証情報は取得・記録しない: パスワード入力欄を読まない、スクリーンショットに含めない。
4. 第三者アカウントへの自発的リプライ・DM は厳禁。本人の指示時のみ実行。
5. 異常検知時は即座に停止し本人に報告。

【投稿内容の出所】
すべての投稿原稿は logs/launch-announcement-kit-final.md からコピー&ペーストする。
原稿の改変は本人の指示時のみ。誇大表現の混入を絶対に避ける。

【実行手順】

Step 1: Twitter スレッド投稿 (朝 08:00 JST)
1.1 Twitter (https://twitter.com/compose/post) を開く
1.2 logs/launch-announcement-kit-final.md の「ツイート 1」本文を貼り付け
1.3 文字数を確認 (140 字以内)、URL が正確、ハッシュタグ 2 個
1.4 本人に「下記内容で投稿しますか? Y/N」確認 → Y なら本人がツイートボタンをクリック
1.5 投稿後の URL を取得し記録
1.6 1.5 のツイートに対する返信としてツイート 2-5 を順次投稿 (各 30 秒間隔)
    各ツイートで 1.3-1.5 を繰り返す

Step 2: note 記事公開 (朝 08:30 JST)
2.1 note 投稿画面 (https://note.com/notes/new) を開く
2.2 logs/launch-announcement-kit-final.md の「note 記事原稿」を貼り付け
2.3 タイトル A/B/C から本人選択版を採用
2.4 カバー画像: 本人手元のスクリーンショットをアップロード (画像ファイルは本人指定)
2.5 ハッシュタグ: #IPA試験 #応用情報 #情報処理技術者試験 #個人開発 #教育貢献
2.6 「公開」ボタン前に本人に確認 → Y なら本人がクリック
2.7 公開後の note 記事 URL を取得し記録

Step 3: GSC URL Inspection (朝 09:00 JST)
3.1 GSC (https://search.google.com/search-console) を開く
3.2 logs/gsc-submit-priority-urls.md の「第一優先 8 URL」を順次 submit
3.3 各 URL の Live test PASS を確認、Request Indexing 前に本人承認
3.4 8 件完了後、「sitemap 全件 submit」セクションも実行 (Sitemaps → Resubmit)

Step 4: Bing sitemap 再 submit (朝 09:30 JST)
4.1 Bing Webmaster Tools (https://www.bing.com/webmasters/sitemaps) を開く
4.2 既存の sitemap.xml 行で「Resubmit」をクリック (本人承認後)
4.3 logs/bing-sitemap-resubmit-procedure.md の「URL Submission」優先 URL を実行

Step 5: 投稿後の確認 (朝 10:00 JST)
5.1 Twitter スレッド 5 本の URL を本人に提示
5.2 note 記事 URL を本人に提示
5.3 GSC・Bing の submit 完了スクリーンショットを保存場所提示
5.4 /admin/launch-monitoring を開いて初期状態を記録

【完了報告フォーマット (本人向け、プレーンテキスト)】
- Twitter スレッド: 投稿時刻、5 本の URL、初期インプレッション数
- note 記事: 公開時刻、URL、初期 PV
- GSC: submit 完了 URL 数、Indexing requested 数
- Bing: sitemap submit Status、URL Submission 完了数
- 異常検知: 有無、内容、対応推奨

【厳禁事項】
- 過去問道場 (siken.com) を否定する形での比較投稿
- IPA 公式・他社アカウントへの言及や mentions
- インフルエンサー擬装、なりすまし、虚偽の権威付け
- 「業界最強」「No.1」「圧倒的」等の誇大表現
- 短時間 (1 分未満) での連続投稿
- 第三者アカウントへの自発的 DM・リプライ
- ハッシュタグ 3 個超の詰め込み
```

---

## 3. 本人承認チェックポイント (各 artifact)

各 artifact 投稿前に本人が確認するチェックリスト。
Chrome agent が「下記内容で投稿しますか?」と聞いた時に、以下を 30 秒で確認:

### 3.1 Twitter ツイート (各 1-5)

- [ ] 文字数 140 以内 (URL は 23 字換算)
- [ ] URL が `https://www.kakomon-ai.jp` で正確 (末尾スラッシュ無し)
- [ ] ハッシュタグ 2 個まで
- [ ] 誇大表現なし (「最強」「No.1」「圧倒的」「絶対」)
- [ ] 過去問道場さんを否定する表現なし
- [ ] 数値が正確 (AI 利用は初回 10 回 + フィードバック後ほぼ無制限, 全 13 区分。価格は現状無料で具体額を出さない)
- [ ] 改行・絵文字が想定通り
- [ ] スレッド構造で投稿 (ツイート 2-5 はツイート 1 への返信)

### 3.2 note 記事

- [ ] タイトル選択 (A/B/C のいずれか)
- [ ] リード文 280 字以内
- [ ] 本文中の URL 全て 200 (Chrome agent に curl 確認させる)
- [ ] 競合 (過去問道場) を敬称付きで明記
- [ ] 教育貢献体裁の一貫性
- [ ] 誇大表現なし
- [ ] 「現在は全機能完全無料」と明示、プレミアム価格は具体額を出さず将来計画として記載
- [ ] カバー画像: ホーム画面スクリーンショット (1280×670 以上)
- [ ] 目次自動生成 ON

### 3.3 GSC URL submit

- [ ] URL が 200 で開く (Live test PASS)
- [ ] canonical タグが正しい
- [ ] mobile-friendly テスト PASS
- [ ] robots.txt で許可
- [ ] 第一優先 8 URL のみ Day-0 で submit

### 3.4 Bing sitemap submit

- [ ] sitemap.xml が 200 で開く
- [ ] sitemap index 子ファイルも 200 で開く
- [ ] URL count が想定 (4136+) と一致

---

## 4. 投稿後の確認項目

### 4.1 即時確認 (投稿後 5 分以内)

- [ ] Twitter ツイートが想定通り表示 (改行・URL展開・スレッド表示)
- [ ] note 記事が公開状態 (URL を別ブラウザ/シークレットで確認)
- [ ] GSC submit が「Indexing requested」になっている
- [ ] Bing submit が「Submitted」または「Pending」になっている

### 4.2 30 分後確認

- [ ] Twitter インプレッション・エンゲージメント (リアルタイム)
- [ ] note PV (note ダッシュボード)
- [ ] /admin/launch-monitoring で異常なし
- [ ] /admin/api-usage で当日コスト確認 (1000 円未満)

### 4.3 ローンチ完了後の即時タスク

ローンチ完了 (全 artifact 投稿) 直後に実施:

1. **24時間監視開始**
   - logs/launch-day-monitoring-checklist.md のテーブル記入開始
   - 12:00 / 16:00 / 20:00 / 00:00 / 04:00 / 08:00 のリマインダー設定

2. **/admin/launch-monitoring 確認**
   - Day-0 朝 10:00 時点のスナップショット取得
   - 観測基盤 (PostHog/Sentry/IndexNow/KV) の設定状況確認

3. **フィードバック受信窓口準備**
   - /admin/feedback を開いておく
   - Twitter @kakomon_ai_jp のリプライ通知 ON
   - note コメント通知 ON

4. **Slack/Discord 告知 (任意、ルール厳守)**
   - logs/launch-announcement-kit-final.md「コミュニティ告知文言」参照
   - 1 コミュニティにつき 1 度のみ投稿
   - 反応がなくても重ねて告知しない

---

## 5. 事前 curl 確認 (Day-0 朝 07:00 JST)

ローンチ前に本番サイトの主要 URL が 200 で開くか確認。
Vercel block 中でも edge cache から 200 が返るはず。

```bash
URLS=(
  "/"
  "/about"
  "/transparency"
  "/operator"
  "/license"
  "/privacy"
  "/terms"
  "/community-guidelines"
  "/contact"
  "/faq"
  "/stats"
  "/blog"
  "/essays/sc"
  "/ap"
  "/ip"
  "/sg"
  "/fe"
  "/sc"
)

for u in "${URLS[@]}"; do
  code=$(curl -sI -o /dev/null -w "%{http_code}" "https://www.kakomon-ai.jp${u}")
  echo "$code $u"
done
```

期待結果:
- 全 URL が 200 (リダイレクトの場合は 301/308 → 200 が許容)
- 5xx が 1 件でも出たらローンチ延期検討

---

## 6. 緊急停止手順

ローンチ中に致命的問題が発覚した場合:

### 6.1 軽微 (継続可能)

- 例: 1 ツイートに typo
- 対応: 本人が削除 → 再投稿 (Twitter)、note 記事編集 (note は事後編集可)
- ローンチ全体は継続

### 6.2 中度 (一部停止)

- 例: 1 URL が 5xx、フィードバック殺到
- 対応: 該当 URL を一時的に noindex、Twitter スレッドの該当 URL ツイートを削除
- 他の artifact 投稿は継続判断

### 6.3 致命的 (全停止)

- 例: 本番サイト全面 5xx、法的懸念の正式指摘
- 対応:
  1. Twitter で簡潔に告知:
     ```
     現在一部機能に問題が発生しており、対応中です。ご迷惑をおかけします。
     ```
  2. note 記事を非公開 (note は下書き戻し可能)
  3. logs/launch-rollback-procedure.md の手順に従う
  4. 本人意思決定: ローンチ延期 or 修正後再開

---

## 7. ローンチ後 24 時間の本人タスク

タイムライン:

| 時刻 (JST) | タスク | 所要時間 |
|-----------|--------|---------|
| Day-0 08:00 | Twitter スレッド投稿 | 15 分 |
| Day-0 08:30 | note 記事公開 | 30 分 |
| Day-0 09:00 | GSC 第一優先 8 URL submit | 20 分 |
| Day-0 09:30 | Bing sitemap 再 submit | 10 分 |
| Day-0 10:00 | /admin/launch-monitoring 初期確認 | 10 分 |
| Day-0 12:00 | 第 1 回監視チェック | 10 分 |
| Day-0 16:00 | 第 2 回監視チェック + フィードバック対応 | 20 分 |
| Day-0 20:00 | 第 3 回監視チェック + Twitter 反応確認 | 20 分 |
| Day-1 00:00 | 第 4 回監視チェック (任意、朝に統合可) | 10 分 |
| Day-1 08:00 | 24時間サマリ + Day-1 タスク策定 | 30 分 |

合計: 約 3 時間 (24 時間中)

---

## 8. 関連ドキュメント

- logs/launch-announcement-kit-final.md: 告知素材 (Twitter/note 原稿)
- logs/gsc-submit-priority-urls.md: GSC 優先 URL
- logs/bing-sitemap-resubmit-procedure.md: Bing 手順
- logs/launch-day-monitoring-checklist.md: 24時間監視
- logs/launch-pre-flight-checklist.md: 事前最終チェック
- logs/launch-post-monitoring.md: 詳細監視手順
- logs/launch-rollback-procedure.md: 緊急ロールバック
- /admin/launch-monitoring: 内部ダッシュボード (Basic Auth)
