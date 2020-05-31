<template>
	<div class="weather-details">

		<h2>{{ location.locality }}, {{ location.country}}</h2>
		
		<WeatherIcon v-if="weatherData.current" v-bind:weather="weatherData.current.weather[0]" />

		<router-link :to="{ name: 'Forecast', params: { location } }">more..</router-link>

	</div>
</template>

<script>

import axios from 'axios';
import WeatherIcon from './WeatherIcon.vue';

export default {
	
	name: 'FavoriteTab',
	components: {
		WeatherIcon
	},
	props: {
		location: Object
	},
	data: function() {
		return {
			loading: true,
			weatherData: {}
		}
	},
	methods: {
		goToDetails() {
			this.$router.push({ name: 'Forecast', params: { address } });
		}
	},
	mounted() {

		let lat = this.location.latitude,
			long = this.location.longitude;

		axios
			.get('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&appid=81f4fb1b0102cc0a3480190588206d6e&units=metrics')
			.then(response => {
				this.loading = false;
				this.weatherData = response.data;
			})
	}
}

</script>

<style scoped>
</style>
