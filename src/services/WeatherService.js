import axios from 'axios';
import { i18n } from '../plugins/i18n';

export default {
  /**
    * Return a promise resulting from an API call for the current weather
    * at given location
    *
    * @param {Float} lat Latitude
    * @param {Float} long Longitude
    * @return {Promise} Result of the call
    */
  async getCurrentWeather(lat, lng) {
    // Would be better to get a list of countries that use the metric system,
    // but in this case we only support fr and en
    const unit = (i18n.locale === 'fr') ? '&units=metric' : '&units=imperial';

    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=${i18n.locale}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}${unit}`
    );
  },

  /**
    * Return a promise resulting from an API call for the
    * complete weather forecast at given location
    *
    * @param {Object} location Location object from which to return weather
    * @return {Promise} Result of the call
    */
  async getAllWeatherInfos(location) {
    const unit = (i18n.locale === 'fr') ? '&units=metric' : '&units=imperial';

    return axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}&lang=${i18n.locale}${unit}`
    );
  }
};
