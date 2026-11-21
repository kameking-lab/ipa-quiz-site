import type { ReactNode, Ref } from "react";
import { CAFE_ART_PATH, CAFE_HEIGHT, CAFE_WIDTH, cafeSleeper, dailyCafeRoom, type CafePoint } from "@/lib/home/study-room-cafe-layout";
import type { CafeMascot, CafeOccupant } from "@/lib/home/study-room-cafe-mascots";
import styles from "./StudyRoomCafeScene.module.css";

function coordinates({ x, floorY, width }: CafePoint) {
  return { left: `${x / CAFE_WIDTH * 100}%`, top: `${floorY / CAFE_HEIGHT * 100}%`, width: `${width / CAFE_WIDTH * 100}%`, zIndex: Math.round(floorY) };
}

export function CafeMascotImage({ mascot, alt = "" }: { mascot: Pick<CafeMascot, "src" | "mirrored">; alt?: string }) {
  return <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={mascot.src} alt={alt} width={256} height={256} loading="lazy" decoding="async"
      className={mascot.mirrored ? styles.mirrored : undefined} />
  </>;
}

export function StudyRoomCafeScene({ day, occupants, emptyMessage, home = false, sceneRef, renderSeat }: {
  day: number | null;
  occupants: readonly CafeOccupant[];
  emptyMessage?: string;
  home?: boolean;
  sceneRef?: Ref<HTMLDivElement>;
  renderSeat?: (occupant: CafeOccupant) => ReactNode;
}) {
  const room = day === null ? null : dailyCafeRoom(day);
  return <div ref={sceneRef} className={styles.scene} role={home ? undefined : "group"}
    tabIndex={home ? undefined : -1} aria-label={home ? undefined : room?.name ?? "チワワの自習室"}
    data-testid={home ? "home-study-room-scene" : "study-room-scene"} data-room={room?.id}
    style={{ aspectRatio: `${CAFE_WIDTH} / ${CAFE_HEIGHT}` }}>
    {room && <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.background} src={`${CAFE_ART_PATH}/${room.id}-room.webp`} alt="" width={766} height={424} loading="lazy" decoding="async" />
      {occupants.map(occupant => <div key={occupant.key} className={styles.slot}
        data-testid={home ? "home-study-room-seat" : "study-room-seat"}
        data-seat-key={occupant.key} data-exam={occupant.exam} data-pose={occupant.mascot.pose}
        data-studying-now={occupant.active} aria-hidden={home || undefined} style={coordinates(occupant.point)}>
        {renderSeat ? renderSeat(occupant) : <CafeMascotImage mascot={occupant.mascot} />}
      </div>)}
      {occupants.length === 0 && <div className={styles.slot} style={coordinates(cafeSleeper(room))}
        data-testid={home ? "home-study-room-sleeper" : "study-room-sleeper"}>
        <CafeMascotImage mascot={{ src: `${CAFE_ART_PATH}/sleep-empty.webp`, mirrored: false }} />
      </div>}
    </>}
    {emptyMessage && <p className={styles.empty}>{emptyMessage}</p>}
  </div>;
}
