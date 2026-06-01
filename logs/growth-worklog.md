# 集客・収益化フェーズ ワークログ（done / SKIP / 未解決 / 保留）

> 各セッションはここを読んで続きを判断。新規記録は末尾に追記。
> 形式: `[YYYY-MM-DD HH:MM] STATUS タスク — 詳細 / コミットSHA / 検証`
> STATUS = done / SKIP(実害・効果なし or 範囲外) / 未解決(検証落ち・次回) / 保留(人間判断→growth-human-decisions.md)

---

## セッション0（セットアップ・人間起動）2026-06-01 JST
- done: 復元点作成 — タグ `pre-growth-20260601`（→ `fb72413`）push 済 / 本番デプロイ `rgb19s7s7`（直前 `r1f6sl3op`）
- done: `growth-integration` ブランチ作成・push（main fb72413 から分岐）
- done: ベースライン全緑（typecheck0 / lint0err / test1626 / build OK）
- done: 404 初期調査 — 現行sitemapの問題ページ12,653件はサンプル30件すべて200。404=4,363の主因は削除済み内部ページ(redirect未設定)＋旧形式/外部由来。`next.config` に一部redirectあり・削除ページは多数。GSCの実404一覧は取得不可→human-decisions。
- done: 旗艦素材確認 — essay-grade API（0-100採点・axes）/ essays・essay・demo/afternoon・demo/essay-grading / 午後データ11区分（ap au db es fe nw pm sa sc sm st）/ アフィリ実装 data/recommended-books.ts / 科目B・午後ブログの芽あり。
- 申し送り（重要）:
  - **戦略を判断基準に**: 旗艦=午後AI採点 / 土台=科目B / 当面無料アフィリ / 404掃除 / あと一歩回収。「○○過去問」正面突破しない。
  - **過大修正の罠回避**（第1弾で実証）: 理論のみ・実害なしはSKIP。
  - **戦略確定は勝手にしない**: 料金/課金有効化/無料枠 は growth-human-decisions.md へ。
  - 作業ツリーに未追跡/CRLF差分（BookmarkButton.snap, overnight-loop.bat 等）あり。コミットに巻き込まない（targeted add）。

---

## セッション1 以降（growth ループが追記）
<!-- 以降、各セッションが done/SKIP/未解決/保留 を追記 -->

