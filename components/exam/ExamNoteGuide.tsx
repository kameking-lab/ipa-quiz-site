import type { ExamCode } from "@/lib/questions/types";
import { ExamNoteCatalog } from "@/components/exam/ExamNoteCatalog";

export function ExamNoteGuide({ exam }: { exam: ExamCode }) { return <ExamNoteCatalog exam={exam} />; }
