"use client";

import Link from "next/link";
import { doctorBookingUrl, type DoctorProfile } from "@/lib/doctor-profiles";
import { doctorAnchor } from "@/lib/hospital-search";
import { departments } from "./data";
import { Icon } from "./Icons";
import { DoctorPortrait } from "./DoctorPortrait";
import styles from "./DoctorDirectory.module.css";

type Props = {
  doctor: DoctorProfile;
  saved: boolean;
  onSave: (doctor: DoctorProfile) => void;
  onView: (doctor: DoctorProfile) => void;
};

export function DoctorDirectoryCard({ doctor, saved, onSave, onView }: Props) {
  const specialty = departments.find((department) => department.slug === doctor.department)?.name ?? "Medical leadership";

  return (
    <article className={styles.card} id={doctorAnchor(doctor.sourceName)} aria-label={doctor.name} data-specialty={doctor.department ?? "leadership"}>
      <div className={styles.portraitArea}>
        <button className={styles.portraitButton} type="button" onClick={() => onView(doctor)} aria-label={`View profile of ${doctor.name}`}>
          <DoctorPortrait image={doctor.image} name={doctor.name} sizes="(max-width: 699px) 90vw, (max-width: 1049px) 45vw, (max-width: 1439px) 30vw, 390px" />
        </button>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.specialtyLabel}>{specialty}</span>
          <button type="button" className={styles.favorite} aria-label={saved ? `Remove ${doctor.name} from saved doctors` : `Save ${doctor.name}`} aria-pressed={saved} onClick={() => onSave(doctor)}><Icon name="heartOutline" size={20} strokeWidth={1.8} /></button>
        </div>
        <h3><button type="button" onClick={() => onView(doctor)}>{doctor.name}</button></h3>
        <p className={styles.doctorRole}>{doctor.role}</p>
        {doctor.qualifications && <p className={styles.qualifications}>{doctor.qualifications}</p>}
        {doctor.experience && <span className={styles.experience}><Icon name="badge" size={14} />{doctor.experience}</span>}
        <div className={styles.focusTags} aria-label="Clinical focus">{doctor.interests.map((interest) => <span key={interest}>{interest}</span>)}</div>
        <div className={styles.cardActions}><button type="button" onClick={() => onView(doctor)}>View Profile<Icon name="arrowRight" size={16} /></button><Link href={doctorBookingUrl(doctor)} aria-label={`Book an appointment with ${doctor.name}`}><Icon name="calendar" size={17} />Book Appointment</Link></div>
      </div>
    </article>
  );
}
