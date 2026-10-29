"use client";

import Image, { getImageProps } from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type KeyboardEvent, type PointerEvent } from "react";
import { HERO_AUTOPLAY_MS, HERO_TRANSITION_MS, type HeroBanner } from "@/lib/hero-banners";
import { Icon } from "./Icons";
import styles from "./HeroCarousel.module.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (listener: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
};
const subscribeVisibility = (listener: () => void) => {
  document.addEventListener("visibilitychange", listener);
  return () => document.removeEventListener("visibilitychange", listener);
};
const getMotion = () => window.matchMedia(motionQuery).matches;
const getVisibility = () => document.hidden;
const serverSnapshot = () => false;

function CampaignImage({ banner, active, artworkSize, onLoad, onError }: {
  banner: HeroBanner; active: boolean; artworkSize: { width: number; height: number } | null;
  onLoad: () => void; onError: () => void;
}) {
  const aspectRatio = (banner.width ?? 1920) / (banner.height ?? 900);
  // A wide image covering a tall hero is larger than 100vw before it is cropped.
  // Size the resource to that full rendered image so the browser does not enlarge
  // a small thumbnail across the hero. It also accounts for screen pixel density.
  const sizes = artworkSize
    ? `${Math.ceil(Math.max(artworkSize.width, artworkSize.height * aspectRatio))}px`
    : `(max-width: 360px) max(100vw, 480px), (max-width: 600px) max(100vw, 523px), (max-width: 1100px) min(100vw, 832px), max(100vw, ${(aspectRatio * 100).toFixed(2)}svh)`;
  const mobile = banner.mobileSrc ? getImageProps({
    src: banner.mobileSrc, alt: banner.alt, width: 941, height: 1672,
    quality: 100, sizes: "100vw",
  }).props.srcSet : undefined;

  return <picture className={`${styles.picture}${mobile ? ` ${styles.hasPortrait}` : ""}`}>
    {mobile && <source media="(max-width: 1100px)" srcSet={mobile} sizes="100vw" />}
    <Image src={banner.src} alt={banner.title ? "" : banner.alt} fill sizes={sizes} quality={100}
      loading="eager" fetchPriority={active ? "high" : "low"} className={styles.image}
      style={{ objectPosition: banner.position ?? "center" }} onLoad={onLoad} onError={onError} />
  </picture>;
}

