<script setup lang="ts">
const {
	routePhoto: photo,
	album,
	getPhotoSrc,
	getPhotoPath,
	getPhotoId,
} = await usePhotoAlbum();

const photoIndex = computed(() => {
	return album.photos.findIndex((p) => p === photo.value);
});
const prevPhotoPath = computed(() => {
	const photo = album.photos[photoIndex.value - 1];
	if (!photo) return null;
	return getPhotoPath(photo);
});
const nextPhotoPath = computed(() => {
	const photo = album.photos[photoIndex.value + 1];
	if (!photo) return null;
	return getPhotoPath(photo);
});

usePageMeta({
	title: photo.value?.title,
});
</script>

<template>
	<div class="page-photos-photo">
		<nuxt-layout name="empty">
			<div class="page-photos-photo__nav">
				<nuxt-link
					:to="prevPhotoPath ?? ''"
					class="page-photos-photo__nav-button"
					:class="{ 'page-photos-photo__nav-button--disabled': !prevPhotoPath }"
				>
					<fa-icon icon="fa-light fa-left"></fa-icon>
					Prev
				</nuxt-link>
				<nuxt-link
					to="../"
					class="page-photos-photo__nav-button page-photos-photo__nav-button--album"
				>
					Album
				</nuxt-link>
				<nuxt-link
					:to="nextPhotoPath ?? ''"
					class="page-photos-photo__nav-button"
					:class="{ 'page-photos-photo__nav-button--disabled': !nextPhotoPath }"
				>
					Next
					<fa-icon icon="fa-light fa-right"></fa-icon>
				</nuxt-link>
			</div>
			<nuxt-img
				v-if="photo"
				:src="getPhotoSrc(photo)"
				:alt="photo.title"
				class="page-photos-photo__img"
				:style="{ 'view-transition-name': getPhotoId(photo) }"
			></nuxt-img>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
@use 'buttons';

.page-photos-photo {
	margin-bottom: 3rem;

	&__nav {
		view-transition-name: page-photos-photo__nav;
		font-size: 1.2rem;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1rem;
		margin: 1rem 1rem 1.25rem;
	}

	&__nav-button {
		@include buttons.solid-button;
		flex: 1 0 0;
		display: flex;
		align-items: center;
		gap: 0.5em;

		&--album {
			order: -1;
			flex-basis: 100%;
		}

		&--disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	&__img {
		display: block;
		width: 100%;
		max-width: calc(80vh * (4 / 3));
		height: auto;
		margin: 0 auto;
	}

	@media (min-width: 400px) {
		&__nav-button {
			flex: 0 0 auto;

			&--album {
				order: 0;
			}
		}
	}
}
</style>
