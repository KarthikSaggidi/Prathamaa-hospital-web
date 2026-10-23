"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import logo from "@/assests/logo.jpg";
import { Icon } from "./Icons";
import { searchHospital } from "@/lib/hospital-search";
import { navLinks, isNavActive } from "@/lib/navigation";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [modal, setModal] = useState<"menu" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const results = searchHospital(query);
  const overlaysHero = ["/", "/departments", "/doctors", "/contact", "/about"].includes(pathname) || pathname.startsWith("/departments/");

  useEffect(() => {
    if (!modal) return;
    const dialog = dialogRef.current;
    dialog?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previous; };
  }, [modal]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1181px)");
    const dismiss = () => { if (desktop.matches) setModal((current) => current === "menu" ? null : current); };
    desktop.addEventListener("change", dismiss);
    return () => desktop.removeEventListener("change", dismiss);
  }, []);

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setModal(null);
    if (pathname !== "/" || href !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <>
      {!overlaysHero && <div className={styles.spacer} aria-hidden="true" />}
      <header ref={headerRef} className={styles.header} data-site-header>
        <Link href="/" className={styles.brand} aria-label="Prathamaa Hospital home" onClick={() => setModal(null)}><Image src={logo} alt="Prathamaa Hospital and First Cuddle" priority sizes="(max-width: 600px) 55vw, (max-width: 1180px) 285px, (max-width: 1450px) 280px, 330px" /></Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">{navLinks.map((link) => <Link key={link.id} href={link.href} onClick={(event) => navigate(event, link.href)} aria-current={isNavActive(pathname, link.href) ? "page" : undefined}>{link.name}</Link>)}</nav>
        <div className={styles.desktopActions}><Link href="/appointment" className={styles.book}><Icon name="calendar" size={18} /> Book Appointment</Link><a href="tel:+918009002444" className={styles.phone}><Icon name="phone" size={18} /> +91 800 900 2444</a></div>
        <div className={styles.mobileActions}><button type="button" aria-label="Search hospital" onClick={() => setModal("search")}><Icon name="search" size={21} /></button><button type="button" aria-label="Open navigation menu" aria-expanded={modal === "menu"} aria-controls="hospital-navigation-dialog" onClick={() => setModal("menu")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h11" /></svg></button></div>
      </header>

      <dialog id="hospital-navigation-dialog" ref={dialogRef} className={`${styles.dialog} ${modal === "search" ? styles.searchDialog : styles.drawer}`} aria-labelledby="navigation-dialog-title" onCancel={() => setModal(null)} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setModal(null);
      }}>
        <div className={`${styles.dialogTop} ${modal === "menu" ? styles.drawerTop : ""}`}>
          {modal === "menu" ? <><span id="navigation-dialog-title" className={styles.srOnly}>Hospital navigation</span><Link href="/" className={styles.drawerBrand} aria-label="Prathamaa Hospital home" onClick={() => setModal(null)}><Image src={logo} alt="Prathamaa Hospital and First Cuddle" sizes="250px" /></Link></> : <span id="navigation-dialog-title">Find your care</span>}
          <button type="button" aria-label="Close dialog" onClick={() => setModal(null)}><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg></button>
        </div>
        {modal === "menu" ? <>
          <DrawerLotus className={styles.lotusTop} />
          <DrawerLotus className={styles.lotusBottom} />
          <nav className={styles.mobileNav} aria-label="Mobile navigation">{navLinks.map((link) => <Link key={link.id} href={link.href} onClick={(event) => navigate(event, link.href)} aria-current={isNavActive(pathname, link.href) ? "page" : undefined}><span className={styles.menuIcon}><Icon name={link.icon} size={27} strokeWidth={1.9} /></span><span>{link.name}</span><Icon name="chevronRight" size={20} /></Link>)}</nav>
          <div className={styles.menuBottom}>
            <div className={styles.drawerActions}><Link href="/appointment" className={styles.book} onClick={() => setModal(null)}><Icon name="calendar" size={24} /> Book Appointment <Icon name="chevronRight" size={20} /></Link><a href="tel:+918009002444" className={styles.menuPhone}><span><Icon name="phone" size={25} /></span><strong>+91 800 900 2444</strong><Icon name="chevronRight" size={20} /></a></div>
            <div className={styles.socials} aria-label="Social platforms">{[{ name: "Facebook", icon: "facebook", href: "https://facebook.com" }, { name: "Instagram", icon: "instagram", href: "https://instagram.com" }, { name: "YouTube", icon: "youtube", href: "https://youtube.com" }, { name: "LinkedIn", icon: "linkedin", href: "https://linkedin.com" }].map((social) => <a href={social.href} key={social.name} aria-label={social.name} target="_blank" rel="noopener noreferrer"><Icon name={social.icon} size={21} /></a>)}</div>
          </div>
        </> : <div className={styles.searchContent}>
          <label className={styles.searchField}><Icon name="search" size={20} /><span className={styles.srOnly}>Search doctors, departments or symptoms</span><input autoFocus type="search" autoComplete="off" value={query} maxLength={120} onChange={(event) => setQuery(event.target.value)} placeholder="Doctor, department or symptom…" /></label>
          {!query.trim() && <div className={styles.searchSuggestions}><p>Popular searches</p>{["Cardiology", "Pediatrics", "Skin", "Dr. Shivani"].map((term) => <button type="button" key={term} onClick={() => setQuery(term)}>{term} ↗</button>)}</div>}
          <p className={styles.searchCount} role="status">{query.trim() ? `${results.length} matching results` : "Search our doctors and specialties"}</p>
          <div className={styles.searchResults}>{results.map((result) => <Link href={result.href} key={result.id} onClick={() => setModal(null)}><span className={styles.resultIcon}><Icon name={result.icon} size={22} /></span><span><small>{result.type}</small><strong>{result.title}</strong><span>{result.subtitle}</span></span><Icon name="arrowRight" size={17} /></Link>)}</div>
          {query.trim() && results.length === 0 && <div className={styles.empty}><p>Try a doctor’s name, a specialty, or a term such as heart or skin.</p><Link href="/contact" onClick={() => setModal(null)}>Ask our team for help →</Link></div>}
        </div>}
      </dialog>
    </>
  );
}

function DrawerLotus({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 320 300" fill="none" aria-hidden="true"><g stroke="#f9c7b1" strokeWidth="2.5"><path d="M160 276C85 205 103 95 160 20c57 75 75 185 0 256Z" fill="#fff0e7" /><path d="M160 276C55 254 10 163 17 87c87 8 150 73 143 189Z" fill="#fce2d4" /><path d="M160 276c105-22 150-113 143-189-87 8-150 73-143 189Z" fill="#fce2d4" /><path d="M160 276C72 291 13 258 2 207c66-31 124-7 158 69Z" fill="#fce5d9" /><path d="M160 276c88 15 147-18 158-69-66-31-124-7-158 69Z" fill="#fce5d9" /></g></svg>;
}
