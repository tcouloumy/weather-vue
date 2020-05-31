/**
* Return a formated location string for URLs
* @param {Object} loc Location object containing latitude and longitude
* @param {int} long Longitude
*/
export function locationToString(loc) {
	return loc.latitude.toString() + "," + loc.longitude.toString();
}
