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
