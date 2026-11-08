import first from "./khk-hanbai/questions.json";
import second from "./khk-hanbai2/questions.json";
import equipment from "./khk-setsubishi/questions.json";

/** Editorial staging only. Public registries and application routes must not import this module. */
export const KHK_HANBAI_STAGING = [
  { slug: "khk-hanbai", name: "高圧ガス販売主任者 第一種", publicAllowed: false, questions: first },
  { slug: "khk-hanbai2", name: "高圧ガス販売主任者 第二種", publicAllowed: false, questions: second },
  { slug: "khk-setsubishi", name: "液化石油ガス設備士（学科）", publicAllowed: false, questions: equipment },
] as const;
