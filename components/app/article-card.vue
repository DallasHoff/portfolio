<script setup lang="ts">
const props = defineProps({
	path: { type: String, required: true },
	title: { type: String, required: true },
	subtitle: { type: String },
	description: { type: String },
	image: { type: String },
});

const img = useImage();
const bgUrl = computed(() => {
	if (!props.image) return '';
	const imgUrl = img(
		props.image,
		{ width: 800, format: 'auto' },
		{ provider: 'cloudflare', densities: '1x 2x' },
	);
	return `url(${imgUrl})`;
});
</script>

<template>
	<nuxt-link :to="path" class="app-article-card">
		<div class="app-article-card__content">
			<h3 class="app-article-card__title">
				{{ title }}
			</h3>
			<div v-if="subtitle" class="app-article-card__subtitle">
				{{ subtitle }}
			</div>
			<p v-if="description" class="app-article-card__description">
				{{ description }}
			</p>
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
	overflow: hidden;

	&::before {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 60%;
		max-width: 400px;
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
