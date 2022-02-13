<template>
  <div class="forecast">
    <router-link
      class="siimple-link"
      :to="{ name: 'Search' }"
    >
      {{ $t('pages.forecast.back') }}
    </router-link>

    <WeatherDetails />
  </div>
</template>

<script>

import WeatherDetails from '../components/WeatherDetails.vue';

export default {
  name: 'ForecastDetails',
  components: {
    WeatherDetails
  }
};

</script>
