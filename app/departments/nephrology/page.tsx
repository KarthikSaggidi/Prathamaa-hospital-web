import Link from "next/link";

export default function NephrologyPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/nephrology.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Nephrology
          </h1>

          <p className="department-subtitle">
            Specialized kidney care services including
            diagnosis, treatment, dialysis support,
            and management of kidney-related disorders
            with advanced medical expertise.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Nephrology Department
            </h2>

            <p>
              The Nephrology Department at Prathamaa Hospital
              provides advanced medical care for patients
              suffering from kidney-related diseases and
              disorders. Our department focuses on early
              diagnosis, preventive care, medical treatment,
              and long-term management of kidney conditions
              using modern diagnostic and treatment facilities.
            </p>

            <p>
              Our experienced nephrologists work closely with
              patients to monitor kidney health, manage chronic
              kidney disease, control blood pressure, and prevent
              complications. We provide compassionate care
              with a patient-centered approach to improve
              overall health and quality of life.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Chronic Kidney Disease</div>
              <div>Kidney Stones</div>
              <div>Kidney Failure</div>
              <div>Urinary Tract Infections</div>
              <div>High Blood Pressure</div>
              <div>Diabetic Kidney Disease</div>
              <div>Protein Leakage in Urine</div>
              <div>Electrolyte Imbalance</div>
              <div>Swelling & Fluid Retention</div>
              <div>Acute Kidney Injury</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Kidney Function Testing</div>
              <div>Dialysis Support</div>
              <div>Blood Pressure Management</div>
              <div>Diabetes Kidney Care</div>
              <div>Urine Analysis</div>
              <div>Electrolyte Monitoring</div>
              <div>Diet & Lifestyle Counseling</div>
              <div>Preventive Kidney Checkups</div>

            </div>

            <h2>
              Advanced Kidney Care
            </h2>

            <p>
              Our nephrology department uses advanced
              diagnostic equipment and modern medical
              technologies to detect kidney diseases at
              an early stage. We focus on providing
              personalized treatment plans to slow disease
              progression and maintain kidney health.
            </p>

            <p>
              Patients receive comprehensive care through
              regular monitoring, medication management,
              nutritional guidance, and preventive healthcare.
              Our specialists are dedicated to helping patients
              maintain healthy kidney function and avoid
              long-term complications.
            </p>

            <h2>
              Comprehensive Patient Support
            </h2>

            <p>
              At Prathamaa Hospital, we believe that proper
              patient education and continuous care play an
              important role in kidney disease management.
              Our healthcare team guides patients regarding
              healthy diet plans, fluid intake, lifestyle
              modifications, and medication adherence.
            </p>

            <p>
              With skilled nephrologists, modern dialysis
              support, advanced laboratory facilities,
              and compassionate medical staff,
              the Nephrology Department at Prathamaa Hospital
              provides trusted and high-quality kidney care
              services focused on patient safety and wellness.
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