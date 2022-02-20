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

/**
  * First level key-value comparison two locations object
  * Because of a float precision issues and difference in API responses, we'll need to compare only
  * specific properties of the objects
  *
  * @param {Float} loc1 First location
  * @param {Float} loc2 Location to compare to
  * @return {Boolen} Object are equals or not
  */
export function areEquals(loc1, loc2) {
  if (!loc1 || !loc2 || !loc1.locality || !loc2.locality) return false;

  // We need to remove the accented character because they depends on the locale
  // and limite the decimals of the coordinates to avoir the issues of float precision
  return loc1.locality.normalize('NFD').replace(/[\u0300-\u036f]/g, '') === loc2.locality.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    && loc1.latitude.toFixed(4) === loc2.latitude.toFixed(4)
    && loc1.longitude.toFixed(4) === loc2.longitude.toFixed(4);
}
