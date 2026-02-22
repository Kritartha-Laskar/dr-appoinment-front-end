import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/templatemo-style.css"; // make sure path is correct
import $ from "jquery";
import axios from "axios";
import { Link } from "react-router-dom";


const App = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    // Loader effect
    $(window).on("load", function () {
      document.body.classList.add("loaded");
    });

    // Fetch gallery/doctor data from Laravel API
    axios
      .get("http://127.0.0.1:8000/api/drmanage/")
      .then((response) => {
        console.log("API Response:", response.data);
        setGalleryItems(response.data.data || []);
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Cleanup
    return () => {
      $(window).off("load");
    };
  }, []);

  return (
    <>
      {/* Loader */}
      <div id="loader-wrapper">
        <div id="loader"></div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            <i className="fas fa-film mr-2"></i> Assrud-Appointment
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
                <a className="nav-link nav-link-1 active" href="drdetail">
                  Doctors
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-2" href="#">
                  Videos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-3" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-4" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="tm-hero d-flex justify-content-center align-items-center"
        style={{ backgroundImage: "url('/img/hero.jpg')" }}
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

      {/* Gallery Section */}
      <div className="container-fluid tm-container-content tm-mt-60">
        <div className="row mb-4">
          <h2 className="col-6 tm-text-primary">Doctors</h2>
        </div>

        <div
          className="row tm-mb-90 tm-gallery"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {galleryItems.length > 0 ? (
            galleryItems.map((item, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 32%", // three per row
                  position: "relative", // for absolute link
                  marginBottom: "25px",
                }}
              >
                {/* ✅ Make the whole card clickable */}
                <Link
                  to="/booking"
                  state={{ doctor: item }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 9999, // make it clickable over everything
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                ></Link>


                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "20px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    position: "relative", // content above link
                    zIndex: 2,
                  }}
                >
                  {/* LEFT SIDE IMAGE */}
                  <figure
                    className="tm-video-item"
                    style={{
                      width: "50%",
                      overflow: "hidden",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      backgroundColor: "#fff",
                      margin: 0,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name || "Doctor"}
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        display: "block",
                        borderRadius: "10px",
                      }}
                    />
                  </figure>

                  {/* RIGHT SIDE INFO */}
                  <div
                    style={{
                      width: "40%",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "10px",
                      padding: "15px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: "15px",
                        margin: 0,
                        color: "grey",
                        backgroundColor: "#f0f0f0",
                        border: "none",
                        boxShadow: "none",
                      }}
                    >
                      <li style={{ marginBottom: "10px" }}>
                        <strong>Name:</strong> {item.name}
                      </li>
                      <li style={{ marginBottom: "10px" }}>
                        <strong>Department:</strong> {item.chamber}
                      </li>
                      <li>
                        <strong>Status:</strong>{" "}
                        <span
                          style={{
                            color: item.status === "Active" ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {item.status}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No doctors found or still loading...</p>
          )}
        </div>





        {/* Pagination (static example) */}
        <div className="row tm-mb-90">
          <div className="col-12 d-flex justify-content-between align-items-center tm-paging-col">
            <a href="#" className="btn btn-primary tm-btn-prev mb-2 disabled">
              Previous
            </a>
            <div className="tm-paging d-flex">
              <a href="#" className="active tm-paging-link">
                1
              </a>
              <a href="#" className="tm-paging-link">
                2
              </a>
              <a href="#" className="tm-paging-link">
                3
              </a>
              <a href="#" className="tm-paging-link">
                4
              </a>
            </div>
            <a href="#" className="btn btn-primary tm-btn-next">
              Next Page
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="tm-bg-gray pt-5 pb-3 tm-text-gray tm-footer">
        <div className="container-fluid tm-container-small">
          <div className="row">
            <div className="col-lg-6 col-md-12 px-5 mb-5">
              <h3 className="tm-text-primary mb-4 tm-footer-title">
                About Catalog-Z
              </h3>
              <p>
                Catalog-Z is a free{" "}
                <a href="https://v5.getbootstrap.com/">Bootstrap 5</a> HTML
                Template for showcasing content. Adapted for React + Laravel integration.
              </p>
            </div>
            <div className="col-lg-3 col-md-6 px-5 mb-5">
              <h3 className="tm-text-primary mb-4 tm-footer-title">
                Our Links
              </h3>
              <ul className="tm-footer-links list-unstyled">
                <li><a href="#">Advertise</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Our Company</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 px-5 mb-5">
              <ul className="tm-social-links d-flex justify-content-end list-unstyled mb-5">
                <li className="mb-2"><a href="https://facebook.com"><i className="fab fa-facebook"></i></a></li>
                <li className="mb-2"><a href="https://twitter.com"><i className="fab fa-twitter"></i></a></li>
                <li className="mb-2"><a href="https://instagram.com"><i className="fab fa-instagram"></i></a></li>
                <li className="mb-2"><a href="https://pinterest.com"><i className="fab fa-pinterest"></i></a></li>
              </ul>
              <a href="#" className="tm-text-gray d-block text-end mb-2">
                Terms of Use
              </a>
              <a href="#" className="tm-text-gray d-block text-end">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 col-md-7 px-5 mb-3">
              © 2025 Catalog-Z Integration. All rights reserved.
            </div>
            <div className="col-lg-4 col-md-5 px-5 text-end">
              Designed by{" "}
              <a
                href="https://templatemo.com"
                className="tm-text-gray"
                target="_blank"
                rel="noreferrer"
              >
                TemplateMo
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