export function HeroCarousel({ banners }: { banners: readonly HeroBanner[] }) {
  const [selection, setSelection] = useState({ index: 0, previousId: "", revision: 0 });
  const [loaded, setLoaded] = useState<string[]>([]);
  const [failed, setFailed] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const [artworkSize, setArtworkSize] = useState<{ width: number; height: number } | null>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const visibleId = useRef("");
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getMotion, serverSnapshot);
  const hidden = useSyncExternalStore(subscribeVisibility, getVisibility, serverSnapshot);
  const available = useMemo(() => banners.filter((banner) => !failed.includes(banner.id)), [banners, failed]);
  const count = available.length;
  const index = count ? selection.index % count : 0;
  const current = available[index];
  const next = available[(index + 1) % count];
  const ready = Boolean(current && loaded.includes(current.id));
  const autoplay = count > 1 && ready && !hidden;

  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.ceil(entry.contentRect.width);
      const height = Math.ceil(entry.contentRect.height);
      setArtworkSize((previous) => previous?.width === width && previous.height === height ? previous : { width, height });
    });
    observer.observe(artwork);
    return () => observer.disconnect();
  }, []);

  const select = useCallback((target: number, manual = true) => {
    if (!count) return;
    const normalized = (target + count) % count;
    setSelection((previous) => ({ index: normalized, previousId: visibleId.current, revision: previous.revision + 1 }));
    if (manual) {
      const item = available[normalized];
      setAnnouncement(`Banner ${normalized + 1} of ${count}: ${item.title ? `${item.title} ${item.accent ?? ""}` : item.alt}`);
    }
  }, [available, count]);

  useEffect(() => {
    if (ready && current) visibleId.current = current.id;
  }, [current, ready]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => select(index + 1, false), HERO_AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, index, selection.revision, select]);

  useEffect(() => {
    if (!ready || !selection.previousId) return;
    const timer = window.setTimeout(() => setSelection((previous) => ({ ...previous, previousId: "" })), HERO_TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [ready, selection.previousId]);

  useEffect(() => {
    const container = indicatorsRef.current;
    if (!container) return;
    const revealActiveIndicator = () => {
      const button = container.children[index];
      if (!(button instanceof HTMLElement)) return;
      const parentBounds = container.getBoundingClientRect();
      const buttonBounds = button.getBoundingClientRect();
      // Scroll only the indicator strip. Never move the page vertically.
      container.scrollTo({
        left: container.scrollLeft + buttonBounds.left - parentBounds.left - (container.clientWidth - buttonBounds.width) / 2,
        behavior: reducedMotion ? "instant" : "smooth",
      });
    };
    revealActiveIndicator();
    const observer = new ResizeObserver(revealActiveIndicator);
    observer.observe(container);
    return () => observer.disconnect();
  }, [index, count, reducedMotion]);

  function moveArtwork(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse" || window.innerWidth <= 1100) return;
    const area = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - area.left) / area.width - .5) * 12;
    const y = ((event.clientY - area.top) / area.height - .5) * 8;
    event.currentTarget.style.setProperty("--artwork-x", `${x.toFixed(2)}px`);
    event.currentTarget.style.setProperty("--artwork-y", `${y.toFixed(2)}px`);
  }

  function resetArtwork() {
    carouselRef.current?.style.setProperty("--artwork-x", "0px");
    carouselRef.current?.style.setProperty("--artwork-y", "0px");
  }

  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (!count) return;
    switch (event.key) {
      case "ArrowLeft": event.preventDefault(); select(index - 1); break;
      case "ArrowRight": event.preventDefault(); select(index + 1); break;
      case "Home": event.preventDefault(); select(0); break;
      case "End": event.preventDefault(); select(count - 1); break;
    }
  }

  // Only the current, outgoing and next images mount. The next image is decoded
  // before it becomes visible; the outgoing slide stays until its replacement loads.
  const mounted = available.filter((banner) => banner.id === current?.id || banner.id === selection.previousId || banner.id === next?.id);

  return <div ref={carouselRef} className={styles.carousel} onPointerMove={moveArtwork} onPointerLeave={resetArtwork} role="region" aria-roledescription="carousel"
    aria-label="Hospital promotional banners" data-current-banner={current?.id} data-autoplay={autoplay}>
    <div ref={artworkRef} className={styles.artwork} aria-hidden="true">
      {mounted.map((banner) => {
        const active = banner.id === current?.id;
        const visible = (active && ready) || (!ready && banner.id === selection.previousId);
        return <div key={banner.id} className={`${styles.layer}${visible ? ` ${styles.visible}` : ""}`}
          style={{ backgroundColor: banner.mobileBackground ?? "#fffaf4" }} data-banner-image={banner.id}>
          <CampaignImage banner={banner} active={active} artworkSize={artworkSize} onLoad={() => setLoaded((previous) => previous.includes(banner.id) ? previous : [...previous, banner.id])}
            onError={() => setFailed((previous) => previous.includes(banner.id) ? previous : [...previous, banner.id])} />
        </div>;
      })}
    </div>
    <div className={styles.viewport} tabIndex={count > 1 ? 0 : undefined} onKeyDown={keyboard}>
      {current && <>
        <div className={styles.copyArea}>
          {available.filter((banner) => banner.title).map((banner) => <div key={banner.id}
            className={`${styles.copy}${banner.id === current.id ? ` ${styles.copyVisible}` : ""}`}
            data-theme={banner.theme} aria-hidden={banner.id !== current.id}>
            <p className={styles.eyebrow}>{banner.eyebrow}</p>
            <h2>{banner.title}<span>{banner.accent}</span></h2>
            <p className={styles.subtitle}>{banner.subtitle}</p>
            {banner.strengths && <ul className={styles.strengths}>{banner.strengths.map((strength) => <li key={strength.label}>
              <span><Icon name={strength.icon} size={22} strokeWidth={1.7} /></span>{strength.label}
            </li>)}</ul>}
          </div>)}
        </div>
        <span className={styles.srOnly} aria-live="off">Banner {index + 1} of {count}: {current.title ? `${current.title} ${current.accent ?? ""}. ${current.subtitle ?? ""}` : current.alt}</span>
        <button type="button" className={`${styles.arrow} ${styles.previous}`} aria-label="Previous banner" disabled={count < 2} onClick={() => select(index - 1)}><Icon name="chevronLeft" size={24} /></button>
        <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label="Next banner" disabled={count < 2} onClick={() => select(index + 1)}><Icon name="chevronRight" size={24} /></button>
        <div className={styles.controls}>
          <div ref={indicatorsRef} className={styles.indicators} role="group" aria-label="Choose a banner">
            {available.map((banner, number) => <button type="button" key={banner.id} aria-label={`Show banner ${number + 1}`} aria-pressed={index === number} onClick={() => select(number)}><span /></button>)}
          </div>
        </div>
      </>}
      <span className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{announcement}</span>
    </div>
  </div>;
}
