import { SupplementReader } from "./SupplementReader";
import { NativeQuestionGate } from "../shared/NativeQuestionGate";
import {NativeReaderView} from "@/components/denken2/NativeReaderView";
import {SecondaryReader} from "@/components/denken2/SecondaryReader";
import {Fp1AppliedView} from "@/components/quiz/Fp1AppliedView";
import {Fp2PracticalView} from "@/components/quiz/Fp2PracticalView";
import {Fp3PracticalView} from "@/components/quiz/Fp3PracticalView";
import {AppliedExtensionPage} from "@/app/fp1/applied/_components/extension-page";
import {SentakuReader} from "@/app/sharoushi/sentaku/_components/reader";
import {CaseQuestionView} from "@/components/chusho-secondary/CaseQuestionView";
import {EssayEditor} from "@/components/essay/EssayEditor";
import type {Material} from "../shared/material-types";
function MaterialReaderBody({material:m}:{material:Material}) {
  switch(m.kind) {
    case "essay-example": return <article className="space-y-5"><h1>{m.question.theme}</h1><p>独自練習の参考答案です。公式解答ではありません。</p><p className="whitespace-pre-wrap">{m.question.context}</p>{m.question.industries.map(v=><details key={v.industryId}><summary>{v.industryName}の参考答案</summary>{[v.intro,v.body,v.conclusion].map((text,i)=><p className="whitespace-pre-wrap" key={i}>{text}</p>)}</details>)}</article>;
    case "denko2-skill": case "annotated-note": return <SupplementReader material={m}/>;
    case "native":return <NativeReaderView question={m.question} readerConfig={m.readerConfig}/>;
    case "secondary":return <SecondaryReader question={m.question}/>;
    case "fp1":return <Fp1AppliedView edition={m.edition} data={m.data} question={m.question}/>;
    case "fp1-extension":return <AppliedExtensionPage data={m.data} question={m.question}/>;
    case "fp2":return <Fp2PracticalView edition={m.edition} data={m.data} q={m.q} source={m.source}/>;
    case "fp3":return <Fp3PracticalView edition={m.edition} data={m.data} q={m.q} source={m.source}/>;
    case "sentaku":return <SentakuReader question={m.question}/>;
    case "chusho":return <CaseQuestionView paper={m.paper} question={m.question}/>;
    case "essay":return <section className="space-y-4"><h1>{m.question.title}</h1><p>AI採点はオンラインで実行します。入力と下書きは端末に保存できます。</p><EssayEditor question={m.question}/></section>;
  }
}
export default function MaterialReader({material}:{material:Material}) {return <NativeQuestionGate id={material.id}><MaterialReaderBody material={material}/></NativeQuestionGate>;}
