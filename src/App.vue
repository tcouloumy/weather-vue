<template>
	<div id="app" class="siimple-content siimple-content--large siimple--bg-light">
		<!-- <div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">Forecast</router-link>
		</div> -->
		<router-view/>
	</div>
</template>

<script>

export default {
	name: 'App',
	beforeCreate() {
		// Initialising the store
		this.$store.dispatch('initialiseStore');
		// Suscribing to store changes to update local storage
		this.$store.subscribe((mutation, state) => {
			localStorage.setItem('favoriteLocation', JSON.stringify(state.favoriteLocation));
		});
	}
}

</script>

<style>

* {
	outline: none;
}

html {
	min-height: 100%;
}

body {
	background: linear-gradient(#e9eff5, 10%, #dde5ee);;
}

body .siimple--bg-light {
	background-color: transparent !important;
}

/* Little footer adjustments */
.siimple-footer {
	padding: 25px;
	text-align: right;
	opacity: .5;
}

</style>
