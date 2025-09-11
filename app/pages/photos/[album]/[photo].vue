<script setup lang="ts">
const { album, photo, prevPhotoPath, nextPhotoPath } =
	await useRoutePhotoAlbum();
const { photoRatioX, photoRatioY } = usePhotoRatio(photo);

usePageMeta({
	title: [photo.value?.title, album.title],
});
</script>

<template>
	<div class="page-photos-photo">
		<nuxt-layout name="empty">
			<photos-lightbox
				v-if="photo"
				:subject-link-path="`../#${getPhotoSlug(photo)}`"
				:prev-link-path="prevPhotoPath"
				:next-link-path="nextPhotoPath"
				:aspect-ratio-x="photoRatioX"
				:aspect-ratio-y="photoRatioY"
			>
				<photos-img
					:photo
					:album
					class="page-photos-photo__img"
					:style="{
						'view-transition-name': getPhotoId(photo, album),
						'view-transition-class': 'photos-album-gallery__photo',
					}"
				></photos-img>
			</photos-lightbox>
		</nuxt-layout>
	</div>
</template>
