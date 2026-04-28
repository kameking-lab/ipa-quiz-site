import type { Metadata } from "next";
import { ApiKeysClient } from "./ApiKeysClient";

export const metadata: Metadata = {
  title: "API キー管理｜過去問AI",
  description:
    "過去問AI Public API（β）で利用する API キーを発行・管理します。",
  alternates: { canonical: "/account/api-keys" },
  robots: { index: false, follow: false },
};

export default function ApiKeysPage() {
  return <ApiKeysClient />;
}
