import Link from "next/link";

export default function CardiologyPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/cardiology.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Cardiology
          </h1>

          <p className="department-subtitle">
            Advanced heart care services with expert
            cardiologists, modern diagnostic facilities,
            emergency cardiac support, and comprehensive
            treatment for heart-related conditions.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Cardiology Department
            </h2>

            <p>
              The Cardiology Department at Prathamaa Hospital
              provides specialized healthcare services for
              the diagnosis, treatment, and prevention of
              heart and blood vessel diseases. Our experienced
              cardiologists use advanced medical technologies
              and modern diagnostic techniques to deliver
              accurate and effective cardiac care.
            </p>

            <p>
              We focus on early diagnosis, preventive
              cardiology, emergency heart care, and long-term
              management of cardiovascular conditions.
              Our department is committed to helping patients
              maintain healthy heart function and improve
              overall quality of life.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Chest Pain</div>
              <div>Heart Attack</div>
              <div>High Blood Pressure</div>
              <div>Irregular Heartbeat</div>
              <div>Coronary Artery Disease</div>
              <div>Heart Failure</div>
              <div>Heart Valve Disorders</div>
              <div>High Cholesterol</div>
              <div>Congenital Heart Diseases</div>
              <div>Cardiac Emergencies</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>ECG Testing</div>
              <div>2D Echo</div>
              <div>Treadmill Test (TMT)</div>
              <div>Cardiac Consultation</div>
              <div>Blood Pressure Monitoring</div>
              <div>Preventive Heart Checkups</div>
              <div>Emergency Cardiac Care</div>
              <div>Cardiac Risk Assessment</div>

            </div>

            <h2>
              Advanced Cardiac Care
            </h2>

            <p>
              Our department is equipped with advanced
              diagnostic facilities for accurate evaluation
              of heart conditions. We provide comprehensive
              cardiac assessments, continuous monitoring,
              and personalized treatment plans based on
              individual patient needs.
            </p>

            <p>
              We strongly focus on preventive cardiology
              by helping patients manage risk factors
              such as hypertension, diabetes, obesity,
              smoking, and unhealthy lifestyles. Early
              intervention and regular monitoring help
              reduce complications and improve heart health.
            </p>

            <h2>
              Emergency Heart Care
            </h2>

            <p>
              Prathamaa Hospital provides emergency cardiac
              support for patients experiencing chest pain,
              heart attacks, or sudden cardiac symptoms.
              Our medical team responds quickly with
              immediate evaluation, stabilization,
              and advanced treatment support.
            </p>

            <p>
              With experienced cardiologists, advanced
              monitoring systems, and patient-centered care,
              Prathamaa Hospital ensures reliable,
              compassionate, and high-quality cardiac
              healthcare services for every patient.
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