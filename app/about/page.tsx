import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/about-hospital.jpg') center/cover",
        }}
      >

        <div className="container">

          <h1>
            <br></br>
            <br></br>
          </h1>

          <p className="department-subtitle">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              Who We Are
            </h2>

            <p>
              Prathamaa Hospital is committed to providing
              world-class healthcare services with compassion,
              innovation, and excellence. Our hospital combines
              advanced medical infrastructure with highly skilled
              doctors and dedicated healthcare professionals to
              ensure the best treatment for every patient.
            </p>

            <p>
              We focus on patient safety, accurate diagnosis,
              modern treatment methods, and personalized care.
              Our goal is to make quality healthcare accessible
              and affordable for everyone.
            </p>

            <h2>
              Our Specialities
            </h2>

            <div className="department-list">

              <div>Advanced Medical Facilities</div>
              <div>24/7 Emergency Services</div>
              <div>Experienced Specialists</div>
              <div>Modern Diagnostic Labs</div>
              <div>Patient-Centered Care</div>
              <div>Critical Care Services</div>
              <div>Advanced Surgical Care</div>
              <div>Health Checkup Programs</div>

            </div>

            <h2>
              Our Mission
            </h2>

            <p>
              Our mission is to provide high-quality healthcare
              services with integrity, compassion, and excellence.
              We strive to improve community health through
              advanced treatment, preventive care, and continuous
              medical innovation.
            </p>

            <h2>
              Why Choose Us
            </h2>

            <div className="department-list">

              <div>Expert Medical Team</div>
              <div>Modern Infrastructure</div>
              <div>Advanced Technology</div>
              <div>Affordable Healthcare</div>
              <div>Friendly Environment</div>
              <div>Emergency Support</div>
              <div>Trusted Patient Care</div>
              <div>Comprehensive Treatments</div>

            </div>

            <div className="department-buttons">

              <Link
                href="/appointment"
                className="primary-btn"
              >
                Book Appointment
              </Link>

              <Link
                href="/"
                className="secondary-btn"
              >
                Back to Home
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}