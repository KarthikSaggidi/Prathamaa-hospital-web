"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type FormEvent } from "react";
import { departments } from "./data";
import { Icon } from "./Icons";
import styles from "./DepartmentDirectory.module.css";

const presentation: Record<string, { color: string; tint: string; description: string; keywords: string }> = {
  "general-medicine": { color: "#158aff", tint: "#e8f4ff", description: "Comprehensive care for common and complex medical conditions.", keywords: "fever diabetes infections physician internal medicine" },
  cardiology: { color: "#ff397b", tint: "#fff0f6", description: "Specialized heart care, cardiac diagnosis and blood pressure management.", keywords: "heart chest pain blood pressure hypertension ecg" },
  "orthopedics-sports-medicine": { color: "#ff6424", tint: "#fff2e9", description: "Expert care for bone, joint, spine and sports injuries.", keywords: "orthopaedic orthopedic bones joints arthritis fracture back knee" },
  urology: { color: "#9a63f6", tint: "#f4ecff", description: "Specialized care for urinary tract and related conditions.", keywords: "urinary bladder stones urine" },
  neurology: { color: "#9260f7", tint: "#f3ecff", description: "Diagnosis and treatment for brain, nerve and spinal disorders.", keywords: "brain nerves headache migraine spine" },
  nephrology: { color: "#00af9e", tint: "#e6fbf5", description: "Specialized kidney care and management of renal conditions.", keywords: "kidney renal dialysis hypertension" },
  gynecology: { color: "#fb3d88", tint: "#fff0f7", description: "Complete care for women, pregnancy and maternity wellness.", keywords: "gynaecology gynecology obstetrics women pregnancy maternity fertility" },
  pediatrics: { color: "#00bda6", tint: "#e5fbf4", description: "Specialized care for infants, children and adolescents.", keywords: "paediatrics baby child children newborn infant" },
  ent: { color: "#fc6627", tint: "#fff2e9", description: "Treatment for ear, nose, throat, sinus and hearing conditions.", keywords: "ear nose throat sinus hearing" },
  dermatology: { color: "#fa6177", tint: "#fff0f1", description: "Expert care for skin, hair and nail conditions.", keywords: "skin hair nail acne rash" },
  "dental-implantology": { color: "#9061fb", tint: "#f3edff", description: "Dental implant solutions for healthy and confident smiles.", keywords: "dental tooth teeth implant dentist" },
  radiology: { color: "#168cfa", tint: "#e7f4ff", description: "Advanced diagnostic imaging and radiology services.", keywords: "imaging xray x-ray ct mri ultrasound scan" },
  "general-laparoscopic-surgery": { color: "#168cfa", tint: "#eaf4ff", description: "Modern surgical care and minimally invasive laparoscopic procedures.", keywords: "surgery surgical laparoscopic hernia appendix" },
  anesthesia: { color: "#07adab", tint: "#e7fafa", description: "Safe anaesthesia support for surgical and emergency care.", keywords: "anaesthesia anesthesia anaesthetic anesthetic surgery" },
  "maxillo-facial-surgery": { color: "#be6ca9", tint: "#fbeef7", description: "Specialized surgical care for the jaw, face and oral conditions.", keywords: "maxillofacial jaw facial oral trauma" },
  "plastic-surgery": { color: "#fb7d3e", tint: "#fff1e7", description: "Cosmetic and reconstructive surgery with personalized care.", keywords: "plastic cosmetic reconstruction reconstructive" },
};
const order = ["general-medicine", "cardiology", "orthopedics-sports-medicine", "urology", "neurology", "nephrology", "gynecology", "pediatrics", "ent", "dermatology", "dental-implantology", "radiology", "general-laparoscopic-surgery", "anesthesia", "maxillo-facial-surgery", "plastic-surgery"];
const catalog = [...departments].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));

export function DepartmentDirectory() {
  const [query, setQuery] = useState("");
  const resultsRef = useRef<HTMLElement>(null);
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const filtered = catalog.filter((department) => {
    const searchable = `${department.name} ${department.description} ${presentation[department.slug]?.keywords ?? ""}`.toLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    resultsRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="departments-title">
        <Image src="/images/departments-hero.png" alt="Bright contemporary hospital lobby with reception and a comfortable waiting area" fill priority sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroVeil} />
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>OUR DEPARTMENTS</span>
          <h1 id="departments-title">Specialized Care<br />for a <span>Healthier Tomorrow</span></h1>
          <p>Specialist care at Prathamaa Hospital in Hyderabad,<br className={styles.desktopBreak} /> across a wide range of medical specialties.</p>
          <form className={styles.search} role="search" onSubmit={handleSearch}>
            <Icon name="search" size={25} />
            <label htmlFor="department-search" className={styles.srOnly}>Search departments, treatments or conditions</label>
            <input id="department-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search departments, treatments or conditions..." autoComplete="off" aria-controls="department-results" />
            <button type="submit" aria-label="Show matching departments"><Icon name="arrowRight" size={23} /></button>
          </form>
          <div className={styles.heroDetails}><span><Icon name="shieldCheck" size={16} /> Patient-first care</span><span className={styles.separator} aria-hidden="true" /><span>{departments.length} medical specialties</span><span className={styles.separator} aria-hidden="true" /><Link href="/appointment">Book an appointment <Icon name="arrowRight" size={14} /></Link></div>
        </div>
      </section>

      <section ref={resultsRef} id="department-results" tabIndex={-1} className={styles.directory} aria-labelledby="directory-title">
        <div className={styles.sectionHeading}>
          <div><span className={styles.explore}>EXPLORE</span><h2 id="directory-title">Our Departments</h2></div>
          <p>Comprehensive medical care across multiple specialties, delivered<br className={styles.desktopBreak} /> with compassion, advanced facilities and a patient-first approach.</p>
        </div>
        <div className={styles.resultSummary} role="status" aria-live="polite" aria-atomic="true">{query.trim() ? `${filtered.length} ${filtered.length === 1 ? "department" : "departments"} found for “${query.trim()}”` : `Explore all ${departments.length} departments`}{query && <button type="button" onClick={() => setQuery("")}>Clear search ×</button>}</div>
        <div className={styles.grid}>
          {filtered.map((department) => {
            const visual = presentation[department.slug];
            return <Link href={`/departments/${department.slug}`} key={department.slug} className={styles.card} style={{ "--specialty-color": visual?.color ?? "#168cfa", "--specialty-tint": visual?.tint ?? "#eaf4ff" } as CSSProperties}>
              <span className={styles.icon}><Icon name={department.icon} size={40} strokeWidth={1.7} /></span>
              <div className={styles.cardContent}><h3>{department.name === "ENT" ? "ENT (Ear, Nose & Throat)" : department.name}</h3><p>{visual?.description ?? department.description}</p></div>
              <span className={styles.arrow} aria-hidden="true"><Icon name="arrowRight" size={19} /></span>
            </Link>;
          })}
        </div>
        {filtered.length === 0 && <div className={styles.empty}><Icon name="search" size={34} /><h3>No departments found</h3><p>Try a specialty or a term such as heart, skin, children or kidney.</p><button type="button" onClick={() => setQuery("")}>View all departments</button><Link href="/contact">Need help finding the right care? Contact us →</Link></div>}
      </section>
    </div>
  );
}
