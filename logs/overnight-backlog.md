# 夜間自律改善 バックログ（優先度順）

更新ルール: 着手前に必ず worklog で done/SKIP を確認（二重実装防止）。1所見=1コミット。
P0 をすべて done/SKIP にしてから P1 へ。P1 は「領域 × 観点」をローテーションしてまんべんなく回す。
判断に迷う/実害が無い指摘は直さず worklog に SKIP として記録（過大修正の罠を避ける）。

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
