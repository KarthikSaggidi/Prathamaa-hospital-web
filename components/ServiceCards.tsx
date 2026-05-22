import Link from "next/link";
import { serviceCards } from "./data";
import { Icon } from "./Icons";

export function ServiceCards() {
  return (
    <section className="section services-section">
      <div className="container">
        <div className="service-grid">
          {serviceCards.map((card) => (
            <Link
              href={card.link}
              className="service-card"
              key={card.title}
            >
              <span className="service-icon">
                <Icon name={card.icon} size={40} />
              </span>

              <div className="service-content">
                <h3>{card.title}</h3>

                <p>{card.text}</p>
              </div>

              <span className="service-arrow">
                <Icon name="arrowRight" size={18} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}