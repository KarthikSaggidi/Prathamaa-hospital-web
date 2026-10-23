import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { departments } from "./data";
import { Icon } from "./Icons";
import { SpecialtyModel } from "./SpecialtyModel";
import { DepartmentCareSections } from "./DepartmentCareSections";
import { departmentDetails, departmentVisuals, type DepartmentSlug } from "@/lib/department-config";
import styles from "./DepartmentDetail.module.css";
import { JsonLd } from "./JsonLd";
import { departmentStructuredData } from "@/lib/structured-data";

export function DepartmentDetail({ slug }: { slug: DepartmentSlug }) {
  const department = departments.find((item) => item.slug === slug)!;
  const content = departmentDetails[slug];
  const visual = departmentVisuals[slug];
  const [overview, conditions, services, ...careSections] = content.sections;
  const related = departments.filter((item) => item.slug !== slug).slice(0, 4);
  return (
    <div className={styles.page} style={{ "--accent": visual.accent, "--tint": visual.tint } as CSSProperties}>
      <JsonLd data={departmentStructuredData(slug)} />
      <section className={styles.hero}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/departments">Departments</Link><span>/</span><span aria-current="page">{department.name}</span></nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.specialty}><Icon name={department.icon} size={18} /> DEPARTMENT OF {content.title.toUpperCase()}</span>
              <h1>{department.name}<span>{visual.headline}</span></h1>
              <p>{content.subtitle}</p>
              <div className={styles.actions}><Link href={`/appointment?department=${slug}`} className={styles.primary}><Icon name="calendar" size={19} /> Book an appointment <Icon name="arrowRight" size={18} /></Link><a href="tel:+918009002444" className={styles.secondary}><Icon name="phone" size={18} /> Speak to our team</a></div>
              <div className={styles.heroTrust}><span><Icon name="shieldCheck" size={17} /> Patient-first care</span><span><Icon name="doctor" size={17} /> Specialist expertise</span><span><Icon name="heart" size={17} /> Personalized support</span></div>
            </div>
            <SpecialtyModel slug={slug} name={department.name} icon={department.icon} />
          </div>
        </div>
      </section>
      <nav className={styles.sectionNav} aria-label={`${department.name} page sections`}><div className={styles.container}><a href="#overview">Overview</a><a href="#conditions">Conditions</a><a href="#treatments">Treatments & services</a><a href="#care">Your care</a><a href="#questions">Common questions</a><Link href={`/appointment?department=${slug}`}>Request appointment <Icon name="arrowRight" size={16} /></Link></div></nav>

      <div className={styles.container}>
        <section id="overview" className={styles.overview} aria-labelledby="overview-title">
          <div><span className={styles.eyebrow}>UNDERSTANDING YOUR CARE</span><h2 id="overview-title">{overview.title}</h2>{overview.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<Link href="/contact" className={styles.textLink}>We’re here to answer your questions <Icon name="arrowRight" size={17} /></Link></div>
          <div className={styles.overviewVisual}><Image src={`/departments/${visual.image}.jpg`} alt={`${department.name} care illustration`} fill sizes="(max-width: 800px) 92vw, 40vw" /><div><Icon name={department.icon} size={25} /><span>Specialized expertise.<strong>Care centered around you.</strong></span></div></div>
        </section>

        <DepartmentCareSections slug={slug} name={department.name} icon={department.icon} conditionsTitle={conditions.title} conditions={conditions.items} services={services.items} />

        <section id="care" className={styles.care} aria-labelledby="care-title"><span className={styles.eyebrow}>EXPERTISE WITH EMPATHY</span><h2 id="care-title">Care beyond the consultation.</h2><div className={styles.careGrid}>{careSections.map((section, index) => <article key={section.title}><span className={styles.careIcon}><Icon name={index === 0 ? "shieldCheck" : "heart"} size={25} /></span><h3>{section.title}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>)}</div></section>

        <section className={styles.journey} aria-label="Plan your hospital visit"><div><span className={styles.eyebrow}>YOUR NEXT STEP</span><h2>A simpler path to care.</h2></div><ol><li><span>01</span><div><h3>Request your visit</h3><p>Use our appointment form or call the hospital team.</p></div></li><li><span>02</span><div><h3>Share your concerns</h3><p>Bring your prescriptions and any relevant medical reports.</p></div></li><li><span>03</span><div><h3>Understand your options</h3><p>Discuss the assessment, care plan and next steps with your specialist.</p></div></li></ol></section>

        <section id="questions" className={styles.faq} aria-labelledby="faq-title"><div><span className={styles.eyebrow}>HERE TO HELP</span><h2 id="faq-title">Your questions,<br />answered.</h2><p>Need more information?<br /><Link href="/contact" className={styles.textLink}>Contact our team <Icon name="arrowRight" size={16} /></Link></p></div><div className={styles.accordions}>
          <details><summary>What does the {department.name} department offer?<span>+</span></summary><p>{overview.paragraphs[0]}</p></details>
          <details><summary>How do I book a consultation?<span>+</span></summary><p><Link href={`/appointment?department=${slug}`}>Request an appointment online</Link> with your preferred date and time, or call <a href="tel:+918009002444">+91 800 900 2444</a> for assistance. A callback or request does not confirm a consultation until the hospital team confirms it.</p></details>
          <details><summary>What should I bring to my appointment?<span>+</span></summary><p>Bring any relevant medical reports, previous prescriptions, a list of current medicines and any questions you would like to discuss. For preparation specific to a test or procedure, contact the hospital team before your visit.</p></details>
          <details><summary>How is my treatment plan decided?<span>+</span></summary><p>Your specialist will discuss your concerns, review your history and explain any recommended assessments. Treatment and follow-up depend on the clinical assessment and your individual needs.</p></details>
        </div></section>

        <section className={styles.cta}><div><span>LET’S TAKE THE NEXT STEP, TOGETHER</span><h2>Your health deserves<br />thoughtful attention.</h2><p>Connect with our {department.name.toLowerCase()} team.</p></div><div><Link href={`/appointment?department=${slug}`} className={styles.primary}><Icon name="calendar" size={19} /> Book an appointment <Icon name="arrowRight" size={18} /></Link><a href="tel:+918009002444"><Icon name="phone" size={17} /> +91 800 900 2444</a></div></section>
        <section className={styles.related}><div className={styles.sectionHeading}><h2>Explore more specialties</h2><Link href="/departments" className={styles.textLink}>All departments <Icon name="arrowRight" size={17} /></Link></div><div>{related.map((item) => <Link href={`/departments/${item.slug}`} key={item.slug}><Icon name={item.icon} size={27} /><span>{item.name}</span><Icon name="arrowRight" size={17} /></Link>)}</div></section>
      </div>
    </div>
  );
}
