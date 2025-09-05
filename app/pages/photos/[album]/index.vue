<script setup lang="ts">
const { album, coverPhotoPath } = await useRoutePhotoAlbum();

usePageMeta({
	title: album.title,
	subtitle: album.subtitle,
	coverPhotoPath: coverPhotoPath.value,
});
</script>

<template>
	<div class="page-photos-album">
		<nuxt-layout>
			<photos-album-gallery :album="album"></photos-album-gallery>
		</nuxt-layout>
	</div>
</template>
