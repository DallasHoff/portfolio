<script setup lang="ts">
const {
	routePhoto: photo,
	album,
	getPhotoSrc,
	getPhotoPath,
	getPhotoId,
	routePhotoIndex,
	routePhotoRatioX,
	routePhotoRatioY,
} = await usePhotoAlbum();

usePageMeta({
	title: photo.value?.title,
});

const prevPhotoPath = computed(() => {
	const photo =
		album.photos[routePhotoIndex.value - 1] ??
		album.photos[album.photos.length - 1];
	return getPhotoPath(photo);
});
const nextPhotoPath = computed(() => {
	const photo = album.photos[routePhotoIndex.value + 1] ?? album.photos[0];
	return getPhotoPath(photo);
});
</script>

<template>
	<div class="page-photos-photo">
		<nuxt-layout name="empty">
			<div class="page-photos-photo__nav">
				<nuxt-link :to="prevPhotoPath" class="page-photos-photo__nav-button">
					<fa-icon icon="fa-light fa-left"></fa-icon>
					Prev
				</nuxt-link>
				<nuxt-link
					to="../"
					class="page-photos-photo__nav-button page-photos-photo__nav-button--album"
				>
					Album
				</nuxt-link>
				<nuxt-link :to="nextPhotoPath" class="page-photos-photo__nav-button">
					Next
					<fa-icon icon="fa-light fa-right"></fa-icon>
				</nuxt-link>
			</div>
			<nuxt-link
				v-if="photo"
				:to="`${getPhotoPath(photo)}/full`"
				class="page-photos-photo__img-container"
			>
				<nuxt-img
					:src="getPhotoSrc(photo)"
					:alt="photo.title"
					:width="photo.width"
					:height="photo.height"
					densities="1x 2x"
					:placeholder="[routePhotoRatioX * 2, routePhotoRatioY * 2]"
					format="auto"
					provider="cloudflare"
					class="page-photos-photo__img"
					:style="{ 'view-transition-name': getPhotoId(photo) }"
				></nuxt-img>
			</nuxt-link>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
@use 'buttons';

.page-photos-photo {
	--photo-ratio-x: v-bind(routePhotoRatioX);
	--photo-ratio-y: v-bind(routePhotoRatioY);
	--other-content-height: 12rem;
	margin-bottom: 3rem;

	&__nav {
		view-transition-name: page-photos-photo__nav;
		font-size: 1.2rem;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 1rem 1rem 1.25rem;
	}

	&__nav-button {
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

	&__img-container {
		display: block;
		width: 100%;
		max-width: calc(
			(100vh - var(--other-content-height)) *
				(var(--photo-ratio-x) / var(--photo-ratio-y))
		);
		margin: auto;
	}

	&__img {
		view-transition-class: album-photo;
		display: block;
		width: 100%;
		height: auto;
		margin: auto;
	}

	@media (min-width: 400px) {
		&__nav-button {
			flex: 0 0 auto;

			&--album {
				order: 0;
			}
		}
	}
}
</style>
