<script setup lang="ts">
const props = defineProps({
	path: { type: String },
	title: { type: String },
	subtitle: { type: String },
	description: { type: String },
	image: { type: String },
});

const bgUrl = computed(() => `url(${props.image})`);
</script>

<template>
	<nuxt-link :to="path" class="app-article-card">
		<div class="app-article-card__content">
			<h3 class="app-article-card__title">{{ title }}</h3>
			<div class="app-article-card__subtitle">{{ subtitle }}</div>
			<p class="app-article-card__description">{{ description }}</p>
		</div>
	</nuxt-link>
</template>

<style lang="scss">
@use 'cards';

.app-article-card {
	@include cards.solid-card;
	position: relative;
	font-size: 1rem;
	color: inherit;
	text-decoration: none;

	&::before {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 40%;
		background-image: v-bind(bgUrl);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		mask-image: linear-gradient(70deg, #0000 0%, #0000 20%, #fff 100%);
		opacity: 0.8;
	}

	&__content {
		position: relative;
	}

	&__title {
		font-size: 1.1em;
		margin-bottom: 0.35em;
	}

	&__subtitle {
		font-size: 0.95em;
		line-height: 1.4;
		margin-bottom: 0.5em;
		color: var(--text-color-0);
	}

	&__description {
		font-size: 0.8em;
		text-wrap: pretty;
	}
}
</style>
