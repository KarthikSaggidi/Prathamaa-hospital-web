"use client";

import Image from "next/image";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import logo from "@/assests/logo.jpg";

import { Icon } from "./Icons";

const navLinks = [
  {
    name: "Home",
    id: "home",
    href: "/#home",
  },

  {
    name: "About Us",
    id: "about",
    href: "/#about",
  },

  {
    name: "Departments",
    id: "departments",
    href: "/departments",
  },

  {
    name: "Our Doctors",
    id: "doctors",
    href: "/#doctors",
  },

  {
    name: "Contact Us",
    id: "contact",
    href: "/#contact",
  },
];

export function Header() {

  const pathname =
    usePathname();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [
    searchResults,
    setSearchResults,
  ] = useState<any[]>([]);

  const [
    loadingSearch,
    setLoadingSearch,
  ] = useState(false);

  useEffect(() => {

    if (pathname !== "/") {

      if (
        pathname ===
        "/departments"
      ) {
        setActiveSection(
          "departments"
        );
      }

      return;
    }

    const handleScroll = () => {

      const scrollPosition =
        window.scrollY + 200;

      let currentSection =
        "home";

      for (const link of navLinks) {

        if (
          !link.id ||
          link.href.startsWith(
            "/departments"
          )
        ) {
          continue;
        }

        const section =
          document.getElementById(
            link.id
          );

        if (!section)
          continue;

        const sectionTop =
          section.offsetTop -
          160;

        const sectionHeight =
          section.offsetHeight;

        if (
          scrollPosition >=
            sectionTop &&
          scrollPosition <
            sectionTop +
              sectionHeight
        ) {
          currentSection =
            link.id;

          break;
        }
      }

      setActiveSection(
        currentSection
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, [pathname]);

  const closeMenu = () =>
    setMenuOpen(false);

  const openSearch = () => {

    setMenuOpen(false);

    setSearchOpen(true);
  };

  const closeSearch = () =>
    setSearchOpen(false);

  const handleSearch =
    async (
      value: string
    ) => {

      setSearchQuery(value);

      if (
        !value.trim()
      ) {

        setSearchResults([]);

        return;
      }

      try {

        setLoadingSearch(
          true
        );

        const response =
          await fetch(
            `/api/search?query=${value}`
          );

        const data =
          await response.json();

        setSearchResults(
          data
        );

      } catch (error) {

        console.log(
          "Search Error:",
          error
        );

      } finally {

        setLoadingSearch(
          false
        );
      }
    };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {

    if (pathname !== "/") {
      return;
    }

    e.preventDefault();

    if (id === "home") {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setActiveSection("home");

      closeMenu();

      return;
    }

    const section =
      document.getElementById(id);

    if (section) {

      const navbarHeight = 110;

      const sectionPosition =
        section.getBoundingClientRect()
          .top +
        window.pageYOffset;

      window.scrollTo({
        top:
          sectionPosition -
          navbarHeight,

        behavior: "smooth",
      });

      setActiveSection(id);

      closeMenu();
    }
  };

  return (
    <header className="site-header">

      <div className="container header-inner">

        <Link
          className="brand"
          href="/"
          onClick={(e) => {

            closeMenu();

            if (pathname === "/") {

              e.preventDefault();

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });

              setActiveSection(
                "home"
              );
            }
          }}
        >
          <Image
            src={logo}
            alt="Prathamaa Hospital"
            priority
          />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(true)
          }
        >
          <span />
          <span />
          <span />
        </button>

        <button
          className="mobile-search-toggle"
          type="button"
          aria-label="Open search"
          onClick={openSearch}
        >
          <Icon
            name="search"
            size={22}
          />
        </button>

        <nav
          className="nav-links"
          aria-label="Primary navigation"
        >

          {navLinks.map((link) => {

            const isActive =
              activeSection ===
                link.id ||
              (pathname ===
                "/departments" &&
                link.id ===
                  "departments");

            if (
              pathname === "/"
            ) {

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) =>
                    scrollToSection(
                      e,
                      link.id
                    )
                  }
                  className={
                    isActive
                      ? "active"
                      : ""
                  }
                >
                  {link.name}
                </a>
              );
            }

            return (
              <Link
                key={link.id}
                href={link.href}
                className={
                  isActive
                    ? "active"
                    : ""
                }
              >
                {link.name}
              </Link>
            );
          })}

        </nav>

        <div className="header-actions">

          <Link
            className="btn btn-primary"
            href="/appointment"
          >
            <Icon
              name="calendar"
              size={18}
            />

            Book Appointment
          </Link>

          <a
            className="btn btn-outline"
            href="tel:+918009002444"
          >
            <Icon
              name="phone"
              size={18}
            />

            +91 800 900 2444
          </a>

        </div>
      </div>

      <div
        className={`search-modal ${
          searchOpen ? "open" : ""
        }`}
        aria-hidden={!searchOpen}
      >

        <button
          className="search-modal-backdrop"
          type="button"
          aria-label="Close search"
          onClick={closeSearch}
        />

        <div
          className="search-modal-card"
        >

          <div className="search-modal-head">

            <h2>Search</h2>

            <button
              className="menu-close"
              type="button"
              aria-label="Close search"
              onClick={closeSearch}
            >
              ×
            </button>

          </div>

          <label className="search-modal-field">

            <Icon
              name="search"
              size={22}
            />

            <input
              aria-label="Search doctors, departments or symptoms"
              autoComplete="off"
              placeholder="Search Diseases, Symptoms or Departments..."
              value={
                searchQuery
              }
              onChange={(e) =>
                handleSearch(
                  e.target.value
                )
              }
            />

          </label>

          {searchQuery && (

            <div className="search-results">

              {loadingSearch ? (

                <div className="search-loading">
                  Searching medical information...
                </div>

              ) : searchResults.length >
                0 ? (

                searchResults.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="search-result-item"
                    >

                      <div className="search-result-top">

                        <strong>
                          {
                            item.title
                          }
                        </strong>

                        <span>
                          {
                            item.category
                          }
                        </span>

                      </div>

                      <h4>
                        Department:{" "}
                        {
                          item.department
                        }
                      </h4>

                      <p>
                        <strong>
                          Symptoms:
                        </strong>{" "}
                        {item.symptoms?.join(
                          ", "
                        )}
                      </p>

                      <p>
                        <strong>
                          Causes:
                        </strong>{" "}
                        {
                          item.causes
                        }
                      </p>

                      <p>
                        <strong>
                          Treatment:
                        </strong>{" "}
                        {
                          item.treatment
                        }
                      </p>

                    </div>
                  )
                )

              ) : (

                <div className="search-no-results">
                  No medical information found
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </header>
  );
}

