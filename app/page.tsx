import localFont from "next/font/local";
import { pageMetadata } from "@/lib/seo";
import { pages } from "@/lib/seo-pages";
import { pageStructuredData } from "@/lib/structured-data";
import { JsonLd } from "@/components/JsonLd";
import styles from "./Home.module.css";
import { Departments } from "@/components/Departments";
import { HomeInformation } from "@/components/HomeInformation";
import { Hero } from "@/components/Hero";

import { ServiceCards } from "@/components/ServiceCards";

const homeFont = localFont({ src: "../public/fonts/Manrope-Variable.ttf", variable: "--font-home", weight: "200 800", display: "swap" });

export const metadata = pageMetadata(pages.home);

export default function Home() {
  return (
    <div id="home" className={`${styles.home} ${homeFont.variable}`}>
      <JsonLd data={pageStructuredData(pages.home)} />
      <Hero />
      <ServiceCards />
      <Departments />
      <HomeInformation />
    </div>
  );
}
