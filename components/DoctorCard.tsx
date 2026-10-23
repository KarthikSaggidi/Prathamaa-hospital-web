"use client";

import Link from "next/link";
import { doctorAnchor } from "@/lib/hospital-search";
import { doctorBookingUrl, type DoctorProfile } from "@/lib/doctor-profiles";
import { departments } from "./data";
import { Icon } from "./Icons";
import { DoctorPortrait } from "./DoctorPortrait";
import styles from "./Doctors.module.css";

export function DoctorCard({ doctor, onView, detailed = false }: { doctor: DoctorProfile; onView: (doctor: DoctorProfile) => void; detailed?: boolean }) {
  return (
    <article className={styles.card} id={doctorAnchor(doctor.sourceName)}>
      <button type="button" className={styles.portraitButton} onClick={() => onView(doctor)} aria-label={`View profile of ${doctor.name}`}>
        <DoctorPortrait image={doctor.image} name={doctor.name} sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 400px" />
      </button>
      <div className={styles.cardBody}>
        <span className={styles.specialty}>{doctor.department ? departments.find((item) => item.slug === doctor.department)?.name : "MEDICAL LEADERSHIP"}</span>
        <h3><button type="button" onClick={() => onView(doctor)}>{doctor.name}</button></h3>
        <p>{doctor.role}</p>
        {doctor.qualifications && <p className={styles.qualifications}>{doctor.qualifications}</p>}
        {doctor.experience && <span className={styles.experience}><Icon name="badge" size={15} />{doctor.experience}</span>}
        {detailed && <><p className={styles.cardIntro}>{doctor.intro}</p><div className={styles.focusTags}>{doctor.interests.slice(0, 2).map((interest) => <span key={interest}>{interest}</span>)}</div></>}
        {doctor.rating && doctor.reviewCount !== undefined && <div className={styles.rating}><Icon name="star" size={14} /><strong>{doctor.rating}</strong><span>({doctor.reviewCount} reviews)</span></div>}
        <div className={styles.cardActions}><button type="button" onClick={() => onView(doctor)}>View profile <Icon name="arrowRight" size={16} /></button><Link href={doctorBookingUrl(doctor)} aria-label={`Book an appointment with ${doctor.name}`}><Icon name="calendar" size={17} /> Book visit</Link></div>
      </div>
    </article>
  );
}
