"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { doctorBookingUrl, type DoctorProfile } from "@/lib/doctor-profiles";
import { Icon } from "./Icons";
import { DoctorPortrait } from "./DoctorPortrait";
import styles from "./Doctors.module.css";

export function DoctorProfileDialog({ doctor, onClose }: { doctor: DoctorProfile | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!doctor) return;
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previous; };
  }, [doctor]);
  if (!doctor) return null;
  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="doctor-profile-title" onCancel={() => onClose()} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}>
        <div className={styles.dialogHeader}>
          <span>PRATHAMAA HOSPITAL · DOCTOR PROFILE</span>
          <button type="button" className={styles.close} onClick={() => onClose()} aria-label="Close doctor profile">×</button>
        </div>
        <div className={styles.profileTop}>
          <div className={styles.profilePhoto}>
            <DoctorPortrait image={doctor.image} name={doctor.name} sizes="(max-width: 600px) 80vw, 265px" />
          </div>
          <div className={styles.profileIdentity}>
            <span className={styles.eyebrow}>GET TO KNOW YOUR DOCTOR</span>
            <h2 id="doctor-profile-title">{doctor.name}</h2>
            <p>{doctor.role}</p>
            {doctor.qualifications && <p className={styles.qualifications}>{doctor.qualifications}</p>}
            {(doctor.experience || (doctor.rating && doctor.reviewCount !== undefined)) && <div className={styles.profileBadges}>
              {doctor.experience && <span><Icon name="badge" size={16} />{doctor.experience}</span>}
              {doctor.rating && doctor.reviewCount !== undefined && <span><Icon name="star" size={15} />{doctor.rating} <small>({doctor.reviewCount} reviews)</small></span>}
            </div>}
            <span className={styles.location}><Icon name="location" size={15} />Prathamaa Hospital, Hyderabad</span>
          </div>
        </div>
        <div className={styles.profileBody}><section><h3>About the doctor</h3><p>{doctor.intro}</p></section><section><h3>Clinical focus & interests</h3><div className={styles.interests}>{doctor.interests.map((interest) => <span key={interest}><Icon name="check" size={14} />{interest}</span>)}</div></section><div className={styles.consultation}><span className={styles.consultationIcon}><Icon name="calendar" size={23} /></span><div><h3>Plan a consultation</h3><p>Choose your preferred date and time. Our hospital team can help with consultation timings and appointment confirmation.</p>{doctor.department && <Link href={`/departments/${doctor.department}`} onClick={() => onClose()}>Explore the department <Icon name="arrowRight" size={15} /></Link>}</div></div></div>
        <div className={styles.profileFooter}><a href="tel:+918009002444"><Icon name="phone" size={18} /><span>Need assistance?<strong>+91 800 900 2444</strong></span></a><Link href={doctorBookingUrl(doctor)} onClick={() => onClose()}><Icon name="calendar" size={18} /> Book with this doctor <Icon name="arrowRight" size={18} /></Link></div>
      </dialog>
  );
}
