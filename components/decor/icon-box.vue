<script setup lang="ts">
const props = defineProps({
	iconSrc: { type: String, required: true },
	label: { type: String, default: '' },
	scale: { type: Number, default: 1 },
});

const iconSize = computed<number>(() => props.scale * 32);
</script>

<template>
	<div class="decor-icon-box">
		<figure class="decor-icon-box__figure">
			<nuxt-img
				:src="iconSrc"
				alt=""
				:width="iconSize"
				:height="iconSize"
				class="decor-icon-box__icon"
			></nuxt-img>
			<figcaption class="decor-icon-box__caption">
				{{ label }}
			</figcaption>
		</figure>
	</div>
</template>

<style lang="scss">
@use 'cards';

.decor-icon-box {
	container-type: inline-size;
	width: calc(v-bind(scale) * 5rem);
	font-size: calc(v-bind(scale) * 1rem);

	&__figure {
		@include cards.glowy-card;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 15cqw;
	}

	&__icon {
		display: block;
		width: 40cqw;
		height: auto;
		aspect-ratio: 1 / 1;
		margin: 0 auto 0.25em;
	}

	&__caption {
		font-size: 0.6em;
		line-height: 1.25em;
		text-align: center;
	}
}
</style>
