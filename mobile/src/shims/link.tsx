import type { AnchorHTMLAttributes, ReactNode } from "react";
const ORIGIN = "https://www.kakomon-ai.jp";
export default function Link({ href,children,...props }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string | { pathname?: string }; children?: ReactNode; prefetch?: boolean }) {
  const { prefetch: _prefetch,...rest }=props;
  void _prefetch;
  const path=typeof href==="string"?href:href.pathname??"/";
  return <a {...rest} href={path.startsWith("/")?ORIGIN+path:path}>{children}</a>;
}