## セッション1（growth ループ）2026-06-01 JST
- done: [P0-1] 404掃除 — 削除済 `/testimonials`（旧「合格体験記・口コミ」）を `/success-stories`（13区分合格者ストーリー集）へ 301。next.config に追加。連鎖/自己ループ禁止の回帰ガード（missing/has クエリ条件考慮）も追加。SHA `a4f7883`。検証: 本番ビルド+起動で `/testimonials`→**308**→`/success-stories`(**200**)、新規404なし。typecheck0/lint0err/test1628/build緑。
- done: [P0-1] 404掃除 — 削除済 `/account/audio`(音声・BGM設定)・`/account/avatar`(アバター設定)・`/account/billing`(請求情報) を `/settings` へ 301（既存 account/* 集約パターン踏襲）。`/account/pass-simulator` は後継不在のため本コミット対象外（410候補）。SHA `0b28f8f`。検証: 3URL とも 308→/settings(200)、新規404なし。全ゲート緑。回帰ガードに3URL追加。
- done: [P0-1] 404掃除 — 削除済 `/trust`（旧「信頼性ポリシー — なぜ過去問AIが選ばれるのか」）を同インテントの `/why-kakomon-ai`（「過去問AI を選ぶ理由」）へ 301。SHA `a3e7e30`。検証: 本番ビルド+起動で 308→/why-kakomon-ai(200)、新規404なし。全ゲート緑。回帰ガードに追加。
- done: [P0/内部リンク] オンボーディングツアー（経験者向け）の「弱点マップ」ステップ href を `/my-progress`（→/account/dashboard へ 301）から `/account/dashboard#weakness` へ直リンク化。リダイレクト1ホップ解消＋弱点タブへ直行。SHA `6977c55`。検証: 全ゲート緑、回帰テストで experienced steps[1] href 固定。OnboardingTour.tsx で実描画される導線。
- 申し送り（セッション1まとめ）:
  - **301 で掃除済**: testimonials→success-stories / trust→why-kakomon-ai / account/{audio,avatar,billing}→settings。回帰ガード `__tests__/navigation/redirects-no-chain.test.ts`（連鎖禁止＋行先固定）。
  - **次の最優先（P0-1 残り）= 410 Gone グループ**（後継なし・復活すべきでない削除ページ）: `commerce`(特商法表記) `pricing` `premium`(+/essay,/heatmap,/simulator) `enterprise/{pilot,pricing,sso}` `contact/enterprise`(+/thanks) `security`(B2B SOC2/SAML) `case-studies` `podcast` `launch` `diagnosis`(試験区分診断) `account/pass-simulator` `feedback/public` `community/{questions,stories}` `legal/{dpa,msa,sla}`。**機構の選択が必要**: (a) 既存 middleware.ts は admin-auth 専用matcher。410を足すなら admin と分離して gone-list 分岐＋matcher拡張（middleware.test.ts でガード）。(b) もしくは各パスに `route.ts` を置き 410 返却（ファイル数多）。安全側で (a) を1コミットで慎重に。**注意**: 内部dev痕跡（exec-review/feature-review/final-review*/strategy-discussion*/scoring-test/test/*/tmp/*）は元々非公開でSEO価値低→優先度下げ or まとめて410。
  - **判断保留の弱い301候補**: analytics→/stats（内部DAU dashboard vs 公開stats、インテント差・SKIP寄り）、diagnosis→home（後継なし＝410の方が正直）。

## セッション2（growth ループ）2026-06-01 JST
- done: [P0-1] **410 Gone グループ（後継なし削除ページ23件）** を middleware.ts で実装。`GONE_PATHS`（commerce / pricing / premium(+essay,heatmap,simulator) / enterprise/{pilot,pricing,sso} / contact/enterprise(+thanks) / security / case-studies / podcast / launch / diagnosis / account/pass-simulator / feedback/public / community/{questions,stories} / legal/{dpa,msa,sla}）を Set 化し、admin 認証より**前**に 410 を返す。config.matcher に同パスを literal 列挙し、GONE_PATHS と matcher の同期を回帰テストでガード。SHA `1ea7157`。
  - 機構: 推奨(a)採用。middleware を admin 専用から「先頭で gone 分岐→以降は従来の admin 認証」に拡張。admin パスと GONE_PATHS は非重複（テストでガード）。
  - 検証（本番ビルド `pnpm start` :3939 へ curl 実測）: 23パス全て **410** / `/admin` は **503**（env未設定のfail-closed＝依然ゲート、バイパスせず）/ live(/ /contact /settings /account/dashboard /about /success-stories /why-kakomon-ai)=**200** / prefix衝突(/community /enterprise /legal /premium-foo)=**404のまま**（新規404を作らず・誤410もせず）/ 既存301(/testimonials)=**308**→success-stories 健在。全ゲート緑（typecheck0 / lint0err / test1633 / build OK）。回帰テスト5件追加（全GONE_PATHSが410・admin不変・matcher同期・prefix非衝突）。
  - **次の最優先候補**: P0-1 残りの dev痕跡（exec-review/feature-review/final-review*/strategy-discussion*/scoring-test/test/*/tmp/* — 元々非公開・SEO価値低だが 404 を出すなら 410 にまとめる候補）。次に P1 旗艦=午後AI採点の前面化導線。
- done: [P0-2] **sitemap が実在200のURLのみ出すか再確認 + 退役URL混入の回帰ガード**。SHA `1687428`。
  - 実測（本番ビルド :3939 へ curl）: `/sitemap/main.xml` + `/sitemap/books.xml` が出す **60 URL すべて 200**（非200ゼロ）。データ駆動URL（questions/exams/topics/blog）は既存 `sitemap-resolvability.test.ts` が route ロジックと突合済（**needsReview 問題は除外**＝placeholder混入なし）。
  - 追加ガード: sitemap の全 loc を (a) middleware `GONE_PATHS`(410) と (b) next.config の**無条件**301 source に突き合わせ、矛盾で CI を落とす「崩れたら落ちる」テスト2件（redirects 空振り防止の non-vacuous チェック付き）。今後ページを301/410退役した際の sitemap 外し忘れを検知。
  - 結論: **P0-2 は実質クリア**。sitemap は 200 のURLのみを出している。新規 placeholder/needsReview 混入もなし。
- done: [P1-1/旗艦] **高度試験ハブの旗艦CTAの404死リンクを修正**。SHA `b5114b0`。
  - 監査で発見: `app/[exam]/page.tsx` の「AI論述添削で午後対策」CTA（st/sa/pm/sm/au）が**単数形** `/essay/<exam>` にリンク。だが `app/essay/[exam]/page.tsx` は実在せず（route は `/essay/<exam>/<questionId>` と**複数形** `/essays/<exam>` のみ）→ `/essay/st` `/essay/pm` 等 **5区分すべて 404**（実測）。さらに2nd ボタンの `code==="sc"?...:/essay/<exam>#sample-answers` は sc がこの分岐に来ないため**死コード**＝5区分全部 404。旗艦CTAが内部404を量産していた。
  - 修正: 1st→試験別 午後AI採点 `/<exam>/afternoon`(200)、2nd→`/essays/<exam>`(200)。回帰ガード（bare な単数形 essay 試験インデックスへのリンク禁止／深リンク `/essay/<exam>/<qid>` は許可）を `no-dead-internal-links.test.ts` に追加。regex は旧3パターンを MATCH・新2+有効2を ok と node 実証。
  - 検証: 本番ビルド :3939 で `/st` ハブの **SSR HTML に `href="/st/afternoon"`・`href="/essays/st"`** 出力、旧 `/essay/st` 消失。CTA先4件 200。全ゲート緑（typecheck0/lint0err/test1637/build OK）。
  - **発見した未着手フォロー**: ① **AP と FE が afternoon CTA から完全除外**。`/ap/afternoon`・`/fe/afternoon` は 200 だが **練習データはモック**（`data/questions/afternoon/ap/index.ts` に「実データはモック」明記・各年季2問）。② 記述分岐(sc/nw/db/es)も `/<exam>/afternoon` 200 だが「Coming Soon」無リンク＝モック故の意図的未公開と見られる。→ **AP/FE への旗艦CTA追加は誇大表現の罠なので自律実行せず HD-4 に積んだ**（モックのまま大きく見せない／本番午後データ投入 or ベータ明示の判断は人間）。先に進めるのは P1-4/P1-5 のオリジナル記事送客（モック非依存）。

## セッション3（growth ループ）2026-06-02 JST
- done: [P1-5/旗艦] **ブログ本文の旗艦CTA「論述添削」が単数形 `/essay/<exam>` 404 へリンクしていたのを修正**。SHA `f863c75`。
  - 監査で発見: セッション2は `app/[exam]/page.tsx` のハブCTAを直したが、**ブログ本文（data/blog/generators.ts）の markdown リンク**は見落とされていた。pm-essay-shudai-pickup / st-strategy-perspective / sa-architecture-tradeoff / sm-itil-storytelling / au-audit-evidence-language 等の論述記事が `[AI論述添削(PM)](/essay/pm)` のように**単数形** `/essay/<exam>` にリンク（実在せず＝**9箇所すべて404**）。旗艦=午後AI採点への内部導線が壊れていた。`no-dead-internal-links.test.ts` は `app/` のみ走査していたため未検出。
  - 修正: 9箇所を実在する複数形 `/essays/<exam>`(200) へ。存在しない `#sample-answers` アンカーも除去（pm）。bare `/essay`(200, line 1481) は valid なので温存。
  - 回帰ガード追加: `no-dead-internal-links.test.ts` に **data/blog 本文走査**ブロック（markdown `](/essay/<exam>)` を禁止・深リンク`/essay/<exam>/<qid>`と複数形`/essays/`とbare`/essay`は許可、regex 非空検証付き）。
  - 検証: 本番ビルド成果物で `blog/pm-essay-shudai-pickup.html` の SSR に `href="/essays/pm"` ×3 出力・`href="/essay/pm"` 消失。リンク先 `/essays/{pm,st,sa,sm,au}.html` 全て生成済(200)。単数形 `/essay/[exam]` index は未生成(=404)を確認。全ゲート緑（typecheck0 / lint0err(warnは未追跡 ux-audit ファイルのみ) / test1639 / build OK）。
- done: [P1-5/旗艦] **PM合格論文ブログに専用採点 `/essays/pm` への送客導線を追加**。SHA `062ef04`。
  - 監査: `pm-goukaku-ronbun`(PMは真正の論文区分・/essays/pm 200実データ) は「AI添削」に言及しつつ専用採点ページへ未リンク、CTAは /pm ハブのみ。「書いた論文をAIで採点する」節を追加し4軸採点へ送客。文言は既存 pm-essay-shudai-pickup と整合。
  - 検証: 本番ビルド `blog/pm-goukaku-ronbun.html` SSR に `href="/essays/pm"` 出力・`/essays/pm.html`(200) 生成済。全ゲート緑（typecheck0/lint0err/test1639/build OK）。
- done: [P1-5/旗艦] **ST/AU論文ブログ＋横断ハブ記事に旗艦採点送客を追加**。SHA `cd742dc`。
  - 監査: `st-senryaku-shikou`・`au-shiken-taisaku`(共に論文区分) はCTAが過去問ハブ(/st,/au)のみで採点ページ未送客→各 `/essays/st`・`/essays/au`(200) へ4軸採点リンク追加。横断ハブ `koudo-ronjutsu-kakikata-kotsu`(「高度試験 論述 書けない」狙い・ST/SA/PM/SM/AU網羅) の添削サイクル節に `/essays`(全5区分の採点入口・200) を追加。
  - 検証: SSR HTML に `href="/essays/st"`・`href="/essays/au"`・`href="/essays"` 出力、対象3ページ全て200生成。全ゲート緑（test1639/build OK）。
- 補足sweep（実測・所見なし）: data/blog 本文の**全内部markdownリンクを抽出し .next 成果物と突合** → /account/dashboard /blog /features/* /modes/year /transparency /essay /essays/{pm,st,sa,sm,au,sc} /ap..st 全試験ハブ・全blog相互リンク slug すべて 200生成済。**ブログ本文に残存する404内部リンクはゼロ**（cycle1の/essay修正で解消済を確認）。
- SKIP: [P1-5] `sc-ronbun-taisaku` への /essays/sc 送客は**見送り**（安全側）。理由: 同記事はSC午後IIを「論述/論文・3段構成・3,200字」と framing するが、現行SC午後は記述式で論文区分でない疑い（事実性に懸念）。サイトモデル上は /essays/sc=200 だが、事実が曖昧な framing を旗艦導線で増幅しないため SKIP。→ 事実確認は人間（HD候補: SC午後の形式・/essays/sc の位置づけ妥当性）。
- 申し送り（セッション3まとめ）:
  - **旗艦=午後AI採点への内部送客を論述ブログ全体で整備**: cycle1で壊れた /essay/<exam>(404)→/essays/<exam> を9箇所修正＋data/blog走査の回帰ガード追加。cycle2-3でPM/ST/AU/横断ハブに採点送客を新設。論述ブログ群はこれで漏れなく旗艦へ funnel。
  - **次の最優先候補**: P1-4(不安系キーワードの**新規オリジナル記事**「応用情報 午後 自己採点」「セキスペ 午後 採点」等＝モック非依存・新規ページ追加) / P2-2(競合薄ブログ強化: it-shikaku-nendaibetsu-roadmap・rirekisho-kakikata 等) / P1-6,7(科目B 悩み系ロングテール導線)。AP/FE旗艦CTAは引き続き HD-4 待ち（モック）。
  - SC framing の事実性は人間確認（上記SKIP参照）。
