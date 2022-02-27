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

      <FavoritesList />
    </div>
  </div>
</template>

<script>

import SearchLocation from '../components/SearchLocation.vue';
import FavoritesList from '../components/FavoritesList.vue';

export default {
  name: 'MainPage',
  components: {
    SearchLocation,
    FavoritesList
  }
};
</script>

<style scoped>

.siimple-jumbotron {
  padding-top: 45px;
}

</style>
