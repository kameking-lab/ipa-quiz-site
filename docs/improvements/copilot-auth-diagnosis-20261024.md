# Copilot 認証診断の追補 — 2026-10-24

本書は `copilot-recovery-20261024.md` の認証・アクセス・最終検証状況を更新する。以前の検証票や保存済みpatchは履歴として保全した。**本番障害は Gemini upstream HTTP 401（認証拒否）まで確定、細分類と復旧は未確認。** 指定main上の最終127 tests・全体型検査はPASS。最新Flashは既に `gemini-3.8-flash` を指定しており、モデル変更で直ったとは扱わない。

## 新しい本番証拠

親の研究・調整担当が、本人承認後の同じVercel connectorでread-only取得した証拠（このローカル作業で再取得していない）:

- `/api/copilot` と `/api/copilot/exam-library` にGemini upstream HTTP 401。203件、76 users、最終集計 2026-10-24 10:34:13 UTC。deployment `dpl_6CXPCfTpmRizapnYcjuWvc21TFJD`。
- 詳細request `w7kb5-1792838053000-2aec39efee0a`、10:34:21 UTCには401直後の `[copilot] completed` があるが、finishReason / promptTokens / outputTokens / totalTokens は全てundefined。これは成功証拠ではない。
- `GEMINI_API_KEY` は development / preview / production、KV URL/token は preview / production に存在する。値・一部文字列は取得していない。存在は値の有効性や対象deploymentの実効値を保証しない。
- Gemini env recordのcreatedAt / updatedAtは両方 `2026-04-17T09:49:38.685Z`。これはVercelの保存日時でありGoogleの発行日やstandard/auth種別の証明ではない。
- 過去のVercel403はteam grant承認で解消済み。現時点を「team grant待ち」と表記しない。upstream本文は旧コードで記録しておらず、401の細分類は取得できていない。

## Source と公式RESTの照合

元base `cdf278be5f8774583419b75eca20abe08fcfdb56` と確認済みmain `0a79ccec11f30e0e8cbcea3e7bc660649101fdce` の認証経路は同じ:

1. 両routeは `process.env.GEMINI_API_KEY` を直接providerに渡す。SDK経由ではなく、`GOOGLE_API_KEY` のSDK上の優先順位はこの経路に適用されない。
2. POST先は `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:streamGenerateContent?alt=sse`。
3. `Content-Type: application/json` と `x-goog-api-key`。キーをURL、JSON本文、Bearer認証へ変換していない。
4. JSONは `systemInstruction`、user/modelの`contents`、`generationConfig.maxOutputTokens` と `thinkingConfig.thinkingLevel: low`。RESTの公式構成と一致する。旧SDKの全面置換・Interactionsへの移行は復旧の必須条件ではない。
5. Native Fetchの合成Requestで外側のASCII SP/TAB/CR/LFが正規化されることを確認した。単純な`.trim()`追加を401の修復とは扱わない。空白だけ、引用符、文字列としての`\\n`は異なる設定になり得るが、実値は読んでおらず今回の原因とは断定しない。中間の実改行はHTTP401以前にTypeErrorとなるfixtureだった。

公式資料（2026-10-24確認）:

