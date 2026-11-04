# LQ8C 作業報告

開始：2026-11-04 06:01:39 JST。記録時点：2026-11-04 06:35:33 JST。

同じworktree `C:/Users/kanet/20260522/wt-LQ8`、branch `qual/hoshasen-20261104`で継続しました。全414原問の完成は未達です。残35原問のうち14原問を追加し、収録済みは379→393原問、全肢解説は1,895→3,530件になりました。残りは21原問（未収録20＋保留1）です。40分枠内で、指定の独立レビュー・検証を通した動く未公開ステージングをコミットしました。

## 追加した範囲

- 第二種の令和8・7年度：各年度の物理学・化学・生物学の問11、実務問11〜12。計10原問。
- 第一種の令和8・7年度：生物学問31〜32。計4原問。
- 多肢択一式のスキーマを追加。14原問の200空欄と各解答群、公式正答番号、空欄ごとの解説・全肢解説1,635件を保持。空欄を原問数へ加算していません。
- 必要な原図7点をprivateなfiguresに保存し、原本画像で欠け・数式・選択肢順を照合しました。
- 既存379原問のJSONファイルはバイト単位で変更なし。公開レジストリ・ExamCode・問題ローダーへの接続はしていません。

| 種別・年度 | 収録済み原問 | 残原問 |
|---|---:|---:|
| 第一種・令和8年度 | 122 | 10 |
| 第一種・令和7年度 | 122 | 10 |
| 第二種・令和8年度 | 74 | 1（保留） |
| 第二種・令和7年度 | 75 | 0 |

## 指定の独立レビュー

全レビューは `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` を用いました。初回の指摘を修正して再確認し、最終判定PASSを得ました。

- 本文・全肢・全200空欄の公式正答・解説・図版の統合確認：`reports/lq8c-review-checkpoint-fixed.md`。当該レビュー時点の残指摘はREADME・カタログの古い件数でした。
- 第一種令和7年度生物学問32のクは公式正答7（67）へ修正。RNAの独立翻訳で終止コドン321、Z=320、Y=253、差67を確認し、全肢解説・監査キー・図の表題まで再確認してPASS：`reports/lq8c-review-firstbio32-fixed.md`。
- 件数記載の最終修正PASS：`reports/lq8c-review-final-corrected.md`。
- 生物学、science、practical11、practical12、firstbio31、firstbio32の初回指摘も削除せず保存しています。正答転記、図の切り抜き、指示文の省略、最大OER、空欄別説明の混同、最近値と計算値の区別等を修正しました。

これは393原問の未公開チェックポイントの品質判定です。全414原問完成や保留問の解除のPASSではありません。

## 保留1問

令和8年度第二種化学問9は公式正答5を保持し、候補配列から除外したままです。公式掲載ページに当該問の新しい訂正は見つかりませんでした。[JAEA](https://nsec.jaea.go.jp/fme/group5/group5_thema10.htm)と[筑波大学](https://bukko.bk.tsukuba.ac.jp/~positron/positron/positron_lifetime.html)は、²²Naを使う陽電子寿命測定で消滅γ線の検出を利用する説明をしています。線源からの放射線と測定信号の区別のみでは肢1を一意に誤りと断定できず、独立レビューもKEEP HOLDでした（`reports/lq8c-review-science.md`）。追加の確かな根拠なしに解除していません。

## 検証

最終実行はすべて終了コード0です。

- `pnpm validate:questions`：393原問のnativeスキーマ検証成功。既存公開26,444問はok=26,444、fail=0、warn=16,808。警告ゼロではありません。
- `pnpm typecheck`：成功。
- `corepack pnpm exec vitest run __tests__/questions/hoshasen-staging.test.ts __tests__/questions/qualification-expansion.test.ts`：2ファイル、1,072テスト成功。スキーマの不正キー・解答群欠落・全肢解説欠落の拒否、既存379件の互換性、非公開性も確認。
- `git diff --check`：成功。

全テスト一式の成功は主張しません。生ログはgit除外の`data/raw_pdfs/hoshasen/lq8c-*-final.log`、レビュー生ログは同階層の`lq8c-review-*.log`です。

## コミット

実装・候補データ・検証・レビュー証跡：`64796456e` — `feat(hoshasen): stage 14 multipart source questions with reviewed answers`。

本報告を別コミットで保存します。報告の指定先は `C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lq8c-report.md`、同内容をworktreeの`reports/lq8c-report.md`にも保存します。

## 次回の再開

1. 同じworktreeで`git status --short`、本報告、`data/questions/hoshasen/README.md`と`source-audit.json`を確認。
2. 残20未収録原問は、第一種両年度それぞれ物理学31〜32、化学31〜32、実務1〜6です。第二種の残りは保留問だけです。
3. 第一種実務両年度の添付正誤票と、令和7年度第一種化学問31の正誤票・問31-I-F全員正解を必ず反映。今回これらを収録済みと扱っていません。
4. `multi-part.json`の形式を使い、複数空欄を同じ原問に保持。公式全員正解は`allAnswersAccepted=true`かつ`officialAnswerNumber=null`で表せます。今回の14原問に全員正解指定はありません。
5. 原本20本は`data/raw_pdfs/hoshasen/`、未照合OCRは`ocr-unverified/`、LQ8Cの原本画像・一時補助スクリプトは`lq8c-work/`。補助スクリプトは一回限りの作業用で、再実行時は最終修正・重複実行に注意し、コミット済み候補を正としてください。OCRだけで収録しないこと。
6. 指定モデルの独立レビューをPASSまで修正し、問題検証・型検査・関連テストを実行。公開接続には別途指示が必要です。

権利はオーナー決定2026-11-04 01:30で確認済みとして扱い、通常のHTTPS参照とローカル原本のみを使用しました。アクセス制限の迂回、秘密値の取得・出力、push・PR・デプロイは行っていません。
