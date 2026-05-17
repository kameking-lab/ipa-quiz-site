# 障害復旧プレイブック (Disaster Recovery Playbook)

作成日: 2026-05-17
対象: 過去問AI (https://www.kakomon-ai.jp)
運用体制: ボランティア有志 / ソロ運営
前提: Vercel Hobby Plan、Gemini API、PostHog Cloud、Sentry

本ファイルは logs/launch-rollback-procedure.md (PR #244) の内容を吸収・拡充したものです。
単純な手順書として設計し、障害発生時に判断コストを最小化することを目的とします。

---

## 障害レベル判定マトリクス

レベル1 (軽微・継続運用)
- 一部UIの表示崩れ、Sentry 登録済みの既知エラー
- 対応: 次の通常 PR で修正。ユーザー告知不要

レベル2 (中程度・部分機能停止)
- AIコパイロットの断続的エラー、特定ページの 500 エラー
- 対応: 機能別 kill switch で部分停止。Twitter 告知

レベル3 (致命的・即時ロールバック)
- サイト全体 500 エラー、データ漏洩疑い、Vercel デプロイ不能
- 対応: Vercel Dashboard でロールバック→ Twitter 告知→原因特定

---

## シナリオ別復旧手順

---

### シナリオ1: Vercel 本番デプロイ全停止

影響度: レベル3 (サービス全停止)
検知方法:
- Vercel Status (https://www.vercel-status.com) が disruption を報告
- Sentry で大量の 503/504 エラー通知
- https://www.kakomon-ai.jp が表示されない

復旧手順:
1. https://www.vercel-status.com を確認する
2. Vercel 側の障害なら復旧を待つ（対応は不要、SLA 上 99.99% uptime）
3. 自分のデプロイ起因なら Vercel Dashboard > Deployments > 直前の安定版 > Promote to Production
4. main HEAD が壊れている場合: git revert HEAD && git push で自動再デプロイ

復旧時間目安: Vercel 障害なら 15〜60 分待機。自分起因なら 5 分以内

ユーザー告知:
発生時: 「【障害情報】現在サービスにアクセスしにくい状況が発生しています。復旧作業中です。」
復旧時: 「【復旧完了】先ほどの障害が解消されました。ご不便をおかけしました。」
告知先: Twitter @kakomon_ai_jp

Vercel ロールバック詳細手順:
1. https://vercel.com/dashboard を開く
2. ipa-quiz-site プロジェクトを選択
3. Deployments タブを開く
4. 安定稼働していた直前のデプロイを探す（障害前の SHA を確認）
5. ...（ケバブメニュー）> Promote to Production をクリック
6. Promote を確認
7. 1〜2 分で本番に反映される
8. https://www.kakomon-ai.jp でホーム・クイズ・コパイロットを確認

---

### シナリオ2: LLM API 障害 (Gemini)

影響度: レベル2 (AIコパイロット全停止、クイズは正常)
検知方法:
- Sentry で app/api/copilot に大量 500 エラー
- https://status.cloud.google.com で Gemini API disruption
- ユーザーから「AIが動かない」の報告

復旧手順:
A. Gemini 側の障害の場合:
1. https://status.cloud.google.com を確認
2. モックフォールバックへ切り替え (GEMINI_API_KEY を一時的に空に)
   Vercel Dashboard > Settings > Environment Variables > GEMINI_API_KEY > 値を削除
3. Vercel が自動再デプロイ（1〜2 分）
4. コパイロットが「現在 AI サービスは利用できません」メッセージを返すことを確認
5. Gemini 復旧後、GEMINI_API_KEY を元の値に戻して再デプロイ

B. アプリコード起因の場合:
1. Sentry のエラー詳細からスタックトレースを確認
2. lib/ai/provider.ts または providers/gemini.ts の問題を特定
3. hotfix ブランチを切って修正 → main マージ → 自動デプロイ

復旧時間目安: Gemini 障害なら復旧待ち。自分起因なら 30〜60 分

モックモードの動作:
- クイズ機能・問題表示: 正常
- AIコパイロット: 固定メッセージ「現在 AI サービスは一時停止中です。通常通りクイズはご利用いただけます。」

ユーザー告知: 「AIコパイロットが一時停止中です。クイズ機能は通常通りご利用いただけます。」

---

### シナリオ3: PostHog 障害

影響度: レベル1 (分析停止のみ、ユーザー機能は無影響)
検知方法:
- https://status.posthog.com で障害報告
- ブラウザコンソールで PostHog 接続エラー

復旧手順:
PostHog は非クリティカルな外部サービスのため、障害時も放置でよい。
components/PostHogProvider.tsx は try/catch でラップ済みのため、
PostHog が落ちてもアプリは正常動作する。

アクション: なし。PostHog が自動復旧するのを待つ。

ユーザー告知: 不要（ユーザーに影響なし）

---

### シナリオ4: AIコパイロット異常応答

影響度: レベル2 (AI 品質問題)
検知方法:
- ユーザーからの報告（Twitter DM・feedback）
- Sentry に特定パターンのエラー
- AIが不適切・有害なコンテンツを返すリスク

復旧手順:
A. 応答品質の劣化（的外れ回答など）:
1. lib/ai/prompts.ts の COPILOT_SYSTEM_PROMPT を確認
2. 問題のあるプロンプト部分を特定して修正
3. PR 作成 → main マージ（承認必須事項: 大幅変更は要確認）

B. 有害コンテンツ出力の場合（緊急）:
1. 即時: GEMINI_API_KEY を Vercel から削除してモックモードへ
2. lib/ai/prompts.ts のシステムプロンプトに安全フィルター強化
3. 問題が特定の質問パターンなら QUICK_ACTIONS から該当を削除
4. 修正後 GEMINI_API_KEY を戻す

C. コスト異常（1リクエストが異常に多トークン消費）:
1. lib/ai/provider.ts の maxTokens 設定を確認・引き下げ
2. app/api/copilot/route.ts の入力バリデーションを強化

復旧時間目安: 30 分〜2 時間（原因次第）

ユーザー告知: A は不要。B は「AIコパイロットを一時停止しています。調査中です。」

---

### シナリオ5: DDoS的トラフィック急増

影響度: レベル2〜3（コスト爆発・サービス劣化）
検知方法:
- Vercel Analytics でリクエスト数が通常の 10 倍以上
- Gemini API のコストアラート（月 5 万円上限）
- Sentry で大量のレート制限エラー

復旧手順:
1. Vercel Analytics でトラフィックパターンを確認（Bot か人間か）
2. Bot の場合: Vercel の Edge Middleware または Firewall で IP ブロック
   next.config.js に headers() で特定 UA をブロック可能
3. AI コパイロットへの集中攻撃の場合:
   - lib/rate-limit/server.ts の FREE_INITIAL_LIMIT を緊急引き下げ (例: 10→3)
   - 変更は承認必須事項のため、緊急時は自分で判断して事後確認
4. Vercel Hobby の場合、Vercel 側に自動 DDoS 保護あり（CloudFlare 相当）
5. 深刻な場合: Vercel の Firewall ルールで特定 IP レンジをブロック

Hobby Plan の制限:
- Serverless Function: 月 100GB-hours まで（無料）
- Edge Network: 無制限に近い

コスト爆発時の緊急停止:
- AIコパイロット: GEMINI_API_KEY を Vercel から削除
- 全 AI 機能: lib/admin/feature-flags.ts の AI_COPILOT_ENABLED を false に設定して再デプロイ

復旧時間目安: 5〜30 分（設定変更 → Vercel 再デプロイ）

ユーザー告知: 「アクセス集中のため一部機能を一時制限しています。」

---

### シナリオ6: コスト爆発

影響度: レベル2〜3（月 5 万円上限超過リスク）
検知方法:
- Google Cloud Console でコスト急増アラート
- Gemini API の使用量が通常の 5 倍以上
- レート制限が機能していない可能性

緊急停止手順（5 万円上限に近づいたとき）:
1. 即時: GEMINI_API_KEY を Vercel から削除（モックモードへ）
2. Google Cloud Console で Gemini API を一時停止
3. 原因調査: app/api/copilot/route.ts のレート制限ロジックを確認
4. lib/rate-limit/server.ts のバケツが正常に機能しているか確認
5. 修正後、GEMINI_API_KEY を復元

根本原因パターン:
A. レート制限の in-memory バケツがサーバーレス環境でリセットされる
   → 各 Vercel インスタンスが独立してカウント、合計が想定の N 倍になる
   → 対策: KV/Redis ベースのレート制限に移行（現状の制約として許容）
B. 特定ユーザーがスクリプトで大量リクエスト
   → IP ベースのブロック + UA チェック強化

コスト見積もり参考:
- 通常: 0.055 円/リクエスト × 30 req/日 × 1,000 ユーザー ≒ 1,650 円/月
- 異常: 0.055 円 × 300 req/日 × 1,000 ユーザー = 16,500 円/月

5 万円上限を超えそうな場合、自動停止は現状未実装のため手動監視が必要。
フェーズ2でアラート自動化を検討。

ユーザー告知: 「AIコパイロットを一時停止しています。クイズ機能は引き続きご利用いただけます。」

---

### シナリオ7: データ整合性破壊

影響度: レベル2〜3（問題データ・ユーザー履歴）
検知方法:
- pnpm validate:questions が失敗
- quiz ページで問題が表示されない（500 エラー）
- ユーザーから「問題がおかしい」の報告

データ種別と対策:

A. 問題データ (data/questions/)
   - TypeScript ファイルのため、ビルドエラーで自動検知される
   - pnpm typecheck / pnpm build が失敗すれば main マージ前に阻止可能
   - 修正: git revert で壊れたコミットを差し戻す

B. ユーザー学習履歴 (localStorage)
   - サーバーサイドに保存されていないため、サーバー側での破壊は原理的に不可能
   - クライアント側のバグで localStorage が破壊された場合: ユーザーが手動でクリア
   - LS_KEYS は lib/storage/keys.ts で管理、キー変更時は移行ロジックが必要

C. アクセス解析データ (PostHog)
   - PostHog Cloud が保持しているため、こちら側での破壊は不可

修正手順:
1. git log --oneline で壊れたコミットを特定
2. git revert <SHA> でリバートコミット作成
3. main にマージ → Vercel 自動デプロイ

復旧時間目安: 15〜30 分（git revert + デプロイ）

ユーザー告知: 問題データ修正なら「問題データを更新しました。一部データをリロードしてください。」

---

### シナリオ8: セキュリティインシデント

影響度: レベル3（緊急停止が必要な場合あり）
検知方法:
- Sentry で異常なリクエストパターン
- 外部からの脆弱性報告
- アクセスログに不審な POST パターン

インシデント種別と対応:

A. API キー漏洩 (GEMINI_API_KEY 等)
   1. Google Cloud Console で即時 API キーを無効化（ローテーション）
   2. Vercel Dashboard で新しいキーを環境変数に設定
   3. git log / git show で該当コミットを確認、公開されていれば GitHub に連絡
   4. 環境変数は .env.local のみ（.gitignore 済み）のため、通常はコードに含まれない

B. XSS / インジェクション
   1. Sentry のエラーで影響範囲を確認
   2. 問題のある入力を受け付けているエンドポイントを特定
   3. 入力バリデーション (Zod) を強化した修正 PR を即マージ
   4. Content Security Policy ヘッダーの確認 (next.config.js の headers)

C. 不正アクセス (/admin/*)
   1. next.config.js または middleware.ts で /admin を即時 503 に
   2. Basic Auth の認証情報が漏洩していないか確認
   3. 新しい認証情報に変更して再デプロイ

セキュリティヘッダー現状確認:
next.config.js に X-Frame-Options, X-Content-Type-Options, Referrer-Policy 等を設定済み。
Content-Security-Policy は段階的に強化。

復旧時間目安: キーローテーション 10 分。コード修正は 30〜120 分

ユーザー告知: 漏洩が確認された場合のみ公表。「セキュリティ上の問題を修正しました。」

---

### シナリオ9: SEO ペナルティ

影響度: レベル2（中長期的な集客への影響）
検知方法:
- Google Search Console で手動対策の通知
- 主要キーワードの検索順位が急落（1〜2 週間で気づく）
- Vercel Analytics で organic トラフィックが急減

原因パターンと対応:

A. 低品質コンテンツとみなされた場合
   1. Google Search Console でペナルティ内容を確認
   2. 問題のあるページを特定（薄いコンテンツ、重複等）
   3. 該当ページの強化またはインデックス除外 (noindex)
   4. Google Search Console から再審査リクエスト

B. スパムリンク被リンク
   1. Google Search Console の被リンクレポートを確認
   2. 否認ツールで問題リンクを否認
   3. Google に再審査リクエスト

C. コアアルゴリズムアップデートによる順位変動
   1. コアアップデートの影響は恒久的な対策のみで回復
   2. E-E-A-T（経験・専門性・権威性・信頼性）の強化
   3. コンテンツの深度・正確性の向上

即時対応（深刻な場合）:
- 問題のあるページを noindex にして品質管理

復旧時間目安: 数週間〜数ヶ月（SEO は即時回復しない）

ユーザー告知: 不要

---

### シナリオ10: ローンチ後の重大バグ発覚

影響度: レベル1〜3（バグの種類次第）
検知方法:
- Sentry のエラー通知（Slack 統合なければメール）
- ユーザーからの報告
- pnpm build の失敗（CI で自動検知）

対応フロー:

軽微なバグ（表示崩れ・一部機能不全）:
1. Sentry でエラーの影響範囲を確認
2. 再現手順を特定
3. hotfix ブランチで修正 → PR → main マージ
4. Vercel 自動デプロイ（3〜10 分）

データ破壊を伴うバグ:
1. 即時: 問題のある機能を kill switch で停止
2. 影響範囲を特定（どのユーザー・どのデータ）
3. localStorage ベースのため、サーバー側データへの影響なし（現状）
4. バグ修正後に再デプロイ

クイズ機能全停止バグ:
1. git revert <SHA> でバグ導入コミットをリバート
2. 直接 main にプッシュ（緊急時は PR 省略可）
3. Vercel 自動デプロイ

再現環境:
- pnpm dev でローカル確認
- Vercel Preview URL（PR マージ前のデプロイ）で動作確認

復旧時間目安: 軽微 30 分〜2 時間。重大 2〜8 時間。

ユーザー告知: 重大バグなら「不具合を修正しました。ご不便をおかけしました。」

---

## 共通: Vercel ロールバック手順

任意の過去デプロイへのロールバック:
1. https://vercel.com/dashboard を開く
2. ipa-quiz-site プロジェクトを選択
3. Deployments タブ
4. 安定デプロイを探す（各行にコミット SHA が表示される）
5. ...（ケバブメニュー）> Promote to Production
6. 確認 > Promote
7. 1〜2 分で本番反映
8. kakomon-ai.jp で動作確認

Vercel CLI を使ったロールバック（事前に vercel CLI インストール済みの場合）:
  vercel list --scope kameking-lab          # デプロイ一覧
  vercel promote <deployment-url>            # 特定バージョンに昇格

---

## 共通: 緊急 kill switch 操作

AIコパイロット停止（Vercel Dashboard経由）:
1. Vercel Dashboard > Settings > Environment Variables
2. GEMINI_API_KEY を削除または空白に変更
3. 自動再デプロイ（1〜2 分）
4. コパイロットがモックモードにフォールバック

AIコパイロット停止（コード経由）:
lib/admin/feature-flags.ts の AI_COPILOT_ENABLED を false にして再デプロイ
- より確実だが、デプロイに 3〜5 分かかる

緊急バナー表示:
Vercel Dashboard > Settings > Environment Variables
NEXT_PUBLIC_EMERGENCY_BANNER_MESSAGE に文字列を設定
→ 全ページ最上部に赤いバナーが表示される

バナー非表示:
NEXT_PUBLIC_EMERGENCY_BANNER_MESSAGE を空文字または削除

---

## 連絡フロー

障害対応の基本順序:
1. 検知 → レベル判定（2 分以内）
2. 部分停止 or ロールバック実施（10 分以内）
3. Twitter 告知（判断後すぐ）
4. 原因特定（30 分以内）
5. 修正 PR 作成・マージ（1〜8 時間）
6. 復旧確認 → Twitter 復旧ツイート

Twitter 告知テンプレート:
  発生: 「【障害情報】現在 [機能名] に不具合が発生しています。[代替手段]。復旧次第お知らせします。」
  復旧: 「【復旧完了】[機能名] の不具合が解消されました。ご不便をおかけしました。」
  メンテ: 「【メンテナンス】[時刻] 頃まで [機能名] を一時停止します。」

現状ステータスページ: 未設置（Twitter @kakomon_ai_jp が代替）
フェーズ2目標: https://status.kakomon-ai.jp

---

## Post-Incident Review テンプレート

障害名: [例: Gemini API タイムアウト多発]
発生日時: YYYY-MM-DD HH:MM JST
復旧日時: YYYY-MM-DD HH:MM JST
影響範囲: [例: AIコパイロット全停止 / クイズ機能は正常]
ユーザー影響: [例: 約 XX 分間 AI 機能が利用不可]

タイムライン:
- HH:MM 検知（方法）
- HH:MM 判断（レベル X と判定）
- HH:MM 対応開始（手順 X を実施）
- HH:MM 復旧確認

根本原因: [技術的な原因]
再発防止策: [具体的なアクション・PR 番号]
次回改善点: [プレイブックの更新内容]

---

## 参考: 主要 URL

本番サイト: https://www.kakomon-ai.jp
Vercel Dashboard: https://vercel.com/dashboard
Google Cloud Console: https://console.cloud.google.com
Sentry: https://sentry.io
PostHog: https://app.posthog.com
Gemini API Status: https://status.cloud.google.com
Vercel Status: https://www.vercel-status.com
Twitter: https://twitter.com/kakomon_ai_jp

---

更新履歴:
- 2026-05-16 PR #244 にて logs/launch-rollback-procedure.md として初稿作成
- 2026-05-17 本ファイルに統合・シナリオ10件・kill switch 実装に合わせて拡充
