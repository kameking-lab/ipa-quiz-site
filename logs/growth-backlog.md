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
- P1-5: 既存の午後/論述ブログの芽を強化。AI採点導線を追記。
  - **[done セッション3]** 論述ブログ群を旗艦=午後AI採点へ漏れなく funnel 化:
    - cycle1 SHA `f863c75`: 壊れた単数形 `/essay/<exam>`(404)→`/essays/<exam>`(200) を9箇所修正（pm/st/sa/sm/au）＋ data/blog 走査の回帰ガード追加。
    - cycle2 SHA `062ef04`: pm-goukaku-ronbun に /essays/pm 採点送客を新設。
    - cycle3 SHA `cd742dc`: st-senryaku-shikou→/essays/st、au-shiken-taisaku→/essays/au、横断ハブ koudo-ronjutsu-kakikata-kotsu→/essays を新設。
    - 補足: ブログ本文の全内部リンクを .next 成果物と突合→残存404ゼロを確認。
  - **SKIP**: sc-ronbun-taisaku への /essays/sc 送客は見送り（SC午後の形式 framing の事実性に懸念・安全側）。事実確認は人間。
  - **残り（未着手）**: ap-gogo-sentaku / ap-gogo-bunkei-sentaku / ipa-shiken-gogo-vs-am は AP午後＝モックデータのため旗艦採点CTAは HD-4 待ち（誇大回避）。AIコパイロット導線は既にあり。
  - **[done セッション7]** /q/* 問題ページ(最大クロール面)の論述5区分に gated 旗艦 /essay 導線 `c785e6a`。「論述の自己採点」新規記事 `62bd68e`。書き方hub `koudo-ronjutsu-kakikata-kotsu` のAI採点リンクを noindex /essays→indexable /essay 是正 `1d2af50`。
  - **新規(P1-5 未着手・要慎重)**: 論文5区分の個別essay記事(pm-goukaku-ronbun/st-senryaku-shikou/sa-architecture-tradeoff/sm-itil-storytelling/au-audit-evidence-language)本文の深リンクが `/essays/<exam>` を指すが、**/essays/[exam] も robots index:false（noindex・実測）**。旗艦 equity の観点では indexable `/essay` 寄せが筋だが、exam固有サンプルへの deep link という UX 価値とのトレードオフ。1記事ずつ慎重判断（誇大なし）か、/essays/[exam] の indexable 化は設計判断＝HD候補。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1 — 土台: 基本情報 科目B（アルゴリズム・擬似言語）AI個別指導
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
既存の芽（実測）: blog slug fe-kamoku-b-pseudo-language / fe-kamoku-b-taisaku / fe-algorithm-nigate-kokufuku。FEは afternoon データあり・CBT通年。
- P1-6: 「科目B アルゴリズム わからない/解き方/苦手」悩み系ロングテール向け入口ページ/ブログ（オリジナル生成）。AIコパイロットで「擬似言語を1行ずつ対話で解く」体験への導線を前面化。
  - **[done セッション6 SHA `2e895cd`]**: 「科目B わからない/解き方/何から」直撃の新規オリジナル記事 `fe-kamoku-b-wakaranai` を新設。つまずきを3タイプ(文法/トレース/速度)へ切り分け→既存クラスタ3記事へ振分＋アルゴリズム分野別プール/AIコパイロットへ送客。中核ピラー taisaku の related rail へ inbound 配線(兄弟2記事は上位維持でクラスタ維持テスト緑)。
  - **残り（任意）**: さらに別角度（「科目B 何点取れば」「科目B 時間配分」等）の新規記事は起案可だが、まずは既存4記事クラスタの funnel が機能しているか様子見でよい（saturation回避）。
- P1-7: 科目B/アルゴリズム関連の既存問題・解説ページから、AIコパイロットの「つまずき個別解決」クイックアクションへの導線整備（既存QUICK_ACTIONS流用）。
  - **[一部done セッション5]** 科目Bブログ群の funnel整流: 中核ピラーtaisaku↔兄弟2記事を相互内部リンク化 `1c50eb0`、アルゴリズム記事＆ピラーの演習CTAを汎用/feから**アルゴリズム分野別プール** `/fe/topic/アルゴリズムとプログラミング`(200・クイズ/AIコパイロット導線)へ深リンク `3a1859a`/`35bf8a9`。本文 topic 深リンク解決性の回帰ガード新設。
  - **残り（未着手・要慎重監査）**: 問題詳細ページ(/q/...)やクイズ上で科目B/アルゴリズム問題に対しコパイロット quick-action（擬似言語トレース等）を一目で出す UI 導線。共有UIの変更で範囲広め→read-only監査を厚めに。誇大回避: 午前MC「アルゴリズムとプログラミング」分野は擬似言語そのものではない点に注意。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P2 — 検索「あと一歩」回収 + 競合薄ブログ強化
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- P2-1: 表示は来てるがクリック0／6〜10位の設問テキスト系ページの title/description/スニペット改善（data-nosnippet整理、冒頭要約の質、文字数キャップ）。対象の具体URLはGSC人手抽出が要るため、まずは「設問ページのtitle/descriptionテンプレ自体の質改善」をテンプレ単位で実施（全/qに波及）。実値をHTMLで実測。
- P2-2: 競合薄ブログの強化（既存の芽: /blog/it-shikaku-nendaibetsu-roadmap=6.2位CTR9.5% / it-shikaku-rirekisho-kakikata=455表示15位 / kakomon-ai-roadmap-2026 / syakaijin-asakatsu-benkyou）。内容深掘り（オリジナル）・内部リンク網・関連問題リンク・FAQ/JSON-LD補強で1ページ目を狙う。
- P2-3: 内部リンク網の強化（午後採点・科目B・ロードマップ間のハブ&スポーク）。orphan化している価値ページに導線を足す。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P2 — 収益導線（控えめに）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- P2-4: 午後対策の高単価講座/対策本へのアフィリ導線を、午後採点まわり・午後ブログの**学習導線の自然な位置**に設置（既存 data/recommended-books.ts のAmazon/楽天実装流用。タグは env 既存値。env編集はしない）。押し売りUIにしない。
- P2-5: フリーミアム課金UI（午後AI採点の詳細版/回数無制限を有料境界）は「作るが既定では未有効化/控えめ」。実際の価格・課金有効化は human-decisions へ（勝手に有効化しない）。今は埋もれているので課金の壁で流入を減らさない。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P3 — 初動速度（過大投資の罠回避・慎重に）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- P3-1: 第1弾で「速度は天井近い」と判定済。明確に副作用なく効くものだけ（不要な"use client"削減・画像/フォント読込・不要JS）。体感差の出ない微最適化はSKIP。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 人間判断待ち（実装せず growth-human-decisions.md へ）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- GSCの実際の404 URL一覧エクスポート（ループ取得不可）。フリーミアムの価格・課金有効化タイミング。無料枠の数値変更。アフィリ提携先の追加契約。
