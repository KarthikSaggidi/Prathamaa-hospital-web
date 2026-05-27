import Image from "next/image";
import Link from "next/link";

import founder from "@/assests/derived/doctor-karthik1.png";

export default function AboutPage() {

  return (
    <main className="modern-about-page">

      {/* HERO SECTION */}

      <section className="modern-about-hero">

        <div className="container modern-about-container">

          <div className="modern-about-left">

            <span className="modern-about-badge">
              Trusted Multi-Speciality Hospital
            </span>

            <h1>
              Delivering Advanced
              Healthcare With
              Compassion & Excellence
            </h1>

            <p className="modern-about-text">

              Prathamaa Hospital is committed to providing
              exceptional healthcare services through advanced
              medical technology, experienced specialists,
              and compassionate patient care.

            </p>

            <p className="modern-about-text">

              Our hospital focuses on accurate diagnosis,
              modern treatment methods, emergency support,
              and personalized healthcare solutions to ensure
              every patient receives world-class medical care.

            </p>

            <div className="modern-about-actions">

              <Link
                href="/appointment"
                className="modern-primary-btn"
              >
                Book Appointment
              </Link>

              <Link
                href="/contact"
                className="modern-secondary-btn"
              >
                Contact Us
              </Link>

            </div>

          </div>

          {/* SMALL PROFESSIONAL FOUNDER CARD */}

          <div className="modern-about-right">

            <div className="founder-mini-card">

              <Image
                src={founder}
                alt="Dr. Karthik Manne"
                className="founder-mini-image"
                priority
              />

              <div className="founder-mini-content">

                <h3>
                  Dr. Karthik Manne
                </h3>

                <p>
                  Founder & Director
                </p>

                <span>
                  Leading healthcare with
                  innovation, trust, and
                  compassionate patient care.
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="modern-stats-section">

        <div className="container">

          <div className="modern-stats-grid">

            <div className="modern-stat-card">

              <h2>
                10+
              </h2>

              <p>
                Years of Excellence
              </p>

            </div>

            <div className="modern-stat-card">

              <h2>
                50+
              </h2>

              <p>
                Experienced Doctors
              </p>

            </div>

            <div className="modern-stat-card">

              <h2>
                10K+
              </h2>

              <p>
                Happy Patients
              </p>

            </div>

            <div className="modern-stat-card">

              <h2>
                24/7
              </h2>

              <p>
                Emergency Services
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* INFORMATION SECTION */}

      <section className="modern-info-section">

        <div className="container">

          <div className="modern-section-heading">

            <span>
              About Prathamaa Hospital
            </span>

            <h2>
              Comprehensive Healthcare
              Designed Around Patients
            </h2>

          </div>

          <div className="modern-info-grid">

            <div className="modern-info-card">

              <h3>
                Who We Are
              </h3>

              <p>

                Prathamaa Hospital is a modern
                healthcare institution dedicated
                to delivering advanced medical
                services with compassion, precision,
                and patient-focused care.

              </p>

            </div>

            <div className="modern-info-card">

              <h3>
                Our Vision
              </h3>

              <p>

                To become one of the most trusted
                and innovative healthcare providers
                by offering quality treatment,
                advanced technology, and ethical care.

              </p>

            </div>

            <div className="modern-info-card">

              <h3>
                Our Mission
              </h3>

              <p>

                Our mission is to provide accessible,
                affordable, and high-quality healthcare
                services while ensuring patient safety,
                trust, and medical excellence.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="modern-features-section">

        <div className="container">

          <div className="modern-section-heading center">

            <span>
              Why Choose Us
            </span>

            <h2>
              Excellence In Every
              Step Of Healthcare
            </h2>

          </div>

          <div className="modern-features-grid">

            <div className="modern-feature-card">
              Advanced Diagnostic Facilities
            </div>

            <div className="modern-feature-card">
              Expert Medical Specialists
            </div>

            <div className="modern-feature-card">
              Emergency & Critical Care
            </div>

            <div className="modern-feature-card">
              Modern Medical Infrastructure
            </div>

            <div className="modern-feature-card">
              Personalized Patient Care
            </div>

            <div className="modern-feature-card">
              Affordable Healthcare Services
            </div>

            <div className="modern-feature-card">
              24/7 Medical Support
            </div>

            <div className="modern-feature-card">
              Advanced Surgical Treatments
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="modern-cta-section">

        <div className="container">

          <div className="modern-cta-card">

            <h2>
              Your Health Is Our Priority
            </h2>

            <p>

              Experience advanced healthcare,
              trusted specialists, and compassionate
              treatment at Prathamaa Hospital.

            </p>

            <Link
              href="/appointment"
              className="modern-primary-btn"
            >
              Schedule Appointment
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}