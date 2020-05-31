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
		<p class="subtitle siimple-small">As of {{ currentFormatedDate() }}</p>

		<!-- Main today infos -->
		<div class="today">
			<h2>Today</h2>
			<div class="siimple--display-flex">
				<div>
					<p class="temperature">{{ weatherData.current.temp }}°</p>
					<p class="description">{{ weatherData.current.weather[0].description }}</p>
				</div>
				<WeatherIcon v-bind:weather="weatherData.current.weather[0]" />
			</div>

			{{ weatherData.current }}
		</div>

		<!-- Today details -->
		<div class="today-details">

			<h2>Details</h2>

			<div class="siimple--display-flex">
				
				<div class="siimple-table siimple--mr-2">
					<div class="siimple-table-body">
						<div class="siimple-table-row">
							<div class="siimple-table-cell"><i class="wi wi-strong-wind" /></div>
							<div class="siimple-table-cell">{{ weatherData.current.wind_speed }} km/h</div>
						</div>
						<div class="siimple-table-row">
							<div class="siimple-table-cell">test</div>
							<div class="siimple-table-cell">test</div>
						</div>
					</div>
				</div>

				<div class="siimple-table siimple--ml-2">
					<div class="siimple-table-body">
						<div class="siimple-table-row">
							<div class="siimple-table-cell">test</div>
							<div class="siimple-table-cell">test</div>
						</div>
						<div class="siimple-table-row">
							<div class="siimple-table-cell">test</div>
							<div class="siimple-table-cell">test</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Next days table -->
		<div class="next-days">
			<h2>Next days</h2>

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
		/**
		* Check if the current location exists in the store favorites
		*/
		isFavorite() {
			return (this.favoriteLocation.findIndex(item => _.isEqual(item, this.location)) !== -1);
		},
		/**
		* Return a string of the current date formatted for display
		*/
		currentFormatedDate() {
			return moment().format("HH:mm");
		},
		/**
		* Return a formated date string from a timestamp
		* @param {String} timestamp Timestamp to format
		*/
		timestampToDate(timestamp) {
			return moment.unix(timestamp).format("MM/DD/YYYY");
		},
		/**
		* Map the address object to the component when found
		*/
		toggleFavorite() {
			this.$store.dispatch('toggleFavorite', this.location);
		}
	},
	mounted() {

		let lat, long;

		console.log(this.$route.params.completeLocation);

		if (this.$route.params.completeLocation) {
			this.location = this.$route.params.completeLocation;
			lat = this.location.latitude;
			long = this.location.longitude;
		}
		else {

		}

		axios
			.get('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&appid=81f4fb1b0102cc0a3480190588206d6e&units=metric')
			.then(response => {
				this.loading = false;
				this.weatherData = response.data;
			})
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
}

.today > div {
	justify-content: space-between;
}

.description:first-letter {
    text-transform: uppercase;
}

.today-details > div {
	justify-content: space-between;
}

</style>
