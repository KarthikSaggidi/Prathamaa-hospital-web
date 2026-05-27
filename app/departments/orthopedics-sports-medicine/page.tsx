import Link from "next/link";

export default function OrthopedicsSportsMedicinePage() {
  return (
    <main className="department-detail-page">

      <section
        className="department-hero"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/departments/orthopedics-sports-medicine.jpg') center/cover",
        }}
      >

        <div className="container">

          <h1>
            Orthopedics & Sports Medicine
          </h1>

          <p className="department-subtitle">
            Advanced orthopedic and sports injury care with
            expert specialists, modern diagnostics,
            rehabilitation support, and comprehensive
            musculoskeletal treatments.
          </p>

        </div>

      </section>

      <section className="department-content">

        <div className="container">

          <div className="department-card">

            <h2>
              About Orthopedics & Sports Medicine Department
            </h2>

            <p>
              The Orthopedics & Sports Medicine Department at
              Prathamaa Hospital specializes in diagnosing,
              treating, and managing bone, joint, muscle,
              ligament, and spine conditions. Our orthopedic
              specialists provide comprehensive care for both
              routine orthopedic issues and complex sports injuries.
            </p>

            <p>
              We focus on restoring mobility, reducing pain,
              improving physical performance, and helping
              patients recover quickly through personalized
              treatment plans, physiotherapy support, and
              advanced surgical procedures.
            </p>

            <h2>
              Conditions We Treat
            </h2>

            <div className="department-list">

              <div>Fractures & Bone Injuries</div>
              <div>Sports Injuries</div>
              <div>Joint Pain & Arthritis</div>
              <div>Back & Spine Disorders</div>
              <div>Ligament Tears</div>
              <div>Knee Injuries</div>
              <div>Shoulder Dislocation</div>
              <div>Muscle Injuries</div>
              <div>Osteoporosis</div>
              <div>Orthopedic Trauma</div>

            </div>

            <h2>
              Services Available
            </h2>

            <div className="department-list">

              <div>Joint Replacement Surgery</div>
              <div>Sports Injury Rehabilitation</div>
              <div>Arthroscopy Procedures</div>
              <div>Spine Care</div>
              <div>Physiotherapy Support</div>
              <div>Fracture Management</div>
              <div>Pain Management</div>
              <div>Advanced Orthopedic Surgery</div>

            </div>

            <h2>
              Advanced Orthopedic Care
            </h2>

            <p>
              Our department combines modern orthopedic
              technology with evidence-based treatments to
              provide faster recovery and improved mobility
              for patients of all ages.
            </p>

            <p>
              With experienced orthopedic surgeons,
              rehabilitation specialists, advanced imaging,
              and compassionate care, Prathamaa Hospital
              ensures high-quality orthopedic and sports
              medicine services for every patient.
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