# 知的財産管理技能検定2級：ローカル取込受入

対象は第53回（2026-03-08）と第54回（2026-07-12）。各回の学科40・実技40、計160原問。学科と実技を別々の試験回として数えていない。第55回は2026-11-15実施予定のため対象外。

公式一覧：https://www.kentei-info-ip-edu.org/gakushujoho/kakomon.html

不足原問0、新規制作0。作者外160原問・651肢レビューを受けた固定版を再利用した。`data/prepared-chizai2/` の6ファイルは旧metadataを含めてハッシュ一致の履歴資料。`data/questions/chizai2/index.ts` が今回の採用版であり、旧gateの公開状態を現在の判定に使わない。原文、共通事例、選択肢順、料金表、正答、解説、出典は変更しない。数値式の空の選択肢マップだけを現行契約に合わせて省略した。

`needsReview=false` の採用根拠は同版の既存作者外内容検査と今回の独立受入レビュー。権利は2026-11-03の本人指示「本人取得済み」を適用し、`IP-EDU-authorized-reuse` として扱う。新たな許諾証書の取得や、公式PDFがパブリックドメインであるとの主張ではない。旧6問の歴史法令原本網羅監査の留保は継承し、全法令履歴を新たに監査済みとはしない。

受入票は `application-receipt.json`（採用版の各レコードhash・件数・原典・検証）、`source-intake-receipt.json`（固定原稿の各レコードhash・公式正答・PDFページ・PDF hash）、`checks.json`（実行結果）。既存受入の `reused-content-review.json` と `reused-snapshot-binding.json` を対応づける。ローカルブランチへの登録は本番公開を意味しない。

## 再検査

PDFは一時領域に置く。4冊は問題と正答を同じ冊子に収録し、ファイル名は `260308_2Q_g.pdf`、`260308_2Q_j.pdf`、`260712_2Q_g.pdf`、`260712_2Q_j.pdf`。PDF本体・抽出草稿はコミットしない。

```powershell
python scripts/verify-chizai2-intake.py --pdf-dir <PDF保存先>
pnpm exec tsx scripts/validate-questions.ts --exam=chizai2
pnpm exec tsx scripts/verify-two-round-coverage.ts --exam=chizai2 --expected-per-round=80 --round=2026-spring --round=2026-july
pnpm exec vitest run __tests__/questions/chizai2-two-rounds.test.ts __tests__/components/Chizai2.player.test.tsx
pnpm exec tsc --noEmit
pnpm build
```

`verify-chizai2-intake.py` は読取り専用。指定されたPDF実バイトのSHA-256を再計算し、末尾正答表を別に解析する。保存済みの `hashMatches` フラグだけを信用しない。

実ブラウザ検査は、このworktreeをビルドしたローカルサーバーに対してだけ実施する。別ターミナルで `pnpm exec next start --hostname 127.0.0.1 --port 43173` を起動し、次を実行する。

```powershell
node scripts/verify-chizai2-browser.mjs http://127.0.0.1:43173 <一時出力先>
```

隔離した匿名ブラウザで原文・全肢・出典・正誤・解説・localStorage・再読込を確認する。外部リクエストとPOSTを遮断し、AI送信、実キー呼出、本番DB操作をしない。本番配信後の匿名読戻しやログイン同期・報酬の受入は含めない。

## 今回の結果

原典4PDF・160公式正答・651肢理由・スキーマ・2回分検査、関連11ファイル1,178テスト、型、lint、ローカルビルド（12,781静的ページ）に成功。実ブラウザ20ケースも成功し、`browser-receipt.json` にビルドIDと固定稿／アダプターhash、スクリーンショットhashを保存した。料金表と9肢問題は目視確認した。

ローカルサーバーは停止済み。ビルド後の `.next` 削除は、通常ディレクトリ・絶対パスを確認したが、自動承認レビューが `blocked by policy` として拒否した。削除は未完了で、`checks.json` の `cleanup` に明記する。他シェル・別経路による削除は行わない。これは原稿不足やテスト失敗ではないが、依頼された作業の残件である。
