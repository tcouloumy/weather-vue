<!-- WeatherCard.vue -->
<!-- Display a card with the main weather infos from the object passed -->

<template>
  <div class="weather-card">
    <div class="siimple--display-flex">
      <div class="quickview">
        <h2 class="temperature">
          {{ weatherData.temp | formatTemperature }}
        </h2>
        <h3 class="description">
          {{ weatherData.weather[0].description }}
        </h3>
        <p>{{ $t('weather.feels_like') }} {{ weatherData.feels_like | formatTemperature }}</p>
      </div>
      <div>
        <WeatherIcon :weather="weatherData.weather[0]" />

        <div class="suntimes">
          <p>
            <i class="wi wi-sunrise" />
            {{ weatherData.sunrise | formatTimestamp('HH:mm', timeOffset) }}
            {{ weatherData.sunrise | timezoneShort(timeZone) }}
          </p>

          <p>
            <i class="wi wi-sunset" />
            {{ weatherData.sunset | formatTimestamp('HH:mm', timeOffset) }}
            {{ weatherData.sunset | timezoneShort(timeZone) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import WeatherIcon from './WeatherIcon.vue';
import timezoneShort from '@/filters/timezoneShort'

export default {
	
	name: 'WeatherCard',
	components: {
		WeatherIcon
	},
	filters: {
		timezoneShort
	},
	props: {
		weatherData: Object,
		timeZone: String,
		timeOffset: Number
	}
}

</script>

<style lang="scss" scoped>

.weather-card {
   
    border-radius: 5px;
    padding: 20px 30px;
	background-color: rgba(200, 213, 228, .8);
	
	& > div {
		justify-content: space-between;
	}

	.quickview {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
		.quickview p { 
			margin: 0;
		}
	}

	.description {
		margin: 0;

		&:first-letter {
		    text-transform: uppercase;
		}
	}

	.temperature {
		font-size: 50px;
		font-weight: bold;
		margin: 0;
	}

	.suntimes {
		margin-top: 15px;

		p {
			margin: 0;
			margin-top: 3px;

			i {
				margin-right: 5px;
			}
		}
	}

	.weather-icon {
		text-align: right;
	}
}

</style>
