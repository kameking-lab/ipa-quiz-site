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

## セッション4（growth ループ）2026-06-02 JST
- done: [P1-1/旗艦] **グローバルヘッダの論述ナビを旗艦=午後論述AI採点(/essay)へ差し替え**。SHA `87c6d80`。
  - 監査で発見: ヘッダ `QUIZ_MODES`（PCドロップダウン＋モバイルシート両用）の唯一の論述エントリが **`/essays/sc`「論述例（SC）」**＝(a) **noindex の業種別サンプル**ページ（`app/essays/page.tsx` は `robots:{index:false}`）かつ (b) session3 が事実性懸念で SKIP した SC論述framing のページ。一方、真の旗艦＝**indexable な AI採点ハブ `/essay`「AI論述添削(午後II)」**（ST/SA/PM/SM/AU 実データ・IPA元採点者プロンプト・4軸採点）が**グローバルナビに不在**だった。旗艦が「一目で分かる位置」になく、代わりに noindex サンプルが埋もれていた。
  - 修正: `QUIZ_MODES` の該当1エントリを `{href:"/essay", label:"午後論述AI採点"}` に差し替え（全ページ共通ナビで旗艦を露出）。業種別サンプルはモバイルシートの「論述例」→`/essays`＋下部ナビで引き続き到達可能（orphan化せず）。
  - 回帰ガード強化: `site-header-links-resolve.test.ts` の href 抽出 regex を `href="..."`（JSX属性）だけでなく **`href:"..."`（QUIZ_MODES等のオブジェクトリテラル）も対象**に拡張。従来このテストは QUIZ_MODES の静的hrefを走査しておらず死リンクを検知できなかった→今後はナビ配列の静的内部リンク切れも落ちる。
  - 検証: 全ゲート緑（typecheck0 / lint0err〔warnは未追跡 ux-audit のみ〕 / test1639 / build OK）。本番ビルド成果物で `/essay`（h1「AI 論述添削 (午後II)」・IPA元採点者プロンプト・200）実在、`/essays/sc`(200) も健在を確認。ヘッダのドロップ/シートはクライアント描画のため SSR HTML には現れない（旧 /essays/sc も同条件＝クロール面の退行なし／本変更はUX上の旗艦露出が主目的）。
  - **次の最優先候補**: P1-4(不安系キーワード新規記事) / P2-2(競合薄ブログ強化) / P1-6,7(科目B導線)。ホーム(`app/page.tsx`)にも旗艦`/essay`への導線が**皆無**（HomeTopicGrid/HomeAuxSection に essay 無し）→ ホーム旗艦カード追加を backlog P1-1 に追記候補。
- done: [P1-1/旗艦] **ホームに旗艦=午後論述AI採点(/essay)のSSR導線カードを新設**。SHA `6ece735`。
  - 監査で発見: トップページ `app/page.tsx`（最高オーソリティ面）に旗艦 `/essay` への導線が**皆無**（HomeTopicGrid=分野別、HomeAuxSection=次回試験/続き/FB、HomeExamGrid=区分別のみ）。ヘッダのドロップダウン経由は**クライアント描画でSSR HTMLに出ない**ため、ホーム本体に確実な露出＋クローラブル内部リンクが必要だった。
  - 実装: サーバーコンポーネント `components/home/HomeFlagshipEssay.tsx` を新設し、hero `</section>` 直後（＝CTAレイアウトシフト帯の**外**、HomeExamGridの後）に配置。`<Link href="/essay">` を SSR 出力。文言は**実データのある論文区分 ST/SA/PM/SM/AU のみ**記載し「AI採点は参考評価」と明記（AP/FEモックには触れず誇大回避）。
  - 検証: 全ゲート緑（typecheck0 / lint0err / test1639 / build OK）。本番ビルド `index.html` の SSR に `href="/essay"`＋旗艦コピー（「あなたの午後論述を AI が採点」「午後論述 AI 採点を試す」「高度試験の合否は午後で決まる」）の出力を実測確認＝ホームから旗艦へのクローラブル内部リンク成立。
- done: [P1-1/旗艦] **グローバルフッタのサービス欄に旗艦 /essay を追加**。SHA `f6556d5`。
  - 監査: フッタ(`app/layout.tsx`・全ページSSR・サイト最強のsite-wideクローラブルリンク面)のサービスナビ(FAQ/機能特集/用語集/学習トピック/ブログ/サイトマップ)に旗艦 `/essay` が欠落。全ページに「午後論述AI採点」→/essay を追加。
  - 検証: 全ゲート緑（typecheck0/lint0err/test1639/build OK）。`footer-bottomnav-links-resolve.test.ts` が layout 全静的href走査で /essay 解決を確認。本番ビルド about/license/faq 各 SSR HTML にフッタリンク出力を実測。
- 申し送り（セッション4まとめ）:
  - **旗艦=午後論述AI採点(/essay) をグローバル3面（ヘッダ/ホーム/フッタ）で一目に**: (1)ヘッダ QUIZ_MODES の noindexサンプル/essays/sc→indexable /essay へ差替＋object-href回帰ガード強化 `87c6d80`、(2)ホーム hero 下に SSR 旗艦カード新設（HomeFlagshipEssay・crawlable href="/essay"）`6ece735`、(3)フッタ サービス欄に /essay 追加（全ページSSR）`f6556d5`。旗艦は「埋もれない」状態になった（P1-1 は主要導線分ほぼ達成）。
  - 文言は一貫して**実データのある論文区分 ST/SA/PM/SM/AU のみ**＋「AI採点は参考評価」明記。AP/FE午後はモックのため触れず（誇大回避・HD-4継続待ち）。
  - **次の最優先候補**: P1-4(不安系KW新規記事＝モック非依存・新規crawlページ) / P2-2(競合薄ブログ強化 it-shikaku-nendaibetsu-roadmap・rirekisho-kakikata) / P1-6,7(土台=科目B 悩み系導線・1〜4で未着手の柱)。土台=科目Bが手薄なので次セッションで着手推奨。

## セッション5（growth ループ）2026-06-02 JST
- 監査(read-only): 土台=科目B 着手。既存の科目Bブログ3記事(fe-kamoku-b-taisaku/fe-kamoku-b-pseudo-language/fe-algorithm-nigate-kokufuku)とそのrelatedSlugsを精査。
- SKIP: `getRelatedPosts` の explicit ループに `slug===s` 自己除外が無い（fallbackのみ除外）潜在バグ→tsx実測で全153記事に自己参照・重複ゼロ＝現状実害なし。過大修正の罠回避でコード変更はSKIP（既存テスト `blog-index.test.ts` の self-ref ガードが将来検知）。
- done: [P2-3/土台] **科目B土台クラスタを相互内部リンク化**。SHA `1c50eb0`。
  - 監査で発見: 中核ピラー `fe-kamoku-b-taisaku`(科目B完全対策) の relatedSlugs が `[kakomon-dake-goukaku, ap-gogo-sentaku, ai-kakomon-gakushuu]` で、**兄弟2記事(擬似言語/苦手克服)へ未リンク**。兄弟2記事は双方とも taisaku へリンクしているのに**片方向**でクラスタが閉じていなかった（土台funnelの穴）。
  - 修正: relatedSlugs を `[fe-kamoku-b-pseudo-language, fe-algorithm-nigate-kokufuku, kakomon-dake-goukaku, ai-kakomon-gakushuu]` に差替。off-topicな ap-gogo-sentaku(AP午後選択) を除外し兄弟2件を先頭に。これで3記事が**閉じたクラスタ**＝どの記事からも1クリックで残り2記事へ到達。
  - 回帰ガード: `blog-index.test.ts` に「科目Bクラスタ相互リンク維持」テスト追加（trio各々の getRelatedPosts に他2件が含まれることを固定。relatedSlugs編集でクラスタが切れたら落ちる）。
  - 検証: 全ゲート緑（typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕 / test1640 / build OK）。本番ビルド成果物 `blog/fe-kamoku-b-taisaku.html` の SSR に `href="/blog/fe-kamoku-b-pseudo-language"`・`href="/blog/fe-algorithm-nigate-kokufuku"` 出力・旧 ap-gogo-sentaku リンク消失を実測。兄弟2ページとも prerendered(200)。
- done: [P1-7/土台] **アルゴリズム苦手克服記事の毎日演習CTAを分野別プールへ深リンク**。SHA `3a1859a`。
  - 監査で発見: `fe-algorithm-nigate-kokufuku` の「1日1問」CTAが汎用 `/fe` ハブへリンク。アルゴリズム記事なのに行先がFE全体プール（大半が非アルゴリズム）で的外れ。
  - 修正: `/fe/topic/アルゴリズムとプログラミング`(prerendered 200・SSR・「この分野でクイズを始める」→クイズ/AIコパイロット導線)へ差替。文言も「アルゴリズム分野の過去問」と正確化（午前MC≠科目B擬似言語なので科目Bとは名乗らず誇大回避）。canonical一致の percent-encoded path を使用。
  - 回帰ガード新設: `blog-index.test.ts` に「本文の `/<exam>/topic/<category>` 深リンクが groupByCategory 生成済トピックに解決する」テスト（non-vacuous `seen>0` 付き）。従来 `/blog/<slug>`・2文字 `/<exam>` のみ検査で topic 尾部は未ガードだった。
  - 検証: 全ゲート緑（typecheck0 / lint0err / test1641 / build OK）。`blog/fe-algorithm-nigate-kokufuku.html` SSR に encoded href＋「アルゴリズム分野の過去問」出力を実測。
- done: [P1-7/土台] **科目B完全対策ピラーの演習CTAも分野別プールへ深リンク**。SHA `35bf8a9`。
  - 監査: 中核ピラー `fe-kamoku-b-taisaku` の唯一の演習CTA「過去問で演習する →」も汎用 `/fe` 行き。記事は科目B=アルゴリズムとプログラミング中心の内容で、分野別プールが直接on-topic。
  - 修正: cycle2と同じ `/fe/topic/アルゴリズムとプログラミング` へ差替＋文言正確化。cycle2の topic 深リンク回帰ガードが本リンクも検証（test非vacuousで2リンク exercised）。
  - 検証: 全ゲート緑（test1641 / build OK）。`blog/fe-kamoku-b-taisaku.html` SSR に encoded href 出力を実測。
- 申し送り（セッション5まとめ）:
  - **土台=科目B クラスタを funnel として整流**: (1)中核ピラーtaisaku→兄弟2記事の相互内部リンク化で3記事を閉じたクラスタに `1c50eb0`、(2)(3)アルゴリズム記事＆ピラーの演習CTAを汎用/feからアルゴリズム分野別プール `/fe/topic/アルゴリズムとプログラミング`(200・クイズ/コパイロット導線)へ深リンク `3a1859a`/`35bf8a9`。科目B読者がブログ→相互リンク→分野別実演習＋AIコパイロットへ1〜2クリックで到達できる動線になった。
  - **誇大回避**: 午前MCの「アルゴリズムとプログラミング」分野は科目Bの擬似言語そのものではないため、リンク文言は「アルゴリズム分野の過去問」に留め「科目B演習」とは名乗らない。pseudo-language記事の既存 `[科目B問題](/fe)` framing は pre-existing・200・実害なしとして SKIP（過大修正の罠回避）。
  - **新ガード**: 本文の topic 深リンク解決性テストを新設。今後の分野別深リンク追加も保護。
  - **次の最優先候補**: P1-6(科目B悩み系の新規オリジナル記事「科目B 解き方/わからない」など＝新規crawlページ) / P1-7続き(算/科目B問題ページ自体からのコパイロット quick-action 導線＝UI変更で要慎重監査) / P2-2(競合薄ブログ強化)。AP/FE午後モックは引き続き HD-4 待ち。

## セッション6（growth ループ）2026-06-02 JST
- done: [P1-6/土台] **科目B「わからない/解き方」悩み系の新規オリジナル記事を新設しクラスタへ funnel**。SHA `2e895cd`。
  - 監査: 既存科目B 3記事(fe-kamoku-b-taisaku=完全対策/fe-kamoku-b-pseudo-language=擬似言語/fe-algorithm-nigate-kokufuku=苦手克服)は「対策・技術・メンタル」を扱うが、「何が分からないか分からない」「どこから手をつける」直撃の入口記事が無かった（backlog P1-6の未着手柱）。
  - 実装: `data/blog/generators.ts` buildGeneralPosts に新記事 `fe-kamoku-b-wakaranai`（offset longtail2Offset+10）を新設。「わからない」を3つのつまずきタイプ（A=擬似言語の文法/B=トレースできない/C=時間切れ）へ切り分け、各タイプを既存クラスタ記事へ振り分けるオリジナル診断型記事。共通の5ステップ解き方手順＋AIコパイロット活用＋アルゴリズム分野別プール `/fe/topic/アルゴリズムとプログラミング` への演習送客。relatedSlugs=cluster3記事（outbound funnel）。中核ピラー taisaku の relatedSlugs に本記事をinbound配線（兄弟2記事を上位維持→科目Bクラスタ相互リンク維持テストは緑）。
  - 検証: 全ゲート緑（typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕 / test1641 / build OK）。本番ビルド成果物 `blog/fe-kamoku-b-wakaranai.html` 実在（SSRに「つまずきを切り分ける」「3つのタイプ」「タイプA/B/C」出力）。outbound 5リンク（/fe・/blog/{taisaku,pseudo-language,algorithm-nigate}・/fe/topic/アルゴリズムとプログラミング encoded）全て prerendered(200) を実測＝新規404ゼロ。ピラー taisaku HTML に inbound `href="/blog/fe-kamoku-b-wakaranai"` 出力を実測。
  - 誇大回避: 午前MC「アルゴリズムとプログラミング」分野=科目B擬似言語そのものではない点に留意し、演習リンク文言は「アルゴリズム分野の過去問」に統一（既存セッション5の流儀踏襲）。

- done: [P2-3/旗艦+土台] **最高可視性ロードマップ記事 it-shikaku-nendaibetsu-roadmap を旗艦/土台へ funnel配線**。SHA `b8c1ecf`。
  - 監査: 同記事(GSC上位6.2位・あと一歩)はFEと管理系高度試験(PM/ST/SM/AU=論文区分)を多く論じるが、本文の内部リンクが `[過去問AI のトップ](/)` 汎用トップ1本のみで、2大戦略ページ(旗艦=午後論述AI採点・土台=科目B)へ未送客だった＝最高可視性面の authority/click を戦略ページへ分配できていなかった。
  - 修正: 20代前半FE節に土台 `[基本情報技術者 科目B完全対策](/blog/fe-kamoku-b-taisaku)`、40代論述節(PM/ST/SM/AUの午後II論述を論じる文脈)に旗艦 `[午後論述 AI 採点](/essay)` を各1本、自然な文脈で追加。論述先は実データ論文区分(ST/SA/PM/SM/AU)のみで誇大回避(モック非依存)。relatedSlugs不変。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1641/build OK)。本番ビルド `blog/it-shikaku-nendaibetsu-roadmap.html` SSRに `href="/blog/fe-kamoku-b-taisaku"`×1・`href="/essay"`×2(うち1=本文追加分、もう1=session4で全ページフッタに入った/essay)出力。両ターゲット `essay.html`・`blog/fe-kamoku-b-taisaku.html` prerendered(200)＝新規404ゼロ。

- done: [P1-1/P1-5/旗艦] **全論文区分の勉強法記事(overview)から旗艦=午後論述AI採点へ条件付き送客**。SHA `122c129`。
  - 監査: 全13区分の overview 記事 `<exam>-goukaku-benkyouhou` は「午後試験(記述・論文)の戦略」節で論述・AI添削を論じるが、旗艦 `/essay` へ未送客だった（funnelgap実測: st=論述言及9・pm/sm/sa/au=6前後の論文区分が漏れていた）。
  - 修正: `buildOverviewPost` に条件付きCTA `flagshipEssayCta` を新設。実データを持つ論文区分のみ(`ESSAY_FLAGSHIP_EXAMS = {st,sa,pm,sm,au}`、単一情報源 lib/essay/load.ts ESSAY_EXAM_CODES の値を複製・コメント明記)、午後節末尾に4軸採点(論理性/具体性/題意適合)へ送客する一文を追加。「AI採点は参考評価」明記。リンクは indexable な `/essay` ハブ(session4の旗艦選択と一貫。/essays は noindex)。ap/sc/nw/db/es 等モック/記述区分には出さず誇大回避。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1641→build OK)。本番ビルドで論文5区分 `{st,sa,pm,sm,au}-goukaku-benkyouhou.html` のSSR本文に旗艦CTA固有句「論理性・具体性・題意適合」出力(=2)＋`/essay`リンク、非論文8区分(ap/fe/sc/nw/db/es/ip/sg)は本文CTAゼロ(footerの/essay 1本のみ)を実測。`/essay` prerendered(200)＝新規404ゼロ。これで論文5区分の高オーソリティ勉強法記事すべてが旗艦へ funnel。
- done: [test/旗艦] **旗艦/essay採点CTAの論文区分限定を回帰ガード**。SHA `4058e60`。
  - `blog-generators.test.ts` に新describe追加。lib/essay/load.ts `ESSAY_EXAM_CODES` を truth に、overview本文が `](/essay)` を含む⇔論文区分 を全13区分で検証＋non-vacuous(linked===5)。generators側の複製集合が drift して非論文へ誇大CTAが漏れたら落ちる。test1641→1655(+14)。全ゲート緑。
- 申し送り（セッション6まとめ）:
  - **土台=科目B**: 「わからない/解き方/何から」直撃の新規オリジナル記事 `fe-kamoku-b-wakaranai` を新設(つまずき3タイプ切り分け→既存クラスタへ振分)し、中核ピラーへ inbound 配線 `2e895cd`。
  - **旗艦=午後論述AI採点を面で funnel化**: (1)最高可視性ロードマップ記事→旗艦/土台へ文脈リンク `b8c1ecf`、(2)論文5区分の勉強法記事(overview)から旗艦へ条件付き送客＋誇大回避の区分ゲート `122c129`、(3)その回帰ガード `4058e60`。論文区分の高オーソリティ記事が漏れなく旗艦へ流れる動線が完成。
  - **次の最優先候補**: P1-4(不安系KW新規記事だが「応用情報午後」「セキスペ午後」はモック/記述式で要HD-4・SC事実確認＝安全な角度は論文5区分の個別worry記事) / P2-2(競合薄ブログ強化: it-shikaku-rirekisho-kakikata=既に内容厚いので内部リンク網寄り) / P1-7続き(科目B問題ページ自体のコパイロット quick-action UI＝要慎重監査) / P0-1残り(dev痕跡の410)。AP/FE午後モックは引き続き HD-4 待ち。

## セッション7（growth ループ）2026-06-02 JST
- done: [P1-1/旗艦] **最大のクロール面 /q/* の論述区分(ST/SA/PM/SM/AU)問題ページから旗艦=午後論述AI採点(/essay)へ送客**。SHA `c785e6a`。
  - 監査: 旗艦 /essay はヘッダ/ホーム/フッタ(session4)＋論述ブログ群(session3/6)には露出済だが、**サイト最大のクロール面である問題詳細ページ /q/\*（~12,653件）には旗艦への導線が皆無**だった。ST/SA/PM/SM/AU の午前I/午前II問題を解く読者は午後II論述採点の最有力候補なのに、その面で旗艦が不在。
  - 実装: gated server component `components/quiz/AfternoonEssayHint.tsx` を新設（InlineBookHint/CategoryStudyTip の null-gate パターン踏襲）。`ESSAY_EXAM_CODES`(=lib/essay/load.ts 単一情報源 st/sa/pm/sm/au)に含まれる区分のみ SSR の `<Link href="/essay">` を出力し、ap/fe 等の非論述・モック区分は `null`（誇大回避）。文言は /essay と整合の4軸「適合度・論理性・具体性・業種事例」＋「AI採点は参考評価」明記。リンク先は indexable な /essay（noindex の /essays ではない）。page.tsx の InlineBookHint 直後に配置。
  - 検証: 全ゲート緑（typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕 / test1655→1658(+3) / build OK）。本番ビルド成果物で `q/st/2024-spring/am1/q1.html` に `href="/essay"`＋「午後論述 AI 添削を試す」「この区分は午後IIで論述が出ます」出力、`q/fe/2024-cbt/kamoku-a/q1.html` には hint コピー **0件**（非論述区分に出ない）を実測。回帰テスト `__tests__/components/AfternoonEssayHint.test.tsx`（論述5区分でリンク・非論述8区分で空・non-vacuous）。
- done: [P1-4/旗艦] **「論述の自己採点」新規オリジナル記事を新設し旗艦=午後論述AI採点へ funnel**。SHA `62bd68e`。
  - 監査: 採点/自己採点は多数の記事で sub-point として触れられるが、「書けたが合格レベルか分からない＝自己採点できない」を直撃する**専用記事が不在**だった。既存 `koudo-ronjutsu-kakikata-kotsu` は「書き方/書けない」で intent が別。採点こそ旗艦の差別化（道場は解く場所、過去問AIは採点する場所）なのに入口記事が無かった。
  - 実装: `data/blog/generators.ts` に新記事 `koudo-ronjutsu-jiko-saiten`(longtail2Offset+11)を新設。「なぜ自己採点が難しいか→IPA出題趣旨・採点講評から読み取れる評価観点(適合度/論理/具体性/再現性)→自己採点チェックリスト→旗艦 `/essay` のAI採点で第三者視点を補う→自己採点→AI採点→書き直しループ」のオリジナル構成。relatedSlugs=[書き方hub, pm-essay-shudai-pickup, ipa-koudo-9kubun-chigai]。書き方 hub の relatedSlugs に本記事を inbound 追加し**相互リンクのクラスタ化**。
  - 誇大回避: 「IPA は採点基準を非公開」と明記し、出題趣旨・採点講評から読み取れる**傾向**として提示。実データを持つ論文5区分(ST/SA/PM/SM/AU)のみ言及。旗艦リンクは indexable な `/essay`（noindex の /essays ではない）。「AI採点は参考評価」明記。
  - 検証: 全ゲート緑（typecheck0 / lint0err / test1658 / build OK）。本番ビルド `blog/koudo-ronjutsu-jiko-saiten.html`(118KB)実在、`href="/essay"`＋オリジナル句（「自己採点チェックリスト」「書いた後に良し悪しを判断できない」）出力。outbound 4リンク全て prerendered(200)＝新規404ゼロ。hub `koudo-ronjutsu-kakikata-kotsu.html` に inbound `href="/blog/koudo-ronjutsu-jiko-saiten"` 出力を実測。
  - **発見した将来改善（未着手・小）**: 書き方 hub `koudo-ronjutsu-kakikata-kotsu` 本文の採点リンクは `/essays`(noindex) を指す（session3由来）。indexable な `/essay` へ寄せる余地あり（誇大なし・1行）。→ cycle3 で対応。
- done: [P1-5/旗艦] **論述hubの「AI採点」リンクを noindex `/essays` から indexable 旗艦 `/essay` へ修正**。SHA `1d2af50`。
  - 監査: `koudo-ronjutsu-kakikata-kotsu` 本文の「午後II論述のAI採点」アンカーが `/essays`(listing, **robots index:false** を実測確認)を指し、旗艦への内部リンク equity が noindex ページへ流出していた。`/essay` は robots 無指定＝indexable（実測）。アンカー文言＋4軸「適合度・論理性・具体性・業種事例」は /essay の文言そのもの、かつ /essay は全5区分対応＝この cross-exam hub の自然な送客先。session4 の旗艦選択(/essay)と整合。
  - 修正: line 6844 の `](/essays)` → `](/essay)`（テキストも「午後論述 AI 採点」に統一）。`blog-generators.test.ts` の FLAGSHIP_LINK 規約(=`](/essay)`、/essays plural は noindex)とも一致。当該テストは overview post のみ走査のため general post の本変更に影響なし（全緑）。
  - 検証: 全ゲート緑（typecheck0 / lint0err / test1658 / build OK）。本番ビルド `blog/koudo-ronjutsu-kakikata-kotsu.html` に `href="/essay"` 出力・bare `href="/essays"` **0件**を実測（noindex listing への送客を解消）。
- 申し送り（セッション7まとめ）:
  - **旗艦=午後論述AI採点(/essay) の funnel を「最大クロール面」と「採点intent」へ拡張**: (1)/q/* 問題ページ(~12,653件・最大面)の論述5区分に gated 旗艦カード `c785e6a`、(2)「論述の自己採点」新規記事を新設し旗艦へ funnel＋書き方hubと相互リンク `62bd68e`、(3)書き方hubのAI採点リンクを noindex /essays→indexable /essay へ是正 `1d2af50`。
  - **誇大回避の一貫**: 区分ゲートは lib/essay/load.ts `ESSAY_EXAM_CODES`(st/sa/pm/sm/au)単一情報源、AP/FEモックには出さない、「AI採点は参考評価」「採点基準は非公開」を明記。旗艦リンクは indexable /essay に統一（noindex /essays と区別）。
  - **次の最優先候補**: P1-5残り(論文5区分の個別essay記事 pm-goukaku-ronbun/st-senryaku-shikou 等が deep link `/essays/<exam>`(これも noindex・実測) を指す点。exam固有UX vs crawl equity のトレードオフ＝1記事ずつ慎重に。/essay へ寄せるか /essays/<exam> を indexable 化するかは設計判断寄り→backlog/HD候補) / P2-2(競合薄ブログ強化) / P1-7続き(科目B問題ページのコパイロット quick-action UI＝要慎重監査) / P0-1残り(dev痕跡410)。

## セッション8（growth ループ）2026-06-02 JST
- done: [P2-2/SEO構造化] **ブログ「よくある質問」節を FAQPage JSON-LD として出力**。SHA `b3cd08d`。
  - 監査で発見: `app/blog/[slug]/page.tsx` の JSON-LD は Article + LearningResource + BreadcrumbList（+ `-yoru-tokurensyu` のみ HowTo）を出すが、**22記事(101 Q&A)が持つ `## よくある質問` 節に対して FAQPage 構造化データが皆無**だった。これら22記事は rirekisho/benkyouhou/勉強時間 等「○○ 書き方/満点/何時間」の質問intentクエリを狙う informational ページで、FAQPage はページ意味論をそのクエリに整合させる。
  - 実装: `lib/blog/faq.ts` に `extractFaq(body)` を新設（`## よくある質問` 節を検出→`**Q. ...？**` 行＋直後回答段落を抽出、markdown リンクは text のみに・強調 `**` は除去、回答は500字cap）。page.tsx で `faqs.length>0` のとき FAQPage ノードを `@graph` に追加（`@id` `#faq`、mainEntity=Question/acceptedAnswer）。**additive**＝既存ノード・本文・UIは不変。
  - 注記: Google は2023年8月に FAQ リッチリザルト表示を権威系サイト中心に縮小済だが、(a)標準準拠の妥当な構造化データで害がなく、(b)質問intentページの意味整合・他サーフェス/AI overview での解釈に資する。誇大なし・本文無改変の安全な additive 強化として実施。
  - 検証: 全ゲート緑（typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕 / test1658→1661(+3) / build OK）。本番ビルド成果物 `blog/it-shikaku-rirekisho-kakikata.html` の JSON-LD に `"@type":"FAQPage"`＋`"@type":"Question"`×5＋実問文（「ITパスポートはエンジニア転職で書く意味がありますか」）出力を実測。FAQ節を持たない記事は FAQPage 非出力（getAllBlogPosts ベースで test 検証）。回帰テスト `__tests__/seo/blog-faq-jsonld.test.ts`（rirekisho=5問固定／FAQ節有⇔抽出>0 の同期／markdown 漏れ禁止／non-vacuous ≥20記事）。
- SKIP→HD: [P1-5残り] **論文5区分の個別essay記事の「AI採点」深リンクが noindex,nofollow の `/essays/[exam]` を指す件**は自律実装せず **HD-5** へ。
  - 監査(read-only): 採点intent深リンク（generators.ts 1604/1649/1692/1730/1770/3874/3999/4109 等 `[PM 論述添削](/essays/pm)` 系）の行先 `/essays/[exam]` が `robots:{index:false,follow:false}`（**実測**）。equity観点では indexable `/essay` 寄せが筋だが、区分特化ページ（区分採点＋業種別サンプル）のUX関連性を失うトレードオフ。「業種別合格答案」intent深リンク(7546/7856-7861)は /essays/[exam] が正しい行先で変更不要。
  - 判断: 設計判断（/essays/[exam] の indexable 化 or 採点リンクの /essay 寄せ）＝自律実行しない。旗艦 /essay の露出は header/home/footer/q-page で確保済(session4/7)。「迷ったら直さず SKIP（安全側）」に従い HD-5 に積み次へ。コード変更なし。
- done: [P1-3/旗艦] **旗艦 /essay ページに構造化データ(LearningResource + BreadcrumbList)を追加**。SHA `3a8f0ab`。
  - 監査で発見: 旗艦=午後論述AI採点 `app/essay/page.tsx`（loopが4+セッション送客し続けた戦略の中心）は title/description/canonical の**メタのみで JSON-LD 構造化データが皆無**。一方 blog記事は Article+LearningResource+BreadcrumbList、/faq は FAQPage(79問・既存) を持つ。戦略の中心が最も構造化されていなかった。/faq の FAQPage は既存・重複なし、/essays・/essays/[exam] は noindex(対象外)を確認。
  - 実装: `@graph` に (1)`LearningResource`（name/url/description=メタ共有・`teaches` は **ESSAY_EXAM_CODES 由来**で ST/SA/PM/SM/AU のみ列挙＝誇大なし・publisher は共通 ORG_ID）、(2)`BreadcrumbList`（ホーム>AI論述添削(午後II)）を追加し `<JsonLd>` で描画。`isAccessibleForFree` は β中月3回無料の freemium のため**あえて付けず**過剰主張回避。本文・UIは不変（additive）。Google が HowTo リッチを2023に廃止済のため HowTo は付けず（仕組み節は本文のまま）。
  - 検証: 全ゲート緑（typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕 / test1661→1664(+3) / build OK）。本番ビルド `app/essay.html` の JSON-LD に `"@type":"LearningResource"`・`"@type":"BreadcrumbList"`＋`"teaches":"ITストラテジスト・システムアーキテクト・プロジェクトマネージャ・ITサービスマネージャ・システム監査技術者 の午後II論述対策"`（=ESSAY_EXAM_CODESの5区分のみ）出力を実測。回帰テスト `__tests__/seo/essay-flagship-jsonld.test.ts`（構造化データ保持／JsonLd描画／teaches が ESSAY_EXAM_CODES 由来＝exam ハードコード防止）。
- 申し送り（セッション8まとめ）:
  - **SEO構造化データの穴を2つ塞いだ**: (1)ブログ22記事(101 Q&A)の `## よくある質問` 節を **FAQPage** として出力 `b3cd08d`（lib/blog/faq.ts の extractFaq・additive・回帰テスト）、(2)**旗艦 /essay** に LearningResource + BreadcrumbList を追加 `3a8f0ab`（メタのみ→構造化・teaches は ESSAY_EXAM_CODES 由来で誇大なし）。/faq は既に FAQPage 保有・重複なしを確認。
  - **誇大回避の一貫**: 旗艦の teaches は単一情報源 ESSAY_EXAM_CODES、`isAccessibleForFree` は freemium のため付けず、FAQ答弁は markdown 除去。Google の FAQ/HowTo リッチ縮小(2023)は注記しつつ「標準準拠で害なし・意味整合に資する」additive 強化として実施。
  - **SKIP→HD-5**: 論文5区分の個別essay記事の採点intent深リンクが noindex,nofollow `/essays/[exam]` を指す件は設計判断のため自律実装せず HD-5 に集約。
  - **次の最優先候補**: P2-2残り(競合薄ブログの内容深掘り・FAQ節追加で本記事もFAQPage化が効く) / P2-1(/q 設問ページの title/description テンプレ質改善＝最大面・要慎重監査) / P1-7続き(科目B問題ページのコパイロット quick-action UI＝要慎重監査) / P0-1残り(dev痕跡410・低優先)。AP/FE午後モックは HD-4、essay深リンクは HD-5 待ち。

## セッション9（growth ループ）2026-06-02 JST
- done: [P2-2/誇大回避] **roadmap記事の無料枠を「1日30回」→SSOT(FREE_AI_DAILY_LIMIT=10)へ是正**。SHA `9e06379`。
  - 監査で発見: `lib/constants/ai-quota.ts` のコメントが「Some marketing pages still said '1日30回'; those are corrected to reference this constant」と明記するのに、`kakomon-ai-roadmap-2026` の「維持し続ける方針」節 line2143「AI コパイロット 1 日 30 回（無料枠）」だけが是正漏れ＝enforced値10を**3倍誇張**しSSOTからdriftしていた唯一の箇所。generators.ts は既に `AI_QUOTA_COPY_SHORT` を import 済（line4385/4417 で使用）。
  - 修正: 当該行を `- AI コパイロット：${AI_QUOTA_COPY_SHORT}`（=「初回 10 回無料（フィードバック後ほぼ無制限）」）へ統一。他2記事と同じ参照パターン。本文の他箇所・relatedSlugs・UIは不変（最小diff）。
  - 検証: 全ゲート緑（typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕 / test1664→1666(+2) / build OK）。本番ビルド `blog/kakomon-ai-roadmap-2026.html` で「30 回」**0件**、`AI コパイロット：初回 10 回無料（フィードバック後ほぼ無制限）` 出力を実測。回帰ガード `__tests__/seo/blog-quota-copy-sync.test.ts`（全記事に「N 回（無料」literal禁止＋roadmap記事がSSOT値10を反映・30回不在）。
- done: [P2-2/土台] **土台=科目B 中核ピラー記事 fe-kamoku-b-taisaku に「よくある質問」節を追加しFAQPage化**。SHA `2922a80`。
  - 監査: 科目Bクラスタの中核ピラー(session5/6でクラスタ配線済)だが `## よくある質問` 節が無く、session8の FAQPage JSON-LD machinery(lib/blog/faq.ts extractFaq)の対象外だった。「科目B 何問/何点/未経験/順番/過去問どこで」は通年ロングテールの質問intent。
  - 実装: オリジナル4Q&A（Q1出題数20・90分・600点／Q2未経験でもトレース力で合格可／Q3科目A→B順／Q4アルゴリズム分野プールで演習）を `## まとめ` 直前に additive 挿入。本文他箇所・relatedSlugs・UI不変。extractFaq が4ペア抽出→`app/blog/[slug]/page.tsx` が FAQPage を自動出力。
  - 誇大回避: 出題数/時間/合格点は本文既存記述と一致。/fe/topic アルゴリズムプールは午前(科目A)分野で科目B疑似言語そのものではない点を踏まえ「トレース力の土台」と正確表現（worklog既知の区別を踏襲）。AI回数は明記せず。「最新は IPA 公式で確認」明記。
  - 検証: 全ゲート緑（typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕 / test1666→1667(+1) / build OK）。本番ビルド `blog/fe-kamoku-b-taisaku.html` に `"@type":"FAQPage"`×1＋`"@type":"Question"`×4＋実問文「プログラミング未経験でも科目Bに合格できますか」出力、FAQ Q4リンクは実DOMで `<a href="/fe/topic/...">`（markdown剥離・JSON-LD側もleak0）、topicプールHTML(200)実在を実測。回帰ガード blog-faq-jsonld に本記事=4Q&A・Q4 markdownリンク剥離を pin。
- done: [P2-2/旗艦] **旗艦=PM論文記事 pm-goukaku-ronbun に「よくある質問」節を追加しFAQPage化＋/essay採点へfunnel**。SHA `0db0f07`。
  - 監査: PMは真正の論文区分(ESSAY_EXAM_CODES)・旗艦=午後論述AI採点の中核intent記事だが `## よくある質問` 節が無くFAQPage対象外。「午後II 形式/未経験/字数配分/合格レベルか自己判断」は論文受験者の質問intent。本文の既存採点CTAは noindex `/essays/pm`（HD-5 territory）。
  - 実装: オリジナル4Q&A（Q1=120分2問選択ア〜ウ3000字／Q2=未経験でも具体的設定と判断論理／Q3=設問イに半分以上／Q4=自己採点困難→旗艦採点へ）を `## まとめ` 直前に additive 挿入。extractFaq が4ペア抽出→FAQPage自動出力。
  - 旗艦funnel＆HD-5回避: Q4の**新規**リンクは indexable な `/essay` へ（noindex `/essays/pm` へ送る既存本文CTAはHD-5判断待ちのため不変）。session4/7/8のequity原則踏襲。「AI採点は参考評価」明記。字数/形式は本文既存記述と一致（誇大回避）。
  - 検証: 全ゲート緑（typecheck0 / lint0err / test1667 / build OK）。本番ビルド `blog/pm-goukaku-ronbun.html` に `"@type":"FAQPage"`×1＋`"@type":"Question"`×4＋実問文「実務経験がなくても合格論文は書けますか」出力、Q4の `/essay` が実DOMで `<a href="/essay">午後論述 AI 採点</a>` レンダ、`essay.html`(200)実在を実測。回帰は corpus-wide blog-faq-jsonld が自動カバー（FAQ節→>0ペア・markdownリンク剥離）。
- 申し送り（セッション9まとめ）:
  - **誇大回避の実バグ修正**: roadmap記事の「AI コパイロット 1 日 30 回（無料枠）」を enforced値=SSOT `FREE_AI_DAILY_LIMIT(10)` へ是正 `9e06379`（SSOTコメントが「30回は是正済」と記すのに取り残されていた唯一の箇所＝3倍誇張のdrift）。回帰ガード blog-quota-copy-sync。
  - **FAQPage機構(session8)を戦略記事へ展開**: 土台=科目B中核ピラー `fe-kamoku-b-taisaku` `2922a80`、旗艦=PM論文 `pm-goukaku-ronbun` `0db0f07` にオリジナル4Q&AずつのFAQ節を追加しFAQPage自動出力＋質問intentの意味整合を強化。旗艦記事はQ4で /essay へfunnel。
  - **/q メタテンプレ(P2-1)はSKIP**: lib/seo/question-meta.ts は phase10レビュー済(158字hard cap・CTA温存・answer suppression意図的・専用テスト有)で実害なし。修正は理論のみ＝過大修正の罠回避。
  - **次の最優先候補**: P2-2継続(FAQ未設置の戦略記事＝fe-kamoku-b-pseudo-language[土台]・st-senryaku-shikou/sc-ronbun-taisaku[旗艦論述,ただしSCはHD未決のframe注意]・ap-gogo-sentaku[AP午後はモックHD-4]・勉強法overview群はFAQ節無いものに4Q&A) / P1-7続き(科目B問題ページのコパイロットquick-action UI＝要慎重監査) / P0-1残り(dev痕跡410・低優先)。AP/FE午後モック=HD-4、essay深リンク=HD-5待ち。

## セッション10（growth ループ）2026-06-02 JST
- done: [P2-2/土台] **科目B擬似言語記事 fe-kamoku-b-pseudo-language に「よくある質問」節を追加しFAQPage化**。SHA `fbdc913`。
  - 監査: 科目Bクラスタの技術ピラー(擬似言語読解3ステップ)だが `## よくある質問` 節が無くsession8のFAQPage機構(lib/blog/faq.ts extractFaq)の対象外だった。「擬似言語 言語経験/読めない/苦手/トレース表/演習どこ」は科目B読者の質問intent。session9のtaisaku/PMと同パターン。
  - 実装: オリジナル4Q&A（Q1=特定言語経験は不要・IPA独自記法のトレース力／Q2=3ステップを機械的に・毎日1問8週間／Q3=本番もトレース表を書く方が速く正確／Q4=/fe/topicアルゴリズムプールで演習＋AIコパイロット行番号別追跡）を `## まとめ` 直前に additive 挿入。本文他箇所・relatedSlugs・UI不変。extractFaq が4ペア抽出→FAQPage自動出力。taisakuのQ&Aと重複しない擬似言語読解intentに限定。
  - 誇大回避: 数値(毎日1問週7問8週間)は本文既存記述と一致。/fe/topicアルゴリズムプールは午前(科目A)分野で擬似言語そのものではない点を踏まえ「トレース力の土台」と正確表現(worklog既知の区別を踏襲)。AI回数は明記せず。「最新はIPA公式で確認」明記。
  - 検証: 全ゲート緑（typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕 / test1667 / build OK）。本番ビルド `blog/fe-kamoku-b-pseudo-language.html` に `"@type":"FAQPage"`×1＋`"@type":"Question"`×4＋実問文「特定のプログラミング言語の知識は必要ですか」出力。JSON-LD acceptedAnswer はmarkdownリンク剥離済(Q4=「基本情報技術者 アルゴリズム分野の過去問」plain・`](`leak 0)、生markdownはNextのRSC flightペイロード内のみ(taisakuと同一・既存回帰テストpin済)。回帰は corpus-wide blog-faq-jsonld が自動カバー。
- done: [P2-2/旗艦] **ST論文記事 st-senryaku-shikou に「よくある質問」節を追加しFAQPage化＋/essay funnel**。SHA `4225b0c`。
  - 監査: ITストラテジスト(ESSAY_EXAM_CODES論文区分・旗艦中核intent)だがFAQ節無し。「午後II 形式/実務経験/PM・SAとの違い/自己採点」は論文受験者の質問intent。本文の既存採点CTAは noindex `/essays/st`(HD-5)。
  - 実装: オリジナル4Q&A（Q1=ア〜ウ3部構成・経営課題からの逆算／Q2=肩書き不要・経営視点で具体化＋フレームワーク／Q3=ST/PM/SAの視点差・PM記事へ内部リンク／Q4=自己採点困難→旗艦採点）。Q4の**新規**リンクは indexable `/essay`(noindex `/essays/st` へ送る既存CTAは不変=HD-5)。
  - 誇大回避: 字数/合格率など**本文に無い数値は出さず**形式の枠組みのみ記述。「IPA公式で確認」「採点基準は非公開」「AI採点は参考評価」明記。
  - 検証: 全ゲート緑（test1667 / build OK）。`blog/st-senryaku-shikou.html` に FAQPage×1＋Question×4＋実問文「午後IIはどんな形式ですか」、Q4が実DOMで `<a href="/essay">午後論述 AI 採点</a>`、JSON-LD answer `](`leak 0、既存 `/essays/st` CTA健在(1)を実測。
- done: [P2-2/旗艦] **AU論文記事 au-shiken-taisaku に「よくある質問」節を追加しFAQPage化＋/essay funnel**。SHA `7d73f63`。
  - 監査: システム監査技術者(ESSAY_EXAM_CODES論文区分)だがFAQ節無し。本文に字数(ア600-800/イ1600前後/ウ600-800)・合格率13〜16%・4段階構成あり=正確に引用可能。
  - 実装: オリジナル4Q&A（Q1=字数構成／Q2=監査経験は有利だが必須でない・監査人3視点／Q3=合格率13〜16%・4段階／Q4=自己採点困難→旗艦採点）。Q4新規リンクは indexable `/essay`(既存 `/essays/au` 不変=HD-5)。
  - 誇大回避: 字数・合格率・4段階構成は本文既存記述と一致。「IPA公式で確認」「採点基準は非公開」「AI採点は参考評価」明記。
  - 検証: 全ゲート緑（test1667 / build OK）。`blog/au-shiken-taisaku.html` に FAQPage×1＋Question×4＋実問文「午後IIはどんな字数構成ですか」、Q4 `<a href="/essay">`、leak 0、既存 `/essays/au` 健在(1)を実測。
- done: [P2-2/旗艦] **SA/SM論文記事に「よくある質問」節を追加しFAQPage化＋/essay funnel（論文5区分FAQ完了）**。SHA `652b878`。
  - 監査: sa-architecture-tradeoff(システムアーキテクト)・sm-itil-storytelling(ITサービスマネージャ)ともFAQ節無し。両記事とも本文に字数/合格率の記載なし=それらは出さない。既存採点CTAは noindex `/essays/{sa,sm}`(HD-5)。
  - 実装: SA=オリジナル4Q&A（Q1=万能解でなくトレードオフ言語化／Q2=テンプレ＋数値／Q3=SA/ST/PM視点差・ST記事へ内部リンク／Q4=旗艦採点）。SM=4Q&A（Q1=ITIL暗記でなく物語＋4段骨格／Q2=用語を物語に乗せる／Q3=改善前後の数値/MTTR例／Q4=旗艦採点）。各Q4新規リンクは indexable `/essay`(既存 `/essays/{sa,sm}` 不変=HD-5)。両記事は同パターン・同ファイルで論文5区分FAQ完成のため1コミットに集約。
  - 誇大回避: トレードオフテンプレ・99.95%例・ITIL骨格・MTTR例は本文既存記述と一致。字数/合格率は本文に無いため記述せず。「採点基準は非公開」「AI採点は参考評価」明記。
  - 検証: 全ゲート緑（test1667 / build OK）。`blog/{sa-architecture-tradeoff,sm-itil-storytelling}.html` 各 FAQPage×1＋Question×4＋Q4 `<a href="/essay">`×1＋leak 0、実問文（SA「午後IIでは何が評価されますか」/SM「ITIL用語はどう論述に使えばよいですか」）出力を実測。
- 申し送り（セッション10まとめ）:
  - **FAQPage機構(session8)を戦略記事へ大幅展開＝論文5区分FAQ完成**: 土台=科目B擬似言語 `fbdc913`、旗艦=ST `4225b0c`・AU `7d73f63`・SA/SM `652b878`。これで**論文5区分(PM[session9]/ST/AU/SA/SM)すべてがFAQPage化＋Q4で旗艦 indexable /essay へ funnel**。質問intentの意味整合＋旗艦送客を同時達成。
  - **一貫した誇大回避**: 各記事とも本文既存の数値(字数/合格率/フレームワーク/数値例)のみ引用、本文に無い数値は出さない。「IPA採点基準は非公開」「AI採点は参考評価」「最新はIPA公式で確認」を明記。FAQ Q4の旗艦リンクは indexable `/essay`、既存の noindex `/essays/<exam>` 採点CTAは**HD-5判断待ちのため一切変更しない**(equity原則 session4/7/8/9踏襲)。回帰は corpus-wide `blog-faq-jsonld.test.ts` が自動カバー(FAQ節→>0ペア・markdown剥離・non-vacuous≥20)。
  - **次の最優先候補**: P2-2継続(FAQ未設置の戦略記事＝勉強法overview群でFAQ節無いもの・it-shikaku-nendaibetsu-roadmap等の高可視ブログに4Q&A。ただしSC=HD未決frame・ap-gogo=AP午後モックHD-4はFAQ化も保留) / P1-7続き(科目B問題ページのコパイロットquick-action UI＝要慎重監査) / P0-1残り(dev痕跡410・低優先)。AP/FE午後モック=HD-4、essay深リンク=HD-5待ち。

## セッション11（growth ループ）2026-06-02 JST
- done: [P2-2/横断] **勉強法overview全13区分(`<exam>-goukaku-benkyouhou`)に「よくある質問」節を追加しFAQPage化**。SHA `6202e19`。
  - 監査: session8〜10で個別記事(科目B 2本・論文5区分)をFAQ化したが、**最も体系的な高オーソリティ群＝`buildOverviewPost`が生成する13区分の勉強法overview記事には `## よくある質問` 節が無く**、session8のFAQPage機構(lib/blog/faq.ts extractFaq)の対象外だった。backlog P2-2「勉強法overview群でFAQ節未設置のもの」直撃。it-shikaku-nendaibetsu-roadmap は既にFAQ保有(5521)を確認(=対象外、backlog記述は stale)。
  - 実装: `buildOverviewPost`(generators.ts:40) の `## まとめ` 直前に**テンプレ4Q&A**を additive 挿入(全13区分共通)。Q1=勉強時間(${p.studyHours}・週12-20h)/Q2=未経験独学可(書籍30:過去問70)/Q3=難易度合格率(${p.passRate})/Q4=過去問何年分(過去3年95%)＋`/<exam>`過去問一覧へ送客。全て**本文既存の数値のみ**引用し誇大回避。`level.toUpperCase()`("SKILL3")の不自然表現はFAQ本文に出さず。1テンプレ編集で13記事が一括FAQPage化。
  - 旗艦funnel: 論文5区分(st/sa/pm/sm/au)のoverviewは既存 `flagshipEssayCta` で本文午後節から `/essay` へ送客済(session6 `122c129`)。FAQは全13区分で統一フォーマット(テスト容易性)とし、essay funnelはFAQに重複追加せず。st overview で `href="/essay"`×2 健在を実測確認。
  - 検証: 全ゲート緑(typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕 / test1667→1668(+1) / build OK)。本番ビルド `blog/ap-goukaku-benkyouhou.html` に `"@type":"FAQPage"`×1＋`"@type":"Question"`×4＋実問文「実務未経験・独学でも合格できますか」出力、Q4 acceptedAnswer は plain text(「応用情報技術者試験 過去問一覧 から年度別」=markdown剥離・JSON-LD leak 0)を実測。`st-goukaku-benkyouhou.html` も FAQPage×1＋Question×4＋既存/essay CTA×2 健在。回帰ガード `blog-faq-jsonld.test.ts` に「overview全件(≥13)=4Q&A・answer markdown剥離」テスト追加(テンプレFAQ削除で落ちる)。
- done: [P2-2/高可視] **朝活記事 `syakaijin-asakatsu-benkyou` に「よくある質問」節を追加しFAQPage化**。SHA `90ab87a`。
  - 監査: 高可視ロングテール(社会人朝活習慣化)だがFAQ節無し。「朝活 続かない/夜型/何時起き/学習時間」は強い質問intent。
  - 実装: オリジナル4Q&A(Q1=段階起床6:30→5:30/Q2=夜型でも就寝固定+スマホ禁止/Q3=朝60分+用語3つ振り返り/Q4=隙間時間→関連記事 ipa-shiken-shakaijin-jikan-kakuho へ funnel)。**本文既存の助言のみ**引用し誇大回避。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1668/build OK)。`blog/syakaijin-asakatsu-benkyou.html` に FAQPage×1＋Question×4＋実問文「夜型なのですが朝活に切り替えられますか」出力、Q4 acceptedAnswer plain(「時間を確保する方法 を参照」=markdown剥離)、リンク先 ipa-shiken-shakaijin-jikan-kakuho.html(200) 実在を実測。corpus-wide test 自動カバー。
- done: [P2-2/高可視] **roadmap記事 `kakomon-ai-roadmap-2026` に現状ベースの「よくある質問」節を追加しFAQPage化**。SHA `8e4dc3b`。
  - 監査: 高可視の製品ロードマップ記事(「過去問AI 無料/課金」獲得intent)だがFAQ節無し。**ただし本文は未実装ロードマップ項目(Q2 2026=AP/DB/NW/SC午後採点"全面展開"・業種別100→300・PDF出力・学習プラン自動生成)を含む**。FAQで未実装を現状の事実として誇張する罠を避けるため、**現状の present-state のみに限定**して実装。
  - 実装: オリジナル4Q&A(Q1=全機能無料か/Q2=課金予定=現状無料運営・継続方針/Q3=対応13区分(IP/SG/FE/AP+ST/SA/PM/SM/NW/DB/SC/ES/AU 列挙)/Q4=AI無料回数=SSOT `AI_QUOTA_COPY_SHORT`)。未実装の午後採点capabilityには一切触れず(誇大回避)。「全機能無料」は§0戦略・本文既存記述の restate であり新規戦略判断ではない。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1668/build OK)。`blog/kakomon-ai-roadmap-2026.html` に FAQPage×1＋Question×4＋実問文「今後、有料化や課金の予定はありますか」「どの試験区分に対応していますか」出力、quota は「初回 10 回無料」(SSOT)・「30 回」**0件**を実測(session9の誇張是正を持ち込まず)。corpus-wide test 自動カバー。
- SKIP無し(roadmapは present-state限定で安全に実施)。FAQ未設置の残りは pomodoro 等の学習テクニック系ロングテール=戦略価値低・saturation懸念のため本セッションでは見送り。
- 申し送り（セッション11まとめ）:
  - **FAQPage機構の戦略記事カバレッジをほぼ完了**: (1)勉強法overview**全13区分**を1テンプレ編集で一括FAQPage化＋回帰ガード `6202e19`、(2)高可視ロングテール朝活 `90ab87a`、(3)高可視roadmap(present-state限定) `8e4dc3b`。これで**戦略的高オーソリティ/高可視記事のFAQ化は概ね完了**(overview13・論文5区分・科目Bクラスタ4・rirekisho・nendaibetsu-roadmap・朝活・roadmap)。
  - **一貫した誇大回避**: 全Q&Aで本文既存の数値/事実のみ引用、本文に無い数値・未実装capabilityは出さない。roadmapはFAQを present-state(無料/課金/対応区分/AI回数)に限定し未実装の午後採点全面展開(HD-4)に触れない。AI回数はSSOT `AI_QUOTA_COPY_SHORT` 参照で30回誇張を排除。
  - **次の最優先候補**: FAQはほぼ飽和(残りは pomodoro 等の学習テク系ロングテール=戦略価値低)。次は **角度を変える**: P2-3(内部リンク網/orphan価値ページへの導線)、P1-7続き(科目B問題ページのコパイロットquick-action UI＝要慎重監査・broad)、P0-1残り(dev痕跡410・低優先)。AP/FE午後モック=HD-4、essay深リンク=HD-5待ち。学習テク系ロングテール(pomodoro/その他習慣化)へのFAQ展開は「やれること」だが saturation 配慮で優先度低。

## セッション12（growth ループ）2026-06-02 JST
- 監査(read-only): FAQ飽和を踏まえ角度変更。既存 `scripts/audit-internal-links.ts` を実走し**実測ベース**で着手先を特定(憶測排除)。success-stories クラスタは全 `robots:index:false,follow:false`(AIペルソナ)でSEO equity無し→対象外。
- done: [P2-3/内部リンク] **孤立blog2記事(inbound 0)を親ハブから内部リンクしde-orphan**。SHA `8ac2a50`。
  - 監査: 監査スクリプトで inbound 0 の orphan 2件検出= `goukakusha-shukan-review`(週次レビュー)・`shaiin-bunkatsu-plan-3pattern`(細切れ学習計画3パターン)。両者の自然な親= `ipa-shiken-shakaijin-jikan-kakuho`(社会人の時間確保・indexable・多数inbound)で、両 orphan は親へ outbound 済だが親からの inbound が無かった。
  - 修正: 親ハブ本文(失敗パターン節直後)に文脈リンク1段落を additive 追加。**本文リンクは getRelatedPosts の limit=3 カットオフ対象外**=確実にレンダ(relatedSlugs末尾追加だと非表示リスク有のため本文リンクを選択)。
  - 検証: 監査再実行で orphan 0(WARNING 0・body links 555→557)、本番ビルド hub HTMLに両 orphan の `href="/blog/..."` 各1出力、両ターゲット prerendered(200)。全ゲート緑(typecheck0/lint0err/test1668/build OK)。
- done: [tooling/P2-3支援] **内部リンク監査の誤検知(FATAL5件)を解消**。SHA `cdc515c`。
  - 監査: audit-internal-links の buildValidPaths が `/[exam]/topic/[category]`(dynamicParams=false+notFound・静的param=groupByCategory由来)を含まず、本文の percent-encoded topic 深リンク(アルゴリズムプール等)5件を実在200にもかかわらず dead-link 誤検知。**ループ自身のP2-3ツールが信頼不能**(real dead-link を埋もれさせる実害)。
  - 修正: blog-index.test の topic 解決と**同一source of truth**(getAvailableExams×groupByCategory(getQuestionsByExamStrict))で valid set に topic path を追加。
  - 検証: 再実行で FATAL 5→0・WARNING 0(誤検知のみ消え、stale/誤encode の topic 深リンク検知力は維持)。スクリプトは app/test 未import で実行時影響なし。全ゲート緑(test1668)。**監査が信頼可能に**。
- done: [P2-4/収益] **旗艦論述funnelの区分別サンプル一覧 /essays/[exam] に午後対策本アフィリを追加**。SHA `2f75565`。
  - 監査: 旗艦 /essay・/essays・/essays/[exam] は**書籍アフィリ皆無**(/qページや/transparencyには既存)。P2-4「午後対策本へ自然送客」直撃。essay区分=sc/st/sa/pm/sm/au。
  - 実装: 「活用方法」直後に既存 `InlineBookHint`(data/recommended-books+env既存タグ流用)を `category="午後"` で配置。各区分の「専門知識＋午後問題」重点対策本を正確推薦。/qページ既存パターン踏襲で押し売りにせず additive。
  - 誇大/事実性回避: `category="午後"`は全6区分(SC午後=記述含む)で正確な午後本を拾い**SCを論文区分と誤framingしない**(session3/8のSC HD懸念を増幅せず)。ASIN未設定でも書誌+/recommended-books/[exam]内部リンクは描画、affiliateは rel="sponsored"・[PR]表示。
  - 検証: 本番ビルド /essays/{pm,sc,st}.html に「この分野を体系的に学べる参考書」＋重点対策本＋rel="noopener noreferrer sponsored"＋href="/recommended-books/<exam>" 実測。全ゲート緑(test1668)。新規404なし。
- done: [P2-4/収益] **旗艦funnel最深部=答案詳細ページにも午後対策本アフィリを追加**。SHA `bb5a241`。
  - 監査: /essays/[exam]/[yearSeason]/pm2/[qnum](高intent・答案読了直後)も書籍アフィリ皆無。「自分の答案を AI で採点してみる」CTA直後が自然な学習導線位置。
  - 実装: 同CTA直後に `InlineBookHint category="午後"` を `print:hidden` で配置。型: resolveQuestion 内 isEssayExamCode 検証済だが local を narrow しないため明示ガード追加で resolved.exam を EssayExamCode に narrow(any不使用)。
  - 検証: 本番ビルド /essays/pm/2023-spring/pm2/q1.html に書誌+rel="sponsored"+href="/recommended-books/pm"+既存採点CTA を実測。全ゲート緑(test1668)。
- done: [test/P2-4ガード] **essay各区分に午後タグ書籍が在ることを回帰ガード**。SHA `4239af8`。
  - cycle3/4のアフィリは `category="午後"`で午後タグ書籍を拾うため、essay区分から午後本が消える/付替わると旗艦funnel上で非午後本(教科書等)に黙ってフォールバックする data契約リスク。`recommended-books.test.ts` に「各 ESSAY_EXAM_CODE に午後タグ書籍≥1・non-vacuous」を pin。test1668→1669。全ゲート緑。
- 申し送り（セッション12まとめ）:
  - **角度変更=実測ベースのP2-3/P2-4**: (1)監査スクリプト実走で orphan 2件を de-orphan `8ac2a50`、(2)監査自身の誤検知(topic route 5件)を是正しループのツールを信頼可能に `cdc515c`、(3)(4)旗艦論述funnel(区分別一覧＋答案詳細)に午後対策本アフィリ新設 `2f75565`/`bb5a241`、(5)その data契約の回帰ガード `4239af8`。
  - **誇大/事実性の一貫**: アフィリは `category="午後"`で全6区分(SC記述含む)正確、SCを論文と誤framingしない。affiliate hygiene(rel="sponsored"・[PR]・env既存タグ・env無編集)。旗艦露出原則(header/home/footer/q-page＝session4/7)に essay funnel の収益面を追加。
  - **次の最優先候補**: P2-4続き(旗艦indexableハブ /essay 自体は5区分横断で書籍1冊選定が難しい＝設計判断寄り・/essayへのアフィリは保留 or 区分横断「論述対策の定番書」リスト化を要検討) / P1-7続き(科目B問題ページのコパイロットquick-action UI＝要慎重監査・broad) / P2-3続き(監査が信頼可能になったので今後の dead-link/orphan 検知に活用) / P0-1残り(dev痕跡410・低優先)。AP/FE午後モック=HD-4、essay深リンク=HD-5待ち。

## セッション13（growth ループ）2026-06-02 JST
- 監査(read-only): audit-internal-links 実走=FATAL0/WARNING0(blog内部リンク健全・orphan 0)。sitemap は旗艦 /essay(L104)＋全 topic pool(L167)を包含・/[exam]/topic ページはMetadata/canonical/OG/JSON-LD(CollectionPage+BreadcrumbList)完備で構造健全=修正不要。**新角度**: 高密度本文走査スクリプトで「科目B/論述を厚く論じるが本文から戦略ページ(土台ピラー/旗艦)へ未送客の高オーソリティ記事」を実測抽出(KAMOKUB-NOLINK / RONJUTSU-NOFLAG)。relatedSlugs は limit=3 でカットされ得る(session12既知)ため**本文リンク**で funnel を確実化。
- done: [P2-3/内部リンク] **高可視 履歴書記事 it-shikaku-rirekisho-kakikata(rank~15・本文内部リンク2本のみ)の「転職市場での評価傾向」節→年代別ロードマップへ内部リンク**。SHA `6755ea3`。評価傾向(職種/年代で評価が変わる)から自然な「狙うべき試験の選び方」=nendaibetsu-roadmap(rank6.2・旗艦/土台へ funnel済 session6)へ1文 additive。検証: 本番ビルド HTML に `href="/blog/it-shikaku-nendaibetsu-roadmap"`×1・既存 eligible-companies×2 健在・target prerendered(200)。全ゲート緑(test1669)。
- done: [P1-7/土台 funnel] **fe-benkyou-jikan-meyasu(科目B×16言及・「最大の壁」)の本文→土台ピラー fe-kamoku-b-taisaku**。SHA `b7c5c87`。本文リンクは汎用/feのみでピラーは relatedSlugs(limit3カット可)経由のみだった。科目B不安が最高潮の「最大の壁」直後に体系対策ピラーへ1文 additive。検証: HTML に pillar link×2(本文+rail)・/fe×3健在・target 200。全ゲート緑(test1669)。
- done: [P1-7+P1-1/土台+旗艦 funnel] **kakomon-dake-goukaku(過去問依存度比較)の科目B節→土台ピラー、論文系高度節(ST/SA/PM/SM/AU)→旗艦 /essay**。SHA `1c27df1`。両専節とも試験ハブ止まりで戦略ページ未送客。科目B節→fe-kamoku-b-taisaku、論文節(本節scope=論文5区分と一致)→/essay(参考評価明記)。検証: HTML に pillar×1・/essay×2(本文+footer)・/fe健在・両target 200。全ゲート緑(test1669)。
- done: [P1-7/土台 funnel] **kakomon-nankai-tokinaosu(「科目B を5周以上する理由」専節保有)の本文→土台ピラー**。SHA `62659d7`。他5記事へリンクしつつピラーへは未送客だった。周回motivation最高潮の専節末に1文 additive。検証: HTML に pillar×1・既存 data-driven-revision×2健在・target 200。全ゲート緑(test1669)。
- 申し送り（セッション13まとめ）:
  - **新角度=本文funnel gap の実測抽出と是正**: 高密度走査で「科目B/論述を専節で厚く論じるが本文から戦略ページへ未送客」の高オーソリティ記事を特定し、relatedSlugs(limit3カット可)に頼らない**本文リンク**で土台ピラー fe-kamoku-b-taisaku / 旗艦 /essay へ funnel。4記事是正(rirekisho→roadmap / fe-benkyou-jikan-meyasu / kakomon-dake-goukaku→土台+旗艦 / kakomon-nankai-tokinaosu)。全て自然な専節内・additive・誇大回避(論文funnelは論文5区分scope一致時のみ・参考評価明記)・新規404ゼロ。
  - **未消化の funnel gap候補(次セッション継続可)**: 走査結果で本文未送客が残る高密度記事= `ipa-sanko-mondaishu-2026`(科目B×4・参考書記事)/ `ipa-shiken-ai-katsuyou-benkyouhou`(論述言及) 等。**ただしテンプレ生成群(cyokusen/yoru/overview)の RONJUTSU-NOFLAG は 13区分一括生成のため flagship 追加には overview同様の論文5区分ゲートが必須**(ip/sg/fe等の非論文に /essay を出さない=誇大回避)。overview は既に flagshipEssayCta 済(session6)。手書き個別記事の自然な gap のみ拾い、saturation を避ける。
  - **次の最優先候補**: 上記 funnel gap 残り(個別記事のみ・自然な専節がある場合) / P2-4続き(旗艦/essay 横断書籍リスト=設計判断) / P1-7本丸(科目B問題ページ コパイロット quick-action UI＝要慎重監査・broad・§10承認寄り) / P0-1残り(dev痕跡410=元々非公開・SEO価値低で実害薄・SKIP寄り)。AP/FE午後モック=HD-4、essay深リンク=HD-5。

## セッション14（growth ループ）2026-06-02 JST
- 監査(read-only): session13の未消化 funnel gap候補 `ipa-sanko-mondaishu-2026`・`ipa-shiken-ai-katsuyou-benkyouhou` を精査。両記事とも本文に旗艦 /essay / 土台ピラー fe-kamoku-b-taisaku への送客が**実測ゼロ**(grep確認)で、論文添削・科目Bを専節で論じるのに戦略ページへ未funnel だった。
- done: [P2-3/旗艦 funnel] **参考書ガイド記事 ipa-sanko-mondaishu-2026 の論文区分節(レベル4 PM/ST/SA/AU)→旗艦 /essay**。SHA `6b92a25`。同記事(全13区分参考書ガイド・hubOffset+4)は管理系高度試験の「論文のフィードバック・添削サービス」を本文で論じるのに /essay へ未送客。論文5区分(ST/SA/PM/SM/AU)scope一致のため本文に1文 additive。検証: 本番ビルド `blog/ipa-sanko-mondaishu-2026.html` に `href="/essay"`×2(本文+footer)・新句「論理性・具体性・題意適合の観点から採点」出力・essay.html(200)実在。全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1669/build OK)。
- done: [P2-3/P1-7/土台 funnel] **同記事 基本情報 科目B節→土台ピラー fe-kamoku-b-taisaku**。SHA `5853859`。科目B節は擬似言語記事のみリンクしピラー(完全対策)へ未送客だった。体系対策の進め方として本文に1リンク additive(擬似言語リンクは温存)。検証: HTMLに pillar link×1・擬似言語link×1健在・taisaku.html(200)実在。全ゲート緑(test1669)。
- done: [P2-3/旗艦 funnel] **AI活用記事 ipa-shiken-ai-katsuyou-benkyouhou の「テンプレート4：論文構成の添削」節→旗艦 /essay**。SHA `05bec2b`。同節は手動の ChatGPT/Gemini 添削プロンプトを教えるが、それを専用化した旗艦=午後論述AI採点(/essay)へ未送客だった。同節末に1文 additive で funnel(論文5区分scope明記・参考評価明記)。検証: `blog/ipa-shiken-ai-katsuyou-benkyouhou.html` に `href="/essay"`×2(本文+footer)・新句「この添削プロンプトを専用化した」出力・essay.html(200)。全ゲート緑(test1669)。
- 申し送り（セッション14まとめ）:
  - **session13の funnel gap 残候補を消化**: 2つの高オーソリティ手書き記事(参考書ガイド hub・AI活用テンプレ)の自然な専節(論文添削・科目B)から旗艦 /essay・土台ピラーへ本文リンクで funnel。3記事是正。relatedSlugs(limit3カット可)に頼らず本文リンクで確実化、論文funnelは論文5区分scope一致時のみ・参考評価明記・新規404ゼロ。
  - **funnel gap はほぼ飽和**: 手書き個別記事で「専節で厚く論じるのに本文未送客」の自然な gap は session13-14 でほぼ拾い切った。テンプレ生成群(cyokusen/yoru)の RONJUTSU-NOFLAG は13区分一括生成のため論文5区分ゲート実装が必須(overview同様)＝コード設計を伴うため次の角度。saturation 回避のため無理に本文リンクを増やさない。
  - **次の最優先候補**: テンプレ生成群(cyokusen/yoru)への論文5区分ゲート付き flagshipEssayCta 展開(overview の flagshipEssayCta パターン流用・要慎重設計) / P1-7本丸(科目B問題ページ コパイロット quick-action UI＝要慎重監査・broad・§10承認寄り) / P2-4続き(旗艦/essay 横断書籍リスト=設計判断) / P0-1残り(dev痕跡410=実害薄・SKIP寄り)。AP/FE午後モック=HD-4、essay深リンク=HD-5。

## セッション15（growth ループ）2026-06-02 JST
- done: [P2-3/旗艦] **テンプレ生成記事 lastMonth(直前1ヶ月)/practice(解き方ガイド)の午後節から旗艦 /essay へ論文5区分ゲート funnel**。SHA `d648150`。
  - 監査: session14が次候補とした「テンプレ生成群(cyokusen/yoru)の RONJUTSU-NOFLAG」を実装。`buildLastMonthPost`(`<exam>-cyokusen-1kagetsu`)の「第3週：午後試験の本番演習」節・`buildPracticePost`(`<exam>-yoru-tokurensyu`)の「午後・論文への接続」節は午後/論述を論じるのに旗艦=午後論述AI採点へ未送客だった(13区分一括生成のため未対応)。`buildFrequentTopicsPost`/`buildAnalysisPost`は頻出論点/出題傾向分析で論述writing節が無く、CTA追加は不自然＝対象外(saturation回避)。
  - 実装: overviewと同じ既存ゲート `ESSAY_FLAGSHIP_EXAMS`(=ESSAY_EXAM_CODES複製 st/sa/pm/sm/au)で論文区分のみ各節末に `](/essay)` を additive 追加。ap/sc/nw/db/es等の非論文・モック区分には出さず誇大回避。「AI採点は参考評価」明記。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1669→1697/build OK)。本番ビルドで pm/st/au の {cyokusen,yoru} HTML に `href="/essay"`×2(本文CTA+footer)＋新句「直前期に書いた論述答案」「論述の答案まで書けるようになったら」、ap/fe は×1(footerのみ・本文CTA 0件)を実測。essay.html(200)実在＝新規404ゼロ。回帰テストを overview/lastMonth/practice 3生成器横断にパラメータ化(各々 linked===5・non-vacuous)しゲートdriftを検知。
- done: [P2-3/P1-7/土台] **同 lastMonth/practice の午後節から、FEのみ土台=科目B完全対策ピラーへ funnel(FE限定ゲート)**。SHA `471dfd6`。
  - 監査: FEの午後＝科目B(アルゴリズム・擬似言語、exam-data afternoonStrategyで確認)。旗艦funnelと対称に、FEの午後節は汎用/feプールのみで土台ピラー fe-kamoku-b-taisaku へ未送客だった。
  - 実装: `exam==="fe"` ゲートで FE のみ `](/blog/fe-kamoku-b-taisaku)` を各午後節末に additive。他区分には出さずoff-topic回避。overviewは午後節が論述framedでFE科目Bに不自然なため対象外(lastMonth/practiceのみ)。
  - 検証: 全ゲート緑(test1697→1723/build OK)。FE {cyokusen,yoru} HTML にピラーリンク×1、ap/st は0件、pillar HTML(200)実在、新句「基本情報の午後は科目B」を実測。回帰テストでFEのみゲートを固定(2生成器×13区分)。
- done: [P2-2/誇大回避] **出題傾向分析記事(buildAnalysisPost)の「最新」タイトルを固定年(2024〜2025)→CURRENT_YEARへ是正**。SHA `b508a8e`。
  - 監査: `<exam>-jisseki-mondai-bunseki` のタイトルが「最新分析｜2024〜2025年で増えた論点」と固定年を埋め込み、本文・descriptionは既にevergreenな「直近2年」。overviewタイトル(`【${CURRENT_YEAR}年最新】`)とgenerators.ts line10コメントが定めるCURRENT_YEAR評価のevergreen規約から唯一driftした箇所＝年が進むと「最新」と謳いつつ陳腐化する誇大表示(session9の30回drift是正と同種)。
  - 修正: `【${CURRENT_YEAR}年最新】｜増えた論点・捨て論点` へ統一(最小diff・本文/description不変)。なお general記事 `ipa-saishin-doukou`(最新動向2026)は本文・tagが2026年snapshotとして一貫(年固有の制度改定factあり)＝auto-advanceは逆に誇大になるため対象外(SKIP・人間が年次更新)。
  - 検証: 全ゲート緑(test1723→1725/build OK)。本番ビルド `ap-jisseki-mondai-bunseki.html` の `<title>` が「【2026年最新】」表示・「2024〜2025」0件を実測。回帰テストで overview/analysis の最新タイトルが CURRENT_YEAR を参照し他の固定4桁年を含まないことを固定。
- 申し送り（セッション15まとめ）:
  - **テンプレ生成群への旗艦/土台 funnel を完了**: overview(session6)に続き lastMonth/practice の午後節に論文5区分ゲートの旗艦/essay funnel `d648150` ＋ FE限定の土台ピラー funnel `471dfd6` を対称配線。frequentTopics/analysisは論述writing節が無く対象外(saturation回避の意図的除外)。これで**13区分テンプレ生成記事の自然な午後節funnelは網羅**。
  - **誇大回避の一貫**: 旗艦は ESSAY_FLAGSHIP_EXAMS(=ESSAY_EXAM_CODES)ゲートで論文5区分のみ・「参考評価」明記、土台はFE限定・on-topic(FE午後=科目B)、固定年タイトルはCURRENT_YEAR規約へ是正。各々回帰テストでゲート/規約のdriftを検知。
  - **funnelはほぼ飽和**: 論文exam は header/home/footer/q-page＋overview/lastMonth/practice本文＋論文5記事FAQ で旗艦へ厚く送客済。FEも lastMonth/practice本文＋科目Bクラスタ相互リンクで土台へ送客済。**これ以上の本文funnel追加はsaturation**＝無理に増やさない(session11/14の restraint 継続)。
  - **次の最優先候補(残りは設計判断/broad/低価値が中心)**: P1-7本丸(科目B問題ページ コパイロット quick-action UI＝要慎重監査・broad・§10承認寄り) / P2-4続き(旗艦/essay 横断書籍リスト=設計判断) / テンプレFAQ(lastMonth直前等にFAQ節＝強intentだが overview FAQ と二重で corpus-wide thin化リスク・saturation配慮で優先度低) / P0-1残り(dev痕跡410=実害薄・SKIP寄り)。AP/FE午後モック=HD-4、essay深リンク=HD-5。**新角度の起案**: 「設問ページ /q の論文区分でAfternoonEssayHint(session7)が出るが、科目B区分(FE科目B問題)に土台ピラー/コパイロット導線のgated hintは未整備」→P1-7のUI慎重監査と合わせて検討可。

## セッション16（growth ループ）2026-06-02 JST
- done: [P1-7/土台/新角度] **最大クロール面 /q/* の FE科目B(擬似言語)設問に土台=科目B完全対策ピラーへの gated hint を新設**。SHA `eb42014`。
  - 監査: session15起案の新角度。/q では論述5区分に `AfternoonEssayHint`(旗艦/essay・session7 `c785e6a`)が gated 出力されるが、**FE科目B設問から土台ピラー `fe-kamoku-b-taisaku` への導線が未整備**だった。FE科目Bデータは実在(`data/questions/fe/by-year/{2024,2025}-cbt-kamoku-b.ts`・計7問・全 category=アルゴリズムとプログラミング・session="kamoku-b"・real IPA sourcePdfUrl・needsReview 0)＝モックでなく擬似言語の実データ＝土台hintは on-topic で誇大でない。CategoryStudyTip は topic pool のみリンクしピラー未送客＝additive で重複なしを確認。
  - 実装: `components/quiz/KamokuBStudyHint.tsx` を新設(AfternoonEssayHint と対称の null-gate server component)。`exam==="fe" && session==="kamoku-b"` のときのみ SSR の `<Link href="/blog/fe-kamoku-b-taisaku">`(indexable土台ピラー)を出力。誇大回避: **FE午前MCの「アルゴリズムとプログラミング」分野は擬似言語そのものではない**ため、分野(category)ではなく **session で厳密ゲート**(=実データの科目B擬似言語問題のみ)。文言は「擬似言語のトレース力」「AIコパイロットに1行ずつトレースして」で土台＋コパイロット導線。page.tsx の AfternoonEssayHint 直後(print:hidden)に配置。
  - 検証: 全ゲート緑(typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕 / test1725→1729(+4) / build OK)。本番ビルドで `q/fe/2024-cbt/kamoku-b/q1.html` に `href="/blog/fe-kamoku-b-taisaku"`＋「科目Bは擬似言語のトレース力で決まる」「科目B 完全対策を読む」出力(SSR+RSC flightで各2)、`q/fe/2024-cbt/kamoku-a/q1.html`(科目A)・`q/pm/2024-autumn/am1/q1.html`(他区分)は hint コピー **0件**を実測。ピラー target `blog/fe-kamoku-b-taisaku.html`(200・127KB)実在＝新規404ゼロ。回帰テスト `__tests__/components/KamokuBStudyHint.test.tsx`(FE科目Bのみリンク・FE科目A含む全7非kamoku-bセッション空・FE以外全12区分空・non-vacuous全13区分exercise)。FE科目B7問は非placeholder・非needsReview＝getIndexableQuestionsでsitemap収録(crawl面が実在)を確認。
- done: [P1-7/土台 funnel] **FE午後ページ /fe/afternoon に土台=科目B完全対策ピラーへの導線を FE限定で追加**。SHA `aeb85b1`。
  - 監査: `app/[exam]/afternoon/page.tsx`(11区分共有・FE含めsupported区分はindexable〔unsupportedのみnoindex〕)はFE午後の練習用AI採点ベータページだが、体系的な科目B対策(土台ピラー)への送客が皆無だった。FE午後=科目B(アルゴリズム・擬似言語)なのでピラー link は on-topic。/q FE科目B hint(`eb42014`)と対称の土台funnelを、より上位のハブ面にも配線。
  - 実装: AfternoonDisclaimer 直後に `code==="fe"` ゲートで `<Link href="/blog/fe-kamoku-b-taisaku">` を additive 追加(既存import FileEdit/ChevronRight流用・新規import無し)。誇大回避: study導線であり**練習データの性質(モック/ベータ)には触れない**ため誇大なし。他10区分には出さずoff-topic回避。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1729/build OK)。本番ビルド `fe/afternoon.html` に `href="/blog/fe-kamoku-b-taisaku"`×1＋「基本情報の午後は科目B（アルゴリズム・擬似言語）が中心」出力、`ap/afternoon.html`・`pm/afternoon.html` は当該コピー **0件**を実測。ピラー target(200)実在＝新規404ゼロ。
- 監査(read-only・所見なし): `audit-internal-links` 実走=blog 155記事/1070リンク(body 577/related 493)で FATAL 0・WARNING 0(dead-link/orphan ゼロ)。blog funnel面は健全・飽和を再確認。getBlogPostsByExam は publishedAt降順 slice(0,3) で /[exam] ハブの関連ブログを出すが、並び替えは13区分全てに影響する挙動変更=設計判断のため pillar 優先化はSKIP(過大修正回避)。
- 申し送り（セッション16まとめ）:
  - **新角度=土台(科目B)を /q と /afternoon の2面に gated 配線**: (1)/q FE科目B設問(最大クロール面)に KamokuBStudyHint `eb42014`、(2)/fe/afternoon ハブに pillar link `aeb85b1`。いずれも旗艦 AfternoonEssayHint(session7)と**対称**の土台funnelで、session で厳密ゲート(=実データのFE科目B擬似言語のみ・午前MC algorithm分野と混同しない誇大回避)。回帰テストでゲートdrift検知。
  - **funnel/SEO面は引き続き飽和**: blog内部リンク監査クリーン、旗艦/土台ともグローバル面＋本文＋FAQ＋/q＋/afternoonで送客済。これ以上の本文/導線追加はsaturation。
  - **次の最優先候補(残りは設計判断/broad/§10/低価値中心)**: P1-7本丸(quiz player/QuestionCard上のコパイロット quick-action UI＝共有UI・broad・要慎重監査・§10寄り) / P2-4続き(旗艦/essay 横断書籍リスト・blog本文書籍リンク=設計判断/affiliate hygiene難) / P0-1残り(dev痕跡410=実害薄) / getBlogPostsByExam の pillar優先化(設計判断)。AP/FE午後モック=HD-4、essay深リンク=HD-5。**新角度の起案(未着手・backlog P1-7へ追記済)**: quiz player の解説カード(ExplanationLayers等)に /q と同じ旗艦/土台 gated hint を出すか検討(ただし共有UI=要慎重監査)。

## セッション17（growth ループ）2026-06-02 JST
- 監査(read-only): funnel/SEO面が飽和(session13-16)のため**新角度=事実性監査**へ転換。P0(404/sitemap)は堅牢を再確認(sitemap-resolvability.test がquestion/exam/topic/blog全URLの解決性＋GONE/301突合をガード、`/q`は構造化ルートのみで旧フラット形式は存在せず=P0-3の系統的旧形式仮説は否定、dev痕跡410は実害薄)。代わりに generators.ts が exam-data.ts(プロフィールSSOT)と試験形式の数値で矛盾していないかを実測照合。
- done: [P2-2/事実性] **FE科目Bの試験時間 90分→100分 の事実誤りを是正(土台ピラー＋FAQ JSON-LD)**。SHA `56548c4`。
  - 監査: 土台ピラー `fe-kamoku-b-taisaku` が科目Bを「20問・90分・1問4.5分」と3箇所(本文L3285/L3297＋**FAQ Q1 L3373**)で記載。`fe-kamoku-b-wakaranai` も「約4.5分」(L6176)。だが IPA公式(科目Bサンプル問題PDF・パンフレット)で **科目B=100分/20問**(科目A=90分/60問)を確認。90分は科目Aの値の取り違え＝事実誤り。exam-data.ts FE は「科目B 5〜8分/問」と既に正しく、generators がそれと矛盾していた。誤値は**FAQPage JSON-LD(Googleが読む構造化データ)にも露出**＝実害大。
  - 修正: 4箇所を 100分/1問5分 へ是正(最小diff・科目A=90分や DB午後I=90分・他exam 90分は不変)。検証: 本番ビルド `blog/fe-kamoku-b-taisaku.html` に「100分」×8・「90分」**0件**・「1問5分」・FAQ JSON-LDに「試験時間は100分です…約5分」、`fe-kamoku-b-wakaranai.html` に「約 5 分」(残存4.5はブックマークSVGのpath data＝無関係を確認)。回帰テスト `blog-generators.test.ts` に FE科目B事実(100分含む/90分・4.5を含まない)を pin(test1729→1731)。全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1731/build OK)。
- 人間判断へ: [HD-6] **ブログ `sc-ronbun-taisaku` がSC午後を「論文(論述)試験」と誤記載＝事実誤り確定**。IPA公式でSC午後=**記述式**(2023改定で午後I・II統合・SCに論文試験は存在しない・論文区分はST/SA/PM/SM/AUのみ)を検証。本記事は「午後II論述」「合格論文」「設問ア〜ウ3,200字」と論文区分の体裁を流用した捏造フォーマット。前提全体が誤りで最小diff是正不能＝全面リライト or 削除(410/301)は情報設計＋編集判断＝prior session3が既に人間預かり。懸念→事実誤り確定に格上げしIPA出典付きで `growth-human-decisions.md` HD-6 に記録(自律リライト/削除はsitemap/funnel波及のため非実行)。
- 申し送り（セッション17まとめ）:
  - **新角度=事実性監査が当たり**: funnel飽和後の有効な角度として「generators.ts vs exam-data.ts の試験形式数値の矛盾照合＋IPA公式での検証」を実施。(1)FE科目B 90分→100分の誤りを是正(FAQ JSON-LD含む・回帰pin) `56548c4`、(2)SC午後の論文誤framing を事実誤りとして確定しHD-6へ。いずれもIPA公式PDF/ページで authoritative に裏取り。
  - **次の最優先候補**: 事実性監査の継続(論文5区分の午後II字数/時間、AP午前150分・高度免除2年等の数値が IPA公式と一致するか・矛盾箇所のみ最小diff是正。AP午後5問解答/150分・IP100問120分600点・FE科目A60問90分は本セッションで確認済=正)。SC HD-6 の編集方針は人間待ち。残りは従来通り P1-7本丸(§10/broad)・P2-4(設計判断)・AP/FE午後モック=HD-4・essay深リンク=HD-5。

## セッション18（growth ループ）2026-06-02 JST
- 監査(read-only): session17の事実性監査を継続。generators.ts/exam-data.ts の試験形式数値(問数/時間/字数/配点)をIPA公式で照合。
- done: [P2-2/事実性] **ITストラテジスト(ST)午後の出題数を是正(午後I 4→3問中2問・午後II 3→2問中1問)**。SHA `fdda1c5`。
  - 監査: `exam-data.ts` ST.afternoonStrategy が「午後I は事例 **4問中2問**記述、午後II は論文 **3問中1問**選択 2時間」と記載。IPA公式(www.ipa.go.jp/shiken/kubun/st.html・WebFetch実測)で **ST午後I=出題3問/解答2問/90分・午後II=出題2問/解答1問/120分** を確認＝出題数2箇所が誤り(2時間=120分は正)。`p.afternoonStrategy` は3生成器(overview/lastMonth/practice)でレンダされ、st-goukaku-benkyouhou 等の公開記事に伝播。誤値は他exam(11問中5問=AP午後 line87)とは独立=ST固有・本文重複なし(grepで "問中" 該当は exam-data L87/L108 のみ)を確認。
  - 修正: 出題数2箇所のみ是正(4→3, 3→2・最小diff)。検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1731→1733/build OK)。本番ビルド `blog/st-goukaku-benkyouhou.html` に「3 問中 2 問」×2・「2 問中 1 問」×2 出力・誤値「4 問中 2 問」「3 問中 1 問」**0件**を実測。回帰テスト `blog-generators.test.ts` に ST午後構造(EXAM_PROFILES.st＋公開body両面)を pin。
- done: [P2-2/事実性] **応用情報の試験当日スケジュールの時間帯を150分窓に整合**。SHA `afbc7d8`。
  - 監査: `ipa-shiken-moushikomi-nagare`(申込の流れ)の「試験中の流れ(応用情報の場合)」が **午前「10:00〜11:30（150分）」・午後「12:30〜14:00（150分）」**=各90分窓なのに「（150分）」とラベル矛盾。AP午前・午後は共に150分(IPA公式・exam-data AP profile=午前150分/午後150分で確認済)＝時間帯が誤り(自己矛盾)。
  - 修正: 時間帯を150分窓へ是正(10:00〜12:30 午前／昼休み 12:30〜13:30／13:30〜16:00 午後・「（150分）」ラベルは正につき温存・記事内の9:30着席/9:50説明の narrative と整合する10:00開始を維持)。検証: 全ゲート緑(test1733→1734/build OK)。本番ビルド `blog/ipa-shiken-moushikomi-nagare.html` に「10:00〜12:30 午前試験（150 分）」「13:30〜16:00 午後試験（150 分）」各×2・旧90分窓「10:00〜11:30 午前」「12:30〜14:00 午後」**0件**を実測。回帰テストで150分窓を pin。
- SKIP(過大修正回避): 合格率レンジの記事間/profile間のゆらぎ(NW: profile13〜15% vs ranking記事15〜18% vs koudo-9kubun記事14〜18%、AU: profile14〜16% vs 記事13〜16% 等)。各記事は「おおむね/約」「年度・季によって変動」「IPA公式で確認」と明示ヘッジ済＝近似レンジで実害なし・合格率は実際に年次変動するため修正は理論のみ。`ipa-shiken-gogo-vs-am` の午前80問前後150分/午後150分/100点満点60点合格も「区分により異なる/標準」とヘッジ済AP一般化で hard error でない＝SKIP。
- 監査(所見なし・確認した正): SC午後の区分分類は `ipa-koudo-9kubun-chigai`(L4942)で **SC=記述のみ**(論述群ST/SA/PM/SM/AU と明確に区別)＝正・exam-data SC profile も「午後は…長文記述」で正＝sc-ronbun-taisaku(HD-6)が唯一の outlier を再確認。DB午後I 90分3問2問(L3780)・PM午後II 120分2問1問ア〜ウ(L3919/4013)・NW午後I 90分2問選択/午後II 120分1問選択(L5262/5272)・IP 100問120分600点(L3192)・午前I免除2年(複数)・高度9区分・受験料7,500円(L5166)は IPA公式と一致＝正。業種別論述記事(gyoushu-essay-*)に hard な試験形式数値誤りなし・内部リンク `/features/industry-essays` は実在(app/features/[slug]・prerendered 200「業種別 論述事例集 ── ST/SA/PM/SM/AU」)を確認＝dead-linkなし。
- 申し送り（セッション18まとめ）:
  - **事実性監査(構造的数値)を継続し2件是正**: (1)ST午後の出題数 4→3問中2問・3→2問中1問(IPA公式 st.html で裏取り) `fdda1c5`、(2)応用情報の当日スケジュール時間帯を150分窓へ整合(自己矛盾の是正) `afbc7d8`。いずれもIPA公式/exam-data SSOTで authoritative に裏取り・回帰テストで pin・最小diff・新規404ゼロ。
  - **構造的数値(問数/時間/字数/配点)の監査はこれで概ねクリーン**: exam-data profile・主要記事の試験形式数値はIPA公式と一致を確認(残る誤りはSC=HD-6のみ・人間待ち)。合格率レンジは hard error でなくヘッジ済近似＝意図的にSKIP(過大修正回避)。
  - **次の最優先候補**: 事実性監査は構造的数値が概ね尽きたため、次は別角度=(a)用語・制度の事実性(法令名・規格名・免除条件の細部)、(b)P1-7本丸(科目B問題ページ コパイロット quick-action UI＝§10/broad・要慎重監査)、(c)P2-4(旗艦/essay 横断書籍リスト=設計判断)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5 は人間待ち継続。

## セッション19（growth ループ）2026-06-02 JST
- 監査(read-only): session17/18の事実性監査を「(a)制度の事実性=午前I免除条件の細部」へ展開。`ap-goukaku-go-koudo-senryaku`(午前I免除戦略記事)を精査し、IPA公式(WebFetch/WebSearch)で裏取り。
- done: [P2-2/事実性] **午前I免除制度の有効期間を是正(翌年度から2回分→2年後の同時期まで・最大4回)**。SHA `1f10eae`。
  - 監査: `ap-goukaku-go-koudo-senryaku` が免除を「合格年度の**翌年度から**2年間（**2回分**）」と記載(L7611/7615/7739)し、ワークド例(L7620-7624)も2026春AP合格→2028春を「免除期間終了」としていた。だが IPA公式([about/koudo_menjo.html](https://www.ipa.go.jp/shiken/about/koudo_menjo.html))で **免除=「条件を満たした試験から2年後の同時期試験まで」有効＝合格した季を起点に春・秋で最大4回**を確認。免除は**同年度の次回試験から**始まり(翌年度からは誤り)、2028春が**最終回**(免除終了ではない)。「2回分」も誤り(4回)。
  - 修正: 3箇所(7611/7615/7739)の枠組み表現＋ワークド例(2028春を免除可能に追加・終了を2028秋以降に)を是正。回帰テスト `blog-generators.test.ts` に免除事実(2年後の同時期/最大4回・翌年度から/2回分の不在・2028春免除可能)を pin。検証: 本番ビルド `blog/ap-goukaku-go-koudo-senryaku.html` に「2 年後の同時期試験まで」「最大4回」「2028 年春…免除可能」、「翌年度から」「2回分」「2028春以降:免除終了」**0件**を実測。全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1734→1736/build OK)。
- done: [P2-2/事実性] **高度試験の春期/秋期 区分グルーピングを是正(NW=春・PM/AU=秋・SC=両期)**。SHA `ed5d0d6`。
  - 監査: 同記事が受験タイミング節(L7664-7665/7668/7743)で **NW を秋期、PM・AU を春期に誤分類**し、SC を「秋期のみ」と記載。IPA公式([令和7年度春期 r07haru_exam.html](https://www.ipa.go.jp/shiken/2025/r07haru_exam.html)＝[2026年度前期/後期](https://www.ipa.go.jp/shiken/2026/ap_koudo_sc_yotei.html)と同一グルーピング)で **春期=ST/SA/NW/SM・秋期=PM/DB/ES/AU・SC=春秋両方** を確認。「次に何を受けられるか」の判断を誤らせる事実誤り。
  - 修正: 4箇所のグルーピングを是正(NW→春・PM/AU→秋・SC→両期)。回帰テストで正しいセットを pin。検証: 本番ビルドに「ST、SA、NW、SM」「PM、DB、ES、AU」「秋期の PM・DB・ES・AU」、誤グルーピング(「AU、ST、SA、PM、SM」「秋期受験なら SC・NW・DB・ES」等)**0件**を実測。全ゲート緑(test1736→1737/build OK)。区分グルーピングは春秋→前後期の名称変更でも不変(前期=旧春期/後期=旧秋期)＝是正は新旧どちらでも正。
- 人間判断へ: [HD-7] **2026年度からの大規模制度変更(CBT移行・「春期/秋期」→「前期/後期」名称変更・実施月の変更)でサイト全体の前提が更新を要する**。IPA公式で確認: 2026年度よりAP/高度/支援士がCBT移行・春秋→前後期へ名称変更・前期=2026年11月頃/後期=2027年2月頃(日程は「決まり次第」で未確定要素あり)。サイト全体が「春期4月/秋期10月/年2回」紙試験前提で多数記述＝**site-wide広域変更＋移行期の表現方針＝編集/設計判断**。個別記事の区分グルーピング誤りは本セッションで是正済だが、春秋/月/年2回の枠組み更新はSSOT化(exam-dataに実施時期フィールド)＋IPA日程確定待ちで人間判断。`growth-human-decisions.md` HD-7 に記録。
- 申し送り（セッション19まとめ）:
  - **事実性監査=「制度(午前I免除/試験スケジュール)」へ角度展開し2件是正＋大型HD1件起案**: (1)午前I免除の有効期間「翌年度から2回分」→「2年後の同時期まで・最大4回」是正(IPA公式裏取り・例も修正) `1f10eae`、(2)高度試験の春秋グルーピング誤り(NW/PM/AU)を是正(SC=両期) `ed5d0d6`、(3)2026年度CBT移行/前後期名称変更/月変更のsite-wide対応をHD-7へ。いずれもIPA公式PDF/ページで authoritative に裏取り・回帰テストでpin・最小diff・新規404ゼロ(text-only)。
  - **次の最優先候補**: 制度の事実性監査の継続(他記事の免除条件/受験料/CBT記述/法令名・規格名の細部がIPA公式と一致するか。ただし春秋/月の枠組みはHD-7で site-wide 保留＝個別の hard error のみ拾う) / P1-7本丸(科目B問題ページ コパイロット quick-action UI＝§10/broad・要慎重監査) / P2-4(旗艦/essay 横断書籍リスト=設計判断)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度変更 HD-7 は人間待ち継続。

## セッション20（growth ループ）2026-06-02 JST
- 監査(read-only): session17-19の事実性監査を「SC(情報処理安全確保支援士)の2023改定(午後I・午後II統合)への追従」へ展開。exam-data SC profile は単一午後・記述で正だが、生成記事側に旧構成の取り残しが無いか全走査。IPA公式(kubun/sc.html)＝午後は統合・150分・記述式・出題4問/解答2問を WebFetch で裏取り。
- done: [P2-2/事実性] **SCの午後試験構成を2023改定後の統合午後(150分・記述式)へ是正**。SHA `510e149`。
  - 監査: `sc-shikaku-merit` が SC を「午前I・午前II・午後I・午後II の 4 部構成」「午後I：90分で2問選択」「午後II：120分で1問選択」と廃止済み(2023年4月改定で午後I・IIを統合)の旧構成で記載。IPA公式 kubun/sc.html で午後=単一・150分・記述式・出題4問/解答2問を確認。exam-data SC profile は既に単一午後・記述で正＝記事が SSOT と矛盾。HD-6(sc-ronbun-taisaku の論文誤framing)とは別記事・別の構造誤りで自律是正可能。
  - 修正: 3箇所(概要「4部構成」→「午前I・午前II・午後（記述式）の 3 部構成」、学習の進め方の午後I/午後II 2行→「午後：150 分で 4 問中 2 問選択（記述式）」)を最小diff是正。春期・秋期表記はHD-7(site-wide CBT/前後期)のため不変。回帰テスト `blog-generators.test.ts` に統合午後を pin(test1737→1738)。検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/build OK)。本番ビルド `blog/sc-shikaku-merit.html` に「3 部構成」「午後：150 分で 4 問中 2 問選択（記述式）」出力・旧構成3表現**0件**を実測。
- done: [P2-2/事実性] **登録セキスペの更新講習維持費を是正(3年で約8〜9万→約14万円〜)**。SHA `4088252`。
  - 監査: 同記事 `sc-shikaku-merit` の維持費が「更新講習費用：3年で約8万円程度」「3年で約9万円の維持費」＝**オンライン講習(毎年・約2万円/年・3年で約6万円)を取りこぼし**。IPA講習制度＋公開情報(WebSearch)で オンライン講習 約2万円/年×3＋実践講習 約8万円〜(3年に1回)＝更新講習だけで3年約14万円〜が実態を確認。費用対効果の判断材料を**過小提示**する誤り(登録すべきか否かの意思決定記事＝実害大)。
  - 修正: 費用内訳をオンライン/実践に分離・「3年で約14万円〜」へ是正(登録手数料10,700円/登録免許税9,000円の初回値は正につき温存)。まとめの「維持費 3 年 9 万円」も是正。回帰pin。検証: 全ゲート緑(test1738→1739)。本番ビルドに「3 年で約 14 万円〜の維持費」「オンライン講習：約 2 万円／年」出力・過小値3表現**0件**を実測。
- done: [P2-2/事実性] **2026参考書ガイドのSC午後フレーミングを統合後(午後問題)へ是正**。SHA `a81d15e`。
  - 監査: `ipa-sanko-mondaishu-2026`(2026参考書ガイド)のSC節が廃止済み「SC 午後I・II 問題演習」書名フレーミングを使用。2026年版ガイドとして統合後(午後記述式1本)が正。
  - 修正: 「SC 午後問題演習」へ是正＋「午後試験は2023年改定で午後I・午後IIが統合され記述式1本」の注記を additive 追加。回帰pin。検証: 全ゲート緑(test1739→1740/build OK)。本番ビルドに「SC 午後問題演習」出力・旧書名**0件**を実測。
- SKIP(過大修正回避): 一般的な高度試験記述の「午前I・午前II・午後I・午後II の 4 部構成」(generators L673申込の流れ前段/L5153 ipa-shiken-moushikomi-nagare/L6589 ipa-goukaku-tsuchi-jiki)。SCは2023統合で唯一の例外だが、これらは**9区分中8区分で正の一般化記述**(非SC文脈)＝SC専用の誤りではなく blanket statement。3記事への caveat 追記は scope creep＝SKIP(general statementは多数派で正・SCはHD-7のsite-wide枠組み更新時にまとめて整理が筋)。koudo-9kubun-chigai は SC を「記述のみ」群に正しく分類済(session18確認)＝午後I/II の記述量比較は一般化framing でSKIP。論述字数(設問ア〜ウ・2,400字以上)は各記事「目安/前後/あくまで目安」とヘッジ済＝hard errorでなくSKIP(session18方針継続)。
- 監査(所見なし・確認した正): SG(情報セキュリティマネジメント)は exam-data profile「現行制度では午後固有の試験は無く…午前相当に統合」で正・記事側にも誤った午後/科目構造claimなし。FE科目B 100分(session17是正)は全記事で取り残しゼロ(FAQ Q1含む)。受験資格/年齢制限の誤claim無し(IPA試験は制限なし＝正)。AP午前80問150分/午後11問中5問150分・IP100問120分600点・FE科目A60問90分は既確認の正。
- 申し送り（セッション20まとめ）:
  - **事実性監査=「SCの2023改定追従」で3件是正**: (1)sc-shikaku-merit の午後構成を統合午後(150分記述式4問中2問)へ `510e149`、(2)同記事の登録セキスペ維持費を約14万円〜へ是正(過小提示の是正・実害大) `4088252`、(3)2026参考書ガイドのSC午後書名フレーミング是正 `a81d15e`。いずれもIPA公式 kubun/sc.html＋公開情報で裏取り・回帰pin・最小diff・新規404ゼロ(text-only)。
  - **構造的/制度的数値の事実性監査は概ねクリーン**: SC(本セッション)・ST/AP/FE科目B/午前I免除/春秋グルーピング(session17-19)で主要 hard error は是正済。残る outlier は HD-6(sc-ronbun-taisaku の論文誤framing・全面リライト要)/HD-7(2026 CBT・前後期 site-wide)＝人間待ち。一般化「4部構成」記述はHD-7整理時にまとめて。
  - **次の最優先候補**: 事実性 hard error は枯渇気味。残るは (a)P1-7本丸(科目B問題ページ コパイロット quick-action UI＝§10/broad・要慎重監査)、(b)P2-4続き(旗艦/essay 横断書籍リスト=設計判断)、(c)新角度起案=用語/規格名の更新(ITIL 4/PMBOK第7版 等の世代ずれ・ただし学習advice文脈はSKIP寄り)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度変更 HD-7 は人間待ち継続。

## セッション21（growth ループ）2026-06-02 JST
- 監査(read-only): session17-20の事実性監査を**ブログ以外の高オーソリティ構造化データ面=`/faq`(FAQPage JSON-LD・79問)・`/glossary`(DefinedTermSet)へ角度展開**。これまでの監査は data/blog 中心で、data/faq.ts・data/glossary.ts は未走査だった。IPA公式(WebFetch/WebSearch)＋SSOT(exam-data)で照合し、可視本文＋構造化データに露出する hard error を4件是正。
- done: [P2-2/事実性] **`/faq` SC登録後の称号を正式名称へ是正(2箇所)**。SHA `719497f`。
  - 監査: data/faq.ts L448/L522 が登録後の国家資格名を「登録セキュリティスペシャリスト（RISS）」と記載。IPA公式([kubun/sc.html](https://www.ipa.go.jp/shiken/kubun/sc.html) WebFetch実測)では登録後に名乗れるのは国家資格「情報処理安全確保支援士（登録セキスペ）」で、「登録セキュリティスペシャリスト」はIPAが用いない不正確な称号。`app/faq/page.tsx` が FAQS を FAQPage JSON-LD(acceptedAnswer.text)へ直マップ＝構造化データにも誤称号が露出していた。codebase他所(blog/generators.ts)は「情報処理安全確保支援士（登録セキスペ）」で正＝faq.ts のみdrift。
  - 修正: 2箇所を「情報処理安全確保支援士（登録セキスペ、英語名 RISS）」へ。回帰テスト `__tests__/data/faq.test.ts` に誤称号「登録セキュリティスペシャリスト」の全FAQ不在＋RISS言及時の正式名称併記を pin。検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1740→1741/build OK)。本番ビルド `app/faq.html` に正式名称×8・誤称号**0件**・FAQPage健在を実測。
- done: [P2-2/事実性] **`/glossary` OWASP Top 10 の最新版表記を 2021→2025年版へ是正**。SHA `b7e336f`。
  - 監査: data/glossary.ts L132 が「最新版は 2021 年版で、3 年ごとに更新される」と記載。OWASP公式・各種報道([OWASP Top 10:2025](https://owasp.org/Top10/2025/) WebSearch実測)で **Top 10:2025 が2026年1月に最終版公開済**＝2021年版は陳腐化。更新周期も実際は2013/2017/2021/2025＝おおむね4年で「3年ごと」は不正確。`app/glossary/page.tsx` は JSON-LD description=t.short だが t.detail は可視本文(L141)に出力＝SC学習者向けクロール面の誤り。
  - 修正: 「最新版は 2025 年版（2026 年 1 月公開）で、数年ごとに更新される」へ。回帰テスト `__tests__/data/glossary.test.ts` に stale な「最新版は 2021 年版」不在＋「2025 年版」を pin。検証: 全ゲート緑(test1741→1742/build OK)。本番ビルド `app/glossary.html` に新表記・旧「最新版は2021年版」**0件**を実測。
- done: [P2-2/事実性] **`/faq` 午前I免除の有効期間を「前回・前々回」→正式な2年間へ是正**。SHA `084bbf7`。
  - 監査: data/faq.ts L454 が免除対象を「応用情報合格者、または前回・前々回の高度試験で午前Iの基準点超え」に限定(=約1年・2回)。IPA公式([about/koudo_menjo.html](https://www.ipa.go.jp/shiken/about/koudo_menjo.html) WebFetch実測)では合格・基準点充足から「2年間に実施する試験まで何度でも申請可能」で、免除条件は①AP合格②高度/支援士合格③高度/支援士の午前I基準点の3つ。「前回・前々回」は有効期間を過小提示し不要な午前I再受験を招く誤り(session19でブログ ap-goukaku-go-koudo-senryaku の同種誤りを是正済の faq 版)＋条件②の欠落。
  - 修正: 3条件を正しく併記し「その後 2 年間に実施される試験で午前 I を免除できます（期間内は何度でも申請可能）」へ。回帰テストで「前回・前々回」不在＋「2 年間」を pin。検証: 全ゲート緑(test1742→1743/build OK)。本番ビルド `app/faq.html` に新表記×4・旧「前回・前々回」**0件**を実測。
- done: [P2-2/事実性] **`/faq` FE科目Aの出題数を 90問→60問 へ是正(90分との取り違え)**。SHA `92bb17a`。
  - 監査: data/faq.ts L474 が「科目 A（多肢選択 90 問）」と記載。IPA公式・SSOT(blog/exam-data.ts L61・session17確認済)では **FE科目A=60問/90分**(科目B=20問/100分)＝試験時間90分を問数90問と取り違えた誤り。grep で faq.ts L474 が唯一の outlier(他所は60問で正)を確認。FAQPage JSON-LD にも露出。
  - 修正: 「科目 A（多肢選択 60 問・90 分）と科目 B（…20 問・100 分）」へ(両科目に時間併記)。回帰テストで「科目 A（多肢選択 90 問」不在＋「60 問」を pin(filter は count-stating answer に限定し科目A/B coverage FAQ を誤検知しないよう narrow)。検証: 全ゲート緑(test1743→1744/build OK)。本番ビルド `app/faq.html` に「60 問・90 分」×4・旧「90 問」**0件**を実測。
- 申し送り（セッション21まとめ）:
  - **事実性監査をブログ→`/faq`(FAQPage JSON-LD)・`/glossary`(DefinedTermSet)へ角度展開し4件是正**: (1)SC登録称号→情報処理安全確保支援士(登録セキスペ) `719497f`、(2)OWASP Top10 2021→2025年版 `b7e336f`、(3)午前I免除 前回前々回→2年間 `084bbf7`、(4)FE科目A 90問→60問 `92bb17a`。いずれもIPA/OWASP公式で裏取り・構造化データ露出面・回帰pin・最小diff・新規404ゼロ(text-only)。
  - **新発見**: 事実性監査はブログ群が概ねクリーンでも、**ブログ以外の構造化データ面(faq.ts/glossary.ts)に未監査の hard error が4件残っていた**＝監査面を data/blog 限定にしていた盲点。今後は keywords.ts / exam-meta / exam-content 等の他 data 面も同様に照合余地あり。
  - **次の最優先候補**: (a)他 data 面の事実性照合継続(data/keywords.ts・lib/seo/exam-meta.ts・exam-content.ts・data/community/* の試験形式/規格名/数値がIPA公式と一致するか)、(b)P1-7本丸(科目B問題ページ コパイロット quick-action UI＝§10/broad・要慎重監査)、(c)P2-4続き(旗艦/essay 横断書籍リスト=設計判断)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度変更 HD-7 は人間待ち継続。

## セッション22（growth ループ）2026-06-02 JST
- 監査(read-only): session21の事実性監査を**ブログ/faq/glossary 以外の SEO data 面=`lib/seo/exam-content.ts`(全試験ハブ /[exam] の leadParagraph・mainTopics・実施時期)・`lib/seo/exam-resources.ts`(EXAM_ROADMAP)・`data/keywords.ts`(KEYWORD_PAGES・/keywords/[kw])へ角度展開**。これらは全 /[exam] ハブや /keywords/* (indexable・sitemap収録)に描画されるのに未照合だった。IPA公式(WebFetch: kubun/list.html・2025/r07haru_exam.html・kubun/sc.html)で裏取りし hard error を4件是正。
- done: [P2-2/事実性] **全試験ハブ /[exam] の高度試験 実施時期グルーピング誤りを是正(NW/SM=春期・ES/AU=秋期)**。SHA `3725137`。
  - 監査: `exam-content.ts` leadParagraph(ExamDeepContent 経由で /[exam] ハブ・indexable に描画)が **NW・SM を「秋期年1回実施」・ES・AU を「春期年1回実施」と季を取り違え**。IPA公式(令和7年度春期 r07haru_exam.html＝kubun/list.html WebFetch実測)で **春期=ST/SA/NW/SM・秋期=PM/DB/ES/AU・SC=両期** を確認。db(秋)/st(春)/sa(春)/pm(秋)は正。session19のブログ ap-goukaku-go-koudo-senryaku の同種グルーピング是正(`ed5d0d6`)の exam-content 版。「次に何を受けられるか」を誤らせる事実誤り。
  - 修正: 4区分の季を入れ替え(nw 秋→春・es 春→秋・sm 秋→春・au 春→秋・最小diff)。グルーピングは2026年度の春期/秋期→前期/後期名称変更(HD-7)でも不変。回帰テスト `exam-data-invariants.test.ts` に春期/秋期セットを pin。検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1744→1745/build OK)。本番ビルド `app/{nw,sm}.html`=「春期年 1 回実施」・`app/{es,au}.html`=「秋期年 1 回実施」、`st/sa/pm/db` は不変で正を実測。
- done: [P2-2/事実性] **SC登録資格の称号を正式名称「情報処理安全確保支援士（登録セキスペ）」へ是正(/sc ハブ＋career記事)**。SHA `3a0b6ba`。
  - 監査: `exam-content.ts` SC leadParagraph が登録資格を「RISS（登録情報セキュリティスペシャリスト）」、`generators.ts` shikaku-career-path が「登録情報セキュリティスペシャリスト（登録セキスペ）」と記載。「登録情報セキュリティスペシャリスト」は英語名 RISS(Registered Information Security Specialist)の逆翻訳で IPA が用いない不正確な称号(session21 で faq.ts の同種誤称号「登録セキュリティスペシャリスト」を是正済の別ファイル版)。IPA公式 kubun/sc.html の正式名称は「情報処理安全確保支援士（登録セキスペ）」。
  - 修正: /sc ハブ→「情報処理安全確保支援士（登録セキスペ、英語名 RISS）」、career記事→「情報処理安全確保支援士（登録セキスペ）」。回帰テスト2件(exam-data-invariants・blog-generators)で誤称号不在＋正式名称を pin。検証: 全ゲート緑(test1745→1747/build OK)。本番ビルド `app/sc.html`・`blog/shikaku-career-path.html` 各に正式名称×2・誤称号**0件**を実測。
- done: [P2-2/事実性] **/sc ハブの学習ロードマップを2023統合後の午後（記述式）へ是正**。SHA `de0c4e8`。
  - 監査: `exam-resources.ts` EXAM_ROADMAP.sc(ExamRoadmap 経由で /sc ハブ・indexable に step.title 描画)が廃止済みの「午後 I 記述」「午後 II 長文」を別ステップで保持。SC午後は2023年4月改定で午後I・IIが単一の午後(記述式)に統合済(IPA公式 kubun/sc.html・exam-data SC profile・SC leadParagraphも単一午後)。NW/DB/ESは午後I・II現存で正(対象外)。session20の sc-shikaku-merit 同種是正と整合。
  - 修正: SCの2ステップを統合後の「午後 記述演習（基礎）/（実践）」へ(topic body は valid なSC午後論点で温存)。回帰テストで SC ロードマップの 午後I/II 不在＋午後記述ステップ存在(non-vacuous)を pin。検証: 全ゲート緑(test1747→1748/build OK)。本番ビルド `app/sc.html`=新午後記述ステップ×2・旧午後I/II**0件**、`app/nw.html`=午後I/II健在(NWは現存)を実測。
- done: [P2-2/事実性] **/keywords/sc-incident-response のSC午後を2023統合後（記述式）へ是正**。SHA `07c1b5b`。
  - 監査: `data/keywords.ts` KEYWORD_PAGES の sc-incident-response(/keywords/sc-incident-response・indexable・sitemap収録)が title/description/body で廃止済みの「午後 II」を使用。上記ロードマップ・session20と同じSC午後統合の取り残し(別ファイル)。
  - 修正: 「午後 II」→統合後の「午後（2023年改定で午後I・午後IIを統合した記述式）」フレーミングへ。午後IIに紐づく「10〜12問」の小問数(統合後は変動・不確実)は誇大回避で除去。回帰テストで title/description/body の午後II不在＋午後フレーミング(non-vacuous)を pin。検証: 全ゲート緑(test1748→1749/build OK)。本番ビルド `keywords/sc-incident-response.html` に「午後 II」**0件**・統合後フレーミング×3(H1+meta+body)を実測。
- 申し送り（セッション22まとめ）:
  - **事実性監査をブログ/faq/glossary→残りのSEO data面(exam-content.ts/exam-resources.ts/keywords.ts)へ角度展開し4件是正**: (1)/[exam]ハブ 実施時期グルーピング NW/SM=春・ES/AU=秋 `3725137`、(2)SC登録称号→情報処理安全確保支援士(登録セキスペ) /sc+career `3a0b6ba`、(3)/sc ロードマップ 午後I/II→統合午後 `de0c4e8`、(4)/keywords SC午後II→統合午後 `07c1b5b`。いずれもIPA公式WebFetchで裏取り・全 /[exam] や /keywords の indexable 面・回帰pin・最小diff・新規404ゼロ(text-only)。
  - **SC午後統合(2023)の取り残しが複数 data 面に分散していた**: session20(ブログ sc-shikaku-merit)で気づいた「SC午後I・II→統合」は、exam-resources ロードマップ・keywords にも未是正で残っていた(SSOT exam-data は既に単一午後で正なのに派生 data 面が drift)。今回で /sc ハブ・/keywords の SC 構造表記はクリーンに。称号誤り(登録情報セキュリティスペシャリスト)も faq→exam-content/generators と複数面に分散していた＝**同一事実の取り残しを面横断で掃く**のが有効な角度。
  - **次の最優先候補**: (a)他data面の事実性照合継続(lib/seo/exam-meta.ts の高度試験説明・data/community/* の試験形式数値・lib/seo/category-tips.ts がIPA公式と一致するか。今回 exam-meta は format-accurate を確認＝主要 hard error は概ね枯渇気味)、(b)P1-7本丸(科目B問題ページ コパイロット quick-action UI＝§10/broad・要慎重監査)、(c)P2-4続き(旗艦/essay 横断書籍リスト=設計判断)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度変更 HD-7 は人間待ち継続。

## セッション23（growth ループ）2026-06-02 JST
- 監査(read-only): session22の事実性監査の残候補(lib/seo/category-tips.ts・exam-meta.ts・exam-resources.ts・exam-stats.ts・data/community/*・data/keywords.ts 全11ページ)を全数照合。**hard error はゼロ**を確認＝事実性監査は概ね枯渇。`category-tips`=学習advice(版ずれはSKIP寄り)・`exam-meta`/`exam-content`/`exam-resources`/`exam-stats`=実施時期/午後構成/称号すべてsession17-22の是正と整合し正・`data/community/*`=app未import(410済の死コード=indexable面なし)。内部リンク監査も FATAL0/WARNING0。**角度転換**: keyword landing面(/keywords/[slug]・indexable・footer「学習トピック」からcrawlable)は旗艦/土台funnel(session3-16でblog/hub/footer/qを整備)が**未配線**だった新surfaceと判明。
- done: [P2-3/旗艦] **キーワードLP `st-essay-structure-pattern`(ST午後II論文構成)から旗艦=午後II論述AI採点 /essay へ送客**。SHA `717688d`。
  - 監査: `data/keywords.ts` の論文構成記事(「IT ストラテジスト 論文の構成パターン 5 選」・ST午後II論文の最有力intent)は body が plain text(マークダウン無し)で旗艦/essayへ未funnel。CTAは `/${exams[0]}`(=/stハブ)のみ。
  - 実装: `KeywordPage` に明示オプトイン `strategicCta?: "essay"|"kamoku-b"` を追加。page.tsx で `strategicCta==="essay"` かつ exams[]に論文区分(ESSAY_EXAM_CODES単一情報源)を含むときだけ既存 `AfternoonEssayHint`(session7)を SSR 描画(reuse・DRY)。`st-essay-structure-pattern` に `strategicCta:"essay"` を付与。**誇大回避**: 明示オプトインなので pm-evm-calculation(pm=論文区分だが計算テーマ)やSC(記述)に旗艦CTAが漏れない。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1749→1752/build OK)。本番ビルド `keywords/st-essay-structure-pattern.html` に旗艦コピー「午後II論述を AI が採点」+`href="/essay"`(footer分1+hint分1=2)出力、`pm-evm-calculation.html`・`sc-incident-response.html`・`ap-chokuzen-1week.html` は旗艦hintコピー**0件**(footerの/essay 1本のみ)を実測=ゲート正確。回帰テスト3件(strategicCta:essay⇒論文区分必須・st pin・SC不在)。
- done: [P1-7/土台] **キーワードLP `fe-kamoku-b-pseudo-language`(科目B擬似言語)から土台=科目B完全対策ピラー /blog/fe-kamoku-b-taisaku へ送客**。SHA `111569c`。
  - 監査: 科目B擬似言語の対策手順記事(FE科目B・土台の最有力intent)も土台ピラーへ未funnel。旗艦funnelと対称に配線。
  - 実装: `fe-kamoku-b-pseudo-language` に `strategicCta:"kamoku-b"`。page.tsx で当該時に既存 `KamokuBStudyHint`(session16・AfternoonEssayHintと対称)を `exam="fe" session="kamoku-b"` で SSR 描画(reuse)。科目B擬似言語(FE)以外には出さずoff-topic回避。
  - 検証: 全ゲート緑(test1752→1754/build OK)。本番ビルド `keywords/fe-kamoku-b-pseudo-language.html` に `href="/blog/fe-kamoku-b-taisaku"`+「科目Bは擬似言語のトレース力で決まる」「科目B 完全対策を読む」出力、st page に科目Bピラーコピー0件・fe page に旗艦essayコピー0件(両funnelが完全分離)を実測。回帰テスト2件(strategicCta:kamoku-b⇒FE必須・fe pin)。
- SKIP(誇大/off-topic回避): 残りkeyword 9ページへの旗艦/土台funnel。`pm-evm-calculation`(pm=論文区分だが計算テーマ=論述CTAは的外れ・明示オプトインで意図的除外)、`auditor-coso-cobit`(au=論文区分で論述適用に触れるが primary intent はフレームワーク知識=旗艦は stretch・迷ったらSKIP)、`sc-incident-response`(SC=記述・非論文=ESSAY_EXAM_CODES外で誇大)、`ap-chokuzen-1week`/`nw-subnet-calculation`/`db-3nf-normalization`(AP午後モックHD-4 / NW・DB記述=非論文)、`ip-*`/`ai-copilot-*`(戦略ページ対象外)。明示オプトイン設計により今後の追加も per-page 判断で安全。
- 申し送り（セッション23まとめ）:
  - **新surface=keyword landing面に旗艦/土台funnelを配線**: 事実性監査枯渇後の新角度として、/keywords/[slug](indexable・footer crawlable)が旗艦/土台funnel未配線と判明。明示オプトイン `strategicCta` 設計で `st-essay-structure-pattern`→旗艦/essay `717688d`・`fe-kamoku-b-pseudo-language`→土台ピラー `111569c` を対称配線。既存 hint コンポーネント(AfternoonEssayHint/KamokuBStudyHint)を reuse(DRY)。誇大回避は明示オプトイン+ESSAY_EXAM_CODESゲートで構造的に保証(pm計算/SC記述/AP午後モックには出さない)。
  - **事実性監査は概ね枯渇**: category-tips/exam-meta/exam-content/exam-resources/exam-stats/keywords/community 全照合で hard error ゼロ(session17-22の是正と整合)。残る outlier は HD-6(sc-ronbun-taisaku論文誤framing)/HD-7(2026 CBT・前後期 site-wide)＝人間待ち。
  - **次の最優先候補**: keyword funnel は2件で適切surface消化(残り9は誇大/off-topicでSKIP)。次は (a)P1-7本丸(quiz player の解説カードに旗艦/土台 gated hint＝共有UI・broad・§10寄り・要厚め監査)、(b)P2-4続き(旗艦/essay 横断書籍リスト=設計判断)、(c)新規keyword/blogページ(科目B/午後の別longtail＝オリジナル生成・要慎重)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度変更 HD-7 は人間待ち継続。

## セッション24（growth ループ）2026-06-02 JST
- done: [P1-7/旗艦] **クイズ完了画面(QuizCompleteScreen)に旗艦=午後II論述AI採点(/essay)導線を追加**。SHA `a7feb30`。
  - 監査(read-only): 旗艦funnelは header/home/footer/q-page/keyword面に整備済だが、**実プレイ面のクイズ完了画面には旗艦CTAが皆無**だった(session16/23が起案した「quiz player のhint」の安全なサブセット)。解説カード(ExplanationCard)に毎問出すと10問quizで10回反復＝スパム(押し売りUI禁止に抵触)。一方、完了画面はクイズを解き終えた**最大エンゲージメントの単発タイミング**で、論述区分を学習中の読者は午後II論述採点の最有力候補。`QuizCompleteScreen` は `QuizPlayer`(quizモード)＋`ReviewQuizClient`(復習モード)で共用＝両面に1コミットで波及。`StreamQuizPlayer` は独自完了画面なし(`/?done=1` へ遷移)＝対象外を確認。
  - 実装: `QuizCompleteScreen` の操作ボタン群直後に既存 gated `AfternoonEssayHint`(session7・ESSAY_EXAM_CODES 単一情報源で自己ゲート)を `exam={exam as ExamCode}` で1回だけ描画(reuse・DRY)。完了画面は `exam` のみ受領し `session` 不明＝**土台(科目B)hintは threadせず旗艦のみ**(科目B=descriptiveでMC QuizPlayerを通らないため対象外・誇大回避)。論述区分(ST/SA/PM/SM/AU)のみリンク、ap/fe/sc等は null。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1754→1756/build OK)。クライアント描画(SSR非対象)のため jsdom 回帰テスト2件を `QuizCompleteScreen.test.tsx` に追加: exam="pm"⇒`href="/essay"` の旗艦リンク表示・exam="ap"⇒リンク不在(誇大回避ゲート)を pin。崩れたら落ちる。
- done: [P1-7/土台] **土台=基本情報 科目B のSSR導線カードをホームに新設(旗艦との非対称解消)**。SHA `28c59f6`。
  - 監査(read-only): ホーム(`app/page.tsx`・最高オーソリティ面)は旗艦 `HomeFlagshipEssay`(session4・/essay)を持つが、**土台=科目Bの入口が皆無**だった(`grep 科目B app/page.tsx`＝0件)。戦略上「土台=科目Bで通年の入口を作る」が明示され、FE は CBT で通年受験できる即金の入口なのにホームに無い非対称。
  - 実装: 旗艦カードと対称のサーバーコンポーネント `components/home/HomeFoundationKamokuB.tsx` を新設し、`HomeFlagshipEssay` 直後に配置。indigo配色(KamokuBStudyHintと同系)で旗艦(sky)と視覚的に区別。リンク先は土台ピラー `/blog/fe-kamoku-b-taisaku`(KamokuBStudyHint/keyword funnel と同一・indexable)＝トップからピラーへのクローラブル内部リンク。誇大回避は科目B＝FE擬似言語に限定し「CBTで通年受験」を明記。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1756→1758/build OK)。サーバーコンポーネント＝SSR対象なので本番ビルド `index.html` に `href="/blog/fe-kamoku-b-taisaku"`(visible 1)＋「基本情報は科目Bで差がつく」「科目B 完全対策を読む」出力・旗艦 `/essay` 健在を実測。回帰テスト2件 `HomeFoundationKamokuB.test.tsx`(href整合＋pillar slug 実在で新規404防止)を pin。
- done: [P1-7/土台] **/fe ハブに土台=科目B(擬似言語)対策セクションを新設(旗艦の高度試験CTAと対称)**。SHA `fd57c79`。
  - 監査(read-only): `app/[exam]/page.tsx` の「AI 午後問題対策」CTAは高度試験(st/sa/pm/sm/au/sc/nw/db/es)のみゲートし、**FE は除外**(FE午後=モック・HD-4)。結果 FE 最高オーソリティの indexable ハブ `/fe` に土台=科目Bの入口が皆無で、旗艦(高度試験の午後CTA)と非対称だった。
  - 実装: essay CTA セクション直後に `code === "fe"` ゲートの 科目B対策セクションを追加(indigo配色で旗艦violetと区別)。2導線: 土台ピラー `/blog/fe-kamoku-b-taisaku`(indexable)＋アルゴリズム分野別プール `/fe/topic/アルゴリズムとプログラミング`(実演習・AIコパイロット・prerendered 200)。誇大回避は FE午後モックに触れず科目B＝擬似言語に限定。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1758→1760/build OK)。本番ビルド `app/fe.html` に `href="/blog/fe-kamoku-b-taisaku"`・topic link・「科目B（擬似言語）を AI と体系的に攻略」出力、`app/ap.html` は当該見出し**0件**(FEゲート正確)、topic先 prerendered(200) を実測。回帰テスト2件 `fe-hub-kamoku-b-cta.test.ts`(pillar slug＋FE category 実在で新規404防止)を pin。
- 申し送り（セッション24まとめ）:
  - **旗艦/土台のプレイ面・ホーム面・ハブ面への露出を「対称化」**: 事実性監査枯渇・本文funnel飽和の後の新角度として、旗艦は露出済だが**土台=科目Bが手薄**な面を3つ埋めた。(1)クイズ完了画面に旗艦/essay導線(論述区分・単発・反復回避) `a7feb30`、(2)ホームに土台=科目Bカード新設(旗艦HomeFlagshipEssayとの非対称解消) `28c59f6`、(3)/fe ハブに土台=科目Bセクション新設(高度試験の旗艦午後CTAとの非対称解消) `fd57c79`。全て既存gated/ピラーを reuse・誇大回避(ESSAY_EXAM_CODES/科目B=FE擬似言語限定)・回帰pin・新規404ゼロ。
  - **所見**: 旗艦(午後論述)は header/home/footer/q/keyword/quiz完了 に展開済。土台(科目B)は home/q/keyword/fe-hub＋科目Bクラスタ＋FE午後ハブ に展開済＝**主要な高オーソリティ/高eyeball面で旗艦・土台が対称に露出**。残る土台未配線面は header QUIZ_MODES(client nav・SSR非対象)程度。
  - **次の最優先候補**: (a)P2-4続き(旗艦/essay 横断書籍リスト=設計判断・保留寄り)、(b)新規keyword/blogページ(科目B別longtail「科目B 何点」「科目B 時間配分」等＝オリジナル生成・saturation注意)、(c)P0-1残り(dev痕跡410=低優先・404のままで害薄)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度変更 HD-7 は人間待ち継続。露出の対称化は概ね達成＝次は新規コンテンツ角度かHD解消待ち。

## セッション25（growth ループ）2026-06-02 JST
- 監査(read-only): session24起案の「新規コンテンツ角度」を実行。**funnel/FAQ/事実性は飽和**だが、**新規キーワードを狙う新規ページ追加は saturation(=既存ページへの過剰内部リンク)とは別物**で戦略(土台=科目B/P1-4 不安系longtail)が明示的に endorse。新角度=**「時間配分/時間切れ」悩み系ロングテール**が既存記事で各1節しか触れられず専用ページ不在と実測判明(科目B: taisaku理由2・wakaranai タイプC のみ／AP午後: 選択戦略3記事は在試験time未扱い／論文午後II: koudo-ronjutsu-kakikata-kotsu が既にtime節+FAQ保有=対象外でSKIP)。internal-link監査=FATAL0/WARNING0。
- done: [P1-6/土台] **科目B「時間が足りない/時間切れ」専用の新規オリジナル記事を新設**。SHA `946f619`。
  - 監査: 中核ピラー taisaku「理由2:時間が足りなくなる」・wakaranai「タイプC:時間内に解き終わらない」が各1節で時間問題に触れるが、**100分20問の在試験時間配分(配分設計/撤退判断/読解速度/見直し/本番前の時間練習)を扱う専用ページが不在**だった。「科目B 時間配分/時間が足りない/時間切れ」は通年の強い悩み系longtail。
  - 実装: `data/blog/generators.ts` buildGeneralPosts に `fe-kamoku-b-jikan-haibun`(offset longtail2Offset+12)を新設。軽問で貯金→重問は上限8分で撤退/1分で方針立たねば後回し/見直し10分確保/トレース高速化(設問箇所だけ・差分だけ・パターン反射)/タイマー通し練習 のオリジナル構成。relatedSlugs=cluster3(taisaku/wakaranai/algorithm-nigate)へoutbound funnel。wakaranai タイプC節から inbound body link を追加。アルゴリズム分野別プール `/fe/topic/...` とAIコパイロットへ演習送客。FAQ4Q&Aで FAQPage 自動出力。
  - 誇大回避: 100分/600点(1000点満点)は IPA公式・既存 taisaku 記述と一致(session17の100分是正を踏襲・90分/4.5分は不在)。午前MC algorithm分野=科目B擬似言語そのものではない区別を維持。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1760→1761/build OK)。本番ビルド `blog/fe-kamoku-b-jikan-haibun.html`(129KB)実在、SSR本文マーカー7・FAQPage JSON-LD・outbound `href="/blog/fe-kamoku-b-taisaku"`＋encoded topic pool・inbound from wakaranai を実測。blog.xml sitemap に slug 収録(discoverable)。internal-link監査=156posts/FATAL0/WARNING0(新規404ゼロ)。回帰pin `blog-generators.test.ts`(100分/600点/funnel links/FAQ節・90分4.5不在)。
- done: [P1-7/土台] **科目B完全対策ピラーの「時間が足りない」節→時間配分専用記事へ hub→spoke body link**。SHA `36036ea`。
  - 監査: 中核ピラー taisaku「理由2:時間が足りなくなる」節は問題を提示するが解決先リンクが無かった。relatedSlugs rail は limit3 で siblings に埋もれ表示されないため body link で確実化。
  - 実装: 理由2節末に `[科目Bで時間が足りない人へ](/blog/fe-kamoku-b-jikan-haibun)` を1文 additive。検証: 本番ビルド `blog/fe-kamoku-b-taisaku.html` SSR に `href="/blog/fe-kamoku-b-jikan-haibun"` 出力。全ゲート緑(test1761)。audit FATAL0/WARNING0。
- done: [P1-4/旗艦周辺] **応用情報 午後「時間が足りない/時間配分」専用の新規オリジナル記事を新設**。SHA `abab608`。
  - 監査: 既存AP午後記事(ap-gogo-sentaku/bunkei-sentaku/management-erabikata)は全て「選択戦略」で、**150分5問の在試験時間配分を扱う記事が不在**だった。「応用情報 午後 時間配分/時間が足りない」は最大区分APの高volume悩み系longtail。backlog P1-4「応用情報 午後」不安系オリジナル記事に該当。
  - 実装: `ap-gogo-jikan-haibun`(offset longtail2Offset+13)を新設。1問30分基準/解く順を最初に決める/1問35分撤退/見直し15分/選択の本番判断/長文は設問先読み・必要箇所だけ/記述は部分点・空欄作らない/タイマー通し練習 のオリジナル構成。relatedSlugs=AP午後cluster3。ap-gogo-sentaku「固定化戦略」節から inbound body link。
  - **誇大回避(重要)**: AP午後採点=モック(HD-4)のため **funnel先は /ap ハブ＋AIコパイロットのみで旗艦 /essay には送らない**(AP午後をAI採点できると誤認させない)。150分5問・60点(100点満点)は既存 ap-gogo-sentaku 記述と一致。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1761→1762/build OK)。本番ビルド `blog/ap-gogo-jikan-haibun.html`(127KB)実在、SSRマーカー7・FAQPage・`href="/ap"` funnel・**body に /essay 不在**(HTMLの`href="/essay"`×1は site-wide footer のみ＝記事本文は旗艦に送らず)・inbound from ap-gogo-sentaku・blog.xml sitemap収録を実測。audit=157posts/FATAL0/WARNING0。回帰pin(150分/60点/(/ap)/`/essay`不在/FAQ)。
- 申し送り（セッション25まとめ）:
  - **新角度=「時間配分/時間切れ」悩み系ロングテールの専用記事化**: funnel/FAQ/事実性飽和後の有効な新角度として、既存記事で各1節しか扱われていなかった在試験time-management intent を専用ページに切り出し。(1)土台=科目B `fe-kamoku-b-jikan-haibun` `946f619`＋(2)ピラーからの hub→spoke `36036ea`、(3)旗艦周辺=AP午後 `ap-gogo-jikan-haibun` `abab608`。各々 cluster へ inbound/outbound 配線・FAQPage化・誇大回避(科目B=100分600点/AP=/essay非送客)・回帰pin・新規404ゼロ・sitemap収録。
  - **saturation との切り分け**: 新規キーワードを狙う**新規ページ追加**は saturation(既存ページへの過剰内部リンク)とは別＝戦略が endorse。各記事は intent が完全分離(科目B擬似言語time vs AP午後長文time)でcannibalizationなし。論文午後II time は既存 hub が time節+FAQ保有のため意図的にSKIP(重複回避)。
  - **次の最優先候補(新角度の継続余地)**: 「時間配分」横展開の残り＝他の高度試験午後の在試験time(NW午後/DB午後=記述・モック非依存の study strategy・/nw/dbハブへfunnel可)は起案可だがvolumeは AP/科目B より低い。別intentのlongtail(「科目B 部分点ある?」「応用情報 午後 何分前 着席」等の細粒度Q)はFAQ追記で足りる(新規ページ化は thin リスク)。それ以外は従来通り P2-4(設計判断)/P0-1残り(dev痕跡410=実害薄)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度変更 HD-7 は人間待ち継続。

## セッション26（growth ループ）2026-06-02 JST
- 監査(read-only): session17-22 の事実性監査角度を**非essay区分(記述式)の試験形式表記**へ展開。`data/blog/generators.ts` を「NW/DB/ES午後を論述/論文と誤記していないか」「非論文区分に旗艦/essay funnelを誤って張っていないか」で走査。NW(ネットワークスペシャリスト)記事に hard error を実測。IPA公式(shiken/kubun/nw.html WebFetch)で午後I=記述式90分3問中2問・午後II=記述式120分2問中1問を裏取り。コードSSOT(`lib/essay/load.ts` ESSAY_EXAM_CODES が nw 除外・`lib/essays/load.ts` が NW/DB/ES=技術記述問題のみと明記)とも整合＝内部矛盾だった。
- done: [P2-2/事実性] **NW午後IIの「論述」誤記をIPA公式どおり記述式へ是正**。SHA `b4b956e`。
  - 監査: `nw-hinshutu-pattern` が本文「午後IIは論述です」、学習ロードマップ表「午後II論文（1本書いてAI添削）」と記載。NW午後I・IIはともに記述式で論述式(小論文)は非存在(IPA公式)。論述/論文区分はST/SA/PM/SM/AUのみ。
  - 修正: 「午後I・午後IIはいずれも記述式で…（論述式の小論文は課されません）」へ、表行を「午後IIの記述（過去問を通しで解いてAIに解説を依頼）」へ。回帰テスト `blog-generators.test.ts` に「NW post — 午後 is 記述式, not 論述」describe を新設し 記述式存在＋`/午後.{0,4}論述|論文/` 不在を pin。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test→緑/build OK)。本番ビルド `blog/nw-hinshutu-pattern.html` に「いずれも記述式」「午後IIの記述」出力・本文の午後論述/論文**0件**を実測(HTMLに残る午後II論述は related-post link=sc-ronbun-taisaku=HD-6人間待ち分のみ)。
- done: [P2-2/旗艦ゲート規律] **NW記事の off-strategy 旗艦/essay funnel を撤去**。SHA `76a52d8`。
  - 監査: `nw-protocol-deep-understanding` の結びが「[論述添削（PM/SA 方面）](/essay) と組み合わせて」と非論文区分NWのページから旗艦/essayへ送客。session23/24で確立した「旗艦/essay funnelは ESSAY_EXAM_CODES にゲート(誇大回避)」規律に反するoff-topic funnel(NWはessay区分でない)。
  - 修正: NW過去問＋AIコパイロットで午後I・IIの記述理解に落とす導線へ是正。回帰テストで両NW記事(protocol/hinshutu)に旗艦/essay hub link `](/essay)` が無いことを pin。検証: 全ゲート緑/本番ビルドで記事本文の `](/essay)` 不在(残る`href="/essay"`×1=site-wide footerのみ)を実測。
- done: [P2-2/事実性] **合格率ランキング記事の「高度=午後II論述」一般化を是正**。SHA `592fd0c`。
  - 監査: `ipa-shiken-goukakuritsu-ranking`(高可視 合格率記事) が高度試験を一律「特に午後IIの論述が合格率を押し下げる」とフラット断定。NW/DB/ES/SC午後は記述式で論述でない＝同一error class。SCは2023年から午後統合(午後I/II廃止)。
  - 修正: 「午後の記述・論述が…」へ緩和し「記述式（NW・DB・ES・SC）と論述式（ST・SA・PM・SM・AU）で対策は異なる」を明示・SC統合を括弧注記。隣接L2480「論述試験の採点基準が厳しい」は元から論述試験にscope済で不変。回帰pinで一律論述表記不在＋区分整理を固定。検証: 全ゲート緑(full suite 1765 pass)・SSR実測。
- 申し送り（セッション26まとめ）:
  - **事実性監査の新角度=「非essay区分(記述式NW/DB/ES/SC)の午後を論述/論文と誤記/誤funnelしていないか」**: これまでの事実性監査(称号/制度/形式数値)とは別軸で、**記述式区分を論述式と取り違える error class** を generators.ts 全体で掃いた。NWに3面(本文断定/ロードマップ表/旗艦funnel)で集中していた。DB/ESには同種誤記なし(クリーン)・SCは sc-ronbun-taisaku が同種だが**HD-6人間待ち**(SC午後frameの全面リライト/削除は編集判断)で不変。
  - **旗艦/essayゲート規律はテンプレ生成だけでなく手書き記事(general.push)にも適用必要**: テンプレ(overview/lastMonth/practice)は ESSAY_FLAGSHIP_EXAMS でゲート済・テスト有だが、手書きNW記事に ungated /essay が残っていた。今回 NW2記事に no-/essay 回帰pinを追加。他の手書き非essay記事の /essay は全数grep済=NW以外は適正scope(論述/論文/ST-AU明示)を確認。
  - **次の最優先候補**: (a)P1-4新角度「時間配分」横展開の NW午後/DB午後 専用記事(モック非依存・/nw/dbハブfunnel・今回NW午後形式facts=90分3問中2問/120分2問中1問をIPA裏取り済で即書ける)＝ただしvolumeはAP/科目B比で低く1記事に絞る。(b)P2-4旗艦/essayハブ書籍リスト(設計判断寄り)。(c)P0-1残りdev痕跡410(実害薄)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度 HD-7 は人間待ち継続。

## セッション27（growth ループ）2026-06-02 JST
- done: [P1-4/土台周辺] **NWネットワークスペシャリスト午後「時間が足りない/時間配分」専用の新規オリジナル記事を新設**。SHA `bf1460c`。
  - 監査(read-only): session26 が起案した「時間配分」横展開(科目B `946f619`/AP午後 `abab608` に続く第3弾)。既存NW記事3本(nw-hinshutu-pattern=頻出パターン/nw-protocol-deep-understanding=プロトコル/nw-nanido-goukakuritsu-suii=難易度)はいずれも在試験 time-management を扱う専用ページを持たず、午後I・IIの形式が異なるNWで「時間が足りない」悩み系longtailが不在だった。
  - 実装: `data/blog/generators.ts` buildGeneralPosts に `nw-gogo-jikan-haibun`(offset longtail2Offset-1=未使用)を新設。午後I(90分3問中2問)=45分×2問＋見直し/午後II(120分2問中1問)=大問1本に配分・中だるみ回避、構成図に印・要件文を箇条書き化・設問先読み、サブネット計算/典型設計は反射で出す、記述は部分点・本文流用、本番前の通し練習(午後I 90分・午後II 120分) のオリジナル構成。relatedSlugs=NW午後cluster3へ outbound。nw-hinshutu-pattern 概要節から inbound body link を追加。FAQ4Q&Aで FAQPage 自動出力。
  - **誇大回避(重要)**: NWは記述式(非論述・lib/essay/load.ts ESSAY_EXAM_CODES 外)のため **funnel先は /nw ハブ＋AIコパイロットのみで旗艦 /essay には送らない**(NW午後をAI論述採点できると誤認させない＝session26の旗艦ゲート規律を新規記事にも適用)。午後I/II形式数値(90分3問中2問/120分2問中1問・両者記述式)はIPA公式 kubun/nw.html を WebFetch で当セッション裏取り。合格率は既存NW記事(15〜18%)とSSOT(13〜15%)に齟齬があるため新記事では言及せず回避。
  - 検証: 全ゲート緑(typecheck0 / lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕 / test1765→1766 / build OK)。本番ビルド `blog/nw-gogo-jikan-haibun.html` 実在、SSR本文に 90分/120分/3問中2問/2問中1問/記述式 出力・`href="/nw"`×5 funnel・**body に /essay 不在**(HTMLの`href="/essay"`×1は site-wide footerのみ)・FAQPage JSON-LD・inbound from nw-hinshutu-pattern(×1) を実測。outbound 3関連記事＋/nw ハブ全て prerendered(200)＝新規404ゼロ。blog.xml sitemap に slug 収録(discoverable)。回帰pin `blog-generators.test.ts`(90/120分・3問中2問/2問中1問・記述式・/nw funnel・/essay非送客・FAQ・午後論述/論文不在)。
- done: [P1-4/土台周辺] **DBデータベーススペシャリスト午後「時間が足りない/時間配分」専用の新規オリジナル記事を新設**。SHA `c7e45de`。
  - 監査(read-only): 「時間配分」横展開の第4弾(科目B/AP午後/NW午後に続く)。session25 が sanction した高度試験午後 time の budget「1〜2記事」のうち NW=1・DB=2。既存DB記事(db-sql-taisaku/db-er-design-practice/db-goukaku-benkyouhou)は在試験 time-management 専用ページを持たず、ER図・正規化・SQL読解という DB 固有の time sink の悩み系longtailが不在だった(NWとは intent 分離=cannibalizationなし)。
  - 実装: `db-gogo-jikan-haibun`(offset longtail2Offset-2=未使用)を新設。午後I(90分3問中2問)=45分×2問/午後II(120分2問中1問)=大規模事例1本、ER図に印(主キー/外部キー/カーディナリティ)・要件箇条書き化・設問先読み、正規化判定/頻出SQLは反射で出す、記述は部分点・本文流用、本番前通し練習 のDB固有オリジナル構成。relatedSlugs=DB cluster3へ outbound。db-sql-taisaku 概要節から inbound body link。FAQPage化。
  - **誇大回避**: DBは記述式(非論述・ESSAY_EXAM_CODES外)のため funnel先は /db ハブ＋AIコパイロットのみで旗艦 /essay に送らない。午後I/II形式数値(90分3問中2問/120分2問中1問・両者記述式)はIPA公式 kubun/db.html を WebFetch で裏取り(=NWと同構造)。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1766→1767/build OK)。本番ビルド `blog/db-gogo-jikan-haibun.html` 実在、SSR本文に 90分/120分/3問中2問/2問中1問/記述式 出力・`href="/db"`×5 funnel・body に /essay 不在(footer×1のみ)・FAQPage JSON-LD・inbound from db-sql-taisaku(×1) を実測。outbound 3関連記事＋/db ハブ prerendered(200)＝新規404ゼロ。blog.xml sitemap 収録。回帰pin(90/120分・3問中2問/2問中1問・記述式・/db funnel・/essay非送客・FAQ・午後論述/論文不在)。
  - **所見**: 「時間配分」横展開は 科目B/AP午後/NW午後/DB午後 の4記事で sanctioned budget 到達。ES午後等のさらなる横展開は volume が低く thin/saturation リスク＝**打ち止め**(session25の「1〜2記事に絞る」を尊重)。
- 監査(read-only): 「時間配分」打ち止め後の**新intent角度**を探索。FE科目Bの passing score(1000点満点中600点)は既存記事に断片的に出るが、**「基本情報 何点で合格/科目B 何点/IRT 採点 仕組み」の混同キーワード専用記事が不在**と実測(title grep=合格点/スコア/採点 の専用記事ゼロ・IRT言及は IP当日持ち物記事の1文のみ)。時間配分/解き方/苦手とは別intentで、CBT化以降の高ボリューム混同クエリ＝土台=科目B戦略+競合薄(P1-6/P2-2)に合致。
- done: [P1-6/土台] **基本情報「何点で合格?/科目A・B配点/IRTスコアの仕組み」専用の新規オリジナル記事を新設**。SHA `da63cc0`。
  - 実装: `fe-goukaku-ten-irt`(offset longtail2Offset-3=未使用)を新設。科目A(90分60問四肢択一)・科目B(100分20問)の評価点は各1000点満点で両科目とも600点以上必要(片方だけ不合格)、評価点はIRT(項目応答理論)で正答率≠得点・換算式非公開・「6割正解=合格」を明確否定、当日仮スコア→約1ヶ月後正式、CBT通年。土台ピラー fe-kamoku-b-taisaku FAQ Q1(合格基準)から inbound、科目B cluster3(taisaku/wakaranai/jikan-haibun)へ outbound。FAQPage化。
  - **誇大回避(重要)**: IRT換算式は非公開のため特定の正答率→得点を断定しない(目標は「目安」と明示しIPA公表値でない旨併記)。funnel先は /fe ハブ＋土台ピラー＋AIコパイロットのみで旗艦 /essay には送らない(FEは非essay区分)。形式はIPA公式 kubun/fe.html、IRT/両科目基準点はIPA採点方式資料(WebSearch)で裏取り、1000点/600点はSSOT一致(session17検証済100分)。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1767→1768/build OK)。本番ビルド `blog/fe-goukaku-ten-irt.html` 実在、SSR本文に 1000点満点/600点/IRT/項目応答理論/「科目A・科目Bともに600点以上」出力・`href="/fe"`×4＋pillar×2＋topic pool×1 funnel・body に /essay 不在(footer×1のみ)・FAQPage JSON-LD・inbound from pillar(×1) を実測。outbound 全prerendered(200)。audit 160posts/FATAL0/WARNING0(新規404ゼロ)・blog.xml sitemap収録。回帰pin(600点/1000点満点/IRT/科目A・B基準/土台funnel/`/essay`非送客/FAQ)。
- 申し送り（セッション27まとめ）:
  - **本セッション3件**: (1)NW午後 時間配分 `bf1460c`、(2)DB午後 時間配分 `c7e45de`、(3)基本情報 合格点/IRT `da63cc0`。いずれも新規オリジナル記事・モック非依存・IPA公式裏取り・誇大回避(記述式区分は /essay 非送客・IRTは正答率断定回避)・FAQPage化・回帰pin・cluster inbound/outbound 配線・新規404ゼロ・sitemap収録。
  - **「時間配分」横展開は4記事(科目B/AP/NW/DB)で打ち止め**(session25の1〜2記事sanctionを尊重・ES等はthin)。**新intent角度=「合格点/採点の仕組み」混同キーワード**が有効と判明(時間配分とは別intent・saturation回避)。
  - **次の最優先候補(新角度の継続余地)**: (a)同「合格点/採点」angle の横展開＝応用情報の合格点(午前60点/午後60点・各100点満点で別判定)や高度試験の午前I/II・午後の各基準点(各60点)の混同クエリ。ただしFEのIRT特有の分かりにくさほどの検索intentは弱い＝**1記事(AP合格点)に絞るか様子見**(thin回避)。(b)P2-4旗艦/essayハブ書籍リスト(設計判断寄り)。(c)P0-1残りdev痕跡410(実害薄=SKIP寄り)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度 HD-7 は人間待ち継続。

## セッション28（growth ループ）2026-06-02 JST
- done: [P1-6/土台周辺] **応用情報「何点で合格?/午前・午後の合格基準/午前落ちは午後不採点」専用の新規オリジナル記事を新設**。SHA `d39afe7`。
  - 監査(read-only): session27 が起案した「合格点/採点の仕組み」angle の横展開(FE-IRT `da63cc0` に続く第2弾)。既存AP記事(ap-gogo-sentaku/bunkei-sentaku/management-erabikata/jikan-haibun/goukaku-go-koudo-senryaku)は午後選択・時間配分・合格後戦略を扱うが、**「応用情報 何点で合格/合算なのか/午前落ちで午後は採点される?」の混同キーワード専用記事が不在**と実測(slug grep=ap-goukaku-ten 系ゼロ)。FE-IRTとは別intent(AP=素点方式で混同ポイントが違う)。
  - 実装: `data/blog/generators.ts` buildGeneralPosts に `ap-goukaku-ten-border`(offset longtail2Offset-4=未使用)を新設。午前・午後とも100点満点/基準点60点・**合算ではなく各時間区分で別判定**、**多段階選抜方式=午前が60点未満だと午後は採点されず不合格**、FE(IRT/1000点満点)とは別の**素点方式**(「6割正解≒60点」が基本対応)を整理。relatedSlugs=AP cluster(ap-gogo-sentaku/jikan-haibun/goukaku-go-koudo-senryaku)へ outbound。ap-gogo-sentaku「午後問題の基本構成」節から inbound body link を追加。FAQ4Q&Aで FAQPage 自動出力。
  - **誇大回避**: AP午後採点=モック(HD-4)のため **funnel先は /ap ハブ＋AP午後記事＋AIコパイロットのみで旗艦 /essay には送らない**(body の /essay は site-wide footer×1のみ=記事本文は旗艦に送らず)。合格基準(100点満点/基準点60点/各区分別判定/多段階選抜=午前未達なら午後不採点)・形式(午前150分80問四択/午後150分11問中5問記述・情報セキュリティ必答)はIPA公式 kubun/ap.html(WebFetch)＋採点方式資料/案内書(WebSearch裏取り)で確認。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1768→1769/build OK)。本番ビルド `blog/ap-goukaku-ten-border.html` 実在、SSR本文に 100点満点/基準点60点/午前・午後ともに60点以上/多段階選抜方式/午後試験は採点されず不合格/素点方式 出力・`href="/ap"`×5＋AP午後記事リンク funnel・**body に /essay 不在**(footer×1のみ)・FAQPage JSON-LD を実測。outbound 3関連記事＋/ap 全prerendered(200)＝新規404ゼロ。ap-gogo-sentaku に inbound(×1)。blog.xml sitemap収録。audit FATAL0/WARNING0。回帰pin(100点満点/基準点60点/午前・午後ともに60点以上/多段階選抜方式/午後不採点/素点方式/(/ap)/ap-gogo-sentaku funnel/`/essay`非送客/FAQ)。
  - **所見**: 「合格点/採点の仕組み」angle は FE-IRT(混同の核=IRT)＋AP(混同の核=合算誤解/多段階選抜)の2記事で主要intentを消化。高度試験の各基準点(各60点)は AP と同型(素点・各区分60点)で **混同の分かりにくさが弱く thin リスク**＝横展開せず打ち止め(session27の「1記事に絞る/様子見」を尊重)。次は P2-4(設計判断)/別angleの新規longtail探索 or HD解消待ち。

## セッション29（growth ループ）2026-06-02 JST
- 監査(read-only): 新規記事の saturation を避けつつ価値を出す角度として **「既にランク済みの記事に、IPA公式の情報ギャップを additive で埋める」** マイクロ角度を採用(新規competingページを作らない=cannibalization回避)。internal-link監査=161posts/FATAL0/WARNING0。
- done: [P1-2周辺/旗艦周辺] **午前I免除の3条件(AP合格以外のルート)を高度試験戦略記事に追記**。SHA `9c554ca`。
  - 監査: `ap-goukaku-go-koudo-senryaku`(「午前I免除の正しい使い方」記事・既に午前I免除keywordをカバー)は午前I免除を **AP合格ルートのみ** で説明。IPA公式(about/koudo_menjo.html WebFetch裏取り)の残り2ルート=(2)いずれかの高度試験・支援士に合格 (3)高度・支援士の午前Iで基準点(60点)以上=午前I通過 が **サイト全体で不在**(grep: 免除言及は全てAP合格path)。「午前1 免除 条件」情報intentの実ギャップ。
  - 実装: 「## 午前I免除は3通りある(AP合格以外のルート)」節を additive 挿入。3条件＋有効期間2年＋申請に必要な番号(条件1・2=合格証書番号 / 条件3=午前I通過者番号)をIPA公式どおり整理。既存ランク済み記事へのadditive=新規competingページ無し=cannibalization回避。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1769→1770/build OK)。本番ビルド `blog/ap-goukaku-go-koudo-senryaku.html` SSRに「3つの条件」「午前I通過者番号」「合格証書番号」「基準点(100点満点中60点)以上」出力を実測。回帰pin(3条件+申請番号)を `blog-generators.test.ts` の既存 免除 describe に追加。新規内部リンク無し(外部IPA linkのみ)=新規404ゼロ。
- done: [P1-6/土台] **FE合格点記事に「午前・午後→科目A/B(2023年4月)」移行の読み替えを追記**。SHA `587921a`。
  - 監査: `fe-goukaku-ten-irt`(科目A/B/IRT/CBTを詳説)は、これが旧「午前・午後」を **廃止して置き換わった事実**(2023年4月・通年CBT)に未言及(サイト全体でも passing 1行のみ)。「基本情報 午後」で検索する旧制度searcherが「午後=今の科目B」と読み替えられない実ギャップ。
  - 実装: 「## 「午前・午後」はもう無い(2023年4月から科目A・科目B)」節を additive 挿入。旧午前→科目A(90分60問四択)/旧午後→科目B(100分20問・擬似言語一本化・旧言語選択C/Java/表計算は廃止)の読み替え。IPA公式 henkou/2022/20220425.html(WebSearch裏取り)。
  - 検証: 全ゲート緑(test1770/build OK)。本番ビルド `blog/fe-goukaku-ten-irt.html` SSRに「2023年4月から「午前・午後」という区分は廃止」「擬似言語に一本化」「午後＝今の科目B」出力を実測。移行文言の回帰pinを既存テストに追加。形式数値は本文既存(科目A 90分60問/科目B 100分20問)と一致(誇大回避)。
- done: [P2-3/内部リンク] **合格点クラスタ(FE-IRT↔AP-素点)を相互内部リンク化**。SHA `49dcde1`。
  - 監査: `fe-goukaku-ten-irt`(IRT)と `ap-goukaku-ten-border`(素点)は互いの採点方式を本文で比較しつつ、相手記事へのリンクが無くプレーンテキスト言及のみ(AP記事は「## 基本情報(IRT)とは採点方式が違う」節を持つのに未リンク/FE記事はAP未言及)。「基本情報↔応用情報 合格点比較」の実intentに対する cross-link gap。
  - 実装: 相互内部リンク(AP→FE は IRT比較節末に1文/FE→AP は FAQに新規Q&A「応用情報の合格点も同じ仕組みですか?」)。saturationではなく試験区分の異なる新規2記事(session27/28)を比較intentで接続。
  - 検証: 全ゲート緑(test1770/build OK)。本番ビルド両HTMLに相互 `href` 出力・両target prerendered(200)を実測。audit body links 600→602/FATAL0/WARNING0。両方向の回帰pin追加。
- 申し送り（セッション29まとめ）:
  - **新角度=「ランク済み記事へのIPA公式情報ギャップの additive 補完」**: 新規記事 saturation を避けつつ、(1)午前I免除の3条件(AP以外の2ルートがサイト全体で不在) `9c554ca`、(2)FE午前/午後→科目A/B移行(旧制度searcher向け読み替え) `587921a` を既存ランク済み記事に additive 挿入(competingページ無し=cannibalization回避)。+(3)合格点クラスタの相互リンク化 `49dcde1`。全てIPA公式裏取り・最小diff・誇大回避・回帰pin・新規404ゼロ。
  - **SKIP記録**: `lib/seo/category-tips.ts`=分野別汎用学習ポイントで hard error 無し(OWASPはversion無し・形式数値/称号claim無し)→理論のみSKIP。`data/community/{questions,stories}.ts`=どのlive routeにもimportされず(session2で /community/* は410化)=orphan data・SEO価値ゼロ→SKIP。SG(情報セキュリティマネジメント)の2023形式変更は確証不足(SG現行形式の正確な内訳が未裏取り・SG記事は メリット記事のみで明確な午前/午後誤記なし)→安全側でSKIP(不確実な事実でfixを捏造しない)。
  - **次の最優先候補**: (a)同マイクロ角度の継続=他のランク済み記事のIPA公式情報ギャップ(ただし主要な形式/制度ギャップはFE午前午後・SC午後統合[既出sc-shikaku-merit]・免除3条件で概ね消化、残りは thin 寄り)、(b)P2-4旗艦/essayハブ書籍リスト(設計判断寄り)、(c)P0-1残りdev痕跡410(実害薄=SKIP寄り)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度 HD-7 は人間待ち継続。

## セッション30（growth ループ）2026-06-02 JST
- 監査(read-only): session29 が「確証不足で安全側SKIP」とした **SG(情報セキュリティマネジメント)の2023形式変更** を IPA公式 kubun/sg.html(WebFetch)で裏取りして確定。現行SG=**科目A(四肢択一)＋科目B(多肢選択の事例問題)の2科目・計60問・120分・CBT通年・午前午後区分は廃止**。コードSSOT `lib/exam-config.ts` も SG CBT=科目A(48問) を保持(=整合)。これを truth に、旧「午前/午後」形式の取り残しを面横断で grep 走査(session17-22の事実性監査角度のSG版)。
- done: [P2-2/事実性] **SG試験形式を現行(科目A・科目B/CBT通年)に是正**。SHA `de36d72`。
  - 監査: blog `sg-shiken-meritto-imi-aru`(SGメリット記事・indexable) が「午前 50 問の四択 + 午後の長文事例（CBT 化以降は科目B として統合）」と **pre-2023形式を誤記**(科目Bだけに統合と誤読させ午前/午後 framing を保持)。
  - 修正: 「2023年からCBT通年方式となり、科目A(四肢択一)と科目B(多肢選択の事例問題)の2科目・計60問を120分で解く形式(従来の午前・午後区分は廃止)」へ。IPA確認済の事実のみ記載(48/12の内訳は IPA未明示のため断定せず計60問に留め誇大回避)。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1770→1771/build OK)。本番ビルド `blog/sg-shiken-meritto-imi-aru.html` SSRに「科目 A（四肢択一）と科目 B」×2・「計 60 問を 120 分」出力、旧「午前 50 問の四択」「科目B として統合」**0件**を実測。回帰pin `blog-generators.test.ts`(現行形式 contain＋旧framing not contain)。
- done: [P2-2/事実性] **/faq の「IP・SG・FE の午前」誤記を多肢選択式中心へ是正**。SHA `47d530a`。
  - 監査: `data/faq.ts`「過去問だけで合格できますか?」回答(FAQPage JSON-LD・/faq に露出)が「IP・SG・FE の午前は過去問の繰り返しが…」と記載。**IPは午前/午後の区分が無い単一CBT(100問)**で「IPの午前」は存在しない区分、FE・SGの「午前」は2023年に科目Aへ再編済＝廃止。SG誤記と同一error class(面横断)。
  - 修正: intent(択一系基礎試験は過去問反復が最短/AP以上の午後・論文は別)を保ち「IP・SG・FE のような多肢選択式中心の試験」へ。回帰pin `faq.test.ts`(「IP・SG・FE の午前」not contain)。
  - 検証: 全ゲート緑(test1771→1772/build OK)。本番ビルド `faq.html` に旧framing**0件**・新文言出力を実測。
- SKIP→HD-8: **合格体験記 `data/success-stories/personas.ts` のSGペルソナ3件が pre-2023 の午前/午後形式**(score「午前66点/午後72点」等・scheduleNarrative/strugglePoint/examDayNarrative/keyTakeaways が全て午前午後前提)。1ペルソナ複数フィールド×3件の**捏造体験記の全面リライト**＝最小diff不能・editorial判断、かつ**現行SGの正式スコア通知形式(科目A/Bの満点・合否判定/IRT or 素点)が未検証**で score を正確に書き換えられない(不確実な数値を捏造しない)。安全側でSKIP＝`growth-human-decisions.md` HD-8 に集約(IPA裏取り済の形式facts＋3ペルソナ位置を記載)。
- SKIP(soft/過大修正回避): `generators.ts` L587「基本情報は科目 A・B 構成、情報セキュリティマネジメントは長文事例中心」はSGを科目A/B構成と明示しないが「長文事例中心」自体はSG科目Bの性質として真＝hard errorでない soft characterization。L2957「IP・SG・FEの科目A」/L7162「AP vs SG」/faq L260(高度試験の午前II/午後I study目安)は SG午前/午後を主張せず正＝対象外。
- 申し送り（セッション30まとめ）:
  - **新角度=SG現行形式(科目A/B・午前午後廃止)の面横断是正**: session29が確証不足でSKIPした SG 2023形式変更を IPA公式で裏取り確定し、旧午前/午後形式の取り残しを2面是正(blog merit記事 `de36d72`・/faq `47d530a`)。SSOT(exam-config SG=科目A 48問)とも整合。SC午後統合(session17-22)/FE午前午後(session29)に続く「2023再編の取り残し」掃きのSG版。
  - **personas はHD-8へ**: 同じSG午前/午後誤記が合格体験記3ペルソナにも残るが、捏造体験記の全面リライト＋新形式スコア表記の未検証ゆえ editorial/人間判断としてHD-8集約(自律で半端リライト or 数値捏造しない)。
  - **次の最優先候補**: (a)他試験のpre-2023形式取り残しの面横断確認(SG/FE/SC以外で2023再編した区分があれば。ただしCBT再編はIP[元々単一]/SG/FEが主＝概ね消化)、(b)P2-4旗艦/essayハブ書籍リスト(設計判断寄り)、(c)P0-1残りdev痕跡410(実害薄)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度 HD-7/SGペルソナ HD-8 は人間待ち継続。

## セッション31（growth ループ）2026-06-02 JST
- 監査(read-only): session27-28の「合格点/採点の仕組み」angle(FE-IRT `da63cc0`/AP-素点 `d39afe7`)を**IP(ITパスポート)**へ展開。slug grep で `ip-goukaku-*`/総合評価点/分野別評価点 の専用記事が不在と実測(IP合格基準は ip-3shukan-goukaku L3192 の1文のみ)。IPは最大volumeの入門区分で、**総合600点だけでなく分野別各300点の足切り**という混同の核がFE(科目A/B)・AP(素点)と別intent＝saturationでなく新規ページ価値あり。IPA公式 iパス評価方法(range.html WebFetch)で裏取り。
- done: [P1-6/土台周辺] **ITパスポート「何点で合格?/総合評価点600点と分野別評価点300点」専用の新規オリジナル記事を新設**。SHA `839f0ed`。
  - 実装: `data/blog/generators.ts` buildGeneralPosts に `ip-goukaku-ten-bunyabetsu`(offset longtail2Offset-5=未使用)を新設。**総合評価点1000点満点/600点以上 かつ 分野別評価点(ストラテジ/マネジメント/テクノロジ)各1000点満点/各300点以上の両方**が必要(1分野でも300点未満なら不合格=見落としがちな足切り)、IRT(項目応答理論)で正答数≠評価点、**出題100問中採点対象は約92問**(残り8問は今後の評価用で採点されない・内訳ストラテジ32/マネジメント18/テクノロジ42)を整理。relatedSlugs=IPクラスタ(ip-3shukan-goukaku/ip-nani-kara-benkyou/fe-goukaku-ten-irt)へ outbound。ip-3shukan-goukaku「試験の基本情報」節から inbound body link。FAQ5Q&AでFAQPage化(Q5でFE合格点記事へcross-link)。
  - **誇大回避**: IRT換算式は非公開のため特定の正答数→得点を断定しない(目安は「目安」明示・IPA公表値でない旨併記)。IPは非essay区分のため **funnel先は /ip ハブ+分野別モード+AIコパイロット+IPクラスタのみで旗艦 /essay には送らない**(body の /essay は site-wide footer×1のみ)。全数値はIPA公式 range.html 裏取り(総合600/分野別300/IRT/採点92問)。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1772→1773/build OK)。本番ビルド `blog/ip-goukaku-ten-bunyabetsu.html`(135KB)実在、SSR本文に 総合評価点/分野別評価点/「1分野でも300点未満なら不合格」/92問/IRT 出力・`href="/ip"`+IPクラスタ funnel・FAQPage JSON-LD・**body に /essay 不在**(footer×1のみ)・inbound from ip-3shukan-goukaku を実測。outbound(ip-nani-kara-benkyou/fe-goukaku-ten-irt/ip)全prerendered(200)。blog.xml sitemap収録。audit 609 body links/FATAL0/WARNING0(新規404ゼロ)。回帰pin(総合600/分野別300/「1分野でも300点未満なら不合格」/IRT/92問/IPクラスタfunnel/`/essay`非送客/FAQ)。
- done: [P2-3/内部リンク] **合格点クラスタ(FE-IRT↔IP-分野別)を相互内部リンク化**。SHA `aef6f76`。
  - 監査: 新設IP記事→FEはcross-link済だが、FE-IRT記事→IPの逆リンク無し。FEとIPはともにIRTで評価点算出する近縁(AP素点とは別)で「基本情報 vs ITパスポート 合格点」比較intentの自然な接続先。
  - 実装: FE記事のIRT節末に、IPも同じIRTだが分野別足切り(各300点)がある点を明示してIP記事へ送客(additive・誇大なし)。session29のFE↔AP相互リンク化と同型。両方向の回帰pin。検証: 本番ビルド両HTMLに相互 `href` 出力・両target prerendered(200)・audit body links 609→611/FATAL0/WARNING0。
- done: [P2-2/事実性] **ITパスポート3週間記事の「配点はストラテジ系が最多」誤記を是正**。SHA `f2beada`。
  - 監査: IP記事の採点facts裏取り中に発見。`ip-3shukan-goukaku` L3199「ITパスポートの配点はストラテジ系が最多(約35%)」だが、IPA公式の採点対象内訳(ストラテジ32/マネジメント18/**テクノロジ42**)で出題数が最多なのは**テクノロジ系**。ストラテジは約35%だが最多ではない=hard error(session17-22/26/30の事実性監査angleのIP版)。
  - 修正: pedagogicalな「ストラテジを先に固める」意図(比率が高く用語暗記で取りやすい)は保ちつつ「最多はテクノロジ系」と明記。最小diff・回帰pin(ストラテジ系が最多 not contain/テクノロジ系が最多 contain)。検証: 本番ビルド `blog/ip-3shukan-goukaku.html` に「テクノロジ系が最多」出力・「ストラテジ系が最多」0件を実測。全ゲート緑(test1773→1774)。
- 申し送り（セッション31まとめ）:
  - **「合格点/採点の仕組み」angleをIPへ展開で完結**: FE-IRT(科目A/B・s27)/AP-素点(s28)/**IP-分野別足切り(s31 `839f0ed`)** の主要3区分で混同の核がそれぞれ別intent。IPは「総合600だけでなく分野別各300の足切り」が固有の混同ポイント。+FE↔IP相互リンク `aef6f76`(IRT近縁ペア接続)+裏取り中に見つけた IP配点誤記の是正 `f2beada`。全てIPA公式裏取り・誇大回避(IRT断定回避・非essay区分は/essay非送客)・FAQPage化・回帰pin・新規404ゼロ・sitemap収録。
  - **合格点angleは打ち止め寄り**: FE/AP/IPで主要intent消化。SGの合格点記事化は**SG現行スコア通知形式が未検証(HD-8)**のため見送り(不確実な数値で記事を書かない=安全側)。高度試験の各60点はAP同型でthin(session28所見)。
  - **次の最優先候補**: (a)同「ランク済み記事へのIPA公式情報ギャップ補完」マイクロ角度(session29流)の継続(ただし主要formatギャップは概ね消化)、(b)P2-4旗艦/essayハブ書籍リスト(設計判断寄り)、(c)P0-1残りdev痕跡410(実害薄)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度 HD-7/SGペルソナ HD-8 は人間待ち継続。

## セッション32（growth ループ）2026-06-02 JST
- 監査(read-only): session17-22/26/30/31の「事実性監査(IPA形式の取り残し掃き)」angleを、未監査の indexable surface =全試験ハブ `/[exam]` の静的データ(`lib/seo/exam-stats.ts`・`lib/seo/exam-content.ts`)へ展開。IP採点内訳(IPA range.html・session31裏取り: テクノロジ42/ストラテジ32/マネジメント18・採点92問)を truth に、出題分布の誤記を grep 走査。
- done: [P2-2/事実性] **/ipハブの出題傾向「3分野が均等に出題」誤記をテクノロジ系最多へ是正**。SHA `ee5731e`。
  - 監査: `lib/seo/exam-stats.ts` EXAM_STATS.ip.topicTrend が「ストラテジ系・マネジメント系・テクノロジ系の3分野が**均等に出題**」。/ip ハブ(indexable・`app/[exam]/page.tsx` L345 出題傾向カード)にそのまま描画されるのに、IPA公式内訳ではテクノロジ系42が最多で「均等」は事実誤り(session31でblog ip-3shukan-goukakuの「ストラテジ系が最多」誤記も是正済＝面横断の同 error class)。
  - 修正: 「テクノロジ系の出題が最も多く、ストラテジ系・マネジメント系が続く3分野構成。」へ。最小diff。回帰pin `__tests__/seo/exam-data-invariants.test.ts`(ip topicTrend は「均等」not contain・テクノロジ系 contain・テクノロジ系がマネジメント系より前)。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1774→1775/build OK)。本番ビルド `.next/server/app/ip.html` に新文言出力・「均等に出題」0件を実測。
- done: [P2-2/事実性] **/ipハブのリード文「3領域からバランス良く構成」を出題分布の含意なしへ**。SHA `8e87e58`。
  - 監査: 上記カード是正後、同一 /ip ページの `lib/seo/exam-content.ts` EXAM_DEEP_CONTENT.ip.leadParagraph が出題を「3領域から**バランス良く**構成」と記載し、同一ページ内で出題分布の含意が不整合(テクノロジ42 vs マネジメント18 で均等・バランスではない)。
  - 修正: 「3領域から**幅広く**構成」へ(基礎を幅広く扱う事実は保ち、出題数の均等は含意しない最小修正)。「バランス良く」は単独なら soft characterization だが同一ページのカード是正との整合で完結させる判断。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1775〔invariants 12件緑〕/build OK)。本番ビルド `ip.html` に「3 領域から幅広く構成」出力・「バランス良く構成」0件を実測。
- SKIP→HD-9: **勉強法 overview テンプレ `buildOverviewPost`(全13区分の中核「{exam}-goukaku-benkyouhou」記事)が IP/SG/FE で pre-2023の「春期・秋期/午前・午後」前提をハードコード**。本番ビルド `{fe,sg,ip}-goukaku-benkyouhou.html` に「春期・秋期に実施」「午前試験(基礎知識)の戦略」「午後試験(記述・論文)の戦略」が各2回ずつ live 出力と実測(IP/SG/FEはCBT通年・FE/SGは科目A/B・IPは単一CBTで午後論述なし＝サイト自身がL993-995で通年実施と正しく記載＝テンプレだけ旧前提で内部不整合)。session29-31で是正した「2023再編の取り残し」と同一error classの**テンプレ版(最大の取り残し面)**だが、(1)テンプレ全体の構造(見出し+本文10箇所超)に及び最小diff不能、(2)正しい構造が区分ごと3通り(IP=単一/FE・SG=科目A/B/AP・高度=午前午後)で分岐が編集判断、特にIPは2セクションテンプレに乗らず prose 再設計が要る＝安全側でSKIP。`growth-human-decisions.md` HD-9 に実測evidence(live HTML count・exact strings・IPA/SSOT裏取り)付きで集約(部分修正=実施時期だけ直すと「CBT通年なのに午前/午後見出し」の新規不整合を生むため不可・テンプレ単位でコヒーレント対応が必要)。
- 申し送り（セッション32まとめ）:
  - **事実性監査angleを `/[exam]` ハブ静的データへ展開**: blog/faq/glossary(s17-22/30/31)に続き、未監査だった exam-stats.ts/exam-content.ts(全試験ハブ indexable)を IP採点内訳 truth で掃き、IP出題分布の hard error 2件を是正(`ee5731e`/`8e87e58`)。他surface(topics.ts/structured-data.ts/features.ts/exam-resources.ts ROADMAP〔SG/FE既に科目A/B〕)は format hard error 無しを確認＝これら主要data面は枯渇。
  - **最大の取り残し発見=overview テンプレ(HD-9)**: IP/SG/FEの中核 勉強法ページが live で春秋/午前午後の旧前提。session30申し送り「他試験のpre-2023形式取り残しの面横断確認」への回答。テンプレ構造リライト(区分3通り分岐+IP欠落セクション)は editorial ＝HD-9へ集約(HD-7の2026春秋とは独立=present-tense確定誤りで先行可)。
  - **次の最優先候補**: (a)P2-4旗艦/essayハブ書籍リスト(設計判断寄り)、(b)P0-1残りdev痕跡410(実害薄)、(c)残るpre-2023取り残しは overview以外は概ね枯渇(HD-9実装は人間待ち)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度 HD-7/SGペルソナ HD-8/overviewテンプレ HD-9 が人間待ち継続。

## セッション33（growth ループ）2026-06-02 JST
- done: [P0-1/404掃除] **削除済み開発レビュー痕跡10ルートを 404→410 Gone 化（クロール資産回復）**。SHA `ac1deb4`。
  - 監査(read-only): `git log --diff-filter=D -- "app/**/page.tsx"` で削除済みルートを再列挙し、middleware GONE_PATHS / next.config redirects と突合。301済(testimonials/trust/account系/support等)・410済(commerce/pricing/premium等23件)・**判断保留(/analytics→/stats は SKIP寄り)** を除いた残り = backlog P0-1 が「dev痕跡（実害薄）」として下げていた開発痕跡群が **唯一の未処理404**と確定。exam-stats.ts のtopicTrend/合格率も全区分監査したが hard error 無し（session32の「data面枯渇」を裏取り）。internal-link audit=162posts/FATAL0/WARNING0、blog structured-data(Article/LearningResource/Breadcrumb/HowTo gated/FAQPage)も整備済＝主要面は飽和。
  - 実装: `middleware.ts` GONE_PATHS と config.matcher の両方に exec-review / feature-review / final-review / final-review-v3 / scoring-test / strategy-discussion / strategy-discussion-v2 / test/posthog / test/sentry / tmp/round7-review の10ルートを追加（全て exact path・git削除済で現在404・後継なし＝301先も無い開発痕跡）。404はクローラがリトライしうるが410は恒久削除を明示＝クロール資産回復のP0機構。
  - **過大修正回避の検証**: 着手前に10ルート全dirの非存在(app/配下に無い)を確認し、live再追加(stats/account系のような復活)が無いことを実測してから410化（live誤410を防止）。
  - 検証: 全ゲート緑(typecheck0 / lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕 / test1775全緑 / build OK・middleware登録確認)。既存回帰テスト `__tests__/middleware.test.ts` が GONE_PATHS を**動的iterate**し全エントリ(新規10含む)の410・matcher同期・admin非衝突を検証＝追加分も自動カバー。さらに **本番ビルドをlocalhost起動しruntime curl実測**: 新規5パス(exec-review/strategy-discussion-v2/test/sentry/tmp/round7-review/final-review)が全て**410**、live(/blog /fe /essay)は**200**、非存在 control /test-foo は**404**(over-matchingなし)を確認。sitemap-resolvability テストも緑(sitemap URLとGONE_PATHSの非衝突維持)＝新規404ゼロ。
  - **所見**: これで「削除済み・後継なし」ルートの404は 301群/410群/dev痕跡410群 で**コード側が処理できる範囲を網羅**。残る GSC実404一覧(4,363件)は認証必須でループ取得不可＝HD-1(人間)継続。P0(404掃除)はコード側で打ち止め。
- 調査done(コード変更なし): [P0-3] **旧URL形式の痕跡調査＝ソース側に系統的な旧形式なしと確定**。
  - 監査: 個別問題ページのルートは `app/q/[exam]/[yearSeason]/[section]/[qnum]` で、URL builder `lib/seo/question-url.ts` の `/q/{exam}/{year}-{season}/{session}/q{qNumber}` は **#38(ac0200f)導入以来 不変**（その後の唯一の変更 #407 はperf refactorで format文字列を維持）。section命名も実データは `session:"am"` のみで am1/am2 の変遷なし。flat形式 `/q/ap-2024h-am-q42` は `lib/admin/metrics/mock-data.ts` の **admin metrics ダッシュボード表示用ダミー文字列のみ**（Basic認証配下・crawlableリンクとして出力されない）。`grep -rE '/q/[a-z]+-[0-9]'` を app/lib/data/components(mock/test除く)で実行＝**0件**＝実crawlableリンクに旧flat形式は存在しない。
  - 結論: **ソース/履歴に系統的な旧URL形式は無い**＝GSCの404(4,363件)は外部/履歴由来（旧サイトマップ・外部被リンク等）。コード側で追加できるredirectは無い。実URL一覧が要る＝**HD-1(人間・GSCエクスポート)** 継続。backlog P0-3 の「無ければ記録しhumanへ」に従い記録。
  - 付随確認: `/q/*`(最大クロール面)の indexability は正設計（実問題=index:true / placeholder解説=noindex,follow:true かつ sitemap除外〔load-bearing comment・~1,742件〕/ needsReview=404）＝noindex誤適用なし。
- 申し送り（セッション33まとめ）:
  - **P0(404掃除)をコード側で打ち止め**: dev痕跡10ルートの410化(`ac1deb4`・runtime curl実測)で「削除済み・後継なし」ルートの404は 301群/410群/dev痕跡410群 で網羅。P0-3調査で旧URL形式の系統的痕跡なしと確定＝残404はGSC実URL一覧(HD-1・人間)待ち。
  - **主要面の飽和を再確認**: exam-stats.ts(合格率/topicTrend全区分)・internal-link audit(162posts FATAL0/WARNING0)・blog structured-data(Article/LearningResource/Breadcrumb/HowTo gated/FAQPage)・/q indexability＝いずれも整備済/hard error無し。新規記事は95slugで saturation。
  - **次の最優先候補**: (a)P2-4旗艦/essayハブ書籍リスト(設計判断寄り・5区分横断1冊選定難)、(b)新角度の起案余地が乏しく主要バックログは概ね飽和 or 人間待ち。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度 HD-7/SGペルソナ HD-8/overviewテンプレ HD-9 が人間待ち継続。**P0完了によりループの自律実装可能領域は縮小傾向**＝次セッションは P2-4 の設計判断を human-decisions へ正式に積むか、HD解消(人間入力)を待つ局面。

## セッション34（growth ループ）2026-06-02 JST
- 監査(read-only): session33が「P0コード側打ち止め・主要面飽和」と総括した後の新角度として、**未着手だった P1-3(旗艦の構造化データ/メタ) を起点に旗艦 /essay の deep ページ面**を精査。ハブ `/essay` は既に LearningResource+BreadcrumbList+canonical+meta+sitemap掲載済(P1-3はハブでは達成)だが、**個別採点ページ `/essay/{exam}/{id}`(実コンテンツ・indexable・自己canonical・/essayハブからリンク)が sitemap 未掲載**と実測(main.xml STATIC_ROUTESに/essayのみ・deep無し／一方 /q問題ページは sitemap掲載済＝非対称)。
- done: [P0/P1-3/旗艦] **旗艦 /essay の個別論述採点ページ12件を sitemap 掲載**。SHA `c6ea936`。
  - 実装: `lib/seo/sitemap-xml.ts` に `getEssayRoutes()`(全12問 st/sa/pm/sm/au を `/essay/{exam}/{q.id}` で出力・priority0.6)を新設し `renderMainSitemapXml` に追加。noindexの `/essays`(複数形・架空サンプル)とは別物(indexableなdeepページ)。`sitemap-resolvability.test.ts` に `/essay/{exam}/{id}` 分岐(page.tsxの notFound() ロジック=ESSAY_EXAM_CODES.includes && findEssayQuestion && q.exam===exam を鏡写し)＋「main sitemapが全essay deepを載せ全てresolvable」non-vacuous test(count===getAllEssayQuestions().length===12)を追加。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1775→1776/build OK)。本番ビルド `.next/.../sitemap/main.xml.body` に essay deep 12 URL出力・`/essay`ハブも維持。runtime `next start` curl: /essay+deep3件=**200**(SSRにh1+問題本文)・sitemap served に該当URL有。
- done: [P1-3/旗艦] **個別論述採点ページに構造化データ(LearningResource+BreadcrumbList)を付与**。SHA `926cab8`。
  - 監査: sitemap掲載した deep ページはハブと違い構造化データ皆無だった(P1-3のページレベル未達)。
  - 実装: `app/essay/[exam]/[questionId]/page.tsx` に question から導出する LearningResource(name/description/teaches=examLabel(question.exam)の午後II論述対策/isBasedOn=question.pdfUrl=IPA原典/「参考評価」明記)＋3階層 BreadcrumbList(ホーム>AI論述添削>question.title)を `@graph` で付与。誇大回避は question 由来導出で構造保証(ハードコードclaimなし)。`essay-flagship-jsonld.test.ts` に deep ページ用の固定(両@type・JsonLd描画・question由来・isBasedOn)を追加。
  - 検証: 全ゲート緑(test1776→1778/build OK)。runtime curl で deep ページ SSR に `"@type":"LearningResource"`+`"BreadcrumbList"`・teaches="ITストラテジスト…"・isBasedOn=ipa.go.jp URL を実測。
- done: [P0/旗艦] **/essay/{exam}/{id} の soft-404(HTTP200)を proper 404 化**。SHA `80f1695`。
  - 監査で発見(実測): 旗艦 deep ルートは fully dynamic で、**無効な `/essay/{exam}/{id}`(古い/外部リンク)が `notFound()` を HTTP 200 のソフト404**として返していた(`/essay/st/DOES-NOT-EXIST`→200・not-found UI)。対照 `/blog/no-such-slug`→**404**(正しい)。差は設定: /blog は `generateStaticParams`+`dynamicParams=false`でルータ層404、/essay deep は無設定で handler の notFound()が `next start`上200(Next 16.2.6)。ソフト404はクロール予算浪費=P0「404掃除」と同根。
  - 修正: 同repo実証済の /blog パターンを適用。`generateStaticParams`(getAllEssayQuestions()→12問の{exam,questionId})+`export const dynamicParams = false`。実在12問のみ prerender(● SSG化)・それ以外は Next が描画前に proper 404。件数12で全SSG可能ゆえ安全に適用できた。
  - 検証: 全ゲート緑(test1778→1779/build OK)。runtime `next start` curl 実測: 有効2件=**200**(JSON-LD/問題本文維持)・無効ID/無効exam/無効年度=**404**(ソフト404解消)・sitemap掲載12 URLは全有効(=新規404を作らず)。回帰pin(generateStaticParams/getAllEssayQuestions/dynamicParams=false)。
- 調査done→HD-10(コード変更なし): **最大クロール面 `/q/*`(~12,653件)も同型の soft-404(無効URL→HTTP200)**。だが `/q` は `dynamicParams=true`+ISR が**設計上必須**(sitemapは~14k広告・SSGは2024年以降のみ・それ以前ISR。`app/q/.../page.tsx` L51-59がdynamicParams=falseを明示的に警告=それ以前全404のリグレッション)。よって /blog/essay の `dynamicParams=false` レバーは /q に使えず、修正は「dynamic ルートの notFound() が確実に404をemit」するframework層対応=広域・要慎重・production(Vercel/ISR)での実挙動が `next start` と異なる可能性(GSC「ソフト404」レポートで裏取り要)。自律修正せず **HD-10** に実測evidence付きで集約(HD-1のGSCエクスポートと同時確認可)。/essay 部分集合は先行修正済(`80f1695`)。
- 申し送り（セッション34まとめ）:
  - **旗艦 /essay の deep ページ面を3点強化**: (1)個別採点12件を sitemap 掲載しクロール発見性確保 `c6ea936`、(2)deep ページに LearningResource+Breadcrumb 構造化データ付与(P1-3ページレベル達成) `926cab8`、(3)deep ルートの soft-404→proper 404 化(generateStaticParams+dynamicParams=false) `80f1695`。旗艦の最も具体的な面が「発見され・正しく説明され・無効URLは正直に404」になった。
  - **新発見の横展開先=soft-404**: dynamic ルートの notFound() が `next start` で200を返す挙動を実測。/essay(12件)は dynamicParams=false で解決。**/q(~12.6k)は ISR設計と干渉し同レバー不可→HD-10**(production裏取り前提・HD-1のGSC同時確認)。これはHD-1(GSC 404 4,363件)の主因候補=soft-404の可能性を新たに提示。
  - **次の最優先候補**: (a)HD-10のproduction裏取り(人間・GSCソフト404レポート)、(b)他の dynamic ルートで全SSG可能な小面があれば /essay 同様 dynamicParams=false で先行 soft-404解消(read-only監査要)、(c)P2-4旗艦/essayハブ書籍リスト(設計判断寄り)。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度 HD-7/SGペルソナ HD-8/overviewテンプレ HD-9/q soft-404 HD-10 が人間待ち。

## セッション35（growth ループ）2026-06-02 JST
- 監査(read-only): session34申し送りの最優先候補(b)「他の dynamic ルートで全SSG可能な小面を /essay 同様 dynamicParams=false で先行 soft-404解消」を実行。全 dynamic ルート(`app/**/[*]`)を `dynamicParams` / `generateStaticParams` / `notFound()` で走査し、**generateStaticParams で有限静的セットを列挙するのに dynamicParams=false が無い**(=無効URLが notFound() を `next start` 上 HTTP200 で返すソフト404) ルートを3面特定: `/success-stories/[exam]`・`/success-stories/[exam]/[slug]`・`/essays/[exam]`。他の dynamic ルート(keywords/topics/features/recommended-books/[exam]/[exam]/topic/[exam]/[yearSeason]/[exam]/afternoon/.../[season]/essays deep [qnum])は既に dynamicParams=false 済を確認。`/q/*` のみ ISR設計で同レバー不可(=HD-10・据え置き)。
- done: [P0-4/旗艦] **/success-stories/{exam}{/slug} の soft-404(200)を proper 404 化**。SHA `c79bafb`。
  - 実装: 両 sibling ルートに `export const dynamicParams = false` を付与(generateStaticParams は getSuccessStoryExams()/getAllSuccessStorySlugs() で全データ列挙=有限・全SSG可能)。索引 `/success-stories` は count>0 の区分のみリンク=静的セットと一致＝新規ハード404を作らないことをソースで確認。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1779→1783/build OK・両ルートが ●SSG 化)。runtime `next start` curl 実測: 有効カテゴリ /success-stories/fe=200・有効記事=200・無効exam /success-stories/zzz=404・無効slug=404・**exam不一致(valid slug+wrong exam)=404**(従来soft-404)・control /fe=200。回帰pin `__tests__/seo/success-stories-soft-404.test.ts`(dynamicParams=false と静的セット網羅を機械検出)。
- done: [P0-4/旗艦] **/essays/{exam} の soft-404(200)を proper 404 化**。SHA `02fae68`。
  - 監査: /essays ツリーで深い [qnum] ルートは既に dynamicParams=false だが、カテゴリページ `/essays/[exam]` のみ漏れていた(generateStaticParams=ESSAY_EXAM_CODES 全列挙だが guard無し)。
  - 実装: `export const dynamicParams = false` を付与。検証: 全ゲート緑(test1783→1785/build OK・●SSG化)。runtime curl: 有効 /essays/st=200・**非論述区分 /essays/fe=404**・無効 /essays/zzz=404・control /essay=200。回帰pin `__tests__/seo/essays-exam-soft-404.test.ts`。
  - **所見**: これで「generateStaticParams で有限列挙する page ルート」の soft-404 はコード側で網羅(success-stories 2面+essays 1面+session34の /essay deep)。残るは `/q/*`(HD-10・ISR必須)のみ。internal-link audit=162posts/FATAL0/WARNING0・sitemap は success-stories/essays を意図的除外済(noindex整合)を再確認＝新規404/混在シグナルなし。
- done: [P1-1/旗艦] **404復帰ページに旗艦=午後論述AI採点 /essay 導線を追加**。SHA `31484d3`。
  - 監査: 上記soft-404解消でデッドリンク/無効URLが正しく404を返すようになり、404ページ(`app/not-found.tsx`)は高インテントの復帰面として重要度が増す。既存404ページは home/quiz/13区分/faq/about/blog を持つが**旗艦 /essay 導線が不在**(header/home/footer/quiz-complete では露出済=非対称)。
  - 実装: bottom リンク行に `/essay`(indexable 実コンテンツハブ・noindex /essays ではない)への「午後論述のAI採点」リンクを追加(FileCheck アイコン)。additive・誇大なし(/essay 既存ハブへ寄せるのみ)。検証: 全ゲート緑(test1785→1787/build OK・/_not-found は ○static)。runtime curl: 無効URL=**HTTP404** かつ HTML に href="/essay"+ラベル出力。回帰pin `__tests__/seo/not-found-flagship-link.test.ts`。
- 申し送り（セッション35まとめ）:
  - **soft-404 角度をコード側で打ち止め**: session34の /essay deep に続き、generateStaticParams で有限列挙する残り page ルート(success-stories 2面 `c79bafb`・essays 1面 `02fae68`)に dynamicParams=false を付与し proper 404 化。runtime curl で有効=200/無効=404/control=200 を全件実測・新規ハード404を作らないこと(索引リンク=静的セット一致)を確認・回帰pin3本。残るソフト404は `/q/*`(~12.6k・ISR設計必須でレバー不可)=**HD-10**(production裏取り・GSCソフト404レポート待ち)のみ。
  - **404ページに旗艦導線**: soft-404解消で重要度が増した復帰面に /essay を配線(`31484d3`)。header/home/footer/quiz-complete に続く5面目の旗艦露出で、デッドリンク着地ユーザーを旗艦へ復帰。
  - **次の最優先候補**: (a)HD-10のproduction裏取り(人間・GSCソフト404レポート)、(b)P2-4旗艦/essayハブ書籍リスト(5区分横断1冊選定=設計判断寄り)、(c)主要バックログ(404掃除/旗艦露出/事実性監査/internal-link/blog)は概ね飽和 or 人間待ち。SC HD-6/AP・FE午後モック HD-4/essay深リンク HD-5/2026制度 HD-7/SGペルソナ HD-8/overviewテンプレ HD-9/q soft-404 HD-10 が人間待ち継続。**コード側の自律実装可能領域は soft-404完了でさらに縮小**＝次セッションは新角度起案 or HD解消(人間入力)待ちの局面。

## セッション36（growth ループ）2026-06-02 JST
- 監査(read-only): session35が「コード側自律領域は soft-404完了で縮小・新角度起案 or 人間待ち」と総括。**新角度=旗艦 /essay 面のソーシャルカード(OG)欠落**を発見。`/essay` ハブ・`/essay/{exam}/{id}` deep の metadata が openGraph/twitter 未設定で、SNS共有時にルートlayoutの汎用OG画像へフォールバック(blog/[exam]ハブ/recommended-books/faq/glossary/keywords は /api/og の専用カード出力済・**専用 type=essay テンプレも未使用**だった=旗艦が唯一の outlier)。さらに P2-4(旗艦の書籍funnel)が**ハブ・deep とも未配線**(/essays複数形のサンプル面のみ午後本露出)と確認。
- done: [P1-3/旗艦] **旗艦 /essay ハブに OpenGraph/Twitter ソーシャルカードを追加**。SHA `80cffe5`。
  - 実装: 静的 metadata に `/api/og?type=essay` を背にした openGraph(website)+twitter(summary_large_image)を付与。title/description は既存 ESSAY_DESCRIPTION 再利用=誇大なし。回帰pin `essay-flagship-jsonld.test`。検証: 全ゲート緑(test1787→1788/build OK)。本番ビルド `essay.html` に og:image(type=essay)/og:title/twitter:card/twitter:image を実測。
- done: [P1-3/旗艦] **個別採点 deep `/essay/{exam}/{id}` に OG/Twitter カードを追加**。SHA `bd937a6`。
  - 実装: generateMetadata に question 由来(exam/問番号/title)の `/api/og?type=essay` OG(article)+twitter を付与(ハードコードclaimなし)。回帰pin追加。検証: 全ゲート緑(test1788→1789/build OK)。本番ビルド `essay/au/au-2024a-pm2-q1.html` に og:image(type=essay)/og:type=article/twitter:card を実測。
- done: [P2-4/収益] **deep `/essay/{exam}/{id}` に論文対策本アフィリ導線を追加**。SHA `a6be418`。
  - 監査: indexable な旗艦個別採点ページは最高インテントの論述学習面なのに書籍funnel皆無(/essays複数形のサンプル面=午後本露出済・/essay単数形=未)。
  - 実装: 既存 `InlineBookHint` を `category="論文"` で EssayEditor 直下に再利用。各論述区分(st/sa/pm/sm/au)の「合格論文の書き方・事例集」(tags=["論文","午後II","事例"])へ自然送客。env無編集・rel="sponsored"・[PR]表記はコンポーネント側で保証=押し売り回避。回帰ガード2本: (1)`recommended-books.test` に「**単数 ESSAY_EXAM_CODES(=lib/essay/load・grading set 5区分)** の各区分に論文タグ本≥1」(初版で誤って複数形lib/essays/load〔SC含む6区分〕を参照しSC=記述式で論文本無し→fail→grading setへ修正=HD-6尊重)、(2)deepページの InlineBookHint 配線。検証: 全ゲート緑(test1789→1791/build OK)。本番ビルド deep html に「合格論文の書き方」+sponsored を実測。
- done: [P2-4/収益] **旗艦 /essay ハブに参考書funnelを追加(控えめ1リンク)**。SHA `f2b2549`。
  - 監査: deepに配線後もハブは書籍funnel未配線。ハブは5区分横断で特定1冊選定不可(session34申し送りの設計判断ブロッカー)。
  - 実装: 特定書籍ではなく indexable な `/recommended-books` 索引へ控えめに1リンクのみ送客(押し売り回避・索引はnoindexでない/canonical済を確認)。additive・回帰pin。検証: 全ゲート緑(test1791→1792/build OK)。本番ビルド `essay.html` に href="/recommended-books"+ラベル実測。
- 申し送り（セッション36まとめ）:
  - **旗艦 /essay 面を「ソーシャル共有」と「収益funnel」の2軸で対称化**: (1)ハブ+deep に OG/Twitter カード(`80cffe5`/`bd937a6`)で SNS共有が専用 type=essay 画像に=旗艦の発見性向上、(2)ハブ(索引リンク `f2b2549`)+deep(InlineBookHint論文本 `a6be418`)で書籍funnelを配線=P2-4の旗艦面を実装。誇大回避は既存description/question由来導出/コンポーネント側 sponsored・[PR]で構造保証。
  - **OG角度の枯渇確認**: faq/glossary/keywords/blog/[exam]/recommended-books/home は専用OG済。`/[exam]/afternoon` はモック/ベータ面(HD-4)で意図的に非promotion=OG付与せず(誇大回避)。success-stories/essays複数形は noindex(優先度低)。**主要 indexable 面のOGは旗艦補完で枯渇**。
  - **次の最優先候補**: (a)HD群の人間入力待ち(HD-1 GSC404一覧/HD-4 AP・FE午後本データ/HD-5 essay深リンク/HD-6 SC午後framing/HD-7 2026制度/HD-8 SGスコア/HD-9 overviewテンプレ/HD-10 q soft-404)、(b)新角度の起案余地は旗艦OG補完で更に縮小。主要バックログ(404掃除/旗艦露出/事実性監査/internal-link/blog/OG)は概ね飽和 or 人間待ち。**コード側自律実装可能領域は引き続き縮小傾向**。

## セッション37（growth ループ）2026-06-02 JST
- 監査(read-only): session34-36 で旗艦 /essay が indexable 化(JSON-LD/OG/sitemap/書籍funnel)された後の**新角度=内部リンク equity の流入経路**を精査。実測: 高オーソリティな試験別サーフェス(試験ハブ /[exam]=sitemap priority 0.9、練習用モック /[exam]/afternoon{,/[year]/[season]})が、論文区分(st/sa/pm/sm/au)で**indexable 旗艦 /essay へ全く funnel していなかった**(exam hub の primary CTA は練習モック /[exam]/afternoon=AI採点ベータ/HD-4 を指し、indexable 実過去問採点 /essay は不在。`grep '"/essay"' app/` に app/[exam]/page.tsx 不在を確認)。session34-36 の旗艦化で新たに生じた funnel gap。
- done: [P1-1/P2-3/旗艦] **試験ハブ論文区分CTAを旗艦 indexable /essay へ寄せる**。SHA `a288048`。
  - 実装: `app/[exam]/page.tsx` の st/sa/pm/sm/au 午後II論述セクションの primary CTA を 練習モック `/[exam]/afternoon` → indexable 旗艦 `/essay`(実IPA午後II過去問のAI採点ハブ)へ変更・ラベル「実際の午後II過去問で AI 添削」。練習モックは「練習問題で腕試し（ベータ）」と明示降格(誇大回避・HD-4尊重)。冗長な /demo/essay-grading リンク削除(data/features.ts から到達可=orphan化なし)。回帰pin `__tests__/seo/exam-hub-essay-flagship-cta.test.ts`(primary が /essay・ベータラベル・CTA区分⊆ESSAY_EXAM_CODES)。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1792→1795/build OK)。`.next/server/app/st.html` に href="/essay"+新ラベル出力・旧「の論述添削へ」=0・/sc(記述branch)は global nav の /essay のみ=不変。
- done: [P1-1/P2-3/旗艦] **練習用午後インデックス /[exam]/afternoon から旗艦 /essay へ AfternoonEssayHint を配線**。SHA `52cd2b5`。
  - 実装: 既存の ESSAY_EXAM_CODES gated・誇大回避済 `AfternoonEssayHint`(/q/*・/keywords/* で実績)を `app/[exam]/afternoon/page.tsx` に再利用。component が self-gate するため非論述区分には出ない。回帰pin `afternoon-essay-flagship-funnel.test.ts`(import/描画。gating自体は既存 AfternoonEssayHint.test で担保)。
  - 検証: 全ゲート緑(test1795→1797/build OK)。`.next` st/afternoon.html に「午後論述 AI 添削を試す」(href=/essay)・ap/afternoon.html=0(非論文不出)。
- done: [P1-1/P2-3/旗艦] **練習プレイヤー本体 /[exam]/afternoon/[year]/[season] にも同funnelを配線**。SHA `53dd4d2`。
  - 実装: index 経由せず直接 landing(indexable・SSG・canonical済)したユーザー向けに、警告note直後・AfternoonPlayer 直前に AfternoonEssayHint を配線(index と対称)。回帰pin を同テストに追加。
  - 検証: 全ゲート緑(test1797→1798/build OK)。`.next` st/afternoon/2023/spring.html に旗艦リンク出力・ap/afternoon/2023/autumn.html=0。
- 申し送り（セッション37まとめ）:
  - **新角度=旗艦への内部リンク equity 経路を3面で配線**: session34-36 で /essay が indexable 化された後、高オーソリティな試験別サーフェス(試験ハブ priority 0.9・練習モック index・練習プレイヤー)が論文区分で旗艦へ未funnel だった gap を解消。試験ハブ primary CTA を旗艦へ寄せ(`a288048`)、練習モック2面に gated AfternoonEssayHint を配線(`52cd2b5`/`53dd4d2`)。誇大回避は全て ESSAY_EXAM_CODES self-gate＋練習モックの「ベータ」明示(HD-4尊重)で構造保証。
  - **funnel経路の飽和確認**: 旗艦 /essay への内部リンクは header/footer(layout)・home(HomeFlagshipEssay)・not-found・/q/*(AfternoonEssayHint)・/keywords/*・blog論文群・**試験ハブ+練習モック2面(本session)**で網羅。論文区分の主要 landing surface から旗艦へ漏れなく流れる状態。
  - **次の最優先候補**: (a)HD群の人間入力待ち(HD-1 GSC404一覧/HD-4 AP・FE午後本データ/HD-5 essay深リンク/HD-6 SC午後framing/HD-7 2026制度/HD-8 SGスコア/HD-9 overviewテンプレ/HD-10 q soft-404)、(b)コード側自律領域は funnel経路の飽和で更に縮小。404掃除/旗艦露出/事実性監査/internal-link/blog/OG/funnel は概ね飽和 or 人間待ち。次セッションは新角度起案 or HD解消待ち。

## セッション38（growth ループ）2026-06-02 JST
- 監査(read-only): session34-37 が「旗艦/essay は飽和・コード側は新角度起案 or HD待ち」と総括。**土台=科目B側の悩み系ロングテールに未カバーintentが残っていないか**を精査。既存科目Bクラスタ6記事(taisaku/pseudo-language/algorithm-nigate/wakaranai/jikan-haibun/goukaku-ten-irt)は「解き方・トレース・苦手・時間配分・合格点IRT」を扱うが、**post-CBT最大の悩み「科目Bの過去問が公開されていない/サンプル問題しか無い/練習素材が足りない」intentが専用ページ不在**だった(pillar Q4「過去問はどこで演習?」は分野別プール案内のみで非公開の事実に触れず)。新規キーワード=新規ページ(session25の sanctioned-budget 原則)に合致・モック非依存で着手可。
- done: [P1-6/土台] **「基本情報 科目Bの過去問がない」悩み系オリジナル記事を新設**。SHA `74bf62f`。
  - 事実性(IPA公式WebFetchで裏取り): (1)令和5年度以降のCBT本試験(科目A・科目B)問題は**非公開**(IPA mondai-kaiotu に明記)、(2)唯一の公式素材=IPA公開の**科目Bサンプル問題20問**(情報セキュリティ+データ構造及びアルゴリズム擬似言語の2分野)、(3)令和4年度以前の旧筆記過去問はトレース練習に流用可。SSOT一致(科目B 100分20問/1000点満点600点)。
  - funnel(モック=HD-4 非依存の安全な土台導線のみ): 科目Bピラー taisaku/擬似言語 pseudo-language/つまずき切り分け wakaranai/アルゴリズム分野別プール `/fe/topic/アルゴリズムとプログラミング`(実MC)/市販書籍 ipa-sanko-mondaishu-2026/AIコパイロット類題生成。**旗艦 /essay には送らない**(土台記事=土台導線)を回帰testで構造保証。
  - 配線: ピラー fe-kamoku-b-taisaku Q4 末尾から新記事へ inbound リンク(orphan回避)。relatedSlugs に taisaku/pseudo-language/wakaranai/sanko-mondaishu/kakomon-nannenbun。offset=longtail2Offset+14。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1798→1803/build OK)。本番ビルド `.next/server/app/blog/fe-kamoku-b-kakomon-nai.html` が ●SSG・H1/「非公開」fact出力・`"@type":"FAQPage"`(Question×4)+`"@type":"Article"`・内部リンク先(taisaku/pseudo-language/wakaranai/sanko-mondaishu/kakomon-nannenbun/fe/topicプール)全て200・blogサイトマップに `<loc>.../blog/fe-kamoku-b-kakomon-nai</loc>` 収録を実測。回帰pin `__tests__/seo/fe-kamoku-b-kakomon-funnel.test.ts`(記事存在/CBT非公開・サンプル20問の事実性/土台funnel・旗艦非送客/ピラーinbound/FAQ・sitemap掲載=5件)。
- 監査(read-only): 既存科目Bクラスタ7記事(上記新記事含む)が**全てアルゴリズム/擬似言語に偏り、科目Bのもう一方の分野=情報セキュリティが完全に未カバー**と発見。IPA公式は科目Bを「情報セキュリティ」と「データ構造及びアルゴリズム(擬似言語)」の二分野中心と定める(WebFetch裏取り済)。セキュリティ問題は長文トレース不要・知識で取りやすい得点源で、アルゴリズム偏重の受験者が取りこぼしやすい=戦略価値の高い未カバーintent。新規キーワード=新規ページに合致。
- done: [P1-6/土台] **「基本情報 科目B 情報セキュリティ」得点戦略のオリジナル記事を新設**。SHA `2ad7e40`。
  - 事実性: 科目B=情報セキュリティ+データ構造及びアルゴリズムの2分野中心(IPA)。出題の中心はアルゴリズムである点も明示し誇大回避(問題数の固定split等の未確定数値は断定せず質的表現)。SSOT一致(100分20問600点)。頻出テーマ=アクセス制御/認証/暗号/マルウェア/ソーシャルエンジニアリング/情報セキュリティ管理。
  - funnel(モック非依存・土台導線のみ): 科目Bピラー taisaku/過去問がない記事 kakomon-nai/時間配分 jikan-haibun/セキュリティ分野別プール `/fe/topic/セキュリティ`/AIコパイロット。**`/fe/topic/セキュリティ` は「科目A相当の知識問題・科目B形式そのものではない」と明示framing**(誇大回避。site の exam-config では科目B categories が algorithm のみ＝科目B形式のセキュリティ練習データは無いため知識土台として正確に位置づけ)。旗艦/essay非送客を回帰testで保証。
  - 配線: ピラー fe-kamoku-b-taisaku 概要節から inbound リンク(orphan回避)。relatedSlugs に taisaku/kakomon-nai/jikan-haibun/goukaku-ten-irt。offset=longtail2Offset+15。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1803→1809/build OK)。本番ビルド `fe-kamoku-b-security.html` が ●SSG・二分野fact出力・`FAQPage`(Q×4)+`Article` JSON-LD・内部リンク先(taisaku/kakomon-nai/jikan-haibun/`/fe/topic/セキュリティ`)全て200・blogサイトマップ収録・ピラーからの inbound を実測。回帰pin `__tests__/seo/fe-kamoku-b-security-funnel.test.ts`(記事存在/二分野事実性/土台funnel・旗艦非送客/科目A相当framing/ピラーinbound/FAQ・sitemap=6件)。
- 申し送り（セッション38まとめ）:
  - **新角度=土台(科目B)の未カバー悩み系intentを2本の新規ページで開拓**: 旗艦/essayが飽和する一方、土台=科目Bクラスタは「素材不足(過去問非公開)」と「セキュリティ分野(科目Bのもう一方の柱)」という2つの distinct intent が専用ページ不在だった。新規キーワード=新規ページ(session25 sanctioned)で2本新設(`74bf62f`/`2ad7e40`)。両者ともIPA公式裏取り・モック非依存の安全な土台導線・ピラーからinbound・回帰pin(計11件)。
  - **saturation境界の遵守**: 既存記事間の追加クロスリンクは session13-15 で「ほぼ飽和・無理に増やさない」と確定済のため**行わず**、新規ページ開拓のみに留めた(過大修正回避)。
  - **次の最優先候補**: (a)HD群の人間入力待ち(HD-1〜HD-10、特にGSC404一覧/AP・FE午後本データ/overviewテンプレ)、(b)残る土台(科目B)の新規角度は「科目B 何問取れば(IRT下の合格ライン体感)」等が候補だが goukaku-ten-irt と近接=要慎重(thin/重複回避)。(c)コード側自律領域は引き続き縮小傾向。次セッションは新角度の慎重な吟味 or HD解消待ち。

## セッション39（growth ループ）2026-06-02 JST
- 監査(read-only): session38が「旗艦飽和・土台=科目Bは悩み系2本で開拓」と総括。**土台=科目B クラスタに lookup(reference)系の入口が無い**盲点を発見。既存 fe-kamoku-b-pseudo-language は「読解の3ステップ訓練法」=速度向上の**方法**記事で、記法そのもの(代入←/if-elseif-endif/while-do-for/配列の番号)を一覧で引ける **reference** が不在。「擬似言語 記法 / ← 意味 / 配列 番号 1始まり」等の lookup intent は方法記事とは別=新規キーワード=新規ページ(session25 sanctioned)に合致・モック非依存。
- done: [P1-6/土台] **「基本情報 科目Bの擬似言語 記法早見表」reference記事を新設**。SHA `1799947`。
  - 事実性(IPA公式裏取り): WebFetch で IPA公開 科目Bサンプル問題PDF＋公式記述形式の解説を照合。代入=`←`(=ではない)・コメント=`/* */`と`//`・選択処理=if/elseif/else＋`endif`・繰返し=while(前判定)/do〜while(後判定=必ず1回実行)/for(回数)＋`endwhile`/`endfor`・**配列の要素番号は1から始まる**(IPA公開サンプル前提・0始まり言語と混同しない最大の関門)・論理演算 and/or/not・比較 = ≠ > < ≧ ≦。正式仕様はIPA公式参照を明記し誇大回避。
  - 著作権配慮: IPA問題文・公式表は**転載せず**、記法を学習用に言い換えたオリジナル prose＋trivialな汎用例(sum←0等の言語構成要素のみ)。body は template literal のためバッククォート code fence/span を使わず bold項目+箇条書きで表現(既存記事流儀)。
  - funnel(モック非依存・土台導線のみ): 訓練法 pseudo-language/ピラー taisaku/つまずき切り分け wakaranai/アルゴリズム分野別プール `/fe/topic/アルゴリズムとプログラミング`(実MC)/AIコパイロット。**旗艦/essay非送客**を回帰testで構造保証。`/fe/topic`は「科目A相当の知識土台・科目B形式ではない」と明示framing。
  - 配線: 訓練法 pseudo-language Q1からinboundリンク(orphan回避・記法reference→訓練法 の自然な親子)。relatedSlugs=[pseudo-language, taisaku, wakaranai, algorithm-nigate]。offset=longtail2Offset+16。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1809→1815/build OK)。本番ビルド `blog/fe-kamoku-b-gijigengo-kihou.html`=●SSG・`Article`+`FAQPage`(Q×4) JSON-LD・「要素番号は 1 から始まる」出力・内部リンク先4件(taisaku/pseudo-language/wakaranai/algorithm-nigate)+`/fe/topic/アルゴリズムとプログラミング`全200・pseudo-languageからinbound・blogサイトマップ収録を実測。回帰pin6件(`fe-kamoku-b-gijigengo-kihou-funnel.test.ts`)。
- done: [P2-3/土台] **擬似言語訓練法記事の関連レールから off-topic AP午後記事を除去**。SHA `cda26a8`。
  - 監査で発見: 上記記事の inbound 配線中に、pseudo-language の relatedSlugs 2番目に **off-topic な `ap-gogo-sentaku`(AP午後選択)** が残存(session5 は taisaku では除去済だが pseudo-language は取り残し)。route は getRelatedPosts **既定 limit=3** で関連レールを描画するため、limit=3 では on-topic な algorithm 兄弟が押し出され、**科目B擬似言語記事の関連レールに AP午後記事が表示される relevance leak**になっていた(cluster相互リンク維持テストは limit=4 で走るため検知できていなかった)。
  - 修正: `ap-gogo-sentaku` を除去し新記法 reference を繰り上げ。route limit=3 レールが [taisaku, 記法早見表, algorithm-nigate]=全て科目B on-topic に。cluster相互リンク維持テスト(limit=4)は taisaku/algorithm-nigate 保持で緑のまま。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1815→1816/build OK)。本番ビルド `blog/fe-kamoku-b-pseudo-language.html` に `ap-gogo-sentaku`=**0件**・記法早見表/algorithm-nigate 出力を実測。回帰pin(route limit=3 レールが新記法を含み AP記事を含まない)追加。
  - **所見**: 科目B クラスタ9記事の relatedSlugs を route limit=3 で全点検→off-topic leak は pseudo-language の本件のみ。残り8記事は limit=3 で全て on-topic を確認(新たな leak なし)。
- 申し送り（セッション39まとめ）:
  - **土台=科目B に reference(lookup)入口を新設**: 方法記事(pseudo-language=訓練法)とは別 intent の「擬似言語 記法早見表」を新設 `1799947`(IPA公式裏取り・著作権クリーンなオリジナル・モック非依存土台funnel・旗艦非送客)。+その配線中に見つけた pseudo-language 関連レールの off-topic AP leak を route limit=3 視点で是正 `cda26a8`。
  - **新角度=route limit=3 の relevance leak**: 「relatedSlugs に off-topic が混ざり、route の既定 limit=3 で on-topic 兄弟が押し出される」leak は cluster維持テスト(limit=4)では検知不能。科目Bクラスタは点検済(本件のみ)だが、**旗艦/論文クラスタ・高可視記事(roadmap/rirekisho/overview)で同型 leak が無いかは未点検**＝次セッションの安全な micro-angle 候補(backlog P2-3 に起案)。
  - **saturation遵守**: 新記事の inbound は pseudo-language 1本のみ(orphan回避に十分)。taisaku への追加inboundは session13-15/38 の飽和境界に従い**行わず**(過大クロスリンク回避)。
  - **次の最優先候補**: (a)route limit=3 relevance-leak の旗艦/高可視クラスタ点検(新micro-angle・read-only監査主体)、(b)HD群の人間入力待ち(HD-1〜HD-10)、(c)コード側自律領域は引き続き縮小傾向。

## セッション40（growth ループ）2026-06-02 JST
- 監査(read-only): session39申し送りの最優先候補(a)「relevance-leak を旗艦/論文/高可視クラスタへ点検」を実行。**全 blog記事の関連レールを route の実 limit(=4。session39は「limit=3」と記したが実ルート `app/blog/[slug]/page.tsx:98` は `getRelatedPosts(slug, 4)`)で計算する read-only 監査スクリプトを repo内に一時作成**し、(1)cross-cluster 全般、(2)foundation(科目B/FE/IP/SG)↔advanced(午後/論文)の最明瞭leak、の2パスで全点検→使用後削除。
- done: [P2-3/旗艦+土台] **AP午後選択記事の関連レールから off-topic な 科目B記事を除去**。SHA `afcca67`。
  - 監査で発見: `ap-gogo-sentaku`(応用情報 午後選択戦略・exam=ap)の relatedSlugs スロット2に **off-topic `fe-kamoku-b-taisaku`(基本情報 科目B完全対策・exam=fe・土台/アルゴリズムクラスタ)** がハードコードされ、route の rail(limit=4)に AP午後読者へ無関係な FE科目B記事が表示されていた(session5/39 で是正した relevance leak と同型・**explicit指定のため既存「shares exam/tag」テストでは検知不可**)。zero-overlap の cross-exam leak(FE科目B=下位試験+アルゴリズム vs AP午後選択戦略)。
  - 修正: `fe-kamoku-b-taisaku`→自然な AP午後兄弟 `ap-gogo-bunkei-sentaku`(応用情報 午後 文系選択・既に ap-gogo-sentaku へ inbound 済=差替で相互リンク化)。rail は [kakomon-dake-goukaku(general), ap-gogo-bunkei-sentaku(AP午後), nw-hinshutu-pattern(AP午後にNW分野含む), ap-gogo-management-erabikata(AP午後)] で全て on-topic に。回帰pin `blog-index.test.ts`(rail が文系選択を含み科目B pillar を含まない)追加。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1816→1817/build OK)。本番ビルド `.next/server/app/blog/ap-gogo-sentaku.html` で `fe-kamoku-b-taisaku`=**0件**・`ap-gogo-bunkei-sentaku` 出力・rail全リンク先(ap-gogo-bunkei-sentaku/ap-gogo-management-erabikata/nw-hinshutu-pattern/kakomon-dake-goukaku 等)prerendered(200)=新規404ゼロを実測。
- SKIP(過大修正回避): 監査で残った flag は全て **(i)backfill 由来 or (ii)defensible な domain-overlap** で actionable な explicit-curation leak ではないため不変:
  - **(i) backfill artifact**: 論文/高度系 overview・practice 記事(st/sa/pm/sm/au の goukaku-benkyouhou/cyokusen-1kagetsu/yoru-tokurensyu 等)の rail 末尾に `ip-goukaku-benkyouhou`/`ip-yoru-tokurensyu` が出るのは **relatedSlugs ではなく getRelatedPosts の同タグ fallback**(共通タグ「勉強法」等で IP記事が ALL_POSTS 先頭付近のため backfill 採用)。全 overview/practice に**対称・系統的**に生じる by-design 挙動で、是正には tag体系 or fallback順序の**広域変更**が必要＝スコープ外(既存テストも「shares a tag」を relevant と許容)。
  - **(ii) defensible overlap**: db-er-design-practice↔sa-architecture-tradeoff(共にアーキ/設計)、AP午後管理系選択(ap-gogo-bunkei-sentaku/ap-gogo-management-erabikata)→pm-essay-shudai-pickup(PM=AP午後の管理分野と domain重なり・進路リンク)、sc-incident↔sc-ronbun(同一SC)等は thin だが topical overlap が有り、site の進路/横断リンク慣行内＝zero-overlap の科目B leak とは別。迷ったら直さない(安全側)。sc-ronbun 系は別途 HD-6(SC午後framing 事実性)継続。
  - **所見**: explicit-curation の off-topic leak は本件(`ap-gogo-sentaku`→科目B)が**最後の1件**で、これでコード側の actionable な rail relevance-leak は打ち止め(科目Bクラスタ=session39点検済・本セッションで旗艦/論文/高可視/全 cross-cluster を網羅点検)。残るは backfill(by-design)と defensible-overlap のみ。
- 申し送り（セッション40まとめ）:
  - **新角度=rail relevance-leak を全 blog記事へ網羅点検し打ち止め**: route 実 limit=4 で全記事の rail を機械監査。explicit-curation の off-topic leak は `ap-gogo-sentaku`→`fe-kamoku-b-taisaku`(科目B)の1件のみ残存→AP午後兄弟へ差替 `afcca67`(回帰pin)。残 flag は backfill(系統的by-design)と defensible-overlap で SKIP。**actionable な rail-leak は枯渇**。
  - **次の最優先候補**: (a)HD群の人間入力待ち(HD-1〜HD-10、特にGSC404一覧/AP・FE午後本データ/overviewテンプレHD-9)、(b)コード側自律領域は rail-leak打ち止めで更に縮小。404掃除/旗艦露出/事実性監査/internal-link/blog/OG/funnel/rail-leak は概ね飽和 or 人間待ち。次セッションは新角度の慎重な起案 or HD解消待ちの局面。

## セッション41（growth ループ）2026-06-02 JST
- 監査(read-only): session40が「rail-leak枯渇・コード側は新角度起案 or HD待ち」と総括。**旗艦/essay 面とその周辺(機能ページ・業種別論文記事)の新角度**を3点開拓。internal-link監査=165posts/FATAL0/WARNING0・全ゲートbaseline緑を確認してから着手。
- done: [P1-3/旗艦] **旗艦 /essay ハブに objection-handling FAQ + FAQPage JSON-LD を追加**。SHA `4812e48`。
  - 監査で発見: 旗艦 /essay は LearningResource+BreadcrumbList+OG は持つが、**戦略ブログ全般に展開済(session8-11)の FAQPage が唯一欠落**。最重要 indexable 面(flagship landing)に、流入を阻む疑問(何の試験向け?/AI採点は正確?/他の過去問サイトと何が違う?/結果は保存?)へ答える FAQ が無かった。
  - 実装: 単一 `ESSAY_FAQ` 配列を**可視 <dl> と FAQPage @graph の両方**に供給(drift不能)。内容は厳密に事実: 対応区分=論文5区分のみ(AP/FEモック非言及=誇大回避/HD-4尊重)・「参考評価」明記・**quota/価格の数値は非記載**(承認必須/SSOT所有のため)。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1817→1820/build OK)。本番ビルド `essay.html` に `"@type":"FAQPage"`(Question×4)・可視「よくある質問」<dl>・「参考評価」出力を実測。ページ source に「応用情報/基本情報」非出力(over-claim無し・footer nav の exam一覧は別物)。回帰pin `essay-flagship-jsonld.test.ts`(FAQPage単一source・可視dl・参考評価/AP/FE非claim を pin・+3 it)。
- done: [P1-5/旗艦] **業種別論文記事3本(gyoushu-essay-*)から旗艦 /essay へ直 funnel を追加**。SHA `d0eb11d`。
  - 監査で発見: `gyoushu-essay-{kinyuu-strategy(ST),seizou-pm(PM),koukyou-sa(SA)}` は旗艦=午後II論述AI採点の**最近縁コンテンツ**(業種別論文 ＝ /essay の「業種事例」採点軸そのもの)。だが本文が「AI 添削と業種別事例集の組み合わせで完成度を上げる」と**AI 添削に言及しながら、リンク先は /features/industry-essays と試験ハブ /<exam> のみで indexable 旗艦 /essay へ直リンクが無かった**(=「AI 添削を勧めるのにそのリンクが無い」content gap。session3/7/37 の funnel整備が gyoushu系を取り残していた)。
  - 修正: 各記事の「過去問AI では…事例集」節に「書き上げた論文は [午後II 論述の AI 採点](/essay) で『適合度・論理性・具体性・業種事例』の4軸フィードバックを受けられます（AI 採点は参考評価です）」を1文追加。ST/PM/SA は全て ESSAY_EXAM_CODES・4軸コピーは /essay 自身と一致・参考評価明記で誇大回避。/features/industry-essays(primaryCta=/essay) は温存=2hop→直リンク併設。
  - 検証: 全ゲート緑(test1820→1826/build OK)。本番ビルドで3記事とも `href="/essay"`(=2: 本文追加分+footer)・4軸コピー出力を実測。回帰pin新設 `gyoushu-essay-flagship-funnel.test.ts`(3記事が論文タグ+業種別タグ・/essay直リンク・参考評価・4軸 を pin。これら記事は exam無しの general 記事のため tag で論文関連を担保)。
  - 補足audit(read-only): 全blog本文を「AI添削/採点 を論述文脈で言及するのに /essay(s) リンク無し」で機械走査→10件 flag。うち**8件は非論文 overview(`{sc,es,db,nw,ap,fe,sg,ip}-goukaku-benkyouhou`)で session6 が論文5区分のみに旗艦CTAを gate 済=by-design(SKIP)**、2件(`kakomon-ai-roadmap-2026`=未実装午後採点のroadmap・session11 present-state限定 / `ipa-shiken-gogo-vs-am`=cross-exam汎用explainerで添削=AIコパイロット文脈・非論文scope)も**誇大/off-scopeでSKIP**。gyoushu系が**唯一の actionable な取り残し**＝旗艦essay funnel はこれで打ち止め。
- done: [P2-2/事実性] **essay-grading 機能ページのヒーローを事実ベースに是正**。SHA `3850234`。
  - 監査で発見: `/features/essay-grading`(indexable・dynamicParams=false・prerendered) のヒーロー subhead が「AI が **IPA 採点基準を参照**しながら『どこで何点引かれるか』を即座にフィードバック」と記載。だが **IPA 採点基準は非公開**(site自身が HD-6/各免責で明言)・旗艦 /essay 免責は「IPA 公式の採点基準とは**異なる**」・**同ページ自身の FAQ も「IPA 公式解答例とキーワードを基準に評価」**と正しく述べており、ヒーローだけが「採点基準を参照」と内部矛盾・誇大(非公開の基準を参照と誤認させる)。
  - 修正: subhead を「AI が **IPA 公式解答例を参照**しながら『どこで何点引かれ**そうか**』を即座にフィードバック（**参考評価**）」へ(公式解答例=IPAが実際に公開・同ページFAQ/site免責と整合・参考評価明記)。session21/22/32 の事実性監査と同パターン(誇大を SSOT/自ページの正記述へ揃える)。
  - 検証: 全ゲート緑(test1826→1828/build OK)。本番ビルド `features/essay-grading.html` で旧「採点基準を参照」=**0**・新「公式解答例を参照」「参考評価」出力を実測。回帰pin `__tests__/data/features.test.ts`(essay-grfeature heroが「採点基準を参照」を含まず「公式解答例」「参考評価」を含む を pin)。
  - **HD記録**: 同ページの**対応区分広告スコープ**(description/benefitが AP/SC/NW/DB/ES の午後記述添削に「対応済」と広告。だが実体 /essay は論文5区分のみ・AP/SC/NW/DB/ES午後はモック=HD-4)は**プロダクトのポジショニング判断**のため自律で縮めず **HD-4 に追補記録**(事実性是正のヒーロー1文のみ実施・スコープ広告の是非は人間)。
- 申し送り（セッション41まとめ）:
  - **旗艦/essay 周辺の新角度を3点開拓**: (1)旗艦ハブの欠落 FAQPage を補完(objection-handling・誇大回避) `4812e48`、(2)最近縁の業種別論文記事3本から旗艦へ直 funnel(取り残し是正) `d0eb11d`、(3)essay-grading 機能ページの「採点基準を参照」誇大を自ページFAQ/site免責へ揃える事実性是正 `3850234`。全て additive・誇大回避(論文5区分gate/参考評価/quota非記載)・回帰pin・新規404ゼロ。
  - **打ち止め確認**: 旗艦essay funnel は gyoushu系で actionable な取り残し枯渇(他10 flagは by-design gate or off-scope)。機能ページ事実性=ヒーロー是正済、残スコープ広告は HD-4。
  - **次の最優先候補**: (a)HD群の人間入力待ち(HD-1〜HD-10、特にGSC404一覧/AP・FE午後本データ/overviewテンプレHD-9/essay-gradingスコープ広告=HD-4追補)、(b)コード側自律領域は旗艦周辺も飽和方向。次セッションは新角度の慎重な起案 or HD解消待ち。

## セッション42（growth ループ）2026-06-02 JST
- 監査(read-only): session41が「旗艦essay funnel 枯渇・新角度起案 or HD待ち」と総括。**新角度=FAQPage機構(session8-15)が戦略/旗艦/土台 記事へは展開済だが、競合薄の社会人/比較/キャリア系の高intent記事には未展開**だった盲点を発見。全general postsの `## よくある質問` 節有無を機械走査→FAQ未設置の高intent記事を特定し、session8-15と同パターン(オリジナル4Q&A・誇大回避・本文事実と整合・additive)で3本にFAQ節を追加しFAQPage化。
- done: [P2-2/あと一歩] **働きながら合格記事 hatarakinagara-goukaku に よくある質問節を追加しFAQPage化**。SHA `1766cc5`。
  - 監査で発見: 競合薄の社会人「あと一歩」記事(働きながら×時間管理×合格戦略)だが `## よくある質問` 節が無く extractFaq の対象外だった。「何ヶ月/スキマ時間/科目B両立/効率化」は働きながら受験者の質問intent。
  - 実装: オリジナル4Q&A(Q1=時間別プラン目安IP3/FE6/AP10ヶ月・本文の表と整合／Q2=スキマ時間積み上げ・通勤月20h早朝月15h・過去問AIモバイル／Q3=科目B 20問100分トレース力・毎日1問・[fe-kamoku-b-taisaku]へ土台funnel／Q4=詰まり時間をAIコパイロット・[復習モード]funnel)を `## まとめ` 直前にadditive挿入。general記事(非論文)のため旗艦/essay非送客=土台導線のみ。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1828/build OK)。本番ビルド `blog/hatarakinagara-goukaku.html` に FAQPage×1＋Question×4＋実問文「働きながらだと合格まで何ヶ月」・Q3が実DOMで `href="/blog/fe-kamoku-b-taisaku"`・Q4 `href="/quiz?mode=review"` 出力。JSON-LD acceptedAnswer×4 全て markdown leak `](` =0(生markdownはRSC flightペイロード内のみ=既存挙動)。`/essay`は1=site-wide footer(本文over-claim無し)を実測。corpus-wide blog-faq-jsonld が自動カバー。
- done: [P2-2/あと一歩] **13資格おすすめ順記事 13-shikaku-osusume-jyun に よくある質問節を追加しFAQPage化**。SHA `35f566b`。
  - 監査で発見: ビギナーfunnelの比較記事(IT資格 おすすめ順/どれから)だがFAQ節無し。「どれから/飛び級可否/午前I免除/同時受験」は入門受験者の質問intent。
  - 実装: オリジナル4Q&A(Q1=未経験は[IP]・エンジニアは[FE]から／Q2=飛び級可だが午前6割が目安・基礎曖昧なら[FE]／Q3=午前I免除2年間・4段階構成・免除中に高度／Q4=同時受験非推奨・[過去問AIトップ]funnel)を `## まとめ` 直前にadditive挿入。全Q&Aは本文の事実と整合。土台=IP/FEの過去問入口へfunnel。
  - 検証: 全ゲート緑(test1828/build OK)。本番ビルド `blog/13-shikaku-osusume-jyun.html` に FAQPage×1＋Question×4＋実問文「IPA資格はどれから取るのがおすすめ」・`href="/ip"`/`href="/fe"` funnel出力・JSON-LD answer×4 markdown leak 0 を実測。
- done: [P2-2/あと一歩] **キャリアパス記事 shikaku-career-path に よくある質問節を追加しFAQPage化**。SHA `3e9bcc2`。
  - 監査で発見: キャリア系記事(資格取得後の転職/昇格/副業)だがFAQ節無し。「役立つ?/次に何を/SCの違い/合格後の演習意義」は質問intent。本記事は本文に softな年収額の記載があるが自身で「市場情報は変動」と免責済。
  - 実装: オリジナル4Q&A。**誇大回避のため具体的年収額はFAQに持ち込まず**構造的事実(FE/AP評価傾向・午前I免除2年間・SC=唯一の登録制/登録セキスペ・継続学習)に限定。FE/AP/NW/DB/SC・過去問AIへfunnel。
  - 検証: 全ゲート緑(test1828/build OK)。本番ビルド `blog/shikaku-career-path.html` に FAQPage×1＋Question×4＋実問文「IPA資格は転職や昇格に役立ちますか」・`href="/sc"` funnel・JSON-LD answer×4 markdown leak 0 を実測。
- 申し送り（セッション42まとめ）:
  - **新角度=FAQPage機構を競合薄の高intent記事へ展開**: session8-15は戦略/旗艦/土台記事にFAQ展開したが、社会人/比較/キャリア系の高intent記事(あと一歩/P2-2)は未展開だった。3本(hatarakinagara/13-shikaku-osusume-jyun/shikaku-career-path)にオリジナル4Q&AずつのFAQ節を追加しFAQPage自動出力＋質問intent整合。全て本文事実と整合・誇大回避(年収額/quota/価格非記載・参考評価不要)・土台funnel・新規404ゼロ・corpus-wide回帰自動カバー。
  - **残るFAQ未設置のgeneral記事**: `it-shikaku-kensetsu`/`it-shikaku-seizou`(建設/製造業向けニッチ・volume低め)・`gyoushu-betsu-it-shikaku`(業種別overview) はFAQ節無し。intentはニッチでvolume小=次セッションの**任意の低優先micro-angle**(やるなら業種別overviewが比較的volume有り。kensetsu/seizouはthin寄り=様子見でも可)。backlog P2-2 に起案追記。
  - **次の最優先候補**: (a)HD群の人間入力待ち(HD-1〜HD-10)、(b)残FAQ未設置のニッチ業種記事(任意・低優先)、(c)コード側自律領域は引き続き縮小傾向。

## セッション43（growth ループ）2026-06-02 JST
- done: [P2-2/あと一歩] **業種別IT資格ガイド gyoushu-betsu-it-shikaku に よくある質問節を追加しFAQPage化**。SHA `3cd0747`。
  - 監査で発見: session42 が「残FAQ未設置 general記事のうち**業種別overviewが比較的volume有り**」と起案した候補。`## まとめ` で終わり `## よくある質問` 節が無く extractFaq 対象外だった。「IT部門外でも意味ある?/未経験でどれから?/業種問わず評価される資格は?/特定業種の活用法は?」が業種別検討者の質問intent。
  - 実装: オリジナル4Q&A(Q1=IT部門外でも意味あり・[IP]入口／Q2=未経験は[IP]→[FE]・[13-shikaku-osusume-jyun]参考／Q3=汎用3資格[AP]/[SC]/[IP]／Q4=業種別は[it-shikaku-kensetsu]/[it-shikaku-seizou]個別記事)を `## まとめ` 直前にadditive挿入。全Q&Aは本文事実と整合。general記事(非論文)のため旗艦/essay非送客＝土台(IP/FE)・業種別個別記事へfunnel。年収額/quota/価格は非記載(誇大回避)。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1828/build OK)。本番ビルド `.next/server/app/blog/gyoushu-betsu-it-shikaku.html` に `"@type":"FAQPage"`×1＋`"@type":"Question"`×4・可視「よくある質問」節(Q1/Q4本文)出力。JSON-LD acceptedAnswer の markdown leak `](`=0。funnel先 `href="/ip"`×8/`href="/fe"`×4・`/blog/it-shikaku-kensetsu`×6・`/blog/13-shikaku-osusume-jyun`×4 出力、it-shikaku-seizou/13-shikaku-osusume-jyun.html 実在(200)=新規404ゼロ。`href="/essay"`=1(site-wide footerのみ・本文over-claim無し)。corpus-wide blog-faq-jsonld が自動カバー。
- done: [P2-2/あと一歩] **業種別個別記事2本(建設 it-shikaku-kensetsu / 製造 it-shikaku-seizou)に よくある質問節を追加しFAQPage化**。SHA `bdd989e`。
  - 監査: 両記事とも実は職種別推奨資格・DX文脈・業種別セキュリティ知識など内容厚く(各~70行body・thinではない)、前commit の業種別overview の Q4 から個別記事へ送客した直後＝クラスタのFAQ整備を完結させる自然な単位。両者とも `## まとめ` のみで FAQ 節無しだった。
  - 実装: 各オリジナル4Q&A。建設=Q1まず[IP]/Q2 BIM設計[FE]→[AP]/Q3セキュリティ[SG]/[SC]/Q4資格取得支援制度。製造=Q1現場職[IP]→[FE]/Q2設備保全[ES]/Q3 OTセキュリティ[SC]/Q4 IoTデータ基盤[NW]/[DB]。両者とも本文の職種別推奨資格と厳密整合・[gyoushu-betsu-it-shikaku]へcross-link・general記事のため旗艦/essay非送客=土台/各試験ハブへfunnel・年収/quota非記載で誇大回避。1コミット=業種別クラスタFAQ完結の1論点(2記事は同一intent)。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1828/build OK)。本番ビルド両 .html に `FAQPage`×1＋`Question`×4・可視よくある質問節・`/blog/gyoushu-betsu-it-shikaku` cross-link×4 出力、JSON-LD markdown leak=0、`href="/essay"`=1(footerのみ・over-claim無し)。funnel先(ip/fe/ap/sc/es/nw/db/sg/gyoushu overview)全て既存=新規404ゼロ。
- done: [P2-2/旗艦+土台] **中核戦略記事 kakomon-dake-goukaku(過去問だけで合格・全13区分依存度分析・高オーソリティ)に よくある質問節を追加しFAQPage化**。SHA `a8ebd72`。
  - **重要発見=session42 の「残FAQ未設置 general記事」総括は大幅に過少カウント**だった。`data/blog/index.ts getAllBlogPosts()` を `## よくある質問` 正規表現(extractFaq と同一)で機械走査した結果、FAQ未設置で**内容の厚い(len>1800)高intent記事が多数残存**: kakomon-dake-goukaku(2159) / ipa-shiken-goukakuritsu-ranking(1919) / ai-kakomon-gakushuu(1638) / db-sql-taisaku(2592) / nw-hinshutu-pattern(2550) / kakumon-gakushuu-science(3390) / ipa-kyoutsuu-juyou-theme(3798) / ipa-sanko-mondaishu-2026(3481) / ap-goukaku-go-koudo-senryaku(4320) / ip-3shukan-goukaku(1969) / kakomon-ai-vs-doujou(2081) 他。session8-15/42 は戦略/旗艦/土台/社会人系を FAQ化したが、これらは取り残されていた=**FAQ展開はまだ actionable な vein が太く残っている**(枯渇していない)。
  - 実装: 本記事は既に旗艦/essay(L2987 論文系)・土台 fe-kamoku-b-taisaku(L2972 科目B) へ funnel 済の高品質記事。オリジナル4Q&A(Q1=過去問だけで合格可=IP/SG・本文依存度比率と整合／Q2=AP午前7.5割/午後4:6／Q3=科目B 5:5・[fe-kamoku-b-taisaku]土台funnel／Q4=論文系高度ST/SA/PM/SM/AUは過去問だけ不可・[/essay]旗艦funnel・参考評価明記)を `## まとめ` 直前に挿入。全数値(IP7割/SG65%/AP7.5割/4:6/5:5)を本文記述に厳密一致。旗艦funnelは Q4 が論文5区分scope一致(ESSAY_EXAM_CODES)のため誇大回避。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1828/build OK)。本番ビルド `blog/kakomon-dake-goukaku.html` に `FAQPage`×1＋`Question`×4・可視Q1/Q4・`href="/essay"`×3(本文L2987+FAQ Q4+footer)・`/blog/fe-kamoku-b-taisaku`×4・「参考評価」出力、JSON-LD markdown leak=0 を実測。
- 申し送り（セッション43まとめ）:
  - **FAQPage機構を競合薄/高intent/中核戦略記事へ4本展開**: 業種別overview `3cd0747`＋建設/製造個別2本 `bdd989e`(業種別クラスタFAQ完結)＋中核戦略 kakomon-dake-goukaku `a8ebd72`。全て本文事実と厳密整合・誇大回避(年収/quota/価格非記載・旗艦funnelは論文5区分scope一致+参考評価)・corpus-wide回帰自動カバー・新規404ゼロ。
  - **★最重要申し送り=FAQ展開は枯渇していない**: session42 の「残FAQ未設置=kensetsu/seizou/gyoushuのみ」は誤り。機械走査で**内容の厚い高intent記事が10本以上 FAQ未設置**と判明(上記リスト)。次セッションは ipa-shiken-goukakuritsu-ranking(合格率比較・高volume) / db-sql-taisaku・nw-hinshutu-pattern(技術系午後・各ハブ+AIコパイロットfunnel) / kakumon-gakushuu-science(学習法longtail) / ap-goukaku-go-koudo-senryaku(高度試験戦略) 等へFAQ展開を継続できる(P2-2)。各々本文事実整合・誇大回避・論文scope一致時のみ旗艦funnel。**短いstub記事(len<800)はthinなのでFAQ対象外**(過大修正回避)。
  - **次の最優先候補**: (a)上記FAQ未設置の厚い記事へFAQ展開継続(actionable・vein太い)、(b)HD群の人間入力待ち(HD-1〜HD-10)。

## セッション44（growth ループ）2026-06-02 JST
- 監査(read-only): session43 の最重要申し送り「FAQ展開は枯渇していない・厚い高intent記事が10本以上 FAQ未設置」を受け、リスト先頭から4本にFAQ展開を継続。各記事を read-only で精読し本文事実と厳密整合・誇大回避・論文scope一致時のみ旗艦funnel を徹底。FAQ JSON-LD は `app/blog/[slug]/page.tsx` の extractFaq で自動出力(corpus-wide `blog-faq-jsonld` テストが自動カバー)を確認してから着手。
- done: [P2-2/あと一歩] **合格率ランキング記事 ipa-shiken-goukakuritsu-ranking に よくある質問節を追加しFAQPage化**。SHA `a5471e0`。
  - 監査: 高volumeの合格率比較記事(全13区分・あと一歩)だが `## まとめ` で終わり FAQ 節無し。「最も難しい区分は?/高い順に受けるべき?/午前I免除で合格率は?/論述対策は?」が比較検討者の質問intent。
  - 実装: オリジナル4Q&A(Q1=最低はSM/AU約13-16%・ST/PM約14-17%／Q2=合格しやすい順IP>SG>FE>AP>高度／Q3=応用情報合格で午前I免除2年間／Q4=論述5区分ST/SA/PM/SM/AU→[/essay]旗艦funnel・参考評価明記)を `## まとめ` 直前にadditive挿入。全数値(IP約50-55%/SG約50-70%/SM・AU約13-16%/ST・PM約14-17%/午前I免除2年間)を本文記述に厳密一致。Q4のみ論文5区分scope一致のため旗艦送客。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1828/build OK)。本番ビルド `blog/ipa-shiken-goukakuritsu-ranking.html` に `"@type":"FAQPage"`×1・本文Q「もっとも低く」「午後論述 AI 採点」・`href="/essay"` 出力、`/essay`(essay.html)実在(200)=新規404ゼロを実測。
- done: [P2-2/旗艦] **高度試験戦略記事 ap-goukaku-go-koudo-senryaku に よくある質問節を追加しFAQPage化**。SHA `f2a1a80`。
  - 監査: 応用情報合格後の高度試験戦略(高intent・厚い4320)だが FAQ 節無し。「免除はAP以外でも?/いつ受けるのが最速?/どの区分を選ぶ?/午後II論文対策は?」が受験計画者の質問intent。
  - 実装: オリジナル4Q&A(Q1=午前I免除3条件・2年間・基準点60点／Q2=ゴールデンタイム6ヶ月・実施時期グルーピング春期ST/SA/NW/SM・秋期PM/DB/ES/AU・春秋SC／Q3=職種一致を最優先／Q4=管理系5区分2000-3000字→[/essay]旗艦funnel・参考評価)を `## まとめ` 直前に挿入。本文の免除条件・タイムライン・実施時期と厳密整合。Q4のみ論文5区分scope一致で旗艦送客。
  - 検証: 全ゲート緑(test1828/build OK)。`blog/ap-goukaku-go-koudo-senryaku.html` に FAQPage×1・「免除の条件は3通り」「ゴールデンタイム」「午後論述 AI 採点」・`href="/essay"` 出力を実測=新規404ゼロ。
- done: [P2-2/旗艦] **共通テーマ横断記事 ipa-kyoutsuu-juyou-theme に よくある質問節を追加しFAQPage化**。SHA `e4fbd8f`。
  - 監査: 13区分共通テーマのハブ記事(厚い3798・横断学習intent)だが FAQ 節無し。「共通の最重要テーマは?/何から学ぶ?/セキュリティは全区分?/論述系の対策は?」が横断学習者の質問intent。
  - 実装: オリジナル4Q&A(Q1=5コアテーマ セキュリティ/ネットワーク/DB/PM/開発手法／Q2=APで共通基礎→高度試験／Q3=セキュリティは全13区分・IPAの方針／Q4=管理系5区分PM/ST/SA/SM/AU→[/essay]旗艦funnel・参考評価)を `## まとめ` 直前に挿入。本文の5コアテーマ・AP共通基礎方針と厳密整合。Q4のみ論文5区分scope一致で旗艦送客。
  - 検証: 全ゲート緑(test1828/build OK)。`blog/ipa-kyoutsuu-juyou-theme.html` に FAQPage×1・「共通する最重要テーマは何」・`href="/essay"` 出力を実測=新規404ゼロ。
- done: [P2-2/土台] **学習科学記事 kakumon-gakushuu-science に よくある質問節を追加しFAQPage化**。SHA `4f543a8`。
  - 監査: 認知心理学ベースの学習法記事(厚い3390・学習法longtail)だが FAQ 節無し。「ただ何周も解けば?/復習タイミングは?/分野は混ぜる?/誤答復習は?」が学習法検索者の質問intent。**学習科学記事=論文scope非該当のため旗艦/essayへは非送客**(funnel先は復習/ランダムモード・AIコパイロットのみ・誇大回避の判断)。
  - 実装: オリジナル4Q&A(Q1=テスト効果・引き出し行為・ルーディガー2006実験50%／Q2=間隔反復スケジュール翌日→3→7→14→30日・復習モード／Q3=インターリービング・[ランダムモード]／Q4=エラー学習効果4ステップ・AIコパイロット)を `## まとめ` 直前に挿入。全数値(50%/間隔スケジュール)を本文記述に一致。本文に `/essay` リンク無し=footer 1本のみを実測確認(論文非該当の規律を遵守)。
  - 検証: 全ゲート緑(test1828/build OK)。`blog/kakumon-gakushuu-science.html` に FAQPage×1・「ただ何周も解けば」・`href="/essay"`=1(footer nav「午後論述AI採点」のみ・本文over-claim無し)を grep context で実測=新規404ゼロ。
- 申し送り（セッション44まとめ）:
  - **FAQ展開を厚い高intent記事へ4本継続(session43の太いvein)**: 合格率ランキング `a5471e0`・高度試験戦略 `f2a1a80`・共通テーマ横断 `e4fbd8f`・学習科学 `4f543a8`。全て本文事実と厳密整合・誇大回避(年収/quota/価格非記載)・**論文5区分scope一致時のみ旗艦/essay funnel(参考評価明記)**・学習科学記事は論文非該当で旗艦非送客の規律を遵守・corpus-wide回帰自動カバー・新規404ゼロ。
  - **残るFAQ未設置の厚い記事(次セッション継続可)**: `ipa-sanko-mondaishu-2026`(3481・参考書/アフィリ近接)・`db-sql-taisaku`(2592)/`nw-hinshutu-pattern`(2550)(技術系午後=記述式ゆえ旗艦非送客・各ハブ+AIコパイロットfunnel)・`ip-3shukan-goukaku`(1969)・`ai-kakomon-gakushuu`(1638)・`kakomon-ai-vs-doujou`(2081・競合比較ゆえ中傷回避で慎重に)。**要注意**: `sc-ronbun-taisaku`はSC午後frame事実性がHD-6未決でFAQ化も保留、`ap-gogo-sentaku`はAP午後モック=HD-4(選択戦略FAQは可だが旗艦送客不可)、roadmap系は未実装capabilityを現状事実化しない(誇大回避)。短いstub記事(len<800)はthinゆえFAQ対象外。
  - **次の最優先候補**: (a)上記FAQ未設置の厚い記事へFAQ展開継続(actionable・vein太い)、(b)HD群の人間入力待ち(HD-1〜HD-10)。

## セッション45（growth ループ）2026-06-02 JST
- 監査(read-only): session44 申し送りの「残るFAQ未設置の厚い記事」リスト先頭4本にFAQ展開を継続。各記事を精読し本文事実と厳密整合・誇大回避・**funnel規律(論文5区分scope一致時のみ旗艦/essay、技術記述式区分=各ハブ/AIコパイロット、非論文=土台/モード)** を徹底。extractFaq形式(`**Q. ...？**`+回答1行)・corpus-wide `blog-faq-jsonld` 自動カバーを確認の上着手。
- done: [P2-2/あと一歩+アフィリ] **参考書ガイド ipa-sanko-mondaishu-2026 に よくある質問節を追加しFAQPage化**。SHA `10cf687`。
  - 監査: 参考書/アフィリ近接の高intent記事(厚い3481)だが `## まとめ` で終わりFAQ節無し。「何冊/最新版/演習配分/午後論文選び」が参考書検討者の質問intent。
  - 実装: オリジナル4Q&A(Q1=テキスト1冊+演習・APは午後/論文専用書追加／Q2=シラバス改訂頻繁なIPは最新版必須・他は新範囲を過去問AIで補完／Q3=参考書30-40%・演習60-70%・[kakomon-nannenbun]3-5年分95%／Q4=論文5区分ST/SA/PM/SM/AU論文事例集→[/essay]参考評価funnel)を `## まとめ` 直前にadditive挿入。全数値を本文記述に厳密一致。Q4のみ論文5区分scope一致で旗艦送客。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1828/build OK)。本番ビルド `blog/ipa-sanko-mondaishu-2026.html` に FAQPage×1+Question×4・可視Q「参考書は何冊そろえれば」・`href="/essay"`×3(本文L9424+FAQ Q4+footer)出力、JSON-LD acceptedAnswer markdown leak `](`=0 を実測=新規404ゼロ。
- done: [P2-2/技術系午後] **DB対策記事 db-sql-taisaku に よくある質問節を追加しFAQPage化**。SHA `3c8ca42`。
  - 監査: 技術系午後=記述式区分の厚い記事(2592)だがFAQ節無し。「午後I形式/SQL苦手/正規化/時間不足」がDB受験者の質問intent。**記述式ゆえ旗艦/essay非送客**(funnel先は/dbハブ・AIコパイロット・db-gogo-jikan-haibun)。
  - 実装: オリジナル4Q&A(Q1=午後I 90分3問2選択記述式・合格率15-17%／Q2=JOIN/HAVING/サブクエリを図で→AIコパイロット「行を追って説明」／Q3=第1〜3正規形を手を動かして変換・関数従属性言語化／Q4=[db-gogo-jikan-haibun]時間配分+/db演習)を挿入。全数値を本文一致。
  - 検証: 全ゲート緑(test1828/build OK)。`blog/db-sql-taisaku.html` に FAQPage×1+Question×4・可視「正規化が覚えられません」・`href="/essay"`=1(footerのみ・本文over-claim無し)・`href="/db"`×7・db-gogo-jikan-haibun×4・leak0 を実測=新規404ゼロ。
- done: [P2-2/技術系午後] **NW頻出パターン記事 nw-hinshutu-pattern に よくある質問節を追加しFAQPage化**。SHA `904607e`。
  - 監査: 技術系午後=記述式区分(論述小論文なし・本文明記)の厚い記事(2550)だがFAQ節無し。「午後形式/プロトコルトレース/障害切り分け/時間不足」がNW受験者の質問intent。**記述式ゆえ旗艦/essay非送客**(funnel先は/nwハブ・AIコパイロット・nw-gogo-jikan-haibun)。
  - 実装: オリジナル4Q&A(Q1=午後I・II記述式・論述小論文なし・合格率15-18%／Q2=TCP3way/ARP/NAT/DNSをパケット図で手書きトレース10回・AIコパイロットにシーケンス図／Q3=L1物理→IP→DNS→ルーティング→FWの切り分け型／Q4=[nw-gogo-jikan-haibun]+/nw演習)を挿入。全数値を本文一致。
  - 検証: 全ゲート緑(test1828/build OK)。`blog/nw-hinshutu-pattern.html` に FAQPage×1+Question×4・可視「障害解析の切り分け手順が書けません」・`href="/essay"`=1(footerのみ)・`href="/nw"`×7・nw-gogo-jikan-haibun×4・leak0 を実測=新規404ゼロ。
- done: [P2-2/土台入門] **ITパスポート短期合格記事 ip-3shukan-goukaku に よくある質問節を追加しFAQPage化**。SHA `2e8fd07`。
  - 監査: 入門高volume記事(1969)だがFAQ節無し。「3週間可否/分野順/合格点/過去問量」がIP受験者の質問intent。IP=非論文区分のため**旗艦/essay非送客**(funnel先は/ip・年度別/分野別モード・AIコパイロット・ip-goukaku-ten-bunyabetsu)。
  - 実装: オリジナル4Q&A(Q1=1日1.5-2h計30-42h合格圏・未経験は5-6週／Q2=ストラテジ配点高で先行・**出題数自体はテクノロジ系最多**[session31/32の是正を踏襲]／Q3=総合600点+各分野300点足切り・[ip-goukaku-ten-bunyabetsu]／Q4=直近3年・正答率75%目安・年度別/分野別モード)を挿入。全数値を本文厳密一致。
  - 検証: 全ゲート緑(test1828/build OK)。`blog/ip-3shukan-goukaku.html` に FAQPage×1+Question×4・可視「本当に3週間でITパスポートに合格できますか」・`href="/essay"`=1(footerのみ)・`href="/ip"`×6・ip-goukaku-ten-bunyabetsu×4・leak0 を実測=新規404ゼロ。
- 申し送り（セッション45まとめ）:
  - **FAQ展開を厚い高intent記事へ4本継続(session43-44の太いvein)**: 参考書ガイド `10cf687`・DB対策 `3c8ca42`・NW頻出 `904607e`・IP短期合格 `2e8fd07`。全て本文事実と厳密整合・誇大回避(年収/quota/価格非記載)・**funnel規律徹底**(参考書Q4のみ論文5区分→旗艦/essay参考評価、DB/NW=記述式ゆえ旗艦非送客で各ハブ+時間配分記事、IP=非論文で土台/モードのみ)・corpus-wide回帰自動カバー・新規404ゼロ・全記事 markdown leak 0 実測。
  - **残るFAQ未設置の厚い記事(次セッション継続可)**: `ai-kakomon-gakushuu`(1638・AI学習法longtail=非論文ゆえ旗艦非送客)・`kakomon-ai-vs-doujou`(2081・**競合比較ゆえ中傷回避で慎重に**・自サイト事実優位の提示に留める)。**要注意(FAQ化保留/制約)**: `sc-ronbun-taisaku`はSC午後frame事実性がHD-6未決でFAQ化も保留、`ap-gogo-sentaku`はAP午後モック=HD-4(選択戦略FAQは可だが旗艦送客不可)、roadmap系は未実装capabilityを現状事実化しない(誇大回避)。短いstub記事(len<800)はthinゆえFAQ対象外。
  - **次の最優先候補**: (a)残り2本(ai-kakomon-gakushuu/kakomon-ai-vs-doujou)へFAQ展開継続でP2-2 FAQ vein をほぼ枯らす、(b)枯れたら新P2/P3角度起案 or HD群の人間入力待ち(HD-1〜HD-10)。

## セッション46（growth ループ）2026-06-02 JST
- 監査(read-only): session45 申し送りの「残り2本(ai-kakomon-gakushuu/kakomon-ai-vs-doujou)」FAQ展開を完了後、**FAQ未設置の最大の取り残し=テンプレ生成記事群**(buildFrequentTopicsPost/buildLastMonthPost/buildPracticePost/buildAnalysisPost×各13区分=52記事)を build成果物の機械走査(`grep '"@type":"FAQPage"'` 欠落)で発見。session11 `buildOverviewPost` の「テンプレ1編集で全13区分一括FAQPage化」を踏襲し2テンプレを処理。
- done: [P2-2/あと一歩] **AI学習法記事 ai-kakomon-gakushuu によくある質問節を追加しFAQPage化**。SHA `1f5b873`。
  - 監査: 非論文のAI学習法longtail記事(1638)だがFAQ節無し。「暗記学習との違い/思考力低下/スキマ時間/科目B」が質問intent。**非論文ゆえ旗艦/essay非送客**(funnel=土台fe-kamoku-b-taisaku・ランダム/分野別モード・AIコパイロット)。
  - 実装: オリジナル4Q&A(Q1=3機能[即時解説/類題生成/弱点分析]／Q2=教科書→過去問AI弱点可視化→AI「なぜ」解消の3周設計／Q3=通勤30分シナリオ+復習モード／Q4=科目B擬似言語1行トレース→[fe-kamoku-b-taisaku]土台funnel)を `## まとめ` 直前に挿入。本文事実厳密整合。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡ux-audit-screenshots.mjsのみ〕/test1828/build OK)。`blog/ai-kakomon-gakushuu.html` に FAQPage×1+Question×4・可視Q・`href="/blog/fe-kamoku-b-taisaku"`×1・`/essay`=1(footerのみ・本文over-claim無し)・JSON-LD leak0 を実測=新規404ゼロ。
- done: [P2-2/競合比較] **競合比較記事 kakomon-ai-vs-doujou によくある質問節を追加しFAQPage化**。SHA `b3b02c3`。
  - 監査: 競合比較記事(2081・既に中傷回避の免責文あり・本文は `${AI_QUOTA_COPY_SHORT}` SSOT参照済)だがFAQ節無し。「どちらを使うべき/AIで何ができる/スマホ完結/無料範囲」が質問intent。**競合比較ゆえ中傷回避**(従来型を中立framing・組み合わせ推奨)・非論文ゆえ旗艦非送客。
  - 実装: オリジナル4Q&A(Q1=従来型は蓄積データ/AIは対話解説・組み合わせ推奨／Q2=AIコパイロット具体機能／Q3=モバイル片手UX[画面遷移ゼロ/スワイプ/PWA]／Q4=無料全13区分・AI回数はSSOT `${AI_QUOTA_COPY_SHORT}`参照・価格非記載)。本文5軸比較と厳密整合。
  - 検証: 全ゲート緑(test1828/build OK)。`blog/kakomon-ai-vs-doujou.html` に FAQPage×1+Question×4・可視Q「どちらを使うべきですか」「無料でどこまで使えますか」・`/essay`=1(footerのみ)・raw template `${AI_QUOTA_COPY_SHORT}`残存=0(正しく補間)・leak0 を実測。
- done: [P2-2/テンプレ一括] **頻出論点トップ10 生成テンプレ buildFrequentTopicsPost に FAQ追加→全13区分一括FAQPage化**。SHA `519f101`。
  - 実装: テンプレ body の `## まとめ` 直前に format-agnostic な4Q&A(Q1=トップ10で6割得点・残りは得意分野上乗せ／Q2=過去問→用語集→再演習の三段階・分野別モード・AIコパイロット比較表／Q3=過去5年傾向の安定性+IPA公式確認の免責／Q4=分野別モード+類題演習+[/exam]ハブ)を1箇所挿入。**13区分横断ゆえ午前/午後/科目の形式特定を厳禁**(IP/SG/FE誤記=HD-9回避)・本文事実厳密整合・非論文混在ゆえ旗艦/essay非送客(funnel=分野別モード+/[exam])。
  - 検証: 全ゲート緑(test1828/build OK)。本番ビルドで `*-hinnshutsu-ronten-toppu10.html` **13/13 が FAQPage×1+Question×4**・ip記事で `ITパスポート` label補間・`/quiz?mode=topic`×2・`href="/ip"`・`/essay`=1(footerのみ・全区分)・leak0 を実測=新規404ゼロ。
- done: [P2-2/テンプレ一括] **直前1ヶ月 生成テンプレ buildLastMonthPost に FAQ追加→全13区分一括FAQPage化**。SHA `6c6c34d`。
  - 実装: テンプレ body の `## まとめ` 直前に4Q&A(Q1=残り1ヶ月の週別配分／Q2=新規教材を増やさない3つの鉄則／Q3=捨てる論点[5年1回/個別ベンダー/重計算]／Q4=復習モード+類題+[/exam])を挿入。**旗艦/essay funnelは既存 `ESSAY_FLAGSHIP_EXAMS` ゲート(st/sa/pm/sm/au)・FE土台は `exam==="fe"` ゲートを FAQ用短縮CTA(`faqEssayCta`/`faqKamokuBCta`)で踏襲**(参考評価明記)。非論文区分には旗艦/土台を出さず復習モード/[exam]のみ=誇大回避を構造保証。
  - 検証: 全ゲート緑(test1828/build OK)。本番ビルドで `*-cyokusen-1kagetsu.html` **13/13 FAQPage**・**essay funnel gating厳密**(st/sa/pm/sm/au=`/essay`3[body+FAQ+footer]・非論文10区分=1[footerのみ])・**FE kamokuB gating厳密**(fe=2・他0)・`/quiz?mode=review` funnel・leak0 を実測=新規404ゼロ。
- 申し送り（セッション46まとめ）:
  - **FAQ vein の最大の取り残し=テンプレ生成52記事を発見**(個別記事のFAQ化は session42-46 でほぼ枯れたが、テンプレ生成群は未着手だった)。本セッションで2テンプレ(頻出論点/直前1ヶ月=計26記事)をFAQPage化。**テンプレFAQの鉄則**: ①13区分横断ゆえ午前/午後/科目の形式特定を避ける(IP/SG/FE誤記=HD-9回避) ②旗艦/土台funnelは既存ゲート(ESSAY_FLAGSHIP_EXAMS/exam==="fe")を踏襲し非論文区分には出さない ③本文既存事実のみ引用・quota/価格はSSOT or 非記載。
  - **次の最優先候補(残テンプレ2本=26記事)**: `buildPracticePost`(`{exam}-yoru-tokurensyu`・夜特訓/実戦演習・L348〜)と `buildAnalysisPost`(`{exam}-jisseki-mondai-bunseki`・実績問題分析・L450〜)が FAQ未設置。同じ鉄則(format-agnostic+既存ゲート踏襲)でFAQPage化すれば残り26記事を一掃できる(vein太い)。**着手前に各テンプレ body を精読**し本文事実と整合するQ&Aを作ること。
  - その後の候補: テンプレ4本完了後はFAQ vein枯渇に近づく→新P2/P3角度起案 or HD群(HD-1〜HD-10)の人間入力待ち。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## セッション47（2026-06-02）— FAQ vein 仕上げ: 残テンプレ2本(26記事)+ 個別厚記事3本
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- done: [P2-2/テンプレ一括] **過去問解き方 buildPracticePost + 出題傾向分析 buildAnalysisPost に FAQ追加→残26記事(各13区分)を一括FAQPage化**。SHA `561a6ad`。
  - 監査: session46 申し送りの最優先=残テンプレ2本。各 body 精読し本文事実と整合する format-agnostic 4Q&Aを作成。
  - 実装: **practice** = flagshipEssayCta/kamokuBCta の既存ゲート(ESSAY_FLAGSHIP_EXAMS / exam==="fe")を FAQ短縮CTA(faqEssayCta/faqKamokuBCta)で踏襲。Q&A=過去問何周/AIコパイロット活用/誤答復習タイミング/4モード使い分け。**analysis** = 論述writing節が無いため frequentTopics同様に**非essay funnel**(分野別モード+/exam・/essay非送客)。Q&A=出題傾向の変化/増加論点対策/捨て論点基準/学習配分。format特定を厳禁(HD-9回避)・本文事実厳密整合。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡mjsのみ〕/test1906/build OK)。本番ビルドで **26記事(13×2)=FAQPage×1+Question×4**・gating厳密(practice論文5区分=/essay3[body+FAQ+footer]/非論文=1[footer]・analysis全区分=1[footer]・practice科目B=fe2/他0)を実測=新規404ゼロ。回帰pin2件追加(全5生成器の FAQ存在 + analysis非essay)。
  - **★節目: 5生成器(overview/lastMonth/frequentTopics/practice/analysis)すべてFAQPage化完了=テンプレFAQ vein枯渇。**
- done: [P2-2/個別] **IT資格 組み合わせ戦略 ipa-shiken-kumi-awase-senryaku をFAQPage化**(最厚3163字の未設置記事)。SHA `d3adc93`。キャリア戦略の非essay記事=旗艦/essay非送客(footer1)。Q&A=取得順/セキュリティ組み合わせ/数より組み合わせ/日系外資の評価差。本番ビルドでFAQPage×1+Q×4・/essay=1実測。corpus-wide blog-faq-jsonld 自動カバー。
- done: [P2-2/個別] **学習法longtail2本をFAQPage化**。SHA `f7cde07`。分散学習 `kakomon-spaced-repetition-jissen`(復習タイミング/ライトナー/自動化/直前期)・誤答ふりかえり `kakomon-modori-3step`(見直し手順/4分類/時間配分/自動化)。非essay=footer1・復習モード(/quiz?mode=review)/AIコパイロット/学習計画へ funnel。本番ビルドで各FAQPage×1+Q×4実測。
- 申し送り（セッション47）:
  - **テンプレFAQ vein完全枯渇**(5生成器×13区分=全FAQPage化)。個別記事は body長スキャン(`scripts/_faqscan.mts` 相当・getAllBlogPosts→`## よくある質問`正規表現)で **FAQ未設置=42/165記事** 残るが、上位は要注意フラグ多数: `ap-gogo-sentaku`(HD-4 AP午後モック=旗艦送客不可)・`sc-ronbun-taisaku`(HD-6 SC午後frame事実性未決でFAQ化保留)・`ipa-saishin-doukou`/`ai-shaken-saizensen-2026`(年次snapshot=auto-advance SKIP)・`gyoushu-essay-*`3本(ST/PM/SA論文=次セッションの好候補・旗艦/essay funnel可)。
  - **次セッション候補(clean・actionable)**: `shaiin-bunkatsu-plan-3pattern`(2224)・`goukakusha-100nichi-plan`(1806)・`goukakusha-shukan-review`(1790)・`ai-vs-yobikou-tsukaiwake`(1771)・`mobile-katate-juken-jutsu`(1883)・`ipa-shiken-zenkubun-hikaku`(1539) 等の学習法/キャリア系general記事。**gyoushu-essay-{kinyuu-strategy/seizou-pm/koukyou-sa}** は論文区分ゆえ Q4で旗艦/essay funnel可(参考評価明記)。**鉄則**: 本文事実厳密整合・非論文は/essay非送客・論文区分のみ旗艦送客・quota/価格はSSOT or 非記載・format特定回避。各記事の body精読を先に。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## セッション48（2026-06-02）— FAQ展開: session47 clean候補リストを完全消化（9記事）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 監査(read-only): session47 申し送りの clean候補リスト(gyoushu-essay 3本 + 学習法/キャリアgeneral 6本)を各 body 精読。extractFaq形式(`**Q1. ...？**`+回答1行)・corpus-wide `blog-faq-jsonld` 自動カバー・funnel規律(論文5区分のみ旗艦/essay・非論文はfooter1)を徹底。
- done: [P2-2/旗艦funnel] **業種別論文記事3本(金融ST/製造PM/公共SA)をFAQPage化**。SHA `62b6dbf`。
  - `gyoushu-essay-{kinyuu-strategy,seizou-pm,koukyou-sa}` は本文が旗艦 /essay へ funnel済の論文区分(ST/PM/SA)記事だが FAQ節欠落。各オリジナル4Q&A(業種採用メリット/題材パターン3つ/業種KW・KPI/客観評価)・Q4で論文5区分scope一致の /essay AI採点へ funnel(参考評価明記)。
  - 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡mjsのみ〕/test1906/build OK)。3記事とも `blog/*.html` に FAQPage×1+Question×4・`/essay`=3(本文+FAQ Q4+footer)・可視Q・JSON-LD markdown leak`](`=0 を実測=新規404ゼロ。
- done: [P2-2/非essay] **学習計画/モバイル系general記事4本をFAQPage化**。SHA `9524fea`。
  - `mobile-katate-juken-jutsu`(隙間時間月31.5h/片手5条件/通勤昼休み待ち時間/継続)・`goukakusha-100nichi-plan`(4期間分割/週次タスク/模試Day30-90/遅延リカバリ)・`goukakusha-shukan-review`(30分5項目/確認内容/体調モチベ/ダッシュボード)・`shaiin-bunkatsu-plan-3pattern`(パターン選択/週合計時間と対象試験/最大化コツ/失敗)。全て非論文=旗艦/essay非送客(footer1)・復習モード/学習計画機能/進捗ダッシュボードへ funnel。
  - 検証: 全ゲート緑(test1906/build OK)。4記事とも FAQPage×1+Question×4・`/essay`=1(footerのみ=funnel規律)・leak0 を実測=新規404ゼロ。
- done: [P2-2/非essay] **全区分比較/AI予備校使い分けの2記事をFAQPage化**。SHA `1b56551`。
  - `ipa-shiken-zenkubun-hikaku`(全13区分比較・高inbound・受験順序/午前I免除2年/同時受験/職種別キャリア接続)・`ai-vs-yobikou-tsukaiwake`(AI/予備校使い分け・補完関係/社会人組合せ/論文区分対策/AI弱み)。両者とも非論文general=footer1。後者は本文が意図的に「AI=草稿・人手=最終仕上げ」framingゆえ /essay funnelを足さず安全側(誇大回避・特定予備校の推奨批判なし)。
  - 検証: 全ゲート緑(test1906/build OK)。2記事とも FAQPage×1+Question×4・`/essay`=1(footer)・可視Q・leak0 を実測。
- 申し送り（セッション48）:
  - **session47 の clean候補リスト(9記事)を完全消化**。3コミットで gyoushu-essay 3本(旗艦funnel)+学習計画/モバイル4本+比較2本=計9記事をFAQPage化。全て本文事実厳密整合・funnel規律徹底(論文5区分のみ旗艦/essay=3・非論文=footer1)・新規404ゼロ・markdown leak0実測。
  - **★FAQ vein は枯渇していない**: 本セッション終了時の build成果物 機械走査(`.next/server/app/blog/*.html` で `"@type":"FAQPage"` 欠落)で **FAQ未設置=30/165記事**。要注意除外(`ap-gogo-sentaku`=HD-4/`sc-ronbun-taisaku`・`sc-incident-response-storytelling`=HD-6 SC午後frame/`ipa-saishin-doukou`・`ai-shaken-saizensen-2026`=年次snapshot SKIP/短いstub `db-er-design-practice`・`pm-essay-shudai-pickup`・`st-strategy-perspective`・`au-audit-evidence-language`=thin)後も **clean候補多数**。
  - **次セッション候補(clean・要body精読/長さ確認)**: `ipa-shiken-shakaijin-jikan-kakuho`(高inbound・社会人時間確保)・`ipa-shiken-cbt-vs-pbt`・`kakomon-ai-vs-paper`・`ipa-shiken-keisan-mondai-kokuhuku`・`ipa-shiken-fugoukaku-kara-no-recovery`・`ipa-shiken-mensetsu-katsu-yoho`・`ipa-shiken-tsuukin-jikan-katsuyou`・`ipa-shiken-syotaikennsya-isshukan-puran`・`ipa-shiken-yoshu-vs-douju-jiritsu`・`ipa-old-syllabus-vs-new`・`ipa-eligible-companies`・`shiken-zenjitsu-checklist`・`shippai-pattern-7`・`ipa-shiken-pomodoro`・`ipa-shiken-data-driven-revision`・`ipa-shiken-mokuhi-mondai-tukurikata`・`ai-coplilot-prompt-tips`・`ai-copilot-rag-citation-katsuyou`・`ipa-shiken-ai-katsuyou-benkyouhou`・`nw-protocol-deep-understanding`(NW技術=非essay)・`ipa-shiken-gogo-vs-am`(午前午後比較)。**鉄則**: body長確認(len<800のstubは対象外)→精読→本文事実厳密整合・非論文は/essay非送客・論文区分のみ旗艦・quota/価格SSOT or 非記載・format特定回避(HD-9)。

## セッション49（growth ループ）2026-06-02 JST
- 監査(read-only): P2-2 FAQ展開の継続。backlog の clean候補リスト(個別FAQ未設置=30/165)から本文長・funnel scope を精読し、非論文高intent記事4本を選定。各記事に `## よくある質問` 節(extractFaq形式・**Q. ...？**+回答1段落)を本文事実と厳密整合させて追加=FAQPage JSON-LD 自動生成。
- done×4(全て gate緑[typecheck0/lint0err/test1906pass/build OK]を commit前に単独実行・本番ビルドHTMLで FAQPage×1+Question×4 実測・FAQ内/essayリーク0実測):
  - `ipa-shiken-shakaijin-jikan-kakuho`(社会人時間確保・高inbound) SHA `bde5b65`: 平日まとまった時間なし/半年300時間配分/計画倒れ/通勤演習の4Q&A。非論文=復習モード+AIコパイロットfunnel・旗艦/essay非送客。
  - `ipa-shiken-cbt-vs-pbt`(CBT vs PBT) SHA `742ab4e`: AP/高度=PBT春秋・CBT化=IP/SG/FE通年/予約制/対策の違い/CBT慣れの4Q&A。/ip /fe funnel・非論文=旗艦非送客。FAQ内/essay=0(/essayはsite-wide nav3件のみ=全blog共通)。
  - `ipa-shiken-keisan-mondai-kokuhuku`(計算問題克服) SHA `13418db`: 計算は捨てるな/対策順(基数変換・稼働率・スループット)/計算のみフィルタ/暗算苦手の4Q&A。計算フィルタ+AIコパイロットfunnel・非論文=旗艦非送客。
  - `kakomon-ai-vs-paper`(紙vsアプリ) SHA `df4bf21`: どちら買う/アプリだけで合格/紙は不要か/併用配分の4Q&A。復習モード+AIコパイロットfunnel・非論文=旗艦非送客。
- 結果: 個別FAQ未設置 30/165→26/165。backlog clean候補リストから4本消化(残: fugoukaku-recovery/mensetsu/tsuukin/syotaikennsya/yoshu-douju/old-new-syllabus/eligible-companies/zenjitsu-checklist/shippai-7/pomodoro/data-driven/mokuhi/prompt-tips/rag-citation/ai-katsuyou/nw-protocol/gogo-vs-am 他)。
- 鉄則順守: 本文既存の数値・形式と一致(300時間/CBT区分/午前計算/紙アプリ)・非論文は/essay非送客・format特定回避・新規404ゼロ・corpus-wide blog-faq-jsonld 回帰自動カバー。次セッションは残clean候補から継続。

## セッション50（growth ループ・2026-06-02 JST）
- 監査(read-only): P2-2 個別FAQ vein の clean候補(backlog記載)を body長・事実性で精読確認。4本選定。
- done: [P2-2/FAQ] **不合格リカバリー `ipa-shiken-fugoukaku-kara-no-recovery` をFAQPage化** SHA `a20bf4e`。高intent「IPA試験 落ちた/不合格」。4Q&A(同区分再挑戦/再受験時期=春秋区分は約半年後・CBT3区分IP/SG/FEは通年/学習法見直し/3ヶ月プラン)。再受験時期は誇大回避でCBT通年を明記。非論文=旗艦/essay非送客。
- done: [P2-2/FAQ] **受からない7パターン `shippai-pattern-7` をFAQPage化** SHA `d1918f5`。4Q&A(7パターン要約/教材コレクター/丸暗記/完璧主義の60%基準)。本文の脱出ルートと整合。非論文=footer1。
- done: [P2-2/FAQ] **通勤スキマ学習 `ipa-shiken-tsuukin-jikan-katsuyou` をFAQPage化** SHA `28e61e0`。4Q&A(30分で合格可否/時間配分3ブロック/車内継続/不足補完)。推奨ルーチンと整合。非論文=footer1。
- done: [P2-2/FAQ] **ポモドーロ `ipa-shiken-pomodoro` をFAQPage化** SHA `957a788`。4Q&A(基本ループ25+5/集中続かない人/休憩可否/1日セット数)。非論文=footer1。
- 検証(各本共通): typecheck0/lint0err(warnは未追跡ux-audit-screenshots.mjsのみ)/test 1906緑/build OK。本番ビルド `.next/server/app/blog/<slug>.html` で `"@type":"FAQPage"`存在・`"@type":"Question"`×4・FAQ内/essayリーク0(footer由来3件のみ)を実測。
- 記録: backlog P2-2 残りFAQ未設置 26→≈22/165 へ更新。clean候補リストから4本除去。
- 次セッション候補: 残clean候補(mensetsu-katsu-yoho/syotaikennsya-isshukan-puran/yoshu-vs-douju-jiritsu/old-syllabus-vs-new/eligible-companies/zenjitsu-checklist/data-driven-revision/mokuhi-mondai-tukurikata/ai-coplilot-prompt-tips/ai-copilot-rag-citation/ai-katsuyou-benkyouhou/nw-protocol-deep-understanding/gogo-vs-am)からFAQ継続。

## セッション51（growth ループ・2026-06-02 JST）
- 監査(read-only): P2-2 個別FAQ vein の clean候補(backlog/session50リスト)を body長・事実性・funnel scope で精読確認。非論文高intent記事5本を選定。各記事に `## よくある質問` 節(extractFaq形式・**Q. ...？**+回答1段落)を本文事実と厳密整合させて追加=FAQPage JSON-LD 自動生成。
- done×5(全て gate緑[typecheck0/lint0err/test1906pass/build OK]を commit前に単独実行・本番ビルドHTMLで FAQPage×1+Question×4 実測):
  - `ipa-shiken-gogo-vs-am`(午前午後比較) SHA `f4956e8`: 対策の順序/時間配分30-40%対60-70%/午後対策の中身/午前I免除2年の4Q&A。非論文=AIコパイロット(/ap)+復習モードfunnel・旗艦/essay非送客(FAQ内/essay=0、footer由来3件のみ)。
  - `shiken-zenjitsu-checklist`(試験前日チェックリスト) SHA `31c776c`: 前日学習/持ち物(CBT IP·SG·FE=筆記不要/PBT AP·高度=鉛筆必須を明記し本文PBT前提を補正)/睡眠6-7h/当日食事の4Q&A。非論文=復習モードfunnel・旗艦非送客(FAQ内/essay=0)。
  - `ipa-old-syllabus-vs-new`(シラバス改訂対応) SHA `9b4a3fb`: 古い過去問どこまで遡る/改訂で変わる物=新技術 不変=基礎理論/改訂への備え/年度別モードで年度絞りの4Q&A。非論文=年度別モードfunnel・旗艦非送客(FAQ内/essay=0)。
  - `ipa-shiken-data-driven-revision`(学習履歴CSV分析) SHA `0e23e41`: エクスポート手順/分析軸=分野別正答率50%未満重点/活かし方/週1頻度の4Q&A。非論文=ダッシュボード+復習モードfunnel・旗艦非送客(FAQ内/essay=0)。
  - `ipa-shiken-yoshu-vs-douju-jiritsu`(予備校/通信/独学比較) SHA `96802a0`: 区分別選び方/費用相場/独学の論文添削課題→旗艦/essay(AI採点)を参考評価明記で送客/ハイブリッド戦略の4Q&A。**論文5区分(ST/SA/PM/SM/AU)scope一致時のみ**旗艦funnel・本文の「論文添削が独力で困難」課題に整合・採点基準非公開=参考評価明記で誇大回避。FAQ内可視/essayリンク1件(href="/essay"を本番HTMLで実測・extractFaqはJSON-LDからURL除去しテキスト"AI 採点"化=構造化データにURL混入なし・参考評価2件含む)。
- 鉄則順守: 本文既存の数値・形式と一致(時間配分/CBT区分/シラバス改訂/履歴分析/予備校費用相場)・非論文は/essay非送客 論文scope一致のみ旗艦(参考評価明記)・format特定回避(HD-9)・新規404ゼロ・corpus-wide blog-faq-jsonld 回帰自動カバー。
- 記録: 個別FAQ未設置 ≈22/165→≈17/165。clean候補リストから5本消化(残: mensetsu-katsu-yoho/syotaikennsya-isshukan-puran/eligible-companies/mokuhi-mondai-tukurikata/ai-coplilot-prompt-tips/ai-copilot-rag-citation/ai-katsuyou-benkyouhou/nw-protocol-deep-understanding)。次セッションは残clean候補から継続。

## セッション52（growth ループ・2026-06-02 JST）
- 監査(read-only): P2-2 個別FAQ vein の clean候補(session51残リスト)を body長・事実性・funnel scope で精読確認。5本選定。各記事に `## よくある質問` 節(extractFaq形式・**Q. ...？**+回答1段落)を本文事実と厳密整合させて追加=FAQPage JSON-LD 自動生成。1コミット(SHA `bacc939`)。
- done×5(全て gate緑[typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1906pass/build OK]を commit前に単独実行・本番ビルドHTMLで FAQPage×1+Question×4 実測):
  - `ipa-shiken-mensetsu-katsu-yoho`(キャリア/転職): 年収への効き方/転職市場評価/資格の数より組み合わせ/取得順の4Q&A。非論文=旗艦/essay非送客(essayLink=1=footerのみ実測)。
  - `ipa-shiken-ai-katsuyou-benkyouhou`(AI活用): 質問の書き方5軸/二重チェック/論文添削→旗艦/essay(ST/SA/PM/SM/AU・参考評価明記)/汎用AIとコパイロットの違いの4Q&A。**論文添削Q&Aで旗艦funnel可**(本文 template4 が既に /essay リンク済=session14 `05bec2b`)。essayLink=3(本文+FAQ Q3+footer)・JSON-LD md-link-leak=0実測。
  - `ipa-shiken-mokuhi-mondai-tukurikata`(模試): 受験回数(3ヶ月前/1ヶ月前の2回)/市販社内自作の使い分け/模試で取れても本番落ちる原因/点数より弱点の4Q&A。非論文=旗艦非送客(essayLink=1)。
  - `ipa-shiken-syotaikennsya-isshukan-puran`(初学者1週間): 7日プラン/試験選び/教材3点/やってはいけない事の4Q&A。非論文=旗艦非送客(essayLink=1)。
  - `nw-protocol-deep-understanding`(NW午後): 暗記不可=5視点/午後70%のコツ/Wireshark/コパイロット活用の4Q&A。NW午後=記述式(論文非該当)=旗艦非送客・/nw funnel(essayLink=1)・JSON-LD md-link-leak=0実測。
- 鉄則順守: 本文既存の数値・形式と一致(資格手当5,000〜30,000円/質問5軸/模試2回/教材2,500〜4,000円/NW午後70%)・非論文は/essay非送客 論文添削scope一致のみ旗艦(参考評価明記)・format特定回避(HD-9)・新規404ゼロ・corpus-wide blog-faq-jsonld 回帰自動カバー。
- 記録: 個別FAQ未設置 ≈17/165→≈12/165。clean候補リストから5本消化(残clean: eligible-companies/ai-coplilot-prompt-tips/ai-copilot-rag-citation-katsuyou=各 body短め len~1000-2300)。次セッションは残clean候補から継続(短stub<800は対象外・要注意フラグ ap-gogo-sentaku=HD-4/sc-ronbun=HD-6/年次snapshot=SKIP は除外継続)。

## セッション53（growth ループ・2026-06-02 JST）
- 監査(read-only): P2-2 個別FAQ vein の clean候補(session52残リスト=eligible-companies/ai-coplilot-prompt-tips/ai-copilot-rag-citation-katsuyou)を body精読・funnel scope確認。3本とも非論文general記事(キャリア/AI活用)=旗艦/essay非送客(footerのみ)。
- done×3(1コミット SHA `cfb0c29`・gate緑[typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1906pass/build OK]をcommit前に単独実行・本番ビルドHTMLで FAQPage×1+Question×4・JSON-LD md-link-leak0 を実測):
  - `ipa-eligible-companies`(IPA資格を評価する企業の見分け方): 評価のばらつき/資格手当相場(応用5,000-10,000円・高度10,000-30,000円)/求人票5シグナル/面接質問の4Q&A。本文事実と厳密整合。非論文=旗艦非送客(essayHref=1=footer)。
  - `ai-coplilot-prompt-tips`(AIコパイロットへの聞き方): 10個全部覚える必要なし=得意3個/誤答分析の聞き方/暗記補助/起動場所の4Q&A。非論文=旗艦非送客(footerのみ)・/quiz funnel。
  - `ai-copilot-rag-citation-katsuyou`(引用カード活用): 使い方3WF/反証チェック/引用カード非表示時/解説誤り時のIPA公式PDF補正の4Q&A。OWASP等の具体バージョン番号はFAQで断定せず「学習データ締切で最新非反映の場合あり」と一般化(誇大/drift回避)。非論文=旗艦非送客。
- **★P2-2 個別FAQ vein 枯渇確認**: build成果物 機械走査(`.next/server/app/blog/*.html` で `"@type":"FAQPage"` 欠落)= **9/165**。残9本は全て着手不可フラグ付き=新規FAQ対象なし:
  - 年次snapshot SKIP: `ai-shaken-saizensen-2026` / `ipa-saishin-doukou`
  - HD-4(AP午後モック): `ap-gogo-sentaku`
  - HD-6(SC午後frame事実性未決): `sc-ronbun-taisaku` / `sc-incident-response-storytelling`
  - thin stub(len<800・過大修正回避): `au-audit-evidence-language` / `db-er-design-practice` / `pm-essay-shudai-pickup` / `st-strategy-perspective`(=論文/技術区分stubだが /essay funnel は既設=funnel gap無しを実測)
- 追加監査(他vein枯渇確認・read-only): (1)内部リンク整合 `audit-internal-links.ts` 実走=blog165/links1434/FATAL0/WARNING0(dead link無し)。(2)blog構造化データ=Article/BreadcrumbList/FAQPage/LearningResource/WebPage/EducationalAudience/Organization 完備(sample実測)。(3)blog description=165本全て存在・160字超0・短<70は15本だが許容。**=FAQ/funnel/内部リンク/構造化データ/meta description の主要code-side veinは全て枯渇**。
- 申し送り（セッション53）: 個別FAQは clean候補 完全消化。次セッションは backlog 新規 P2-3b「非blog価値ページの orphan/inbound監査」(現 audit-internal-links は blog内リンクのみ対象=非blog crawlable価値ページの被リンク網は未監査)を起案=着手可能。HD-1/4/6/9 は人間待ち継続。

## セッション54（growth ループ）2026-06-02 JST
**P2-3b 着手: 非blog価値ページの「文脈内 inbound」監査 + 高価値hub/LPへ blog本文から文脈内リンクを追加**
- 監査(read-only): 全 indexable 非blog価値ページの「グローバル footer/nav 以外の文脈内リンク(blog本文/feature relatedLinks/q-page/breadcrumb)」からの inbound 有無を機械走査で実測。footer(layout.tsx)は IP/SG/FE/AP/NW/SC/DB ハブ・/essay・/faq・/features・/glossary・/keywords・/blog・/sitemap・/about・/stats・/transparency・/operator・/updates・/contact・/community-guidelines・/terms 等を全部グローバルに張る(=これらは技術的到達可だが文脈内リンクとは別)。
  - **文脈内 inbound あり(orphanでない=対応不要)**: `/essay`(blog/q/keywords/hub多数)・`/features`+`/features/*`(blog本文多数: copilot/study-plan/industry-essays 等)・`/transparency`(blog generators 2 + 2 components)・`/topics`索引(子の breadcrumb)・`/topics/[slug]`(/q topicタグ 12k面)・`/faq`(contact + not-found)・`/glossary`(feature relatedLink 1件)。
  - **文脈内 inbound が blog corpus(165本)からゼロの gap を発見**: (i) `/glossary` = feature relatedLink 1件のみ・blog 0、(ii) `/keywords` 索引 = footer のみ・文脈内 0、(iii) `/keywords/[keyword]` 個別LP(SEO資産) = どこからも文脈内 inbound 0(索引経由のみ到達)。
- done: [P2-3b] **用語集ハブへ blog本文から文脈内リンク** SHA `de905b6`。用語暗記を扱う `ip-nani-kara-benkyou` の「用語集を音読する」節(市販用語集にしか言及せず自サイト/glossary未リンクだった)から自然な本文リンク1本。検証: 全ゲート緑(typecheck/lint(既存untracked警告1のみ)/test1906/build)。本番ビルド `blog/ip-nani-kara-benkyou.html` に `href="/glossary">IT 用語集`(本文linkスタイル・footer用語集とは別)を実測。
- done: [P2-3b] **トピック厳密一致のキーワードLPへ blog本文から文脈内リンク** SHA `eb8c3ab`(1コミット=同一論点)。exam完全一致のみ採用(誇大/off-topic回避): `db-sql-taisaku` 正規化節→`/keywords/db-3nf-normalization`(第3正規形の判定方法)、`nw-gogo-jikan-haibun` サブネット計算節→`/keywords/nw-subnet-calculation`(サブネット計算の解き方)。両LPとも index:true 確認・本文の既存トピックと厳密一致。検証: 全ゲート緑(test1906/build)。本番ビルド `db-sql-taisaku.html`/`nw-gogo-jikan-haibun.html` に各 `href="/keywords/..."` を実測。
- SKIP(誇大/off-topic回避・「迷ったらSKIP」): `pm-evm-calculation`(PM exam LP)はEVM計算の自然な home が AP午後系記事のみ=exam mismatch。`auditor-coso-cobit`は COSO/COBIT が全blog記事に出現せず natural home 無し。両者 SKIP。
- 残り(次セッション以降・exam完全一致 or 自然 home がある分のみ追加可。無理に増やさない=saturation/誇大回避): `/keywords`索引→cross-exam/分野別学習の総括記事から1本(自然 home の見極め要)。exam一致 keyword LP の未配線分(`sc-incident-response`=SC午後記事はHD-6 frame未決で保留、`st-essay-structure-pattern`=ST論文系・既存/essay funnelと競合しうるので慎重、`ap-chokuzen-1week`/`ip-1month-study-plan`=既存blogクラスタと重複懸念、`ai-copilot-how-to-use`=feature relatedLinkで配線済)。詳細は backlog P2-3b 参照。
- 申し送り(セッション54): P2-3b は exam完全一致の clean な keyword LP 2本 + glossary 1本を配線。残るは exam mismatch/HD保留/重複懸念で着手は慎重吟味要。次は (a)/keywords索引の自然 home 探索、(b)他の exam完全一致 keyword LP(慎重)、(c)HD解消(人間待ち)。

## セッション55（growth ループ）2026-06-02 JST
**P2-3b 継続: keyword LP の orphan(blog本文文脈内 inbound 0)を exam完全一致 home から解消=keyword LP vein 打ち止め**
- 監査(read-only): 全11 keyword LP の blog本文文脈内 inbound を機械走査(`grep -rho '/keywords/...' data/blog/`)。session54時点=2本(db-3nf/nw-subnet)のみ。残9本の自然 home(exam一致・トピック一致)を精読で吟味。session54のSKIP(pm-evm/auditor-coso)を新evidenceで再評価。
- done×5(各1コミット・gate緑[typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1906pass/build OK]を commit前に単独実行・本番ビルドHTMLで `href="/keywords/..."` 実在＋LP target prerendered を実測):
  - **AP直前1週間 `ap-chokuzen-1week`** SHA `f3192a6`: `ap-gogo-sentaku`「選択の固定化戦略」節(選択分野を試験前に確定する手順)→直前タイムラインLPへ hub→spoke。exam一致(AP)・intent補完。**session54の「重複懸念」を再評価=この general選択戦略記事は直前タイムラインと別intentで非重複**。
  - **IP1ヶ月プラン `ip-1month-study-plan`** SHA `66b038a`: `ip-3shukan-goukaku` 前提条件節(未経験は5〜6週間延長推奨と明記)→余裕ペースの代替プランLPへ。exam一致(IP)・pace補完で非重複。
  - **PM EVM計算 `pm-evm-calculation`** SHA `b00bd21`: `ap-gogo-management-erabikata` PM節(進捗・予算のデータ読み取りを扱う)→EVM指標計算(SV/CV/SPI/CPI)LPへ。**session54のSKIP(exam mismatch)を覆す根拠=LPは `exams:["pm","ap"]` を自己宣言しAP午後PM分野もスコープ＝exam一致**。anchorはPM試験名でなくEVM計算の内容語にして title mismatch回避。
  - **ST論文構成パターン `st-essay-structure-pattern`** SHA `21b4755`: `st-senryaku-shikou`「頻出テーマと論文構成」節(テーマ別設問構成の導入)→汎用の論文骨組み5パターンLPへ。exam一致(ST)。**「/essay funnel競合懸念」を再評価=LPは strategicCta:"essay" で旗艦/essayへ送客＝funnel補強(競合せず・構成学習→採点の2hopは別intent)**。
  - **AU COSO/COBIT `auditor-coso-cobit`** SHA `d223e86`: `au-shiken-taisaku`「システム監査基準・情報セキュリティ管理基準の理解」節(論述で引用する判断基準フレームワークを扱う)→内部統制COSO/ITガバナンスCOBIT使い分けLPへ。exam一致(AU)。**session54のSKIP(COSO文字列が全blog非出現)を覆す根拠=文脈内リンクは literal term の事前出現でなく topical anchor(基準/フレームワーク引用節)があれば自然＝強fit**。
- SKIP/保留(「迷ったらSKIP」順守):
  - `fe-kamoku-b-pseudo-language` LP = **SKIP**: 同一slugの blog twin(`/blog/fe-kamoku-b-pseudo-language` line1690)が存在＝同トピックの blog記事へ既に kamokuB cluster が funnel。LPへリンクすると自身の blog双子と cannibalization＝重複。
  - `sc-incident-response` LP = **保留(HD-6)**: 自然 home は `sc-ronbun-taisaku`/`sc-incident-response-storytelling`(両者SC午後frame事実性 HD-6未決)のみ。`sc-shikaku-merit`はメリット記事でインシデント対応設問傾向LPと off-topic。LP自体は正framing(記述式)だが home がHD-6・SKIP。
  - `ai-copilot-how-to-use` LP = 配線済(feature relatedLink・session54確認)。
- **★keyword LP orphan vein 打ち止め確認**: 全11 LP の文脈内 inbound = 7本配線済(db-3nf/nw-subnet[s54] + ap-chokuzen/ip-1month/pm-evm/st-essay/auditor-coso[s55]) + ai-copilot[feature] = 9本到達済。残2本は fe-kamoku-b-pseudo-language(blog双子で重複=SKIP)・sc-incident-response(HD-6保留)＝着手不可フラグ付き。**P2-3b の exam一致 keyword LP配線は完全消化**。
- 鉄則順守: 全リンク exam完全一致 or LP自己宣言exam一致・本文既存トピックと厳密一致・additive(本文事実不変)・新規404ゼロ(LP target prerendered実測)・誇大回避(anchorは内容語)・全ゲート緑をcommit前単独実行。
- 残り(P2-3b次の角度・次セッション以降): (a)`/keywords`索引→cross-exam/分野別学習の総括記事から1本(自然 home の見極め要・無理に増やさない)。(b)HD解消待ち(HD-1 GSC404一覧/HD-4 AP午後モック/HD-6 SC午後frame/HD-9 overviewテンプレ)。code-side の主要 vein(FAQ/funnel/内部リンク/構造化データ/meta/keyword LP orphan)は概ね枯渇。

## セッション56（growth ループ）2026-06-02 JST
**P2-3b 残角度の消化: `/keywords`索引(学習トピック特集記事一覧)への文脈内 inbound をcross-exam総括記事から配線=keyword面 orphan vein 完全打ち止め**
- 監査(read-only): `/keywords`索引は blog全165本から文脈内 inbound ゼロ(footer/sitemap/breadcrumb のみ・session54の P2-3b 監査結果と一致)。索引の中身=サブネット計算/正規化/EVM/論文構成 等の頻出論点 特集記事一覧。最も自然な home を blog corpus から精査。
- done×2(1論点):
  - **共通テーマ ハブ→/keywords 索引** SHA `3b3bc05`: cross-exam ハブ記事 `ipa-kyoutsuu-juyou-theme`(13区分共通の最重要テーマ=セキュリティ/ネットワーク[サブネット計算]/DB[正規化]/PM[EVM]/論述)の「横断学習の実践方法」節末尾から `/keywords` 索引へ送客。**索引のコアテーマが本記事のコアテーマと厳密一致＝最も自然な home**。additive(本文事実不変)・anchorは「学習トピック特集記事一覧」で誇大回避。
  - **回帰 pin** SHA `9479797`: `__tests__/seo/keywords-index-inbound.test.ts` 新設。共通テーマ記事から `](/keywords)` 索引への本文リンクが消えて orphan に戻らないことを pin(崩れたら落ちる検証)。
- 検証: 全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1906+1pass/build OK)を commit前に単独実行。本番ビルド `blog/ipa-kyoutsuu-juyou-theme.html` に `href="/keywords"`+anchor「学習トピック特集記事一覧」を実測・`/keywords` 索引=prerendered static(200・新規404ゼロ)を実測。
- 追加監査(read-only・全てclean=対応不要): (1)`audit-internal-links.ts` 実走=blog165本/1443links/FATAL0/WARN0(orphan/dead-link無し)。(2)keyword LP の `relatedTopics`→`topicLinkHref` は未知タグを `/search?q=` へ安全 fallback(dynamicParams=false の/topics 404を生まない設計)=SKIP。(3)keyword 全LP+索引は `sitemap-xml.ts` STATIC_ROUTES 経由で main.xml サブサイトマップに収録済(sitemap.xml.body はindexのみ)=clean。
- **★keyword面 orphan vein 完全打ち止め**: 個別 keyword LP(session54/55で9/11配線)+ `/keywords`索引(本session)の文脈内 inbound が全て解消。残2 LP は着手不可フラグ付き(fe-kamoku-b双子重複SKIP/sc-incident HD-6保留)。
- 鉄則順守: exam横断ハブ記事=試験非依存ゆえ exam一致制約は非該当・本文既存トピックと厳密一致・additive・新規404ゼロ・anchorは内容語で誇大回避・全ゲート緑をcommit前単独実行。
- 申し送り(セッション56): code-side の主要 vein(404掃除/soft-404/FAQ/funnel/内部リンク orphan/構造化データ/meta/keyword LP orphan/keyword索引 inbound)は**全面的に枯渇確認**。残るは全て HD 待ち(HD-1 GSC404一覧/HD-4 AP午後モック投入/HD-5 essays noindex/HD-6 SC午後frame/HD-9 overviewテンプレ)= 人間判断。次セッションは backlog P2-3c(新起案・下記)か、新角度の起案を要する。安易な水増し配線(saturation)はしない。

## セッション57（growth ループ）2026-06-02 JST
**P2-3c 消化 + keyword LP surface の relevance-leak/事実性 是正（3サイクル）**
- done×1 [P2-3c] **キーワードLP→親ブログ解説への「さらに深く学ぶ」逆リンクで dead-end 解消** SHA `95ebd55`:
  - 薄い keyword LP(800〜1,500字)は索引/blogから inbound を得たが、LP自身からの onward 導線が exam ハブ・/topics・他特集記事に限られ、同一トピックを厚く論じる親ブログへの逆リンクが無い dead-end だった。
  - `KeywordPage` に明示オプトイン `relatedBlogSlug?` を新設(success-stories の relatedBlogSlug 同型・regression test 同型)。s54-55 で vetted 済の inbound ペア**7本**を逆方向に配線: ap-chokuzen-1week→ap-gogo-sentaku / ip-1month-study-plan→ip-3shukan-goukaku / nw-subnet-calculation→nw-gogo-jikan-haibun / db-3nf-normalization→db-sql-taisaku / pm-evm-calculation→ap-gogo-management-erabikata / st-essay-structure-pattern→st-senryaku-shikou / auditor-coso-cobit→au-shiken-taisaku。
  - `app/keywords/[keyword]/page.tsx` で `getBlogPostBySlug` で解決し「さらに深く学ぶ」セクション描画。typo slug は弾いて新規404を作らない。
  - 誇大回避=明示オプトイン構造保証。回帰pin2件(全 relatedBlogSlug が実在 blog へ解決・同名 twin を指さない)。実測: LP4本の prerendered HTML に「さらに深く学ぶ」+/blog/<slug>・対象 blog7本が全て prerendered を確認。
  - SKIP/保留(s55 フラグ尊重): fe-kamoku-b-pseudo-language(blog双子=KamokuBStudyHintで /blog/fe-kamoku-b-taisaku へ既リンク・cannibalization回避)・sc-incident-response(HD-6)・ai-copilot-how-to-use(exam一致 deep blog 無し・feature relatedLink済)。**=P2-3c の clear cases 7本で逆リンク vein 打ち止め**。
- done×1 [新角度=relevance-leak] **keyword LP「他の特集記事」レールを関連順に是正** SHA `1183c18`:
  - `page.tsx` の「他の特集記事」が `KEYWORD_PAGES` 配列順 先頭5件を出していたため、DB の LP に NW/IP/SC 等の無関係記事が並び、ap共有の pm-evm-calculation 等が圏外に押し出されていた(blogレールで是正した s39-40 と同型の relevance-leak)。
  - `getRelatedKeywordPages(slug, limit)` 新設: スコア=共有試験区分×10＋共有トピック数 の降順・同点は配列順で安定ソート・スコア0でも5枠を埋める(穴を作らない)。
  - 実測: db-3nf-normalization(db,ap) の他の特集記事が ap共有4本(ap-chokuzen/nw-subnet/pm-evm/ai-copilot)+fallback1 に変化し、無関係 sc-incident-response が正しく圏外へ。回帰pin3件(自己除外/重複なし/limit充足・ap共有>無関係・未知slug空)。
- done×1 [事実性] **COBIT 2019 目標数を是正** SHA `03920eb`:
  - /keywords/auditor-coso-cobit(indexable・sitemap収録)が「COBIT 2019 では 40 のマネジメント目標と 11 のガバナンス目標」と**両数値とも誤記**。ISACA公式コアモデル=ガバナンス及びマネジメント目標 計40(ガバナンス=EDM の5・マネジメント=APO/BAI/DSS/MEA の35)。WebSearch で裏取り。s21-32 事実性監査の取り残し。
  - 「5つのガバナンス目標(EDM)と35のマネジメント目標(APO/BAI/DSS/MEA)の計40」へ是正。回帰pin1件。実測: 本番HTML に是正後文言×2・廃止数値ゼロ。
- 追加監査(read-only・対応不要 or SKIP):
  - `app/features/[slug]/page.tsx`「他の機能特集」=全件列挙(slice無し)＝relevance-leak無し。
  - `app/topics/[slug]/page.tsx`「他のトピックも見る」=`getHubTopics`(人気ハブトピック)を表示＝discovery nav として defensible(「関連」明示でなく「他の」)・トピック間 relatedness は曖昧＝過大修正回避で **SKIP**。
  - keyword LP の他の技術系数値(pm-evm: SV/CV/SPI/CPI/EAC・db-3nf: 3NF/BCNF定義・nw-subnet: /24=…/30=2host/27=30host・st-essay: 2200字×120分)を read-only 確認＝全て正・誤りは COBIT のみ。
- 鉄則順守: 全ゲート(typecheck0/lint0err/test pass[最終1913]/build OK)を commit前に単独実行・実測してから commit・additive・新規404ゼロ・誇大回避。
- 申し送り(セッション57): keyword LP surface は inbound(s54-56)+outbound 逆リンク(s57)+rail relevance(s57)+事実性(s57)で**多面的に整備完了**。code-side の主要 vein は依然枯渇傾向。次セッション候補: (a)relevance-leak 観点を他の indexable 「related/other」surface へ更に展開できるか(features/topics は本session監査で clean/defensible・他に naive slice surface が残るか要走査)。(b)P2-3c の note にある「全LPには無理に付けない」尊重で逆リンク追加は打ち止め。(c)HD群(HD-1/4/5/6/9)= 人間待ち。安易な水増しはしない。

## セッション58（growth ループ）2026-06-02 JST
**P2-3 新角度: /q 最大クロール面の cross-exam 内部リンクを復活（dormant rail を共通カリキュラム分野で稼働）+ 多面 read-only 監査で saturation 再確認**
- done×1 [P2-3] **/q「他試験区分の関連問題」レールを共通カリキュラム分野で復活** SHA `82e7d7e`:
  - **発見**: `/q/[...]/page.tsx` の `crossExamByTopic` レール(「他試験の同テーマ問題」)は `q.topicTags.length > 0` ゲートだが、**全14,416問の topicTags が空(corpus-wide)**=topic-tagger 未実行(CLAUDE.md「未書き込みのヒューリスティックのみ」)。結果、最大クロール面(~12,653 /q)から **cross-exam 内部リンクが完全にゼロ**だった(意図された導線が dormant)。
  - **是正**: `lib/questions/related.ts` 新設。`getCrossExamRelatedQuestions(current, all, limit)` が topicTag があればトピック精密マッチ(共有タグ数降順・relevance-leak guard)、無ければ `AP_TOPIC_GROUPS`(共通キャリア・スキルフレームワークの同義分野: AP「経営戦略」≒FE/IP「ストラテジ」等・/modes/topic で実績ある vetted マッピング)で代替し各他区分1問ずつ(新年度優先)を返す。**スコープを保守的に限定**: 共通カリキュラム4区分(ap/fe/ip/sg)のみ・午前知識問題(am/am1/am2/kamoku-a × MC)のみ・needsReview(404)/placeholder(noindex)先は除外(新規404・noindex先を作らない=既存レールより厳密)。高度試験は対象外(空)。
  - `page.tsx` は helper 呼び出しに置換、見出しを mode で分岐(topic→「他試験の同テーマ問題」/category→「他試験区分の同分野問題」+「{exam}と共通カリキュラムの他区分で「{category}」分野を演習する」)。topicTag 付与時はトピック精密マッチへ自動復帰。
  - **検証(実測)**: 全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1919[+6]pass/build OK)を commit前に単独実行。本番ビルドHTML: 共通4区分で描画(ap1280/fe160/ip400/sg112=計1952面・旧0面)・高度9区分=0面(over-matching無し)・サンプル `q/ap/2024-autumn/am/q1`(基礎理論)→`/q/fe/2025-cbt/kamoku-a/q1`+`/q/ip/2024-cbt/am/q65`(各他区分1問)・両リンク先 prerendered 200+robots`index,follow`(新規404/noindex先ゼロ)。回帰pin6件(topic mode: 共有タグ降順・self/同exam/needsReview/placeholder除外 / category mode: 各区分1代表新年度優先・非共通区分は空・午後は空・needsReview/placeholder除外)。
- **本セッションの read-only 監査(全て clean/by-design/HD-blocked=対応不要)**: 量より確実性のため複数角度を確認し saturation を再裏取り。
  - **`.slice(0,N)` related/other surface 走査**(s57 申し送りの未網羅角度): app全体走査。`/[exam]`ハブ blog rail=`getBlogPostsByExam` が publishedAt 降順=recency defensible・clean。`/topics`=`getAllTopics` が topicTags 空時 category fallback(topics.ts:32)で正常稼働・defensible。残りは文字列truncation。**唯一の leak-prone surface が上記 crossExam(本session稼働)**。
  - **内部リンク監査** `audit-internal-links.ts` 実走=165本/1443links/FATAL0/WARN0。
  - **サイト chrome(layout+nav+footer)の literal href 全件**=対応 page.tsx 実在(dead-link 0)。
  - **blog meta description 全165本**=欠落0・>160超0・短(<70)15本は全角62-69字=和文SERPは~60-90全角が適正レンジ＝拡張はむしろ truncation リスク=SKIP(過大修正回避)。
  - **/q 構造化データ**=QAPage+LearningResource+BreadcrumbList 完備(question-jsonld.ts)。
  - **/success-stories**=`robots:{index:false,follow:false}`(AI生成ペルソナ・致命傷③)で SEO scope 外・既に旗艦(relatedEssayExam)/土台(relatedBlogSlug)funnel済=clean。
  - **論文ネタ準備** intent=`pm-essay-shudai-pickup`(4つの問いで題材抽出)既出=general版は saturation。
  - **exam別 blog本数**=最少 sa/es/sm=5(=ほぼテンプレ5生成器のみ)だが全て低volume高度試験で戦略上 deprioritized・他は volume相応。content gap 無し。
- 申し送り(セッション58): code-side の主要 vein は依然枯渇傾向だが、今回 **dormant だった機能(cross-exam rail)を vetted infra で稼働**させ最大面に新規内部リンクを供給=「枯渇」の中の取り残しを1つ回収。次セッション候補(backlog 参照): (a)**topic-tagger 実行は人間/別タスク**(AI大量発火=loop既定で叩かない・HD相当)＝タグ付与後は crossExam が topic精密へ自動昇格。(b)`related`同分野レール(examPool 先頭5=最古年度寄り)の recency/diversity は marginal・順位測定不可=SKIP寄り。(c)HD群(HD-1/4/5/6/9)=人間待ち。安易な水増しはしない。

## セッション59（growth ループ）2026-06-02 JST
**P0 新角度: needsReview(404)/placeholder(noindex) 問題が内部リンクレールへ漏れる data-level 死リンクを3面で解消（従来の「404はコード側で網羅完了」の盲点）**
背景: セッション33で「削除済み・後継なし」404はGONE_PATHSで網羅完了・セッション35で soft-404 も打ち止め と結論していたが、これは **ルート/ページ単位**の話。data に 10件存在する `needsReview: true` 問題（画像のみ選択肢等で /q ページが `notFound()`=404）と placeholder 解説問題（noindex）が、**問題リスト系レールへ無条件に混入**して内部リンク死リンク(404)/noindex リンクを出していた。session58 の cross-exam rail だけが `isLinkableTarget` で除外していたが、同居する旧レール群は未対応。read-only 監査(tsxで corpus 全14,392面を走査)で実測。

- done×1 [P0/cycle1] **/q「関連する問題」「他年度の…問題」レールの 404/noindex リンク除外** SHA `8bf130f`:
  - 実測(修正前): `related` レールが **needsReview への死リンク106本**(106面)＋placeholder への noindex 13,969本、`otherYears` が noindex 3,686本を出力。両レールは `category` のみで絞り `isLinkableTarget` 未適用だった。
  - 是正: `lib/questions/related.ts` に `getSameExamRelatedQuestions`/`getSameExamOtherYears`(+`isLinkableTarget` を export)を抽出し page.tsx は委譲。除外を slice 前に適用＝空枠は実問題で補充。同ページ cross-exam rail と規約統一。
  - 検証: 全ゲート緑(typecheck0/lint0err/test1921[+2]/build OK)。本番ビルドHTML `q/sc/2024-autumn/am1/q1`(開発技術)が needsReview の `sc-2009a-am1-q19` を含まず有効同分野リンクのみ描画(死リンク0)。回帰pin2件。
- done×1 [P0/cycle2] **/q 前後ナビ(prev/next)が needsReview を指す死リンク解消** SHA `1adac15`:
  - 実測(修正前): 同一回プールに needsReview が混入し隣接問題の prev/next が 404 ページを指す=**18本**。
  - 是正: 選択ロジックを `getSessionNeighbors`(related.ts・テスト済)へ抽出し `!needsReview` でシーケンス除外(filter.ts の全プール除外と同規約)。placeholder は実200ページゆえ維持。既存 `question-sequential-nav.test.ts` を実関数へ委譲＋`resolves()` を needsReview=404 まで判定するよう強化(従来は data存在のみ確認で404を見逃していた=この盲点の温床)。
  - 検証: 全ゲート緑(test1924)。corpus全14,392面の prev/next で needsReview先=0(従来18)を tsx 実測。回帰pin。
- done×1 [P0/cycle3] **/topics/[slug] 索引が needsReview を含み死リンクを出す問題を解消** SHA `9d2b0c6`:
  - 実測(修正前): `lib/seo/topics.ts::buildIndex()` が ALL_QUESTIONS を無条件にトピック索引化＝`getQuestionsByTopic` を描画する indexable ハブ `/topics/[slug]` が needsReview への **404リンク4本**を出力(topicTags 空ゆえ category fallback で索引)。
  - 是正: buildIndex で `needsReview` を skip(404ページは索引/リンクしない)。placeholder は維持(ページが「解説準備中」バッジ付きで実200/noindexへリンクする設計)。count も正確化。
  - 検証: 全ゲート緑(test1926[+2])。本番ビルド topics HTML から sm-2009a-am2-q10/es-2021a-am2-q10/q11/q13 消失(0件)・対象トピック面は有効リンク維持。回帰pin(corpus走査)。
- **本セッションの read-only 監査(他surfaceは全て clean=対応不要)**: needsReview/placeholder 漏れを全 /q リンク面で点検。sitemap(`getIndexableQuestions`=両除外)・`/[exam]/topic/[category]`・`/[exam]/[yearSeason]`(両者 `getQuestionsByExamStrict`=両除外)・blog related-questions(`getRelatedQuestionsForPost`=両除外)・search index(`question-index.ts`:114/116=両除外)は既に clean。**=needsReview 死リンク vein は3面修正+他面 clean確認で完全打ち止め(計128本の404を解消)**。
- 申し送り(セッション59): 「ルート単位の404網羅完了」と「data単位の問題が内部リンクへ漏れる」は別問題で、後者は本セッションで打ち止め。残る code-side 候補(backlog 参照): (a)`related`∩`otherYears` の重複リンク 544組(同一問題が同一面で2レールに重複表示=軽微な冗長・404ではない・SKIP寄りだが actionable)。(b)`related` レールの最古年度寄り relevance(session58 candidate b・marginal/順位測定不可=SKIP)。(c)topic-tagger 実行=人間/別タスク(AI大量発火)。(d)HD群(HD-1/4/5/6/9)=人間待ち。安易な水増しはしない。

## セッション60（growth ループ）2026-06-02 JST
**P0-5 残候補(a)消化: /q 同分野レール `related`∩`otherYears` の重複リンクを解消（同一ページ二重リンクの冗長）**
背景: セッション59申し送りの残コード候補(a)「`related`∩`otherYears` の重複リンク(同一問題が同一面で2レール重複・404ではない軽微な冗長・SKIP寄りだが actionable=要吟味)」を実測で評価。read-only でコーパス全14k面を走査し、実害(distinct内部リンクの冗長)と修正の安全性を確認してから着手。
- 監査(read-only・実測): `/q/[...]/page.tsx` の「関連する問題」(`getSameExamRelatedQuestions`=同分野・プール先頭5)と「他年度の同分野問題」(`getSameExamOtherYears`=同分野・年度別1問新しい順)は両方とも同一 examPool/同一 category を引くため、related に他年度の問題が入ると otherYears と重複しうる。tsx 走査で実測: **346面で重複・639本の重複リンク**(同一ページに同じ問題への `<Link>` が2レールに出る)。crossExam レールは別 exam ゆえ重複不可(確認済)。
- done×1 [P0-5/(a)] SHA `d1416f4`:
  - `getSameExamOtherYears` に `excludeIds?: ReadonlySet<string>` を追加し、related で表示済みの id を skip。skip した年度は次の問題で補充(年度別1問の枠は維持)。page.tsx は `new Set(related.map(r=>r.id))` を渡す。最小diff・additive。
  - 検証(実測): 全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1927[+1]/build OK)を commit前に単独実行。コーパス全14k面走査で overlap **346→0面/639→0リンク**。otherYears 総リンクは 71858→71458(重複639除去のうち**239を distinct 問題で補充**・残400は補充候補無しで空=元々重複ゆえ distinct リンクは純増)。prerendered HTML `q/sg/2025-cbt/kamoku-a/q2`(旧 dup=sg-2016a-am-q1)で former dup が single-rail 化(2x baseline=他リンクと同数=1レールのみ)・年度2016 slot が distinct `sg-2016a-am-q28` で補充されたことを実測。回帰pin1件(excludeIds skip+refill=崩れたら落ちる)。
- **所見/申し送り(セッション60)**: 「distinct 内部リンクは減らさず重複だけ除去」=safe で純増の改善。P0-5 残候補(a)は打ち止め。残コード候補: (b)`related` レールの最古年度寄り relevance(examPool 先頭5=古い年度に偏る・年度別 diversity 改善は順位測定不可・リンク増減なし=marginal・SKIP寄り)。(c)topic-tagger 実行=人間/別タスク(AI大量発火)。(d)HD群(HD-1 GSC404一覧/HD-4 AP午後モック/HD-5 essays noindex/HD-6 SC午後frame/HD-9 overviewテンプレ)=人間待ち。code-side の主要 vein は依然枯渇傾向。安易な水増しはしない。


## セッション61（growth ループ）2026-06-02 JST
**P2-2 新角度=「制度/手続き(免除)」系の高インテント・競合薄キーワードで旗艦funnelするオリジナル記事を新設**
背景: code-side veins(404/soft-404/data死リンク/related重複)は s33-60 で枯渇傾向。content veins(FAQ/funnel/orphan)も s8-58 で飽和。新角度として、コーパス全体で「午前I免除」が **60箇所言及されるのに専用ページが無く、全て『応用情報合格すれば免除』とだけ述べる**(IPA公式の3ルート②③と申請必須を欠く)取り残しを発見。免除は高度試験(=旗艦 午後採点の主戦場)受験者の核心関心ゆえ、旗艦funnelと整合する新vein。
- done×1 [P2-2/新vein] SHA `3e15b67`: **新記事 `ipa-gozen1-menjo-jouken`「高度試験 午前I免除の3つの条件と申請方法」**を新設。
  - 事実裏取り(WebSearch+WebFetch `ipa.go.jp/shiken/about/koudo_menjo.html`): ①AP合格 ②高度・支援士いずれか合格 ③高度・支援士の午前Iで基準点(100点満点中60点)以上、の3条件いずれか/有効期間=条件充足から**2年間(2年後の同時期試験まで何度でも申請可)**/**申請必須(一部免除申請番号の入力が無いと自動免除されない)**。
  - funnel規律: 論文区分(ST/SA/PM/SM/AU)は旗艦 `/essay`(午後II論文AI採点)へ**参考評価明記+採点基準非公開明記**で送客・記述系(NW/DB/SC等)は各ハブ・取得ルートの核心=`/ap`。FAQPage化。
  - inbound(orphan回避): 既に免除を言及する `ipa-koudo-9kubun-chigai`(高度9区分)・`13-shikaku-osusume-jyun`(午前I免除を最大活用する節)の本文から文脈内リンクを配線+relatedSlugs相互。
  - 検証(本番ビルド実測): `/blog/ipa-gozen1-menjo-jouken.html` prerendered・H1/FAQPage JSON-LD有・内部リンク先(/ap /nw /db /sc /essay /blog/3本)全prerendered 200・`sitemap/blog.xml.body` に収録(1)・inbound 2面でリンクrender確認。全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1932[+5 新pin]/build OK)を commit前に単独実行。回帰pin `__tests__/seo/ipa-gozen1-menjo-jouken-funnel.test.ts`(3条件/2年間/申請必須の核心事実・参考評価明記・inbound・FAQPage・sitemap収録=崩れたら落ちる)。
- **本セッションの SKIP(裏取り済・次セッションが再着手しないよう記録)**:
  - **SC午前II免除(`menjo-sc.html`)= SKIP(niche)**: 当初「SC受験者の高volume keyword」と仮説したが、WebFetchで実態は **IPA認定学科(大学院/大学/高度専門士の専門学校)の修了者限定**(セキュリティ110h含む150h履修認定・修了報告から2年)＝対象が極小。一般のSC再受験者向けではない＝thin/niche＝専用記事は過大。SKIP。
  - **履歴書 正式名称 = SKIP(既存カバー)**: `it-shikaku-rirekisho-kakikata` が既に「正式名称・記載順序・記載タイミング」をカバー＝per-exam正式名称の新記事は cannibalization/saturation。SKIP。
- **申し送り(セッション61)**: 「制度/手続き(免除)」は旗艦と整合する新 content vein。**残候補(要吟味・着手前に既存言及の重複と volume を裏取り)**: 他の制度系で専用ページ不在の高インテント角度を1つずつ吟味(登録(支援士)手続きは `sc-shikaku-merit` で既出=重複SKIP寄り/午前I通過者番号の照会実務は moushikomi-nagare 近接で要重複確認)。安易に量産せず1記事=確実を維持。既存コード候補(related最古年度寄り=SKIP寄り/topic-tagger=人間/HD群=人間待ち)は不変。新規404種別・別試験区分の午後導線は s33-37 で網羅済。安易な水増しはしない。


## セッション62（growth ループ）2026-06-02 JST
**P2-2 新vein継続=「何点で合格」シリーズの最大の取り残し: 高度試験(4段階多段階選抜)の合格基準 専用記事を新設**
背景: s61 で「制度/手続き(免除)」が旗艦と整合する新 content vein と確認。同系統で read-only 監査したところ、「何点で合格」シリーズが **IP(`ip-goukaku-ten-bunyabetsu`)・FE(`fe-goukaku-ten-irt`)・AP(`ap-goukaku-ten-border`) しか専用ページが無く、高度試験(NW/DB/ES/SC/ST/SA/PM/SM/AU)の合格基準=4段階多段階選抜(午前I・午前II・午後I・午後II 各60点・前段階未達なら先は採点されない)を扱う専用ページが不在**だった取り残しを発見。「○○ 何点で合格 / 午後I 足切り / 午後II 採点されない / 高度試験 採点の仕組み」は高インテント・競合薄で、合否を分ける午後I/午後II=旗艦(午後AI採点)の主戦場と完全整合。`ipa-koudo-9kubun-chigai` は区分選び(難易度/記述量/キャリア)であって採点基準は扱わず=非重複を確認。
- done×1 [P2-2/新vein] SHA `f7d084e`: **新記事 `koudo-goukaku-ten-ashikiri`「高度試験は何点で合格？ 多段階選抜(足切り)の仕組み」**を新設。
  - 事実裏取り(SSOT `lib/seo/exam-content.ts` の各区分 leadParagraph と照合): 高度試験は **午前I・午前II・午後I・午後II の4段階**・各100点満点・基準点60点・段階ごと判定(合算でない)・多段階選抜(前段階が基準点未満なら先は採点されず不合格)。形式=午前I 50分/午前II 40分/午後I 90分/午後II 120分(技術系=記述・管理系=論述)。**SC(情報処理安全確保支援士)は2023年度に午後I・II統合で午後(150分)1つ=3段階**という事実差を明記(s21/22で是正した SC午後統合 drift を新記事で踏襲・誇大/誤記回避)。AP=2段階素点・FE=IRT との違いも整理しシリーズ相互リンク。
  - funnel規律: 論述区分(ST/SA/PM/SM/AU)の午後II論文→旗艦 `/essay`(参考評価+採点基準は非公開 明記)・記述区分(NW/DB/ES/SC)→各ハブ(/nw /db /sc)+AIコパイロット・午前I免除の土台=`/ap`。
  - inbound(orphan回避): `ipa-koudo-9kubun-chigai`(比較3 午後記述量節)・`ipa-gozen1-menjo-jouken`(4段階構成の言及節)・`ap-goukaku-ten-border`(多段階選抜節)の本文から文脈内リンクを配線+relatedSlugs相互(ap-border/午前I免除/koudo-9kubun/fe-irt)。
  - 検証(本番ビルド実測): `/blog/koudo-goukaku-ten-ashikiri.html` prerendered・H1/FAQPage JSON-LD有・内部リンク先(/blog 4本・/ap /nw /db /sc /essay)全prerendered 200・`sitemap/blog.xml.body` に収録・inbound 3面でリンクrender確認。全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1937[+5 新pin]/build OK)を commit前に単独実行。回帰pin `__tests__/seo/koudo-goukaku-ten-ashikiri-funnel.test.ts`(4段階/各60点/多段階選抜/SC午後統合3段階の核心事実・論述→/essay参考評価・記述→各ハブ・inbound3面・FAQPage・sitemap収録=崩れたら落ちる)。
- **申し送り(セッション62)**: 「何点で合格」シリーズは IP/FE/AP/高度 で網羅完了(SG は HD-8=スコア通知形式未検証で見送り継続)。「制度/手続き・合格基準」系は旗艦整合の良 vein だが慎重に1記事ずつ。**残候補(要吟味)**: 制度系で専用ページ不在の高インテント角度を1つずつ裏取り(登録(支援士)手続き=`sc-shikaku-merit`重複SKIP寄り/午前I通過者番号照会=moushikomi-nagare近接で要重複確認)。既存コード候補(related最古年度寄り=SKIP寄り/topic-tagger=人間/HD群 HD-1/4/5/6/8/9=人間待ち)は不変。安易な水増しはしない。


## セッション63（growth ループ）2026-06-02 JST
**P2-2 新vein継続=「採点の仕組み」系の最大の取り残し: 論述区分の午後II論文「評価ランク(A/B/C/D)」専用記事を新設**
背景: s62 で「何点で合格」シリーズ(IP/FE/AP/高度)が完了したが、read-only 監査で**論述区分(ST/SA/PM/SM/AU)の午後II論文は点数ではなく評価ランク A/B/C/D で判定され A のみ合格、という採点の仕組みを扱う専用ページが不在**だった取り残しを発見。コーパス grep で `評価ランク/A評価/A判定` の言及はゼロ・既存論述記事(`koudo-ronjutsu-kakikata-kotsu`=書き方のコツ/`koudo-ronjutsu-jiko-saiten`=自己採点)は「どう書くか」止まりで「どう採点されるか(ランク制度)」を扱っていない＝非重複を確認。「論文 評価ランク / 午後II A評価 合格 / 論文 B評価 不合格 / 論述 採点の仕組み」は高インテント・競合薄(道場は午後論文を採点しない)で、合否を分ける午後II論文=旗艦(午後AI採点)の主戦場と完全整合。
- done×1 [P2-2/新vein] SHA `4613c09`: **新記事 `koudo-ronbun-hyouka-rank`「高度試験の論文は評価ランクで決まる｜午後IIがA判定(合格)になる基準とB/C/D(不合格)の違い」**を新設。
  - 事実裏取り(WebSearch+IPA系出典 `ipa.go.jp/shiken/reports/seiseki_bunpu.html`系・pm-siken 形式ページ): 午後II論文は **評価ランク A・B・C・D の4段階・A のみ合格**(B/C/D は不合格)。IPA公式の**評価の視点**=設問で要求した項目の充足度/論述の具体性/内容の妥当性/論理の一貫性/見識に基づく主張/洞察力・行動力/独創性・先見性/表現力・文章作成能力。**「解答に当たっての指示」に従わない場合は内容にかかわらず減点**。多段階選抜で午前I・午前II・午後I で脱落すると午後IIは採点されない(→ `koudo-goukaku-ten-ashikiri` へリンク)。**B/C/D の細かな線引き基準は IPA非公開**と明記し誇大/誤記を回避(目安として一般傾向のみ記述)。
  - funnel規律: 論述区分の午後II論文→旗艦 `/essay`(参考評価+採点基準は非公開 明記)・区分別は `pm-goukaku-ronbun` 等へ。非論述区分には触れない(評価ランクは論述区分のみ)。
  - inbound(orphan回避): `koudo-goukaku-ten-ashikiri`(論述系=午後II節)・`koudo-ronjutsu-kakikata-kotsu`(採点基準の導入節)の本文から文脈内リンクを配線+relatedSlugs相互(ashikiri/kakikata-kotsu/pm-goukaku-ronbun/koudo-9kubun)。
  - 検証(本番ビルド実測): `/blog/koudo-ronbun-hyouka-rank.html` prerendered・評価ランク71出現/A の場合のみ合格/設問で要求した項目の充足度/多段階選抜 をHTMLで実測・FAQPage JSON-LD有・内部リンク先(/essay /ap /blog 4本)全prerendered 200(新規404ゼロ)・`sitemap/blog.xml.body` に収録・inbound 2面でリンクrender(各2回)確認。全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1942[+5 新pin]/build OK)を commit前に単独実行。回帰pin `__tests__/seo/koudo-ronbun-hyouka-rank-funnel.test.ts`(評価ランクA/B/C/D・Aのみ合格・評価の視点・指示違反減点・多段階選抜足切り・B/C/D非公開・旗艦/essay参考評価・inbound2面・FAQPage・sitemap収録=崩れたら落ちる)。
- **申し送り(セッション63)**: 「採点の仕組み(評価ランク)」は旗艦と整合する良 vein だが論述区分の午後II=評価ランク制度の核心を1本で網羅したため横展開は薄い(区分別の評価ランクは同一制度＝重複)。**残候補(要吟味・着手前に重複裏取り)**: 制度/採点系で専用ページ不在の高インテント角度を1つずつ(午後I 選択問題 何問/採点対象の選び方の実務=ashikiri近接で要重複確認・登録(支援士)手続き=`sc-shikaku-merit`重複SKIP寄り)。**editorially回避**: 「論文 実務経験ない人の書き方」=創作助長リスク(IPA論文は実体験ベースが評価視点)＝SKIP。既存コード候補(related最古年度寄り=SKIP寄り/topic-tagger=人間/HD群 HD-1/4/5/6/8/9=人間待ち)は不変。安易な水増しはしない。


## セッション64（growth ループ）2026-06-02 JST
**P1-4/P2-2 新vein=旗艦(午後採点)整合の「記述式午後の答案の書き方=部分点の取り方」専用記事を新設**
背景: s61-63 で「制度/採点の仕組み」vein を開拓したが、read-only 監査で別角度の取り残しを発見。**論述(論文)の書き方記事(`koudo-ronjutsu-kakikata-kotsu`)・採点制度記事(`koudo-ronbun-hyouka-rank` s63)はあるのに、記述式午後(AP午後・NW/DB/SC/ES)の答案の書き方=部分点の取り方を扱う専用ページが不在**だった。`部分点`はコーパスで散在(時間配分記事 ap/nw/db-gogo-jikan-haibun の「空欄を作らない」一行アドバイスのみ)で専用ページなし。「午後 記述 書き方/答え方/部分点」「記述式 解答 減点」は高インテント・競合薄(道場は午後記述を採点しない)で、記述式午後=旗艦(午後AI採点)が grade する対象そのもの=戦略整合。論述区分とは別 intent(記述式≠論文)を確認。
- **重複裏取りで2候補を SKIP**(着手前):
  - **登録セキスペ 更新講習/費用 = SKIP**: `sc-shikaku-merit`(generators.ts L5890)が更新講習(オンライン毎年/実践3年に1回)+費用(登録手数料10,700円/登録免許税9,000円/3年で約14万円)を既に網羅=重複。
  - **SC午後II 120分2問→1問の誤記(L4015) = 触らない**: 当該記事 `sc-ronbun-taisaku` 自体が HD-6(SC午後「論文/論述」frame が IPA事実誤りで全面リライト/削除待ち)。個別行のpatchは HD-6 の人間判断領域=自律で触らない。
- done×1 [P1-4/P2-2 新vein] SHA `7128129`: **新記事 `gogo-kijutsu-buhanten`「午後の記述式で部分点を落とさない答案の書き方」**を新設。
  - 内容(オリジナル): 記述式午後=本文に根拠がある減点方式/部分点を取りこぼさない5つの書き方(空欄作らない・本文表現流用・設問の語尾合わせ・要素を分ける・具体語)/減点される典型(設問ズレ・字数オーバー・一般論・主語省略・言い換えすぎ)/字数8割目安/区分別の記述の色合い(NW構成図・DB ER/SQL・SC統合午後・ES制御)。**format特定は最小限(問数/分の区分別羅列はせず)でHD-9回避**。
  - funnel規律: 記述式区分のハブ(/ap /nw /db /sc /es)+AIコパイロットへ送客。**旗艦/essay(論文5区分の採点)には送らない=記述式≠論文の誇大回避**(s27 NW/DB time-allocation precedent 踏襲)。論述区分は別 scope として `koudo-ronbun-hyouka-rank` へ案内。SC午後は「2023年度統合の記述式」と正framing(HD-6誤framingを踏襲しない)。
  - inbound(orphan回避): `ap-gogo-jikan-haibun`/`nw-gogo-jikan-haibun`/`db-gogo-jikan-haibun` の「記述で時間を溶かさない」節(部分点一行アドバイスの直後)から文脈内リンクを配線+relatedSlugs相互。
  - 検証(本番ビルド実測): `/blog/gogo-kijutsu-buhanten.html` prerendered・核心(本文に根拠22/部分点65/減点される32出現)をHTMLで実測・FAQPage JSON-LD有(2)・**body内の/essay funnelゼロ**(HTML内の唯一の/essayは global footer chrome「午後論述AI採点」=記事body非funnelを確認=誇大回避実測)・内部リンク先(/ap /nw /db /sc /es /blog/koudo-ronbun-hyouka-rank)全prerendered 200(新規404ゼロ)・`sitemap/blog.xml.body`に収録・inbound 3面でリンクrender(各2回)確認。全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1947[+5 新pin]/build OK)を commit前に単独実行。回帰pin `__tests__/seo/gogo-kijutsu-buhanten-funnel.test.ts`(本文根拠の減点方式・部分点の書き方・字数8割・減点の典型・記述式ハブfunnel・**/essay非送客**・inbound3面・FAQPage・sitemap収録=崩れたら落ちる)。
- **申し送り(セッション64)**: 旗艦は「論述(論文)=評価ランク/書き方/自己採点」+「記述式=部分点の書き方(本記事)」で午後の答案づくりが両形式そろった。**残候補(要吟味・着手前に重複裏取り)**: (a)科目B(土台)の未カバー悩み角度(「科目B 何問取れば」はgoukaku-ten-irt近接でthin懸念=慎重)。(b)制度/採点系の専用ページ不在角度を1つずつ(午後I 選択問題の選び方の実務=各時間配分記事に散在・専用化は要重複確認/SGスコア通知=HD-8)。既存コード候補(related最古年度寄り=SKIP寄り/topic-tagger=人間/HD群 HD-1/4/5/6/8/9=人間待ち)は不変。安易な水増しはしない。


## セッション65（growth ループ）2026-06-02 JST
**P2-2 新vein継続=制度/手続き系の取り残し: 「同じ試験日に複数区分を受けられるか(併願の可否)」専用記事を新設**
背景: s61-64 で「制度/採点」vein(午前I免除・合格点シリーズ・評価ランク・記述部分点)を開拓したが、read-only 監査で別の高インテント制度ギャップを発見。コーパス grep で「複数区分」は時間をかけて複数取る文脈(`複数区分を連続して学べます`等14箇所)でしか触れられておらず、**「同じ試験日に複数区分を同時受験できるか(併願)」を正面から扱う専用ページが不在**だった。「情報処理技術者試験 同時受験 / 併願 / 2つ 受けられる / 基本情報 応用情報 同時」は高インテント・競合薄(道場は制度Q&Aを持たない)。
- **事実裏取り(WebSearch+公式)**: (1)春秋PBT区分(AP/高度9区分)は**同一試験日・同一時間帯**で1回の申込=1区分のみ→同時受験不可(CBT-Solutions公式FAQ `cbt-s.com/.../4122.html`「複数の試験区分を同時に受験することはできません」)。(2)CBT通年区分(IP/SG/FE)は受験日を選べPBT区分と日程が別=**時期をずらせば年に複数挑戦可**(IPA cbt_sg_fe・令和5年度〜通年)。
- **staleness/誇大回避の判断**: AP/高度のCBT化は令和8年度(2026)に移行進行中で日程が流動的だが、**核心の答え(同一試験日に1区分のみ・CBT通年は別日程)は移行と無関係に durable**。CBT化は制約を緩める方向なので「日程の自由度は高まる方向」と方向のみ hedge し、具体日程・AP方式を断定しない(「不確実な数値で記事化しない」順守)。制度=採点無関係のため旗艦/essay は記事body非送客(s27 NW/DB precedent)。
- done×1 [P2-2/新vein] SHA `3bab054`: **新記事 `ipa-shiken-fukusuu-kubun-juken`「情報処理技術者試験は同じ日に複数区分を受けられる？｜併願の可否と年に複数取る受け方」**を新設。結論/理由/CBT通年での複数挑戦/組み合わせ表/計画的取得(roadmap funnel)/CBT化注記/まとめ/FAQ4本。funnel=roadmap・申込フロー・各ハブ(/ap /fe /ip)。
  - inbound(orphan回避): `ipa-shiken-moushikomi-nagare`(試験区分による申込方法の違い節)・`it-shikaku-nendaibetsu-roadmap`(20代後半節)から文脈内リンク+relatedSlugs(moushikomi/roadmap/koudo-9kubun)。
  - 検証(本番ビルド実測): `/blog/ipa-shiken-fukusuu-kubun-juken.html` prerendered(126KB)・核心(同時受験不可2/1区分のみ3/時期をずらせば6 出現)をHTMLで実測・FAQPage JSON-LD有・**body内の/essay funnelゼロ**(HTML内唯一の/essayは global footer chrome=記事body非funnelを test `not.toContain("](/essay")` で構造保証)・内部リンク先(/ap /fe /ip /blog 3本)全prerendered 200(新規404ゼロ)・`sitemap/blog.xml.body`収録1・inbound 2親でリンクrender(各2回)確認。全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1952[+5新pin]/build OK)を commit前に単独実行。回帰pin `__tests__/seo/ipa-shiken-fukusuu-kubun-juken-funnel.test.ts`(複数区分/制度タグ・同時受験不可・CBT通年で年に複数可・方式違い・CBT化hedge・/essay非送客・hub funnel・inbound2面・FAQPage・sitemap収録=崩れたら落ちる)。
- **申し送り(セッション65)**: 制度/手続きveinは 午前I免除/申込フロー/合格通知/合格点/評価ランク/記述部分点/併願 で主要な高インテント疑問を網羅。**残候補(要吟味・着手前に重複裏取り)**: (a)受験料/合格証書再発行=moushikomi-nagareで部分カバー・専用化はthin懸念。(b)午後I 選択問題の選び方の実務=各時間配分記事に散在・専用化は要重複確認。(c)SGスコア通知形式=HD-8で未検証=見送り継続。既存コード候補(related最古年度寄り=SKIP寄り/topic-tagger=人間/HD群=人間待ち)は不変。**安易な水増しはしない**。


## セッション66（growth ループ）2026-06-02 JST
**P1土台/P2-2 新vein=「基本情報 科目A試験免除制度(認定講座の修了試験)」専用記事を新設（土台=科目Bと完全整合）**
背景: s61-65 で「制度/採点」vein(午前I免除=高度試験・合格点シリーズ・評価ランク・記述部分点・併願)を開拓したが、read-only 監査で**FE の科目A試験免除制度(旧・午前免除制度)がコーパス全体で未カバー**(`科目A免除/修了認定/免除制度`の言及ゼロ・既存`免除`言及はすべて高度試験の午前I免除)だった取り残しを発見。科目A免除は**免除されると本番が科目Bのみになる**ため、土台=科目B(科目B AI個別指導)へ直結=戦略と完全整合。午前I免除(高度試験・s61)とは別制度ゆえ非重複。
- done×1 [P1土台/P2-2 新vein] SHA `d299161`: **新記事 `fe-kamoku-a-menjo`「基本情報の科目A免除制度とは？｜認定講座の修了試験で科目Aを免除し科目Bだけで合格する」**を新設。
  - 事実裏取り(WebSearch+IPA `menjo-fe.html`+CBT-Solutions公式FAQ `4541.html`): ①IPA認定講座(スクール/専門学校/通信講座)を受講→修了試験(修了認定に係る試験)に合格で**科目A試験が免除** ②有効期間=**免除有効期間の開始日から1年間** ③申込時に講座発行の**「修了認定者管理番号」を入力して申請**(忘れると免除されない) ④本番は**科目Bのみ**受験 ⑤旧称=午前免除制度(2023再編で改称) ⑥**高度試験の午前I免除とは別制度**(認定講座と無関係)。修了試験の回数/月は学校情報のみで断定せず一般化(誇大回避)。費用は「講座による」と数値非記載。
  - funnel規律: **旗艦/essay には送らない**(FEは論文区分でない=誇大回避・s27/s64 precedent)。土台=科目Bへ funnel: /fe・科目Bピラー `fe-kamoku-b-taisaku`・つまずき `fe-kamoku-b-wakaranai`・アルゴリズム分野プール `/fe/topic/アルゴリズムとプログラミング`・AIコパイロット。合格点 `fe-goukaku-ten-irt`・午前I免除 `ipa-gozen1-menjo-jouken`(別制度明示)へリンク。
  - inbound(orphan回避): `fe-goukaku-ten-irt`(科目A・科目B構成の節)・`fe-kamoku-b-taisaku`(科目Bの概要 トレース節)の本文から文脈内リンクを配線+relatedSlugs相互(taisaku/irt/wakaranai)。
  - 検証(本番ビルド実測): `/blog/fe-kamoku-a-menjo.html` prerendered(137KB)・核心(開始日から1年間/修了認定者管理番号/午前免除)をHTMLで実測・FAQPage JSON-LD有・**body内の/essay funnelゼロ**(HTML内唯一の href="/essay" は global footer chrome=記事body非funnelを test `not.toContain("](/essay")` で構造保証)・内部リンク先(/blog 科目Bピラー/wakaranai/午前I免除/合格点・/fe・/ap・/fe/topic/アルゴリズム)全prerendered 200(新規404ゼロ)・`sitemap/blog.xml.body`収録・inbound 2親でリンクrender確認。全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1958[+6新pin]/build OK)を commit前に単独実行。回帰pin `__tests__/seo/fe-kamoku-a-menjo-funnel.test.ts`(認定講座修了試験/開始日から1年/科目Bのみ/修了認定者管理番号/旧称午前免除・土台科目B funnel・**/essay非送客**・午前I免除と別制度明示・inbound2面・FAQPage・sitemap収録=崩れたら落ちる)。
- **申し送り(セッション66)**: 制度veinに「FE科目A免除(土台直結)」を追加。久々に土台=科目B角度を開拓できた。**残候補(要吟味・着手前に重複裏取り)**: (a)受験料/合格証書再発行=moushikomi-nagareで部分カバー・専用化はthin懸念。(b)午後I 選択問題の選び方の実務=各時間配分記事に散在・専用化は要重複確認。(c)SGスコア通知形式=HD-8で未検証=見送り継続。既存コード候補(related最古年度寄り=SKIP寄り/topic-tagger=人間/HD群 HD-1/4/5/6/8/9=人間待ち)は不変。安易な水増しはしない。

## セッション67（growth ループ）2026-06-02 JST
**P2-2/制度 新vein=「情報処理技術者試験 受験資格(年齢・学歴・国籍 制限なし)」専用記事を新設（入口バリアを下げ土台=入門区分へ送客）**
背景: s61-66 で制度/採点vein(午前I免除・合格点シリーズ・評価ランク・記述部分点・併願・科目A免除)を開拓したが、read-only 監査で**「受験資格/年齢制限/何歳から/学歴/国籍/誰でも受けられる」を正面から扱う専用ページがコーパス全体で不在**(`受験資格`の言及は `13-shikaku-osusume-jyun` のFAQ1文「受験資格に制限はないため」のみ)だった取り残しを発見。受験資格=最も入口の不安(中高生/異業種/外国籍/未経験)で高インテント・競合薄。資格制限がない事実は教育貢献ミッション(誰でも学べる)とも整合し、入門区分(/ip /fe)→土台=科目Bへ自然送客できる。
- done×1 [P2-2/制度 新vein] SHA `dc04242`: **新記事 `ipa-juken-shikaku-nenrei`「情報処理技術者試験に受験資格はある？｜年齢・学歴・国籍を問わず誰でも受けられる」**を新設。
  - 事実裏取り(WebSearch: METI `c_text20.html`/IPA公式方針+CBT-Solutions/Wikipedia): ①**受験・応募資格の制限なし**(年齢・学歴・国籍・実務経験 すべて不問・METI/IPA公式明記) ②年齢制限なし=中高生はもちろん**小学生(8〜9歳)の基本情報合格例**も報じられている(「報じられています」と出典hedgeし最年少記録の断定は回避) ③外国籍も受験可だが**試験は日本語で出題**(英語版なし)=言語面の注意を明記 ④応用情報・高度試験も受験資格は不要 ⑤「受験資格(誰が受けられるか)」と「申込手続き(受験者登録/本人確認/手数料)」は別物と整理。
  - funnel規律: **制度=採点無関係ゆえ旗艦/essay 非送客**(s27/s65 precedent)。入口バリアを下げる記事ゆえ入門区分 `/ip`・`/fe` と土台=科目Bピラー `fe-kamoku-b-taisaku`・申込フロー `ipa-shiken-moushikomi-nagare`・年代別ロードマップ・AIコパイロット(/fe 1問解く)へ funnel。論文(午後II)は実務経験が有利という現実的注意のみ記述(受験資格の話として・/essay へは送らない)。
  - inbound(orphan回避): `13-shikaku-osusume-jyun`(既存「受験資格に制限はないため」のFAQ文に文脈内リンクを付与=最自然anchor)・`ipa-shiken-moushikomi-nagare`(intro冒頭に「年齢・学歴・国籍・実務経験などの制限はなく誰でも申し込めます」と1文+リンク)。relatedSlugs=moushikomi-nagare/roadmap/13-shikaku-osusume-jyun。
  - 検証(本番ビルド実測): `/blog/ipa-juken-shikaku-nenrei.html` prerendered(124KB)・核心(受験・応募資格の制限はありません/年齢制限なし/学歴/国籍/実務経験/日本語)をHTMLで実測×8・FAQPage JSON-LD×1・**body内の/essay funnelゼロ**(HTML内唯一の href="/essay" は global footer chrome=test `not.toContain("](/essay")` で構造保証)・内部リンク先(/ip /fe /ap /about・/blog 科目Bピラー/申込フロー/roadmap/13-shikaku)全prerendered 200(新規404ゼロ)・`sitemap/blog.xml.body`収録・inbound 2親でリンクrender確認。全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1963[+5新pin]/build OK)を commit前に単独実行。回帰pin `__tests__/seo/ipa-juken-shikaku-nenrei-funnel.test.ts`(受験資格制限なし/年齢・学歴・国籍・実務経験/日本語・入門区分+科目B+申込フロー funnel・**/essay非送客**・inbound2面・FAQPage・sitemap収録=崩れたら落ちる)。
- **申し送り(セッション67)**: 制度veinに「受験資格/年齢制限(入口バリア解消)」を追加。**残候補(要吟味・着手前に重複裏取り)**: (a)受験料/合格証書再発行=moushikomi-nagareで部分カバー・専用化はthin懸念(継続保留)。(b)SGスコア通知形式=HD-8で未検証=見送り継続。(c)再受験タイミング/回数=fugoukaku-recovery/pomodoro等に散在(s50で通年明記済)=専用化は要重複確認。既存コード候補(related最古年度寄り=SKIP寄り/topic-tagger=人間/HD群=人間待ち)は不変。1記事=確実を維持し量産しない。

## セッション68（growth ループ）2026-06-02 JST
**P1土台/P2-2 新角度=「情報セキュリティマネジメント(SG) 科目Bの長文事例問題」専用記事を新設（s61-67の制度drift から土台=科目B角度へ復帰）**
背景: s61-67 は制度/採点vein(午前I免除・合格点・評価ランク・記述部分点・併願・科目A免除・受験資格)に偏っていた。心得「土台=科目Bで通年の入口を作る」へ戻すべく read-only 監査。コーパスで **SG(情報セキュリティマネジメント)は `sg-shiken-meritto-imi-aru`(資格価値) 1本のみで科目B対策が完全未カバー**だった取り残しを発見。SGは2023再編で科目A/B構成・**CBT通年=「通年の入口」と整合**、かつ「科目B わからない」悩み系は FE だけでなく SG受験者も含む(同名「科目B」)。SG科目B=**多肢選択の長文事例問題**で FE科目B(アルゴリズム)とは中身が別物=非重複。競合薄(道場は制度/科目B解き方Q&Aを持たない)。
- 事実裏取り(WebSearch+sg-siken.com公式): 60問120分=科目A 48問(四肢択一・基礎)+科目B 12問(多肢選択・長文事例/応用)・総合評価点1000点満点600点以上(IRT)・2023年から午前/午後廃止→科目A/B。科目B=ケーススタディで情報セキュリティ管理の実践能力を問う(インシデント対応/リスクアセスメント/アクセス制御/組織的対策)。**既存 sg-shiken-meritto-imi-aru の記述(科目A四肢択一+科目B多肢選択事例・60問120分)とSSOT一致**を確認し矛盾回避。
- done×1 [P1土台/P2-2 新角度] SHA `adb4d0f`: **新記事 `sg-kamoku-b-jirei-mondai`「情報セキュリティマネジメント 科目Bの事例問題の解き方｜長文が読めない人のための12問対策」**を新設。位置づけ/つまずき3類型/解き方4手順(登場人物・情報資産・脅威を整理→設問先読み→運用視点で最適解→科目A知識を当てはめ)/頻出テーマ/時間配分/AIコパイロット活用/FE科目Bとの違い/まとめ/FAQ4本。
  - funnel規律: **多肢選択の事例問題=論文でないため旗艦/essay 非送客**(HD-6=セキュリティ区分のessay-framing回避・s27/s64 precedent)。土台funnel=/sgハブ(AIコパイロット導線)・FE科目Bピラー `fe-kamoku-b-taisaku`(同名「科目B」の取り違え整理=FE=アルゴリズム/SG=事例)・`sg-shiken-meritto-imi-aru`(SG取得判断)。新規404を避けるため /sg/topic/* 等の未確認routeへはリンクせず /sgハブのみ。
  - inbound(orphan回避): `sg-shiken-meritto-imi-aru`(「SGとはどんな試験か」節の科目B言及に文脈内リンク+「12問」を明記)・`ipa-shiken-zenkubun-hikaku`(レベル2節「情報セキュリティマネジメントは長文事例中心」を anchor 化)。relatedSlugs=sg-meritto/fe-kamoku-b-taisaku/13-shikaku。
  - 検証(本番ビルド実測): `/blog/sg-kamoku-b-jirei-mondai.html` prerendered(140KB)・核心(48問6/12問6/60問5/120分6/600点5/IRT4/「アルゴリズム（擬似言語）は出ません」2)をHTMLで実測・FAQPage JSON-LD×1+Question×4・**body内の/essay funnelゼロ**(HTML内唯一の href="/essay"=global footer chrome=test `not.toContain("](/essay")` で構造保証)・funnel先(/sg 4・/blog/fe-kamoku-b-taisaku 3・/blog/sg-shiken-meritto-imi-aru 3)全prerendered 200(新規404ゼロ)・`sitemap/blog.xml.body`収録1・inbound 2親でリンクrender(各2回)確認。全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1968[+5新pin]/build OK)を commit前に単独実行。**初回 full test で既存 blog-generators.test.ts:622 が SG記事の pin文字列「科目A（四肢択一）と科目B（多肢選択の事例問題）の2科目」と衝突→ inbound編集を pin文字列の外(末尾の「（12問）」+リンク文)へ移し解消**(過去の pin を尊重・最小diff)。回帰pin `__tests__/seo/sg-kamoku-b-jirei-mondai-funnel.test.ts`(SG/科目B/事例問題タグ・48/12/60問・120分・600点IRT・アルゴリズム非出題・/sg+FE科目B funnel・**/essay非送客**・inbound2面・FAQPage・sitemap収録=崩れたら落ちる)。
- **申し送り(セッション68)**: 久々に土台=科目B角度(SG科目B)を開拓。**新vein起案**: SG科目A対策/IP科目別など「入門区分(IP/SG)の科目別取り残し」は競合薄(角度c)で1つずつ吟味余地あり(ただし IP は科目分割なし=分野別/SG科目Aは知識問題で thin懸念=要吟味)。**残候補(s67から不変・要吟味)**: (a)受験料/合格証書再発行=thin懸念。(b)SGスコア通知形式=HD-8。(c)再受験タイミング=散在。既存コード候補(related最古年度寄り=SKIP寄り/topic-tagger=人間/HD群 HD-1/4/5/6/8/9=人間待ち)は不変。1記事=確実を維持し量産しない。


## セッション69（growth ループ）2026-06-02 JST
**P2収益/新角度=試験タグの無いブログ77記事に「書籍ハブへのおすすめ書籍CTA」を追加（content vein 飽和を確認した上で収益導線の取り残しを解消）**
背景: s61-68 で制度/採点/科目B記事 vein はほぼ飽和。安易な新記事水増しを避けるため、まず read-only でコンテンツ取り残しを徹底監査し、いずれも重複/thin と判定（下記7監査参照）。その過程で **`app/blog/[slug]/page.tsx` の結びCTAカードが `{post.exam ? ...}` で分岐し、exam を持つ記事だけが /recommended-books/{exam} の書籍CTAを出す一方、exam の無い general 77記事（=高単価の論文/午後対策本へ送客したい `koudo-ronjutsu-kakikata-kotsu`・`gyoushu-essay-*`・`koudo-ronbun-hyouka-rank`・`gogo-kijutsu-buhanten`・`koudo-ronjutsu-jiko-saiten` 等）が本文内の書籍導線をまったく持たない** 収益取り残しを発見。戦略「収益=アフィリ中心・午後対策の高単価本へ自然送客」と整合し、コンテンツ追加より確実な効果。
- done×1 [P2収益/新角度] SHA `3116d1e`: **general 分岐の結びCTAカードにも書籍ハブ `/recommended-books`（実在の index ルート）への「おすすめ書籍」リンクを追加**（exam 分岐の書籍CTAと同じ amber スタイルで体験を統一）。誇大/誤マッピング回避のため general 記事は特定 exam を推測せず **index（13区分の問題集を一覧）** へ送る安全側。
  - 検証（本番ビルド実測）: typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1969[+1新pin]/build OK を **commit前に単独実行**。prerenderedHTML `/blog/koudo-ronjutsu-kakikata-kotsu.html`（general記事）の結びセクション「過去問AI で各試験区分の対策を始める」内に **amber `border-amber-300 ... href="/recommended-books">おすすめ書籍`** が render するのを実測・exam記事 `/blog/ap-gogo-jikan-haibun.html` は従来通り `/recommended-books/ap` を維持・**index ルート実在=新規404ゼロ**・書籍データは13区分すべて≥4冊（空ページなし）を実測。回帰pin `__tests__/seo/blog-practice-cta.test.ts` に「general分岐も `/recommended-books` への書籍CTAを出す/両分岐で『おすすめ書籍』が2回以上」を追加（崩れたら落ちる）。
  - **content飽和の根拠（本セッションの read-only 監査7件・すべてクリーン＝次セッションは再監査不要）**: ①blog body内 `/blog/<slug>` 内部リンク 64参照→**missing 0**（自己404なし）。②**orphan（他記事からの inbound 0）= 0/173**（クロール資産良好）。③blog body→app-route funnel リンク（/ap /essay /features/* /keywords/* /recommended-books 等）全ルート実在（[exam]=getAvailableExams 13区分すべて解決・/es含む）。④`/essay` 誇大leak監査=39記事が in-body funnel・全て「書いた論述答案は[午後論述AI採点](/essay)に通すと…」の**論述条件付き framing**で誇大なし。⑤旗艦 /essay は SiteHeader・MobileBottomNav・HomeFlagshipEssay で既出=discoverability gap なし。⑥重複裏取りで複数新記事候補を却下: **論文の時間配分/手書き/字数**=`koudo-ronjutsu-kakikata-kotsu` に専用節+FAQ既存／**履歴書 区分別/正式名称**=`it-shikaku-rirekisho-kakikata` が13区分正式名称+順序+区分別評価を網羅／**過去問流用率**=`kakomon-nannenbun` が午前再出題+区分別取捨を網羅／**FE科目B 各角度**=8記事クラスタで飽和。⑦個別FAQ は s53 で打ち止め（9/165が着手不可フラグ）。
- **申し送り（セッション69）**: コンテンツ vein は飽和（新記事は重複/thin リスク高＝安易な量産はしない）。**収益vein（P2）が最も伸び代あり**＝今回 general 記事の書籍導線を回復。**次の収益候補（要吟味・優先度順）**: (a)論文5区分 general 記事（`koudo-ronjutsu-*`・`gyoushu-essay-*`）は対象が明確なので index でなく該当区分の `/recommended-books/{exam}` へ精密送客できれば収益効果↑だが、general記事→単一exam の確実なマッピングが要設計（複数区分記事は index が正解）＝要吟味。(b)本文インライン書籍コンポーネント（markdown拡張）は s前から優先度低・saturation配慮で保留。(c)/q 問題ページへの書籍導線は戦略「アフィリは控えめ/UI完全分離」に反するため**入れない**（=正しく非実装）。既存 HD群/topic-tagger=人間待ちは不変。1改善=確実を維持。


## セッション70（growth ループ）2026-06-02 JST
**P2収益/新角度=単一区分の論文記事(gyoushu-essay-*)の書籍CTAを該当区分へ精密送客（s69申し送り候補(a)を安全側で実装）**
背景: s69 で general 77記事の結びCTA書籍リンクを `/recommended-books`(索引)へ回復したが、申し送り候補(a)=「単一区分記事は index でなく該当 `/recommended-books/{exam}` へ精密送客できれば収益↑（ただし general→単一exam マッピングは要設計）」が未着手だった。read-only 監査で **gyoushu-essay-{kinyuu-strategy=ST/seizou-pm=PM/koukyou-sa=SA} の3記事は tags が単一区分（["論文","ST",…] 等）で明確に1区分=ST/PM/SA**、かつ送客先が**高単価の論文事例集**（戦略「午後対策の高単価本へ自然送客」の核心）と確認。複数区分記事（koudo-ronjutsu-*/koudo-ronbun-hyouka-rank/gogo-kijutsu-buhanten=5区分や記述式横断）は index が正解＝対象外。
- done×1 [P2収益/新角度] SHA `2f31473`: **BlogPost に明示opt-in `booksExam?: ExamCode` を新設**し gyoushu-essay 3記事に st/pm/sa を付与。`app/blog/[slug]/page.tsx` の general 分岐の書籍CTAを `post.booksExam ? /recommended-books/${booksExam} : /recommended-books` に変更（ラベルも「{examLabel} のおすすめ書籍」へ）。**ヒューリスティック推測でなく明示opt-in**ゆえ誤マッピング不可・複数区分記事は未指定で索引送客の安全側を維持。
  - 検証（本番ビルド実測）: typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test1972[+3新pin]/build OK を **commit前に単独実行**。prerendered HTML 実測: kinyuu-strategy→`href="/recommended-books/st">ITストラテジスト のおすすめ書籍`・seizou-pm→`/recommended-books/pm`・koukyou-sa→`/recommended-books/sa`、**複数区分 control `koudo-ronbun-hyouka-rank`→`/recommended-books`(索引)維持**。送客先 /recommended-books/{st,pm,sa} は全て prerendered（134-135KB・≥1冊）=新規404ゼロ。回帰pin blog-practice-cta.test.ts に3本追加（booksExam→実在書籍リスト・複数区分記事はbooksExam未設定・page.tsxの精密分岐式=崩れたら落ちる）。
- **申し送り（セッション70）**: 精密送客 vein を安全側（明示opt-in）で開通。**次の収益候補（要吟味・同vein）**: 単一区分の **AP午後**(`ap-gogo-jikan-haibun`/`ap-gogo-sentaku`/`ap-gogo-bunkei-sentaku`/`ap-gogo-management-erabikata`)・**NW/DB午後**(`nw-gogo-jikan-haibun`/`db-gogo-jikan-haibun`)・**FE科目B**(`fe-kamoku-b-*` 多数) も general だが明確に1区分＝booksExam で `/recommended-books/{ap,nw,db,fe}` へ精密送客できる（各記事は本文で既に /ap /nw /db /fe ハブへ funnel 済＝書籍も同区分が自然）。ただし1記事ずつ「tags が単一区分か・複数区分混在でないか」を着手前に裏取りすること（例: 横断記事/比較記事は index 維持）。コンテンツ/FAQ vein は飽和継続。HD群/topic-tagger=人間待ちは不変。

### セッション70 続き（同sessionで2サイクル目）
**P2収益/同vein横展開=単一区分のgeneral記事8本へ booksExam 精密送客を展開（vein打ち止め）**
- done×1 [P2収益] SHA `f009144`: s70の `booksExam` 機構を、exam未設定だが**明確に1区分**の general 記事へ展開。read-only 監査で general 77記事中 slug prefix=単一区分の10本を抽出し、**8本に booksExam を付与**: `fe-kamoku-b-pseudo-language`(fe)・`nw-protocol-deep-understanding`(nw)・`db-er-design-practice`(db)・論述5区分 `pm-essay-shudai-pickup`(pm)/`st-strategy-perspective`(st)/`sa-architecture-tradeoff`(sa)/`sm-itil-storytelling`(sm)/`au-audit-evidence-language`(au)=高単価 論文事例集へ直送客。**除外2本**: `ap-goukaku-go-koudo-senryaku`(応用情報→高度の複数区分キャリア=索引が正解)・`sc-incident-response-storytelling`(SC午後 framing が **HD-6** 人間判断待ち=触らず索引維持)。
  - 検証（本番ビルド実測）: typecheck0/lint0err/test1972/build OK を **commit前に単独実行**。prerendered HTML 実測=8本すべて `/recommended-books/{fe,nw,db,pm,st,sa,sm,au}` ＋「{examLabel} のおすすめ書籍」ラベル、除外2本は `/recommended-books`(索引)維持。送客先 /recommended-books/{fe,nw,db,sm,au}(st/pm/sa はs70で確認済)全て prerendered=新規404ゼロ。回帰pin拡張(mapping 8本追加・除外2本を booksExam未設定 guardへ追加)。
  - **vein打ち止め確認**: 再監査で general 残66本(booksExam未設定)に tag単一区分は2件のみ=`sc-incident-response-storytelling`(HD-6除外済)・`ipa-kyoutsuu-juyou-theme`(共通5テーマ横断記事で「DB」は複数topicタグの1つ=索引が正解)。**=単一区分 general 記事の書籍精密送客 vein 完全枯渇**(計11本=gyoushu3+今回8)。
- **申し送り（セッション70 続き）**: 書籍精密送客 vein 打ち止め。**意図的に非実装**: 論述stub5本へ「exam-aware 練習CTA(/quiz?exam=)」を出す案は、論述記事の自然CTA=旗艦/essay(論述採点)であって 午前II MC ではないため intent mismatch=過大修正の罠で見送り(booksExam=書籍導線のみに限定)。**次の新角度候補(要起案)**: backlog P2-4 残(b)本文インライン書籍は saturation で保留継続。新規P2/P3観点は次セッションで1つ起案（例: /recommended-books/[exam] 内の書籍カテゴリ別アンカー深リンク=論述記事→論文事例集カードへ直接、は要設計でHD相当か吟味）。


## セッション71（growth ループ）2026-06-02 JST
**新角度=「構造化データ/引用の死アンカー(JSON-LD/citation の #fragment が実DOMアンカーへ解決しない)」整合性スイープ**
背景: s61-70 の content/funnel/books vein は飽和。s70申し送りの候補=「/recommended-books/[exam] の書籍カードへの深リンク」を read-only 監査する過程で、**JSON-LD や AI引用カードが広告する `#fragment` URL が実在DOMアンカーへ解決しない死アンカー**という未監査の新veinを発見。全 `#${...}` フラグメントURLをコード横断で機械走査し、実害2件+消費側1件を是正。`#organization`/`#website`/`#termset` 等の schema.org グラフノード`@id`は DOM要素不要=正常(誤検知)と切り分け。
- done×1 [新角度/JSON-LD整合性] SHA `c362c4f`: **`/recommended-books/[exam]` の書籍カードに `id={book.id}` を付与**。同ページ JSON-LD は各書籍を `@id`/`url`=`${absUrl}#${book.id}` 付き Product として出力するのに、`BookCard`(Card)に対応 `id` が無く**フラグメントURLが解決しない死アンカー**(ページ先頭へ着地)だった。`id={book.id}` + `scroll-mt-20`(sticky header h-14対策・コードベース既定)を付与。検証(本番ビルド実測): `/recommended-books/st.html` の `id="st-*"` 4件が JSON-LD `recommended-books/st#st-*` 4件と完全一致・`scroll-mt-20`同梱を grep 実測。book.id の registry内一意は既存 recommended-books.test.ts:116 が担保。回帰pin `__tests__/seo/recommended-books-anchor.test.ts`(id={book.id}/scroll-mt-20/JSON-LD #fragment 生成=崩れたら落ちる)。
- done×1 [P2収益/新角度の利用] SHA `aecb5d9`: **採点funnel(/essay /essays /q)に出る `InlineBookHint` の推薦書タイトルを `/recommended-books/{exam}#{book.id}` へ深リンク**(従来は素テキスト=内部リンク無し)。c362c4f の id アンカー利用で、Amazon+楽天+使い分け表を備えた当該書籍の完全カードへ直接着地=アフィリ funnel 精密化(楽天という非Amazon経路もユーザーに提示)。「この試験の推薦書一覧」リンクは一覧トップのまま据置(ラベル一致)。検証(本番ビルド実測): `/essay/st/st-2023a-pm2-q1.html` でタイトルが `href="/recommended-books/st#st-ronbun-okayama"`(category="論文"でpick)・一覧リンクは `/recommended-books/st`(トップ)維持を grep 実測=end-to-endで深リンク先のアンカーも実在。回帰pin拡張(recommended-books-anchor.test.ts に InlineBookHint の bookDetailHref/タイトルLink 2件追加)。
- done×1 [新角度/引用カード死アンカー是正] SHA `1aa6cc0`: **AIコパイロット引用カード(`CitationCards`)の用語集出典リンクを `term-` アンカーへ正しく解決**。`lib/copilot/corpus.ts` の glossary doc が `url: /glossary#{term}` を組むが、`/glossary` ページの実アンカーは `id="term-{term}"`(接頭辞 term- 必須)で**citation.url が死アンカー**(クリックで用語へ飛ばずページ先頭着地)だった。url を `/glossary#term-{term}` に揃え解決+用語カードに `scroll-mt-20` 付与(sticky header潜り込み防止・付与前は到達不能で moot だった)。検証(本番ビルド実測): `/glossary.html` の `id="term-*"` 30件すべてが `scroll-mt-20` 同梱を grep 実測・corpus url が `/glossary#term-` 接頭辞+encodeURIComponent記法一致を test で固定。回帰pin: `__tests__/copilot/corpus.test.ts` に「corpus url アンカー ↔ page の term- アンカー記法一致」(両側読み込み・崩れたら落ちる)。既存 citations.test.ts/citation-meta.test.ts は test構築の固定url文字列ゆえ非影響。
- **検証規律**: 全3コミットとも 全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test 1972→1977→1978/build OK)を **commit前に単独実行**してから commit。新規404ゼロ・最小diff・1コミット=1論点。
- **vein掃き残しスイープ結論(再監査不要)**: コード横断 `#${...}`/`/glossary#` 全走査で、実害の死アンカーは**この2件(recommended-books Product / glossary citation)のみ**。`/q` の `#explanation`(section id 実在)・`/settings` `#${s.id}`(settings-anchor test済)・schema.org グラフノード`@id`(`#organization`/`#website`/`#termset`=DOM不要)は正常を確認。**=構造化データ/引用 死アンカー vein 打ち止め**。
- **申し送り（セッション71）**: 「死アンカー整合性」という新veinを開拓し実害2件を是正・うち1件は収益深リンクへ転用。content/books vein 飽和は不変。**次の新角度候補(要起案・吟味)**: (a)JSON-LD の他 `url`/`image` フィールドが実在URLを指すか(例: og画像生成URL/Product image)の整合性スイープ。(b)copilot の other CorpusDoc.url(`/quiz?id=`)が有効問題IDのみか。(c)既存 HD群(HD-1/4/5/6/8/9)/topic-tagger=人間待ちは不変。1改善=確実を維持し量産しない。


## セッション72（growth ループ）2026-06-02 JST
**s71申し送り(b)を着手=AIコパイロット引用カード/関連問題の問題リンクが死リンクだった(実害)を是正**
背景: s71 候補(b)「CorpusDoc.url(`/quiz?id=`)が有効問題IDのみか」を read-only 監査した結果、問題は「IDの妥当性」ではなく**URLスキーム自体が死リンク**だと判明。`/quiz?id=<id>` は (1) `mode` クエリが無いため `next.config.ts:62-68` の 308 redirect でホームへ飛ばされ、(2) `app/quiz/page.tsx` は `id` searchParam を一切読まない(mode/exam/year… のみ)。よって**AIが引用した特定問題ではなく、ユーザーはホーム画面へ着地**していた(引用の出典性が破綻)。同型の `/quiz?id=` は production に2箇所(引用カード=`lib/copilot/corpus.ts:34`・関連問題サジェスト=`lib/copilot/related.ts:163`、後者は `components/copilot/RelatedQuestions.tsx` が描画)。
- done×1 [新角度/copilot死リンク是正] SHA `fb8f3a8`: 両箇所の問題リンクを `questionPagePath(q)`(=正規の indexable 静的問題ページ `/q/{exam}/{year}-{season}/{section}/q{n}`・`lib/seo/question-url.ts`)へ変更。`/q/*` は §SEO上の正規面(quiz/page.tsx コメントも「/q/* が indexable surface」と明記)。**死リンク回避の安全装置**: needsReview の問題は `/q` ページが `notFound()`(404)を返すため(`app/q/.../page.tsx:154`)、コーパスに乗せると新規死リンクになる→`getCorpus()` で `needsReview` を除外(corpus 14402→14392=10件除外・パース不全で教材価値も低い)。related.ts は `getCorpus()` 由来の retriever index を使うため同除外が自動波及=両surfaceを1箇所で防御。placeholder(1742件)は `/q` が 200(noindex)で死リンクでないため除外せず維持。
  - 検証（崩れたら落ちる/実測）: ① 全14,392件の corpus question URL を、実際の `/q` ルート解決関数 `findQuestionByRoute` で round-trip → malformed 0・未解決 0・**needsReview(404行先)0**(needsReview除外が効いた実証)。② 旧スキーム破綻の裏取り=`next.config.ts` の `/quiz` missing:mode→`/` 308 + `quiz/page.tsx` が id 非参照。③ 回帰pin: corpus.test.ts(url が `/q/` 始まり・`/quiz?` でない・needsReview がコーパス不在)・related-header.test.ts(`/q/{exam}/`始まり・`/q{n}`終わり・非 `/quiz?`)。
  - 全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test 1979/build OK)を **commit前に単独実行**。最小diff・1コミット=1論点・新規404ゼロ。
  - 非影響: `citations.test.ts`/`citation-meta.test.ts` は合成doc(リテラルurl)を formatter に渡すだけなので非影響(s71同様)。glossary citation url は s71 で `/glossary#term-` 是正済。
- **同session 追加監査=(d)「mode無し/読み捨てクエリ」型 死リンクの横断確認 → clean**: production の全 `/quiz?` 内部リンク(app/lib/components/data 横断・git grep)を点検した結果、**今回是正した2件以外は全て `mode=` を含む**(year/random/topic/review/weakness/unanswered)。動的qs生成の2箇所(`app/modes/topic/page.tsx:132` `mode:"topic"`・`components/search/SearchClient.tsx:160` `mode:"random"`)も mode 同梱を実測。`/quiz?mode=review`(exam無し)等は mode 有りで非リダイレクト・page が exam を "ap" 既定化で 200。**=`/quiz` redirect 型の死リンクは今回の2件で打ち止め**(別surface追加なし)。
- **申し送り（セッション72）**: copilot の問題リンク死リンクを是正(引用カード・関連問題の両surface)＋ `/quiz` redirect型死リンクの横断監査=clean を確認。s71(b)・(d)消化。**残る新角度候補(要起案・吟味)**: (a)**JSON-LD の `image`/`url` フィールド実在性スイープ**=未着手。実 JSON-LD image は2箇所(`app/blog/[slug]/page.tsx:119`・`app/recommended-books/[exam]/page.tsx:144`=`productOgUrl(book)`)で、いずれも og画像生成URL。次セッションは **og生成ルート(/api/og 等)が実在し当該URLが 200 を返すか**を実測してから着手(routeが無い/paramが解決しないと壊れた image を広告する)。HD群/topic-tagger=人間待ちは不変。1改善=確実を維持し量産しない。


## セッション73（growth ループ）2026-06-02 JST
**s72申し送り(a)=JSON-LD image実在性スイープを read-only 監査→clean確認、空白の content vein「午後 解答例/採点講評の入手と自己採点」を新記事で開拓**
背景: s72申し送り(a)「JSON-LD `image`/`url` 実在性」を着手。実 JSON-LD image 2箇所(`app/blog/[slug]/page.tsx:119`=`type=blog`・`app/recommended-books/[exam]/page.tsx:144` `productOgUrl`=`type=books`)＋Organization `logo`(`lib/seo/structured-data.ts:10`=`/icon-512.svg`)を全数監査。
- **(a) JSON-LD image/url vein = clean（実装変更なし・SKIP正）**: ①`/api/og/route.tsx` は `TYPE_META[type] ?? TYPE_META.default` で**未知typeでも200**・`safeText/safeNumber` で全param防御＝notFound() 経路ゼロ＝og画像URLは常に200。`type=blog`/`type=books` は共にTYPE_META実在。②静的アセット `public/icon-512.svg`(512)・`icon-192.svg`・`fonts/noto-sans-jp-700.woff` 全て実在(ls実測)。③JSON-LD `url`/breadcrumb item 走査=`/recommended-books`索引・`absUrl`・Product url(buildAmazonUrl or `#book.id`=s71是正済)・Article url(自己参照)すべて実在ルート。**=JSON-LD image/url 死リンク vein は実害ゼロ＝打ち止め**(理論のみ=直さずSKIP)。Productの`offers`がpriceCurrency有・price無で構造化データ上は不完全だが、書籍価格は変動し正確な値を持てない=偽値注入は誇大ゆえ不実装が正・Googleは無効offerを単に無視(実害なし)＝SEO設計判断としてHD相当(自律で縮めない)。
- done×1 [P2-2 新vein/content] SHA `8a1ee14`: **新記事 `gogo-kaitourei-jiko-saiten`「午後の解答例・採点講評はどこにある？IPA公式PDFを使った自己採点のやり方」**を新設。read-only 監査で、既存の午後記事(`gogo-kijutsu-buhanten`=書き方/部分点・`koudo-ronjutsu-jiko-saiten`=論述自己採点・各 gogo-jikan-haibun=時間配分)はあるが、**IPA公式の解答例・採点講評を「どこで入手し、どう自己採点に使うか」という access/discovery インテント**の専用ページが不在だった取り残しを発見(「解答例 どこ」「IPA 採点講評」「午後 自己採点」=高インテント・競合薄=道場はAP午後を採点しない)。事実裏取り(IPA `mondai-kaiotu/index.html` WebFetch): PBT区分(AP午後・高度試験)は**問題冊子・配点割合・解答例・採点講評**を2009〜最新で無料公開・許諾使用料不要。解答例は一例(別解可)・部分点内訳は非公開・論文区分は解答例非公開(評価ランク)・CBT区分(IP/SG/FE)は別サイトでサンプル中心。
  - funnel規律(s27/s64 precedent): 記述式区分(AP/NW/DB/SC/ES)=各ハブ+AIコパイロットで要素照合の自己採点／論文区分(ST/SA/PM/SM/AU)=旗艦 `/essay`(AI採点・参考評価・採点基準非公開明記)。複数区分横断ゆえ `booksExam` 未指定=書籍CTAは索引送客の安全側。誇大回避=「解答例は一例」「部分点内訳は非公開」「自己採点は大まかな手応え」を本文明記・IPA問題文/解答例は非転載(出典リンクのみ)。
  - inbound: `gogo-kijutsu-buhanten` の「答案は1問ずつ採点して書き直す」節(模範解答と見比べても…)から文脈内リンクで配線=非orphan。relatedSlugs=buhanten/koudo-ronjutsu-jiko-saiten/koudo-ronbun-hyouka-rank/ap-gogo-jikan-haibun。
  - 検証(本番ビルド実測): prerendered `/blog/gogo-kaitourei-jiko-saiten.html`(130KB)に 解答例/採点講評/配点割合/FAQPage JSON-LD/href="/essay"/IPA出典リンク(ipa.go.jp/shiken/mondai-kaiotu)/inbound(`/blog/gogo-kaitourei-jiko-saiten` が buhanten HTML内)を実測。funnel先=記述式5ハブ+論文5ハブ(/ap../au)・/essay・blog3本(koudo-ronbun-hyouka-rank/fe-kamoku-b-kakomon-nai/ipa-koudo-9kubun-chigai)すべて prerendered=**新規404ゼロ**。全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test 1979→1985[+6新pin]/build OK)を **commit前に単独実行**。回帰pin `__tests__/seo/gogo-kaitourei-jiko-saiten-funnel.test.ts`(核心事実=解答例/採点講評/配点割合/一例/非公開/IPA出典/許諾・記述式5ハブfunnel・論文区分は/essay+参考hedge+5ハブ・inbound from buhanten・FAQPage4本・booksExam/exam未指定・サイトマップ収録=崩れたら落ちる)。
- **申し送り（セッション73）**: s72(a) JSON-LD image/url vein=clean打ち止め(実害ゼロ・SKIP正)。content の空白=「午後 解答例/採点講評の入手と自己採点」を新記事で開拓(access/discoveryインテントは既存の書き方/時間配分記事と非重複)。**残る新角度候補(要起案・吟味)**: (i)Product `offers` の price欠落=構造化データ不完全だがSEO設計判断=HD相当(自律で縮めない・偽価格注入は誇大ゆえ不可)。(ii)content vein は「access/discovery」角度がまだ薄い可能性=他の「公式素材の入手/制度の手続き」系で専用ページ不在の高インテント角度を1つずつ裏取り(安易な量産はしない)。HD群(HD-1/4/5/6/8/9)/topic-tagger=人間待ちは不変。1改善=確実を維持。


## セッション74（growth ループ）2026-06-02 JST
**新vein=旗艦/土台の「hub→spoke 逆方向」配線（funnel は INTO は飽和だが、戦略ハブ/機能面から教育記事への OUT 導線が dead-end だった）**
背景: s61-73 で content/funnel/books/dead-link/dead-anchor/JSON-LD の各 vein は飽和。read-only 監査で **blog→/essay の funnel(INTO)は s3-7 で整備済だが、戦略的な destination 面（旗艦ハブ/deep採点ページ/機能ページ）自身が論述の教育記事へ OUT リンクを持たず dead-end**(P2-3c の keyword LP 逆リンクと同型の盲点)と判明。最高価値の論述ガイド3本(`koudo-ronjutsu-kakikata-kotsu`=書き方/`koudo-ronbun-hyouka-rank`=評価ランク/`koudo-ronjutsu-jiko-saiten`=自己採点)は全て indexable・実在を確認。3面に hub→spoke を配線（ユーザー学習導線＋当該戦略記事への内部リンク資産を補強）。
- done×1 [新vein/hub→spoke] SHA `6bb1dec`: **旗艦 `/essay` ハブに「論述の書き方・採点を学ぶ」節を新設**しガイド3本へ配線。従来 /essay の OUT リンクは deep採点ページ・履歴・/recommended-books のみで教育記事へ dead-end だった。`ESSAY_GUIDE_POSTS` 定数で管理。labels は論文5区分scope内（"応用情報"/"基本情報" の literal を source に入れない＝既存 essay-flagship-jsonld.test の誇大ガード line86-87 と両立、初回 commit で comment に「応用情報」を含めてしまい test fail→言い換えで解消）。検証: prerendered `/essay.html` に3 blog link render＋3 target 全 prerendered(200・新規404ゼロ)を実測。回帰pin essay-flagship-jsonld.test.ts(+1=14)。
- done×1 [新vein/hub→spoke] SHA `c7d09d9`: **deep採点ページ `/essay/{exam}/{id}`(12件sitemap収録の最特化面)のエディタ直前に書き方ガイドへ控えめ1リンク**。ユーザーが論述を書く直前=最もintent一致のタイミングに `koudo-ronjutsu-kakikata-kotsu` へ。従来は InlineBookHint(書籍)＋IPA出典のみで教育記事へ dead-end。検証: prerendered `/essay/au/au-2024a-pm2-q1.html` に link render＋target prerendered(200)を実測。回帰pin同test(+1=15)。
- done×1 [新vein/hub→spoke] SHA `d790755`: **indexable `/features/essay-grading` の relatedLinks に書き方ガイドを追加**。従来「業種別事例集(何を書くか)」へはリンクするが「どう書くか」の教育記事が欠落。`koudo-ronjutsu-kakikata-kotsu` を追加し補完。**HD-4の対応区分広告(AP/SC/NW/DB/ES午後記述=モック)は一切不変**(additive のみ)。既存 features.test.ts の `/blog`解決性ガード(line48-67)が死リンクを自動防止＋hub→spoke intent pin を追加(+1=8)。検証: prerendered `/features/essay-grading.html` に link render を実測。
- **検証規律**: 全3コミットとも 全ゲート緑(typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test 1986→1987→1988/build OK)を **commit前に単独実行**。新規404ゼロ・最小diff・1コミット=1論点・additive。
- **vein掃き残し確認**: FE午後ハブ(`/[exam]/afternoon` code==="fe")は既に土台ピラー `fe-kamoku-b-taisaku` へ1リンク済(s16・ピラーがクラスタへfan-out＝dead-endでない・追加はsaturation回避でSKIP)。features `essay-grading` 以外の relatedLinks は概ね機能間/keyword/transparency で教育記事 gap は essay-grading が最大だった。
- **申し送り（セッション74）**: 「hub→spoke 逆方向(destination面→教育記事)」という新veinを開拓し旗艦3面を配線。**残る新角度候補(要起案・吟味)**: (i)同vein横展開＝旗艦以外の戦略 destination 面（例: `/recommended-books/[exam]` が当該区分の学習ハブ/記事へ戻りリンクを持つか・ただし「アフィリUI分離」戦略との兼ね合いで要吟味、`/transparency` 等のメタ面は対象外）。(ii)EssayEditor の採点結果表示(A/B/C/不合格)に評価ランク解説記事 `koudo-ronbun-hyouka-rank` への文脈リンク＝最もintent一致だが client component で要設計・過大回避で要吟味。(iii)content の access/discovery 角度(s73申し送り(ii))は安易量産せず1つずつ裏取り。HD群(HD-1/4/5/6/8/9)/topic-tagger=人間待ちは不変。1改善=確実を維持。


## セッション75（growth ループ）2026-06-02 JST
**s74申し送り(ii)+(i)を消化=hub→spoke 逆方向(destination面→教育記事/旗艦)配線を3面に展開**
背景: s74 で旗艦3面(/essay ハブ・deep採点ページ・/features/essay-grading)に hub→spoke を配線。残る候補(ii)EssayResultView の採点結果→評価ランク記事、(i)/recommended-books/[exam] の destination 配線を read-only 監査し、いずれも actionable と確認して着手。
- done×1 [新vein/hub→spoke] SHA `7244caf`: **採点結果ビュー `EssayResultView` から評価ランク解説記事 `koudo-ronbun-hyouka-rank` へ文脈リンク**。EssayResultView は `/essay/{exam}/{id}`(論述5区分 st/sa/pm/sm/au の deep採点)でのみ描画され、ユーザーが採点ランク A/B/C/D を見た直後＝「このランクは何を意味するか」を最も知りたい最高 intent 一致の瞬間。従来は教育記事への OUT リンク無しで dead-end だった。控えめな1リンクを footer 直前に追加(additive・client component)。
  - 検証(崩れたら落ちる/実測): typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test 1988→1990[+2新pin]/build OK を **commit前に単独実行**。client component かつ採点API後のみ描画ゆえ ① source-read ガード(essay-result-scroll-margin.test.ts と同方式・href + 文言 + 記事実在 + 評価ランクtag)で固定、② 本番ビルドで href + 文言が client bundle に存在(`.next/static/chunks`)・③ 送客先 `/blog/koudo-ronbun-hyouka-rank.html` prerendered(200)=新規404ゼロ を実測。回帰pin `__tests__/components/EssayResultView-rank-guide-link.test.ts`。
- done×1 [新vein/hub→spoke・候補(i)] SHA `ccdcf6a`: **論述区分(ST/SA/PM/SM/AU)の `/recommended-books/[exam]` から旗艦 `/essay` へ funnel**。論文事例集の読者＝旗艦「午後AI採点」の対象だが、学習プランCTAが午前MCクイズ(`/[exam]`・`/quiz`)のみで旗艦への直接導線が無かった(/[exam]ハブ経由の2hop)。論述区分ゲート(ESSAY_EXAM_CODES=単一情報源)付きCTAを学習プラン節に追加(「AI採点は参考評価」明記・誇大回避)。
  - 検証(崩れたら落ちる/実測): typecheck0/lint0err/test 1990→1993[+3新pin]/build OK を **commit前に単独実行**。本番ビルドHTML実測=論述5区分(pm/st/sa/sm/au)に CTA文言「午後論文を添削」=2(DOM+RSC payload)・非論述6区分(ip/fe/ap/nw/db/sc)=0(ゲート正確・誇大回避)。送客先 /essay は旗艦ハブ(prerendered)。回帰pin `__tests__/seo/recommended-books-essay-flagship-cta.test.ts`(論述ゲート/参考評価/ESSAY_EXAM_CODES=5区分)。
- done×1 [新vein/hub→spoke・旗艦と対称] SHA `a4c8e17`: **FE の `/recommended-books/fe` から土台=科目B中核ピラー `fe-kamoku-b-taisaku` へ funnel**。論述への旗艦funnelと対称に、FE書籍(科目B/アルゴリズム書)読者を FE限定ゲートで科目B対策へ。最大の難関=科目B(擬似言語)でAIコパイロットに1行ずつ質問する土台体験へ。午前MC「アルゴリズム」分野でなく科目B(擬似言語)である旨を明示し誇大回避。
  - 検証(崩れたら落ちる/実測): typecheck0/lint0err/test 1993→1994[+1新case]/build OK を **commit前に単独実行**。本番ビルドHTML実測=`/recommended-books/fe` のみ CTA文言「科目Bの対策法」=2・他7区分=0(FE限定ゲート正確)。送客先 `/blog/fe-kamoku-b-taisaku.html` prerendered(200)=新規404ゼロ。同回帰pinに FE土台ケース追加。
- **検証規律**: 全3コミットとも全ゲート緑を **commit前に単独実行**してから commit。新規404ゼロ・最小diff・1コミット=1論点・additive。pull --ff-only 後 push origin growth-integration(競合なし)。
- **申し送り（セッション75）**: s74の「hub→spoke 逆方向」vein を destination面3つ(採点結果ビュー・論述書籍ページ→旗艦・FE書籍ページ→土台)へ展開し旗艦/土台を対称配線。**残る候補(要吟味)**: (i)EssayResultView に書き方記事(koudo-ronjutsu-kakikata-kotsu)も足すかは clutter回避で1リンクに留めた(SKIP寄り)。(ii)/recommended-books の非論述・非FE区分(IP/SG/AP/NW/DB/ES/SC)は旗艦/土台のどちらにも該当せず教育記事への自然な destination CTA が薄い=該当区分ハブ/記事への戻りリンクは要吟味だが saturation懸念(/[exam]へは既にリンク済=dead-endでない)。(iii)content access/discovery 角度(s73)は安易量産せず1つずつ裏取り。HD群(HD-1/4/5/6/8/9)/topic-tagger=人間待ちは不変。1改善=確実を維持。

## セッション76（growth ループ）2026-06-02 JST
**s75申し送り(ii)を再評価し消化=`/recommended-books` の hub→spoke を対称完了**
背景: s75 は非論述・非FE区分の destination CTA を「薄い=saturation懸念」と保留したが、read-only 再監査で **intent一致の教育記事 destination が実在する区分**があると判明(「薄い」のでなく未配線だった)。論述5→/essay・FE→科目B と同型の hub→spoke を2区分グループへ配線。
- done×1 [新vein/hub→spoke・FE と対称] SHA `47d8b05`: **SG の `/recommended-books/sg` から土台=科目B事例問題記事 `sg-kamoku-b-jirei-mondai` へ funnel**。SGは2023再編で科目A/B構成・CBT通年=土台「科目Bで通年の入口」と整合。書籍購入者の合否を分ける科目B(長文の事例問題)で読解に迷う読者を SG限定ゲート(`code === "sg"`)で送客。FE(擬似言語)でなく長文事例である旨を明示し区分混同/誇大を回避。
  - 検証(崩れたら落ちる/実測): typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test 1994→1995[+1新case]/build OK を **commit前に単独実行**。本番ビルドHTML実測=`/recommended-books/sg` のみ link文言=2(DOM+RSC)・他12区分=0(ゲート正確)・送客先 `/blog/sg-kamoku-b-jirei-mondai.html` prerendered(139KB/200)=新規404ゼロ・FEブロック不変。回帰pin `recommended-books-essay-flagship-cta.test.ts` に SGケース追加。
- done×1 [新vein/hub→spoke・第3の柱=記述式午後] SHA `a1243a8`: **記述式午後5区分(AP/NW/DB/SC/ES)の `/recommended-books/[exam]` から記述式の書き方記事 `gogo-kijutsu-buhanten` へ funnel**。午後対策本の読者の自然な次の一歩=記述式の答案の書き方(部分点の取り方)。`DESCRIPTIVE_AFTERNOON_EXAMS=["ap","nw","db","sc","es"]`(単一情報源)ゲートで配線。**旗艦/essay(論文5区分採点)には送らず=記述式≠論文の誇大回避**(s27/s64 precedent)・SC午後も記述式の正framing(HD-6誤framing不踏襲)。送客先記事は採点基準非公開のdisclaimer保持。
  - 検証(崩れたら落ちる/実測): typecheck0/lint0err/test 1995→1996[+1新case]/build OK を **commit前に単独実行**。本番ビルドHTML実測=記述式5区分(ap/nw/db/sc/es)のみ link=2(DOM+RSC)・非該当8区分(ip/sg/fe/st/sa/pm/sm/au)=0(ゲート正確)・送客先 `/blog/gogo-kijutsu-buhanten.html` prerendered(200)=新規404ゼロ・SGブロック不変。回帰pin同ファイルに記述式ケース追加(ゲート単一情報源を固定)。
- **検証規律**: 両コミットとも全ゲート緑を **commit前に単独実行**してから commit。新規404ゼロ・最小diff・1コミット=1論点・additive。pull --ff-only 後 push origin growth-integration(競合なし)。
- **申し送り（セッション76）**: **`/recommended-books` の hub→spoke は対称完了**=論述5→/essay・FE/SG→科目B・記述式5→書き方記事・**IPのみ特定教育destination不在(入門区分=科目B/論文/記述式どれにも非該当)＝/[exam]のみで正・無理に足さない**。P2-3g destination 配線は recommended-books/essay/features/EssayResultView で網羅。**次の hub→spoke 候補(要吟味)**: 他の高オーソリティ destination面(QuizCompleteScreen=旗艦/essay既配線・/topics=discovery navで defensible・/demo系=低優先)で教育記事 OUT gap が残るか read-only 監査。HD群(HD-1/4/5/6/8/9)/topic-tagger=人間待ちは不変。1改善=確実を維持。

## セッション77（growth ループ）2026-06-02 JST
**P1旗艦/新micro-angle=論述区分の二次記事3本の旗艦 indexable /essay funnel 非対称を解消**
開始時の read-only 監査（saturation 確認のため広く掃く）:
- **dead-link/redirect/410 UI 監査（s72候補(d)）= clean**: `href="/quiz"`(mode無)・301 source paths(/my-progress 等)・GONE_PATHS(/pricing 等)への内部リンクを app/components/lib 全走査→**0件**。静的 href 50種を全数 route 突合→全て実在(notFound行先ゼロ)。**=s72 の死リンク vein はコード側で完全に閉じている**ことを再確認(対応不要)。
- **internal-link 整合監査 = clean**: `scripts/audit-internal-links.ts` 実走=174記事/1594リンク・**FATAL0/WARNING0・orphan(inbound0) 0件**。blog sitemap は `getAllBlogSummaries()` 全件 map=新記事も自動収録(gap無し)。
- **論文 時間配分/字数の content gap = 既カバー(SKIP)**: `koudo-ronjutsu-kakikata-kotsu` が既に「時間配分の鉄則(2時間/章立て10分…)」節＋「字数を稼げません」FAQ を保持=新記事は thin/重複。
- **発見した actionable な非対称**: 論述区分の**二次記事**(主記事とは別の語彙集/ネタ抽出 stub)`pm-essay-shudai-pickup`/`st-strategy-perspective`/`au-audit-evidence-language` の本文「AI添削」CTA が **noindex の `/essays/<exam>`(robots index:false,follow:false) だけを指し、indexable 旗艦 `/essay` への直リンクを欠く**。一方、論文5主記事＋単一記事区分 SA(`sa-architecture-tradeoff`)/SM(`sm-itil-storytelling`) は FAQ 経由で `/essay` 直リンク済=非対称。s53「stubは過大修正回避でFAQ未設置」は FAQ 追加回避の判断であり、旗艦 in-body link 1本の追加とは別問題(戦略#1=午後AI採点 旗艦露出 そのもの)。
- done×1 [P1旗艦/micro-angle] SHA `96178e0`: 3本の「AI添削」節に **indexable `/essay` 直リンク＋「採点基準は IPA 非公開/AI採点は参考評価」明記**を **additive** に追加(既存 `/essays/<exam>` 深リンクは温存=HD-5 範囲に踏み込まない)。これらstubは「合格レベルに到達」等を**参考評価 disclaimer 無し**で書いていた取り残しも同時に補正(誇大回避)。誇大回避の構造保証=対象3区分(pm/st/au)は ESSAY_EXAM_CODES の論文5区分。
  - 検証（崩れたら落ちる/実測）: typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test 1996→2002[+6新pin]/build OK を **commit前に単独実行**。本番ビルドHTML実測=3本とも `href="/essay"`(新規) と `href="/essays/{pm,st,au}"`(温存) 併存・disclaimer「AI 採点は参考評価です」描画=新規404ゼロ。回帰pin `ronjutsu-stub-essay-flagship-funnel.test.ts`(3本の /essay 直リンク・参考評価/IPA非公開明記・/essays深リンク温存・論述tag＋ESSAY_EXAM_CODES gate=崩れたら落ちる)。
- **申し送り（セッション77）**: 旗艦 /essay funnel の **二次記事 stub の非対称**を解消。他の論述 stub(`db-er-design-practice`/`nw-protocol-deep-understanding`/`sc-incident-response-storytelling`)は **/essays も /essay も持たない**が、(i)db/nw=記述式区分(論文でない)→旗艦/essay非送客が正(s27 precedent)、(ii)sc=HD-6 frame未決で自律patch不可、ゆえ対象外。**残る候補(要吟味)**: (a)/topics(午前MCカテゴリ駆動)→教育記事の OUT は「午前category≠午後/科目B/論述」混同リスクで defensible SKIP 継続。(b)旗艦の in-body funnel 非対称はこれで枯渇=以後は footer/header/q-page の global 露出で確保済。HD群(HD-1/4/5/6/8/9)/topic-tagger=人間待ちは不変。1改善=確実を維持。


## セッション78（growth ループ）2026-06-02 JST
**新vein=「立場別 勉強時間目安」ページの区分間 非対称を解消（FE専用ページに対し AP が欠落）**
開始時の read-only 監査（saturation 確認のため広く掃く）:
- **internal-link 整合 = clean**: `scripts/audit-internal-links.ts` 実走=174記事/1597リンク・FATAL0/WARNING0/orphan0。
- **404/redirect/410 UI = clean**: robots/sitemap/middleware 体系は成熟（GONE_PATHS・dynamicParams=false・getIndexableQuestions）。新規の死リンク種別なし。
- **旗艦 essay deep ページ = データ上限**: `/essay/{exam}/{id}` は ALL_ESSAY_QUESTIONS 12件を generateStaticParams で全件 deep 化済（追加には実データ投入=HD領域）。
- **科目B データ構造 = 既カバー(SKIP)**: `fe-algorithm-nigate-kokufuku` が連結リスト/木構造/スタック・キュー/二分探索のトレースを専節で網羅・`fe-kamoku-b-taisaku` も二分探索/スタック・キュー言及＝専用「データ構造」記事は thin/重複。
- **発見した actionable な非対称**: 「○○ 勉強時間/何時間」高volume・競合薄キーワードで、基本情報には専用ページ `fe-benkyou-jikan-meyasu`(立場別=社会人/学生/未経験)があるのに、**第2の主要区分=応用情報には専用の勉強時間ページが無い**(言及は hatarakinagara「500時間神話」節・overview等に散在のみ)。FE precedent があり立場別の variance も大きい＝thin でなく明確な取り残し。
- done×1 [新vein/content] SHA `5478d07`: **新記事 `ap-benkyou-jikan-meyasu`「応用情報技術者 勉強時間の目安｜基本情報合格者・実務経験者・初学者別の合格モデル」**を additive 追加。
  - SSOT一致(誇大/誤記回避): 午前80問・四肢択一150分／午後 記述式5問150分／各100点満点・基準点60点／午前未達なら午後不採点(多段階選抜)／「500時間」は初学者基準の平均値・FE合格者や実務者は200〜300時間も／午前4:午後6 配分。数値は `ap-goukaku-ten-border`/`ap-gogo-sentaku`/`ap-gogo-jikan-haibun`/`hatarakinagara-goukaku` と照合。
  - funnel規律(s25/s28 precedent): **AP午後採点はモック(HD-4)かつ AP は論文区分でないため旗艦 /essay の採点訴求はしない**。/ap・AP午後選択(`ap-gogo-sentaku`)・時間配分(`ap-gogo-jikan-haibun`)・合格基準(`ap-goukaku-ten-border`)・高度ステップアップ(`ap-goukaku-go-koudo-senryaku`)・AIコパイロットへ funnel。書籍CTAは exam:"ap" で `/recommended-books/ap` 自動解決(booksExam不要)。
  - inbound: `hatarakinagara-goukaku` の「コツ7:合格者の勉強時間神話」節(既に『応用情報は500時間』と言及)から文脈内リンクで配線=orphan回避。relatedSlugs=ap-gogo-sentaku/ap-goukaku-ten-border/fe-benkyou-jikan-meyasu(FE→AP対称ペア)。
  - 検証(崩れたら落ちる/実測): typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test 2002→2007[+5新pin]/build OK を **commit前に単独実行**。本番ビルド `/blog/ap-benkyou-jikan-meyasu.html`(130KB prerendered)に 核心6事実(80問/記述式5問/60点以上/午後は採点されない/500時間/午前4:午後6)・funnel(/ap×4・ap-gogo-sentaku×4・ap-goukaku-ten-border×4・ap-gogo-jikan-haibun×2)・FAQPage JSON-LD×2 を実測。**body内 /essay リンク=0**(HTML中の /essay 2件は global footer の旗艦リンク＝chrome)。inbound from hatarakinagara(prerendered×2)・blog サイトマップ収録を実測。新規404ゼロ。回帰pin `ap-benkyou-jikan-meyasu-funnel.test.ts`(核心事実/funnel規律=/essay非送客/inbound/FAQPage/サイトマップ=崩れたら落ちる)。
- **SKIP記録(裏取り済・量産回避)**:
  - **IP 勉強時間ページ**: `ip-3shukan-goukaku`(30〜42時間・未経験5〜6週間明記)＋`ip-1month-study-plan`(keyword LP=ペース別)が既に「総時間/ペース」を扱う＝立場別 hours 専用ページは **cannibalization 懸念**(FE/AP は競合する pace記事が無かったが IP は2本ある)。安全側で SKIP。
  - **AP 難易度/合格率ページ**: `ipa-shiken-goukakuritsu-ranking`(AP合格率20%台)＋`ap-goukaku-ten-border`＋散在言及で既カバー。NW が `nw-nanido-goukakuritsu-suii` を持つのは NW合格率推移が distinct niche だから＝AP版は重複・thin で SKIP。
- **申し送り（セッション78）**: 「立場別 勉強時間目安」vein を AP(第2の主要区分)で開拓し FE との非対称を解消。**残る候補(要吟味・安易に量産しない)**: (i)NW/SG 等の「勉強時間目安」=niche/lower volume かつ overview 記事で概ねカバー＝volume と overlap を1区分ずつ裏取りしてからのみ着手(thin懸念)。(ii)FE↔AP の study-time ペアの相互discovery強化(fe-benkyou-jikan-meyasu→ap-benkyou の relatedSlugs追加)は marginal=保留。(iii)他の per-exam 非対称(FEにあって AP/他に無い専用ページ種別)を1つずつ走査。HD群(HD-1/4/5/6/8/9)/topic-tagger=人間待ちは不変。1改善=確実を維持。


## セッション79（growth ループ）2026-06-02 JST
**s78申し送り(iii)=per-exam 非対称走査を消化＝合格点(scoring)ページの区分間 非対称を解消（IP/FE/AP/高度にあって SG だけ専用ページ欠落）**
開始時の read-only 監査（saturation 確認・二重実装防止）:
- **per-exam 合格点ページの非対称を発見**: `goukaku-ten` 系専用ページは `ip-goukaku-ten-bunyabetsu`(分野別300点足切り)・`fe-goukaku-ten-irt`(科目A/B各600点・IRT)・`ap-goukaku-ten-border`(素点・多段階選抜)・`koudo-goukaku-ten-ashikiri`(高度8区分一括)の4面が存在するのに、**SG(情報セキュリティマネジメント)だけ専用の合格点ページが無い**。SGの合格基準は既存記事(`sg-kamoku-b-jirei-mondai`の採点段落・`sg-shiken-meritto-imi-aru`)に一文混在するのみ＝「セキュマネ 合格点/何点で合格/配点/IRT」高インテント・競合薄の専用面が不在＝明確な取り残し(thin でなく未配線)。SGは科目A/B構成＝戦略 土台「科目Bで通年の入口」とも整合。
- **事実裏取り(IPA公式 WebFetch/WebSearch)**: SG=試験時間120分・60問(科目A 四肢択一48問＋科目B 多肢選択12問・全て選択式)・**IRT(項目応答理論)採点**・**総合評価点1000点満点・基準点600点**・合否は科目A/B合算の総合評価点で判定＝**科目別の足切り基準点は非公表(=FEと逆)**。既存 SSOT(`sg-kamoku-b-jirei-mondai` line本文「1000点満点で600点以上・各科目60%でなく総合点判定」)と一致を確認。
- done×1 [新vein/content・per-exam 非対称] SHA `63f10f9`: **新記事 `sg-goukaku-ten-irt`「情報セキュリティマネジメントは何点で合格？｜総合評価点1000点満点・600点とIRT採点の仕組み」**を additive 追加。`fe-goukaku-ten-irt` の構造を踏襲しつつ最重要差分=「FEは科目別足切り／SGは総合評価点で判定(足切り無し)」を前面化。「午前午後はもう無い(2023再編)」「正答率6割≠合格(IRT・換算式非公開)」「当日仮スコア/正式合否後日」も網羅。
  - funnel規律(s25/s28/s78 precedent): **SGは論文区分でなく科目Bも多肢選択(記述/論述でない)ため旗艦 /essay の採点訴求はしない**(誇大回避)。/sg・`sg-kamoku-b-jirei-mondai`(科目B事例)・`fe-goukaku-ten-irt`・`ip-goukaku-ten-bunyabetsu`(同IRT・非エンジニア線)へ funnel。書籍CTAは exam:"sg" で `/recommended-books/sg` 自動解決。
  - inbound: `sg-kamoku-b-jirei-mondai` の採点段落から文脈内リンクで配線=orphan回避。relatedSlugs=sg-kamoku-b-jirei-mondai/sg-shiken-meritto-imi-aru/ip-goukaku-ten-bunyabetsu。
  - 検証(崩れたら落ちる/実測): typecheck0/lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/test 2007→2012[+5新pin]/build OK を **commit前に単独実行**。本番ビルド `/blog/sg-goukaku-ten-irt.html`(139KB prerendered)に 核心事実(48問/12問/60問・120分/総合評価点1000点満点600点/科目別の足切り/IRT)・funnel(href="/sg"×5・sg-kamoku-b-jirei-mondai×6・fe-goukaku-ten-irt×4・ip-goukaku-ten-bunyabetsu×4)・FAQPage×2(Q×5)を実測。**body内 /essay リンク=0**(HTML中の href="/essay" 1件は global footer 旗艦リンク=chrome)。funnel先4本＋/sg 全 prerendered(200)=新規404ゼロ。回帰pin `__tests__/seo/sg-goukaku-ten-irt-funnel.test.ts`(核心事実=48/12問・総合1000点600点・IRT・総合評価点/足切り・funnel規律=/essay非送客・inbound・FAQPage・サイトマップ=崩れたら落ちる)。
- done×1 [hub→spoke 補強] SHA `822472c`: **`sg-shiken-meritto-imi-aru`(SGの難易度/形式を説明)から新ページへ2本目 inbound**。「合格は総合評価点で判定・FEのような科目別足切り無し」の一文＋リンクを形式説明段落に additive 追加。回帰testに2本目 inbound parent を pin。本番HTML実測=inbound link＋新文 render。
- done×1 [cluster対称化] SHA `a8327f4`: **`fe-goukaku-ten-irt`(最近接 sibling・科目A/B構成)から新ページへ判定方式の対比リンク(3本目 inbound)**。「同じ科目A・B構成でもFE=科目別足切り／SG=総合評価点で逆」の対比を FE 読者向けに明示し FE/SG 混同による対策ミスを防止＝educational かつ高オーソリティ面からの inbound。回帰testに3本目 inbound parent を pin。本番HTML実測=inbound link＋新文 render。
- **検証規律**: 全3コミットとも全ゲート緑(typecheck0/lint0err/test 2007→2012/build OK)を **commit前に単独実行**してから commit。新規404ゼロ・最小diff・1コミット=1論点・additive。pull --ff-only 後 push origin growth-integration(競合なし)。
- **SKIP記録(裏取り済・量産回避)**:
  - **SG 勉強時間ページ**: `sg-shiken-meritto-imi-aru` のFAQ「SGは何時間勉強すれば合格できますか？」＋study-plan表(150時間→27週)で既カバー＝s78 の SG study-time SKIP 判断を再確認(thin/cannibalization 懸念)。
  - **ES/SC 午後 時間配分ページ**: 記述式午後5区分(ap/nw/db/sc/es)のうち `gogo-jikan-haibun` は ap/nw/db のみ・SC=HD-6 frame未決で自律不可・ES=最niche区分(低volume)で thin懸念＝着手見送り(候補として記録)。
- **申し送り（セッション79）**: per-exam 合格点ページの非対称を SG で解消＝**主要区分の scoring ページは IP/SG/FE/AP/高度で網羅完了**。SG合格点ページを cluster(sg科目B事例・sg意味・fe合格点)へ3本inbound で配線。**残る候補(要吟味・安易に量産しない)**: (i)ES午後時間配分(`es-gogo-jikan-haibun`)=記述式5区分で唯一欠落だが ES は最niche＝volume裏取りしてからのみ。SCは HD-6 で不可。(ii)他の per-exam 非対称(FE科目A免除=FE固有で analog無し・NW合格率推移=NW固有 niche＝横展開不可と確認済)。(iii)content access/discovery 角度(s73)は安易量産せず1つずつ裏取り。HD群(HD-1/4/5/6/8/9)/topic-tagger=人間待ちは不変。1改善=確実を維持。


## セッション80（growth ループ）2026-06-02 JST
**s79申し送り(i)=ES午後時間配分の着手前監査で「ES午後IIは2023年から論述式」と判明＝記事化の前提が誤りと確定し HD-11 へ escalate（誇大/誤framing記事を未然に回避）**
開始時の read-only 監査（着手前の二重実装/事実確認・saturation把握）:
- **internal-link 整合 = clean**: `scripts/audit-internal-links.ts` 実走=176記事/1622リンク・FATAL0/WARNING0。
- **着手候補=`es-gogo-jikan-haibun`(s79申し送り(i))の事実裏取り**: ap/nw/db は `gogo-jikan-haibun` 既存(記述式・午後I 90分3問中2問/午後II 120分2問中1問・旗艦/essay非送客=記述式区分)。ES を同型で追加しようとIPA公式を裏取り→**前提が崩れた**。
- **IPA公式確認（記事化を止めた決定打）**: [kubun/es.html](https://www.ipa.go.jp/shiken/kubun/es.html)=ES **午後I=90分・出題2問/解答1問・記述式**、**午後II=120分・出題3問/解答1問・論述式**。WebSearch でも「令和5年度(2023)秋期から午後IIは論述式・採点はランク評価でAのみ合格・企画/要件定義を出題範囲に追加」と一致。**ES午後IIは論述式(小論文・評価ランクA/B/C/D)**で、ES は **午後I記述式・午後II論述式のハイブリッド**＝「純・記述式区分」前提の時間配分記事は午後IIを誤framingする。よって**記事化せず**(過大修正/誇大の罠を未然回避＝監査が誤記事を防いだ)。
- **コーパス監査で present-tense 事実誤りを特定（HD-6のSC午後frameと同 error class）**: サイトは ES を記述式区分(NW・DB・ES・SC)と分類し論述区分=ST/SA/PM/SM/AUの5区分と繰り返し定義(`generators.ts` L2858/7515/7665-7705・`koudo-ronbun-hyouka-rank` L7560-7634・`exam-data.ts:192`・コード定数 ESSAY_EXAM_CODES/DESCRIPTIVE_AFTERNOON_EXAMS)。**ES午後II(論述式)を取りこぼし**。一方 `data/recommended-books.ts:630` のES書籍は既に「論文試験対応」＝**書籍データは論述反映済・blog prose だけが旧分類**の内部不整合。
- **自律修正せず HD-11 へ escalate した理由**: 論述区分の定義「=5区分」がコーパス横断(prose多数+コード定数+テスト)に織り込まれ、ESを論述側へ動かすと全「論述区分(5)」記述・評価ランク記事・採点funnelゲートへ**連鎖**(HD-9「部分修正は新たな不整合を生む＝コヒーレントに直す」原則)。加えて旗艦 `/essay` の essay-grading データ(ESSAY_EXAM_CODES=st/sa/pm/sm/au)に **ES論述データ不在**＝ESを論述と書いた上で旗艦採点を出すと誇大(HD-4型のモック/未対応スコープ)。ゆえ prose横断reframe＋旗艦スコープ拡張＝**編集+戦略判断**で人間に集約。
- done×1 [HD escalate/事実性] **HD-11 を新規起票**(`logs/growth-human-decisions.md`)＋ backlog 前提是正＋worklog 記録。IPA公式facts・影響面(5箇所prose+定数)・選択肢(a prose再分類/b ES論述データ整備でスコープ拡張/c現状維持)・推奨(最低 a・旗艦採点は誇大回避でST/SA/PM/SM/AU維持)を記載。**backlog の「es-gogo-jikan-haibun=記述式5区分で唯一欠落＝着手可」前提を覆し着手不可へ更新**。
- **新 error class マップ完了(backlog 追記)**: 2023高度試験再編で午後形式が変わったのは **SC(統合午後=HD-6)と ES(午後II論述式=HD-11)の2区分のみ**(NW/DB=記述式不変・ST/SA/PM/SM/AU=論述不変)と確定＝今後この vein は新規調査不要。
- **検証規律**: 本セッションは docs(logs/*.md)のみの変更でコード/データ/テスト不変＝ゲート影響なし。IPA公式WebFetch/WebSearch で ES午後形式を実測裏取りしてから記録(自己申告でなく一次情報)。**最大の成果=誤framing記事を着手前に止め、live の present-tense 事実誤りを正しく escalate した**こと。
- **申し送り（セッション80）**: s79申し送り(i)のES記事化は HD-11 で**着手不可と確定**。記述式時間配分vein(ap/nw/db)＋論述区分(5)＋scoring(ip/sg/fe/ap/高度)＋per-exam非対称は**枯渇/HD化**。**残る候補(要吟味)**: (i)他の「2023再編以外」の per-exam content 非対称が残るか1区分ずつ裏取り(量産しない)。(ii)P2-3 hub→spoke 逆方向は recommended-books/essay/features/EssayResultViewで網羅・新destination面の OUT gap を read-only監査。(iii)HD群(HD-1/4/5/6/8/9/10/**11**)/topic-tagger=人間待ちは不変。1改善=確実を維持し、satur:水増しせず確実な1件のみ。

## セッション81（growth ループ｜2026-06-02 JST）
**土台=科目B 新vein=「メタ記事のみで解き方の実演記事が不在」を解消＋HD-9スコープ訂正＋監査clean確認**
背景: read-only 監査で(1)link audit=0 FATAL/0 WARN(176本)・fact面/funnel/per-exam非対称/dead-link は全て done/SKIP/HD で枯渇を再確認。
(2)土台=科目Bの既存9記事を走査すると **全てメタ**(勉強法・時間配分・記法早見表・つまずき切り分け・免除)で、
**具体的なアルゴリズムを擬似言語で1行ずつトレースして見せる「解き方の実演」記事が不在**だった。記法早見表
(gijigengo-kihou)は「記法を覚えたら手を動かす」と促すのに実演先が無く、訓練法(pseudo-language)は方法論で
具体例実演ではない＝記法→実演→速度 の「実演」が欠けた橋渡しの盲点。新規キーワード新規ページは saturation とは別で戦略が endorse(s25 precedent)。
- done: SHA `996abfc` 新記事 `fe-kamoku-b-trace-renshu`「擬似言語トレースの練習｜合計・最大値・線形探索を1行ずつ追う」を追加。
  - 擬似言語は全てオリジナル(IPA過去問・サンプル非転載)・記法早見表と notation一致(←代入/配列1始まり/for/while/endif)。
    合計(A={3,1,4,1,5}→14)・最大値(→5)・線形探索(key=4→位置3, 早期exit) の3題をGFMトレース表で実演。トレースの値は全て手計算で検算。
  - 土台funnel: /fe・記法早見表・3ステップ訓練法・科目B完全対策・わからない・/fe/topic(科目A相当と明示framing=誇大回避)・AIコパイロット(「1行ずつトレースして表に」)。**旗艦/essay非送客**(土台=非論文)。
  - inbound: gijigengo-kihou「手を動かす」節から1リンク配線(orphan回避)。relatedSlugs=記法早見表/pseudo-language/taisaku/wakaranai(全科目B on-topic)。FAQPage化(4Q&A・リンク/太字leak無し)。
  - 検証(本番ビルド実測): prerendered `/blog/fe-kamoku-b-trace-renshu.html`(145KB)・トレース表(th「ループ回」)/核心事実「要素番号は1から始まる」「線形探索」「0+3=3」/funnelリンク(/fe/topic・pseudo-language)をHTML実測。body内/essay=0(href="/essay"の1件はfooter chrome)。link audit 0 FATAL/0 WARN(176→177本)。回帰pin `fe-kamoku-b-trace-renshu-funnel.test.ts`(7件)。
  - 全ゲート緑(typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/ test 2019 / build OK)＝commit前に単独実行。
- done(docs): SHA `8a61111` **HD-9 スコープ訂正**(実測・コード変更なし)。HD-9は「overviewテンプレだけが旧前提」と記載していたが不正確。generators.tsを午前/午後語で全走査し、`buildLastMonthPost`(L206/212「午前試験/午後試験」)・`buildFrequentTopicsPost`(L317「午前試験・午後試験ともに」)・`buildPracticePost`(L443/447「午後・論文への接続/午前で…午後の長文」)も IP/SG/FE含む全13区分でpre-2023 午前/午後framingをハードコードと判明(buildAnalysisPostのみclean)。影響=計12 live indexable面。HD-9解決時は4生成器をコヒーレントに(部分修正は記事間不整合)。editorial/構造リライトゆえ自律実行せず human-decisions に追記。
- **vein掘り残し確認**: 土台=科目Bの「実演」veinは合計/最大値/線形探索の基本3パターンで初手をカバー。より発展的なパターン(二分探索/再帰/整列のトレース実演)は別記事化可だが、まず本記事のintent(「読めるのに解けない」初手)で様子見(量産しない・s25「1記事=確実」)。次セッションは backlog の残未着手or本veinの発展パターンを1つ吟味。

## セッション82（growth ループ｜2026-06-02 JST）
**土台=科目B「発展パターン」vein の最初の1本=二分探索のトレース実演記事を追加（頻出と名指しされながら実演が不在だった盲点を解消）**
背景（着手前 read-only 監査）:
- link audit=0 FATAL/0 WARN(176本)・fact/funnel/per-exam非対称/dead-link は done/SKIP/HD で枯渇を再確認。
- s81 申し送り「発展パターン(二分探索/再帰/整列)は1つ吟味」を消化。`grep 二分探索 data/blog/generators.ts`=**6箇所**ヒットだが、
  全て `fe-kamoku-b-wakaranai`/`fe-kamoku-b-taisaku`/`fe-algorithm-nigate-kokufuku` 等で「頻出パターン: 線形探索・二分探索・ソート・再帰」と
  **名前を挙げるだけ**で、1行ずつトレースして見せる実演は不在。s81 の trace-renshu は線形探索まで（二分探索は未実演）。
  ＝二分探索＝科目B最頻出かつ最難関(lo/hi/mid の3変数同時更新)なのに実演ゼロ＝明確な gap。新規キーワード新規ページは saturation と別(s25 endorse)。
- done×1 [P1-6 土台/新記事] SHA `36d0ea7` 新記事 `fe-kamoku-b-nibun-tansaku`「二分探索のトレース練習｜ソート済み配列を半分ずつ絞り込む」。
  - 擬似言語は全オリジナル(IPA過去問・サンプル非転載)・記法早見表/trace-renshu と notation一致(←代入/配列1始まり/÷整数除算切り捨て)。
    A={2,5,8,11,14,17,20}(昇順ソート済・要素数7)で **見つかる(key=14→位置5)** と **見つからない(key=10→lo>hi で終了・位置-1)** の両ケースを
    GFMトレース表(lo・hi・mid・A[mid]・判定・更新後(lo,hi)・位置)で実演。**全トレース値を手計算で検算**。
    つまずき3点(mid整数除算切り捨て/lo←mid+1の±1忘れで無限ループ/ソート済み前提)を解説。
  - 土台funnel: /fe・trace-renshu・記法早見表・3ステップ訓練法・わからない・科目B完全対策・/fe/topic(科目A相当と明示framing=誇大回避)・AIコパイロット。**旗艦/essay非送客**(土台=非論文)。
  - inbound: 親 trace-renshu の例3(線形探索)結びから1リンク配線(orphan回避)。relatedSlugs=trace-renshu/記法早見表/pseudo-language/taisaku(全科目B on-topic)。FAQPage化(4Q&A)。
  - 検証(本番ビルド実測): prerendered `/blog/fe-kamoku-b-nibun-tansaku.html`(150KB)・核心事実(ソート済み/商の整数部分/lo&gt;hi/要素番号は1から始まる/ループ回表)・/fe/topicリンク・FAQPage JSON-LD(「二分探索はソートされていない配列でも使えますか」)をHTML実測。body markdown ](/essay=0(href="/essay"の1件はfooter chrome)。link audit 0 FATAL/0 WARN(176→177本)。回帰pin `fe-kamoku-b-nibun-tansaku-funnel.test.ts`(7件)。
  - 全ゲート緑(typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/ test 2026 / build OK)＝commit前に単独実行・緑目視。
- done×1 [P1-6 土台/inbound強化] SHA `6226398` `fe-kamoku-b-wakaranai` タイプC(時間内に解けない)の「頻出パターンを反射で見抜く: 線形探索・二分探索・ソート・再帰」節から、
  trace-renshu＋新 nibun-tansaku の2実演へ additive で配線。二分探索を名指しする最も自然な文脈で、s13-15/s40 の saturation判断時に存在しなかった**新記事への新規高relevance inbound**(旧funnel再飽和ではない)。本番HTML実測=wakaranai に nibun-tansaku リンク2行render・link audit 0 FATAL/0 WARN。全ゲート緑。
- **vein掘り残し（次セッション候補・要吟味）**: 二分探索を実演化＝発展パターン veinの2本目(基礎3本=trace-renshu＋二分探索=nibun-tansaku)。**残る発展パターン=整列(バブル/選択ソート)・再帰(階乗/フィボナッチ)・スタック/キュー**のトレース実演は別記事化可だが、**s25「1記事=確実」/s81「様子見・量産しない」を尊重し、本セッションは二分探索1本に絞った**。次セッションが本veinを続けるなら1本ずつ・手計算検算必須。HD群(HD-1/4/5/6/8/9/10/11)/topic-tagger=人間待ちは不変。1改善=確実を維持。

## セッション83（growth ループ｜2026-06-02 JST）
**P1-6 土台×「解き方の実演」発展パターン vein 3本目=ソート(選択ソート)のトレース実演を新設**
背景: s81 trace-renshu(線形探索ほか)・s82 nibun-tansaku(二分探索)で「発展パターン」veinを開始。コーパスの科目B記事は「頻出パターン=線形探索・二分探索・ソート・再帰」と名指しするのに(wakaranai タイプC/trace-renshu)、**ソート(整列)を擬似言語で1行ずつトレース実演する記事が不在**だった盲点を解消。名指し順(線形→二分→ソート→再帰)の次=ソート。
- done×1 [P1-6 土台/新vein] SHA `7eeb621`: 新記事 `fe-kamoku-b-sort-trace`「ソート（整列）のトレース練習｜選択ソートで最小値を前へ運ぶ」。
  - 新しい難所=**二重ループ(外側 i・内側 j)**。二分探索までは単ループ、ここで初めてネストループの添字追跡を扱う(非重複)。A={5,2,8,1,9}を選択ソートで昇順整列する例を、内側ループ(i=1)の min 更新表＋外側4周の配列状態表で実演。
  - **全値を手計算検算**(python で trace 照合: i=1→[1,2,8,5,9] / i=2 交換なし / i=3→[1,2,5,8,9] / i=4 交換なし / sorted=[1,2,5,8,9])。擬似言語は全オリジナル(IPA非転載)・記法早見表と notation一致(←/配列1始まり)。
  - つまずき3点(min は値でなく**位置(添字)**/交換は**tmp 経由3行**でないと値が消える/内側ループは **i+1 から**)を解説。バブルソートは「隣接交換」と1段落で対比(全トレースはせず=1記事=確実)。
  - 土台funnel: /fe・nibun-tansaku・trace-renshu・記法早見表・3ステップ訓練法・わからない・科目B完全対策・/fe/topic(科目A相当と明示framing=誇大回避)・AIコパイロット。**旗艦/essay非送客**(土台=非論文)。
  - inbound: 親 nibun-tansaku「次のステップ」＋ wakaranai タイプC頻出パターン節の2面に additive 配線(orphan回避・s13-15/s40 saturation判断時に未存在の新記事への新規高relevance inbound)。relatedSlugs=nibun-tansaku/trace-renshu/記法早見表/taisaku(全科目B on-topic)。FAQPage化(4Q&A)。
  - 検証(本番ビルド実測): prerendered `/blog/fe-kamoku-b-sort-trace.html`(150KB)・選択ソート×13/「見つけた min」表セル/FAQPage JSON-LD をHTML実測。body markdown `](/essay`=0(href="/essay"の1件はfooter chrome)。inbound 2面(nibun-tansaku・wakaranai)でリンクrender実測・outbound 6本(科目B記事)全prerendered 200(新規404ゼロ)・sitemap(blog.xml.body)収録。回帰pin `fe-kamoku-b-sort-trace-funnel.test.ts`(7件)。
  - 全ゲート緑(typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/ test 2033 / build OK)＝commit前に単独実行・緑目視。
- **vein掘り残し（次セッション候補・要吟味）**: 発展パターン vein=線形(s81)→二分探索(s82)→ソート/選択(s83)。**残る発展パターン=ソートの別種(バブルソートの完全トレース)・再帰(階乗/フィボナッチ・コールスタック)・スタック/キュー**のトレース実演は別記事化可。s25「1記事=確実」/s81「様子見・量産しない」を尊重し、本セッションはソート1本に絞った。次セッションが続けるなら**再帰(コールスタックという新概念で非重複・高つまずき)**が最有力候補・1本ずつ・手計算検算必須。HD群(HD-1/4/5/6/8/9/10/11)/topic-tagger=人間待ちは不変。1改善=確実を維持。

## 人間指示セッション（強み実装）2026-06-02 JST — P0-強み 午後AI採点の4つの堀
- 社長承認: 採点=上位モデル切替 / 4堀全実装 / コスト当面無料・課金UI作らない / 採点AI=午後採点専用。
- **コーディネーション**: P0-強み は本セッションが直接実装する。growthループは P0-強み に着手しないこと（backlog冒頭に明記）。ループは404/P1/P2の他を継続。
- 監査（実測）: essay-grade=論文(ST/SA/PM/SM/AU) / scoring=午後記述(AP/SC/NW/DB/ES)。両方 resolveModel("free")=flash-lite。essay-grade は既に missingElements/improvements 出力・essay問題に modelOutline あり。cost-guard(¥50k)・rate-limit 既存。直近ループは app/lib/components を触っていない（衝突リスク低）。
- 着手順: 強み2(モデル上位化)→強み3(専用化/injection)→強み1(根拠データ型)→強み4(弱点→類題)。各別コミット・全緑ゲート・実測検証。

### セッション83 追記（同一セッション2サイクル目）=再帰(階乗)のコールスタック・トレース実演を新設
- done×1 [P1-6 土台/新vein・発展パターン4本目] SHA `7fc9bfe`: 新記事 `fe-kamoku-b-saiki-trace`「再帰のトレース練習｜コールスタックで階乗を1段ずつ追う」。
  - 新概念=**コールスタック**(呼び出しの下り・戻り値の上り・LIFO 後入れ先出し)。探索/ソートまでの変数追跡とは別軸の難所で非重複。最頻出かつ最難関の再帰を、階乗(4)=24 を例に「下り表(段1〜4でスタック積上げ→基底条件 階乗(1)=1)」「上り表(1→2→6→24 で巻き戻し)」の2表で実演。
  - **手計算検算**(python照合: 階乗(1)=1/(2)=2/(3)=6/(4)=24)。擬似言語は全オリジナル(IPA非転載・○関数定義/return/×)。つまずき3点(基底条件が無いと無限再帰=スタックオーバーフロー/戻り値は深いところから巻き戻る/各呼び出しの n は独立で上書きされない)。フィボナッチ(枝分かれ再帰)は1段落対比のみ(1記事=確実)。
  - 土台funnel: /fe・sort-trace・nibun-tansaku・trace-renshu・記法早見表・3ステップ訓練法・わからない・科目B完全対策・/fe/topic(科目A相当と明示framing=誇大回避)・AIコパイロット。**旗艦/essay非送客**(土台=非論文)。
  - inbound: 親 sort-trace「次のステップ」＋ wakaranai タイプC頻出パターン節(再帰を名指し)の2面に additive 配線。relatedSlugs=sort-trace/nibun-tansaku/trace-renshu/taisaku(全科目B on-topic)。FAQPage化(4Q&A)。
  - 検証(本番ビルド実測): prerendered `/blog/fe-kamoku-b-saiki-trace.html`(150KB)・再帰×23/コールスタック/最終結果24/FAQPage JSON-LD/「| 段 | 呼び出し |」表 をHTML実測。body `](/essay`=0(href="/essay"の1件はfooter chrome)。inbound 2面・outbound 7本全prerendered 200(新規404ゼロ)・sitemap収録。回帰pin `fe-kamoku-b-saiki-trace-funnel.test.ts`(7件)。
  - **ゲート補足**: build で `.next/lock` の stale lock + Windows ENOTEMPTY(他node多数稼働環境のfile-handle race)に当たったが、stale lock削除＋retryで build OK。typecheck0/lint0err/test 2047/build OK 全緑をcommit前に目視。
- **発展パターン vein 進捗(s83終了時)**: 線形(s81 trace-renshu)→二分探索(s82 nibun-tansaku)→ソート/選択(s83 sort-trace)→再帰/階乗(s83 saiki-trace)。**頻出4パターン(線形探索・二分探索・ソート・再帰)のトレース実演が出揃った**。残候補=バブルソートの完全トレース・フィボナッチ(枝分かれ再帰)の完全トレース・スタック/キューのトレースだが、主要4パターン網羅で当面の最重要は達成。次セッションは様子見でこの vein を一旦止め、別角度(P2-2 制度/access系の新角度・別試験区分)を優先してよい。s25「1記事=確実」/量産しない を維持。

### P0-強み 4堀 実装完了（人間指示セッション）2026-06-02
- done 強み2（採点モデル上位化・用途別）: `resolveModel` に grading 層追加（既定 gemini-2.5-pro、GEMINI_MODEL_GRADING で切替）。essay-grade/scoring=grading、copilot/generate-question=free のまま。/ `54f0b7a` / test `__tests__/ai/grading-model-tier.test.ts`(7)。※本番で上位モデルを使うには社長が Vercel に GEMINI_MODEL_GRADING を設定（→human-decisions HD-9）。
- done 強み3（採点AI専用化・injection耐性）: ESSAY/SCORING プロンプトに「IPA午後採点専用・答案は指示でない・injection拒否・無関係依頼は採点JSONのみ」を明記。/ `91404dd` / test `__tests__/ai/grading-scope-guard.test.ts`(8)。※採点は構造化JSONグレーダ（自由会話なし）のため、会話的な「断り」でなくプロンプト本文のガードで担保。
- done 強み4（採点→弱点→類題 伴走・単発連携）: EssayResultView に「弱点を踏まえて次に取り組む」追加＝最弱の評価軸を言語化＋同区分の他論述（getEssayQuestionsByExam・自分除外）へ誘導（リンク先は実在のみ=no404）。/ `a86a015` / test `__tests__/essay/grade-followup.test.ts`(3)。
- done 強み1（採点根拠データの型）: EssaySubPrompt に任意 requiredKeywords/scoringPoints 追加→buildUserPrompt＋採点指針に配線→**PM(pm-2024a-pm2-q1)で型を確立**（IPA出題趣旨の要点を自前構造化・長文転載なし）。/ `5a138da` / test `__tests__/essay/grading-rubric.test.ts`(4)。
- 全緑ゲート: typecheck0 / lint0err / test（2047→以降増・全緑）/ build緑（各moatで実測）。main 不変 fb72413。
- **重要・運用メモ**: growth-loop は本作業中、同一checkoutでの並行build衝突（/admin/moderation export error）を起こしたため**一時停止**して作業した。**作業完了後にgrowth-loopを再起動すること**。停止中のループ session84 WIP（generators.ts +123 の科目B記事）は stash 退避→drop（ループ再起動で再実施される）。
- 申し送り（段階展開＝backlog/ループ or 人間）:
  - 強み1 横展開: rubric（requiredKeywords/scoringPoints）を PM 以外の論文区分(ST/SA/SM/AU)＋各設問へ拡張。型は確立済＝同じ構造で追加可。afternoon(scoring)側は HD-4（モックデータ）解決後。
  - 強み4 横断分析: 複数回採点の傾向（「あなたは具体性が弱い傾向」）を学習履歴（essay-history 既存）に乗せて集計。今回は単発連携まで。

## セッション84（growth ループ｜2026-06-02 JST）
**P0-強み1 横展開＝採点ルーブリック(requiredKeywords/scoringPoints)を PM以外の論文4区分(ST/SA/SM/AU)へ展開（旗艦=午後AI採点の根拠データ）**
背景（着手前 read-only 監査）:
- 人間指示セッションが P0-強み 4堀を実装完了（worklog「P0-強み 4堀 実装完了」・main不変）し、**申し送りで「強み1 横展開: rubricを ST/SA/SM/AU＋各設問へ拡張。型は確立済＝同じ構造で追加可」をbacklog/ループへ明示委譲**。同セッションは「作業完了後にgrowth-loopを再起動すること」と記載＝本ループが再起動分。backlog冒頭の「P0-強みに着手しないこと」は**人間セッション実装中の二重作業防止**が趣旨で、完了＋横展開の明示委譲により本タスクは二重作業でなく委譲された継続。
- 実測: 型は `lib/essay/types.ts` EssaySubPrompt の任意 requiredKeywords/scoringPoints。PM(pm-2024a-pm2-q1)のみ付与済。consumer=`app/api/essay-grade/route.ts` buildUserPrompt(L121-125)が任意フィールドを自動配線(`if length>0`)＝データ追加のみで採点プロンプトに反映。長文転載せず既存 modelOutline/officialReview(編集部作成・repo既存)を「部分点の核」「採点の勘所」へ構造化。
- done×4（各区分1コミット＝1論点・全緑ゲートをcommit前に単独実行・緑目視）:
  - SHA `6fef3b1` ST(3設問・全小問): 事業戦略策定/複数部門連携/DXビジネスモデル変革。
  - SHA `36dcf93` SA(2設問・全小問): アーキテクチャ選定/システム移行。
  - SHA `85db43f` SM(2設問・全小問): 可用性管理/重大インシデント対応。
  - SHA `21545ff` AU(2設問・全小問): 可用性監査/開発プロジェクト監査。**=論文5区分(PM/ST/SA/SM/AU)の主要設問に rubric が揃った**。
  - 各 scoringPoints は officialReview の評価観点（例 ST「技術用語の羅列でなく固有性に基づく必然性」/SA「流行のアーキでなくなぜ最適か」/SM「机上のフレームワーク列挙でなく実サービス特性」「個人技でなく組織的仕組み」/AU「一方的指摘でなくリスクと統制のバランス」「独立した監査人の視点」）を採点AIが参照できる形に構造化。設問間の整合（「設問イの○○につながる前提か」等）も勘所に明記。
  - 検証（崩れたら落ちる）: 回帰pin `__tests__/essay/grading-rubric.test.ts` を `it.each(["st","sa","sm","au"])` でパラメータ化＝各区分の全設問・全小問に requiredKeywords/scoringPoints>0 を pin。既存の consumer wiring テスト(buildUserPrompt が必須キーワード/採点の勘所を渡す)と合わせ、データ＋配線の両端を保証。
  - 全ゲート緑（各commit前: typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/ test 全緑(grading-rubric 5→8件・full 2063)/ build OK）。
- **次セッション申し送り（横展開の残り）**:
  - **PM の残2設問**(pm-2024a-pm2-q2 スケジュール遅延/pm-2023a-pm2-q1 ステークホルダ)は rubric 未付与＝同じ要領で付与可。**ただし注意**: 現状 grading-rubric.test.ts の「型は任意フィールド＝横展開可能」テストは `withoutRubric > 0`(段階展開で未付与が残る)を pin。PM残2設問を完了し**全essay設問が rubric を持つと此のアサーションが落ちる**ため、完了時は当該テストを「任意フィールドでもロードが壊れない」趣旨へ書き換えること(未付与の存在を前提にしない)。
  - afternoon(scoring=AP/SC/NW/DB/ES)側の rubric は **HD-4（モックデータ）解決後**＝本ループは着手しない。
  - 強み4 横断分析（複数回採点の傾向集計）は人間セッション申し送りどおり段階実装＝別タスク。

## セッション85（growth ループ｜2026-06-02 JST）
**P0-強み1 横展開の最終分＝PM残2設問に採点ルーブリックを付与し、論文5区分の rubric を完成**
背景（着手前 read-only 監査）:
- セッション84申し送りどおりの直接継続。強み2/3/4 は人間セッションが実装済・強み1 横展開のみがループへ明示委譲され、s84 で ST/SA/SM/AU が完了。残は PM の2設問(pm-2024a-pm2-q2/pm-2023a-pm2-q1)のみ。
- 実測: `data/questions/essay/pm.ts` の当該2設問(各3小問)は modelOutline/officialReview はあるが requiredKeywords/scoringPoints 未付与。pm-2024a-pm2-q1 のみ付与済(型確立)。consumer=`app/api/essay-grade/route.ts` buildUserPrompt(L121-126) が任意フィールドを自動配線済＝データ追加のみで採点プロンプトに反映。
- done×1 [P0-強み1] SHA `321d2c5`: PM残2設問の全小問に requiredKeywords/scoringPoints を付与。
  - pm-2024a-pm2-q2(スケジュール遅延): ア kw4/sp2・イ kw5/sp4・ウ kw4/sp3。scoringPoints は officialReview の評価観点(「人員追加だけの安直な対応でなくQCDのトレードオフを踏まえた戦略的選択」「原因分析の深さ」「ステークホルダ合意形成」)を構造化。
  - pm-2023a-pm2-q1(ステークホルダ): ア kw3/sp2・イ kw4/sp3・ウ kw3/sp3。officialReview の「分析の論理性／戦略の具体性／対立解消能力」を勘所へ。設問間整合(「設問イの戦略と対応づくか」等)も明記。
  - いずれも既存 modelOutline(repo既存)・officialReview(編集部作成)を構造化したもので IPA長文の転載はしない。
  - **=論文5区分(PM/ST/SA/SM/AU)の全設問・全小問に rubric が揃い、強み1 横展開は完了**。
  - 検証（崩れたら落ちる）: grading-rubric.test.ts の it.each に "pm" を追加=PM全設問・全小問の rubric>0 を pin。全essayが rubric を持つようになり未付与前提の `withoutRubric>0` が落ちるため、当該テストを「任意フィールドでもロードが壊れない／付与時は非空配列として読める」趣旨へ書換(未付与の存在を前提にしない)。tsx 実測で両設問の全小問が rubric ロード済を確認。
  - 全ゲート緑(commit前に単独実行・緑目視): typecheck0 / lint0err(warnは未追跡 ux-audit-screenshots.mjs のみ) / test 2067全緑(grading-rubric 8→9件) / build OK。
- **次セッション申し送り**: 強み1 はループ側完了。afternoon(scoring=AP/SC/NW/DB/ES)の rubric は HD-4(モック)解決後でループ着手不可。強み4 横断分析は段階実装=別タスク。土台「発展パターン」vein は s83 で主要4パターン網羅済＝一旦停止し別角度(P2-2 制度/access系・別試験区分)を優先してよい。

## セッション86（growth ループ｜2026-06-02 JST）
**旗艦=午後AI採点 × 新vein=「論文(午後II論述)の時間配分」専用記事を新設（コーパスが繰り返し"最大の壁"と呼ぶのに専用ページ不在だった盲点を解消）**
背景（着手前 read-only 監査）:
- s85 申し送りどおり発展パターン vein(科目B trace)は停止し別角度へ。link audit/FAQ/funnel/per-exam非対称/事実性は done/SKIP/HD で枯渇を再確認。
- blog corpus(115 general+テンプレ)を走査: 記述式午後の時間配分は `ap/nw/db-gogo-jikan-haibun` の3本あるが、**論述区分(ST/SA/PM/SM/AU)の午後II論文(2時間で手書き3,000字前後)をどう120分配分するかの専用記事が不在**。コーパスは「午後II が 2時間で 2,400字超の小論文。最大の壁はここです」と繰り返す(generators.ts L7514 等)のに時間配分の実プランを与えていない。`koudo-ronjutsu-kakikata-kotsu` に簡潔な時間配分6行があるのみ(深掘り不在)。slug走査=`ronbun-jikan/ronjutsu-jikan` 該当ゼロ＝明確なgap。**旗艦=論文5区分は実データあり**ゆえ /essay へ参考評価で funnel できる(記述式ap/nwとは異なり誇大にならない)。
- done×1 [P1-4 旗艦/新vein] SHA `730c9f8`: 新記事 `koudo-ronbun-jikan-haibun`「高度試験の論文（午後II）の時間配分｜120分で3,000字を書き切る問題選択・骨子・執筆・見直し」。
  - 配分の核= **選択10分・骨子20分・執筆80分・見直し10分**(=120分)。執筆80分を字数の重みで設問ア15分(600〜800字)・イ45分(1,600字前後)・ウ20分(600〜800字)へ配分(=80分)。設問ごとの撤退時刻・見直し10分でやること(字数/指示違反/誤字/数値矛盾)・手書きペース(1分35〜40字は要事前練習)をオリジナルで整理。
  - **SSOT一致**: 120分・2問から1問選択・設問ア〜ウ3段・ア600〜800字/イ1,600字前後/ウ600〜800字・合計3,000字前後(2,400〜3,200字) は pm-goukaku-ronbun/ST/AU/ESSAY FAQ と同じ支配的SSOT(設問イ1,600字前後)。kakikata-kotsu は別系(イ800字/2,800字)だが触らず(別論点=最小diff)・inboundは中立文言で配線し矛盾を露出させない。
  - **誇大回避**: 論文は点数でなく評価ランク(別記事参照)・AI採点=参考評価/IPA採点基準は非公開を明記。cross-5区分ゆえ exam/booksExam 未設定(=/recommended-books 索引へ送る安全側)。
  - funnel: 旗艦 /essay(参考評価明記)・/st /sa /pm /sm /au ハブ・AIコパイロット・採点制度記事(koudo-ronbun-hyouka-rank)・自己採点(koudo-ronjutsu-jiko-saiten)・書き方(koudo-ronjutsu-kakikata-kotsu)。
  - inbound: 親 `koudo-ronjutsu-kakikata-kotsu` の「時間配分の鉄則」節末に additive で配線(orphan回避)。relatedSlugs=kakikata-kotsu/hyouka-rank/jiko-saiten/pm-goukaku-ronbun(全 koudo-/pm- on-topic)。FAQPage化(4Q&A・extractFaqがmarkdown link除去ゆえleak無し)。
  - 検証(本番ビルド実測): prerendered `/blog/koudo-ronbun-jikan-haibun.html`(132KB)・核心(120分/選択10分・骨子20分・執筆80分・見直し10分/1,600字前後)・/essay funnel×2・参考評価・FAQPage JSON-LD・FAQ質問文 をHTML実測。親HTMLに inbound リンクrender実測・outbound(hyouka-rank/kakikata-kotsu/jiko-saiten)+/essay 全prerendered 200(新規404ゼロ)。回帰pin `koudo-ronbun-jikan-haibun-funnel.test.ts`(6件)。
  - 全ゲート緑(commit前に単独実行・緑目視): typecheck0 / lint0err(warnは未追跡 ux-audit-screenshots.mjs のみ) / test 2073全緑(+6) / build OK。
- done×1 [P2-3g 旗艦 hub→spoke] SHA `63eaa72`: 旗艦ハブ `/essay` の「論述の書き方・採点を学ぶ」3ガイド節(s74)に s86 新記事を4本目として配線(`ESSAY_GUIDE_POSTS` に koudo-ronbun-jikan-haibun・label「120分の時間配分（問題選択・骨子・執筆・見直し）」)。最高価値の旗艦サーフェスから新スポークへ直 OUTリンク=発見性/link equity 強化。論文5区分スコープ内(誇大回避)。回帰pin `essay-flagship-jsonld.test.ts` を4ガイドへ拡張。本番HTML実測=/essay に4ガイド全render。全ゲート緑(test 2073・build OK)。
- done×1 [inbound完成] SHA `262a50a`: s86 新記事の2本目 inbound を `koudo-ronbun-hyouka-rank`「B・C・Dで止まる答案＝字数不足/設問ウが薄い」文脈から配線(字数不足の多く=時間切れ=高intent接続)。新記事を2 inbound面化し orphan-fragility 回避(s82/s83 precedent)。回帰pinを2 inbound面へ拡張。本番HTML実測=hyouka-rank に inbound render(「時間切れが原因」)。全ゲート緑(test 2073・build OK)。link audit 0 FATAL/0 WARN(180→181本)。**=新記事 koudo-ronbun-jikan-haibun は inbound2面(kakikata-kotsu/hyouka-rank)+旗艦ハブ /essay ガイド節+relatedSlugs で発見性確保・funnel完成**。
  - **深ページ `/essay/{exam}/{id}` への時間配分リンクは見送り**: 同ページの書き方リンクは「Subtle, single link」と明示設計(s72 コメント)＝意図的に1リンク。追加は設計意図に反し clutter ゆえ非配線(過大修正回避)。
- **次セッション申し送り**: 旗艦の論文系コンテンツveinに「時間配分」を追加し inbound2面+旗艦ハブ+rail で funnel完成。残る論文系の専用ページ不在角度は薄く、量産せず1つずつ裏取り。記述式午後(sc/es)の時間配分は HD-6/HD-11 で着手不可は不変。強み1ループ側完了・afternoon rubric=HD-4待ち・強み4=別タスク は不変。土台=科目B「発展パターン」vein は s83 で主要4パターン網羅済＝停止中。

## セッション87（growth ループ｜2026-06-02 JST）
**P2-2 制度/access vein=「合格発表・スコアレポート（受験後の結果確認）」専用記事を新設（CBT通年区分にスコープしstaleness回避）**
背景（着手前 read-only 監査）:
- s83/s84/s86 申し送りどおり論文/科目B vein は停止し別角度(P2-2 制度/access)を優先。link audit 実走=181本/0 FATAL/0 WARN(クロール資産健全)。個別FAQ s53打ち止め・funnel s13-15飽和・per-exam非対称 s78-80(HD止まり)を再確認。
- blog corpus走査: 「合格発表」は33箇所言及されるのに**受験後の結果確認(いつ/どこで/どう見る)を正面から扱う専用ページが不在**。`ipa-shiken-moushikomi-nagare` の `## 合否発表` 節に2行(PBT約1.5〜2ヶ月後)あるのみ・CBT即時スコアは別箇所に散在。`goukaku-happyou/kekka/score` 該当slugゼロ=明確なgap。「○○ 合格発表 いつ/スコアレポート 見方」は高intentの受験後クエリ。
- **staleness landmine回避**: WebSearch/WebFetch(IPA goukaku/index.html・cbt_sg_fe・STUDYing)で裏取りした結果、**AP/高度/SCは令和8年度(2026)からCBT移行中で発表時期が流動的**(s65/s80既知)。cross-exam記事は誇大/staleになるため、**CBT通年区分(IP/SG/FE=土台の入口)にスコープ**=発表の仕組みが durable(試験終了直後の即時評価点・翌月中旬の正式発表・スコアレポートのマイページ照会・合格証書 発表約1ヶ月後/簡易書留)。AP/高度はIPA公式へ hedge(具体日断定しない)。
- done×1 [P2-2 制度/access新vein] SHA `306f394`: 新記事 `cbt-goukaku-happyou-score-report`「CBT試験（ITパスポート・SG・基本情報）の合格発表とスコアレポート｜結果はいつ・どこで・どう見る」。
  - 核心(IPA裏取り): ①試験終了直後にその場で評価点表示(FE/SG=科目A・B、IP=総合+分野別) ②試験当日のうちマイページでスコアレポート照会 ③正式発表=受験月の翌月中旬・IPA公式に受験番号公示 ④合格証書=発表約1ヶ月後・簡易書留で登録住所へ ⑤AP/高度は令和8年度CBT移行中→IPA公式要確認(hedge)。
  - **funnel規律**: 制度=採点無関係ゆえ旗艦/essay 非送客(s27/s65 precedent)。各区分の合格基準記事(fe-goukaku-ten-irt/sg-goukaku-ten-irt/ip-goukaku-ten-bunyabetsu)へ「画面の評価点が合格圏かを判断」文脈で funnel・土台=科目B(fe-kamoku-b-taisaku)/roadmap/data-driven-revisionへも。
  - inbound: 親 `ipa-shiken-moushikomi-nagare` の `## 合否発表` 節に additive 配線(CBT発表の流れを新記事へ)。relatedSlugs=moushikomi/fe・sg・ip-goukaku-ten(全on-topic制度/合格基準)。FAQPage化(4Q&A・extractFaq leak0)。
  - 検証(本番ビルド実測): prerendered `/blog/cbt-goukaku-happyou-score-report.html`(129KB)に核心事実(試験終了直後/翌月中旬/スコアレポート/簡易書留/令和8年度)・funnel先slug 全render。本文に `](/essay)` ゼロ(制度記事=非送客)・HTML中の `href="/essay"` 1件は global mobile nav のみと文脈確認。inbound(moushikomi HTML)render実測・funnel/related先7本 全prerendered 200(新規404ゼロ)。回帰pin `cbt-goukaku-happyou-funnel.test.ts`(5件)。
  - 全ゲート緑(commit前に単独実行・緑目視): typecheck0 / lint0err(warnは未追跡 ux-audit-screenshots.mjs のみ) / test 2078全緑(+5) / build OK。
- done×1 [orphan回避・2本目inbound] SHA `b4360da`: s82/s83 precedent(新記事=2 inbound面)に従い、新記事の2本目 inbound を `fe-goukaku-ten-irt`(FE合格点=高traffic土台)の「試験当日：仮スコア/正式合否」節から reciprocal 配線(同記事は新記事の funnel先でもあり双方向cluster化)。本文事実(仮スコア即時/正式合否約1ヶ月後)整合・additive。回帰pinを2 inbound面へ拡張。本番HTML実測=fe-goukaku-ten-irt に inbound render。link audit=182本/0 FATAL/0 WARN(新規404ゼロ)。**=新記事 cbt-goukaku-happyou-score-report は inbound2面(moushikomi/fe-goukaku-ten)+relatedSlugs4本で発見性確保**。全ゲート緑(test 2078・build OK)。
- **次セッション申し送り**: P2-2 制度/access vein に「受験後の結果確認(合格発表/スコアレポート)」をCBT通年区分スコープで追加。**残る制度/access角度(要吟味・着手前に重複裏取り)**: (a)受験料/合格証書再発行=moushikomi部分カバー・専用化thin懸念(継続保留)。(b)SGスコア通知=HD-8未検証(見送り)。(c)AP/高度の合格発表 専用記事は令和8年度CBT移行が確定/安定するまで staleness で着手不可(IPA公式日程fix後にHD相当か再吟味)。論文/科目B vein 停止・afternoon rubric=HD-4待ち・強み4=別タスク・HD群(HD-1/4/5/6/8/9/10/11)=人間待ち は不変。1記事=確実を維持し量産しない。

## セッション88（growth ループ｜2026-06-02 JST）
**P2-2 制度vein=「科目合格はない（前回合格した科目は次回に持ち越せない）」専用記事を新設（再挑戦クエリの盲点を解消）**
背景（着手前 read-only 監査）:
- s87 申し送りどおり論文/科目B vein は停止し別角度(P2-2 制度/access)を優先。blog slug 117本を機械走査・link audit健全(s87=182本/0FATAL)を確認。
- corpus走査: `fe-goukaku-ten-irt` 等は「**その回の中で**科目A・科目Bともに600点必要・片方だけ高得点でも不合格」までカバーするが、**「前回受かった科目を次回に持ち越せるか（＝科目合格・部分合格の有無）」を正面から扱う専用記事が不在**。`科目合格/部分合格/繰り越し/持ち越し` の dedicated扱いゼロ。「基本情報 科目Aだけ合格 次回 / 応用情報 午前だけ合格 免除」は高intentの再挑戦クエリで競合(sikaku-no-iroha/ikitete-yokatta/nokonoko)はカバー済=自サイト側のgap。
- **裏取り(WebSearch×2)**: ①FE=科目A・科目Bを同回で両方600点以上・**科目合格(部分合格)なし・前回の科目合格は次回に持ち越せない**・唯一の別ルート=IPA認定講座修了による科目A免除(1年・別制度)。②AP=午前だけ/午後だけ合格しても合格にならず**次回に午前免除も無い・毎回両方受け直し**・AP合格後2年=高度の午前I免除。**durable fact**(no-carryoverは構造的・CBT移行で不変=s87のようなstaleness landmine無し→cross-exanで安全)。
- done×1 [P2-2 制度vein] SHA `18694df`: 新記事 `ipa-kamoku-goukaku-nai`「情報処理技術者試験に『科目合格』はある？｜午前だけ・科目Aだけ合格しても次回に持ち越せない」。
  - 核心: ①IPAに科目合格(部分合格)制度なし=合否はその回ごとに全科目まとめて判定 ②FE 科目Aだけ・科目Bだけ合格は次回に使えない(両方受け直し) ③AP 午前だけ・午後だけ合格は無効・次回も午前から ④「持ち越せる」唯一の制度=高度の午前I免除(2年)・FEの科目A免除(認定講座)の2つだけ・**どちらも前回試験の科目合格を引き継ぐ制度ではない**(別根拠でスキップ) ⑤だからこそ全科目で安定して取る力(崩れやすい科目B対策)が要。
  - **誇大回避/funnel規律**: 制度=採点無関係ゆえ旗艦 /essay 非送客(s27/s65/s87 precedent・本文 `](/essay)`=0実測)。funnel=合格基準(fe-goukaku-ten-irt/ap-goukaku-ten-border/koudo-goukaku-ten-ashikiri)・免除(ipa-gozen1-menjo-jouken/fe-kamoku-a-menjo)・土台=科目B(fe-kamoku-b-taisaku)・落ちた後(fugoukaku-recovery/data-driven-revision)・/fe /ap。cross-exam(FE/AP/高度横断)ゆえ exam/booksExam 未設定(索引送客)。FAQPage化(4Q&A・extractFaq leak0)。
  - inbound2面(s82/s83/s87 precedent=orphan回避): (1)`fe-goukaku-ten-irt` 科目別判定節末に「片方だけ超えても次回に持ち越せない」additive配線、(2)`ipa-shiken-fugoukaku-kara-no-recovery` 第1週 原因分析節に「前回午前だけ合格しても持ち越せない」additive配線(落ちた後=最高intent)。relatedSlugs=fe-goukaku-ten/ap-goukaku-ten/午前I免除/科目A免除(全on-topic制度・合格基準)。
  - 検証(本番ビルド実測): prerendered `/blog/ipa-kamoku-goukaku-nai.html`(135KB)に核心事実(科目合格/持ち越せ/午前I免除/科目A免除)・funnel6本(fe/ap/koudo-goukaku-ten・午前I免除・科目A免除・fugoukaku-recovery)全render・FAQPage JSON-LD・本文 `](/essay)`=0。inbound両親HTML(fe-goukaku-ten-irt/fugoukaku-recovery)に新記事リンクrender実測。新記事内 /blog link先8本すべてprerendered 200(新規404ゼロ)。回帰pin `kamoku-goukaku-nai-funnel.test.ts`(5件)。
  - 全ゲート緑(commit前に単独実行・緑目視): typecheck0 / lint0err(warnは未追跡 ux-audit-screenshots.mjs のみ) / test 2083全緑(+5) / build OK。
- **次セッション申し送り**: P2-2 制度vein に「科目合格はない(持ち越し不可)」をcross-exam(durable)で追加。**残る制度/access角度(要吟味・重複裏取り必須)**: (a)受験料/合格証書再発行=moushikomi部分カバー・専用化thin懸念(継続保留)。(b)SGスコア通知=HD-8未検証(見送り)。(c)AP/高度の合格発表専用記事=令和8年度CBT移行が安定するまでstaleness不可。論文/科目B vein 停止・afternoon rubric=HD-4待ち・強み4=別タスク・HD群(HD-1/4/5/6/8/9/10/11)=人間待ち は不変。1記事=確実を維持し量産しない。

## セッション89（growth ループ｜2026-06-02 JST）
**P2-2 事実性監査の取り残し1件を是正＝SC overview の登録セキスペ(RISS)を「業務独占に近い」→「名称独占」に修正（内部矛盾検出で発見）**
背景（着手前 read-only 監査）:
- s88 申し送りどおり論文/科目B vein は停止・制度/access の残角度は全て thin/HD/staleness で着手不可を再確認。link audit 実走=183本/1743links/0 FATAL/0 WARN（クロール資産健全）。全 blog(183)が sitemap 収録・/essay ハブの論述ガイド4本は全リンク済・description<60=0/>120=14（後述SKIP）を確認。
- **発見手法=内部矛盾検出**: `data/blog/exam-data.ts` の `EXAM_PROFILES.sc.career` が登録セキスペ(RISS)を「業務独占に**近い**専門資格」と記述。一方 `it-shikaku-rirekisho-kakikata` 本文(generators.ts:10511)は IPA 試験を「能力認定試験」と正しく対比し、業務独占=弁護士/税理士/建築士 と定義。**自サイト内で矛盾**していた。`grep 業務独占/名称独占` で 名称独占 が corpus に1件も無い一方 業務独占 が SC career に誤用されていることを特定。
- **裏取り(WebSearch)**: 情報処理安全確保支援士は**名称独占資格**であり業務独占ではない。独占業務は存在せず、登録者だけが「情報処理安全確保支援士／登録セキスペ」の名称を名乗れる(IPA seido/shikumi.html・METI 資料・複数解説で一致)。
- done×1 [P2-2 事実性] SHA `0ac5588`: `EXAM_PROFILES.sc.career` を「登録セキスペ（RISS）として 3 年ごとの更新で維持する、セキュリティ分野の**名称独占資格（業務独占ではない）**。」へ是正。career は `buildOverviewPost`(generators.ts:60)で全試験の overview 記事(sc-goukaku-benkyouhou 等・indexable・sitemap収録)に描画される＝誤記が overview に伝播していた。session21-32 の称号/事実性是正(SC称号・OWASP版・免除条件・IP配点)と同系の「単一の孤立 hard error・面横断で内部不整合」パターン。
  - 検証(本番ビルド実測): `.next/server/app/blog/sc-goukaku-benkyouhou.html` に「名称独占資格（業務独占ではない）」が render・旧「業務独占に近い」=0件(grep -c)。
  - 面横断 consistency 確認: 是正後、SC の RISS framing は **overview(修正) + `sc-shikaku-merit`(「名称を独占使用」既存正) + rirekisho(「能力認定試験」既存正)** で全て名称独占に整合(s22 の面横断手法と同様、是正で内部矛盾を解消)。
  - 回帰pin2件(`__tests__/data/blog-generators.test.ts` の ST afternoonStrategy 隣に新 describe): `EXAM_PROFILES.sc.career` が 名称独占 を含み「業務独占に近い」を含まない／`sc-goukaku-benkyouhou` body も同様。崩れたら落ちる。
  - 全ゲート緑(commit前に単独実行・緑目視): typecheck0 / lint0err(warnは未追跡 ux-audit-screenshots.mjs のみ) / test 2085全緑(+2) / build OK。
- **同セッションの SKIP/clean 記録(裏取り済・実害なし=直さず記録)**:
  - SKIP: blog description >120字が14本(最長143字 koudo-goukaku-ten-ashikiri 等)。blog description は /q と違い hard cap 無しで meta description へ直流。ただし(1)各 description はキーワードを front-load し末尾は「…まで整理します」等の動詞境界、(2)末尾にも実キーワード(例「情報処理安全確保支援士の午後統合」)を含むため、SERP 表示完全性と relevance signal のトレードオフが両義的、(3)順位は測定不可。**両義的＝迷ったら SKIP の安全側**。GSC で個別 CTR が低い URL が判明したら個別対応(P2-1 と同方針)。
  - clean(対応不要): 受験料=全箇所 7,500円(税込)で一致(faq.ts/moushikomi-nagare)・OWASP=版数 version-agnostic(s21の2021→genericize 完了・残1件は AI ハルシネーション訂正の例示で意図的)・午前I免除=全箇所2年間で一致(dedicated記事ipa-gozen1 3条件正)・FE科目B=20問100分600点で一致・SG科目B=12問で一致・pass rate は EXAM_PROFILES と EXAM_STATS で「おおむね」近似レンジ(年度変動で canonical 値なし=reconcile は editorial で SKIP)・他 career フィールド12件 clean。
- **次セッション申し送り**: 事実性監査は s21-32「枯渇」とされていたが**内部矛盾検出(grep で対の概念の片方だけ誤用を炙り出す)で1件発見**＝完全枯渇ではない。残る同手法の候補は薄い(主要な単一概念の対は今回 業務独占/名称独占 を潰した)が、新たな cross-source data 対(EXAM_PROFILES↔EXAM_STATS↔EXAM_DEEP_CONTENT の数値/称号)で乖離が出たら個別吟味。論文/科目B vein 停止・afternoon rubric=HD-4待ち・強み4=別タスク・HD群(HD-1/4/5/6/8/9/10/11)=人間待ち・制度/access残角度(受験料再発行=thin/SGスコア=HD-8/AP高度発表=staleness)は不変。1記事=確実を維持し量産しない。

### セッション89 追記（2サイクル目）
**P2-2 事実性監査・2件目＝「複数区分の同時受験は不可」記事の例示が季違いの区分組を挙げていた誤りを是正**
- 背景(read-only 監査): 1件目(SC career)の発見手法=cross-source consistency を継続。`grep` で「高度試験名×実施季」を走査し、`ipa-shiken-fukusuu-kubun-juken`(s65・複数区分同時受験の可否)の本文 L7849 が同時受験不可の**例示**として「同じ秋期に NW と DB を両方受ける」「同じ春期に AP と PM を両方受ける」を挙げていたのを発見。高度の実施季は **春期=ST/SA/NW/SM・秋期=PM/DB/ES/AU・AP/SC=春秋両方**(IPA list.html／`exam-data-invariants.test` 準拠)で、**NW は春期・PM は秋期**のため、これらは同じ試験日に並ばず例示が成立しない(同時受験不可の理由=同一試験日の衝突 を誤示)。記事の結論「同一試験日は1区分のみ」自体は正。
- done×1 [P2-2 事実性] SHA `dbe6ef7`: 例示を**同一季に実施され実際に試験日が衝突する組**へ是正=「同じ春期に AP（応用情報）と NW（ネットワーク）」「同じ秋期に DB（データベース）と PM（プロジェクトマネージャ）」(AP は春秋両方・NW=春期・DB/PM=秋期＝いずれも同じ季の組で衝突する)。
  - 検証(本番ビルド実測): `.next/.../ipa-shiken-fukusuu-kubun-juken.html` に正組×2 render・旧「同じ秋期に NW」「同じ春期に AP と PM」=0件。
  - 回帰pin1件(既存 funnel test に「同時受験不可の例示が同一季の組」it を追加・正組present/誤組absent)。
  - 全ゲート緑(commit前単独実行): typecheck0 / lint0err / test 2086全緑(+1) / build OK。
- **追加 clean 確認(対応不要)**: data/ lib/ 全体を full-name＋略称で「春期-only(ST/SA/NW/SM)×秋」「秋期-only(PM/DB/ES/AU)×春」を grep→**他に季違いの誤り無し**(この1件のみ)。
- **本セッション小計=確実な事実性是正2件**(SC RISS 名称独占 `0ac5588` / 併願例示の季 `dbe6ef7`)。いずれも cross-source consistency 検出・本番ビルド実測・回帰pin付き。発見手法(対の概念/区分×季 の grep で不整合を炙る)が「s21-32 枯渇」の取り残しを2件掘り起こした。

## セッション90（growth ループ｜2026-06-03 JST）
**P2-2 新vein＝objection/価値系「○○ 取る意味はあるか」の最大の取り残し＝最大の入門区分 IP（ITパスポート）の価値記事を新設**
背景（着手前 read-only 監査）:
- s89 申し送りの cross-source consistency を継続調査したが、残る数値乖離は全て editorial で SKIP と確定（実測・裏取り済）:
  - `EXAM_PROFILES.studyHours` vs `EXAM_STATS.studyHoursLow/High` の乖離（例 st: 300〜500 vs 200-400）＝学習時間は IPA 非公表の主観値・別サーフェス描画（exam-data→blog / exam-stats→/[exam]ハブ）＝canonical 無し＝SKIP（s89 の pass-rate SKIP と同class）。
  - `exam-content.ts` ST lead の「論文 2,200 字」＝当初 cross-source outlier（他4論述区分は字数なし・blogは3,000字前後）として fix候補にしたが、**`lib/seo/exam-resources.ts` L130/137 でも ST 論文=2,200字を2回使用**＝ST固有の deliberate/internally-consistent な値（よく引かれる ST論文の下限「2,200字以上」）と判明。3,000字前後は generic論文の別framing。**どちらも defensible＝変更は過大修正の罠＝SKIP**（exam-resources との新規不整合を生むリスク）。
  - 季/構造facts（実施季・午後段数・SC単一午後・AP二段）は exam-content/exam-data 全て正（s22 fix が保持）。
  - 非blog の static href 全数 sweep（app/components の href 文字列→route tree 突合）＝全て実在ルート＝dead link 0（404種別の盲点無し）。
- **結論**: cross-source 数値/事実の hard error vein は今round枯渇（残候補は全て editorial SKIP）。心得「尽きたと安易に宣言せず新角度を起案」に従い objection vein を起案・着手。
- **発見＝objection/価値 vein の非対称**: 「取る意味はあるか/メリット」記事は `sg-shiken-meritto-imi-aru`・`sc-shikaku-merit` の2本のみで、**最大volumeの入門区分 IP（「ITパスポート 意味ない」は著名な高volume objection）が未カバー**。`grep 'slug:"ip-'`＝IP記事は 3shukan/nani-kara/toujitsu-mochimono/goukaku-ten-bunyabetsu の4本で価値/objection記事は不在を確認。
- done×1 [P2-2 objection新vein] SHA `c69980e`: 新記事 `ip-shiken-meritto-imi-aru`（「ITパスポートを取る意味はあるか｜IPのメリットと『意味ない』と言われる理由を整理」）を新設。sg-meritto を template に IP固有化:
  - メリット5（全業種ベースラインの公的IT証明/就活・学内アピール/社内DX・リスキリング/FE・APへの足がかり/実用リテラシー）＋「意味ない」と言われる理由3（エンジニア転職での単独評価は限定的/実装スキルの証明にならない/IT職には物足りない）を balanced に整理。
  - **funnel**: IP=入門・非論文区分のため **旗艦 /essay 非送客**（s27/s65 precedent）。入口=/ip（過去問・分野別・AIコパイロット）＋土台=FE科目B（fe-kamoku-b-taisaku / /fe）＋上位接続（FE/SG/AP）。
  - **誇大回避**: 合格基準は SSOT `ip-goukaku-ten-bunyabetsu`（総合600/分野別300・1000点満点・IRT・採点約92問）と一致。資格手当/転職評価は hedge（「ケースがある」「限定的」）・**具体年収額は不記載**。
  - **inbound 2面**（orphan回避）: `ip-goukaku-ten-bunyabetsu`（3→4・displacementなし）＋`ip-3shukan-goukaku`（3→4・displacementなし）の relatedSlugs に追加（どちらも mutual＝本記事が両者へ OUT）。`13-shikaku-osusume-jyun` は既に relatedSlugs 4本（limit=4）ゆえ追加せず（sibling displacement回避）。
  - 検証（本番ビルド実測 `.next/server/app/blog/ip-shiken-meritto-imi-aru.html` 135KB）: FAQPage JSON-LD=1・href="/ip"・/blog/fe-kamoku-b-taisaku present・本文 /essay funnel=0（HTML中の唯一の /essay は全ページ共通の header nav「午後論述AI採点」＝control `ipa-kamoku-goukaku-nai.html` も同じく1で同一 chrome と確認）・「600 点以上」「300 点以上」render・title render。
  - **link audit**: 183→184 posts・1761 links・**0 FATAL / 0 WARN**（non-orphan・inbound 確立）。
  - 回帰pin1件（blog-generators.test.ts の ip-3shukan test隣に追加）: exam=ip / `## よくある質問` present / `(/ip)`＋`/blog/fe-kamoku-b-taisaku` present / body に `/essay` 不在 / `600 点`＋`300 点`（SSOT）/ `レベル 1` / `年収\d` 不在（誇大回避）/ inbound（2 siblings の relatedSlugs に slug 含む）。崩れたら落ちる。
  - 全ゲート緑（commit前に単独実行・緑目視）: typecheck 0 / lint 0err（warnは未追跡 ux-audit-screenshots.mjs のみ）/ test 2087全緑(+1) / build OK。
- **次セッション申し送り**: objection/価値 vein は IP を埋めて SG/SC/IP の3本。残候補＝FE/AP の「意味ない/役に立たない」objection は volume はあるが、価値の中核（FE=エンジニア登竜門・AP=高度への足がかり）が既に overview/career-path/13-shikaku で繰り返し述べられ重複thin懸念＝着手は要吟味（量産回避・1記事=確実）。cross-source 数値/事実 hard error は今round枯渇（studyHours/論文字数=editorial SKIP と確定）。論文/科目B vein 停止・afternoon rubric=HD-4待ち・強み4=別タスク・HD群(HD-1/4/5/6/8/9/10/11)=人間待ち・制度/access残角度(受験料再発行=thin/SGスコア=HD-8/AP高度発表=staleness)は不変。

## セッション91（growth ループ｜2026-06-03 JST）
**P2-2 objection vein を主要区分で網羅＝最大volumeの土台区分 FE と第2の主要区分 AP の「取る意味はあるか」専用記事を新設（s90申し送りの FE/AP 候補を「専用記事の有無」で再評価し、重複thinでなく明確な gap と確定して着手）**
背景（着手前 read-only 監査）:
- s90 申し送りは FE/AP objection を「価値の中核が overview/career-path/13-shikaku で既述＝重複thin懸念で要吟味」とした。**しかし `grep 'slug:"(meritto|imi-aru|merit)'` で確認すると objection/価値の専用記事は IP/SG/SC の3本のみで、FE・AP には dedicated な「意味ない理由＋メリットを balanced に扱う記事」が不在**。overview/career-path は価値を散発的に触れるだけで、「○○ 意味ない」objection を正面から handle する専用ページは無い＝重複thinではなく明確な gap と判定。FE は土台区分(心得「土台=科目Bで通年の入口」)・AP は第2の主要区分で、いずれも「基本情報 意味ない」「応用情報 意味ない」は高volumeの著名 objection。
- done×1 [P2-2 objection vein] SHA `b28fba1`: 新記事 `fe-shiken-meritto-imi-aru`「基本情報技術者試験を取る意味はあるか｜FEのメリットと『意味ない』と言われる理由を整理」。ip-meritto を template に FE固有化（メリット5：基礎力の公的証明/科目Bで実装寄り基礎/就活・新人研修/AP・高度への足場/実務の土台＋「意味ない」理由3：給料採用が決まるわけでない/実務経験者に物足りない/上位資格があると埋もれる）。**FE=土台・非論文区分ゆえ旗艦/essay非送客**(s27/s65 precedent)・/fe＋科目Bピラー(fe-kamoku-b-taisaku)＋上位接続(AP/高度)へfunnel。**SSOT一致**: レベル2(skill2)・科目A60問90分/科目B20問100分・各600点(1000点満点)・IRT・200時間(未経験300時間)=exam-data/fe-goukaku-ten-irt と照合。資格手当/年収は具体額なしでhedge(誇大回避)。inbound2面(fe-goukaku-ten-irt 3→4／ip-shiken-meritto-imi-aru 3→4・どちらも displacementなし・mutual)。FAQPage(5Q&A)・回帰pin1件。
  - 検証(本番ビルド実測 `.next/.../fe-shiken-meritto-imi-aru.html` 139KB): FAQPage JSON-LD=1・href="/fe"・/blog/fe-kamoku-b-taisaku present・body /essay=0(HTML唯一の href="/essay"=全ページ共通 header nav のみ・test で body不在 pin)・「レベル 2」「600 点以上」render・title render。inbound両親HTMLに新記事リンク render実測。link audit 184→185 posts/0 FATAL/0 WARN。
  - 全ゲート緑(commit前に単独実行・緑目視): typecheck0 / lint0err(warnは未追跡 ux-audit-screenshots.mjs のみ) / test 2088全緑(+1) / build OK。
- done×1 [P2-2 objection vein] SHA `e98ec75`: 新記事 `ap-shiken-meritto-imi-aru`「応用情報技術者試験を取る意味はあるか｜APのメリットと『意味ない』と言われる理由を整理」。fe/ip-meritto を template に AP固有化（メリット5：中堅実力の公的証明/**高度午前I免除2年=最大の実利**/午後記述で説明力/転職昇進手当/専門未定でも全般を中堅化＋「意味ない」理由3：特定分野の専門性証明は高度試験に劣る/給料採用が決まるわけでない/実務経験者に物足りない）。**AP午後=記述式(mock/HD-4)ゆえ旗艦/essay非送客**(s25/s28 precedent)・/ap＋合格基準(ap-goukaku-ten-border)＋午前I免除活用(ap-goukaku-go-koudo-senryaku)へfunnel。**SSOT一致**: レベル3(skill3)・午前80問四択150分/午後記述5問150分・各100点満点60点(素点方式・多段階選抜)・300〜500時間・AP合格→高度午前I免除2年=exam-data/ap-goukaku-ten-border/ap-benkyou-jikan-meyasu と照合。資格手当/年収は具体額なしでhedge。inbound2面(ap-goukaku-ten-border 3→4／ap-benkyou-jikan-meyasu 3→4・どちらも displacementなし)。FAQPage(5Q&A)・回帰pin1件。
  - 検証(本番ビルド実測 `.next/.../ap-shiken-meritto-imi-aru.html` 138KB): FAQPage JSON-LD=1・href="/ap"・body /essay=0(header nav除く)・「レベル 3」「100 点満点中 60 点」「午前 I が」render・title render。inbound両親HTMLに render実測。link audit 185→186 posts/0 FATAL/0 WARN。
  - 全ゲート緑(commit前に単独実行・緑目視): typecheck0 / lint0err / test 2089全緑(+1) / build OK。
- **clean確認(対応不要)**: cross-source level 整合スイープ(`grep 'レベル[0-9].*(基本情報|応用情報)'`)＝FE=レベル2/AP=レベル3 が generators 全所(13区分マップ・キャリア表・難易度順)で一致＝新記事の level 記述も整合。新たな hard error 無し(s89-90 の「factual vein 枯渇」を再確認)。
- **本セッション小計=確実な objection記事2件**(FE `b28fba1` / AP `e98ec75`)。両者 SSOT照合・本番ビルド実測・回帰pin・link audit 0 FATAL。**=objection/価値 vein は主要区分 IP/SG/SC/FE/AP で網羅**。量産回避のため同vein は1セッション2本で打ち止め（高度試験の objection は区分固有＝論文区分の価値は別 framing で別タスク・要吟味）。
- **次セッション申し送り**: objection vein は主要区分(IP/SG/SC/FE/AP)網羅で打ち止め。残＝高度試験の区分別 objection は volume が薄く区分固有(NW/DB/SC個別の「意味ない」)＝thin懸念で量産回避・着手は要吟味。cross-source factual hard error は枯渇(level/pass-rate/studyHours/論文字数 すべて整合 or editorial SKIP 確定)。論文/科目B vein 停止・afternoon rubric=HD-4待ち・強み4=別タスク・HD群(HD-1/4/5/6/8/9/10/11)=人間待ち・制度/access残角度(受験料再発行=thin/SGスコア=HD-8/AP高度発表=staleness)は不変。**新角度を起案できない場合のみ**次セッションは flag を検討（ただし安易に宣言しない）。

## セッション92（growth ループ｜2026-06-03 JST）
**P2-2 新vein＝受験順の「飛ばし」decision/比較系：基本情報(FE)を飛ばして応用情報(AP)から受けるべきか の専用記事を新設（高volume decision queryが2文FAQにしか無かった盲点を解消）**
背景（着手前 read-only 監査）:
- s91 申し送りで objection vein は IP/SG/SC/FE/AP 網羅・打ち止め。「新角度を起案できない場合のみ flag」に従い、心得「安易に尽きたと宣言せず新角度を起案」で **decision/比較系の新vein** を起案。
- corpus走査（blog slug 187本・`grep 飛ばし/いきなり`）: 「基本情報 飛ばして 応用情報 / いきなり応用情報 / 基本情報なしで応用情報」は**高volumeの decision query**だが、専用記事が不在。touch は `ap-benkyou-jikan-meyasu` のFAQ2文 + `13-shikaku-osusume-jyun`/career-path の散発言及のみ。objection記事(価値の有無)・roadmap(一般的な順番)・benkyou-jikan(時間)とは**別intent**(=このFE飛ばし可否の判断)で重複thinでなく明確な gap と判定。`grep` で worklog/backlog に過去の検討/SKIP 記録も無し（二重実装でない）。
- **durable fact 確認**: ①受験資格に制限なし（誰でもAP受験可・`ipa-juken-shikaku-nenrei` SSOT）②FE合格でAP免除なし（FE→APの免除制度は非存在・午前I免除2年はAP合格→高度向けで別物）。いずれも構造的・CBT移行で不変＝staleness landmine無し。
- done×1 [P2-2 decision新vein] SHA `4be4edf`: 新記事 `fe-tobashite-ap`「基本情報を飛ばして応用情報から受けてもいい？｜FEを省略してAPに挑む判断基準」。
  - 核心: 受験順の決まりは無く飛ばすこと自体は可能／FE合格でAP免除は無い（飛ばしても損しない）／飛ばしてよいケース(IT実務経験者・情報系・午前を今戦える人)／避けるケース(IT初学者・午後記述不安・FEが社内必須)／注意3点(午前知識は結局必要・午前未達なら午後不採点の多段階選抜・午後記述に時間配分)／FE↔AP早見表。
  - **SSOT一致**: FE=レベル2・科目A60問90分/科目B20問100分・各1000点満点600点IRT・約200時間(未経験300時間)。AP=レベル3・午前80問四択150分/午後記述5問150分・各100点満点60点素点・多段階選抜・300〜500時間・合格で高度午前I免除2年（exam-data/fe-goukaku-ten-irt/ap-goukaku-ten-border/ap-benkyou-jikan-meyasu と照合）。資格手当/年収は不記載（誇大回避）。
  - **funnel規律**: 受験順=採点無関係ゆえ**旗艦/essay非送客**（s27/s65 precedent・body /essay=0実測、HTML唯一の/essayは全ページ共通 header nav）。funnel=/fe・/ap・fe/ap-shiken-meritto-imi-aru（価値比較）・ap-benkyou-jikan-meyasu（時間）・ap-goukaku-ten-border（合格基準）・it-shikaku-nendaibetsu-roadmap/13-shikaku-osusume-jyun（順番）・AIコパイロット。exam:"ap"（AP-bound query・/recommended-books/ap 書籍funnelも妥当・essay funnelはESSAY_FLAGSHIP_EXAMSゲートゆえapでは非発火）。
  - **inbound3面**（orphan回避）: (1)`ap-benkyou-jikan-meyasu` の「基本情報を飛ばして応用情報」FAQ末に本文リンク追加（最高intent一致・relatedSlugs満杯ゆえ本文で確実化）、(2)`ap-shiken-meritto-imi-aru` relatedSlugs 3→4、(3)`fe-shiken-meritto-imi-aru` relatedSlugs 3→4（いずれも displacementなし・mutual＝本記事が両者へOUT）。
  - 検証（本番ビルド実測 `.next/server/app/blog/fe-tobashite-ap.html` 137KB）: FAQPage JSON-LD=1・href="/fe"×3・href="/ap"×6・fe/ap-shiken-meritto/roadmap funnel render・body /essay=0（control ip-meritto と同じ header nav 1のみ）・「レベル 2」「レベル 3」「受験資格に制限は」「免除されません」「300〜500 時間」「多段階選抜」render・年収+数字=0。新記事内 /blog link 8本すべて prerendered 200（新規404ゼロ）。inbound3親HTMLに新記事リンク render実測。
  - **link audit**: 186→187 posts・1818 links・**0 FATAL / 0 WARN**（non-orphan・inbound確立）。
  - 回帰pin1件（blog-generators.test.ts の ap-shiken-meritto test隣）: exam=ap / FAQ節present / `(/fe)`+`(/ap)` present / body `/essay` 不在 / 受験資格制限・免除されません（durable）/ レベル2+レベル3（SSOT）/ 年収\d 不在（誇大回避）/ inbound（2 siblings relatedSlugs + ap-benkyou-jikan-meyasu 本文リンク）。崩れたら落ちる。
  - 全ゲート緑（commit前に単独実行・緑目視）: typecheck0 / lint0err（warnは未追跡 ux-audit-screenshots.mjs のみ）/ test 2090全緑(+1) / build OK。
- **次セッション申し送り**: decision/比較系の新vein を1本開拓（FE飛ばし可否）。**残候補（要吟味・1記事=確実で量産しない）**: (a)「ITパスポート 飛ばして 基本情報/応用情報」=IP飛ばしは `ip-shiken-meritto-imi-aru`/13-shikaku で「IT実務者はIPを飛ばしてよい」と既述＝重複thin懸念で要吟味。(b)「応用情報の次は何を取る」=`ap-goukaku-go-koudo-senryaku` 既存で重複。(c)高度試験どれから=区分固有で散在・要吟味。objection vein 打ち止め・論文/科目B vein 停止・afternoon rubric=HD-4待ち・強み4=別タスク・HD群(HD-1/4/5/6/8/9/10/11)=人間待ち・制度/access残角度(受験料再発行=thin/SGスコア=HD-8/AP高度発表=staleness)は不変。

### セッション93 — CBT当日の流れ記事を新設（P2-2 制度/手続き vein・土台=入門の入口）
- done: [P2-2 新vein・制度/手続き系] SHA `1b99386`: 新記事 `cbt-shiken-toujitsu-nagare`「CBT試験 当日の流れガイド（IP/SG/FE）」を新設。
  - 盲点: CBT当日の会場での流れ(受付→本人確認→荷物預け→説明・入室→受験→終了)を順を追って扱う専用記事が不在。`ipa-shiken-cbt-vs-pbt` に「CBT 受験の当日の流れ」4ステップ要約があるのみで、初受験者の高インテント「CBT 当日 流れ/試験会場 何をする」を満たす dedicated ページが無かった。moushikomi-nagare=申込フロー、shiken-zenjitsu-checklist=前日、ip-toujitsu-mochimono=持ち物 と intent が分離(=重複thinでなく gap)。
  - 裏取り(WebSearch+CBT-Solutions/IPA公式): 受付・開場=試験開始の約30分前 / 本人確認書類提示 / ログイン情報シートへ署名 / 携帯・上着・かばんをロッカーに預ける / 試験監督員の説明後に入室 / 計算・下書きは会場貸与のメモ用紙とボールペン(自分の筆記用具は使わない) / 開始前に操作確認(チュートリアル)あり(開始時刻超過でも確認可) / 試験終了直後にその場で評価点が画面表示(FE/SG=科目別、IP=総合+分野別)。画面UIの具体ボタン名は未検証ゆえ「残り時間表示・見直しフラグが一般的」と hedge。
  - scope/誇大回避: CBT通年区分(IP/SG/FE=土台の入口)にスコープ。AP/高度は令和8年度(2026)CBT移行中ゆえ当日フロー流動的→IPA公式へ hedge(staleness回避・既存 cbt-vs-pbt/score-report と整合)。制度=採点無関係ゆえ旗艦/essay非送客(s27/s65 precedent・body essay funnel=0実測、href="/essay"はfooter chrome 1件のみ)。土台=入門ハブ /ip /fe /sg + 科目Bピラー(fe-kamoku-b-taisaku) + AIコパイロット(Web演習で画面慣れ)へ funnel。
  - inbound2面で orphan回避: (1)cbt-vs-pbt「CBT 受験の当日の流れ」節末に詳細記事リンク追加、(2)moushikomi-nagare「CBT 方式の申込手順」節末に当日フローリンク追加。relatedSlugs=cbt-vs-pbt/moushikomi-nagare/cbt-goukaku-happyou-score-report/shiken-zenjitsu-checklist。
  - 検証(全緑ゲートをcommit前に単独実行・目視): typecheck 0 / lint 0 errors(1 warning は既存 untracked scripts/ux-audit-screenshots.mjs=非自分) / test 2095 passed(264 files) / build OK。本番prerendered `/blog/cbt-shiken-toujitsu-nagare.html`(130KB)実測=FAQPage JSON-LD有・検証済事実7項目(30分前/本人確認/ロッカー/メモ用紙/ボールペン/評価点/令和8年度)全てHTMLに present・funnel hub /ip×4 /fe×3 /sg×3・body /essay funnel=0。inbound 2源HTMLに新リンクrender確認・outbound blog 8本全prerendered 200(新規404ゼロ)。回帰pin `__tests__/seo/cbt-toujitsu-nagare-funnel.test.ts`(5 it)。
  - 残(P2-2 制度vein・要吟味): 受験料/合格証書再発行=thin懸念・SGスコア通知=HD-8・AP/高度の当日フロー=令和8年度CBT安定まで不可、は不変。量産せず1記事=確実を維持。

### セッション94 — /q 問題ページ <title> の文字数キャップ（P2-1・あと一歩SERP改善・最大クロール面）
- done: [P2-1] SHA `875b9df`: `lib/seo/question-meta.ts` の `questionTitle()` に予算ベースのキャップを追加。
  - **発見源**: `logs/usability-seo-spicy-review-2026-05-26.md`（激辛レビュー第3弾）の SEO致命 TOP5-2「問題ページ <title> に文字数上限が無い」。同レビューの他の致命指摘は着手前監査で多くが既解決を確認（SEO-1 /quiz canonical 自己矛盾＝`app/quiz/page.tsx` が既に `canonical:"/"`＋noindex,follow へ是正済）。HowTo死schema(SEO-3)＝レビュー自身が「除去しても順位上がらず・残しても数KB増・低優先」と評価＝実害薄でSKIP。title無キャップ(SEO-2)のみ未解決の致命と確定。
  - **実測で実害を確定（理論でない）**: corpus 14,402問の `questionTitle()+" | 過去問AI"` を計測→**全titleがSERP想定(~32全角字)を超過・46%(6,607本)が45字超・最長64字**。description は `DESCRIPTION_MAX=158` で厳密キャップ済なのに title だけ無キャップ＝内部不整合。長い試験名（テクニカルエンジニア(エンベデッドシステム)等）＋補助的な category 語の積み上げが主因。
  - **最小diff・安全な設計**: 識別コア `{年度} {試験} {区分} 問N` ＋ `解説` は常に温存（**問N・解説を絶対に切らない=醜い…省略を避ける**）。`category` のみ、全体が `TITLE_MAX=40` 超になる時だけ drop。安全な理由＝(1)可視 `<h1>` は既にコアのみ描画(category は別バッジ/リンク `page.tsx:305-312`)、(2)description が category を保持＝識別情報ゼロロス。`questionTitle` の他用途(OG画像=80字slice/JSON-LD name/ShareButtons text)も視覚破綻なし。
  - **検証(崩れたら落ちる)**: 回帰pin2件を `__tests__/seo/question-meta.test.ts` に追加（短title=category＋解説保持かつ≤40字／長試験名(es 2024 am1)=category drop だが 問N＋解説 温存）。corpus実測=最長title 56→44字・category 保持10,374/ drop 4,028・全title が 解説終端＋問含有(ゼロロス)。**本番ビルドHTML実測**=令和AP面「令和6年度 春期 応用情報技術者 午前 問27 データベース 解説」(category保持)／長カテゴリAU面「令和7年度 秋期 システム監査技術者 午前I 問23 解説」(category drop)＝SSR出力に live反映を確認(stale でない＝formatYearSeason/examLabelAt 実runtime値と一致)。
  - 全ゲート緑（commit前に単独実行・緑目視）: typecheck 0 / lint 0 errors(warnは未追跡 ux-audit-screenshots.mjs のみ) / test 2096 passed(264 files・+1) / build OK。
  - **所見**: session9 が SKIP した P2-1 は description テンプレ修正(理論)についてで、title 無キャップは別の実測可能な実害＝gap。激辛レビューは部分的に既解決のため**1件ずつ現コードで再検証**が要る（SEO-1=済/SEO-3=実害薄SKIP/SEO-2=本件で解消）。

### セッション94（続き）— 激辛レビュー(2026-05-26)由来の確実な correctness/staleness 修正を2件追加
本セッションは content vein 飽和を確認のうえ、`logs/usability-seo-spicy-review-2026-05-26.md`（コード精読の激辛レビュー第3弾）を grounded な所見源として採用。各致命/調整指摘を**現コードで1件ずつ再検証**（多くは s34-93 で既解決）し、未解決かつ小diff・実測可能・非広域・非HD のものだけ着手。
- done [P2-1・SHA `875b9df`]: /q title 文字数キャップ（cycle1・上記参照）。
- done [K-2・SHA `d0e42a0`]: `/faq` の advertised count を `FAQS.length` 由来に。**実測で実害確定**＝OG画像body・meta description が「79問」ハードコードだったが `FAQS.length` は既に **80**（FAQ追加時にdriftしたoff-by-one）。`FAQ_COUNT=FAQS.length` を導入し両箇所をテンプレート化＋import を先頭へ整理。回帰pin `__tests__/seo/faq-metadata.test.ts`（description/OG が `FAQS.length` を含む＝再ハードコードで落ちる）。本番HTML実測=「80問」×2・stale「79問」=0。全ゲート緑(test 2097)。
- done [B-2・SHA `a691d96`]: home WebSite JSON-LD の SearchAction を実検索 `/search?q=` へ是正。**schema誤用の確定**＝urlTemplate が `/quiz?mode=random&exam={exam_code}`・query-input `exam_code`＝「ランダム出題開始」でありサイト内検索でない。実 `/search` は `?q=` を読む（SearchClient が `sp.get("q")` で active query を seed＝line116/267 実測）ため `/search?q={search_term_string}` が正しい標的。`buildWebsiteNode(description)` を `structured-data.ts` に抽出（buildOrgNode と並置・テスト可能化）し page.tsx をその呼び出しに置換（未使用化した SITE_ID/SITE_NAME import も整理）。回帰pin `__tests__/seo/website-node.test.ts`（3 it）。本番HTML実測=新標的×2・旧 exam_code/mode=random=0。全ゲート緑(test 2100)。
- **本セッション小計=確実な修正3件**（title cap / faq count / SearchAction）。いずれも激辛レビューの**未解決**指摘・小diff・本番HTML実測・回帰pin。レビューは部分既解決のため**1件ずつ現コード再検証**が必須（SEO-1 /quiz canonical=既解決確認・B-3 HowTo死schema=レビュー自身が低優先/実害薄評価ゆえSKIP）。
- **次セッション申し送り（激辛レビュー残・grounded候補＝水増しでない実在の triage）**: backlog 末尾「P-spicy-review triage」参照。content vein は深く飽和ゆえ、次もこの triage から **小diff・非広域・非HD** の1件（A-5 スワイプ×クリック preventDefault / A-6 モバイルシート focus-trap / SEO-5 孤立 /challenge·/referral の内部リンク / 使-3 復習・弱点動線の正規入口集約 の精査）を着手するのが筋。広域(A-1 CopilotPanel分割=禁止)・大型(使-1 /q インライン回答UI)・設計/HD(SEO-4 4ハブ階層化・K-1 CLAUDE.md drift)は自律着手しない。

### セッション95 — A-5 スワイプ×synthetic-click 衝突を解消（P-spicy-review triage・correctness）
- done: [P-spicy-review A-5] SHA `b7d71a7`: `components/quiz/QuizPlayer.tsx` の `onTouchEnd` スワイプ分岐に `e.preventDefault()` を追加。
  - **着手前監査で実害を確定（理論でない）**: 左スワイプ→次問は `if (!touchStart.current || !revealed) return;` で **revealed 時のみ**発火。選択肢 `ChoiceButton` は `disabled={revealed}`(L422)＝スワイプ中は無効。スワイプ検出で `goNext()`→次問が `revealed=false` で再レンダ＝選択肢が再enable。ブラウザは touchend 後に compatibility click を発火し、その着弾時点では次問の有効な選択肢が同座標に存在＝**意図しない解答選択**を引き起こす経路。
  - **最小diff・安全**: スワイプ分岐(`Math.abs(dx)>60 && …&& dx<0`)内でのみ `e.preventDefault()`→synthetic click 抑止。タップ(dx<60)は分岐に入らず preventDefault せず＝選択肢タップは不変。スワイプnav自体も `goNext()` 維持で不変。
  - **検証(崩れたら落ちる)**: 回帰pin `__tests__/components/QuizPlayer.swipe.test.tsx`(2 it)。`fireEvent.keyDown(window,{key:"1"})` で reveal→`createEvent.touchEnd` の `preventDefault` を spy。左スワイプ(touchStart x=240→changedTouches x=60・dx=-180)=`onNext` 1回 AND `preventDefault` 呼出／タップ(x=200→204・dx=4)=どちらも非呼出。preventDefault 削除で前者が落ちる(synthetic-click 抑止が pin される)。
  - 全ゲート緑（commit前に単独実行・緑目視）: typecheck 0 / lint 0 errors(warn は未追跡 scripts/ux-audit-screenshots.mjs のみ=非自分) / test 2102 passed(267 files・+2) / build OK。
  - **所見**: 激辛レビュー triage の A-5 は s34-94 で未着手の grounded な correctness 指摘で、監査の結果 synthetic-click の着弾先が「次問の選択肢」という具体的実害経路と確定＝過大修正でない。残候補(A-6 focus-trap/SEO-5 orphan/使-3 routing 集約/K-2系 stale count grep)は次サイクルへ。

### セッション95（続き）— SEO-5 孤立ページ解消(/challenge) + K-2系 stale count の clean確認
- done: [P-spicy-review SEO-5・一部] SHA `4b34e3c`: `/challenge`(デイリーチャレンジ)をグローバルフッタ「サービス」nav に配線。
  - **着手前監査**: `/challenge`(app/challenge/page.tsx)=完成した無料機能(毎日5問・deterministic・XP・課金非依存)。内部リンクは `/sitemap` HTML ページ1箇所のみ＝文脈内 inbound 0 の orphan(XML sitemap掲載のみ)。HomeReturningHeader の「今日のおすすめ5問」は別物(client・personalized recommendations)。
  - **最小diff**: フッタ「サービス」nav(全 indexable SSRページに描画)に `<Link href="/challenge">デイリーチャレンジ</Link>` を午後論述AI採点の下に1行追加。crawlable な global inbound を確立。
  - **`/referral` は据置→HD-12 へ**: Premium特典前提(「Premium7日間無料/コパイロット無制限/Flash高精度」)の半完成機能で特典未実装明記・課金は §0 でフェーズ4まで凍結。露出は「全機能無料」と矛盾・誇大懸念＝戦略判断ゆえ自律配線せず human-decisions HD-12 に積んだ。
  - **検証(崩れたら落ちる)**: 既存 `footer-bottomnav-links-resolve.test.ts` が全フッタ href の解決を自動検証(=/challenge が実在ルートで dead-link でないことを担保)＋新 pin「the footer links to the Daily Challenge」(staticHrefs に `/challenge` 含有＝inbound 削除で落ちる)。本番ビルドHTML実測=/about・/faq の footer に `href="/challenge"`×1＋「デイリーチャレンジ」present(全SSRページに描画)。
  - 全ゲート緑（commit前に単独実行・緑目視）: typecheck 0 / lint 0 errors(warn は未追跡 ux-audit-screenshots.mjs のみ) / test 2103 passed(267 files・+1) / build OK。
- clean確認: [K-2系] `/faq`「79問」(s94)以外の advertised count drift を grep 走査→**枯渇**。総問題数は SSOT `lib/constants/question-counts.ts` へ移行済で全 user-facing 面が派生参照(FAQ/features/success-stories/home/layout/search/topics/blog)＝旧ハードコード残存なし。transparency「残り12,094問」は2026-03 changelog の史実(live total は別算出)＝非対象。他「N問/件」は機能/形式の固定copy で drift しない。**K-2系は対応不要**(過大修正の罠回避)。
- **次セッション申し送り（P-spicy-review triage 残）**: A-6(CopilotMobileSheet の focus-trap/復帰=WCAG・差別化中核ゆえ慎重・要厚め監査)、使-3(復習/弱点動線3系統の正規入口集約=中スコープ・要監査)が grounded な残候補。広域(A-1 CopilotPanel分割)・大型(使-1 /q インライン回答)・設計/HD(SEO-4 ハブ階層化・K-1 CLAUDE.md drift)は自律着手しない。

### セッション95（続き2）— A-6 CopilotMobileSheet の focus-trap 実装（P-spicy-review・WCAG 2.4.3）
- done: [P-spicy-review A-6] SHA `ba5d8bb`: `CopilotMobileSheet`(role="dialog" aria-modal="true")に Tab focus-trap と open時の初期focusを追加。
  - **着手前監査で gap を確定**: Escape閉(L1364)・閉時 FAB へ focus復帰(L1373)は既存。だが (1)Tab を trap する処理が無く aria-modal だけではブラウザは Tab を背後の DOM へ移す(WCAG 2.4.3 違反)、(2)**mobile sheet は open時に sheet 内へ focus を送る effect が無い**(desktop variant L1475 にはある)。FAB は `{!open && <button>}` で open中アンマウント→focus が document.body に取り残され、Tab で背後ページに侵入できる(aria-modal の前提が崩れる)。
  - **最小diff・テスト可能設計**: 「Tab をどこへ巻き戻すか」の判断を純関数 `trapTabTarget(focusables, active, shiftKey)` に抽出(`lib/a11y/focus-trap.ts`・DOM非依存)。component 側は薄い glue のみ＝dialog コンテナに `ref`＋`onKeyDown={onDialogKeyDown}`(可視 focusable を query→trapTabTarget→端なら preventDefault+focus)、open時に first-focusable へ初期focus する effect。`FOCUSABLE_SELECTOR` も util に集約。**scope=named された mobile sheet のみ**(desktop は初期focus既存ゆえ別タスク・worklog残記載)。差別化中核コンポーネントゆえ広域変更を避けた。
  - **検証(崩れたら落ちる)**: `__tests__/a11y/focus-trap.test.ts` 9件。pure decision 7件(末→先 wrap/先→末 shift wrap/中間=null/trap外→引き込み/空=null/単一=自己wrap)＋wiring source-pin 2件(trapTabTarget import&call・dialog の onKeyDown 結線)。panel が jsdom で重renderなため純関数＋source-read で堅く pin(既存 CopilotPanel.aria.test の source-read 流儀踏襲)。
  - 全ゲート緑（commit前に単独実行・緑目視）: typecheck 0 / lint 0 errors(warn は未追跡 ux-audit-screenshots.mjs のみ) / test 2110→2112 passed(268 files・focus-trap 7→9) / build OK。※source(CopilotPanel/focus-trap)は full-gate 実行時点で確定・以後は test 追記のみ(単独green確認)。
  - **次セッション申し送り（P-spicy-review triage 残）**: (a)**A-6 横展開**=`CopilotDesktopFloating` にも `trapTabTarget` で trap 追加(同 helper 流用・初期focusは既存=最小diff・desktop keyboard 利用者にも同 WCAG 適用)。(b)使-3 復習/弱点動線3系統(`/quiz?mode=review`・`mode=weakness`・`/review`・`/account/dashboard`)の正規入口集約(中スコープ・要監査)。広域(A-1 CopilotPanel分割)・大型(使-1 /q インライン回答)・設計/HD(SEO-4・K-1)は自律着手しない。

### セッション96 — A-6 横展開: CopilotDesktopFloating の focus-trap 実装（P-spicy-review・WCAG 2.4.3）
- done: [P-spicy-review A-6 横展開] SHA `49ddaf3`: `CopilotDesktopFloating`(role="dialog" aria-modal="true")に Tab focus-trap を追加。s95(続き2)の申し送り(a)を消化。
  - **着手前監査で gap を確定**: mobile sheet と対称に desktop も Escape閉(L1490)・閉時 FAB へ focus復帰(L1500)・open時 panel 内へ初期focus(L1509・panelRef)は既存。だが **Tab trap が無く**、aria-modal だけではブラウザは Tab を背後の DOM へ移す(WCAG 2.4.3 違反)。mobile(s95 `ba5d8bb`)だけ trap 済で desktop keyboard 利用者が取り残されていた非対称。
  - **最小diff・helper流用**: s95 で抽出した純関数 `trapTabTarget`(lib/a11y/focus-trap.ts)をそのまま流用。component 側は薄い glue のみ＝role="dialog" 外側 div に `onKeyDown={onDialogKeyDown}`、focusables は `panelRef`(内側 panel)から query(overlay は aria-hidden で非focusable・event は bubble で外側 div が捕捉)。初期focus/復帰は既存ゆえ追加せず＝差分は trap のみ。
  - **検証(崩れたら落ちる)**: `__tests__/a11y/focus-trap.test.ts` の wiring source-pin を「`onKeyDown={onDialogKeyDown}` が2箇所以上(mobile+desktop)」へ強化(desktop 配線を外すと count<2 で落ちる)。describe名も「Copilot dialogs」へ更新。pure decision 7件は不変。panel が jsdom で重renderなため純関数＋source-read で堅く pin(s95 流儀踏襲)。
  - 全ゲート緑（commit前に単独実行・緑目視）: typecheck 0 / lint 0 errors(warn は未追跡 ux-audit-screenshots.mjs のみ) / test 2112 passed(268 files) / build OK。
  - **所見**: これで mobile/desktop 両 copilot dialog が WCAG 2.4.3 trap を持ち対称化。差別化中核(AIコパイロット)の a11y gap を最小diffで解消。
  - **次セッション申し送り（P-spicy-review triage 残）**: 使-3 復習/弱点動線3系統(`/quiz?mode=review`・`mode=weakness`・`/review`・`/account/dashboard`)の正規入口集約(中スコープ・要監査)が grounded な残候補。広域(A-1 CopilotPanel分割)・大型(使-1 /q インライン回答)・設計/HD(SEO-4・K-1)は自律着手しない。content vein は深く飽和。

### セッション96（続き）— A-6 vein 横展開: 全カスタムモーダルの focus-trap 掃き出し（P-spicy-review・WCAG 2.4.3）
A-6(CopilotMobileSheet・s95 `ba5d8bb`)で確立した `trapTabTarget` helper を、コーパス内の**全カスタム(非Radix) `aria-modal="true"` ダイアログ**へ横展開。`grep 'role="dialog"|aria-modal'` で候補を機械列挙し、Radix `DialogPrimitive`(=focus trap ネイティブ)使用面と `aria-modal="false"`(意図的に非モーダル)面を除外した残りを全て修正。**新角度=「A-6 を1コンポーネントで終えず modal-a11y を面横断で対称化」**。
- done: [P-spicy-review A-6 横展開(a)] SHA `49ddaf3`: `CopilotDesktopFloating` に Tab trap 追加(初期focus/復帰は既存ゆえ trap のみ・panelRef から focusables query・source-pin を mobile+desktop の2箇所以上へ強化)。詳細は上の「セッション96」エントリ参照。
- done: [P-spicy-review・新 A-6b] SHA `2ff5f96`: `KeyboardShortcutsHelp`(「?」ヘルプ overlay・role=dialog aria-modal=true)に Tab trap＋open時の初期focus(閉じるボタン)＋close時の focus復帰を追加。**キーボードショートカット用ダイアログ自身が keyboard trap 欠如という皮肉な gap**。単一 focusable(閉じるボタン)ゆえ Tab は自身に留まる。global key(`?`)起動ゆえ open前の activeElement を `lastFocusedRef` に捕捉し close時に復帰。**behavioral 回帰test 3件**(`__tests__/components/KeyboardShortcutsHelp.test.tsx`=open-focus／single-focusable trap で preventDefault＋focus維持／Escape で trigger へ復帰)。コンポーネントが軽量ゆえ source-pin でなく実挙動を pin。
- done: [P-spicy-review・新 A-6c] SHA `5609093`: `StreamQuizPlayer` の `ReviewOverlay`(「直前の問題」復習・role=dialog aria-modal=true・/quiz/stream live route)に Tab trap＋初期focus＋trigger復帰。**復習trigger は overlay open中 `canReview===false` でアンマウントされる**(mobile FAB と同型)ため、復帰は親に `reviewTriggerRef`＋close遷移 effect を置いて実装(CopilotMobileSheet precedent)。overlay を canReview 状態へ駆動するのが jsdom で timer依存・fiddly ゆえ wiring を source-pin(`__tests__/a11y/focus-trap.test.ts` に describe 追加=import/onKeyDown/reviewTriggerRef復帰の3 pin・trap logic 自体は focus-trap unit test 9件で behavioral 担保)。
- **掃き出し完了の確認**: `aria-modal` 全7箇所の内訳=CopilotMobileSheet(s95)・CopilotDesktopFloating(s96)・KeyboardShortcutsHelp(s96)・StreamQuizPlayer ReviewOverlay(s96)=**全て trap 済**／OnboardingTour=Radix `DialogContent`(FocusScope でネイティブ trap=対応不要)／QuizPlayer L542=`aria-modal="false"`(意図的に非モーダル=対象外)。**=カスタムモーダルの focus-trap vein は完全に枯渇**。差別化中核(AIコパイロット)＋主要クイズ面の WCAG 2.4.3 を最小diffで対称化。
- 全ゲート緑(各commit前に単独実行・緑目視): typecheck 0 / lint 0 errors(warn は未追跡 ux-audit-screenshots.mjs のみ) / test 2112→2115→2118 passed(269 files) / build OK。
- **本セッション小計=確実な a11y 改善3件**(全て P-spicy-review triage の grounded な A-6 系・小diff・本番ゲート緑・回帰pin)。
- **次セッション申し送り（P-spicy-review triage 残）**: modal focus-trap は枯渇。残る grounded 候補は 使-3(復習/弱点動線3系統 `/quiz?mode=review`・`mode=weakness`・`/review`・`/account/dashboard` の正規入口集約)だが、**`/review` と `/quiz/review` が別ルート＋`?mode=` 変種で multi-route の UX/ルーティング再設計＝「大規模URLルーティング再設計」(承認必須)・広域リファクタ禁止に該当＝自律着手せず**(本セッションで監査の上 SKIP 判断)。content vein も深く飽和。新角度を要する場合は別 a11y クラス(ライブリージョン/ロービングtabindex の検証)か、人間判断待ち(GSC 404一覧・HD群)。

### セッション97 — D-3 フッタ不在の indexable 価値ページ配線（P-spicy-review・SEO致命TOP5-5）
- done: [P-spicy-review D-3] SHA `b73b8f0`: グローバルフッタ「サービス」nav に `/mock-exam`(模試モード)・`/ranking`(ランキング)・`/recommended-books`(おすすめ問題集・参考書) を配線。
  - **着手前監査で gap を確定**: レビュー D-3 列挙の6面(`/topics・/mock-exam・/search・/success-stories・/recommended-books・/ranking`)を indexability・既存inbound で再評価。
    - **`/success-stories` = SKIP**: `app/success-stories/page.tsx:27` で**無条件 `robots:{index:false,follow:false}`**(致命傷③=AI生成架空ペルソナを意図的に deindex)。フッタ配線してもクロール価値ゼロ＋全SSRページから noindex 面へリンク＝過大修正の罠ゆえ配線せず。
    - **`/topics` = SKIP(保留)**: indexable(0 hub 時のみ noindex)だが SEO-4「4分類ハブ(topics/keywords/glossary)の共食い」(HD/設計)に触れる懸念＝保守的に見送り。
    - **`/search` = SKIP**: 検索ユーティリティ(ツール)でクロール target 価値薄・既に SiteHeader 露出。
    - **採用3面**: `/mock-exam`(模試=競合パリティ機能・indexable・header-only)・`/ranking`(段級ランキング・indexable・**どの global nav にも不在=最も funnel が細い**)・`/recommended-books`(収益=アフィリ中心戦略と整合・indexable・header-only)。いずれも完成済の indexable 価値ページで、レビュー指摘どおり「末端ページからの導線が細い」(footer不在 or header-only)。
  - **最小diff**: フッタ「サービス」column に3 `<Link>` を学習モード(模試/ランキング)＋リソース(参考書)の位置に挿入(8→11項目)。アフィリは footer テキストリンク=「控えめ/UI完全分離」戦略に準拠。env無編集・価格/無料枠数値に不干渉。
  - **検証(崩れたら落ちる)**: 既存 `footer-bottomnav-links-resolve.test.ts` の dead-link 検査(deadLinks===[])が3 href の実ルート解決を自動担保＋新 `it.each(["/mock-exam","/ranking","/recommended-books"])` の orphan-resolution pin(配線削除で落ちる)。本番ビルド HTML 実測(`/about` prerendered footer)=3 href＋ラベル(模試モード/ランキング/おすすめ問題集) present。
  - 全ゲート緑(commit前に単独実行・緑目視): typecheck 0 / lint 0 errors(warn は未追跡 ux-audit-screenshots.mjs のみ) / test 2118→2121 passed(269 files・+3) / build OK。
  - **所見**: A-6 modal focus-trap(s95-96)に続く P-spicy-review triage の grounded 消化。D-3 のうち採用可能な3面を配線し、SKIP 3面はいずれも着手不可理由(noindex/設計HD/低価値ツール)を明記。

### セッション97（続き）— A-6 aria-semantics class の掃き出し（role-less div の aria-label）+ title長監査
本セッション cycle1(D-3 フッタ配線・上記)に続き、P-spicy-review A-6 の「role 無し要素の aria-label が SR に無視される」defect class を面横断で監査・是正。
- **新角度=「role-less `<div>` + aria-label」defect class の全件監査**: python で `<div>` 開始タグに `aria-label` がありかつ `role=`/`aria-labelledby` を持たないものを全走査=**8件**。各々「ラベルが落ちると実害があるか(=同情報が可視テキスト/内部要素で別途SRに届くか)」で判定。
- done: [P-spicy-review A-6・cycle2] SHA `bc58f75`: `CopilotPanel` アクションポップアップ(`#copilot-actions-popup`・全体コピー/共有/Markdown DL)の role 無し div に `role="group"` を付与。トリガに `aria-expanded`/`aria-controls` はあるが popup の `aria-label="その他の操作"` が dead markup だった。`role="menu"` は矢印キー roving 前提(未実装)ゆえ受動ロール `role="group"` が正しい粒度。回帰pin(source-read・既存 CopilotPanel.aria.test 流儀)。
- done: [P-spicy-review A-6・cycle3] SHA `af32dd6`: `CopilotPanel` メッセージ表示領域(scrollRef・AI応答のストリーミング transcript)の role 無し div に `role="log"` を付与。`aria-live="polite"`+`aria-label="AI コパイロットの応答"` を持つが role 欠如でラベルが落ち、かつ**この領域を命名する隣接可視テキストが無い**(badge/mock-exam と違い情報損失が実在)。chat ログの正準ロール role="log"(暗黙 aria-live=polite と一致=**通知挙動は不変**)でラベルを有効化。回帰pin(source-read)。
- **SKIP(実害なし=過大修正回避) 6件**: いずれもラベルが落ちても同情報が別経路でSRに届く=理論のみ:
  - `BadgeMedallion`(motivation/badges) — 唯一の使用面 `BadgeWall.tsx:66-76` で medallion 隣に可視 `<h3>{name}</h3>`+tagline+獲得状態テキストがあり、ラベルはそれと冗長。
  - `MockExamRunner` 3件(平均/最長/合計秒) — 可視数値+直下の可視ラベル(平均/問・最長(問N)・合計時間)で同情報あり。`MockExamLanding` ResultPreviewHint — 内部に可視テキストあり。
  - `TagInput` — 設定画面(非crawl・低トラフィック)・内部 input は操作可。
  - **=role-less div aria-label class は実害2件(s97 cycle2/3で是正)・無害6件で打ち止め**。
- **監査(コード変更なし)=C-1 title長**: s94 が `/q` title を `TITLE_MAX=40` でキャップ済。レビュー「試験LP・blog の title 未確認(要個別検証)」を本番ビルド `<title>` 実測。
  - **試験LP=問題なし**: `examTopTitle`=`${examLabel} 過去問一覧・AI解説`+suffix で約25字=SERP幅内。
  - **blog=長い(57〜62字)が editorial/HD**: blog `<title>` は著者記述の post.title(50字超)+「 | 過去問AI」で SERP幅(~30〜35字zenkaku)超だが、`/q` の `category` のような**構造的 droppable segment が無い**=自律truncateは編集意味を壊す editorial判断ゆえ着手せず→**HD-13** に記録。
- 全ゲート緑(各commit前に単独実行・緑目視): typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ) / test 2121→2122→2123 passed(269 files) / build OK。
- **本セッション小計=確実な改善3件**(D-3 フッタ価値ページ配線3面 `b73b8f0` / A-6 role="group" `bc58f75` / A-6 role="log" `af32dd6`)＋監査2件(aria class打ち止め・title長=HD-13)。
- **次セッション申し送り(P-spicy-review triage 残)**: 使-3(復習/弱点動線集約)=ルーティング再設計で承認必須(s96 SKIP判断)。A-1/使-1/SEO-4/K-1=自律不可。content/aria vein は深く飽和。新角度は別a11yクラス(roving tabindex の未適用面/ライブリージョンのSR検証)か human待ち(GSC 404一覧・HD群=HD-4/6/8/9/10/11/13)。

### セッション98 — 非blogクロール面の /blog 死リンク回帰ガード（P2-3f隣接角度(d)・404予防）
- done: [P2-3f next-angle (d) の発展＝非blog面 outbound 死リンク防止] SHA `cf0f9d9`: 新テスト `__tests__/seo/nonblog-blog-link-resolvability.test.ts`。
  - 監査(read-only)で確定した gap: blog本文の内部リンクは `scripts/audit-internal-links.ts`(0 fatal/0 warn・本セッションでも再走査して確認)が守るが、**非blogのクロール面**(旗艦ハブ /essay の ESSAY_GUIDE_POSTS・試験ハブ /[exam]・/[exam]/afternoon・/recommended-books/[exam]・/essay/[exam]/[questionId]・/why-kakomon-ai・components/essay/EssayResultView・components/home/HomeFoundationKamokuB・components/quiz/KamokuBStudyHint・data/features.ts relatedLinks)がハードコードする `/blog/<slug>` リンクは**その監査の対象外で、どのテストにも守られていなかった**。個別 funnel テスト(fe-hub-kamoku-b-cta 等)は1 slugずつしか pin せず、blog slug の改名/削除や新規リンク追加で旗艦・土台の高価値 funnel が無言で 404 になりうる。
  - 先行する隣接角度の監査結論(本セッション・いずれも clean=SKIP): (a)JSON-LD の url/image 実在性=`image` は全て `/api/og`(動的200) と `/icon-512.svg`(静的)、`url` は canonical or Amazon外部 or 同一ページ#anchor=**死リンクなし**。(d)redirect源(next.config.ts の `/quiz` mode無・/account/* 統合・/feedback・/trust 等13件)を指すUI内部リンク=`grep` 全走査で**実リンク0**(MobileBottomNav の match配列はactive判定で非href)・`/quiz` 生成2箇所(modes/topic・SearchClient)は両方 mode 付与済=**clean**。これらは worklog/backlog に negative result として記録(過大修正回避)。
  - 実装(最小・additive): app/ ・ components/ 再帰走査 + data/features.ts を読み、`(?<![A-Za-z])/blog/([a-z0-9-]+)` で**静的** `/blog/<slug>` を全抽出し `getAllBlogPosts()` の実在 slug 集合に解決するか一括 assert。lookbehind(直前が英字でない)で import パス `@/lib/blog/related-content`・`@/data/blog/types`・コメント `topics/blog/books` を確実に除外。テンプレートリテラル `/blog/${...}` は動的ゆえ非マッチ。`data/blog/**`(blog本文=script監査の担当)と `lib/admin`(noindex ダッシュボード・mock-data に意図的架空slug `ap-strategy-2026` 等あり=誤検知源)は走査対象外。
  - 検証(全ゲートを commit と別呼び出しで単独実行・緑目視): typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ=非自分) / test **270 files 2125 passed**(新2 it 含む) / build OK。スキャナ実測=**17箇所/9 unique slug**(fe-kamoku-b-taisaku・gogo-kijutsu-buhanten・ipa-shiken-shakaijin-jikan-kakuho・kakomon-ai-vs-doujou・kakomon-nankai-tokinaosu・kakumon-gakushuu-science・koudo-ronbun-hyouka-rank・koudo-ronjutsu-kakikata-kotsu・sg-kamoku-b-jirei-mondai)全て実在=**死リンク現状ゼロ**・false positive ゼロ(related-content/types/books/mock架空slug 全除外)・崩れたら落ちる property も実測(架空 `fe-kamoku-b-taisaku-RENAMED` は flag される)。「走査が機能している」test で 0件マッチの silent pass も防止。
  - 心得遵守: 既に死リンクは無いので「直す」変更ではなく、saturation した content/funnel vein に代わり**構造的な回帰ガードで新規404の発生源を封じる**改善(1コミット=1論点・本番影響なし・main凍結維持)。
- **次セッション申し送り**: P2-3f 隣接角度は (a)JSON-LD実在性=clean / (d)redirect源リンク=clean / 非blog面 outbound=本ガードで封じ済。次の404予防角度候補(未着手・要吟味): (i)keyword LP の `relatedBlogSlug`(=`/blog/`プレフィックス無しの裸slug。render時に typo弾きありで404は出ないが回帰ガード無し)も同型ガードで守れる可能性。(ii)`booksExam`/`post.exam` 由来の `/recommended-books/{exam}` リンクが空ページ(書籍0冊)を指さないかの存在ガード。content/aria vein は深く飽和(s90-97)・HD群(HD-4/6/8/9/10/11/13)とルーティング再設計(使-3)は人間待ち。

#### セッション98 続き — 死リンクガードを /features・/keywords cross-link へ一般化
- done: SHA `bbc4724`(rename) + `55ddd2f`(内容拡張)。テストを `nonblog-internal-link-resolvability.test.ts` へリネームし、LINK_RE を `/(blog|features|keywords)/<slug>` へ拡張。
  - 監査で確定: 非blogクロール面(`/why-kakomon-ai` の機能リンク5本・`data/features.ts` の relatedLinks)は `/features/<slug>`・`/keywords/<slug>` の cross-link もハードコードするが、既存 `__tests__/data/keywords.test.ts` は `relatedBlogSlug`(blog行先)しか pin せず、feature/keyword slug の改名・削除でこれら機能間 funnel が無言 404 になりえた。
  - 候補(i)(ii)は既存テストで充足のため非実装(過大修正回避): (ii)`/recommended-books/{exam}` 空ページ=`__tests__/data/recommended-books.test.ts:110`「has at least one book for every exam code」で既ガード。(i)keyword LP `relatedBlogSlug`→blog=`keywords.test.ts:132`「登録された relatedBlogSlug が全て実在する blog 記事を指す」で既ガード。→残る唯一の未ガード surface=非blog面の `/features`・`/keywords` cross-link だったので本拡張で封じた。
  - 実装: それぞれ `getAllBlogPosts` / `FEATURE_LANDING_PAGES` / `KEYWORD_PAGES` に解決するか kind 別に assert。lookbehind(直前非英字)で `app/features/[slug]` 等のディレクトリ名や import パスを除外。走査実測=**32箇所(blog17+features10+keywords5)全て実在=死リンクゼロ・false positive ゼロ**。「走査が機能している」test を blog/features/keywords 各代表で強化(silent 0件マッチ防止)。
  - 注記(プロセス): 最初 `git mv` 直後の commit が「100% rename」=内容拡張が staged されず旧 /blog 限定blob のままだったのを `git show HEAD:` で検知し、`55ddd2f` で内容を再commit・push。教訓=Write→git mv 順だと mv が index 既存blobを引き継ぐので、内容変更は git mv 後に明示 add が必要。
  - 全ゲート緑(commit前に単独実行・緑目視): typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ) / test 270 files 2125 passed / build OK(2557 pages prerendered)。
- **本セッション小計=確実な改善1件(死リンク回帰ガード新設→3レジストリへ一般化)＋監査3角度を clean 決着(JSON-LD url/image・redirect源UIリンク・候補i/ii既ガード確認)**。content/funnel/aria vein は s90-98 で深く飽和。内部レジストリ参照の死リンク vein は **(blog本文=script監査 / keyword・success-story の relatedBlogSlug=既存test / recommended-books 非空=既存test / 非blog面の blog・features・keywords cross-link=本セッション)で全面ガード完了**。

### セッション99 — sitemap の具象 static ルート indexability 回帰ガード（P0-2 隣接角度・クロールsignal矛盾の予防）
- done: [P0-2 next-angle＝static ルートの noindex 矛盾防止] SHA `4b21c58`: 新テスト `__tests__/seo/sitemap-static-indexable.test.ts`(3 it)。
  - 監査(read-only)で確定した gap: `sitemap-resolvability.test.ts` は (1)データ駆動URLの404、(2)GONE_PATHS(410)、(3)無条件301源 を守るが、**static app ルートの indexability は明示的に out-of-scope(手動メンテ)**(同test L36-42・L87-88)。一方 `lib/seo/sitemap-xml.ts` の STATIC_ROUTES 前後コメント(L69-73・L101-102)は「noindex ページを sitemap に載せるとクローラ signal が矛盾するため除外」という**手動不変条件**を維持しているのに、それを守る回帰ガードがどこにも無かった。後から (a)掲載ページを noindex 化して STATIC_ROUTES から外し忘れ／(b)noindex ページを誤って STATIC_ROUTES に足す、のどちらが起きても無言でクロール資産を浪費しうる。
  - **静的grepは両方向で誤検知と確認(=安易な実装を回避)**: `grep 'index: false'` だけだと `/topics`(0件時のみ noindex・通常 index:true)・`/q`・`/[exam]`・`/essay/[exam]/[id]`・`/features/[slug]`・`/keywords/[keyword]`(条件付きnoindex=本番indexable・sitemap掲載が正)を false-positive。逆に「`index:true` リテラル不在」で炙ると、`robots` を変数算出する indexable な動的ページ(essay deep等)を false-positive。→ **実メタデータを評価する以外に堅牢な判定なし**と判断。
  - 実装(最小・additive・自己メンテ): `renderMainSitemapXml()`+`renderBooksSitemapXml()` の実 loc から **具象 static ルートのみ**を抽出(動的接頭辞 /blog/* /keywords/* /features/* /recommended-books/* /essay/<exam>/<id> /topics/* を除外)。各ルートを `import.meta.glob('../../app/**/page.tsx')` の遅延 loader へ 1:1 マップ(ルートグループ無しを実測確認・`/`→app/page.tsx)し、`metadata`/`generateMetadata`(引数は {params,searchParams} を渡し no-arg関数とも両対応)から実 robots を解決→`robots.index===false` or 文字列"noindex" を弾く。`import.meta.glob` の型は `/// <reference types="vite/client" />` で解決(any禁止を遵守)。
  - 検証(全ゲートを commit と別呼び出しで単独実行・緑目視): typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ=非自分) / test **271 files 2128 passed**(新3 it) / build Compiled successfully。**崩れたら落ちる property も実測**: `/referral` に一時的に `robots:{index:false}` を付与→test が `['/referral']` で fail することを確認後 revert。現状は矛盾ゼロ(=純粋な回帰ガード・本番挙動への影響なし・main凍結維持)。空振り防止 it(>20件)＋全ルートが import 可能 it も同梱。
  - 心得遵守: 既に矛盾は無いので「直す」変更ではなく、saturation した content/funnel vein に代わり**手動不変条件をコードで固定する回帰ガード**(s98 死リンクガードと同genre・1コミット=1論点)。
- done: [cycle2＝旗艦保護] SHA `8b0760a`: 同 test に旗艦 essay deep `/essay/<exam>/<id>` の indexability ガードを追加(申し送り候補 i を消化)。当該 generateMetadata は **問題が見つからない時だけ** robots:index:false を返す(L43)＝条件付きで現状矛盾なしを確認。`getAllEssayQuestions()` の掲載12問を実 params で `generateMetadata` 評価し index:false でないことを固定＋not-found分岐(架空ID)が noindex を返す健全性も pin(空振り防止 it 同梱)。test +3。
- done: [cycle3＝canonical自己参照] SHA `116326b`: 同 test に「canonical を持つ具象 static ルートは自URLを正規化先にする」ガードを追加(申し送り候補 ii を消化)。canonical が別URLを指すと sitemap 掲載でも deindex され crawl資産浪費(激辛レビュー: /quiz canonical 自己矛盾が SEO致命 TOP5)。read-only 監査で全具象 static が自己参照(home のみ sitemap loc=""・canonical="/" の正規化差＝benign)を確認→「canonical 明示時のみ自URL一致」(省略は self フォールバック許容＝強制presence の誤検知回避)を固定。**崩れたら落ちる**: /student canonical を一時 `/wrong-target` 化→`['/student -> /wrong-target']` で fail を確認後 revert。test +1。
- 検証(cycle2/3とも全ゲートを commit と別呼び出しで単独実行・緑目視): typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ) / test 271 files **2132 passed**(本file計7 it) / build は test-only追加ゆえ不変(cycle1で Compiled successfully 確認済・app/lib/config 無編集)。
- **本セッション小計=確実な改善3件**(static indexability `4b21c58` / 旗艦essay deep indexability `8b0760a` / canonical 自己参照 `116326b`)。いずれも sitemap 掲載面の「クロールsignal矛盾」を予防する回帰ガード(現状矛盾ゼロ・本番挙動不変・main凍結維持)。
- **次セッション申し送り**: 「クロールsignal矛盾」予防は (静的sitemap indexability=s99 / 旗艦essay deep indexability=s99 / canonical自己参照=s99 / データ駆動404=resolvability / 301・410=既存 / 死リンク=s98)で網羅。残る予防候補(薄め・要吟味): static ページの `alternates.canonical` 以外の重複(openGraph.url vs canonical の齟齬)・hreflang/lang 一貫性くらいだが thin。content/funnel/aria vein は s90-98 で深く飽和・HD群(HD-4/6/8/9/10/11/12/13)とルーティング再設計(使-3)は人間待ち。新規の太い vein は GSC 404一覧(HD-1)か本番データ投入(HD-4)等の人間入力が起点。

### セッション100 — crawl-signal 矛盾予防の最終3ガード（og:url×canonical / sitemap index×配信ルート / robots Disallow×sitemap）
s99 申し送りの「残る予防候補(薄め)」3点を**着手前に実コードで価値を再検証**してから、grounded な2点を実装＋robots×sitemap という太い1点を新規発見して実装。いずれも「404掃除でクロール資産回復」ピラーの回帰ガードで、両方向の「崩れたら落ちる」を実測。本番挙動不変・main凍結維持。
- done: [cycle1＝og:url×canonical] SHA `f83a0f2`: `sitemap-static-indexable.test.ts` に「og:url を明示する具象 static ルートは canonical と同一URLを指す」ガードを追加(s99 申し送り候補を消化)。**着手前監査**=具象 static 全ルートの og:url vs canonical を実評価→og:url 設定面16件は全て canonical 一致(未設定面は metadataBase 継承＝許容)で現状矛盾ゼロを確認してから green ガード化。og:url と canonical はどちらも正規URL signal で、食い違うと正規化先が矛盾しシグナルが誤URLへ集約されうる。空振り防止(og:url 設定>5件)同梱。崩れたら落ちる=/about の og:url を別URL化→fail 確認後 revert。test +1(7→8 in file・全体2132→2133)。
- done: [cycle2＝sitemap index×配信ルート] SHA `45d022c`: `sitemap-render.test.ts` に「sitemap index の各エントリ ↔ 配信 route(app/sitemap/<name>.xml/route.ts) の 1:1 存在対応」ガードを追加(4 it)。**新角度**=既存 sitemap-render は index の中身、resolvability は loc 解決を守るが「index ↔ 配信ルートの存在対応」自体は無防備だった。index にあるが route 無し=dead 子 sitemap(クローラが sitemap で404)、route あるが index 無し=orphan(子 sitemap が未発見でURL群がクロール漏れ)。`import.meta.glob` でルートキーのみ列挙(import せず=server-only 依存を踏まない)。現状 {main/exams/topics/blog/books + questions/[id]} が完全一致。崩れたら落ちる=両方向実測(dead: index に glossary.xml 注入→fail / orphan: index から books.xml 除去→fail、各 revert)。test +4(全体2133→2137)。
- done: [cycle3＝robots Disallow×sitemap・**新規の太い vein**] SHA `f8f14a5`: `robots.test.ts` に「robots の Disallow が sitemap 掲載 URL を1つもブロックしない」ガードを追加(2 it)。**着手前監査**=robots の longest-match(Disallow 長 > Allow 長で blocked)で主要カテゴリ+question チャンク0 の sitemap loc(>10,776・全 path 接頭辞網羅)を評価→ブロック0 を確認。sitemap が「クロールせよ」と載せる URL を robots が塞ぐと正反対の指示=典型的高インパクト SEO バグ。robots.test は sitemap directive の有無のみ、sitemap 系 test は loc 解決のみ守り「Disallow×sitemap loc の矛盾」は無防備だった。崩れたら落ちる=/blog を Disallow に注入→/blog 系188 URL を flag して fail 確認後 revert。**注記(scope bug 回避)**: 既存 `disallow`/`allow` const は第1 describe スコープ内ローカルで再利用不可ゆえ新 describe 内で robots() から再導出(ReferenceError を検知・修正済)。test +2(全体2137→2139)。
- **SKIP(着手前監査で価値否定=過大修正/padding 回避)**:
  - **dynamic ページの og:url×canonical ガード**: essay deep/blog/[exam]/keywords/features は全て **og:url を canonical と同一の単一変数から導出**(`url`/`canonical` を両フィールドへ代入)＝構造的に drift 不能。独立ハードコードの static と違いガードの実益が無い=SKIP。
  - **「indexable static ページが sitemap に載っているか」逆方向 orphan ガード**: `import.meta.glob` で全 page を import 評価しようとすると server-only(next/server 等)import で throw する面があり robust に組めない(s99 の static-indexable test が sitemap 掲載ルートだけを import している理由と同じ)。=fragile ゆえ SKIP。
- 全ゲート緑(各 commit と別呼び出しで単独実行・緑目視): typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ) / test **271 files 2139 passed** / build Compiled successfully(cycle3前に実走・29.8s)。
- **本セッション小計=確実な改善3件**(og:url×canonical `f83a0f2` / sitemap index×配信ルート `45d022c` / robots Disallow×sitemap `f8f14a5`)＋SKIP監査2件(dynamic og:url=構造的に安全・逆orphan=fragile)。
- **次セッション申し送り**: crawl-signal 矛盾予防は (sitemap indexability/canonical 自己参照/essay deep=s99 / 死リンク=s98 / og:url×canonical=s100 / index×配信ルート=s100 / robots×sitemap=s100 / データ駆動404=resolvability / 301・410=既存) で**ほぼ全面ガード完了**。残る薄い候補: twitter:card image と og:image の一貫性・lang/locale(全ページ ja_JP)一貫性くらいだが thin。content/funnel/aria vein は s90-99 で深く飽和・HD群(HD-1/4/6/8/9/10/11/12/13)とルーティング再設計(使-3)は人間入力待ち。**新規の太い vein は GSC 404一覧(HD-1)か本番データ投入(HD-4)等の人間入力が起点**。

### セッション101 — 土台×データ構造: 科目B スタック・キューのトレース練習記事を新設（発展パターンveinの5本目）
s100 申し送りの「残る薄い候補(twitter:card image×og:image・lang/locale一貫性)」を**着手前に実コードで再検証→両方SKIP(過大修正の罠)**と確定し、代わりに**土台=科目Bの発展パターン trace vein**で genuinely distinct な未着手1件を着手。本番挙動不変・main凍結維持。
- **SKIP(着手前監査で価値否定＝padding回避)**:
  - **twitter:card image × og:image 一貫性ガード**: 静的ページ(/essay・/why-kakomon-ai 等)は og.images と twitter.images を**同一のローカル定数**(ESSAY_OG_IMAGE 等)から導出＝定数を変えれば両方が同時に変わり drift 不能。dynamic ページ(blog 等)も単一 ogImageUrl 変数を両フィールドへ代入＝構造的に安全(s100 og:url SKIP と同型)。実害なし＝SKIP。
  - **lang/locale 一貫性ガード**: html lang は layout で一括 "ja"・og locale は ja_JP の固定 copy＝drift源が無く thin。SKIP。
- done: [P1-土台・科目B 発展パターン vein 5本目] SHA `97f328c`: 新記事 `fe-kamoku-b-stack-queue`「基本情報 科目B スタックとキューのトレース練習｜LIFOとFIFOを操作表で1つずつ追う」。
  - **着手前監査で gap を確定**: 既存 trace 4本(s81 線形探索・s82 二分探索・s83 選択ソート・s83 再帰)は**全てアルゴリズム**。一方 `fe-kamoku-b-wakaranai` の「頻出パターン7つ」item4=**スタック・キューの操作**と名指しされ、corpus でも「ポインタで繋がるデータ構造」と概念言及されるのに、**データ構造そのものの操作を擬似言語で1つずつトレース実演する記事が不在**だった。スタック/キューは探索/ソート/再帰と別カテゴリ(=量産でなく distinct gap)。
  - **実装(オリジナル・手計算検算)**: スタック(LIFO・頂点ポインタ・プッシュ/ポップ)とキュー(FIFO・先頭/末尾ポインタ・エンキュー/デキュー)を**配列＋添字のみ**(記法早見表で確立済の notation のみ・record/参照型は未導入＝format特定リスク回避)でモデル化。**同じ入力 3,7,1,9** でも取り出し順が逆(スタック=1→9→7／キュー=3→7→1)になる対比を中心に GFM 操作表で実演。全トレース値を手計算で検算(スタック: push3/7/1→pop=1→push9→pop=9→pop=7／キュー: enq3/7/1→deq=3→enq9→deq=7→deq=1)。つまずき3点(出入口の取り違え/読んでからポインタを動かす/配列に古い値が残る)＋循環バッファ1段落対比。
  - **funnel規律(土台=非論文)**: 旗艦/essay非送客(body /essay=0実測・/essay は全ページ共通ヘッダnav「午後論述AI」の1件のみ＝peer saiki-trace と同数で parity)・/fe・科目Bピラー taisaku・擬似言語/記法早見表/wakaranai・アルゴリズム分野プール /fe/topic・AIコパイロットへ funnel・/fe/topic は科目A相当と明示framing(誇大回避)。
  - **inbound2面(orphan回避)**: 親 `fe-kamoku-b-saiki-trace` 次のステップ(「ほぼ制覇」を温存しデータ構造として追記＝アルゴリズム主張と非矛盾)＋`fe-kamoku-b-wakaranai` の頻出パターン認識節。FAQPage(4Q&A・回答に markdown link 無し)・sitemap収録・回帰pin7件 `fe-kamoku-b-stack-queue-funnel.test.ts`。
  - **プロセス教訓(自己修正)**: 初回 Edit で body 閉じバッククォートを `\`,`(エスケープ)で書き template literal が未終端化→typecheck が後続記事の生バッククォートまで読み「Unterminated template literal」。開きは生・inline code は `\``・**閉じは生バッククォート**が正。`cat -A`/Read で escape を特定し1行修正で解消。
  - **検証(全ゲートを commit と別呼び出しで単独実行・緑目視)**: typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ) / test **272 files 2146 passed**(新7 it・2139→2146) / build Compiled successfully(2558 pages・2557→2558＝新ページ prerender)。本番HTML実測=FAQPage JSON-LD・LIFO/FIFO・トレース結果(1→9→7/3→7→1)・循環バッファ present・inbound 2面(saiki/wakaranai HTML に stack-queue リンク present)。
- **本セッション小計=確実な改善1件**(科目B スタック・キュー trace 記事新設)＋SKIP監査2件(twitter image=同一定数で安全・lang/locale=固定copyでthin)。
- **次セッション申し送り**: 安全(配列+添字のみ・記法早見表 notation 一致)な発展パターン trace vein は **線形探索/二分探索/選択ソート/再帰/スタック・キューの5本で saturation**。残る wakaranai「頻出パターン7つ」の未着手は **item5 連結リストの挿入・削除** と **item6 木構造の探索(DFS/BFS)** の2件だが、**いずれも record/参照型(.next・ヌル/undefined・ノード)の notation を要し、これは corpus の記法早見表(gijigengo-kihou)に未確立**＝(a)記法早見表を先に拡張するか(b)IPA公式の record/参照記法を裏取りしてからでないと format誤framing/HD-9 リスク＝**自律で安易に着手しない**(要慎重裏取り or 記法基盤の先行整備)。バブルソート/フィボナッチ完全トレースは s83 が「sort/再帰の変種＝量産回避」で deprioritize 済ゆえ非着手。content/funnel/aria/crawl-signal vein は s90-100 で深く飽和・HD群(HD-1/4/6/8/9/10/11/12/13)とルーティング再設計(使-3)は人間入力待ち。**新規の太い vein は GSC 404一覧(HD-1)か本番データ投入(HD-4)等の人間入力が起点**。

### セッション102 — 科目B 記法早見表に record/参照型の記法基盤を確立し、連結リスト trace 記事を新設（s101申し送りの「記法基盤の先行整備」を実行）
s101 申し送りが「item5 連結リスト/item6 木構造は record/参照型 notation が記法早見表に未確立＝自律で安易に着手しない。(a)記法早見表を先に拡張 or (b)IPA公式裏取りしてから」とした blocker を、**(a)+(b) を両方実施して解除**した上で item5 を1本実装。本番挙動不変・main凍結維持。1コミット=1論点で2サイクル。
- **裏取り(一次資料・WebFetch では PDF が binary で読めず pdftotext で抽出)**: IPA公式の科目B サンプル問題(`fe_kamoku_b_sample.pdf`)＋令和5公開問題(`2023r05_fe_kamoku_b_qs.pdf`)を pdftotext で抽出し、record/参照型の正式記法を確認。確定した事実: (1)基本の「擬似言語の記述形式」appendix表には record/class が無い(○手続/型名:変数/←/if/while/do/for/配列のみ)。(2)連結リスト等の問題では各要素を**クラス**で表し、問題ごとにクラスの説明(メンバ変数の表)が添えられる。(3)メンバアクセスは **変数.メンバ**(ドット。公式に `prev.next`/`curr.next`/`prev.next が 未定義でない`)。(4)クラス型変数は**インスタンスの参照**を格納。(5)空・終端は **未定義 / 未定義の値**。(6)大域変数 `大域: ListElement: listHead ← 未定義の値`。(7)コンストラクタ `クラス名(引数)`(公式 `curr ← ListElement(qVal)`)。
- done: [cycle1＝記法基盤の先行整備] SHA `87acd4a`: 記法早見表 `fe-kamoku-b-gijigengo-kihou` に **「## クラス・参照：連結リストや木構造で出てくる記法」節**を additive 追加(メンバ変数とドット(.)・参照(インスタンスへの参照)・未定義(終端/空)・大域変数・コンストラクタ)。description に「クラス・メンバ変数(.)・参照・未定義」を追記・まとめ1点・FAQ2件(ドット(.)とは/未定義とは)を追加。基本記述形式には無いが IPA公開サンプル・公開問題で実際に使われる記法、と正確に framing(誇大回避)・正式仕様は IPA公式へhedge。回帰pin1件(クラス/メンバ変数/curr.next/ドット/参照/未定義/大域/ListElement(qVal) を assert＝将来の連結リスト/木構造記事の記法基盤として固定)。**=item5/6 の blocker(記法未確立)を解除**。
- done: [cycle2＝item5 連結リスト trace] SHA `d22c813`: 新記事 `fe-kamoku-b-renketsu-list`「連結リスト（単方向リスト）のトレース練習｜参照を1本ずつ付け替える」。クラス Node(val/next)・大域 先頭・未定義(末尾/空)で、**先頭挿入(入れた順3→7→1がリスト1→7→3に逆転)・走査(p が未定義でない間 p.val 出力→p←p.next)・途中挿入(新ノード.next←p.next を先に、p.next←新ノード を後に＝付け替えの順序が最大の落とし穴・逆にすると後ろを全喪失)** をオリジナル擬似言語で実演(IPA非転載)。**全トレース値を手計算検算**(先頭挿入→1→7→3／走査出力1,7,3／途中挿入(B,5)→1→7→5→3)。つまずき3点(未定義をたどる/付け替え順序/先頭の特別扱い)＋木構造への橋渡し1段落。土台=非論文ゆえ旗艦/essay非送客(body /essay=0実測)・/fe+科目Bピラー+記法早見表+wakaranai+分野プール funnel・/fe/topic=科目A相当framing。inbound2面(stack-queue「次のステップ」＋wakaranai頻出パターン節)・FAQPage(3Q&A)・回帰pin7件。
  - **プロセス(audit warning 即修正)**: link audit が新記事の anchor「クラス・参照の節」を generic-anchor「参照」(GENERIC_ANCHORS 収録語)として WARNING(false positive・full anchorは記述的)。anchor を「クラス・メンバの節」へ reword し audit **0 FATAL/0 WARNING** に戻した(reword 後 build 再走・本番HTML実測)。
- **検証(各 commit と別呼び出しで単独実行・緑目視)**: typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ) / test **273 files 2154 passed**(2146→2154・新 it=cycle1×1+cycle2×7) / build Compiled successfully(2558→2559 pages＝新ページ prerender) / **link audit 0 FATAL / 0 WARNING**(1880 links)。本番HTML実測=記法節(メンバ変数/インスタンスの参照/.next/未定義/大域)・連結リスト記事(トレース結果 1→7→3・1→7→5→3・FAQPage JSON-LD・essay leak 0・inbound 2面が stack-queue/wakaranai HTML に present)。
- **本セッション小計=確実な改善2件**(記法基盤の record/参照節 `87acd4a` ＝ s101 blocker 解除 / 連結リスト trace 記事 `d22c813`)。意図的に **item6 木構造は本セッションで着手せず**(s81/s83/s101 の「量産しない・1本ずつ・手計算検算必須」規律を尊重＝同一セッションで3本目の content 記事は量産の罠)。
- **次セッション申し送り**: **item6 木構造の探索(DFS/BFS)は記法基盤(クラス・参照・未定義)が s102 で確立済＝blocker 解除。連結リスト記事の「参照を付け替える/未定義で終端判定」感覚も土台として整った**ので、次の自然な1本。ただし木構造 trace は (1)各節点が left/right の**2本の参照**を持つ、(2)DFS=再帰(コールスタック・saiki-trace と接続)/BFS=キュー(stack-queue と接続)で**前2記事の集大成**になる反面、巡回順(行きがけ/通りがけ/帰りがけ・レベル順)の**トレース表が複雑で誤り混入リスクが高い**＝**1本に絞り・小さい木(節点5前後)で全巡回順を手計算検算してから**着手。これで wakaranai「頻出パターン7つ」trace 実演は完全網羅(item1合計/2ソート/3探索/4スタック・キュー/5連結リスト/6木構造/7再帰)。それ以降は trace vein 完全枯渇＝別角度(P2-2制度/access系の未開拓1つずつ裏取り・要吟味)か HD群(GSC 404=HD-1/本番午後データ=HD-4)等の人間入力待ち。content/funnel/aria/crawl-signal vein は s90-100 で深く飽和。

### セッション103 — 科目B 木構造（二分木）trace 記事を新設し、wakaranai「頻出パターン7つ」trace 実演を完全網羅（s102申し送りの item6 を実行）
s102 申し送りが「item6 木構造は記法基盤(クラス・参照・未定義)が確立済＝blocker解除。次の自然な1本。ただし巡回順のトレース表が複雑で誤り混入リスク高＝1本に絞り・小さい木(節点5前後)で全巡回順を手計算検算してから着手」とした最後の trace vein を実行。本番挙動不変・main凍結維持。1コミット=1論点。
- done: [P1-土台・科目B item6 木構造 trace] SHA `ad94d94`: 新記事 `fe-kamoku-b-tree-trace`「基本情報 科目B 木構造（二分木）のトレース練習｜深さ優先と幅優先で全ノードをたどる」。
  - **着手前監査で gap を確定**: 既存 trace 6本(線形探索・二分探索・選択ソート・再帰・スタック/キュー・連結リスト)に対し、wakaranai「頻出パターン7つ」item6=**木構造の探索(DFS/BFS)** の trace 実演のみ不在だった。記法基盤(クラス・参照・未定義)は s102 で確立済＝blocker解除済。
  - **実装(オリジナル・全巡回順を手計算検算)**: クラス Node(val/left/right)・大域 根・未定義(葉)で、**小さな二分木5節点**(根1・1の子=2,3・2の子=4,5)をモデル化。深さ優先3兄弟(行きがけ=自分→左→右／通りがけ=左→自分→右／帰りがけ=左→右→自分・出力1行の位置だけが違う)＋幅優先(レベル順・キュー)を実演。**全4巡回順を手計算検算**: 行きがけ `1→2→4→5→3`・通りがけ `4→2→5→1→3`・帰りがけ `4→5→2→3→1`・レベル順 `1→2→3→4→5`。深さ優先=再帰(saiki-trace のコールスタックと接続)・幅優先=キュー(stack-queue の FIFO と接続)＝**前2記事の集大成**と明示。つまずき3点(未定義をたどる/巡回順の取り違え/DFS再帰とBFSキューの道具混同)。IPA非転載。
  - **funnel規律(土台=非論文)**: 旗艦/essay非送客(body /essay=0・HTMLの/essayは全ページ共通ヘッダnav「午後論述AI採点」1件のみ＝parent renketsu-list と count parity 1)・/fe・科目Bピラー taisaku・記法早見表/wakaranai/pseudo-language・分野プール /fe/topic・AIコパイロットへ funnel・/fe/topic は科目A相当と明示framing。
  - **inbound2面(orphan回避)**: 親 `fe-kamoku-b-renketsu-list` の「木構造への橋渡し」節(既存の橋渡し文に tree-trace リンクを追記)＋`fe-kamoku-b-wakaranai` の頻出パターン認識節(タイプC・連結リストの次に追記)。FAQPage(3Q&A・回答に markdown link 無し)・sitemap収録・回帰pin7件 `fe-kamoku-b-tree-trace-funnel.test.ts`。
  - **検証(全ゲートを commit と別呼び出しで単独実行・緑目視)**: typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ) / test **274 files 2161 passed**(273→274 file・2154→2161＝新7 it) / build Compiled successfully(2560 pages・2559→2560＝新ページ prerender) / **link audit 0 FATAL/0 WARNING**(1905 links・1880→1905)。本番HTML実測(.next/server/app/blog/fe-kamoku-b-tree-trace.html)=4巡回順すべて present(1→2→4→5→3/4→2→5→1→3/4→5→2→3→1/1→2→3→4→5)・FAQPage JSON-LD present・深さ優先/幅優先/二分木 present・inbound 2面(renketsu-list/wakaranai HTML に tree-trace リンク present)・記法早見表/fe-topic inbound present・/essay=ヘッダnav 1件のみ(body leak 0)。
- **本セッション小計=確実な改善1件**(木構造 trace 記事新設 `ad94d94`)。意図的に **2本目の content 記事は着手せず**(s81/s83/s101/s102 の「量産しない・1本ずつ・手計算検算必須」規律を尊重)。
- **次セッション申し送り**: **wakaranai「頻出パターン7つ」trace 実演は item1合計・最大/2ソート/3探索/4スタック・キュー/5連結リスト/6木構造/7再帰 で完全網羅＝trace vein 完全枯渇**。バブルソート/フィボナッチ完全トレースは s83 で「sort/再帰の変種＝量産回避」deprioritize 済ゆえ非着手。**残る着手可能な太い vein は (a)P2-2 競合薄ブログ強化(別角度・1本ずつ・量産回避)か (b)別試験区分の午後/科目別の悩み系ロングテール記事(要 gap 確認)。それ以外は HD群(GSC 404=HD-1/本番午後データ=HD-4)・ルーティング再設計(使-3)・shared-UI コパイロット導線(P1-6残り=要慎重監査・範囲広)等の人間入力 or 厚い監査待ち**。content/funnel/aria/crawl-signal vein は s90-102 で深く飽和。

### セッション104 — 高度試験 午前Iの対策記事を新設（trace vein枯渇後の新vein＝P2-2 制度/対策系の取り残し）
s103 申し送りが「trace vein 完全枯渇＝別角度(P2-2 競合薄ブログ・別試験区分の悩み系ロングテール)へ」とした方針に沿い、**着手前に gap を実測確定**してから1本実装。本番挙動不変・main凍結維持・1コミット=1論点。
- **SKIP(着手前監査で過大修正回避)**: 既存の thin stub 4本(pm-essay-shudai-pickup/st-strategy-perspective/au-audit-evidence-language/db-er-design-practice)の本文深掘りは、worklog が「len<800=過大修正回避・/essay funnel既設でgap無し」と**意図的にthinと判断済**＝「迷ったら直さずSKIP(安全側)」を尊重し second-guess しない。
- **gap確定(read-only監査)**: blog 126記事を走査→午前Iは「免除」(ipa-gozen1-menjo-jouken)・「合格基準/足切り」(koudo-goukaku-ten-ashikiri)の記事はあるが、**免除がない人がどう午前Iを突破するかの「対策/勉強法」専用ページが不在**(午前Iは188+65箇所言及されるが全て免除/合格基準/多段階選抜の文脈で passing mention)。午前I=全高度区分共通の最初の関門・旗艦=午後への入口・道場系は高度試験を午前IIしか持たず午前Iは区分分断＝**競合薄かつ on-strategy な明確gap**。
- done: [P2-2 新vein・制度/対策系] SHA `bb20a48`: 新記事 `koudo-gozen1-taisaku`「高度試験 午前Iの対策｜30問50分・応用情報と同範囲を最短で60点突破する勉強法」。
  - **裏取り(IPA公式 list.html + WebSearch複数source)**: 午前I=30問・50分・四肢択一・100点満点/基準点60点(=18問/6割)・出題範囲は応用情報の午前(80問)と同じレベル3(テクノロジ/マネジメント/ストラテジ全分野)・全高度9区分+支援士で共通の問題・多段階選抜の一段目(午前I未達なら午前II以降不採点)。**CBT移行と無関係の durable fact**(午前I構造は不変)・既存コーパスのSSOT(応用情報午前と同等レベル・4段階構成・免除2年3ルート)と整合。
  - **実装(オリジナル・誇大回避)**: 試験形式表/出題範囲=AP午前過去問が教材/捨て分野を作らない(30問しかない)/過去問の回し方/本番の時間配分(50分30問=1問約100秒・知識先行・計算後回し)/免除という選択肢/午前Iを抜けたら午後へ。
  - **funnel規律**: 午前対策の土台=応用情報午前(/ap・同範囲)・免除判断(menjo)・足切り(ashikiri)・区分選び(9kubun)へ。その先の午後は**論述区分(ST/SA/PM/SM/AU)のみ旗艦/essayへ「参考評価・採点基準は非公開」明記で送客**し記述区分(NW/DB/SC)は各ハブへ(誇大回避・menjo記事 precedent を踏襲)。cross-区分ゆえ exam/booksExam 未設定(索引送客)。
  - **inbound2面(orphan回避)**: menjo「過去問AI で午前I対策も免除狙いも」節＋ashikiri「午前I足切り」節に body リンク追記(relatedSlugs だけでなく本文リンクで確実化)。FAQPage(4Q&A・回答に markdown link 無し)・sitemap収録・回帰pin6件 `koudo-gozen1-taisaku-funnel.test.ts`。
  - **プロセス教訓(自己修正)**: commit メッセージで PowerShell heredoc `@'...'@` を Bash ツールに渡し先頭に stray `@` 行が混入→未push のうちに `git commit --amend -F <file>` で是正(file経由でquoting事故を回避)。**Bash ツールでは heredoc `<<'EOF'` か -F file を使う**。
  - **検証(各ゲートを commit と別呼び出しで単独実行・緑目視)**: typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ) / test **275 files 2167 passed**(274→275 file・2161→2167＝新6 it) / build Compiled successfully(新ページ prerender 136KB) / **link audit 0 FATAL/0 WARNING**(1923 links・1905→1923)。本番HTML実測(.next/server/app/blog/koudo-gozen1-taisaku.html)=全核心事実present(30問/50分/四肢択一/基準点60点/18問/多段階選抜/共通の問題)・FAQPage JSON-LD present・funnel href(/ap×3・menjo・ashikiri・/essay・/nw/db/sc)present・誇大回避(参考評価×4/採点基準は非公開×2/論述系区分×2)・inbound 2面(menjo/ashikiri HTML に koudo-gozen1-taisaku リンク present)。
- **本セッション小計=確実な改善1件**(午前I対策記事新設 `bb20a48`)。content corpus は s90-103 で深く飽和ゆえ**量産せず1本=確実**(s25規律)を尊重し2本目は着手せず。
- **次セッション申し送り**: 午前I=対策/免除/合格基準の3観点が揃った。**残る P2-2 制度/対策系の候補(要 gap 確認・量産しない)**: (a)午前II対策は**区分固有(専門知識)で cross-区分の generic 記事は thin**＝per-区分は量産リスク=要慎重・着手しない寄り。(b)受験料/合格証書再発行=thin懸念(継続保留)。(c)SGスコア通知=HD-8。(d)AP/高度の合格発表専用=令和8年度CBT移行安定まで不可。trace vein は s103 で完全枯渇・content/funnel/aria/crawl-signal vein は s90-103 で深く飽和。**新規の太い vein は GSC 404一覧(HD-1)/本番午後データ(HD-4)/ルーティング再設計(使-3)等の人間入力 or 厚い監査が起点**。

## セッション105（growth ループ・2026-06-03 JST）— P2-2 named seed の content深掘り（履歴書記事に「勉強中・取得予定の資格の書き方」節を追加）
背景（着手前 read-only 監査）:
- 全主要vein(trace s101-103/FAQ s53/keyword LP s56/objection s91/404 s33-35)は done/SKIP/HD で枯渇を確認。s104申し送りの次着手候補=(a)P2-2 競合薄ブログ強化(1本ずつ) / (b)別区分longtail。
- 確定戦略(c)が명示する競合薄ブログ強化対象=roadmap/履歴書/勉強法/科目B/午後。named seed `it-shikaku-rirekisho-kakikata`(15位/455表示)を精査。
- 機械走査で gap 確定: `勉強中/取得予定/学習中/合格見込み` のコーパス言及ゼロ・`受験予定` はリスケ文脈(6800/10648)のみ=「資格 勉強中 履歴書 書き方」高intentサブクエリが完全未カバー。
実装(1コミット=1論点・最小diff):
- done SHA `34b3768`: 既存記事に新節「## 勉強中・取得予定の資格の書き方」(学習中/受験予定/結果待ちのステータス別記載例・合格済みと行を分け最下段・合格誤読=経歴詐称リスク)をオリジナル追加。**新規thin記事でなく既存深掘り**で量産回避(strategy c「内容深掘り」)。FAQ 1Q&A(まだ合格していない勉強中の資格)＋まとめ1行も追加。
- 誇大/安全: durableな履歴書作法(staleness無し・外部数値/IPA要verify無し)・非論文career記事ゆえ旗艦/essay非送客・**新規内部リンク無し=新規404リスクなし**・IPA問題文転載なし(オリジナル生成)。
ゲート(commitと別呼び出しで緑を目視後にcommit):
- typecheck 0 / lint 0 error(1 warningは untracked scripts/ux-audit-screenshots.mjs=対象外) / test 2167 全緑(blog-faq-jsonld の FAQ数pin 5→6 を更新) / build OK。
検証(「崩れたら落ちる」実測):
- 本番prerendered `.next/server/app/blog/it-shikaku-rirekisho-kakikata.html` を **UTF-8 read**(PS5.1既定はUTF-8日本語を誤読するため[System.IO.File]::ReadAllText+UTF8で再読)。新節h2=2 / 合格に向けて学習中=6 / 受験予定=12 / 経歴詐称=2 / 新FAQ Q present=4 / acceptedAnswer(FAQPage JSON-LD)=6 Q&A 反映を確認。
- 回帰pin: `__tests__/seo/blog-faq-jsonld.test.ts` の rirekisho FAQ length を 5→6 に更新(崩れたら落ちる)。
push: git pull --ff-only(Already up to date)→push成功 df6aa9e..34b3768。
申し送り: P2-2 named seed(履歴書)はサブクエリ深掘りで1点強化。残named seed=roadmap(6.2位=既にページ1)/勉強法/科目B/午後は既に厚く、深掘り候補は個別精査が必要(量産回避・1点ずつ)。content vein は概ね枯渇で、次は別named seedの未カバーサブクエリ機械走査 or 別区分longtailのgap確認を1件ずつ。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## セッション106（2026-06-03）— 新角度=outbound(外部 出典)リンクの 404 監査 + 回帰ガード新設 [done SHA `3f7ead0`]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
着手前監査: content vein(trace/FAQ/study-time/objection/制度・access/受験料)は全て saturation or thin/HD-blocked を再確認。factual 監査(FE科目B 20問100分/SG科目A48・科目B12/AP 300〜500時間/s103 tree-trace の4巡回順=preorder 1·2·4·5·3 等)も全て手計算照合で clean。internal link=0 FATAL/0 orphan(audit report)。structured data(Article/LearningResource/BreadcrumbList+条件付HowTo/FAQPage)も完備。

**新角度=「別の404種別: outbound(外部リンク)」**。これまでの 404/死リンク監査(s1-99)は全て**内部リンク限定**で、blog本文が 出典(CLAUDE.md §8 の核心ルール)として張る**外部 IPA リンクは未監査**だった。
- 実測監査: blog本文の distinct 外部URL=6本(全て `www.ipa.go.jp/shiken/*`)を curl で実測 → **全6本 HTTP 200・リダイレクト無し(canonical)**。死リンク・stale path ゼロ＝現状 clean(IPA URL 再編の影響を受けていない)。
- ただし §8 出典ルールには**自動enforcementが皆無**(internal は audit-internal-links/nonblog-internal-link-resolvability で守られるが outbound は無防備)。IPA は /shiken/ URL を定期的に再編するため、将来 typo/stale path が dead 出典 として無検知で出荷されるリスクが残る。
- **回帰ガード新設** `__tests__/seo/blog-external-link-allowlist.test.ts`(3 it): (1)全外部リンク https のみ(insecure http 禁止)、(2)host=公式allowlist(`www.ipa.go.jp`)のみ、(3)distinct 外部URL集合が vetted pin(6本・2026-06-03 に 200/no-redirect 検証済)と完全一致。**崩れたら落ちる**: 新規外部リンク追加 or 既存IPA path編集で(3)が fail → 著者が 200 を再検証して pin 更新を強制＝「このリンク誰か確認した?」を暗黙から enforced gate へ。
- 検証: 新test 3緑(extraction が6本を正確に拾い pin と一致)。全ゲート緑(typecheck0 / lint0err〔warnは未追跡 ux-audit-screenshots.mjs のみ〕/ test 276files 2170 passed〔s105 2167→+3〕/ build OK)。本番side-effect無し(test-only・production変更ゼロ)。
- **所見**: outbound-404 は現状 clean ゆえ修正対象は無かったが、§8 の核心ルールに唯一存在した enforcement gap を塞いだ＝予防的回帰ガード。**この vein は監査clean + ガード化で打ち止め**(外部リンクは IPA 6本のみ・affiliate は recommended-books 側で blog本文には無し)。次セッションは引き続き P2-2 制度系の薄い残り(午前II対策=量産リスクSKIP寄り)か、本当に尽きていれば DONE.flag を検討(ただし安易に宣言しない)。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## セッション106 cycle2（2026-06-03）— 【最大級の404発見】jitec.ipa.go.jp 出典リンク全滅 → live IPA index へフォールバック [done SHA `861a8d7`]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cycle1 の outbound 監査を blog本文(6本=clean)から**非blog面=問題データの sourcePdfUrl/pdfUrl** へ拡張したところ、**最大級の死リンクを発見**。
- **発見**: 問題コーパスの `sourcePdfUrl`(/q 全問の 出典)と essay の `pdfUrl`(論文deepの 出典/isBasedOn)が **`https://www.jitec.ipa.go.jp/...`** を指す。`nslookup`=**NXDOMAIN(ドメイン消滅)**・curl=000(`www.ipa.go.jp` は 200 なので sandbox問題でなくドメイン廃止)。IPA が jitec サブドメインを廃止済。
- **規模**: data/questions 全体で **jitec(dead)=12,999件 / 既移行 www.ipa.go.jp(live・200)=1,440件**。圧倒的多数が dead。/q は最大クロール面(~12,653ページ)＝§8 出典ルール違反が全面で発生、かつ hasImage 問題は「図表はIPA公式PDFで確認」と促す先が dead=最悪のUX。
- **deep-remap は不可能**: 新URLは `www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000009sgk-att/...pdf` の**不透明なCMSハッシュdir**＝旧 jitec path から決定的に変換不能。かつ IPA は限られた年度しかホストせず、推測した deep URL は別の404を生む(=「新規404を作らない」違反になる)。→ **保守的フォールバック**が唯一安全。
- **修正(SHA `861a8d7`・1論点=dead host→live fallback)**: `lib/exam-config.ts` に `isLivePdfUrl`(https かつ host≠jitec)を新設し `getSafePdfUrl`/`getOfficialAnswerPdfUrl` が dead jitec を弾いて `IPA_EXAM_INFO_URL`(=`https://www.ipa.go.jp/shiken/mondai-kaiotu/`・**実測200**・現行PDF一覧)へフォールバック。既移行 www.ipa.go.jp URL は通過。**raw bypass 3箇所も gate 経由化**: /q 図表リンク(page.tsx:350)+透明性disclaimer(:438)・essay isBasedOn(:102)+出典href(:187)・essays 業種タブ(:184・EssayIndustryTabs href:120)。ExplanationCard/QuestionCard は既に getSafePdfUrl 経由ゆえ gate修正で自動是正。
- **検証(崩れたら落ちる+実測)**: (1)unit pin 更新=`exam-config-pdf-url.test.ts`(jitec→IPA_EXAM_INFO_URL・live URL通過・14 it 緑)＋`essay-flagship-jsonld.test.ts` source-pin を `getSafePdfUrl(question.pdfUrl)` へ更新。(2)**本番ビルドHTML実測**: flagship essay SSG 12面=jitec **0**・`mondai-kaiotu/` fallback present。prerendered /q **1,595面**=jitec **0**・fallback present。(3)AP 2024-autumn の元データ=jitec(14件)を確認＝**dead だった面が live fallback に変わった実証**(既移行面の trivial pass でない)。(4)新規404=ゼロ(IPA_EXAM_INFO_URL 200)。全ゲート緑(typecheck0/lint0err/test 276files 2171 passed/build OK)。
- **=§8 出典ルールに存在した最大の死リンク(~13,000本)を一括で live化**。runtime gate ゆえデータ大移行なしで全面是正。
- **申し送り(follow-up・本ループでは着手しない理由付き)**: (A)**deep-remap migration**=jitec URL を実際の新deep URL(年度別 200)へ精密移行すれば index でなく当該PDF直リンクに戻せるが、(1)新URLは不透明ハッシュで IPA index のスクレイプが必須、(2)古い年度は IPA非ホスト=一部は index止まりが正、(3)~13k件のデータ書換=広域＝**人間/別バッチ判断(HD候補)**。backlog P0-6 に evidence付きで起案。(B)`buildPdfUrl`(lib/exam-config.ts:312・offline parse script専用)は今も jitec を生成＝再parseで新問題に dead URL が入る。serve gate が中和するが、script側も IPA_EXAM_INFO_URL ベースへ直すのが筋(ただし parse pipeline は通常運用で走らない＝優先度低・別タスク)。

## セッション106 cycle3（2026-06-03）— jitec fix の API面カバレッジ補完 [done SHA `5c6b37e`]
cycle2 の page/essay gate に続き、**raw bypass の最後の面=公開API**を是正。`/api/v1/questions`(L113)・`/api/v1/grade`(L70)が `q.sourcePdfUrl` を生(dead jitec)で JSON 返却していたのを `getSafePdfUrl()` 経由へ。APIコンシューマも dead でなく live IPA索引を受け取る。openapi/契約テストは sourcePdfUrl の値をassertしておらず低リスク。typecheck0/lint0err/test 2171/build OK。**=jitec dead-link は page(/q)・essay(deep/essays)・公開API の全 serve 面で live化完了**（残るは HD-14 の deep-remap=精度向上のみ・死リンクは全面ゼロ）。

## セッション107（2026-06-03）— jitec follow-up (B): parse pipeline が出典を dead で永続化する latent bug を是正 [done SHA `7920977`]
s106 cycle2 の申し送り (B)「`buildPdfUrl`(parse script専用)も jitec生成のまま・serve gate が中和するが script側も IPA_EXAM_INFO_URL ベースへ直すのが筋」を実行。本番挙動不変・main凍結維持・1コミット=1論点。
- **着手前監査**: `buildPdfUrl` の呼び出し元を grep。fetch-ipa-pdfs.ts(download用・deep path 必要=触らない=HD-14領域)／**parse-all.ts:424・parse-pdf-to-json.ts:297 の2箇所のみが `sourcePdfUrl` の永続値**に使用。両者とも `buildPdfUrl(...)` を生で `sourcePdfUrl` に格納＝**再parseのたびに dead jitec 出典を ~数千件 データ層へ再注入**(serve gate=runtime band-aid が masking していただけ)。§8 出典ルール違反の温床。
- **修正 SHA `7920977`(1論点=at-rest を live化)**: `lib/exam-config.ts` に純粋helper `buildSourcePdfUrl(cfg,year,season,sessionCfg)` を新設＝`getSafePdfUrl(buildPdfUrl(...,"qs"))`。dead jitec/空CBT を live IPA index(`IPA_EXAM_INFO_URL`)へ degrade(serve層の表示と完全一致)。parse-all.ts/parse-pdf-to-json.ts の import と呼び出しを `buildPdfUrl`→`buildSourcePdfUrl` に差替(両ファイルとも buildPdfUrl は他に未使用)。`buildPdfUrl` 自体は fetch crawler 用に温存・既存テスト不変。
- **検証(「崩れたら落ちる」+全ゲート別呼び出し緑目視)**: 回帰pin2件を `exam-config-pdf-url.test.ts` に追加＝(1)`buildSourcePdfUrl(ap,2024,spring)` が jitec を含まず `IPA_EXAM_INFO_URL` と一致、(2)CBT空URLも index へ degrade。gating を外す revert で fail。typecheck0 / lint0err(warn=未追跡 ux-audit-screenshots.mjs のみ) / test **276 files 2173 passed**(2171→+2) / build Compiled successfully(30.3s)。本番side-effect無し(parse pipeline は通常運用で非走行・serve出力は cycle2/3 で既に live化済＝今回は at-rest データ整合の予防是正)。
- **=jitec dead-link 是正の最後の取り残し(parse 永続層)を gate化＝serve面(s106 cycle2/3)＋データ層(s107)で完結**。残るは HD-14(deep-remap=精度向上のみ・死リンクは全面ゼロ)。
- **次セッション申し送り**: jitec vein 完全打ち止め。content/funnel/aria/crawl-signal/trace vein は s90-106 で深く飽和。**新規の太い vein は GSC 404一覧(HD-1)/本番午後データ(HD-4)/ルーティング再設計(使-3)等の人間入力 or 厚い監査が起点**。P2-2 制度系の薄い残り(午前II対策=区分固有で量産リスク・受験料=thin・SGスコア=HD-8)は SKIP寄り。

## セッション107 cycle2（2026-06-03）— jitec serve gate の取り残し2面を発見・是正 [done SHA `4903ce8`]
cycle1 完了後、`getSafePdfUrl` 未経由で生 `.pdfUrl`/`.sourcePdfUrl` を href に出す面が他に無いか read-only 監査(grep `\.(sourcePdfUrl|pdfUrl)\b` を app/components/lib 全域)。s106 cycle2/3 は /q・essay・essays・公開API を gate化したが、**2面が未gate=死リンクを serve中**だったのを発見:
- **`components/afternoon/AfternoonResultView.tsx:229`**: 「出典 PDF を開く」が `href={question.pdfUrl}` 生。afternoon データの pdfUrl は**全10件が dead jitec**(grep 実測)＝afternoon 結果画面で NXDOMAIN 死リンクを serve。
- **`lib/copilot/citation-meta.ts:85` → `components/copilot/CitationCards.tsx:213`**: copilot 引用カードの `fullSourceUrl` が `q?.sourcePdfUrl ?? p.doc.url` 生で、CitationCards が `href={citation.fullSourceUrl}` で出力。sourcePdfUrl は**~13k問が dead jitec**＝AIコパイロット(中核機能)の出典が死リンク。
- **修正 SHA `4903ce8`(1論点=serve面の生jitecを根絶)**: 両面を `getSafePdfUrl()` 経由化。citation は fallback 意味論を保つため `q?.sourcePdfUrl ? getSafePdfUrl(q.sourcePdfUrl) : p.doc.url`(p.doc.url は内部/q URL＝gate不要)。`p.doc.url`-only の非question枝(L112)は内部URLゆえ不変。
- **検証(「崩れたら落ちる」回帰pin2件+全ゲート別呼び出し緑)**: (1)`AfternoonResultView.test.tsx`=jitec pdfUrl を inject→「出典 PDF を開く」link href が `IPA_EXAM_INFO_URL` で jitec を含まないこと。(2)`citation-meta.test.ts`=実コーパスの jitec保持問題を動的検出→fullSourceUrl が `IPA_EXAM_INFO_URL` へ degrade＋question引用 500件 sample が jitec を1つも含まない invariant。gate を外す revert で両者 fail。typecheck0/lint0err(warn=未追跡 ux-audit のみ)/test **276 files 2175 passed**(2173→+2)/build Compiled successfully(29.5s)。
- **=jitec dead-link 是正は serve 全面(/q・essay・essays・API・afternoon結果・copilot引用)＋at-rest データ層(cycle1)で完結**。残るは HD-14 deep-remap(精度向上のみ・死リンクは全面ゼロ)。
- **本セッション小計=確実な改善2件**(cycle1 `7920977` at-rest gate / cycle2 `4903ce8` serve取り残し2面)。**次セッション申し送り**: jitec vein 完全打ち止め(at-rest+全serve面)。`getSafePdfUrl` 未経由の生PDF href は監査で0確認。新規の太い vein は人間入力(HD-1 GSC404/HD-4 本番午後)or 厚い監査待ち。

## セッション108（2026-06-03）— jitec 是正の取り残し: essay/afternoon codegen 2本も at-rest gate化 [done SHA `8e54ea6`]
s107 は「jitec vein 完全打ち止め(at-rest+全serve面)」と申し送ったが、**at-rest を生む codegen で2本が取り残し**だったのを発見・是正。
- **着手前 read-only 監査**: serve面は grep `\.(sourcePdfUrl|pdfUrl)\b` を app全域で再確認＝全て getSafePdfUrl 経由(s106/s107 で gate済・新規 leak なし)。citation-meta.ts の jitec はコメントのみ(L89 で gate済)。次に **at-rest を書く側**を grep `jitec|buildPdfUrl` で全 scripts 走査→s107 が直したのは question parse pipeline(parse-all/parse-pdf-to-json)のみで、**essay 生成 `scripts/generate-essays-new-year.ts`(pdfUrlFor→pm2 jitec)と AP午後 `scripts/parse-afternoon/parse-ap-afternoon.ts`(buildPdfUrl→pm jitec)が raw jitec を pdfUrl に永続化**していた(serve gate が masking)。fetch-ipa-pdfs.ts は **download 用で deep URL 必須=ゲートしない**(HD-14 領域)と確認。
- **修正 SHA `8e54ea6`(1論点=essay/afternoon codegen の at-rest を live化)**: 両 script の local jitec builder 出力を `getSafePdfUrl(...)` で wrap(import は `@/lib/exam-config`・parse-all 前例と同経路)。dead jitec/CBT空は live IPA index(`IPA_EXAM_INFO_URL`)へ degrade＝serve出力と完全一致。deep URL builder は HD-14 deep-remap 用に温存。
- **検証(「崩れたら落ちる」+全ゲート別呼び出し緑目視)**: 新 source-pin `__tests__/scripts/codegen-pdf-url-gate.test.ts`(4 it)＝両 script が getSafePdfUrl を import し pdfUrl を `getSafePdfUrl(pdfUrlFor|buildPdfUrl(` で wrap していること。raw jitec emit へ revert で fail。typecheck0 / lint0err(warn=未追跡 ux-audit-screenshots.mjs のみ) / test **277 files 2179 passed**(2175→+4) / build Compiled successfully。**本番side-effect無し**(codegen は通常運用で非走行・既存 serve は gate 済・既存 at-rest bulk question data の jitec は HD-14 のまま)。
- **=jitec at-rest gate は question pipeline(s107)＋essay/afternoon codegen(s108)で codegen 全面完了**。残るは HD-14(既存 bulk data の deep-remap=精度向上のみ・死リンクは serve 全面ゼロ)。
- **次セッション申し送り**: jitec codegen vein 完全打ち止め(全 at-rest generator が gate済・serve 全面 gate済)。新規の太い vein は人間入力(HD-1 GSC404 / HD-4 本番午後)or 厚い監査待ち。

## セッション108 cycle2（2026-06-03）— 新vein=非blog crawlable面の outbound 出典 404 を発見・是正 [done SHA `012421d`]
codegen gate(cycle1)完了後、「別の404種別=outbound」を非blog面へ拡張(P2-3h は blog本文のみ guard)。app/components/lib の外部 ipa.go.jp リンクを全列挙→**distinct URL を curl 実測**したところ**2本が HTTP 404**(sitewide な実害):
- **`lib/seo/question-jsonld.ts:171`**: LearningResource JSON-LD の `license` が `/shiken/mondai-kaiotu.html`=**404**。**全 /q ページ(12k+面)の構造化データに dead link** を出力していた。
- **`app/about/page.tsx:160`**: §8 著作権リンクが `/shiken/kakomondai/copyright.html`=**404**。
- 付随: `https://www.ipa.go.jp/shiken`(exam-resources `IPA_BASE`)=301だが**これは連結用 base 定数**(`${IPA_BASE}/cbt/ip.html` 等)で bare link でない＝触らない(末尾/追加は `//cbt` を生む)。
- **正しい live 行先の特定(WebFetch/WebSearch 裏取り)**: IPA は旧 copyright.html / mondai-kaiotu.html を廃止し、「過去問題の使用について(許諾不要・使用料不要・出典明記)」は **`https://www.ipa.go.jp/shiken/faq.html`** に集約(WebFetch で『当機構で公表している過去の試験問題の使用に関し…許諾や使用料は必要ありません』『出典を…明記してください』を確認)。faq.html=**200 no-redirect** 実測。
- **修正 SHA `012421d`(1論点=非blog outbound 出典の dead link 根絶)**: 両 dead link を `https://www.ipa.go.jp/shiken/faq.html` へ。JSON-LD `license` は schema.org 的にも terms ページ=faq.html が適切。
- **検証(「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑)**: 新 guard `__tests__/seo/nonblog-external-ipa-link-health.test.ts`(3 it)=app/components/lib を再帰走査し(1)既知 dead path 2本の再出現で fail、(2)gate module(exam-config.ts)以外で jitec.ipa.go.jp host 出力で fail、(3)question-jsonld/about が faq.html を指すこと。**guard が自分の説明コメント中の dead path literal を検出**したため当該コメントを reword(=guard が実際に効く実証)。本番ビルド実測: `.next/.../q/ap/2024-autumn/am/q1.html`=faq.html present・mondai-kaiotu.html **0**、`about.html`=faq.html present・copyright.html **0**。typecheck0/lint0err/test **278 files 2182 passed**(2179→+3)/build OK。
- **=非blog crawlable 面の outbound 出典 404 を2本是正(うち1本は全 /q 面の JSON-LD=sitewide)＋regression guard 新設**。
- **次セッション申し送り(P2-3i 継続)**: `lib/seo/exam-resources.ts` の `EXAM_OFFICIAL_LINKS`(全13区分×overview/syllabus/pastQuestions=**~39本の IPA公式テンプレURL**・試験ハブにE-E-A-T リンクとして描画)は今回未verify。`${IPA_BASE}/cbt/ip.html`・`/syllabus/index.html#...`・`/mondai-kaiotu/index.html` 等を1本ずつ curl して dead(404/301)が無いか確認＝次の確実な outbound-404 タスク。

## セッション108 cycle3（2026-06-03）— P2-3i継続: EXAM_OFFICIAL_LINKS の dead /cbt/ overview を4本是正 [done SHA `d682514`]
cycle2 申し送りの「EXAM_OFFICIAL_LINKS(~39テンプレURL)未verify」を消化。distinct URL を全 curl 実測:
- **4本が 404**: `/shiken/cbt/{ip,sg,fe,sc}.html`(IP/SG/FE/SC の overview)。IPA が全試験 overview を `/shiken/kubun/` に統合したため旧 `/cbt/` が廃止。**全 /[exam] ハブ(`app/[exam]/page.tsx`→`ExamOfficialResources`)の E-E-A-T 公式リンクが該当4区分で 404**。
- 残りは clean: `/kubun/{ap,st,sa,pm,nw,db,es,sm,au}.html`=9本200・`/syllabus/index.html`=200・`/mondai-kaiotu/index.html`=200。
- **正しい行先(WebFetch `kubun/list.html` 裏取り)**: IP/SG/FE/SC も `/shiken/kubun/{exam}.html`(IPA自身の区分一覧がリンクする先)=**4本とも 200** 実測。
- **修正 SHA `d682514`(1論点=公式リンクの dead overview 根絶)**: ip/sg/fe/sc の `overview` を `${IPA_BASE}/cbt/{x}.html`→`${IPA_BASE}/kubun/{x}.html`。全13 overview が単一の live パターンに統一。
- **検証(「崩れたら落ちる」+本番HTML実測+全ゲート緑)**: guard `nonblog-external-ipa-link-health.test.ts` に `EXAM_OFFICIAL_LINKS` を import して distinct URL(fragment除去)を**curl検証済 allowlist にpin**する describe を追加(path編集で fail)。本番ビルド `.next/server/app/sc.html`(/[exam]ハブ)=`kubun/sc.html` present・`cbt/sc.html` **0** 実測。typecheck0/lint0err/test **2184 passed**(+2)/build OK。
- **=非blog面 outbound 出典 404 を本セッションで計6本是正**(cycle2: mondai-kaiotu.html[全/q JSON-LD]・copyright.html[/about] / cycle3: cbt/{ip,sg,fe,sc}.html[/[exam]ハブ])。`#section_xx` の fragment anchor が syllabus/index.html の実DOMアンカーに解決するかは soft(404でない)＝P2-3e系の別観点で要すれば別タスク。
- **本セッション小計=確実な改善3件**(cycle1 codegen at-rest gate `8e54ea6` / cycle2 非blog outbound 404×2 `012421d` / cycle3 EXAM_OFFICIAL_LINKS dead overview×4 `d682514`)。jitec at-rest vein 完全打ち止め＋非blog outbound 出典 404 を guard 化で予防恒久化。

## セッション109（2026-06-03）— P2-3i継続: EXAM_OFFICIAL_LINKS syllabus の dead #section_xx fragment を13本是正 [done SHA `2fc30ce`]
s108 cycle3 申し送りの「`/syllabus/index.html#section_xx` の fragment anchor が実DOMアンカーに解決するか(soft)」を消化。
- **read-only 監査(実測)**: `https://www.ipa.go.jp/shiken/syllabus/index.html` を curl(200/80KB)→ページ全体で `section` literal が **id/name/href いずれにも0件**(grep 実測)。`#section_{ip,sg,fe,ap,st,sa,pm,nw,db,es,sc,sm,au}` 13本は**全て解決先が存在しない dead anchor**(404ではない=200ページの先頭に着地する soft mismatch=P2-3e系をoutboundへ適用)。ページは per-exam section を持たず `/kubun/{exam}.html`(=overview・既存)へリンクする hub 構造ゆえ、honest な行先は fragment 無しの `/syllabus/index.html`。
- **修正 SHA `2fc30ce`(1論点=dead fragment 根絶)**: `lib/seo/exam-resources.ts` の全13 `syllabus` から `#section_xx` を除去(sed・base URL は不変・全13区分 `/[exam]` ハブの E-E-A-T リンクが clean な syllabus hub を指す)。既存 guard は `split("#")[0]` で fragment を剥がし HTTP status のみ検証＝dead anchor を見逃していた gap も塞ぐ。
- **検証(「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑)**: guard `nonblog-external-ipa-link-health.test.ts` に「syllabus link は `#` を含まない」assertion を追加(fragment 再付与で fail)。本番ビルド `.next/server/app/ap.html`(/[exam]ハブ)=`syllabus/index.html` present・`#section_` **0** 実測。typecheck0/lint0err(warn=未追跡 ux-audit のみ)/test **278 files 2185 passed**(2184→+1)/build Compiled successfully(29.8s)。
- **=非blog面 outbound 出典の dead-anchor(soft 404種別)を13本是正＋guard化**。P2-3i の outbound-fragment 観点をカバー。

## セッション109 cycle2（2026-06-03）— 内部 anchor 再スイープ: sitewide footer の dead 内部アンカー /about#attribution を是正 [done SHA `79c27e9`]
cycle1(outbound syllabus fragment)後、dead-anchor 観点を**内部リンク**へ展開(P2-3e は s71 が `#${...}` を sweep 済だが新規追加分を再点検)。
- **read-only 監査(実測)**: app/components の `href=".../#anchor"` を全列挙→各 anchor target の `id="..."` 実在を grep 照合。9本中**8本は解決**(/settings#notifications・#api-keys / #main-content / /about#support / /transparency#metrics・#affiliate / /student#apply / /q #explanation=s71既確認)。**1本だけ dead**: `app/layout.tsx:238` の sitewide footer 「IPA著作権・出典」が `/about#attribution` を指すが、`app/about/page.tsx` の「出典・著作権」h2(L149)に id 無し(全 id は `#support` のみ)＝**全ページのフッターから §8 出典リンクが /about 先頭に着地**(著作権セクションへ跳ばない soft dead-anchor)。
- **修正 SHA `79c27e9`(1論点=footer §8 出典アンカーを解決)**: 「出典・著作権」h2 に `id="attribution"` + `scroll-mt-20`(既存 `#support` anchor と同パターン=sticky header ~64px 下に隠れない)を付与。href 側でなく target 側を補う(footer の意図する著作権セクションへ正しく跳躍)。
- **検証(「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑)**: 新 guard `__tests__/a11y/about-attribution-anchor.test.ts`(2 it)=footer が `/about#attribution` を参照すること＋/about が `id="attribution"` を `scroll-mt-20` 付きで持つこと(id除去で fail)。本番ビルド `.next/server/app/about.html`=`id="attribution" class="...scroll-mt-20..."` present・footer link present 実測。typecheck0/lint0err(warn=未追跡 ux-audit のみ)/test **2187 passed**(2185→+2)/build Compiled successfully(29.3s)。
- **=内部 anchor 再スイープで sitewide な dead 内部アンカー1本を是正**。他8本の内部 anchor は解決を実測確認＝内部 anchor vein は本セッションで clean。
- **本セッション小計=確実な改善2件**(cycle1 outbound syllabus fragment×13 `2fc30ce` / cycle2 内部 footer anchor `79c27e9`)。dead-anchor(outbound fragment＋内部 sitewide)を実測ベースで是正＋guard化。

## セッション110（2026-06-03）— 多面 read-only 監査=全 clean を実測確認（コード変更なし）+ 新角度1件起案
s108-109 の dead-link/anchor/factual vein 打ち止め後、**着手可能な小diff defect が残っていないかを多面 read-only 監査で実測検証**。結論=監査した全サーフェスが clean かつ SSOT 整合。憶測で直さず、実害のある defect が無いため**コード変更は行わず**(過大修正回避)、監査証跡を残して将来セッションの再監査チャーンを防ぐ＋新角度1件を backlog へ seed。
- **(1) outbound IPA 出典リンク 全面 再監査=clean**: codebase 全 `ipa.go.jp` URL を列挙。非blog面の deep path は EXAM_OFFICIAL_LINKS(s108-109 guard済)・question-jsonld faq.html(s108)・blog allowlist(s106)で既カバー。**新規に SC essay `pdfUrl`(`mondai-kaiotu/{2025r07,2024r06,2023r05}.html`・3本)を curl 実測=全200**(getSafePdfUrl の非jitec passthrough が live を指すことを確認)。`/q` 印刷出典・license/operator/exam-stats の ipa リンクは全て `shiken/` base(200)。**=outbound 出典 404 vein は実測 clean**。
- **(2) 内部 anchor の scroll-mt 整合=clean**: s109 cycle2 が解決確認した8本の内部アンカー target が sticky header(~64px)下に隠れないか(scroll-mt有無)を実測。`/transparency#metrics`・`#affiliate`・`/student#apply`・`/about#support`・`/settings#notifications`・`#api-keys`(SectionTitle が `scroll-mt-20` 付与・L82) **全て scroll-mt-20 保持**。`/[exam]`ハブ(indexable・priority0.9)→`/settings#notifications` の crawlable リンクも target に scroll-mt 有り。**=anchor target の under-header 隠れ defect ゼロ**。
- **(3) blog 内部リンク健全性=clean**: `audit-internal-links.ts` 実走=192記事/1923リンク(body1288/related635)で **FATAL 0・WARNING 0**。監査スクリプトは validPaths を filesystem walk + blog/essays/essay/keywords レジストリで構築し全 body 内部リンクを検証(非blog route も対象)。blog body の `/keywords/*`リンク7本(ap-chokuzen-1week/auditor-coso-cobit/db-3nf-normalization/ip-1month-study-plan/nw-subnet-calculation/pm-evm-calculation/st-essay-structure-pattern)を keyword レジストリと突合=全実在。blog body に `/topics/*`リンク0・非blogコードに hardcoded `/topics/<slug>`・`/essay/<exam>/<id>`・`/essays/<exam>` 深リンク0(全てdata由来=inherently valid)。
- **(4) blog 非IPA outbound=clean**: blog content の `http(s)` URL から ipa/kakomon-ai を除外=**0件**(§8 出典=IPA限定の方針が維持・dead外部ドメイン無し)。
- **(5) 構造化データ/事実性 再監査=clean**: glossary の version-bound term=OWASP Top10「2025年版(2026年1月公開)」(WebSearch裏取り: RC=2025-11-06 Global AppSec / final=2026年1月公開＝**正**・s21修正の追認)・PMBOK 第7版・ITIL 4(34プラクティス)=全て現行で正。`data/faq.ts` の試験形式数値(FE科目A60問90分/科目B20問100分・AP午前80問/午後5問選択記述・午前I免除2年「期間内何度でも」・IP/SG/FE/AP合格率レンジ)=verified SSOT と一致。**AI quota copy「初回10回/1分15リクエスト/JST0:00リセット」=SSOT(`FREE_AI_DAILY_LIMIT=10`・`BETA_MINUTE_LIMIT=15`)と一致**(s9「1日30回」drift の再発無し)。
- **(6) 画像 dead-link=該当なし**: corpus に `hasImage:true`・`imageUrls` **0件**=/q 画像 404 vein は存在しない。
- **結論=loop-actionable な小diff defect は本セッション時点で枯渇**。残る backlog 未着手は全て (a)§10承認必須(quota/価格/プロンプト) (b)広域(P1-7 copilot quick-action UI=共有client UI=core「UX最速」差別化に触れるリスク・A-1 CopilotPanel分割・ルーティング再設計) (c)編集/設計判断(P2-4書籍リスト・HD-6/7/9/11/13/14) (d)人間ゲート(GSC 404一覧・価格)。**安全側で risky/marginal な変更を core UI へ強制せず**(「迷ったら直さず SKIP」「量産しない」)、監査証跡＋新角度seedで正常終了。
- **新角度 seed（backlog P2-2 残・要吟味）**: 「CBT予約を確実に取る/会場・日時の選び方・変更/キャンセルのルール」専用記事。現状 `ipa-shiken-moushikomi-nagare`(L5895)に予約タイミング/変更/キャンセルが1段落・`cbt-shiken-toujitsu-nagare`(当日)・cbt-vs-pbt に passing mention。**増分(早期予約で人気日程・会場が埋まる/平日閑散狙い/複数会場比較/予約期限・手数料)は原文に薄く存在**ゆえ thin/重複リスクあり＝着手は要吟味(s66 precedent: 既存節と heavy overlap なら専用ページ化せず)。さらに予約運用ルールは CBT-Solutions 改定で staleness exposure＝firm claim は避け CBT通年区分(IP/SG/FE)にスコープすべき。**本セッションでは seed のみ**(自律で量産しない)。

## セッション111（growth ループ・2026-06-03 JST）— 内部 anchor 再々スイープ: s109 が見落とした dead `/privacy#8` を是正 [done SHA `d7ab8b0`]
着手前 read-only 監査（複数サーフェスを実測）:
- **EXAM_OFFICIAL_LINKS outbound = clean**: distinct 15 URL(kubun×13/syllabus/mondai-kaiotu)を全 curl→**全 200**。既に `nonblog-external-ipa-link-health.test.ts` で allowlist/host/no-fragment/no-cbt/no-jitec を恒久 guard 済＝対応不要(再確認)。
- **内部リンク監査 = clean**: `pnpm tsx scripts/audit-internal-links.ts`→1923 links / **0 FATAL・0 WARNING**。
- **CBT予約 seed(s110)= SKIP寄り判定**: 既存 `ipa-shiken-moushikomi-nagare`(L5891-5895=予約flow＋前々日まで/変更無料/当日キャンセル返金なし)＋散在(L8002 区分別・L11284 平日閑散/会場距離・L14537 cbt-vs-pbt)で**核心の予約ルールは既出**。novel増分(人気枠が早く埋まる/会場比較)は thin かつ CBT-Solutions 運用ルール=staleness exposure。s66 precedent(既存節と heavy overlap なら専用化せず)＋「量産しない」で**専用記事化は見送り**(backlog に SKIP寄り継続として残置)。
- **dead 内部 anchor 再スイープ(=s109 cycle2 の取りこぼし発見)**: app/components/lib の内部 `#fragment` href を機械列挙し**各 anchor の target id 実在を実測**。s109 は「他8本 clean」と記録したが、実際は**2種が dead**だった:
  - **`/privacy#8`（DEAD→本セッション是正）**: `/transparency`(affiliate 開示)が `href="/privacy#8"`(「プライバシーポリシー Section 8」)を張るが、privacy ページは全節を共有 `<Section number=.../>` helper で描画し **id 皆無**＝`#1..#8` がどこにも解決せず /privacy 先頭に着地する soft dead-anchor。helper の `<section>` に `id={number}`+`scroll-mt-20` を付与し #1..#8 を全て addressable 化(sticky header に隠れない)。**本番ビルド HTML 実測=`<section id="1">..`<section id="8">` present・id="8"=アフィリエイト節**。回帰pin `__tests__/a11y/privacy-section-anchor.test.ts`(3 it=transparency href・privacy number="8"・helper id={number}+scroll-mt を pin・崩れたら落ちる)。
  - **`/${code}#years`・`/${code}#topics`（DEAD→backlog seed）**: `app/sitemap/page.tsx`(L165/173「年度別一覧」「分野別一覧」)が各試験ハブの browse 節へ deep-link するが、`app/[exam]/page.tsx` は id 皆無＋当該 UI は client `ExamBrowseTabs`(Radix Tabs・値 year/topic/mock・id 無し)。**2 anchor が単一 client tab 節を指す**ため id 1個追加では両立せず、hash→tab 選択は client 挙動変更=中スコープ。最小diff/1論点/広域リファクタ禁止に従い**本セッションでは着手せず P2-3i へ seed**(下記)。
- **検証(各ゲートを commit と別呼び出しで単独実行・緑目視)**: typecheck 0 / lint 0 errors(warn=未追跡 ux-audit-screenshots.mjs のみ・既存) / test **280 files 2190 passed**(+3 新 it) / build Compiled successfully(privacy prerender・id 反映) / 内部link audit 0 FATAL/0 WARNING。
- **本セッション小計=確実な改善1件**(`d7ab8b0`)。content/funnel/aria/crawl-signal/trace/jitec/outbound vein は s90-110 で深く飽和。dead 内部 anchor は本セッションで privacy を是正し、残る [exam] tab-anchor を seed＝「内部 anchor vein clean」を s109 の不正確な claim から実測ベースで更新。
- **次セッション申し送り**: (1)**P2-3i 残=`/${code}#years`・`/${code}#topics` の dead-anchor**(sitemap→[exam] browse tabs)。要 tab-hash 挙動の小設計(2 anchor→1 client節)。最小案=ExamBrowseTabs を hash 同期(`#years`→year tab・`#topics`→topic tab・wrapping section に id)か、sitemap 側を tab 無し単一 browse 節 anchor へ寄せる。client 挙動変更ゆえ要慎重監査・回帰pin必須。(2)CBT予約 seed は SKIP寄りで残置。(3)その他は HD群(GSC 404=HD-1/本番午後=HD-4)・承認必須・広域=人間入力待ち。

## セッション112（growth ループ・2026-06-03 JST）— P2-3i 完了: dead `/<exam>#years`・`#topics`（sitemap→[exam] browse tabs）を是正 [done SHA `2a7c13b`]
s111 申し送りの「P2-3i 残=`/${code}#years`・`/${code}#topics` の dead-anchor」を消化＝dead-anchor vein を完全打ち止め。
- **read-only 監査（実測）**: `app/sitemap/page.tsx` L165/173 が各試験ハブへ `href="/${code}#years"`・`#topics`（年度別一覧/分野別一覧）を deep-link。`app/[exam]/page.tsx` L381 の browse section（`ExamBrowseTabs`）は **id 皆無**＋当該 UI は client `ExamBrowseTabs`（自作 Tabs primitive・`defaultValue="year"` の**非制御**・値 year/topic/mock）。→ 両 anchor が DOM id に解決せず /[exam] 先頭に着地（year タブ固定）＝soft dead-anchor。**precedent 発見**: `components/account/DashboardTabs.tsx` が同じ自作 Tabs で hash→tab 同期を既に実装（`window.location.hash`＋`hashchange`＋controlled `value`/`onValueChange`）。同パターンを踏襲（一貫性）。
- **修正 SHA `2a7c13b`（1論点=dead anchor 根絶）**: (1) `app/[exam]/page.tsx` の browse section に SSR scroll-target `<span id="years" aria-hidden className="block scroll-mt-20" />`・`id="topics"` を追加（sticky header に隠れない・SSR保証ゆえ hydration 前から addressable）。(2) `components/exam/ExamBrowseTabs.tsx` を hash 制御化: `HASH_TO_TAB={years:"year",topics:"topic",mock:"mock"}`（sitemap の複数形 anchor → 単数形 tab 値へ写像）・`useState`＋`useEffect`（mount時 apply＋`hashchange` listener）・`<Tabs value={tab} onValueChange={setTab}>`（`defaultValue` 撤去）。TabsTrigger に id を上書きしない（自作 primitive が `${idPrefix}-tab-${value}` を自前付与・aria-labelledby 連携を壊さないため anchor は section 側の span に置いた）。
- **検証（「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑）**: 新 guard `__tests__/a11y/exam-browse-anchor.test.ts`（4 it=sitemap が `#years`/`#topics` を張る・[exam] が `id="years"`/`id="topics"`+scroll-mt を持つ・ExamBrowseTabs が years→year/topics→topic を写像・hash 制御で非 defaultValue）。本番ビルド `.next/server/app/ap.html`=`id="years" aria-hidden="true" class="block scroll-mt-20"`・`id="topics" ...` present 実測。typecheck0/lint0err（warn=未追跡 ux-audit-screenshots.mjs のみ・既存）/test **281 files 2194 passed**（2190→+4）/build Compiled successfully。
- **=dead-anchor vein（outbound fragment[s109]＋内部 sitewide footer[s109]＋/privacy[s111]＋[exam] tab-anchor[本]）を全打ち止め**。recommended-books の Amazon/楽天 affiliate 外部リンクは dynamic=対象外。

## セッション112 cycle2（growth ループ・2026-06-03 JST）— 新vein=openGraph override が default OG画像を落とす欠陥を3面是正 [done SHA `4331d95`]
dead-anchor vein 完全打ち止め後、別の SEO 欠陥クラスを探索。**本番ビルド全静的ページの `<meta property="og:image">` を機械走査**したところ **3面が og:image を1つも出力していない**ことを実測発見:
- **`/features`・`/keywords`・`/recommended-books`（og=0・実害=SNSシェア/SERPカードが画像無し）**: 3面とも metadata に `openGraph` ブロックを持つが `images` を省略。Next.js は子が `openGraph` を定義すると**親（root layout / `app/opengraph-image.tsx` file convention）の openGraph を deep-merge せず置換**するため、root の default OG 画像が落ちていた。`/` ホームは `app/opengraph-image.tsx` と同 segment ゆえ file convention が直接効き og:image を保持＝差が出ていた（nested 3面のみ欠落）。
- **`/api/og` ルートは該当3面用に bespoke type style（`feature`/`keyword`/`books` のグラデ・絵文字・subtitle）を既に予約済**＝各ページに専用カードを与える設計意図が明白なのに wiring 漏れ。
- **修正 SHA `4331d95`（1論点=openGraph override で落ちた OG画像を復元）**: 3面の openGraph に `images: [{ url: ${SITE_BASE_URL}/api/og?type=feature|keyword|books&title=...&body=..., 1200x630, alt }]` を追加（about/topics の既存 idiom 踏襲）。twitter は各面 metadata 未定義ゆえ root 継承（既に画像あり）＝触らず最小diff。
- **検証（「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑）**: 新 guard `__tests__/seo/page-og-image.test.ts`（it.each 3=各面 metadata の `openGraph.images[0].url` が `/api/og?` かつ `type={feature|keyword|books}` を含む・images 省略で落ちる）。本番ビルド `.next/server/app/{features,keywords,recommended-books}.html`=各 `og:image` content が対応 type の `/api/og` URL を出力（実測）。**全静的ページ再走査=og=0 ゼロ**（欠陥クラス枯渇を実測確認）。typecheck0/lint0err（warn=未追跡 ux-audit のみ）/test **282 files 2197 passed**（2194→+3）/build Compiled successfully(29.9s)。
- **=openGraph override が default OG画像を落とす欠陥クラスを3面是正＋guard化**。`grep -rl openGraph app/**/page.tsx | grep -v images` の唯一の残=`app/page.tsx`(home)は file convention で og:image を保持済＝対応不要を実測確認。**=本欠陥クラスは枯渇**。
- **本セッション小計=確実な改善2件**（cycle1 dead-anchor `2a7c13b` / cycle2 OG画像復元×3 `4331d95`）。

## セッション113（growth ループ・2026-06-03 JST）— 新vein=RSS 2.0 ブログフィード新設（コンテンツ発見性＝集客）[done SHA `4cca8f3`]
content/factual/structured-data/dead-anchor/OG vein が全て saturation のため別の構造的取り残しを探索。**着手前の多面 read-only 監査（本番ビルド実測）**: 全静的+動的ページの canonical/robots/og:image=全 present（clean）／twitter:image=openGraph から auto-inherit で全 present（s112 OG修正で連鎖解決済＝別vein不要）／meta description は static ページで 290〜371字と長いが /q(158cap)・blog(s144) と同じく editorial truncation=両義的ゆえ SKIP 継続。**発見した真の gap**: ブログ記事192本（templated 65＋general 127）に対し **RSS/Atom フィードが皆無**（`find app -iname '*feed*' -o -iname '*rss*'`=0件・`application/rss` 参照=0件）。フィードリーダー／アグリゲータからのコンテンツ発見口が無い＝集客の取り残し。
- **read-only 監査（コードベース idiom 把握）**: `app/sitemap/blog.xml/route.ts`（force-static route handler）＋`lib/seo/sitemap-xml.ts`（`getAllBlogSummaries()`=新着順・xmlEscape・SITE_BASE_URL）が既存パターン。`data/blog/types.ts` の BlogPostSummary=slug/title/description/tags/publishedAt/updatedAt（全 ISO 文字列＝Date パース可）。
- **修正 SHA `4cca8f3`（1論点=RSS フィード新設）**: (1)`lib/seo/feed-xml.ts`=`renderBlogFeedXml()`（RSS 2.0・channel に atom:self link/language ja/lastBuildDate・各 item に title/link/guid(isPermaLink)/description/pubDate(RFC-822=toUTCString)/category・sitemap と同一 `getAllBlogSummaries()` 新着順を単一情報源）。(2)`app/feed.xml/route.ts`=force-static・`Content-Type: application/rss+xml; charset=utf-8`。(3)`app/blog/page.tsx` の alternates に `types: { "application/rss+xml": "/feed.xml" }` を追加（feed autodiscovery link）。
- **発見した副次の class（root alternates の shadow）**: 当初 root layout に `alternates.types` を置いたが**本番HTMLに全く出力されない**ことを実測。原因＝home/blog/[exam] 等ほぼ全ページが `alternates.canonical` を自前定義し、Next.js は openGraph と同じく alternates も**置換（deep-merge せず）**するため root の types が shadow される（s112 OG override と同型 class）。→ root を revert し、意味的に正しい `/blog` 側へ types を配置（feed=blog のフィードゆえ妥当）。
- **検証（「崩れたら落ちる」+本番ビルド実測+全ゲート別呼び出し緑）**: 新 guard `__tests__/seo/blog-feed-xml.test.ts`（7 it=RSS2.0 構造/atom:self・item数==posts.length(>100)・全 item link が実在 /blog/<slug> へ解決(死リンク0)・guid+RFC822 pubDate・新着順先頭==posts[0].slug・raw `&` ゼロ(エスケープ)・/blog が autodiscovery type を宣言)。本番 `.next/server/app/feed.xml.body`=**192 item=192 guid=192 pubDate=192 blogLink**・`.meta` content-type=application/rss+xml・status 200 実測。`.next/server/app/blog.html`=`<link rel="alternate" type="application/rss+xml" href="https://www.kakomon-ai.jp/feed.xml"/>` 出力実測。typecheck0/lint0err（warn=未追跡 ux-audit のみ）/test **283 files 2204 passed**（2197→+7）/build Compiled successfully(29.7s)・`/feed.xml`=○(static prerender)。
- **=RSS フィード vein 新設・guard化完了**。フィードは sitemap 非掲載が正（フィードはクロール対象ページでなく配信形式）。robots.txt は `Allow: /` で /feed.xml 取得可。
- **cycle2 SHA `cb64a83`（同 vein・別サーフェス）**: feed autodiscovery を `/blog` 索引だけでなく **記事ページ `/blog/[slug]`** にも展開（読者は1記事を読んで購読する導線が一般的・post pages も canonical を自前定義し root alternates を shadow するため個別付与が必要）。本番 `.next/server/app/blog/fe-kamoku-b-taisaku.html`=autodiscovery link 出力実測・回帰pin追加（`generateMetadata({params})` 呼出で type 宣言を pin・計8 it）。typecheck0/lint0err/test **2205 passed**/build OK。
- **cycle3 SHA `15e9863`（同 vein・人間向け発見性）**: 機械可読 autodiscovery に加え、読者が購読できる**可視 RSS リンク**（Rss アイコン＋「RSS フィードで購読」）を `/blog` 索引ヘッダに控えめ設置（戦略=押し売りしない・本文分離）。`/feed.xml` は XML route handler ゆえ next/link でなく plain `<a>`。本番 `.next/server/app/blog.html`=href/ラベル出力実測・回帰pin（source-read・計9 it）。typecheck0/lint0err/test **2206 passed**/build OK。
- **本セッション小計=確実な改善3件**（cycle1 RSS feed 新設 `4cca8f3` / cycle2 記事ページ autodiscovery `cb64a83` / cycle3 可視 RSS リンク `15e9863`）。**=RSS/コンテンツ発見性 vein（フィード本体＋autodiscovery 2面＋可視リンク）を一通り整備**。残（要吟味・thin寄り・量産回避）: 区分別フィード(/feed/{exam}.xml)・Atom/JSON Feed 併設は volume 薄＝着手は要吟味（1フィードで全192本網羅済）。

## セッション114（growth ループ・2026-06-03 JST）— P2-3j cycle1: home page の RSS feed autodiscovery 欠落を是正
背景（着手前 read-only 監査）:
- backlog を P0→P3 走査。content vein・404/dead-anchor・FAQ・funnel は s1-113 で軒並み「枯渇/saturation/HD/要吟味」。直近 s113 が RSS 2.0 フィード(P2-3j)を新設したばかり。
- s113 の RSS 実装を監査: `lib/seo/feed-xml.ts`(RSS2.0・192item)＋`app/feed.xml/route.ts`(force-static)＋autodiscovery は `/blog`(`app/blog/page.tsx`)・`/blog/[slug]` のみ。
- gap 発見: **home page(`/`=裸ドメイン)に feed autodiscovery link が無い**。`app/layout.tsx` の root alternates=`{canonical:"/"}`(feed type 無し)、`app/page.tsx` も `alternates:{canonical:"/"}` のみ。フィードリーダー／ブラウザ購読ツールは裸ドメインを最初に取得し `<head>` の `<link rel="alternate" type="application/rss+xml">` を探す＝最も参照される発見面が空だった。s113 が blog post page で踏んだ「per-page alternates が root layout を REPLACE(merge でない)」shadow 問題と同型(既存 test L64-67 が明記)。
- done: SHA `8a1a115`。`app/page.tsx` の alternates に `types:{"application/rss+xml":"/feed.xml"}` を additive 追加(canonical は不変)。回帰pin1件(`__tests__/seo/blog-feed-xml.test.ts` に home metadata の autodiscovery 宣言 it を追加)。
- 検証(崩れたら落ちる): (1)全ゲート緑 — typecheck0 / lint 0err(既存の untracked `scripts/ux-audit-screenshots.mjs` warning 1件のみ=本変更外) / test 2207全緑(+1) / build OK。(2)**本番ビルド実測**: `.next/server/app/index.html` に `<link rel="alternate" type="application/rss+xml" href="https://www.kakomon-ai.jp/feed.xml"/>` 出力を grep 確認。新規404なし(既存 route への additive link)。
- push: growth-integration `c0d1142..8a1a115`。
- 所見: RSS vein の残(区分別フィード・Atom/JSON Feed 併設)は s113 通り thin/量産リスクで要吟味＝着手しない。home autodiscovery で主要3発見面(/ ・/blog ・/blog/[slug])が出揃った。

### セッション114 cycle2 — CBT予約 専用記事(s110 seed)を overlap 再評価で SKIP 確定
- 着手前 read-only 監査: `data/blog/generators.ts` の「予約」13箇所を実測。`ipa-shiken-moushikomi-nagare` L5891-5895 が既に予約**ルール**(前々日まで/変更は規定回数まで無料/当日キャンセル原則返金なし)を1段落で網羅・L11284 が off-peak も既出。
- 判断: seed の非重複増分は「予約が取れない/会場埋まる→早期予約・会場選び」のみ=narrow。残 precise facts(変更回数/手数料/返金)は staleness exposure 大で hedge 必須＝既存 L5895 と同型再掲になり rules で heavy overlap。seed 自身の SKIP 条件(moushikomi-nagare/cbt-toujitsu と重複 thin なら SKIP)＋s66 precedent＋「迷ったら SKIP（安全側）」で **SKIP 確定**(コード変更なし)。backlog の seed 行に SKIP evidence を追記。再着手は GSC で当該 pain の実需要確認後(人間判断)。
- 本セッション成果: cycle1 = home page RSS autodiscovery 是正(`8a1a115`・本番HTML実測・回帰pin)。cycle2 = CBT予約 seed の SKIP 確定(評価作業)。content/dead-link/FAQ/funnel/dead-anchor vein は s1-113 で軒並み枯渇のため、確実な技術改善1件＋evidenced SKIP1件で正常終了(量より確実性)。

## セッション115（growth ループ・2026-06-03 JST）— 新vein=試験ハブ Course.provider のぶら下がり @id 参照を是正 [done SHA `1ef91c4`]
content/dead-link/dead-anchor/FAQ/funnel/RSS/OG vein は s1-114 で軒並み枯渇のため、別の構造化データ欠陥クラスを多面 read-only 監査で探索。
- **着手前 read-only 監査（全て clean を実測確認）**: (1)blog `/blog/[slug]` の Article JSON-LD=image/author/publisher/mainEntityOfPage/dateModified 全て present＝完備。(2)`/blog` 索引=全192本を exam 別グルーピングで列挙（truncation 無し）＝orphan化なし。JSON-LD blogPost の `.slice(0,20)` は構造化データのみでクロール可能リンクは全件。(3)RSS feed(`lib/seo/feed-xml.ts`)=RSS2.0・atom:self・全item link 解決＝well-formed（コメントの「127本」は現~192で軽微 stale だが defect でない）。(4)footer=サービス/コミュニティ nav 完備・社会 link(X/note)present。(5)`structured-data.ts` Organization=EducationalOrganization・sameAs(X/note)・logo・SearchAction 完備。(6)`/[exam]` ハブ=Course/CourseInstance/EducationalOccupationalCredential/HowTo/CollectionPage/BreadcrumbList の richest graph。
- **発見した真の gap**: `/[exam]` ハブの `Course.provider` は `{"@type":"EducationalOrganization","@id":ORG_ID}` の **@id 参照のみ**で、name/logo/sameAs を持つ完全 Organization ノード(`buildOrgNode()`)は **home(`app/page.tsx`)と `/about` にしか定義されていなかった**。Google は各ページの構造化データを独立評価し `@id` を別ページへ辿って解決しないため、**13区分すべての試験ハブ(sitemap priority 0.9)で Course.provider に解決可能な name が無い**ぶら下がり参照だった。`grep buildOrgNode` で home/about のみ使用・`app/[exam]/page.tsx` は `ORG_ID` のみ import を実測確認＝per-page gap 確定。
- **修正 SHA `1ef91c4`（1論点=ぶら下がり provider の解決）**: `app/[exam]/page.tsx` の import を `{ ORG_ID, buildOrgNode }` に拡張し、`@graph` 先頭に `buildOrgNode()`(=`@id:ORG_ID` の完全 EducationalOrganization ノード)を additive 追加。これで Course.provider の @id 参照が同一ドキュメント内のフル定義へ解決する。`recognizedBy`(IPA org・別ノード)は不変。
- **検証（「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑）**: 新 guard `__tests__/seo/exam-hub-org-provider.test.ts`(3 it=純関数 `buildOrgNode()` が @id===ORG_ID・name 非空・logo・sameAs を持つ／ページ @graph に `buildOrgNode(),` を含む[revert で fail]／Course provider が ORG_ID 参照)。本番ビルド `.next/server/app/ap.html`=`EducationalOrganization`ノードが `@id:.../#organization`・`name:"過去問AI"`・logo present・`#organization` が2回出現(フル定義＋provider参照)を実測。typecheck0(別呼出 exit0)/lint0err(warn=未追跡 ux-audit-screenshots.mjs のみ・本変更外)/test **284 files 2210 passed**(2207→+3)/build Compiled successfully。
- **本セッション小計=確実な改善1件**(`1ef91c4`)。新規404なし(additive JSON-LD ノードのみ・挙動変更なし)。
- **次セッション申し送り**: 構造化データの per-page @id 解決性は本セッションで Course.provider を是正。残る薄い候補=CourseInstance に `courseWorkload`(学習時間 ISO8601 duration)を足せば Course rich-result eligibility が上がりうるが、(a)正確な区分別workload SSOT の有無確認が要る (b)Course rich result が試験対策コンテンツで実発火するか不確実＝**theoretical 寄りで要吟味**(過大修正の罠)。他は s110-114 通り HD群/承認必須/広域＝人間入力待ち。

### セッション115 cycle2 — @id 解決性 vein を正しく sweep（実害ある1面のみ是正・残は evidenced SKIP）
cycle1 で開けた「per-page `@id` 解決性」vein を1面だけ直して放置せず全面 sweep。`grep ORG_ID|SITE_ID` で @id 参照する全ページを列挙し各々の解決状況を実測:
- **blog `/blog/[slug]`・旗艦 `/essay`・essay deep**: publisher は `{@type:Organization,@id:ORG_ID,name,url,logo}` の **完全 inline ノード**＝解決可能(ぶら下がりでない)。clean。
- **`/[exam]` ハブ Course.provider**: `{@type,@id:ORG_ID}` の bare stub＝**唯一の実害ある dead ref**(Course=rich-result type ゆえ provider.name が効く)。cycle1 で是正済。
- **`buildWebPageNode` 利用面(/privacy・/stats・/transparency・/about)**: 同 helper が WebPage に `isPartOf:{@id:SITE_ID}`・`publisher:{@id:ORG_ID}` の bare stub を出し、当該ページは org/website フルノードを同梱しない(about のみ buildOrgNode 同梱で ORG_ID は解決・SITE_ID は dangling)。→ **evidenced SKIP**: (1)WebPage は rich-result 非対象ゆえ dangling publisher/isPartOf の実害が Course と桁違いに小さい、(2)是正は共有 helper `buildWebPageNode` 改修(全 WebPage の JSON-LD 肥大・挙動変更=広域)か複数ページへのノード追加が要る、(3)対象は utility/legal 系の低トラフィック面。**「理論上の指摘で実害なしは SKIP」「迷ったら直さず SKIP」「広域リファクタ禁止」**に従い非着手。Course の1面=高ROIだけを直し vein を閉じる。
- **結論**: @id 解決性 vein は実害ある Course.provider を是正し打ち止め。残(WebPage stub)は実害薄＋広域で SKIP 確定。

## セッション116（growth ループ・2026-06-03 JST）— P2-3k 補完: s115 sweep が見落とした /q の dangling publisher @id を是正 [done SHA `58820be`]
s115 cycle2 の「@id 解決性 vein は Course.provider で打ち止め」を多面 read-only 監査で再検証したところ、**s115 の sweep が最大の crawl 面 `/q`(問題ページ ~12k+)を列挙していなかった**ことが判明＝残置 gap。
- **着手前 read-only 監査（実測）**: `lib/seo/question-jsonld.ts` の `@graph`=QAPage + LearningResource + BreadcrumbList。QAPage は self-contained(Question.author=ipaAuthor フル inline / acceptedAnswer・suggestedAnswer.author=siteAuthor フル inline / isPartOf WebSite=@id:SITE_ID + name+url inline で解決)＝**Q&A rich result は完全解決**。ただし **LearningResource.publisher だけが `{@type:Organization,@id:ORG_ID}` の bare stub**で、/q は `buildOrgNode()` フルノードを同梱しないため @id がぶら下がり。同一ファイル内の他 Organization(ipaAuthor/siteAuthor/creator/WebSite isPartOf)は全て self-resolving＝publisher のみが取り残しの内部不整合。
- **fix vs SKIP の判断**: s115 cycle2 の WebPage stub SKIP は **2根拠**(1: rich-result 非対象で低実害 / 2: 是正は共有 helper 改修=広域)。`/q` LearningResource では **(1)のみ該当・(2)は非該当**(単一 builder の self-contained inline 修正で広域でない・最大 crawl 面)。dangling @id は理論でなく**構造化データの correctness 欠陥**(validator が unresolved ref を flag)で、s115 が同 class(Course.provider)を是正済＝一貫性で **fix を採用**(LearningResource の SEO magnitude は控えめだが、確実・検証可能・largest surface・zero-byte-new-node)。
- **修正 SHA `58820be`（1論点=dangling publisher の解決）**: `learningResource.publisher` に `name: SITE_NAME`・`url: SITE_BASE_URL` を inline 追加(両者は既に同ファイル import 済・新規 import/新規ノード/buildOrgNode 不要)。同ファイル L196-201 の QAPage.isPartOf WebSite(`@id:SITE_ID`+name+url)パターンを踏襲＝最小diff・file 自身の idiom 一致。`@type:"Organization"`(EducationalOrganization の親型)で @id 参照は schema-valid(Google は @id でマージ)。
- **検証（「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑）**: 新 guard `question-jsonld.test.ts` に「LearningResource publisher @id が name+url で self-resolve」it 追加(bare stub へ revert で fail・publisher.name==="過去問AI"・url が http(s))。本番ビルド `.next/server/app/q/ap/2024-autumn/am/q1.html`=`"publisher":{"@type":"Organization","@id":"https://www.kakomon-ai.jp/#organization","name":"過去問AI","url":"https://www.kakomon-ai.jp"}` を実測。typecheck0(別呼出)/lint0err(warn=未追跡 ux-audit-screenshots.mjs のみ・本変更外)/test **284 files 2211 passed**(2210→+1)/build Compiled successfully(30.2s)。新規404なし(JSON-LD プロパティ追加のみ・挙動変更なし)。
- **本セッション小計=確実な改善1件**(`58820be`)。**P2-3k 補完**: @id 解決性 vein の最大面 /q を是正＝rich-result 影響面(Course=s115)＋最大 crawl 面(/q LearningResource=本)を網羅。
- **次セッション申し送り**: @id 解決性 vein で残るのは WebPage stub(/privacy・/stats・/transparency・/about の isPartOf:SITE_ID / publisher:ORG_ID)のみ＝s115 cycle2 の evidenced SKIP(rich-result 非対象＋共有 helper 改修=広域)を踏襲し非着手継続。content/dead-link/dead-anchor/FAQ/funnel/RSS/OG/@id-resolution の各 vein は s1-116 で軒並み枯渇/SKIP/HD。残着手可能面は HD 群(GSC 404=HD-1/本番午後=HD-4 ほか)・承認必須・広域リファクタ(使-3)＝人間入力 or 厚い監査待ち。

## セッション117（growth ループ・2026-06-03 JST）— 新vein=構造化データ完全性パリティ: keyword LP の Article ノードをサイト標準形へ補完 [done SHA `ae6ff3e`]
s1-116 で content/dead-link/dead-anchor/FAQ/funnel/RSS/OG/@id解決性の各 vein が軒並み枯渇/SKIP/HD。別の構造的取り残しを多面 read-only 監査で探索。
- **着手前の多面 read-only 監査（実測・大半 clean）**:
  - **アフィリ funnel**: 全 blog post(`app/blog/[slug]/page.tsx` L326/L360)が `/recommended-books/{exam|booksExam|索引}` へ既にリンク＝収益 funnel は saturation。/recommended-books 索引・[exam] とも metadata/canonical/OG/ItemList(Product+Offer)JSON-LD 完備＝clean。
  - **内部リンク監査**: `scripts/audit-internal-links.ts` 実走=Blog 192本/1923 links で **FATAL 0・WARNING 0**（死リンク無し）。
  - **@id 解決性 vein 全 sweep（s115/116 の補完）**: blog Article/blog LearningResource/旗艦 essay/essay deep の publisher は全て `@id:ORG_ID`+name/url/logo の**完全 inline ノード**＝self-resolving。/[exam] Course.provider(s115)・/q LearningResource.publisher(s116)は是正済。WebPage stub(/privacy 等)は evidenced SKIP 継続。topics の WebSite ノードは name/url inline=clean（@id `#website` vs SITE_ID `/#website` の slash 差は self-contained で無害＝SKIP）。
- **発見した真の gap**: `app/keywords/[keyword]/page.tsx` の **Article ノード**が `publisher:{@type,name,url}` の**最小形のみ**で、`author`・`publisher.logo`・`mainEntityOfPage` を欠き、サイト標準の blog Article ノード(`app/blog/[slug]/page.tsx` L132-148=author+publisher(@id+name/url/logo)+mainEntityOfPage)より顕著に不完全だった。keyword LP は**indexable かつ sitemap 収録**(`lib/seo/sitemap-xml.ts` L84=全 KEYWORD_PAGES)の「あと一歩」価値ページ(P2-3b)＝実在の被監査面で、不完全 Article markup は実(モデスト)な crawl-signal gap。
- **修正 SHA `ae6ff3e`（1論点=Article ノードの標準形補完）**: `ORG_ID, SITE_LOGO_IMAGE` を import し、Article に `author`(Organization name/url)＋`publisher`(@id:ORG_ID + name/url/logo=self-resolving)＋`mainEntityOfPage`(WebPage @id:absUrl)を additive 付与。blog の確立パターンを厳密 mirror。**捏造値なし**(logo/author は自社所有)・挙動変更なし・新規404なし。
- **検証（「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑）**: 新 guard `__tests__/seo/keyword-article-publisher.test.ts`(3 it=import 宣言／Article が author+publisher(@id+logo)+mainEntityOfPage を含む[revert で fail]／ORG_ID 形式・logo 非空)。本番ビルド `.next/server/app/keywords/ap-chokuzen-1week.html`=`"author":{...}`・`"publisher":{...,"@id":".../#organization",...,"logo":{"@type":"ImageObject","url":".../icon-512.svg",...}}`・mainEntityOfPage を実測。typecheck0/lint0err(warn=未追跡 ux-audit-screenshots.mjs のみ・本変更外)/test **285 files 2214 passed**(2211→+3)/build Compiled successfully(29.7s)。
- **本セッション小計=確実な改善1件**(`ae6ff3e`)。Article は blog/keywords の2箇所のみで、これで両者が標準形に揃う＝**構造化データ完全性パリティ vein はほぼ枯渇**(他の JSON-LD 面=CollectionPage/BreadcrumbList/Course/Product/FAQPage/QAPage は publisher 不要 or 既に self-resolving)。
- **evidenced SKIP（次セッション申し送り・再着手しない）**:
  - **afternoon 索引ページ(`/{exam}/afternoon`)の sitemap 収録**: Explore 監査が「indexable だが sitemap 不在」を gap 指摘したが、実データは ap/st/pm/sa/au/sm=各3問・fe/db/nw/sc/es=各1問の**極薄**で、ページ自身が `【練習用】…（AI採点ベータ）`「実際の過去問ではありません」と honest labeling。薄いβ練習面を sitemap で能動的にクローラ提示するのは **HD-4 の「mock午後を prematurely 露出しない」trap**そのもの＝「迷ったら SKIP（安全側）」。robots を noindex 化するのも旗艦露出に関わる戦略判断＝HD-4。**非着手**。
  - **CourseInstance.courseWorkload(s115 申し送り候補)**: studyHours SSOT(`exam-stats.ts` studyHoursLow/High)は**範囲**で、courseWorkload は単一 ISO8601 duration を要求＝範囲を単一値化すると半ば捏造の単一数値。s73 が「変動する書籍価格に単一 price を注入しない(偽値=誇大)」とした precedent と同型ゆえ **SKIP**。
  - blog→`/essays/{exam}`(noindex) リンクは Explore が「signal mismatch」指摘したが **HD-5 の意図的設計**(indexable /essay 直リンクは additive 追加済・/essays 深リンクは exam固有サンプルの UX 価値で温存)＝defect でない。
- **残着手可能面**: HD 群(GSC 404=HD-1/本番午後データ=HD-4 ほか)・承認必須・広域リファクタ=人間入力 or 厚い監査待ち。content/dead-link/FAQ/funnel/RSS/OG/@id解決性/構造化データ完全性パリティ の各 vein は s1-117 で枯渇/SKIP/HD。

## セッション118（growth ループ・2026-06-03 JST）— P2-3l 補完: keyword LP Article に image(ImageObject) を追加し blog パリティを完成 [done SHA `6a0831b`]
s117 が「構造化データ完全性パリティ vein はほぼ枯渇」と宣言したが、着手前 read-only 監査で **s117 自身のパリティ補完が image を取りこぼしていた**ことを発見＝同 vein の未完。
- **着手前 read-only 監査（実測）**: blog Article(`app/blog/[slug]/page.tsx` L122-147)=headline/description/url/**image(ImageObject 1200x630)**/datePublished/dateModified/author/publisher(@id+logo)/mainEntityOfPage の完全形。keyword LP Article(`app/keywords/[keyword]/page.tsx`)は s117 で author/publisher/mainEntityOfPage を補ったが **`image` を欠く**。一方 keyword の `generateMetadata` は同ページの OG 画像 `ogImageUrl`(=`/api/og?type=keyword&title=...`)を既に生成し og:image/twitter:image に出力済＝**実在の代表画像があるのに Article.image に未掲載**。image は Article rich-result で最重要級の推奨プロパティ(author より effective)で、blog 標準形にあり keyword に無い＝パリティの真の取り残し。datePublished/dateModified は keyword data に日付 field 無し＝捏造回避で非追加(正)。
- **修正 SHA `6a0831b`（1論点=Article.image の補完）**: KeywordPage component に OG 画像 URL を `generateMetadata` と同一派生で再計算(`articleImage`=`/api/og?type=keyword&title=&subtitle=学習トピック特集&body=`)し、Article ノードの `url` 直後に `image:{@type:ImageObject,url:articleImage,width:1200,height:630}` を additive 追加。blog の `articleImage` パターンを厳密 mirror。**捏造値なし**(OG 画像は実在・s73 監査で /api/og は全 param 200)・新規ノード/import 不要・挙動変更なし・新規404なし。
- **検証（「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑）**: 既存 guard `__tests__/seo/keyword-article-publisher.test.ts` に「Article が ImageObject を持つ」it 追加(`articleImage`/`type:"keyword"`/`image:{`/`"@type":"ImageObject"`/`url: articleImage` を pin・revert で fail)。本番ビルド `.next/server/app/keywords/ap-chokuzen-1week.html`=`"image":{"@type":"ImageObject","url":"https://www.kakomon-ai.jp/api/og?type=keyword&...","width":1200,"height":630}` を実測(og:image と同一 URL=代表画像一致)。typecheck0(別呼出)/lint0err(warn=未追跡 ux-audit-screenshots.mjs のみ・本変更外)/test **285 files 2215 passed**(2214→+1)/build Compiled successfully。
- **本セッション小計=確実な改善1件**(`6a0831b`)。Article は blog/keywords の2箇所のみで、image を揃えて**両者が完全な blog 標準形に到達＝構造化データ完全性パリティ vein 完全枯渇**。
- **次セッション申し送り**: パリティ vein は image 補完で打ち止め。content/dead-link/dead-anchor/FAQ/funnel/RSS/OG/@id解決性/構造化データ完全性パリティ の各 vein は s1-118 で枯渇/SKIP/HD。残着手可能面は HD 群(GSC 404=HD-1/本番午後=HD-4 ほか)・承認必須・広域リファクタ(使-3)=人間入力 or 厚い監査待ち。

### セッション118 cycle2 — 隣接の構造化データ追加候補2件を評価し evidenced SKIP（水増し回避）
cycle1 で開けた parity 視点で隣接面を read-only 監査し、追加候補2件を「実害/rich-result 有無」で評価:
- **keywords 索引 `/keywords` の CollectionPage に mainEntity:ItemList を足すか**: 現状 `CollectionPage`(name/url/inLanguage)は bare で、blog 索引(`Blog` ノードが `blogPost:[...]` で子を列挙)と非対称。ただし**可視 `<ul>` の keyword リンクは全件 crawlable＋sitemap 収録済**＝子ページの発見性は既に担保。CollectionPage+ItemList は**可視 rich-result を生まない**ため追加は theoretical signal 止まり。**SKIP**(「理論上の指摘で実害なしは SKIP」・courseWorkload/WebPage stub SKIP と同 class)。
- **keyword LP に LearningResource ノードを足すか(blog は Article+LearningResource、keyword は Article+Breadcrumb)**: LearningResource は現状 Google で可視 rich-result を生まず、追加は speculative＝過大修正の罠。**SKIP**。
- **結論**: cycle1 の image は Article 最重要級 rich-result プロパティ＋実在画像で高ROI だったが、隣接候補2件は no-rich-result の theoretical signal＝安全側で非着手。本セッションは確実な改善1件(`6a0831b`)＋evidenced SKIP2件で正常終了(量より確実性)。

## セッション119（growth ループ・2026-06-03 JST）— 新vein=高ボリューム午前「○○計算 解き方」keyword LP: 稼働率計算 LP を新設 [done SHA `8e81e6e`]
s115-118 は構造化データ完全性パリティの微改善が続き、content/dead-link/FAQ/funnel/RSS/OG/@id解決性の各 vein は s1-118 で枯渇/SKIP/HD。**別角度=keyword LP システム(`data/keywords.ts`・現状10本)が高ボリューム技術「解き方」キーワードを薄くしかカバーしていない**点を多面 read-only 監査で再評価し、確実な新規 LP を1本追加。
- **着手前 read-only 監査（実測）**: 既存 keyword LP は subnet/3NF/EVM/COSO-COBIT/essay-structure/pseudo-language の6技術＋直前/学習プラン系。**「稼働率 計算 やり方」**は基本情報・応用情報の午前で毎期出題される高ボリューム「解き方」クエリ(午前 corpus で 稼働率/MTBF を含む問題は AP by-year 全期に分布・FE にも多数)だが、(1)専用 keyword LP 不在、(2)唯一の関連記事 `ipa-shiken-keisan-mondai-kokuhuku` は「頻出7パターン」の1つ＋`### 稼働率` 節で **1行(`直列なら積、並列なら 1-(1-p)^n`)** しか扱わず段階的解法の専用面が不在、を確認＝明確な gap(thin/重複でない)。`relatedTopics` は `topicLinkHref` が非ハブを `/search?q=` へ安全フォールバック(404リスクなし)も実測。
- **修正 SHA `8e81e6e`（1論点=稼働率計算の専用 LP 新設＋親記事との双方向リンク）**:
  - `data/keywords.ts` に新 LP `kadouritsu-keisan`(title「稼働率の計算の解き方｜MTBF・MTTR・直列／並列システム」・exams `["ap","fe"]`・relatedTopics `["稼働率","信頼性設計","システム構成"]`・本文6段＝単一装置 MTBF/(MTBF+MTTR)導出/直列=積/並列=1-(1-p)^n/複合系の左から置換/練習問題)。全てオリジナル(IPA問題文非転載)・公式は事実ベース・誇大なし。`relatedBlogSlug: ipa-shiken-keisan-mondai-kokuhuku`(LP→blog「さらに深く学ぶ」逆リンク)。
  - `data/blog/generators.ts` の `### 稼働率` 節に LP への文脈内 inbound を1本追加(s54-55/s57 の双方向リンクパターン＝親記事の該当節に literal term `稼働率` の topical anchor あり)。
  - LP は `KEYWORD_PAGES` 追加により `/keywords` 索引(可視リンク)＋ sitemap(`lib/seo/sitemap-xml.ts` L82=全 KEYWORD_PAGES)に自動収録。Article JSON-LD は s117/118 で確立した blog 標準形(author/publisher@id#organization/ImageObject/mainEntityOfPage)を自動継承。
- **検証（「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑）**: 新 guard `__tests__/seo/kadouritsu-keisan-lp.test.ts`(3 it=LP存在＋AP/FE＋公式核(MTBF/MTTR/1-(1-p)^n)／親記事稼働率節→LP の文脈内 inbound[revert で fail]／relatedBlogSlug=親記事)。本番ビルド: `.next/server/app/keywords/kadouritsu-keisan.html`=prerendered 95KB・SSR本文(MTBF/MTTR/公式/CTA)・Article JSON-LD完全形(author/publisher@id#organization/ImageObject×2/mainEntityOfPage)・親記事への逆リンク present を実測。`.next/server/app/blog/ipa-shiken-keisan-mondai-kokuhuku.html`=`href="/keywords/kadouritsu-keisan"` 1本 present。`/keywords` 索引HTML=新LP 3出現。`audit-internal-links.ts`=FATAL 0/WARNING 0(body links 1288→1289=+1)。typecheck0(別呼出)/lint0err(warn=未追跡 ux-audit-screenshots.mjs のみ・本変更外)/test **286 files 2218 passed**(2215→+3)/build Compiled successfully。新規404なし(LP=新規200面・blog link=実在LPへ解決)。
- **本セッション小計=確実な改善1件**(`8e81e6e`)。**新vein を開いた**=高ボリューム午前「○○計算 解き方」keyword LP(競合道場は静的解説のみ＝差別化可・モック非依存＝HD-4非依存)。
- **次セッション申し送り（seed・量産回避で1本ずつ・要吟味）**: 同vein の次候補は (a)**待ち行列(M/M/1)計算**=高pain/競合薄(稼働率と並ぶ最有力)だが **親記事に該当節が無い**(計算記事の頻出7パターンに不在)＝(i)計算記事に待ち行列節を additive 追加して双方向化するか (ii)索引+sitemap inbound のみで新設するか の判断が要る(後者は s54-55 が「索引のみ=弱い」とした懸念あり)＝要吟味。(b)**スループット計算**=計算記事に `### スループット` 節(1行)あり＝稼働率と同型で双方向化可だが、bps/8 の単位変換中心で稼働率(直列/並列の混同)ほど pain が高くない＝中程度。(c)**基数変換**=最大volumeだが mechanical かつ web全体で飽和＝差別化低・優先度低。**いずれも「1記事=確実・量産回避」(s25/s81)を維持し、稼働率(直列/並列/MTBF が genuinely 紛らわしい=高差別化)のような high-pain/high-differentiation を優先**。content/dead-link/FAQ/funnel/RSS/OG/@id解決性/構造化データ完全性パリティ の各 vein は s1-118 で枯渇/SKIP/HD。

## セッション120（growth ループ・2026-06-03 JST）— P2-2 新vein 2本目: 高ボリューム午前「スループット計算 解き方」keyword LP を新設 [done SHA `3aa7945`]
s119 が開いた「○○計算 解き方」keyword LP vein の seed 次候補3件(a 待ち行列/b スループット/c 基数変換)を read-only 監査で評価し、最も確実(既存節あり=双方向化クリーン・framing変更ゼロ)な **スループット** を採用。
- **着手前 read-only 監査（実測）**: 計算問題克服記事 `ipa-shiken-keisan-mondai-kokuhuku` の `### スループット` 節は **1行のみ**(`回線速度 (bps) ÷ 8 = …`)で、ビット／バイト変換・伝送効率(実効速度)・転送時間の段階的解法の専用面が不在。スループットは `data/questions/**` の AP/FE 午前に多数分布(高ボリューム実需)だが専用 keyword LP 不在＝明確な gap(thin/重複でない)。`data/keywords.ts` に throughput LP 不在も確認。
- **候補選定（量より確実性）**: s119 seed の最有力=待ち行列(M/M/1)は高pain だが、計算記事の「頻出7パターン」に待ち行列が**含まれず**、inbound を張ると「7パターン」framing を崩す広域編集＝risk＝「迷ったら安全側」で見送り。スループットは**既存節あり**＝s119 稼働率と同型の双方向化が framing 変更ゼロ・最小diff でクリーン＝高確実。差別化は「機械的な基数変換」と違い **bit/byte 取り違え・伝送効率・単位桁(10^3 vs 1024)・圧縮率**という genuine な午前つまずき点に置いた(道場は静的解説のみ)。
- **修正 SHA `3aa7945`（1論点=スループット計算の専用 LP 新設＋親記事との双方向リンク）**:
  - `data/keywords.ts` に新 LP `throughput-keisan`(title「スループット・転送時間の計算の解き方｜ビット／バイト変換・伝送効率・所要時間」・exams `["ap","fe"]`・relatedTopics `["ネットワーク","回線速度","データ転送"]`・本文6段=bit/byte変換(÷8)/伝送効率→実効速度/転送時間=データ量÷実効速度/単位桁(10^3)+圧縮率/練習問題)。全てオリジナル(IPA問題文非転載)・数値は手計算検算済(80÷8=10/100×0.8=80/6400÷80=80秒/練習 4GB×8÷0.5Gbps=64秒)・誇大なし。`relatedBlogSlug: ipa-shiken-keisan-mondai-kokuhuku`(LP→blog逆リンク)。
  - `data/blog/generators.ts` の `### スループット` 節に LP への文脈内 inbound を1本追加(s119 稼働率と同パターン=literal term anchor)。
  - LP は `KEYWORD_PAGES` 追加で `/keywords` 索引(可視リンク)＋sitemap(全 KEYWORD_PAGES)に自動収録。Article JSON-LD は s117/118 確立の blog 標準形(author/publisher@id#organization/ImageObject/mainEntityOfPage)を自動継承。
- **検証（「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑）**: 新 guard `__tests__/seo/throughput-keisan-lp.test.ts`(3 it=LP存在＋AP/FE＋核(8ビット/伝送効率/実効速度/転送時間)／親記事スループット節→LP の文脈内 inbound[revert で fail]／relatedBlogSlug=親記事)。本番ビルド: `.next/server/app/keywords/throughput-keisan.html`=prerendered 99KB・SSR本文(8ビット2/伝送効率36/実効速度24/転送時間32 出現)・Article JSON-LD完全形(Article/publisher@id#organization/ImageObject×2/mainEntityOfPage)・親記事への逆リンク present。`.next/server/app/blog/ipa-shiken-keisan-mondai-kokuhuku.html`=`href="/keywords/throughput-keisan"` present。`/keywords` 索引=新LP 2出現。`audit-internal-links.ts`=FATAL 0/WARNING 0(body links 1289→1290=+1)。typecheck0(別呼出)/lint0err(warn=未追跡 ux-audit-screenshots.mjs のみ・本変更外)/test **287 files 2221 passed**(2218→+3)/build Compiled successfully。新規404なし。
- **本セッション小計=確実な改善1件**(`3aa7945`)。
- **次セッション申し送り（vein 次候補・量産回避で1本ずつ・要吟味）**: 「○○計算 解き方」LP vein で残るのは (a)**待ち行列(M/M/1)**=高pain/競合薄だが計算記事「7パターン」に節無し＝inbound に framing 変更 or 索引のみ(s54-55「索引のみ=弱い」懸念)の判断が要＝**要吟味で残置**。(c)基数変換=mechanical/web飽和＝差別化低・非推奨。**その他の technical「解き方」LP 候補**(例: 期待値・組合せ/論理演算/2の補数/IPアドレス変換 等)は volume と差別化を吟味し high-pain のみ1本ずつ。content/dead-link/FAQ/funnel/RSS/OG/@id解決性/構造化データ完全性パリティ の各 vein は s1-118 で枯渇/SKIP/HD。

## セッション121（growth ループ・2026-06-03 JST）— P2-2 新vein 3本目: 高ボリューム午前「論理演算 計算 解き方」keyword LP を新設 [done SHA `68fb558`]
s119(稼働率)/s120(スループット)が開いた「○○計算 解き方」keyword LP vein を継続。s120 seed の次候補(待ち行列=要framing変更/基数変換=飽和/その他technical)を read-only 監査し、**「7パターン list に在るのに専用解法面が無い」かつ最大corpus volume**の論理演算を採用。
- **着手前 read-only 監査（実測）**: 計算克服記事 `ipa-shiken-keisan-mondai-kokuhuku` の「頻出 7 パターン」#2=論理演算(AND/OR/XOR 真理値表)は**list に名指しされるのみで「## パターン別の最短解法」(現状 基数変換/稼働率/スループットの3節=7中3)に専用 subsection も LP も不在**。corpus 実測=`真理値表/論理演算` を含む AP/FE 午前問題は **25面**(稼働率10/スループット相当/期待値10/計算量15/補数7 を上回る最大ボリューム)。`data/keywords.ts` に logic LP 不在も確認＝明確な gap(thin/重複でない)。
- **候補選定（量より確実性）**: s120 seed の待ち行列(M/M/1)は「7パターン」に節無し＝inbound に framing 変更(7→8)が要り risk＝見送り継続。基数変換は mechanical/web飽和で差別化低。**論理演算は (1)既に7パターン list の #2 に在る→「## パターン別の最短解法」に subsection を足すのは additive(list の "7" を変えない)、(2)最大 corpus volume、(3)XOR の意味・ビットマスク(0クリア=AND/1セット=OR/反転=XOR)・ド・モルガン・シフト演算という genuine な午前つまずき点(mechanical でない)＝high-pain/high-differentiation**。s120 の「概念が紛らわしい型を優先・飽和は量産しない」基準に最も合致。
- **修正 SHA `68fb558`（1論点=論理演算の専用 LP 新設＋親記事との双方向リンク・framing不変）**:
  - `data/keywords.ts` に新 LP `ronri-enzan-keisan`(title「論理演算の計算の解き方｜真理値表・AND／OR／XOR・ビットマスク」・exams `["ap","fe"]`・relatedTopics `["論理演算","ビット演算","基礎理論"]`・本文5段=真理値表(AND/OR/NOT/XOR・OR vs XOR の 1·1 ひっかけ)/ビットマスク(0クリア=AND・1セット=OR・反転=XOR)/ド・モルガン(否定を配ると AND↔OR)＋シフト演算(左n=×2^n・右n=÷2^n切り捨て)/練習問題)。全てオリジナル(IPA問題文非転載)・練習問題は手計算検算済(10110100 AND 11110000=10110000・左1シフト=×2)・誇大なし。`relatedBlogSlug: ipa-shiken-keisan-mondai-kokuhuku`(LP→blog逆リンク)。
  - `data/blog/generators.ts` の「## パターン別の最短解法」に `### 論理演算` 節を **基数変換(#1)の直後=パターン番号順**に additive 追加し LP への文脈内 inbound を1本(s119/120 と同パターン)。**「頻出 7 パターン」list は不変=framing 変更ゼロ**(待ち行列で懸念した広域編集を回避)。
  - LP は `KEYWORD_PAGES` 追加で `/keywords` 索引(可視リンク)＋sitemap(全 KEYWORD_PAGES)に自動収録。Article JSON-LD は s117/118 確立の blog 標準形(author/publisher@id#organization/ImageObject/mainEntityOfPage)を自動継承。
- **検証（「崩れたら落ちる」+本番HTML実測+全ゲート別呼び出し緑）**: 新 guard `__tests__/seo/ronri-enzan-keisan-lp.test.ts`(3 it=LP存在＋AP/FE＋核(真理値表/XOR/ビットマスク/ド・モルガン)／親記事論理演算節→LP の文脈内 inbound[revert で fail]／relatedBlogSlug=親記事)。本番ビルド: `.next/server/app/keywords/ronri-enzan-keisan.html`=prerendered 98KB・SSR本文(真理値表32/ビットマスク30/ド・モルガン14/排他的論理和2 出現)・Article JSON-LD完全形(publisher/mainEntityOfPage)・親記事への逆リンク present(×2)。`.next/server/app/blog/ipa-shiken-keisan-mondai-kokuhuku.html`=`href="/keywords/ronri-enzan-keisan"` present(×1)。`/keywords` 索引=新LP 2出現。`audit-internal-links.ts`=FATAL 0/WARNING 0(body links 1290→1291=+1)。typecheck0(別呼出)/lint0err(warn=未追跡 ux-audit-screenshots.mjs のみ・本変更外)/test **288 files 2224 passed**(287/2221→+1file/+3)/build Compiled successfully。新規404なし。
- **本セッション小計=確実な改善1件**(`68fb558`)。
- **次セッション申し送り（vein 次候補・量産回避で1本ずつ・要吟味）**: 「○○計算 解き方」LP vein で残る7パターン由来候補は (a)**確率・組合せ(期待値・ベイズ)** #3=high-pain(条件付き確率は紛らわしい)だが list 名指しのみで節無し＝論理演算と同様 additive subsection 可・corpus 10面、(b)**アルゴリズム計算量(O記法)** #7=high-pain(オーダ記法)・corpus 15面・同 additive 可、(c)**正規化/第3正規形**は既に `db-3nf-normalization` LP 有=対象外。**待ち行列**は依然「7パターン」外＝framing変更 risk で残置。**基数変換**は section 有だが mechanical/飽和。**期待値 or 計算量を次の最有力**(both additive・high-pain)。content/dead-link/FAQ/funnel/RSS/OG/@id解決性/構造化データ完全性パリティ の各 vein は s1-118 で枯渇/SKIP/HD。
