import Link from "next/link";

export default function PlasticSurgeryPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/plastic-surgery.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Plastic Surgery
          </h1>

          <p className="department-subtitle">
            Advanced reconstructive and cosmetic surgical care
            focused on enhancing appearance, restoring function,
            and improving confidence with precision and safety.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Plastic Surgery Department
            </h2>

            <p>
              The Plastic Surgery Department at Prathamaa Hospital
              provides advanced cosmetic and reconstructive surgical care
              using modern medical technologies and personalized treatment plans.
              Our department focuses on restoring appearance,
              improving body function,
              correcting deformities,
              and enhancing patient confidence through safe and effective procedures.
            </p>

            <p>
              Our experienced plastic surgeons specialize in handling
              both cosmetic enhancement procedures
              and reconstructive surgeries caused by trauma,
              burns, birth defects, accidents, or medical conditions.
              We are committed to providing natural-looking results
              while ensuring patient safety, comfort, and satisfaction.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Facial Deformities</div>
              <div>Burn Injuries</div>
              <div>Scar Correction</div>
              <div>Skin & Soft Tissue Defects</div>
              <div>Trauma Reconstruction</div>
              <div>Congenital Defects</div>
              <div>Facial Injuries</div>
              <div>Cosmetic Skin Concerns</div>
              <div>Breast Reconstruction</div>
              <div>Post-Surgical Reconstruction</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Cosmetic Surgery</div>
              <div>Facial Reconstruction</div>
              <div>Burn Care & Reconstruction</div>
              <div>Scar Revision Surgery</div>
              <div>Skin Grafting</div>
              <div>Hand Surgery</div>
              <div>Body Contouring Procedures</div>
              <div>Post-Trauma Reconstruction</div>

            </div>

            <h2>
              Advanced Cosmetic & Reconstructive Care
            </h2>

            <p>
              Our department uses advanced surgical techniques,
              precision equipment,
              and minimally invasive procedures whenever possible
              to reduce recovery time,
              minimize scarring,
              and achieve better aesthetic outcomes.
              Every procedure is carefully planned according
              to the individual needs and expectations of the patient.
            </p>

            <p>
              We focus on combining medical expertise
              with artistic precision to deliver natural-looking results.
              The department works closely with dermatologists,
              maxillofacial surgeons,
              anesthesiologists,
              and rehabilitation specialists
              to provide comprehensive treatment and recovery support.
            </p>

            <h2>
              Personalized Patient Care
            </h2>

            <p>
              At Prathamaa Hospital,
              patient comfort, privacy, and safety are our highest priorities.
              We provide detailed consultation sessions,
              personalized treatment planning,
              and complete post-surgical care
              to help patients recover smoothly and confidently.
            </p>

            <p>
              With experienced plastic surgeons,
              modern operation theaters,
              advanced reconstructive facilities,
              and compassionate medical support,
              the Plastic Surgery Department at Prathamaa Hospital
              delivers trusted, safe,
              and high-quality cosmetic and reconstructive healthcare services.
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