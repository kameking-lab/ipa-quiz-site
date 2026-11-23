import { afterEach, expect, it, vi } from "vitest";
import { applyDeviceTheme } from "@/mobile/src/theme";
afterEach(()=>{vi.unstubAllGlobals();document.documentElement.classList.remove("dark");document.documentElement.style.colorScheme="";});
it("applies dark at startup and tracks a change back to light",()=>{
  let listener=()=>{};
  const media={matches:true,addEventListener:vi.fn((_name:string,cb:()=>void)=>{listener=cb;}),removeEventListener:vi.fn()};
  vi.stubGlobal("matchMedia",()=>media);
  const stop=applyDeviceTheme();expect(document.documentElement).toHaveClass("dark");
  media.matches=false;listener();expect(document.documentElement).not.toHaveClass("dark");
  expect(document.documentElement.style.colorScheme).toBe("light");stop();expect(media.removeEventListener).toHaveBeenCalled();
});
