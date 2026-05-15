# Phase 2 完了ログ — exam description diversify

実行日: 2026-05-16

## 数値データ
| exam | count  | years | cats |
|------|--------|-------|------|
| ip   | 2,398  | 24    | 10   |
| sg   | 442    | 11    | 6    |
| fe   | 1,747  | 24    | 9    |
| ap   | 2,960  | 33    | 13   |
| sc   | 1,735  | 32    | 19   |
| nw   | 680    | 16    | 17   |
| db   | 680    | 16    | 19   |
| st   | 680    | 16    | 17   |
| sa   | 680    | 16    | 16   |
| pm   | 680    | 16    | 18   |
| es   | 680    | 16    | 18   |
| sm   | 680    | 16    | 19   |
| au   | 680    | 16    | 17   |

## 文字数検証（全OK）
ip:112 sg:117 fe:118 ap:119 sc:119 nw:121 db:119 st:119 sa:116 pm:122 es:121 sm:122 au:117

## 変更ファイル
lib/seo/exam-meta.ts — EXAM_META_DESC_DIVERSE マップを追加、examMetaDescription デフォルトケースを置換