- [Gemini 3.8 GenerateContent migration](https://ai.google.dev/gemini-api/docs/generate-content/whats-new-gemini-3.8)
- [GenerateContent REST reference](https://ai.google.dev/api/generate-content)
- [Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key): auth keysは2026-05-28以後の既定、無制限standard keyの拒否、休眠keyのblocked状態を説明。ただしこのサイトのkey種別・制限・失効状態は不明。
- [Google API structured errors](https://google.aip.dev/193)、[公式ErrorReason定義](https://github.com/googleapis/googleapis/blob/master/google/api/error_reason.proto): reasonを構造化分類し、自由文messageを判定条件にしない根拠。

**コードの認証header/URL/bodyの不整合を示す証拠はない。** 認証方式・環境変数名・実credentialの変更はしていない。

## 今回の最小修正

- 非2xxの診断本文は最大16KiB・全体1秒で打切る。サイズ超過・不正JSON・読取停止ならHTTP statusだけ保持する。本文をログやファイルに保存しない。
- `google.rpc.ErrorInfo` はtypeと`googleapis.com` domainが一致した先頭16 detailsだけを調べ、固定reason allowlistのみ残す。message、metadata、project/consumer、URL、未知の文字列は残さない。status/reasonは異なるフィールドとし、401からkeyの種別・失効を推測しない。
- upstream 401/403等の明確な生成前拒否はcost callbackを呼ばず、既知のHTTP拒否が本文読取timeoutで隠れないようにした。5xx/途中出力は既存の保守的な費用計上を維持する。
- cost用callbackには `success / failed / timeout / cancelled / truncated` の固定outcomeを渡す。通常終了、MAX_TOKENS、typed途中終了、timeout、client/consumer取消、usage受信後の失敗を区別する。
- IPA routeの紛らわしい `[copilot] completed` を `[copilot] stream_settled` + outcomeへ変更。これはストリーム結果のログであり、後続のKV費用永続化成功を証明するものではない。
- エラーの再試行方針と通常回答のparser契約は維持。認証拒否を自動再試行しない。quota自由文を解析して日次上限と推測しない。

## 実行した局所検証

全て元baseの独立作業コピー、既存dependencies、1 worker / Node heap 1GiB、mock/fixture。実Gemini呼出しは0件。Next/install/full typecheck/buildは起動していない。

| 検証 | 結果 |
| --- | --- |
| auth契約・空白・構造化401・16KiB・1秒stall | 15 PASS |
| 既存Gemini SSE parser | 15 PASS |
| 固定error status/reason、unknown details除去、通常日本語のsentinel誤検出防止 | 25 PASS |
| stream accounting/outcome、401、503、timeout/cancel、STOP後failure、typed truncation | 18 PASS |
| IPA API経路（mock、KV fail-closedを含む） | 8 PASS |
| exam-library API経路（mock） | 5 PASS |
| 今回変更の7 code/testファイル ESLint | PASS |

合計 **6 files / 86 tests PASS**。ログはtaskの `evidence/copilot-auth-regression-final.log`（73件）、`evidence/copilot-auth-api-regression.log`（13件）、`evidence/copilot-auth-lint.log`。元baseの前段99件・全体型検査PASSは履歴であり、今回の全体型検査を再実行した意味ではない。

Astraはread-onlyレビューで、typed途中終了のoutcome不一致と、401本文stallによるtimeout誤分類を指摘。両方を修正し回帰を追加後、追加P1/P2なしと確認した。Astraのレビューも元baseの差分に限定。

## AI Studioの非秘密read-only結果

公式 `https://aistudio.google.com/api-keys` を既存ユーザーChrome認証で開けた。ログイン・アカウント選択・OAuth追加・権限追加はしていない。最初の確認では対応projectを特定できなかったが、親が提示した10月16日の本人の履歴から `My First Project / sinuous-set-422212-d1` が既知projectと確定したため、同projectを対象に追加のmetadata-only確認を実施した。

2026-10-24の既存Chrome実画面で次を確認:

| 確認画面 | 対象・現在の表示 |
| --- | --- |
| `https://aistudio.google.com/projects` | `My First Project / sinuous-set-422212-d1`、作成日2024/05/03、月ごとの費用￥12,307.75、請求階層「使用不可」、ステータス「上限に到達」 |
| `https://aistudio.google.com/spend?project=sinuous-set-422212-d1` | 対象選択「My First Project」、**「プロジェクトはポリシー違反のため停止されました。」**、利用額￥12,308、費用上限￥1、上限到達の案内 |
| APIキー一覧 | 読取時の可視領域にキーの行・状態列が表示されず、キー数・standard/auth・blocked/restrictedは未確認。0本と断定しない |

全体の前払い切替案内は見えたが操作していない。「利用額を表示」というread-only遷移だけを行い、上限調整・前払い切替・課金・復活・異議申立て・project新設・キー表示/コピー/新設/削除/制限変更/設定保存はしていない。自作の診断タブは閉じ、既存のユーザー/他担当タブは保持した。

証拠の強さを区別する:

- **確定**: 現在のproject名/IDは10月16日の本人の停止通知と一致し、現在もpolicy停止・使用不可・費用上限到達の表示がある。
- **親から得た過去証拠**: 401グループfirst=`2026-10-16T07:41:05Z`、停止通知の既報07:41:33 UTC。さらに本人承認後、同日23:26:25 UTCに「確認済みの漏洩キー2本とも完全削除、公開キー警告消失、上限未変更」と報告されていた。「残キー保持」はそれ以前の時点の観測であり、現状態として使わない。
- **仮説**: 4月17日から更新されていないVercel設定が削除済みキーを参照する可能性はある。しかし、実キー値や断片で照合しておらず、現在のVercelキーとこのproject/削除キーの同一性は未確定。停止時刻の近さだけで因果関係を確定しない。
- **未確認**: 実稼働キーのproject紐付け、認証拒否のproviderReason、認証修復後の実生成成功。

repoの通常docs/config/scriptsとtaskの報告も検索したが、Google Cloud project IDの直接指定は見つからなかった。`ipa-quiz-site`というproject名はSentry/Neonの設定例でありGeminiとの一致根拠ではない。秘密.env、credential cache、sessionファイルは読んでいない。

## 指定mainでの最終検証（追加許可工程）

親から通常source統合とB枠の許可を受け、元ownerの独立コピー `task-43/copilot-work` を使用した。既存の通常ディレクトリ `node_modules` は同じ場所に保持。拒否された `copilot-main-check/node_modules` へのjunction作成・別方式の書込み・依存移設は一切していない。

- 新しいローカルbranch: `fix/copilot-recovery-main-20261024`。元branchと元patchは保全、commitは作成していない。
- 実行base: **`0a79ccec11f30e0e8cbcea3e7bc660649101fdce`**。base更新55ファイルとCopilot差分は重複0。切替直後の実sourceは保存済み17-file patchのtree `4a8070e606c81d2b0817e7be479218eb7c4c735c` と一致した。
- Win32実測（11:23:16 UTC）: physical free 14.88/31.85 GiB、commit 49.24/61.29 GiB（余力12.05 GiB）、CPU12%。CIM/WMIは使っていない。
- 1 worker / heap2GiBで最終11files **127 tests PASS**。全てmock/fixture、Google呼出し0。
- 全体型検査の初回は新test fixtureの必須`truncated`属性不足1件でFAIL。`truncated:false`を補い、アプリ本体には追加変更なし。
- 修正後、同じ11files **127 testsを再実行し全件PASS**（23.90秒）。その後heap4GiBで `tsc --noEmit --incremental false` **PASS（exit0）**。
- 最後に変更15code/testファイルのESLintを実行し **PASS（exit0）**。
- tests→typeを一工程ずつ実行。Next/install/build/CIを起動せず、DigitalのA枠・他担当のbranch/worktree/processに触れていない。自分の重い工程は終了しB枠を解放済み。

ログ: `evidence/copilot-main-final-tests-after-type-fix.log`、`evidence/copilot-main-final-typecheck-after-fix.log`、`evidence/copilot-main-final-lint.log`、`evidence/copilot-main-final-capacity.json`。以前の「main回帰0件」は過去時点の記録で、本工程によって解消した。

## 成果物・統合と残るgate

- 元の14-file patch・認証追補patchは上書きしない。今回の最終fixture型修正と検証票を含む17-file統合patchを `copilot-recovery-main-0a79ccec-final.patch` に保存する。正確なhash/適用結果はtaskの `evidence/copilot-main-final-verification.json` に固定する。`evidence/copilot-auth-artifacts.json` は前段の履歴として保全する。
- 今回の追補は4runtimeファイル、3testファイル、本書の計8ファイル。統合patchは元14ファイルにIPA route、新auth test、本書が加わる計17ファイル。
- 指定main `0a79ccec11f30e0e8cbcea3e7bc660649101fdce` の実sourceで127 tests・全体型検査PASS。最終patchも同mainへの一時Git index適用・tree一致を確認する。元のjunction拒否は再試行・迂回していない。
- C2/C4/C5/C6/C7/C8/C9/C10の8観点は以前の実Chrome + fixture UI検証済み。C1の未解答ヒントとC3の正誤理由の**実Gemini内容品質は未確認**。10回完了や本番復旧とは扱わない。
- 本番API復旧、credential細分類/修復、Copilot Preview、本番公開は未実施。
- credential操作は別のper-action承認対象。Copilot Previewも**新規承認を得たうえで1回**の案であり未承認。top/STで消費済みの公開許可は流用しない。検証可能な環境が整った後、通常質問はまず1回、成功した場合にC1/C3用の合計2〜3回へ限定する案。今は実行していない。
- commit/push/CI/Vercel build/deploy/課金変更/quota引上げ/secret読出し・新設・コピー/著者設定変更なし。secret、env、cache、dependencies、browser fixture、一時port設定、他担当差分はpatchから除外する。
