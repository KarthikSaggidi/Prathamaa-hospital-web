"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent as ReactMouseEvent } from "react";
import { doctorProfiles, type DoctorProfile } from "@/lib/doctor-profiles";
import { doctorLocation, filterDoctorProfiles, parseSavedDoctorIds } from "@/lib/doctor-directory";
import { doctorAnchor } from "@/lib/hospital-search";
import { departments } from "./data";
import { DoctorDirectoryCard } from "./DoctorDirectoryCard";
import { DoctorProfileDialog } from "./DoctorProfileDialog";
import { Icon } from "./Icons";
import styles from "./DoctorDirectory.module.css";

const savedStorageKey = "prathamaa-saved-doctors";
const specialtyOrder = ["cardiology", "pediatrics", "dental-implantology", "urology", "general-laparoscopic-surgery", "leadership"];
const specialties = [...new Set(doctorProfiles.map((doctor) => doctor.department ?? "leadership"))].map((slug) => {
  const department = departments.find((item) => item.slug === slug);
  return { slug, name: department?.name ?? "Medical Leadership", icon: department?.icon ?? "people" };
}).sort((a, b) => specialtyOrder.indexOf(a.slug) - specialtyOrder.indexOf(b.slug));

export function DoctorDirectory() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [location, setLocation] = useState("all");
  const [savedDoctors, setSavedDoctors] = useState<string[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const matches = filterDoctorProfiles(query, specialty, location);
  const filtered = onlySaved ? matches.filter((doctor) => savedDoctors.includes(doctorAnchor(doctor.sourceName))) : matches;
  const hasFilters = Boolean(query.trim() || specialty !== "all" || location !== "all" || onlySaved);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try { setSavedDoctors(parseSavedDoctorIds(window.localStorage.getItem(savedStorageKey))); }
      catch { /* Saved doctors still work for this visit when browser storage is unavailable. */ }
    });
    const sync = (event: StorageEvent) => {
      if (event.key === savedStorageKey || event.key === null) setSavedDoctors(parseSavedDoctorIds(event.newValue));
    };
    window.addEventListener("storage", sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("storage", sync); };
  }, []);

  useEffect(() => {
    let frame = 0;
    const reveal = (id: string) => {
      if (!doctorProfiles.some((doctor) => doctorAnchor(doctor.sourceName) === id)) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setQuery(""); setSpecialty("all"); setLocation("all"); setOnlySaved(false);
        frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }));
      });
    };
    const hashChanged = () => reveal(window.location.hash.slice(1));
    // A header search may link to a doctor currently hidden by this page's filters.
    const linkedProfile = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!link) return;
      const url = new URL(link.getAttribute("href")!, window.location.href);
      if (url.origin === window.location.origin && url.pathname === "/doctors") reveal(url.hash.slice(1));
    };
    hashChanged();
    window.addEventListener("hashchange", hashChanged);
    document.addEventListener("click", linkedProfile, true);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", hashChanged); document.removeEventListener("click", linkedProfile, true); };
  }, []);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); resultsRef.current?.focus({ preventScroll: true });
  }
  function clearFilters() { setQuery(""); setSpecialty("all"); setLocation("all"); setOnlySaved(false); }
  function toggleSaved(doctor: DoctorProfile) {
    const id = doctorAnchor(doctor.sourceName);
    const next = savedDoctors.includes(id) ? savedDoctors.filter((saved) => saved !== id) : [...savedDoctors, id];
    setSavedDoctors(next);
    try { window.localStorage.setItem(savedStorageKey, JSON.stringify(next)); } catch { /* Keep the in-memory shortlist usable. */ }
  }
  function exploreTeam(event: ReactMouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
    event.preventDefault(); resultsRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); resultsRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="doctors-page-title">
        <Image src="/images/departments-hero.png" alt="" fill preload sizes="100vw" className={styles.heroImage} />
        <div className={styles.heroVeil} />
        <div className={styles.heroContent}><span className={styles.eyebrow}>OUR DOCTORS</span><h1 id="doctors-page-title">Expert minds.<br /><span>Compassionate hearts.</span></h1><p>Meet specialist doctors at Prathamaa Hospital in Hyderabad.<br className={styles.desktopBreak} /> Explore their roles, specialties and approach to care.</p>
          <div className={styles.heroDetails}><span><Icon name="doctor" size={17} />{doctorProfiles.length} doctors</span><span><Icon name="location" size={16} />Hyderabad</span><span><Icon name="heartOutline" size={17} />Care centered around you</span></div>
        </div>
      </section>

      <section className={styles.directory} ref={resultsRef} id="medical-team" tabIndex={-1} aria-labelledby="medical-team-title">
        <form className={styles.filterBar} role="search" onSubmit={search}>
          <div className={styles.searchField}><Icon name="search" size={22} /><label htmlFor="doctor-directory-search" className={styles.srOnly}>Search doctors by name, specialty or area of care</label><input id="doctor-directory-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by doctor name, specialty, or area of care…" autoComplete="off" maxLength={120} aria-controls="doctor-directory-grid" />{query && <button type="button" aria-label="Clear doctor search" onClick={() => setQuery("")}>×</button>}</div>
          <div className={styles.selectField}><Icon name="stethoscope" size={21} /><label htmlFor="doctor-specialty" className={styles.srOnly}>Filter by specialty</label><select id="doctor-specialty" value={specialty} onChange={(event) => setSpecialty(event.target.value)} aria-controls="doctor-directory-grid"><option value="all">All Specialties</option>{specialties.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select><Icon name="chevronRight" size={16} /></div>
          <div className={styles.selectField}><Icon name="location" size={21} /><label htmlFor="doctor-location" className={styles.srOnly}>Filter by location</label><select id="doctor-location" value={location} onChange={(event) => setLocation(event.target.value)} aria-controls="doctor-directory-grid"><option value="all">All Locations</option><option value={doctorLocation.id}>{doctorLocation.name} · {doctorLocation.hospital}</option></select><Icon name="chevronRight" size={16} /></div>
          <button className={styles.searchSubmit} type="submit">Search Doctors<Icon name="arrowRight" size={18} /></button>
        </form>
        <div className={styles.specialtyTabs} role="group" aria-label="Filter doctors by specialty"><button type="button" aria-pressed={specialty === "all"} aria-controls="doctor-directory-grid" onClick={() => setSpecialty("all")}><Icon name="grid" size={23} />All Specialties</button>{specialties.map((item) => <button key={item.slug} type="button" aria-pressed={specialty === item.slug} aria-controls="doctor-directory-grid" onClick={() => setSpecialty(item.slug)}><Icon name={item.icon} size={23} />{item.name}</button>)}</div>
        <div className={styles.directoryTop}>
          <div><span className={styles.sectionEyebrow}>MEET OUR SPECIALISTS</span><h2 id="medical-team-title">Our Doctors</h2><p>Skilled professionals. Compassionate care. A healthier tomorrow for you and your family.</p></div>
          {hasFilters && <button className={styles.viewAll} type="button" onClick={clearFilters}>View All Doctors<Icon name="arrowRight" size={17} /></button>}
        </div>
        <div className={styles.resultsBar}><div className={styles.results} role="status" aria-live="polite">Showing <strong>{filtered.length}</strong> of {doctorProfiles.length} doctors{query.trim() && <span> for “{query.trim()}”</span>}{onlySaved && <span> · Saved doctors</span>}</div><button type="button" className={styles.savedFilter} aria-pressed={onlySaved} onClick={() => setOnlySaved((value) => !value)} aria-controls="doctor-directory-grid"><Icon name="heartOutline" size={16} />Saved doctors ({savedDoctors.length})</button></div>
        <div className={styles.grid} id="doctor-directory-grid">{filtered.map((doctor) => <DoctorDirectoryCard doctor={doctor} saved={savedDoctors.includes(doctorAnchor(doctor.sourceName))} onSave={toggleSaved} onView={setSelectedDoctor} key={doctor.sourceName} />)}</div>
        {filtered.length === 0 && <div className={styles.empty}><span><Icon name={onlySaved ? "heartOutline" : "search"} size={29} /></span><h3>{onlySaved && !savedDoctors.length ? "Your shortlist starts with a heart." : "Let’s find the right care for you."}</h3><p>{onlySaved && !savedDoctors.length ? "Tap the heart on any doctor’s card to save their profile on this device." : "No profiles match these filters. Try a name or specialty, or speak with our team for help."}</p><button type="button" onClick={clearFilters}>Show all doctors <Icon name="arrowRight" size={16} /></button><a href="tel:+918009002444">Call +91 800 900 2444</a></div>}
      </section>

      <section className={styles.careSteps} aria-label="Your consultation journey"><div><span className={styles.sectionEyebrow}>A LITTLE GUIDANCE, EVERY STEP</span><h2>A thoughtful approach<br />to your next visit.</h2></div><ol><li><span>01</span><div><h3>Find your specialist</h3><p>Explore the team and learn about their areas of care.</p></div></li><li><span>02</span><div><h3>Request your visit</h3><p>Choose a doctor and share your preferred date and time.</p></div></li><li><span>03</span><div><h3>Let us take it from here</h3><p>Our team will help confirm availability and your next steps.</p></div></li></ol></section>
      <section className={styles.cta}><div><span className={styles.sectionEyebrow}>WE’RE HERE TO HELP</span><h2>Not sure where to begin?</h2><p>Talk with our hospital team. We’ll help you find your way to the right care.</p></div><div><a href="tel:+918009002444"><Icon name="phone" size={18} /> Speak with our team</a><Link href="/departments">Explore our departments <Icon name="arrowRight" size={16} /></Link></div></section>
      <a className={styles.backToTeam} href="#medical-team" onClick={exploreTeam}>Back to the medical team ↑</a>
      <DoctorProfileDialog doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
    </div>
  );
}
