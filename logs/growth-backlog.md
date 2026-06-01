# 集客・収益化フェーズ バックログ（夜間ビルド第2弾・優先度順）

更新ルール: 着手前に worklog で done/SKIP/保留 を確認（二重実装防止）。1所見=1コミット。
P0→P1→P2→P3。実害/効果が薄い・理論のみは SKIP。戦略判断（料金/課金有効化/無料枠）は実装せず growth-human-decisions.md へ。
検証は「実装が正しく入ったか（ページ実在・SSR・リンク先200・JSON-LD/メタ・新規404を作らない）」を実測。順位はGoogle次第なので測らない。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P0 — 土台修復: 404掃除でクロール資産回復（最優先）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
背景（実測済）: 現行 sitemap の問題ページ12,653件は本番で全て200（サンプル30件確認）。よって404=4,363件の主因は
「過去に削除した内部ページ（リダイレクト未設定）」＋「古いURL形式/旧サイトマップ由来」。GSCの実際の404 URL一覧は
認証必須で**ループからは取得不可**＝human-decisions に「GSCのNot found(404)一覧をエクスポートして共有」を積む。
ループが**コード側でできる**こと:
- P0-1 [301は一部done セッション1]: `git log --diff-filter=D -- "app/**/page.tsx"` で削除済みルートを列挙し、`next.config.*` の redirects と突合。
  - **301 済**（セッション1）: testimonials→success-stories / trust→why-kakomon-ai / account/{audio,avatar,billing}→settings（+ 既存 my-progress/quickstart/support/feedback/practice-weakness 等）。回帰ガード `__tests__/navigation/redirects-no-chain.test.ts`（連鎖禁止＋行先固定）。内部リンク my-progress→/account/dashboard#weakness も解消済。
  - **410 Gone グループ [done セッション2 SHA `1ea7157`]**（後継なし・復活すべきでない削除ページ23件）: commerce / pricing / premium(+/essay,/heatmap,/simulator) / enterprise/{pilot,pricing,sso} / contact/enterprise(+/thanks) / security / case-studies / podcast / launch / diagnosis / account/pass-simulator / feedback/public / community/{questions,stories} / legal/{dpa,msa,sla} を採用機構(a)で middleware.ts に `GONE_PATHS` として実装・全パス 410 実測済。matcher 同期＋admin不変＋新規404なしを回帰テストでガード。
    - **残り = dev痕跡**（exec-review/feature-review/final-review*/strategy-discussion*/scoring-test/test/*/tmp/*）は元々非公開でSEO価値低。現状 404 のままで害は薄い→**着手するなら** GONE_PATHS にワイルドカード相当（prefix一致）で足すか、別途 robots/noindex で十分。優先度は P0-2 以下に下げる。
  - 判断保留の弱い301候補: analytics→/stats（内部DAU vs 公開stats でインテント差・SKIP寄り）。diagnosis は後継なし＝410が正直。
  - 検証: 対象パスが 301(正しい行先200) か 410 になったことを localhost本番ビルドへ curl で実測。新規404を作らない。
- P0-2: sitemap が「実在200のURLのみ」を出しているか再確認（既存テスト sitemap-resolvability を活用、必要なら拡張）。placeholder/needsReview 問題がsitemapに混入していないか実測。
- P0-3: 旧URL形式の痕跡調査（git履歴で /q や /quiz のルート構造変更があったか、section命名 am↔am1/am2 の変遷など）。systematicな旧形式が見つかれば redirect を追加。無ければ「ソース側に旧形式なし＝GSC404は外部/履歴由来」と記録し human タスクへ。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1 — 旗艦: 午後記述・論述の「AI採点」を立てる
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
既存素材（実測）: `app/api/essay-grade/route.ts`（0-100採点・axes relevance/logic/concreteness、getProvider経由）、`app/essays`/`app/essay`、
`app/demo/afternoon`・`app/demo/essay-grading`（PM午後II対応）。午後データは11区分（ap au db es fe nw pm sa sc sm st）。
- P1-1: 「午後AI採点」を旗艦として前面化する導線設計（既存機能の範囲。新規重AI乱発しない）:
  ホーム/ヘッダ/該当試験ページから「あなたの午後答案をAIが採点」入口を一目で分かる位置に。既存UI/コンポーネント踏襲。
  - **[done セッション4]** グローバル3面で旗艦 /essay を露出: ヘッダQUIZ_MODES差替 `87c6d80` / ホームSSR旗艦カード `6ece735` / フッタ サービス欄 `f6556d5`。全て実データ論文区分(ST/SA/PM/SM/AU)＋「参考評価」明記で誇大回避。
  - **残り（任意）**: 該当試験ページ（/st /sa /pm /sm /au ハブ）の旗艦CTAは session2 `b5114b0` で /essays/<exam>・/<exam>/afternoon へ修正済。AP/FE は HD-4 待ち（モック）。主要導線は達成、優先度は P1-4/P2-2/P1-6,7 へ。
- P1-2: 午後を持つ全区分で採点入口を整える（ap/au/pm/sa/sm/st/db/es/nw/sc/fe）。データのある区分のみ露出（無い区分に空導線を作らない＝404/空ページ回避）。各区分の essays/essay ページが200・SSR・クローラブルか実測。
  - [done セッション2 SHA `b5114b0`]: st/sa/pm/sm/au ハブCTAの 404 死リンク（`/essay/<exam>`）を `/<exam>/afternoon`＋`/essays/<exam>`(200) へ修正・回帰ガード追加。
  - **AP/FE をハブCTAへ追加は HD-4 待ち（自律実行しない）**: `app/[exam]/page.tsx` の afternoon CTA は ap・fe を除外。`/ap/afternoon`・`/fe/afternoon` は 200 だが **練習データがモック**（`data/questions/afternoon/ap/index.ts`「実データはモック」明記・各年季2問）。モックのまま旗艦CTAを大きく出すと誇大表現＝過大修正の罠。記述分岐(sc/nw/db/es)の「Coming Soon」も同根。→ **本番午後データ投入(scripts/parse-afternoon) or ベータ明示CTAの判断は人間（HD-4）**。ループは prematurely 露出しない。
  - **★モック非依存で先に進めるのはこちら → P1-4 / P1-5**（不安系キーワードの**オリジナル記事**で午後採点へ自然送客。記事自体はモックデータに依存しない）。次セッションは P1-4/P1-5 か、P0-1 残り(dev痕跡の410)、P2-2(競合薄ブログ強化)を優先。
- P1-3: 採点体験の構造化データ/メタ/見出しを「午後AI採点ができる唯一のサイト」と分かる形に（LearningResource/HowTo等の既存JSON-LD流用、誇大表現は避け事実ベース）。実値をHTMLで実測。
- P1-5b [done セッション6]: 論文5区分(st/sa/pm/sm/au)の勉強法記事 overview から旗艦 `/essay` へ条件付き送客 `122c129`＋回帰ガード `4058e60`。最高可視性ロードマップ記事も旗艦/土台へ funnel `b8c1ecf`。区分ゲートは lib/essay/load.ts ESSAY_EXAM_CODES 準拠で誇大回避。論文区分の高オーソリティ記事は漏れなく旗艦へ流れる。
- P1-4: 不安系キーワード向けの入口ページ/ブログ（**オリジナル生成**・クローラブルSSR）:
  「応用情報 午後 自己採点」「応用情報 午後 部分点」「セキスペ(情報処理安全確保支援士) 午後 採点」等。
  既存ブログ生成パターン（data/blog）を踏襲し、IPA問題文の長文転載はせず、自サイトのAI採点導線へ内部リンク。
  - **[done セッション25 SHA `abab608`]**: 「応用情報 午後 時間が足りない/時間配分」専用の新規オリジナル記事 `ap-gogo-jikan-haibun` を新設(既存AP午後記事は全て「選択戦略」で在試験time未扱い＝最大区分APの高volume悩み系longtailが不在だった)。150分5問の配分設計/解く順/撤退/長文読解時短/記述部分点/time練習。AP午後cluster3へ配線・ap-gogo-sentaku から inbound。**誇大回避**: AP午後採点=モック(HD-4)のため funnel先は /ap ハブ＋AIコパイロットのみで旗艦 /essay には送らない。FAQPage化・150分5問60点(既存一致)・新規404ゼロ・sitemap収録・回帰pin。
  - **残り（自己採点/部分点 intent）**: 「応用情報 午後 自己採点/部分点」は AP午後採点=モック(HD-4)のため AI採点への送客は不可。手動self-grading手順＋AIコパイロット(/ap)止まりなら可だが、論述自己採点は `koudo-ronjutsu-jiko-saiten`(session7)が論文5区分で既出＝AP版は重複薄。優先度低。
  - **新角度（セッション25起案）「時間配分」横展開 → [done セッション27で打ち止め]**: 在試験 time-management 専用記事は 科目B(`fe-kamoku-b-jikan-haibun` s25)・AP午後(`ap-gogo-jikan-haibun` s25)・**NW午後(`nw-gogo-jikan-haibun` s27 SHA `bf1460c`)・DB午後(`db-gogo-jikan-haibun` s27 SHA `c7e45de`)** の4記事で sanctioned budget(1〜2記事)到達。各 /nw・/db ハブ＋AIコパイロットへ funnel(旗艦 /essay には送らない＝記述式区分)。NW/DB午後形式(午後I 90分3問中2問/午後II 120分2問中1問・両者記述式)はIPA公式 kubun/{nw,db}.html で裏取り済。**ES午後等のさらなる横展開は volume が低く thin/saturation＝打ち止め**。
  - **新角度（セッション27起案）「合格点/採点の仕組み」混同キーワード**: [done] 基本情報 `fe-goukaku-ten-irt`(SHA `da63cc0`)＝「基本情報 何点で合格/科目B 何点/IRT 採点 仕組み」直撃。CBT化以降の高ボリューム混同クエリで時間配分/解き方とは別intent。**[done セッション28 SHA `d39afe7`]**: 応用情報 `ap-goukaku-ten-border`＝「応用情報 何点で合格/合算?/午前落ち 午後 採点」直撃。午前・午後各100点満点/基準点60点・各区分別判定・多段階選抜方式(午前未達なら午後不採点)・FE(IRT)とは別の素点方式を整理。AP午後モック(HD-4)のため旗艦 /essay 非送客・/ap funnel・FAQPage化・ap-gogo-sentaku から inbound・IPA公式裏取り・回帰pin。**打ち止め**: 高度試験の各基準点(各60点)は AP と同型(素点)で混同の分かりにくさが弱く thin＝横展開せず(session27の「1記事に絞る/様子見」尊重)。誇大回避: IRT等の非公開換算は断定しない・形式数値はSSOT一致。
- P1-5: 既存の午後/論述ブログの芽を強化。AI採点導線を追記。
  - **[done セッション3]** 論述ブログ群を旗艦=午後AI採点へ漏れなく funnel 化:
    - cycle1 SHA `f863c75`: 壊れた単数形 `/essay/<exam>`(404)→`/essays/<exam>`(200) を9箇所修正（pm/st/sa/sm/au）＋ data/blog 走査の回帰ガード追加。
    - cycle2 SHA `062ef04`: pm-goukaku-ronbun に /essays/pm 採点送客を新設。
    - cycle3 SHA `cd742dc`: st-senryaku-shikou→/essays/st、au-shiken-taisaku→/essays/au、横断ハブ koudo-ronjutsu-kakikata-kotsu→/essays を新設。
    - 補足: ブログ本文の全内部リンクを .next 成果物と突合→残存404ゼロを確認。
  - **SKIP→HD-6 セッション17で事実誤り確定**: sc-ronbun-taisaku への /essays/sc 送客は見送り。さらに同記事のSC午後「論文(論述)」framing 自体が **IPA公式で事実誤りと確定**（SC午後=記述式・論文試験は非存在・論文区分はST/SA/PM/SM/AUのみ）。全面リライト or 削除は情報設計＋編集判断＝`growth-human-decisions.md` HD-6 へ。
  - **残り（未着手）**: ap-gogo-sentaku / ap-gogo-bunkei-sentaku / ipa-shiken-gogo-vs-am は AP午後＝モックデータのため旗艦採点CTAは HD-4 待ち（誇大回避）。AIコパイロット導線は既にあり。
  - **[done セッション7]** /q/* 問題ページ(最大クロール面)の論述5区分に gated 旗艦 /essay 導線 `c785e6a`。「論述の自己採点」新規記事 `62bd68e`。書き方hub `koudo-ronjutsu-kakikata-kotsu` のAI採点リンクを noindex /essays→indexable /essay 是正 `1d2af50`。
  - **[SKIP→HD-5 セッション8]** 論文5区分の個別essay記事(pm-goukaku-ronbun/st-senryaku-shikou/sa-architecture-tradeoff/sm-itil-storytelling/au-audit-evidence-language)本文の採点intent深リンクが `/essays/<exam>` を指すが、**/essays/[exam] は robots index:false かつ follow:false（noindex,nofollow・実測）**。equity観点では indexable `/essay` 寄せが筋だが exam固有サンプルのUX価値とのトレードオフ＝設計判断。自律実装せず **HD-5** に集約（旗艦露出は header/home/footer/q-page で確保済）。「業種別合格答案」intent深リンクは /essays/[exam] が正しい行先で変更不要。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1 — 土台: 基本情報 科目B（アルゴリズム・擬似言語）AI個別指導
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
既存の芽（実測）: blog slug fe-kamoku-b-pseudo-language / fe-kamoku-b-taisaku / fe-algorithm-nigate-kokufuku。FEは afternoon データあり・CBT通年。
- P1-6: 「科目B アルゴリズム わからない/解き方/苦手」悩み系ロングテール向け入口ページ/ブログ（オリジナル生成）。AIコパイロットで「擬似言語を1行ずつ対話で解く」体験への導線を前面化。
  - **[done セッション6 SHA `2e895cd`]**: 「科目B わからない/解き方/何から」直撃の新規オリジナル記事 `fe-kamoku-b-wakaranai` を新設。つまずきを3タイプ(文法/トレース/速度)へ切り分け→既存クラスタ3記事へ振分＋アルゴリズム分野別プール/AIコパイロットへ送客。中核ピラー taisaku の related rail へ inbound 配線(兄弟2記事は上位維持でクラスタ維持テスト緑)。
  - **残り（任意）**: さらに別角度（「科目B 何点取れば」「科目B 時間配分」等）の新規記事は起案可だが、まずは既存4記事クラスタの funnel が機能しているか様子見でよい（saturation回避）。
  - **[done セッション25 SHA `946f619`]**: 「科目B 時間が足りない/時間切れ」専用の新規オリジナル記事 `fe-kamoku-b-jikan-haibun` を新設(既存は taisaku理由2・wakaranai タイプC が各1節のみ＝専用ページ不在だった)。100分20問の時間配分設計/撤退判断/読解高速化/本番前time練習。cluster3へ outbound＋wakaranai/ピラーから inbound(ピラー hub→spoke は `36036ea`)。FAQPage化・100分600点(IPA公式一致)・新規404ゼロ・sitemap収録。**所見**: 新規キーワードを狙う新規ページは saturation(既存への過剰内部リンク)とは別＝戦略が endorse。intent完全分離でcannibalizationなし。
