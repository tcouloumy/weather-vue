<template>
	<div class="weather-icon">
		<i class="wi" :class="getIconClass(weather.id)" />
	</div>
</template>

<script>

import weatherIconTable from '../assets/weatherIconTable.json';

export default {
	name: 'WeatherIcon',
	props: {
		weather: Object
	},
	methods: {
		getIconClass(weatherId) {
			return weatherIconTable[weatherId.toString()];
		}
	}
}

</script>

<style scoped>

i.wi {
	margin-top: 10px;
	font-size: 60px;
	line-height: 60px;
}

</style>
