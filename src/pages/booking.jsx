import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/templatemo-style.css";

const Booking = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;

  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("loaded");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Safe fallback if doctor data is missing
  const doctorData = doctor || {
    name: "Dr. A. Sharma",
    dept_name: "Cardiology",
    price: "₹600",
    chamber: "City Care Hospital",
    time_from: "10:00 AM",
    time_to: "2:00 PM",
    capacity: "20 Patients",
    image: "/img/img-01-big.jpg",
  };

  return (
    <div>
      {/* Loader */}
      <div id="loader-wrapper">
        <div id="loader"></div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <i className="fas fa-user-md mr-2"></i> Assrud-Appointment
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link nav-link-1 active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-2" href="/videos">
                  Videos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-3" href="/about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-4" href="/contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div
        className="tm-hero d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url('/img/hero.jpg')",
          backgroundSize: "cover",
        }}
      >
        <form className="d-flex tm-search-form">
          <input
            className="form-control tm-search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success tm-search-btn" type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="container-fluid tm-container-content tm-mt-60">
        <div className="row mb-4">
          <h2 className="col-12 tm-text-primary">
            {`Book Appointment with ${doctorData.name}`}
          </h2>
        </div>

        {/* Full-page responsive layout (60% image / 40% booking) */}
        <div className="row tm-mb-90 align-items-stretch full-page-section">
          {/* Left Side: Doctor Image */}
          <div className="col-lg-7 col-md-12 mb-4">
            <div className="doctor-image-wrapper h-100">
              <img
                src={doctorData.image || "/img/img-01-big.jpg"}
                alt={doctorData.name}
                className="img-fluid doctor-image"
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>

          {/* Right Side: Booking Info */}
          <div className="col-lg-5 col-md-12">
            <div className="tm-bg-gray tm-video-details h-100 d-flex flex-column justify-content-between">
              <div>
                <p className="mb-4">
                  Please book your appointment with{" "}
                  <strong className="tm-text-primary">{doctorData.name}</strong> from the{" "}
                  <strong className="tm-text-primary">{doctorData.dept_name}</strong> department.
                </p>

                <div className="text-center mb-5">
                  {/* ✅ Correct Link */}
                  <Link
                    to="/bookapoin"
                    state={{ doctor: doctorData }}
                    className="btn btn-primary px-4"
                  >
                    Book Appointment
                  </Link>
                </div>

                <div className="mb-4 d-flex flex-column">
                  <div className="me-4 mb-2">
                    <span className="tm-text-gray-dark">Doctor Name: </span>
                    <span className="tm-text-primary">{doctorData.name}</span>
                  </div>
                  <div className="me-4 mb-2">
                    <span className="tm-text-gray-dark">Department: </span>
                    <span className="tm-text-primary">{doctorData.dept_name}</span>
                  </div>
                  <div className="me-4 mb-2">
                    <span className="tm-text-gray-dark">Chamber: </span>
                    <span className="tm-text-primary">{doctorData.chamber}</span>
                  </div>
                  <div className="me-4 mb-2">
                    <span className="tm-text-gray-dark">Fees: </span>
                    <span className="tm-text-primary">{doctorData.price}</span>
                  </div>
                  <div className="me-4 mb-2">
                    <span className="tm-text-gray-dark">Capacity: </span>
                    <span className="tm-text-primary">{doctorData.capacity}</span>
                  </div>
                  <div className="me-4 mb-2">
                    <span className="tm-text-gray-dark">Time: </span>
                    <span className="tm-text-primary">
                      {doctorData.time_from} - {doctorData.time_to}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="tm-bg-gray pt-5 pb-3 tm-text-gray tm-footer">
        <div className="container-fluid tm-container-small">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12 px-5 mb-5">
              <h3 className="tm-text-primary mb-4 tm-footer-title">
                About Assrud Appointment
              </h3>
              <p>
                We help you connect with experienced doctors easily. Book appointments quickly
                and manage your health efficiently with Assrud Appointment.
              </p>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
              <h3 className="tm-text-primary mb-4 tm-footer-title">Quick Links</h3>
              <ul className="tm-footer-links list-unstyled">
                <li><a href="#">Advertise</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Our Company</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
              <ul className="tm-social-links d-flex justify-content-end list-unstyled mb-5">
                <li className="mb-2"><a href="https://facebook.com"><i className="fab fa-facebook"></i></a></li>
                <li className="mb-2"><a href="https://twitter.com"><i className="fab fa-twitter"></i></a></li>
                <li className="mb-2"><a href="https://instagram.com"><i className="fab fa-instagram"></i></a></li>
                <li className="mb-2"><a href="https://pinterest.com"><i className="fab fa-pinterest"></i></a></li>
              </ul>
              <a href="#" className="tm-text-gray text-end d-block mb-2">Terms of Use</a>
              <a href="#" className="tm-text-gray text-end d-block">Privacy Policy</a>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 col-md-7 col-12 px-5 mb-3">
              © 2025 Assrud Appointment. All rights reserved.
            </div>
            <div className="col-lg-4 col-md-5 col-12 px-5 text-end">
              Designed by{" "}
              <a href="https://templatemo.com" className="tm-text-gray" rel="noreferrer" target="_blank">
                TemplateMo
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive CSS */}
      <style>{`
        .full-page-section {
          min-height: 100vh;
          display: flex;
          align-items: stretch;
        }

        @media (min-width: 992px) {
          .doctor-image-wrapper {
            height: 100%;
          }
        }

        @media (max-width: 991px) {
          .doctor-image-wrapper {
            height: 50vh;
            margin-bottom: 20px;
          }
          .full-page-section {
            flex-direction: column;
            min-height: auto;
          }
        }

        @media (max-width: 768px) {
          .tm-video-details {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Booking;
