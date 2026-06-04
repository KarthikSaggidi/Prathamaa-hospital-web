"use client";

import Image from "next/image";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import logo from "@/assests/logo.jpg";

import mapImage from "@/assests/map-preview.jpg";

import { Icon } from "./Icons";

export function Footer() {

  const [
    showPrivacy,
    setShowPrivacy,
  ] = useState(false);

  const [
    showTerms,
    setShowTerms,
  ] = useState(false);

  useEffect(() => {

    if (
      showPrivacy ||
      showTerms
    ) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "auto";
    }

    return () => {

      document.body.style.overflow =
        "auto";
    };

  }, [
    showPrivacy,
    showTerms,
  ]);

  return (
    <>
      <footer
        className="site-footer"
        id="contact"
      >

        <div className="container footer-grid">

          <div className="footer-brand">

            <Image
              src={logo}
              alt="Prathamaa Hospital Logo"
              width={180}
              height={90}
            />

            <p>
              Prathamaa Hospital is
              committed to providing
              exceptional healthcare
              with compassion,
              innovation, and
              excellence.
            </p>

            <div className="socials">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                f
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ig
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                t
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                in
              </a>

            </div>
          </div>

          <div>

            <h3>
              Quick Links
            </h3>

            <a href="#home">
              Home
            </a>

            <a href="#about">
              About Us
            </a>

            <a href="#departments">
              Departments
            </a>

            <a href="#doctors">
              Our Doctors
            </a>

            <a href="#contact">
              Contact Us
            </a>

          </div>

          <div>

            <h3>
              Departments
            </h3>

            <Link href="/departments">
              Cardiology
            </Link>

            <Link href="/departments">
              Neurology
            </Link>

            <Link href="/departments">
              Orthopedics
            </Link>

            <Link href="/departments">
              Pediatrics
            </Link>

            <Link href="/departments">
              Gynecology
            </Link>

            <Link href="/departments">
              General Medicine
            </Link>

          </div>

          <div>

            <h3>
              Contact Us
            </h3>

            <a
              href="https://maps.google.com/?q=Prathamaa+Hospital+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
            >

              <Icon
                name="location"
                size={17}
              />

              Prathamaa Hospital,
              Hyderabad,
              Telangana

            </a>

            <a href="tel:+918009002444">

              <Icon
                name="phone"
                size={17}
              />

              +91 800 900 2444

            </a>

            <a href="tel:+918009006444">

              <Icon
                name="phone"
                size={17}
              />

              +91 800 900 6444

            </a>

            <a href="mailto:Prathamaahospital@gmail.com">

              <Icon
                name="mail"
                size={17}
              />

              Prathamaahospital@gmail.com

            </a>

            <a
              href="https://maps.google.com/?q=Prathamaa+Hospital+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-map-image"
            >

              <Image
                src={mapImage}
                alt="Prathamaa Hospital Map"
                width={260}
                height={160}
              />

            </a>

          </div>

          <div>

            <h3>
              Emergency
            </h3>

            <a href="tel:+918009002444">

              <Icon
                name="phone"
                size={17}
              />

              24/7 Emergency Helpline

            </a>

            <a href="tel:+918009002444">

              <Icon
                name="phone"
                size={17}
              />

              +91 800 900 2444

            </a>

            <a
              className="emergency-btn"
              href="tel:+918009006444"
            >
              Emergency Call
            </a>

            <button
              className="footer-popup-btn"
              onClick={() =>
                setShowPrivacy(true)
              }
            >
              Privacy Policy
            </button>

            <br />

            <button
              className="footer-popup-btn"
              onClick={() =>
                setShowTerms(true)
              }
            >
              Terms & Conditions
            </button>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            ©{" "}
            {new Date().getFullYear()}{" "}
            Prathamaa Hospital.
            All Rights Reserved.
          </p>

          <p>
            Designed & Developed
            with Care for Better
            Healthcare Services. [ by DropXcorp ]
          </p>

        </div>

      </footer>

      {showPrivacy && (

        <div className="footer-modal-overlay">

          <div className="footer-modal">

            <button
              className="footer-modal-close"
              onClick={() =>
                setShowPrivacy(false)
              }
            >
              ×
            </button>

            <h2>
              Privacy Policy
            </h2>

            <p>
              Prathamaa Hospital
              respects your privacy
              and is committed to
              protecting your
              personal information.
              All medical and
              patient details are
              securely stored and
              never shared with
              third parties without
              consent.
            </p>

            <p>
              By using our website,
              you agree to our
              privacy practices and
              secure handling of
              healthcare-related
              information.
            </p>

          </div>
        </div>
      )}

      {showTerms && (

        <div className="footer-modal-overlay">

          <div className="footer-modal">

            <button
              className="footer-modal-close"
              onClick={() =>
                setShowTerms(false)
              }
            >
              ×
            </button>

            <h2>
              Terms & Conditions
            </h2>

            <p>
              All appointments,
              consultations, and
              services provided by
              Prathamaa Hospital are
              subject to doctor
              availability and
              hospital policies.
            </p>

            <p>
              Users are requested to
              provide accurate
              information while
              booking appointments.
              Misuse of hospital
              services or website
              content is strictly
              prohibited.
            </p>

          </div>
        </div>
      )}
    </>
  );
}