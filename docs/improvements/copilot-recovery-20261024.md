# Copilot 診断・ローカル修正票（2026-10-24）

## 判定

**本番 API 復旧・公開・10 回すべての PDCA 完了認定は未了。** ローカルの診断情報と失敗時 UX を修正し、実 Chrome で改善を再検証した。10 観点のうち 8 観点は UI の改善・再検証まで実施、C1/C3 の実モデル品質は未検証。実 OS キーボードと responsive 間の会話共有も残る。fixture 成功を実 API 成功と数えない。

- 独立コピー: `C:\Users\kanet\Documents\Codex\2026-10-24\task-43\copilot-work`
- branch: `fix/copilot-recovery-pdca-20261024`
- 取得元: `https://github.com/kameking-lab/ipa-quiz-site.git`（公式 Git clone）
- 最新main向けpatchのbase: `0a79ccec11f30e0e8cbcea3e7bc660649101fdce`
- 元の修正・実Chrome・99件テストのbase: `cdf278be5f8774583419b75eca20abe08fcfdb56`。元コピー・staged差分・元patchは保全。
- 指定された正確な最新main SHAを公式originから取得し、別のdetached検証worktreeへ14-file patchを競合なく適用した。他branchは操作していない。最新main上の追加回帰は下記の依存再利用の拒否により未実施。
- PR780・他担当の branch/worktree/port/process を変更していない。最新 main への rebase は公開前の別工程。
- push、PR 作成、CI、Vercel build/deploy、merge は行っていない。

## 実際の本番観測

正式 CUA で公開学習画面から通常の質問を **1 回**送信。

| 項目 | 観測 |
| --- | --- |
| Route | `/quiz?mode=year&exam=ip&year=2011&season=autumn&session=am&question=ip-2011a-am-q1` |
| 問題 | `ip-2011a-am-q1`（OJT）・未選択 |
| 入力 | 「答えはまだ示さず、OJTという用語を短く説明してください。」 |
| Request | `POST /api/copilot` |
| Response | HTTP 200、`text/plain` |
| 許可されたヘッダー | `X-Provider: gemini`, `X-Model: gemini-3.8-flash`, `X-Timeout-Ms: 35000`, `X-RAG-Enabled: 1` |
| 本文・画面 | `[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。` |
| UX 欠点 | エラーを回答として出典未確認・関連問題と一緒に表示。入力が空になる。textarea の maxLength は -1。 |

X-Model は**サーバが選んだモデル設定**の証拠であり、Google 側が生成開始した証拠ではない。観測は「本番のモデル設定が 3.8、provider/stream 内で失敗」。upstream HTTP/provider code が旧実装で失われ、本番ログにもアクセスできないため、認証・モデル利用権・quota・上流障害・parser のどれが実原因かは未確定。

この 1 回は pre-provider の `rate_limit_unavailable` 503 と異なる。KV の欠落／不達で 503 になる別経路はソースで確認し、fail-open 化はしていない。本番 build SHA は権限上確認できず、main と完全一致とも断定しない。

320px の本番画面も観察し、responsive 切替で表示中の会話が失われることを確認。修正後画面の証拠ではない。保存画像: task の `evidence/production-mobile-before.jpg`。

## モデル・実装経路

