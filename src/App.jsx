// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/login";
import PlanTrip from "./components/PlanTrip";
import TransportAndMap from "./components/TransportAndMap";
import TransportPlanner from "./components/TransportPlanner"; // ✅ Step 1

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plan" element={<PlanTrip />} />
        <Route path="/transport" element={<TransportAndMap />} />
        <Route path="/planner" element={<TransportPlanner />} /> {/* ✅ Step 2 */}
      </Routes>
    </>
  );
}

export default App;




