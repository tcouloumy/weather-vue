<!-- SearchLocation.vue -->
<!-- A autocomplete form routing to the weather details upon completion -->

<template>
  <div class="search-location">
    <form
      class="siimple--display-flex"
      :style="{ maxWidth: width + '%' }"
      @submit="checkForm"
    >
      <vue-google-autocomplete
        id="map"
        classname="form-control siimple-input siimple--mr-2"
        :placeholder="$t('search_location_placeholder')"
        types="(cities)"
        @placechanged="mapAddressData"
      />
      <input
        class="siimple-btn siimple-btn--success"
        type="submit"
        :value="$t('search_location_submit')"
      >
    </form>

    <p
      v-if="formErrors.length"
      class="siimple-small siimple--color-error siimple--my-1"
    >
      <ul>
        <li v-for="error in formErrors">
          {{ error }}
        </li>
      </ul>
    </p>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import { locationToString } from './../helpers/location';

export default {
	
	name: 'SearchLocation',
	components: {
		VueGoogleAutocomplete
	},
	props: {
		width: String
	},
	data: function() {
		return {
			formErrors: [],
			locality: '',
			address: {}
		}
	},
	methods: {
		locationToString,
		/**
		* Validate the form before submitting
		* If valid, send to the forecast page with location infos
		* @param {Event} e Submitting form event
		*/
		checkForm(e) {
			
			if (this.address.locality) {
				const address = this.address;
				this.$router.push({ name: 'Forecast', params: { 
					locationString: this.locationToString(address),
					completeLocation: address 
				}});
				return true;
			}
			else {
				this.formErrors = [];
				this.formErrors.push(this.$t('errors.city_empty'));
			}

			e.preventDefault();
		},

		/**
		* Map the address object to the component when found
		* @param {Object} addressData Data of the found location
		* @param {Object} placeResultData PlaceResult object
		* @param {String} id Input container ID
		*/
		mapAddressData(addressData, placeResultData, id) {
			this.address = addressData;
		},

		handleError(error) {
			this.formErrors = [];
			this.formErrors.push(error);
		}
	}
}
</script>

<style lang="scss" scoped>

h3 {
	margin: 40px 0 0;
}

ul {
	list-style-type: none;
	padding: 0;
	margin: 0;

	li {
		display: inline-block;
	}
}

form > input[type="text"] {
	flex-grow: 1;
}

/* Would be better to get this value from a constant */
@media screen and (max-width: 768px) { 
	form { 
		max-width: 100% !important;
		width: 100% !important;
	}
} 

</style>
