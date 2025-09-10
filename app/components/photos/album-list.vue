<script setup lang="ts">
import { type Album, photosRoot } from '~/data/photos';

defineProps({
	albums: { type: Array as PropType<Album[]>, default: () => [] },
	photosRoot: { type: String, default: photosRoot },
});
</script>

<template>
	<ul class="photos-album-list">
		<li v-for="album of albums">
			<app-article-card
				:path="`/photos/${album.slug}`"
				:title="album.title"
				:subtitle="album.subtitle"
				:description="`${album.photos.length} Photos`"
				:image="`${photosRoot}/${album.slug}/${album.coverPhotoPath}`"
				class="photos-album-list__album"
			></app-article-card>
		</li>
	</ul>
</template>

<style scoped lang="scss">
.photos-album-list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	list-style-type: none;

	&__album {
		height: 100%;
	}

	@media (min-width: 480px) {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
}
</style>
