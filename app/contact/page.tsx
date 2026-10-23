"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/Icons";
import { departments } from "@/components/data";
import styles from "./contact.module.css";

const phone = "+918009002444";
const maps = "https://www.google.com/maps/search/?api=1&query=17.5405432,78.4341348";
const contacts = [
  { icon: "phone", title: "Emergency Support", description: "Our emergency healthcare team is available 24/7 to provide immediate medical assistance and patient care.", action: "+91 800 900 2444", href: `tel:${phone}` },
  { icon: "location", title: "Hospital Location", description: "Visit Prathamaa Hospital located in Hyderabad with advanced healthcare infrastructure and specialist doctors.", action: "Open in Google Maps", href: maps, external: true },
  { icon: "mail", title: "Email Support", description: "Reach our support team for medical guidance, appointment queries, reports, and healthcare assistance.", action: "Prathamaahospital@gmail.com", href: "mailto:Prathamaahospital@gmail.com" },
  { icon: "whatsapp", title: "WhatsApp Support", description: "Chat directly with our healthcare support team for quick assistance, appointments, and patient queries.", action: "Chat on WhatsApp", href: `https://wa.me/${phone.slice(1)}`, external: true },
];
const features = [
  ["24/7 Emergency Care", "Always here when you need us"],
  ["Advanced Diagnostics", "Accurate and timely results"],
  ["Specialist Doctors", "Expert care across all departments"],
  ["Modern ICU Facilities", "Advanced life support systems"],
  ["Quick Appointment Support", "Hassle-free scheduling"],
  ["Patient-Friendly Environment", "Comfort, care and safety"],
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = Object.fromEntries(["fullName", "email", "phone", "department", "message"].map((key) => [key, String(values.get(key) ?? "").trim()]));
    if (!/^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(payload.phone.replace(/[\s()-]/g, ""))) {
      setStatus("error");
      setMessage("Please enter a valid 10-digit Indian mobile number, optionally prefixed with +91.");
      form.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }
    submitting.current = true;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/callbacks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message || "Your request could not be submitted. Please try again or call our team.");
      setStatus("success");
      setMessage("Your callback request has been received. Our hospital team will contact you shortly.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error && error.name !== "TimeoutError" ? error.message : "The request timed out. Please try again or call +91 800 900 2444.");
    } finally {
      submitting.current = false;
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.heroMedia}>
          <Image src="/images/contact-hero.png" alt="A pediatrician smiling with a young patient holding a teddy bear" fill priority sizes="(max-width: 900px) 92vw, 100vw" className={styles.heroImage} />
          <div className={styles.heroFade} />
        </div>
        <span className={styles.heroNote} aria-hidden="true">Care<br />for a Healthier<br />Tomorrow ♡</span>
        <svg className={styles.heroWave} viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true"><path fill="#ffddca" fillOpacity=".65" d="M820 70C980-45 1110 4 1250 43S1400 50 1440 15V70Z" /><path fill="#fffaf7" d="M790 70C980-8 1100 28 1255 59S1395 57 1440 38V70Z" /></svg>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.badge}><Icon name="shieldCheck" size={18} /> Trusted Healthcare • 24/7 Patient Support</span>
            <h1 id="contact-title">We’re Here to Help<br /><span>You Feel Better</span></h1>
            <p>Connect with our experienced healthcare professionals for appointments, emergency care, specialist consultations, and patient support services.</p>
            <div className={styles.heroActions}>
              <Link href="/appointment" className={styles.primary}><Icon name="calendar" size={23} /> Book Appointment <Icon name="arrowRight" size={20} /></Link>
              <a href={`tel:${phone}`} className={styles.call}><Icon name="phone" size={25} /><span>Call Hospital<strong>+91 800 900 2444</strong></span></a>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.cards}`} aria-label="Contact and support options">
        {contacts.map((contact) => <a key={contact.title} href={contact.href} className={styles.card} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noopener noreferrer" : undefined}>
          <span className={styles.iconCircle}><Icon name={contact.icon} size={30} /></span>
          <h2>{contact.title}</h2><p>{contact.description}</p>
          <span className={styles.cardAction}>{contact.action}{contact.external && <Icon name="arrowRight" size={17} />}</span>
        </a>)}
      </section>

      <section className={`${styles.container} ${styles.mainGrid}`}>
        <div className={styles.care}>
          <span className={styles.tag}><Icon name="heart" size={17} /> Why Patients Choose Us</span>
          <h2>Advanced Medical Care,<br /><span>Delivered with Compassion</span></h2>
          <p>Prathamaa Hospital combines experienced doctors, modern technology, and compassionate patient care to provide trusted healthcare services for every patient.</p>
          <p>From emergency support and diagnostics to specialist consultations and advanced treatments, our hospital ensures quality care with patient comfort and safety.</p>
          <div className={styles.features}>{features.map(([title, description]) => <div className={styles.feature} key={title}><span><Icon name="check" size={21} strokeWidth={3} /></span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div>
        </div>
        <div className={styles.formCard}>
          <h2>Request a Callback</h2>
          <p>Fill out the form below and our healthcare support team will contact you shortly for assistance.</p>
          <form className={styles.form} onSubmit={handleSubmit} aria-busy={status === "sending"}>
            <fieldset disabled={status === "sending"}>
              <label className={styles.field}><span className={styles.srOnly}>Full name</span><Icon name="user" size={20} /><input name="fullName" autoComplete="name" placeholder="Full Name" minLength={2} maxLength={100} required /></label>
              <label className={styles.field}><span className={styles.srOnly}>Email address</span><Icon name="mail" size={20} /><input type="email" name="email" autoComplete="email" placeholder="Email Address" maxLength={254} required /></label>
              <label className={styles.field}><span className={styles.srOnly}>Phone number</span><Icon name="phone" size={20} /><input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="Phone Number" maxLength={18} required /></label>
              <label className={styles.field}><span className={styles.srOnly}>Department</span><Icon name="location" size={20} /><select name="department" defaultValue="" required><option value="" disabled>Select Department</option>{departments.map((department) => <option key={department.slug} value={department.slug}>{department.name}</option>)}</select><span className={styles.chevron}>⌄</span></label>
              <label className={`${styles.field} ${styles.messageField}`}><span className={styles.srOnly}>Describe your medical requirement</span><Icon name="notes" size={20} /><textarea name="message" rows={4} placeholder="Describe your medical requirement..." minLength={10} maxLength={2000} required /></label>
              <button type="submit" className={styles.submit}>{status === "sending" ? "Submitting request…" : "Submit Request"}<Icon name="arrowRight" size={23} /></button>
            </fieldset>
            {message && <p className={status === "success" ? styles.success : styles.error} role={status === "error" ? "alert" : "status"}>{message}{status === "error" && <> <a href={`tel:${phone}`}>Call hospital</a></>}</p>}
          </form>
        </div>
      </section>
    </div>
  );
}
