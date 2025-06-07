<script setup lang="ts">
const { prevPhotoPath, nextPhotoPath } = await usePhotoAlbum();
</script>

<template>
	<nav aria-label="Photo album navigation" class="photos-button-nav">
		<nuxt-link :to="prevPhotoPath" class="photos-button-nav__button">
			<fa-icon icon="fa-light fa-left"></fa-icon>
			Prev
		</nuxt-link>
		<nuxt-link
			to="../"
			class="photos-button-nav__button photos-button-nav__button--album"
		>
			Album
		</nuxt-link>
		<nuxt-link :to="nextPhotoPath" class="photos-button-nav__button">
			Next
			<fa-icon icon="fa-light fa-right"></fa-icon>
		</nuxt-link>
	</nav>
</template>

<style lang="scss">
@use 'buttons';

.photos-button-nav {
	view-transition-name: photos-button-nav;
	font-size: 1.2rem;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 1rem;
	margin: 1rem 1rem 1.25rem;

	&__button {
		@include buttons.solid-button;
		flex: 1 0 0;
		display: flex;
		align-items: center;
		gap: 0.5em;

		&--album {
			order: -1;
			flex-basis: 100%;
		}
	}

	@media (min-width: 400px) {
		&__button {
			flex: 0 0 auto;

			&--album {
				order: 0;
			}
		}
	}
}
</style>