- P1-7: 科目B/アルゴリズム関連の既存問題・解説ページから、AIコパイロットの「つまずき個別解決」クイックアクションへの導線整備（既存QUICK_ACTIONS流用）。
  - **[一部done セッション5]** 科目Bブログ群の funnel整流: 中核ピラーtaisaku↔兄弟2記事を相互内部リンク化 `1c50eb0`、アルゴリズム記事＆ピラーの演習CTAを汎用/feから**アルゴリズム分野別プール** `/fe/topic/アルゴリズムとプログラミング`(200・クイズ/AIコパイロット導線)へ深リンク `3a1859a`/`35bf8a9`。本文 topic 深リンク解決性の回帰ガード新設。
  - **残り（未着手・要慎重監査）**: 問題詳細ページ(/q/...)やクイズ上で科目B/アルゴリズム問題に対しコパイロット quick-action（擬似言語トレース等）を一目で出す UI 導線。共有UIの変更で範囲広め→read-only監査を厚めに。誇大回避: 午前MC「アルゴリズムとプログラミング」分野は擬似言語そのものではない点に注意。
  - **[done セッション16]** /q FE科目B設問に土台ピラー gated hint `KamokuBStudyHint` `eb42014`(session で厳密ゲート=実データの科目B擬似言語のみ・午前MC algorithm分野と混同回避)＋FE午後ハブ /fe/afternoon に pillar link `aeb85b1`(FE限定)。旗艦 AfternoonEssayHint(session7)と対称の土台funnelを2面に配線。回帰テストでゲートdrift検知。
  - **新角度（セッション16起案）**: quiz player の実プレイ面に旗艦/土台 hint を出すか検討。→ **[done セッション24]** 最大エンゲージメントの単発タイミング=クイズ完了画面(QuizCompleteScreen)に旗艦/essay導線を追加 `a7feb30`(解説カードは毎問反復=スパムのため不採用・完了画面のみ)。土台(科目B)はMC QuizPlayerを通らない(descriptive)ため対象外。
  - **[done セッション24] 旗艦/土台の露出を面横断で「対称化」**: 旗艦は露出済だが土台=科目Bが手薄な高オーソリティ/高eyeball面を3つ埋めた。(1)クイズ完了画面に旗艦/essay `a7feb30`、(2)ホームに土台=科目Bカード `HomeFoundationKamokuB` `28c59f6`(旗艦HomeFlagshipEssayとの非対称解消)、(3)/fe ハブに土台=科目Bセクション `fd57c79`(高度試験の旗艦午後CTAとの非対称解消)。既存gated/ピラー reuse・ESSAY_EXAM_CODES/科目B=FE擬似言語ゲートで誇大回避・回帰pin・新規404ゼロ。**所見**: 主要面で旗艦・土台が対称露出。残る土台未配線面は header QUIZ_MODES(client nav・SSR非対象)程度＝優先度低。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P2 — 検索「あと一歩」回収 + 競合薄ブログ強化
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- P2-1: 表示は来てるがクリック0／6〜10位の設問テキスト系ページの title/description/スニペット改善（data-nosnippet整理、冒頭要約の質、文字数キャップ）。対象の具体URLはGSC人手抽出が要るため、まずは「設問ページのtitle/descriptionテンプレ自体の質改善」をテンプレ単位で実施（全/qに波及）。実値をHTMLで実測。
  - **[SKIP セッション9]**: `lib/seo/question-meta.ts` は phase10レビュー済（DESCRIPTION_MAX=158 hard cap・CTA温存・answer suppression意図的・専用テスト question-meta.test.ts 有）で実害なし。テンプレ修正は理論のみ＝過大修正の罠。GSCの具体URL抽出（人手）が来たら個別対応。
