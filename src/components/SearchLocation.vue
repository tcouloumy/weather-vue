<template>
	<div class="search-location">

		<h1>meteoVue</h1>

		<form @submit="checkForm">
			<vue-google-autocomplete
				id="map"
				classname="form-control"
				placeholder="Start typing"
				types="(cities)"
				v-on:placechanged="mapAddressData">
			</vue-google-autocomplete>
			<input type="submit" value="Ok">
		</form>

		<p v-if="formErrors.length">
			<ul>
				<li v-for="error in formErrors">{{ error }}</li>
			</ul>
		</p>


		{{ address }}

	</div>
</template>

<script>

import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
	
	name: 'SearchLocation',
	components: {
		VueGoogleAutocomplete
	},
	data: function() {
		return {
			formErrors: [],
			locality: '',
			address: {}
		}
	},
	props: {
		msg: String
	},
	methods: {
		
		/**
		* Validate the form before submitting
		* @param {Even} e Submitting form event
		*/
		checkForm(e) {
			
			if (this.address.locality) {
				var address = this.address;
				this.$router.push({ name: 'Forecast', params: { address } });
				return true;
			}
			else {
				this.formErrors = [];
				this.formErrors.push('Select a city');
			}

			e.preventDefault();
		},

		/**
		* When the location found
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
