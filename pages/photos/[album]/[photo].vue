<script setup lang="ts">
import type { UseSwipeDirection } from '@vueuse/core';

const {
	routePhoto: photo,
	routePhotoRatioX,
	routePhotoRatioY,
	prevPhotoPath,
	nextPhotoPath,
} = await usePhotoAlbum();

usePageMeta({
	title: photo.value?.title,
});

const hoveringNav = ref<boolean>(false);
const { idle } = useIdle(2000);
const showNav = computed(() => hoveringNav.value || !idle.value);

const swipeEl = useTemplateRef('swipe-el');
const navigatingDirection = ref<'left' | 'right' | null>(null);

const { isSwiping, lengthX } = useSwipe(swipeEl, {
	onSwipeEnd(_, direction) {
		swipePhoto(direction);
	},
});

onKeyStroke('ArrowLeft', () => swipePhoto('right'));
onKeyStroke('ArrowRight', () => swipePhoto('left'));

async function swipePhoto(direction: UseSwipeDirection) {
	let path = direction === 'left' ? nextPhotoPath.value : null;
	path ??= direction === 'right' ? prevPhotoPath.value : null;
	if (!path || (direction !== 'left' && direction !== 'right')) return;

	navigatingDirection.value = direction;
	await new Promise((res) => setTimeout(res, 200));
	await navigateTo(path);
	navigatingDirection.value = null;
}

const translate = computed(() => {
	let x = '0';
	const dir = navigatingDirection.value;

	if (isSwiping.value) {
		x = `${-lengthX.value}px`;
	} else if (dir) {
		x = dir === 'left' ? '-100vw' : '100vw';
	}

	return `${x} 0`;
});
</script>

<template>
	<div class="page-photos-photo">
		<nuxt-layout name="empty">
			<div ref="swipe-el">
				<nuxt-link to="../" class="page-photos-photo__container">
					<photos-route-img
						class="page-photos-photo__img"
						:class="{ 'page-photos-photo__img--swiping': isSwiping }"
						:style="{ translate }"
					></photos-route-img>
				</nuxt-link>
			</div>
			<transition-fade>
				<photos-overlay-nav
					v-if="showNav"
					@pointerenter="hoveringNav = true"
					@pointerleave="hoveringNav = false"
				></photos-overlay-nav>
			</transition-fade>
		</nuxt-layout>
	</div>
</template>

<style lang="scss">
.page-photos-photo {
	--photo-ratio-x: v-bind(routePhotoRatioX);
	--photo-ratio-y: v-bind(routePhotoRatioY);

	&__container {
		view-transition-name: page-photos-photo__container;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		inset: 0;
		background-color: rgb(0 0 0 / 0.5);
	}

	&__img {
		view-transition-class: album-photo;
		display: block;
		width: 100%;
		max-width: calc((100vh) * (var(--photo-ratio-x) / var(--photo-ratio-y)));
		height: auto;
		margin: auto;
		transition: translate 200ms;

		&--swiping {
			transition: none;
		}
	}
}
</style>
