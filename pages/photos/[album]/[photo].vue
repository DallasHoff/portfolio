<script setup lang="ts">
const {
	routePhoto: photo,
	getPhotoPath,
	routePhotoRatioX,
	routePhotoRatioY,
} = await usePhotoAlbum();

const { idle } = useIdle(2000);

usePageMeta({
	title: photo.value?.title,
});
</script>

<template>
	<div class="page-photos-photo">
		<nuxt-layout name="empty">
			<nuxt-link v-if="photo" to="../" class="page-photos-photo__container">
				<photos-route-img class="page-photos-photo__img" />
			</nuxt-link>
			<transition-fade>
				<photos-overlay-nav v-if="!idle" />
			</transition-fade>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
.page-photos-photo {
	--photo-ratio-x: v-bind(routePhotoRatioX);
	--photo-ratio-y: v-bind(routePhotoRatioY);

	&__container {
		view-transition-name: page-photos-photo__container;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		inset: 0;
		background-color: rgb(0 0 0 / 0.5);
	}

	&__img {
		view-transition-class: album-photo;
		display: block;
		width: 100%;
		max-width: calc((100vh) * (var(--photo-ratio-x) / var(--photo-ratio-y)));
		height: auto;
		margin: auto;
	}
}
</style>
