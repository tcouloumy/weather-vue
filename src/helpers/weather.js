import axios from 'axios';
import { i18n } from '@/plugins/i18n'

/**
* Return a promise resulting from an API call for the current weather at given location 
* @param {Object} location Object containing lat and lng o
* @return {Promise} Result of the call
*/
export function getCurrentWeather(lat, lng) {

	console.log(i18n.locale);

	let getUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&lang='+i18n.locale+'&appid='+process.env.VUE_APP_OPENWEATHER_API_KEY;

	// Would be better to get a list of countries that use the metric system,
	// but in this case we only support fr and en
	if (i18n.locale == 'fr') {
		getUrl += '&units=metric';
	}
	else {
		getUrl += '&units=imperial';
	}

	return axios.get(getUrl);
}