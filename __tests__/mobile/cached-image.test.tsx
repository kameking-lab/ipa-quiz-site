import {act,fireEvent,render,screen} from "@testing-library/react";
import {beforeEach,expect,it,vi} from "vitest";
const m=vi.hoisted(()=>({cache:vi.fn()}));
vi.mock("@/mobile/shared/contracts",()=>({nativeClient:()=>true}));
vi.mock("@/mobile/src/images",()=>({cachedImage:m.cache}));
import {CachedImage} from "@/mobile/shared/CachedImage";
beforeEach(()=>vi.resetAllMocks());
it("does not display the preceding question's cached figure while the new figure loads",async()=>{
  m.cache.mockResolvedValueOnce("capacitor://cached/one.png");
  let finish!:(url:string)=>void;
  m.cache.mockImplementationOnce(()=>new Promise<string>(resolve=>{finish=resolve;}));
  const {rerender}=render(<CachedImage src="/one.png" alt="図表"/>);
  await act(async()=>{});expect(screen.getByAltText("図表")).toHaveAttribute("src","capacitor://cached/one.png");
  rerender(<CachedImage src="/two.png" alt="図表"/>);
  expect(screen.getByAltText("図表")).toHaveAttribute("src","/two.png");
  await act(async()=>{});
  await act(async()=>{finish("capacitor://cached/two.png");});
  expect(screen.getByAltText("図表")).toHaveAttribute("src","capacitor://cached/two.png");
});
it("clears a previous figure's error and clears the fallback error when cached bytes load",async()=>{
  m.cache.mockResolvedValue("capacitor://cached/image.png");const onError=vi.fn(),onLoad=vi.fn();
  const {rerender}=render(<CachedImage src="/one.png" alt="図表" onError={onError} onLoad={onLoad}/>);
  fireEvent.error(screen.getByAltText("図表"));expect(screen.getByRole("note")).toBeVisible();expect(onError).toHaveBeenCalledOnce();
  rerender(<CachedImage src="/two.png" alt="図表" onError={onError} onLoad={onLoad}/>);
  expect(screen.queryByRole("note")).toBeNull();
  await act(async()=>{});fireEvent.error(screen.getByAltText("図表"));fireEvent.load(screen.getByAltText("図表"));
  expect(screen.queryByRole("note")).toBeNull();expect(onLoad).toHaveBeenCalledOnce();
});
