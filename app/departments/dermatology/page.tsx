import Link from "next/link";

export default function DermatologyPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/dermatology.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Dermatology
          </h1>

          <p className="department-subtitle">
            Advanced skin, hair, and nail care services
            with expert dermatologists, modern treatments,
            and personalized skincare solutions for all ages.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Dermatology Department
            </h2>

            <p>
              The Dermatology Department at Prathamaa Hospital
              provides specialized care for skin, hair,
              and nail conditions using advanced diagnostic
              methods and modern treatment technologies.
              Our experienced dermatologists focus on
              improving skin health, appearance, and
              overall patient confidence.
            </p>

            <p>
              We offer comprehensive dermatology services
              for both medical and cosmetic skin concerns.
              From common skin allergies and acne to
              advanced treatments for chronic skin diseases,
              our department ensures personalized and
              effective healthcare solutions for every patient.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Acne & Pimples</div>
              <div>Skin Allergies</div>
              <div>Psoriasis</div>
              <div>Eczema</div>
              <div>Hair Fall Problems</div>
              <div>Fungal Infections</div>
              <div>Skin Pigmentation</div>
              <div>Nail Disorders</div>
              <div>Skin Rashes</div>
              <div>Vitiligo</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Skin Consultations</div>
              <div>Acne Treatment</div>
              <div>Hair Fall Treatment</div>
              <div>Skin Allergy Care</div>
              <div>Laser Skin Treatments</div>
              <div>Cosmetic Dermatology</div>
              <div>Anti-Aging Treatments</div>
              <div>Skin Health Checkups</div>

            </div>

            <h2>
              Advanced Skin Care Solutions
            </h2>

            <p>
              Our dermatology department combines advanced
              medical expertise with modern skincare
              technologies to provide safe and effective
              treatments. We focus on accurate diagnosis,
              early treatment, and long-term skin health
              management for patients of all age groups.
            </p>

            <p>
              We provide personalized skincare plans
              based on individual skin types and conditions.
              Our specialists also guide patients on
              preventive skincare, healthy routines,
              and lifestyle practices to maintain
              healthy and glowing skin.
            </p>

            <h2>
              Cosmetic & Aesthetic Dermatology
            </h2>

            <p>
              In addition to medical dermatology,
              Prathamaa Hospital also offers cosmetic
              dermatology services for improving skin
              appearance and confidence. Our treatments
              are performed using safe procedures and
              advanced technologies under expert supervision.
            </p>

            <p>
              With experienced dermatologists,
              advanced diagnostic facilities,
              and patient-focused care,
              Prathamaa Hospital ensures
              high-quality dermatology services
              with safety, precision, and comfort.
            </p>

            <div className="department-buttons">

              <Link
                href="/appointment"
                className="primary-btn"
              >
                Book Appointment
              </Link>

              <Link
                href="/departments"
                className="secondary-btn"
              >
                Back to Departments
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}