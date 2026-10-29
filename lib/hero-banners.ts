export type HeroBanner = {
  id: string;
  src: `/images/hero-banners/${string}`;
  /** Source dimensions determine the resolution needed by object-fit: cover. */
  width?: number;
  height?: number;
  mobileSrc?: `/images/hero-banners/${string}`;
  /** Extends a portrait banner's own background below the fitted image on phones. */
  mobileBackground?: `#${string}`;
  /** Describe the promotion, including any important text in the banner. */
  alt: string;
  /** CSS object-position; adjust the focal point if a banner needs it. */
  position?: string;
  eyebrow?: string;
  title?: string;
  accent?: string;
  subtitle?: string;
  theme?: "orange" | "teal" | "blue" | "rose" | "plum";
  strengths?: readonly { icon: string; label: string }[];
};

export const HERO_AUTOPLAY_MS = 6000;
export const HERO_TRANSITION_MS = 700;

export const heroBanners: readonly HeroBanner[] = [
  {
    id: "hospital-intro",
    position: "70% center",
    src: "/images/hero-banners/hospital-intro-3d-4k.webp",
    width: 3840,
    height: 1800,
    mobileBackground: "#fffaf4",
    alt: "A sculptural ivory and orange glass medical cross with a steel stethoscope, orbit ribbon and recessed blue architectural halo.",
    eyebrow: "COMPASSIONATE CARE. ADVANCED TREATMENTS.",
    title: "Your Health,",
    accent: "Our Priority",
    subtitle: "Comprehensive healthcare, expert specialists and advanced treatments for every stage of life.",
    theme: "orange",
    strengths: [
      { icon: "stethoscope", label: "Specialist care" },
      { icon: "heartOutline", label: "Patient-first approach" },
      { icon: "xray", label: "Modern diagnostics" },
      { icon: "clock", label: "24/7 emergency support" },
    ],
  },
  {
    id: "heart-care",
    src: "/images/hero-banners/heart-care-3d-4k.webp",
    width: 3840,
    height: 1800,
    mobileBackground: "#fff6f1",
    alt: "A detailed coral anatomical heart floating above an ivory plinth, framed by a transparent orbit and rose architectural halo.",
    eyebrow: "HEART CARE · CARDIOLOGY",
    title: "Care for your heart.",
    accent: "Confidence for life.",
    subtitle: "Specialist cardiology consultations, heart-health assessment and a care plan built around you.",
    theme: "rose",
    strengths: [
      { icon: "heart", label: "Cardiac assessment" },
      { icon: "stethoscope", label: "Blood pressure care" },
      { icon: "heartOutline", label: "Personal care plans" },
    ],
  },
  {
    id: "women-children",
    src: "/images/hero-banners/women-children-3d-4k.webp",
    width: 3840,
    height: 1800,
    mobileBackground: "#fbf3f8",
    alt: "An ivory porcelain mother cradles her infant within a translucent rose and lavender glass loop.",
    eyebrow: "WOMEN & CHILDREN · CARE AT EVERY STAGE",
    title: "Care for women.",
    accent: "Care for little ones.",
    subtitle: "Women's health, maternity and pediatric expertise, with compassionate support at every stage of life.",
    theme: "plum",
    strengths: [
      { icon: "gynecology", label: "Women's health" },
      { icon: "heartOutline", label: "Pregnancy care" },
      { icon: "baby", label: "Pediatrics" },
    ],
  },
  {
    id: "orthopaedics",
    src: "/images/hero-banners/orthopaedics-3d-4k.webp",
    width: 3840,
    height: 1800,
    mobileBackground: "#f0f9fa",
    alt: "A detailed sculptural knee joint with ivory bone, blue cartilage and translucent teal glass hoops.",
    eyebrow: "ORTHOPAEDICS & SPORTS MEDICINE",
    title: "Move with ease.",
    accent: "Live with confidence.",
    subtitle: "Expert care for bones, joints and sports injuries, with treatment planned around your needs.",
    theme: "teal",
    strengths: [
      { icon: "bone", label: "Bone & joint care" },
      { icon: "shieldCheck", label: "Sports injuries" },
      { icon: "scalpel", label: "Orthopaedic surgery" },
    ],
  },
  {
    id: "preventive-care",
    src: "/images/hero-banners/preventive-care-3d-4k.webp",
    width: 3840,
    height: 1800,
    mobileBackground: "#effaf8",
    alt: "A beveled mint glass shield with an ivory checkmark and a realistic stethoscope on a sculptural plinth.",
    eyebrow: "PREVENTION STARTS WITH A CONVERSATION",
    title: "Small steps today.",
    accent: "A healthier tomorrow.",
    subtitle: "Regular health check-ups, early assessment and practical guidance for your everyday wellbeing.",
    theme: "teal",
    strengths: [
      { icon: "shieldCheck", label: "Preventive care" },
      { icon: "heart", label: "Heart health" },
      { icon: "stethoscope", label: "General medicine" },
    ],
  },
  {
    id: "specialty-care",
    src: "/images/hero-banners/specialty-care-3d-4k.webp",
    width: 3840,
    height: 1800,
    mobileBackground: "#f0f4fd",
    alt: "A blue glass medical cross, steel stethoscope and small heart and brain sculptures on connected ivory plinths.",
    eyebrow: "EXPERTISE THAT CONNECTS YOUR CARE",
    title: "Specialist expertise.",
    accent: "Care built around you.",
    subtitle: "From diagnosis to treatment, our departments work together to support your individual healthcare needs.",
    theme: "blue",
    strengths: [
      { icon: "people", label: "Multiple specialties" },
      { icon: "xray", label: "Diagnostic imaging" },
      { icon: "heartOutline", label: "Personal care plans" },
    ],
  },
];
