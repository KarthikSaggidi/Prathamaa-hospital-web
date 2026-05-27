"use client";

import Image from "next/image";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { doctors } from "./data";

import { Icon } from "./Icons";

export function Doctors() {

  const [
    selectedDoctor,
    setSelectedDoctor,
  ] = useState<any>(null);

  const scrollRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (selectedDoctor) {

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

  }, [selectedDoctor]);

  const scrollLeft = () => {

    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {

    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="section doctors-section"
      id="doctors"
    >

      <div className="container">

        <h2 className="section-title">
          Our Doctors
        </h2>

        <div className="doctor-carousel">

          <button
            className="round-nav left"
            aria-label="Previous doctor"
            onClick={scrollLeft}
          >
            <Icon
              name="chevronLeft"
              size={28}
            />
          </button>

          <div
            className="doctor-grid"
            ref={scrollRef}
          >

            {doctors.map(
              (doctor) => (

                <article
                  className="doctor-card"
                  key={doctor.name}
                  onClick={() =>
                    setSelectedDoctor(
                      doctor
                    )
                  }
                >

                  {doctor.image && (
  <Image
    src={doctor.image}
    alt={doctor.name}
    width={180}
    height={240}
    style={{
      width: "180px",
      height: "240px",
      objectFit: "cover",
    }}
  />
)}

                  <div className="doctor-info">

                    <h3>
                      {doctor.name}
                    </h3>

                    <p>
                      {
                        doctor.specialty
                      }
                    </p>

                    <strong>
                      {
                        doctor.experience
                      }
                    </strong>

                    <div className="rating">

                      <Icon
                        name="star"
                        size={15}
                        strokeWidth={
                          1.5
                        }
                      />

                      <span>
                        {
                          doctor.rating
                        }
                      </span>

                      <small>
                        (
                        {
                          doctor.reviews
                        }
                        )
                      </small>

                    </div>

                    <button className="btn btn-primary">
                      View Details
                    </button>

                  </div>

                </article>
              )
            )}

          </div>

          <button
            className="round-nav right"
            aria-label="Next doctor"
            onClick={scrollRight}
          >
            <Icon
              name="chevronRight"
              size={28}
            />
          </button>

        </div>

      </div>

      {selectedDoctor && (

        <div className="doctor-popup-overlay">

          <div className="doctor-popup">

            <button
              className="doctor-popup-close"
              onClick={() =>
                setSelectedDoctor(
                  null
                )
              }
            >
              ×
            </button>

            <div className="doctor-popup-top">

              {selectedDoctor.image && (
  <Image
    src={
      selectedDoctor.image
    }
    alt={
      selectedDoctor.name
    }
    width={170}
    height={220}
    className="doctor-popup-image"
    style={{
      width: "170px",
      height: "220px",
      objectFit: "cover",
    }}
  />
)}

              <div className="doctor-popup-header">

                <h2>
                  {
                    selectedDoctor.name
                  }
                </h2>

                <h4>
                  {
                    selectedDoctor.specialty
                  }
                </h4>

                <div className="doctor-popup-rating">

                  <Icon
                    name="star"
                    size={16}
                  />

                  <span>
                    {
                      selectedDoctor.rating
                    }
                  </span>

                  <small>
                    (
                    {
                      selectedDoctor.reviews
                    }
                    )
                  </small>

                </div>

                <p className="doctor-popup-exp">

                  <strong>
                    Experience:
                  </strong>{" "}

                  {
                    selectedDoctor.experience
                  }

                </p>

              </div>

            </div>

            <div className="doctor-popup-details">

              <p>
                <strong>
                  Qualification:
                </strong>{" "}
                MBBS, MD,
                Specialist
              </p>

              <p>
                <strong>
                  Languages:
                </strong>{" "}
                English, Telugu,
                Hindi
              </p>

              <p>
                <strong>
                  Availability:
                </strong>{" "}
                Monday - Saturday
              </p>

              <p>
                Dr.{" "}
                {
                  selectedDoctor.name
                }{" "}
                is a highly
                experienced
                specialist at
                Prathamaa Hospital,
                dedicated to
                providing advanced
                healthcare with
                compassion and
                excellence.
              </p>

            </div>

            <button
              className="btn btn-primary"
              onClick={() =>
                setSelectedDoctor(
                  null
                )
              }
            >
              Close
            </button>

          </div>

        </div>
      )}
    </section>
  );
}