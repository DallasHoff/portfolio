<script setup lang="ts">
import type { Album } from '~/data/photos';

defineProps({
	album: { type: Object as PropType<Album>, required: true },
});
</script>

<template>
	<ul class="photos-album-gallery">
		<li v-for="photo of album.photos">
			<nuxt-link
				:id="getPhotoSlug(photo)"
				:to="getPhotoPath(photo, album)"
				class="photos-album-gallery__photo"
				:style="{
					'view-transition-name': getPhotoId(photo, album),
					'view-transition-class': 'photos-album-gallery__photo',
				}"
			>
				<nuxt-img
					:src="getPhotoSrc(photo, album)"
					:alt="photo.title"
					loading="lazy"
					width="300"
					densities="1x 2x"
					:placeholder="[photo.ratio[0] * 2, photo.ratio[1] * 2]"
					format="auto"
					provider="cloudflare"
					class="photos-album-gallery__img"
				></nuxt-img>
			</nuxt-link>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.photos-album-gallery {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1rem;
	list-style-type: none;

	&__photo {
		display: block;
		aspect-ratio: 4 / 3;
		border-radius: 0.5rem;
		scroll-margin: 3rem;
		overflow: hidden;
	}

	&__img {
		display: block;
		object-fit: cover;
		width: 100%;
		height: 100%;
		transition: scale 400ms;
	}

	&__photo:hover &__img,
	&__photo:focus &__img {
		scale: 1.2;
	}
}
</style>

<style>
::view-transition-group(.photos-album-gallery__photo) {
	z-index: 1000;
}
</style>
