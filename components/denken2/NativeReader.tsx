import { NATIVE_EDITIONS } from "@/lib/denken2/native";
import type {ElectricalNativeQuestion,ElectricalNativeReaderConfig} from "@/lib/electrical/native-types";
import {NativeReaderView} from "./NativeReaderView";
export function NativeReader({question,readerConfig}:{question:ElectricalNativeQuestion;readerConfig?:ElectricalNativeReaderConfig}) {
  const edition = NATIVE_EDITIONS.find(item => item.year === question.year);
  const config = readerConfig ?? (edition ? {
    examName: "電験二種", examPath: "/denken2" as const,
    sourceAnswerUrl: edition.sourceAnswerUrl, sourceIndexUrl: edition.sourceIndexUrl,
  } : null);
  if (!config) throw new Error("Native edition missing");
  return <NativeReaderView question={question} readerConfig={config}/>;
}
