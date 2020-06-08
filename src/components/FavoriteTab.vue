<!-- FavoriteTab.vue -->
<!-- Display a quick view of weather infos for a given location, with a link to the details -->

<template>
	<router-link class="siimple-link" :to="linkParams">
		<div class="favorite-tab">
			<!-- Data display -->
			<div v-if="!loading && !error">
				<div class="siimple-close" v-on:click.prevent="toggleFavorite"></div>

				<h4 class="siimple--mb-2">
					{{ location.locality }}, {{ location.country}}
				</h4>

				<div class="siimple--display-flex">
					<div class="siimple--mr-3">
						<WeatherIcon v-if="weatherData" v-bind:weather="weatherData.weather[0]" />
					</div>

					<div class="infos">
						<p class="temperature"><strong>{{ weatherData.main.temp | formatTemperature }}</strong></p>
						<p class="description siimple-small">{{ weatherData.weather[0].description }}</p>
						<p class="wind siimple-small"><i class="wi wi-strong-wind siimple--mr-1" />{{ weatherData.wind.speed }} {{ $t('units.speed') }}</p>
						<p class="siimple-small">{{ $t('weather.feels_like') }} {{ weatherData.main.feels_like  | formatTemperature }}</p>
					</div>
				</div>
			</div>
			<!-- Loader -->
			<div class="loading" v-if="loading && !error">
				<div class="siimple-spinner siimple-spinner--primary"></div>
			</div>
			<!-- Error -->
			<div v-if="error">
				Something went wrong
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
			error: false,
			weatherData: {},
			locale: this.$i18n.locale
		}
	},
	computed: {
		linkParams() {
			let location = this.location;
			return {
				name: 'Forecast',
				params: { 
					locationString: locationToString(location),
					completeLocation: location 
				}
			}
		}
	},
	methods: {
		locationToString,
		/**
		* Toggle the favorite in the store
		*/
		toggleFavorite() {
			this.$store.dispatch('toggleFavorite', this.location);
		},
		/**
		* Asynchonously retrieves weather data
		*/
		async getWeather() {
			try {
				let response = await WeatherService.getCurrentWeather(this.location.latitude, this.location.longitude);
				this.weatherData = response.data;
			}
			catch (e) {
				this.loading = false;
				this.error = true;
			}
		}
	},
	watch: {
		locale: async function() {
			// Retrieve the data again, with differents units, when the locale is changed
			this.loading = true;
			await this.getWeather();
			this.loading = false;
		}
	},
	async mounted() {
		// Get the data on first display
		await this.getWeather();
		this.loading = false;
	},
	updated() {
		this.locale = this.$i18n.locale;
	}
}

</script>

<style lang="scss" scoped>

.loading > div.siimple-spinner {
	margin-top: 25%;
}

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

	&:hover {
		background-color: rgba(200, 213, 228, .8);

		.siimple-close {
			opacity: .8;
			pointer-events: auto;
		}
	}

	h4 {
		margin: 0;
	}

	p {
		margin: 0;
	}
	
	.infos {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.description:first-letter {
		text-transform: uppercase;
	}
}

</style>
