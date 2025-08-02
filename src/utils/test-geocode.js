// src/utils/test-geocode.js
import { getCoordinates } from "./geocode.js"; // ✅ Correct relative path

async function testGeocode() {
  const delhi = await getCoordinates("Delhi");
  const shimla = await getCoordinates("Shimla");

  console.log("Delhi:", delhi);
  console.log("Shimla:", shimla);
}

testGeocode();
