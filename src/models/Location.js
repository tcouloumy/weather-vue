import { Model } from 'vue-mc';

class Location extends Model {
  static defaults() {
    return {
      latitude: null,
      longitude: null,
      raw: null
    };
  }

  static mutations() {
    return {
      latitude: Number,
      longitude: Number,
      raw: Object
    };
  }

  get country() {
    return this.raw.address_components.find((comp) => comp.types.includes('country'))?.long_name || null;
  }
}

export default Location;
