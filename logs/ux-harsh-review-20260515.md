# UX激辛レビュー: 過去問AI (www.kakomon-ai.jp)
レビュー日: 2026-05-15
レビュアー視点: プロダクトデザイナー10年・教育SaaS UX改善100件以上担当
評価基準: ニールセン10原則 / WCAG 2.1 AA / Apple HIG / Material Design / 受験者の認知負荷

---

## エグゼクティブサマリ

### 総合評価: B-
モバイルファースト・教育貢献としての姿勢・登録不要での即時利用性・キーボードショートカット・スキップリンク等、土台は非常にしっかりしている。デザイントークン（globals.css）も適切なzincベース、コントラスト比はWCAG AAAをコメントで明記する徹底ぶり。しかし「実際に指で触ったときの摩擦」と「初学者が迷わずに辿り着く設計」に詰めの甘さが多数残る。特にフォーム入力欄のiOSズーム発生、サブ44pxのタップターゲット、ホームの13区分平置きによる選択肢過多が致命的。

### 強み3つ
1. **クイズプレイヤーのインタラクション品質が高い**: aria-live通知、キーボード1-4選択、Rで復習登録、スワイプで次へ、ChoiceButtonに正誤アイコン併用（色だけ依存しない）、min-h-[64px]の十分なタップ領域。ここはまさにCLAUDE.md記載の「業界最速」の方向性に沿っている。
2. **アクセシビリティの土台が整っている**: スキップリンク、focus-visibleのフォールバック（:where 0スペシフィシティ）、prefers-reduced-motion尊重、forced-colors対応、aria-keyshortcuts明示など、フェーズ1としては教科書的に良い。
3. **404・エラーページが手抜きでない**: グラデーション・スポットライト背景、明確な復帰CTA2つ並列、エラーIDを等幅で表示。ブランド一貫性が保たれている。

### 致命的問題
1. **ContactForm / 各種フォーム入力欄のフォントが14px** → iOS Safariが自動でズームイン。タップごとにビューポートが拡大し、片手操作で台無しになる。これは初回フィードバック取得という極めて重要な動線。
2. **ホームの「決定麻痺」**: 13試験タイル + 「近日公開」タイル併置 + テスト前のフィーチャーバッジ + 「続きから」+ カレンダー + その他details — 初訪問ユーザーが最初に何をすべきか不明瞭。「初心者おすすめ」バッジが2つあるだけでは導線として弱い。
3. **HomeExamGridの相互作用が重なっている**: カード全体をリンクで覆い、その上に絶対配置の40×40Shuffleボタンが乗る。指の腹で押すと意図しない遷移が起きる、Shuffleが44px未満。
4. **essays一覧のCTA「業種別答案を見る」が `text-xs / py-1.5`** = 高さ約24px。論述例という重コンテンツの主要CTAがこのサイズはありえない。
5. **/stats ダッシュボードの「準備中」表示過多**: GSC・PostHogが未連携のとき複数セクションが「連携準備中」とだけ表示される。透明性の旗印を掲げたページで、訪問者は「壊れている」と判断する。

### 修正必須数 / 推奨数 / 観察事項数
- 修正必須: **7件**
- 推奨: 11件
- 観察: 8件

---

## カテゴリ別評価

### 1. ファーストインプレッション
ロゴ→「どの試験を受けますか?」見出し→3つのバッジ（全機能無料・登録不要・13区分N問）→デモ→TotalAnswerCounter→13試験タイル、というスタック。バッジは緑チップで親しみやすい。しかし**ヒーローの感情訴求がない**。「無料」「登録不要」を強調するより、「30秒後にはAI解説付きで1問解いている」という体験ベネフィットを上に出すべき。ファーストビューでデモアニメーションは効くが、上部に「数字」しか並ばないため、訪問者の心が動かない。

### 2. 主要動線
「過去問を解きたい」の最短動線: / → /ap → ヒーローCTA「いますぐランダム出題で解く」→ /quiz。これは3クリックで適切。SiteHeaderの「問題を解く」ドロップダウンも便利。
「論述例を見たい」: / → /essays/sc → 個別 — フッターに /essays/sc 直接導線はなく、ホームにも見当たらない。論述添削はAP・SCで重要差別化点なのに、入り口が極めて薄い。
「サイト運営状況を見たい」: / → フッター「公開ダッシュボード」→ /stats — リンクは正しく存在するが、上述の通り中身が「準備中」だらけで失望感が強い。

