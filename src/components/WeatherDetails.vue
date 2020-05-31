<template>
	<div class="weather-details">

		<h2>Weather for {{ $route.params.location.locality }}, {{ $route.params.location.country}}</h2>
		
		<button v-on:click="toggleFavorite()">
			Favorifier
		</button>

		<ul v-if="!loading">
			<li v-for="item in weatherData.daily">
				{{ timestampToDate(item.dt) }}
				<WeatherIcon v-bind:weather="item.weather[0]" />
			</li>
		</ul>

	</div>
</template>

<script>

import axios from 'axios';
import moment from 'moment';
import WeatherIcon from './WeatherIcon.vue';

export default {
	
	name: 'WeatherDetails',
	components: {
		WeatherIcon
	},
	data: function() {
		return {
			loading: true,
			weatherData: {}
		}
	},
	methods: {
		timestampToDate(timestamp) {
			return moment.unix(timestamp).format("MM/DD/YYYY");
		},
		toggleFavorite() {
			this.$store.dispatch('toggleFavorite', this.$route.params.location);
		}
	},
	mounted() {

		let lat = this.$route.params.location.latitude,
			long = this.$route.params.location.longitude;

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
