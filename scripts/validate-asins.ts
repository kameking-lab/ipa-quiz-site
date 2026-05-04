/**
 * Static validator for data/recommended-books.ts.
 *
 * - Every book must have a non-placeholder ASIN and Rakuten ID.
 * - ASIN must be 10 alphanumeric chars (Amazon's format).
 * - Exits 1 on any failure so it can run in CI before deploy.
 *
 * Usage: pnpm validate:asins
 */
import { RECOMMENDED_BOOKS } from "@/data/recommended-books";

const ASIN_PATTERN = /^[A-Z0-9]{10}$/;
const RAKUTEN_PATTERN = /^[0-9]+$/;

interface Failure {
  exam: string;
  bookId: string;
  field: "asin" | "rakutenId";
  value: string;
  reason: string;
}

const failures: Failure[] = [];
let total = 0;

for (const [exam, books] of Object.entries(RECOMMENDED_BOOKS)) {
  for (const book of books) {
    total += 1;
    if (!book.asin || book.asin === "ASIN_TO_BE_FILLED") {
      failures.push({
        exam,
        bookId: book.id,
        field: "asin",
        value: book.asin,
        reason: "プレースホルダ／空欄",
      });
    } else if (!ASIN_PATTERN.test(book.asin)) {
      failures.push({
        exam,
        bookId: book.id,
        field: "asin",
        value: book.asin,
        reason: "10桁英数字でない (Amazon ASIN フォーマット違反)",
      });
    }

    if (!book.rakutenId || book.rakutenId === "RAKUTEN_ID_TO_BE_FILLED") {
      failures.push({
        exam,
        bookId: book.id,
        field: "rakutenId",
        value: book.rakutenId,
        reason: "プレースホルダ／空欄",
      });
    } else if (!RAKUTEN_PATTERN.test(book.rakutenId)) {
      failures.push({
        exam,
        bookId: book.id,
        field: "rakutenId",
        value: book.rakutenId,
        reason: "数字のみで構成されていない",
      });
    }
  }
}

if (failures.length === 0) {
  console.log(`✅ ${total} 冊すべてに有効な ASIN / 楽天 ID が設定されています`);
  process.exit(0);
}

console.log(`❌ ${failures.length} 件の不備 (合計 ${total} 冊):\n`);
for (const f of failures) {
  console.log(`  [${f.exam}] ${f.bookId}.${f.field} = "${f.value}" — ${f.reason}`);
}
process.exit(1);
