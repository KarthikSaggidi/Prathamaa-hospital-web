import Link from "next/link";

export default function ENTPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/ent.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            ENT
          </h1>

          <p className="department-subtitle">
            Specialized care for ear, nose, throat,
            head, and neck conditions with advanced
            diagnostic facilities and expert ENT specialists.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About ENT Department
            </h2>

            <p>
              The ENT Department at Prathamaa Hospital
              provides comprehensive healthcare services
              for disorders related to the ear, nose,
              throat, head, and neck. Our experienced
              ENT specialists use advanced diagnostic
              techniques and modern treatment methods
              to provide accurate and effective care.
            </p>

            <p>
              We focus on early diagnosis, preventive care,
              and advanced treatment solutions for patients
              suffering from hearing problems, sinus issues,
              throat infections, allergies, and other ENT conditions.
              Our department is committed to improving patient
              comfort, breathing, hearing, and overall quality of life.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Ear Infections</div>
              <div>Hearing Problems</div>
              <div>Sinusitis</div>
              <div>Tonsillitis</div>
              <div>Throat Infections</div>
              <div>Nasal Allergies</div>
              <div>Vertigo & Dizziness</div>
              <div>Nasal Blockage</div>
              <div>Voice Disorders</div>
              <div>Snoring Problems</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>ENT Consultations</div>
              <div>Hearing Assessments</div>
              <div>Sinus Treatment</div>
              <div>Allergy Management</div>
              <div>Endoscopic Procedures</div>
              <div>Throat Examinations</div>
              <div>Ear Cleaning Procedures</div>
              <div>ENT Surgical Care</div>

            </div>

            <h2>
              Advanced ENT Care
            </h2>

            <p>
              Our ENT department uses advanced medical
              equipment and diagnostic technologies for
              accurate evaluation and treatment of ENT disorders.
              We provide personalized treatment plans
              based on the patient’s symptoms, medical history,
              and overall health condition.
            </p>

            <p>
              We focus on providing minimally invasive
              procedures whenever possible to ensure
              faster recovery, reduced discomfort,
              and better treatment outcomes for patients.
            </p>

            <h2>
              Modern Diagnostic Facilities
            </h2>

            <p>
              Prathamaa Hospital is equipped with modern
              ENT diagnostic facilities including hearing
              assessment tools, endoscopic equipment,
              and advanced examination systems to support
              effective diagnosis and treatment planning.
            </p>

            <p>
              With experienced ENT specialists,
              skilled healthcare professionals,
              and patient-centered care,
              Prathamaa Hospital ensures safe,
              reliable, and high-quality ENT services
              for patients of all age groups.
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