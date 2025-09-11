<script setup lang="ts">
import type { Album, Photo } from '~/data/photos';

const props = defineProps({
	album: { type: Object as PropType<Album>, required: true },
	photo: { type: Object as PropType<Photo>, required: true },
});

const { photoRatioX, photoRatioY } = usePhotoRatio(() => props.photo);
</script>

<template>
	<div class="photos-img">
		<nuxt-img
			v-if="photo"
			:src="getPhotoSrc(photo, album)"
			:alt="photo.title"
			:width="photo.width"
			:height="photo.height"
			sizes="320px xs:640px sm:1024px lg:1280px xl:1536px 2xl:2016px"
			densities="1x 2x"
			format="auto"
			provider="cloudflare"
			preload
			:placeholder="[photoRatioX * 2, photoRatioY * 2]"
			placeholder-class="photos-img__img--loading"
			class="photos-img__img"
		/>
		<fa-icon
			icon="fa-light fa-loader"
			spin
			class="photos-img__loader"
		></fa-icon>
	</div>
</template>

<style scoped lang="scss">
.photos-img {
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