- P2-2: 競合薄ブログの強化（既存の芽: /blog/it-shikaku-nendaibetsu-roadmap=6.2位CTR9.5% / it-shikaku-rirekisho-kakikata=455表示15位 / kakomon-ai-roadmap-2026 / syakaijin-asakatsu-benkyou）。内容深掘り（オリジナル）・内部リンク網・関連問題リンク・FAQ/JSON-LD補強で1ページ目を狙う。
  - **[done セッション8]** FAQPage JSON-LD machinery を新設（lib/blog/faq.ts extractFaq・`## よくある質問`節を自動FAQPage化）`b3cd08d`。
  - **[done セッション9]** roadmap記事の「1日30回」誇張を SSOT(FREE_AI_DAILY_LIMIT=10) へ是正 `9e06379`。土台=科目B中核ピラー `fe-kamoku-b-taisaku` `2922a80`・旗艦=PM論文 `pm-goukaku-ronbun` `0db0f07` にオリジナル4Q&AのFAQ節を追加しFAQPage化（旗艦はQ4で /essay funnel）。
  - **[done セッション10]** FAQ未設置の戦略記事へ4Q&A展開: 土台=科目B擬似言語 `fe-kamoku-b-pseudo-language` `fbdc913`、旗艦論文 `st-senryaku-shikou` `4225b0c`・`au-shiken-taisaku` `7d73f63`・`sa-architecture-tradeoff`/`sm-itil-storytelling` `652b878`。**論文5区分(PM[s9]/ST/AU/SA/SM)すべてがFAQPage化＋Q4で旗艦 indexable /essay へ funnel完了**。誇大回避: 本文既存の数値のみ引用・「採点基準非公開」「AI採点は参考評価」明記・既存noindex /essays/<exam>採点CTAはHD-5のため不変。
  - **[done セッション11]** FAQPage を戦略/高可視記事へほぼ全面展開: 勉強法overview**全13区分**を `buildOverviewPost` テンプレ1編集で一括FAQPage化＋回帰ガード `6202e19`、高可視ロングテール朝活 `syakaijin-asakatsu-benkyou` `90ab87a`、高可視roadmap `kakomon-ai-roadmap-2026`(present-state限定・未実装午後採点に触れず) `8e4dc3b`。it-shikaku-nendaibetsu-roadmap は既にFAQ保有(対象外)を確認。**戦略的高オーソリティ記事のFAQ化は概ね完了**。
  - **[done セッション21] 事実性監査をブログ→構造化データ面(/faq・/glossary)へ角度展開**: data/blog 限定だった事実性監査の盲点として、`/faq`(FAQPage JSON-LD・data/faq.ts)・`/glossary`(DefinedTermSet・data/glossary.ts)に未監査の hard error が4件残存していた。IPA/OWASP公式で裏取りし是正: SC登録称号→情報処理安全確保支援士(登録セキスペ) `719497f`、OWASP Top10 最新版2021→2025年版 `b7e336f`、午前I免除 前回前々回→2年間(IPA koudo_menjo.html) `084bbf7`、FE科目A 90問→60問(90分取り違え) `92bb17a`。各々回帰pin・最小diff・新規404ゼロ。
  - **[done セッション22] 事実性監査を残りのSEO data面(exam-content.ts/exam-resources.ts/keywords.ts)へ角度展開**: 全 /[exam] ハブ・/keywords/*(indexable・sitemap)に描画されるのに未照合だった面で hard error を4件是正。IPA公式WebFetchで裏取り。(1)/[exam]ハブ leadParagraph の高度試験 実施時期グルーピング誤り NW/SM=春期・ES/AU=秋期 `3725137`、(2)SC登録称号→情報処理安全確保支援士(登録セキスペ) /sc+career `3a0b6ba`、(3)/sc ロードマップの廃止済み午後I/II→統合午後(記述式) `de0c4e8`、(4)/keywords/sc-incident-response の午後II→統合午後 `07c1b5b`。各々回帰pin・最小diff・新規404ゼロ。**所見**: SC午後統合(2023)と登録称号誤りが faq→exam-content/exam-resources/keywords/generators と**複数 data 面に分散**して取り残されていた(SSOT exam-data は正でも派生面が drift)＝同一事実を面横断で掃くのが有効。
  - **残り(事実性・他data面)**: lib/seo/exam-meta.ts(session22で format-accurate を確認＝主要 hard error は枯渇気味)・data/community/*・lib/seo/category-tips.ts の試験形式数値/規格名/称号がIPA公式と一致するか未照合＝次の角度候補(構造化データ/可視本文に出る hard error のみ拾う・ヘッジ済近似はSKIP)。
  - **残り（低優先・saturation配慮）**: pomodoro 等の学習テクニック系ロングテールへのFAQ展開は「やれること」だが戦略価値低＝優先度を下げる。**注意**: sc-ronbun-taisaku は SC午後のframe事実性がHD未決（session3 SKIP）でFAQ化も保留、ap-gogo-sentaku は AP午後モック=HD-4、roadmap系で未実装capabilityをFAQで現状事実化しない（誇大回避）。誇大回避: 数値・形式は本文既存記述と一致させ、AI回数はSSOT `AI_QUOTA_COPY_SHORT` を参照。
- P2-3: 内部リンク網の強化（午後採点・科目B・ロードマップ間のハブ&スポーク）。orphan化している価値ページに導線を足す。
  - **[done セッション12]** `scripts/audit-internal-links.ts` 実走で inbound 0 の orphan 2件(goukakusha-shukan-review/shaiin-bunkatsu-plan-3pattern)を親ハブ ipa-shiken-shakaijin-jikan-kakuho 本文から内部リンク `8ac2a50`(再実行で orphan 0)。監査自身の topic route 誤検知(FATAL5)も是正 `cdc515c`(=今後の dead-link/orphan 検知が信頼可能)。
  - **残り**: 監査は indexable blog の orphan は解消済(0件)。非blog の価値ページ orphan は監査対象外＝必要なら手動監査。
  - **[done セッション13] 本文funnel gap の是正(新角度)**: orphan(inbound0)は無いが「科目B/論述を**専節で厚く論じるのに本文から戦略ページへ未送客**」の高オーソリティ記事を高密度走査で実測抽出し本文リンクで funnel。rirekisho→roadmap `6755ea3` / fe-benkyou-jikan-meyasu→土台ピラー `b7c5c87` / kakomon-dake-goukaku→土台+旗艦 `1c27df1` / kakomon-nankai-tokinaosu→土台ピラー `62659d7`。relatedSlugs(limit3カット可)に頼らず本文リンクで funnel確実化。論文funnelは論文5区分scope一致時のみ・参考評価明記。
  - **[done セッション14]** 残候補2記事を funnel: 参考書ガイド hub `ipa-sanko-mondaishu-2026` の論文節→旗艦/essay `6b92a25`・科目B節→土台ピラー `5853859`、AI活用テンプレ `ipa-shiken-ai-katsuyou-benkyouhou` の論文添削節→旗艦/essay `05bec2b`。論文5区分scope一致・参考評価明記・additive・新規404ゼロ。
  - **[done セッション15]** テンプレ生成群への旗艦/土台 funnel 完了: lastMonth(cyokusen)/practice(yoru)の午後節に論文5区分ゲートの旗艦/essay funnel `d648150`＋FE限定の土台ピラー funnel `471dfd6`。frequentTopics/analysisは論述writing節が無く対象外(saturation回避)。回帰テストを3生成器横断/FE限定でパラメータ化。また出題傾向分析タイトルの固定年(2024〜2025)をCURRENT_YEAR規約へ是正 `b508a8e`(誇大/staleness)。
  - **残り(funnel gap)**: 自然な本文funnel gap は session13-15 で**ほぼ飽和**。論文exam=header/home/footer/q-page＋overview/lastMonth/practice本文＋論文5記事FAQ、FE=lastMonth/practice本文＋科目Bクラスタで送客済。これ以上の本文funnel追加はsaturation＝無理に増やさない。general記事 `ipa-saishin-doukou`(最新動向2026)は2026 snapshotとして一貫=auto-advance対象外(SKIP)。
  - **[done セッション23] keyword landing面(/keywords/[slug])に旗艦/土台funnel配線(新surface)**: blog/hub/footer/q は整備済だが keyword LP(indexable・footer「学習トピック」からcrawlable)は旗艦/土台へ未funnelだった。`KeywordPage` に明示オプトイン `strategicCta?:"essay"|"kamoku-b"` を新設し、`st-essay-structure-pattern`(ST午後II論文)→旗艦 `/essay`(AfternoonEssayHint reuse) `717688d`、`fe-kamoku-b-pseudo-language`(科目B擬似言語)→土台ピラー `/blog/fe-kamoku-b-taisaku`(KamokuBStudyHint reuse) `111569c`。誇大回避は明示オプトイン+ESSAY_EXAM_CODESゲートで構造保証(pm計算/SC記述/AP午後モックには出さない)。回帰テスト5件。残り9 keyword ページは誇大/off-topicでSKIP。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P2 — 収益導線（控えめに）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- P2-4: 午後対策の高単価講座/対策本へのアフィリ導線を、午後採点まわり・午後ブログの**学習導線の自然な位置**に設置（既存 data/recommended-books.ts のAmazon/楽天実装流用。タグは env 既存値。env編集はしない）。押し売りUIにしない。
  - **[done セッション12]** 旗艦論述funnelの essay 面(従来アフィリ皆無)に InlineBookHint(category="午後")を設置: 区分別サンプル一覧 /essays/[exam] `2f75565`、答案詳細 /essays/[exam]/.../[qnum] `bb5a241`、data契約の回帰ガード `4239af8`。全6区分(sc/st/sa/pm/sm/au)で正確な午後本・SC論文 誤framing回避・rel="sponsored"・env無編集。
  - **残り**: 旗艦 indexable ハブ /essay 自体への書籍導線は5区分横断で1冊選定が難しい＝「論述対策の定番書」区分横断リスト化 or 保留(設計判断寄り)。午後/論述ブログ本文への書籍リンクは未着手(blogに書籍コンポーネント無し＝markdownリンク or 新コンポーネント要)。
- P2-5: フリーミアム課金UI（午後AI採点の詳細版/回数無制限を有料境界）は「作るが既定では未有効化/控えめ」。実際の価格・課金有効化は human-decisions へ（勝手に有効化しない）。今は埋もれているので課金の壁で流入を減らさない。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P3 — 初動速度（過大投資の罠回避・慎重に）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- P3-1: 第1弾で「速度は天井近い」と判定済。明確に副作用なく効くものだけ（不要な"use client"削減・画像/フォント読込・不要JS）。体感差の出ない微最適化はSKIP。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 人間判断待ち（実装せず growth-human-decisions.md へ）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- GSCの実際の404 URL一覧エクスポート（ループ取得不可）。フリーミアムの価格・課金有効化タイミング。無料枠の数値変更。アフィリ提携先の追加契約。
