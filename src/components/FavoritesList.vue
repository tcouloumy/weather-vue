<!-- Favorites.vue -->
<!-- Show a list of the current favorites in the store -->

<template>
  <div class="favorites">
    <h2 class="siimple--my-0">
      {{ $t('favorites.title') }}
    </h2>
    <p
      v-if="!isFavoritesEmpty"
      class="siimple-small siimple--mt-0"
    >
      {{ $t('favorites.updated_at') }} {{ currentTime | formatTimestamp('HH:mm') }}
    </p>

    <ul v-if="!isFavoritesEmpty">
      <li
        v-for="location in favoriteLocation"
        :key="location._uid"
      >
        <FavoriteTab :location="location" />
      </li>
    </ul>

    <p
      v-if="isFavoritesEmpty"
      class="siimple-small"
    >
      {{ $t('favorites.empty') }}
    </p>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import moment from 'moment';
import FavoriteTab from './FavoriteTab.vue';

export default {
  name: 'FavoritesList',
  components: {
    FavoriteTab
  },
  computed: {
    ...mapState(['favoriteLocation']),
    currentTime() {
      return moment().unix();
    },
    isFavoritesEmpty() {
      return Object.keys(this.favoriteLocation).length === 0;
    }
  }
};

</script>

<style lang="scss" scoped>

ul {

  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    display: inline-block;
  }
}

</style>
