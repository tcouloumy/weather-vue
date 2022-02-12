<!-- WeatherIcon.vue -->
<!-- Show the proper icon the weather code given -->

<template>
  <div class="weather-icon">
    <i
      class="wi"
      :class="[getIconClass(weather.id), size]"
    />
  </div>
</template>

<script>

import weatherIconTable from '@/helpers/weatherIconTable.json';

export default {
	name: 'WeatherIcon',
	props: {
		weather: {
			type: Object,
			default: () => {}
		},
		size: {
			type: String,
			default: ''
		}
	},
	methods: {
		getIconClass(weatherId) {
			return weatherIconTable[weatherId.toString()];
		}
	}
}

</script>

<style lang="scss" scoped>

i.wi {
	margin-top: 10px;
	font-size: 60px;
	line-height: 60px;

	&.small {
		margin-top: 0px;
		font-size: inherit;
		line-height: 1;
	}
}

</style>
