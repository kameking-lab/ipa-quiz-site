# IPA PDF 包括取り込み — 進捗マーカー

ブランチ: `feat/ipa-pdf-comprehensive-ingest`
セッション開始: 2026-05-17
モデル: Claude Opus 4.7

## 合意スコープ (ユーザー確認済)

- Phase 0 (監査) + Phase 1 (パイプライン骨格) + Phase 3 (vitest) まで本 PR に含める
- Phase 2 (実 PDF 一括ダウンロード + 取り込み) は別タスクへ分離
  - 理由: Gemini Vision (API コスト上限 5 万円) と数百〜千 PDF の所要時間で 1 セッションで完遂不能
  - 本 PR で URL マニフェスト + パイプライン CLI を整備しておけば、Phase 2 はマシン時間勝負になる
- self-merge は行わず PR を開いて停止 (durable な事前承認なし)

## 成果物

| ファイル | 概要 |
|---|---|
| `scripts/audit-pdf-coverage.ts` | EXAM_CONFIGS × ALL_QUESTIONS を突き合わせた監査 CLI |
| `scripts/ingest-ipa-pdf.ts` | pdfjs-dist + ヒューリスティックの取り込み CLI + プログラム API |
| `docs/audits/pdf-ingest-gaps-2026-05-17.md` | 442 スロットの状態 (complete/partial/missing) |
| `data/sources/ipa-pdf-sources.json` | 全 442 スロットの想定 PDF URL マニフェスト |
| `tests/unit/ingest-ipa-pdf.test.ts` | パイプライン 15 テスト (split / parse / 組立 / バリデーション) |
| `tests/unit/fixtures/sample-*.txt` | 決定論的なテキスト fixture (LLM 不要) |
| `vitest.config.ts` | tests/unit/** のみ対象。Playwright e2e と分離 |
| `package.json` | `audit:pdf-coverage`, `ingest:ipa`, `test`, `test:watch` を追加 |

## Phase 0 監査結果 (生成: 2026-05-17)

- 想定スロット数: 442 (exam × year × season × session)
- complete: 341 (実 ≥ 想定 × 0.9)
- partial: 8
- missing: 93
- 想定問題総数: 17,514 / 実問題総数: 14,402 (ギャップ 3,112)
- 高度試験 9 区分の午前 II (am2) は 2011-2019 で大量に missing
- AP は 2020 春のみ MISSING (COVID で IPA が中止した年度)

## Phase 1 パイプラインの設計判断

- LLM 非依存: pdfjs-dist によるテキスト抽出 + 正規表現で動く
- 設問分割は `問N` ヘッダで境界化し、本文 / 選択肢を行単位で分離
- `次の図`, `表N` などの記述を `hasImage` ヒューリスティックでフラグ
- 解答 PDF は `問N アイウエ` 形式の最小マッチで抽出
- Zod スキーマで必須フィールド欠損ゼロを担保
- pdfjs-dist は ESM-only のため動的 import で読み込む

## Phase 2 (本 PR スコープ外) のための残タスク

1. `data/raw_pdfs/` への一括ダウンロード (既存 `pnpm fetch:pdfs:all` を流用)
2. 取り込みオーケストレータ追加 — 全 missing スロットを `ingest:ipa` で回し、出力 JSON を `data/questions/<exam>/by-year/<year>-<season>-<session>.ts` に追記
3. 既存問題との fuzzy match による重複検出
4. ヒューリスティック失敗ケースを Gemini Vision にフォールバックする 2 段階パイプライン
5. AP 2020 春は IPA 非公開の確認 (公式が出していない可能性)

## 次回タスクのキックオフ手順

```
pnpm install
pnpm audit:pdf-coverage --date=$(date +%F)
# missing スロットを 1 件選んで:
pnpm fetch:pdfs --exam=db --year=2019 --season=autumn
pnpm ingest:ipa --qs=data/raw_pdfs/db/2019-autumn/am2_qs.pdf \
                --ans=data/raw_pdfs/db/2019-autumn/am2_ans.pdf \
                --exam=db --year=2019 --season=autumn --session=am2 \
                --out=data/questions/db/by-year/2019-autumn-am2.ingest.json
```
