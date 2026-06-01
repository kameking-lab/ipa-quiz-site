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
