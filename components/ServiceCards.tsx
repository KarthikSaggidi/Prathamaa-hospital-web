import Link from "next/link";
import { serviceCards } from "./data";
import { Icon } from "./Icons";
import styles from "./ServiceCards.module.css";

const tones = ["orange", "blue", "green", "rose"];
export function ServiceCards() {
  return (
    <section className={styles.section} aria-label="Hospital services">
      <div className={styles.grid}>
        {serviceCards.map((card, index) => {
          const href = card.title === "Find Doctors" ? "/doctors" : card.title === "Emergency Care" ? "tel:+918009002444" : card.link;
          return <Link href={href} className={`${styles.card} ${styles[tones[index]]}`} key={card.title}>
            <span className={styles.icon}><Icon name={card.icon === "lab" ? "flask" : card.icon} size={33} strokeWidth={1.8} /></span>
            <div className={styles.content}><h2>{card.title}</h2><p>{card.text}</p></div>
            <span className={styles.arrow}><Icon name="arrowRight" size={19} /></span>
          </Link>;
        })}
      </div>
    </section>
  );
}
