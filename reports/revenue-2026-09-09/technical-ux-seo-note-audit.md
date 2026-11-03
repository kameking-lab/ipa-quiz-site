# 過去問AI 技術・UX・SEO・note相乗導線 限定監査

- 実施日: 2026-09-09 JST
- 対象: `origin/main` (`21fd443db8cd4e675283a8d3e46787f2a81fb891`) と本番 `https://www.kakomon-ai.jp`
- 作業場所: `C:\Users\kanet\20260522\ipa-quiz-site-revenue-20260909`
- 範囲: 公開ページ、note外部導線、既存計測、サイトマップ、GSC上位ページ、デプロイ経路の限定監査
- 除外: AdSense実装、GSC/AdSense設定変更、新API、課金、AIモデル、無料枠、DB変更

## 観測値の扱い

GSC値は2026-09-09に担当者がSearch Console UIで確認した実測で、コード内mockではない。2026-06-07〜09-06は915 clicks、約69,800 impressions、CTR 1.3%、平均掲載順位9.3。2026-08-31〜09-06は84 clicks、4,959 impressions、CTR 1.7%、平均掲載順位10.7。本監査はこれらをページ選定の優先度にだけ使い、note送客や売上への帰属は行わない。

独立週比較では2026-08-24〜08-30の60 clicks / 3,998 impressions / 平均掲載順位12.5に対し、08-31〜09-06は84 clicks / 4,959 impressions / 10.7だった。clicksは+40.0%、impressionsは+24.0%。今回の改善前に起きた既存成長であり、今回変更の成果には数えない。

## 上位3点

### 1. グローバルnote導線が旧アカウントを指す

重大度: 高。修正規模: 小。

`app/layout.tsx`、`app/operator/page.tsx`、`lib/seo/structured-data.ts` は `https://note.com/kakomon_ai` を参照している。本番トップと `/operator` でも同じURLを確認した。旧プロフィール自体はHTTP 200だが、説明文は旧 `ipa-quiz-site.vercel.app` を案内し、取得HTMLに記事リンクが0件だった。一方、運用中の `https://note.com/ipa_quiz_ai` は「過去問AI編集部」で、現行 `https://www.kakomon-ai.jp` を案内し、取得HTMLに少なくとも18件の記事リンクが出ている。

この不一致は、footer/operatorから記事へ進めないUX問題に加え、Organization/Person JSON-LDの `sameAs` で旧主体を検索エンジンへ伝えるSEO上の不整合でもある。3箇所を現行アカウントへ統一し、URLを共通定数化する。

### 2. note外部クリックを計測できない

重大度: 高。修正規模: 小。

既存noteリンクは通常の `<a>` で、`lib/analytics/events.ts` と `lib/posthog.ts` にnote送客イベントがない。Vercel AnalyticsとPostHogは既にクライアント計測基盤があるため、新サービスなしで `note_outbound_click` を追加できる。イベントには `source`（例: `footer`、`operator`、`exam_sa`）と、必要なら個人情報を含まない宛先区分だけを持たせる。

評価はクリック数とクリック率を入口別に見る。ページビュー、impressions、clicksを混同せず、未取得は0で埋めない。初日値で導線の良否や売上効果を決めない。

### 3. 高意図ランディングから文脈に合うnote入口がない

重大度: 中〜高。修正規模: 小〜中。

コード上のnoteリンクはfooterと運営者情報だけで、ホーム本文、試験区分、ブログ本文には見つからない。GSC直近7日の上位には `/sa`（3 clicks / 37 impressions）、`/nw`（6 / 477）、`/st`（7 / 113）など資格選択・学習意図が明確な入口がある。まず3ページ以内で、無料の対応記事を1件ずつ案内するpilotが妥当。CTAはページ内容と一致する無料記事を先に置き、有料教材は内容・価格・境界が確認できる場合だけ記事側で選択できる形にする。

候補は次の無料記事まで照合済み。既存の実売教材は売上台帳上にあるが、サイト導線追加後の売上と帰属させない。

- SA: `https://note.com/sikaku_rakutoru/n/n9e207dfe4421`
- ST: `https://note.com/sikaku_rakutoru/n/n6ebb89810300`
- NW: `https://note.com/sikaku_rakutoru/n/n3a7c95159e7a`

3記事とも該当区分向けの無料入口で、`/sa`、`/st`、`/nw` は2026-09-09に実在確認済み。ST/NWの近接有料教材は保存売上台帳上の2026年8〜9月購入が0なので、pilotは需要実測ではなく職務・試験内容の一致を根拠に行う。

## GSC上位「SC論文」URLの確認

`/blog/sc-ronbun-taisaku` は歴史的slugに「ronbun」が残るが、現 `origin/main` のtitle、description、H1、本文は「午後（記述式）」で統一されている。2023年秋以降の150分・4問中2問を説明し、論文試験とは明確に区別する回帰テストもある。本番はHTTP 200。slug変更は既存流入を損なうため今回の小修正対象にしない。

## その他の確認

