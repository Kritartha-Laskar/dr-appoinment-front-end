// src/pages/Booking.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/templatemo-style.css";

const Booking = () => {
  const location = useLocation();
  const [doctor, setDoctor] = useState(location.state?.doctor || null);
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", slot: "" });
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const generateSlots = (from, to, capacity) => {
    if (!from || !to || !capacity) return [];
    const parseTime = (t) => {
      const [time, meridian] = t.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (meridian?.toLowerCase() === "pm" && hours < 12) hours += 12;
      if (meridian?.toLowerCase() === "am" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };
    const formatTime = (mins) => {
      let h = Math.floor(mins / 60);
      let m = mins % 60;
      const meridian = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h}:${m.toString().padStart(2, "0")} ${meridian}`;
    };
    const start = parseTime(from);
    const end = parseTime(to);
    const total = end - start;
    const duration = total / capacity;
    return Array.from({ length: capacity }, (_, i) => {
      const s = start + i * duration;
      const e = s + duration;
      return `${formatTime(s)} - ${formatTime(e)}`;
    });
  };

  useEffect(() => {
    if (location.state?.doctor) {
      setDoctor(location.state.doctor);
      const d = location.state.doctor;
      const s = generateSlots(d.time_from, d.time_to, parseInt(d.capacity || 10));
      setSlots(s);
    }
    const timer = setTimeout(() => document.body.classList.add("loaded"), 500);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [location.state]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await axios.post("http://127.0.0.1:8000/api/bookings", {
        name: formData.name,
        phone: formData.phone,
        slot: formData.slot,
        doctor_id: doctor?.id,
      });
      setShowModal(true);
      setFormData({ name: "", phone: "", slot: "" });
    } catch (error) {
      console.error("Booking failed:", error);
      setErrorMsg("Failed to book appointment. Try again.");
    }
  };

  if (!doctor) {
    return (
      <div className="text-center mt-5">
        <h4>No doctor data found.</h4>
        <p>Please go back and select a doctor again.</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Updated Navbar */}
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

      {/* Booking Section */}
      <div className="container tm-container-content tm-mt-60">
        <h2 className="tm-text-primary mb-4 text-center">
          Book Appointment with {doctor.name}
        </h2>

        <div className="row mb-5">
          <div className="col-lg-6 mb-4">
            <div className="card shadow-sm p-3">
              <img
                src={doctor.image || "/img/img-01-big.jpg"}
                alt={doctor.name}
                className="img-fluid rounded mb-3"
              />
              <h5>{doctor.name}</h5>
              <p>
                <strong>Department:</strong> {doctor.dept_name}
              </p>
              <p>
                <strong>Chamber:</strong> {doctor.chamber}
              </p>
              <p>
                <strong>Fees:</strong> {doctor.price}
              </p>
              <p>
                <strong>Available Time:</strong> {doctor.time_from} -{" "}
                {doctor.time_to}
              </p>
              <p>
                <strong>Capacity:</strong> {doctor.capacity} Patients
              </p>
            </div>
          </div>

          <div className="col-lg-6">
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
              <div className="mb-3">
                <label className="form-label fw-semibold">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Select Slot</label>
                <div className="d-flex flex-wrap gap-2">
                  {slots.map((slot, idx) => (
                    <div
                      key={idx}
                      onClick={() => setFormData({ ...formData, slot })}
                      className={`slot-box ${
                        formData.slot === slot ? "selected" : ""
                      }`}
                    >
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              {errorMsg && <p className="text-danger">{errorMsg}</p>}

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content text-center">
            <i className="fas fa-check-circle text-success fa-3x mb-3"></i>
            <h4>Appointment Booked Successfully!</h4>
            <p>We’ll notify you with confirmation details soon.</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Updated Footer */}
      <footer className="tm-bg-gray pt-5 pb-3 tm-text-gray tm-footer">
        <div className="container-fluid tm-container-small">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12 px-5 mb-5">
              <h3 className="tm-text-primary mb-4 tm-footer-title">
                About Assrud Appointment
              </h3>
              <p>
                We help you connect with experienced doctors easily. Book
                appointments quickly and manage your health efficiently with
                Assrud Appointment.
              </p>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
              <h3 className="tm-text-primary mb-4 tm-footer-title">
                Quick Links
              </h3>
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
              <a
                href="https://templatemo.com"
                className="tm-text-gray"
                rel="noreferrer"
                target="_blank"
              >
                TemplateMo
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style>{`
        .slot-box {
          border: 2px solid #007bff;
          border-radius: 10px;
          padding: 10px 20px;
          cursor: pointer;
          transition: 0.3s;
          flex: 1 0 45%;
          text-align: center;
          background-color: #f8f9fa;
        }
        .slot-box:hover {
          background-color: #007bff;
          color: white;
        }
        .slot-box.selected {
          background-color: #007bff;
          color: white;
          border-color: #0056b3;
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 10px;
          width: 400px;
        }
      `}</style>
    </div>
  );
};

export default Booking;
