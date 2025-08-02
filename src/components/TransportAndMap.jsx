import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

function Routing({ source, destination }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !L.Routing || !source || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(...source), L.latLng(...destination)],
      routeWhileDragging: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, source, destination]);

  return null;
}

function TransportAndMap() {
  const [sourceInput, setSourceInput] = useState('');
  const [destInput, setDestInput] = useState('');
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);

  const getCoordinates = async (place) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
    const data = await response.json();
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
      alert(`Could not find location: ${place}`);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const src = await getCoordinates(sourceInput);
    const dst = await getCoordinates(destInput);

    if (src && dst) {
      setSourceCoords(src);
      setDestCoords(dst);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter Source"
          value={sourceInput}
          onChange={(e) => setSourceInput(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Destination"
          value={destInput}
          onChange={(e) => setDestInput(e.target.value)}
        />
        <button type="submit">Plan Trip</button>
      </form>

      <div style={{ height: '80vh', width: '100%' }}>
        <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© OpenStreetMap contributors'
          />
          {sourceCoords && (
            <Marker position={sourceCoords}>
              <Popup>Source: {sourceInput}</Popup>
            </Marker>
          )}
          {destCoords && (
            <Marker position={destCoords}>
              <Popup>Destination: {destInput}</Popup>
            </Marker>
          )}
          {sourceCoords && destCoords && (
            <Routing source={sourceCoords} destination={destCoords} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default TransportAndMap;




