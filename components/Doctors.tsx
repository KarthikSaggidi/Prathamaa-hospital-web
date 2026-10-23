"use client";

import Link from "next/link";
import { useState } from "react";
import { AutoScrollRow } from "./AutoScrollRow";
import { DoctorCard } from "./DoctorCard";
import { DoctorProfileDialog } from "./DoctorProfileDialog";
import { doctorProfiles, type DoctorProfile } from "@/lib/doctor-profiles";
import { Icon } from "./Icons";
import styles from "./Doctors.module.css";

export function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  return (
    <section className={styles.section} id="doctors" aria-labelledby="doctors-title">
      <div className={styles.container}>
        <div className={styles.heading}><div><span className={styles.eyebrow}>THE PEOPLE BEHIND YOUR CARE</span><h2 id="doctors-title">Expertise you can trust.<br /><span>People you can talk to.</span></h2></div><div><p>Meet our medical team. Find the right specialist, get to know their focus, and take the next step in your care.</p><Link href="/doctors">Meet all our doctors <Icon name="arrowRight" size={17} /></Link></div></div>
        <AutoScrollRow className={styles.track} label="Our doctors" disabled={Boolean(selectedDoctor)}>
          {doctorProfiles.map((doctor) => <DoctorCard doctor={doctor} onView={setSelectedDoctor} key={doctor.sourceName} />)}
        </AutoScrollRow>
        <div className={styles.sectionFoot}><span><Icon name="shieldCheck" size={16} /> Thoughtful care starts with the right conversation.</span><span>Swipe or scroll to explore the team <Icon name="arrowRight" size={15} /></span></div>
      </div>
      <DoctorProfileDialog doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </section>
  );
}
