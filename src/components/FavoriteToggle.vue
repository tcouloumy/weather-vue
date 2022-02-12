<!-- FavoriteToggle.vue -->
<!-- A little heart that pulse on click and toggle in and out of favorites the given location -->

<template>
  <div
    class="favorite-toggle"
    @click="toggleFavorite()"
  >
    <a>
      <i
        class="fa-heart"
        :class="{ 'far': !isFavorite, 'fas': isFavorite }"
      />
    </a>
  </div>
</template>

<script>

import { mapState } from 'vuex';
import { areEquals } from '@/helpers/location';

export default {
	
	name: 'FavoriteToggle',
	props: {
		location: Object
	},
	computed: {
		...mapState(['favoriteLocation']),
		/**
		* Check if the current location exists in the store favorites
		*/
		isFavorite() {
			return this.favoriteLocation.findIndex(item => areEquals(item, this.location)) !== -1;
		}
	},
	methods: {
		/**
		* Toggle the favorite in the store
		*/
		toggleFavorite() {
			this.$store.dispatch('toggleFavorite', this.location);
		}
	}
}

</script>

<style lang="scss" scoped>

.favorite-toggle {
	
	cursor: pointer;
	
	i {
		font-size: 25px;
		text-shadow: 0 0 0 rgba(216, 27, 27, 0.5);	

		 &.fas {
			color: rgb(230, 93, 93);
			animation: pulse 0.7s;
		}
	}
}

@keyframes pulse {
    0% { text-shadow: 0px 0px 0px rgba(216, 27, 27, 1); }
    100% { text-shadow: 0px 0px 18px rgba(216, 27, 27, 0); }
}

</style>
