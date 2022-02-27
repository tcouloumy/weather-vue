import { Model } from 'vue-mc';

class Location extends Model {
  static defaults() {
    return {
      latitude: null,
      longitude: null,
      raw: null,
      origin: ''
    };
  }

  static mutations() {
    return {
      latitude: Number,
      longitude: Number,
      raw: Object,
      origin: String
    };
  }

  get latitude() {
    return (this.origin === 'autocomplete')
      ? this.raw.latitude
      : this.raw.geometry.location.lat;
  }

  get longitude() {
    return (this.origin === 'autocomplete')
      ? this.raw.longitude
      : this.raw.geometry.location.lng;
  }

  get locality() {
    return (this.origin === 'autocomplete')
      ? this.raw.locality
      : this.raw.address_components.find((comp) => comp.types.includes('locality'))?.long_name || null;
  }

  get country() {
    return (this.origin === 'autocomplete')
      ? this.raw.country
      : this.raw.address_components.find((comp) => comp.types.includes('country'))?.long_name || null;
  }

  get place_id() {
    return this.raw.place_id;
  }

  toJSON() {
    return {
      latitude: this.latitude,
      longitude: this.longitude,
      locality: this.locality,
      country: this.country,
      place_id: this.place_id
    };
  }
}

export default Location;
