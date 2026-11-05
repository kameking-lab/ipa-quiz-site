import {writeFile,mkdir} from "node:fs/promises";
import {fileURLToPath} from "node:url";
process.chdir(fileURLToPath(new URL("../../",import.meta.url)));
const {getQuestionsForExam}=await import("../../lib/questions/get-questions");
const {isPracticeReadyQuestion}=await import("../../lib/questions/filter");
const {materialGroups}=await import("../shared/material-source");
const {examContent,examCatalog}=await import("../shared/catalog-source");
const questions=(await getQuestionsForExam("ip")).filter(q=>isPracticeReadyQuestion(q)&&q.type==="multiple-choice"&&!q.hasImage&&!q.requiredSelections).slice(0,2);
await mkdir(new URL("../.cache/",import.meta.url),{recursive:true});
await writeFile(new URL("../.cache/e2e-questions.json",import.meta.url),JSON.stringify(questions));
await writeFile(new URL("../.cache/e2e-material.json",import.meta.url),JSON.stringify(materialGroups().find(g=>g.code==="material.fp3-practical")!.items[0]));
const figureIds=["lckohyo-LC20260401-2-q2","cskohyo-CS20251905-q4","cskohyo-CS20241911-q4"];
await writeFile(new URL("../.cache/e2e-answer-figures.json",import.meta.url),JSON.stringify(await Promise.all(figureIds.map(async id=>{
  const code=`library.${id.replace(/-q\d+$/,"")}`;
  return {entry:await examCatalog(code),question:(await examContent(code))!.find(q=>q.id===id)};
}))));
