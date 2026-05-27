import Link from "next/link";

export default function GeneralMedicinePage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/general-medicine.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            General Medicine
          </h1>

          <p className="department-subtitle">
            Comprehensive healthcare services focused on
            prevention, diagnosis, treatment, and management
            of acute and chronic medical conditions.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About General Medicine Department
            </h2>

            <p>
              The General Medicine Department at Prathamaa Hospital
              provides complete medical care for patients of all age groups.
              Our experienced physicians focus on accurate diagnosis,
              preventive healthcare, and effective treatment of a wide range
              of medical conditions. The department serves as the first point
              of contact for patients seeking medical attention and ensures
              personalized healthcare solutions for every patient.
            </p>

            <p>
              We combine modern medical technology with compassionate care
              to deliver high-quality treatment for both common illnesses
              and complex medical conditions. Our physicians emphasize
              preventive healthcare, lifestyle management, and early diagnosis
              to improve long-term health outcomes.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Fever & Viral Infections</div>
              <div>Diabetes Management</div>
              <div>Hypertension</div>
              <div>Respiratory Disorders</div>
              <div>Thyroid Disorders</div>
              <div>Digestive Problems</div>
              <div>Allergies & Infections</div>
              <div>Chronic Fatigue</div>
              <div>Kidney-Related Disorders</div>
              <div>Lifestyle Diseases</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>General Physician Consultations</div>
              <div>Preventive Health Checkups</div>
              <div>Chronic Disease Management</div>
              <div>Diabetes Care</div>
              <div>Blood Pressure Monitoring</div>
              <div>Health Screening Programs</div>
              <div>Infection Treatment</div>
              <div>Nutrition & Lifestyle Counseling</div>

            </div>

            <h2>
              Advanced Medical Care
            </h2>

            <p>
              Our General Medicine Department uses advanced diagnostic
              tools and evidence-based treatment methods to ensure
              accurate diagnosis and effective care. We focus on
              identifying health issues early and creating customized
              treatment plans that meet the unique needs of every patient.
            </p>

            <p>
              Our physicians work closely with other specialized departments
              whenever required to provide integrated healthcare solutions.
              This collaborative approach ensures comprehensive patient care,
              faster recovery, and improved health outcomes.
            </p>

            <h2>
              Preventive Healthcare & Wellness
            </h2>

            <p>
              Preventive healthcare is one of the core strengths of our
              General Medicine Department. We encourage regular health
              checkups, lifestyle modifications, balanced nutrition,
              stress management, and early screening for chronic illnesses.
            </p>

            <p>
              With experienced doctors, skilled healthcare professionals,
              modern facilities, and patient-centered care,
              Prathamaa Hospital is committed to delivering trusted
              medical services with safety, compassion, and excellence.
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