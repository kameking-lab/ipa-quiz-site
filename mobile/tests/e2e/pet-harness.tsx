import { createRoot, type Root } from "react-dom/client";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import type { Question } from "@/lib/questions/types";
import { installPetLocalPlatform } from "@/lib/pet/v1/platform";
import { portablePetOwner, restoreStudy, studyOwner } from "../../src/portable-storage";
import { persistStudyAfterPets } from "../../src/pet-support";
declare global { interface Window { petTest: { start(question:Question, owner?:string|null):Promise<void>; background():Promise<void> } } }
let root:Root|null=null, currentOwner:string|null=null, installed=false;
window.petTest={
  async start(question,owner) {
    currentOwner=owner===undefined?await studyOwner(null):owner;await restoreStudy(currentOwner);
    if(!installed){installPetLocalPlatform({resolveOwner:portablePetOwner});installed=true;}
    root??=createRoot(document.getElementById("root")!);
    root.render(<QuizPlayer key={currentOwner??"guest"} question={question} index={0} total={1} mode="random" exam={question.exam} backHref="/" onNext={()=>{}}/>);
  },
  async background(){await persistStudyAfterPets(currentOwner);},
};
