<script setup lang="ts">
import type { UseSwipeDirection } from '@vueuse/core';

const props = defineProps({
	subjectLinkPath: { type: String },
	prevLinkPath: { type: String },
	nextLinkPath: { type: String },
	aspectRatioX: { type: Number },
	aspectRatioY: { type: Number },
});

const swipeEl = useTemplateRef('swipe-el');
const navigatingDirection = ref<'left' | 'right' | null>(null);
const hoveringNav = ref<boolean>(false);

const { idle } = useIdle(2000);
const showNav = computed<boolean>(() => hoveringNav.value || !idle.value);

const { isSwiping, lengthX } = useSwipe(swipeEl, {
	onSwipeEnd(_, direction) {
		swipePhoto(direction);
	},
});

onKeyStroke('ArrowLeft', () => swipePhoto('right'));
onKeyStroke('ArrowRight', () => swipePhoto('left'));
onKeyStroke('Escape', () => navigateTo(props.subjectLinkPath));

async function swipePhoto(direction: UseSwipeDirection) {
	let path = direction === 'left' ? (props.nextLinkPath ?? null) : null;
	path ??= direction === 'right' ? (props.prevLinkPath ?? null) : null;
	if (!path || (direction !== 'left' && direction !== 'right')) return;

	navigatingDirection.value = direction;
	await new Promise((res) => setTimeout(res, 200));
	await navigateTo(path);
	navigatingDirection.value = null;
}

const subjectMaxWidth = computed<string | null>(() => {
	const ratioX = props.aspectRatioX;
	const ratioY = props.aspectRatioY;

	if (ratioX && ratioY) {
		return `calc((100vh) * (${ratioX} / ${ratioY}))`;
	}

	return null;
});

const subjectTranslate = computed<string>(() => {
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
	<div class="photos-lightbox">
		<div ref="swipe-el">
			<nuxt-link :to="subjectLinkPath" class="photos-lightbox__container">
				<div
					class="photos-lightbox__subject"
					:class="{ 'photos-lightbox__subject--swiping': isSwiping }"
					:style="{ translate: subjectTranslate }"
				>
					<slot></slot>
				</div>
			</nuxt-link>
		</div>
		<transition-fade>
			<photos-overlay-nav
				v-if="showNav"
				:prev-photo-path="prevLinkPath"
				:next-photo-path="nextLinkPath"
				@pointerenter="hoveringNav = true"
				@pointerleave="hoveringNav = false"
			></photos-overlay-nav>
		</transition-fade>
	</div>
</template>

<style scoped lang="scss">
.photos-lightbox {
	&__container {
		view-transition-name: photos-lightbox__container;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		inset: 0;
		background-color: rgb(0 0 0 / 0.5);
	}

	&__subject {
		display: block;
		width: 100%;
		max-width: v-bind(subjectMaxWidth);
		height: auto;
		margin: auto;
		transition: translate 200ms;

		&--swiping {
			transition: none;
		}
	}
}
</style>
