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
	<nuxt-img
		v-if="photo"
		:src="getPhotoSrc(photo)"
		:alt="photo.title"
		:width="photo.width"
		:height="photo.height"
		densities="1x 2x"
		:placeholder="[routePhotoRatioX * 2, routePhotoRatioY * 2]"
		format="auto"
		provider="cloudflare"
		class="photos-route-img"
		:style="{ 'view-transition-name': getPhotoId(photo) }"
	/>
</template>
