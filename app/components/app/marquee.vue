<script setup lang="ts">
const props = defineProps({
	orientation: {
		type: String as PropType<'horizontal' | 'vertical'>,
		default: 'horizontal',
	},
	durationSeconds: { type: Number, default: 30 },
	reversed: { type: Boolean, default: false },
	fadeEdges: { type: Boolean, default: false },
	pauseOnHover: { type: Boolean, default: false },
});

const contentDirection = computed(() =>
	props.orientation === 'vertical' ? 'column' : 'row',
);
const animationName = computed(() => `app-marquee-${props.orientation}`);
const animationDuration = computed(() => `${props.durationSeconds}s`);
const animationDirection = computed(() =>
	props.reversed ? 'reverse' : 'normal',
);
const animationFillMode = computed(() =>
	props.reversed ? 'backwards' : 'forwards',
);
</script>

<template>
	<div class="app-marquee" :class="{ 'app-marquee--fade-edges': fadeEdges }">
		<div
			class="app-marquee__content"
			:class="{ 'app-marquee__content--pause-on-hover': pauseOnHover }"
		>
			<slot></slot>
			<div class="app-marquee__duplicate-slot" aria-hidden="true">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.app-marquee {
	flex-shrink: 0;
	overflow: hidden;

	&--fade-edges {
		mask-image: linear-gradient(
			to right,
			#0000 0%,
			#000f 15%,
			#000f 85%,
			#0000 100%
		);
	}

	&__content {
		display: flex;
		flex-direction: v-bind(contentDirection);
		width: fit-content;
		animation-name: v-bind(animationName);
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-fill-mode: v-bind(animationFillMode);
		animation-duration: v-bind(animationDuration);
		animation-direction: v-bind(animationDirection);

		&--pause-on-hover:hover {
			animation-play-state: paused;
		}
	}

	&__duplicate-slot {
		display: contents;
	}
}

@keyframes app-marquee-horizontal {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
	}
}

@keyframes app-marquee-vertical {
	0% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(-50%);
	}
}

@media (prefers-reduced-motion) {
	.app-marquee {
		overflow: auto;

		&__content {
			animation-iteration-count: 0;
		}

		&__duplicate-slot {
			display: none;
		}
	}
}
</style>
