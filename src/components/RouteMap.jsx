import React from 'react';
import { useLocation } from 'react-router-dom';
import roadImage from '../assets/road.jpg'; // ✅ adjust if needed
import './RouteMap.css'; // optional

function RouteMap() {
  const location = useLocation();
  const { source, destination } = location.state || {};

  return (
    <div className="route-map">
      <h2>Route Map</h2>
      {source && destination ? (
        <>
          <p><strong>From:</strong> {source}</p>
          <p><strong>To:</strong> {destination}</p>
          <img src={roadImage} alt="Route from source to destination" className="road-image" />
        </>
      ) : (
        <p>No route selected.</p>
      )}
    </div>
  );
}

export default RouteMap;




