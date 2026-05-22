import { About } from "@/components/About";

import { Departments } from "@/components/Departments";

import { Doctors } from "@/components/Doctors";

import { Hero } from "@/components/Hero";

import { ServiceCards } from "@/components/ServiceCards";

export default function Home() {
  return (
    <main>

      <section
        id="home"
        className="nav-section"
      >
        <Hero />
      </section>

      <section className="nav-section">
        <ServiceCards />
      </section>

      <section
        id="about"
        className="nav-section"
      >
        <About />
      </section>

      <section
        id="departments"
        className="nav-section"
      >
        <Departments />
      </section>

      <section
        id="doctors"
        className="nav-section"
      >
        <Doctors />
      </section>

    </main>
  );
}