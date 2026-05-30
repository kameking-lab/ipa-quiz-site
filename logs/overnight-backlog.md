> **更新 (2026-05-31 セッション75):** P0 全て done/SKIP。P1 進行中。**前セッション handoff の per-name gap 状態層を機械突合で確認→真に未カバー4件を回帰固定（実改善0・source 無変更, test 1371→1494・195→196files）。** ①`data/blog/generators.ts` 区分別生成器5本(`1786682`)=13区分×slug形/exam整合/本文 `](/${exam})` CTA(404防止)/publishedAt ISO往復・非未来・単調増加/exam前置 relatedSlug の同区分 round-trip(no-404)。②`mock-exam/session::save/load/clearActiveSession`(`119ec34`)=往復保持・savedAt の Date.now 上書き・fail-soft null・6h TTL 境界+キー掃除。③`gamification/achievements::evaluateAi/unlockManual`(`255c54c`)=ai-first 必発/閾値/冪等・未知id no-op。④`motivation/heatmap::syncHeatmapWithHistory`(`3477398`)=件数キャッシュ短絡(stale 返却をセンチネルで区別)・非空ガード。全件 mutation 実測。**★夜間安全 per-name gap はほぼ消化。残＝`storage/history::getPremiumFlag/setPremiumFlag`(LS往復・筆頭)程度。残りは AudioContext/DOM/fetch/SDK/React で日中向き。日中候補(不変): ContactForm 成功カード focus・pii over-mask・tabs矢印キー・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG。**
>
> **更新 (2026-05-31 セッション73):** P0 全て done/SKIP。P1 進行中。**S72 の per-name 突合 doctrine を継続し「部分カバレッジgap」残4件を回帰固定（実改善0・source 無変更, test 1325→1336・193files 据置=既存ファイルへ追記）。** ①`questions/filter::shuffle`(`7a555ca`)=参照同一性+集合保存+Math.random 固定時の決定的置換([a,b,c,d]→[b,c,d,a])。②`copilot/retriever::getCachedIndex`+`resetIndexCache`(`6e51a66`)=初回のみ getDocs 1回/参照同一/reset で再構築。③`study-plan/generator::todayLocalDate`(`2a900aa`)=フェイククロックでローカル暦日 pin。④`dashboard/analytics::daysUntilNextExam`(`976f262`)=nextExamSitting 委譲の toEqual 同一性。全件 mutation 実測。**★教訓: 同名 test file が別 export だけ見るパターンが多く per-name 突合は依然有効。delegation wrapper も委譲先と toEqual で pin 可。process 内シングルトンは「初回1回/参照同一/reset 再構築」で契約化。** **次候補: S72 機械列挙リストはほぼ消化。残=過去 SAFE/latent footgun 再検証(S33/S41)・新規 export 追加時の per-name 再スイープ。日中候補(不変): ContactForm 成功カード focus・pii over-mask・tabs矢印キー・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG。**

> **更新 (2026-05-31 セッション72):** P0 全て done/SKIP。P1 進行中。**「部分カバレッジgap(モジュール import 済だが一部 export のみ被覆)」を per-name 突合で機械列挙→5件処理(lint警告解消1+回帰固定4)。test 1295→1325・190→193files。**
> S72: S71 が示した角度①(部分カバレッジgap)が有効と実証。発掘法=`export (function|const) NAME` × `grep -rl '\bNAME\b' __tests__/` の **per-name 突合**(モジュール単位でなく export 単位)。round-trip ペアは片側のみテスト済が多い。①lint(`562fde3`)=metrics-posthog-source の未使用 describe 削除。②`copilot/related`(`dbdf72e`)=encode/decodeRelatedHeader(base64往復)+findRelatedQuestions(実コーパス・検索不能→[]/limit/降順/除外)。③`seo/question-url::parseQuestionRoute`(`adbf211`)=null分岐+正規表現アンカー+round-trip。④`seo/exam-meta`(`d8f9eab`)=EXAM_DESCRIPTIONS/getAvailableExams/examMetaDescription/countByExam。⑤`seo/topics::topicSlugToTag`(`d6600d3`)=逆変換+ハイフン非可逆性。全件 mutation 実測。**★vacuous検知: getAvailableExams 閾値は全13区分>0(ip 2398問)で vacuous＝実データダンプで確認必須。countByExam は strict<raw 全区分成立で `< raw` 厳密不等号化＝strict フィルタが load-bearing。**
> **次候補(部分カバレッジgap 残): `dashboard/analytics::daysUntilNextExam`・`study-plan/generator::todayLocalDate`(Date依存=注意)・`copilot/retriever::getCachedIndex`(キャッシュ同一性)・`questions/filter::shuffle`(seed/非破壊)。日中候補(不変): ContactForm 成功カード focus・pii over-mask・tabs矢印キー・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG。**

