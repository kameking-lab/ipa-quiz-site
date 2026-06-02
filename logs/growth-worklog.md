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
