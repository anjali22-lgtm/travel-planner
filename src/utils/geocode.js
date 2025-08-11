// src/utils/geocode.js
export async function getCoordinates(placeName) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    placeName
  )}&format=json&limit=1`;

  const response = await fetch(url);

  const data = await response.json();

  if (data.length === 0) {
    throw new Error(`Location not found: ${placeName}`);
  }

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  };
}