### 3. コンポーネント
- **Button (`components/ui/button.tsx`)**: variant 9種類、size 6種類。デフォルトvariantが「foreground/background反転」になっており、primary CTAとしてはコントラストが強すぎる場面がある。`size="sm"` は h-8 (32px) — タップ44px基準を満たさない。
- **ChoiceButton**: 64pxのタップ領域、aria-pressed・aria-keyshortcuts・ICONと色併用 — 教科書的に良い。
- **CopilotPanel**: 多機能（音声入力、コピー、共有、ダウンロード）だが、ボタン群が密集して何を押すか初見でわかりづらい。
- **Card・Dialog**: ベース実装は良好。

### 4. タイポグラフィ・カラー・余白
Geist Sans を基本フォントに、日本語フォールバックは Hiragino Kaku Gothic ProN → Hiragino Sans → Noto Sans JP。これは適切。問題は**サイズ階段**:
- 本文 `text-sm` (14px) が多用されている。日本語の最小可読サイズは欧文より大きく16px推奨。
- フォーム入力欄 `text-sm` → iOSズーム発生（後述）。
- 凡例 `text-[10px]` `text-[11px]` の多用 → 高齢学習者・視覚弱者には致命的。
- カラーは indigo-600 (#4f46e5) を primary、sky-600 を quiz UI のアクセントに使い分け。これが**ブランド色とアクション色の混在**を生んでいる。`/q/...`画面では「青系の正解=sky」「青系のリンク=primary indigo」が並ぶため、色の意味論がブレる。

### 5. アクセシビリティ
- ✅ Skip link、focus-visible fallback、aria-live、role="progressbar"、reduced-motion尊重、forced-colors対応
- ⚠️ Skip linkは "メインコンテンツへスキップ" だが、サイト内ナビゲーション飛ばす"ナビゲーションをスキップ"が別途欲しい
- ❌ HomeAuxSection の `<details><summary>`内のフォントが12-14pxで子要素のpx-1 py-1 — タップ域過小
- ❌ ContactForm のラジオは `<input type="radio" className="sr-only">` でラベルクリックで選択、視覚focus indicatorがラベルに伝播していない（border変化のみ） — キーボードユーザーが選択中の項目を見失う可能性
- ❌ HeroAiDemo に aria-hidden を付けているのは妥当だが、「Q: 公開鍵...」というテキストが視覚ユーザーには表示される。これは「これは静的なデモであり、実コンテンツではない」というメタ情報が欠如している

### 6. モバイル
- ✅ viewport `viewport-fit=cover` 設定済 (notch対応)
- ✅ -webkit-tap-highlight-color: transparent (重要)
- ✅ pb-safe / bottom-safe ユーティリティで safe area 対応
- ✅ ChoiceButton min-h-64px、Quizの mobile sticky 「次の問題へ」ボタンは size="xl" w-full で適切
- ❌ ContactForm / PreRegisterForm の `<input>` が text-sm (14px) → iOSフォーカスでズーム
- ❌ QuizPlayerヘッダーの combo / timer / 正答カウンタが text-xs (12px) — モバイルで一瞥不可
- ❌ HomeExamGrid Shuffleボタン h-10 w-10 (40px)
- ❌ QuizPlayer back ボタン Button size="icon" → h-10 w-10
- ❌ essays/sc CTA px-3 py-1.5 text-xs → 高さ24px

### 7. パフォーマンスUX
- TTFB は 0.98s (curl計測) — Vercel Edge配信としてはやや遅め
- 初期HTMLが82KB — Next 16のSSR出力としては許容範囲だが Geist サブセット2種類読み込み済み
- `link rel="preload"` font crossorigin — 適切
- CLS懸念: HomeExamGrid が `progress = computeExamProgress()` を useEffect 後に setHydrated → カードのバッジ「未挑戦」→「正答率N%」が遅延入れ替わり。`hydrated` フラグで一旦untouched表示しているため CLSは発生しないがバッジの色が遅延変化する。
- PWA: manifest, ServiceWorkerRegistration ✅

### 8. エラー処理
- ✅ 404 / global-error が整っている。エラーID表示・リトライ動線あり。
- ⚠️ ネット切断時の AI コパイロット失敗: CopilotPanelに WifiOff アイコンimportがあるが、表示パターンを未確認
- ❌ Contact form の `setStatus("error")` 時、 `error` の文字が text-xs / rose-700 — 重要なフィードバックがあまりに小さい

---

## 修正必須項目

### M1. ContactForm 入力欄を text-base に変更 (iOS ズーム防止)
- 該当: `app/contact/ContactForm.tsx` 135, 154, 173 行目
- 現状: `<input className="... text-sm ...">` `<textarea className="... text-sm ...">` (14px)
- 問題点: iOS Safari は input/textarea/select の font-size が 16px 未満だとフォーカス時に自動で 100% → 約 125% にズームインする。これはユーザーの設定変更で抑制不可。ズーム後 viewport が広がり、片手操作で他のUIが画面外に消えるため、フィードバック投稿という最重要動線の体験が破綻する。
- 改善案: `text-sm` を `text-base` (16px) に置き換える。プレースホルダーは小さく見せたければ別途 `placeholder:text-sm` で対応可能だが、本文サイズは16px必須。
- 工数: 5分 / Tailwindクラス置換のみ

### M2. PreRegisterForm の input も text-base に
- 該当: `app/launch/PreRegisterForm.tsx` 53行目
- 現状: `<input className="... text-sm ...">` (14px)
- 問題点: 上に同じ。事前登録CTAのメール入力もズーム発生。
- 改善案: `text-sm` → `text-base`
- 工数: 1分

### M3. Button size="sm" を 44px 確保に
- 該当: `components/ui/button.tsx` lines 35 (sm: "h-8 px-3 text-xs")
- 現状: sm は h-8 (32px) text-xs (12px)
- 問題点: WCAG 2.5.5 Target Size (Enhanced) は最低44×44 CSS pxを推奨。Apple HIG 44pt、Material Design 48dp。32pxは「タッチ前提でない管理画面・ダッシュボード」でしか許されない。本プロジェクトはユーザー画面でも `size="sm"` が頻出する。
- 改善案: sm のときは `min-h-[44px]` を強制する、もしくは sm 自体は維持しつつクリック領域を `relative` + `before:absolute -inset-2` で拡張する。後者なら見た目を変えずに44pxヒットエリア確保可能。
- 工数: 30分 / button.tsx の sm variant に min-h パディング再調整

### M4. essays一覧の CTA を size="lg" Button に置換
- 該当: `app/essays/[exam]/page.tsx` 110-115行目
- 現状: `inline-flex ... px-3 py-1.5 text-xs ... bg-sky-600` (高さ約24px)
- 問題点: 論述例カードの「業種別答案を見る」が、最も重要な遷移CTAなのに極端に小さい。タップ域不足・テキスト視認性不足の二重NG。
- 改善案: `<Button asChild variant="primary" size="md" className="w-full">` で 40px高さ、フル幅化。Buttonコンポーネント経由でクラス管理を統一できる。
- 工数: 10分 / コンポーネント置換

### M5. HomeExamGrid Shuffleボタンを 44px 化
- 該当: `components/home/HomeExamGrid.tsx` 234-238行目
- 現状: `h-10 w-10` の絶対配置リンク
- 問題点: 40×40 で 44未満。さらに親カード全域がもうひとつのリンクで覆われており、指の腹（押下中心が下にズレる）で押すと「Shuffleアイコンを狙ったのに試験詳細へ遷移」「試験詳細を狙ったのにShuffleが反応」がランダムに発生する。
- 改善案: (a) `h-11 w-11` に拡大、(b) `before:absolute -inset-1` でタップ領域+8px拡張、(c) z-indexを明示してShuffleが上に来ることをコードで保証
- 工数: 15分

### M6. QuizPlayer back ボタンを 44px 化
- 該当: `components/quiz/QuizPlayer.tsx` 287-294行目
- 現状: `<Button variant="ghost" size="icon">` → h-10 w-10
- 問題点: クイズ離脱の主要動線。誤タップ防止に十分な余白がない。
- 改善案: `size="icon"` の h を 11 (44px) に再定義する、または QuizPlayer 内のみ `className="h-11 w-11"` で上書き
- 工数: 10分

### M7. ContactForm エラーメッセージとカウンタの可読性
- 該当: `app/contact/ContactForm.tsx` 179, 175行目
- 現状: エラー `text-xs` (12px) / 文字カウンタ `text-[11px]` (11px)
- 問題点: 送信失敗 / バリデーションエラーは即座にユーザーが読める必要があるが12pxは読みづらい。文字カウンタも下限近接時に注意喚起が伝わらない。
- 改善案: エラーは `text-sm` (14px) + `font-medium`、カウンタは `text-xs` (12px) のままでも可だが上限80%超で色変更（amber→red）の段階表示を追加
- 工数: 10分

---

## 推奨項目

### R1. ホームに「初心者ナビゲーション」を明示
13区分タイルの上に「あなたは初学者ですか？」→「はい」で IP/SG にハイライト・「いいえ」で /quiz/stream へ、という分岐を加える。あるいはタイルを「初心者向け」「中堅」「上級」の3グループに折り畳む。

### R2. /stats の「準備中」セクションは非表示にする
連携未完のとき該当セクション自体を隠す。`isGscConfigured()` `isPosthogStatsConfigured()` で条件分岐は既に存在するため、Cardごと return null するだけで済む。

### R3. QuizPlayerヘッダー stats を text-sm + ラベル付きに
12pxの "正答 X/Y" は読みにくい。`text-sm font-medium` にし、`正答率 NN%` を併記して直感性を上げる。

### R4. essays/sc 入り口をホームに追加
ホームの SiteHeader ドロップダウンに「論述例（SC）」を追加。差別化点が深い階層に埋もれている。

### R5. ChoiceButton text-sm を text-base に
モバイルで選択肢本文が14pxは厳しい。`text-sm sm:text-base` を `text-base` に統一する。タップ後の解説本文も同様。

### R6. SiteHeader モバイルメニューに「設定」「テーマ切替」を昇格
現状フッターのみ。シートメニュー内に置けば動線短縮。

### R7. CopilotPanel のクイックアクションをチップ式に整理
多すぎる二次ボタン群（コピー・共有・DL等）をオーバーフローメニュー化、メインは「もっと詳しく」「なぜ間違えた」の2つに絞る。

### R8. Footer リンクの py-2 を py-2.5 (40px) に
モバイルで指の段差を意識した間隔に。

### R9. ContactForm のラジオに視覚focus indicator
`<input sr-only>` のため focus 表現がラベル境界線変化のみ。`peer-focus-visible:ring-2` で明示する。

### R10. HomeExamGridカードの hover translate を click 不可な親で発火させない
カード自体はクリックハンドラを持たないのに `hover:-translate-y-0.5` するため「カードがクリック可能」と誤解する。`group-hover` に変更し、内側 Link 上でのみ translate。

### R11. HeroAiDemo の「Q: 公開鍵...」に "サンプル" 表示
aria-hidden済みだが視覚的にも「これはデモ表示です」のミニラベルを左上に。

---

## 観察事項

### O1. SiteHeader ドロップダウンが mouseenter で開く
タッチデバイスでは onMouseEnter は通常click相当でハイブリッドだが、稀に親要素タップ→ドロップダウン開→閉のフラッシュが発生しうる。要実機検証。

### O2. ホーム「近日公開」タイルの opacity-55
WCAG的にはコントラスト比基準を下回る可能性あり。`aria-disabled="true"` は付与済みで意図は伝わるが、視覚的にも「disabled以外はDimさない」が原則。

### O3. ExplanationCard の正解時シェア導線
正解直後に「シェアして仲間と学習しませんか」CTAが出るのは良いが、不正解時も似た領域に「分野別で集中対策」が表示される。一貫したスタックで認知負荷少ない。

### O4. PostHog 計測のオプトアウト導線が見当たらない
プライバシーポリシーには記載があるが、UIで明示的なオプトアウトトグルがあるとEU/CCPA訴求にもなる。

### O5. ダークモード切替がフッターのみ
発見性が低い。SiteHeader 右上に ThemeToggle を出しても良い。

### O6. /quiz の左スワイプ案内が初回だけ表示
LS_KEYS.swipeHintShown で1回きり。ユーザー記憶に依存。設定画面で再表示できると親切。

### O7. AIコパイロット応答待ち時のスケルトンUI
要確認。応答開始まで体感1-3秒だが、ローディング中の心理的「動いてる感」のフィードバック品質を別途検証推奨。

### O8. ナビゲーションロゴ「過去問AI」のクリック領域
SiteLogo の中身を読まずに評価しているが、ヘッダーのhomeリンクが `min-h-[44px] items-center` で確保済み。良い。

---

## デザイン負債リスク (将来禍根)

### D1. 「全試験タイル平置き」スタイルが拡張不可
13試験でぎりぎり、追加コンテンツ（午後・午前I/II・模試別表示）が出てきたとき破綻する。早めに「試験を選ぶ」ステップを分離した IA を検討すべき。

### D2. variant が多いButton コンポーネント
9 variant × 6 size = 54通り。"primary" "gradient" "soft" 等が混在しており、どれを使うかが暗黙知になっている。Storybookか variant 用ドキュメントが必要。

### D3. ハードコードされた hex / Tailwind色クラス
ChoiceButton, ExplanationCard 等で `bg-emerald-50` `text-red-700` 等を直書きしている。`bg-success-soft` `text-destructive-fg` 等のセマンティックエイリアスへ移行すべき。トークンは globals.css にあるのに、コンポーネントが直接 zinc/red/emerald を呼んでいるため、ブランド変更時に大量置換が必要になる。

### D4. text-xs / text-[10px] / text-[11px] の散発使用
470箇所超。フォントサイズ階段が破綻している。「12px以下のフォントは存在しない」を原則化し、tailwind config で `xs` を 13px に再定義するなど制度化が必要。

### D5. essays は SC のみ専用ルート
将来 PM / SM / ST にも論述を広げると `/essays/[exam]/...` だけで対応できるか要再確認。
