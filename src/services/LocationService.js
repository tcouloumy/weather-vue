import axios from 'axios';
import { i18n } from '@/plugins/i18n';

export default {
	/**
	* Return a location object from latitude and longitude by calling google geocode API
	* @param {Float} lat Latitude
	* @param {Float} long Longitude
	* @return {Object} Location object
	*/
	reverseGeocode(lat, long) {
		let getUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key='+process.env.VUE_APP_GOOGLE_API_KEY+'&result_type=locality&language='+i18n.locale;
		return axios.get(getUrl);
	}
}