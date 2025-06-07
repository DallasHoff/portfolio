<script lang="ts" setup>
import { albums, photosRoot } from '~/data/photos';

usePageMeta({
	title: 'Photos',
	subtitle: 'By Dallas Hoffman',
});
</script>

<template>
	<div class="page-photos">
		<nuxt-layout>
			<template #hero>
				<animation-spinning-arcs />
			</template>
			<ul class="page-photos__albums">
				<li>
					<app-article-card
						v-for="album of albums"
						:path="`/photos/${album.slug}`"
						:title="album.title"
						:subtitle="album.subtitle"
						:description="`${album.photos.length} Photos`"
						:image="`${photosRoot}/${album.slug}/${album.coverPhotoPath}`"
						class="page-photos__album"
					></app-article-card>
				</li>
			</ul>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
.page-photos {
	&__albums {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
		list-style-type: none;
	}
}
</style>