- `https://www.kakomon-ai.jp/sitemap.xml` はHTTP 200で、分割sitemap indexを返す。今回の限定確認で重大な欠落は検出しなかった。
- 公開 `/stats` はGSC/PostHog未取得時に空配列または「連携準備中」を表示し、mock値へフォールバックしない。管理画面のmockは別経路で明示されている。
- AdSense導入後は `/stats` の「広告なし」「広告 掲載なし」という表示が事実と食い違うため、広告実装の同一反映単位で文言を更新する必要がある。これは広告担当範囲として本監査では未変更。

## 追加の信頼性診断と修正

本番 `/api/stats/answer-count` は `{"count":124000,"source":"db"}` を返したが、コードはDB実数へ根拠未保存の推定ベースライン124,000を常に加算していた。表示はその合計を「回答が共有されています」と実測のように扱っていた。修正では推定値を廃止し、DBから取得できた `studyRecord.count()` だけを「学習記録」と表示する。DB取得不能時は `count:null, source:"unavailable"` とし、UIは数値を出さない。

`IPA 元採点者プロンプト` は公開marketing、metadata、JSON-LD相当のdescription、ブログに反復していたが、実際の元IPA採点者の関与を示す一次証拠はリポジトリで確認できなかった。既存ログにある「元IPA採点者」は架空ペルソナであり根拠にならない。公開面を「学習用の4観点によるAI参考評価」へ直し、「受かるまで」「5周すれば合格レベル」という保証表現も、改善点を確認して書き直せるという機能説明へ変更した。

試験ハブに表示される「合格体験記」はリンク先で架空と開示される一方、入口だけでは実在証言に見えた。試験ハブの見出しを「学習ケース（架空）」へ変え、実在の合格者の証言ではない旨を表示した。詳細・一覧・generator側の同種修正は別担当差分と統合する。

## 計測設定と既存値の取得可否

- Vercel Analyticsは `VercelAnalyticsWithPrivacy` で全体に組み込み済み。今回より `note_outbound_click` を送るが、deploy前の同イベント実数は存在しない。
- PostHog clientの公開キーとhostはローカルproduction設定に存在し、providerも有効化可能。ただし `autocapture:false` かつnoteリンクにclick handlerが無かったため、既存note outbound clickは分離取得不能。0件とは扱わない。
- ローカルproduction設定の `POSTHOG_API_KEY` は空で、server集計APIを使った実数取得は不可。秘密の再取得や新しい計測サービス追加は行わなかった。
- providerは `page_view` を送る一方、公開統計は `$pageview` と `properties.$pathname` を問い合わせる不一致があった。集計側を既存送信仕様の `page_view` / `properties.path` へ合わせた。過去の `$pageview` を新イベントへ換算せず、deploy後の実データだけを表示対象とする。
- 機能別構成比はHogQLの上位200パスを合算した分母であり全PVではないため、画面にも「取得上位最大200パス内」と明示した。
- `PostHogProvider` はSDKの非同期import完了前に初回 `page_view` / UTMを送っており、client未初期化のため黙って失う競合があった。client ready後に初回送信するよう変更し、遅延初期化時に早すぎるcaptureがなく、page viewとUTMが各1回届くことをstubで固定した。本番受信はdeploy後に別途確認する。

## 作成済み差分

- 現行noteプロフィールURLを共通化し、footer・operator・Organization/Person `sameAs` を修正。
- Vercel Analytics/PostHogへ、個人情報を含まない `source` と `account` だけを持つnote click eventを追加。
- SA/ST/NW試験ハブへ、照合済み無料ガイドの小さなカードを追加。有料、合格保証、売上帰属は表示しない。
- 推定124,000回答と根拠のない元採点者・合格保証表現を撤去。
- 公開PostHog統計のイベント名・path property不一致を修正。
- 対象テスト317件、typecheck、対象eslintを通過。

## 安全なデプロイ経路

- remote: `https://github.com/kameking-lab/ipa-quiz-site.git`
- 本番基準branch: `main`
- 共通隔離branch: `codex/revenue-2026-09-09`
- Vercel project: `prj_t0YGXuTY62TNajIJg2v6W68TciT1`
- `.github/workflows/vercel-recovery.yml` はProduction deployment SHAとGitHub `main` SHAを比較し、不一致時に `ref: main`、`sha: MAIN_SHA`、`target: production` で再デプロイする。

したがって、今回の変更は共通隔離worktreeで検証し、対象差分だけをmainへ統合・pushする。Vercel Git deployment完了後、Production SHAがmain SHAと一致し、aliasがREADYであることを確認する。非mainのローカルSHAを `vercel --prod` で直接出すとrecoveryに上書きされ得るため採用しない。

## 推奨実行順

1. 現行note URLの共通化とJSON-LD修正。
2. 既存Vercel/PostHog基盤でnote外部クリックをsource別に計測。
3. SA/ST/NWの最大3ページへ、照合済み無料記事だけをpilot配置。
4. typecheck・対象テスト・production buildを実行し、広告担当差分と同じmain commit系列でdeploy。
5. 7日以上の同じ経過日数でsource別clickを比較。欠測は欠測として扱う。