- 最新のテキスト用 Flash は安定版 `gemini-3.8-flash`、2026-09-02 GA。main は既にこのモデル。モデル廃止が今回の原因という根拠はない。
- 公式モデル: https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash/
- リリース: https://ai.google.dev/gemini-api/docs/changelog
- 廃止情報: https://ai.google.dev/gemini-api/docs/deprecations
- REST の公式構成: https://ai.google.dev/gemini-api/docs/generate-content/whats-new-gemini-3.8
- Copilot の経路は `app/api/copilot/route.ts` / `app/api/copilot/exam-library/route.ts` → `gemini-flash38.ts` → `streaming.ts`。
- `v1beta/models/gemini-3.8-flash:streamGenerateContent?alt=sse`、`generationConfig.thinkingConfig.thinkingLevel: "low"`。モデル ID の二重定義を共通定数へ寄せた。
- 旧 `@google/generative-ai` 0.24.1 は別の採点処理が使用。今回の REST Copilot には SDK 全面移行を加えていない。
- サーバの生成 timeout 35 秒は維持。client に 45 秒 watchdog。client disconnect／Stop は AbortController で伝播。
- ローカルプロセスで `GEMINI_API_KEY`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` の**存在だけ**を確認し、すべて未設定。本番の変数存在は未確認。キー値・既存秘密・sessions は読んでいない。

## ローカル修正

`CopilotFailure` / `CopilotErrorInfo` は固定の code と bounded な HTTP status、allowlist provider code、0〜86400 秒の retry-after のみ。raw body、prompt、キーをエラー本文や監視へ渡さない。

| 入力／状況 | 分類・挙動 |
| --- | --- |
| 401 / 403 | 接続設定・権限、同じ質問の再試行なし |
| 402 / 404 / 400 | 残高 / モデル / パラメータ、同じ質問の再試行なし |
| 明示的 `QUOTA_EXCEEDED`、app daily limit | quota、同じ質問の再試行なし |
| 明示的 `RATE_LIMIT_EXCEEDED`、app minute/hour limit | 短期制限、手動の再試行 |
| 429 `RESOURCE_EXHAUSTED` だけ | 原因未確定として扱う。daily と短期 rate を推測しない |
| 503 / 504、500 `INTERNAL` | 一時障害、手動の再試行 |
| 空本文／不正 SSE／途中終了 | no_text / malformed_stream / truncated |
| MAX_TOKENS | 部分回答の警告、成功履歴から除外 |
| STOP 以外の SAFETY / RECITATION / OTHER / finish 欠落 | 正常完了と扱わない |
| 生成 timeout / 月間予算 | timeout / monthly_budget を分離 |

自動再試行はしない。既存の IP 制限・KV 必須条件・月額 5 万円 cap を維持。既知の request/auth/quota HTTP 拒否は生成費用を加算せず、5xx・未知障害・中断・部分応答は保守的計上を維持する。

HTTP 200 の text/plain を維持し、末尾に `\n\n<!--copilot-error:{...}-->` を送る。client は allowlist code と bounded retry-after のみ受理。途中の marker を非表示にする。旧サーバ向けには既存の正確な日本語 fallback 段落と応答末尾／既知引用 footer だけを認識し、通常本文・コード例の `[エラー]` 等は保持する。

失敗 marker を監視送信より先に enqueue。監視待ちは 2 秒まで。費用計上 callback は従来どおり close 前に await（KV/通知側には既存 1.5 秒 request timeout）。監視リクエスト自体をキャンセルする変更ではない。

IPA パネルは request ごとの AbortController identity と question-change cleanup で stale callback を除外。Stop 時に identity を先に無効化し、旧 finally が新 request の表示を変更しない。exam-library は exam/question の key ごとに session を分離。同時二重送信を同期 ref で抑える。

失敗した turn と部分回答を次回 API／保存履歴から除外し、再試行は同じ turn を置換。質問と別の新しい下書きを保持する。IPA は最新 9 pair＋現在の user、各 4000 文字以下、exam-library は最新 5 pair＋user、各 3000 文字以下で明示的省略文を添える。

その他: 未解答ヒント directive、現在の選択表示、IME Enter 抑止、文字数表示、手動停止、障害時の掲載解説への導線、読み返し中の scroll 保持・新着への移動ボタン。

実 Chrome で追加発見した Stop click の default submit を preventDefault で防止。閉じる際にパネルを保持し、生成を中止して同じ wrapper 内の会話・下書きを再開できる。非表示時は音声認識の全 callback を無効化して停止し、共有 portal も閉じる。600px 以下の高さではクイックアクションを折りたたみ、モバイルシートの上余白を縮めて解説・入力領域を確保する。新しい永続 storage は追加していない。

## 10 サイクルの進捗

2026-10-24、修正差分を実 Chrome で操作。desktop は 1236×1188、mobile は 390×844 / 320×480。320×480 は高さ縮小によるキーボード相当の検証であり、実 OS キーボードではない。対象差分は本書を含む最終patch（baseは冒頭、SHA-256は引継ぎに記載）、全て port 3297。同じ操作の繰り返しを別サイクルとして数えていない。

下表の実Chrome操作は元base `cdf278b` 上で行ったもの。最新main上でのブラウザ再実行はしていない。13コード・testファイルの内容は同一で、実UI8観点確認・C1/C3実Gemini未確認という状態を維持する。

- IPA route は本番観測と同じ query の `question=` を q1 / q2 / q99 に変更したもの。q1=OJT、q2=CIO、q99=最終掲載問（77/77）。q100 は図表掲載条件により一覧外と表示されたので完了検証に用いない。
- 資格 route は `/e-learning/exams/lckohyo-LC20260414-1`、question ID は `lckohyo-LC20260414-1-q1` / `q2`。
- mock は鍵なしの通常ローカル API。fixture は Chrome CDP で上記 Copilot endpoint の Fetch だけを置換。外部 Google 呼出しなし。C8 だけ一時ローカル mock provider に長文＋15秒遅延 chunk を追加し、検証後は元に戻して差分ゼロを確認。

| # | Plan：観測と仮説 | Do：最小修正 | Check：実操作と結果 | Act：残課題 |
| --- | --- | --- | --- | --- |
| 1 | 未解答でも正解資料が prompt に入りネタバレのおそれ（source） | ヒント優先 directive・未解答表示 | IPA q1 未選択→質問→通常 mock 200。prompt unit も PASS。本番1回はエラー | **未完了**。実モデルでネタバレしないか確認 |
| 2 | 現在の選択 context が見えにくい（source） | 問題番号・選択・正誤表示 | IPA q1 イ誤答→質問で selectedChoice=イ/isCorrect=false。資格q1 1誤答→質問→もう一度→3正解→質問、selectedChoice が1→3、いずれも messages=1 | UI PASS。採点後のIPA直接変更は仕様上不可。資格の選び直しで更新確認 |
| 3 | 正誤・誤答肢の比較が必要（source） | 選択済み directive と掲載解説への照合導線 | IPA q2 イ正解→質問→CIO/CFO比較fixture表示。資格q1 1誤答の掲載肢別説明から質問。route unit PASS | **未完了**。fixture説明はモデル品質の証拠ではない |
| 4 | IME確定Enterで送信、UI/API文字数不整合（source、本番maxLength=-1） | composing/229 guard、4000字制限・counter | IPA q1 CDP synthetic composition→Enter=0 request、ShiftEnter=0、通常Enter=1。DOM maxLength=4000。unit 4000/4001字 PASS | browser synthetic IME PASS。実OS IME／screen readerは未検証 |
| 5 | 320×480で入力欄bottom477.7、解説領域が極小（実観測） | 短い高さでactions折畳み、上余白縮小、注記短縮 | q2 390×844→320×480→長文。最終log141px、textarea bottom443.5<480、document width305<320。再開・入力・送信操作可能 | responsive寸法 PASS。実OS keyboardは別確認 |
| 6 | 送信中の連打、Stop clickで別draftが誤送信（実観測1request） | 同期ref、即中止、Stopのdefault action取消 | q1 pending→別draft→Enter連打追加0→Stop。修正前余分な送信1、修正後0、draft保持・Send復帰。unit watchdog/旧callbackもPASS | 実操作 PASS。Google側の実キャンセル計上は未確認 |
| 7 | 本番200内エラーが回答扱い・入力消失（実観測） | typed failure、原文保持、同turn再試行、静的解説へ復帰 | q1 200内temporary→503fixture→別draft→retry:成功pair＋元質問=3 messages、失敗turn重複なし、別draft保持。q2 quota:Retry0/Send disabled/Enter追加0→問題復帰。資格q1 timeout→原文保持→retry messages1→成功fixture | 障害UX PASS。**実provider復旧は別 gate** |
| 8 | 全chunkのsmooth scrollが読み返しを奪う（source） | 底部48px内だけ追従、新着へ移動 | q2 長文stream中に上へスクロール→追加chunk後もscrollTop3580維持。ボタンで5068+clientHeight141=scrollHeight5209へ復帰 | 実stream fixture PASS。temporary provider差分ゼロ |
| 9 | 次問で旧catch/finally混入、長文履歴でvalidation拒否（source） | controller identity・question reset・成功pairのbounded context | IPA q1遅延request→close→次q2→イ選択→質問、q2/イ/true/messages1。旧request取消を確認。資格q1→q2→前へで旧AI会話混入なし。unitで遅い旧応答と19messages/4000字上限 PASS | 実取消とcontext分離 PASS。旧応答到着後のguardはunit証拠と区別 |
| 10 | close/reopenで会話とdraft消失（実観測） | 同wrapper内を保持し非表示時に生成・音声停止 | q2 完成回答＋draft→close:dialog0/focus FAB→reopen双方保持。mobile pending→close→reopen busy0/draft保持。q99選択→mock質問→回答→結果→クイズ完了1/1→最後の問題をAIに質問でq99/イ正解context | 同wrapper再開・完了導線 PASS。responsive間・問を跨ぐ会話復元は未対応 |

Astra が各進捗をレビューし、C2/C5/C6/C7/C8/C9/C10 の実操作証拠を確認。C4 は synthetic IME と明記。nonretryable Enter bypass、別draft消失、STOP以外の成功判定、通常本文sentinel誤検出、保持時の旧音声callback競合を修正。最終追加 P1/P2 なし。**C1/C3 と本番復旧の未了により、10回全体の完全完了認定は保留**。

証跡は task の `evidence/` に保存: `local-c01-mock.jpg`, `local-c05-mobile390.jpg`, `local-c05-mobile320-after.jpg`, `local-c06-stop.jpg` / `local-c06-stop-after.jpg`, `local-c07-retry.jpg`, `local-c07-quota-mobile.jpg`, `local-c08-scroll.jpg`, `local-c09-next-context.jpg`, `local-c10-resume.jpg`, `local-c10-final.jpg`, `local-exam-retry.jpg`, `local-exam-return.jpg`。スクリーンショット単体を pass 根拠にせず、上表の操作・payload件数・寸法を併用。

## 元baseでの検証とリソース

- frozen lockfile install（pnpm 10.33.0）、Prisma client generate。DB 操作なし。
- 対象 ESLint: 最終変更後の13コード・testファイルすべて PASS。
- 全体 `tsc --noEmit --incremental false`: PASS。初回の壊れた `.next` 生成物を自分のコピー内だけ消して typegen。2 GiB OOM 後、9.72 GiB physical free／7.70 GiB commit headroom を確認し4 GiBで単独実行。検出された型2件を修正して通過。
- 最終 Vitest: **10 files / 99 tests PASS**（34.80秒、1 worker、2 GiB heap）。`errors` 18、`gemini-flash38` 15、`streaming` 12、`prompt-assembly` 16、`CopilotPanel.recovery` 11、`CopilotPanel.aria` 3、`CopilotDesktopFloating.focus` 4、`exam-library-copilot-recovery` 7、API `copilot` 8、API `exam-library-copilot` 5。すべて mock/fixture、Google 呼び出しなし。
- Next は専用 3297、他作業の 3219/3237/3257/3267/3277 を操作しない。自分の Next session は停止済み。
- 修正後の実 Chrome 検証は上表のとおり実施。full production build は未実施。Vercel build は未承認。
- 最終型検査前の Win32 実測: physical free 13.24 GiB、commit 51.96 / 63.98 GiB、CPU 19.1%。Next を止めてから重い処理を1工程ずつ実行。
- 最終変更後の全体型検査: PASS。追加testに混入したPlaywright固有の`exact`指定2件をTesting Library向けに除去して再実行した。
- その型修正後、該当 `CopilotPanel.recovery` 11件を再実行し全件 PASS（2.44秒）。重い工程は終了、3297自己sessionも終了確認済み。

## 最新mainへの適用確認（追加工程）

- 正確な対象: `0a79ccec11f30e0e8cbcea3e7bc660649101fdce`。公式originからSHA指定fetchし、detached worktree `task-43/copilot-main-check` で検証。
- 元patch SHA-256: `DB6F511AD5D90161F68B444097BE9BE6B751E043FB65473057B96CF8AE50142F`。このファイルは上書きしていない。
- `git apply --check`、`git apply --index`、`git diff --cached --check` は全て成功。適用競合0。旧base→指定mainの55ファイルはトップ/ST関連で、今回の13コード・testファイルおよびpackage manifest/lockfileとの重複なし。
- 最新main向けの差分は同じ14ファイル。元patchとの変更は本書のbase・検証状況・承認状況の訂正のみ。アプリとtestの13ファイルは元修正と同じ内容。
- 予定した局所回帰は4ファイル31件（API copilot 8、API exam-library 5、CopilotPanel recovery 11、exam-library recovery 7）、1 worker・1GiB heap・既存依存再利用。**実行件数0**。test assertionの失敗ではなく、runner起動前に停止。
- 拒否された操作: `New-Item -ItemType Junction`。作成先 `C:\Users\kanet\Documents\Codex\2026-10-24\task-43\copilot-main-check\node_modules`、参照先 `C:\Users\kanet\Documents\Codex\2026-10-24\task-43\copilot-work\node_modules`。コマンド内の「アクセスが拒否されました」で未作成（Test-Path=falseを確認）。auto-review拒否ではなくファイル操作のアクセス拒否。続くNodeはMODULE_NOT_FOUNDで終了し、Vitestは未起動。再試行・別routeでの代替・installは行っていない。
- ログ: task `evidence/copilot-main-regression.log`。今回Next、全体typecheck、install、CI、Vercel build、commit、push、deploy、credential操作、team grant再申請、403再試行は全て未実施。追加の重い工程は起動していない。
- 出力は新しい `copilot-recovery-main-0a79ccec.patch`。元成果を保持し、team grantの本人再承認待ちで停止する。最新mainの回帰未実施を元baseの99件PASSで代替しない。

## 統合対象と除外

変更は以下の14ファイル（新規5、変更9）。Git著者情報が未設定でcommitは`Author identity unknown`により未作成。著者・global/local設定は変更せず、新規を含むbinary/full-indexのstaged diff patchを引継ぎに添える。

```text
app/api/copilot/exam-library/route.ts
components/copilot/CopilotPanel.tsx
components/exam-library/exam-copilot.tsx
lib/copilot/errors.ts (new)
lib/copilot/gemini-flash38.ts
lib/copilot/prompt-assembly.ts
lib/copilot/streaming.ts
__tests__/components/CopilotPanel.recovery.test.tsx (new)
__tests__/copilot/errors.test.ts (new)
__tests__/copilot/gemini-flash38.test.ts
__tests__/copilot/prompt-assembly.test.ts
__tests__/copilot/streaming.test.ts
__tests__/exam-library-copilot-recovery.test.tsx (new)
docs/improvements/copilot-recovery-20261024.md (new)
```

除外: 秘密・env・認証設定、dependency/cache、browser fixture、temporary mock provider、port/起動設定、PR780/トップ/ST/他資格の差分。package manifest/lockfileは変更なし。画面証跡はtask外部資料で、アプリ配布物には含めない。

## 阻害と次に必要な証拠

1. **Vercel read 拒否（未取得）**: project `prj_t0YGXuTY62TNajIJg2v6W68TciT1` / team `team_fmzwEegB8SRsADNmwXkBUN34` の `get_runtime_errors`、deployment read は403。親側の runtime logs、`filter_project_envs(decrypt=false)` も403。親によれば接続のteam grant不足でSSO強制ではない。ログ0件の意味ではない。CLIや別routeで迂回していない。upstream status/code・本番build SHA・Gemini/KV変数の存在とPreview scopeが未取得。
2. **local UI 到達は解消済み**: 初回通常sandbox起動後のCUA timeout、通常shell GETのsocket10013、07:38:15 UTC正式GETのOS timeoutを記録した。その後、親の新しい正規手順の証拠に基づきNext起動自体をrequire_escalatedで審査・実行。同じ境界のnetstatで3297 LISTENを確認し、同scope GETはHTTP200/301476bytes。通常sandboxのprocess/listener一覧に見えなかったことを、host上の終了と混同しない。
3. 4GiB起動はmemory thresholdによる再起動ログ後にconnection refused。自分のsessionを停止し、余力を確認して6GiB/PTY/127.0.0.1:3297で再起動。実Chromeの上表検証が成功。最後に自分のsessionをCtrl-Cで終了（終了結果取得済み）、自作Chromeタブを閉じ、viewportとFetch interceptionを解除した。firewall/OS設定・他PID・他portへの操作なし。
4. **実API正常回答は未取得**。ローカルには既存鍵/KVがなく、Vercel読取も403のため、本番障害のupstream根本原因と復旧は断定できない。残りの認可が要る工程を以下に分離する。

## 最小の公開前検証案（実行していない）

親が承認をまとめるための案。正規team grant許可後に同connectionでlogs・非秘密env metadataを再確認。最新mainへrebase・競合解消・必要な局所再テスト。その後 **検証用Preview build 1回**、既存Preview credential scopeが適合する場合だけ通常アプリ経由の実質問 **まず1回**で分類情報と成功/失敗を確認。既存資格情報がPreviewにない場合は、追加配置のper-action承認か、既存本番資格情報を使う限定staged productionの別承認が必要。勝手にcopy・新設しない。

**Copilot用Previewの承認は未取得。必ず新規承認を得たうえでPreview 1回を行う。** top/STのPreview 2回・本番1回の承認は消費済みで、Copilotへ流用しない。team grantも本人の再承認待ちであり、期限切れリンクの再発行・再申請は行わない。今回の最新main適用確認は、公開・費用・設定の新規承認ではない。

成功した場合、未解答／正解／誤答を**合計2〜3回の通常質問**で確認し、C1/C3を閉じる。今回済みのfixture UI操作を全件やり直して回数を増やさず、rebase差分・実応答の問題に応じた再検証だけ行う。最終本番build/deployは別承認で **1回**を想定。本番への反映と復旧確認まで、この作業を完了扱いしない。

料金根拠: https://ai.google.dev/gemini-api/docs/pricing （2026-10-24に調査、親研究班からも同日共有）。2026-12-31まで入力$0.75/100万tokens、出力$3.75/100万tokens（thinking込み）。仮に1回あたり入力10,000・出力1,800tokensなら$0.01425、3回$0.04275。これは仮定によるAPI概算で上限保証ではない。actual prompt/usageで確かめる。無料枠の対象プロジェクトでの利用可否は不明。2027-01-01以降は同仮定で倍額。Vercel build/function費用は契約・所要時間を未取得のため金額未確定。新たな課金、quota変更、build/deployをここでは承認・実行していない。
