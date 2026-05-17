# Vercel本番復旧完了報告

作成日: 2026-05-18
復旧完了時刻: 2026-05-17 15:33 JST (approx)

## 停止期間

開始: 2026-05-17 朝 (最初の production error 確認)
解消: 2026-05-17 15:33 JST
停止時間: 約11時間

## 根本原因

dynamicParams=false の設定が Next.js 16.2.6 + @vercel/next の post-build phase で
"Maximum call stack size exceeded" stack overflow を引き起こしていた。

対象ファイル:
- app/blog/[slug]/page.tsx (commit 141d9c4)
- app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx (commit e297b05)
- app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx (commit 4d126ce)

確定根拠:
- preview deploy (investigate/dynamic-params-revert ブランチ): Ready in 5m 55s
- production deploy (main, dynamicParams=false 含む): Error 14m 46s / 14m 48s (2連続同一)
- preview が production failure time の半分以下 = post-build phaseに到達する前に完走

## 修正内容

PR #288: fix(build): revert dynamicParams=false to restore Vercel production deployment
マージ SHA: 194eb4f6845ff5ae086655eb17a940ee5336bbac
main HEAD: 194eb4f

commit 11ffa3e で3ファイル全部のrevertを実施:
- app/blog/[slug]/page.tsx: dynamicParams=false 削除
- app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx: dynamicParams=false 削除
- app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx: dynamicParams=false → true に戻し、SSG_MIN_YEAR=2024 で generateStaticParams を制限

## 復旧 production deployment

deployment ID: dpl_JBMXZHKhfjrpmwizSQhxhTPBfWwm
URL: ipa-quiz-site-7xg3pccof-kameking-labs-projects.vercel.app
status: Ready
duration: 6m (失敗時の15mから大幅短縮)
commit SHA: 194eb4f6

## 本番curl検証結果

https://www.kakomon-ai.jp/ : HTTP 200 OK
/study-plan 「自動学習スケジュール作成」: 出力確認 (3件マッチ)
/study-plan 「AI学習スケジュール作成」: 出力なし (旧表記消失確認)
/quiz : HTTP 308 → 200 (redirect 正常)
/essays/ap/2024-spring/pm2/q1 : HTTP 200 OK
/blog : HTTP 200 OK
/search : HTTP 200 OK
/mock-exam : HTTP 200 OK
/success-stories : HTTP 200 OK

## 反映された機能

PR #268 〜 #288 の全変更がユーザーに到達。主要なもの:
- NEW-01修正: /study-plan の「AI学習スケジュール作成」→「自動学習スケジュール作成」
- Vercel recovery workflow の整備 (PR #284, #286, #287)
- その他 PR #268-#283 の機能改善・バグ修正

## 残存課題

soft-404 問題 (/blog/*, /q/* で nonexistent slug が HTTP 200 + 「見つかりません」表示) は
本PR対象外。中期対応として logs/soft-404-followup-plan.md に計画書を作成済み。
