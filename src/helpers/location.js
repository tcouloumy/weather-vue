/**
  * Return a formated location string for URLs
  *
  * @param {Object} loc Location object containing latitude and longitude
  */
export function locationToString(loc) {
  return `${loc.latitude.toString()},${loc.longitude.toString()}`;
}

/**
  * Return a latitude and longitude from a string
  *
  * @param {String} string String from which to extract latitude and longitude
  *                        Format : "latitude,longitude"
  */
export function stringToLocation(string) {
  const location = string.split(',');

  return {
    latitude: parseFloat(location[0]),
    longitude: parseFloat(location[1])
  };
}