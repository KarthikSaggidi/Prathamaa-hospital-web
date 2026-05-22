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
