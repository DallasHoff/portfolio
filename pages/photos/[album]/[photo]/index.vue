<script setup lang="ts">
const {
	routePhoto: photo,
	getPhotoSrc,
	getPhotoPath,
	getPhotoId,
	routePhotoRatioX,
	routePhotoRatioY,
} = await usePhotoAlbum();

usePageMeta({
	title: photo.value?.title,
});
</script>

<template>
	<div class="page-photos-photo">
		<nuxt-layout name="empty">
			<photos-button-nav />
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
.page-photos-photo {
	--photo-ratio-x: v-bind(routePhotoRatioX);
	--photo-ratio-y: v-bind(routePhotoRatioY);
	--other-content-height: 12rem;
	margin-bottom: 3rem;

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
}
</style>
