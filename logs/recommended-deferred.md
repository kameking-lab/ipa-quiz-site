# 推奨課題14件 一括処理時の保留リスト

実施日: 2026-05-16
ブランチ: feat/recommended-batch-cleanup
ベース: 2094163 (PR #242 merge 直後)

## サマリ

激辛レビュー (logs/comprehensive-harsh-review-latest.md) の推奨14件 (#009-#022) の処理状況。
本Dispatchで処理した件数と、保留した課題を理由付きで記録する。

## 直近PRで既に解消済み (7件)

- #009 Stripe残骸6箇所の整理 → PR #237 で完了 (admin/stats イベント定義削除、copilot route コメント整理、launch/analytics 削除)
- #012 components トップレベル11件のデッドコード → PR #237 で22ファイル削除
- #013 i18n dead infrastructure → PR #237 で lib/i18n + messages/ 完全削除
- #014 lib/ 配下デッドコード → PR #237 で lib/ 6件削除
- #015 AI解説 disclaimer text-[11px] → PR #235 で text-sm + 枠線対応
- #016 /transparency 2026-05 レポート未追加 → PR #235 で 2026-05 レポート追加
- #020 /stats 準備中セクション複数 → 既に Card section レベルで `length > 0` ガードあり (PR #229 範囲)。残るのは Hero の単一フォールバック表示のみで、レビュー指摘の「複数 Card 準備中」状態は解消済

## 本Dispatchで処理 (4件 + 観察事項追加)

- #017 URL ホスト不整合 (naked / www) — 全箇所を SITE_BASE_URL ベースに統一
- #018 blog「【2026年最新】」年次更新 — getFullYear() で動的化
- #021 api-docs レート制限表記の事実乖離 — 「50/日」を実装値 (10/日 + 1分15) に修正
- #022 operator/about E-E-A-T 強化 — Person 構造化データ + GitHub プロフィールリンク追加

## 保留 (理由付き)

### #010 app/api/essay-grading (デッドAPI) — 保留
理由: PR #237 で「オーナー判断必要 (プロンプト仕様が essay-grade と異なる)」として明示保留済。削除 or 統合は別タスク化が望ましい。本Dispatchの「賛否なし」基準を満たさない。

### #011 components/quiz/stream/ デッドコード — 保留
理由: PR #237 で「/quiz/stream ルートが QuizModeTabs + SiteHeader に組み込まれているため保持」と判断済。実体は本番未配線だが、UI側で導線が残っているため独立判断が必要。

### #019 ホーム情報密度過多 — 保留
理由: 工数 4-6時間 / 情報設計の再検討が必要。「初学者 / 中堅 / 上級 3段折り畳み」「分岐CTA」は意思決定を伴う。本Dispatchの「即効性・賛否なし・工数小」基準を満たさない。別 Dispatch でデザイン議論前提に実施推奨。

## 完了基準

- 上記4件 + 観察事項軽微修正
- typecheck / lint / build 全成功
- 賛否ありの判断系課題は本Dispatchでは触らない
