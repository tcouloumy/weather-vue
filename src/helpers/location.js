/**
  * Return a formated location string for URLs
  *
  * @param {Object} loc Location object containing latitude and longitude
  * @param {int} long Longitude
  */
export function locationToString(loc) {
  return `${loc.latitude.toString()},${loc.longitude.toString()}`;
}

/**
* Return a latitude and longitude from a string
* @param {Object} loc Location object containing latitude and longitude
* @param {int} long Longitude
*/
export function stringToLocation(string) {
  const location = string.split(',');

  return {
    latitude: parseFloat(location[0]),
    longitude: parseFloat(location[1])
  };
}

/**
  * Takes a result json from Google geoloc API and
  * return a json formatted like the Autocomplete place API
  *
  * @param {Object} geoloc Result from Geoloc API
  * @return {Object} Formatted JSON
  */
export function parseReverseGeocodeResult(geoloc) {
  const result = {};

  geoloc.data.results[0].address_components.forEach((item) => {
    // We need the country's full name
    if (item.types[0] === 'country') result[item.types[0]] = item.long_name;
    else result[item.types[0]] = item.short_name;
  });

  return {
    ...result,
    latitude: geoloc.data.results[0].geometry.location.lat,
    longitude: geoloc.data.results[0].geometry.location.lng
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
