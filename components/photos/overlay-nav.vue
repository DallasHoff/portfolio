<script setup lang="ts">
const { prevPhotoPath, nextPhotoPath } = await usePhotoAlbum();
</script>

<template>
	<nav aria-label="Photo album navigation" class="photos-overlay-nav">
		<nuxt-link
			:to="`${prevPhotoPath}/full`"
			class="photos-overlay-nav__button photos-overlay-nav__button--left"
			aria-label="Previous"
		>
			<fa-icon icon="fa-light fa-left"></fa-icon>
		</nuxt-link>
		<div class="photos-overlay-nav__spacer"></div>
		<nuxt-link
			:to="`${nextPhotoPath}/full`"
			class="photos-overlay-nav__button photos-overlay-nav__button--right"
			aria-label="Next"
		>
			<fa-icon icon="fa-light fa-right"></fa-icon>
		</nuxt-link>
	</nav>
</template>

<style lang="scss">
.photos-overlay-nav {
	view-transition-name: photos-overlay-nav;
	display: flex;
	align-items: center;
	position: fixed;
	inset: 0;
	pointer-events: none;

	&__button {
		display: flex;
		font-size: 2.5rem;
		padding: 1rem;
		color: var(--text-color-1);
		filter: drop-shadow(0 0 16px black);
		pointer-events: auto;
	}

	&__spacer {
		flex-grow: 1;
	}
}

::view-transition-group(photos-overlay-nav) {
	z-index: 1500;
}
</style>
