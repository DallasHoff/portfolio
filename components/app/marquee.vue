<script setup lang="ts">
const props = defineProps({
	durationSeconds: { type: Number, default: 30 },
	reversed: { type: Boolean, default: false },
	fadeEdges: { type: Boolean, default: false },
	pauseOnHover: { type: Boolean, default: false },
});

const animationDuration = computed(() => `${props.durationSeconds}s`);
const animationDirection = computed(() =>
	props.reversed ? 'reverse' : 'normal'
);
const animationFillMode = computed(() =>
	props.reversed ? 'backwards' : 'forwards'
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
		width: fit-content;
		animation-name: app-marquee;
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

@keyframes app-marquee {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(-50%);
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
