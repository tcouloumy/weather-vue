import axios from 'axios';
import { i18n } from '@/plugins/i18n';

export default {
  /**
	* Return a promise resulting from an API call for the current weather at given location
	* @param {Float} lat Latitude
	* @param {Float} long Longitude
	* @return {Promise} Result of the call
	*/
  async getCurrentWeather(lat, lng) {
    let getUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=${i18n.locale}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}`;

    // Would be better to get a list of countries that use the metric system,
    // but in this case we only support fr and en
    if (i18n.locale == 'fr') {
      getUrl += '&units=metric';
    } else {
      getUrl += '&units=imperial';
    }

    return await axios.get(getUrl);
  },

  /**
	* Return a promise resulting from an API call for the complete weather forecast at given location
	* @param {Float} lat Latitude
	* @param {Float} long Longitude
	* @return {Promise} Result of the call
	*/
  async getAllWeatherInfos(lat, lng) {
    let getUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}&lang=${i18n.locale}`;

    if (i18n.locale == 'fr') {
      getUrl += '&units=metric';
    } else {
      getUrl += '&units=imperial';
    }

    return await axios.get(getUrl);
  },
};
