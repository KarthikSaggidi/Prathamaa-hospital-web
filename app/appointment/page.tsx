import Image from "next/image";
import logo from "@/assests/logo.png";

export default function AppointmentPage() {
  return (
    <main className="section">
      <div className="container">
        <div className="appointment-form-container">
          <div className="appointment-top">
            <div className="page-logo">
              <Image
                src={logo}
                alt="Prathamaa Hospital"
                priority
              />
            </div>

            <h1>Book an Appointment</h1>

            <p>
              Fill out the form below to schedule your consultation with our
              expert healthcare specialists.
            </p>
          </div>

          <form className="hospital-form">
            <div className="hospital-form-grid">
              <label>
                Full Name
                <input
                  type="text"
                  placeholder="Enter your full name"
                />
              </label>

              <label>
                Mobile Number
                <input
                  type="text"
                  placeholder="Enter phone number"
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  placeholder="Enter email"
                />
              </label>

              <label>
                Gender
                <select>
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Department
                <select>
                  <option>Select Department</option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                  <option>Pediatrics</option>
                </select>
              </label>

              <label>
                Preferred Doctor
                <select>
                  <option>Select Doctor</option>
                  <option>Dr. Rajesh Kumar</option>
                  <option>Dr. Priya Sharma</option>
                  <option>Dr. Amit Verma</option>
                </select>
              </label>

              <label>
                Appointment Date
                <input type="date" />
              </label>

              <label>
                Appointment Time
                <input type="time" />
              </label>
            </div>

            <label className="full-width-field">
              Symptoms / Health Problems
              <textarea
                rows={6}
                placeholder="Describe your symptoms"
              />
            </label>

            <button type="submit" className="hospital-submit-btn">
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}