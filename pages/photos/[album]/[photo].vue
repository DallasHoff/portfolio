<script setup lang="ts">
const {
	routePhoto: photo,
	album,
	getPhotoSrc,
	getPhotoPath,
	getPhotoId,
} = await usePhotoAlbum();

usePageMeta({
	title: photo.value?.title,
});

const photoIndex = computed(() => {
	return album.photos.findIndex((p) => p === photo.value);
});
const prevPhotoPath = computed(() => {
	const photo =
		album.photos[photoIndex.value - 1] ?? album.photos[album.photos.length - 1];
	return getPhotoPath(photo);
});
const nextPhotoPath = computed(() => {
	const photo = album.photos[photoIndex.value + 1] ?? album.photos[0];
	return getPhotoPath(photo);
});

const imgContainer = useTemplateRef('img-container');
const ratioX = computed(() => photo.value?.ratio[0] ?? 1);
const ratioY = computed(() => photo.value?.ratio[1] ?? 1);

function toggleLightbox() {
	const container = imgContainer.value;
	!container?.open ? container?.showModal() : container.close();
}
</script>

<template>
	<div class="page-photos-photo">
		<nuxt-layout name="empty">
			<div class="page-photos-photo__nav">
				<nuxt-link :to="prevPhotoPath" class="page-photos-photo__nav-button">
					<fa-icon icon="fa-light fa-left"></fa-icon>
					Prev
				</nuxt-link>
				<nuxt-link
					to="../"
					class="page-photos-photo__nav-button page-photos-photo__nav-button--album"
				>
					Album
				</nuxt-link>
				<nuxt-link :to="nextPhotoPath" class="page-photos-photo__nav-button">
					Next
					<fa-icon icon="fa-light fa-right"></fa-icon>
				</nuxt-link>
			</div>
			<dialog
				ref="img-container"
				closedby="any"
				class="page-photos-photo__img-container"
			>
				<nuxt-img
					v-if="photo"
					:src="getPhotoSrc(photo)"
					:alt="photo.title"
					:width="photo.width"
					:height="photo.height"
					densities="1x 2x"
					:placeholder="[ratioX * 2, ratioY * 2]"
					format="auto"
					provider="cloudflare"
					class="page-photos-photo__img"
					:style="{ 'view-transition-name': getPhotoId(photo) }"
					@click="toggleLightbox"
				></nuxt-img>
			</dialog>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
@use 'buttons';

.page-photos-photo {
	--photo-ratio-x: v-bind(ratioX);
	--photo-ratio-y: v-bind(ratioY);
	--other-content-height: 12rem;
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
	}

	&__img-container {
		display: block;
		position: relative;
		width: 100%;
		max-width: calc(
			(100vh - var(--other-content-height)) *
				(var(--photo-ratio-x) / var(--photo-ratio-y))
		);
		max-height: none;
		margin: auto;
		border: none;
		background: none;
		cursor: zoom-in;
		transition: max-width 400ms;

		&:open {
			--other-content-height: 0px;
			cursor: zoom-out;
		}

		&::backdrop {
			background-color: rgb(0 0 0 / 0.5);
		}
	}

	&__img {
		display: block;
		width: 100%;
		height: auto;
		margin: auto;
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
