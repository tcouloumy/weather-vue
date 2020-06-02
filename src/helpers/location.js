/**
* Return a formated location string for URLs
* @param {Object} loc Location object containing latitude and longitude
* @param {int} long Longitude
*/
export function locationToString(loc) {
	return loc.latitude.toString() + "," + loc.longitude.toString();
}

/**
* Return a latitude and longitude from a string
* @param {Object} loc Location object containing latitude and longitude
* @param {int} long Longitude
*/
export function stringToLocation(string) {

	let location = string.split(',');
	
	return {
		latitude: parseFloat(location[0]),
		longitude: parseFloat(location[1])
	}
}


/**
* Takes a result json from Google geoloc API and return a json formatted like the Autocomplete place API
* @param {Object} geoloc Result from Geoloc API
* @return {Object} Formatted JSON
*/
export function parseReverseGeocodeResult(geoloc) {
	
	let result = {};

	geoloc.data.results[0].address_components.map(item => {
		// We need the country's full name
		if (item.types[0] === "country") result[item.types[0]] = item.long_name;
		else result[item.types[0]] = item.short_name;
	});

	return {
		...result,
		latitude: geoloc.data.results[0].geometry.location.lat,
		longitude: geoloc.data.results[0].geometry.location.lng
	}
}

/**
* First level key-value comparison two locations object
* Because of a float precision issues and difference in API responses, we'll need to compare only
* specific properties of the objects
* @param {Object} loc1 First location
* @param {Object} loc2 Location to compare to
* @return {Boolen} Object are equals or not
*/
export function areEquals(loc1, loc2) {

	if (loc1 === undefined || loc2 === undefined) 
		return false;

	return loc1.administrative_area_level_1 === loc2.administrative_area_level_1 &&
			loc1.country === loc2.country &&
			loc1.locality === loc2.locality &&
			loc1.postal_code === loc2.postal_code;
}
