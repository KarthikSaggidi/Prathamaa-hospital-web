"use client";

import Image from "next/image";
import Link from "next/link";

import heroRight from "@/assests/hero-section/hero-right.png";
import heroLotus from "@/assests/hero-section/hero-lotus.png";

import { quickStats } from "./data";
import { Icon } from "./Icons";

export function Hero() {
  const scrollToDoctors = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const doctorsSection =
      document.getElementById(
        "doctors"
      );

    if (doctorsSection) {
      const navbarHeight = 110;

      const sectionPosition =
        doctorsSection.getBoundingClientRect()
          .top +
        window.pageYOffset;

      window.scrollTo({
        top:
          sectionPosition -
          navbarHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            COMPASSIONATE CARE.
            ADVANCED TREATMENT.
          </p>

          <h1>
            Your Health,
            <span>
              Our Priority
            </span>
          </h1>

          <p className="hero-text">
            Prathama Hospital is
            committed to providing
            exceptional healthcare
            with compassion and
            advanced technology.
          </p>

          <div className="hero-buttons">
            <Link
              className="btn btn-primary btn-large"
              href="/appointment"
            >
              <Icon
                name="calendar"
                size={20}
              />
              Book Appointment
            </Link>

            <a
              className="btn btn-outline btn-large"
              href="#doctors"
              onClick={
                scrollToDoctors
              }
            >
              <Icon
                name="user"
                size={20}
              />
              Find a Doctor
            </a>
          </div>

          <div className="stats-row">
            {quickStats.map(
              (stat) => (
                <div
                  className="stat"
                  key={stat.label}
                >
                  <span className="stat-icon">
                    <Icon
                      name={stat.icon}
                      size={20}
                    />
                  </span>

                  <span>
                    <strong>
                      {stat.value}
                    </strong>

                    <small>
                      {stat.label}
                    </small>
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <div className="hero-visual">
          <Image
            className="lotus"
            src={heroLotus}
            alt=""
            priority
          />

          <Image
            className="doctor-patient"
            src={heroRight}
            alt="Doctor caring for a patient"
            priority
          />

          <form className="search-box">
            <Icon
              name="search"
              size={24}
            />

            <input
              aria-label="Search doctors, departments or symptoms"
              autoComplete="off"
              name="hospital-search"
              placeholder="Search Doctors, Departments or Symptoms..."
            />

            <button type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}