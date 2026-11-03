import {writeFile,mkdir} from "node:fs/promises";
import {getQuestionsForExam} from "../../lib/questions/get-questions";
import {isPracticeReadyQuestion} from "../../lib/questions/filter";
import {materialGroups} from "../shared/material-source";
const questions=(await getQuestionsForExam("ip")).filter(q=>isPracticeReadyQuestion(q)&&q.type==="multiple-choice"&&!q.hasImage&&!q.requiredSelections).slice(0,2);
await mkdir(new URL("../.cache/",import.meta.url),{recursive:true});
await writeFile(new URL("../.cache/e2e-questions.json",import.meta.url),JSON.stringify(questions));
await writeFile(new URL("../.cache/e2e-material.json",import.meta.url),JSON.stringify(materialGroups().find(g=>g.code==="material.fp3-practical")!.items[0]));
