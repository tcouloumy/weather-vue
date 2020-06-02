<!-- Favorites.vue -->
<!-- Show a list of the current favorites in the store -->

<template>
	<div class="favorites">
		<h2 class="siimple--my-0">{{$t('favorites.title')}}</h2>
		<p v-if="!isFavoritesEmpty" class="siimple-small siimple--mt-0">{{$t('favorites.updated_at')}} {{ getCurrentFormatedTime() }}</p>

		<ul v-if="!isFavoritesEmpty">
			<li v-for="location in favoriteLocation">
				<FavoriteTab v-bind:location="location" />
			</li>
		</ul>

		<p v-if="isFavoritesEmpty" class="siimple-small">
			{{ $t('favorites.empty') }}
		</p>
	</div>
</template>

<script>

import { mapState } from 'vuex';
import FavoriteTab from './FavoriteTab.vue';
import { locationToString } from '@/helpers/location';
import { getCurrentFormatedTime } from '@/helpers/time'

export default {
	name: 'Favorites',
	components: {
		FavoriteTab
	},
	methods: {
		getCurrentFormatedTime
	},
	computed: {
		...mapState(['favoriteLocation']),
		isFavoritesEmpty: function() {
			return Object.keys(this.favoriteLocation).length === 0;
		}
	}
}

</script>

<style scoped>

ul {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

li {
	display: inline-block;
}

</style>
