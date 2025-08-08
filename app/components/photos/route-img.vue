<script setup lang="ts">
const {
	routePhoto: photo,
	getPhotoSrc,
	getPhotoId,
	routePhotoRatioX,
	routePhotoRatioY,
} = await usePhotoAlbum();
</script>

<template>
	<div class="photos-route-img">
		<nuxt-img
			v-if="photo"
			:src="getPhotoSrc(photo)"
			:alt="photo.title"
			:width="photo.width"
			:height="photo.height"
			densities="1x 2x"
			:placeholder="[routePhotoRatioX * 2, routePhotoRatioY * 2]"
			placeholder-class="photos-route-img__img--loading"
			format="auto"
			provider="cloudflare"
			preload
			class="photos-route-img__img"
			:style="{ 'view-transition-name': getPhotoId(photo) }"
		/>
		<fa-icon
			icon="fa-light fa-loader"
			spin
			class="photos-route-img__loader"
		></fa-icon>
	</div>
</template>

<style scoped lang="scss">
.photos-route-img {
	position: relative;

	&__img {
		display: block;
		width: 100%;
		height: auto;
	}

	&__loader {
		display: none;
		position: absolute;
		inset: 0;
		margin: auto;
		font-size: 3rem;
		color: var(--text-color-1);
		opacity: 0.7;
	}

	&__img--loading + &__loader {
		display: block;
	}
}
</style>
