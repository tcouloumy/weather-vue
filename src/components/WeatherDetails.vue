<template>
	<div>
		<!-- While waiting -->
		<div class="weather-details loading" v-if="loading">
			<div class="siimple-spinner siimple-spinner--primary"></div>
		</div>
		<div class="weather-details" v-if="!loading">

			<!-- Title and favorite indicator + button -->
			<div class="title siimple--display-flex">
				
				<h1>{{ $t('pages.forecast.weather_for') }} {{ location.locality }}, {{ location.country}}</h1>
				
				<div class="favorite-link siimple-small siimple--display-flex" v-if="isFavorite()">
					<p class="siimple--mr-2">{{ $t('pages.forecast.favorite.marked') }}</p>
					<a class="siimple-link" v-on:click="toggleFavorite()">{{ $t('pages.forecast.favorite.remove') }}</a>
				</div>
				<div class="siimple-small" v-if="!isFavorite()">
					<a class="siimple-link" v-on:click="toggleFavorite()">{{ $t('pages.forecast.favorite.add') }}</a>
				</div>

			</div>
			<p class="subtitle siimple-small">{{ $t('pages.forecast.hour_prefix') }} {{ currentFormatedTime() }}</p>

			<!-- Main today infos -->
			<div class="today">
				<div class="siimple--display-flex">
					<div class="quickview">
						<h2 class="temperature">{{ getFormattedTemperature(weatherData.current.temp) }}</h2>
						<h3 class="description">{{ weatherData.current.weather[0].description }}</h3>
						<p>{{ $t('weather.feels_like') }} {{ getFormattedTemperature(weatherData.current.feels_like) }}</p>
					</div>
					<div>
						<WeatherIcon v-bind:weather="weatherData.current.weather[0]" />

						<div class="suntimes">
							<p>
								<i class="wi wi-sunrise" />
								{{ getFormatedTimeFromTimestamp(weatherData.current.sunrise) }}
							</p>

							<p>
								<i class="wi wi-sunset" />
								{{ getFormatedTimeFromTimestamp(weatherData.current.sunset) }}
							</p>
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
									{{ $t('pages.forecast.details.wind_speed') }}
								</div>
								<div class="siimple-table-cell">{{ weatherData.current.wind_speed }} {{$t('units.speed')}}</div>
							</div>


							<div class="siimple-table-row">
								<div class="siimple-table-cell">
									<i class="wi wi-wind" />
									{{ $t('pages.forecast.details.wind_orientation') }}
								</div>
								<div class="siimple-table-cell">{{ degToCompass(weatherData.current.wind_deg) }}</div>
							</div>

							<div class="siimple-table-row">
								<div class="siimple-table-cell">
									<i class="wi wi-cloud" />
									{{ $t('pages.forecast.details.cloudiness') }}
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
									{{ $t('pages.forecast.details.humidity') }}
								</div>
								<div class="siimple-table-cell">{{ weatherData.current.humidity }} %</div>
							</div>

							<div class="siimple-table-row">
								<div class="siimple-table-cell">
									<i class="wi wi-day-sunny" />
									{{ $t('pages.forecast.details.uvi') }}
								</div>
								<div class="siimple-table-cell">{{ weatherData.current.uvi }} / 10</div>
							</div>

							<div class="siimple-table-row">
								<div class="siimple-table-cell">
									<i class="wi wi-barometer" />
									{{ $t('pages.forecast.details.pressure') }}
								</div>
								<div class="siimple-table-cell">{{ weatherData.current.pressure }} hPa</div>
							</div>

						</div>
					</div>
				</div>
			</div>

			<!-- Next days table -->
			<div class="next-days">
				<h2>{{ $t('pages.forecast.next_days') }}</h2>

				<div class="siimple-table">

					<div class="siimple-table-body">
						<!-- Skipping the first item, which is today -->
						<div class="siimple-table-row" v-for="(item, index) in weatherData.daily" v-if="index">
							
							<div class="siimple-table-cell date">{{ getDayFromTimestamp(item.dt) }}</div>

							<div class="siimple-table-cell temperatures">
								<div class="siimple--display-flex">
									<p>
										<i class="wi wi-thermometer-exterior" />
										{{ getFormattedTemperature(item.temp.min) }}
									</p>
									<p>
										<i class="wi wi-thermometer" />
										{{ getFormattedTemperature(item.temp.max) }}
									</p>
								</div>
							</div>

							<div class="siimple-table-cell weather">
								<div class="siimple--display-flex">
									<WeatherIcon v-bind:weather="item.weather[0]" size="small" />
									<p>{{ item.weather[0].description }}</p>
								</div>
							</div>

							<div class="siimple-table-cell wind">
								<p>
									<i class="wi wi-strong-wind" />
									{{ item.wind_speed }} {{$t('units.speed')}}
									{{ degToCompass(item.wind_deg) }}
								</p>
							</div>
						</div>
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
import LocationService from '@/services/LocationService';
import WeatherService from '@/services/WeatherService';
import { parseReverseGeocodeResult, stringToLocation, areEquals} from '@/helpers/location';
import { currentFormatedTime, timestampToDate, getDayFromTimestamp, getFormatedTimeFromTimestamp } from '@/helpers/time';
import { getFormattedTemperature, degToCompass } from '@/helpers/number';

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
		getDayFromTimestamp,
		getFormatedTimeFromTimestamp,
		degToCompass,
		/**
		* Check if the current location exists in the store favorites
		*/
		isFavorite() {
			return this.favoriteLocation.findIndex(item => areEquals(item, this.location)) !== -1;
		},
		/**
		* Toggle the favorite in the store
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
			LocationService.reverseGeocode(latitude, longitude).then(response => {
				this.location = parseReverseGeocodeResult(response);
			});
		}
		
		// Getting the weather infos
		WeatherService.getAllWeatherInfos(latitude, longitude).then(response => {
			this.loading = false;
			this.weatherData = response.data;
		});
	}
}

</script>

<style scoped>

/* Main styling */
.loading {
	margin-top: 10%;
}

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

.siimple-table-cell {
	border-top: none;
}

/* Today */

.today {
    border-radius: 5px;
    padding: 20px 30px;
	background-color: rgba(200, 213, 228, .8);
}

.today .quickview p { 
	margin: 0;
}

.today .quickview {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.temperature {
	font-size: 50px;
	font-weight: bold;
	margin: 0;
}

.description {
	margin: 0;
}

.today .suntimes {
	margin-top: 15px;
}

.today .suntimes p {
	margin: 0;
	margin-top: 3px;
}

.today .suntimes p i {
	margin-right: 5px;
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

.siimple-table-row > .siimple-table-cell:last-of-type {
	text-align: right;
}


/* Next days */

.next-days p { margin : 0; }

.next-days .date:first-letter {
	text-transform: capitalize;
}

.next-days .temperatures p {
	margin-right: 25px;
}

.next-days .temperatures i {
	min-width: 15px;
}

.next-days .weather .weather-icon {
	margin-right: 10px;
}

.next-days .weather p:first-letter {
	text-transform: capitalize;
}
/*.wind">*/


</style>
