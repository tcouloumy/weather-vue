<template>
	<div class="weather-details" v-if="!loading">

		<!-- Title and favorite indicator + button -->
		<div class="title siimple--display-flex">
			
			<h1>Weather for {{ location.locality }}, {{ location.country}}</h1>
			
			<div class="favorite-link siimple-small siimple--display-flex" v-if="!isFavorite()">
				<p class="siimple--mr-2">Marked as favorite</p>
				<a class="siimple-link" v-on:click="toggleFavorite()">Remove</a>
			</div>

			<div class="siimple-small" v-if="isFavorite()">
				<a class="siimple-link" v-on:click="toggleFavorite()">Add to favorite</a>
			</div>

		</div>
		<p class="subtitle siimple-small">As of {{ currentFormatedTime() }}</p>

		<!-- Main today infos -->
		<div class="today">
			<div class="siimple--display-flex">
				<div>
					<h2 class="temperature">{{ getFormattedTemperature(weatherData.current.temp) }}</h2>
					<h3 class="description">{{ weatherData.current.weather[0].description }}</h3>
					<p>{{ $t('weather.feels_like') }} {{ getFormattedTemperature(weatherData.current.feels_like) }}</p>
				</div>
				<div>
					<WeatherIcon v-bind:weather="weatherData.current.weather[0]" />
					
					<div class="siimple--display-flex">
						<p><i class="wi wi-sunrise" /></p>
						<p>{{ weatherData.current.sunrise }}</p>
					</div>

					<div class="siimple--display-flex">
						<p><i class="wi wi-sunset" /></p>
						<p>{{ weatherData.current.sunset }}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Today details -->
		<div class="today-details">

			<h2>Details</h2>

			<div class="siimple--display-flex">
				
				<div class="siimple-table siimple--mr-2">
					<div class="siimple-table-body">
						
						
						<div class="siimple-table-row">
							<div class="siimple-table-cell">
								<i class="wi wi-strong-wind" />
								Wind speed
							</div>
							<div class="siimple-table-cell">{{ weatherData.current.wind_speed }} {{$t('units.speed')}}</div>
						</div>


						<div class="siimple-table-row">
							<div class="siimple-table-cell">
								<i class="wi wi-wind" />
								Wind orientation
							</div>
							<div class="siimple-table-cell">{{ weatherData.current.wind_deg }} deg</div>
						</div>

						<div class="siimple-table-row">
							<div class="siimple-table-cell">
								<i class="wi wi-cloud" />
								Cloudiness
							</div>
							<div class="siimple-table-cell">{{ weatherData.current.clouds }} %</div>
						</div>

					</div>
				</div>

				<div class="siimple-table siimple--ml-2">
					<div class="siimple-table-body">

						<div class="siimple-table-row">
							<div class="siimple-table-cell">
								<i class="wi wi-humidity" />
								Humidity
							</div>
							<div class="siimple-table-cell">{{ weatherData.current.humidity }} %</div>
						</div>

						<div class="siimple-table-row">
							<div class="siimple-table-cell">
								<i class="wi wi-day-sunny" />
								UV Index
							</div>
							<div class="siimple-table-cell">{{ weatherData.current.uvi }} / 10</div>
						</div>

						<div class="siimple-table-row">
							<div class="siimple-table-cell">
								<i class="wi wi-barometer" />
								Pressure
							</div>
							<div class="siimple-table-cell">{{ weatherData.current.pressure }} hPa</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<!-- Next days table -->
		<div class="next-days">
			<h2>Next few days</h2>

			<div class="siimple-table">

				<div class="siimple-table-body">
					<div class="siimple-table-row" v-for="item in weatherData.daily">
						<div class="siimple-table-cell">{{ timestampToDate(item.dt) }}</div>
						<div class="siimple-table-cell"><WeatherIcon v-bind:weather="item.weather[0]" /></div>
						<div class="siimple-table-cell">Cell 3</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>

import { mapState } from 'vuex';
import axios from 'axios';
import moment from 'moment';
import WeatherIcon from './WeatherIcon.vue';
import _ from 'lodash';
import { parseReverseGeocodeResult, stringToLocation, areEquals } from '@/helpers/location';
import { currentFormatedTime, timestampToDate } from '@/helpers/time';
import { getFormattedTemperature } from '@/helpers/number';

export default {
	
	name: 'WeatherDetails',
	components: {
		WeatherIcon
	},
	data: function() {
		return {
			loading: true,
			location: {},
			weatherData: {}
		}
	},
	computed: {
		...mapState(['favoriteLocation'])
	},
	methods: {
		currentFormatedTime,
		timestampToDate,
		getFormattedTemperature,
		/**
		* Check if the current location exists in the store favorites
		*/
		isFavorite() {
			return this.favoriteLocation.findIndex(item => areEquals(item, this.location) !== -1);
		},
		/**
		* Map the address object to the component when found
		*/
		toggleFavorite() {
			this.$store.dispatch('toggleFavorite', this.location);
		}
	},
	mounted() {

		let { latitude, longitude } = stringToLocation(this.$route.params.locationString);

		// If we happen to have been sent a complete location object where the route have been called,
		// no need to geocode it via google api
		if (this.$route.params.completeLocation) {
			this.location = this.$route.params.completeLocation;
			latitude = this.location.latitude;
			longitude  = this.location.longitude;
		}
		else {
			// If not, get it
			axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude +'&key=AIzaSyDzoGNKEZHZsx7KaeGhZKGIll-3U7qT8U4&result_type=locality&language='+this.$i18n.locale)
				.then(response => {
					this.location = parseReverseGeocodeResult(response);
				}
			)
		}
		
		// Getting the weather infos
		axios.get('https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude +'&appid=81f4fb1b0102cc0a3480190588206d6e&units=metric&lang='+this.$i18n.locale)
			.then(response => {
				this.loading = false;
				this.weatherData = response.data;
			}
		)
		
	}
}

</script>

<style scoped>

.title {
	justify-content: space-between;
	align-items: baseline;
}

.title h1 {
	margin-bottom: 0;
}

.favorite-link > * {
	margin: 0;
}

.subtitle {
	margin-top: 0;
	margin-bottom: 20px;
}

.today {
    border-radius: 5px;
    padding: 15px 30px 16px 25px;
	background-color: rgba(200, 213, 228, .8);
}

.temperature {
	font-size: 50px;
	font-weight: bold;
	margin: 0;
}

.description {
	margin: 0;
}

.today > div {
	justify-content: space-between;
}

.description:first-letter {
    text-transform: uppercase;
}

/* Table details */

.today-details i {
	text-align: center;
	min-width: 30px;
}

.today-details > div {
	justify-content: space-between;
}

</style>
