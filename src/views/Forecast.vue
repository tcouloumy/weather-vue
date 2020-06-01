<template>
	<div class="forecast">
		<WeatherDetails/>
	</div>
</template>

<script>

import WeatherDetails from '@/components/WeatherDetails.vue'

export default {
	name: 'Forecast',
	components: {
		WeatherDetails
	}
}

</script>
