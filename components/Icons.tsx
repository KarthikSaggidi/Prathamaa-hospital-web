type IconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
};

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Icon({ name, size = 28, strokeWidth = 2 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...common}
      strokeWidth={strokeWidth}
    >
      {paths[name] ?? paths.grid}
    </svg>
  );
}

const paths: Record<string, React.ReactNode> = {
  lightbulb: <><path d="M9 18h6M9.5 21h5M8 14a6 6 0 1 1 8 0c-1 .8-1 1.5-1 2H9c0-.5 0-1.2-1-2ZM12 1v1M3 4l1 1m16-1-1 1M1 10h2m18 0h2" /></>,
  heartOutline: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  arrowUp: <path d="M12 20V4M5 11l7-7 7 7" />,
  siren: <><path d="M7 18v-6a5 5 0 0 1 10 0v6M5 18h14v4H5v-4ZM12 1v2M3 5l2 2m16-2-2 2M1 12h2m18 0h2" /><path d="M10 12a2 2 0 0 1 2-2" /></>,
  twitter: <path d="m4 3 12 18h4L8 3H4Zm16 0L4 21" />,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></>,
  headset: <><path d="M4 13v-2a8 8 0 0 1 16 0v2M20 17v2a3 3 0 0 1-3 3h-3" /><rect x="2" y="11" width="5" height="8" rx="2" /><rect x="17" y="11" width="5" height="8" rx="2" /><path d="M11 22h3" /></>,
  home: <><path d="m3 10 9-8 9 8M5 9v12h5v-7h4v7h5V9" /></>,
  people: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-2a6 6 0 0 1 12 0v2M17 4a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 4v2" /></>,
  facebook: <path fill="currentColor" stroke="none" d="M14 22v-9h3l.5-4H14V7c0-1 .4-2 2-2h2V1.5c-.8-.1-2-.3-3-.3-3 0-5 1.8-5 5.2V9H7v4h3v9h4Z" />,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" /></>,
  youtube: <><rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" stroke="none" /><path d="m10 9 6 3-6 3V9Z" fill="white" stroke="none" /></>,
  linkedin: <><rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" stroke="none" /><path d="M6.5 10v8M11 18v-8m0 4c0-5 6-5 6 0v4" stroke="white" strokeWidth="2" /><circle cx="6.5" cy="6.5" r="1.2" fill="white" stroke="none" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  shieldCheck: <><path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5l8-3Z" /><path d="m8 11 3 3 5-6" /></>,
  notes: <><rect x="4" y="3" width="16" height="18" rx="3" /><path d="M8 7h8M8 11h8M8 15h4" /></>,
  whatsapp: <><path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z" /><path d="M8 7c0 5 4 9 8 9l1-3-3-1-1 1a7 7 0 0 1-3-3l1-1-1-3-2 1Z" /></>,
  scalpel: (
    <>
      <path d="m4 20 8-8m-2-2 8-8 4 4-8 8-4-4Z" />
      <path d="m4 20-2 2m12-12 4-4" />
    </>
  ),
  anesthesiaMask: (
    <>
      <path d="M7 5a5 5 0 0 1 10 0v3M7 8l5-2 5 2v5a5 5 0 0 1-10 0V8Z" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 14v5a3 3 0 0 0 6 0v-2M7 9 3 7m14 2 4-2" />
    </>
  ),
  bladder: (
    <>
      <path d="M7 2v5m10-5v5M7 7c-6 2-4 12 5 12S23 9 17 7c-3 2-7 2-10 0ZM12 19v3" />
      <path d="m9 12 3 3 3-3" />
    </>
  ),
  kidneys: (
    <>
      <path d="M8 3C2 3 1 10 3 15c2 4 7 2 7-1 0-2-3-2-3-4s3-2 3-4c0-2-1-3-2-3ZM16 3c6 0 7 7 5 12-2 4-7 2-7-1 0-2 3-2 3-4s-3-2-3-4c0-2 1-3 2-3ZM9 12c3 0 2 7 2 10m4-10c-3 0-2 7-2 10" />
    </>
  ),
  xray: (
    <>
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <path d="M12 5v14M7 7l5 2 5-2M6 11l6 2 6-2M7 15l5 2 5-2" />
    </>
  ),
  skin: (
    <>
      <path d="M3 9c3-3 6 3 9 0s6 3 9 0v11H3V9ZM8 10V5l-2-3m10 8V4l2-2M3 15h18" />
      <circle cx="7" cy="18" r=".5" /><circle cx="16" cy="12" r=".5" />
    </>
  ),
  ear: (
    <>
      <path d="M6 9a7 7 0 0 1 14 0c0 5-5 5-6 9-1 5-7 4-7 0M10 9a3 3 0 0 1 6 0c0 3-4 2-4 5" />
      <path d="M3 7a11 11 0 0 0 0 6" />
    </>
  ),
  jaw: (
    <>
      <path d="M6 3v8l-2 3h3v4l5 4 6-5V3M8 13h9M9 13v3h7v-3M12 16v-3M8 7h2m5 0h2" />
    </>
  ),
  reconstructive: (
    <>
      <path d="M9 3C3 4 3 11 7 14l2 2v5h7v-4l3-2-2-4V6M5 18l13-13M8 17l-2-2m5-1-2-2m5-1-2-2m5-1-2-2" />
      <path d="m19 1 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" />
    </>
  ),
  toothImplant: (
    <>
      <path d="M6 3c2-2 4 0 6 0s4-2 6 0c2 2 0 7-2 8H8C6 10 4 5 6 3ZM9 11v8l3 3 3-3v-8M8 14h8m-8 3h8" />
    </>
  ),

  calendar: (
    <>
      <path d="M8 2v4M16 2v4M3 9h18" />
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.62 2.65a2 2 0 0 1-.45 2.11L8 9.76a16 16 0 0 0 6.24 6.24l1.28-1.28a2 2 0 0 1 2.11-.45c.85.29 1.74.5 2.65.62A2 2 0 0 1 22 16.92Z" />
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  badge: (
    <>
      <path d="M12 3 9.4 8.3 3.6 9.1l4.2 4.1-1 5.8L12 16.2l5.2 2.8-1-5.8 4.2-4.1-5.8-.8L12 3Z" />
    </>
  ),
  flask: (
    <>
      <path d="M9 2h6M10 2v6l-5.7 9.5A3 3 0 0 0 6.9 22h10.2a3 3 0 0 0 2.6-4.5L14 8V2" />
      <path d="M7 15h10" />
    </>
  ),
  doctor: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M6 21v-2a6 6 0 0 1 12 0v2M12 13v5M9.5 15.5h5" />
    </>
  ),
  ambulance: (
    <>
      <path d="M10 17H6V6h9v11M15 10h3l3 3v4h-2" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
      <path d="M8 9h4M10 7v4" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8ZM3 12h4l2-4 4 8 2-4h6" />
  ),
  brain: (
    <path d="M9 3a4 4 0 0 0-4 4v.5A3.5 3.5 0 0 0 5.5 14 4 4 0 0 0 9 21M15 3a4 4 0 0 1 4 4v.5a3.5 3.5 0 0 1-.5 6.5A4 4 0 0 1 15 21M9 3v18M15 3v18M9 8h3M12 13h3M8 16h4" />
  ),
  bone: (
    <path d="M17 3a3 3 0 0 0-2.8 4.1L7.1 14.2A3 3 0 1 0 9.8 17l7.1-7.1A3 3 0 1 0 17 3ZM4.5 18.5 6 20M18 4l1.5 1.5" />
  ),
  baby: (
    <>
      <circle cx="12" cy="12" r="6" />
      <path d="M9 10h.01M15 10h.01M10 15c1.2 1 2.8 1 4 0M12 6c0-2 3-2 3 0" />
    </>
  ),
  gynecology: (
    <path d="M6 5c4 0 6 3 6 8 0-5 2-8 6-8M12 13v8M8 17h8" />
  ),
  stethoscope: (
    <path d="M6 3v5a4 4 0 0 0 8 0V3M4 3h4M12 3h4M14 8c0 5 6 4 6 9a3 3 0 0 1-6 0" />
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  location: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  star: <path d="M12 2.5 15 9l7 .7-5.2 4.7 1.5 6.9L12 17.8l-6.3 3.5 1.5-6.9L2 9.7 9 9l3-6.5Z" />,
};
