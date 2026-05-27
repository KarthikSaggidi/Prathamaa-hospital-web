import Link from "next/link";

export default function RadiologyPage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/departments/radiology.jpg') center/cover no-repeat",
        }}
      >

        <div className="container">

          <h1>
            Radiology
          </h1>

          <p className="department-subtitle">
            Advanced diagnostic imaging services with
            modern radiology technology for accurate
            diagnosis, early detection, and effective treatment planning.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Radiology Department
            </h2>

            <p>
              The Radiology Department at Prathamaa Hospital
              provides advanced imaging and diagnostic services
              using modern medical technologies and precision equipment.
              Our department plays a vital role in the early detection,
              diagnosis, monitoring, and treatment planning
              of various medical conditions.
            </p>

            <p>
              Our experienced radiologists and imaging specialists
              work closely with physicians and surgeons
              to provide accurate diagnostic reports
              that help in delivering effective patient care.
              We focus on providing safe,
              fast, and reliable imaging services
              in a comfortable and patient-friendly environment.
            </p>

            <h2>
              Conditions We Diagnose
            </h2>

            <div className="department-list">

              <div>Bone Fractures & Injuries</div>
              <div>Chest & Lung Disorders</div>
              <div>Brain & Neurological Conditions</div>
              <div>Abdominal Disorders</div>
              <div>Kidney & Urinary Problems</div>
              <div>Joint & Spine Conditions</div>
              <div>Pregnancy Monitoring</div>
              <div>Heart & Vascular Diseases</div>
              <div>Soft Tissue Injuries</div>
              <div>Tumors & Cysts</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Digital X-Ray</div>
              <div>Ultrasound Scanning</div>
              <div>Doppler Studies</div>
              <div>CT Scan Imaging</div>
              <div>MRI Scanning</div>
              <div>Pregnancy Scans</div>
              <div>Emergency Imaging Services</div>
              <div>Diagnostic Reporting</div>

            </div>

            <h2>
              Advanced Diagnostic Imaging
            </h2>

            <p>
              Our radiology department is equipped with
              advanced imaging technologies
              that provide high-quality diagnostic images
              with improved accuracy and faster results.
              We focus on reducing radiation exposure
              while maintaining excellent image clarity
              for precise diagnosis and treatment planning.
            </p>

            <p>
              The department supports multiple specialties
              including orthopedics, cardiology, neurology,
              gynecology, pediatrics, and emergency medicine.
              Our imaging services help doctors identify medical conditions early,
              monitor disease progression,
              and guide surgical or medical treatments effectively.
            </p>

            <h2>
              Patient Safety & Quality Care
            </h2>

            <p>
              At Prathamaa Hospital,
              patient safety and comfort are our top priorities.
              Our trained radiology professionals ensure
              smooth imaging procedures,
              proper patient guidance,
              and timely reporting for quicker medical decisions.
            </p>

            <p>
              With experienced radiologists,
              advanced scanning equipment,
              modern imaging facilities,
              and compassionate patient support,
              the Radiology Department at Prathamaa Hospital
              delivers trusted and high-quality diagnostic healthcare services.
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