> **更新 (2026-05-31 セッション71):** P0 全て done/SKIP。P1 進行中。**S69/S70 が「日中向き」と誤分類した server-only モジュール群を vitest alias で夜間解禁・回帰固定3件(test 1260→1295)。**
> S71: `server-only` は Next ビルド時トークン(npm 実体なし)＝`test-stubs/server-only.ts`(空module)へ vitest alias 一行で安全 no-op 化でき、プロダクションビルド無影響(2510 SSG 緑)・既存1260テスト無破壊(blast radius ゼロ実証)。S70 の「searchQuestions は export 追加+mock 要=日中」は**両方誤り**(既に export 済・alias で解禁可)。①`searchQuestions`(検索バックエンド, `2faedb9`)＝alias 導入+不変条件特性化(limit/offset クランプ・facet 合計=total・relevance/year_desc ソート・snippet長)。②`pool-server`(クイズ母集団, `289f199`)＝フィルタ/inOrder/findQuestionById、プレースホルダ fallback で「部分集合とは限らない」発見。③`GET /api/search/questions`(`15b3af2`)＝zod 400/200形状/**Cache-Control(random→no-store/他→public,s-maxage=300)**。全件 mutation 実測。
> **★教訓: server-only は vitest alias(恒久追加済)で夜間解禁可＝「日中向き」誤分類だった。ソート不変条件は『非増加』だけだと同値データ(AP全2025年)で vacuous pass→facet の最新/最古値で先頭/末尾を pin せよ。** server-only 実体は2本のみで本セッションで網羅＝alias 解禁の残対象なし。
> **次候補: ①部分カバレッジgap(import済だが一部export未カバー=S51 postSync型) ②SAFE/latent footgun 再検証。日中候補(不変): ContactForm 成功カード focus/告知・pii over-mask(安全側=据置)・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF(意図的=据置)・apple-touch-icon PNG(要バイナリ生成)。**

> **更新 (2026-05-31 セッション69):** P0 全て done/SKIP。P1 進行中。**Explore の「未テスト純関数枯渇」報告を機械突合で崩し、消費済み未テスト infra 2本を回帰固定**。
> S69: ベースライン全緑(typecheck0/lint0err/test 1243・185files/build 緑 2510 SSG)。**Explore の dir-prefix 判定が2件誤り**と実証→`grep -rl "lib/<path>" __tests__/` 個別突合で消費済みなのに top-level path を import するテスト皆無の純関数寄り infra 2本を発掘。両者 fetch+env mock で安全に固定(slack/turnstile S59・cost-guard 同型・source 無変更)。
> ①**`lib/monitoring/sentry.ts::captureException`+`isSentryConfigured`**(`ef5a76e`)=サーバー5xx収集の fail-soft ブリッジ。唯一の import 元 copilot/streaming はモック差替で実装未カバー。DSN は import 時解析→resetModules+stubEnv で都度再 import。観測フロア(console.error 常時)/env-gate(未設定・解析不能→fetch不実行)/有効DSN→`/api/{projectId}/store/` へ X-Sentry-Auth(sentry_key)付き POST・exception value/type と transaction が入力反映/fetch reject・非Error入力(string/null)も throw しない。POST URL mutation で1 fail 実測。test 1243→1248(5 it)。
> ②**`lib/rate-limit.ts`**(IP アンチアビューズゲート+/admin/api-usage 集計)(`d46ca71`)=全 LLM API ルートが使う §9 infra。top-level `@/lib/rate-limit` を import するテスト皆無(`/server`・`storage/essay-rate-limit` は別物で既テスト)。KV import 時読み→同じく resetModules+stubEnv、Upstash pipeline をモック fetch で position 駆動。KV未設定→fail-OPEN({ok:true})・fetch不実行・stats enabled:false 全ゼロ/KV有効→分時日 INCR を IP_LIMITS(10/100/500) にこの優先順で判定・超過時 reset 境界/KV失敗(非ok/throw)も fail-OPEN(可用性優先)/getApiUsageStats=24時間バケット集計+COST_JPY_PER_REQUEST(§12 SSOT 0.055)コスト算出+top-IP sorted set マージ/getApiCallsHourlySeries=時間別合算。minute 上限・cost 定数 mutation で3 fail 実測。test 1248→1260(12 it)。
> SKIP(夜間安全側): `lib/team/mock-data.ts`(217行・データ const のみ・function 無し・リポ全域参照ゼロ)=Phase4 team プラン未配線スキャフォールド。logic 不在でテスト価値薄+計画機能の削除は所有者意図の判断=日中向き(現行置換が無く S26 MockExamClient とは異なる)→削除も固定もせず SKIP。
> **★教訓: Explore の「未テスト純関数枯渇」報告は dir-prefix 一致で取りこぼす(sentry/rate-limit.ts の2件)。最終確認は `find lib -name '*.ts'`×`grep -rl "lib/<path>" __tests__/` の個別突合で行え。機械突合の結果、top-level lib/ の未テストは全て真に枯渇確定**(deployment-status=Date.now brittle 日中/feature-flags=dead/gemini=SDK/auth・db=外部/sound=AudioContext/onboarding・streak index=barrel/pool-server・question-index=server-only 日中/team=上記 SKIP)。**夜間安全な characterization 候補は本セッションで打ち止め。**
> **次候補: 夜間安全枠(未テスト純関数 + a11y 取りこぼし全数 grep)はともに枯渇確定。実改善は日中候補(挙動変更+E2E)に依存。日中候補(不変): ContactForm 成功カード focus/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export。**

> **更新 (2026-05-31 セッション68):** P0 全て done/SKIP。P1 進行中。**フォームコントロール命名の取りこぼし実改善1件 + Switch配線回帰固定 + a11y再点検5レンズclean**。
> S68: ベースライン全緑(typecheck0/lint0err/test 1239・183files/build緑)= S67 と一致。S67 doctrine「取りこぼし全数 grep」を別 a11y クラスへ適用。
> ①**実改善(WCAG 4.1.2 取りこぼし)**: <input>/<select>/<textarea> 全 grep→**EssayEditor 業種選択 select(169)が唯一の裸コントロール**(label/aria-label/aria-labelledby/id 全て無し・同コンポの論述 textarea 群は命名済なのに漏れ)。CardTitle と同文言 `aria-label="業種を選択"` 付与+既存テストに getByLabelText 検証追加(RTL 実 a11y ツリー), `4b89c20`。test 1242→1243。
> ②**回帰固定(test-only)**: /settings の7 Switch はインライン aria-label 無し・SettingRow の cloneElement(aria-labelledby)注入だけで命名=配線が外れると全無名化するがガード無し→source-read で配線契約固定, `d2599bb`。test 1239→1242。
> ③**clean(回帰再点検・コード無変更)5レンズ**: target=_blank rel(全 noopener/noreferrer=実害ゼロ)・img alt(全3箇所 alt 実在)・Label-in-Name(S29: blog CTA 等は記述的スーパーセット=推奨/保存トグルは aria-pressed 状態トグル=borderline SKIP)・Radix Switch 命名(S31: 全10箇所命名済)・フォーム命名スイープ(EssayEditor 以外は label/aria-label/htmlFor/hidden で全命名済)。
> **★教訓: S67 の「取りこぼし全数 grep」doctrine は a11y 属性クラスを跨いで有効。機械突合可能クラス(scope[S67完了]/role=img/htmlFor→id/idref/Switch命名/フォーム命名[S68完了]/target rel/img alt)は概ねスイープ尽くした。残る夜間安全枠は枯渇に近い。実改善は日中候補(挙動変更+E2E)に依存。**
> **次候補: Label-in-Name(S29 状態トグルは据え置き=機械突合困難・低収穫)。日中候補(不変): ContactForm 成功カード focus/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export。**

> **更新 (2026-05-31 セッション67):** P0 全て done/SKIP。P1 進行中。**th-scope(S28)回帰再点検で『取りこぼし』実改善1件**。
> S67: ベースライン全緑(typecheck0/test 1237・183files)。th-scope(S28)を新規再混入だけでなく『過去スイープの取りこぼし』視点で `<th` 全 grep→公開ページ `/stats`・`/demo/essay-grading` の列見出しが scope 欠落のまま残存と判明(S28 は why-kakomon-ai 等のみ付与)。各3列に `scope="col"` 付与+回帰テスト2件(列見出し数 pin・mutation 1fail 実測・SSG HTML に scope×3 出力を grep 実測), `5d960ac`。test 1237→1239。**公開表 scope スイープ完了**(残無 scope=admin/* のみ=auth/prod 503=SKIP)。続けて chart role=img(S10-S15)を全数再点検→公開チャート6図(stats×4/transparency×2)+weakness/ranking 全て role=img+aria-label 保持=新規再混入ゼロ・clean。
> **★教訓: 過去 a11y クラスの『回帰再点検』は新規再混入チェックに加え『過去スイープの取りこぼし』も拾える=clean でなく実改善が出る。scope/role/aria-label/htmlFor は機械突合可能なので全数 grep し直す価値あり。**
> **次の回帰再点検候補: scroll-margin(S32)/Label-in-Name(S29)/Radix Switch 命名(S31) を『新規再混入+取りこぼし』両視点で。日中候補(不変): ContactForm 成功カード focus/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export。**

> **更新 (2026-05-31 セッション66):** P0 全て done/SKIP。P1 進行中。**夜間安全タスク枯渇の確定 + 回帰再点検4レンズ(全て実害ゼロ)**。
> S66: ベースライン再実測全緑(typecheck0/test 1237・183files)。characterization 角度を機械(`find lib`×`__tests__` import 突合)+Explore で二重確認→**未テスト lib 残10本は全て真に blocked**(deployment-status/feature-flags=dead/gemini=SDK/auth/db/sound=AudioContext/onboarding・streak=barrel/pool-server・question-index=server-only)=新規ゼロ。続けて**過去修復クラスの回帰再点検4レンズを機械監査→全て実害ゼロ・コード無変更**: ①live-region 条件付きマウント(S33)=検出8件は全て role=alert(正)・polite 新規再混入ゼロ(SearchClient:997 は S61 SKIP 済) ②label htmlFor→id=全14箇所(静的+動的)対の id 実在・壊れた関連付けゼロ ③dangling aria-controls/describedby/labelledby idref(S27)=全静的/動的ターゲット実在(MockExamRunner/HomeTopicGrid/AfternoonResultView/EssayEditor 実測・CopilotPanel 2件はテストガード済)・dangling ゼロ ④numeric input inputMode(S29 ㉖)=type=number/tel 入力は不在(type=date+search のみ)で S29 成立。
> **★教訓: 夜間安全タスクは真に枯渇(未テスト純関数 S57-S65・a11y 実害 S1-S33・回帰再点検 S66 全クリーン)。残る夜間角度=過去修復クラスの回帰再点検(clean 記録で次回の重複監査を防止)のみ。実改善は日中候補(挙動変更+E2E)に依存。**
> **次の回帰再点検候補: scroll-margin(S32)/th-scope(S28)/Label-in-Name(S29)/chart role=img(S10-S15)/Radix Switch 命名(S31) の新規再混入有無。日中候補(不変): ContactForm 成功カード focus/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export。**

> **更新 (2026-05-31 セッション65):** P0 全て done/SKIP。P1 進行中。**管理オブザーバビリティ層スイープ**。
> S65: S64 が次 region に挙げた `scripts/` は **import 時に main()/トップレベルが実行(process.exit/writeFileSync)＝直接 import 不可で夜間 SKIP 確定**(guard 追加は dev infra 挙動変更でリスク高)。代わりに「消費済み×未テスト async オーケストレータ/env ゲート」を機械列挙→**回帰固定3本**(実改善0・source 無変更, test 1218→1237)。①`lib/sync/index.ts::syncAll`=overall 判定優先順位+writeSyncMeta を ok/partial 時のみ刻むゲート(失敗 sync が成功を詐称しない)+readSyncMeta fail-soft, `d117ced`。②`lib/admin/metrics/posthog.ts::fetchMetrics`=mock/posthog source ゲート(認証欠落→mock/probe失敗→fail-soft mock/配列results時のみposthog/URL末尾slash除去), `3e816d1`。③`lib/admin/funnel/posthog.ts::fetchFunnelData`=configured ゲート+3ファネル固定名+HogQL行パーサ(空名スキップ)+probe失敗→count0でもconfigured, `0275240`。各 mutation で fail 実測。
> **★教訓: (1) scripts/ は夜間 SKIP 確定(import副作用)。(2) toHaveProperty("") は vitest が空パス解析不能で TypeError→Object.keys().not.toContain("") を使え。(3) admin/* の env ゲートは「認証欠落→mock fallback / probe失敗→fail-soft / 成功時のみ実データラベル」が共通契約(lib/stats/posthog S60 と同型)。**
> **次の安全角度: lib/admin/* 残=deployment-status(Date.now多用brittle・日中向き)/launch-monitoring/data(buildAlerts要export)/feature-flags(dead code SKIP確定)。admin オーケストレータ env ゲート固定は概ね消化。残る夜間角度は薄く、過去 SAFE/latent footgun 再検証(S33/S41)か日中候補(挙動変更+E2E)に寄る。**

> **更新 (2026-05-30 セッション64):** P0 全て done/SKIP。P1 進行中。**data/ スイープ完了**。
> S64: S63 handoff の「次の grep スコープ拡張先=data/」を全消化→**回帰固定5本**(実改善0・source 無変更, test 1192→1218)。①`data/recommended-books.ts`=アフィリ URL 生成(?tag=/hb.afl ラップ)+プレースホルダゲート+全 exam 網羅(env stub で両分岐), `8ef122c`。②`data/features.ts`=特集 LP の slug 一意性/round-trip/未知→undefined/FAQPage faqs 非空/内部 href, `587c286`。③`data/keywords.ts`=キーワード LP の SSG 不変条件+**exams[]→/<exam> CTA の no-404(ALL_EXAM_CODES 突合)**, `2005f73`。④`data/faq.ts`=FAQPage JSON-LD の question/answer 非空+question 一意+category ラベル存在, `85f9c22`。⑤`data/glossary.ts`=DefinedTermSet+五十音ソート/グループ不変条件(reading/term/short 非空+term 一意), `a612375`。各 mutation で fail 実測。
> **★data/ レジストリの共通契約: slug 一意性+round-trip+未知→undefined+構造化データ/リンク先 no-404。データ値が内部リンク先になる箇所(keywords.exams→/<exam>)は ALL_EXAM_CODES 突合で 404 機械防止(P0 ブログ CTA pin と同型)。**
> **次の未スイープ region=`scripts/`**(CI/クローラ系・fetch/fs/env 依存多く夜間安全な純関数は限定見込み)。lib/ 残りは全て真に blocked。data/ types.ts の toSummary は低価値で SKIP。

> **更新 (2026-05-30 セッション63):** P0 全て done/SKIP。P1 進行中。
> S63: **新角度発見=data/ は S1-S62 の Explore スイープ(全て lib/ スコープ)の盲点だった**。data/ に未テスト純関数寄り4本残存→**回帰固定4本**(実改善0・source 無変更, test 1144→1189)。
> ①`lib/posthog.ts`=posthogCapture の fail-soft(未初期化→no-op/capture throw 握りつぶし)+env ゲート, `005254d`。②`data/blog/index.ts`=slug 一意性/サマリ降順/getRelatedPosts の limit/自己除外/関連性/explicit 優先(副産物: limit=0 off-by-one を latent pin・修正せず), `9bd7bc0`。③`data/success-stories/generators.ts`=buildSuccessStory 写像/テンプレ/publishedAt 未来 clamp(合成 offset で発火), `9f3fc51`。④`data/success-stories/index.ts`=レジストリ+2パス getSimilarPersonaStories(バケツをテスト側再実装で union 関連性検証), `ba11559`。各 mutation を sed で revert 実測。
> **次の grep スコープ拡張先(data/ 続き)**: `data/features.ts`(getFeatureBySlug)・`data/recommended-books.ts`(buildAmazonUrl/Rakuten/isAsinFilled 等=アフィリ URL 書式 pin は read-only で安全, ID 変更は §10/§14 承認要)。`scripts/` も未スイープ。lib/ 残りは全て真に blocked(fetch/SDK/auth-db/AudioContext/server-only/barrel/type-only)、feature-flags=dead code SKIP 確定。

﻿# 夜間自律改善 バックログ（優先度順）

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P0-追加（社長指示・最優先 / 2026-05-30 夜 追加）— 内部リンク2件
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
実測調査で「コード側 SEO/UX はほぼ天井」だが、確実に効く内部リンク追加が2件残ると判明（S8 の 404 リンク74件修正と同種・副作用小）。**実在URLのみリンク（404を作らない）が最重要制約。当て推量で特定ページへ飛ばさない＝機械的に決まるものだけ。**

### P0-追加-A: ブログ記事 → 演習への導線CTA追加
- 実測根拠: ブログ記事3本すべてが演習ページ（/quiz・/q）への直接リンク0本。試験紹介ページまでしか読者を運べていない取りこぼし。
- 方針: 各記事の対象試験区分（post.exam 等の既存メタ）から機械的にCTAのリンク先を決定。記事末尾に「この内容を問題で解く」CTAを1つ追加。対象区分が無い/曖昧なら汎用の「問題を解く」入口（ホーム主要CTA or /search）へ。新規ルート作成禁止・実在ルートのみ・SSRでHTML出力（クローラブル）。既存レイアウト踏襲・最小diff。
- 検証: 代表記事HTMLにCTAリンク実在＋リンク先200を実測。CTA存在＋href実在をテスト追加。404を作らない。

### P0-追加-B: 問題ページ /q に「前の問題・次の問題」順次リンク追加
- 実測根拠: 同回の順次リンクが薄い（同回リンク2件のみ）。同一試験回を問番号順に辿れる一本道が無い。
- 方針: /q/[exam]/[yearSeason]/[section]/[qnum] に同一 exam/yearSeason/section 内 qnum 順で前後リンクを追加。最初は「前」なし・最後は「次」なし。実在問題ページのみリンク（存在しない qnum へ飛ばさない）。SSR出力・既存回答UIを壊さない・最小diff・適切なa11yラベル。
- 検証: HTMLに前/次リンク実在＋リンク先200を実測。境界（最初に前なし/最後に次なし）テスト。E2Eで「次の問題へ」遷移。

> **完了記録: 2026-05-30 23:3x JST（社長指示の別セッション）。A・B done。**
> A・B とも**ソースは既に実装済み**だった（A: app/blog/[slug]/page.tsx:281-341 で exam→/quiz?mode=random&exam=・hub→ホーム /、B: app/q/.../page.tsx:159-169,502-738 で同回 qNumber 昇順 prev/next＋rel=prev/next＋PC/モバイルナビ＋境界処理）。
> よって**二重実装防止・過大修正の罠回避でソース無変更**、未カバーの回帰ガードのみ追加: A→`__tests__/seo/blog-practice-cta.test.ts`(3 it,`ef52e91`)、B→`__tests__/seo/question-sequential-nav.test.ts`(6 it,`d45fbad`)。
> 本番実測: /q prev=q1(200)/next=q3(200)・no-404、blog exam記事→/quiz・hub記事→ホーム。全緑(typecheck0/lint0err/test1192/build:ループ毎セッション緑実証)。main 不変 ea2ca69。通常 P1 守りへ復帰。

> **状態(2026-05-30 セッション61):** P0 全件 done/SKIP。P1 進行中。
> S61: S60 handoff の角度③（a11y 条件付きマウント live region の S33 同型再検証）+ 未テスト純関数の枯渇再確認。**実改善0・回帰固定0・コード無変更**（ベースライン全緑実測のみ）。
> ①`app/contact/ContactForm.tsx:220` エラー領域 `role=alert` 条件付きマウント＝**S33 doctrine「alert の条件付きマウントは正」で SKIP**（Explore の「バグ」報告は doctrine に照らし誤検出）。
> ②`components/search/SearchClient.tsx:986` は既に常設 sr-only `role=status` で件数告知（gold-standard・コメントで verbose anti-pattern 回避を明記）＝:997 の loading span の aria-live は冗長で SKIP。S33「残存ゼロ」を再確認。
> ③未テスト純関数は `lib/**` 未 import 機械列挙で残り全て要 mock/dead/server-only＝S57-S60 で打ち止め再確認・新規ゼロ。
> **★日中候補（S61 特定）: `ContactForm.tsx:86-110` 送信成功カードにライブリージョン/フォーカス移動が無く SR に成功が告知されない。修正＝成功見出しへ focus 移動（挙動変更・E2E 必須）＝夜間 SKIP。**
> **次は: 夜間の安全な実害バグ・未テスト純関数とも S1-S61 で深く枯渇。残は日中候補のみ。角度②（過去 SAFE/latent footgun の別モジュール再検証）は続行可だが収穫逓減。**
>

> **状態(2026-05-30 セッション60):** P0 全件 done/SKIP。P1 進行中。
> S60: S59 handoff の「残 fetch 系」を同手法(vi.stubGlobal/stubEnv)で**回帰固定3本**(実改善0・source 無変更)。
> ①sync/* 同期ラッパ(syncBookmarks/syncCustomTags/syncStudyPlans)=endpoint routing + merge-on-ok ゲート(非okで非マージ)+study-plan の payload 非object 除外, `8126169`。
> ②stats/gsc=readGscConfig の 4 env ゲート(1欠落→null=/stats 連携準備中)+四捨五入/空日付除外/日付昇順/roundBucket プライバシーラベル, `8e8f0d5`。
> ③stats/posthog=apiKey+projectId ゲート+機能/参照元バケット分類+pct小数1桁+降順+総数0→[]+results欠落/非ok→null, `9a78cb5`。test 1096→1125(+29 it・164→167 files)。各 mutation→cp 復元で実測。
> **★教訓: (1) source mutation 検証は sed -i か Edit を使え。PowerShell Set-Content は UTF-8 日本語を mojibake 化し esbuild parse error(「no tests」)を誘発＝厳禁。バックアップ/復元は cp(byte-exact)。 (2) sync ラッパの merge-on-ok ゲートは postSync が非ok時にローカル entries を echo するため除去しても behavior 検出不能＝load-bearing は endpoint routing と ok-path merge。 (3) stats/gsc・posthog は Date.now を transform に含まず決定的＝fetch mock だけで安全。**
> 残 fetch 系 = deployment-status(Date.now 依存+価値ある計算が inline 未export＝brittle・日中向き)・launch-monitoring/data(buildAlerts 要 export=日中向き)・monitoring/sentry(SDK)。真の要 mock = sound(AudioContext)/gemini(SDK)/auth/db。
> **次は: ②過去 SAFE/latent 同型 footgun 再検証(S33/S41)、③属性有無で見落とした同型 a11y(S33)。fetch+LS/env mock で安全に固定できる純関数寄りモジュールは S57-S60 で概ね打ち止め。**
>
> **状態(2026-05-30 セッション59):** P0 全件 done/SKIP。P1 進行中。
> S59: S58 が「要 mock=夜間 SKIP」と仕分けた未テスト群を**回避策で再検証し4本を回帰固定**（実改善0・source 無変更）。
> ①`a11y/use-quiz-choice-roving`（hook→sibling と同じ render/fireEvent で mock 不要・フォーカス専用ロービング契約, `3f2ac28`）
> ②`constants/current-year`（**S58「未参照=dead code」は誤り**＝data/blog/generators が消費・フェイククロックで JST ロールオーバー契約を pin, `3b8a58e`）
> ③`turnstile`（cost-guard.test の vi.stubGlobal/stubEnv で fetch mock・fail-open/error-codes セキュリティ契約, `759dd06`）
> ④`notify/slack`（同上・fail-soft/{text} 本文契約, `d9409eb`）。test 1075→1096（+21 it・160→164 files）。各 mutation→revert で実測。
> **★教訓: (1) React hook は sibling 慣用で mock 不要。(2) 単純 fetch 純関数は vi.stubGlobal/stubEnv で安全に固定可（早期 return 分岐+verdict
> マッピングだけでも価値高）。(3) 「未参照」判定は data/ content/ scripts/ も含めて grep せよ。** 残 fetch 系（同手法で可）= sync/*（fetch+LS 両 mock）・
> deployment-status・stats/posthog/gsc・launch-monitoring(buildAlerts は要 export)。真の要 mock = sound(AudioContext)/gemini(SDK)/auth/db。
> **次は: ②過去 SAFE/latent 同型 footgun 再検証(S33/S41)、③属性有無で見落とした同型 a11y(S33)、④sync/* の fetch+LS mock 固定。**
>
> **状態(2026-05-30 セッション58):** P0 全件 done/SKIP。P1 進行中。
> S58: S57 が「test 未 import 機械列挙は lib/ai 消化で打ち止め」としたのを疑い、**「消費の有無 × 未テスト」で篩い直す**と
> 消費済みなのに未テストの純関数寄りモジュールが3本残存＝**回帰固定3モジュール**（api-keys/storage・learner-profile-client・
> copilot/pinned-actions）。実改善0件（source 無変更）。test 1052→1075（+23 it・157→160 files）。各 mutation→revert で実測。
> ①`api-keys/storage`（/account/api-keys の LS 層）=readApiKeys fail-soft（破損/非配列/secret欠落除外）+appendApiKey 先頭挿入
> +MAX_KEYS=5 最古退避+deleteApiKey id一致+generateApiKey name trim/60字/空→"Untitled key"・形式, `b3fc496`。
> ②`learner-profile-client`（CopilotPanel 消費・B軸門番）=回答5件未満→undefined の閾値門番+getStats 整合+weakCategories 常に
> 空配列, `095fc82`。③`copilot/pinned-actions`（ピン留めフック・renderHook）=MAX_PINNED_ACTIONS=3 超過 no-op+トグル+LS 永続化, `2c9064f`。
> **SKIP(dead code): feature-flags（災害復旧キルスイッチだが KILL_* 環境変数が未配線＝app/components から未参照・配線は挙動変更で承認寄り）/
> current-year/team/mock-data も未参照。** 残未 import は外部API/fetch・server-only・hook/AudioContext/auth/db・barrel に限定。
> **次は:** ②過去 SAFE/latent 同型 footgun 再検証(S33/S41)、③属性有無で見落とした同型 a11y(S33)。test 機械列挙は「消費×未テスト」で
> 拾い切ったため、純関数寄りの安全候補は枯渇に近い（残は要 mock）。
>
> **状態(2026-05-30 セッション57):** P0 全件 done/SKIP。P1 進行中。
> S57: S56 handoff 角度①を起点に **lib/ai 層の未テスト純関数を一括契約固定＝回帰固定4モジュール**
> （providers/mock=pickReply 分岐優先順位+24字無損失チャンク+事前abort で AbortError、providers/{claude,openai}=
> 黙って空を返さず throw する stub 契約、provider.getProvider/resolveModel=§5 no-key→mock フォールバック+§9/§10 既定
> モデル文字列 flash-lite/flash の承認必須ピン、prompts.buildQuestionContext/buildRAGDirective=セクション/空文字選択肢
> 除外/answer 整形/採点状態・passageCount<=0→null+[1]..[N]番号列）。実改善0件（source 無変更）。test 1012→1052
> （+40 it・153→157 files）。各 mutation→revert で落ちを実測。コミット `7440e9d`/`70c1b7b`/`cd53c7c`/`47ec0d2`。
> **lib/ai 層の未テスト純関数は打ち止め（再監査不要）。残は gemini.ts(SDK要mock)・buildLearnerProfileContext(間接カバー済)。**
> **次は:** ②過去 SAFE/latent 同型 footgun 再検証(S33/S41)、③属性有無で見落とした同型 a11y(S33)。test 未 import 純関数の
> 機械列挙(S54-S57)は lib/ai 消化で概ね打ち止め＝残は外部API/SDK/server-only/React hook で要 mock。
>
> **状態(2026-05-30 セッション56):** P0 全件 done/SKIP。P1 進行中。
> S56: S55 handoff が名指しした「残る未 import 純関数寄り候補」を消化し**回帰固定4モジュール**（study-plan/constants=
> REQUIRED_HOURS 全13 ExamCode 網羅+PHASE_RATIOS sum=1.0+LEVEL_* Record キー一致と単調減少、streak/storage=read()
> の不正 blob coercion+recordStudyToday の read→apply→write 往復とマイルストーン通知、essay/load=論文C軸アクセサの
> 並び順 pairwise 不変条件+完全分割、api/openapi=公開 OpenAPI 3.1 の $ref/タグ参照整合）。実改善0件（source 無変更）。
> test 975→1012（+37 it・150→153 files）。各 mutation→revert で落ちることを実測。
> コミット `06ab3f0`/`f7e5b9d`/`e72f4bd`/`e2e267c`。barrel re-export(onboarding/streak index)は consume 済で typecheck
> 保証＝SKIP 確定（過大修正の罠回避）。
> **次は:** S54-S56 で「test 未 import 純関数寄り lib」は概ね打ち止め。次の有効角度＝①`lib/ai/providers/mock.ts`(決定的
> stub＝mock 不要で夜間安全・streamChat の chunk 分割契約を pin 可)、②過去 SAFE/latent 分類の同型 footgun 再検証(S33/
> S41)、③属性有無で見落とした同型 a11y(S33)。残未 import は外部API/provider 実装/server-only/auth-db/React hook で要 mock。
更新ルール: 着手前に必ず worklog で done/SKIP を確認（二重実装防止）。1所見=1コミット。
P0 をすべて done/SKIP にしてから P1 へ。P1 は「領域 × 観点」をローテーションしてまんべんなく回す。
判断に迷う/実害が無い指摘は直さず worklog に SKIP として記録（過大修正の罠を避ける）。

> **状態 (2026-05-30 セッション54):** P0 全件 done/SKIP。P1 進行中。
> S54: backlog の「未テスト純関数枯渇」宣言を疑い、`grep -rq "$mod\"" __tests__/` で**テストから一切 import
> されていない lib モジュール**を機械的に列挙→未テストが残存（S47-S53 の探索範囲漏れ）。安全な
> characterization テスト**4本**追加（mock-exam/session computeRemainingSec=savedAt でなく startedAt 基準・
> copilot/streaming createCopilotResponseStream=フッター付与/onComplete 文字数/エラーフォールバック・
> mock-exam/config getMockConfig+データ不変条件・api/rate-limit checkApiRateLimit キー導出+ヘッダ）。
> 全て source 無変更・mutation で落ちることを実測。test 920→944（+24 it・141→145 files）。コミット
> `7d8767b`/`6501081`/`28a8761`/`7fd53bf`。
> **次の探索手法: 「import 実在判定の未 import lib 列挙」が S47-S53 の basename 一致判定より漏れが少ない。**
> 残り未テスト純関数候補: analytics/events(trackEvent)・study-plan/constants(PHASE_RATIOS sum=1.0 等)・
> streak/storage・chat/storage。それ以外は types/server-only/外部API fetch で marginal。
>
> **状態 (2026-05-30 セッション51):** P0 全件 done/SKIP。P1 進行中。
> S51: S50 handoff が名指しした「残る未テスト純関数候補」3件を消化＝**回帰固定3モジュール**（sync/client postSync 未カバー枝・essays/load・exam-config prompt builder・計23 it・test 883→906・137→139 files）。実改善0件（source 無変更）。全件 source mutation→revert で「崩れたら落ちる」を実測。
> ①`lib/sync/client.ts::postSync` の未カバー4分岐（既存 merge.test.ts は 401/503/200/throw のみ）＝generic HTTP 失敗(非401/503)→`{error,"HTTP NNN"}`・200 body の entries 非配列→入力 entries フォールバック・merged/total の `?? 0` 既定・非Error throw→`"network"` 文言, `57fbdbf`。HTTP文言改変/`?? 99`/`Array.isArray`除去/`err.message`直参照 mutation で実測。
> ②`lib/essays/load.ts`（論述=午後II/論文 C軸 アクセサ・全くの未テスト）＝isEssayExamCode の6コード許容/拒否・SC コーパス非空/id重複なし/全業種保持・find系 id一致/未知→undefined・**getEssayQuestionByYearSeason の year+season+qNumber 三条件AND**・getIndustryEssay・**parseYearSeason の前後アンカー+季節限定正規表現**・questionToUrlParts。期待値はライブSCデータ導出, `5078d6f`。正規表現 `$` 除去+winter追加/三条件 qNumber+season 除去/section `pm2→pm1` mutation で実測。※非sc分岐(afternoon アダプタ+sort)はデータ依存で値が脆く非対象。
> ③`lib/exam-config.ts` の prompt builder 3件（parse-pdf-to-json が LLM に渡す抽出/解説指示文・未テスト）＝試験名/年度/label/設問数の補間・**季節ラベル(spring→春期/autumn→秋期/cbt→CBT)**・**カテゴリの1始まり改行連結**・JSON-only 指示・qList 末尾付与, `bbb72ba`。春期/秋期スワップ/カテゴリ採番0始まり化/「JSONのみ」→「マークダウンで」mutation で実測。
> **★教訓: 「lib/ 再走査で未テスト純関数発掘→契約固定」角度(S47-S51)は S50 handoff の名指し候補で打ち止め＝rag-pipeline を除き全消化。残候補は全て mock 要 or データ脆弱で marginal 化＝夜間の安全な実害バグ・未テスト純関数とも S1-S51 で深く枯渇。** postSync(全分岐)/essays-load/exam-config(prompt builder)は回帰固定済（再監査不要）。
> **次は: 残る handoff 候補は `lib/copilot/rag-pipeline.ts`(async orchestration・mock 要・夜間は慎重に)のみ＝着手するなら mock 設計を丁寧に。それ以外の sync wrapper(study-plan/bookmark/custom-tag-sync＝pure部分は S48 済・wrapper は fetch+localStorage mock 要)・lib/stats(gsc/posthog＝外部API・純関数でない)は夜間 marginal。新規夜間タスクは「過去が SAFE/latent 分類した同型 footgun の再検証」(S33/S41 角度)か「属性有無だけ見て見落とした同型 a11y」(S33 角度)を掘るのが残された有効角度。日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）は据え置き。**
>
> **状態 (2026-05-30 セッション50):** P0 全件 done/SKIP。P1 進行中。
> S50: S49 handoff が名指しした `lib/storage` の SSOT 純関数5件を契約固定＝**回帰固定5モジュール**（settings/notifications/character/last-question/user-context・計28 it・test 855→883・132→137 files）。実改善0件（source 無変更）。全件 source mutation→`git checkout --` revert で「崩れたら落ちる」を実測。
> ①`lib/storage/settings.ts`(出題オプション SSOT。readSettings の欠落補完・**recordHistory のみ既定 true=オプトアウト**・コピー返却, `4a36290`。recordHistory 既定反転 mutation で4件落ち) ②`lib/storage/notifications.ts`(通知設定。`{...DEFAULT_PREFS,...parsed}` マージ・**streakReminder/weeklyDigest=true・reminderHour=21(JST)**, `db36107`。reminderHour 21→0 で3件落ち。read は no-raw/error で DEFAULT_PREFS 参照返しだが全 primitive=S41 SAFE 確定済) ③`lib/storage/character.ts`(AIキャラ設定。**id を isCharacterId 検証[未知→既定 haru]・enabled は文字列 "true" のみ真[null→false]**・別キー独立保存, `e409656`。`==="true"`→`!==""` mutation で落ち) ④`lib/storage/last-question.ts`(継続再開ポインタ。**6 フィールド全型一致バリデーション[1つでも欠落/型違いなら null]**・破損 fail-soft, `762fff4`。qNumber 型チェック無効化 mutation で落ち) ⑤`lib/storage/user-context.ts`(訪問履歴。recordHomepageVisit の **visitCount 単調増加・ISO stamp・書込み後状態返却**・resetUserContext 既定復帰。移行/既定は既存 migrate-key.test 担当=重複回避, `7cbec45`。`+1`除去 mutation で3件落ち)。
> **★教訓: lint が稀に exit 3221225477(Windows STATUS_ACCESS_VIOLATION=segfault)で落ちる＝lint エラーでなく再実行で通る（本セッションで1回遭遇・即再実行で 0 errors）。慌てず再実行のこと。** settings/notifications/character/last-question/user-context は回帰固定済（再監査不要）。**S49 handoff の storage SSOT 5件は全消化。**
> **次は: 残る未テスト純関数候補＝`lib/sync/client.ts::postSync` の未カバー枝（generic HTTP 500→`{error,"HTTP NNN"}`・json.entries 非配列→local fallback・merged/total `??0`）＝merge.test.ts に追記可（401/503/200/throw は既済）・`lib/exam-config.ts` の buildExtractionPrompt/buildAnswerExtractionPrompt/buildExplanationPrompt(プロンプト文字列・固定値・価値中)・`lib/essays/load.ts`(薄いラッパ)・`lib/copilot/rag-pipeline.ts`(async・mock 要・夜間慎重に)。夜間の安全な実害バグは S1-S50 で深く枯渇。日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）は据え置き。**
>
> **状態 (2026-05-30 セッション49):** P0 全件 done/SKIP。P1 進行中。
> S49: S47-S48 の「lib/ 再走査で未テスト中核純関数を発掘→契約固定」を継続＝**回帰固定4モジュール**（copilot/aliases・chat/export-markdown・motivation/coupon・storage/essay-history・計39 it・test 816→855・128→132 files）。実改善0件（source 無変更）。全件「崩れたら落ちる」を mutation→revert で実測。
> ①`lib/copilot/aliases.ts`(RAG glossary doc ピン留め用語マッチ。matchAliasGlossaryTerms＝**エイリアス値のみ照合し term キー名は見ない**[bare "XSS" はキーでエイリアス不在→不一致]・大文字小文字無視・docstring 通り substring 照合[語境界なし・"description" が "IP"→TCP/IP]・複数 term 同時・Set+break で term 1回, `9c0e085`。`alias.toLowerCase()` 除去 mutation で実測) ②`lib/chat/export-markdown.ts`(AI会話 Markdown エクスポート＝フェーズ2。buildMarkdown＝見出し/出典/問題/選択肢[choices 有無で出し分け]/正解[文字列 vs 配列『・』連結]/解説/会話ログ role 別ラベル/サイトURLフッター。downloadMarkdown の Blob/DOM 副作用は対象外, `94ea1c0`。`join("・")→join("/")` mutation で実測) ③`lib/motivation/coupon.ts`(30日連続クーポン発行・ゲーミフィケーション。ensureCouponForStreak＝**peak=max(current,longest)>=30 ゲート**・既発行で再発行しない冪等性・コード STREAK30-[8文字]・read のプレフィックス不正/破損JSON fail-soft null・markRedeemed/clearCoupon/describeCoupon。**source 三項[常に streak-30＝S35 SKIP 済 dead-branch]は現挙動として固定し直さない**, `88bb1f8`。`peak<30→peak<0` mutation で誤発行を実測) ④`lib/storage/essay-history.ts`(午後論文添削 C軸 採点履歴+下書き。履歴=**新着先頭・最大50件[最古退避]**・非配列/破損JSON 空配列フォールバック・下書きは **questionId 単位で分離**・clearEssayDraft は対象 id のみ・破損は null, `0059d8f`。`.slice(0,MAX_ENTRIES)→.slice(0,100)` mutation で実測)。
> **★教訓1: Explore の「NO test coverage」判定は不正確（同名 test file が別関数を見るケース多数＝question-meta/url/exam-meta 等は既テスト）。着手前に必ず `grep -rl 'lib/<path>\"' __tests__/` で import 実在を確認。教訓2: aliases は term キー名でなくエイリアス値のみ照合（bare 略称キーはマッチしない）。** copilot/aliases・chat/export-markdown・motivation/coupon・storage/essay-history は回帰固定済（再監査不要）。
> **次は: 残る未テスト純関数候補＝`lib/sync/client.ts::postSync` の未カバー枝[generic HTTP 500→error・json.entries 非配列→local fallback・merged/total の ??0]＝merge.test.ts に追記可（401/503/200/throw は既済）・lib/copilot/rag-pipeline(async・mock 要・夜間慎重に)・lib/storage/{settings,notifications,user-context,character,last-question}(defaults マージ・低分岐 SSOT)・exam-config の prompt builder(固定値・価値中)。夜間の安全な実害バグは S1-S49 で深く枯渇。日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）は据え置き。**
>
> **状態 (2026-05-30 セッション48):** P0 全件 done/SKIP。P1 進行中。
> S48: S47 の「lib/ 再走査で未テスト中核純関数を発掘→契約固定」を継続＝**回帰固定4モジュール**（study-plan/storage・seo/indexnow・onboarding/state・ai/cost-tracker・計53 it・test 763→816・124→128 files）。実改善0件（source 無変更）。全件「崩れたら落ちる」を mutation→revert で実測。
> ①`lib/study-plan/storage.ts`(学習プラン保存＋クラウド同期の中核。listPlans の createdAt 降順/破損JSONフォールバック・savePlan の同id置換＋MAX_PLANS=20 で最古退避・setTaskDone の done/undone トグル・getPlanSyncEntries の updatedAt=max(created,progress)・**mergeServerPlans の LWW**[local>=server で local維持/server新で上書き/未存在追加/非object payload skip]・computeCompletionStats の percent丸め＋0件で NaN でなく0, `5df86dd`。LWW比較反転 mutation で2件落ちを実測) ②`lib/seo/indexnow.ts`(IndexNow クロール通知。getIndexNowKey の正規表現検証[8-128字/英数+ハイフン/大文字可/trim/範囲外・不正文字は null]・pingIndexNow の fail-soft[キー無→no-key/空URL→empty で fetch 不実行・成功時 host/key/keyLocation/urlList POST・urlList 10000件上限・fetch throw 時 {ok:false,reason:message}], `6f8439a`。キー長下限 8→1 mutation で実測) ③`lib/onboarding/state.ts`(オンボーディング状態。readOnboardingState の EMPTY フォールバック＋部分状態 {...EMPTY,...parsed} マージ＋legacy kakomon-ai キー移行・**markFirstVisit の冪等性**・markTourCompleted/Dismissed の firstVisitAt バックフィル/既存保持・setAttribute/setSelectedExam の他フィールド保持・cleanupDeadOnboardingKeys, `8c2a7cf`。冪等ガード除去 mutation で実測) ④`lib/ai/cost-tracker.ts`(§0 コスト上限ガードと同じ価格表の単一情報源。costJpy[flash-lite $0.10/$0.40・flash $0.30/$2.50 per 1M ×150円・ゼロで0・線形・出力>入力・flash>flash-lite]・CostTracker.estimate=costJpy 一致かつ非記録・record の累積。filesystem 依存 save()/printSummary は対象外, `3cc1250`。USD_TO_JPY 150→100 mutation で実測)。
> **★教訓: S47 の lib/ 再走査角度は依然有効＝未テスト中核純関数がまだ4件見つかった（cloud-sync の LWW/価格表/オンボーディング冪等など実害寄りの契約を含む）。study-plan/storage・seo/indexnow・onboarding/state・ai/cost-tracker は回帰固定済（再監査不要）。**
> **次は: 残る未テスト純関数候補＝lib/copilot/rag-pipeline(async orchestration・mock 要)・lib/sync/* sync ラッパ・lib/search/question-index(private・export 追加要で日中向き)・exam-config の各 prompt builder(固定値テスト・価値中)。夜間の安全な実害バグは S1-S48 で深く枯渇。日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）は据え置き。新規夜間タスクは lib/ 再走査の継続 or 「過去が属性有無だけ見て見落とした同型 a11y」(S33 角度)。**
>
> **状態 (2026-05-30 セッション47):** P0 全件 done/SKIP。P1 進行中。
> S47: S46 が「未テスト純関数は search-index のみ残」としたが、**Explore で lib/ を再走査し未テスト中核純関数を新規3件発掘**（過去の枯渇宣言は探索範囲の漏れ）＝**回帰固定3モジュール**（content-count/exam-config-pdf-url/afternoon-load・計33 it・test 730→763・121→124 files）。実改善0件（source 無変更）。全件「崩れたら落ちる」を mutation→revert で実測。
> ①`lib/stats/content-count.ts`(getContentCounts＝/stats・/api/stats/content-count の午前+午後+論文総数集計。保存則・per-exam分割が ALL_QUESTIONS を正確に分割する独立クロスチェック・total降順ソート・publishedExams閾値, `49b720c`) ②`lib/exam-config.ts`(getSafePdfUrl/getOfficialAnswerPdfUrl/buildPdfUrl/buildRawPdfPath＝/q 出典リンク[§8]の IPA命名規則: `_qs.pdf`→`_ans.pdf` 末尾スワップ・https以外フォールバック・year-2018 オフセット・春h秋a 季節記号・noSessionPrefix IP例外, `63b9ad8`) ③`lib/afternoon/load.ts`(午後AI採点[C軸]アクセサ。getAfternoonYearSeasons は generateStaticParams を駆動＝prerender対象決定。試験フィルタ・year降順/season昇順ソート・corpus被覆一致・参照同一性, `25866a5`)。
> **★教訓: 過去の「未テスト純関数は枯渇」宣言は Explore の探索範囲漏れがあり得る＝定期的に lib/ 全体を再走査する価値あり。** content-count/exam-config(PDF URL)/afternoon-load は回帰固定済（再監査不要）。残る未テスト候補＝exam-config の buildExtractionPrompt/buildAnswerExtractionPrompt/buildExplanationPrompt(プロンプト文字列・固定値テストの価値は中)・essays/load(薄いラッパ)・search-index(private・export 追加要で日中向き)。
> **次は: 夜間の安全な実害バグは S1-S47 で深く枯渇。日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）のみ。新規夜間タスクは lib/ 再走査での未テスト純関数発掘 or 「過去が属性有無だけ見て見落とした同型 a11y」(S33 角度)。**
>
> **状態 (2026-05-30 セッション44):** P0 全件 done/SKIP。P1 進行中。
> S44: S43 handoff の残・未テスト純関数候補を消化＝**回帰固定3モジュール**（prompt-assembly/corpus/exam-data・計30 it・test 675→705）。実改善0件（source 無変更）。全件「崩れたら落ちる」を mutation→revert で実測。
> ①`lib/copilot/prompt-assembly.ts`(assembleCopilotPrompt＝AIコパイロット B軸 の system+user メッセージ組み立て。セクション順序 COPILOT→character→length→ragDirective→問題コンテキスト→profile→ragContextBlock・条件付き挿入の門番[characterEnabled かつ有効id のみ/profile は回答5件以上/rag は null/空で除外]・クイックアクションの先頭付与[最後が user のときのみ]・入力 messages 非破壊, `cc27d2e`) ②`lib/copilot/corpus.ts`(getCorpus＝RAG コーパス組み立て。BM25 フィールド重み[カテゴリ×2/用語名×6/英語×3]・解説20字未満除外フィルタ・doc形状[q:/g:プレフィックス・URL]・プロセス内キャッシュ同一性, `6b8e1e8`) ③`lib/seo/{exam-stats,exam-resources,exam-content}.ts`(全試験ハブ /[exam] が描画する静的データの**値**不変条件＝型では守れない: 学習時間 low<=high・合格率 NN-NN・ロードマップ monthsBefore 厳密降順/非負・公式リンク IPA https・relatedExams 自己参照/重複なし+実在コード=S8 内部リンク健全性, `97ffc91`)。
> **★S43 handoff の `citations(markdown footer)` は既テスト済**（`__tests__/copilot/citations.test.ts` が buildCitationFooter/buildRAGContextBlock/responseHasInlineCitation を網羅）＝候補から除外（再監査不要）。
> **教訓: prompt-assembly/corpus/exam-stats/exam-resources/exam-content は回帰固定済（再監査不要）。fe ロードマップは 0 でなく 1ヶ月前着地が現挙動（特性化済）。未テスト純関数候補は枯渇＝残るは search-index(tokenize/makeSnippet/scoreQuestion=private・export 追加要で日中向き) のみ。**
> **次は: 夜間の安全な実害バグ・安全な未テスト純関数とも S1-S44 で深く枯渇。残候補は日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export 追加）のみ。新規夜間タスクは「過去が SAFE/latent 分類した同型 footgun の再検証」(S33/S41 角度)か「過去が属性有無だけ見て見落とした同型 a11y」(S33 角度)を掘るのが有効。**
>
> **状態 (2026-05-30 セッション43):** P0 全件 done/SKIP。P1 進行中。
> S43: S34-S42 の「未テスト中核純関数の契約固定」を継続＝**回帰固定4モジュール**（sitemap-xml/copilot-visibility/citation-meta/structured-data・計46 it・test 629→675）。実改善0件（source 無変更）。全件「崩れたら落ちる」を source mutation→revert で実測。
> ①`lib/seo/sitemap-xml.ts`(renderSitemapIndexXml/renderMainSitemapXml/renderBooksSitemapXml/チャンク境界＝noindex(essays/success-stories)・301(/quiz,/support)除外のクローラシグナル契約 + 全indexable質問のチャンク間重複/欠落ゼロ分割, `424eb5f`) ②`lib/copilot/visibility.ts`(setCopilotPanelOpen/isCopilotOpen/subscribe＝desktop/mobile 2variant の count セマンティクス + Math.max(0,…)クランプで stray close が負に desync しない, `8d905a5`) ③`lib/copilot/citation-meta.ts`(buildCitationMetas/encode/decodeCitationsHeader＝base64(JSON(UTF-8))往復で日本語タイトルを ASCII-only HTTPヘッダで無損失運搬するクロスランタイム契約 + snippet空白圧縮/320字切詰め/ordinal連番, `131833e`) ④`lib/seo/structured-data.ts`(buildOrgNode/buildWebPageNode/SITE_ID/ORG_ID＝@graph ノード連結で publisher→ORG_ID・isPartOf→SITE_ID の @id 参照整合, `ee8d533`)。
> **教訓: sitemap-xml/copilot-visibility/citation-meta/structured-data は回帰固定済（再監査不要）。related.ts(sharesTopicOrCategory/topicRelevanceMultiplier)・reranker/retriever は既テスト済。残る未テスト純関数候補＝seo/exam-content・exam-resources・exam-stats(定数Record)・copilot/corpus(buildCorpus)・prompt-assembly・citations(markdown footer)。**
> **次は: 夜間の安全な実害バグは S1-S43 で深く枯渇。残候補は上記未テスト純関数 or 日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG）。**
>
> **状態 (2026-05-30 セッション42):** P0 全件 done/SKIP。P1 進行中。
> S42: S41 handoff の「`{...EMPTY}`/`{...DEFAULTS}` spread 系 共有EMPTY footgun 残候補」を全数監査＝**全7ファイル SAFE 確定**（daily-challenge/user-context/onboarding/settings/notifications/character/missions＝nested mutable 在でも in-place mutating caller 不在 or primitive-only＝footgun テーマ完全枯渇・再監査不要）。続けて未テスト中核純関数の契約固定3件＝**回帰固定3モジュール**（missions/tokenize/essay-rate-limit・計27 it・test602→629）。実改善0件（source 無変更）。
> ①`lib/gamification/missions.ts`(dailySeededIds 日次決定的6→3抽出・monotonic max・claim 閾値ゲート＝XP報酬を左右, `1e74854`+型修正`8fce2f6`) ②`lib/copilot/tokenize.ts`(CJK bigram/ASCII lowercase/stopword/dedup＝検索・copilot 関連度中核, `8fce2f6`) ③`lib/storage/essay-rate-limit.ts`(premium→Infinity/無料3回/0床/JST月跨ぎリセット＝C軸無料枠ゲート, `9307c4b`)。
> **★反省＝gate 規律: missions テスト初回 commit で `pnpm typecheck` を回し損ね型エラー(seed の Partial<Record> 全キー必須)を混入→次 commit で raw JSON 型へ是正。vitest/next build は __tests__ を型チェックしないため、テスト追加でも commit 前に typecheck 単独実行を厳守。**
> **教訓: 共有EMPTY footgun は全クラス SAFE 確定で再監査不要。missions/tokenize/essay-rate-limit は回帰固定済。残る未テスト純関数候補＝sitemap-xml(XMLレンダ/チャンク)・retriever/reranker(RAG integration が一部カバー)。**
> **次は: 夜間の安全な実害バグは S1-S42 で深く枯渇。残候補は上記未テスト純関数 or 日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG）。**
>
> **状態 (2026-05-30 セッション41):** P0 全件 done/SKIP。P1 進行中。
> S41: 前半は S40 handoff の最後の1件(daily-goal)＋新規未テスト純関数2件を契約固定＝回帰固定3（daily-goal/examLabelAt/summarizeSession・計31 it）。後半で**共有EMPTY破壊 footgun の sweep 未完を発見＝実改善2件**。
> ①`lib/motivation/daily-goal.ts`(getDailyProgress: pct クランプ/completed境界/本日以外除外, `8dd7b5d`) ②`lib/exam-naming/history.ts`(examLabelAt: 出題当時の試験名・期の順序春<秋で同年内改名 NW/AP, `293c6cd`・SEO中核) ③`lib/motivation/session.ts`(summarizeSession: おすすめ数閾値<60→+5/[60,90)→+3/>=90→+10・クランプ[10,50], `3981de4`)。
> **★実改善2件＝共有EMPTY footgun の SAFE/latent 誤分類**: ④`lib/motivation/badges.ts`(read が `{...EMPTY}` 浅コピーで earned 配列共有→syncBadgesWithStreak の push が破壊。**S36 SAFE 群に誤列挙**されていた, `48c13dc`) ⑤`lib/motivation/heatmap.ts`(同型・byDate 共有→recordStudyOnDate が破壊。**S40 が latent 放置**した件, `440f1d0`)。両者 emptyState() ファクトリ化（挙動不変）+絶対参照純度テスト。test532→**602**。
> **教訓: S37 の「共有EMPTY footgun 全7ファイル完了」宣言は不完全＝`{...EMPTY}` 浅コピーで nested mutable(array/object)を共有するクラス(badges/heatmap)が漏れていた。残る要検証＝daily-challenge(`{...EMPTY,...parsed}`)/onboarding/state/user-context(同型 merge の空経路)。combo/character/settings/notifications は DEFAULTS が primitive-only でおそらく SAFE。次セッションは read() の空経路が nested mutable を共有し mutating caller があるかを確認し、同型なら emptyState() ハードニング。**
> **次は: 未テスト純関数候補は daily-goal で S39/S40 handoff 分を消化済。残る上記 footgun 再検証(S33 角度の発展＝過去 SAFE/latent 誤分類の掘り起こしが有効)、または日中候補群(pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG)。**
>
> **状態 (2026-05-30 セッション40):** P0 全件 done/SKIP。P1 進行中。
> S40: S34-S39 の「未テスト中核純関数の契約固定」を継続＝**回帰固定4モジュール**（combo/heatmap/recommended-paths/questions-load・計29 it・test532→561）。実改善0件＝4モジュールとも監査で実バグ無し確定。
> ①`lib/motivation/combo.ts`(comboLevel 閾値 none<3/small/big>=5・設定read/write, `2adff00`) ②`lib/motivation/heatmap.ts`(intensityLevel バケット境界/generateDayRange 連続N日/集計合計, `0d4cffb`・read() byDate 共有footgun は studyDays の clear 不在で latent=SAFE) ③`lib/onboarding/recommended-paths.ts`(getRecommendedPath 3属性分岐・exam href補間・未知→last-minute fallback, `f9bb080`) ④`lib/questions/load.ts`(getAvailableYears 降順/Categories・TopicTags 昇順/exam絞り部分集合・実データ不変条件, `37cc0ed`)。
> **★特記: `getAvailableTopicTags()` は現状空配列**＝14,402問中 topicTags 付与が0件（topic-tagger 未書込み・CLAUDE.md フェーズ通り）。/topics は別ソース(seo/topics.ts)使用で実害なし。タグ付与（データ作業）は夜間対象外＝SKIP。
> **教訓: combo/heatmap/recommended-paths/questions-load は回帰固定済（再監査不要）。残る未テスト純関数候補＝`lib/motivation/daily-goal.ts`(getDailyProgress: pct クランプ/completed・read+getHeatmapMap連携)が S39 handoff の最後の1件。**
>
> **状態 (2026-05-30 セッション39):** P0 全件 done/SKIP。P1 進行中。
> S39: S34-S38 の「未テスト中核純関数の契約固定」を継続＝**回帰固定4モジュール**（share/questions-filter/questions-last-updated/metrics-range・計36 it・test496→532）。実改善(source変更)0件＝4モジュールとも監査で実バグ無し確定。
> ①`lib/motivation/share.ts`(SNS シェアURL/本文・数値0とundefined区別, `bd56735`) ②`lib/questions/filter.ts`(**全モード出題プールの門番14k問**・examGroup優先/表図条件×画像なし除外/プレースホルダフォールバック/shuffleChoices answer追従, `a548537`) ③`lib/questions/last-updated.ts`(/q更新日+JSON-LD dateModified, `71be271`) ④`lib/admin/metrics/range.ts`(集計期間+前期間比較窓の日付演算・off-by-one ガード, `92bc306`)。
> **教訓: share/questions-filter/questions-last-updated/metrics-range は回帰固定済（再監査不要）。残る未テスト純関数候補＝motivation/combo(comboLevel)・motivation/heatmap(intensityLevel/generateDayRange)・onboarding/recommended-paths・questions/load(getAvailableYears等)・motivation/daily-goal。**
>
> **状態 (2026-05-30 セッション38):** P0 全件 done/SKIP。P1 進行中。
> S38: S34-S37 の「未テスト中核純関数の契約固定」を継続＝**回帰固定4モジュール**（pii-masker/dashboard-analytics/learning-analytics/category-pool・計48 it・test448→496）。実改善(source変更)0件＝監査で実バグ無し確定。
> ①`lib/feedback/pii-masker.ts`(PII スクラバ・contact API 中核, `e6a3532`) ②`lib/dashboard/analytics.ts`(/account 合格可能性%・弱点分野, `7b0442b`) ③`lib/learning/analytics.ts`(学習プラン・必要演習量, `297802c`) ④`lib/questions/category-pool.ts`(AP横断分野プール母数14k問・Explore の session取りこぼし疑いを実データ grep で棄却, `26ea5ae`)。
> **★新・日中候補（要人手判断）: pii-masker の name-honorific over-mask**＝正規表現 `…(?:様|氏|…)` が一般語「仕様/同様/模様」を誤マスクしフィードバック本文を破損（"問題の仕様が"→"問題の[削除済み]が"）。**プライバシー安全側（over-mask＝漏洩でない）**だが正当本文が壊れる。修正は denylist 追加 or 「姓らしさ」判定へ寄せる等＝**実在姓+様（例「林様」）の取りこぼし回避が肝で夜間は SKIP**。characterization テストで現挙動を固定済（修正時に気付く）。
> **教訓: pii-masker/dashboard-analytics/learning-analytics/category-pool は回帰固定済（再監査不要）。search-index(tokenize/makeSnippet/scoreQuestion) は server-only かつ private＝テストに export 追加=source 変更要で日中向き。**
>
> **状態 (2026-05-30 セッション36):** P0 全件 done/SKIP。P1 進行中。
> S36: S34/S35 の「未テスト純関数の契約固定」を継続中に、**S34 が history.ts で1件直した shared-mutable-EMPTY footgun がコードベースに体系的に潜在**していると発見＝**実改善5件**。
> 回帰固定2: ①`study-plan/generator`(listDates/formatLocalDate/isWeekend/generateStudyPlan 不変条件, `1b577ee`・14件) ②`gamification/economy`(levelForXp 閾値/xpToNext クランプ/gold台帳, `7976290`・14件)。
> 実バグ修復3（read() が空ストレージ時に共有 const EMPTY を**参照返し**＋呼び出し側が**その場破壊**＋**write(EMPTY)/clearAll の amplifier**で concrete 実害）: ③`achievements`(unlock push/評価++ で EMPTY 汚染→実績誤判定・XP誤付与, `1e9569e`) ④`bookmarks`(toggle/merge 破壊＋clearAllBookmarks が EMPTY 書戻し→新規ユーザー初セッションで「全て削除」が初回ブクマを消し残す, `778872e`) ⑤`spaced-repetition`(recordReview 破壊＋resetSrs が EMPTY 書戻し→初回復習分が reset で残る・SM-2 ロジックは不変, `c058f58`)。各回帰テスト付き・source revert で落ちることを実測。test369→423。
> **次セッション最有力（防御的ハードニング・1サイクルで batch 可）**: 同型 footgun の**latent 残り3件**を emptyState() ファクトリ化（economy と同じ最小 diff）。**concrete amplifier(write(EMPTY)/キー削除)が無く実害は出ていないが**同クラス: ①`lib/mock-exam/storage.ts`(recordMockExam: `data.history.push`) ②`lib/learning/mock-scores.ts`(recordMockScore: `state.scores.push`) ③`lib/storage/custom-tags.ts`(ensureCatalogForNames/mergeServerCustomTags: `data.tags[name]=`)。
> **教訓: 「read() が共有 EMPTY を参照返し」×「呼び出し側その場破壊(push/代入/++)」×「write(EMPTY)/キー削除 amplifier」が揃うと concrete 実害。amplifier 無し＝latent。読取り側が新規オブジェクト構築なら SAFE（economy/onboarding/heatmap/streak-storage/user-context/daily-challenge/xp/missions/badges/sync は再監査不要）。修正は全て emptyState() ファクトリ化＝最小 diff・挙動不変。**
> **その後: S35 の残り未テスト純関数（success-stories/related-content・seo/* ヘルパ）の契約固定、または日中候補（tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/reduced-motion 共有フック抽出/SM-2 EF 準拠/apple-touch-icon PNG）。**
>
> **状態 (2026-05-30 セッション35):** P0 全件 done/SKIP。P1 進行中。
> S35: S34 の「**未テストの lib 純関数を監査→実害発掘 or 契約を回帰固定**」角度を継続。リテンション/ゲーミフィケーション中核の純関数群（streak/xp/srs/heatmap/daily-goal/combo/coupon/missions/daily-challenge/filter/mock-exam-selection）を**read-only 全数精査＝明確な実害バグは無し（コード成熟）**。テスト皆無の最重要4モジュールの契約を回帰固定（source 無変更・S34 と同型の安全 infra）: ①`streak/core`(JST境界/連続/中断/マイルストーン, `f69b47d`・15件) ②`xp`(二次曲線×二分探索逆関数・全100段で逆関数一致, `45ff964`・10件) ③`mock-exam/selection`(Hamilton最大剰余配分・shuffle非依存の決定的座席配分, `990d8fe`・6件) ④`daily-challenge`(連続日/perfect連続/完了済み冪等, `af22cf3`・11件)。test327→369。
> SKIP(日中候補): `spaced-repetition::applyGrade` が失敗時に EF 非更新（正準SM-2は全grade更新だが doc は「適応版」明記＝意図的の可能性・挙動変更につき夜間SKIP）/`coupon::read` の `source` 無意味三項（実害ゼロの dead-branch・cleanup候補）。
> **教訓: streak/xp/mock-exam-selection/daily-challenge は回帰固定済（再監査不要）。combo/daily-goal/heatmap/missions/filter は監査で実害ゼロ確定。残る未テスト純関数候補＝study-plan/generator・gamification/economy・gamification/achievements・success-stories/related-content・seo/*ヘルパ（次セッションの固定候補）。**
> **次は: 夜間の安全な実害バグは S1-S35 で深く枯渇。夜間継続は S34/S35 の「未テスト純関数の契約固定」が最安全・高価値＝上記残候補を1つずつ固定。a11y/SEO 新観点は色コントラスト/フォーカス順序など要レンダリング・要E2E＝日中向き。**
>
> **状態 (2026-05-30 セッション33):** P0 全件 done/SKIP。P1 進行中。
> S33: 新角度「**過去セッションが属性の有無だけ見て見落とした同型バグ**」を開拓＝**実改善1件**。`/settings` 保存トーストの `role="status"`/`aria-live="polite"` live region が `{toast && (…)}` で**条件付きマウント**され、region 自体が文言と同時 DOM 挿入される anti-pattern（SR が変化を捕捉できず保存完了/失敗が無通知）。**S7 が EmailLeadCapture に対し修正済の完全同型**だが、S7 監査は「role=status 保有」のみ確認し条件付きマウントを見落とし SKIP していた。region を常設し中身だけ出し入れ（`97b166a`・gold-standard ShareButtons 慣用）。source-read 回帰テストで index 順を検証（stash で落ちる実測）。
> SKIP(全数監査=実害ゼロ): conditionally-mounted polite status（修正後 grep 残存ゼロ・`role=alert` はマウント時アナウンスが正で対象外）/focus-visible 除去（全て ring/border 代替併記）/OG 画像 dims（全32ページ width/height/alt 一貫）/api-route runtime（未宣言ゼロ）/select-onChange WCAG 3.2.2（全て state 更新のみ）。
> **教訓: `role=status`/`aria-live=polite` は常設して中身だけ差替が gold-standard。同一コンポーネント内の `{x && (…role=status…)}` 条件付きマウントは残存ゼロ（再監査不要）。`role=alert` の条件付きマウントは正。focus-visible/OG dims/api-runtime/select-onChange の4クラスは構造的クリーン。**
> **次は: 夜間の安全な実害バグは S1-S33 で深く枯渇。残は日中候補のみ。「過去セッションが属性有無だけ見て見落とした同型」を掘る二次監査は有効＝次は S5/S13 で aria-pressed 化したセグメント UI の可視フォーカス等が候補。debatable な toast/indicator（AchievementToast 等・親が条件付きレンダー）の常設 region 化は日中候補。**
>
> **状態 (2026-05-30 セッション32):** P0 全件 done/SKIP。P1 進行中。
> S32: 新角度「**ページ内アンカー跳躍/scrollIntoView が persistent sticky header(h-14=56px) 下に隠れる（scroll-margin 欠落/不足）**」を開拓＝**実改善4件**。SiteHeader は常時表示 sticky(hide-on-scroll 無し)のため、scroll-margin の無いアンカー跳躍先は header 下に着地する。`href="#"` 全4＋`scrollIntoView({block:start})` 全1を全数監査:
> ①`/settings` セクションナビ8リンクの跳躍先 SectionTitle に scroll-mt-20（`659a569`・専用ナビで高頻度）②`/student` 学割申請アンカー（`f2399f9`）③`/q` 解説アンカー＝`scrollMarginTop:"1rem"`(16px<56px)→scroll-mt-20＋inline style 撤去（`2e3df3c`・中核 indexable）④`EssayEditor` 採点結果 scrollIntoView（`6254ff1`・論文添削C軸）。全て `.next` 実測 or source-read 回帰テスト。
> **教訓: SiteHeader は h-14(56px)常時表示 sticky。in-page 跳躍先は scroll-mt-20 必須。全跳躍ターゲットは本修復で保有済（about/transparency/admin は既存・`#main-content` skip link は header 意図スキップで例外）＝残存ゼロ（再監査不要）。**
> **次は: 夜間の安全な実害バグは S1-S32 で深く枯渇。残は日中候補のみ（tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/reduced-motion 共有フック抽出）。新発見の日中候補: apple-touch-icon が SVG（iOS は PNG のみ＝home 追加時アイコン非表示）＝要 PNG 生成で夜間 SKIP。次セッションは「本日分完了」記録 or 日中候補の慎重実施を検討。**
>
> **状態 (2026-05-30 セッション31):** P0 全件 done/SKIP。P1 進行中・夜間の安全実害バグは S1-S31 で網羅的に枯渇を再々確認。
> S31: 新角度「**Radix プリミティブのアクセシブルネーム**」を開拓＝**実改善1件**。Radix `<Switch>` は中身のない `<button role="switch">` をレンダーするため視覚専用ラベル（SettingRow の隣接 `<p>`）では命名されず、**設定トグル10件が WCAG 4.1.2 Level A 違反**（30セッション盲点）。`/settings` は `SettingRow` を `useId`+`cloneElement` で `aria-labelledby` 関連付け（7件・名前は可視テキスト同期）、`NotificationSettings` は `aria-label`（3件）で是正（`ebecece`）。`.next` HTML で aria-labelledby↔`<p id>` 実測＋回帰テスト。
> SKIP(全数監査=実害ゼロ): viewport zoom（maximum-scale/user-scalable 不在）/ネスト interactive 要素（a-in-a/button-in-button 不在・Button asChild は Slot 委譲で正）/radiogroup 命名（全7箇所 aria-label 保有）。
> **教訓: Radix 利用は Switch（命名済）/Dialog・Sheet（DialogTitle 命名）/Slot のみ＝裸の無名 interactive プリミティブ残存ゼロ（再監査不要）。viewport zoom 抑制なし・ネスト interactive 不在の2クラスも構造的クリーン。**
> **次は: 夜間の安全な実害バグは S1-S31 で深く枯渇。残は日中候補のみ（tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/reduced-motion 共有フック抽出）。新観点は色コントラスト/フォーカス順序など要レンダリング・要E2E＝日中レビュー向き。次セッションは「本日分完了」記録 or 日中候補の慎重実施を検討。**
>
> **状態 (2026-05-30 セッション30):** P0 全件 done/SKIP。P1 進行中・夜間の安全実害バグは S1-S30 で網羅的に枯渇を再々確認。
> S30: S28起案の残り㉒㉓を全数監査で消化＝**実害ゼロ確定**（㉒colspan/rowspan は本リポに**出現ゼロ**＝複雑表なし＝moot／㉓lang はルート `<html lang="ja">` のみで部分切替不要）。さらに独立した新角度4クラス（clickable非interactive要素/href#/aria-hidden on focusable/icon-only ボタンのアクセシブルネーム）を全数監査＝**全クラス実害ゼロ**（clickable-div は背景dismissのみでキーボード経路併存／href#=不在／aria-hidden=装飾のみ／icon-only=全てラベル保有）。**コード無変更**（過大修正の罠回避）。
> **教訓: colspan/rowspan 不在・lang ルートのみ・clickable非interactive=背景dismissのみ・aria-hidden=装飾のみ・icon-only ボタン=全てラベル保有＝5クラス構造的にクリーン（再監査不要）。㉒caption は H39 advisory＝SKIP 確定。**
> **次は: 夜間の安全な実害バグは S1-S30 で深く枯渇。backlog 既起案の未踏観点は尽きた。日中候補（tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/reduced-motion 共有フック抽出）据え置き。新観点は色コントラスト/フォーカス順序など要レンダリング・要E2E領域＝日中レビュー向き。次セッションは「本日分完了」記録 or 日中候補の慎重実施を検討。**
>
> **状態 (2026-05-30 セッション29):** P0 全件 done/SKIP。P1 進行中・夜間の安全実害バグは S1-S29 で網羅的に枯渇を再々確認。
> S29: S28起案の観点㉔（**Label in Name / WCAG 2.5.3 Level A**）を全数監査＝**実改善6件**（音声操作ユーザーが可視ラベル発話で起動できるよう是正）。
> ①ホーム試験カードのランダム出題CTA（`9489858`）②ブログ記事末尾CTA（`54d1fc2`・indexable）③フッターXリンク（`14a40fb`・全ページ）④bookmarks「この問題を解く」（`1f99f13`）⑤模試「苦手分野を集中練習」（`79f32e2`）⑥結果シェアボタン QuizPlayer/MockExamRunner（`41573c4`）。
> 共通パターン: aria-label が可視テキストを**連続部分文字列として含まない**（別の言い回し or "（Twitter）で結果を" 等が割り込んで分断）。gold-standard（可視テキストを先頭に含む）へ統一。`.next` 実測 or source-read 回帰テストで検証。
> SKIP(実害ゼロ): ㉕autocomplete＝email/name 入力欄は全て autoComplete 保有／㉖inputmode＝数値入力(type=number/tel)が**そもそも不在**で moot／HomeReturningHeader の aria-label は role="group" コンテナ＝対象外(Explore 誤検出)。
> **教訓: Label in Name は「可視テキストが accessible name の連続部分文字列か」で判定。icon-only/コンテナ landmark/既に包含(note/LINE)は対象外。確認できた実害6件は修復済＝残存ゼロ(再監査不要)。**
> **次は: S28起案の残り㉒(table caption/colspan=機能追加寄り・実害判定慎重に)㉓(lang部分指定=おそらく実害ゼロ・確認のみ)。夜間の安全な実害バグは深く枯渇。日中候補据え置き。**
>
> **状態 (2026-05-30 セッション28):** P0 全件 done/SKIP。P1 進行中・夜間の安全実害バグは S1-S28 で網羅的に枯渇を再々確認。
> S28: S26起案の観点⑰⑱を全数監査（⑰デッドコード=component143/95export＋lib全export を網羅 grep で未参照ゼロ確定／⑱メモ化=SearchClient 精査で参照不安定の体感被害なし＝両者**実害ゼロ**）。
> 新観点「**データテーブルの th scope（WCAG 1.3.1 / H63）**」を開拓し**実改善4件**：①`/why-kakomon-ai`比較表（2軸・行見出しが裸td）を列scope=col+行scope=row化（`45644c7`）②`/recommended-books`書籍表（同型2軸）同様修復（`cf184b9`）③`QuestionBody`パイプ表の列見出しに scope=col（`2546b88`・/q中核）④`Markdown`/`BlogMarkdown`本文表に scope=col（`1877cc5`・AI解説/ブログ）。すべて `.next` 実測で scope 出力を確認。
> SKIP(実害ゼロ): simple単一ヘッダ表（stats ranking/demo/admin）は SR 自動推論で実害限定的＝夜間SKIP（admin は noindex 低優先）。
> **教訓: th scope 観点は一巡 done。indexable な実害（2軸 row-header 欠落×2 + content table レンダラ×2）は4件修復済（再監査不要）。simple表は SKIP 確定。デッドコードは exhaustive 監査でゼロ。**
> **次は: 夜間の安全な実害バグは S1-S28 で深く枯渇。下記「P1 新観点（S28 起案）」から1つ選び全数監査するか、日中候補の慎重実施を検討。**
>
> **状態 (2026-05-30 セッション27):** P0 全件 done/SKIP。P1 進行中・夜間の安全実害バグは S1-S27 で網羅的に枯渇を再々確認。
> S27: S26起案の観点⑲⑳㉑を全数監査。**実改善3件**＝⑲`CopilotPanel` の dangling aria-controls（"copilot-actions-popup" を指すが
> 対象 div に id 欠落＝隣接 quickActions は対で正・非対称バグ）を id 付与で解消（`94eb20f`・WCAG 1.3.1）。㉑**framer-motion の JS 駆動
> アニメは globals.css の prefers-reduced-motion 抑制を素通りする**（CSS animation/transition しか効かない）大発見＝`FireworksBurst`
> （全画面パーティクル爆発, `272290c`）+`ComboCounter`（連続バッジ spring 入場, `03bf2eb`）に matchMedia ゲートを追加（WCAG 2.3.3）。
> SKIP(全数監査=実害ゼロ): ⑳`<Button>` primitive は type 既定なしだが form 内 button は全て明示 type＝暗黙 submit リスクなし。
> **教訓: framer-motion(`motion.*`)は CSS reduced-motion を尊重しない＝個別 matchMedia ゲート必須。本リポの framer 利用は
> FireworksBurst/ComboCounter の2点のみで両方対処済（再監査不要）。aria-controls dangling は CopilotPanel 1件のみで解消。**
> **次は: S26起案の残り観点 ⑰（デッドコード/未参照 export スイープ・高信頼のみ削除）⑱（useMemo/useCallback 依存の参照不安定＝実測体感被害が
> ある場合のみ・理論は SKIP）。日中候補（reduced-motion 共有フック抽出 `usePrefersReducedMotion` を追加）。日中候補据え置き。**
>
> **状態 (2026-05-30 セッション26):** P0 全件 done/SKIP。P1 進行中・夜間の安全実害バグは S1-S26 で網羅的に枯渇を再々確認。
> S26: S25起案の未踏観点⑫〜⑯を**全数監査で完全消化**。**実改善1件**＝観点⑯の唯一の所見=死蔵 `app/mock-exam/MockExamClient.tsx`(423行)を削除(`0a7a8c7`)。
> /mock-exam は MockExamLanding→MockExamRunner(createHistoryStore 正API)で描画され当該旧実装は**どこからも未参照**(exhaustive grep)。
> 内包バグ: `LS_KEYS.history` を `as object[]` 誤解し spread→正準は `{entries,starredIds}` object のため既存履歴で throw(catch握り潰し)or 履歴ゼロで配列汚染。未参照=実害ゼロだが latent footgun を dead-code として除去(route 健全性不変を実測)。
> SKIP(全数監査=実害ゼロ): ⑫form-Enter=全 form 7箇所 onSubmit が preventDefault 済(+TagInput Enter も)/⑬高頻度リスナー=scroll は passive+trivial・他は低頻度/⑭XSS=dangerouslySetInnerHTML 2箇所は固定script+escape済JSON-LD、react-markdown(v10) は raw HTML 既定無効/⑮LCP画像=テキスト/SVG主体で raster LCP 不在・avatar は below-fold lazy 正。
> **教訓: react-markdown raw HTML 無効・raster LCP 不在・全 form preventDefault・scroll passive＝XSS/LCP/jank/Enter-reload の4クラスは構造的クリーン(再監査不要)。**
> **次は: S23/S25 起案の全観点(⑦〜⑯)消化済。下記「P1 新観点(S26 起案)」から1つ選び全数監査するか、デッドコード(未参照 component/export)の慎重スイープ(MockExamClient 同型の superseded 実装が他に無いか)を検討。日中候補は据え置き。**
>
> **状態 (2026-05-30 セッション25):** P0 全件 done/SKIP。P1 進行中・夜間の安全実害バグは S1-S25 で網羅的に枯渇を再々確認。
> S25: S23起案の最後の未踏観点⑧⑩＋新観点「id 衝突」を全数監査＝**全観点で実害ゼロを確定（コード無変更）**。
> ⑩`toLocaleString` locale 整合＝SSR'd の bare `toLocaleString()`（charCount/totalCount≈6,545/exam counts 等）は **node 既定 en-US ≡ ブラウザ ja-JP** で
> 当該桁（千〜万）のカンマ区切りが一致＝**hydration/視覚 mismatch 不能**。bare 日付描画は SSR 経路に不在（QuestionCommentBox は post-mount 投入・他は locale 明示済）。recharts formatter は client tooltip のみ。
> ⑧canonical/og:url 末尾スラッシュ整合＝`trailingSlash:false`（既定）＋全 canonical/og:url が絶対パス・末尾スラッシュ無し・クエリ無しで**構造上ズレ不能**（topic の category 正規化は S15 確認済の意図的 dedup）。
> id 衝突＝静的 id は全シングルトン要素、`.map` 内 id は全てユニークなテンプレートキー（subKey/sub.label/question.id）＝同一ページ重複なし。
> **教訓: bare `toLocaleString()` は千〜万の桁では en-US≡ja-JP でカンマ一致＝被害ゼロ（locale 正規化は日中の規約統一目的のみ）。canonical は trailingSlash=false＋絶対パスで構造的整合。**
> **次は: S23起案観点（⑦⑧⑨⑩⑪）は全て一巡 done。残は日中候補のみ。下記「P1 新観点（S25 起案）」から1つ選び全数監査するか、日中候補の慎重実施を検討。**
>
> **状態 (2026-05-30 セッション24):** P0 全件 done/SKIP。P1 進行中。
> S24: S23起案の未踏観点⑦⑨⑪を全数監査。**実バグ2件修復**＝観点⑨「非同期送信ボタンが `disabled` で a11y ツリーから
> 消え、進行/完了が SR に無通知（WCAG 4.1.3 status messages）」を中核2フローで是正＝S7(EmailLeadCapture) と同型クラス:
> ①`AfternoonPlayer`（C軸 午後AI採点の中核）採点中/完了を常設 role=status live region で通知（`9fb91a8`）
> ②`FeedbackGateModal`（§9 無料枠解放フロー・radix は内容差替を再アナウンスしない）送信完了を常設 live region で通知（`8b2ef84`）。
> SKIP(実害ゼロ): ⑦JSON-LD 数値/列挙＝全て描画件数一致＋schema.org 準拠で **mismatch ゼロ**（recommended-books の任意
> `numberOfItems` 未設定のみ＝警告も出ず追加は機能追加＝過大修正の罠回避）。⑪空配列/ゼロ状態＝public indexable 全ページ
> 全てガード済（length>0/empty-state/notFound/optional-chain・undefined 直描画や NaN 表示なし）。
> SKIP(日中候補): ⑨残り＝`EmailSignInForm`(noindex・成功 div の live 化に early-return restructure 必要)/`SchedulePlanner`
> (生成は client 高速計算で滞留小)。最小 diff で gold-standard を満たしにくく実害も中核2件より低いため夜間は見送り。
> **次は: ⑦⑪一巡 done(実害ゼロ)。⑨中核2件 done。残る S23 起案は ⑧canonical/og:url 末尾スラッシュ整合・⑩toLocaleString**
> **locale 整合。日中候補(tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/EmailSignInForm・SchedulePlanner live化)。**
>
> **状態 (2026-05-30 セッション23):** P0 全件 done/SKIP。P1 進行中・夜間の安全実害バグは枯渇を再々確認。
> S23: S22起案の未踏3観点を全数監査＝**全観点で実害ゼロを確定（コード無変更）**。
> ①useEffect cleanup leak（addEventListener 全21 .tsx）＝全て同一参照＋cleanup 完備で leak 不在。
> ②index-key × 位置依存 state の state-bleed（CopilotPanel messages/copiedIdx）＝append-only で既存 index 不変＝bleed 不能。
> ③非ユニーク React key の reconciliation バグ＝動的リスト key は全て安定ユニーク、index key は静的リスト限定、ComboCounter は意図的 remount。
> **重要な教訓（次セッションの重複監査・誤修正を防ぐ）**: 並行 Explore が CopilotPanel に2件 HIGH を出したが両方 **false positive**——
> (a)「dep が true→false で early-return し cleanup を飛ばし listener 積層」は **React が依存変化時に新 effect 本体の前に必ず前回 cleanup を実行する**ため leak 不能、
> (b)「新着メッセージで index シフトしコピーチェックが誤表示」は **append-only リストでは既存 index が不変**のため発生不能。
> → effect-cleanup / index-key 系の「理論上 leak/bleed」指摘は実読で大半が棄却される。実害が実測できない限り SKIP（過大修正の罠）。
> **次は: 下記「P1新観点（S23 起案）」から1つ選び全数監査するか、日中候補（tabs矢印キー/コピー通知統一/MilestoneToast 防御的ref化/exam meta desc短縮）の慎重実施を検討。**
>
> **状態 (2026-05-30 セッション22):** P0 全件 done/SKIP。P1 進行中。
> S22: S21起案の未踏3観点を全数監査。**実バグ1件修復**=`app/api/og/result/route.tsx` の数値クエリ解釈が
> `parseInt(get() ?? "0")` で **null しか捕捉しない half-implemented guard**（`?accuracy=`空 / `=abc`非数値 で NaN漏れ）
> →公開OG画像に "NaN%" 描画。兄弟 `/api/og` の `safeNumber` に統一し不正入力時0描画（`739109f`・PNG实測）。S20 focus-restore と同型の半端実装クラス。
> SKIP(全数監査=実害ゼロ): ①Number()×route param NaN伝播=全17箇所ガード済（og/result のみ漏れ→修復、NotificationSettings の Number(select値)は false positive）
> ②hydration mismatch=初期レンダー経路の裸 localStorage/Date/random/window 読取り不在（全て guard/effect/mounted で緩和）
> ③reduce無初期値/Math.max空配列/裸 array index=全て初期値・length ガード・optional-chain 付き（admin mock-data の Infinity は resolveRange で空不能=理論のみ）。
> **次は: 3観点とも一巡 done。夜間の安全な実害バグは S1-S22 で網羅的に枯渇。日中候補 or さらに未踏な観点**
> **（prop の readonly 違反 / useEffect cleanup 依存漏れ / メモ化キーの参照不安定 等）の開拓を検討。**
>
> **状態 (2026-05-30 セッション21):** P0 全件 done/SKIP。P1 進行中。
> S21: 新観点「共有データのインプレース破壊」を開拓・全数監査。**実バグ1件修復**=
> `lib/seo/topics.ts::getQuestionsByTopic()` が内部キャッシュ配列の参照を漏らし、呼び出し側 /topics/[slug] が
> 返り値に直接 `.sort()` して長寿命サーバで順序破壊する footgun を、getter のコピー返却で解消(`5b8e592`・テスト付)。
> 現状は単一決定 sort で可視被害ゼロだが getter-leaks-mutable-state の典型=将来 consumer で静かに破綻。
> 周辺4観点を全数監査=**実害ゼロ**: ①.sort/.reverse/.splice 全域(topics 以外は全て事前コピー=SAFE)
> ②localStorage/sessionStorage 書き込み(全 try/catch ガード済) ③`<time dateTime>`(全5箇所 valid ISO=観点③一巡done)
> ④stateful regex lastIndex(defect 不在) ⑤bare `.sort()` 数値字句順(全て文字列/ISO=正)。
> **次は: 夜間の安全な実害バグは深く枯渇。日中候補(tabs矢印キー/コピー通知統一/MilestoneToast 防御的ref化/exam meta desc短縮)or**
> **さらなる未踏観点(prop配列のレンダー内変異/Number()×route paramのNaN伝播/hydration mismatch)の開拓を検討。**
>
> **状態 (2026-05-30 セッション20):** P0 全件 done/SKIP。P1 進行中。
> S20: P1新観点⑤「モーダル閉時のフォーカス復帰」を全数監査。**focus-in したのに復帰しない半実装 defect を2件修復**=
> Copilot デスクトップ `CopilotDesktopFloating`(`133682d`)+モバイルシート `CopilotMobileSheet`(`1da513a`)。
> 開く際にパネルへフォーカスを移すのに閉じる際に FAB へ戻さず、キーボード利用者が body に取り残されていた(WCAG 2.4.3)。
> `fabRef`+`prevOpenRef` で閉じ遷移を検知し復帰(各テスト付き・stash で落ちることを実測)。
> SKIP: ⑤残り=radix Dialog 系は自動処理クリーン/KeyboardShortcutsHelp・ReviewOverlay 等は focus-in 無し=契約破れ無し
> (focus-trap 新設は overreach)。⑥ sitemap lastmod=E-5 で自動前進化済=成熟。① サーバー日付=blog は固定編集日付+`<time>`/
> 他は client 端末TZ=クリーン。**⑤⑥①観点を一巡 done。**
> **次は: P1新観点で残るは ③`<time dateTime>`(機能追加寄り=慎重に実害判定)。夜間の安全な実害バグは S1-S20 で枯渇傾向。**
> **日中候補(tabs矢印キー/コピー通知統一/MilestoneToast 防御的ref化)or 未踏観点の開拓を検討。**
>
> **状態 (2026-05-30 セッション19):** P0 全件 done/SKIP。P1 進行中。
> S19: S18起案の P1新観点を3クラス着手。**①日付TZ表示で実バグ1件を発見・修復**=
> `ReviewClient` の getTodayStr/getNextReviewDate が UTC日付で復習の期日境界が JST 09:00 に切替わり、
> JST 00:00〜09:00 は本日が期日の復習が隠れていた off-by-one。`jstDateString` へ委譲し JST 0:00 境界へ統一(`215f934`、テスト4件)。
> S16-S17 の JST境界テーマが「表示用日付/期日境界」にも残存していた横展開漏れを補完。
> ②soft404=全 dynamic route を全数監査し indexable は全て dynamicParams=false/notFound 保護・中間segmentはpage不在ハード404・
> tool/shareはnoindex=**実害ゼロ**。④CLS img=raw img 2件とも非indexable(寸法明示 or 高さ制約preview)=**実害ゼロ**。
> SKIP: StudyPlanClient input min(UTC日付だが days<=0 guard で無害=S17踏襲)。
> **次は: 未着手の S18新観点 ③`<time dateTime>`(機能追加寄り慎重に)・⑤フォーカストラップ/復帰・⑥sitemap lastmod 妥当性を**
> **全数監査するか、日中候補(d)MilestoneToast 防御的ref化(同型 S1/S4 で2回実害化・予防)を慎重実施。**
>
> **状態 (2026-05-30 セッション18):** P0 全件 done/SKIP。P1 進行中・夜間の安全実害バグは枯渇を再確認。
> S18: 独立した新観点2クラスを全数監査=**実害バグゼロを確定**(コード無変更)。
> ①数値表示破綻(>100%/NaN/0除算/配列境界/split): Explore提案5件を全て自己精査で棄却。
>   StudyPlan 0除算=days<=0 guard済 / essay split=context:string必須+静的データ / MetricsDashboard pct>100%=
>   fetchMetrics は常に mock 返却(PostHog未実装)で入力は常に0..1 + admin noindex / XFF空先頭=Vercel整形済で到達不能&逆に厳格化 /
>   ユーザー向け正答率は全て0除算ガード済。桁区切りも整合(大=toLocaleString/小=素)。
> ②effect・async正しさ(stale deps/fetch race/派生state/リスナー漏れ): Explore提案4件を全て棄却。
>   SearchClient履歴=result/query同時更新で整合(eslint-disable意図的) / CopilotPanel send=useCallback deps に
>   dailyLimit/feedbackSubmitted 含む+sendRef追従 / CloudSyncPanel=OAuthは全画面リダイレクトで再マウント /
>   DashboardOverview=React18でunmount後setStateはno-op・別マウントは別state。重複id/idrefも衝突なし。
> → S15-S17 の枯渇判定を独立観点で再確認。**過大修正の罠を回避しコード無変更**(worklog/backlog記録のみ)。
> **次は: 下記「P1新観点(S18起案)」から1つ選び全数監査するか、日中候補のうち最も自己完結・低リスクな**
> **(d)MilestoneToast 防御的ref化(同型が S1/S4 で2回実害化・予防目的)を慎重実施を検討。**
>
> **状態 (2026-05-30 セッション17):** P0 全件 done/SKIP。P1 進行中。
> S17: 冒頭で S16 の daysUntil コミット(`ff9f1df`)を含む HEAD の `pnpm build` 緑を再確認(コード変更不要)。
> S16 で lib/learning `daysUntil` を直した「JST境界 off-by-one カウントダウン」テーマを残り2箇所へ横展開し完了:
> ①`StudyPlanClient` のローカル daysUntil(UTC深夜 vs 端末ローカル深夜+Math.ceil)を lib版(JST)へ委譲(`920c235`)
> ②`nextExamSitting`「次回試験まで N 日」(ホーム HomeAuxSection・account KPI)を JST暦日ベースへ是正(`8201f0a`)。
> ②は JST 00:00〜09:00 に+1、かつ試験当日 JST 09:00以降は次回開催へ繰り上がる重い実害を含んでいた。
> 全域 grep でカウントダウン系 off-by-one の残存ゼロを実測(study-plan/generator・SchedulePlanner は端末ローカルTZで
> 内部一貫=バグなし)。SKIP: StudyPlanClient の input min が UTC日付(実害僅少・日中候補)。
> **次は: (a)StudyPlanClient min の JST化(日中)、(b)tabs.tsx 矢印キー(日中・影響大)、(c)コピー通知統一(日中)、**
> **(d)MilestoneToast ref化(日中)、(e)exam meta desc 短縮(日中)。夜間の安全な実害バグは S1-S17 で網羅一巡し枯渇傾向=新観点の開拓 or 日中候補の慎重実施を検討。**
>
> **状態 (2026-05-30 セッション15):** P0 全件 done/SKIP。P1 進行中。
> S15: 多数の新観点を監査(ほぼ全てクリーン)。実改善は admin `/admin/metrics` Section1 日次推移 LineChart に
> role=img+代替テキストを付与(`1732868`)=チャート alt-text(WCAG 1.1.1)を public(S10)+account(S11)+admin(S15)で
> **全面完了**。S11 が admin を日中候補 SKIP していたが足場(S6)解決済のため実施、近接表のある冗長チャートには
> 付与しない判断。監査クリーン: 見出し階層/画像alt/prefers-reduced-motion(globals.css に包括ルール在)/
> aria-current(SiteHeader 上位は両立・ドロップダウン等は視覚 active も無く不一致無し=機能追加回避)/非同期UX。
> **canonical 監査は Explore の HIGH 指摘が全て誤読**(modes/topic の ap→/modes/topic は正しい重複正規化、
> quiz/stream/mock-exam の base canonical 固定は意図的、相対 og:url は metadataBase で絶対化)=変更は SEO 有害で回避。
> **夜間に安全な実害バグは S1-S15 で網羅一巡し枯渇。** 次は (a)tabs.tsx 矢印キー/コピー通知統一/MilestoneToast ref化/
> exam meta desc 短縮(いずれも日中候補)、(b)未踏の機能ロジック観点(クイズ採点/履歴の境界条件)の開拓を検討。
>
> **状態 (2026-05-30 セッション14):** P0 全件 done/SKIP。P1 進行中。
> S14: 新観点「global keydown が修飾キーを無視しブラウザ/OSショートカットを奪う」を開拓・一巡。
> 3つのクイズプレイヤーの keydown ハンドラが Ctrl/Cmd/Alt を無視しており、Ctrl/Cmd+1-4(タブ切替)が
> 数字キー選択に、QuizPlayer では Ctrl/Cmd+R(再読込)がスター切替(r)に化けて preventDefault され
> ブラウザ/OS ショートカットを奪っていた。修飾キー時は早期 return するガードを横展開:
> ①QuestionAnswerCard(/q SEOランディング, `78e501d`) ②QuizPlayer(/quiz, `a982ac0`) ③StreamQuizPlayer(連続出題, `1315006`)。
> Shift はガードせず("?"ヘルプ等を維持)。各テスト付き(git stash で落ちることを実測)。
> getRecentIds(n*20) は意図的設計(直近2ラウンド除外/OfflineHome 20ユニーク)=SKIP、shuffleChoices 配列answer/重複textは
> 現状データに不在=理論のみ SKIP、他 keydown(Escape/"?")は無害=クリーン。
> **次は: tabs.tsx 矢印キー(日中・影響大)、コピー通知統一/MilestoneToast ref化/exam meta desc 短縮(日中)、**
> **admin チャート role=img(低優先)、SKIP 再評価・新観点の開拓。夜間に安全な実害バグは枯渇傾向。**
>
> **状態 (2026-05-30 セッション13):** P0 全件 done/SKIP。P1 進行中。
> S13: S5(AfternoonResultView)で確立した「不完全タブ契約→aria-pressed トグル」の決定を同型の残り2箇所へ
> 横展開し完了。①EssayIndustryTabs(/essays 業種別模範答案セレクタ・論文添削C軸, `6e4fb97`)
> ②QuestionListWithFilter(年度別一覧 /[exam]/[yearSeason] の解答状況フィルター・indexable, `8170b44`)。
> どちらも role=tablist/tab/aria-selected を使うが aria-controls/tabpanel/矢印キーを持たない不完全タブ→
> role=group + aria-pressed に統一(見た目・挙動不変・各テスト付き)。残る role="tab" は正当な共有 primitive
> tabs.tsx のみ(矢印キーのみ未対応=S5 で日中候補に SKIP 済)。aria-selected の orphan ゼロを grep 実測。
> 多クラス監査(dangling idref/form button type/positive tabIndex/skip link/main landmark/JSON-LD XSS/essays SEO)は全クリーン。
> **次は: tabs.tsx 矢印キー(日中・影響大)、コピー通知統一/MilestoneToast ref化/exam meta desc 短縮(日中)、**
> **admin チャート role=img(低優先)、SKIP 再評価・新観点の開拓。夜間に安全な実害バグは枯渇傾向。**
>
> **状態 (2026-05-30 セッション12):** P0 全件 done/SKIP。P1 進行中。
> S12: 新観点「コンテナ要素の ARIA ロール/命名の妥当性」を開拓・一巡。recharts(非interactive SVG)の
> role=img は正だが、interactive 子を持つ/role 無しで命名する2パターンは実害。①ホーム LearningCalendar の
> ヒートマップが role=img で focusable button 30個を隠していたのを role=group に是正(`c1de599`・高トラフィック)
> ②/account LearningHeatmap のコンテナが role 無し div への aria-label(命名禁止で無視)→ role=group 付与(`6713bf0`)。
> MockExamRunner の時間タイルは可視ラベルで冗長=実害なし(SKIP)。多クラス監査(アイコンボタン/入力欄モバイル属性/
> ゼロ除算/JSON.parse未ガード/リスナー解放漏れ)は全てクリーン。同型残存ゼロを grep 実測。
> **次は: dangling idref の app 全域スイープ(S12 は mock-exam のみ確認)、tabs矢印キー/コピー通知統一/**
> **MilestoneToast ref化/exam meta desc 短縮(日中)、admin チャート(低優先)、SKIP 再評価。**
>
> **状態 (2026-05-30 セッション11):** P0 全件 done/SKIP。P1 進行中。
> S11: 「データ可視化チャートの代替テキスト(WCAG 1.1.1)」を /account(noindex) チャートへ横展開し完了。
> ①DashboardProgress 習熟度レーダー(`e9d3710`) ②WeaknessHeatmapClient 分野別レーダー(`16bb265`)
> ③TutorClient 演習量バー(`8832c8a`)に role=img+aria-label を付与(additive・各テスト付き)。
> admin(funnel/metrics)チャートは内部運用ツール・低価値で SKIP。**チャート alt-text は public(S10)+account(S11)で完全一巡 done。**
> **次は: tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc 短縮(いずれも日中候補)、admin チャート(低優先)、SKIP 再評価、新観点の開拓。**
>
> **状態 (2026-05-30 セッション10):** P0 全件 done/SKIP。P1 進行中。
> S10: 「indexable ページのデータ可視化チャートの代替テキスト(WCAG 1.1.1)」を全 public チャートページで一巡。
> recharts チャートが role/aria-label を持たず SR 利用者が図の意味を得られなかった問題を是正。
> ①/stats 4チャート(`09885d4`) ②/transparency 2チャート(`969e533`) ③/ranking スコア分布(`b581146`)に
> `role="img"`+説明ラベルを付与(additive・視覚不変・各テスト付き)。
> perf(ISR/N+1)観点は Explore 提案が全て no-op(home=既static / modes/*=searchParams で dynamic 強制)と実測判定し SKIP。
> ranking の label 未関連付け指摘は wrap label の暗黙関連付け成立で false positive(SKIP)。
> **次は: /account チャート(DashboardProgress/WeaknessHeatmap)の role=img 横展開(noindex・日中候補)、または SKIP再評価。**
> **日中候補蓄積: tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc 短縮/api-og-result 未参照なら削除。**
>
> **状態 (2026-05-30 セッション9):** P0 全件 done/SKIP。P1 進行中。
> S9: 「SNS シェア時の OG 画像の到達性・速度・健全性」を一巡。①robots.txt `Disallow:/api/` が og:image
> 生成 `/api/og` を巻き込み遮断→`Allow:/api/og` で SNS スクレイパに解禁 (`6d86a70`・全28ページ波及)
> ②`/api/og` に long immutable キャッシュ付与（毎回再レンダー解消, `215a541`）
> ③`/api/og/result` の satori 多子 div 500 レンダー失敗を修復＋キャッシュ (`45f0e77`・現状未参照ルート)。
> sitemap×orphan 監査=クリーン(SKIP)、exam meta desc 長さ=content編集回避(SKIP・日中候補)。
> **次は: パフォーマンス(bundle/ISR/N+1)観点、SKIP再評価4周目。日中候補蓄積: tabs矢印キー/コピー通知統一/**
> **MilestoneToast ref化/exam meta desc 短縮/api-og-result 未参照なら削除検討。**
>
> **状態 (2026-05-30 セッション8):** P0 全件 done/SKIP。P1 進行中。
> S8: 「indexable ページからの内部リンク切れ(404)」観点を一巡。①/topics 索引のロングテール3件
> (`a0e0f16`) ②試験ハブ「通知設定」/account/notifications→/settings (`98d2cc9`)
> ③/glossary(54)・/keywords(16) の relatedTopics 計70件の存在しない /topics リンク→topicLinkHref()で
> /search フォールバック (`cff75d9`)。計74件規模の 404 内部リンクを解消。Explore で残存ゼロ確認。
> **次は: パフォーマンス(bundle/ISR/N+1)観点、または SKIP 再評価4周目。日中候補: tabs矢印キー/コピー通知統一/MilestoneToast ref化。**
>
> **状態 (2026-05-30 セッション7):** P0 全件 done/SKIP。P1 1〜3周目進行。
> S7: ステータスメッセージ(動的成功/失敗通知)の SR 可視性を一巡。EmailLeadCapture の送信結果トーストが
> role/aria-live 完全欠落だったのを ShareButtons の常設 live region パターンへ統一(WCAG 4.1.3, `8ac8960`)。
> stale-closure タイマー監査を lib/・app/ へ拡張(S5 は components/ のみで MilestoneToast 見落とし=訂正)。
> MilestoneToast は同型だが親が毎秒再レンダーせず latent のみ(実害なし)。
> **日中対応候補が蓄積: (a)tabs 矢印キー (b)コピーボタンの SR 通知統一 (c)MilestoneToast 防御的 ref 化。**
> **次は: パフォーマンス(bundle/ISR/N+1)観点、または SKIP 再評価4周目。**
>
> **状態 (2026-05-30 セッション6):** P0 全件 done/SKIP。P1 1〜2周目完了。
> 一巡 done: 領域1(ホーム)・領域2(/q SEO/OG)・領域3〜8(quiz/challenge/search/mock-exam/account/blog の A11y/SEO)・
> 領域9(エラー/404)。app 配下 OG 画像欠落は一掃済。stale-closure タイマー同型バグ全て修復(S1/S4)。
> **フォームコントロールのアクセシブルネーム/ラベル欠落をアプリ全体で完全一掃(S5+S6)** —
> S5:午後採点/論文添削/学習プラン、S6:FeedbackGate/午後デモ/admin期間ピッカー。
> placeholder-only な裸入力欄・外部リンクの rel 漏れ ともに残存ゼロを grep 実測。
> **次は 3周目: (a)tabsプリミティブの矢印キー対応(日中判断候補)、(b)パフォーマンス観点
> (bundle・ISR・N+1)、(c)これまでの SKIP の再評価、(d)未点検の細部(エラー説明の充実・空状態)。**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P0（フェーズ14 残・既知の致命傷候補）— ✅ 全件 done/SKIP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### P0-① /admin 503 → 401（コードのみで対処）
- 場所: `app/admin/page.tsx`（401/503 分岐あり）、関連 middleware/auth。
- 期待: 認証情報不足は 401（Unauthorized）を返すべき。503 は「サーバ/依存(KV/env)未設定」を示唆。
- 注意: **env/KV 起因（KV 未設定でコスト上限が inert 等）と判明したら直さず worklog に記録して SKIP。**
  コード側のロジックで 503 を返している箇所が誤りなら 401 に修正可。実害（管理者が正しく弾かれない 等）を確認してから。
- 検証: ローカル本番ビルドで未認証アクセス時の HTTP ステータスを curl で実測（401 を確認）。

### P0-② blog 問題数 2,398 → 2,381（SSOT 統一・網羅 grep）
- **要再確認（過大修正の罠あり）**: 既存ログ（post-phase13-cli-diagnostics, ux-overhaul-phase13-summary）によれば
  **main ソースに `2,398` は存在せず**、実機差異は **CDN/デプロイ stale (`X-Vercel-Cache: HIT`)** の可能性が高い。
- まず `grep -rn "2,398\|2398" app/ components/ lib/ data/ content/`（logs/ と __tests__ を除外）で **ソースに実在するか**確認。
  - 実在しない → これは夜間（コード）で直せる問題ではない。worklog に「SKIP: ソース不在・デプロイ stale 起因」と記録。
  - 実在する → 該当箇所を SSOT（indexable count 算出ロジック）参照に置換。`__tests__/seo/no-hardcoded-counts.test.ts`
    と `home-metadata.test.ts` が緑であることを確認。
- 検証: 修正後に網羅 grep でソース内の `2,398` 残存ゼロ、全数値テスト緑。

### P0-③ バッジ獲得トーストの 5 秒自動消滅を修復
- 場所: 実績/バッジ トースト関連コンポーネント（`grep -rn "toast" components/` で特定。achievement/badge 系）。
- 期待: トーストが無操作で約 5 秒後に自動消滅し、回答後コントロールを覆い続けない（致命傷⑧ で位置は上部へ移動済み・コミット c94339e）。
- 検証: localhost 本番ビルドへの Playwright E2E で「バッジ出現 → 無操作 5 秒待機 → トースト消滅」を実証。
  既存のトースト E2E があれば拡張。落ちる検証を必ず添える。

### P0-④ Q&A JSON-LD の任意警告 11 件削減（dateCreated に ISO + TZ）
- 場所: `lib/seo/question-jsonld.ts`（dateCreated 生成箇所）、テスト `__tests__/seo/question-jsonld.test.ts` / `tests/e2e/qa-schema.spec.ts`。
- 期待: dateCreated が TZ 付き ISO8601（例 `2024-04-21T00:00:00+09:00`）になり、Rich Results の任意警告が減る。
- 検証: `.next` 成果物 or localhost の JSON-LD を curl/grep で抽出し、dateCreated が TZ 付き ISO になっていること、
  question-jsonld テストが緑であることを実測確認。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1（全体スイープ・領域 × 観点ローテーション）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
P0 完了後に着手。**1所見 = 1コミット**。下記の「領域」を順に巡回し、各領域で「観点」を1つずつ点検する。
1周したら2周目に入り、前回 done のものは飛ばす。worklog に「領域/観点/結果」を必ず残す。

### 領域ローテーション（この順で巡回）
1. ホーム `app/page.tsx`
2. 問題ページ `/q`（SEO ランディング）
3. クイズ `/quiz`
4. チャレンジ `/challenge`
5. 検索 `/search`
6. 模試 `/mock-exam`
7. アカウント `/account`
8. ブログ `/blog`
9. エラー/ローディング画面（not-found / error / loading）

### 観点チェックリスト（各領域で）
- **A11y**: タップ領域 24px 以上 / フォーカス可視 / ARIA 適切 / キーボード操作（Tab・矢印・Enter・数字キー）。
- **SEO**: metadata 網羅（title/description/canonical/OG）/ description 文字数キャップ / canonical 自己参照 /
  内部リンク有無 / JSON-LD 妥当 / sitemap 実在 URL / orphan ページ無し。
- **コンテンツ数値 SSOT 整合**: 問題数など数値が単一情報源由来か（ハードコード混入が無いか）。
- **パフォーマンス**: 不要な `"use client"` 削減 / bundle 肥大 / ISR 設定 / N+1 的データ取得。
- **エラー・ローディング**: 適切な空状態・エラー UI・next-action があるか。
- **デッドコード / lint / ビルドコスト**: 明確に不要なコード・未使用 export・lint 警告の削減（明確なものだけ）。

### P1 の進め方
- 1セッションで領域1〜2個ぶんを点検し、実害ある所見を1件ずつコミット。
- 「理論上の指摘・実害なし」は SKIP（worklog 記録）。
- 観点が出尽くした領域は worklog に「領域X 一巡 done」と記録し次の領域へ。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1 新観点（S18 起案・未踏。次セッション以降で全数監査せよ）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
S1-S18 で a11y名/aria-live/チャートalt/タブ/aria-current/OG/robots/dead-link/canonical/sitemap/
stale-timer/JST境界/keydown修飾/数値破綻/effect-async を網羅一巡。**まだ全数監査していない観点**:

- **①ユーザー向け日付の TZ 表示**: countdown(残り日数)は JST 是正済だが、**表示用の日付文字列**
  (`toLocaleDateString`/`new Date(...).toISOString().slice(0,10)` 等)が JST 00:00〜09:00 に前日表示しないか。
  特に server component で render される日付。client は端末TZ(JS人=JST)で概ね安全だが要確認。
- **②soft 404**: 既知の無効動的ルートが HTTP 404 を返すか(`notFound()` 経由)、それとも 200 でフォールバック
  描画していないか。SEO 実害(soft 404 は index 汚染)。`.next` 成果物 or localhost の status を curl 実測で。
- **③`<time dateTime>` セマンティクス**: 日付テキストに `<time>` 要素が使われているか(SEO/a11y の軽微改善・
  ただし「壊れ」でなければ機能追加=overreach の可能性。実害判定を慎重に)。
- **④画像の width/height 明示(CLS)**: raw `<img>`/next `<Image>` で寸法未指定がレイアウトシフトを起こさないか。
- **⑤フォーカストラップ/復帰**: モーダル(FeedbackGateModal/Dialog 系)を閉じた後にフォーカスがトリガーへ戻るか。
- **⑥sitemap lastmod の妥当性**: lastmod が実コンテンツ更新を反映するか・固定値で陳腐化していないか。
注意: 上記はいずれも「壊れ(実害)」が確認できた場合のみ最小 diff で修正。理論のみは SKIP(過大修正の罠)。
夜間は枯渇傾向のため、各観点とも**全数監査して『実害ゼロ』を記録するだけでも有効な成果**(次セッションの重複監査を防ぐ)。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1 新観点（S23 起案・未踏。次セッション以降で全数監査せよ）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
S1-S23 で a11y名/aria-live/チャートalt/タブ/aria-current/OG/robots/dead-link/canonical/sitemap/stale-timer/
JST境界/keydown修飾/数値破綻/effect-async/focus-restore/localStorage-guard/time-element/regex-lastIndex/
array-mutation/cleanup-leak/index-key-bleed/非ユニークkey を網羅一巡。**まだ全数監査していない観点**:

- **⑦JSON-LD の数値/列挙の妥当性**: 構造化データ（Quiz/Question/Article/BreadcrumbList/ItemList 等）の
  `position`/`numberOfItems`/`itemListElement.length` が実描画件数と一致するか、列挙値（@type/inLanguage 等）が
  schema.org 準拠か。`.next` 成果物 or localhost の JSON-LD を抽出して実測（理論でなく出力値で判定）。
- **⑧canonical/og:url の絶対URL・末尾スラッシュ整合**: 動的ルートの canonical が trailing-slash / クエリ有無で
  自己参照とズレないか（重複正規化の崩れ）。※S15 で base canonical 固定は意図的と確認済＝その判断を尊重し「壊れ」のみ拾う。
- **⑨`disabled`/`aria-disabled` ボタンのキーボード到達性**: 送信ボタン等が `disabled` で読み上げから消える vs
  `aria-disabled` で理由を伝えるか。送信中スピナーの aria-busy 有無（実害＝SR が完了/失敗を把握できるか）。
- **⑩数値の桁区切り・単位の i18n 整合**: `toLocaleString` の locale 未指定で SSR/CSR 不一致 or 環境差が出ないか
  （hydration mismatch は S22 で別途確認済だが「数値整形」観点では未走査）。
- **⑪空配列/単一要素時の文言の単複・ゼロ状態**: 「N 問」「N 件」等がゼロ/1件で不自然にならないか、空リストの
  empty-state UI と next-action があるか（領域横断で indexable ページ優先）。
注意: いずれも「壊れ(実害)」が実測できた場合のみ最小 diff で修正。理論のみは SKIP（過大修正の罠）。
各観点とも**全数監査して『実害ゼロ』を記録するだけでも有効な成果**（次セッションの重複監査を防ぐ）。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1 新観点（S25 起案・未踏。次セッション以降で全数監査せよ）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
S1-S25 で a11y名/aria-live/チャートalt/タブ/aria-current/OG/robots/dead-link/canonical(末尾スラッシュ)/sitemap/stale-timer/
JST境界/keydown修飾/数値破綻/effect-async/focus-restore/localStorage-guard/time-element/regex-lastIndex/array-mutation/
cleanup-leak/index-key-bleed/非ユニークkey/JSON-LD数値/空配列ゼロ状態/toLocaleString-locale/id衝突 を網羅一巡。**まだ全数監査していない観点**:

- **⑫`<form>` の暗黙送信・Enter キー挙動**: 単一 input の form で Enter が予期せぬ送信/リロードを起こさないか、
  検索/コメント等の `onSubmit` が `preventDefault` を持つか（実害＝Enter でページ遷移/状態喪失）。
- **⑬`scroll`/`resize`/`mousemove` 等の高頻度リスナーの未スロットル**: passive 指定や rAF/throttle 無しで
  メインスレッドを圧迫しないか（実害＝モバイルでのスクロールジャンク。S23 で leak は確認済だが「頻度」観点は未走査）。
- **⑭`dangerouslySetInnerHTML` / `react-markdown` の sanitize**: ユーザー入力（コメント/フィードバック）や
  外部由来文字列が unsanitized で innerHTML に流れていないか（実害＝XSS。S13 で JSON-LD XSS は確認済だが本文描画は未走査）。
- **⑮`Image`/`<img>` の `loading`/`fetchpriority` 整合**: above-the-fold の LCP 画像が `loading="lazy"` で
  遅延されていないか、逆に below が eager で帯域を食っていないか（実害＝LCP 悪化。CLS=④は S19 で確認済）。
- **⑯`localStorage` の JSON.parse 結果の型ガード**: 破損 or 旧スキーマの値を読んで `undefined.foo` で落ちないか
  （実害＝永続データ破損時の白画面。S21 で書き込み try/catch は確認済だが「読み取り後の形状」は未走査）。
注意: いずれも「壊れ(実害)」が実測できた場合のみ最小 diff で修正。理論のみは SKIP（過大修正の罠）。
各観点とも**全数監査して『実害ゼロ』を記録するだけでも有効な成果**（次セッションの重複監査を防ぐ）。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1 新観点（S26 起案・未踏。次セッション以降で全数監査せよ）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
S1-S26 で a11y名/aria-live/チャートalt/タブ/aria-current/OG/robots/dead-link/canonical/sitemap/stale-timer/JST境界/
keydown修飾/数値破綻/effect-async/focus-restore/localStorage-guard(読書両方)/time-element/regex-lastIndex/array-mutation/
cleanup-leak/index-key-bleed/非ユニークkey/JSON-LD数値/空配列ゼロ状態/toLocaleString-locale/id衝突/form-Enter/高頻度リスナー/
XSS/LCP画像 を網羅一巡。**まだ全数監査していない観点**:

- **⑰デッドコード/未参照 component・export のスイープ**: S26 で死蔵 `MockExamClient` を発見・削除した実績あり。
  同型の **superseded 旧実装**（page から未 import だが残存）や未使用 export が他に無いか。判定は「exhaustive grep で
  `app/components/lib` 内 import 0件＋（あれば）置換した現行実装の存在」を**高信頼で**確認できる場合のみ削除（dynamic import/
  barrel re-export/string 参照の見落としに注意）。確証が持てなければ SKIP（夜間の削除は高信頼のみ）。
- **⑱`useMemo`/`useCallback` の依存配列の参照不安定**: deps に毎レンダー新生成される object/array/inline 関数を入れて
  メモ化が無効化（=毎回再計算）していないか。実害＝重い計算の無駄な再実行 or 子の不要再レンダー。S22 で「メモ化キーの
  参照不安定」を候補に挙げたが未走査。**ただし実測可能な体感被害がある場合のみ**（理論上の再計算は SKIP＝過大修正の罠）。
- **⑲`aria-expanded`/`aria-controls` の状態同期**: 開閉する disclosure/dropdown/accordion/メニューで `aria-expanded` が
  実際の開閉 state と同期しているか（開いているのに false のまま等）。SR 利用者に開閉状態が誤伝達される実害。
- **⑳`<button>` の `type` 属性欠落による暗黙 submit**: `<form>` 内の `<button>` が `type="button"` を持たず既定 `type="submit"`
  になり、意図せず form 送信を誘発しないか（⑫の form-Enter とは別系統＝クリック経路）。S13 で「form button type」を
  クリーンと記録済だが**新規追加分の再確認**＝最小監査。
- **㉑`prefers-reduced-motion` 未対応のアニメーション**: framer-motion/CSS transition の中で reduced-motion を無視して
  動く要素が残っていないか（S15 で globals.css に包括ルール在を確認済だが、JS駆動アニメ＝framer の個別 `animate` が
  メディアクエリを見ているか未走査）。前庭障害ユーザーへの実害。
注意: いずれも「壊れ(実害)」が実測できた場合のみ最小 diff で修正。理論のみは SKIP（過大修正の罠）。
各観点とも**全数監査して『実害ゼロ』を記録するだけでも有効な成果**（次セッションの重複監査を防ぐ）。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1 新観点（S28 起案・未踏。次セッション以降で全数監査せよ）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
S1-S28 で a11y名/aria-live/チャートalt/タブ/aria-current/OG/robots/dead-link/canonical/sitemap/stale-timer/JST境界/
keydown修飾/数値破綻/effect-async/focus-restore/localStorage-guard/time-element/regex-lastIndex/array-mutation/
cleanup-leak/index-key-bleed/非ユニークkey/JSON-LD数値/空配列ゼロ状態/toLocaleString-locale/id衝突/form-Enter/高頻度リスナー/
XSS/LCP画像/デッドコード/メモ化/aria状態同期/暗黙submit/reduced-motion/**table-th-scope** を網羅一巡。**まだ全数監査していない観点**:

- **㉒`<th>` 以外の table セマンティクス**: 複雑な data table に `<caption>`（表の説明）があるか、`colspan`/`rowspan` を
  持つ表で見出し関連付けが壊れていないか。※ S28 で th scope は一巡＝**simple単一ヘッダ表への scope 追加は SR 自動推論で
  実害なし＝SKIP 済**。caption 欠落も「壊れ」ではなく機能追加寄り＝実害判定を慎重に（overreach の罠）。
- **㉓`lang` 属性の部分指定**: 日本語ページ内の英略語/コードが多いが、`<html lang="ja">` のみで部分的な lang 切替が
  必要な箇所は実用上ほぼ無い（IPA 用語は日本語読みが正）＝**おそらく実害ゼロ**。確認のみ。
- **㉔`aria-label` と可視テキストの不一致（WCAG 2.5.3 Label in Name）**: アイコン+テキストのボタンで aria-label が
  可視ラベルを**含まない**と音声操作ユーザーが起動できない。S1-S27 でアクセシブルネーム欠落は一掃したが「可視ラベルと
  aria-label の包含関係」は未走査。実害＝音声コントロール非対応。
- **㉕`<input>` の autocomplete 属性**: メール/名前等の入力欄に適切な `autocomplete`（email/name 等）が付くか
  （WCAG 1.3.5 Identify Input Purpose・モバイル入力支援）。EmailLeadCapture/ContactForm/EmailSignInForm 等。
  実害＝モバイルでの自動補完が効かず入力負荷増（ただし「壊れ」ではないため実害判定を慎重に）。
- **㉖number/tel 入力の inputmode**: 数値入力（年度フィルタ等）に `inputMode="numeric"` があるか（モバイルで数字
  キーパッドが出るか）。実害＝モバイル UX（CLAUDE.md のモバイル片手操作最優先に直結）。
注意: いずれも「壊れ(実害)」が実測できた場合のみ最小 diff で修正。理論のみは SKIP（過大修正の罠）。
各観点とも**全数監査して『実害ゼロ』を記録するだけでも有効な成果**（次セッションの重複監査を防ぐ）。
**特に㉔（Label in Name）と㉖（inputmode モバイル）は実害が出やすい候補。**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## メモ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- 既知の env/KV 起因事象（§0 コスト上限 inert・SLACK 未設定・/admin 503 の一部）は **コードで直せない**。SKIP 対象。
- 承認必須事項（モデル変更・価格/無料枠変更・プロンプト大幅変更・依存メジャー更新 等）は自律実行禁止。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## P1 追記（S45・2026-05-30）— 日中候補に追加
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- ~~**vitest 解決クォーク**~~ → **S46 で phantom と断定・削除**。S45 が「`@/lib/seo/related-content`・
  `@/lib/seo/success-stories` が vitest で解決不能」と記録したが、**これらのパスにファイルが存在しない**
  （blind harness 下で存在しないパスを import していただけ）。実体は `lib/blog/related-content.ts`・
  `data/success-stories/index.ts`・`lib/blog/related-questions.ts` で、いずれも正常に解決し S46 でテスト追加済。
  **vitest 解決クォークは存在しない＝再調査不要。**
- S36「latent 残り3件」(mock-scores/mock-exam-storage/custom-tags) は S45 で再検証＝**全て latent 確定**
  （removeItem/clear amplifier が app 不在）＝S36 分類は正しい・再監査不要。共有EMPTY footgun テーマ完全枯渇。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 状態追記（S46・2026-05-30 18:26 JST）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- S46: S45「vitest解決クォーク」を phantom と断定（上記）＋ 関連リンク純関数3件を契約固定（実改善0・source 無変更）。
  ①`lib/blog/related-content.ts`(getRelatedBlogPosts・`15324b7`) ②`data/success-stories/index.ts`(アクセサ群・`6c6a465`)
  ③`lib/blog/related-questions.ts`(getRelatedQuestionsForPost＝ブログ→/q 内部リンク網・`dec304b`)。test 705→730・118→121 files・全緑。
- **教訓: characterization テストは独立に期待値を構築せよ**。related-questions の year降順は当初 top-N slice の
  pairwise 比較では検出できず（最新年が ≥50問で slice が同一年に収まる）、プールから maxYear を独立算出して head 照合する形に強化した。
- 次は: 夜間の安全な実害バグ・未テスト純関数とも S1-S46 で枯渇。残は search-index(private・export 追加=日中向き)のみ。
  日中候補群は不変。新規夜間タスクは S33角度(属性有無で見落とした同型 a11y)の二次監査が残る有効角度。
