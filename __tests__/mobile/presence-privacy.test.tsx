import { render, cleanup } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
vi.mock("@/mobile/shared/contracts",()=>({nativeClient:()=>true}));
import { StudyPresence } from "@/components/StudyPresence";
import { reportStudyAnswer } from "@/lib/study-presence-client";
afterEach(()=>{cleanup();vi.unstubAllGlobals();});
it("never creates a browser identifier or sends presence from the native app",()=>{
  const request=vi.fn();vi.stubGlobal("fetch",request);
  const write=vi.spyOn(Storage.prototype,"setItem");
  render(<div data-study-presence-viewer><StudyPresence /></div>);
  reportStudyAnswer("ap");
  expect(request).not.toHaveBeenCalled();expect(write).not.toHaveBeenCalled();write.mockRestore();
});
