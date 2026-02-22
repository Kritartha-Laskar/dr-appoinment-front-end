import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/templatemo-style.css";
import $ from "jquery";
import axios from "axios";

const drdetail = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    $(window).on("load", function () {
      document.body.classList.add("loaded");
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/drmanage")
      .then((response) => {
        console.log("API Response:", response.data);
        setAppointments(response.data.data || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div id="loader-wrapper">
        <div id="loader"></div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <i className="fas fa-film mr-2"></i> Catalog-Z
          </a>
        </div>
      </nav>

      <div className="container mt-5">
        <h3 className="mb-4 text-primary">Fetched Appointments from Laravel</h3>
        {appointments.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Doctor Name</th>
                <th>Department</th>
                <th>Chamber Name</th>
                <th>price</th> 
                <th>time_from</th>
                <th>time_to</th>
                <th>capacity</th>
                <th>image</th>
                <th>status</th>

              </tr>
            </thead>
            <tbody>
              {appointments.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.dept_name}</td>
                  <td>{item.chamber}</td>
                  <td>{item.price}</td>
                  <td>{item.time_from}</td>
                  <td>{item.time_to}</td>
                  <td>{item.capacity}</td>
                  <td>{item.image}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data found or still loading...</p>
        )}
      </div>
    </>
  );
};

export default drdetail;
