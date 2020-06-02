<!-- FavoriteTab.vue -->
<!-- Display a quick view of weather infos for a given location, with a link to the details -->

<template>
	<router-link class="siimple-link" :to="{ name: 'Forecast', params: { locationString: locationToString(location), completeLocation: location } }">
		<div class="favorite-tab">
			<!-- Data display -->
			<div v-if="!loading">
				<div class="siimple-close" v-on:click.prevent="toggleFavorite"></div>

				<h4 class="siimple--mb-2">
					{{ location.locality }}, {{ location.country}}
				</h4>

				<div class="siimple--display-flex">
					<div class="siimple--mr-3">
						<WeatherIcon v-if="weatherData" v-bind:weather="weatherData.weather[0]" />
					</div>

					<div class="infos">
						<p class="temperature"><strong>{{ getFormattedTemperature(weatherData.main.temp) }}</strong></p>
						<p class="description siimple-small">{{ weatherData.weather[0].description }}</p>
						<p class="wind siimple-small"><i class="wi wi-strong-wind siimple--mr-1" />{{ weatherData.wind.speed }} {{ $t('units.speed') }}</p>
						<p class="siimple-small">{{ $t('weather.feels_like') }} {{ getFormattedTemperature(weatherData.main.feels_like) }}</p>
					</div>
				</div>
			</div>
			<!-- Loader -->
			<div class="loading" v-if="loading">
				<div class="siimple-spinner siimple-spinner--primary"></div>
			</div>
		</div>
	</router-link>
</template>

<script>

import axios from 'axios';
import WeatherIcon from './WeatherIcon.vue';
import WeatherService from '@/services/WeatherService';
import { i18n } from '@/plugins/i18n';
import { locationToString } from '@/helpers/location';
import { getFormattedTemperature } from '@/helpers/number';

export default {
	name: 'FavoriteTab',
	components: {
		WeatherIcon,
		locationToString
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
		locationToString,
		getFormattedTemperature,
		/**
		* Toggle the favorite in the store
		*/
		toggleFavorite() {
			this.$store.dispatch('toggleFavorite', this.location);
		}
	},
	mounted() {
		// Get the current weather data and stop displaying loading when received
		WeatherService.getCurrentWeather(this.location.latitude, this.location.longitude).then(response => {
			this.loading = false;
			this.weatherData = response.data;
		})
	}
}

</script>

<style scoped>

.siimple-link {
	font-weight: inherit;
	color: inherit;
	position: relative;
}

.siimple-close {
	position: absolute;
	top: 10px;
	left: 205px;
	opacity: 0;
	transition: opacity .3s;
	pointer-events: none;
}

.siimple-close:before, .siimple-close:after {
	background-color: #dde5ee;
}

.favorite-tab {
	width: 180px;
    height: 100px;
	transition: background-color .3s;
    border-radius: 5px;
    padding: 15px 30px 16px 25px;
}

.favorite-tab:hover {
	background-color: rgba(200, 213, 228, .8);
}

.favorite-tab:hover .siimple-close {
	opacity: .8;
	pointer-events: auto;
}

.favorite-tab h4 {
	margin: 0;
}

.favorite-tab p {
	margin: 0;
}

.favorite-tab .infos {
	display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.favorite-tab .description:first-letter {
    text-transform: uppercase;
}

.loading > div.siimple-spinner {
	margin-top: 25%;
}

</style>
