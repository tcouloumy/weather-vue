import axios from 'axios';
import Location from '../models/Location';
import { i18n } from '../plugins/i18n';

export default {
  /**
    * Return a location object from latitude and longitude by calling google geocode API
    *
    * @param {Float} lat Latitude
    * @param {Float} long Longitude
    * @return {Object} Location object
    */

  async reverseGeocode(lat, long) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.VUE_APP_GOOGLE_API_KEY}&result_type=locality&language=${i18n.locale}`
    );

    return new Location({ raw: response.data.results[0] });
  }
};
