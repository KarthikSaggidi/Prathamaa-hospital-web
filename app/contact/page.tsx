"use client";

import Link from "next/link";

export default function ContactPage() {

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {

    e.preventDefault();

    alert(
      "Your request has been submitted successfully."
    );
  };

  return (
    <main className="contact-page">

      {/* HERO SECTION */}

      <section className="contact-hero">

        <div className="container">

          <div className="contact-hero-content">

            <span className="contact-badge">
              Trusted Healthcare • 24/7 Patient Support
            </span>

            <h1>
              Contact
              <br />
              Prathamaa Hospital
            </h1>

            <p>
              Connect with our experienced healthcare
              professionals for appointments, emergency
              care, specialist consultations, and
              patient support services.
            </p>

            <div className="contact-hero-buttons">

              <Link
                href="/appointment"
                className="primary-btn"
              >
                Book Appointment
              </Link>

              <a
                href="tel:+918009002444"
                className="secondary-btn"
              >
                Call Hospital
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* CONTACT CARDS */}

      <section className="contact-cards-section">

        <div className="container">

          <div className="contact-cards">

            {/* CALL */}

            <a
              href="tel:+918009002444"
              className="contact-card"
            >

              <div className="contact-icon">
                📞
              </div>

              <h3>
                Emergency Support
              </h3>

              <p>
                Our emergency healthcare team is
                available 24/7 to provide immediate
                medical assistance and patient care.
              </p>

              <span>
                +91 800 900 2444
              </span>

            </a>

            {/* MAP */}

            <a
              href="https://www.google.com/maps/place/Prathamaa+hospital/@17.5405483,78.4315599,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8f006bbc6957:0x65b9ee0c6e26cc3d!8m2!3d17.5405432!4d78.4341348!16s%2Fg%2F11zkx18lmf?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >

              <div className="contact-icon">
                📍
              </div>

              <h3>
                Hospital Location
              </h3>

              <p>
                Visit Prathamaa Hospital located in
                Hyderabad with advanced healthcare
                infrastructure and specialist doctors.
              </p>

              <span>
                Open in Google Maps
              </span>

            </a>

            {/* EMAIL */}

            <a
              href="mailto:Prathamaahospital@gmail.com"
              className="contact-card"
            >

              <div className="contact-icon">
                ✉️
              </div>

              <h3>
                Email Support
              </h3>

              <p>
                Reach our support team for medical
                guidance, appointment queries,
                reports, and healthcare assistance.
              </p>

              <span>
                Prathamaahospital@gmail.com
              </span>

            </a>

            {/* WHATSAPP */}

            <a
              href="https://wa.me/918009002444"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card"
            >

              <div className="contact-icon">
                💬
              </div>

              <h3>
                WhatsApp Support
              </h3>

              <p>
                Chat directly with our healthcare
                support team for quick assistance,
                appointments, and patient queries.
              </p>

              <span>
                Chat on WhatsApp
              </span>

            </a>

          </div>

        </div>

      </section>

      {/* MAIN SECTION */}

      <section className="contact-main-section">

        <div className="container">

          <div className="contact-main-grid">

            {/* LEFT SIDE */}

            <div className="contact-left">

              <span className="section-tag">
                Why Patients Choose Us
              </span>

              <h2>
                Advanced Medical Care
                with Compassion
              </h2>

              <p>
                Prathamaa Hospital combines experienced
                doctors, modern technology, and
                compassionate patient care to provide
                trusted healthcare services for every
                patient.
              </p>

              <p>
                From emergency support and diagnostics
                to specialist consultations and advanced
                treatments, our hospital ensures quality
                care with patient comfort and safety.
              </p>

              <div className="contact-features">

                <div>
                  ✔ 24/7 Emergency Care
                </div>

                <div>
                  ✔ Advanced Diagnostics
                </div>

                <div>
                  ✔ Specialist Doctors
                </div>

                <div>
                  ✔ Modern ICU Facilities
                </div>

                <div>
                  ✔ Quick Appointment Support
                </div>

                <div>
                  ✔ Patient-Friendly Environment
                </div>

              </div>

            </div>

            {/* RIGHT FORM */}

            <div className="contact-form-card">

              <h3>
                Request a Callback
              </h3>

              <p>
                Fill out the form below and our
                healthcare support team will contact
                you shortly for assistance.
              </p>

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                />

                <select required>

                  <option value="">
                    Select Department
                  </option>

                  <option>
                    Cardiology
                  </option>

                  <option>
                    Pediatrics
                  </option>

                  <option>
                    Gynecology
                  </option>

                  <option>
                    Neurology
                  </option>

                  <option>
                    Orthopedics
                  </option>

                  <option>
                    General Medicine
                  </option>

                </select>

                <textarea
                  rows={5}
                  placeholder="Describe your medical requirement..."
                  required
                />

                <button type="submit">
                  Submit Request
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>

      

    </main>
  );
}