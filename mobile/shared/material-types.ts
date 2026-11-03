import type {ElectricalNativeQuestion,ElectricalNativeReaderConfig} from "@/lib/electrical/native-types";
import type {SecondaryQuestion} from "@/lib/denken2/secondary";
import type {PracticalQuestion as Fp2Question,getPracticalEdition as fp2} from "@/lib/fp2/practical";
import type {PracticalQuestion as Fp3Question,getPracticalEdition as fp3} from "@/lib/fp3/practical";
import type {Fp1AppliedEdition,Fp1AppliedQuestion} from "@/lib/fp1/applied";
import type {Fp1AppliedExtension,Fp1AppliedExtensionQuestion} from "@/lib/fp1/applied-extension";
import type {SentakuQuestion} from "@/lib/sharoushi/sentaku";
import type {ChushoCase,ChushoQuestion} from "@/lib/chusho-secondary/data";
import type {EssayQuestion} from "@/lib/essay/types";
type Base={id:string;title:string;href:string};
export type Material = Base & (
  {kind:"native";question:ElectricalNativeQuestion;readerConfig:ElectricalNativeReaderConfig}
  | {kind:"secondary";question:SecondaryQuestion}
  | {kind:"fp2";edition:string;data:Omit<NonNullable<ReturnType<typeof fp2>>,"questions">;q:Fp2Question;source:{question:string;answer:string}}
  | {kind:"fp3";edition:string;data:Omit<NonNullable<ReturnType<typeof fp3>>,"questions">;q:Fp3Question;source:{question:string;answer:string}}
  | {kind:"fp1";edition:string;data:Omit<Fp1AppliedEdition,"questions">;question:Fp1AppliedQuestion}
  | {kind:"fp1-extension";data:Omit<Fp1AppliedExtension,"questions">;question:Fp1AppliedExtensionQuestion}
  | {kind:"sentaku";question:SentakuQuestion}
  | {kind:"chusho";paper:ChushoCase;question:ChushoQuestion}
  | {kind:"essay";question:EssayQuestion}
);
