# ローンチ 24 時間監視チェックリスト

作成日: 2026-05-18
対象期間: ローンチ Day-0 朝 08:00 JST 〜 Day-1 朝 08:00 JST (計 24 時間)
監視頻度: 4 時間ごと (08:00 / 12:00 / 16:00 / 20:00 / 00:00 / 04:00 / 08:00)
監視ダッシュボード: /admin/launch-monitoring (Basic Auth)

各回のチェックは 5-10 分で完了する想定。
異常検知時は本ファイル末尾の「対応手順」セクションを参照。

---

## チェック項目 (各回共通)

### 1. 本番サイト可用性 (curl 自動 or 手動 5 URL)

```bash
for u in / /about /transparency /q/ap /essays/sc; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://www.kakomon-ai.jp${u}")
  echo "$code https://www.kakomon-ai.jp${u}"
done
```

- 全 URL が 200 で返ること
- HTTPS 証明書エラーがないこと
- レスポンスタイム 3 秒以内

異常時: 「5xx エラー対応」セクションへ

### 2. API コスト確認

- /admin/api-usage を開く
- 当日合計コストが 1000 円未満であること (24 時間で 1000 円ペースなら月 3 万円 = 5 万円上限の 60%)
- 単一 IP からの呼出が 1 日 100 回を超えていないこと
- 単一エンドポイントの異常スパイクがないこと (copilot/essay-grade/generate-question/scoring)

異常時: 「コスト急増対応」セクションへ

### 3. エラー監視

- /admin/errors を開く (または Sentry プロジェクト)
- クリティカル (5xx, unhandled exception) が 0 件
- 警告レベルが 10 件未満
- 同一エラーの繰り返し発生 (3 回以上) がないこと

異常時: 「エラー発生対応」セクションへ

### 4. フィードバック受信箱

- /admin/feedback を開く
- 未対応フィードバックが 5 件以下
- スパム判定漏れがないこと
- 緊急性の高い報告 (バグ・誤回答指摘) があれば即対応

異常時: 「フィードバック急増対応」セクションへ

### 5. Twitter @kakomon_ai_jp 反応確認

- リツイート数・引用 RT 数・リプライ数を記録
- ネガティブ反応の有無を確認
- 過去問道場さん運営からの言及がないか確認 (敬意を持って反応)
- インプレッション数の異常 (10,000 超 = 高評価 or バズ)

異常時: 「炎上対応」セクションへ

### 6. note PV 確認

- note ダッシュボードを開く
- 投稿の PV・スキ数・コメント数を記録
- ネガティブコメントの有無

### 7. GSC Coverage (Day-0 翌朝の 04:00 / 08:00 のみ)

- https://search.google.com/search-console
- 第一優先 8 URL のうち「Indexed」「Discovered」が 5 件以上
- 「Excluded」「Error」が 3 件以上の場合は原因確認 (robots.txt / canonical / 5xx)

### 8. PostHog リアルタイムイベント

- PostHog ダッシュボードでリアルタイム sessions
- 異常な bot 流入 (1 秒あたり 10 件超のページビュー) がないこと

---

## 監視ログ記入欄

| 時刻 (JST) | 200確認 | API合計¥ | エラー件数 | フィードバック未対応 | Twitter インプ | note PV | 異常検知 |
|-----------|--------|---------|----------|------------------|--------------|--------|---------|
| 08:00 (Day-0) |  |  |  |  |  |  |  |
| 12:00 |  |  |  |  |  |  |  |
| 16:00 |  |  |  |  |  |  |  |
| 20:00 |  |  |  |  |  |  |  |
| 00:00 (Day-1) |  |  |  |  |  |  |  |
| 04:00 |  |  |  |  |  |  |  |
| 08:00 |  |  |  |  |  |  |  |

(表形式だが、本ファイルは手元メモ用なので可読性を優先。Slack/Discord 等への報告は別途プレーンテキストで)

---

## 対応手順

### 5xx エラー対応

1. Vercel ダッシュボード → Functions → 該当エンドポイントのログを確認
2. エラー原因が判明したら logs/launch-rollback-procedure.md の手順 1 (個別 PR revert) を検討
3. 致命的 (全 URL が 5xx) の場合は手順 2 (本番ロールバック) を即実行
4. 復旧後、Twitter で簡潔に報告:
   ```
   一時的なエラーが発生し、ご不便をおかけしました。復旧済みです。引き続きどうぞ。
   ```

### コスト急増対応

1. /admin/api-usage で原因 IP・エンドポイントを特定
2. 単一 IP が 1 日 500 回超 → app/api/* の rate-limit 強化を即実装 (PR)
3. 単一エンドポイントが日平均の 10 倍 → スパム判定ロジック追加
4. 日合計が 3000 円超 (月 9 万円ペース) → 一時的に新規 AI リクエストを停止 (kill switch 起動)
5. Slack 通知設定済の場合は自動通知が来ている

kill switch: lib/admin/feature-flags.ts の AI_KILL_SWITCH を true に切替 (Vercel env)

### エラー発生対応

1. Sentry でスタックトレース確認
2. 既知の問題か (CLAUDE.md / 過去 PR を grep)
3. 未知の致命的バグ → 緊急 PR で修正、Vercel に hotfix deploy
4. 軽微な UI 不具合 → 翌日対応で OK、ローンチを止めない

### フィードバック急増対応

1. 内容を一読し、緊急対応必要 (誤回答・著作権・誤情報) を仕分け
2. 緊急対応:
   - 誤回答報告: 当該問題を一時的に hide (lib/questions/types.ts に hidden flag を追加)
   - 著作権: 該当コンテンツを即時 noindex + delete 検討
   - 誤情報: 当該ページに警告バナー
3. その他: 後日対応で OK、Twitter 等で受信した旨を返信のみ

### 炎上対応

1. ネガティブ反応の内容を確認
2. 正当な指摘 → 真摯に対応 (謝罪・修正コミット)
3. 不正確な攻撃 → 反応せず、第三者に説明可能な事実を整理
4. 過去問道場さん運営からの言及 → 敬意を持って反応、必要なら DM で誠実に対話
5. 法的懸念の指摘 → 即座にローンチ停止検討、logs/launch-rollback-procedure.md 参照

---

## ローンチ成功判定 (Day-1 朝 08:00 時点)

下記 4 つすべて満たせば「ローンチ成功」と判定:

- [ ] 24 時間で 5xx 発生 0 件 (または 1 件以下、復旧済)
- [ ] API 当日合計コスト 3000 円未満
- [ ] 致命的フィードバック 0 件
- [ ] サービス停止イベント 0 件

成功時のアクション:
- @kakomon_ai_jp で「ローンチ初日のご利用ありがとうございました」ツイート
- フィードバック総数を集計、優先度付け
- Week-1 改善計画ドラフト (logs/launch-week1-plan.md を新規作成)

---

## Day-2 以降の監視

24 時間経過後は 12 時間ごとの監視に切替:
- Day-1 〜 Day-7: 朝 08:00 / 夜 20:00
- Day-8 〜 Day-30: 毎日朝 08:00 のみ
- Day-31 以降: 週次レビュー (毎週月曜)

---

## 関連ドキュメント

- /admin/launch-monitoring (内部ダッシュボード)
- logs/launch-pre-flight-checklist.md (投入前最終チェック)
- logs/launch-post-monitoring.md (ローンチ後監視手順 - 詳細版)
- logs/launch-rollback-procedure.md (緊急時ロールバック)
- logs/launch-execution-runbook.md (ローンチ実行手順書)
- logs/launch-announcement-kit-final.md (告知素材最終版)
