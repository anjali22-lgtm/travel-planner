import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./TransportPlanner.css";
import "leaflet-routing-machine";
import { getCoordinates } from "../utils/geocode";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function Routing({ origin, destination, setDistance, setTravelTime }) {
  const map = useMap();

  useEffect(() => {
    if (!origin || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(origin.lat, origin.lng), L.latLng(destination.lat, destination.lng)],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      createMarker: () => null,
    })
      .on("routesfound", (e) => {
        const route = e.routes[0];
        setDistance(route.summary.totalDistance / 1000); // in km
        setTravelTime(route.summary.totalTime); // in seconds
      })
      .addTo(map);

    return () => map.removeControl(routingControl);
  }, [origin, destination, map, setDistance, setTravelTime]);

  return null;
}

function TransportPlanner() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  const handleOriginChange = async (e) => {
    const location = e.target.value.trim();
    if (!location) return;
    try {
      const { lat, lon } = await getCoordinates(location);
      setOrigin({ lat, lng: lon });
    } catch (err) {
      console.error("Origin geocode failed:", err);
    }
  };

  const handleDestinationChange = async (e) => {
    const location = e.target.value.trim();
    if (!location) return;
    try {
      const { lat, lon } = await getCoordinates(location);
      setDestination({ lat, lng: lon });
    } catch (err) {
      console.error("Destination geocode failed:", err);
    }
  };

  return (
    <div className="planner-container">
      <div className="left-panel">
        <h2>🧭 Travel Planner</h2>
        <input type="text" placeholder="Enter origin..." onBlur={handleOriginChange} />
        <input type="text" placeholder="Enter destination..." onBlur={handleDestinationChange} />
        {distance && (
          <div className="summary">
            <p><strong>Distance:</strong> {distance.toFixed(1)} km</p>
            <p><strong>Estimated Time (Car):</strong> {(travelTime / 3600).toFixed(1)} hrs</p>
          </div>
        )}
      </div>

      <div className="right-panel">
        <MapContainer center={[23.2599, 77.4126]} zoom={5} style={{ height: "450px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {origin && <Marker position={origin} icon={defaultIcon} />}
          {destination && <Marker position={destination} icon={defaultIcon} />}
          {origin && destination && (
            <Polyline positions={[origin, destination]} color="blue" />
          )}
          <Routing origin={origin} destination={destination} setDistance={setDistance} setTravelTime={setTravelTime} />
        </MapContainer>

        {distance && (
          <div className="transport-summary">
            <h3 style={{ textAlign: "center", marginTop: "1rem" }}>🚉 Transport Comparison</h3>
            <div className="transport-options">
              <div className="option">
                <h4>🚗 Car</h4>
                <p>Time: {(distance / 60).toFixed(1)} hrs</p>
                <p>Fare: ₹{(1000 + distance * 10).toFixed(0)}</p>
              </div>
              <div className="option">
                <h4>🚌 Bus</h4>
                <p>Time: {(distance / 45).toFixed(1)} hrs</p>
                <p>Fare: ₹{(800 + distance * 5).toFixed(0)}</p>
              </div>
              <div className="option">
                <h4>🚆 Train</h4>
                <p>Time: {(distance / 50).toFixed(1)} hrs</p>
                <p>Fare: ₹{(500 + distance * 4).toFixed(0)}</p>
              </div>
              <div className="option">
                <h4>✈️ Flight</h4>
                <p>Time: {(distance / 600).toFixed(1)} hrs</p>
                <p>Fare: ₹{(4000 + distance * 6).toFixed(0)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransportPlanner;

