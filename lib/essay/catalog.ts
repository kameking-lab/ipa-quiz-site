import catalog from "./catalog.generated.json";
import type {EssayQuestion} from "./types";
const records=catalog as Array<Pick<EssayQuestion,"id"|"title"|"exam"|"year"|"season"|"qNumber">>;
export function getEssayCatalogByExam(exam:EssayQuestion["exam"]) {
  return records.filter(q=>q.exam===exam).sort((a,b)=>b.year-a.year||a.season.localeCompare(b.season)||a.qNumber-b.qNumber);
}
