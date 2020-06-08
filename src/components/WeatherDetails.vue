<!-- WeatherDetails.vue -->
<!-- Display a complete weather forcecast retrieve on google api based one the route params -->

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
				
				<FavoriteToggle v-bind:location="location" />

			</div>
			<p class="subtitle siimple-small">{{ $t('pages.forecast.hour_prefix') }} {{ currentTimestamp | formatTimestamp('HH:mm') }}</p>

			<!-- Displaying the main weather card for today -->
			<WeatherCard v-bind:weather-data="weatherData.current" v-bind:time-zone="weatherData.timezone" v-bind:time-offset="weatherData.timezone_offset"  />

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
								<div class="siimple-table-cell">{{ weatherData.current.wind_deg | degToCompass }}</div>
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
							
							<div class="siimple-table-cell date">
								<span class="siimple-grid-col--md-hide">{{ item.dt | formatTimestamp('dddd') }} </span><span>{{ item.dt | formatTimestamp('DD/MM') }}</span>
							</div>

							<div class="siimple-table-cell temperatures">
								<div class="siimple--display-flex">
									<p>
										<i class="wi wi-thermometer-exterior" />
										{{ item.temp.min | formatTemperature }}
										
										<i v-if="weatherData.current.temp > item.temp.min" class="wi wi-direction-down siimple--color-error" />
										<i v-if="weatherData.current.temp < item.temp.min" class="wi wi-direction-up siimple--color-success" />

									</p>
									<p>
										<i class="wi wi-thermometer" />
										{{ item.temp.max | formatTemperature }}
										
										<i v-if="weatherData.current.temp > item.temp.max" class="wi wi-direction-down siimple--color-error" />
										<i v-if="weatherData.current.temp < item.temp.max" class="wi wi-direction-up siimple--color-success" />

									</p>
								</div>
							</div>

							<div class="siimple-table-cell weather">
								<div class="siimple--display-flex">
									<WeatherIcon v-bind:weather="item.weather[0]" size="small" />
									<p class="siimple-grid-col--md-hide">{{ item.weather[0].description }}</p>
								</div>
							</div>

							<div class="siimple-table-cell wind siimple-grid-col--md-hide">
								<p>
									<i class="wi wi-strong-wind" />
									<span>
										{{ item.wind_speed }} {{$t('units.speed')}}
										{{ item.wind_deg | degToCompass }}
									</span>
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
import moment from 'moment';
import WeatherIcon from './WeatherIcon.vue';
import LocationService from '@/services/LocationService';
import WeatherService from '@/services/WeatherService';
import { parseReverseGeocodeResult, stringToLocation } from '@/helpers/location';
import WeatherCard from './WeatherCard.vue';
import FavoriteToggle from './FavoriteToggle.vue';

export default {
	
	name: 'WeatherDetails',
	components: {
		WeatherIcon,
		WeatherCard,
		FavoriteToggle
	},
	data: function() {
		return {
			loading: true,
			location: {},
			weatherData: {},
			locale: this.$i18n.locale
		}
	},
	computed: {
		...mapState(['favoriteLocation']),
		currentTimestamp() {
			return moment().unix();
		}
	},
	methods: {
		/**
		* Retrieves the weather from the props location
		*/
		async getWeather() {
			
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
				let geocodeLocation = await LocationService.reverseGeocode(latitude, longitude);
				this.location = parseReverseGeocodeResult(geocodeLocation);
			}
			
			// Getting the weather infos
			let weatherData = await WeatherService.getAllWeatherInfos(latitude, longitude);
			this.weatherData = weatherData.data;
		}
	},
	async mounted() {
		await this.getWeather();
		this.loading = false;
	},
	watch: {
		locale: async function() {
			// Retrieve the data again, with differents units, when the locale is changed
			this.loading = true;
			await this.getWeather();
			this.loading = false;
		}
	},
	updated() {
		this.locale = this.$i18n.locale;
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

.today-details .siimple-table {
	max-width: 50%
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
	min-width: 80px;
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

.next-days .wind span {
	display: inline-block;
	min-width: 135px;
}

/* Responsive */
/* Would be better to get this value from a constant */
@media screen and (max-width: 768px) { 
	.today-details > div {
		flex-direction: column;
	}

	.today-details > div .siimple-table {
		max-width: inherit;
		margin: 0 !important;
	}
} 


</style>
