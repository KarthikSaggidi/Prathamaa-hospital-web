import { AutoScrollRow } from "@/components/AutoScrollRow";
import Link from "next/link";
import { departments } from "./data";
import { Icon } from "./Icons";
import styles from "./Departments.module.css";

export function Departments() {
  return (
    <section className={styles.section} id="departments" aria-labelledby="home-departments-title">
      <div className={styles.container}>
        <div className={styles.heading}><span>EXPERTISE FOR EVERY STAGE OF LIFE</span><h2 id="home-departments-title">Our <em>Departments</em></h2><p>Specialized care, connected by compassion.</p></div>
        <AutoScrollRow className={styles.track}>
          {departments.map((department) => <Link key={department.slug} href={`/departments/${department.slug}`} className={styles.card}>
            <span className={styles.icon}><Icon name={department.icon} size={34} strokeWidth={1.6} /></span>
            <strong>{department.name}</strong><span className={styles.explore}>Explore specialty <Icon name="arrowRight" size={15} /></span>
          </Link>)}
        </AutoScrollRow>
      </div>
    </section>
  );
}
