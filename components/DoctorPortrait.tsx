import Image, { type StaticImageData } from "next/image";
import styles from "./DoctorPortrait.module.css";

/** A shared photo stage: full portraits, a faint brand backdrop, no overlays. */
export function DoctorPortrait({ image, name, sizes = "(max-width: 699px) 88vw, 360px", compact = false }: {
  image: StaticImageData;
  name: string;
  sizes?: string;
  compact?: boolean;
}) {
  return (
    <span className={`${styles.stage}${compact ? ` ${styles.compact}` : ""}`}>
      <span className={styles.watermark} aria-hidden="true" />
      <span className={styles.photo}>
        <Image src={image} alt={name} fill sizes={sizes} quality={95} className={styles.image} />
      </span>
    </span>
  );
}
