export interface HeroVariant {
  src: string;
  alt: string;
}

export const HERO_VARIANTS: readonly HeroVariant[] = [
  { src: "/images/home/hero-variants/01-morning-window.webp", alt: "朝の窓辺で本を読み、ノートに書き込むチワワたちのイラスト" },
  { src: "/images/home/hero-variants/02-rainy-library.webp", alt: "雨の図書室で一緒に本を読むチワワたちのイラスト" },
  { src: "/images/home/hero-variants/03-evening-lamps.webp", alt: "夜のランプの明かりの下で本を開くチワワたちのイラスト" },
  { src: "/images/home/hero-variants/04-garden-room.webp", alt: "庭が見える部屋で読み書きするチワワたちのイラスト" },
  { src: "/images/home/hero-variants/05-autumn-window.webp", alt: "秋の窓辺でノートを広げて勉強するチワワたちのイラスト" },
  { src: "/images/home/hero-variants/06-winter-nook.webp", alt: "雪の見える窓辺で本を開き鉛筆を持つチワワたちのイラスト" },
  { src: "/images/home/hero-variants/07-globe-learning.webp", alt: "地球儀と地図を見ながら学ぶチワワたちのイラスト" },
  { src: "/images/home/hero-variants/08-quiet-reading.webp", alt: "本と羽根ペンを使って静かに勉強するチワワたちのイラスト" },
  { src: "/images/home/hero-small-success.webp", alt: "紺のリボンと緑のベストのチワワが、図書室で勉強の合間にハイタッチするイラスト" },
  { src: "/images/home/hero-variants/10-new-day-plan.webp", alt: "明るい図書室で本とノートを広げるチワワたちのイラスト" },
];

export const DEFAULT_HERO = HERO_VARIANTS[8];

export function selectHeroVariant(random: number): HeroVariant {
  return HERO_VARIANTS[Math.floor(random * HERO_VARIANTS.length)];
}
