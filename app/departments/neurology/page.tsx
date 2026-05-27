import Link from "next/link";

export default function NeurologyPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/neurology.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Neurology
          </h1>

          <p className="department-subtitle">
            Advanced neurological care for brain,
            spine, nerve, and neurological disorders
            with expert diagnosis and modern treatment facilities.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Neurology Department
            </h2>

            <p>
              The Neurology Department at Prathamaa Hospital
              specializes in the diagnosis, treatment,
              and management of disorders affecting the
              brain, spinal cord, nerves, and muscles.
              Our department provides advanced neurological
              care using modern medical technologies,
              accurate diagnostic procedures, and
              evidence-based treatment methods.
            </p>

            <p>
              Our experienced neurologists are dedicated
              to treating a wide range of neurological
              conditions with personalized care plans.
              We focus on early diagnosis, preventive
              healthcare, rehabilitation support,
              and long-term neurological wellness
              for patients of all age groups.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Stroke & Paralysis</div>
              <div>Epilepsy & Seizures</div>
              <div>Migraine & Headaches</div>
              <div>Parkinson’s Disease</div>
              <div>Neuropathy</div>
              <div>Brain Infections</div>
              <div>Memory Disorders</div>
              <div>Spinal Cord Disorders</div>
              <div>Vertigo & Dizziness</div>
              <div>Nerve Compression Disorders</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Neurological Consultation</div>
              <div>Stroke Management</div>
              <div>Brain Function Evaluation</div>
              <div>Headache Treatment</div>
              <div>Seizure Management</div>
              <div>Nerve Disorder Treatment</div>
              <div>Rehabilitation Support</div>
              <div>Preventive Neurology Care</div>

            </div>

            <h2>
              Advanced Neurological Care
            </h2>

            <p>
              Our neurology department uses advanced
              diagnostic technologies and modern treatment
              approaches to identify neurological conditions
              accurately and provide effective treatment.
              We focus on reducing complications,
              improving brain and nerve function,
              and enhancing the quality of life
              for every patient.
            </p>

            <p>
              The department works closely with
              radiology specialists, physiotherapists,
              emergency care teams, and rehabilitation experts
              to ensure comprehensive neurological care.
              Our multidisciplinary approach helps patients
              recover faster and manage long-term
              neurological conditions effectively.
            </p>

            <h2>
              Personalized Patient Support
            </h2>

            <p>
              At Prathamaa Hospital, we understand
              that neurological disorders can affect
              both physical and emotional well-being.
              Our team provides compassionate care,
              patient education, rehabilitation guidance,
              and continuous medical support to help
              patients lead healthier and more independent lives.
            </p>

            <p>
              With experienced neurologists,
              advanced diagnostic support,
              modern treatment facilities,
              and patient-focused healthcare services,
              the Neurology Department at Prathamaa Hospital
              delivers trusted and high-quality neurological care.
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