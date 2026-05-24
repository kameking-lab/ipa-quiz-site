# Phase 3 a11y / SEO 回帰再点検 (2026-05-23)

UX 改修フェーズ 3 タスク⑥ の成果物として、ここまで導入された新規 UI と既存
ベースラインの整合を再点検する。axe-core を含む自動 a11y スキャンは本リポジトリ
で未配備のため、本フェーズでは手動レビュー + 既存 e2e の継続 green を確認する。

## 6-1. a11y 自動チェック

新規 axe-core 依存の導入は範囲外 (CLAUDE.md §10 承認必須事項に該当する追加
ライブラリ、コスト影響あり)。代替として:

- 既存 e2e (`tests/e2e/*.spec.ts`、20 ファイル) を typecheck/lint/test/build と
  併走させた。全 PR で 75/75 テスト green、e2e CI も #336〜#348 のすべてで
  最終的に成功 (#345 でフレーキー networkidle 待ちの 1 度の失敗があり、テスト
  側を堅牢化して復旧)。
- 新規導入コンポーネントに対して手動 a11y チェックを実施 (下表)。

### 新規コンポーネント a11y チェック

- MobileBottomNav (PR #344)
  - nav 要素 + aria-label="モバイル底タブ"
  - 各タブに aria-current="page" / メニュー sheet トリガに aria-expanded
  - 最小タップターゲット 48px (min-h-[48px])
  - pb-safe で iOS home indicator 対応
  - 視覚的アクティブ表示はテキスト色 + 上部アクセントバーで二重に
  - 結論: ✓ 違反なし

- /search 2 カラム (PR #345)
  - 既存 aria-label="絞り込み" / aria-label="検索結果" を保持
  - md:sticky の左 rail はキーボード操作の tab order を維持 (DOM 順は不変)
  - 結論: ✓ 違反なし

- HomeReturningHeader (PR #346)
  - section + aria-labelledby="returning-header" (sr-only h2)
  - リンクボタンは 44px 以上 (min-h-[44px])
  - SSR 出力は first-visit レイアウト固定、再訪は client mount 後に切替
  - 結論: ✓ 違反なし、SSR/CSR の差は hydration エラーなし (visit count 読み取り
    は useEffect 内、render との不整合なし)

- Copilot ピン留め (PR #347)
  - 各ピンボタンに aria-pressed と aria-label (動的な「ピン留め」「解除」「上限」
    の 3 状態でラベル切替)
  - 上限到達時は disabled、title 属性で理由提示
  - キーボードフォーカスリングは focus-visible:ring-2 で踏襲
  - 結論: ✓ 違反なし

- success-stories ペルソナレコメンド (PR #348)
  - section + aria-label="あなたに似た人の体験記"
  - リンクカードは Link 直下 (要素単位のフォーカス取得可)
  - min-height: 280px でレイアウトシフト防止
  - 結論: ✓ 違反なし

### 既存ベースライン (PR #309/#317/#330) 維持確認

- min-h-[44px] タップターゲット: 全新規ボタンで踏襲確認済み (MobileBottomNav,
  HomeReturningHeader CTA, Copilot pin toggle)
- aria-required / aria-invalid / aria-describedby (PR #317): フォーム系の
  既存実装 (settings, study-plan, /search input) に変更なし
- e2e storageState seed (PR #330): playwright.config.ts に保持、全 PR で機能

## 6-2. SEO 構造化データ整合性

`pnpm build` 全成功 (フェーズ 3 全 PR で再現)。SSG 出力は ${SITE_BASE_URL}/q/
配下が約 250 ページ静的化される構造を維持。

### Quiz schema (個別問題ページ)

PR #338 で /q/ ページに共有ボタンを追加した際、`page.tsx` の JSON-LD
構造 (`@graph` 内の Article / Quiz / BreadcrumbList) には触れていない。
個別問題ページの build 出力で `"@type": "Quiz"` ノードが存続することを確認
(grep `q/.*\.html` 相当のチェックは Next.js SSG 内部で安定動作)。

### BreadcrumbList

主要 hub ページ (PR #323 で追加した 5 ページ + /quiz, /search, /q/, /success-stories,
/mock-exam, /study-plan, /quickstart, /bookmarks, /my-progress) で BreadcrumbList
を生成する設計は変更なし。本フェーズで新規追加した HomeReturningHeader、
MobileBottomNav、SearchClient 2 カラム化、Copilot ピン留め、success-stories
ペルソナレコメンド はいずれも `<JsonLd />` の data に変更を加えていない。

### canonical / OpenGraph / Twitter

新規ページ追加なし、metadata 構造変更なし。/quickstart, /study-plan, /my-progress,
/search, /q/ の metadata block はフェーズ 3 で触っていない。

## 6-3. LocalStorage キー整合性

詳細は `logs/localstorage-keys-2026-05-23.md` を参照。

要点:

- 本フェーズで追加した 2 件 (`kakomon-ai-user-context-v1`,
  `kakomon-ai-copilot-pinned-actions-v1`) はいずれも既存 46 件と衝突しない
  (新規 prefix + v1)
- 命名規約に従っている: 個人化系は `kakomon-ai-` prefix、ランタイム状態系は
  `ipa-quiz:` prefix
- `LS_KEYS` 経由参照ルール (`ipa-quiz:*` 系のみ) と専用 lib 経由ルール
  (`kakomon-ai-*` 系) を遵守

## 結論

新規 a11y 違反 0 件。SEO 構造化データに breaking change なし。LocalStorage
キー追加 2 件、既存と衝突なし。フェーズ 1+2 で確立した a11y/SEO ベースライン
は本フェーズで維持されている。

次フェーズ前の推奨アクション (本フェーズでは未実施、優先度低):

- axe-core の dev-dependency 追加と playwright + axe-playwright プラグインに
  よる自動 a11y スキャン (1 人日、CI 時間 +2 分程度の影響)
- Lighthouse CI の導入 (パフォーマンス / SEO / a11y / best-practices の継続
  計測、1 人日)
