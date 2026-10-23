"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import hospitalImage from "@/assests/derived/hospital.png";
import { quickStats } from "./data";
import { Icon } from "./Icons";

const checklist = [
  "Advanced Medical Technology",
  "Experienced & Caring Doctors",
  "Patient-Centered Care",
  "24/7 Emergency Services",
];

export function About() {
  const [showPopup, setShowPopup] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showPopup || showGallery ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showPopup, showGallery]);

  return (
    <>
      <section className="section about-section" id="about">
        <div className="container about-grid">
          <article className="about-card clickable-about-card" onClick={() => setShowPopup(true)}>
            <h2>About Prathama Hospital</h2>
            <p>We are dedicated to providing comprehensive healthcare services with a patient-first approach. Our state-of-the-art infrastructure and experienced medical professionals ensure the best possible care for you and your family.</p>
            <ul>
              {checklist.map((item) => <li key={item}><span>+</span>{item}</li>)}
            </ul>
          </article>
          <div className="hospital-photo clickable-hospital-photo" onClick={() => setShowGallery(true)}>
            <Image src={hospitalImage} alt="Prathama Hospital building" />
            <div className="hospital-photo-overlay">View Hospital Gallery</div>
          </div>
          <article className="why-card">
            <h2>Why Choose Us?</h2>
            <div className="why-stats">
              {quickStats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
            </div>
            <div className="testimonial">
              <p>&quot;Excellent care and support from the entire staff. The doctors are very experienced and take time to understand the problem. Highly recommended!&quot;</p>
              <strong>- Ramesh Kumar</strong>
              <div className="stars">
                {Array.from({ length: 5 }).map((_, index) => <Icon key={index} name="star" size={18} strokeWidth={1.4} />)}
              </div>
            </div>
            <div className="dots" aria-hidden="true"><span /><span /><span /></div>
          </article>
        </div>
      </section>
      {showPopup && (
        <div className="about-popup-overlay">
          <div className="about-popup">
            <button className="about-popup-close" onClick={() => setShowPopup(false)}>×</button>
            <div className="about-popup-top">
              <Image src={hospitalImage} alt="Prathama Hospital" width={260} height={190} className="about-popup-image" />
              <div>
                <h2>Prathama Hospital</h2>
                <h4>Compassion • Care • Excellence</h4>
                <p>Delivering advanced healthcare services with world-class medical infrastructure and highly experienced healthcare professionals.</p>
              </div>
            </div>
            <div className="about-popup-content">
              <p>Prathama Hospital is a leading multispeciality healthcare institution dedicated to providing quality medical care with compassion, innovation, and excellence.</p>
              <p>Our hospital is equipped with advanced operation theatres, modern ICU facilities, diagnostic laboratories, emergency care units, and state-of-the-art medical equipment.</p>
              <p>We specialize in Cardiology, Neurology, Orthopedics, Pediatrics, Gynecology, General Medicine, Dermatology, Radiology, and several other departments.</p>
              <p>Our mission is to provide accessible, affordable, and high-quality healthcare services while ensuring patient safety, comfort, and satisfaction.</p>
              <p>With experienced doctors, trained nursing staff, and compassionate care, Prathama Hospital continues to serve thousands of families with trust and dedication.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
      {showGallery && (
        <div className="gallery-popup-overlay">
          <div className="gallery-popup">
            <button className="gallery-popup-close" onClick={() => setShowGallery(false)}>×</button>
            <h2>Prathama Hospital Gallery</h2>
            <div className="hospital-gallery-grid">
              {Array.from({ length: 6 }).map((_, index) => <Image key={index} src={hospitalImage} alt="Hospital" width={300} height={220} />)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
