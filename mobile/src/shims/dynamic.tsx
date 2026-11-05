import { lazy, Suspense, type ComponentType } from "react";
export default function dynamic<P extends object>(loader: ()=>Promise<ComponentType<P> | { default: ComponentType<P> }>, _options?: unknown): ComponentType<P> {
  void _options;
  const Component=lazy(async()=>{ const m=await loader(); return { default:typeof m==="function"?m:(m as { default:ComponentType<P> }).default }; });
  return function Dynamic(props:P) { return <Suspense fallback={null}><Component {...props}/></Suspense>; };
}
