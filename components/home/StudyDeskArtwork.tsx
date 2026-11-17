import { useId } from "react";
import type { SeatMascot } from "@/lib/home/study-room";
import type { RoomSeatPosition, StudyRoomScene } from "@/lib/home/study-room-scenes";
import { cn } from "@/lib/utils";

/** The source chair stays behind the body; the source desktop occludes its lower half.
 * Only the character is taken from the qualification art, never its differently angled desk. */
export function StudyDeskArtwork({ mascot, name, point, scene, seed }: {
  mascot: SeatMascot; name: string; point: RoomSeatPosition; scene: StudyRoomScene; seed: number;
}) {
  const id = useId().replaceAll(":", "");
  const imageWidth = scene.width / (scene.columns ?? 1);
  const localX = point.x % imageWidth;
  const ratio = 256 / point.width;
  const desktop = ((point.deskY ?? point.y) - point.y) * ratio + 128;
  const turn = seed % 5 - 2;
  const bodyClass = cn("absolute inset-0 block origin-[50%_62%] [clip-path:polygon(25%_11%,80%_11%,80%_40%,69%_53%,69%_69%,51%_76%,34%_73%,31%_62%,33%_52%,31%_45%)]", mascot.mirrored && "-scale-x-100");
  const poseStyle = { rotate: `${turn}deg`, translate: `${(seed % 3) - 1}% 0` };
  return <span className="pointer-events-none absolute inset-0 block" data-desk-artwork>
    <span className={cn("study-mascot", bodyClass)} style={poseStyle}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={mascot.src} alt={`${name}のチワワ（${mascot.stateLabel}）`} width={256} height={256} loading="lazy" decoding="async"
        className="size-full translate-x-[9%] translate-y-[11%] object-contain" />
    </span>
    <svg viewBox="0 0 256 256" aria-hidden="true" className="absolute inset-0 size-full overflow-visible">
      <defs><clipPath id={`${id}-desk`}><rect x="0" y={desktop} width="256" height={256 - desktop} /></clipPath></defs>
      <g data-layer="desktop" clipPath={`url(#${id}-desk)`}>
        <image href={scene.background!} x={128 - localX * ratio} y={128 - point.y * ratio} width={imageWidth * ratio} height={scene.height * ratio} />
      </g>
      <g data-study-tools transform={`translate(${seed % 3 - 1} ${desktop - 160}) rotate(${turn} 128 180)`} strokeLinecap="round" strokeLinejoin="round">
        {/* Open notebook, two different paper tones and a pencil on every occupied desk. */}
        <path d="M64 172 Q89 164 120 173 Q144 166 169 174 L176 194 Q148 188 121 198 Q92 187 61 194Z" fill="#80684b" opacity=".22" transform="translate(1 2)" />
        <path d="M63 169 Q89 162 120 171 L121 195 Q92 185 59 191Z" fill="#fff6d9" stroke="#ac8d60" strokeWidth="1.4" />
        <path d="M120 171 Q144 164 168 172 L175 192 Q147 186 121 195Z" fill="#f1e5be" stroke="#ac8d60" strokeWidth="1.4" />
        <path d="M120 172 121 194 M72 174 108 177 M70 179 107 182 M134 176 159 176 M136 182 163 183" fill="none" stroke="#b8aa8c" strokeWidth="1.2" />
        <path d="m162 181 27-10" stroke="#806137" strokeWidth="4" /><path d="m163 180 24-9" stroke="#efbe59" strokeWidth="2.5" /><path d="m160 182 4-3" stroke="#423a31" strokeWidth="1.4" />
        {seed % 3 === 0 ? <g data-tool="laptop"><path d="m162 162 9-28 37 3-6 28Z" fill="#586767" stroke="#354849" strokeWidth="2" /><path d="m174 139 28 2-4 19-29-2Z" fill="#99b6b2" /><path d="m162 163 40 2 11 9-39-1Z" fill="#89938a" stroke="#5b665f" strokeWidth="1.5" /></g>
          : seed % 3 === 1 ? <g data-tool="calculator" transform="rotate(9 192 171)"><rect x="180" y="157" width="24" height="29" rx="3" fill="#607f78" stroke="#3f5b52" /><path d="M184 162H200V168H184Z" fill="#b5c8a0" /><path d="M185 174h2m5 0h2m5 0h1m-15 5h2m5 0h2m5 0h1" stroke="#ede6ca" strokeWidth="2" /></g>
            : <g data-tool="books"><path d="m178 164 26 3-1 15-26-3Z" fill="#6f8871" stroke="#506650" /><path d="m178 175 24 3" stroke="#e7dbba" strokeWidth="3" /></g>}
      </g>
    </svg>
    {/* Reuse the actual front paws (and a sleeping chin), so a reader never gains extra limbs. */}
    <span aria-hidden="true" className="absolute inset-0 block [clip-path:inset(62.5%_0_27%_0)]" data-layer="forepaws">
      <span className={bodyClass} style={poseStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mascot.src} alt="" width={256} height={256} loading="lazy" decoding="async" className="size-full translate-x-[9%] translate-y-[11%] object-contain" />
      </span>
    </span>
  </span>;
}
