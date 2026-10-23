"use client";

import Image from "next/image";
import Link from "next/link";
import { doctorAnchor } from "@/lib/hospital-search";
import { doctorBookingUrl, type DoctorProfile } from "@/lib/doctor-profiles";
import { departments } from "./data";
import { Icon } from "./Icons";
import styles from "./Doctors.module.css";

export function DoctorCard({ doctor, onView, detailed = false }: { doctor: DoctorProfile; onView: (doctor: DoctorProfile) => void; detailed?: boolean }) {
  return (
    <article className={styles.card} id={doctorAnchor(doctor.sourceName)}>
      <button type="button" className={styles.portraitButton} onClick={() => onView(doctor)} aria-label={`View profile of ${doctor.name}`}>
        <span className={styles.portrait}><Image src={doctor.image} alt={doctor.name} fill sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 400px" /></span>
        <span className={styles.experience}><Icon name="badge" size={15} /> {doctor.experience.split(" ")[0]} years experience</span>
        <span className={styles.openProfile} aria-hidden="true"><Icon name="arrowRight" size={20} /></span>
      </button>
      <div className={styles.cardBody}>
        <span className={styles.specialty}>{doctor.department ? departments.find((item) => item.slug === doctor.department)?.name : "MEDICAL LEADERSHIP"}</span>
        <h3><button type="button" onClick={() => onView(doctor)}>{doctor.name}</button></h3>
        <p>{doctor.role}</p>
        {detailed && <><p className={styles.cardIntro}>{doctor.intro}</p><div className={styles.focusTags}>{doctor.interests.slice(0, 2).map((interest) => <span key={interest}>{interest}</span>)}</div></>}
        <div className={styles.rating}><Icon name="star" size={14} /><strong>{doctor.rating}</strong><span>({doctor.reviewCount} reviews)</span></div>
        <div className={styles.cardActions}><button type="button" onClick={() => onView(doctor)}>View profile <Icon name="arrowRight" size={16} /></button><Link href={doctorBookingUrl(doctor)} aria-label={`Book an appointment with ${doctor.name}`}><Icon name="calendar" size={17} /> Book visit</Link></div>
      </div>
    </article>
  );
}
