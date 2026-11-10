import { petArtFor } from "@/lib/pet/v1/art";
import styles from "./HomeHeroImage.module.css";

// Reuse the actual companions: no alternate character or headband at the entrance.
export function HomeHeroImage() {
  return <div className={styles.room}>
    {([{ id: "ip", name: "ITパスポート" }, { id: "fp3", name: "FP3級" }] as const).map(pet => <figure key={pet.id}>
      {/* Small local WebP, shared with answers and care. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={petArtFor(pet.id, "puppy", "study")} width={256} height={256} alt={`${pet.name}のチワワが自分の机で勉強している`} fetchPriority="high" decoding="async" />
      <figcaption>{pet.name}</figcaption>
    </figure>)}
  </div>;
}
