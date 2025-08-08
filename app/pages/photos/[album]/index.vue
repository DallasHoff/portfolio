<script setup lang="ts">
const { album, coverPhotoPath, getPhotoSrc, getPhotoPath, getPhotoId } =
	await usePhotoAlbum();

usePageMeta({
	title: album.title,
	subtitle: album.subtitle,
	coverPhotoPath: coverPhotoPath.value,
});
</script>

<template>
	<div class="page-photos-album">
		<nuxt-layout>
			<ul class="page-photos-album__photos">
				<li v-for="photo of album.photos">
					<nuxt-link
						:to="getPhotoPath(photo)"
						class="page-photos-album__photo"
						:style="{ 'view-transition-name': getPhotoId(photo) }"
					>
						<nuxt-img
							:src="getPhotoSrc(photo)"
							:alt="photo.title"
							loading="lazy"
							width="300"
							densities="1x 2x"
							:placeholder="[photo.ratio[0] * 2, photo.ratio[1] * 2]"
							format="auto"
							provider="cloudflare"
							class="page-photos-album__img"
						></nuxt-img>
					</nuxt-link>
				</li>
			</ul>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
.page-photos-album {
	&__photos {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
		list-style-type: none;
	}

	&__photo {
		display: block;
		aspect-ratio: 4 / 3;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	&__img {
		view-transition-class: album-photo;
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
