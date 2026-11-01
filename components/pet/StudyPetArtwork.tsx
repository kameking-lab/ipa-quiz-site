import type { PetOutfit, PetStage } from "@/lib/pet/types";
import { useState } from "react";

export type StudyPetArtPose = "guide" | "study" | "celebrate" | "feed-ready" | "feed" | "feed-chew" | "feed-done" | "dress";
export type StudyPetWardrobe = "none" | "bandana" | "bow" | "scarf";
export interface StudyPetAtlas {
  src: string;
  width: number;
  height: number;
  frames: Partial<Record<`${StudyPetArtPose}:${PetOutfit}`, { x: number; y: number; width: number; height: number }>>;
}

// Coordinates are in the common 160-unit image box. Feeding frames use their
// own neck anchor; fallback always uses the original guide's anchor.
const atlasAnchors: Record<StudyPetArtPose, readonly [number, number, number]> = {
  guide: [59, 91, 0], study: [83, 87, 0], celebrate: [94, 95, 0], dress: [59, 91, 0],
  "feed-ready": [80, 96, 0], feed: [98, 128, 0], "feed-chew": [80, 96, 0], "feed-done": [82, 96, 0],
};
const originalAnchors: Record<StudyPetArtPose, readonly [number, number, number]> = {
  guide: [59, 91, 0], study: [83, 87, 0], celebrate: [94, 95, 0], dress: [59, 91, 0],
  "feed-ready": [59, 91, 0], feed: [59, 91, 0], "feed-chew": [59, 91, 0], "feed-done": [59, 91, 0],
};

function Wearable({ wardrobe, anchor }: { wardrobe: "bow" | "scarf" | "bandana"; anchor: readonly [number, number, number] }) {
  const [x, y, angle] = anchor;
  return <svg className="study-pet-wearable" viewBox="0 0 160 160" aria-hidden="true" focusable="false" data-wearable={wardrobe}>
    <g transform={`translate(${x} ${y}) rotate(${angle})`} stroke="#704b47" strokeWidth="1.2" strokeLinejoin="round">
      {wardrobe === "bow" ? <>
        <path d="M-2 0 C-8 -8 -15 -8 -15 -2 C-15 4 -9 5 -2 2 Z" fill="#d97786" />
        <path d="M2 0 C8 -8 15 -8 15 -2 C15 4 9 5 2 2 Z" fill="#d97786" />
        <circle cx="0" cy="1" r="3" fill="#f1b3ba" />
      </> : wardrobe === "scarf" ? <>
        <path d="M-17 -3 Q0 4 17 -3 L15 4 Q0 11 -15 4 Z" fill="#d89b48" />
        <path d="M4 5 L7 20 L14 18 L11 4 Z" fill="#e6b763" />
        <path d="M7 16 L13 14" fill="none" stroke="#fff0c9" />
      </> : <>
        <path d="M-17 -3 Q0 4 17 -3 L12 5 L0 16 L-12 5 Z" fill="#42a795" />
        <path d="M-12 3 Q0 9 12 3" fill="none" stroke="#8ad3c0" />
      </>}
    </g>
  </svg>;
}

/** Keeps original local raster art and the atlas; wearable overlays are UI only. */
export function StudyPetArtwork({ pose, outfit, wardrobe = outfit, stage = "companion", atlas }: {
  pose: StudyPetArtPose; outfit: PetOutfit; wardrobe?: StudyPetWardrobe; stage?: PetStage; atlas?: StudyPetAtlas;
}) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const rasterOutfit: PetOutfit = wardrobe === "bandana" ? "bandana" : "none";
  const frame = atlas?.frames[`${pose}:${rasterOutfit}`];
  const useAtlas = Boolean(atlas && frame && failedSource !== atlas.src);
  const fallbackPose = pose.startsWith("feed") || pose === "dress" ? "guide" : pose;
  const anchor = useAtlas ? atlasAnchors[pose] : originalAnchors[fallbackPose];
  return <span className="study-pet-artwork" data-stage={stage}>
    {useAtlas && atlas && frame ? <svg className="study-pet-dog" data-art="atlas" width="160" height="160" overflow="hidden" viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`} aria-hidden="true">
      <image href={atlas.src} width={atlas.width} height={atlas.height} onError={() => setFailedSource(atlas.src)} />
    </svg> : <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="study-pet-dog" src={`/mascot/chihuahua-${fallbackPose}.webp`} width="160" height="160" alt="" />

    </>}
    {(wardrobe === "bow" || wardrobe === "scarf" || (wardrobe === "bandana" && !useAtlas)) && <Wearable wardrobe={wardrobe} anchor={anchor} />}
  </span>;
}



