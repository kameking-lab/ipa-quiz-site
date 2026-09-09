# AdSense 本文末尾ユニット実装

- publisher: `ca-pub-8751260838396451`
- unit: `kakomon-ai-content-end-responsive` / slot `3773902048`
- 表示: `/blog/[slug]` と `/[exam]` の本文末尾だけ。quiz、採点、account、架空success storyには配置しない。
- 読込: 対象ページ内で `lazyOnload`。幅確定後に一度だけ `adsbygoogle.push({})`。幅0は ResizeObserver で再試行し、同期例外または `unfilled` は枠を隠す。
- 所有権: root metadata と `public/ads.txt`。
- 開示: privacy の Google AdSense/Cookie/広告設定、stats の旧「広告なし」表示を訂正。

検証: component test 3/3、対象 ESLint、typecheck、production build成功。ローカルproduction renderで blog/APはslotあり、quiz/essay/account/success-storyはslotなし。metadata、ads.txt、privacy、statsも確認。
