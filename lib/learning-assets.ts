import registry from "@/data/exam-library/answer-figures.json";

export interface AnswerFigure { src: string; alt: string; width: number; height: number; official?: boolean }
export interface LearningAssets { version: 1; files: string[]; answerFigures: AnswerFigure[] }
const answerFigures: Record<string, AnswerFigure[]> = registry;
const ORIGIN = "https://www.kakomon-ai.jp";

/** The display registry is part of the content contract, including before first viewing. */
export function answerFiguresFor(question: {id: string; learningAssets?: LearningAssets}): readonly AnswerFigure[] {
  return question.learningAssets?.answerFigures ?? answerFigures[question.id] ?? [];
}

/** One inventory for durable save, integrity checks and renderer references. */
export function learningAssetUrls(value: unknown): string[] {
  const urls = new Set<string>();
  const referencePdfs = JSON.stringify(value).includes('"originalReferenceRequired":true');
  const visit = (v: unknown) => {
    if (typeof v === "string") {
      const candidates = [v, ...Array.from(v.matchAll(/(?:https?:\/\/[^\s"'<>()[\]]+|\/[\w./%-]+)\.(?:png|jpe?g|webp|gif|svg)(?:\?[^\s"'<>()[\]]*)?/gi), m=>m[0])];
      for (const raw of candidates) {
        let u: URL; try { u = new URL(raw, ORIGIN); } catch { continue; }
        if (/\.(png|jpe?g|webp|gif|svg)$/i.test(u.pathname)) {
          if (u.origin !== ORIGIN) throw new Error("外部画像は保存できません。");
          urls.add(u.href);
        } else if (referencePdfs && u.protocol === "https:" && u.hostname === "www.ipa.go.jp" && u.pathname.endsWith(".pdf")) urls.add(u.href);
      }
    } else if (Array.isArray(v)) v.forEach(visit);
    else if (v && typeof v === "object") {
      const q = v as {id?: unknown; learningAssets?: LearningAssets};
      if (typeof q.id === "string" && !q.learningAssets) visit(answerFigures[q.id] ?? []);
      Object.values(v).forEach(visit);
    }
  };
  visit(value);
  return [...urls].sort();
}

export function withLearningAssets<T extends {id:string}>(question: T): T & {learningAssets: LearningAssets} {
  return {...question, learningAssets: {version: 1, files: learningAssetUrls(question), answerFigures: [...answerFiguresFor(question)]}};
}
