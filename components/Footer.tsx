"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "@/assests/logo.jpg";
import mapImage from "@/assests/map-preview.jpg";
import { navLinks } from "@/lib/navigation";
import { departments } from "./data";
import { Icon } from "./Icons";
import styles from "./Footer.module.css";

const quickLinks = [
  ...navLinks.filter((link) => link.id !== "contact"),
  { name: "Lab Tests", href: "/lab-tests" },
  { name: "Contact Us", href: "/contact" },
  { name: "Book Appointment", href: "/appointment" },
];
const footerDepartments = [
  { name: "Cardiology", href: "/departments/cardiology" },
  { name: "Neurology", href: "/departments/neurology" },
  { name: "Orthopedics", href: "/departments/orthopedics-sports-medicine" },
  { name: "Pediatrics", href: "/departments/pediatrics" },
  { name: "Gynecology", href: "/departments/gynecology" },
  { name: "General Medicine", href: "/departments/general-medicine" },
  { name: "Emergency Care", href: "/contact" },
];
const socials = [
  { name: "Facebook", icon: "facebook", href: "https://facebook.com" },
  { name: "Instagram", icon: "instagram", href: "https://instagram.com" },
  { name: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" },
  { name: "YouTube", icon: "youtube", href: "https://youtube.com" },
  { name: "X (Twitter)", icon: "twitter", href: "https://twitter.com" },
];
const maps = "https://www.google.com/maps/search/?api=1&query=17.5405432,78.4341348";
const panelTitles = { privacy: "Privacy Policy", terms: "Terms & Conditions", sitemap: "Explore Prathamaa Hospital" };

export function Footer() {
  const [panel, setPanel] = useState<keyof typeof panelTitles | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!panel) return;
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previous; };
  }, [panel]);
  const year = new Intl.DateTimeFormat("en", { timeZone: "Asia/Kolkata", year: "numeric" }).format(new Date());

  return (
    <>
      <footer className={styles.footer} id="contact">
        <div className={styles.stage}>
          <div className={styles.scene} aria-hidden="true"><Image src="/images/footer-hospital-sunset.png" alt="" fill sizes="(max-width: 640px) 100vw, 45vw" /></div>
          <svg className={styles.veil} viewBox="0 0 1600 440" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="footer-paper" x1="0" y1="0" x2="1" y2=".3"><stop offset="0" stopColor="#fff" /><stop offset=".72" stopColor="#fff" stopOpacity=".98" /><stop offset="1" stopColor="#fffaf6" stopOpacity=".08" /></linearGradient></defs><path d="M0 0H1110C1230 0 1175 130 1260 178C1355 232 1460 211 1600 177V440H0Z" fill="url(#footer-paper)" /></svg>
          <svg className={styles.waves} viewBox="0 0 1600 110" preserveAspectRatio="none" aria-hidden="true"><path d="M0 78C170-60 275 120 442 45S728 92 922 88S1250 42 1600 110H0Z" fill="#ffe6d8" fillOpacity=".34" /><path d="M0 89C280 96 309-8 518 68S868 48 1060 90S1370 79 1600 110H0Z" fill="#ffdfcf" fillOpacity=".29" /></svg>
          <FooterLotus />
          <div className={styles.grid}>
            <div className={styles.brand}>
              <Link href="/" className={styles.logo} aria-label="Prathamaa Hospital home"><Image src={logo} alt="Prathamaa Hospital and First Cuddle" sizes="(max-width: 640px) 300px, 350px" /></Link>
              <p>Prathamaa Hospital is committed to providing exceptional healthcare with compassion, innovation, and excellence.</p>
              <div className={styles.socials} aria-label="Social platforms">{socials.map((social) => <a href={social.href} key={social.name} aria-label={social.name} target="_blank" rel="noopener noreferrer" data-platform={social.icon}><Icon name={social.icon} size={21} /></a>)}</div>
            </div>
            <nav className={styles.column} aria-label="Footer quick links"><h3>Quick Links</h3>{quickLinks.map((link) => <Link key={link.href} href={link.href}><span>{link.name}</span><Icon name="chevronRight" size={15} /></Link>)}</nav>
            <nav className={styles.column} aria-label="Footer departments"><h3>Departments</h3>{footerDepartments.map((department) => <Link key={department.name} href={department.href}><span>{department.name}</span><Icon name="chevronRight" size={15} /></Link>)}</nav>
            <div className={[styles.column, styles.contact].join(" ")}>
              <h3>Contact Us</h3>
              <a href={maps} target="_blank" rel="noopener noreferrer"><span className={styles.contactIcon}><Icon name="location" size={18} /></span><span>Prathamaa Hospital,<br />Hyderabad, Telangana</span></a>
              <a href="tel:+918009002444"><span className={styles.contactIcon}><Icon name="phone" size={17} /></span><span>+91 800 900 2444</span></a>
              <a href="tel:+918009006444"><span className={styles.contactIcon}><Icon name="phone" size={17} /></span><span>+91 800 900 6444</span></a>
              <a href="mailto:Prathamaahospital@gmail.com"><span className={styles.contactIcon}><Icon name="mail" size={18} /></span><span>Prathamaahospital@gmail.com</span></a>
              <div className={styles.hours}><span className={styles.contactIcon}><Icon name="clock" size={18} /></span><span>Mon - Sun: 24/7 Emergency Care</span></div>
              <a href={maps} className={styles.map} target="_blank" rel="noopener noreferrer"><Image src={mapImage} alt="Map preview of Prathamaa Hospital's location" sizes="(max-width: 640px) 330px, 280px" /><span><Icon name="location" size={16} />View on Google Maps<Icon name="arrowRight" size={15} /></span></a>
            </div>
            <div className={styles.emergency}>
              <div className={styles.emergencyHeading}><span className={styles.siren}><Icon name="siren" size={31} strokeWidth={1.7} /></span><div><h3>24/7 EMERGENCY CARE</h3><a href="tel:+918009002444">+91 800 900 2444</a></div></div>
              <a className={styles.emergencyButton} href="tel:+918009002444">Emergency Call<Icon name="arrowRight" size={18} /></a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}><div className={styles.bottomInner}>
          <p>© {year} Prathamaa Hospital. All Rights Reserved.</p>
          <p className={styles.credit}><Icon name="heart" size={17} /><span>Designed & Developed with Care for Better Healthcare Services. <span className={styles.attribution}>|&nbsp; by DropXcorp</span></span></p>
          <nav className={styles.policies} aria-label="Footer information"><button type="button" onClick={() => setPanel("privacy")}>Privacy Policy</button><button type="button" onClick={() => setPanel("terms")}>Terms & Conditions</button><button type="button" onClick={() => setPanel("sitemap")}>Sitemap</button></nav>
          <button type="button" className={styles.backToTop} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}><Icon name="arrowUp" size={19} /></button>
        </div></div>
      </footer>
      {panel && <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="footer-panel-title" onCancel={() => setPanel(null)} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setPanel(null);
      }}>
        <button type="button" className={styles.close} aria-label="Close dialog" onClick={() => setPanel(null)}>×</button><span className={styles.dialogEyebrow}>PRATHAMAA HOSPITAL</span><h2 id="footer-panel-title">{panelTitles[panel]}</h2>
        {panel === "privacy" ? <><p>Prathamaa Hospital respects your privacy and is committed to protecting your personal information. All medical and patient details are securely stored and never shared with third parties without consent.</p><p>By using our website, you agree to our privacy practices and secure handling of healthcare-related information.</p></> : panel === "terms" ? <><p>All appointments, consultations, and services provided by Prathamaa Hospital are subject to doctor availability and hospital policies.</p><p>Users are requested to provide accurate information while booking appointments. Misuse of hospital services or website content is strictly prohibited.</p></> : <div className={styles.sitemap}><nav aria-label="Sitemap pages"><h3>Pages</h3>{quickLinks.map((link) => <Link href={link.href} key={link.href} onClick={() => setPanel(null)}>{link.name}<Icon name="arrowRight" size={14} /></Link>)}</nav><nav aria-label="Sitemap departments"><h3>Departments</h3>{departments.map((department) => <Link href={"/departments/" + department.slug} key={department.slug} onClick={() => setPanel(null)}>{department.name}<Icon name="arrowRight" size={14} /></Link>)}</nav></div>}
        <button type="button" className={styles.policyDone} onClick={() => setPanel(null)}>Close</button>
      </dialog>}
    </>
  );
}

function FooterLotus() {
  return <svg className={styles.lotus} viewBox="0 0 320 300" fill="none" aria-hidden="true"><g fill="#ffd6c3" fillOpacity=".68" stroke="#fff9f5" strokeWidth="4"><path d="M160 276C85 205 103 95 160 20c57 75 75 185 0 256Z" /><path d="M160 276C55 254 10 163 17 87c87 8 150 73 143 189Z" /><path d="M160 276c105-22 150-113 143-189-87 8-150 73-143 189Z" /><path d="M160 276C72 291 13 258 2 207c66-31 124-7 158 69Z" /><path d="M160 276c88 15 147-18 158-69-66-31-124-7-158 69Z" /></g></svg>;
}
