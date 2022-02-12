<template>
  <div class="home">
    <div class="search-location siimple-form">
      <div class="siimple-jumbotron">
        <div class="siimple-jumbotron-title">
          {{ $t('pages.search.title') }}
        </div>
        <div class="siimple-jumbotron-subtitle">
          {{ $t('pages.search.subtitle') }}
        </div>
        <div class="siimple-jumbotron-detail siimple--mb-3">
          {{ $t('pages.search.detail') }}
        </div>

        <SearchLocation width="40" />
      </div>

      <Favorites />
    </div>
  </div>
</template>

<script>

import SearchLocation from '@/components/SearchLocation.vue';
import Favorites from '@/components/Favorites.vue';

export default {
  name: 'Search',
  components: {
    SearchLocation,
    Favorites,
  },
};
</script>

<style scoped>

.siimple-jumbotron {
	padding-top: 45px;
}

</style>
