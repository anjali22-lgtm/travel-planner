// src/components/PlanTrip.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlanTrip.css";

function PlanTrip() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to transport options page with data
    navigate("/transport", {
      state: { source, destination },
    });
  };

  return (
    <div className="plan-trip-container">
      <h2>Plan Your Trip ✈️</h2>
      <form onSubmit={handleSubmit} className="plan-form">
        <label>
          Source:
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Enter source"
            required
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
            required
          />
        </label>
        <button type="submit">Plan Trip</button>
      </form>
    </div>
  );
}

export default PlanTrip;


