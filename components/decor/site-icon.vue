<script setup lang="ts">
defineProps({
	scale: { type: Number, default: 1 },
	shape: { type: String as PropType<'square' | 'circle'>, default: 'square' },
});
</script>

<template>
	<div class="decor-site-icon" :class="'decor-site-icon--' + shape">
		<span>DH</span>
	</div>
</template>

<style lang="scss">
.decor-site-icon {
	font-size: calc(50px * v-bind(scale));
	width: 2.4em;
	height: 2.4em;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: 700;
	color: white;
	background-image:
		radial-gradient(
			circle farthest-side at 35% 5%,
			rgba(60, 230, 182, 0.8) 0%,
			rgba(0, 0, 0, 0) 100%
		),
		radial-gradient(
			circle farthest-side at 75% 20%,
			rgba(0, 109, 209, 0.95) 0%,
			rgba(0, 0, 0, 0) 100%
		),
		radial-gradient(
			circle farthest-side at 25% 70%,
			rgba(123, 69, 232, 0.7) 0%,
			rgba(0, 0, 0, 0) 100%
		),
		radial-gradient(
			circle farthest-side at 65% 70%,
			rgba(90, 241, 110, 1) 0%,
			rgba(0, 0, 0, 0) 100%
		);
	background-color: #18b8f4;
	background-size: 100%;

	&--circle {
		clip-path: circle();
	}
}
</style>
