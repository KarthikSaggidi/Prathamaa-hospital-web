export const navLinks = [
  { name: "Home", id: "home", href: "/", icon: "home" },
  { name: "About Us", id: "about", href: "/about", icon: "people" },
  { name: "Departments", id: "departments", href: "/departments", icon: "stethoscope" },
  { name: "Our Doctors", id: "doctors", href: "/doctors", icon: "doctor" },
  { name: "Contact Us", id: "contact", href: "/contact", icon: "phone" },
] as const;

/** Home stays active throughout the homepage; child pages inherit their section. */
export function isNavActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
