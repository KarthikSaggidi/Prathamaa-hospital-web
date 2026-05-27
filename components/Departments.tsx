import Link from "next/link";

import { departments } from "./data";

import { Icon } from "./Icons";

export function Departments() {

  return (

    <section
      className="section compact-section"
      id="departments"
    >

      <div className="container">

        <div className="section-heading">

         

          <h2 className="section-title">
            Our Departments
          </h2>

          

        </div>

        <div className="department-grid">

          {departments.map(
            (department) => {

              return (

                <Link
                  key={department.name}
                  href={
                    department.slug ===
                    "departments"
                      ? "/departments"
                      : `/departments/${department.slug}`
                  }
                  className="department-item"
                >

                  <div className="department-icon-wrapper">

                    <span className="department-icon-circle">

                      <Icon
                        name={
                          department.icon
                        }
                        size={42}
                      />

                    </span>

                  </div>

                  <strong>
                    {department.name}
                  </strong>

                  <div className="department-hover-text">

                    Learn More →

                  </div>

                </Link>
              );
            }
          )}

        </div>

      </div>

    </section>
  );
}