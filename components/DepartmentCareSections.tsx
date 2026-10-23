"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "./Icons";
import styles from "./DepartmentCareSections.module.css";

type Category = "Assessment" | "Treatment" | "Care & support";
const categories: Category[] = ["Assessment", "Treatment", "Care & support"];
function categoryFor(name: string): Category {
  if (/test|scan|imag|x-ray|ecg|echo|tmt|assess|evaluat|diagnos|checkup|screen|monitor|consult|exam/i.test(name)) return "Assessment";
  if (/surg|implant|extract|anesth|anaesth|dialysis|procedur|treat|removal|repair|graft|restorat|laser/i.test(name)) return "Treatment";
  return "Care & support";
}
const categoryDetails = {
  Assessment: { icon: "search", text: "Speak with our team about the assessment and how to prepare for your visit." },
  Treatment: { icon: "shieldCheck", text: "Discuss your options, suitability and next steps with your specialist." },
  "Care & support": { icon: "heart", text: "Connect with our team to discuss your care needs and follow-up support." },
};

type Props = { slug: string; name: string; icon: string; conditionsTitle: string; conditions: string[]; services: string[] };
export function DepartmentCareSections({ slug, name, icon, conditionsTitle, conditions, services }: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Category | "All services">("All services");
  const conditionMatches = conditions.filter((item) => item.toLowerCase().includes(query.trim().toLowerCase()));
  const serviceMatches = services.filter((item) => active === "All services" || categoryFor(item) === active);
  const availableCategories = categories.filter((category) => services.some((item) => categoryFor(item) === category));

  return (
    <>
      <section id="conditions" className={styles.conditions} aria-labelledby="conditions-title">
        <div className={styles.conditionsIntro}>
          <span className={styles.eyebrow}>WHEN TO REACH OUT</span>
          <h2 id="conditions-title">{conditionsTitle}</h2>
          <p>Focused expertise for the concerns that matter to you. Explore the conditions supported by our {name.toLowerCase()} team.</p>
          <div className={styles.specialtyBadge}><span><Icon name={icon} size={25} /></span><div><strong>{name}</strong><small>Specialized, personal care</small></div></div>
          <div className={styles.help}><Icon name="doctor" size={25} /><h3>Not sure where to begin?</h3><p>Our hospital team can help you find the right department and plan your visit.</p><Link href="/contact">Let’s talk <Icon name="arrowRight" size={16} /></Link></div>
        </div>
        <div className={styles.conditionPanel}>
          <div className={styles.panelTop}><span>EXPLORE CONDITIONS</span><span>{conditions.length} areas of care</span></div>
          <label className={styles.search}><Icon name="search" size={18} /><span className={styles.srOnly}>Search {name} conditions</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a condition…" aria-controls="condition-list" />{query && <button type="button" aria-label="Clear condition search" onClick={() => setQuery("")}>×</button>}</label>
          <p className={styles.srOnly} role="status" aria-live="polite">{conditionMatches.length} conditions shown</p>
          <ul className={styles.conditionGrid} id="condition-list">{conditionMatches.map((item) => <li key={item}><span className={styles.check}><Icon name="check" size={17} strokeWidth={2.5} /></span><h3>{item}</h3><span className={styles.conditionNumber} aria-hidden="true">{String(conditions.indexOf(item) + 1).padStart(2, "0")}</span></li>)}</ul>
          {conditionMatches.length === 0 && <div className={styles.empty}><p>No matching conditions in this list.</p><button type="button" onClick={() => setQuery("")}>Show all conditions</button><Link href="/contact">Ask our team about your concern →</Link></div>}
          <div className={styles.panelFoot}><Icon name="shieldCheck" size={16} /><span>Every care journey starts with understanding your concerns.</span></div>
        </div>
      </section>

      <section id="treatments" className={styles.treatments} aria-labelledby="treatments-title">
        <div className={styles.heading}><div><span className={styles.eyebrow}>A PERSONAL APPROACH</span><h2 id="treatments-title">Treatments <span>& services</span></h2></div><p>From your first assessment to ongoing support, explore the services offered by our {name.toLowerCase()} department.</p></div>
        <div className={styles.toolbar}><div className={styles.filters} role="group" aria-label="Filter services">{(["All services", ...availableCategories] as const).map((category) => <button key={category} type="button" aria-pressed={active === category} aria-controls="service-list" onClick={() => setActive(category)}>{category}{category === "All services" && <span>{services.length}</span>}</button>)}</div><span className={styles.resultCount} role="status" aria-live="polite">{serviceMatches.length} {serviceMatches.length === 1 ? "service" : "services"}</span></div>
        <div className={styles.serviceGrid} id="service-list">{serviceMatches.map((item) => {
          const category = categoryFor(item);
          const detail = categoryDetails[category];
          return <article key={item} className={styles.service}>
            <div className={styles.cardTop}><span className={styles.serviceIcon}><Icon name={detail.icon} size={25} strokeWidth={1.6} /></span><span className={styles.serviceNumber}>{String(services.indexOf(item) + 1).padStart(2, "0")}</span></div>
            <span className={styles.category}>{category}</span><h3>{item}</h3><p>{detail.text}</p>
            <Link href={`/appointment?department=${slug}`} aria-label={`Request a ${name} appointment to discuss ${item}`}>Discuss with a specialist<span><Icon name="arrowRight" size={18} /></span></Link>
          </article>;
        })}</div>
        <div className={styles.serviceFooter}><div><Icon name="doctor" size={23} /><p>A care plan built around you.<span>Speak with our team to understand which services fit your needs.</span></p></div><Link href={`/appointment?department=${slug}`}>Request a consultation <Icon name="arrowRight" size={17} /></Link></div>
      </section>
    </>
  );
}
