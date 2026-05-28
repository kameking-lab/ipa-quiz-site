# ホーム最重要CTA「まずは3問で試す」座標クリック不動作 — 原因調査と修正 (2026-05-26)

対象: 実機激辛レビュー第3弾で検出された最優先致命傷。
ブランチ: `fix/home-cta-click-handler-actual` / 検証HEAD基点: `e27da61`

## 症状（レビュー報告）
- ホームの主CTA「まずは3問で試す」がマウス左クリック（座標クリック）で遷移しない。
- 一方、JavaScript の `element.click()`（合成クリック）では遷移する。
- 期待: `/quiz?mode=random&exam=ap&limit=3` へ遷移。

## 特定したコンポーネント
- CTA本体: `components/home/HomeQuickTrialCta.tsx:36` の `<Link href="/quiz?mode=random&exam=ap&limit=3">`。
- CTAが配置されるホーム: `app/page.tsx:134-140`（hero セクション）。

## 仮説と検証結果（すべて実コードで反証/確認）

| 仮説 | 検証 | 結果 |
|---|---|---|
| onClick で preventDefault している | `HomeQuickTrialCta.tsx` を精読。primary/secondary は素の `<Link>`。onClick も preventDefault も無し | 否定 |
| href が壊れ/redirect で抑止 | href は `mode=` 付き。`next.config.ts:62-68` の「mode無し /quiz→/」301に該当しない | 否定 |
| popup blocker / window.open | 該当コードなし | 否定 |
| デバウンス/throttle 過剰 | 該当コードなし | 否定 |
| 初回訪問でモーダルが自動オープンしクリックを奪う | `OnboardingTour`(opt-in, `:66-76`)・`SessionSummaryGate`(`?done=1`時のみ)・Radix `Dialog`(open時のみ portal) を精読。クリーンな初回訪問では何も開かない。`playwright.config.ts` が `ipa-quiz:onboarded:v1` を全spec種shしていたが、現行コードでは自動オープンしない（コメントが陳腐化していた） | 否定 |
| ヘッダーのドロップダウン/装飾オーバーレイが被さる | 周辺フロート(`AiQuotaIndicator`/`OfflineIndicator`/`CloudSyncAutoSync`)は全て `pointer-events-none` ラッパで防御済。`KeyboardShortcutsHelp` は `open=false` で `return null` | 否定 |
| **レイアウトシフト（CLS）でCTAが移動し、座標クリックが移動後の別要素に当たる** | **Playwright で実機相当の座標クリックを実装して再現テスト** | **確認（真因）** |

## 真因
CTAの直上に、SSRでは `null` を返し**ハイドレーション後/非同期fetch後に初めて出現**する2つの要素があり、出現時にCTAを下方向へ押し下げていた。

- `components/home/HeroAiDemo.tsx:34` … `if (!mounted || hide) return null;` → SSRでは非表示、ハイドレーション後にAI解説デモカード（約150-250px）が出現。
- `components/home/TotalAnswerCounter.tsx:47` … `if (target === null) return null;` → `/api/stats/answer-count` のfetch解決後に集計バナー（約40px）が出現（ネットワーク往復ぶん更に遅れて出る）。

`app/page.tsx` の旧順序（lede → HeroAiDemo → TotalAnswerCounter → **CTA** → ExamGrid）では、この2要素がCTAの**上**にあったため、初回ペイント直後のCTA位置を狙った座標クリックが、押し下がってきた別要素（デモカード等）に着弾していた。合成 `.click()` はヒットテストを経ず `<a>` に直接届くため遷移できた——「座標クリック不可・`.click()`可」という報告と完全に一致する。

既存E2Eが見逃した理由: 全specが `ipa-quiz:onboarded:v1` を seed し、かつ `goto` の `load` 待ち後に `.boundingBox()` を読む（=シフト確定後の位置）ため、座標ズレが発生しない条件でしか叩いていなかった。

## 修正（最小・CTA位置の安定化）
`app/page.tsx` の hero セクションを並べ替え、CTAを**SSRで安定して描画される lede の直下**へ移動。pop-inする `HeroAiDemo` / `TotalAnswerCounter` をCTAの**下**へ移した。

- これによりCTAのY座標は、上にある安定要素（`SiteLogo` + `HomeHeroLede`、いずれも初回訪問でSSR描画→ハイドレーション後も不変）だけに依存し、**初回ペイントから完全静定まで一切移動しない**。
- pop-inの押し下げ影響はCTA下の ExamGrid のみに限定。
- CTAコンポーネント本体・href・他CTA（いきなり1問/目標を決めて始める）の挙動は不変。コンポーネントの削除/追加なし、純粋な順序変更3行。

## 検証（実機相当・忖度なし）
新規: `tests/e2e/home-cta-click.spec.ts`（初回訪問者を再現するため storageState を空にし、`page.mouse.click` で真の座標クリックを実施）。

- 修正**前**: 「CTA位置が静定まで不変」「最早の対話可能タイミングでの座標クリックで遷移」の2テストが3回中3回安定して**失敗**（真因を捕捉）。
- 修正**後**: 全6テストが**3回連続で全緑**（フレーキーなし）。
  1. 「まずは3問で試す」座標クリックで `/quiz?mode=random&exam=ap&limit=3` へ遷移
  2. 「いきなり1問」座標クリックで `…limit=1` へ遷移
  3. モバイル(360x740)でも遷移
  4. href が mode 付きの正当なディープリンク（/quiz→/ 301に該当しない）
  5. CTA位置が DOMContentLoaded〜完全静定まで不変（<8px）
  6. 最早の対話可能タイミングでの座標クリックでも遷移

回帰: typecheck 0 / lint 0(警告1は未追跡スクリプト) / vitest 152 全緑 / e2e 回帰subset(smoke-routes・user-journey-progress・skip-link・user-journey-quiz)18 全緑。

## 備考（本タスク範囲外・申し送り）
- `HeroAiDemo` / `TotalAnswerCounter` の「SSRで null → 後から出現」パターン自体はCLS要因として残る（今回はCTAの上から外して無害化）。恒久的にはSSR一貫描画 or 高さ予約での解消余地あり。
- `playwright.config.ts` の onboarding 自動オープンに関するコメントは現行コードと不整合（陳腐化）。別途修正候補。
- 本番反映後、Chrome agent による実機座標クリック検証を推奨。
