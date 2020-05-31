<template>
	
	<div class="search-location siimple-form">
		<div class="siimple-jumbotron">
			<div class="siimple-jumbotron-title">meteoVue</div>
			<div class="siimple-jumbotron-subtitle">search a location and get a detailled weather forecast</div>
			<div class="siimple-jumbotron-detail siimple--mb-3">and manage favorites</div>

			<form @submit="checkForm">
				<vue-google-autocomplete
					id="map"
					classname="form-control siimple-input siimple--mr-2 siimple--width-25"
					placeholder="I want the weather for ..."
					types="(cities)"
					v-on:placechanged="mapAddressData">
				</vue-google-autocomplete>
				<input class="siimple-btn siimple-btn--success" type="submit" value="Go !">
			</form>

			<p v-if="formErrors.length">
				<ul>
					<li v-for="error in formErrors">{{ error }}</li>
				</ul>
			</p>
		</div>

		<div class="favorites">
			<h2 class="siimple--my-0">My favorites</h2>
			<p class="siimple-small siimple--mt-0">Upated at xxx</p>

			<ul>
				<li v-for="location in favoriteLocation">
					<FavoriteTab v-bind:location="location" />
				</li>
			</ul>
		</div>

	</div>
</template>

<script>

import { mapState } from 'vuex';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import FavoriteTab from './FavoriteTab.vue';
import { locationToString } from './../helpers/location';

export default {
	
	name: 'SearchLocation',
	components: {
		VueGoogleAutocomplete,
		FavoriteTab
	},
	data: function() {
		return {
			formErrors: [],
			locality: '',
			address: {}
		}
	},
	computed: {
		...mapState(['favoriteLocation'])
	},
	props: {
		msg: String
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
				this.formErrors.push('Select a city');
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

<style scoped>

h3 {
	margin: 40px 0 0;
}

ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

li {
	display: inline-block;
}

</style>
