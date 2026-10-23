"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { quickStats } from "./data";
import { Icon } from "./Icons";
import { searchHospital } from "@/lib/hospital-search";
import styles from "./Hero.module.css";

const suggestions = ["Cardiology", "Pediatrics", "Skin", "Dr. Shivani"];

export function Hero() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchHospital(query);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    const dismiss = (event: PointerEvent) => { if (!searchRef.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);

  useEffect(() => {
    if (open && active >= 0) document.getElementById(`hero-result-${active}`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active, open]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOpen(true);
    setActive(-1);
    inputRef.current?.focus();
  }
  function handleKeys(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") { event.preventDefault(); setOpen(false); setActive(-1); }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault(); setOpen(true);
      setActive((previous) => event.key === "ArrowDown" ? Math.min(previous + 1, results.length - 1) : Math.max(previous - 1, 0));
    }
    if (event.key === "Enter" && open && active >= 0 && results[active]) {
      event.preventDefault(); document.getElementById(`hero-result-${active}`)?.click();
    }
  }

  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.artwork}>
        <div className={styles.imageFrame}>
          <Image src="/images/home-glass-hero.png" alt="Care illustration of a doctor reassuring an elderly patient in a bright hospital" fill preload sizes="(max-width: 900px) 171vw, 100vw" className={styles.backdrop} />
        </div>
        <div className={styles.glassFilter} aria-hidden="true" />
        <div className={styles.wash} />
      </div>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>COMPASSIONATE CARE. ADVANCED TREATMENTS.</p>
          <h1 id="home-hero-title">Your Health, <span>Our Priority</span></h1>
          <p className={styles.description}>Prathamaa Hospital in Hyderabad brings together multispeciality care, specialist doctors and diagnostic support with compassion for every stage of life.</p>
          <div className={styles.actions}><Link href="/appointment" className={styles.primary}><Icon name="calendar" size={20} />Book Appointment<Icon name="arrowRight" size={18} /></Link><Link href="/doctors" className={styles.secondary}><Icon name="user" size={21} />Find a Doctor<Icon name="arrowRight" size={18} /></Link></div>
        <div className={styles.searchArea} ref={searchRef} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false); }}>
          <form className={styles.search} role="search" onSubmit={submit}>
            <Icon name="search" size={23} />
            <label htmlFor="home-search" className={styles.srOnly}>Search doctors, departments or symptoms</label>
            <input id="home-search" ref={inputRef} type="search" autoComplete="off" maxLength={120} value={query} placeholder="Search doctors, departments or symptoms…" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls="hero-search-results" aria-activedescendant={open && active >= 0 ? `hero-result-${active}` : undefined} onFocus={() => setOpen(true)} onKeyDown={handleKeys} onChange={(event) => { setQuery(event.target.value); setActive(-1); setOpen(true); }} />
            {query && <button type="button" className={styles.clear} aria-label="Clear search" onClick={() => { setQuery(""); setActive(-1); inputRef.current?.focus(); }}>×</button>}
            <button type="submit" className={styles.searchSubmit}>Search</button>
          </form>
          {open && <div className={styles.resultsPanel}>
            {!hasQuery ? <><div className={styles.resultsHeading}>Find the care you’re looking for</div><div className={styles.suggestions}>{suggestions.map((term) => <button type="button" key={term} onClick={() => { setQuery(term); setActive(-1); inputRef.current?.focus(); }}>{term}<Icon name="arrowRight" size={14} /></button>)}</div></> : <div className={styles.resultsHeading} role="status">{results.length ? `${results.length} matching results` : "No matching results"}<span>Doctors & departments</span></div>}
            <ul id="hero-search-results" role="listbox" aria-label="Search results" className={styles.results}>
              {results.map((result, index) => <li key={result.id} role="presentation"><Link id={`hero-result-${index}`} role="option" aria-selected={active === index} href={result.href} onClick={() => { setOpen(false); setActive(-1); }} className={active === index ? styles.selected : ""}><span className={styles.resultIcon}><Icon name={result.icon} size={22} /></span><span className={styles.resultCopy}><span><strong>{result.title}</strong><small>{result.type}</small></span><span>{result.subtitle}</span></span><Icon name="arrowRight" size={17} /></Link></li>)}
            </ul>
            {hasQuery && results.length === 0 && <div className={styles.empty}><p>Try a doctor’s name, specialty or a term such as “heart”, “skin” or “fever”.</p><Link href="/contact">Ask our team for help <Icon name="arrowRight" size={16} /></Link></div>}
            {hasQuery && <p className={styles.searchNote}>Search helps you find a department; it does not provide a diagnosis.</p>}
          </div>}
        </div>
        </div>
        <div className={styles.stats}>{quickStats.map((stat) => <div key={stat.label}><span className={styles.statIcon}><Icon name={stat.label === "Happy Patients" ? "star" : stat.icon} size={28} strokeWidth={1.8} /></span><span><strong>{stat.value}</strong><small>{stat.label}</small></span></div>)}</div>
      </div>
    </section>
  );
}
