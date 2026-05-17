# soft-404 中期対応計画

作成日: 2026-05-18
関連PR: #288 (dynamicParams=false revert)

## 問題

/blog/* と /q/* において、存在しないスラグへのアクセスが HTTP 200 + 「見つかりません」表示になる (soft-404)。
SEO 観点では Google がこれを 404 と認識しない可能性があり、インデックス汚染リスクがある。

## 現状整理

/essays/* は generateStaticParams + notFound() の組み合わせで正常に HTTP 404 を返している。
これが参考実装になる。

revert 前後の挙動比較:
- /blog/[slug] : revert 前も後も HTTP 200 + 「見つかりません」 (soft-404, 変化なし)
- /q/[exam]/[yearSeason]/[section]/[qnum] : revert 前も後も HTTP 200 + 「見つかりません」 (soft-404, 変化なし)
- /essays/* : revert 前も後も HTTP 404 (hard-404, 変化なし)

つまり dynamicParams=false は build を壊しただけで runtime 404 化は実現していなかった。

## 修正方針候補

### 案 A: page.tsx で notFound() 呼び出し (推奨)

/essays/* の実装を参考に、page.tsx の resolveXxx() が null を返した場合に notFound() を呼ぶ。

/blog/[slug]/page.tsx:
```ts
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();
  // ...
}
```

/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx:
```ts
import { notFound } from "next/navigation";

export default async function QuizPage({ params }) {
  const question = resolveQuestion(params);
  if (!question) notFound();
  // ...
}
```

注意: dynamicParams=true (revert 後の現状) + notFound() の組み合わせは Next.js 16 + Turbopack で
HTTP 404 を正しく返すことが /essays/* で実証済み。dynamicParams=false は不要。

### 案 B: middleware.ts で route validation

/blog/[slug] と /q/* のパスに対し middleware でスラグの存在確認 + NextResponse.rewrite("/404")。
ただし middleware は Edge Runtime なので DB/FS アクセスが制限され、データ依存が大きい本案は実装コストが高い。

### 案 C: catch-all route

[...slug]/page.tsx で fallback を捕捉して notFound()。ルーティング構造が複雑化するため推奨しない。

## 推奨: 案 A

実装コスト: 2-4時間
影響範囲: /blog/[slug]/page.tsx と /q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx のみ
リスク: 低 (既存の /essays/* と同じパターン)

## 注意事項

過去の dynamicParams=false アプローチは Next.js 16.2.6 + @vercel/next の post-build phase で
"Maximum call stack size exceeded" エラーを引き起こすことが本番で確認済み。
再採用禁止。

## 優先度・タイミング

優先度: 中 (SEO 改善、ユーザー体験への直接影響は小)
タイミング: ローンチ後、フェーズ 2 の課題として対応
