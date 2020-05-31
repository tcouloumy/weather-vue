<template>
	
	<div class="search-location siimple-form">

		<div class="siimple-jumbotron">

			<div class="siimple-jumbotron-title">meteoVue</div>
			<div class="siimple-jumbotron-subtitle">Search a location and get a detailled weather forecast</div>
			<div class="siimple-jumbotron-detail siimple--mb-3">And manage favorites</div>

			<form @submit="checkForm">
				<vue-google-autocomplete
					id="map"
					classname="form-control siimple-input siimple--mr-2 siimple--width-25"
					placeholder="Start typing"
					types="(cities)"
					v-on:placechanged="mapAddressData">
				</vue-google-autocomplete>
				<input class="siimple-btn siimple-btn--success" type="submit" value="Go !">
			</form>

			<!-- <div class="siimple-jumbotron-subtitle">This is the subtitle</div> -->

		</div>

		<p v-if="formErrors.length">
			<ul>
				<li v-for="error in formErrors">{{ error }}</li>
			</ul>
		</p>

		<ul>
			<li v-for="location in favoriteLocation">
				<FavoriteTab v-bind:location="location" />
			</li>
		</ul>

	</div>
</template>

<script>

import { mapState } from 'vuex';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import FavoriteTab from './FavoriteTab.vue';

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
		
		/**
		* Validate the form before submitting
		* @param {Event} e Submitting form event
		*/
		checkForm(e) {
			
			if (this.address.locality) {
				var address = this.address;
				this.$router.push({ name: 'Forecast', params: { location: address } });
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
