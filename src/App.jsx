import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Drdetail from "./pages/drdetail.jsx";
import Booking from "./pages/booking.jsx";
import Bookapoin from "./pages/bookapoin.jsx";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drdetail" element={<Drdetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookapoin" element={<Bookapoin />} />
      </Routes>
    </Router>
  );
}
