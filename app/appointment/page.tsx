"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/assests/logo.png";

export default function AppointmentPage() {

  const [showSuccess, setShowSuccess] = useState(false);

const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    gender: "",
    department: "",
    doctor: "",
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "/api/appointments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.mobile,
          email: formData.email,
          gender: formData.gender,
          department: formData.department,
          doctorName: formData.doctor,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          reason: formData.symptoms,
        }),
      }
    );

    const text = await response.text();

    console.log("API Response:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(
        "Invalid JSON received from API"
      );
    }

    if (!response.ok || !data.ok) {
      throw new Error(
        data.message || "Booking failed"
      );
    }

    setShowSuccess(true);

    setFormData({
      fullName: "",
      mobile: "",
      email: "",
      gender: "",
      department: "",
      doctor: "",
      appointmentDate: "",
      appointmentTime: "",
      symptoms: "",
    });

  } catch (error: any) {
    console.error(
      "Appointment Error:",
      error
    );

    alert(
      error.message ||
      "Unable to submit appointment."
    );
  }
};

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

          <form
            className="hospital-form"
            onSubmit={handleSubmit}
          >

            <div className="hospital-form-grid">

              <label>
                Full Name
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label>
                Mobile Number
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </label>

              <label>
                Gender
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>
              </label>

              <label>
                Department
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Department
                  </option>

                  <option value="Cardiology">
                    Cardiology
                  </option>

                  <option value="Neurology">
                    Neurology
                  </option>

                  <option value="Orthopedics">
                    Orthopedics
                  </option>

                  <option value="Pediatrics">
                    Pediatrics
                  </option>

                </select>
              </label>

              <label>

                Preferred Doctor

                <select
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Doctor
                  </option>

                  <option value="Dr. Shivani Manne">
                    Dr. Shivani Manne
                  </option>

                  <option value="Dr. L Kiran Kumar">
                    Dr. L Kiran Kumar
                  </option>

                  <option value="Dr. Nirban Mitra">
                    Dr. Nirban Mitra
                  </option>

                  <option value="Dr. Gopi Kishore">
                    Dr. Gopi Kishore
                  </option>

                  <option value="Dr. B Susruth Kumar">
                    Dr. B Susruth Kumar
                  </option>

                  <option value="Dr. Shankar Reddy">
                    Dr. Shankar Reddy
                  </option>

                </select>

              </label>

              <label>
                Appointment Date
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Appointment Time
                <input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  required
                />
              </label>

            </div>

            <label className="full-width-field">

              Symptoms / Health Problems

              <textarea
                rows={6}
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Describe your symptoms"
                required
              />

            </label>

            <button
              type="submit"
              className="hospital-submit-btn"
            >
              Confirm Appointment
            </button>

          </form>

        </div>
        
      </div>

      {showSuccess && (

        <div className="success-popup-overlay">

          <div className="success-popup">

            <div className="success-check">

              ✓

            </div>

            <h2>

              Appointment Submitted Successfully

            </h2>

            <p>

              Thank you for choosing Prathamaa Hospital.

              Our team will contact you shortly regarding

              your appointment.

            </p>

            <button

              className="success-popup-btn"

              onClick={() =>

                setShowSuccess(false)

              }

            >

              OK

            </button>

          </div>

        </div>

      )}
      
    </main>
  );
}