import { getNativeQuestionSource } from "@/lib/denken2/native";
import type {ElectricalNativeQuestion,ElectricalNativeReaderConfig} from "@/lib/electrical/native-types";
import {NativeReaderView} from "./NativeReaderView";
export function NativeReader({question,readerConfig}:{question:ElectricalNativeQuestion;readerConfig?:ElectricalNativeReaderConfig}) {
  if (readerConfig) return <NativeReaderView question={question} readerConfig={readerConfig} />;
  const source = getNativeQuestionSource(question.year, question.subject);
  if (!source) throw new Error(`Native edition missing: ${question.id}`);
  return <NativeReaderView question={question} readerConfig={{
    examName: "電験二種", examPath: "/denken2" as const,
    sourceAnswerUrl: source.sourceAnswerUrl, sourceIndexUrl: source.sourceIndexUrl,
    lawReferenceDate: source.lawReferenceDate,
  }} />;
}
