import Image, { type StaticImageData } from "next/image";
import styles from "./DoctorPortrait.module.css";

/** One centered hospital mark sits beneath the full, transparent portrait. */
export function DoctorPortrait({ image, name, sizes = "(max-width: 699px) 88vw, 360px", compact = false }: {
  image: StaticImageData;
  name: string;
  sizes?: string;
  compact?: boolean;
}) {
  return (
    <span className={`${styles.stage}${compact ? ` ${styles.compact}` : ""}`} data-doctor-portrait>
      <Image src="/images/prathamaa-hospital-symbol.png" alt="" aria-hidden="true" width={418} height={412} className={styles.watermark} />
      <span className={styles.photo}>
        <Image src={image} alt={name} fill sizes={sizes} quality={95} className={styles.image} />
      </span>
    </span>
  );
}
