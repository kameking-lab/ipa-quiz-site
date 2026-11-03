"use client";

import { useEffect, useState } from "react";

/** Keep navigation and viewport changes from leaving a modal over the next page. */
export function useMobileMenu(pathname: string | null) {
  const [state, setState] = useState({ pathname, open: false });
  if (state.pathname !== pathname) setState({ pathname, open: false });

  useEffect(() => {
    const close = () => setState(current => ({ ...current, open: false }));
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpoint = () => { if (desktop.matches) close(); };
    window.addEventListener("popstate", close);
    window.addEventListener("hashchange", close);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("popstate", close);
      window.removeEventListener("hashchange", close);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, []);

  const setOpen = (open: boolean) => setState({ pathname, open });
  return [state.pathname === pathname && state.open, setOpen] as const;
}
